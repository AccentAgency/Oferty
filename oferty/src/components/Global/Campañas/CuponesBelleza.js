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
import BannerBelleza from '../images/banner/bannerBelleza.jpg';
import cintilloOferta from '../images/Cintillos/banner_ofert.png';
import belleza_et from '../images/etiquetas/belleza.png';
import cintilloVender from '../images/Cintillos/vendeOferty.jpg';
import Footer from '../Footer';
import Temporizador from '../Temporizador';

const axiosInstance = axios.create({
  baseURL: config.backURL
});



class CuponesBelleza extends Component {

    state = {
      c_belleza:[],
      redirect: false,
      loading:true
    }

  //Obtener cupones desde la base de dato
  getAllCupones(){
    axiosInstance.get('/readAllCuponBelleza').then(res => {
      this.setState({...this.state.c_belleza, c_belleza:res.data});
      this.setState({loading:false});
    })
  }

  onChange(name, value, cupon) {
    rating(value,name.i,cupon);
  }

  setRedirect = () =>{
    this.setState({ redirect: true})
  }

  componentDidMount = ()=>{
    this.getAllCupones();
  }

  render(){
    var cont = 0;
    return(
 
      <div id="section_campana" className="">
          <Header></Header>

          <div id="snackbar">
          </div>
          
          <div className="outer-top-ts top-banner">
            <div className='container'>
              <img className="img_public img-responsive" src={BannerBelleza} alt="Banner belleza"/>
            </div>

          </div>

          {this.state.loading ? (
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
                      <img className="img_public img-responsive" src={cintilloOferta} alt="Vender Oferty"/>
                    </div>
                  </section>

                  <div id="MejorBelleza" className="container">
                    <div id="BloqueBelleza" className= "col-xs-12 col-sm-12 col-md-12 columnas-Semana">
                      {Object.keys(this.state.c_belleza).map (i =>{
                        var valor = (this.state.c_belleza[i].Contador / this.state.c_belleza[i].Disponibilidad_Estandar) * 100;
                        var tiempo = new Date(this.state.c_belleza[i].Fecha_Vencimiento) - Date.now();
                        var style = ''
                        if(tiempo < 0){
                          style='img-agotado';
                        }
                        if(this.state.c_belleza[i].Contador === this.state.c_belleza[i].Disponibilidad_Estandar){
                          style='img-agotado';
                        }
                        cont++;
                        if(cont === 5){
                          return(
                            <div key={i} id="banner-susc01" className="col-xs-12 col-sm-12 col-md-12">
                              <a href="Suscripciones.html">
                                <img src={cintilloVender} className="img-responsive" alt="Suscribete"/>
                              </a>
                            </div>
                          )
                        }
                        return (
                          <div key={i} className="col-xs-12 col-md-6 col1 m-campana">
                              <div className="Promocion2">
                                <div className={`${style}`}></div>
                                <div className="promocion_2 imagen_oferta2" style={{backgroundImage:`url(${this.state.c_belleza[i].Imagen})`}}>
                                <div className="etiq_semana">
                                  <img src={belleza_et} alt="Etiqueta Belleza"/>
                                </div>
                                </div>
                                <div className="txt_information">
                                    <h3 className="Nombre_Oferta">{this.state.c_belleza[i].Titulo}</h3>
                                    <div className="show-code"><Link to={"/Detalles-Cupon/Belleza/"+ this.state.c_belleza[i].Id}>AGREGAR CUPÓN</Link></div>
                                    <div className="contenedor-progress">
                                      <ProgressBar percent={valor} filledBackground="linear-gradient(to right, #5494f9,#ff7100, #cb0000)" height={18}/>
                                    </div>  
                                </div>
                                <div className="cronometro">
                                  <Temporizador dataFromParent={this.state.c_belleza[i].Id} dataFromParent2="Belleza"></Temporizador>
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
          <Footer></Footer>
      </div>  
  
    )
  }
}
export default CuponesBelleza