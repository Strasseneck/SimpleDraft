export interface Change {
    id: number,
    description: string,
    diffoperation: string,
    difftext: string,
    createdAt: Date,
    updatedAt: Date,
    DraftId: number,
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