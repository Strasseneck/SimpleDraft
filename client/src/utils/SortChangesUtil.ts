 import { ChangeResponse } from "../types/responseTypes";


 export const sortGroupChanges = (draftChanges: ChangeResponse[]) => {
    // Sort changes by date
    const sortedChanges = draftChanges.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    // Group sorted changes by date
    const groupedChanges = sortedChanges.reduce<{ [key: string]: ChangeResponse[] }>((accumulator, change) => {
        const date = new Date(change.createdAt).toLocaleDateString('en-GB');
        accumulator[date] = accumulator[date] || [];
        accumulator[date].push(change);
        return accumulator;
    }, {});

    return groupedChanges;
}


 