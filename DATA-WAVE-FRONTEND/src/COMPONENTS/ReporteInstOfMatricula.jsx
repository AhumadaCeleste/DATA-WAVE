import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';

const ReporteInstitutoOfertaMatricula = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [showDetails, setShowDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        axios.get('http://localhost:3001/ofertaxinstituto/lista-instituto-oferta-matricula')
            .then(response => {
                setData(response.data);
                setFilteredData(response.data);
                setShowDetails(true);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        const searchWords = searchQuery.toLowerCase().split(" ");
        const filtered = data.filter((item) =>
            searchWords.every((word) =>
                Object.entries(item).some(([key, value]) => {
                    if (typeof value === "string" && value.toLowerCase().includes(word)) {
                        return true;
                    } else if (typeof value === "number" && value.toString().includes(word)) {
                        return true;
                    }
                    return false;
                })
            )
        );
        setFilteredData(filtered);
    }, [searchQuery, data]);

    const cancelCerrar = () => {
        navigate("/inspector");
    };

    const printList = () => {
        window.print();
    };

    const exportToExcel = () => {
        const filteredDataExcel = filteredData.map((item) => ({
            "Instituto CUE": item.instituto_cue,
            "Denominación": item.instituto_denominacion,
            "Resolución": item.oferta_resolucion,
            "Nombre": item.oferta_nombre,
            "Sector": item.oferta_sector,
            "Matrícula Año 1": item.oferta_matricula,
            "Matrícula Año 2": item.oferta_año2,
            "Matrícula Año 3": item.oferta_año3,
            "Total Matrícula": item.oferta_matricula + item.oferta_año2 + item.oferta_año3
        }));

        const worksheet = XLSX.utils.json_to_sheet(filteredDataExcel);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Ofertas");
        XLSX.writeFile(workbook, "Ofertas.xlsx");
    };

    return (
        <div className="print-container">
            <div className="bg-sky-800 text-sky-800 mt-4 space-y-5 overflow-x-auto py-2 px-4 rounded-md w-full sm:w-[400px] lg:w-[850px] xl:w-[1000px] max-w-screen-lg mx-auto">
                <h2 className="text-lg font-bold py-2 flex items-center justify-center bg-gray-300 mt-8 h-16 rounded-md">Reporte de Instituto, Oferta y Matrícula</h2>
                <div className="mt-8">
                    <input
                        className="no-print border-primary rounded-md w-full h-[50px] p-2 mt-3 text-sky-800 font-bold"
                        placeholder="Buscar datos"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="overflow-x-auto rounded-md">
  <table className="min-w-full divide-y w-full rounded-md text-sm">
    <thead>
      <tr>
        <th className="bg-sky-600 text-white font-bold py-2 px-4">Instituto CUE</th>
        <th className="bg-sky-600 text-white font-bold py-4  w-[600px]">Denominación</th>
        <th className="bg-sky-600 text-white font-bold px-2">Resolución</th>
        <th className="bg-sky-600 text-white font-bold  w-[600px]">Nombre</th>
        <th className="bg-sky-600 text-white font-bold px-2 py-2">1° AÑO</th>
        <th className="bg-sky-600 text-white font-bold py-2 px-2"> 2° AÑO</th>
        <th className="bg-sky-600 text-white font-bold py-2 px-2">3° AÑO</th>
        <th className="bg-sky-600 text-white font-bold px-3">Total Matrícula</th>
      </tr>
    </thead>
    <tbody>
      {filteredData.map((item, index) => (
        <tr key={index} className={`bg-${index % 2 === 0 ? 'sky-600' : 'sky-500'} text-white font-bold`}>
          <td className="py-2 px-4">{item.instituto_cue}</td>
          <td className="py-4  w-[600px]">{item.instituto_denominacion}</td>
          <td className="px-3">{item.oferta_resolucion}</td>
          <td className="w-[800px] border-r">{item.oferta_nombre}</td>
          <td className="px-4 py-5 border-r">{item.oferta_matricula}</td>
          <td className="px-4 py-4 border-r">{item.oferta_año2}</td>
          <td className="px-4 py-4 border-r">{item.oferta_año3}</td>
          <td className="px-8 py-4">{item.oferta_matricula + item.oferta_año2 + item.oferta_año3}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

<div className="flex justify-end">
              <div className="bg-sky-600 text-white font-bold rounded-md p-2 text-sm mt-4">
                <span>Total Matrícula: {filteredData.reduce((total, item) => total + item.oferta_matricula + item.oferta_año2 + item.oferta_año3, 0)}</span>
              </div>
            </div>
<div className="mt-4 flex justify-between items-center bg-sky-600 text-white font-bold rounded-md p-2 text-sm">
              <span>Total registros: {data.length}</span>
              <span>Registros filtrados: {filteredData.length}</span>
              <button
                className="print bg-gray-700 text-white font-bold hover:bg-gray-700 py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                onClick={printList}
              >
                Imprimir
              </button>
              <button
                className="bg-gray-700 text-white font-bold hover:bg-gray-700 py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                onClick={exportToExcel}
              >
                Exportar a Excel
              </button>
            </div>
            
            <button
              className="mt-4 w-24 bg-gray-700 text-white font-bold hover:bg-gray-700 py-2 px-2 rounded focus:outline-none focus:shadow-outline"
              onClick={cancelCerrar}
            >
              Cerrar
            </button>
          </div>
        </div>
    
    );
  };
  
  export default ReporteInstitutoOfertaMatricula;