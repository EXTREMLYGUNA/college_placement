import express from 'express'
import {getHome} from '../controller/index.controller.js'
import studentsRoutes from './students.routes.js'

const router = express.Router()

router.get('/',getHome)
router.use('/student',studentsRoutes)

export default router