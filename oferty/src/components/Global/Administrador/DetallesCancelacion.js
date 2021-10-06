import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import {Redirect} from 'react-router-dom';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Menu from './Components/Menu';

import config from '../../../config/config';
import axios from "axios";
import swal from 'sweetalert2';


import Footer from './Components/Footer';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const axiosInstance = axios.create({
    baseURL: config.backURL
});



class DetalleCancelacion extends React.Component{

    
    constructor(props)
    {
        super(props);
        this.state ={ id:this.props.match.params.id, idUser:this.props.match.params.idUser, idSolicitud: this.props.match.params.idCancel, solicitud:[],detailsPub:[], redirect:false, 
            dataComercio:[], redirec:false, dias_select:'', open:false, error:'', campBelleza: false, campSalud: false, campComida:false, campDolar:false, value:[], display:'none',
            DcampBelleza:"No",
            DcampSalud:"No", 
            DcampComida:"No", 
            DcampDolar:"No"
        }

        this.hanldeValidar = this.hanldeValidar.bind(this);
        this.handleCancelar = this.handleCancelar.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    
    handleChangeCheckbox(event){
        const target = event.target;
        const name = target.name;
        const nameD = 'D' + name;
        if(this.state[name] === true){
            this.setState({[name]:false});
            this.setState({[nameD]:"No"});
          
        }
        else{
            this.setState({[name]:true});
            this.setState({[nameD]:"Si"});
        }
    }

    getDetallePublicacion(){
        axiosInstance.get('/getCupones/'+ this.state.id).then(res => {
            this.setState({detailsPub: res.data});
            var dias = '';
            if(res.data.Lunes === "Si"){
                dias += "Lunes";
            }
          
            if(res.data.Martes === "Si"){
                if (dias !== ''){
                  dias += ", Martes";
                }else{
                  dias += "Martes";
                }
            }
          
              if(res.data.Miercoles === "Si"){

                if (dias !== ''){
                  dias += ", Miercoles";
                }else{
                  dias += "Miercoles";
                }
              }
          
              if(res.data.Jueves === "Si"){

                if (dias !== ''){
                  dias += ", Jueves";
                }else{
                  dias += "Jueves";
                }
            }
          
            if(res.data.Viernes === "Si"){
                if (dias !== ''){
                  dias += ", Viernes";
                }else{
                  dias += "Viernes";
                }
            }
          
            if(res.data.Sabado === "Si"){
                if (dias !== ''){
                  dias += ", Sabado";
                }else{
                  dias += "Sabado";
                }
            }
          
            if(res.data.Domingo === "Si"){
                if (dias !== ''){
                  dias += ", Domingo";
                }else{
                  dias += "Domingo";
                }
            }

            this.setState({dias_select: dias});

            
            if(res.data.CampBelleza === "Si"){
                this.setState({campBelleza:true});
                this.setState({DcampBelleza:"Si"});
            }

            if(res.data.CampComida === "Si"){
                this.setState({campComida:true});
                this.setState({DcampComida:"Si"});
            }

            if(res.data.CampSalud === "Si"){
                this.setState({campSalud:true});
                this.setState({DcampSalud:"Si"});
            }

            if(res.data.CampDolar === "Si"){
                this.setState({campDolar:true});
                this.setState({DcampDolar:"Si"});
            }

            axiosInstance.get('/getDetallesComercio/'+ this.state.idUser).then(resData => {
                this.setState({dataComercio:resData.data});
            })

            axiosInstance.get('/getDetallesCancelPublicacion/'+ this.state.idSolicitud).then(resSol =>{
                this.setState({solicitud:resSol.data});
            })
        })
    }

    hanldeValidar(){
        swal.fire({
            title: '¿Está seguro de suspender este cupón?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Aceptar",
        })
        .then(resultado => {
            if(resultado.isConfirmed){
                this.setState({display:'flex'});
                axiosInstance.post('/getCuponesSuspender/'+this.state.id).then(res => {
                    axiosInstance.post('/updateSolicitudCancelacion/'+ this.state.idSolicitud).then(res => {
                        if(this.state.DcampBelleza === "Si"){
                            axiosInstance.post('/getBellezaSuspender/'+this.state.id).then(res=> {
    
                            })
                        }
                        else if(this.state.DcampComida === "Si"){
                            axiosInstance.post('/getComidaSuspender/'+this.state.id).then(res=> {
                                
                            })
                        }
                        else if(this.state.DcampSalud === "Si"){
                            axiosInstance.post('/getMejorEnSaludSuspender/'+this.state.id).then(res=> {
                                
                            })
    
                        }
                        else if(this.state.DcampDolar=== "Si"){
                            axiosInstance.post('/getTodoUnDolarSuspender/'+this.state.id).then(res=> {
                                
                            })
    
                        }
    
                        swal.fire({title:"¡Cupon suspendido correctamente!", text:"Recuerde que este cupón ya no estará disponible en la página",icon:"success",confirmButtonText: "Aceptar"})
                        .then(resultado => {
                            this.setState({display:'none'});
                            this.setState({redirect:true});
                        })
                    })
                    .catch((error) => {
                        swal.fire({title:"Ha ocurrido un error",text:"Verifique su conexión a internet o intente de nuevo más tarde.",icon:"error",confirmButtonText: "Aceptar"});
                    })

                })
                .catch((error) => {
                    swal.fire({title:"Ha ocurrido un error",text:"Verifique su conexión a internet o intente de nuevo más tarde.",icon:"error",confirmButtonText: "Aceptar"});
                })
            }
        })
    }

    handleClose(event,reason){
        if (reason === 'clickaway') {
            return;
        }
        
        this.setState({...this.state.open, open:false});
        this.setState({...this.state.openS, openS:false});
    }

    handleCancelar(){

    }

    componentDidMount = () => {
        this.getDetallePublicacion();
    }

    
    setRedirect = () =>{
        this.setState({ redirect: true})
    }
  

    renderRedirect =() =>{
        if(this.state.redirect){
          return <Redirect to='/Administrador-SolicitudCancelacion'/>
        }
    }


    
    render(){
        return(
            <div className="">
                <Menu></Menu>

                <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error">
                     {this.state.error}
                    </Alert>
                </Snackbar>

                {this.renderRedirect()}


                <div id="main-details" className="main-content">
                    <section className="section">
                        <div className="section-body">
                        <div className="row">
                                <div className="col-12 col-md-8 col-lg-8 col-center">
                                    <div className="card card-error">
                                        <div className="card-header">
                                            <h4 id="comentario_rechazo">Solicitud de la Cancelación</h4>
                                        </div>

                                        <div className="card-body">
                                            <p id="comentario_rech">{this.state.solicitud.Solicitud}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 col-md-8 col-lg-8 col-center">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Detalles de la Solicitud</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="imagen_cupon img_pago">
                                                <div className="form-group col-md-2">
                                                    <div id="image-preview" className="image-preview" style={{backgroundImage:`url(${this.state.detailsPub.Imagen})`}}>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="detail_cupon">
                                                <hr className="linea"></hr>
                                                <h5 className="tit_detalle">Datos del Cupón</h5>
                                                <p><span className="bold">Titulo de la Oferta: </span><span> {this.state.detailsPub.Titulo}</span> </p>
                                                <p><span className="bold">Detalles: </span> <span> {this.state.detailsPub.Detalles} </span></p>
                                                <p><span className="bold">Descripción: </span> <span> {this.state.detailsPub.Descripcion} </span></p>
                                                <p><span className="bold">Categoría: </span> <span> {this.state.detailsPub.Categoria} </span></p>
                                                <p><span className="bold">Stock del Producto: </span> <span> {this.state.detailsPub.Disponibilidad_Estandar} </span></p>
                                                <p><span className="bold">Plazo de Uso: </span> <span> {this.state.detailsPub.PlazoDeUso} </span></p>
                                                <p><span className="bold">Incluye: </span> <span> {this.state.detailsPub.Incluye} </span></p>
                                                <p><span className="bold">No Incluye: </span> <span> {this.state.detailsPub.NoIncluye} </span></p>
                                                <p><span className="bold">Consideraciones: </span> <span> {this.state.detailsPub.Consideraciones} </span></p>
                                                <p><span className="bold">Contraindicacion: </span> <span> {this.state.detailsPub.Contraindicacion} </span></p>
                                                <p><span className="bold">Dias: </span> <span> {this.state.dias_select ? this.state.dias_select : 'Ninguno'} </span></p>
                                                <p><span className="bold">Campañas: </span></p>
                                                <div id="CheckBox_Campa" className="form-row form-checkbox">
                                                        <div className="form-group col-md-12">
                                                            <div className="custom-control custom-checkbox">
                                                                <input type="checkbox" className="custom-control-input only-one" id="customCheck-camp1" 
                                                                    name="campDolar" checked={this.state.campDolar} onChange={this.handleChangeCheckbox} />
                                                                <label className="custom-control-label" htmlFor="customCheck-camp1">Todo en $1</label>
                                                            </div>

                                                            <div className="custom-control custom-checkbox">
                                                                <input type="checkbox" className="custom-control-input only-one" id="customCheck-camp2" value="MejorEnSalud"
                                                                name="campSalud" checked={this.state.campSalud} onChange={this.handleChangeCheckbox} />
                                                                <label className="custom-control-label" htmlFor="customCheck-camp2">Lo mejor en Salud</label>
                                                            </div>

                                                            <div className="custom-control custom-checkbox">
                                                                <input type="checkbox" className="custom-control-input only-one" id="customCheck-camp3" value="BellezaTop"
                                                                name="campBelleza" checked={this.state.campBelleza} onChange={this.handleChangeCheckbox}/>
                                                                <label className="custom-control-label" htmlFor="customCheck-camp3">Belleza Top</label>
                                                            </div>

                                                            <div className="custom-control custom-checkbox">
                                                                <input type="checkbox" className="custom-control-input only-one" id="customCheck-camp4" value="Comida"
                                                                name="campComida" checked={this.state.campComida} onChange={this.handleChangeCheckbox}/>
                                                                <label className="custom-control-label" htmlFor="customCheck-camp4">Comida</label>
                                                            </div>

                                                        </div>
                                                    </div>
                                                
                                            </div>

                                            <div className="detail_cupon">
                                                <hr className="linea"></hr>
                                                <h5 className="tit_detalle">Datos del Comercio</h5>
                                                <p><span className="bold">Nombre del comercio: </span><span> {this.state.dataComercio.Tienda}</span> </p>
                                                <p><span className="bold">Nombre del usuario: </span> <span> {this.state.dataComercio.Nombre} </span></p>
                                                <p><span className="bold">Dirección: </span> <span> {this.state.dataComercio.DireccionCorta} </span></p>
                                                <p><span className="bold">Telefono: </span> <span> {this.state.dataComercio.telefono} </span></p>
                                                
                                            </div>
                                        </div>



                                        <div className="card-footer text-right">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 col-md-8 col-lg-8 col-center">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Imagenes de la oferta</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="gallery gallery-md">
                                         
                                                <div id="image-preview2" className="image-preview" style={{backgroundImage:`url(${this.state.detailsPub.ImagenSecundaria})`}}>
                                                </div>
                                            

                                            
                                                <div id="image-preview3" className="image-preview" style={{backgroundImage:`url(${this.state.detailsPub.ImagenTercera})`}}>
                                                </div>
                                                    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="footer_btn col-md-4 col-lg-4 col-center">
                                <div className="cancel_btn">
                                    <button id="Btn_Cancelado" href="#" className="btn btn-secondary" onClick={this.handleCancelar}>Rechazar Solicitud</button>
                                </div>
                                <div className="acept_btn">
                                    <button id="Btn_PagoCorrecto" href="#" className="btn btn-primary" onClick={this.hanldeValidar}>Validar Solicitud</button>
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

export default DetalleCancelacion;