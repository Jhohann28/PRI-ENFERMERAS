import UserValidationsForm from '../Tools/UserValidationsForm.js';

class UserRegisterIMPL{


    validateForm (person) {
        
        let getValidation = new UserValidationsForm();
        /*
         ci,
      names,
      lastName,
      secondLastname,
      email,
      gender,
      phone,
        */
        
        if(getValidation.CiValidation(person.ci) != true)
        {
            return getValidation.CiValidation(person.ci);
        }
        if(getValidation.NameVlidation(person.names) != true)
        {
            return getValidation.NameVlidation(person.names);
        }
        if(getValidation.LastNameValidation(person.lastName) != true)
        {
            return getValidation.LastNameValidation(person.lastName);
        }
        if(getValidation.SecondLastNameVlidation(person.secondLastname) != true)
        {
            return getValidation.SecondLastNameVlidation(person.secondLastname);
        }
        if(getValidation.EmailValidation(person.email) != true)
        {
            return getValidation.EmailValidation(person.email);
        }
        if(getValidation.PhoneValidation(person.phone) != true)
        {
            return getValidation.PhoneValidation(person.phone);
        }

        return true;
    }
}
export default UserRegisterIMPL;