import express from 'express'
import draftController from '../controllers/draftController'

const router = express.Router()

router.get('/', draftController.getHello)

export default router