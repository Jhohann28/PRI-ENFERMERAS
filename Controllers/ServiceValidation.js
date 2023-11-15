class ServiceValidation {
     validNameDesc = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ0-9\s-]+$/;
     validDesc = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ0-9\s\-.,]+$/u;

     isAllOk(dataService){
            if (!this.validNameDesc.test(dataService.name) || dataService.name.trim() == '') {
                return "Ingrese el campo nombre de forma correcta";
            } 
            if (!this.validDesc.test(dataService.description) || dataService.description.trim() == '') {
                  return "Ingrese el campo descripción de forma correcta";
              } 
              if (dataService.price.trim() == '' ||  parseFloat( dataService.price) <=0) {
                return "Ingrese el campo precio de forma correcta";
              } 
              return true;
              
     }
}
export default ServiceValidation;