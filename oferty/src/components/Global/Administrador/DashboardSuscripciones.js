import React, { Component } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import { Link } from 'react-router-dom';
import Menu from './Components/Menu';

//Importar imagenes
import Icono from '../../Global/images/admin/Figura9.png';
import Icono2 from '../../Global/images/admin/Figura10.png';
import Icono3 from '../../Global/images/admin/Figura20.png';
import Footer from './Components/Footer';

class DashboardSuscripciones extends Component{

    render(){  
        return(

            <div id="admin" className="admin theme-white">
                <Menu></Menu>

                <div className="main-content">
                    <section className="section">
                        <div className="row">

                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="card">
                                    <Link to="/Administrador-SolicitudPublicacion">
                                        <div className="card-statistic-4">
                                            <div className="align-items-center justify-content-between">
                                                <div className="row ">
                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                                                        <div className="card-content">
                                                            <h5 className="font-15">Suscripciones</h5>
                                                            <h2 className="mb-3 font-18">Solicitud de Publicaciones</h2>
                                                            <p className="mb-0">Gestionar</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                                                        <div className="banner-img">
                                                            <img src={Icono} alt="Icono Promo"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>


                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="card">
                                    <Link to="/Administrador-ListaSuscriptor">
                                        <div className="card-statistic-4">
                                            <div className="align-items-center justify-content-between">

                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                                                        <div className="card-content">
                                                            <h5 className="font-15">Suscripciones</h5>
                                                            <h2 className="mb-3 font-18">Lista de Afiliados Oferty</h2>
                                                            <p className="mb-0">Gestionar</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                                                        <div className="banner-img">
                                                            <img src={Icono2} alt="Icono tiendas"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="card">
                                    <Link to="/Administrador-SolicitudCancelacion">
                                        <div className="card-statistic-4">
                                            <div className="align-items-center justify-content-between">

                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                                                        <div className="card-content">
                                                            <h5 className="font-15">Suscripciones</h5>
                                                            <h2 className="mb-3 font-18">Solicitud de Cancelacion de Cupones</h2>
                                                            <p className="mb-0">Gestionar</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                                                        <div className="banner-img">
                                                            <img src={Icono3} alt="Icono tiendas"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </section>
                </div>
                <Footer></Footer>
            </div>
                
        ) 
    }           


}

export default DashboardSuscripciones;