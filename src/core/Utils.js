export const emailValidator = email => {
    const re = /\S+@\S+\.\S+/;

    if (!email || email.length <= 0) return "El email no puede estar vacío.";
    if (!re.test(email)) return "Ooops! Necesitamos un email correcto";

    return "";
};

export const passwordValidator = password => {
    if (!password || password.length <= 0) return "No puedes dejar la password vacía";

    return "";
};

export const nameValidator = name => {
    if (!name || name.length <= 0) return "Tu nombre de usuario no puede estar vacío";

    return "";
};

export const phoneValidator = phone => {
    const regexp = /^\d{9}$/;
    if(phone.length < 1){
        return "La longitud del teléfono no es correcta";
    }
    if (phone.match(regexp)) {
        return "";
    }
    else {
        return "El formato del teléfono no es correcto";
    }
};