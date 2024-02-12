import * as Yup from "yup"
 export const signupSchema=Yup.object({
    username:Yup.string().min(4).required("Please enter your username"),
    password:Yup.string().min(6).required("Please enter your password"),
    confirm_password:Yup.string().required().oneOf([Yup.ref('password'),""],"Password must match"),
})