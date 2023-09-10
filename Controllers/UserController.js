import Validations from "../Tools/Validations.js"

class UserController{

    
    isAllOk=(user)=>{
        let validator = new Validations();
        if(validator.isEmpty(user.email)){
            return  "Ingrese Email";
        }
        if(validator.isEmpty(user.password)){
            return "Ingrese Contraseña";
        }
        if(!validator.isEmail(user.email)){
            return  "Por favor ingrese Email válido";
        }
        return true;
    }



    getProblemAuth=(error)=>{
           if(error=="auth/user-not-found"){
                return "El usuario no existe en el sistema";
           }
           if(error=="auth/wrong-password"){
                return "Contraseña incorrecta";
           }
           return "jeje";
    }

}
export default UserController;