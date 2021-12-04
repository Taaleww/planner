export default function ValidateInfo(values) {
    let errors = {}

    if(!values.firstName){
        errors.firstName = "Please input your first name"
    }else if(/[^a-zA-Z\s]/.test(values.firstName)){
        errors.firstName = "Plese input only characters"
    }

    if(!values.lastName){
        errors.lastName = "Please input your last name"
    }else if(/[^a-zA-Z-\s]/.test(values.lastName)){
        errors.lastName = "Plese input only characters"
    }
    
    if(!values.email){
        errors.email = "Please input your E-mail";
    }else if(!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'E-mail is invalid';
    }

    if (!values.password) {
        errors.password = 'Please input your password';
    } else if (values.password.length < 6) {
        errors.password = 'Password needs to be 6 characters or more';
    }
    
    if (!values.cfpassword) {
        errors.cfpassword = 'Please confirm your password';
    } else if (values.cfpassword !== values.password) {
        errors.cfpassword = 'Passwords do not match';
    }
    // console.log(errors);

    return errors;
}