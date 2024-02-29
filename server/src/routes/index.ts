import express from "express";
import draftRoutes from './draftRoutes'
import changeRoutes from './changeRoutes'

const router = express.Router()
router.use('/draft', draftRoutes)
router.use('/change', changeRoutes)

export default router 