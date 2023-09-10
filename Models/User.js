
class User{
    constructor(personRef, userAuthID, role, status, latitude, longitude, registrationDate, updateDate){
        this.personRef = personRef;
        this.userAuthID = userAuthID;
        this.role = role;
        this.status = status;
        this.latitude = latitude;
        this.longitude = longitude;
        this.registrationDate = registrationDate;
        this.updateDate = updateDate;

        
    }
}

export default User;