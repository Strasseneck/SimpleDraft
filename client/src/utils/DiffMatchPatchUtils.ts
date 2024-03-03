import { DiffMatchPatch, DiffOperation, Diff } from "diff-match-patch-typescript";
import DOMPurify from "dompurify";

const dmp = new DiffMatchPatch;

// function to create diffs from two texts
export const createDiffs = (oldDraft: string, newDraft: string) => {
    const diffs = dmp.diff_main(oldDraft, newDraft);
    dmp.diff_cleanupSemantic(diffs)
    return diffs;
};

// function to destructure objects into Diff tuples
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