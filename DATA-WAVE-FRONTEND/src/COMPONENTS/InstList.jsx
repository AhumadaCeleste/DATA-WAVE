import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { PencilIcon, TrashIcon, EyeIcon, CheckCircleIcon, XCircleIcon, ArrowLeftIcon } from "@heroicons/react/20/solid";

function InstitutoList() {
  const [institutos, setInstitutos] = useState([]);
  const [selectedInstituto, setSelectedInstituto] = useState(null);
  const [newDenominacion, setNewDenominacion] = useState("");
  const [newEe, setNewEe] = useState("");
  const [newCuesede, setNewCuesede] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInstitutos, setFilteredInstitutos] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [tipoinstitutos, setTipoInstitutos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [tipoInstitutoId, setTipoInstitutoId] = useState(null);
  const [ciudadId, setCiudadId] = useState(null);
  const [sucursalId, setSucursalId] = useState(null);
  const [showDetails, setShowDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [totalPages, setTotalPages] = useState(1); // Corregido a 1 inicialmente
  const [data, setData] = useState([]);
  const perPage = 5;
  const inputRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadInstitutos();
    loadTiposInstitutos();
    loadCiudades();
    loadSucursales();
  }, [currentPage, searchQuery]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/instituto/lista")
      .then((response) => {
        setInstitutos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  useEffect(() => {
    // Calcular el total de páginas
    if (totalRegistros > 0) {
      const pages = Math.ceil(totalRegistros / perPage);
      setTotalPages(pages);
    } else {
      setTotalPages(1); // Si no hay registros, al menos una página
    }
  }, [totalRegistros]);

  const loadInstitutos = () => {
    const url = searchQuery
      ? `http://localhost:3001/instituto/lista/${currentPage}/${searchQuery}`
      : `http://localhost:3001/instituto/lista/${currentPage}`;
  
    axios
      .get(url)
      .then((response) => {
        setFilteredInstitutos(response.data.rows);
        setTotalRegistros(response.data.count); // Aquí se actualiza el total de registros
      })
      .catch((error) => {
        console.error("Error al obtener la lista de Institutos:", error);
      });
  };

  const loadTiposInstitutos = () => {
    axios
      .get("http://localhost:3001/tipoinstituto/lista")
      .then((response) => {
        setTipoInstitutos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los tipos de instituto:", error);
      });
  };

  
  const loadCiudades = () => {
    axios
      .get("http://localhost:3001/ciudad/lista")
      .then((response) => {
        setCiudades(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las ciudades:", error);
      });
  };

  const loadSucursales = () => {
    axios
      .get("http://localhost:3001/sucursal/lista")
      .then((response) => {
        setSucursales(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las sucursales:", error);
      });
  };

  const editInstituto = (institutoId) => {
    const institutoToEdit = institutos.find((instituto) => instituto.cue === institutoId);
    if (institutoToEdit) {
      setSelectedInstituto(institutoToEdit);
      setNewEe(institutoToEdit.ee);
      setNewDenominacion(institutoToEdit.denominacion);
      setNewCuesede(institutoToEdit.cuesede);
      setTipoInstitutoId(institutoToEdit.tipoinstitutoId);
      setCiudadId(institutoToEdit.CiudadId);
      setSucursalId(institutoToEdit.sucursalId);
    }
  };

  const cancelEdit = () => {
    setSelectedInstituto(null);
    setNewEe("");
    setNewDenominacion("");
    setNewCuesede("");
    setTipoInstitutoId(null);
    setCiudadId(null);
    setSucursalId(null);
  };

  const confirmEdit = () => {
    if (
      selectedInstituto.ee === newEe &&
      selectedInstituto.denominacion === newDenominacion &&
      selectedInstituto.cuesede === newCuesede &&
      selectedInstituto.tipoinstitutoId === tipoInstitutoId &&
      selectedInstituto.CiudadId === ciudadId &&
      selectedInstituto.sucursalId === sucursalId
    ) {
      Swal.fire({
        icon: "error",
        title: "Sin cambios",
        text: "No se ha realizado ninguna modificación.",
      });
      return;
    }

    axios
      .put(`http://localhost:3001/instituto/actualizar/${selectedInstituto.cue}`, {
        ee: newEe,
        denominacion: newDenominacion,
        cuesede: newCuesede,
        tipoinstitutoId: tipoInstitutoId,
        CiudadId: ciudadId,
        sucursalId: sucursalId,
      })
      .then((response) => {
        setSelectedInstituto(null);
        setNewEe("");
        setNewDenominacion("");
        setNewCuesede("");
        setTipoInstitutoId(null);
        setCiudadId(null);
        setSucursalId(null);
        loadInstitutos(); // Refrescar lista
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Instituto Editado Correctamente",
        });
      })
      .catch((error) => {
        console.error("Error al actualizar el instituto:", error);
      });
  };

  const deleteInstituto = (institutoId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#1e40af",
      confirmButtonText: "¡Sí, elimínalo!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3001/instituto/eliminar/${institutoId}`)
          .then((response) => {
            loadInstitutos(); // Refrescar lista
            setSelectedInstituto(null);
            setNewEe("");
            setNewDenominacion("");
            setNewCuesede("");
            setTipoInstitutoId(null);
            setCiudadId(null);
            setSucursalId(null);
            Swal.fire("¡Eliminado!", "El instituto ha sido eliminado.", "success");
          })
          .catch((error) => {
            Swal.fire("Error", "Hubo un error al eliminar el instituto", "error");
            console.error("Error al eliminar el instituto:", error);
          });
      }
    });
  };

  const showInstitutoDetail = (institutoId) => {
    axios
      .get(`http://localhost:3001/instituto/listaqueryfiltro?cue=${institutoId}`)
      .then((response) => {
        setShowDetails(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener el detalle de ofertas:", error);
      });
  };



  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const searchWords = searchQuery.toLowerCase().split(" ");
    const filtered = filteredInstitutos.filter((instituto) =>
      searchWords.every((word) =>
        Object.values(instituto).some((value) =>
          typeof value === "string" && value.toLowerCase().includes(word)
        )
      )
    );
    setFilteredData(filtered);
  }, [searchQuery, filteredInstitutos]);

  
  return (
    <div className="bg-sky-800 text-sky-800 mt-4 space-y-5 overflow-x-auto py-2 px-4 rounded-md w-full sm:w-[400px] lg:w-[850px] xl:w-[1000px] max-w-screen-lg mx-auto">
  <h2 className="text-lg font-bold py-2 flex items-center justify-center bg-gray-300 mt-8 h-16 rounded-md">CONSULTA - INSTITUTOS</h2>

      {!selectedInstituto && !showDetails && (
        <>
          <div className="flex justify-between items-center text-white font-bold rounded-md">
          <input
  className="no-print border-primary rounded-md w-full h-[50px] p-2 mt-3 text-sky-800 font-bold"
  placeholder="Buscar datos"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
            </div>

          {/*<button
      className="flex items-center justify-center border-2 rounded-lg border-gray-400 h-8 w-32 text-sm bg-gray-400 text-white"
      onClick={navigateToCrearInstituto}
    >
      <PlusIcon className="h-5 w-5 mr-1" />
      Crear instituto
    </button>*/} 

           <table className="min-w-full divide-y w-full rounded-md text-sm mt-12" style={{ minHeight: '400px' }}>
  <thead>
    <tr>
      <th className="bg-sky-600 text-white font-bold py-2 px-4 rounded-tl-md">INSTITUTO</th>
      <th className="bg-sky-600 text-white font-bold py-2 px-8 rounded-tr-md w-40"></th>
    </tr>
  </thead>
  <tbody>
    {filteredData.map((instituto, index) => (
      <tr key={instituto.id} className={`bg-${index % 2 === 0 ? "sky-600" : "sky-500"} text-white font-bold rounded-md my-4`}>
        <td className="px-4 py-4">{instituto.denominacion}</td>
        <td className="px-4 py-2 flex justify-between items-center">
          <div className="flex justify-end space-x-4 mt-2">
            <button
              className="flex items-center justify-center border-2 rounded-lg border-gray-400 h-8 w-9 text-sm bg-gray-400 text-white"
              onClick={() => showInstitutoDetail(instituto.cue)}
            >
              <EyeIcon className="h-5 w-5" />
            </button>
            <button
              className="p-1 border-2 rounded-lg bg-white text-sky-600"
              onClick={() => editInstituto(instituto.cue)}
            >
              <PencilIcon className="h-5 w-5 mr-1" />
            </button>
            <button
              className="flex items-center justify-center border-2 rounded-lg border-red-300 h-8 w-9 text-sm bg-red-300 text-white"
              onClick={() => deleteInstituto(instituto.cue)}
            >
              <TrashIcon className="h-5 w-5 mr-1" />
            </button>
          </div>
        </td>
      </tr>
    ))}
    {/* Add empty rows to ensure the minimum number of rows */}
    {filteredData.length < 5 &&
      [...Array(5 - filteredData.length)].map((_, index) => (
        <tr key={`empty-${index}`} className="bg-transparent">
          <td className="px-4 py-4">&nbsp;</td>
          <td className="px-4 py-2">&nbsp;</td>
        </tr>
      ))}
  </tbody>
</table>

<div className="flex flex-col items-center justify-center mt-4"> {/* Cambiado justify-center para centrar horizontalmente y flex-col para disposición vertical */}
  <div className="flex gap-2"> {/* Mantenido gap-2 para separación entre botones */}
    <button
      className={`bg-sky-500 text-white font-bold rounded-md px-4 py-2 hover:bg-sky-600 focus:outline-none ${
        currentPage === 1 ? "hidden" : "block"
      }`}
      onClick={() => handlePrevPage()}
    >
      Anterior
    </button>
    <button
      className={`bg-sky-500 text-white font-bold rounded-md px-4 py-2 hover:bg-sky-600 focus:outline-none ${
        currentPage === totalPages ? "hidden" : "block"
      }`}
      onClick={() => handleNextPage()}
    >
      Siguiente
    </button>
  </div>
  <p className="text-white text-xs sm:text-sm font-bold mt-2"> {/* Agregado mt-2 para separación desde arriba */}
    Página {currentPage} de {totalPages}
  </p>
</div>

  
        </>
      )}


     
{selectedInstituto && (
        <div className="mt-4 rounded-md w-full" style={{ minHeight: '400px' }}>
          <h3 className="text-xl font-bold mb-2 cursor-pointer text-white">
            Editar Instituto: {selectedInstituto.denominacion}
          </h3>
          <p className="text-white font-bold">EE</p>
          <input
            ref={inputRef}
            autoFocus={true}
            className="border border-gray-300 rounded-md p-2 mb-2 w-full bg-primary text-white font-bold"
            type="text"
            value={newEe}
            onChange={(e) => setNewEe(e.target.value)}
          />

<p className="text-white font-bold mt-2">NOMBRE DEL INSTITUTO</p>
          <input
            ref={inputRef}
            autoFocus={true}
            className="border border-gray-300 rounded-md p-2 mb-2 w-full bg-primary text-white font-bold"
            type="text"
            value={newDenominacion}
            onChange={(e) => setNewDenominacion(e.target.value)}
          />
   <p className="text-white font-bold mt-2">CUE ANEXO-EXTENSIÓN ÁULICA</p>
          <input
            ref={inputRef}
            autoFocus={true}
            className="border border-gray-300 rounded-md p-2 mb-2 w-full bg-primary text-white font-bold"
            type="text"
            value={newCuesede}
            onChange={(e) => setNewCuesede(e.target.value)}
          />

          <label htmlFor="tipoinstitutoId" className="block">
          <p className="text-white font-bold mt-2">TIPO DE INSTITUTO</p>
            <div className="text-sky-900 font-bold">
              <select
                id="tipoinstitutoId"
                name="tipoinstitutoId"
                value={tipoInstitutoId}
                onChange={(e) => setTipoInstitutoId(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-md"
              >
                <option value="">Selecciona un tipo de instituto</option>
                {tipoinstitutos.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.descripcion}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <label htmlFor="ciudadId" className="block">
            <div className="text-sky-900 font-bold">
            <p className="text-white mt-3">CIUDAD</p>
              <select
                id="ciudadId"
                name="ciudadId"
                value={ciudadId}
                onChange={(e) => setCiudadId(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-md"
              >
                <option value="">Selecciona una ciudad</option>
                {ciudades.map((ciudad) => (
                  <option key={ciudad.id} value={ciudad.id}>
                    {ciudad.nombre}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <label htmlFor="sucursalId" className="block">
            <div className="text-sky-900 font-bold">
            <p className="text-white font-bold mt-3">SUCURSAL</p>
              <select
                id="sucursalId"
                name="sucursalId"
                value={sucursalId}
                onChange={(e) => setSucursalId(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-md"
              >
                <option value="">Selecciona una sucursal</option>
                {sucursales.map((sucursal) => (
                  <option key={sucursal.id} value={sucursal.id}>
                    {sucursal.descripcion}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <div className="flex justify-end mt-4 space-x-4 font-bold">
  <button
    className="flex items-center justify-center rounded-lg h-10 w-28 text-sm bg-green-700 text-white hover:bg-green-600"
    onClick={confirmEdit}
  >
    <CheckCircleIcon className="h-5 w-5 mr-2" />
    Confirmar
  </button>
  <button
    className="flex items-center justify-center rounded-lg h-10 w-28 text-sm bg-red-700 text-white hover:bg-red-600"
    onClick={cancelEdit}
  >
    <XCircleIcon className="h-5 w-5 mr-2" />
    Cancelar
  </button>
</div>
        </div>
      )}
      {/* FINAL selectedInstituto */}
      {console.log("Valor de showDetails antes de entrar:", showDetails)}
      {showDetails && (
         <div className="text-white font-bold bg-gray-700 rounded p-14 relative" style={{ minHeight: '550px' }}>
         <h3>DETALLES DEL INSTITUTO</h3>
         <hr className="my-8 border-t-2 border-white" />
         <div className="">
           <p className="my-2"><strong>Cue:</strong> {showDetails[0].cue}</p>
           <p className="my-2"><strong>Ee:</strong> {showDetails[0].ee}</p>
           <p className="my-2"><strong>Nombre:</strong> {showDetails[0].denominacion}</p>
           <p className="my-2"><strong>Cue Sede:</strong> {showDetails[0].cuesede}</p>
           <p className="my-2"><strong>Tipo:</strong> {showDetails[0].tipo_instituto}</p>
           <p className="my-2"><strong>Ciudad:</strong> {showDetails[0].ciudad}</p>
           <p className="my-2"><strong>Sucursal:</strong> {showDetails[0].sucursal}</p>
         </div>
         <button
  onClick={() => {
    setSelectedInstituto(null);
    setShowDetails(null);
  }}
  className="p-2 bg-gray-400 text-white rounded absolute right-7 flex items-center"  style={{ marginTop: "115px" }}
>
  <ArrowLeftIcon className="h-5 w-5 mr-2" />
  Regresar
</button>
        {console.log("El bloque se está ejecutando")}
      </div>
      
      )}
      {/*FINAL showDetails */}
      <hr className="my-4 border-t-2 border-white" />

      <div className="justify-center items-center">

</div>

<div className="mt-3 mb-3 flex justify-between items-center bg-sky-600 text-white font-bold rounded-md p-2 text-sm leading-8">
<span>{filteredInstitutos.length} de {totalRegistros} Registros</span>
  <span></span>
  </div>
</div>
  );
}

export default InstitutoList;