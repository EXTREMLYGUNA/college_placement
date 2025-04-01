import applicationUser from '../model/Application.js'
import Students from '../model/student.js'

const applicationData = [
    {
        $lookup:{
        from:"users",
        localField:"userId",
        foreignField:"id",
        as:"userData"
        }
        },{$unwind:"$userData"},
          {
        $project:{
        name:1,
        email:1,
        birth:1,
        mobile:1,
        age:1,
        address:1,
        resume:1,
        gender:1,
        status:1,
        userId:1,
        id:1,
        LoginName:"$userData.name",
        LoginEmail:"$userData.email"
        }
        }
]

const ApplicationAll = async (req,res)=>{
    try {
        let application = await applicationUser.aggregate(applicationData)

        res.status(200).send({
            messgae:"Data fetched successfully",
            data: application
        })
    } catch (error) {
        console.log({error: "Fetching error occured"});
        res.status(500).send({
            messgae: error.message || `Internal server Failure`
        })
    }
}

const getAppllicationOne = async (req,res)=>{
    try {
        const {id} = req.params
        const student = await applicationUser.find({id:id},{_id:0})
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


const createApplication = async (req,res)=>{
    try {
        const userData = await Students.findOne({id:req.body.userId})
        if(userData)
        {
            await applicationUser.create(req.body)
            res.status(201).send({
                message:"User data created"
            })
        }
        else{
            res.status(401).send({
                message:"Invalid userId"
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

const editApplication = async (req,res)=>{
    try {
        const {id} = req.params
        const student = await applicationUser.findOne({id:id})
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
                res.status(200).send({
                    messgae:"Application updated successfully"
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

const deleteApplication = async (req,res)=>{
    try {
        const {id} = req.params
        const student = await applicationUser.deleteOne({id:id})
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


export default { ApplicationAll, getAppllicationOne, createApplication, editApplication, deleteApplication}