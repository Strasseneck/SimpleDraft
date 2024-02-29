import { Request, Response, NextFunction } from 'express'

function getHello(req: Request, res: Response, next: NextFunction) {
    res.json('Hello World!')
  }

export default { getHello }