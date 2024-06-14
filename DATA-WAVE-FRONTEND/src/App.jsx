import {Routes, Route} from 'react-router-dom';
import './App.css';

import Inicio from './COMPONENTS/Inicio';
import Footer from './COMPONENTS/Footer';
// Rol Secretario
import Secretario from './COMPONENTS/Secretario';
import CargarMatricula from './COMPONENTS/CargarMatricula';
import AltaOferta from './COMPONENTS/AltaOferta';
import BMOferta from './COMPONENTS/BMOferta';
// Rol Inspector
import Inspector from './COMPONENTS/Inspector';
import CrearInstituto from './COMPONENTS/CrearInstituto';
import BMInstituto from './COMPONENTS/BMInstituto';
import EditarInstituto from './COMPONENTS/EditarInstituto';
import Adepartamento from './COMPONENTS/Adepartamento';
import OfertaList from "./COMPONENTS/OfertaList";
import OfertaPorInstitutoList from "./COMPONENTS/OfertaXInstituto";
import InstitutoTipo from "./COMPONENTS/InstitutoTipo";
import Egresados from "./COMPONENTS/Egresados"
import ReporteInstOfMatricula from "./COMPONENTS/ReporteInstOfMatricula";
import ReporteGlobal from "./COMPONENTS/ReporteGlobal";

// Rol Director
import Director from './COMPONENTS/Director';
import InstList from './COMPONENTS/InstList';
import ConsultaMatricula from './COMPONENTS/ConsultaMatricula';
import ConsultaEgresados from './COMPONENTS/ConsultaEgresados';

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <Routes>
                    <Route path="/" element={<Inicio />}/> {/* Rol Secretario */}
                    <Route path="/secretario" element={<Secretario />}/> {/*<Route path="/cargar-matricula" element={<CargarMatricula />}/> */}
                    <Route path="/crear-oferta" element={<AltaOferta />}/>
                    <Route path="/gestionar-oferta" element={<BMOferta />}/> {/* Rol Inspector */}
                    <Route path="/inspector" element={<Inspector />}>
                        <Route path="crear-instituto" element={<CrearInstituto />}/>
                        <Route path="editar-instituto/:id" element={<EditarInstituto />}/>
                        <Route path="editar-instituto" element={<EditarInstituto />}/>
                        <Route path="matricula" element={<CargarMatricula />}/>
                        <Route path="instituto/nuevo" element={<CrearInstituto />}/>
                        <Route path="instituto/editar" element={<BMInstituto />}/>
                        <Route path="departamento/nuevo" element={<Adepartamento />}/>
                        <Route path="departamento/actualizar" element={<Adepartamento />}/>
                        <Route path="instituto-lista" element={<InstList />}/>
                        <Route path="/inspector/consulta-oferta" element={<OfertaList />}/>
                        <Route path="instituto/oferta-por-instituto"element={<OfertaPorInstitutoList />}/>
                        <Route path="instituto/reporte-instituto-oferta-matricula"element={<ReporteInstOfMatricula/>}/>
                        <Route path="instituto/listaqueryfiltro" element={<InstitutoTipo />}/>
                        <Route path="crear-oferta" element={<AltaOferta />}/>
                        <Route path="gestionar-oferta" element={<BMOferta />}/>
                        <Route path="egresados" element={<Egresados />}/>
                        <Route path="instituto/reporte-global" element={<ReporteGlobal />}/>
                      
                    </Route>
                    {/* Rol Director */}
                    <Route path="/director" element={<Director />}/>
                    <Route path="/consulta-matricula" element={<ConsultaMatricula />}/>
                    <Route path="/consulta-egresados" element={<ConsultaEgresados />}/>
                    <Route path="/instituto-lista" element={<InstList />}/> 
                    <Route path="*" element={<div> 404 - Página no encontrada</div>}/>
                </Routes>
                <Footer/>
            </div>
        </div>
    );
}

export default App;