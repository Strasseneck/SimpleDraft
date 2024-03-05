import { createDiffs, createPatches } from "./DiffMatchPatchUtils";
import { addChange } from "../apiService/ChangeApi";
import { updateDraft } from "../apiService/DraftApi";
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
            Diffs: diffs,
            Patches: patches
        };
        await addChange(newChange);
        // await updateDraft(draftId, { content: changed })
        return true;
    } catch (error) {
        console.error(`Error saving change ${error}`)
        return false;
    }

};