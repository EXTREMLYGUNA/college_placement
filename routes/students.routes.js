import express from 'express'
import StudentsController from '../controller/students.controller.js'

const router = express.Router()

router.get('/studentsAll',StudentsController.studentsAll)
router.get('/getStudentsAll/:id',StudentsController.getStudentsAll)
router.post('/createStudents',StudentsController.createStudents)
router.put('/editStudents/:id',StudentsController.editStudents)
router.delete('/deleteStudents/:id',StudentsController.deleteStudents)

export default router