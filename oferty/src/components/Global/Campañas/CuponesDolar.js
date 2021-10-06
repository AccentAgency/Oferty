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
import BannerDolar from '../images/banner/Banner_Todo1.jpg';
import cintilloOferta from '../images/Cintillos/banner_ofert.png';
import dolar_et from '../images/etiquetas/dolar.png';
import cintilloVender from '../images/Cintillos/vendeOferty2.jpg';
import Footer from '../Footer';
import Temporizador from '../Temporizador';

const axiosInstance = axios.create({
  baseURL: config.backURL
});



class CuponesDolar extends Component {

    state = {
      c_dolar:[],
      redirect: false,
      loading:true
    }

  //Obtener cupones desde la base de dato
  getAllCupones(){
    axiosInstance.get('/readAllCuponTodoUnDolar').then(res => {
      this.setState({...this.state.c_dolar, c_dolar:res.data});
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
            <img className="img_public img-responsive" src={BannerDolar} alt="Banner Dolar"/>
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
                    <img className="img_public img-responsive" src={cintilloOferta} alt="Cintillo vender"/>
                  </div>
                </section>

                <div id="MejorComida" className="container">
                  <div id="BloqueDolar" className= "col-xs-12 col-sm-12 col-md-12 columnas-Semana">
                    {Object.keys(this.state.c_dolar).map (i =>{
                      var valor = (this.state.c_dolar[i].Contador / this.state.c_dolar[i].Disponibilidad_Estandar) * 100;
                      var tiempo = new Date(this.state.c_dolar[i].Fecha_Vencimiento) - Date.now();
                      var style = '';
                      if(tiempo < 0){
                        style='img-agotado';
                      }
                      if(this.state.c_dolar[i].Contador === this.state.c_dolar[i].Disponibilidad_Estandar){
                        style='img-agotado';
                      }
                      cont++;
                      if(cont === 5){
                        return(
                          <div id="banner-susc01" className="col-xs-12 col-sm-12 col-md-12">
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
                              <div className="promocion_2 imagen_oferta2" style={{backgroundImage:`url(${this.state.c_dolar[i].Imagen})`}}>
                              <div className="etiq_semana">
                                <img src={dolar_et} alt="Etiqueta Dolar"/>
                              </div>
                              </div>
                              <div className="txt_information">
                                  <h3 className="Nombre_Oferta">{this.state.c_dolar[i].Titulo}</h3>
                                  <div className="show-code"><Link to={"/Detalles-Cupon/TodoUnDolar/"+ this.state.c_dolar[i].Id}>AGREGAR CUPÓN</Link></div>
                                  <div className="contenedor-progress">
                                    <ProgressBar percent={valor} filledBackground="linear-gradient(to right, #5494f9,#ff7100, #cb0000)" height={18}/>
                                  </div>  
                              </div>
                              <div className="cronometro">
                                <Temporizador dataFromParent={this.state.c_dolar[i].Id} dataFromParent2="TodoUnDolar"></Temporizador>
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
export default CuponesDolar