import axios from "axios";
const API_URL = "http://localhost:3001";

export async function getInstitutoDetail(institutoId) {
    try {
        const response = await axios.get(`${API_URL}/instituto/lista/${institutoId}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el detalle del instituto:", error);
        throw error;
    }
}

export async function updateInstituto(institutoId, newNombre) {
    try {
        const response = await axios.put(
            `${API_URL}/instituto/actualizar/${institutoId}`,
            {denominacion: newNombre}
        );
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el Instituto:", error);
        throw error;
    }
}

export async function deleteInstituto(institutoId) {
    try {
        const response = await axios.delete(
            `${API_URL}/instituto/eliminar/${institutoId}`
        );
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el Instituto:", error);
        throw error;
    }
}

export async function getAllInstitutos() {
    try {
        const response = await axios.get(`${API_URL}/instituto/listaqueryfiltro`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la lista completa de institutos:', error);
        throw error;
    }
}

