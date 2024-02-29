import express from 'express'
import { getHello, getDraft, addDraft, updateDraft, deleteDraft }from '../controllers/draftController'

const router = express.Router()

// get route
router.get('/', getHello)
router.get('/draft/:id', getDraft)

// post route
router.post('/draft/:id', addDraft)

// patch route
router.patch('draft/:id', updateDraft)

// delete route
router.delete('/draft/:id', deleteDraft)


export default router