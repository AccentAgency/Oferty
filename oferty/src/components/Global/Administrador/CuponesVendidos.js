import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import Menu from './Components/Menu';

import config from '../../../config/config';
import axios from "axios";

import { Link } from 'react-router-dom';

//Librerias para el modal
import Modal from '@material-ui/core/Modal';
import Footer from './Components/Footer';

const axiosInstance = axios.create({
    baseURL: config.backURL
});



class CuponesVendidos extends React.Component{

    
    constructor(props)
    {
        super(props);
        this.state ={ pagos:[], open:false, details:[], details2:[],tienda:[], codigos:[], loading:true}

        this.handleDetalles = this.handleDetalles.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    getPagos(){
        axiosInstance.get('/getCuponesComprados')
        .then(res => {
            this.setState({pagos: res.data});
            this.setState({loading:false});
        })
    }

    handleClose(){
        this.setState({...this.state.open, open:false});    
    }


    handleDetalles(value,value2,value3){
        var val = [];
        axiosInstance.get('/detallesCuponesComprados/'+value + '/'+ value2).then(res=> {
            Object.keys(res.data.CodigoCupones).map(i => {
                val.push(res.data.CodigoCupones[i]);
                return val;
            })
            this.setState({codigos: val})

            axiosInstance.get('/getCupones/'+ res.data.Id).then(resData => {
                this.setState({tienda:resData.data});

                axiosInstance.get('/detallesCuponesComprados2/'+value).then(resChild => {
                    this.setState({details2:resChild.data});
                    this.setState({open:true});
                })
            })

        })
    }

    componentDidMount =()=>{
        this.getPagos();
    }

    render(){
        var cont=0;
        return(
            <div className="">
                <Menu></Menu>

                <Modal open={this.state.open} onClose={this.handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                    <div style={{ position: 'absolute', width: '400', backgroundColor:'white'}} className="modal-main">
                        <div className="contenedor-cupon">
                            <h4>Detalles del Cupón</h4>
                            <hr></hr>
                            <p><strong>Usuario: </strong><span> {this.state.details2.Nombre}</span></p>
                            <p><strong>Cupon de la Tienda: </strong><span> {this.state.tienda.Tienda}</span></p>
                            <p><strong>Tipo de Pago: </strong> {this.state.details2.TipoDePago}</p>
                            <hr></hr>
                            <h4>Códigos del Cupón</h4>
                            <table>
                                <thead>  
                                    <tr>
                                        <th>Cupon</th>
                                        <th>Código</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>   
                                <tbody>
                                    {Object.keys(this.state.codigos).map(i =>{
                                        cont++;
                                        return(
                                            <tr key={i}>
                                                <td><strong>Cupon {cont}:</strong></td>
                                                <td>{this.state.codigos[i].Codigo}</td>
                                                <td>{this.state.codigos[i].Status}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>    
                        </div>
                    </div>
                </Modal>            
                
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
                                            <h4>Resumen de Cupones Vendidos <span className="font-italic"> (Últimos Vendidos)</span></h4>

                                        </div>

                                        <div className="card-body p-0">
                                            <div className="table-responsive">
                                                <table id="tabla_pagos" className="table table-striped">
                                                    <thead>  
                                                        <tr>
                                                            <th className="text-center"></th>
                                                            <th>Fecha de Compra</th>
                                                            <th>Nombre de Usuario</th>
                                                            <th>Nombre del Cupón</th>
                                                            <th>Cantidad</th>
                                                            <th>Acción</th>
                                                        </tr>
                                                    </thead>     

                                                    {this.state.pagos ? (
                                                        <tbody>
                                                            {Object.keys(this.state.pagos).map (i =>{ 
                                                                return(
                                                                    <tr key={i}>
                                                                        <td></td>
                                                                        <td className="nombre">{this.state.pagos[i].Fecha}</td>
                                                                        <td className="email">{this.state.pagos[i].NameUser}</td>
                                                                        <td>{this.state.pagos[i].NombreCupones}</td>
                                                                        <td>{this.state.pagos[i].Cantidad}</td>


                                                                        <td>
                                                                            <button id="detail" className="btn btn-prim btn_detail" 
                                                                            onClick={this.handleDetalles.bind(this,this.state.pagos[i].IdGeneral ,
                                                                            this.state.pagos[i].IdCupones, this.state.pagos[i].NameUser)}>Ver Detalles</button>
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
                            <div className="btn-center">
                                <Link className="btn btn-success" to="/Administrador-BuscarCuponesVendidos"> VER TODOS </Link>
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

export default CuponesVendidos;