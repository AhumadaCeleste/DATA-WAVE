import axios from "axios";

const API_URL = "http://localhost:3001";

// Obtener todas las ofertas
{/* export async function getOfertas() {
    try {
        const response = await axios.get(`${API_URL}/ofertaxinstituto/lista-instituto-oferta-matricula`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la lista de ofertas:", error);
        throw error;
    }
}*/}

// Obtener ofertas por instituto
export async function getOfertasPorInstituto(institutoId) {
    try {
        const response = await axios.get(`${API_URL}/instituto/${institutoId}/ofertas`);
        return response.data;
    } catch (error) {
        console.error(
            `Error al obtener las ofertas del instituto con ID ${institutoId}:`,
            error
        );
        throw error;
    }
}