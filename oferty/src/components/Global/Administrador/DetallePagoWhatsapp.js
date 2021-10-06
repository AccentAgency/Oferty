import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import * as emailjs from 'emailjs-com';
import {Redirect} from 'react-router-dom';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Menu from './Components/Menu';

import config from '../../../config/config';
import axios from "axios";
import swal from 'sweetalert';

import Footer from './Components/Footer';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const axiosInstance = axios.create({
    baseURL: config.backURL
});



class DetallePagoWhatsapp extends React.Component{

    
    constructor(props)
    {
        super(props);
        this.state ={ id:this.props.match.params.id, detailsCupon:[], listCupones:[], redirec:false, file:'', comprobante:'', Pago:'Efectivo', DatosPago:'',Dolares:'', 
        Bolivares:'', open:false, error:'', loading:true, loading2:true, display:'none'}

        this.hanldeView = this.hanldeView.bind(this);
        this.hanldeValidar = this.hanldeValidar.bind(this);
        this.handleCancelar = this.handleCancelar.bind(this);
        this.handleChangeImagen = this.handleChangeImagen.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }


    handleChange(event){
        const target = event.target;

        this.setState({
            DatosPago: target.value
        })
    }

    
    handleSelect(event){
        const target = event.target;
        this.setState({
            Pago: target.value
        });
    }

    handleCancelar(){
        axiosInstance.post('/deniedPagoWhatsapp/'+this.state.id).then(res => {
            axiosInstance.post('/deniedePagoUser/'+this.state.detailsCupon.IdUser+'/'+this.state.detailsCupon.IdPago).then(resUser => {
                swal({title:"¡El pago ha sido rechazado correctamente!",icon:"success"}).then((value => {
                    if(value){
                        this.setState({redirec:true})
                        if(this.state.redirec === true){
                            this.props.history.push("/Administrador-ReporteDePagos");
                        }
                    }
                }));
            })
            .catch((error) => {
                swal({title:"Ha ocurrido un error",text:"Verifique su conexión a internet o intente de nuevo más tarde.",icon:"error",confirmButtonText: "Aceptar"});
            })
        })
        .catch((error) => {
            swal({title:"Ha ocurrido un error",text:"Verifique su conexión a internet o intente de nuevo más tarde.",icon:"error",confirmButtonText: "Aceptar"});
        })
    }
    

    getDetalleCupon(){
        axiosInstance.get('/getPagosDetallesWha/'+ this.state.id).then(res => {
            this.setState({detailsCupon: res.data});
            this.setState({Dolares:res.data.TotalDolares});
            this.setState({Bolivares:res.data.TotalBsS});
            this.setState({loading:false});
        })
    }

    getListCupones(){
        axiosInstance.get('/getPagosCuponesWha/'+ this.state.id).then(res => {
            this.setState({listCupones:res.data});
            this.setState({loading2:false});
        })
    }

    hanldeView(archivo){
        window.open(archivo, "_blank")
    }

    hanldeValidar(){
        this.setState({display:'flex'});
        var idCupones = [];
        console.log(this.state.listCupones);
        Object.keys(this.state.listCupones).map(i =>{
            idCupones.push({Nombre:this.state.listCupones[i].Nombre, Cantidad:this.state.listCupones[i].Cantidad, Id:this.state.listCupones[i].Id, 
                IdCuponPago:i});
            return idCupones;    
        })

        console.log(this.state.Bolivares);
        if(!this.state.DatosPago){
            this.setState({display:'none'});
            this.setState({open:true});
            this.setState({error:"Favor ingrese los datos del pago"});
        }
        else{
            axiosInstance.post('/validatePagoWhatsapp',{
                'id': this.state.id,
                'listCupones':JSON.stringify(idCupones),
                'tipoPago': this.state.Pago,
                'DatosDelPago': this.state.DatosPago, 
                'TotalDolares': this.state.Dolares, 
                'TotalBolivares': this.state.Bolivares,
                'archivo': this.state.comprobante
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
                })                    
                .catch((error) => {
                    swal({title:"Ha ocurrido un error",text:"Verifique su conexión a internet o intente de nuevo más tarde.",icon:"error",confirmButtonText: "Aceptar"});
                })

            }).catch(error=>{
                swal({title:"Ha ocurrido un error",text:"Verifique su conexión a internet o intente de nuevo más tarde.",icon:"error",confirmButtonText: "Aceptar"});
            });
        }

    }

    handleChangeImagen(event){
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })

        //Subimos imagen en firebasess
        const formData = new FormData();
        formData.append('image',event.target.files[0]);
        if(event.target.files[0].size > 5242880){
            this.setState({open:true, error:"Favor suba un documento y/o imagen que pese menos de 5MB"})
        }
        else{
            axiosInstance.post('/uploadImage', formData,{
            }).then(res => {
                this.setState({comprobante: res.data});
            })
            .catch((error) => {
                swal({title:"Ha ocurrido un error en subir la imagen",text:"Favor verifique su conexión a internet e intente de nuevo.",icon:"error",confirmButtonText: "Aceptar"});
            })
        }

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
        return(
            <div className="">
                <Menu></Menu>
                {this.renderRedirect()}
                <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error">
                     {this.state.error}
                    </Alert>
                </Snackbar>

                <div className="loader-page3" style={{display:this.state.display}}>
                    <div className="lds-ripple"><div></div><div></div></div>
                </div>

                {this.state.loading && this.state.loading2 ? (
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
                                                        <embed width="250" height="250" name="embed" type="application/pdf" src={this.state.file}></embed>
                                                        <div className="input-file">
                                                            <label htmlFor="image-upload3" id="image-label3">{!this.state.file ? 'AGREGAR COMPROBANTE+' : 'Modificar'}
                                                            </label>
                                                            <input type="file" name="image" id="image-upload3" onChange={this.handleChangeImagen} />
                                                        </div>

                                                        
                                                    </div>
                                                    
                                                    <div className="detail_cupon">
                                                        <br></br>
                                                        <p><span className="bold">Fecha de Pago: </span><span>{this.state.detailsCupon.FechaPago}</span></p>
                                                        <hr className="linea"></hr>
                                                        <h5 className="tit_detalle">Datos del Pago</h5>
                                                        <p><span className="bold">Metodo de Pago: </span><span id="MetodoDePago">
                                                            <select name="Pago" className="form-control selectric" onChange={this.handleSelect}>
                                                                <option>Efectivo</option>
                                                                <option>Zelle</option>
                                                                <option>Transferencia</option>
                                                                <option>Paypal</option>
                                                                <option>Pago Móvil</option>
                                                            </select>
                                                            </span> 
                                                        </p>
                                                        <p><span className="bold">Datos para el pago: </span>
                                                            <input name="DatosPago" type="text" className="form-control" placeholder="Datos del pago"
                                                            onChange={this.handleChange}/>
                                                        </p>

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
                                            <button id="Btn_Cancelado" href="#" className="btn btn-secondary" onClick={this.handleCancelar}>Eliminar Pago</button>
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

export default DetallePagoWhatsapp;