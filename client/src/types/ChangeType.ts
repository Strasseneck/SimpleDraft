import { Diff } from "diff-match-patch-typescript";

interface ChangeType {
    description: string,
    DraftId: number,
    Diffs: Diff[]
}

export default ChangeType;