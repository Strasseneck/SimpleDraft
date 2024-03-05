import express from 'express'
import { getChange, addChange, deleteChanges }from '../controllers/changeController'

const router = express.Router()

// get route
router.get('/:id', getChange)

// post route
router.post('/', addChange)

// delete route
router.delete('/', deleteChanges)

export default router