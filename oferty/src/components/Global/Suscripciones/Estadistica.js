import React, { Component } from 'react';

import config from '../../../config/config';
import {fire} from '../../../config/firebase';
import axios from "axios";
//import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import Menu from './Components/Menu';
import { Sparklines, SparklinesBars } from 'react-sparklines';
import { Link } from 'react-router-dom';
import Footer from '../Administrador/Components/Footer';


//Imagen
import imagenSusc from '../images/suscripcion/FiguraPublicacion.png';


const axiosInstance = axios.create({
    baseURL: config.backURL
});


class Estadistica extends Component{

    constructor(props)
    {
        super(props);
        this.state={
            publicacionActiva : [], fecha:'', validate:false
        }
  
    }

    //Buscar estadistica
    getPublicaciones(){
        fire.auth().onAuthStateChanged((user) =>{
            if(user){
                axiosInstance.get('/getPublicacionUser/'+ user.uid).then(res =>{
                    var value = res.data;
                    console.log(res.data);
                    if(res.data.length > 0){
                        value.forEach(item => {
                            axiosInstance.get('/getCupones/'+ item).then(res => {
                                this.setState(prevState => ({
                                    publicacionActiva: [...prevState.publicacionActiva, res.data]
                                }))
                            })
                        })
                    }
                    else{
                        this.setState({validate:true});
                    }
                })
            }
        })
    }

    componentDidMount = () => {
        this.getPublicaciones();
        var f = new Date();
        var fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
        this.setState({fecha: fecha});
    }

    render(){
        return(
            <div className="">
                <Menu></Menu>

                <div className="main-content">
                {this.state.publicacionActiva.length  > 0 ? (
                    <div className="row">
                        {Object.keys(this.state.publicacionActiva).map (i=>{
                            return(
                                <div key={i} className="col-12 col-sm-12 col-lg-4">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Publicacion: {this.state.publicacionActiva[i].Titulo}</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="">
                                                        <div className="row">
                                                            <div className="col-md-6 col-lg-5">
                                                                <h4 className="mb-0 font-26">{this.state.publicacionActiva[i].Visualizacion ? this.state.publicacionActiva[i].Visualizacion : 0}  +</h4>
                                                                <p className="mb-2">VISUALIZACIONES</p>
                                                                <p id="fecha_estadistica" className="mb-0">
                                                                    <span className="font-20">{this.state.fecha }</span>
                                                                </p>
                                                                <Link to={"/Suscriptor-DetallesEstadisticas/"+ this.state.publicacionActiva[i].Id} 
                                                                className="detail_btn"> Ver Detalles</Link>
                                                            </div>

                                                            <div className="col-md-6 col-lg-7">
                                                            <Sparklines data={[10, 7, 4, 8, 5, 8, 6, 5, 2, 4, 7, 4, 9, 6, 5, 9]}>
                                                                <SparklinesBars style={{ fill: "#5494f9"}} />
                                                            </Sparklines>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                ):(
                    this.state.validate ? (
                    <div id="publicaciones_list" className="row">
                        <div id="contenedor_publicacion" className="col-12 col-sm-12 col-md-12 col-lg-12 col-center">
                            <img src={imagenSusc} className="img-responsive col-center" width="300px" alt="imagen suscripcion"/>
                            <h4 className="txt_imagen">No hay publicación Activa Disponible </h4>
                        </div>
                    </div> 
                    ):(
                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    )
                )}
                </div>
                
                <Footer></Footer>
           </div>
        )
    }
}

export default Estadistica;