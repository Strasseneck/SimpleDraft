import { Request, Response, NextFunction } from 'express'
import Change from '../db/models/Change'

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

export async function addChange(req: Request, res: Response, next: NextFunction ) {
  try {
    // create and save new change
    const newChange = await Change.create(req.body);
    // return the change
    res.status(201);
    res.json(newChange)
  } catch (error) {
    res.status(400);
    res.json(`Error saving change ${error}`)
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