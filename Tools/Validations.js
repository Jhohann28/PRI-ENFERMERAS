class Validations {

    isEmpty=(word)=>{
        return word.length<=0;      
    }

    isEmail=(word)=>{
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(word);
    }

    


}
export default Validations;