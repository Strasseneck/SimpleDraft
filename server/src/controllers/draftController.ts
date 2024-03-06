import { Request, Response, NextFunction } from 'express'
import Draft from '../db/models/Draft'
import Change from '../db/models/Change';
import Diff from '../db/models/Diff';
import Patch from '../db/models/Patch';
import Version from '../db/models/Version';

export async function getAllDrafts(req: Request, res: Response, next: NextFunction) {
  try {
    const drafts = await Draft.findAll({ 
      include: [
        {
          model: Change,
          include: [
            {
              model: Patch,
              include: [{ model: Diff, as: 'diffs' }]
            },
            Diff,// Include associated Diffs directly under the Change model
          ],
        },
        Version
      ]
    });

    res.status(200).json(drafts);
  } catch (error) {
    res.status(500).json(`Error retrieving drafts: ${error}`);
  }
}

export async function getDraft(req: Request, res: Response, next: NextFunction) {
  const draftId = req.params.id;
  try {
    // try to retrieve
    const draft = await Draft.findByPk(draftId, {
      include: [
        {
          model: Change,
          include: [
            {
              model: Patch,
              include: [{ model: Diff, as: 'diffs' }]
            },
            Diff,// Include associated Diffs directly under the Change model
          ]
        },
        Version // include the associated Versions

      ]
    })
    if (!draft) {
      // doesn't exist, return error msg
      res.status(400);
      res.json('No draft with that id!');
    }
    else {
      // exists return draft
      res.status(200);
      res.json(draft);
    }
  } catch (error) {
    res.status(400);
    res.json(`Error retieving draft ${error}`);
  }
}

export async function addDraft(req: Request, res: Response, next: NextFunction) {
  try {
    // check if draft already exists
    const existingDraft = await Draft.findOne({ where: { title: req.body.title } })
    if (existingDraft) {
      // exists
      res.status(400);
      res.json(`A draft with title ${req.body.title} already exists`);
    }
    else {
      // doesn't exist, create and save
      const newDraft = await Draft.create(req.body);
      // return the draft
      res.status(201);
      res.json(newDraft);
    }
  } catch (error) {
    res.status(400);
    res.json(`Error saving draft ${error}`);
  }
}

export async function updateDraft(req: Request, res: Response, next: NextFunction) {
  try {
    // check a draft with id exists
    const existingDraft = await Draft.findByPk(req.params.id);
    if (!existingDraft) {
      // doesn't exist
      res.status(400);
      res.json(`No draft with id ${req.params.id} found`);
    }
    else {
      // exists update and return
      const previousVersion = await Version.create({content: existingDraft.content, ChangeId: req.body.changeId, DraftId: existingDraft.id})
      const updatedDraft = await existingDraft.update({ content: req.body.content.content })
      await updatedDraft.save();
      res.json(updatedDraft);
    }

  } catch (error) {
    res.status(400);
    res.json(`Error updating draft with id ${req.params.id} ${error}`)
  }
}

export async function deleteDraft(req: Request, res: Response, next: NextFunction) {
  const draftId = req.params.id;
  try {
    // try to retrieve
    const draft = await Draft.findByPk(draftId)
    if (!draft) {
      // doesn't exist, return error msg
      res.status(400);
      res.json('No draft with that id!');
      return;
    }
    else {
      // exists, delete
      await draft.destroy();
      res.status(200);
      res.json(`Draft with id ${draftId} deleted successfully`);
    }
  } catch (error) {
    res.status(400);
    res.json(`Error deleting draft ${error}`);
  }
}
