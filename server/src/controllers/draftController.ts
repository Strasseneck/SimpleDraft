import { Request, Response, NextFunction } from 'express'
import Draft from '../db/models/Draft'

export async function getDraft (req: Request, res: Response, next: NextFunction ) {
  const draftId = req.params.id;
  try {
    // try to retrieve
    const draft = await Draft.findByPk(draftId)
    if (!draft) {
      // doesn't exist, return error msg
      res.status(400);
      res.json('No draft with that id!');
    } 
    else {
      // retrieve associated changes

      // exists return draft
      res.status(200);
      res.json(draft);
    }
  } catch (error) {
    res.status(400);
    res.json(`Error retieving draft ${error}`);  
  }
}

export async function addDraft (req: Request, res: Response, next: NextFunction ) {
  try {
    // check if draft already exists
    const existingDraft = await Draft.findOne({ where: { title: req.body.title}})
    if (existingDraft) {
      // exists
      res.status(400);
      res.json('A draft with that title already exists');
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
  
export async function updateDraft (req: Request, res: Response, next: NextFunction ) {
  return
}
  
export async function deleteDraft (req: Request, res: Response, next: NextFunction ) {
  const draftId = req.params.id;
  try {
    // try to retrieve
    const draft = await Draft.findByPk(draftId)
    if (!draft) {
      // doesn't exist, return error msg
      res.status(400);
      res.json('No draft with that id!');
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
