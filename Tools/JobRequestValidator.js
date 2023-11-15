export default class ValidateJob{
    /*let data={
        ci:ci.trim(),//permitir letras y numeros 106512-A , 12313212 , permitir una E al inicio *opcional
        email:email.trim(),//regex correo
        graduationInstitution:graduationInstitution.trim(), //mismo regex que nombre
        lastName:lastName.trim(),//permitir solo letras con acentos y ñ
        names:name.trim(),//permitir espacios pero que el campo no este lleno de espacios
        phone:phone.trim(),//solo numeros de 6 a 8
        secondLastName:secondLastName.trim(),//puede estar vacio pero si no esta vacio validar
        speciality:speciality.trim(),//mismo regex que nombre
        titulationDate: titulationDate.trim()
    }*/

     regexSpecialityGraduation = /^[A-Za-z0-9Á-ÿ\s!¡?¿(){}\[\],]+$/;
     emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
     phoneRegex = /^[0-9]+$/;
    ciRegex = /^(?:E-)?[1-9]\d{5,7}(?:-\d[A-Z])?$/;
    namesRegex=  /^[A-Za-zÁ-ÿ\s]+$/;



    validateAllJob(data){
       if(!this.ciRegex.test(data.ci)){
        return "El CI no tiene un formato correcto";
       }
       if(!this.emailRegex.test(data.email)){
        return "El email no tiene un formato correcto";
       }
       if(!this.phoneRegex.test(data.phone) || data.phone.length >8 || data.phone.length <6 ){
        return "El celular no tiene un formato correcto, debe ser sólo números de 6 a 8 dígitos";
       }
       if(!this.namesRegex.test(data.names) || data.names=="" || data.names.length<2){
        return "El campo nombre no tiene formato correcto, o es muy corto";
       }
       if(!this.namesRegex.test(data.lastName) || data.lastName=="" || data.lastName.length<1){
        return "El campo apellido no tiene formato correcto, o es muy corto";
       }
       if(!this.namesRegex.test(data.secondLastName) || data.secondLastName=="" || data.secondLastName.length<1){
        return "El campo segundo apellido no tiene formato correcto, o es muy corto, ingrese NINGUNO en caso de no tener";
       }
       if(!this.regexSpecialityGraduation.test(data.speciality) || data.speciality=="" || data.speciality.length<1){
        return "El campo especialidad no tiene formato correcto, o es muy corto";
       }
       if(!this.regexSpecialityGraduation.test(data.graduationInstitution) || data.graduationInstitution=="" || data.graduationInstitution.length<2){
        return "El campo Institución de Egresp no tiene formato correcto, o es muy corto";
       }

       return true;
    }

}