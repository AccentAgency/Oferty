import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import Menu from './Components/Menu';

import config from '../../../config/config';
import axios from "axios";

import { Link } from 'react-router-dom';
import Footer from './Components/Footer';

const axiosInstance = axios.create({
    baseURL: config.backURL
});



class SolicitudCancelacion extends React.Component{

    
    constructor(props)
    {
        super(props);
        this.state ={ publicacion:[],loading:true }
    }

    getPublicacion(){
        axiosInstance.get('/solicitudCancelPublicacion')
        .then(res => {
            this.setState({publicacion:res.data});
            this.setState({loading:false});
        })
    }


    componentDidMount =()=>{
        this.getPublicacion();

    }

    render(){
        return(
            <div className="">
                <Menu></Menu>

                {this.state.loading ? (
                    <div className="loader-page-circle">
                        <div className="wrappers">
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="shadow"></div>
                            <div className="shadow"></div>
                            <div className="shadow"></div>
                        </div>
                    </div>
                ) : (
                <div id="main-pago" className="main-content">
                    <section className="section">
                        <div className="section-body">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Solicitud de Publicaciones</h4>
                                            <div className="card-header-form">
                                                <form>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" placeholder="Search"/>
                                                        <div className="input-group-btn">
                                                            <button className="btn btn-primary"><i className="fas fa-search"></i></button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                        <div className="card-body p-0">
                                            <div className="table-responsive">
                                                <table id="tabla_pagos" className="table table-striped">
                                                    <thead>  
                                                        <tr>
                                                            <th className="text-center"></th>
                                                            <th>Fecha</th>
                                                            <th>Solicitador por</th>
                                                            <th>Cupon</th>
                                                            <th>Estado</th>
                                                            <th>Acción</th>
                                                        </tr>
                                                    </thead>     

                                                    {this.state.publicacion ? (
                                                        <tbody>
                                                            {Object.keys(this.state.publicacion).map (i =>{ 
                                                                return(
                                                                    <tr key={i}>
                                                                        <td></td>
                                                                        <td className="email">{this.state.publicacion[i].Fecha}</td>
                                                                        <td className="email">{this.state.publicacion[i].User}</td>

                                                                        <td>{this.state.publicacion[i].TituloCupon}</td>

                                                                        <td>
                                                                            <div id="Estado" className= "estado_cup badge badge-warning">Por Validar</div>
                                                                        </td>

                                                                        <td>
                                                                            <Link id="detail" className="btn btn-prim btn_detail" 
                                                                            to={'/Administrador-DetallesCancelacion/'+ this.state.publicacion[i].IdCupon + '/'+
                                                                            this.state.publicacion[i].IdUsuario + '/' + i}>Ver Detalles</Link>
                                                                        </td>
                                                                    </tr>

                                                                )

                                                            })}
                                                        </tbody>
                                                    ):(
                                                        <tbody>
                                                            <tr>
                                                                <td className="p-0 text-center"></td>
                                                                <td>No hay solicitudes de publicación.</td>
                                                            </tr>
                                                        </tbody>

                                                    )
                                                    }
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                )}
                <Footer></Footer>
            </div>
        )
    }
}

export default SolicitudCancelacion;