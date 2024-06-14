import React, {useContext, useState, useEffect} from 'react';
import {Link, Outlet, Navigate} from 'react-router-dom';
import {RolContext} from '../CONTEXT/RolContext';
import logo from '../IMAGES/Logo Data-wave.png';
import bgImage from '../IMAGES/bg.Data-Wave.png';

const Inspector = () => {
    const rol = useContext(RolContext);
    const [institutosMenuOpen, setInstitutosMenuOpen] = useState(false);
    const [ofertasMenuOpen, setOfertasMenuOpen] = useState(false);
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcomeMessage(false);
        }, 2000); // Tiempo de duracion del mensaje

        return() => clearTimeout(timer);
    }, []);

    const toggleInstitutosMenu = () => {
        setInstitutosMenuOpen(!institutosMenuOpen);
    };

    const toggleOfertasMenu = () => {
        setOfertasMenuOpen(!ofertasMenuOpen);
    };

    const [reportesMenuOpen, setReportesMenuOpen] = useState(false);

    const toggleReportesMenu = () => {
        setReportesMenuOpen(!reportesMenuOpen);
    };

    const handleLogout = () => {
        setShowLogoutConfirm(true);
    };

    const logout = () => {
        localStorage.clear();
        Navigate("/"); // Suponiendo que "/" es la ruta de inicio de sesión
        setShowLogoutConfirm(false);
    };

    return (
        <div className="flex h-screen">
            <div
                className="flex-none w-1/5 bg-gray-800 p-4 flex flex-col items-center justify-start h-screen">
                <div className="bg-gray-800 rounded-full p-1 shadow-md mb-4">
                    <img
                        src={logo}
                        alt="Data Wave Logo"
                        className="h-28 rounded-full border-4 border-gray-400"/>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <button
                        onClick={toggleInstitutosMenu}
                        className="bg-sky-800 hover:bg-blue-700 text-white font-bold py-3 px-2 rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4">
                        INSTITUTOS
                    </button>
                    {
                        institutosMenuOpen && (
                            <div
                                className="bg-sky-600 text-white font-bold rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4">
                                <Link
                                    to="/instituto-lista"
                                    className="block px-4 py-2 text-sm hover:bg-gray-700">LISTADO DE INSTITUTOS</Link>
                                <Link
                                    to="/inspector/editar-instituto"
                                    className="block px-4 py-2 text-sm hover:bg-gray-700">INSTITUTOS POR DEPARTAMENTO</Link>
                                <Link
                                    to="/inspector/editar-instituto"
                                    className="block px-4 py-2 text-sm hover:bg-gray-700">INSTITUTOS POR CIUDAD
                                </Link>
                            </div>

                        )
                    }

                    <button
                        onClick={toggleOfertasMenu}
                        className="bg-sky-800 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4">
                        OFERTAS
                    </button>
                    {
                        ofertasMenuOpen && (
                            <div
                                className="bg-sky-600 text-white font-bold rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4">
                                <Link to="/" className="block px-4 py-2 text-sm hover:bg-gray-700">CONSULTAR OFERTAS</Link>

                                <Link to="/" className="block px-4 py-2 text-sm hover:bg-gray-700">OFERTAS POR SECTOR SOCIOPRODUCTIVO</Link>
                            </div>
                        )
                    }

                    <button
                        onClick={toggleReportesMenu}
                        className="bg-sky-800 hover:bg-blue-700 text-white font-bold py-3 px-2 rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4">
                        REPORTES
                    </button>
                    {
                        reportesMenuOpen && (
                            <div
                                className="bg-sky-600 text-white font-bold rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4">
                                <Link
                                    to="/inspector/instituto-lista"
                                    className="block px-4 py-2 text-sm hover:bg-gray-700">MATRICULAS</Link>
                                <Link
                                    to="/Director/consulta-matricula"
                                    className="block px-4 py-2 text-sm hover:bg-gray-700">EGRESADOS</Link>
                                <Link
                                    to="//consulta-egresados"
                                    className="block px-4 py-2 text-sm hover:bg-gray-700">EGRESADOS</Link>
                            </div>
                        )
                    }

                    <button
                        className="bg-sky-800 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline text-center block w-full"
                        type="button"
                        onClick={handleLogout}>
                        CERRAR SESION
                    </button>
                </div>
            </div>

            {
                showLogoutConfirm && (
                    <div className="bg-primary py-16 px-16 rounded-md w-auto m-8">
                        <button
                            className="border-2 bg- rounded-lg border-gray-300 py-3 titulo_tarjetas m-4 hover:bg-sky-700 text-sm md:text-base"
                            onClick={logout}>
                            ¿Confirmas el cierre de sesión?
                        </button>
                    </div>
                )
            }

            <div
                className="flex flex-col justify-center items-center flex-1 bg-gray-300 relative"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}>
                {
                    showWelcomeMessage && (
                        <div className="flex flex-col justify-center items-center h-full">
                            <img
                                src={logo}
                                alt="Data Wave Logo"
                                className="h-48 w-auto rounded-full border-4 border-gray-400 mb-5"/>
                            <p
                                className="font-arial text-4xl font-bold text-blue-700 mb-5 transition-opacity duration-4000 ease-in-out opacity-100">
                                {
                                    rol === 'inspector'
                                        ? 'Bienvenido Inspector'
                                        : 'Bienvenido'
                                }
                            </p>
                        </div>
                    )
                }
                <Outlet/>
            </div>
        </div>
    );
};

export default Inspector;