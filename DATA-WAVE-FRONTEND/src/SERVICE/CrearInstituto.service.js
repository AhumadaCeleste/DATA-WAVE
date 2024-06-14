import axios from "axios";
const API_URL = "http://localhost:3001";

export async function obtenerTiposInstitutos() {
    try {
        const response = await axios.get(`${API_URL}/tipoinstituto/lista`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los tipos de instituto", error);
        return [];
    }
}

export async function obtenerCiudades() {
    try {
        const response = await axios.get(`${API_URL}/ciudad/lista`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener las ciudades", error);
        return [];
    }
}

export async function obtenerSucursales() {
    try {
        const response = await axios.get(`${API_URL}/sucursal/lista`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener las sucursales", error);
        return [];
    }
}
