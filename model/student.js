import {mongoose} from "../database/connectToDatabase.js";
import validators from '../utils/validators.js'
import { generateRandString } from "../utils/helper.js";

const studentSchema = new mongoose.Schema({
    id:{
        type: String,
        default:function(){
            return generateRandString(8)
        }
    },
    name:{
        type:String,
        required:[true, "Name is required"]
    },
    email:{
        type: String,
                required: [true, "Email is required"],
                validate:{
                    validator: validators.validateEmail,
                    message: props => `${props.value} is not a valid email`
                }
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    birth:{
        type:String,
        required:[true, "birth is required"]
    },
    age:{
        type: String,
        required: [true, "age is required"]
        },
    address:{
        type:String,
        required:[true, "address is required"]
    },
    resume:{
        type:String
    },
    gender:{
        type:String,
        required: [true, "Gender is required"],
        enum: {
            values: ['Select' ,'male', 'female', 'other'],
            message: '{VALUE} is not supported'
        },
        default: 'Select'
    },
    mobile:{
        type: String, 
        required: [true, "Mobile is required"],
        validate:{
            validator: validators.validateMobile,
            message: props => `${props.value} is not a valid mobile number`
        }
    },
    status:{
        type: String,
        required: [true, "status is required"],
        enum: {
            values: ['Active','In-Active'],
            message: '{VALUE} is not supported'
        },
        default: 'In-Active'
    },
    role:{
        type: String,
        enum: {
            values: ['Student','Admin'],
            message: '{VALUE} is not supported'
        },
        default: 'Student'
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
},{
    collection:"users",
    versionKey:false
})

const Students = mongoose.model("users",studentSchema);
export default Students