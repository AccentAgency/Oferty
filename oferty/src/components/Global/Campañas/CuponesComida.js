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
import BannerComida from '../images/banner/BannerComida.jpg';
import cintilloOferta from '../images/Cintillos/banner_ofert.png';
import comida_et from '../images/etiquetas/comida.jpg';
import cintilloVender from '../images/Cintillos/vendeOferty2.jpg';
import Footer from '../Footer';
import Temporizador from '../Temporizador';

const axiosInstance = axios.create({
  baseURL: config.backURL
});



class CuponesComida extends Component {

    state = {
      c_comida:[],
      redirect: false,
      loading:true
    }

  //Obtener cupones desde la base de dato
  getAllCupones(){
    axiosInstance.get('/readAllCuponComida').then(res => {
      this.setState({...this.state.c_comida, c_comida:res.data});
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
            <img className="img_public img-responsive" src={BannerComida} alt="Banner Comida"/>
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
                    <img className="img_public img-responsive" src={cintilloOferta} alt="Cintillo Vender"/>
                  </div>
                </section>

                <div id="MejorComida" className="container">
                  <div id="BloqueComida" className= "col-xs-12 col-sm-12 col-md-12 columnas-Semana">
                    {Object.keys(this.state.c_comida).map (i =>{
                      var valor = (this.state.c_comida[i].Contador / this.state.c_comida[i].Disponibilidad_Estandar) * 100;
                      var tiempo = new Date(this.state.c_comida[i].Fecha_Vencimiento) - Date.now();
                      var style = ''
                      if(tiempo < 0){
                        style='img-agotado';
                      }
                      if(this.state.c_comida[i].Contador === this.state.c_comida[i].Disponibilidad_Estandar){
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
                              <div className="promocion_2 imagen_oferta2" style={{backgroundImage:`url(${this.state.c_comida[i].Imagen})`}}>
                              <div className="etiq_semana">
                                <img src={comida_et} alt="Etiqueta Comida"/>
                              </div>
                              </div>
                              <div className="txt_information">
                                  <h3 className="Nombre_Oferta">{this.state.c_comida[i].Titulo}</h3>
                                  <div className="show-code"><Link to={"/Detalles-Cupon/Comida/"+ this.state.c_comida[i].Id}>AGREGAR CUPÓN</Link></div>
                                  <div className="contenedor-progress">
                                    <ProgressBar percent={valor} filledBackground="linear-gradient(to right, #5494f9,#ff7100, #cb0000)" height={18}/>
                                  </div>  
                              </div>
                              <div className="cronometro">
                                <Temporizador dataFromParent={this.state.c_comida[i].Id} dataFromParent2="Comida"></Temporizador>
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
export default CuponesComida