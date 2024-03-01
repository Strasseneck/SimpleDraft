import { Diff } from "diff-match-patch-typescript"

export interface Change {
    id: number,
    description: string,
    createdAt: Date,
    updatedAt: Date,
    DraftId: number,
    Diffs: Diff[]
}

export interface Draft {
    id: number,
    title: string,
    content: string,
    UserId: number,
    createdAt: Date,
    updatedAt: Date,
    Changes: Change[],
}