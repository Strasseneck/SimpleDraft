import express from 'express'
import { getHello, getChange, addChange, deleteChange }from '../controllers/changeController'

const router = express.Router()

// get route
router.get('/', getHello)
router.get('/change/:id', getChange)

// post route
router.post('/change', addChange)

// delete route
router.delete('/change/:id', deleteChange)


export default router