import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";


function Adepartamento() {
    //Define estados para los campos del formulario
    const [nombre, setNombre] = useState("");

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crea un objeto con los datos del mensaje
        const nuevoDepartamento = {
            nombre
        };
        try {
            // Realiza una petición POST al backend para guardar el mensaje
            const res = await axios.post(
                "http://localhost:3001/departamento/nuevo",
                nuevoDepartamento
            );
            console.log(res);
            alert("departamento Agregado");

        } catch (error) {
            alert(`Error tipo: ${error.response.data.msg}`);
            // Maneja cualquier error que ocurra durante la solicitud
            console.log("Error al enviar el mensaje al back:", error);
        }
    };

    return (
        <div className="bg-primary py-16 px-16 rounded-md w-auto m-8">
            <div className="contactar-container">
                <h2 className="titulo_pricipal_paginas mb-4 mt-0 shadow-lg text-center">Crear Departamento</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="nombre" className="block mb-2">Nombre:</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required="required"
                            className="w-full py-3 px-4 border rounded-lg shadow-md focus:outline-none"/>
                    </div>

                    <button
                        type="submit"
                        className=" bg-primary hover:text-primary cursor-pointer p-3 m-2 max-w-xs border-2 rounded-lg">
                        AGREGAR
                    </button>

                    <Link to={`/ModCategoria`}>
                        <button
                            className=" bg-primary hover:text-primary cursor-pointer p-3 m-2 max-w-xs border-2 rounded-lg">
                            GESTIONAR CATEGORIAS
                        </button>
                    </Link>

                    <Link to={`/logout`}>
                        <button
                            className=" bg-primary hover:text-primary cursor-pointer p-3 m-2 max-w-xs border-2 rounded-lg">
                            CERRAR SESION
                        </button>
                    </Link>
                </form>

            </div>
        </div>
    );
}

export default Adepartamento;