import React, { useState, useEffect } from 'react';
import { getAllInstitutos } from '../SERVICE/InstitutoList.service';  // Asegúrate de ajustar el path según la estructura de tu proyecto

const InstitutoTipo = () => {
  const [institutos, setInstitutos] = useState([]);
  const [filteredInstitutos, setFilteredInstitutos] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    async function fetchData() {
      const data = await getAllInstitutos();
      setInstitutos(data);
      setFilteredInstitutos(data);
    }
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value
    };
    setFilters(newFilters);

    // Filtrar los institutos en el frontend
    const filteredData = institutos.filter(instituto => {
      return Object.keys(newFilters).every(key => {
        return instituto[key].toString().toLowerCase().includes(newFilters[key].toLowerCase());
      });
    });
    setFilteredInstitutos(filteredData);
  };

  return (
    <div>
      <input type="text" name="cue" onChange={handleFilterChange} placeholder="Buscar por CUE" />
      <input type="text" name="ee" onChange={handleFilterChange} placeholder="Buscar por EE" />
      {/* Añadir más filtros según sea necesario */}
      <div>
        {filteredInstitutos.map(instituto => (
          <div key={instituto.cue}>
            <h3>{instituto.ee}</h3>
            <p>{instituto.tipo_instituto}</p>
            <p>{instituto.ciudad}</p>
            <p>{instituto.sucursal}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstitutoTipo;