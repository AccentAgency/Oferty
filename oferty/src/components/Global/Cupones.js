import React, { Component} from 'react';
import './css/CuponesPage.css';
import Header from './Header';
import {Link} from 'react-router-dom';
import config from '../../config/config';
import axios from "axios";

import rating from './Functions/RatingStar';

//Importar imagenes
import BannerCupon from './images/banner/banner_cupon.png';
import Footer from './Footer';


//Botones imagenes css
import botonProducto from './images/botones/productos.png';
import botonComida from './images/botones/comida.png';
import botonBelleza from './images/botones/belleza.png';
import botonServicio from './images/botones/servicios.png';
import botonSalud from './images/botones/salud.png';
import Temporizador from './Temporizador';

import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";

const axiosInstance = axios.create({
  baseURL: config.backURL
});



class Cupones extends Component {

    state = {
        cuponProductos:[], cuponesComida:[], cuponBelleza:[], cuponSalud:[], cuponServicios:[], loading:true, loading2:true
    }
    
    getCuponesCategoria(){
        axiosInstance.get('/getCuponesProductos').then(res =>{
            this.setState({...this.state.cuponProductos, cuponProductos:res.data})
            this.setState({loading:false});
        })

        axiosInstance.get('/getCuponesComida').then(res =>{
            this.setState({...this.state.cuponesComida, cuponesComida:res.data})
            this.setState({loading:false});
        })

        axiosInstance.get('/getCuponesBelleza').then(res =>{
            this.setState({...this.state.cuponBelleza, cuponBelleza:res.data})
        })

        axiosInstance.get('/getCuponesSalud').then(res =>{
            this.setState({...this.state.cuponSalud, cuponSalud:res.data})
        })

        axiosInstance.get('/getCuponesServicios').then(res =>{
            this.setState({...this.state.cuponServicios, cuponServicios:res.data})
        })
    }

    componentDidMount =() =>{
        this.getCuponesCategoria();
    }

    onChange(name, value, cupon) {
        rating(value,name.i,cupon);
    }
    

    render(){
        return(
            <div className="">
                <Header></Header>

                <div id="snackbar">
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
                        <div id="menuProductos" className="container">
                            <div className="row">
                                <div className="outer-top-ts top-banner">
                                    <div className='container'>
                                        <img className="img_public img-responsive" src={BannerCupon} alt="Banner cupon"/>
                                    </div>
                                </div>

                                {/* Menu */}
                                <div className="container">
                                    <div className="wrapper">
                                        <nav className="navbar tab seccion_catg">
                                            <div className="col-md-12">
                                                <div className="nav-bg-class categorias_store navbar-center">
                                                    <div className="navbar-collapse collapse" id="mc-horizontal-menu-collapse">
                                                        <div className="nav-outer">
                                                            <ul className="nav navbar-nav">
                                                                <li><Link to="/Cupones-Categoria/Productos">Productos</Link>
                                                                </li>

                                                                <li className="cambio"> <Link to="/Cupones-Categoria/Comida">Comida</Link>
                                                                </li>

                                                                <li className="cambio"> <Link to="/Cupones-Categoria/Belleza">Belleza</Link>
                                                                </li>

                                                                <li className="cambio"> <Link to="/Cupones-Categoria/Salud">Salud</Link>
                                                                </li>

                                                                <li className="cambio"> <Link to="/Cupones-Categoria/Servicios">Servicios</Link>
                                                                </li>

                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </nav>
                                    </div>
                                </div>

                                
                                <div id="menuProductos" className="container col-xs-12 col-sm-12 col-md-12">
                                    <div id="section-ofertaspage" className="container-img prod_destacado">
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12">
                                                <section id="productos">
                                                    <div className="section-title wow fadeInUp tittle-bar" data-wow-delay="0.1s">
                                                        <div className="col-md-12">
                                                            <img className="img-responsive" src={botonProducto} alt="Producto"/>
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="CatgProductos" className= "col-xs-12 col-sm-12 col-md-12 columnas-Semana">
                                        {Object.keys(this.state.cuponProductos).map (i =>{

                                            var valor = (this.state.cuponProductos[i].Contador / this.state.cuponProductos[i].Disponibilidad_Estandar) * 100;
                                            var tiempo = new Date(this.state.cuponProductos[i].Fecha_Vencimiento) - Date.now();
                                            var style = ''
                                            if(tiempo < 0){
                                            style='img-agotado';
                                            }
                                            if(this.state.cuponProductos[i].Contador === this.state.cuponProductos[i].Disponibilidad_Estandar){
                                                style='img-agotado';
                                            }
                                            return(
                                                <div key={i} className="col-xs-12 col-md-6 col1 m-campana">
                                                    <div className="Promocion2">
                                                        <div className={`${style}`}></div>
                                                        <div className="promocion_2 imagen_oferta2" style={{backgroundImage:`url(${this.state.cuponProductos[i].Imagen})`}}>
                                                        </div>
                                                        <div className="txt_information">
                                                            <h3 className="Nombre_Oferta">{this.state.cuponProductos[i].Titulo}</h3>
                                                            <div className="show-code"><Link to={"/Detalles-Cupon/Cupones/"+ this.state.cuponProductos[i].Id}>AGREGAR CUPÓN</Link></div>
                                                            <div className="contenedor-progress">
                                                                <ProgressBar percent={valor} filledBackground="linear-gradient(to right, #5494f9,#ff7100, #cb0000)" height={18}/>
                                                            </div>    
                                                        </div>
                                                        <div className="cronometro">
                                                            <Temporizador dataFromParent={this.state.cuponProductos[i].Id} dataFromParent2="Cupones"></Temporizador>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="button_more container">
                                        <Link to="/Cupones-Categoria/Productos">VER TODOS </Link>
                                    </div>
                                </div>
                                
                                
                                <div id="menu-comida" className="container col-xs-12 col-sm-12 col-md-12">                
                                    <section id="menuComida" data-stellar-background-ratio="0.5">
                                        <div className="menu-productos">
                                            <div className="container-img prod_destacado">

                                                <div className="row">
                                                    <div className="col-md-12 col-sm-12">
                                                        <section id="productos">
                                                            <div className="section-title wow fadeInUp tittle-bar" data-wow-delay="0.1s">
                                                                <div className="col-md-12">
                                                                    <img className="img-responsive" src={botonComida} alt="Comida"/>
                                                                </div>
                                                            </div>
                                                        </section>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="Productos" className="container">
                                                <div id="CatgProductos" className= "col-xs-12 col-sm-12 col-md-12 columnas-Semana">
                                                    {Object.keys(this.state.cuponesComida).map (i =>{
                                                        var valor = (this.state.cuponesComida[i].Contador / this.state.cuponesComida[i].Disponibilidad_Estandar) * 100;
                                                        var tiempo = new Date(this.state.cuponesComida[i].Fecha_Vencimiento) - Date.now();
                                                        var style = ''
                                                        if(tiempo < 0){
                                                        style='img-agotado';
                                                        }
                                                        if(this.state.cuponesComida[i].Contador === this.state.cuponesComida[i].Disponibilidad_Estandar){
                                                            style='img-agotado';
                                                        }
                                                        return(
                                                            <div key={i} className="col-xs-12 col-md-6 col1 m-campana">
                                                                <div className="Promocion2">
                                                                    <div className={`${style}`}></div>
                                                                    <div className="promocion_2 imagen_oferta2" style={{backgroundImage:`url(${this.state.cuponesComida[i].Imagen})`}}>
                                                                    </div>
                                                                    <div className="txt_information">
                                                                        <h3 className="Nombre_Oferta">{this.state.cuponesComida[i].Titulo}</h3>
                                                                        <div className="show-code"><Link to={"/Detalles-Cupon/Cupones/"+ this.state.cuponesComida[i].Id}>
                                                                            AGREGAR CUPÓN</Link></div>
                                                                        <div className="contenedor-progress">
                                                                            <ProgressBar percent={valor} filledBackground="linear-gradient(to right, #5494f9,#ff7100, #cb0000)" height={18}/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="cronometro">
                                                                        <Temporizador dataFromParent={this.state.cuponesComida[i].Id} dataFromParent2="Cupones"></Temporizador>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )

                                                    })}
                                                </div>
                                            </div>       
                                        </div>
                                    </section>
                                    <div className="button_more container">
                                        <Link to="/Cupones-Categoria/Comida">VER TODOS </Link>
                                    </div>
                                </div>
                                
                                
                                <div id="menu-belleza" className="container col-xs-12 col-sm-12 col-md-12">
                                    <section id="menuBelleza" data-stellar-background-ratio="0.5">
                                        <div className="menu-productos">
                                            <div className="container-img prod_destacado">

                                                <div className="row">
                                                    <div className="col-md-12 col-sm-12">
                                                        <section id="productos">
                                                            <div className="section-title wow fadeInUp tittle-bar" data-wow-delay="0.1s">
                                                                <div className="col-md-12">
                                                                    <img className="img-responsive" src={botonBelleza} alt="Belleza"/>
                                                                </div>
                                                            </div>
                                                        </section>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="Belleza" className="container">
                                                <div id="CatgProductos" className= "col-xs-12 col-sm-12 col-md-12 columnas-Semana">
                                                    {Object.keys(this.state.cuponBelleza).map (i =>{
                                                        var valor = (this.state.cuponBelleza[i].Contador / this.state.cuponBelleza[i].Disponibilidad_Estandar) * 100;
                                                        var tiempo = new Date(this.state.cuponBelleza[i].Fecha_Vencimiento) - Date.now();
                                                        var style = ''
                                                        if(tiempo < 0){
                                                        style='img-agotado';
                                                        }
                                                        if(this.state.cuponBelleza[i].Contador === this.state.cuponBelleza[i].Disponibilidad_Estandar){
                                                            style='img-agotado';
                                                        }
                                                        return(
                                                            <div key={i} className="col-xs-12 col-md-6 col1 m-campana">
                                                                <div className="Promocion2">
                                                                    <div className={`${style}`}></div>
                                                                    <div className="promocion_2 imagen_oferta2" style={{backgroundImage:`url(${this.state.cuponBelleza[i].Imagen})`}}>
                                                                    </div>
                                                                    <div className="txt_information">
                                                                        <h3 className="Nombre_Oferta">{this.state.cuponBelleza[i].Titulo}</h3>
                                                                        <div className="show-code"><Link to={"/Detalles-Cupon/Cupones/"+ this.state.cuponBelleza[i].Id}>
                                                                            AGREGAR CUPÓN</Link></div>
                                                                        <div className="contenedor-progress">
                                                                            <ProgressBar percent={valor} filledBackground="linear-gradient(to right, #5494f9,#ff7100, #cb0000)" height={18}/>
                                                                        </div>    
                                                                    </div>
                                                                    <div className="cronometro">
                                                                        <Temporizador dataFromParent={this.state.cuponBelleza[i].Id} dataFromParent2="Cupones"></Temporizador>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>       
                                        </div>
                                    </section>
                                    <div className="button_more container">
                                        <Link to="/Cupones-Categoria/Belleza">VER TODOS </Link>
                                    </div>
                                </div>   
                                
                                <div id="menu-salud" className="container col-xs-12 col-sm-12 col-md-12">                
                                    <section id="menuSalud" data-stellar-background-ratio="0.5">
                                        <div className="menu-productos">
                                            <div className="container-img prod_destacado">

                                                <div className="row">
                                                    <div className="col-md-12 col-sm-12">
                                                        <section id="productos">
                                                            <div className="section-title wow fadeInUp tittle-bar" data-wow-delay="0.1s">
                                                                <div className="col-md-12">
                                                                    <img className="img-responsive" src={botonSalud} alt="Salud"/>
                                                                </div>
                                                            </div>
                                                        </section>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="Salud" className="container">
                                                <div id="CatgProductos" className= "col-xs-12 col-sm-12 col-md-12 columnas-Semana">
                                                    {Object.keys(this.state.cuponSalud).map (i =>{
                                                        var valor = (this.state.cuponSalud[i].Contador / this.state.cuponSalud[i].Disponibilidad_Estandar) * 100;
                                                        var tiempo = new Date(this.state.cuponSalud[i].Fecha_Vencimiento) - Date.now();
                                                        var style = ''
                                                        if(tiempo < 0){
                                                        style='img-agotado';
                                                        }
                                                        if(this.state.cuponSalud[i].Contador === this.state.cuponSalud[i].Disponibilidad_Estandar){
                                                            style='img-agotado';
                                                        }
                                                        return(
                                                            <div key={i} className="col-xs-12 col-md-6 col1 m-campana">
                                                                <div className="Promocion2">
                                                                    <div className={`${style}`}></div>
                                                                    <div className="promocion_2 imagen_oferta2" style={{backgroundImage:`url(${this.state.cuponSalud[i].Imagen})`}}>
                                                                    </div>
                                                                    <div className="txt_information">
                                                                        <h3 className="Nombre_Oferta">{this.state.cuponSalud[i].Titulo}</h3>
                                                                        <div className="show-code"><Link to={"/Detalles-Cupon/Cupones/"+ this.state.cuponSalud[i].Id}>RESERVAR CUPÓN</Link></div>
                                                                        <div className="contenedor-progress">
                                                                            <ProgressBar percent={valor} filledBackground="linear-gradient(to right, #5494f9,#ff7100, #cb0000)" 
                                                                            height={18}/>
                                                                        </div>    
                                                                    </div>
                                                                    <div className="cronometro">
                                                                        <Temporizador dataFromParent={this.state.cuponSalud[i].Id} dataFromParent2="Cupones"></Temporizador>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}

                                                </div>
                                            </div>       
                                        </div>
                                    </section>
                                    <div className="button_more container">
                                        <Link to="/Cupones-Categoria/Salud">VER TODOS </Link>
                                    </div>
                                </div>
                                
                                <div id="menu-servicio" className="container col-xs-12 col-sm-12 col-md-12">
                                    <section id="menuServicio" data-stellar-background-ratio="0.5">
                                        <div className="menu-productos">
                                            <div className="container-img prod_destacado">

                                                <div className="row">
                                                    <div className="col-md-12 col-sm-12">
                                                        <section id="productos">
                                                            <div className="section-title wow fadeInUp tittle-bar" data-wow-delay="0.1s">
                                                                <div className="col-md-12">
                                                                    <img className="img-responsive" src={botonServicio} alt="Servicio"/>
                                                                </div>
                                                            </div>
                                                        </section>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="Servicio" className="container">
                                                <div id="CatgProductos" className= "col-xs-12 col-sm-12 col-md-12 columnas-Semana">
                                                    {Object.keys(this.state.cuponServicios).map (i =>{

                                                        var valor = (this.state.cuponServicios[i].Contador / this.state.cuponServicios[i].Disponibilidad_Estandar) * 100;
                                                        var tiempo = new Date(this.state.cuponServicios[i].Fecha_Vencimiento) - Date.now();
                                                        var style = ''
                                                        if(tiempo < 0){
                                                        style='img-agotado';
                                                        }
                                                        if(this.state.cuponServicios[i].Contador === this.state.cuponServicios[i].Disponibilidad_Estandar){
                                                            style='img-agotado';
                                                        }
                                                        return(
                                                            <div key={i} className="col-xs-12 col-md-6 col1 m-campana">
                                                                <div className="Promocion2">
                                                                    <div className={`${style}`}></div>
                                                                    <div className="promocion_2 imagen_oferta2" style={{backgroundImage:`url(${this.state.cuponServicios[i].Imagen})`}}>
                                                                    </div>
                                                                    <div className="txt_information">
                                                                        <h3 className="Nombre_Oferta">{this.state.cuponServicios[i].Titulo}</h3>
                                                                        <div className="show-code"><Link to={"/Detalles-Cupon/Cupones/"+ this.state.cuponServicios[i].Id}>
                                                                            AGREGAR CUPÓN</Link></div>
                                                                        <div className="contenedor-progress">
                                                                            <ProgressBar percent={valor} filledBackground="linear-gradient(to right, #5494f9,#ff7100, #cb0000)" 
                                                                            height={18}/>
                                                                        </div>    
                                                                    </div>
                                                                    <div className="cronometro">
                                                                        <Temporizador dataFromParent={this.state.cuponServicios[i].Id} dataFromParent2="Cupones"></Temporizador>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )

                                                    })}
                                                </div>
                                            </div>       
                                        </div>
                                    </section>
                                    <div className="button_more container">
                                        <Link to="/Cupones-Categoria/Servicios">VER TODOS </Link>
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
export default Cupones;