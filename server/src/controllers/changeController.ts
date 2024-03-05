import { Request, Response, NextFunction } from 'express'
import Change from '../db/models/Change'
import Diff from '../db/models/Diff';
import Patch from '../db/models/Patch';
import { DiffOperation } from 'diff-match-patch-typescript';

export async function getChange(req: Request, res: Response, next: NextFunction) {
  const changeId = req.params.id;
  try {
    // Try to retrieve the change
    const change = await Change.findByPk(changeId, {
      include: [
        {
          model: Patch,
          include: [{ model: Diff, as: 'diffs' }] // Include associated Diffs within each Patch
        }
      ]
    });

    if (!change) {
      // If the change doesn't exist, return an error message
      res.status(404).json('No change with that id!');
    } else {
      // If the change exists, return the change
      res.status(200).json(change);
    }
  } catch (error) {
    // If an error occurs during retrieval, return an error message
    res.status(500).json(`Error retrieving change: ${error}`);
  }
}

export async function addChange(req: Request, res: Response, next: NextFunction) {
  const patches = req.body.Patches;
  try {
    // Create a new change instance
    const newChange = await Change.create(req.body);
    // Create the patches and associate them with the new change
    await Promise.all(patches.map(async (patch: any) => {
      const newPatch = await Patch.create({
        start1: patch.start1,
        start2: patch.start2,
        length1: patch.length1,
        length2: patch.length2,
        ChangeId: newChange.id,
      });

      // Create and associate the diffs with the current patch
      await Promise.all(patch.diffs.map(async (diff: any) => {
        return await Diff.create({
          operation: DiffOperation[diff[0]] as "DIFF_DELETE" | "DIFF_INSERT" | "DIFF_EQUAL",
          text: diff[1],
          PatchId: newPatch.id,
        });
      }));

      return newPatch;
    }));

    // Include the associated patches and diffs when fetching the newly created change
    const changeWithDiffsAndPatches = await Change.findByPk(newChange.id, {
      include: [{ model: Patch, include: [{ model: Diff, as: 'diffs' }] }],
    });

    // Return the change with associated patches and diffs
    res.status(201).json(changeWithDiffsAndPatches);
  } catch (error) {
    res.status(400).json(`Error saving change ${error}`);
  }
}

export async function deleteChanges(req: Request, res: Response, next: NextFunction) {
  const idsToDelete = req.body;
  try {
    // loop through and delete each change
    await Promise.all(idsToDelete.map(async (id: number) => {
      const change = await Change.findByPk(id);
      if (change) {
        await change.destroy();
      }
    }));
    // return success and the ids deleted
    res.status(200).json(`Changes with the ids: ${idsToDelete} deleted successfully`);
  } catch (error) {
    res.status(400).json(`Error deleting change ${error}`);
  }
}
