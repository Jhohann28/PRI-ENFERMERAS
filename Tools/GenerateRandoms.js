class GenerateRandoms {
    generatePassword(l) {

        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    
        let pas = '';
        for (let i = 0; i < l; i++) {
    
          const rChar = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    
          pas += rChar;
 
          
        }
        return pas;
      }  
}

export default GenerateRandoms;