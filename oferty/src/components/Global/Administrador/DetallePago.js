import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import * as emailjs from 'emailjs-com';
import {Redirect} from 'react-router-dom';


import Menu from './Components/Menu';

import config from '../../../config/config';
import axios from "axios";
import swal from 'sweetalert';

import Footer from './Components/Footer';

const axiosInstance = axios.create({
    baseURL: config.backURL
});



class DetallePagos extends React.Component{

    
    constructor(props)
    {
        super(props);
        this.state ={ id:this.props.match.params.id, detailsCupon:[], listCupones:[], redirec:false, loading:true, loading2:true, display:'none', instagram:'@oferty_val',
        telefono: '+1 647-557-5532', direccion: 'Centro Comercial el Crital, Naguanagua'}

        this.hanldeView = this.hanldeView.bind(this);
        this.hanldeValidar = this.hanldeValidar.bind(this);
        this.handleCancelar = this.handleCancelar.bind(this);
    }
    

    getDetalleCupon(){
        axiosInstance.get('/getPagosDetalles/'+ this.state.id).then(res => {
            this.setState({detailsCupon: res.data});
            this.setState({loading:false});

        })
    }

    getListCupones(){
        axiosInstance.get('/getPagosCupones/'+ this.state.id).then(res => {
            this.setState({listCupones:res.data});
            Object.keys(res.data).forEach(i => {
                axiosInstance.get('/getCupones/'+res.data[i].Id).then(datUser => {
                    axiosInstance.get('/getTiendaData/'+ datUser.data.Tienda).then(info => {
                        Object.keys(info.data).forEach(l => {
                            if(info.data[l].instagram != null) {
                                this.setState({instagram: res.data[l].instagram});
                            }
                            this.setState({telefono:info.data[l].telefono, direccion:info.data[l].DireccionCorta});
                        })
                    })
                    
                })
            })
        })
    }

    hanldeView(archivo){
        window.open(archivo, "_blank")
    }

    hanldeValidar(){
        this.setState({display:'flex'});
        var idCupones = [];
        Object.keys(this.state.listCupones).map(i =>{
            idCupones.push({Nombre:this.state.listCupones[i].Nombre, Cantidad:this.state.listCupones[i].Cantidad, Id:this.state.listCupones[i].Id, 
                IdCuponPago:i});
            return idCupones;
        })

        axiosInstance.post('/validatePago',{
            'id': this.state.id,
            'listCupones':JSON.stringify(idCupones),
            'instagram': this.state.instagram,
            'telefono': this.state.telefono,
            'direccion': this.state.direccion
        }).then(res => {
            axiosInstance.post('/validatePagoUser/'+this.state.detailsCupon.IdUser+'/'+this.state.detailsCupon.IdPago).then(user => {
                let templateParams = {
                    to_name: this.state.detailsCupon.Nombre,
                    message: res.data.join(' '),
                    your_name: this.state.detailsCupon.Email
                }

                Object.keys(this.state.listCupones).map(i => {
                    axiosInstance.get('/getCupones/'+this.state.listCupones[i].Id).then(res => {
                        axiosInstance.post('/contadorCupon', {
                            'id': this.state.listCupones[i].Id,
                            'suma': res.data.Contador + 1
                        })
                    })
                    return i;
                })

            
                emailjs.send("service_1hftjl6","template_ohefq3q", templateParams, 'user_hdccZ9I0J40N4t9Ci7yHw').then((value =>{
                    this.setState({display:'none'});
                    swal({title:"¡Pago verificado correctamente!",icon:"success",confirmButtonText: "Aceptar"}).then((value => {
                        if(value){
                            window.location.href = "/Administrador-ReporteDePagos";
                        }
                    }));
                    
                }));
            }).catch(error=>{
                this.setState({display:'none'});
                swal({title:"Ha ocurrido un error, favor intentelo más tarde",icon:"success",confirmButtonText: "Aceptar"})
            })
        }).catch(error=>{
            swal({title:"Ha ocurrido un error",text:"Verifique su conexión a internet o intente de nuevo más tarde.",icon:"error",confirmButtonText: "Aceptar"});
        });
    }


    handleCancelar(){
        var cuponList = [];
        Object.keys(this.state.listCupones).map (i => {

            cuponList.push(this.state.listCupones[i].Nombre);
            return cuponList;   
        })
        axiosInstance.post('/deniedPago/'+this.state.id).then(res => {
            axiosInstance.post('/deniedePagoUser/'+this.state.detailsCupon.IdUser+'/'+this.state.detailsCupon.IdPago).then(resUser => {
                let templateParams = {
                    to_name: this.state.detailsCupon.Nombre,
                    message: cuponList,
                    your_name: this.state.detailsCupon.Email
                }
                emailjs.send("service_1hftjl6","template_tamm1k7", templateParams, 'user_hdccZ9I0J40N4t9Ci7yHw').then(function(){
                    swal({title:"¡El pago ha sido rechazado correctamente!",icon:"success"}).then((value => {
                        if(value){
                            this.setState({redirec:true})
                            if(this.state.redirec === true){
                                this.props.history.push("/Administrador-ReporteDePagos");
                            }
                        }
                    }));
                    
                });
            })

        })
        .catch((error) => {
            swal({title:"Ha ocurrido un error",text:"Verifique su conexión a internet o intente de nuevo más tarde.",icon:"error",confirmButtonText: "Aceptar"});
        })

    }

    componentDidMount = () => {
        this.getDetalleCupon();
        this.getListCupones();
    }



    renderRedirect =() =>{
        if(this.state.redirect){
        return <Redirect to='/Administrador-ReporteDePagos'/>
        }
    }

    
    render(){
        console.log(this.state.listCupones);
        return(
            <div className="">
                <Menu></Menu>
                {this.renderRedirect()}

                <div className="loader-page3" style={{display:this.state.display}}>
                    <div className="lds-ripple"><div></div><div></div></div>
                </div>

                {this.state.loading && this.state.loading2 ? (
                    <div className="loader-page-circ">
                        <div className="wrappers">
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="shadow"></div>
                            <div className="shadow"></div>
                            <div className="shadow"></div>
                        </div>
                    </div>
                ):(  
                    <div>
                        <div id="main-details" className="main-content">
                            <section className="section">
                                <div className="section-body">
                                    <div className="row">
                                        <div className="col-12 col-md-8 col-lg-8 col-center">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h4>Detalles del Pago</h4>
                                                </div>
                                                <div className="card-body">
                                                    <div className="imagen_cupon img_pago">
                                                        <embed height="350px" width="250px" name="embed" type="application/pdf" id="PdfText" 
                                                        src={this.state.detailsCupon.Archivo}/>
                                                        <button id="Btn_Comprobante" href="" className="btn btn-primary" 
                                                        onClick={this.hanldeView.bind(this, this.state.detailsCupon.Archivo)}>Ver Comprobante</button>
                                                    </div>
                                                    
                                                    <div className="detail_cupon">
                                                        <br></br>
                                                        <p><span className="bold">Fecha de Pago: </span> <span id="Fecha_pago"> {this.state.detailsCupon.FechaPago}</span></p>
                                                        <hr className="linea"></hr>
                                                        <h5 className="tit_detalle">Datos del Pago</h5>
                                                        <p><span className="bold">Metodo de Pago: </span><span id="MetodoDePago"> {this.state.detailsCupon.MetodoDePago}</span> </p>
                                                        <p><span className="bold">Datos para el pago: </span> <span id="Zelle"> {this.state.detailsCupon.DatoPago} </span></p>

                                                        <hr className="linea"></hr>
                                                        <h5 className="tit_detalle">Monto a Cancelar</h5>
                                                        <p><span className="bold">Total en Dolares: </span><span id="Total_Dolares"> $ {this.state.detailsCupon.TotalDolares}</span></p>
                                                        <p><span className="bold">Total en Bolivares: </span><span id="Total_Bss"></span> {this.state.detailsCupon.TotalBsS} BsS</p>
                                                        
                                                    </div>
                                                </div>

                                                <div className="card-footer text-right">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h4>Cupones Comprados</h4>
                                                </div>

                                                <div className="card-body p-0">
                                                    <div className="table-responsive">
                                                        <table id="table_producto" className="table table-striped">
                                                            <thead>
                                                                <tr>
                                                                    <th className="text-center">
                                                                        <div className="custom-checkbox custom-checkbox-table custom-control">
                                                                            <input type="checkbox" data-checkboxes="mygroup" data-checkbox-role="dad"
                                                                                className="custom-control-input" id="checkbox-all"/>
                                                                            <label htmlFor="checkbox-all" className="custom-control-label">&nbsp;</label>
                                                                        </div>
                                                                    </th>
                                                                    <th>Imagen</th>
                                                                    <th>Producto</th>
                                                                    <th>Cantidad</th>
                                                                </tr>
                                                            </thead>    
                                                            <tbody>
                                                                {Object.keys(this.state.listCupones).map (i => {
                                                                    return(
                                                                        <tr key={i}>
                                                                            <td className="p-0 text-center"></td>
                                                                            <td>
                                                                                <img alt={'Cupon'+ this.state.listCupones[i].Nombre} 
                                                                                src={this.state.listCupones[i].Imagen} className="rounded-circle" width="55"
                                                                                data-toggle="tooltip" title="Producto"/>
                                                                            </td>
                                                                            <td className="producto">{this.state.listCupones[i].Nombre}</td>
                                                                            <td className="cantidad">{this.state.listCupones[i].Cantidad}</td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                            </tbody>
                                                            
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="footer_btn col-md-4 col-lg-4 col-center">
                                        <div className="cancel_btn">
                                            <button id="Btn_Cancelado" href="#" className="btn btn-secondary" onClick={this.handleCancelar}>Rechazar Pago</button>
                                        </div>
                                        <div className="acept_btn">
                                            <button id="Btn_PagoCorrecto" href="#" className="btn btn-primary" onClick={this.hanldeValidar}>Validar Pago</button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <Footer></Footer>
                    </div>
                )}
            </div>    
        )
    }
}

export default DetallePagos;