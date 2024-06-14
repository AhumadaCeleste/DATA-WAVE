import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function AdminEditDepartamento(props) {
    const [departamento, setDepartamento] = useState([]);
    const [selectedDepartamento, setSelectedDepartamento] = useState(null);
    const [newDepartamentoName, setNewDepartamentoName] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredDepartamento, setFilteredDepartamento] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
        loadDepartamento();
    }, []);

    const loadDepartamento = (isSearch = false) => {
        if (!isSearch) {
            axios
                .get("http://localhost:3001/departamento/lista")
                .then((response) => {
                    setDepartamento(response.data);
                    setFilteredDepartamento(response.data);
                })
                .catch((error) => {
                    console.error("Error al obtener la lista de departamento:", error);
                });
        } else {
            const search = document
                .getElementById("searchQuery")
                .value;
            const filtered = departamento.filter(
                (departamento) => departamento.nombre.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredDepartamento(filtered);
        }
    };

    const editDepartamento = (departamentoId) => {
        const departamentoToEdit = departamento.find(
            (departamento) => departamento.id === departamentoId
        );
        if (departamentoToEdit) {
            setSelectedDepartamento(departamentoToEdit);
            setNewDepartamentoName(departamentoToEdit.nombre);
        }
    };

    const cancelEdit = () => {
        setSelectedDepartamento(null);
        setNewDepartamentoName("");
    };

    const confirmEdit = () => {
        axios
            .put(
                `http://localhost:3001/departamento/actualizar/${selectedDepartamento.id}`,
                {nombre: newDepartamentoName}
            )
            .then((response) => {
                setSelectedDepartamento(null);
                setNewDepartamentoName("");
                loadDepartamento();
            })
            .catch((error) => {
                console.error("Error al actualizar el Departamento:", error);
            });
        console.log(
            "Departamento editado",
            "El Departamento ha sido editado correctamente",
            "success"
        );
    }

    const deleteDepartamento = (departamentoId) => {
        axios
            .delete(`http://localhost:3001/departamento/eliminar/${departamentoId}`)
            .then((response) => {
                loadDepartamento();
                setSelectedDepartamento(null);
                setNewDepartamentoName("");
                console.log(
                    "Departamento eliminado",
                    "El departamento ha sido eliminado correctamente",
                    "success"
                );
            })
            .catch((error) => {
                console.error("Error al eliminar el Departamento:", error);
            });
    };

    return (

        <div className="relative mt-10 md:mt-28 h-screen/1 overflow-hidden p-12">
            <div className="md:mt-">
                <video autoPlay="autoPlay" muted="muted" loop="loop" id="bgVideo">
                    <source src="/videos/DATA-WAVE.mp4" type="video/mp4"/>
                    Tu navegador no soporta videos HTML5.
                </video>
                <h2 className="w-full text-left text-xl font-bold text-primary mb-4 mt-4">Edición de Departamento
                </h2>

                <input
                    id="searchQuery"
                    className="block mb-2  rounded-md p-2 w-full "
                    type="text"
                    placeholder="Buscar departamento"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        loadDepartamento(true);
                    }}/> {
                    selectedDepartamento
                        ? (
                            <div>
                                <h3 className="bg-primary text-xl text-primary font-bold cursor-pointer">
                                    Editar Departamento: {selectedDepartamento.nombre}
                                </h3>
                                <input
                                    id="inputRef"
                                    ref={inputRef}
                                    autoFocus={true}
                                    className="block mb-2  rounded-md p-2 w-full"
                                    type="text"
                                    value={newDepartamentoName}
                                    onChange={(e) => setNewDepartamentoName(e.target.value)}/>
                                <button
                                    className="bg-primary text-white cursor-pointer p-3 m-2 rounded-md max-w-xs my-custom-button"
                                    onClick={confirmEdit}>
                                    Confirmar
                                </button>
                                <button
                                    className="bg-primary text-white cursor-pointer p-3 m-2 rounded-md max-w-xs my-custom-button"
                                    onClick={cancelEdit}>
                                    Cancelar
                                </button>
                            </div>
                        )
                        : null
                }
                <ul>
                    {
                        filteredDepartamento.map((departamento) => (
                            <div className="flex" key={departamento.id}>
                                <input
                                    key={departamento.id}
                                    className="text-center align-middle border-primary max-w-sm border-2 rounded-md p-3 m-2"
                                    readOnly={true}
                                    type="text"
                                    value={departamento.nombre}/>
                                <button
                                    className="bg-primary text-white cursor-pointer p-3 m-2 rounded-md max-w-xs my-custom-button"
                                    onClick={() => editDepartamento(departamento.id)}>
                                    Editar
                                </button>
                                <button
                                    className="bg-primary text-white cursor-pointer p-3 m-2 rounded-md max-w-xs my-custom-button"
                                    onClick={() => deleteDepartamento(departamento.id)}>
                                    Eliminar
                                </button>

                            </div>

                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default AdminEditDepartamento;