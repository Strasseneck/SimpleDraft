import { PatchObject } from "diff-match-patch-typescript"

export interface ChangeResponse {
    id: number,
    description: string,
    createdAt: Date,
    updatedAt: Date,
    DraftId: number,
    Patches: PatchObject[]
}

export interface DraftResponse {
    id: number,
    title: string,
    content: string,
    UserId: number,
    createdAt: Date,
    updatedAt: Date,
    Changes: ChangeResponse[],
}