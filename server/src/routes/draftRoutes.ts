import express from 'express'
import { getDraft, addDraft, updateDraft, deleteDraft }from '../controllers/draftController'

const router = express.Router()

// get route
router.get('/:id', getDraft)

// post route
router.post('/', addDraft)

// patch route
router.patch('/:id', updateDraft)

// delete route
router.delete('/:id', deleteDraft)

export default router