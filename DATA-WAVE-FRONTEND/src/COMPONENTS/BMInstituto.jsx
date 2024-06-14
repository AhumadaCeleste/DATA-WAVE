import React, { useEffect, useState, useRef } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { PencilIcon, TrashIcon,  CheckCircleIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";

function BMInstituto(props) {
  const [institutos, setInstitutos] = useState([]);
  const [selectedInstituto, setSelectedInstituto] = useState(null);
  const [newDenominacion, setNewDenominacion] = useState("");
  const [newEe, setNewEe] = useState("");
  const [newCuesede, setNewCuesede] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInstitutos, setFilteredInstitutos] = useState([]);
  const [tipoinstitutos, setTipoInstitutos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [tipoInstitutoId, setTipoInstitutoId] = useState(null);
  const [ciudadId, setCiudadId] = useState(null);
  const [sucursalId, setSucursalId] = useState(null);
  const [showDetails, setShowDetails] = useState(null); 
  const [ofertas, setOfertas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [totalPages, setTotalPages] = useState(5);
  const [perPage, setPerPage] = useState(5);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadInstitutos();
    loadTiposInstitutos();
    loadCiudades();
    loadSucursales();
  }, [currentPage]);

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

  const loadInstitutos = (isSearch = false) => {
    if (!isSearch) {
      axios.get("http://localhost:3001/instituto/lista")
        .then((response) => {
          setInstitutos(response.data);
          setFilteredInstitutos(response.data);
          setTotalRegistros(response.data.length); // Calcular total de registros aquí
        })
        .catch((error) => {
          console.error("Error al obtener la lista de Institutos:", error);
        });
    } else {
      const search = document.getElementById("searchQuery").value;
      const filtered = institutos.filter((instituto) =>
        instituto.denominacion.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredInstitutos(filtered);
      setTotalRegistros(filtered.length); // Calcular total de registros aquí
    }
  };

  const loadTiposInstitutos = () => {
    axios.get("http://localhost:3001/tipoinstituto/lista")
      .then((response) => {
        setTipoInstitutos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los tipos de instituto:", error);
      });
  };

  const loadCiudades = () => {
    axios.get("http://localhost:3001/ciudad/lista")
      .then((response) => {
        setCiudades(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las ciudades:", error);
      });
  };

  const loadSucursales = () => {
    axios.get("http://localhost:3001/sucursal/lista")
      .then((response) => {
        setSucursales(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las sucursales:", error);
      });
  };


  const editInstituto = (institutoId) => {
    console.log("valor de institutoid 1", institutoId);
    const institutoToEdit = institutos.find((instituto) => instituto.cue === institutoId);
    console.log("valor de institutoid 2", institutoId);
    if (institutoToEdit) {
      console.log("ingreso a editar");
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
        loadInstitutos();
        console.log("Instituto editado correctamente");
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
            loadInstitutos();
            setSelectedInstituto(null);
            setNewEe ("");
            setNewDenominacion("");
            setNewCuesede ("");
            setTipoInstitutoId(null);
            setCiudadId(null);
            setSucursalId(null);
            Swal.fire("¡Eliminado!", "El instituto ha sido eliminado.", "success");
            console.log("Instituto eliminado correctamente");
          })
          .catch((error) => {
            Swal.fire("Error", "Hubo un error al eliminar el instituto", "error");
            console.error("Error al eliminar el instituto:", error);
          });
      }
    });
  };


  
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-sky-800 text-sky-800 mt-4 space-y-5 overflow-x-auto py-2 px-4 rounded-md w-full sm:w-[400px] lg:w-[850px] xl:w-[1000px] max-w-screen-lg mx-auto">
  <h2 className="text-lg font-bold py-2 flex items-center justify-center bg-gray-300 mt-8 h-16 rounded-md">CONSULTA - INSTITUTOS</h2>

      {!selectedInstituto && !showDetails && (
        <>
          <div className="flex justify-between items-center text-white font-bold rounded-md">
            <div className="rounded-md mt-3 w-full text-sky-800 font-bold">
              <input
                id="searchQuery"
                className="border-primary rounded-md w-full h-[50px]"
                placeholder="Buscar instituto"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  loadInstitutos(true);
                }}
              />
            </div>
          </div>

          <table className="min-w-full divide-y w-full rounded-md text-sm mt-12">
            <thead>
              <tr>
                <th className="bg-sky-600 text-white font-bold py-2 px-4 rounded-tl-md">INSTITUTO</th>
                <th className="bg-sky-600 text-white font-bold py-2 px-8 rounded-tr-md"></th>
              </tr>
            </thead>
            <tbody>
              {filteredInstitutos.map((instituto, index) => (
                <tr key={instituto.id} className={`bg-${index % 2 === 0 ? 'sky-600' : 'sky-500'} text-white font-bold rounded-md my-4`}>
                  <td className="px-4 py-4">{instituto.denominacion}</td>
                  <td className="px-4 py-2 flex justify-between items-center">
                    <div className="flex justify-end space-x-4">
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
            </tbody>
          </table>
        </>
      )}

      {selectedInstituto && (
        <div className="mt-4 rounded-md w-full">
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
        <div className="text-white font-bold bg-gray-700 rounded p-4">
        <h3>Detalles del Instituto</h3>
        <div>
          <p><strong>Cue:</strong> {showDetails[0].cue}</p>
          <p><strong>Ee:</strong> {showDetails[0].ee}</p>
          <p><strong>Nombre:</strong> {showDetails[0].denominacion}</p>
          <p><strong>Cue Sede:</strong> {showDetails[0].cuesede}</p>
          <p><strong>Tipo:</strong> {showDetails[0].tipo_instituto}</p>
          <p><strong>Ciudad:</strong> {showDetails[0].ciudad}</p>
          <p><strong>Sucursal:</strong> {showDetails[0].sucursal}</p>
        </div>
        {console.log("El bloque se está ejecutando")}
      </div>
      )}
      {/*FINAL showDetails */}
      <hr className="my-4 border-t-2 border-white" />

 

<div className="mt-3 mb-3 flex justify-between items-center bg-sky-600 text-white font-bold rounded-md p-2 text-sm leading-8">
  <span>Total Registros: {institutos.length}</span>
  <span>Registros filtrados: {filteredInstitutos.length}</span>
</div>
    </div>
  );
}

export default BMInstituto;