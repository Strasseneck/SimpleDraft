import { PatchObject, Diff } from "diff-match-patch-typescript";

interface ChangeType {
    description: string,
    DraftId: number,
    Patches: PatchObject[];
    Diffs: Diff[];
}

export default ChangeType;