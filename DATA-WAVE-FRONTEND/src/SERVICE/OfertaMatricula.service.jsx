import axios from "axios";
const API_URL = "http://localhost:3001";

export async function getInstitutoDetail(institutoId) {
    try {
        const response = await axios.get(`${API_URL}/instituto/lista/${institutoId}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la lista de institutos:", error);
        throw error;
    }
}

export async function getOfertas() {
    try {
        const response = await axios.get(`${API_URL}/oferta/lista`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la lista de ofertas:', error);
        throw error;
    }
}

export async function getReporteIOMData() {
    try {
        const response = await axios.get(`${API_URL}/ofertaxinstituto/lista-instituto-oferta-matricula`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el reporte de Instituto, Oferta y Matrícula:', error);
        throw error;
    }
}