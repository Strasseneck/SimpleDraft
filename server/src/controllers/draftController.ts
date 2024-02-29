import { Request, Response, NextFunction } from 'express'
import Draft from '../db/models/Draft'

export function getHello(req: Request, res: Response, next: NextFunction) {
    res.json('Hello Draft!')
  }

export async function getDraft (req: Request, res: Response, next: NextFunction ) {
  const draftId = req.params.id;
  try {
    // try to retrieve
    const draft = await Draft.findOne({ where: { id: draftId }})
    if (!draft) {
      res.status(400)
      res.json('No draft with that id!')
    } else{
      res.status(200)
      res.json(draft);
    }
  } catch (error) {
    res.status(400);
    res.json('Error saving draft');  
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
    res.json('Error saving draft');  
  }
  
}
  
export async function updateDraft (req: Request, res: Response, next: NextFunction ) {
  return
}
  
export async function deleteDraft (req: Request, res: Response, next: NextFunction ) {
  return
}
  
  
export type DraftType = {
  id: number,
  title: string,
  content: string,
  createdAt: Date,
  updatedAt: Date,
  UserId: number,
}

