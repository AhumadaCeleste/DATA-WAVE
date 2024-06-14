import React, { useContext, useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { RolContext } from '../CONTEXT/RolContext';
import logo from '../IMAGES/Logo Data-wave.png';
import bgImage from '../IMAGES/bg.Data-Wave.png';

const Inspector = () => {
    const rol = useContext(RolContext);
    const [institutosMenuOpen, setInstitutosMenuOpen] = useState(false);
    const [ofertasMenuOpen, setOfertasMenuOpen] = useState(false);
    const [consultasMenuOpen, setConsultasMenuOpen] = useState(false);
    const [reportesMenuOpen, setReportesMenuOpen] = useState(false);
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [institutosSubMenuOpen, setInstitutosSubMenuOpen] = useState(false);
const [matriculaEgresadosSubMenuOpen, setMatriculaEgresadosSubMenuOpen] = useState(false);

    const { institutoId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcomeMessage(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const toggleInstitutosMenu = () => {
        setInstitutosMenuOpen(!institutosMenuOpen);
        setOfertasMenuOpen(false);
        setConsultasMenuOpen(false);
        setReportesMenuOpen(false);
    };


    const toggleInstitutosSubMenu = () => {
        setInstitutosSubMenuOpen(!institutosSubMenuOpen);
        setMatriculaEgresadosSubMenuOpen(false);
    };
    
    const toggleMatriculaEgresadosSubMenu = () => {
        setMatriculaEgresadosSubMenuOpen(!matriculaEgresadosSubMenuOpen);
        setInstitutosSubMenuOpen(false);
    };
    const toggleOfertasMenu = () => {
        setOfertasMenuOpen(!ofertasMenuOpen);
        setInstitutosMenuOpen(false);
        setConsultasMenuOpen(false);
        setReportesMenuOpen(false);
    };

    const toggleConsultasMenu = () => {
        setConsultasMenuOpen(!consultasMenuOpen);
        setInstitutosMenuOpen(false);
        setOfertasMenuOpen(false);
        setReportesMenuOpen(false);
    };

    const toggleReportesMenu = () => {
        setReportesMenuOpen(!reportesMenuOpen);
        setInstitutosMenuOpen(false);
        setOfertasMenuOpen(false);
        setConsultasMenuOpen(false);
    };

    const handleLogout = () => {
        setShowLogoutConfirm(true);
    };

    const logout = () => {
        localStorage.clear();
        navigate("/");
        setShowLogoutConfirm(false);
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    return (
        <div className="flex min-h-screen print-container">
        <div className="print-menu flex-none w-1/5 bg-gray-800 p-4 flex flex-col items-center min-h-screen">
          <div className="bg-gray-800 rounded-full p-1 shadow-md mb-4">
                    <img
                        src={logo}
                        alt="Data Wave Logo"
                        className="h-15 w-28 object-cover rounded-full border-4 border-gray-400 sm:h-25 sm:w-25"
                    />
                </div>
                

                <div className="flex flex-col items-center flex-1">

                <button
                        onClick={toggleConsultasMenu}
                        className="no-print bg-sky-800 hover:bg-gray-600 text-white font-bold py-3 px-3 rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4 sm:text-sm md:text-base lg:text-lg xl:text-xl"
                    >
                        CONSULTAS
                    </button>
                    {consultasMenuOpen && (
                        <div className="no-print bg-sky-600 text-white font-bold rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4 sm:text-sm md:text-base lg:text-lg xl:text-xl">
                            <Link
                                to="/inspector/instituto-lista"
                                 className="block px-4 py-2 text-sm hover:bg-gray-600 text-center" // Añade la clase text-center para alinear el texto al centro
>
    INSTITUTO
                            </Link>
                            <Link
                                to="/inspector/consulta-oferta"
                                className="no-print block px-4 py-2 text-sm hover:bg-gray-600"
                            >
                                OFERTAS
                            </Link>
                        </div>
                        
                    )}


                <button
    onClick={toggleInstitutosMenu}
    className="no-print bg-sky-800 hover:bg-gray-600 text-white font-bold py-3 px-2 rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4 sm:text-sm md:text-base lg:text-lg xl:text-xl"
>
    GESTION
</button>
{institutosMenuOpen && (
    <div className="bg-sky-600 text-white font-bold rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4 sm:text-sm md:text-base lg:text-lg xl:text-xl">
        <div>
        <button
        onClick={toggleInstitutosSubMenu}
        className="w-full block px-4 py-2 text-sm hover:bg-gray-600" // Añade la clase text-left para alinear el texto a la izquierda
    >
        INSTITUTO
    </button>
    {institutosSubMenuOpen && (
        <div className="bg-sky-600 text-white sub-menu-link font-bold rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4 sm:text-sm md:text-base lg:text-lg xl:text-xl">
            <Link
        to="/inspector/crear-instituto"
        className="block px-4 py-2 text-sm hover:bg-gray-500 sub-menu-link"
        style={{ fontSize: '0.7rem' }} // Aplica el estilo de tamaño de fuente más pequeño
    >
        CREAR INSTITUTO
                    </Link>
                    <Link
                        to="/inspector/instituto/editar"
                        className="block px-4 py-2 text-sm hover:bg-gray-500 sub-menu-link text-left"
                        style={{ fontSize: '0.7rem' }}
                    >
                        GESTIONAR INSTITUTO
                    </Link>
                    <Link
                        to="inspector/instituto/listaqueryfiltro"
                        className="block px-4 py-2 text-sm hover:bg-gray-500"
                        style={{ fontSize: '0.7rem' }}
                    >
                        INSTITUTO PRUEBA
                    </Link>
                </div>
            )}
        </div>
        <div>
            <button
                onClick={toggleMatriculaEgresadosSubMenu}
                className="w-full block px-4 py-2 text-sm hover:bg-gray-600"
            >
                MATRICULA
            </button>
            {matriculaEgresadosSubMenuOpen && (
                <div className="bg-sky-600 text-white font-bold rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4 sm:text-sm md:text-base lg:text-lg xl:text-xl">
                    <Link
                        to="/inspector/matricula"
                        className="block px-4 py-2 text-sm hover:bg-gray-500"
                        style={{ fontSize: '0.7rem' }}
                    >
                         CARGAR MATRICULA
                    </Link>
                    <Link
                        to="/secretario/matricula"
                        className="block px-4 py-2 text-sm hover:bg-gray-500"
                        style={{ fontSize: '0.7rem' }}
                    >
                         CARGAR EGRESADOS
                    </Link>
                </div>
            )}
        </div>
    </div>
)}

                   

                    <button
                        onClick={toggleReportesMenu}
                        className="no-print bg-sky-800 hover:bg-gray-600 text-white font-bold py-3 px-2 rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4 sm:text-sm md:text-base lg:text-lg xl:text-xl"
                    >
                        REPORTES
                    </button>
                    {reportesMenuOpen && (
                        <div className="bg-sky-600 text-white font-bold rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4 sm:text-sm md:text-base lg:text-lg xl:text-xl">
                            <Link
                                to="/inspector/instituto/oferta-por-instituto"
                                className="block px-4 py-2 text-sm hover:bg-gray-600"
                            >
                                OFERTA POR INSTITUTO
                            </Link>
                            <Link
                                to="/inspector/egresados"
                                className="block px-4 py-2 text-sm hover:bg-gray-600"
                            >
                                EGRESADOS
                            </Link>
                            <Link
                                to="instituto/reporte-instituto-oferta-matricula"
                                className="block px-4 py-2 text-sm hover:bg-gray-600"
                            >
                                MATRÍCULA
                            </Link>
                            <Link
                                to="instituto/reporte-global"
                                className="block px-4 py-2 text-sm hover:bg-gray-600"
                            >
                                GLOBAL
                            </Link>


                        </div>
                    )}

                    <button
                        onClick={handleLogout}
                        className="no-print bg-sky-800 hover:bg-gray-600 text-white font-bold py-3 px-2 rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4 sm:text-sm md:text-base lg:text-lg xl:text-xl"
                    >
                        CERRAR SESION
                    </button>
                    {showLogoutConfirm && (
                        <div className="bg-sky-600 text-white font-bold rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4 sm:text-sm md:text-base lg:text-lg xl:text-xl">
                            <button
                                className=" no-print bg-green-700 block px-4 py-2 text-sm hover:bg-green-600 w-full text-white font-bold rounded-t focus:outline-none focus:shadow-outline sm:text-xs md:text-sm lg:text-base xl:text-lg"
                                onClick={logout}
                            >
                                CONFIRMAR
                            </button>
                            <button
                                className="no-print bg-red-700 block px-4 py-2 text-sm hover:bg-red-600 w-full text-white font-bold rounded-b focus:outline-none focus:shadow-outline sm:text-xs md:text-sm lg:text-base xl:text-lg"
                                onClick={cancelLogout}
                            >
                                CANCELAR
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div
                className="flex flex-col justify-center items-center flex-1 bg-gray-300 relative min-h-screen overflow-y-auto"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                {showWelcomeMessage && (
                    <div className="flex flex-col justify-center items-center h-full">
                        <img
                            src={logo}
                            alt="Data Wave Logo"
                            className="h-48 w-auto rounded-full border-4 border-gray-400 mb-5"
                        />
                        <p className="font-arial text-4xl font-bold text-gray-700 mb-5 transition-opacity duration-4000 ease-in-out opacity-100">
                            {rol === 'inspector' ? 'Bienvenido Inspector' : 'Bienvenido'}
                        </p>
                    </div>
                )}
                <Outlet />
            </div>
        </div>
    );
};

export default Inspector;