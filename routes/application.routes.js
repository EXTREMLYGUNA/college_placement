import express from 'express'
import ApplicationController from '../controller/Application.controller.js'

const router = express.Router()

router.get('/getApplication',ApplicationController.ApplicationAll)
router.get('/getApplicationOne/:id',ApplicationController.getAppllicationOne)
router.post('/create',ApplicationController.createApplication)
router.put('/editUser/:id',ApplicationController.editApplication)
router.delete('/deleteUser/:id',ApplicationController.deleteApplication)

export default router 