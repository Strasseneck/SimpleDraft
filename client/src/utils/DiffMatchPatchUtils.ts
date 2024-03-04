import { DiffMatchPatch, DiffOperation, Diff, PatchObject, PatchApplyArray } from "diff-match-patch-typescript";
import DOMPurify from "dompurify";
import { ChangeResponse, DraftResponse } from "../apiService/responseTypes";

const dmp = new DiffMatchPatch;

// function to create diffs from two texts
export const createDiffs = (oldDraft: string, newDraft: string) => {
    const diffs = dmp.diff_main(oldDraft, newDraft);
    dmp.diff_cleanupSemantic(diffs)
    return diffs;
};

// function to destructure objects into Diff tuples, because of weird mismatch in my types
function extractDiffFromObject(diffObject: { operation: keyof typeof DiffOperation; text: string }): Diff {
    const { operation, text } = diffObject;
    return [DiffOperation[operation], text];
};

// function to create html representation of diffs for rendering
export const createDiffsHTML = (diffs: Diff[]) => {
    const diffsConverted: Diff[] = diffs.map(({ operation, text }) => extractDiffFromObject({ operation, text }));
    const displayDiffs = dmp.diff_prettyHtml(diffsConverted);
    const sanitizedHtmlDiffs = DOMPurify.sanitize(displayDiffs);
    return sanitizedHtmlDiffs;
};

// function to revert a draft to a previous state
export const revertDraftUsingReverseDiff = (draft: DraftResponse, revertToChange: ChangeResponse) => {
    const currentContent = draft.content;

    // all changes prior to the revert to point
    const revertChanges: ChangeResponse[] = draft.Changes.filter((change) => change.id >= revertToChange.id);

    const revertDiffs: Diff[] = revertChanges.flatMap(change =>
        change.Diffs.map(diffObject => extractDiffFromObject(diffObject))
    );

    const reversedDiffs: Diff[] = revertDiffs.map(([op, val]) => [
        // Reverse the operation
        op * -1,
        val
    ]);
    
    const patches: PatchObject[] = dmp.patch_make(currentContent, reversedDiffs);
    
    const patchApplyResult: PatchApplyArray = dmp.patch_apply(patches, currentContent);
    return patchApplyResult[0];

    const trues = patchApplyResult[1].filter((el) => el === true);
    console.log(`Reversed diffs ${trues.length}`);   
}


export const revertDraftUsingReversedPatches = (draft: DraftResponse, revertToChange: ChangeResponse) => {
    const currentContent = draft.content;

    // all changes prior to the revert to point
    const revertChanges: ChangeResponse[] = draft.Changes.filter((change) => change.id >= revertToChange.id);

    const revertDiffs: Diff[] = revertChanges.flatMap(change =>
        change.Diffs.map(diffObject => extractDiffFromObject(diffObject))
    );

    // create patches
    const patches: PatchObject[] = dmp.patch_make(currentContent, revertDiffs);

    // reverse patches
    const reversedPatches: PatchObject[] = patches.map((patch) => reversePatch(patch));

    // apply patches
    const patchApplyResult: PatchApplyArray = dmp.patch_apply(reversedPatches,currentContent );
    
    return patchApplyResult[0];
    
    // return modified draft
    const trues = patchApplyResult[1].filter((el) => el === true);
    console.log(`Reversed patches ${trues.length}`);  
}

const reversePatch = (patch: PatchObject): PatchObject => {
    return {
        diffs: patch.diffs.map(([op, val]) => [
            op * -1, // Reverse the operation
            val
        ]),
        start1: patch.start2,
        start2: patch.start1,
        length1: patch.length2,
        length2: patch.length1
    };
};



