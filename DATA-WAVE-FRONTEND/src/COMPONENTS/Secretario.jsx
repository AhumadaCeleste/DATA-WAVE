import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RolContext } from '../CONTEXT/RolContext';
import logo from '../IMAGES/Logo Data-wave.png';
import bgImage from '../IMAGES/bg.Data-Wave.png';
import OfertaMatricula from './CargarMatricula'; // Importa el componente CargarMatricula

const Secretario = () => {
    const rol = useContext(RolContext);
    const navigate = useNavigate();
    const [institutosMenuOpen, setInstitutosMenuOpen] = useState(false);
    const [reportesMenuOpen, setReportesMenuOpen] = useState(false);
    const [matriculaMenuOpen, setMatriculaMenuOpen] = useState(false);
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
    const [mainComponent, setMainComponent] = useState(null);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcomeMessage(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const toggleInstitutosMenu = () => {
        setInstitutosMenuOpen(!institutosMenuOpen);
        setReportesMenuOpen(false);
        setMatriculaMenuOpen(false);
    };

    const toggleReportesMenu = () => {
        setReportesMenuOpen(!reportesMenuOpen);
        setInstitutosMenuOpen(false);
        setMatriculaMenuOpen(false);
    };

    const toggleMatriculaMenu = () => {
        setMatriculaMenuOpen(!matriculaMenuOpen);
        setInstitutosMenuOpen(false);
        setReportesMenuOpen(false);
    };

    const handleLogout = () => {
        setShowLogoutConfirm(true);
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    const logout = () => {
        localStorage.clear();
        navigate("/");
        setShowLogoutConfirm(false);
    };

    const handleMatriculaClick = () => {
        setMainComponent(<OfertaMatricula />);
    };

    return (
        <div className="flex min-h-screen">
            <div className="flex-none w-1/5 bg-gray-800 p-4 flex flex-col items-center min-h-screen">
                <div className="bg-gray-800 rounded-full p-1 shadow-md mb-4">
                    <img
                        src={logo}
                        alt="Data Wave Logo"
                        className="h-15 w-28 object-cover rounded-full border-4 border-gray-400 sm:h-25 sm:w-25"
                    />
                </div>
                <div className="flex flex-col items-center flex-1">
                    <button
                        onClick={toggleReportesMenu}
                        className="bg-sky-800 hover:bg-gray-700 text-white font-bold py-3 px-2 rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4 sm:text-sm md:text-base lg:text-lg xl:text-xl"
                    >
                        REPORTES
                    </button>
                    {reportesMenuOpen && (
                        <div className="bg-sky-600 text-white font-bold rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4 ">
                            <Link
                                to="/instituto/lista/"
                                className="block px-4 py-2 text-sm hover:bg-gray-700"
                            >
                                LISTADO DE INSTITUTOS
                            </Link>
                            <Link
                                to="/secretario"
                                className="block px-4 py-2 text-sm hover:bg-gray-700"
                            >
                                EGRESADOS
                            </Link>
                        </div>
                    )}
                    <button
                        onClick={toggleMatriculaMenu}
                        className="bg-sky-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4 sm:text-sm md:text-base lg:text-lg xl:text-xl"
                    >
                        MATRICULA
                    </button>
                    {matriculaMenuOpen && (
                        <div className="bg-sky-600 text-white font-bold rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4">
                            <button
                                onClick={handleMatriculaClick}
                                className="block px-4 py-2 text-sm hover:bg-gray-700 w-full"
                            >
                                CARGAR MATRICULA
                            </button>
                            <button
                                onClick={handleMatriculaClick}
                                className="block px-4 py-2 text-sm hover:bg-gray-700 w-full"
                            >
                                EGRESADOS
                            </button>
                        </div>
                    )}
                     <button
                        onClick={handleLogout}
                        className="bg-sky-800 hover:bg-gray-700 text-white font-bold py-3 px-2 rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4 sm:text-sm md:text-base lg:text-lg xl:text-xl"
                    >
                        CERRAR SESIÓN
                    </button>
                    {showLogoutConfirm && (
                        <div className="bg-sky-600 text-white font-bold rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4 sm:text-sm md:text-base lg:text-lg xl:text-xl">
                            <button
                                className="bg-sky-400 block px-4 py-2 text-sm hover:bg-gray-700 w-full text-white font-bold rounded-t focus:outline-none focus:shadow-outline sm:text-sm md:text-base lg:text-lg xl:text-xl"
                                onClick={logout}
                            >
                                CONFIRMAR
                            </button>
                            <button
                                className="bg-gray-400 block px-4 py-2 text-sm hover:bg-gray-700 w-full text-white font-bold rounded-b focus:outline-none focus:shadow-outline sm:text-sm md:text-base lg:text-lg xl:text-xl"
                                onClick={cancelLogout}
                            >
                                CANCELAR
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div
                className="flex flex-col justify-center items-center flex-1 bg-gray-300 relative min-h-screen overflow-y-auto sm:text-sm md:text-base lg:text-lg xl:text-xl"
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
                        <p className="font-arial text-4xl font-bold text-blue-700 mb-5 transition-opacity duration-4000 ease-in-out opacity-100">
                            {rol === 'inspector' ? 'Bienvenido Inspector' : 'Bienvenido'}
                        </p>
                    </div>
                )}
                {mainComponent}
            </div>
        </div>
    );
};

export default Secretario;