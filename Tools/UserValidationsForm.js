
export const regexNombre = /^[A-Za-zÁ-ÿ\s]+$/;
export const regexApellido = /^[A-Za-zÁ-ÿ\s]+$/;
export const regexCI = /^\d{7,8}$/;
export const regexEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
export const regexGenero = /^(Masculino|Femenino|Otro)$/;
export const regexCelular = /^\d{8}$/;

class UserValidationsForm{

    CiValidation(word) {
        

        if (!regexCI.test(word)) {
      
        return 'Carnet de identidad no válido';
        } 
        else{
            return true;
        }
    }

    NameVlidation(word) {
        

        if (!regexNombre.test(word)) {
      
        return 'nombre no válido';
        } 
        else{
            return true;
        }
    }
    LastNameValidation(word) {
        

        if (!regexApellido.test(word)) {
      
        return 'apellido no válido';
        } 
        else{
            return true;
        }
    }
    SecondLastNameVlidation(word) {
        

        if (!regexApellido.test(word)) {
      
        return 'apellido no válido';
        } 
        else{
            return true;
        }
    }
    EmailValidation(word) {
        

        if (!regexEmail.test(word)) {
      
        return 'Correo no válido';
        }
        else{
            return true;
        } 
    }
    GenderValidation(word) {
        

        if (!regexGenero.test(word)) {
      
        return 'genero no válido';
        } 
        else{
            return true;
        }
    }
    PhoneValidation(word) {
        

        if (!regexCelular.test(word)) {
      
        return 'celular no válido';
        } 
        else{
            return true;
        }
    }

    
}
export default UserValidationsForm;