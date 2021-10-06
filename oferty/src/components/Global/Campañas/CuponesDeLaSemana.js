import React, { Component } from 'react';
import './css/Campanas.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'font-awesome/css/font-awesome.min.css';


import Header from '../Header';
import {Link} from 'react-router-dom';
import config from '../../../config/config';
import axios from "axios";

import rating from '../Functions/RatingStar';

import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";

//Importar imagenes
import BannerSemana from '../images/banner/banner_ofertas.jpg';
import cintilloOferta from '../images/Cintillos/vendeOferty2.jpg';
import semana_et from '../images/etiquetas/OffSemana.png';
import cintilloVender from '../images/Cintillos/vendeOferty.jpg';
import Footer from '../Footer';
import Temporizador from '../Temporizador';


const axiosInstance = axios.create({
  baseURL: config.backURL
});



class CuponesDeLaSemana extends Component {
    

    constructor(props) {
      super(props);
      this.state ={cupLunes:[], cupMartes:[], cupMiercoles:[], cupJueves:[], cupViernes:[], cupSabado:[], cupDomingo:[], loading:true, loading2:true}
      this._isMounted = false;
    }

  //Obtener cupones desde la base de dato
  async getAllCupones(){
    //Lunes
    axiosInstance.get('/readCuponesLunes').then(res => {
      this.setState({...this.state.cupLunes, cupLunes:res.data});
      this.setState({loading:false});
    })

    //Martes
    axiosInstance.get('/readCuponesMartes').then(res => {
      if (this._isMounted){
        this.setState({...this.state.cupMartes, cupMartes:res.data});
        this.setState({loading2:false});
      }

    })

    //Lunes
    axiosInstance.get('/readCuponesMiercoles').then(res => {
      if (this._isMounted){
        this.setState({...this.state.cupMiercoles, cupMiercoles:res.data});
      }
    })
    
    //Lunes
    axiosInstance.get('/readCuponesJueves').then(res => {
      if (this._isMounted){
        this.setState({...this.state.cupJueves, cupJueves:res.data});
      }
    })

    //Lunes
    axiosInstance.get('/readCuponesViernes').then(res => {
      if (this._isMounted){
        this.setState({...this.state.cupViernes, cupViernes:res.data});
      }
    })

    //Lunes
    axiosInstance.get('/readCuponesSabado').then(res => {
      if (this._isMounted){
        this.setState({...this.state.cupSabado, cupSabado:res.data});
      }
    })

    //Lunes
    axiosInstance.get('/readCuponesDomingo').then(res => {
      if (this._isMounted){
        this.setState({...this.state.cupDomingo, cupDomingo:res.data});
      }
    })
        
  }

  onChange(name, value, cupon) {
    rating(value,name.i,cupon);
  }

  setRedirect = () =>{
    this.setState({ redirect: true})
  }

  componentDidMount = ()=>{
    this._isMounted = true;
    this._isMounted && this.getAllCupones();
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  }

  render(){
    return(
 
      <div id="section_campana" className="">
          <Header></Header>

          <div id="snackbar">
          </div>
          
          <div className="outer-top-ts top-banner">
            <div className='container'>
              <img className="img_public img-responsive" src={BannerSemana} alt="Banner de la Semana"/>
            </div>

          </div>


          {this.state.loading && this.state.loading2 ? (
            <div className="loader-pages">
              <div className="loaders">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            ) : (

              <div className="body-content outer-top-ts">
            <div className='container'>
              <div className='row'>
                
                <section id="productos" data-stellar-background-ratio="0.5">
                    <div className="col-md-12 col-sm-12 section_ofertaspub">
                      <img className="img_public img-responsive" src={cintilloOferta} alt="Cintillo vender"/>
                    </div>
                </section>

                <div id="SectionSemanaLunes" className="container">
                  <div id="SemanaListas" className="col-md-12 col-sm-12">
                    <section id="productos">
                        <div className="section-title wow fadeInUp tittle-bar" data-wow-delay="0.1s">
                          <div className="col-md-12 camp-margin margin-xs">
                            <div className="col-md-4 line_diag">
                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>
                            </div>

                            <div className="col-md-4 tittle_def">
                              <h2 className="Style_Tittle">LUNES</h2>
                            </div>

                            <div className="col-md-4 margin_lineas">

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                          </div>
                        </div>
                      </div>
                    </section>
                  </div>

                  <div id="Lunes_Semana" className="col-xs-12 col-sm-12 col-md-12 columnas-Semana">
                    {Object.keys(this.state.cupLunes).map (i =>{
                      var valor = (this.state.cupLunes[i].Contador / this.state.cupLunes[i].Disponibilidad_Estandar) * 100;
                      var tiempo = new Date(this.state.cupLunes[i].Fecha_Vencimiento) - Date.now();
                      var style = '';
                      if(tiempo < 0){
                        style='img-agotado';
                      }
                      if(this.state.cupLunes[i].Contador === this.state.cupLunes[i].Disponibilidad_Estandar){
                        style='img-agotado';
                      }
                      return (
                        <div key={i} className="col-xs-12 col-md-6 col1 m-campana">
                            <div className="Promocion2">
                              <div className={`${style}`}></div>
                              <div className="promocion_2 imagen_oferta2" style={{backgroundImage:`url(${this.state.cupLunes[i].Imagen})`}}>
                              <div className="etiq_semana">
                                <img src={semana_et} alt="Etiqueta Semana"/>
                              </div>
                              </div>
                              <div className="txt_information">
                                  <h3 className="Nombre_Oferta">{this.state.cupLunes[i].Titulo}</h3>
                                  <div className="show-code"><Link to={"/Detalles-Cupon/Cupones/"+ this.state.cupLunes[i].Id}>AGREGAR CUPÓN</Link></div>
                                  <div className="contenedor-progress">
                                    <ProgressBar percent={valor} filledBackground="linear-gradient(to right, #5494f9,#ff7100, #cb0000)" height={18}/>
                                  </div>
                              </div>
                              <div className="cronometro">
                                  <Temporizador dataFromParent={this.state.cupLunes[i].Id} dataFromParent2="Cupones"></Temporizador>
                              </div>
                            </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                
                <div id="banner-susc00" className="col-xs-12 col-sm-12 col-md-12">
                    <a href="Suscripciones.html">
                      <img src={cintilloVender} className="img-responsive" alt="Suscribete"/>
                    </a>
                </div>

                <div id="SectionSemanaMartes" className="container">
                  <div id="SemanaListas" className="col-md-12 col-sm-12">
                    <section id="productos">
                        <div className="section-title wow fadeInUp tittle-bar" data-wow-delay="0.1s">
                          <div className="col-md-12 camp-margin margin-xs">
                            <div className="col-md-4 line_diag">
                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>
                            </div>

                            <div className="col-md-4 tittle_def">
                              <h2 className="Style_Tittle">MARTES</h2>
                            </div>

                            <div className="col-md-4 margin_lineas">

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                          </div>
                        </div>
                      </div>
                    </section>
                  </div>

                  <div id="Martes_Semana" className="col-xs-12 col-sm-12 col-md-12 columnas-Semana">
                    {Object.keys(this.state.cupMartes).map (i =>{
                      var valor = (this.state.cupMartes[i].Contador / this.state.cupMartes[i].Disponibilidad_Estandar) * 100;
                      var tiempo = new Date(this.state.cupMartes[i].Fecha_Vencimiento) - Date.now();
                      var style = '';
                      if(tiempo < 0){
                        style='img-agotado';
                      }
                      if(this.state.cupMartes[i].Contador === this.state.cupMartes[i].Disponibilidad_Estandar){
                        style='img-agotado';
                      }
                      return (
                        <div key={i} className="col-xs-12 col-md-6 col1 m-campana">
                            <div className="Promocion2">
                              <div className={`${style}`}></div>
                              <div className="promocion_2 imagen_oferta2" style={{backgroundImage:`url(${this.state.cupMartes[i].Imagen})`}}>
                              <div className="etiq_semana">
                                <img src={semana_et} alt="Etiqueta Semana martes"/>
                              </div>
                              </div>
                              <div className="txt_information">
                                  <h3 className="Nombre_Oferta">{this.state.cupMartes[i].Titulo}</h3>
                                  <div className="show-code"><Link to={"/Detalles-Cupon/Cupones/"+ this.state.cupMartes[i].Id}>Agregar CUPÓN</Link></div>
                                  <div className="contenedor-progress">
                                    <ProgressBar percent={valor} filledBackground="linear-gradient(to right, #5494f9,#ff7100, #cb0000)" height={18}/>
                                  </div>
                              </div>
                              <div className="cronometro">
                                  <Temporizador dataFromParent={this.state.cupMartes[i].Id} dataFromParent2="Cupones"></Temporizador>
                              </div>
                            </div>
                        </div>
                      )
                    })}
                  </div>

                </div>  

                <div id="SectionSemanaMier" className="container">
                  <div id="SemanaListas" className="col-md-12 col-sm-12">
                    <section id="productos">
                        <div className="section-title wow fadeInUp tittle-bar" data-wow-delay="0.1s">
                          <div className="col-md-12 camp-margin margin-xs">
                            <div className="col-md-4 line_diag">
                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>
                            </div>

                            <div className="col-md-4 tittle_def">
                              <h2 className="Style_Tittle">MIERCOLES</h2>
                            </div>

                            <div className="col-md-4 margin_lineas">

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                          </div>
                        </div>
                      </div>
                    </section>
                  </div>

                  <div id="Martes_Semana" className="col-xs-12 col-sm-12 col-md-12 columnas-Semana">
                    {Object.keys(this.state.cupMiercoles).map (i =>{
                      var valor = (this.state.cupMiercoles[i].Contador / this.state.cupMiercoles[i].Disponibilidad_Estandar) * 100;
                      var tiempo = new Date(this.state.cupMiercoles[i].Fecha_Vencimiento) - Date.now();
                      var style = '';
                      if(tiempo < 0){
                        style='img-agotado';
                      }
                      if(this.state.cupMiercoles[i].Contador === this.state.cupMiercoles[i].Disponibilidad_Estandar){
                        style='img-agotado';
                      }
                      return (
                        <div key={i} className="col-xs-12 col-md-6 col1 m-campana">
                            <div className="Promocion2">
                              <div className={`${style}`}></div>
                              <div className="promocion_2 imagen_oferta2" style={{backgroundImage:`url(${this.state.cupMiercoles[i].Imagen})`}}>
                              <div className="etiq_semana">
                                <img src={semana_et} alt="Etiqueta Semana miercoles"/>
                              </div>
                              </div>
                              <div className="txt_information">
                                  <h3 className="Nombre_Oferta">{this.state.cupMiercoles[i].Titulo}</h3>
                                  <div className="show-code"><Link to={"/Detalles-Cupon/Cupones/"+ this.state.cupMiercoles[i].Id}>AGREGAR CUPÓN</Link></div>
                                  <div className="contenedor-progress">
                                    <ProgressBar percent={valor} filledBackground="linear-gradient(to right, #5494f9,#ff7100, #cb0000)" height={18}/>
                                  </div>  
                              </div>
                              <div className="cronometro">
                                  <Temporizador dataFromParent={this.state.cupMiercoles[i].Id} dataFromParent2="Cupones"></Temporizador>
                              </div>
                            </div>
                        </div>
                      )
                    })}
                  </div>

                </div>  
                
                <div id="SectionSemanaJuev" className="container">
                  <div id="SemanaListas" className="col-md-12 col-sm-12">
                    <section id="productos">
                        <div className="section-title wow fadeInUp tittle-bar" data-wow-delay="0.1s">
                          <div className="col-md-12 camp-margin margin-xs">
                            <div className="col-md-4 line_diag">
                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>
                            </div>

                            <div className="col-md-4 tittle_def">
                              <h2 className="Style_Tittle">JUEVES</h2>
                            </div>

                            <div className="col-md-4 margin_lineas">

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                          </div>
                        </div>
                      </div>
                    </section>
                  </div>

                  <div id="Martes_Semana" className="col-xs-12 col-sm-12 col-md-12 columnas-Semana">
                    {Object.keys(this.state.cupJueves).map (i =>{
                      var valor = (this.state.cupJueves[i].Contador / this.state.cupJueves[i].Disponibilidad_Estandar) * 100;
                      var tiempo = new Date(this.state.cupJueves[i].Fecha_Vencimiento) - Date.now();
                      var style = '';
                      if(tiempo < 0){
                        style='img-agotado';
                      }
                      if(this.state.cupJueves[i].Contador === this.state.cupJueves[i].Disponibilidad_Estandar){
                        style='img-agotado';
                      }
                      return (
                        <div key={i} className="col-xs-12 col-md-6 col1 m-campana">
                            <div className="Promocion2">
                              <div className={`${style}`}></div>
                              <div className="promocion_2 imagen_oferta2" style={{backgroundImage:`url(${this.state.cupJueves[i].Imagen})`}}>
                              <div className="etiq_semana">
                                <img src={semana_et} alt="Etiqueta Semana jueves"/>
                              </div>
                              </div>
                              <div className="txt_information">
                                  <h3 className="Nombre_Oferta">{this.state.cupJueves[i].Titulo}</h3>
                                  <div className="show-code"><Link to={"/Detalles-Cupon/Cupones/"+ this.state.cupJueves[i].Id}>AGREGAR CUPÓN</Link></div>

                                  <div className="contenedor-progress">
                                    <ProgressBar percent={valor} filledBackground="linear-gradient(to right, #5494f9,#ff7100, #cb0000)" height={18}/>
                                  </div>
                              </div>
                              <div className="cronometro">
                                  <Temporizador dataFromParent={this.state.cupJueves[i].Id} dataFromParent2="Cupones"></Temporizador>
                              </div>
                            </div>
                        </div>
                      )
                    })}
                  </div>

                </div>  
                
                <div id="SectionSemanaVier" className="container">
                  <div id="SemanaListas" className="col-md-12 col-sm-12">
                    <section id="productos">
                        <div className="section-title wow fadeInUp tittle-bar" data-wow-delay="0.1s">
                          <div className="col-md-12 camp-margin margin-xs">
                            <div className="col-md-4 line_diag">
                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>
                            </div>

                            <div className="col-md-4 tittle_def">
                              <h2 className="Style_Tittle">VIERNES</h2>
                            </div>

                            <div className="col-md-4 margin_lineas">

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                          </div>
                        </div>
                      </div>
                    </section>
                  </div>

                  <div id="Martes_Semana" className="col-xs-12 col-sm-12 col-md-12 columnas-Semana">
                    {Object.keys(this.state.cupViernes).map (i =>{
                      var valor = (this.state.cupViernes[i].Contador / this.state.cupViernes[i].Disponibilidad_Estandar) * 100;
                      var tiempo = new Date(this.state.cupViernes[i].Fecha_Vencimiento) - Date.now();
                      var style = '';
                      if(tiempo < 0){
                        style='img-agotado';
                      }
                      if(this.state.cupViernes[i].Contador === this.state.cupViernes[i].Disponibilidad_Estandar){
                        style='img-agotado';
                      }
                      return (
                        <div key={i} className="col-xs-12 col-md-6 col1 m-campana">
                            <div className="Promocion2">
                              <div className={`${style}`}></div>
                              <div className="promocion_2 imagen_oferta2" style={{backgroundImage:`url(${this.state.cupViernes[i].Imagen})`}}>
                              <div className="etiq_semana">
                                <img src={semana_et} alt="Etiqueta Semana viernes"/>
                              </div>
                              </div>
                              <div className="txt_information">
                                  <h3 className="Nombre_Oferta">{this.state.cupViernes[i].Titulo}</h3>
                                  <div className="show-code"><Link to={"/Detalles-Cupon/Cupones/"+ this.state.cupViernes[i].Id}>AGREGAR CUPÓN</Link></div>
                                  <div className="contenedor-progress">
                                    <ProgressBar percent={valor} filledBackground="linear-gradient(to right, #5494f9,#ff7100, #cb0000)" height={18}/>
                                  </div>  
                              </div>
                              <div className="cronometro">
                                  <Temporizador dataFromParent={this.state.cupViernes[i].Id} dataFromParent2="Cupones"></Temporizador>
                              </div>
                            </div>
                        </div>
                      )
                    })}
                  </div>

                </div>  

                <div id="SectionSemanaSab" className="container">
                  <div id="SemanaListas" className="col-md-12 col-sm-12">
                    <section id="productos">
                        <div className="section-title wow fadeInUp tittle-bar" data-wow-delay="0.1s">
                          <div className="col-md-12 camp-margin margin-xs">
                            <div className="col-md-4 line_diag">
                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>
                            </div>

                            <div className="col-md-4 tittle_def">
                              <h2 className="Style_Tittle">SÁBADO</h2>
                            </div>

                            <div className="col-md-4 margin_lineas">

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                          </div>
                        </div>
                      </div>
                    </section>
                  </div>

                  <div id="Martes_Semana" className="col-xs-12 col-sm-12 col-md-12 columnas-Semana">
                    {Object.keys(this.state.cupSabado).map (i =>{
                      var valor = (this.state.cupSabado[i].Contador / this.state.cupSabado[i].Disponibilidad_Estandar) * 100;
                      var tiempo = new Date(this.state.cupSabado[i].Fecha_Vencimiento) - Date.now();
                      var style = '';
                      if(tiempo < 0){
                        style='img-agotado';
                      }
                      if(this.state.cupSabado[i].Contador === this.state.cupSabado[i].Disponibilidad_Estandar){
                        style='img-agotado';
                      }
                      return (
                        <div key={i} className="col-xs-12 col-md-6 col1 m-campana">
                            <div className="Promocion2">
                              <div className={`${style}`}></div>
                              <div className="promocion_2 imagen_oferta2" style={{backgroundImage:`url(${this.state.cupSabado[i].Imagen})`}}>
                              <div className="etiq_semana">
                                <img src={semana_et} alt="Etiqueta Semana sabado"/>
                              </div>
                              </div>
                              <div className="txt_information">
                                  <h3 className="Nombre_Oferta">{this.state.cupSabado[i].Titulo}</h3>
                                  <div className="show-code"><Link to={"/Detalles-Cupon/TodoUnDolar/"+ this.state.cupSabado[i].Id}>AGREGAR CUPÓN</Link></div>
                                  <div className="contenedor-progress">
                                    <ProgressBar percent={valor} filledBackground="linear-gradient(to right, #5494f9,#ff7100, #cb0000)" height={18}/>
                                  </div>  
                              </div>
                              <div className="cronometro">
                                  <Temporizador dataFromParent={this.state.cupSabado[i].Id} dataFromParent2="Cupones"></Temporizador>
                              </div>
                            </div>
                        </div>
                      )
                    })}
                  </div>

                </div>  
                
                <div id="SectionSemanaDom" className="container">
                  <div id="SemanaListas" className="col-md-12 col-sm-12">
                    <section id="productos">
                        <div className="section-title wow fadeInUp tittle-bar" data-wow-delay="0.1s">
                          <div className="col-md-12 camp-margin margin-xs">
                            <div className="col-md-4 line_diag">
                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>

                                <div className="bg-lineas-diagonales">
                                </div>
                            </div>

                            <div className="col-md-4 tittle_def">
                              <h2 className="Style_Tittle">DOMINGO</h2>
                            </div>

                            <div className="col-md-4 margin_lineas">

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                              <div className="bg-lineas-diagonales">
                              </div>

                          </div>
                        </div>
                      </div>
                    </section>
                  </div>

                  <div id="Martes_Semana" className="col-xs-12 col-sm-12 col-md-12 columnas-Semana">
                    {Object.keys(this.state.cupDomingo).map (i =>{
                      var valor = (this.state.cupDomingo[i].Contador / this.state.cupDomingo[i].Disponibilidad_Estandar) * 100;
                      var tiempo = new Date(this.state.cupDomingo[i].Fecha_Vencimiento) - Date.now();
                      var style = ''
                      if(tiempo < 0){
                        style='img-agotado';
                      }
                      if(this.state.cupDomingo[i].Contador === this.state.cupDomingo[i].Disponibilidad_Estandar){
                        style='img-agotado';
                      }
                      return (
                        <div key={i} className="col-xs-12 col-md-6 col1 m-campana">
                            <div className="Promocion2">
                              <div className={`${style}`}></div>
                              <div className="promocion_2 imagen_oferta2" style={{backgroundImage:`url(${this.state.cupDomingo[i].Imagen})`}}>
                              <div className="etiq_semana">
                                <img src={semana_et} alt="Etiqueta Semana domingo"/>
                              </div>
                              </div>
                              <div className="txt_information">
                                  <h3 className="Nombre_Oferta">{this.state.cupDomingo[i].Titulo}</h3>
                                  <div className="show-code"><Link to={"/Detalles-Cupon/Cupones/"+ this.state.cupDomingo[i].Id}>AGREGAR CUPÓN</Link></div>
                                  <div className="contenedor-progress">
                                    <ProgressBar percent={valor} filledBackground="linear-gradient(to right, #5494f9,#ff7100, #cb0000)" height={18}/>
                                  </div>  
                              </div>
                              <div className="cronometro">
                                  <Temporizador dataFromParent={this.state.cupDomingo[i].Id} dataFromParent2="Cupones"></Temporizador>
                              </div>
                            </div>
                        </div>
                      )
                    })}
                  </div>

                </div>  

                

              </div>
            </div>       
        
          </div>
            )}

          <Footer/>
      </div>  
  
    )
  }
}
export default CuponesDeLaSemana