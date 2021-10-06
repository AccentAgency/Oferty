import React, { Component } from 'react';
import Menu from './Components/Menu';

import config from '../../../config/config';
import axios from "axios";

//Importar imagen
import img from '../images/prod.png';
import swal from 'sweetalert2';
import {Redirect} from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: config.backURL
});

class DetallesPublicacion extends Component{

    constructor(props){
        super(props);
        this.state = {
            id_pub: this.props.match.params.id, detallesPub:'', belleza:'none', salud:'none', comida:'none', dolar:'none', exist:'',
            imgPrin:'', imgSec:'', imgTerc:'', redirect:false, idUser:'', detailCup:''
        }

        this.handleCancelacion = this.handleCancelacion.bind(this);
    }


    //Obtener detalles de publicacion
    detailPub(){
        axiosInstance.get('/getDetailPublicacion/'+this.state.id_pub).then(res => {

            this.setState(prevState => ({
                detallesPub: [...prevState.detallesPub, res.data]
            }))

            this.setState({idUser: res.data.IdUsuario});
            this.setState({detailCup: res.data.Titulo});

            if(res.data.CampBelleza === "Si"){
                this.setState({belleza: 'block'});
            }

            if(res.data.CampSalud === "Si"){
                this.setState({salud: 'block'});
            }

            if(res.data.CampComida === "Si"){
                this.setState({comida: 'block'});
            }

            if(res.data.CampDolar === "Si"){
                this.setState({dolar: 'block'});
            }


            if(res.data.CampBelleza === "No" && res.data.CampComida === "No" && res.data.CampDolar ==="No" && res.data.CampDolar ==="No"){
                this.setState({exist : 'Ninguna campaña seleccionada'});
            }

            //Imagenes

            if(res.data.ImagenPrincipal === "No Disponible"){
                this.setState({imgPrin: img});
            }
            else{
                this.setState({imgPrin: res.data.ImagenPrincipal});
            }

            if(res.data.ImagenSecundaria === "No Disponible"){
                this.setState({imgSec: img});
            }
            else{
                this.setState({imgSec: res.data.ImagenSecundaria});
            }

            if(res.data.ImagenTercera === "No Disponible"){
                this.setState({imgTerc: img});
            }
            else{
                this.setState({imgTerc: res.data.ImagenTercera});
            }
        })    
        
    }

    handleCancelacion(){
        swal.fire({
            title: '¿Desea generar una solicitud para cancelar esta publicación?',
            text:'Para poder considerar su solicitud puede explicarnos las razones en el campo siguiente.',
            input: 'textarea',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
        })
        .then(resultado => {
            if(resultado.isConfirmed){
                if(resultado.value){
                    console.log(this.state.idUser, this.state.id_pub);
                    axiosInstance.post('/getIdCupon', {
                        'IdUser':this.state.idUser,
                        'idPublicacion':this.state.id_pub
                    }).then(res => {
                        axiosInstance.get('getUser/'+this.state.idUser).then(user=>{
                            axiosInstance.post('/cancelPublicacion',{
                                'idCupon':res.data, 
                                'idPublicacion':this.state.id_pub, 
                                'coment':resultado.value, 
                                'IdUser':this.state.idUser,
                                'User': user.data.Nombre,
                                'Detalles': this.state.detailCup
                            }).then(res => {
                                swal.fire({title:"¡Solicitud enviada correctamente!", text:'Pronto nos contactaremos contigo',icon:"success",confirmButtonText: "Aceptar"}).then(res =>{
                                    this.setRedirect();
                                })
                            }).catch(error=> {
                                swal.fire({title:'Ha ocurrido un error, intente más tarde', icon:'error', confirmButtonText:'Aceptar'})
                                this.setRedirect();
                            })
                        })
                    }).catch(error=> {
                        swal.fire({title:'Ha ocurrido un error, intente más tarde', icon:'error', confirmButtonText:'Aceptar'})
                        this.setRedirect();
                    })

                }
                else{
                    alert("Favor rellenar el campo para poder procesar su solicitud")
                }
            }
        })
    }

    setRedirect = () =>{
        this.setState({ redirect: true})
    }

    renderRedirect =() =>{
        if(this.state.redirect){
          return <Redirect to='/Suscriptor-Publicaciones'/>
        }
      }

    componentDidMount = () => {
        this.detailPub();
    }


    render(){
        return(
            <div className="">
                <Menu></Menu>
                {this.renderRedirect()}
                <div id="Publicacion_Detalles" className="main-content">
                    <section className="section">

                    {Object.keys(this.state.detallesPub).map (i=>{
                        return(
                            <div key={i} className="section-body">
                                <div className="row">
                                    <div className="col-12 col-md-8 col-lg-8 col-center">
                                        <div className="card">
                                            <div className="card-header card-btn">
                                                <h4>Detalles de la publicación</h4>
                                                <button className="btn_class" onClick={this.handleCancelacion}>SOLICITAR CANCELACIÓN</button>
                                            </div>

                                            <div className="card-body">
                                                <div className="imagen_cupon">
                                                    <div id="image-preview" className="image-preview" style={{backgroundImage:`url(${this.state.imgPrin})`}}>
                                                        <label htmlFor="image-upload" id="image-label">Modificar</label>
                                                        <input type="file" name="image" id="image-upload" />
                                                    </div>
                                                </div>

                                                <div className="detail_cupon col-md-4 col-xs-12 col-12">
                                                    <h4 id="Titulo_cupon"> </h4>
                                                    <p><span className="bold">Titulo de la oferta: </span> <span id="tit_ofer">{this.state.detallesPub[i].Titulo}</span></p>
                                                    <p><span className="bold">Detalles: </span> <span id="tit_ofer">{this.state.detallesPub[i].Detalles}</span></p>
                                                    <p><span className="bold">Descripción: </span><span id="desc_ofer">{this.state.detallesPub[i].Descripcion}</span> </p>
                                                    <p><span className="bold">Categoría: </span><span id="catg_ofer">{this.state.detallesPub[i].Categoria}</span></p>
                                                    <p><span className="bold">Stock del producto: </span> <span id="stock">{this.state.detallesPub[i].Stock}</span></p>
                                                    <p><span className="bold">Ahorro del cupón: </span> <span id="PrecioOferta">{this.state.detallesPub[i].Oferta}</span></p>
                                                    <p><span className="bold">Dias: </span><span id="dias">{this.state.detallesPub[i].Dias}</span></p>
                                                    <p><span className="bold">Fecha de Cierre: </span> <span id="tit_ofer">{this.state.detallesPub[i].Fecha_Vencimiento}</span></p>
                                                    <p><span className="bold">Plazo de Uso: </span><span id="plazo_uso">{this.state.detallesPub[i].Uso}</span></p>
                                                    <p><span className="bold">Incluye: </span><span id="incluye">{this.state.detallesPub[i].Incluye}</span></p>
                                                    <p><span className="bold">No Incluye: </span><span id="no_incluye">{this.state.detallesPub[i].NoIncluye}</span></p>
                                                    <p><span className="bold">Consideraciones: </span><span id="consider">{this.state.detallesPub[i].Consid}</span></p>
                                                    <p><span className="bold">Contraindicación: </span><span id="contra">{this.state.detallesPub[i].Contraind}</span></p>

                                                    <div className="form-group">
                                                        <p><span className="bold">Campañas Solicitadas:</span>{this.state.exist}</p>
                                                        <label id="select_belleza" className="custom-switch mt-2" style={{display:this.state.belleza}}>
                                                            <input id="belleza" type="checkbox" name="custom-switch-checkbox" className="custom-switch-input" value="Belleza"/>
                                                            <span className="custom-switch-indicator"></span>
                                                            <span className="custom-switch-description">Belleza Top</span>
                                                        </label>

                                                        <label id="select_dolar" className="custom-switch mt-2" style={{display:this.state.dolar}}>
                                                            <input id="dolar" type="checkbox" name="custom-switch-checkbox" className="custom-switch-input" value="Dolar"/>
                                                            <span className="custom-switch-indicator"></span>
                                                            <span className="custom-switch-description">Todo en $1</span>
                                                        </label>

                                                        <label id="select_salud" className="custom-switch mt-2" style={{display:this.state.salud}}>
                                                            <input id="salud" type="checkbox" name="custom-switch-checkbox" className="custom-switch-input" value="Salud"/>
                                                            <span className="custom-switch-indicator"></span>
                                                            <span className="custom-switch-description">Lo Mejor en salud</span>
                                                        </label>

                                                        <label id="select_comida" className="custom-switch mt-2" style={{display:this.state.comida}}>
                                                            <input id="comida" type="checkbox" name="custom-switch-checkbox" className="custom-switch-input" value="Comida"/>
                                                            <span className="custom-switch-indicator"></span>
                                                            <span className="custom-switch-description">Comida</span>
                                                        </label>
                                                    </div>
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
                                                    <div className="form-group col-md-3" >
                                                        <div id="image-preview2" className="image-preview" style={{backgroundImage:`url(${this.state.imgSec})`}}>
                                                            <input type="file" name="image" id="image-upload3" />
                                                        </div>
                                                    </div>

                                                    <div className="form-group col-md-3">
                                                        <div id="image-preview3" className="image-preview" style={{backgroundImage:`url(${this.state.imgTerc})`}}>
                                                            <input type="file" name="image" id="image-upload4" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )})}
                    </section>
                </div>
            </div>
                    
        )
    }
}

export default DetallesPublicacion;