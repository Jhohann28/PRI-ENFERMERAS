class AtentionRequest{
    directionName;
    isLocalVisible= true;
    nurse;
    atentionRef;
    constructor(id, date, description, imageName, imageUrl, serviceRef, status, updateDate,userRef  ){
        this.id = id;
        this.date = date;
        this.description= description;
        this.imageName= imageName;
        this.imageUrl = imageUrl;
        this.serviceRef = serviceRef;
        this.status = status;
        this.updateDate = updateDate;
        this.userRef = userRef;

    }
}
export default AtentionRequest;