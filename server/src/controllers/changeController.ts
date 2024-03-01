import { Request, Response, NextFunction } from 'express'
import Change from '../db/models/Change'
import Diff from '../db/models/Diff';
import { DiffOperation } from 'diff-match-patch-typescript';

export async function getChange (req: Request, res: Response, next: NextFunction ) {
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
  try {
    // Create a new change instance
    const newChange = await Change.create(req.body);

    // Create the diffs and associate them with the new change
    const createdDiffs = await Promise.all(
      diffs.map(async (diff: any) => {
        // return await Diff.create({ ...diffData, ChangeId: newChange.id });
        return await Diff.create({ operation: DiffOperation[diff[0]] as "DIFF_DELETE" | "DIFF_INSERT" | "DIFF_EQUAL", text: diff[1], ChangeId: newChange.id });
      })
    );
    // Include the associated diffs when fetching the newly created change
    const changeWithDiffs = await Change.findByPk(newChange.id, {
      include: [Diff],
    });
    // Return the change with associated diffs
    res.status(201).json(changeWithDiffs);
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