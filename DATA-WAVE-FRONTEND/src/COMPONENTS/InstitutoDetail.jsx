import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

const InstitutoDetail = ({ institutos }) => {
  const { tipo } = useParams();
  const navigate = useNavigate();

  const filteredInstitutes = institutos.filter(instituto => instituto.tipo_instituto === tipo);

  return (
    <div className="text-white font-bold bg-gray-700 rounded p-10 relative mb-5">
      <h3>DETALLES DE INSTITUTOS {tipo.toUpperCase()}</h3>
      <hr className="my-8 border-t-2 border-white" />
      <div>
        {filteredInstitutes.map((instituto, index) => (
          <div key={index}>
            <p className="my-2"><strong>-</strong> {instituto.denominacion}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate(-1)}
        className="p-2 bg-gray-400 text-white rounded absolute bottom-4 right-4 flex items-center"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Regresar
      </button>
    </div>
  );
};

export default InstitutoDetail;
