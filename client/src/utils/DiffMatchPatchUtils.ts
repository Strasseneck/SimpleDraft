import { DiffMatchPatch, DiffOperation, Diff, PatchObject } from "diff-match-patch-typescript";
import DOMPurify from "dompurify";
import { DraftResponse } from "../apiService/responseTypes";


// initialize DiffMatchPatch 
const dmp = new DiffMatchPatch;

// function to create diffs from two texts
export const createDiffs = (oldDraft: string, newDraft: string) => {
    const diffs = dmp.diff_main(oldDraft, newDraft);
    dmp.diff_cleanupSemantic(diffs)
    return diffs;
};

// function to create current state of the draft from diffs and patches
export const createDraft = (draft: DraftResponse) => {
    let latestDraft = draft.content; // Initial draft content
    const sortedChanges = draft.Changes.sort((a, b) => a.id - b.id); // Sort changes by ID
    sortedChanges.forEach((change) => {
        // Transform the patches into the correct format
        const patches = transformPatchesArray(change.Patches);
        // Update the draft by applying the patch
        const result = dmp.patch_apply(patches, latestDraft);
        console.log(result[1])
        latestDraft = result[0]; // Update the latest draft content
    });
    return latestDraft; // Return the final state of the draft
};

// Function to transform the diffs array from your input into Diff tuples
function transformDiffs(diffs: any[]): Diff[] {
    return diffs.map(diff => extractDiffFromObject(diff));
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

// CURRENTLY UNUSED PATCH FUNCTIONS THAT COULD BE USED FOR MERGING IN A BRANCHING FUCNTION

// function to create patches from diffs and text
export const createPatches = (changedDraft: string, diffs: Diff[]) => {
    const patches: PatchObject[] = dmp.patch_make(changedDraft, diffs);
    return patches;
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