import { Diff, PatchObject } from "diff-match-patch-typescript";

interface ChangeType {
    description: string,
    DraftId: number,
    Diffs: Diff[]
    Patches: PatchObject[];
}

export default ChangeType;