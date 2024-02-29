import express from 'express'
import { getChange, addChange, deleteChange }from '../controllers/changeController'

const router = express.Router()

// get route
router.get('/:id', getChange)

// post route
router.post('/', addChange)

// delete route
router.delete('/:id', deleteChange)


export default router