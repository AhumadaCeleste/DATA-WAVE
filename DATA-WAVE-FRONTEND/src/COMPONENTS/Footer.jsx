import React from 'react';
import facebook from "../IMAGES/faceboock.jpg";
import instagram from "../IMAGES/instagram.png";
import youtube from "../IMAGES/youtube.png";


    const Footer = () => {
        return (
            <div className='bg-sky-900 mb-0'>
                <hr/>
                <div className="">
                    <div className="col">
                        <div className="container text-white p-2">
                            <hr/>
                            <div className="row">
                                <div className="col-md-6">
                                    <p>TM © 2024 Data-Wave Corporation. Todos los derechos reservados.</p>
                                </div>
                                <div className="col-md-6 text-end">
                                    <img src={facebook} width="24" alt="Facebook" className="d-inline m-2"/>
                                    <img src={instagram} width="24" alt="Instagram" className="d-inline m-2"/>
                                    <img src={youtube} width="24" alt="Youtube" className="d-inline m-2"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    export default Footer;