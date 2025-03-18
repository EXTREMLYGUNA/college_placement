import mongoose from "../database/connectToDatabase.js";
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
    mobile:{
            type: String, 
            required: [true, "Mobile is required"],
            validate:{
                validator: validators.validateMobile,
                message: props => `${props.value} is not a valid mobile number`
            }
        },
    age:{
            type: String,
        required: [true, "Id is required"]
        },
    birth:{
            type:String,
            required:[true, "Email is required"]
    },
    address:{
        type:String,
        required:[true, "Email is required"]
    },
    resume:{
        type:String,
        required:true
    },
    gender:{
        type: String,
        required: [true, "Gender is required"],
        enum: {
            values: ['Select' ,'male', 'female', 'other'],
            message: '{VALUE} is not supported'
        },
        default: 'Select'
    },
    status:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
},{
    collection:"college",
    versionKey:false
})

const Students = mongoose.model("College",studentSchema);
export default Students