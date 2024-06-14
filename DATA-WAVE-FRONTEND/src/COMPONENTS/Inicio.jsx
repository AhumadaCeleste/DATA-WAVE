import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {loginUser} from "../SERVICE/Usuariologin.service";
import backgroundImage from "../IMAGES/Equipo.jpg";
import logo from "../IMAGES/Logo Data-wave.png";
import logo1 from "../IMAGES/LogoTrainingAndDevelopment.jpg";
import logo2 from "../IMAGES/LogoUniversityOfTexas.jpg";
import logo3 from "../IMAGES/LogoWashingtonStateUniversity.jpg";
import logo4 from "../IMAGES/LogoWiseOwl.jpg";
import logo5 from "../IMAGES/LogoAcademy.png";

const Inicio = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [, setSiglaRol] = useState(0);

    const handleLogin = async () => {
        try {
            const dni = document
                .getElementById('dni')
                .value;
            const password = document
                .getElementById('password')
                .value;
            const res = await loginUser(dni, password);
            console.log("res.idrol:", res.usuario.idrol);
            if (res) {
                setSiglaRol(res.usuario.idrol);
            } else {
                alert("DNI o contraseña incorrecta");
            }
            if (res.usuario.idrol === 1) {
                console.log("******* inspector");
                navigate("/inspector");
            } else if (res.usuario.idrol === 2) {
                console.log("******* director");
                navigate("/director");
            } else if (res.usuario.idrol === 3) {
                console.log("******* secretario");
                navigate("/secretario");
            }
        } catch (error) {
            setError('DNI o contraseña incorrectos');
        }
    };

    return (
        <div className="bg-gray-800">
            <img
                src={logo}
                alt="Data Wave Logo"
                style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    height: "115px",
                    width: "auto",
                    borderRadius: "50%",
                    zIndex: "1000"
                }}/>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div
                        className="col-md-12 d-flex justify-content-end align-items-center"
                        style={{
                            backgroundImage: `url(${backgroundImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            padding: "50px",
                            borderRadius: "10px",
                            height: "500px"
                        }}>
                        <div
                            className="bg-color shadow-md rounded px-10 pt-6 pb-8 mb-8 mt-5"
                            style={{
                                maxWidth: "600px"
                            }}>
                            <div className="mb-4">
                                <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                                    Usuario
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="dni"
                                    type="text"
                                    placeholder="D.N.I"/>
                            </div>
                            <div className="mb-6">
                                <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                                Contraseña
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="******************"
                                />
                            </div>
                            {error && (
                                <div className="mb-4 text-red-500 text-sm">
                                    {error}
                                </div>
                            )}
                            <div className="flex flex-row justify-between p-1">
                                <button
                                    className="bg-sky-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                                    type="button"
                                    onClick={handleLogin}
                                >
                                    Iniciar sesión
                                </button>
                                <button
                                    className="bg-sky-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                                    type="button"
                                >
                                    Solicitar Usuario
                                </button>
                            </div>
                            <br />
                            <br />
                            <div className="mt-4">
                                <a
                                    className="inline-block align-baseline font-bold text-sm text-white hover:text-blue-800"
                                    href="datawave.com"
                                >
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="p-8 bg-color shadow-md rounded text-white text-sm text-center">
                    <div className="bg-gray-600 rounded">
                    <p
                            className="ml-2 font-bold text-lg text-gray-300 p-6 font-serif tracking-widest shadow-lg animate-fadeInMoveUp"
                            style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: '17px',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                            }}
                        >
                            Bienvenido a Data Wave! La plataforma integral de gestión educativa diseñada para transformar la manera en que las instituciones educativas administran y analizan sus datos. Con una interfaz intuitiva y poderosas herramientas analíticas, Data Wave permite la tomar decisiones informadas y estratégicas para mejorar el rendimiento estudiantil y la eficiencia operativa.
                        </p>
                    </div>
            
                </div>

                <div className="row mb-4">
                    <div className="col-md-4">
                        <div className="p-2 text-gray-300 text-xl">
                            <div className="flex items-center mb-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="45"
                                    height="45"
                                    fill="currentColor"
                                    className="bi bi-file-earmark-text"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                                    <path
                                        d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z"/>
                                </svg>
                                <h1 className="font-bold ml-2 text-2xl text-gray-200">Reportes Personalizados</h1>
                            </div>
                            <p className="text-gray-300 font-bold text-base">
                                Data-Wave genera informes detallados y personalizados para analizar la
                                eficiencia y el rendimiento de las prestaciones educativas, optimizando los
                                recursos y la asistencia, así como otros aspectos clave de las instituciones
                                educativas. Con nuestra herramienta de reportes, puedes visualizar datos de
                                manera efectiva y tomar decisiones fundamentadas para mejorar la calidad
                                educativa.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="p-2 text-gray-200 text-xl">
                            <div className="flex items-center mb-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="45"
                                    height="45"
                                    fill="currentColor"
                                    className="bi bi-person-workspace"
                                    viewBox="0 0 16 16">
                                    <path
                                        fillRule="evenodd"
                                        d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                                    <path
                                        fillRule="evenodd"
                                        d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.4 5.4 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z"/>
                                </svg>
                                <h1 className="font-bold ml-2 text-2xl text-gray-200">Acceso desde la Nube</h1>
                            </div>
                            <p className="text-gray-300 font-bold text-base">
                                Accede a tus datos en cualquier momento y lugar con Data Wave. Nuestra
                                plataforma te permite acceder de forma segura y conveniente a la información de
                                tu institución educativa desde la nube. Con esta capacidad, puedes gestionar y
                                analizar la información eficientemente, sin importar tu ubicación. Descubre cómo
                                el acceso desde la nube en Data Wave puede mejorar la flexibilidad y
                                accesibilidad de tus datos. Únete a nosotros y experimenta la conveniencia de
                                acceder a tus datos desde cualquier lugar.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-2 text-gray-200 text-xl">
                            <div className="flex items-center mb-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="45"
                                    height="45"
                                    fill="currentColor"
                                    className="bi bi-cloud-arrow-down"
                                    viewBox="0 0 16 16">
                                    <path
                                        fillRule="evenodd"
                                        d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708z"/>
                                    <path
                                        d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
                                </svg>
                                <h1 className="font-bold ml-2 text-2xl text-gray-200">Carga de Datos Segura</h1>
                            </div>
                            <p className="text-gray-300 font-bold text-base">
                                En Data Wave, la seguridad de tus datos es nuestra prioridad. Garantizamos una
                                carga segura y fiable, protegiendo la información sensible de tu institución
                                educativa. Utilizamos tecnologías de seguridad avanzadas, incluyendo cifrado y
                                autenticación, para asegurar la integridad de tus datos en todo momento. Con
                                Data Wave, tus datos están protegidos contra amenazas externas y se mantienen
                                confidenciales. Únete a nosotros y experimenta la tranquilidad de saber que tus
                                datos están seguros.
                            </p>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>
            <div
                className="mb-4 d-flex justify-content-center align-items-center flex-wrap bg-gray-300">
                <h1 className="p-2 text-gray-800 font-bold ml-2 text-lg">NUESTROS CLIENTES</h1>
                <div
                    className="d-flex justify-content-around align-items-center flex-wrap w-100">
                    <img
                        src={logo1}
                        width="120"
                        alt="Logo University of Bridgewater"
                        className="m-2"
                        style={{
                            borderRadius: "5px"
                        }}/>
                    <img
                        src={logo2}
                        width="120"
                        alt="Logo University of Texas"
                        className="m-2"
                        style={{
                            borderRadius: "90px"
                        }}/>
                    <img
                        src={logo3}
                        width="200"
                        alt="Logo University of Washington"
                        className="m-2"
                        style={{
                            borderRadius: "5px"
                        }}/>
                    <img
                        src={logo4}
                        width="130"
                        alt="Logo University of WiseOwl"
                        className="m-2"
                        style={{
                            borderRadius: "5px"
                        }}/>
                    <img
                        src={logo5}
                        width="120"
                        alt="Logo University of Academy"
                        className="m-4"
                        style={{
                            borderRadius: "5px"
                        }}/>
                </div>
            </div>
            <div class="bg-gray-200 font-bold p-4">
                <div class="card-body">
                    <p class="card-text">
                        <p>
                            <h1 class=" font-bold mb-2">PORQUE NOS ELIGEN</h1>
                            Por nuestra dedicación a la
                            excelencia en la gestión educativa. Nuestra plataforma ofrece soluciones
                            innovadoras y fiables que ayudan a las instituciones educativas a mejorar su
                            eficiencia y rendimiento.
                        </p>
                        <p>
                            Nuestros clientes valoran especialmente nuestra capacidad para proporcionar
                            informes detallados y personalizados, así como para garantizar la seguridad y
                            confidencialidad de sus datos. Además, nuestro enfoque en la accesibilidad y
                            facilidad de uso nos ha convertido en la opción preferida para instituciones
                            educativas de todo el mundo.
                        </p>
                        <p>
                            Descubre por qué tantas instituciones educativas eligen Data Wave para gestionar
                            sus datos y mejorar sus procesos educativos.
                        </p>
                    </p>
                    <div className="row">
                        <div className="col-md-12 d-flex justify-content-center">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Inicio;