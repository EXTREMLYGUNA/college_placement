import express from 'express'
import StudentsController from '../controller/students.controller.js'
import verifyAuth from '../middleware/verifyAuth.js'
import verifyAdmin from '../middleware/verifyAdmin.js'

const router = express.Router()

router.get('/studentsAll', verifyAuth, verifyAdmin, StudentsController.studentsAll)
router.get('/getStudentsAll/:id', verifyAuth, StudentsController.getStudentsAll)
router.post('/createStudents',StudentsController.createStudents)
router.put('/editStudents/:id', verifyAuth, StudentsController.editStudents)
router.delete('/deleteStudents/:id', verifyAuth, StudentsController.deleteStudents)
router.post('/login',StudentsController.login)
router.post('/signup',StudentsController.studentSignup)
router.put('/change-password',StudentsController.changePassword)

export default router