//VALIDACION DEL CHANGEPASSWORD
export const isPasswordValid = (password) => {
    // Validación de contraseña: al menos 8 caracteres, una mayúscula, una minúscula y un número
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };