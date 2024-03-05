import { DiffMatchPatch, DiffOperation, Diff, PatchObject, PatchApplyArray } from "diff-match-patch-typescript";
import DOMPurify from "dompurify";
import { ChangeResponse, DraftResponse } from "../apiService/responseTypes";
import { deleteChanges, getDraft} from "../apiService";


// initialize DiffMatchPatch 
const dmp = new DiffMatchPatch;

// function to create diffs from two texts
export const createDiffs = (oldDraft: string, newDraft: string) => {
    const diffs = dmp.diff_main(oldDraft, newDraft);
    dmp.diff_cleanupSemantic(diffs)
    return diffs;
};

// function to create patches from diffs and text
export const createPatches = (changedDraft: string, diffs: Diff[]) => {
    const patches: PatchObject[] = dmp.patch_make(changedDraft, diffs);
    return patches;
}

// function to create current state of the draft from diffs and patches
export const createDraft = (draft: DraftResponse) => {
    let latestDraft = draft.content;
    const sortedChanges = draft.Changes.sort((a, b) => a.id - b.id)
    sortedChanges.forEach((change) => {
        // transform the patches into correct format
        const patches = transformPatchesArray(change.Patches);
        // update the draft by applying the patch
        latestDraft = dmp.patch_apply(patches, latestDraft)[0]
        console.log(latestDraft);
    })
    return latestDraft;
}

// Function to transform the diffs array from your input into Diff tuples
function transformDiffs(diffs: any[]): Diff[] {
    return diffs.map(diff => extractDiffFromObject(diff));
}

// Function to transform the entire patch object into a PatchObject instance
function transformPatch(patchData: any): PatchObject {
    const { start1, start2, length1, length2, diffs } = patchData;
    const patchObject = new PatchObject();
    patchObject.start1 = start1;
    patchObject.start2 = start2;
    patchObject.length1 = length1;
    patchObject.length2 = length2;
    patchObject.diffs = transformDiffs(diffs);
    return patchObject;
}

// Function to transform the entire array of patches
function transformPatchesArray(patchesData: any[]): PatchObject[] {
    return patchesData.map(patchData => transformPatch(patchData));
}

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

// function to revert drraf to a previous state
export const revertDraft = async (draft: DraftResponse, revertToChange: ChangeResponse, draftId: number) => {
    // loop through changes and delete changes with id greater than the point the user wants to revere to
    const idsTodelete = draft.Changes.filter(change => change.id > revertToChange.id).map(change => change.id);
    await deleteChanges(idsTodelete);
    // fetch reverted draft
    const revertedDraftRes = await getDraft(draftId);
    const revertedDraft = createDraft(revertedDraftRes)
    return revertedDraft; 
}

// function to revert a draft to a previous state using reversed Diffs
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

// function to revert draft to a previous state using reversed Patches
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



