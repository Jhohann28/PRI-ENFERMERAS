class Person {
    id;
    registrationDate;
    constructor (names, lastName, secondLastname, email, phone,ci, status, gender ){
        this.names = names;
        this.lastName = lastName;
        this.secondLastname = secondLastname; 
        this.email = email;
        this.phone = phone;
        this.ci = ci;
        this.status = status;
        this.gender = gender;
    }
}
export default Person;