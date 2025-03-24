import auth from '../utils/auth.js'
import Students from '../model/student.js'

const verifyAdmin = async (req,res,next)=>{
    const token = req.headers ?.authorization ?.split(" ")[1]
    if(token)
    {
        let payload = auth.decodeToken(token)
        let student = await Students.findOne({id:payload.id,email:payload.email,role:payload.role})
        if(student && student.role==="Admin")
        next()
    else
    res.status(401).send({
    message:"You don't have access ! Contact Admin"})
    }
    
    else
    {
        res.status(401).send({
            message:"No Token FOund"
        })
    }
}

export default verifyAdmin