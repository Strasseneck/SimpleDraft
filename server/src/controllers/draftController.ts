import { Request, Response, NextFunction } from 'express'

function getHello(req: Request, res: Response, next: NextFunction) {
    res.send('Hello World!')
  }

export default { getHello }