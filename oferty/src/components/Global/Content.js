
import React, { Component } from 'react';
import './css/Content.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from "react-bootstrap/Carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Slider from "react-elastic-carousel";
import Item from "./Item";
import Cupones from './CuponesDestacados';
import Temporizador from './Temporizador';
import 'font-awesome/css/font-awesome.min.css';
import {Redirect} from 'react-router-dom';
import config from '../../config/config';
import axios from "axios";

import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";

//Imagenesy
import slider1 from './images/banner/banner_cupon.png';
import slider2 from './images/banner/00-prox.jpg';
import slider3 from './images/banner/banner_ofertas.jpg';
import slider4 from './images/banner/Banner_SoloporHoy.jpg';
import slider5 from './images/banner/Banner_Todo1.jpg';
import slider6 from './images/banner/BannerMejorSalud.jpg';
import slider7 from './images/banner/bannerBelleza.jpg';
import slider8 from './images/banner/BannerComida.jpg';
import slider9 from './images/banner/BannerCuponera.jpg';
import vipoferty from './images/banner/vipoferty.jpg';
import belleza from './images/belleza.png';
import comida from './images/comida.png';
import prod from './images/productos.png';
import salud from './images/salud.png';
import serv from './images/servicio.png';

//Imagenes etiquetas
import soloHoy from './images/etiquetas/SoloHoy.png';
import belleza_et from './images/etiquetas/belleza.png';
import salud_et from './images/etiquetas/salud.png';
import comida_et from './images/etiquetas/comida.jpg';

import {Link} from 'react-router-dom';

import rating from './Functions/RatingStar';




//Axios
const axiosInstance = axios.create({
  baseURL: config.backURL
});



const breakPoints = [
  { width: 1, itemsToShow: 1, itemsToScroll:1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 1 },
  { width: 768, itemsToShow: 3, itemsToScroll: 3 },
  { width: 1200, itemsToShow: 3, itemsToScroll: 3 }
];


class Content extends Component {

  
  
  //Peticion a la Base de Datos
    state = {
      data : [],
      banner : [],
      favorito:[],
      cuponHoy: [],
      c_salud:[],
      c_belleza: [],
      c_comida: [],
      openAlert: false,
      openFalse: true,
      redirect: false,
      loading:true,
      loading2: true
    }
    



    onChange(name, value, cupon) {
      rating(value,name.i,cupon);
      setTimeout(() => {
        this.setRedirect();
      }, 2000);
      
    }

    setRedirect = () =>{
      this.setState({ redirect: true})
    }

    renderRedirect =() =>{
      if(this.state.redirect){
        return <Redirect to='/Login'/>
      }
    }




    //Funcion para cargar datos
    loadData(){
      axiosInstance.get('/readSlider')
      .then(res => {
        this.setState({...this.state.data, data:res.data});
        this.setState({loading:false});
      })

      axiosInstance.get('/readBanner')
      .then(res =>{
        this.setState({...this.state.banner, banner:res.data});
        this.setState({loading2:false});
      })

      
      axiosInstance.get('/readCuponesSemana')
      .then(res =>{
        this.setState({...this.state.favorito, favorito:res.data});
      })

      axiosInstance.get('/readCuponesHoy')
      .then(res =>{
        this.setState({...this.state.cuponHoy, cuponHoy:res.data});
      })

      axiosInstance.get('/readCuponSalud')
      .then(res =>{
        this.setState({...this.state.c_salud, c_salud:res.data});
      })

      axiosInstance.get('/readCuponBelleza')
      .then(res =>{
        this.setState({...this.state.c_belleza, c_belleza:res.data});
      })

      axiosInstance.get('/readCuponComida')
      .then(res =>{
        this.setState({...this.state.c_comida, c_comida:res.data});
      })
    }
    

    componentDidMount=() =>{
      this.loadData();
    }


    

  render(){
    return(

      <div className="">
        <div id="snackbar">
        </div>

        {this.renderRedirect()}


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
        <div id="inicio" className="body-content outer-top-ts">

          <div className="row">
            <div className="container slider-sectioner">
              <div className="slider-section">
                <div className="col-xs-12 col-sm-12 col-md-12 homebanner-holder">
                    <div id="hero" className="superposicion">
                      <Carousel>
                          <Carousel.Item>
                            <Link to="/Cupones">
                              <img className="d-block w-100" src={slider1} alt="¡CupoManiacos!" />
                            </Link>  
                          </Carousel.Item>
                          <Carousel.Item>
                            <img className="d-block w-100" src={slider9} alt="Arma tu Cuponera" />
                          </Carousel.Item>
                          <Carousel.Item>
                            <img className="d-block w-100" src={slider2} alt="Proximamente App" />
                          </Carousel.Item>
                          <Carousel.Item>
                            <Link to="/Cupones-Destacados">
                              <img className="d-block w-100" src={vipoferty} alt="Cupones Destacados" />
                            </Link>
                          </Carousel.Item>
                          <Carousel.Item>
                            <Link to="/Cupon-de-la-Semana">
                              <img className="d-block w-100" src={slider3} alt="Cupones de la Semana" />
                            </Link>  
                          </Carousel.Item>
                          <Carousel.Item>
                            <Link to="/Cupon-de-la-Semana">
                              <img className="d-block w-100" src={slider4} alt="Solo por Hoy" />
                            </Link>  
                          </Carousel.Item>
                          <Carousel.Item>
                            <Link to="/Cupon-Dolar">
                              <img className="d-block w-100" src={slider5} alt="Todo en $1" />
                            </Link>
                          </Carousel.Item>
                          <Carousel.Item>
                            <Link to="/Cupon-Mejor-Salud">
                              <img className="d-block w-100" src={slider6} alt="Lo mejor en Salud" />
                            </Link>
                          </Carousel.Item>
                          <Carousel.Item>
                            <Link to="/Cupon-BellezaTop">
                              <img className="d-block w-100" src={slider7} alt="Belleza Top" />
                            </Link>  
                          </Carousel.Item>
                          <Carousel.Item>
                            <Link to="/Cupon-Comida">
                              <img className="d-block w-100" src={slider8} alt="Lo mejor en Comida" />
                            </Link>  
                          </Carousel.Item>
                      </Carousel>
                    </div>
                </div>
              </div>
              {/* SECCION DE CATEGORIA*/}
              <div className="row">
                <div id="WAButton"></div>
                <div id="botones_inicio" className= "col-xs-12 col-sm-12 col-md-12">
                    <div className="col-xs-3 col-sm-6 col-md-4 col-lg-2 col-lg-offset-0 text-center categorias catg_sola">
                      <div className="img_icon">
                          <Link to="/Cupones-Categoria/Productos">
                            <img className="category" src={prod} alt="Categoria Productos"/>
                          </Link>
                      </div>
                    </div>
                    <div className="col-xs-3 col-sm-6 col-md-4 col-lg-2 text-center col-lg-offset-0 categorias catg_seg">
                      <div className="img_icon">
                          <Link to="/Cupones-Categoria/Comida">
                            <img className="category" src={comida} alt="Categoria Comida"/>
                          </Link>
                      </div>
                    </div>
                    <div className="col-xs-3 col-sm-6 col-md-4 col-lg-2 text-center col-lg-offset-0 categorias catg_terc">
                      <div className="img_icon">
                          <Link to="/Cupones-Categoria/Belleza">
                            <img className="category" src={belleza} alt="Categoria Belleza"/>
                          </Link>
                      </div>
                    </div>
                    <div className="col-xs-3 col-sm-6 col-md-4 col-lg-2 text-center col-lg-offset-0 categorias catg_cuar">
                      <div className="img_icon">
                          <Link to="/Cupones-Categoria/Salud">
                            <img className="category" src={salud} alt="Categoria Salud"/>
                          </Link>
                      </div>
                    </div>
                    <div className="col-xs-3 col-sm-6 col-md-4 col-lg-2 text-center col-lg-offset-0 categorias catg_quin">
                      <div className="img_icon">
                          <Link to="/Cupones-Categoria/Servicios">
                            <img className="category" src={serv} alt="Categoria Servicios"/>
                          </Link>
                      </div>
                    </div>
                </div>
              </div>
              {/*CUPONES DE LA SEMANA*/}
              <div id="product-tabs-slider" className="scroll-tabs wow fadeInUp">
                <div className="more-info-tab clearfix ">
                    <div className="titulo_destacado">
                      <h2>CUPONES DE LA SEMANA</h2>
                      <div className="button_destc">
                          <Link to="/Cupon-de-la-Semana">VER TODOS </Link>
                      </div>
                    </div>
                </div>
                <div className="tab-content outer-top-xs">
                    <div className="tab-pane in active" id="all">
                      <Slider breakPoints={breakPoints}>
                          {Object.keys(this.state.data).map (i =>{
                            var tiempo = new Date(this.state.data[i].Fecha_Vencimiento) - Date.now();
                            var style = '';
                            if(tiempo < 0){
                              style='link';
                            }
                            if(this.state.data[i].Contador === this.state.data[i].Disponibilidad_Estandar){
                              style='link';
                            }
                            return( 
                              <Item key={i}>
                                <div className="products">
                                    <div className="product">
                                      <Link className={`${style}`} to={"/Detalles-Cupon/CuponSemana/"+ this.state.data[i].Id}>
                                        <div className="product-image">
                                            <div className="image">
                                              <Temporizador dataFromParent={this.state.data[i].Id} dataFromParent2="CuponSemana"></Temporizador>
                                                <img id="promo1" src={this.state.data[i].Imagen} alt=""/>
                                            </div>
                                        </div>
                                      </Link>
                                      <div className="product-info text-left">
                                          <div className="brand"><img id="log1" className="logo_marca" src={this.state.data[i].Logo} alt="Logo"/></div>
                                          <div className="Contenedor">
                                            <h3 id="tit1" className="name"><Link to={"/Detalles-Cupon/Cupones/"+ i}></Link>{this.state.data[i].Titulo}</h3>
                                            <div className="Star star01" data-id="0"></div>
                                            <div className="description"></div>
                                            <div className="product-price" translate="no"> 50% OFF </div>
                                          </div>
                                      </div>
                                    </div>
                                </div>
                              </Item>
                            )
                          })}
                      </Slider>
                    </div>
                </div>
              </div>
              
              <div className="col-md-12 col-sm-12 col-xs-12 columna_cuponSemana">
                {Object.keys(this.state.banner).map (i =>{
                //Calcular la barra
                var valor = (this.state.banner[i].Contador / this.state.banner[i].Disponibilidad_Estandar) * 100;
                var tiempo = new Date(this.state.banner[i].Fecha_Vencimiento) - Date.now();
                var style = ''
                if(tiempo < 0){
                  style='img-agotado';
                }
                if(this.state.banner[i].Contador === this.state.banner[i].Disponibilidad_Estandar){
                  style='img-agotado';
                }
                return (
                  <div key={i} id="banner-destacado" className="col-xs-12 col-md-6 col1 m-2">
                      <div className="Promocion2">
                        <div className={`${style}`}></div>
                        <div id="Banner1" className="promocion_2 imagen_oferta2" style={{backgroundImage:`url(${this.state.banner[i].Imagen})`}}>
                        </div>
                        <div className="txt_information">
                            <h3 id="titulo_ofer1" className="Nombre_Oferta">{this.state.banner[i].Titulo}</h3>
                            <span id="detalles_ofer1"></span>
                            <div id="Promo2" className="show-code"><Link to={"/Detalles-Cupon/CuponSemana/"+ this.state.banner[i].Id}>AGREGAR CUPÓN</Link></div>
                            <div className="star" id={i}>

                            </div>
                            <div className="contenedor-progress">
                              <ProgressBar percent={valor} filledBackground="linear-gradient(to right, #5494f9,#ff7100, #cb0000)" height={18}/>
                            </div>  
                        </div>
                        <div className="cronometro">
                          <Temporizador dataFromParent={this.state.banner[i].Id} dataFromParent2="CuponSemana"></Temporizador>
                        </div>
                      </div>
                  </div>
                )
                })}
              </div>

              <div className="col-xs-12 col-sm-12 col-md-12 col-pd contenedor-cuponesDest">
                <Cupones></Cupones>  
              </div>
            
              {/*CUPONES FAVORITOS*/}
              <div className="col-xs-12 col-sm-12 col-md-12 col-ld">
                <div id="ofert_sem" className="wide-banners wow fadeInUp outer-bottom-bs">


                  <div className="more-info-tab clearfix ">
                    <div className="titulo_destacado">
                      <h2>CUPONES FAVORITOS</h2>
                      <div className="button_destc">
                          <Link to="/Cupones">VER TODOS </Link>
                      </div>

                    </div>

                    <div id="SectionSemana" className= "col-xs-12 col-sm-12 col-md-12 col-pd">
                      {Object.keys(this.state.favorito).map (i =>{
                      //Calcular la barra
                        var valor = (this.state.favorito[i].Contador / this.state.favorito[i].Disponibilidad_Estandar) * 100;
                        var tiempo = new Date(this.state.favorito[i].Fecha_Vencimiento) - Date.now();
                        var style = ''
                        if(tiempo < 0){
                          style='img-agotado';
                        }
                        if(this.state.favorito[i].Contador === this.state.favorito[i].Disponibilidad_Estandar){
                          style='img-agotado';
                        }
                        return (
                          <div key={i} className="col-xs-6 col-md-6 col1 m-2">
                              <div className="Promocion2">
                                <div className={`${style}`}></div>
                                <div id="Favorito1" className="promocion_2 imagen_oferta2" style={{backgroundImage:`url(${this.state.favorito[i].Imagen})`}}>
                                </div>
                                <div className="txt_information">
                                    <h3 id="Favorito" className="Nombre_Oferta">{this.state.favorito[i].Titulo}</h3>
                                    <span id="detalles_fav"></span>
                                    <div id="" className="show-code"><Link to={"/Detalles-Cupon/Cupones/"+ this.state.favorito[i].Id}>AGREGAR CUPÓN</Link></div>
                                    <div className="contenedor-progress">
                                      <ProgressBar percent={valor} filledBackground="linear-gradient(to right, #5494f9,#ff7100, #cb0000)" height={18}/>
                                    </div>
                                </div>
                                <div className="cronometro">
                                  <Temporizador dataFromParent={this.state.favorito[i].Id} dataFromParent2="Cupones"></Temporizador>
                                </div>
                              </div>
                          </div>
                        )
                      })}
                    </div>   
                </div>
              </div>  
              </div>

              {/*CUPONES DE HOY*/}
              <div className="col-xs-12 col-sm-12 col-md-12 col-ld">
                <div id="ofert_hoy" className="wide-banners wow fadeInUp outer-bottom-bs">

                <div className="more-info-tab clearfix ">
                  <div className="titulo_destacado">
                    <h2>CUPONES SOLO POR HOY</h2>
                    <div className="button_destc">
                        <Link to="/Cupon-de-la-Semana">VER TODOS </Link>
                    </div>

                  </div>

                  <div id="SectionHoy" className= "col-xs-12 col-sm-12 col-md-12 col-pd">
                    {Object.keys(this.state.cuponHoy).map (i =>{
                      //Calcular la barra
                      var valor = (this.state.cuponHoy[i].Contador / this.state.cuponHoy[i].Disponibilidad_Estandar) * 100;
                      var tiempo = new Date(this.state.cuponHoy[i].Fecha_Vencimiento) - Date.now();
                      var style = ''
                      if(tiempo < 0){
                        style='img-agotado';
                      }
                      if(this.state.cuponHoy[i].Contador === this.state.cuponHoy[i].Disponibilidad_Estandar){
                        style='img-agotado';
                      }
                      return (
                        <div key={i} className="col-xs-12 col-md-6 col1 m-2">
                            <div className="Promocion2">
                              <div className={`${style}`}></div>
                              <div className="promocion_2 imagen_oferta2" style={{backgroundImage:`url(${this.state.cuponHoy[i].Imagen})`}}>
                              <div className="etiq_semana">
                                <img src={soloHoy} alt="Etiqueta Solo Hoy"/>
                              </div>
                              </div>
                              <div className="txt_information">
                                  <h3 className="Nombre_Oferta">{this.state.cuponHoy[i].Titulo}</h3>
                                  <div className="show-code"><Link to={"/Detalles-Cupon/Cupones/"+ this.state.cuponHoy[i].Id}>AGREGAR CUPÓN</Link></div>
                                  <div className="contenedor-progress">
                                    <ProgressBar percent={valor} filledBackground="linear-gradient(to right, #5494f9,#ff7100, #cb0000)" height={18}/>
                                  </div>
                              </div>
                              <div className="cronometro">
                                <Temporizador dataFromParent={this.state.cuponHoy[i].Id} dataFromParent2="Cupones"></Temporizador>
                              </div>
                            </div>
                        </div>
                      )
                    })}
                  </div>   
                </div>
              </div>
              </div>

              {/*CUPONES SALUD*/}
              <div className="col-xs-12 col-sm-12 col-md-12 col-ld">
                <div id="ofert_salud" className="wide-banners wow fadeInUp outer-bottom-bs">

                  <div className="more-info-tab clearfix ">
                    <div className="titulo_destacado">
                      <h2>CUPONES LO MEJOR EN SALUD</h2>
                      <div className="button_destc">
                          <Link to="/Cupon-Mejor-Salud">VER TODOS </Link>
                      </div>

                    </div>

                    <div id="SectionSalud" className= "col-xs-12 col-sm-12 col-md-12 col-pd">
                      {Object.keys(this.state.c_salud).map (i =>{
                        //Calcular la barra
                        var valor = (this.state.c_salud[i].Contador / this.state.c_salud[i].Disponibilidad_Estandar) * 100;
                        var tiempo = new Date(this.state.c_salud[i].Fecha_Vencimiento) - Date.now();
                        var style = ''
                        if(tiempo < 0){
                          style='img-agotado';
                        }
                        if(this.state.c_salud[i].Contador === this.state.c_salud[i].Disponibilidad_Estandar){
                          style='img-agotado';
                        }
                        return (
                          <div key={i} className="col-xs-12 col-md-6 col1 m-2">
                              <div className="Promocion2">
                                <div className={`${style}`}></div>
                                <div className="promocion_2 imagen_oferta2" style={{backgroundImage:`url(${this.state.c_salud[i].Imagen})`}}>
                                <div className="etiq_semana">
                                  <img src={salud_et} alt="Etiqueta Salud"/>
                                </div>
                                </div>
                                <div className="txt_information">
                                    <h3 className="Nombre_Oferta">{this.state.c_salud[i].Titulo}</h3>
                                    <div className="show-code"><Link to={"/Detalles-Cupon/MejorEnSalud/"+ this.state.c_salud[i].Id}>AGREGAR CUPÓN</Link></div>
                                    <div className="contenedor-progress">
                                      <ProgressBar percent={valor} filledBackground="linear-gradient(to right, #5494f9,#ff7100, #cb0000)" height={18}/>
                                    </div>
                                </div>
                                <div className="cronometro">
                                  <Temporizador dataFromParent={this.state.c_salud[i].Id} dataFromParent2="MejorEnSalud"></Temporizador>
                                </div>
                              </div>
                          </div>
                        )
                      })}
                    </div>   
                  </div>
                </div>
              </div>

              {/*CUPONES BELLEZA*/}
              <div className="col-xs-12 col-sm-12 col-md-12 col-ld">
                <div id="ofert_belleza" className="wide-banners wow fadeInUp outer-bottom-bs">

                <div className="more-info-tab clearfix ">
                  <div className="titulo_destacado">
                    <h2>CUPONES BELLEZA TOP</h2>
                    <div className="button_destc">
                        <Link to="/Cupon-BellezaTop">VER TODOS </Link>
                    </div>

                  </div>

                  <div id="SectionBelleza" className= "col-xs-12 col-sm-12 col-md-12 col-pd">
                    {Object.keys(this.state.c_belleza).map (i =>{
                      //Calcular la barra
                      var valor = (this.state.c_belleza[i].Contador / this.state.c_belleza[i].Disponibilidad_Estandar) * 100;
                      var tiempo = new Date(this.state.c_belleza[i].Fecha_Vencimiento) - Date.now();
                      var style = ''
                      if(tiempo < 0){
                        style='img-agotado';
                      }
                      if(this.state.c_belleza[i].Contador === this.state.c_belleza[i].Disponibilidad_Estandar){
                        style='img-agotado';
                      }
                      return (
                        <div key={i} className="col-xs-12 col-md-6 col1 m-2">
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

              {/*CUPONES COMIDA*/}
              <div className="col-xs-12 col-sm-12 col-md-12 col-ld">
                <div id="ofert_comida" className="wide-banners wow fadeInUp outer-bottom-bs">

                <div className="more-info-tab clearfix ">
                  <div className="titulo_destacado">
                    <h2>CUPONES DE COMIDA</h2>
                    <div className="button_destc">
                        <Link to="/Cupon-Comida">VER TODOS </Link>
                    </div>

                  </div>

                  <div id="SectionComida" className= "col-xs-12 col-sm-12 col-md-12 col-pd">
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
                      return (
                        <div key={i} className="col-xs-12 col-md-6 col1 m-2">
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
          </div>
        </div>
 
        )}
        
        
      </div>   
    ) 
  }
}

export default Content;