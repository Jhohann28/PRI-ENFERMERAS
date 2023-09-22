import Person from './Person';

class Nurse extends Person{
    constructor(names, lastName, secondLastname, email, phone,ci, status, speciality, titulationDate, graduationInstitution, curriculum){
        super(names, lastName, secondLastname, email, phone,ci, status );
        this.speciality = speciality;
        this.titulationDate = titulationDate;
        this.graduationInstitution = graduationInstitution;
        this.curriculum = curriculum;
    }
}

export default Nurse;