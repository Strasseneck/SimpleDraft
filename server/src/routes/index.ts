import express from "express";
import draftRoutes from './draftRoutes'

const router = express.Router()
router.use('/drafts', draftRoutes)

export default router 