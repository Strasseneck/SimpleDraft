import { createDiffs, createPatches } from "./DiffMatchPatchUtils";
import { addChange } from "../apiService/ChangeApi";
import Change from '../types/ChangeType';

export const saveChange = async (description: string, original: string, changed: string, draftId: number) => {
    try {
        // compute diffs
        const diffs = createDiffs(original, changed);
        // create patches
        const patches = createPatches(changed, diffs)
        // create change for db
        const newChange: Change = {
            description: description,
            DraftId: draftId,
            Patches: patches
        };
        await addChange(newChange);
        return true;
    } catch (error) {
        console.error(`Error saving change ${error}`)
        return false;
    }

};
