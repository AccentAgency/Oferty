import React, { Component } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import { Link } from 'react-router-dom';
import Menu from './Components/Menu';
import Footer from './Components/Footer';

//Importar imagenes
import Icono from '../../Global/images/admin/Figura1.png';
import Icono3 from '../../Global/images/admin/Figura3.png';
import Icono4 from '../../Global/images/admin/Figura12.png';
import Icono5 from '../../Global/images/admin/Figura22.png';

class DashboardCupones extends Component{

    render(){  
        return(

            <div id="admin" className="admin theme-white">
                <Menu></Menu>

                <div className="main-content">
                    <section className="section">
                        <div className="row">

                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="card">
                                    <Link to="/Administrador-CuponSemana">
                                        <div className="card-statistic-4">
                                            <div className="align-items-center justify-content-between">
                                                <div className="row ">
                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                                                        <div className="card-content">
                                                            <h5 className="font-15">Cupones</h5>
                                                            <h2 className="mb-3 font-18">De la Semana</h2>
                                                            <p className="mb-0">Agregar y/o Modificar</p>
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
                                    <Link to="/Administrador-CuponDestacado">
                                        <div className="card-statistic-4">
                                            <div className="align-items-center justify-content-between">

                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                                                        <div className="card-content">
                                                            <h5 className="font-15">Cupones</h5>
                                                            <h2 className="mb-3 font-18">Destacados</h2>
                                                            <p className="mb-0">Agregar y/o Modificar</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                                                        <div className="banner-img">
                                                            <img src={Icono4} alt="Icono tiendas"/>
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
                                    <Link to="/Administrador-CuponVip">
                                        <div className="card-statistic-4">
                                            <div className="align-items-center justify-content-between">

                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                                                        <div className="card-content">
                                                            <h5 className="font-15">Página Dorada</h5>
                                                            <h2 className="mb-3 font-18">Cupones VIP</h2>
                                                            <p className="mb-0">Agregar y/o Modificar</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                                                        <div className="banner-img">
                                                            <img src={Icono5} alt="Icono tiendas"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 card-coupons">
                                <div className="card">
                                    <span id="Notification_cupon" className="badge headerBadge1">
                                    6 </span>

                                    <Link to="/Administrador-Cupones">
                                        <div className="card-statistic-4">
                                            <div className="align-items-center justify-content-between">
                                                <div className="row ">
                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                                                        <div className="card-content">
                                                            <h5 className="font-15">Nuevo</h5>
                                                            <h2 className="mb-3 font-18">Agregar nuevo cupón</h2>
                                                            <p className="mb-0">Agregar y/o Modificar</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                                                        <div className="banner-img">
                                                            <img src={Icono3} alt="Icono Cupon"/>
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

export default DashboardCupones;