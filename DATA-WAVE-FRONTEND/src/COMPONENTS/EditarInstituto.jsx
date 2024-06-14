import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function EditarInstituto(props) {
  const { id } = useParams();
  const [institutoIdInput, setInstitutoIdInput] = useState(id || "");
  const [institutos, setInstitutos] = useState([]);
  const [selectedInstituto, setSelectedInstituto] = useState(null);
  const [newEe, setNewEe] = useState("");
  const [newDenominacion, setNewDenominacion] = useState("");
  const [newCuesede, setNewCuesede] = useState("");
  const [tipoinstitutos, setTipoInstitutos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [tipoInstitutoId, setTipoInstitutoId] = useState(null);
  const [ciudadId, setCiudadId] = useState(null);
  const [sucursalId, setSucursalId] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    loadInstitutos();
    loadTiposInstitutos();
    loadCiudades();
    loadSucursales();
    console.log("Valor de institutoIdInput en useEffect: ", institutoIdInput);
    editInstituto(institutoIdInput);
  }, []);

  

  const loadInstitutos = () => {
    axios.get("http://localhost:3001/instituto/lista")
      .then((response) => {
        setInstitutos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los institutos:", error);
      });
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
    console.log("ID a buscar:", institutoId);
    console.log("Lista de institutos:", institutos);

    const institutoToEdit = institutos.find((instituto) => instituto.cue === institutoId);
    
    if (institutoToEdit) {
      console.log("Instituto encontrado:", institutoToEdit);
      setSelectedInstituto(institutoToEdit);
      setNewEe(institutoToEdit.ee);
      setNewDenominacion(institutoToEdit.denominacion);
      setNewCuesede(institutoToEdit.cuesede);
      setTipoInstitutoId(institutoToEdit.tipoinstitutoId);
      setCiudadId(institutoToEdit.CiudadId);
      setSucursalId(institutoToEdit.sucursalId);
    } else {
      Swal.fire("Error", "Instituto no encontrado", "error");
    }
  };

  const handleEditInput = (e) => {
    if (e.key === "Enter") {
      if (institutos.length === 0) {
        Swal.fire("Error", "Los datos de los institutos no se han cargado aún.", "error");
        return;
      }
      editInstituto(institutoIdInput);
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
    console.log("llego al confirmar");
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
        console.log("Instituto editado correctamente");
      })
      .catch((error) => {
        console.error("Error al actualizar el instituto:", error);
      });
  };

  return (
    <div className="bg-sky-800 text-white mt-4 space-y-5 overflow-x-auto py-2 px-4 rounded-md w-full sm:w-[400px] lg:w-[850px] xl:w-[1000px] max-w-screen-lg mx-auto">
      <h2 className="text-lg font-bold text-center py-2">EDITAR INSTITUTO</h2>

      <div className="flex items-center space-x-2">
        <input
          className="border border-gray-300 rounded-md p-2 w-full bg-primary"
          type="text"
          placeholder="Ingrese ID del Instituto"
          value={institutoIdInput}
          onChange={(e) => setInstitutoIdInput(e.target.value)}
          onKeyDown={handleEditInput}
        />
        <button
          className="bg-sky-600 text-white font-bold hover:bg-gray-700 py-2 px-2 rounded"
          onClick={() => editInstituto(institutoIdInput)}
        >
          Editar
        </button>
      </div>

      {selectedInstituto ? (
        <div className="mt-4 rounded-md w-full">
          <label className="block mb-2 text-white">
              EE: 
          <input
                    ref={inputRef}
                    autoFocus={true}
                    className="border border-gray-300 rounded-md p-2 mb-2 w-full bg-primary"
                    type="text"
                    value={newEe}
                    onChange={(e) => setNewEe(e.target.value)}
          />
          </label>
          <label className="block mb-2 text-white">
              Denominación:
          <input
                    ref={inputRef}
                    autoFocus={true}
                    className="border border-gray-300 rounded-md p-2 mb-2 w-full bg-primary"
                    type="text"
                    value={newDenominacion}
                    onChange={(e) => setNewDenominacion(e.target.value)}
          />
          </label>
          <label className="block mb-2 text-white">
              CUE Sede:
              <input
                ref={inputRef}
                autoFocus={true}
                className="border border-gray-300 rounded-md p-2 mb-2 w-full bg-primary"
                type="text"
                value={newCuesede}
                onChange={(e) => setNewCuesede(e.target.value)}
              />
          </label>
          <label htmlFor="tipoinstitutoId" className="block">
              Tipoinstituto:
              <select
                  id="tipoinstitutoId"
                  name="tipoinstitutoId"
                  value={tipoInstitutoId}
                  onChange={(e) => setTipoInstitutoId(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-black"
              >
                  <option value="">Seleccionar Tipo de Instituto</option>
                  {tipoinstitutos.map((tipo) => (
                      <option key={tipo.id} value={tipo.id}>
                          {tipo.descripcion}
                      </option>
                  ))}
              </select>
          </label>
          <label htmlFor="ciudadId" className="block">
              Ciudad:
              <select
                  id="ciudadId"
                  name="ciudadId"
                  value={ciudadId}
                  onChange={(e) => setCiudadId(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-black"
              >
                  <option value="">Seleccionar Ciudad</option>
                  {ciudades.map((ciudad) => (
                      <option key={ciudad.id} value={ciudad.id}>
                          {ciudad.nombre}
                      </option>
                  ))}
              </select>
          </label>
          <label htmlFor="sucursalId" className="block">
                Sucursal:
                <select
                    id="sucursalId"
                    name="sucursalId"
                    value={sucursalId}
                    onChange={(e) => setSucursalId(e.target.value)}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-black"
                >
                    <option value="">Seleccionar Sucursal</option>
                    {sucursales.map((sucursal) => (
                        <option key={sucursal.id} value={sucursal.id}>
                            {sucursal.descripcion}
                        </option>
                    ))}
                </select>
            </label>


          <div className="flex items-center space-x-2 justify-center">
            <button
              className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
              onClick={confirmEdit}
            >
              Guardar
            </button>
            <button
              className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
              onClick={cancelEdit}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2 text-center">
            Seleccione un Instituto para editar
          </h3>
        </div>
      )}
    </div>
  );
}

export default EditarInstituto;
