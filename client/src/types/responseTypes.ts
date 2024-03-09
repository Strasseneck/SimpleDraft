import { PatchObject, Diff } from "diff-match-patch-typescript"

export interface DraftResponse {
    id: number,
    title: string,
    content: string,
    UserId: number,
    createdAt: Date,
    updatedAt: Date,
    Changes: ChangeResponse[],
    Versions: VersionResponse[]
}

export interface ChangeResponse {
    id: number,
    description: string,
    createdAt: Date,
    updatedAt: Date,
    DraftId: number,
    Patches: PatchObject[]
    Diffs: Diff[]
}

export interface VersionResponse {
    id: number,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    DraftId: number,
    ChangeId: number,
};