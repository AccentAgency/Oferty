import React, { Component } from 'react';

import config from '../../../../config/config';
import {fire} from '../../../../config/firebase';
import axios from "axios";

//Imagen
import imagenSusc from '../../images/suscripcion/FiguraPublicacion.png';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

//Librerias para el modal
import Modal from '@material-ui/core/Modal';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const axiosInstance = axios.create({
    baseURL: config.backURL
});


class PublicacionesDisponibles extends Component{

    state ={
        infPub:''
    }
    constructor(props)
    {
        super(props);
        this.state={
            publicacion:[], infPub: '', open:false,  stockMax:'', fechaVenc:'', idCupon:'',openA:false, error:'', idPublicacion:'', loading:true,
            errors:{
                stockMax:'',
                fechaVenc:''
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleReactivar = this.handleReactivar.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseA = this.handleCloseA.bind(this);
        this.handleUpdateCupon = this.handleUpdateCupon.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const value =  target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        let errors = this.state.errors;
    
        switch (name) {

        case 'stockMax':
            errors.stockMax =
            value.length === 0
            ? 'Ingresa un número máximo de venta para el cupón.'
            : '';
        break;

        case 'fechaVenc':
            errors.fechaVenc =
            value.length === 0
            ? 'Ingresa una fecha de vencimiento para el cupón.'
            : '';
        break;

        default:
        break;

        }
    }

    handleClose(){
        this.setState({...this.state.open, open:false});
    }




    //Validar si la persona tiene publicaciones
    getPublicacion(){
        fire.auth().onAuthStateChanged((user) =>{
            if(user){
                axiosInstance.get('/validatePublicacion/'+ user.uid).then(res => {
                    this.setState({...this.state.loading, loading:false});
                    this.setState({publicacion: res.data});
                    if(res.data != null){
                        Object.keys(res.data).map(item => {
                            axiosInstance.get('/getPublicacion/'+res.data[item].id_Publicacion +'/'+ res.data[item].Id_Oferta).then(res => {
                                this.setState(prevState => ({
                                    infPub: [...prevState.infPub, res.data]
                                }))
                            })
                            return this.state.publicacion;
                        })
                    }
                })
            }
        })

    }

    handleReactivar(value,id){
        this.setState({open:true});
        this.setState({...this.state.idCupon, idCupon:value});
        this.setState({...this.state.idPublicacion, idPublicacion:id});
    }

    handleUpdateCupon(){
        if(!this.state.idCupon  || !this.state.stockMax || !this.state.fechaVenc){
            this.setState({openA: true});
            this.setState({error:'Favor rellene todos los campos para reanudar el cupón'});
        }
        else{
            axiosInstance.post('/updateCuponesFinalizado',{
                'idCupon': this.state.idCupon,
                'stockMax': this.state.stockMax,
                'fecha_ven': this.state.fechaVenc
            }).then(res => {
                axiosInstance.post('/updatePublicacionTime',{
                    'idPublicacion': this.state.idPublicacion,
                    'stockMax': this.state.stockMax,
                    'fecha_ven': this.state.fechaVenc
                }).then(res => {
                    swal({title:"¡Cupon reanudado correctamente!",icon:"success",confirmButtonText: "Aceptar"});
                    setTimeout(() => {
                        window.location.reload();
                        window.scrollTo(0, 0)
                    }, 1500);
                }).catch(error => {
                    swal({title:"Ha ocurrido un error", text:"Favor intente más tarde",icon:"error",confirmButtonText: "Aceptar"});
                    this.resetForm();
                })

            }).catch(error => {
                swal({title:"Ha ocurrido un error", text:"Favor intente más tarde",icon:"error",confirmButtonText: "Aceptar"});
                this.resetForm();
            })
        }

    }

    handleCloseA(event,reason){
        if (reason === 'clickaway') {
            return;
        }
        
        this.setState({...this.state.openA, openA:false});
    }

    resetForm(){
        this.setState({
            stockMin:'', fechaVenc:'',open:false, idCupon:''
        })
    }


    componentDidMount =() =>{
        this.getPublicacion();
    }

    render() {
        const {errors} = this.state;
        return(
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-center">
                {this.state.loading ? (
                    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                ):(
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-center">
                <Snackbar open={this.state.openA} autoHideDuration={6000} onClose={this.handleCloseA}>
                    <Alert onClose={this.handleCloseA} severity="error">
                    {this.state.error}
                    </Alert>
                </Snackbar>
                <Modal open={this.state.open} onClose={this.handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                    <div style={{ position: 'absolute', width: '400', backgroundColor:'white'}} className="modal-main">
                        <div className="contenedor-cupon">
                            <h4>Reanudar Cupón</h4>

                            <div className="contenido_form col-center">
  
                                <div className="form-group row mb-4">
                                    <label className="col-form-label text-md-right col-12 col-md-4 col-lg-4">Nuevo Stock</label>
                                    <div className="col-sm-12 col-md-8">
                                        <input name="stockMax" type="number" className="form-control" maxLength="5" min="1" value={this.state.stockMax}
                                        onChange={this.handleChange}/>
                                        {errors.stockMax.length > 0 && 
                                        <span className='error'>{errors.stockMax}</span>}
                                    </div>
                                </div>
                         

                                <div className="form-group row mb-4">
                                    <label className="col-form-label text-md-right col-12 col-md-4 col-lg-4">Nueva Fecha de Cierre</label>
                                    <div className="col-sm-12 col-md-8">
                                        <input name="fechaVenc" className="form-control" type="datetime-local" id="hora" value={this.state.fechaVenc}
                                        onChange={this.handleChange}/>
                                        {errors.fechaVenc.length > 0 && 
                                        <span className='error'>{errors.fechaVenc}</span>}
                                    </div>
                                </div>

                                
                                <div className="text-center">
                                    <button id="ReanudarCupon" className="btn btn-primary" onClick={this.handleUpdateCupon}>Reanudar Cupón</button>
                                </div>
                                
                                
                            </div>


                        </div>
                    </div>
                </Modal>
                {this.state.publicacion ? (
                    <div className="row">
                        
                    {Object.keys(this.state.infPub).map (i=>{
                        var tiempo = new Date(this.state.infPub[i].Fecha_Vencimiento) - Date.now();
                        if (tiempo < 0){
                            return(
                                <div key={i} className="col-12 col-sm-6 col-md-6 col-lg-3">
                                    <article className="article">
                                        <div className="article-header">
                                            <div className="article-image" style={{backgroundImage:`url(${this.state.infPub[i].Imagen})`}}>
                                            </div>

                                            <div className="article-badge">
                                                <div className="article-badge-item bg-danger"><i className="far fa-clock"></i> Vencido </div>
                                            </div>
    
                                            <div className="article-title">
                                                <h2><Link to={"/Suscriptor-DetallesPublicacion/"+ this.state.infPub[i].Id_Publicacion}>{this.state.infPub[i].Titulo}</Link></h2>
                                            </div>
                                        </div>
                                        <div className="article-details">
                                            <p>{this.state.infPub[i].Descripcion}</p>
                                            <div className="article-cta">
                                                <button onClick={this.handleReactivar.bind(this,this.state.infPub[i].Id_Oferta,this.state.infPub[i].Id_Publicacion)} 
                                                className="btn btn-primary">Reactivar Publicacion</button>
                                            </div>
                                        </div>
                                    </article>
                                </div>    
                            )
                        }
                        else{
                            return(
                                <div key={i} className="col-12 col-sm-6 col-md-6 col-lg-3">
                                    <article className="article">
                                        <div className="article-header">
                                            <div className="article-image" style={{backgroundImage:`url(${this.state.infPub[i].Imagen})`}}>
                                            </div>
    
                                            <div className="article-title">
                                                <h2><Link to={"/Suscriptor-DetallesPublicacion/"+ this.state.infPub[i].Id_Publicacion}>{this.state.infPub[i].Titulo}</Link></h2>
                                            </div>
                                        </div>
                                        <div className="article-details">
                                            <p>{this.state.infPub[i].Descripcion}</p>
                                            <div className="article-cta">
                                                <Link to={"/Suscriptor-DetallesPublicacion/"+ this.state.infPub[i].Id_Publicacion} className="btn btn-primary">Ver Detalles</Link>
                                            </div>
                                        </div>
                                    </article>
                                </div>    
                            )
                        }
                    })}
                        
                
                    </div>
                    ):(
                    <div>
                        <div id="publicaciones_list" className="row">
                            <div id="contenedor_publicacion" className="col-12 col-sm-12 col-md-12 col-lg-12 col-center">
                                <img src={imagenSusc} className="img-responsive col-center" width="300px" alt="imagen suscripcion"/>
                                <h4 className="txt_imagen">No hay publicación Activa Disponible </h4>
                            </div>
                        </div>
                    </div>
                    )
                }
            </div>
                )}
            </div>
        )
    }
}

export default PublicacionesDisponibles;