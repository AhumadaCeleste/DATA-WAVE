import axios from "axios";
//utiliza axioss para hacer una solicitud post
//Define la URL base para las solicitudes al servidor local
const API_URL = "http://localhost:3001";

       
 //login usser toma dos parametros dni y pasword 
 //Define una función asincrónica llamada loginUser 
 //que toma dni y password como parámetros y devuelve una promesa 
 //que se resuelve con los datos de la respuesta del servidor.               
export async function loginUser(dni, password) {
    let data = {};
    await axios
        .post(`${API_URL}/usuario/login`, {dni, password})
        .then((response) => {
            localStorage.setItem("dni", response.data.dni);
            data = response.data;
            console.log(data);
        })
        .catch((error) => {
            console.error("Error en el log de usuario", error);
        });
    return data;
}
