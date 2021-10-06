import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import banner from './images/banner/banner-dorado.png';
import config from '../../config/config';
import logo from './images/iconos/ofertyOro.svg';
import icon from './images/iconos/triangulo.png';
import axios from 'axios';
import Temporizador from './Temporizador';
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
//Axios
const axiosInstance = axios.create({
    baseURL: config.backURL
});

class PaginaDestacados extends Component{
    
    constructor(props)
    {
      super(props);
      this.state = {cuponesVIP:[], cuponesView:[]}
    }

    getCuponeDestacado(){
        axiosInstance.get('/readCuponesVIP').then(res => {
            this.setState({cuponesVIP: res.data})
        })

        axiosInstance.get('/readCuponesMoreView').then(res => {
            this.setState({cuponesView: res.data})
        })
    }
    
    componentDidMount() {
        document.body.classList.add("background-white");
        this.getCuponeDestacado();
    }

    componentWillUnmount() {
        document.body.classList.remove("background-white");
    }
    render(){
        return(
            <div className="destacado">
                <div className="outer-top-t">
                    <div id="destacado" className="container">
                        <div className="contenedor_imagen">
                            
                            <img id="duplicado" className="img-responsive" src={banner} alt=""/>
                            <div className="contenedor-trans-dest">
                                <div className="centrado"><img src={logo} alt="logo"/></div>
                                
                                <div className="btn_oferty">
                                    <Link to="/" className="show-codes color-oro" href="index.html">IR A OFERTY</Link>
                                </div>
                                
                            </div>
                           
                        </div>
                        <div className="contenedor-titulo">
                            <h2>CONOCE NUESTRA SECCIÓN DORADA</h2>
                        </div>
                        <div className="divisor"></div>
                        
                        <div className="contenedor-cuponesDest col-xs-12 col-sm-12 col-md-12">
                            <div id="section-comida" className="section-1">
                                <div className="titulo-cont col-xs-12 col-sm-12 col-md-12">
                                    <div className="img-triang col-xs-12 col-sm-4 col-md-4">
                                        <img className="img-responsive figura-img" src={icon} alt='figura-oferty'></img>
                                    </div>
                                    <div className="texto-dest col-xs-8 col-sm-4 col-md-4">
                                        <h2>VIP</h2>
                                    </div>
                                    <div className="img-triang col-xs-12 col-sm-4 col-md-4">
                                        <img className="img-responsive figura-img2" src={icon} alt='figura-oferty'></img>
                                    </div>
                                </div>

                                <div id="sectionComida" className="col-xs-12 col-sm-12 col-md-12 columnas-Semana">
                                    {Object.keys(this.state.cuponesVIP).map (i =>{
                                    var valor = (this.state.cuponesVIP[i].Contador / this.state.cuponesVIP[i].Disponibilidad_Estandar) * 100;
                                    return (
                                        <div key={i} className="col-xs-12 col-md-6 col-dorado m-campana">
                                            <div className="Promocion2">
                                            <div className="promocion_2 imagen_oferta2" style={{backgroundImage:`url(${this.state.cuponesVIP[i].Imagen})`}}>
                                            </div>
                                            <div className="txt_information">
                                                <h3 className="Nombre_Oferta">{this.state.cuponesVIP[i].Titulo}</h3>
                                                <div className="detalles-cont"><p>{this.state.cuponesVIP[i].Detalles}</p></div>
                                                <div className="show-code-oro"><Link to={"/Detalles-Cupon/Cupones/"+ i}>AGREGAR</Link></div>
                                                <div className="contenedor-progress progress-oro">
                                                    <ProgressBar percent={valor} filledBackground="linear-gradient(135deg, rgba(248,154,12,1) 0%, rgba(255,194,17,1) 19%, 
                                                    rgba(255,245,153,1) 59%, rgba(132,73,0,1) 91%, rgba(248,154,12,1) 100%)" height={18}/>
                                                </div> 
                                                <div className="cronometro-oro">
                                                    <Temporizador dataFromParent={this.state.cuponesVIP[i].Id} dataFromParent2="Cupones"></Temporizador>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    )
                                    })}
                                </div>
                            </div>
                            <div className="col-md-12 divisor-lineal"></div>
                        </div>

                        <div className="contenedor-cuponesDest col-xs-12 col-sm-12 col-md-12">
                            <div id="section-comida" className="section-1">
                                <div className="titulo-cont col-xs-12 col-sm-12 col-md-12">
                                    <div className="img-triang col-xs-12 col-sm-4 col-md-4">
                                        <img className="img-responsive figura-img" src={icon} alt='figura-oferty'></img>
                                    </div>
                                    <div className="texto-dest col-xs-8 col-sm-4 col-md-4">
                                        <h2>LOS MÁS VOTADOS</h2>
                                    </div>
                                    <div className="img-triang col-xs-12 col-sm-4 col-md-4">
                                        <img className="img-responsive figura-img2" src={icon} alt='figura-oferty'></img>
                                    </div>
                                </div>

                                <div id="sectionComida" className="col-xs-12 col-sm-12 col-md-12 columnas-Semana">
                                    {Object.keys(this.state.cuponesView).map (i =>{
                                        console.log(this.state.cuponesView[i]);
                                    var valor = (this.state.cuponesView[i].Contador / this.state.cuponesView[i].Disponibilidad_Estandar) * 100;
                                    return (
                                        <div key={i} className="col-xs-12 col-md-6 col-dorado m-campana">
                                            <div className="Promocion2">
                                            <div className="promocion_2 imagen_oferta2" style={{backgroundImage:`url(${this.state.cuponesView[i].Imagen})`}}>
                                            </div>
                                            <div className="txt_information">
                                                <h3 className="Nombre_Oferta">{this.state.cuponesView[i].Titulo}</h3>
                                                <div className="detalles-cont"><p>{this.state.cuponesView[i].Detalles}</p></div>
                                                <div className="show-code-oro"><Link to={"/Detalles-Cupon/Cupones/"+ i}>AGREGAR</Link></div>
                                                <div className="contenedor-progress progress-oro">
                                                    <ProgressBar percent={valor} filledBackground="linear-gradient(135deg, rgba(248,154,12,1) 0%, rgba(255,194,17,1) 19%, 
                                                    rgba(255,245,153,1) 59%, rgba(132,73,0,1) 91%, rgba(248,154,12,1) 100%)" height={18}/>
                                                </div> 
                                                <div className="cronometro-oro">
                                                    <Temporizador dataFromParent={this.state.cuponesView[i].Id} dataFromParent2="Cupones"></Temporizador>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    )
                                    })}
                                </div>
                            </div>
                            <div className="col-md-12 divisor-lineal"></div>
                        </div>

                        
                    </div>
                </div>
            </div>
        )
    }
}
export default PaginaDestacados;