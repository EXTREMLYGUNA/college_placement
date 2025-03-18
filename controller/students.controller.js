import Students from '../model/student.js'
import 'dotenv/config'

const studentsAll = async (req,res)=>{
    try {
        const student = await Students.find({},{_id:0})
        res.status(200).send({
            messgae:"Student data fetched successfully",
            data: student
        })
    } catch (error) {
        console.log({error: "Fetching error occured"});
        res.status(500).send({
            messgae: error.message || `Internal server Failure`
        })
    }
}

const getStudentsAll = async (req,res)=>{
    try {
        const {id} = req.params
        const student = await Students.findOne({id:id},{_id:0})
                res.status(200).send({
                    messgae:"Student fetched successfully",
                    data: student
                })
    } catch (error) {
        console.log({error: "Fetching error occured"});
        res.status(500).send({
            messgae: error.message || `Internal server Failure`,
            error
        })
    }
}

const createStudents = async (req,res)=>{
    try {
        let student = await Students.findOne({id: req.body.id})
        if(!student)
        {
            await Students.create(req.body)
            res.status(201).send({
                message: "Student created successfully"
            })
        }
        else{
            res.status(400).send({
                message:`Student with ${req.body.id} is alredy exists`
            })
        }
    } catch (error) {
        console.log({error: "Creating error occured"});
        res.status(500).send({
            messgae: error.message || `Internal server Failure`,
            error
        })
    }
}

const editStudents = async (req,res)=>{
    try {
        const {id} = req.params
        const student = await Students.findOne({id:id})
        if(student)
            {
                await Students.updateOne({id:id},{$set:{...student,...req.body}})
                res.status(200).send({
                    messgae:"Student updated successfully"
                })
            }
            else{
                res.status(400).send({
                    messgae: `Invalid Id: ${id} `|| `Already updated ${id}`
                })
            }
    } catch (error) {
        res.status(500).send({
            messgae: error.message || `Internal server Failure`
        })
    }
}

const deleteStudents = async (req,res)=>{
    try {
        const {id} = req.params
        const student = await Students.deleteOne({id:id})
        if(student.deletedCount)
            {
                res.status(200).send({
                    messgae:`Student(Id:${id}) Deleted successfully`,
                    data:student.deletedCount
                })
            }
            else{
                res.status(400).send({
                    messgae: `Invalid Id: ${id} `||`Already Deleted ${id} `
                })
            }
    } catch (error) {
        res.status(500).send({
            messgae: error.message || `Internal server Failure`
        })
    }
}

export default { studentsAll, getStudentsAll, createStudents, editStudents, deleteStudents }