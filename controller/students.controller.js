import Students from '../model/student.js'
import auth from '../utils/auth.js'

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
            req.body.password = await auth.hashData(req.body.password)
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
                const {name,email,password,birth,age,address,resume,mobile,gender,status,role}= req.body
                student.name = name ? name :student.name
                student.email = email ? email : student.email
                student.password = password ? password : student.password
                student.birth = birth ? birth : student.birth
                student.age = age ? age : student.age
                student.address = address ? address : student.address
                student.resume = resume ? resume : student.resume
                student.mobile = mobile ? mobile : student.mobile
                student.gender = gender ? gender : student.gender
                student.status = status ? status : student.status
                student.role = role ? role : student.role

                await student.save()
                // await Students.updateOne({id:id},{$set:{...student,...req.body}})
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

const login = async (req,res) => {
    try {
        const {email,password} = req.body
        const student = await Students.findOne({email:email})
        if(student)
        {
            if(await auth.compareHash(student.password,password))
            {
                const token = auth.createToken({
                    name:student.name,
                    email:student.email,
                    role:student.role,
                    id:student.id
                })
                res.status(200).send({
                    message:"Login successfull",
                    role: student.role,
                    token
                })
            }
            else{
                res.status(400).send({
                    message:"Incorrect password"
                })
            }
        }
        else{
            res.status(400).send({
                messgae: `student's this ${email} doesn't exists`
            })
        }
    } catch (error) {
        res.status(500).send({
            messgae: error.message || `Internal server Failure`
        })
    }
}

const studentSignup = async (req,res)=>{
    try {
        let student = await Students.findOne({email: req.body.email})
        if(!student)
        {
            req.body.password = await auth.hashData(req.body.password)
            await Students.create(req.body)
            res.status(201).send({ 
                message: "Signup successfully"
            })
        }
        else{
            res.status(400).send({
                message:`User is alredy exists`
            })
        }
    } catch (error) {
        console.log({error: "Signup error occured"},error.message);
        res.status(500).send({
            messgae: error.message || `Internal server Failure`,
            error
        })
    }
}

const changePassword = async (req,res)=>{
    try {
        const {id} = req.headers
        const student = await Students.findOne({id:id})
        if(student)
        {
            let {newPassword, currentPassword} = req.body
            if(auth.compareHash(student.password,currentPassword))
            {
                student.password = await auth.hashData(newPassword)
                await student.save()
                res.status(200).send({
                    message:"Password changed successfully"
                })
            }
            else{
                res.status(400).send({
                    message:"Password doesn't match !"
                })
            }
        }
        else{
            res.status(400).send({
                messgae: `Student doesn't exists`
            })
        }
    } catch (error) {
        res.status(500).send({
            messgae: error.message || `Internal server Failure`
        })
    }
}

export default { studentsAll, getStudentsAll, createStudents, editStudents, deleteStudents, login, changePassword, studentSignup }