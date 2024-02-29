import { Request, Response, NextFunction } from 'express'

export function getHello(req: Request, res: Response, next: NextFunction) {
    res.json('Hello Change!')
  }

export function getChange (req: Request, res: Response, next: NextFunction ) {
  return
}

export function addChange(req: Request, res: Response, next: NextFunction ) {
  return
}
  
export function deleteChange (req: Request, res: Response, next: NextFunction ) {
  return
}