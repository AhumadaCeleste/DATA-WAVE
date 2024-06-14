import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { EyeIcon } from "@heroicons/react/20/solid"; // Importa el ícono que estás usando

function OfertaPorInstitutoList() {
  const [ofertas, setOfertas] = useState([]);
  const { institutoId } = useParams();
  const [instituto, setInstituto] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOfertas, setFilteredOfertas] = useState([]);
  const [showDetails, setShowDetails] = useState(null);
  const [selectedOferta, setSelectedOferta] = useState(null);


  useEffect(() => {
    loadOfertasPorInstituto();
  }, [institutoId]);

  const loadOfertasPorInstituto = (isSearch = false) => {
    if (!isSearch) {
      axios.get(`http://localhost:3001/ofertaxinstituto/lista-instituto-oferta-matricula`)
        .then((response) => {
          setOfertas(response.data);
          setFilteredOfertas(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener la lista de Institutos:", error);
        });
    } else {
      const search = document.getElementById("searchQuery").value;
      const filtered = ofertas.filter((oferta) =>
        oferta.instituto_denominacion.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredOfertas(filtered);
    }
  };

  const showInstitutoDetail = (institutoId) => {
    axios.get(`http://localhost:3001/ofertaxinstituto/filtrar-instituto-oferta-matricula/${institutoId}`)
      .then((response) => {
        setSelectedOferta(response.data);
        setShowDetails(true);
        console.log("institutoId show:", institutoId);
        console.log("Datos obtenidos show:", response.data);
      })
      .catch((error) => {
        console.error("Error al obtener el detalle de ofertas:", error);
      });
  };

  const cancelCerrar = () => {
    setShowDetails(null);
  };

  return (
  <div className="bg-sky-800 text-white mt-4 space-y-5 overflow-x-auto py-2 px-4 rounded-md w-full sm:w-[400px] lg:w-[850px] xl:w-[1000px] max-w-screen-lg mx-auto">
    <h2 className="text-lg font-bold text-center py-3">OFERTA POR INSTITUTOS</h2>

    {!showDetails && (
      <>
        <div className="flex justify-between items-center bg-sky-600 text-white font-bold rounded">
          <div className="rounded-md w-full bg-sky-600 text-sky-800 font-bold">
            <input
              id="searchQuery"
              className="border-primary rounded-md w-full h-[50px]"
              placeholder="Buscar instituto"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                loadOfertasPorInstituto(true);
              }}
            />
          </div>
        </div>
      </>
    )}

    <table className="min-w-full divide-y w-full rounded-md text-sm">
      <thead>
        <tr>
          <th className="bg-sky-600 text-white font-bold py-2 px-4 rounded-tl-md">Nombre de la Oferta</th>
          <th className="bg-sky-600 text-white font-bold py-2 px-4 rounded-tr-md">Matrícula</th>
        </tr>
      </thead>
      <tbody>
        {filteredOfertas.map((oferta, index) => (
          <tr key={oferta.id} className={`bg-${index % 2 === 0 ? 'sky-600' : 'sky-500'} text-white font-bold rounded-md my-4`}>
            <td className="px-4 py-4">{oferta.instituto_denominacion}</td>
            <td className="px-4 py-2 flex justify-between items-center">
              <div className="flex justify-end space-x-4">
                <span>{oferta.matricula}</span>
                <button
                  className="p-1 border-2 rounded-lg bg-white text-sky-600"
                  onClick={() => showInstitutoDetail(oferta.id)}
                >
                  <EyeIcon className="h-5 w-5" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {showDetails && (
      <div>
        <h3 className="text-center text-lg font-bold mb-4">Detalles de la Oferta</h3>
        <div className="mb-4">
          <p><strong>Nombre:</strong> {selectedOferta.nombre}</p>
          <p><strong>Descripción:</strong> {selectedOferta.descripcion}</p>
          <p><strong>Duración:</strong> {selectedOferta.duracion}</p>
          <p><strong>Cue:</strong> {selectedOferta.institutoCue}</p>
          <p><strong>Matrícula:</strong> {selectedOferta.matricula}</p>
        </div>

        <div className="mt-4 bg-sky-600 text-white font-bold rounded-md p-2 text-xm">
          <span>Total registros: {ofertas.length}</span>
          <span>Registros filtrados: {filteredOfertas.length}</span>
        </div>

        <button
          className="mt-4 w-24 bg-gray-700 text-white font-bold hover:bg-gray-700 py-2 px-2 rounded focus:outline-none focus:shadow-outline flex justify-center"
          onClick={cancelCerrar}
        >
          Cerrar
        </button>
      </div>
    )}
  </div>
);
}

export default OfertaPorInstitutoList;

{/* ACA ESTA AJUSTADO EL TAMAÑO Y EL BUSCADOR
  import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function OfertaPorInstitutoList() {
  const [ofertas, setOfertas] = useState([]);
  const { institutoId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOfertas, setFilteredOfertas] = useState([]);

  useEffect(() => {
    loadOfertasPorInstituto();
  }, [institutoId]);

  const loadOfertasPorInstituto = (isSearch = false) => {
    if (!isSearch) {
      axios.get(`http://localhost:3001/instituto/${institutoId}/ofertas`)
        .then((response) => {
          setOfertas(response.data);
          setFilteredOfertas(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener las ofertas por instituto:", error);
        });
    } else {
      const search = searchQuery.toLowerCase();
      const filtered = ofertas.filter((oferta) =>
        oferta.instituto_denominacion.toLowerCase().includes(search)
      );
      setFilteredOfertas(filtered);
    }
  };

  return (
    <div className="bg-sky-800 text-white mt-4 space-y-5 overflow-x-auto py-2 px-4 rounded-md w-full sm:w-[400px] lg:w-[850px] xl:w-[1000px] max-w-screen-lg mx-auto">
      <h2 className="text-lg font-bold text-center py-3">OFERTA X INSTITUTOS</h2>
      
      <input 
        type="text" 
        id="searchQuery" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        placeholder="Buscar ofertas..." 
        className="px-4 py-2 rounded-md w-full mb-4"
      />
      
      <table className="min-w-full divide-y w-full rounded-md text-sm">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre de la Oferta</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matrícula</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Año</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredOfertas.map((oferta) => (
            <tr key={oferta.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{oferta.instituto_denominacion}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{oferta.matricula}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{oferta.anio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OfertaPorInstitutoList;
 */}