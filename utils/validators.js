const validateEmail = (email)=>{
    let regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    return regex.test(email);
}

const validateMobile = (mobile)=>{
    let regex = /^[0-9]{10}$/;
    return regex.test(mobile);
}

export default {validateEmail, validateMobile};