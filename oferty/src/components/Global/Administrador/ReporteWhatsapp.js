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



class ReporteWhatsapp extends React.Component{

    
    constructor(props)
    {
        super(props);
        this.state ={ pagos:[], loading:true }

        this.handleDetails = this.handleDetails.bind(this);
    }

    getPagos(){
        axiosInstance.get('/getPagosReportadosWha')
        .then(res => {
            this.setState({pagos: res.data});
            this.setState({loading:false});
        })
    }

    handleDetails(value){

    }

    componentDidMount =()=>{
        this.getPagos();
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
                                            <h4>Pagos Reportados</h4>
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
                                        <div className="categories">
                                            <ul>
                                                <li>
                                                    <Link to="/Administrador-ReporteDePagos" data-filter="*">Formulario</Link>
                                                </li>
                                                <li className="active">
                                                    <Link to="/Administrador-ReporteDePagosWhatsapp" data-filter="*">Whatsapp</Link>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="card-body p-0">
                                            <div className="table-responsive">
                                                <table id="tabla_pagos" className="table table-striped">
                                                    <thead>  
                                                        <tr>
                                                            <th className="text-center"></th>
                                                            <th>Nombre de Usuario</th>
                                                            <th>Correo Electrónico</th>
                                                            <th>Fecha de Pago</th>
                                                            <th>Estado</th>
                                                            <th>Acción</th>
                                                        </tr>
                                                    </thead>     

                                                    {this.state.pagos ? (
                                                        <tbody>
                                                            {Object.keys(this.state.pagos).map (i =>{ 
                                                                return(
                                                                    <tr key={i}>
                                                                        <td></td>
                                                                        <td className="nombre">{this.state.pagos[i].Nombre}</td>
                                                                        <td className="email">{this.state.pagos[i].Email}</td>
                                                                        <td>{this.state.pagos[i].Fecha_Pago}</td>

                                                                        <td>
                                                                            <div id="Estado" className= "estado_cup badge badge-warning">Por Validar</div>
                                                                        </td>

                                                                        <td>
                                                                            <Link id="detail" className="btn btn-prim btn_detail" 
                                                                            to={'Administrador-DetallePagosWhatsapp/'+ i}>Ver Detalles</Link>
                                                                        </td>
                                                                    </tr>

                                                                )

                                                            })}
                                                        </tbody>
                                                    ):(
                                                        <tbody>
                                                            <tr>
                                                                <td className="p-0 text-center"></td>
                                                                <td>No hay reporte de pagos.</td>
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

export default ReporteWhatsapp;