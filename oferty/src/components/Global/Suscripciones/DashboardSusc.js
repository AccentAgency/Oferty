import React, { Component } from 'react';

//CSS
import '../css/DashboardSusc.css';

//Configuracion Backend
/*
import axios from "axios";
import Header from '../Header';
*/


import img_ofer from '../images/suscripcion/img_ofer.jpg';
import 'font-awesome/css/font-awesome.min.css';

import Menu from './Components/Menu';
import { Link } from 'react-router-dom';

//Imagenes
import bannerPost from '../images/banner/BannerPublicacion.jpg';
import bannerEst from '../images/banner/BannerEstadistica.jpg';

import Footer from '../Administrador/Components/Footer';

class DashboardSusc extends Component{

    componentDidMount=() =>{
        
    }

    render(){
        return(
            <div id="admin" className="light light-sidebar theme-white">
                <Menu></Menu>
                <div className="main-wrapper main-wrapper-1 admin">

                    <div className="main-content">
                        <div className="row">
                            <div className="col-12 col-md-4 col-lg-3">
                                <div className="card author-box">
                                    <div id="PlanPanel" className="card-body">
                                        <div className="author-box-center">
                                            <img id="img_plan" alt="oferty" src={img_ofer} className="rounded-circle author-box-picture"/>
                                            <div className="clearfix"></div>


                                            <div className="author-box-job">SUSCRIPCIÓN OFERTY</div>
                                        </div>

                                        <div className="text-center">
                                            <div className="author-box-description">
                                                <p>
                                                <strong>STATUS: </strong><span id="status_susc"></span>
                                                </p>
                                            </div>

                                            <div className="mb-2 mt-3">
                                                <p>
                                                <strong>PUBLICACIONES: </strong><span>NINGUNA</span>
                                                </p>
                                            </div>

                                            <div className="mb-2 mt-3">
                                                <p>
                                                <strong>FECHA DE VENCIMIENTO: </strong><span id="fecha_venc"></span>
                                                </p>
                                            </div>

                                            <div className="w-100 d-sm-none"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-4 col-lg-4 banner-susc">
                                <Link to="/Suscriptor-CrearPublicacion">
                                    <img alt="Primera Publicación" className="img-responsive" src={bannerPost}/>
                                </Link>
                            </div>

                            <div className="col-12 col-md-4 col-lg-4 banner-susc">
                                <Link to="/Suscriptor-Estadisticas">
                                    <img alt="Ver estadisticas" className="img-responsive" src={bannerEst}/>
                                </Link>
                            </div>
                        </div>



                        <div id="panel_estadisticas" className="row">

                        </div>
                    </div>
                    <Footer/>
                 </div>   
                
            </div>
        )
    }
}


export default DashboardSusc;