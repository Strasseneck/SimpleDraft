import { Request, Response, NextFunction } from 'express'
import Change from '../db/models/Change'

export async function getChange (req: Request, res: Response, next: NextFunction ) {
  return
}

export async function addChange(req: Request, res: Response, next: NextFunction ) {
  try {
    // create and save new change
    const newChange = await Change.create(req.body);
    // return the change
    res.status(201);
    res.json(newChange)
  } catch (error) {
    res.status(400);
    res.json('Error saving change')
  }
}
  
export async function deleteChange (req: Request, res: Response, next: NextFunction ) {
  return
}