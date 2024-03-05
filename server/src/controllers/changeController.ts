import { Request, Response, NextFunction } from 'express'
import Change from '../db/models/Change'
import Diff from '../db/models/Diff';
import Patch from '../db/models/Patch';
import { DiffOperation } from 'diff-match-patch-typescript';

export async function getChange (req: Request, res: Response, next: NextFunction ) {
  const changeId = req.params.id;
  try {
    // try to retrieve
    const change = await Change.findByPk(changeId, {
      include: [
        Diff, // include associated Diffs within each Change
        Patch, // include associated patches
      ], 
    })
    if (!change) {
      // doesn't exist, return error msg
      res.status(400);
      res.json('No change with that id!');
    }
    else {
      // exists return change
      res.status(200)
      res.json(change);
    }
  } catch (error) {
    res.status(400);
    res.json(`Error retrieving change ${error}`)
  }
}

export async function addChange(req: Request, res: Response, next: NextFunction) {
  const diffs = req.body.Diffs;
  const patches = req.body.Patches;

  try {
    // Create a new change instance
    const newChange = await Change.create(req.body);

    // Create the patches and associate them with the new change
    const createdPatches = await Promise.all(
      patches.map(async (patch: any) => {
        return await Patch.create({
          start1: patch.start1,
          start2: patch.start2,
          length1: patch.length1,
          length2: patch.length2,
          ChangeId: newChange.id,
        });
      })
    );

    // For each patch, create and associate the diffs
    await Promise.all(
      createdPatches.map(async (patch) => {
        return await Promise.all(
          diffs.map(async (diff: any) => {
            const newDiff = await Diff.create({
              operation: DiffOperation[diff[0]] as "DIFF_DELETE" | "DIFF_INSERT" | "DIFF_EQUAL",
              text: diff[1],
              PatchId: patch.id, // Associate the diff with the current patch
            });
            return newDiff;
          })
        );
      })
    );

    // Include the associated diffs and patches when fetching the newly created change
    const changeWithDiffsAndPatches = await Change.findByPk(newChange.id, {
      include: [{ model: Patch, include: [Diff] }],
    });

    // Return the change with associated diffs and patches
    res.status(201).json(changeWithDiffsAndPatches);
  } catch (error) {
    res.status(400).json(`Error saving change ${error}`);
  }
}


  
export async function deleteChange (req: Request, res: Response, next: NextFunction ) {
  const changeId = req.params.id;
  try {
    // try to retrieve
    const change = await Change.findByPk(changeId)
    if (!change) {
      // doesn't exist, return error msg
      res.status(400);
      res.json('No change with that id!');
    }
    else {
      // exists, delete
      await change.destroy();
      res.status(200)
      res.json(`Change with id ${changeId} deleted sucessfully`);
    }
  } catch (error) {
    res.status(400);
    res.json(`Error deleting change ${error}`)
  }
}