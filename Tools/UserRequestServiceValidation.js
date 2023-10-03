// ValidationUtils.js


class FieldValidation {
    static validateServiceSelection(selectedService) {
      if (!selectedService) {
        return "Debes seleccionar un servicio";
      }
      return null; // La validación pasó
    }
  
    static validateDescription(description) {
      // Aquí puedes definir tu regex para la descripción
      const regex = /^[A-Za-z0-9Á-ÿ\s!¡?¿(){}\[\],]+$/;

      if (!regex.test(description)) {
        return "La descripción no es válida";
      }
      return null; // La validación pasó
    }
  }
  
  export default FieldValidation;
  