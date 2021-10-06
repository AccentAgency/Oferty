import React, { Component } from 'react';

import config from '../../../../config/config';
import {fire} from '../../../../config/firebase';
import axios from "axios";
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

//Imagen
import imagenSusc from '../../images/suscripcion/FiguraPublicacion.png';

const axiosInstance = axios.create({
    baseURL: config.backURL
});


class PublicacionesPorValidar extends Component{

    state ={
        infPub:''
    }
    constructor(props)
    {
        super(props);
        this.state={
            publicacion:[], infPub: '', negPub:'', publicacionDeny:[], validate:false, validate2:false
        }
  
    }

    getPublicacion(){
        fire.auth().onAuthStateChanged((user) =>{
            if(user){
                axiosInstance.get('/denyValidatePublicacion/'+ user.uid).then(res => {
                    if(res.data != null){
                        Object.keys(res.data).map(item => {
                            axiosInstance.get('/getPublicacion/'+res.data[item].id_Publicacion+'/'+res.data[item].Id_Oferta).then(res => {
                                this.setState(prevState => ({
                                    infPub: [...prevState.infPub, res.data]
                                }))
                            })
                            return this.state.publicacion;
                        })
                    }
                    else{
                        this.setState({validate:true});
                    }
                })

                axiosInstance.get('/denyPublicacion/'+ user.uid).then(res => {
                    this.setState({publicacionDeny: res.data});
                    if(res.data != null){
                        Object.keys(res.data).map(item => {
                            axiosInstance.get('/getPublicacion/'+res.data[item].id_Publicacion+'/'+res.data[item].Id_Oferta).then(res => {
                                this.setState(prevState => ({
                                    negPub: [...prevState.negPub, res.data]
                                }))
                            })
                            return this.state.publicacionDeny;
                        })
                    }
                    else{
                        this.setState({validate2:true});
                    }
                })
            }
        })   
    }

    componentDidMount = () =>{
        this.getPublicacion();
    }

    render(){
        if (this.state.validate || this.state.validate2) return <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        return(
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-center">
                {this.state.infPub.length || this.state.negPub.length ? (
                    <div className="row">
                        
                        {Object.keys(this.state.infPub).map (i=>{
                            return(
                                <div key={this.state.infPub[i].Id_Publicacion} className="col-12 col-sm-6 col-md-6 col-lg-3">
                                    <article className="article">
                                        <div className="article-header">

                                            <div className="article-image" style={{backgroundImage:`url(${this.state.infPub[i].Imagen})`}}>
                                            </div>

                                            <div className="article-badge">
                                                <div className="article-badge-item bg-warning"><i className="far fa-clock"></i> Por Validar</div>
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
                        })}

                        {Object.keys(this.state.negPub).map (i=>{
                            return(
                                <div key={this.state.negPub[i].Id_Publicacion} className="col-12 col-sm-6 col-md-6 col-lg-3">
                                    <article className="article">
                                        <div className="article-header">

                                            <div className="article-image" style={{backgroundImage:`url(${this.state.negPub[i].Imagen})`}}>
                                            </div>

                                            <div className="article-badge">
                                                <div className="article-badge-item bg-danger"><i className="fa fa-window-close"></i>Rechazado</div>
                                            </div>

                                            <div className="article-title">
                                                <h2><Link to={"/Suscriptor-ModificarPublicacion/"+ this.state.negPub[i].Id_Publicacion}>{this.state.negPub[i].Titulo}</Link></h2>
                                            </div>
                                        </div>
                                        <div className="article-details">
                                            <p>{this.state.negPub[i].Descripcion}</p>
                                            <div className="article-cta">
                                                <Link to={"/Suscriptor-ModificarPublicacion/"+ this.state.negPub[i].Id_Publicacion} 
                                                className="btn btn-primary">Revisar/Modificar</Link>
                                            </div>
                                        </div>
                                    </article>
                                </div>    
                            )
                        })}
                        


                    </div>

                ) : (
                    this.state.validate || this.state.validate2 ? (
                        <div>
                            <div id="publicaciones_list" className="row">
                                <div id="contenedor_publicacion" className="col-12 col-sm-12 col-md-12 col-lg-12 col-center">
                                    <img src={imagenSusc} className="img-responsive col-center" width="300px" alt="imagen suscripcion"/>
                                    <h4 className="txt_imagen">No hay publicación por aprobar disponible</h4>
                                </div>
                            </div>
                        </div> 
                    ):(
                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    )

                )}
            </div>
        )
    }
}

export default PublicacionesPorValidar;