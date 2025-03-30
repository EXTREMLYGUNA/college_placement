import {mongoose} from "../database/connectToDatabase.js";
import validators from '../utils/validators.js'
import { generateRandString } from "../utils/helper.js";

const applicationSchema = new mongoose.Schema({
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
    birth:{
        type:String,
        required:[true, "birth is required"]
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
        required: [true, "age is required"]
        },
    address:{
        type:String,
        required:[true, "address is required"]
    },
    resume:{
        type:Object,
        required:[true, "File need to be upload"]
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
    status:{
        type: String,
        required: [true, "status is required"],
        enum: {
            values: ['Active','In-Active'],
            message: '{VALUE} is not supported'
        },
        default: 'In-Active'
    },
    userId:{
        type:String,
        required:[true,'userId is required']
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
},{
    collection:"application",
    versionKey:false
})

const applicationUser = mongoose.model("application",applicationSchema);
export default applicationUser