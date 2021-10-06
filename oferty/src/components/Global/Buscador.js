import React, { Component } from 'react';
import config from '../../config/config';
import axios from "axios";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import Footer from './Footer';

import errorImg from './images/banner/error.jpg';
import {Link} from 'react-router-dom';

//Axios
const axiosInstance = axios.create({
    baseURL: config.backURL
});
class Buscador extends Component{

    constructor(props)
    {
      super(props);
      this.state = {cupones:[], busqueda:'nada', display:'block', display2:'block', display3:'none', resultProductos:[]}
      this.handleChangeSelect = this.handleChangeSelect.bind(this);
    }

    
    getResultados(){
        axiosInstance.get('/getTiendaUbicacion/'+this.props.match.params.ubicacion).then(res => {
            if(res.data){
                this.setState({busqueda:'si'});
                Object.keys(res.data).map(i =>{
                    axiosInstance.get('/getCuponForLocation/'+ res.data[i].Nombre).then(res => {
                        this.setState(prevState => ({
                            cupones: [...prevState.cupones, res.data]
                        }))
                        this.setState({display:'none'});
                    })
                    return null;
                })
            }
            else{
                this.setState({busqueda:'no'});
                this.setState({display:'none'});
            }

        })
    }

    handleChangeSelect(event){
        const val = event.target.value;
        var newBusqueda = [];
        Object.keys(this.state.cupones).map(i=> {
            Object.keys(this.state.cupones[i]).map(item=>{
                if(this.state.cupones[i][item].Categoria === val ){
                    newBusqueda.push(this.state.cupones[i][item]);
                }
                return newBusqueda;
            })
            return newBusqueda;
        })
        this.setState({display:'none', display2:'none', display3:'block'});
        this.setState({resultProductos:newBusqueda});
        
    }
    componentDidMount = () => {
        this.getResultados();
    }
    render() {
        return (
            <div>
                <Header/>
                <div className="body-content outer-top-ts">
                    <div className="container">
                        <div className='row'>
                            <div id="buscador_section" className="col-sm-12 col-md-12 col-lg-12 hidden-sm">
                                <h2>CUPONES CERCANOS A <strong><span id="palabra_busqueda"></span>"{this.props.match.params.ubicacion}"</strong></h2>
                                <div className="lbl-cnt">
                                    <div id="buscador_ubicacion" className="">
                                        <div className="contenedor_buscador">
                                            <label>Ordenar por Ubicación</label>
                                            <select id="direccion" className="btn dropdown-toggle" onChange={this.handleChangeSelect}>
                                                <option>Belleza</option>
                                                <option>Comida</option>
                                                <option>Productos</option>
                                                <option>Salud</option>
                                                <option>Servicios</option>
                                            </select>    
                                        </div>    
                                    </div>
                                </div>
                            </div>


                            <div className="section_resultados col-sm-12 col-md-12 col-lg-12" style={{display:this.state.display2}}>
                                <div className="box" style={{display: this.state.display}}>
                                    <div className="loader-21"></div>
                                    <p>Buscando cupones...</p>
                                </div>
                                {this.state.cupones.length ? (
                                    <div className="resultados">
                                        {Object.keys(this.state.cupones).map(i=> {
                                            if(!this.state.cupones){
                                                return(
                                                    <div key={i} id="banner-error" className="col-xs-12 col-sm-12 col-md-12">
                                                        <img src={errorImg} className="img-responsive" alt="Busqueda no encontrada"></img>
                                                    </div>
                                                )
                                            }
                                            else{
                                                return(
                                                    <div className="resultados-busqueda">
                                                        {Object.keys(this.state.cupones[i]).map(item=>{
                                                            return(
                                                            <div key={this.state.cupones[i][item].Id} className="col-12 col-sm-3 col-md-3 col-lg-3">
                                                                <div className="product">
                                                                    <div className="product-image">
                                                                        <div className="image">
                                                                            <Link to={"/Detalles-Cupon/Cupones/"+ this.state.cupones[i][item].Id}>
                                                                                <div className="background_busqueda" alt="Oferta" style={{backgroundImage:`url(${this.state.cupones[i][item].Imagen})`}}>
                                                                                </div>
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                    <div className="product-info text-left">
                                                                        <div className="Contenedor">
                                                                            <h3 id="tit1" className="name">{this.state.cupones[i][item].Titulo}</h3>
                                                                            <div className="description">{this.state.cupones[i][item].Detalles}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            )
                                                        })}
                                                    </div>   
                                                ) 
                                            }
                                        })}
                                    </div>
                                ): (
                                    
                                    <div id="banner-error" className="col-xs-12 col-sm-12 col-md-12">
                                        {this.state.busqueda === "no" ?(
                                            <div>
                                                <img src={errorImg} className="img-responsive" alt="Busqueda no encontrada"></img>
                                            </div>
                                        ):(
                                            <div>
                                                <div className="loader-21"></div>
                                            </div>
                                        )}
                                        
                                    </div>
                                )}
                            </div>

                            <div className="section_resultados col-sm-12 col-md-12 col-lg-12" style={{display: this.state.display3}}>
                            <div className="box" style={{display: this.state.display}}>
                                <div className="loader-21"></div>
                                <p>Buscando cupones...</p>
                            </div>
                            {this.state.resultProductos.length ? (
                                <div className="resultados">
                                    {Object.keys(this.state.resultProductos).map(i=> {
                                        if(!this.state.resultProductos){
                                            return(
                                                <div key={i} id="banner-error" className="col-xs-12 col-sm-12 col-md-12">
                                                    <img src={errorImg} className="img-responsive" alt="Busqueda no encontrada"></img>
                                                </div>
                                            )
                                        }
                                        else{
                                            return(
                                                <div key={i} className="col-12 col-sm-3 col-md-3 col-lg-3">
                                                    <div className="product">
                                                        <div className="product-image">
                                                            <div className="image">
                                                                <Link to={"/Detalles-Cupon/Cupones/"+ this.state.resultProductos[i].Id}>
                                                                    <div className="background_busqueda" alt="Oferta" style={{backgroundImage:`url(${this.state.resultProductos[i].Imagen})`}}>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="product-info text-left">
                                                            <div className="Contenedor">
                                                                <h3 id="tit1" className="name">{this.state.resultProductos[i].Titulo}</h3>
                                                                <div className="description">{this.state.resultProductos[i].Detalles}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) 
                                        }
                                    })}
                                </div>
                            ): (
                                
                                <div id="banner-error" className="col-xs-12 col-sm-12 col-md-12">
                
                                    <div>
                                        <img src={errorImg} className="img-responsive" alt="Busqueda no encontrada"></img>
                                    </div>

                                    
                                </div>
                            )}
                        </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
export default Buscador;