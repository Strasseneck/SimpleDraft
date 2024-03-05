import { PatchObject } from "diff-match-patch-typescript";

interface ChangeType {
    description: string,
    DraftId: number,
    Patches: PatchObject[];
}

export default ChangeType;