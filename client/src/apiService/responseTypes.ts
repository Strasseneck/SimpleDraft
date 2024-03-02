import { Diff } from "diff-match-patch-typescript"

export interface ChangeResponse {
    id: number,
    description: string,
    createdAt: Date,
    updatedAt: Date,
    DraftId: number,
    Diffs: Diff[]
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

// Destructuring the DraftResponse object into separate states
export const separateDraftStates = (draftResponse: DraftResponse) => {
    const { id, title, content, UserId, createdAt, updatedAt, Changes } = draftResponse;
    return { id, title, content, UserId, createdAt, updatedAt, Changes };
};