import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import config from '../../../config/config';
import axios from "axios";

import ReactStars from "react-rating-stars-component";
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import Header from '../Header';
import Temporizador from '../Temporizador';


//Importar imagenes
import BannerServicos from '../images/banner/Banner_categorias_Servicios.jpg';
import Footer from '../Footer';

const axiosInstance = axios.create({
    baseURL: config.backURL
});


class Servicios extends Component {

    constructor(props)
    {
        super(props);
        this.state={cuponesServ:[], loading:true}
    }

    readCupones(){
        axiosInstance.get('/readCuponesServicios').then(res => {
            this.setState({cuponesServ:res.data});
            this.setState({loading:false});
        })
    }

    componentDidMount = () =>{
        this.readCupones();
    }

    render() {
        return (
            <div id="section_categoria" className="">
                <Header></Header>
                <div className="outer-top-ts top-banner">
                    <div id="BannerValidacion" className="container">
                        <img className="img-responsive" src={BannerServicos} alt="Oferty categoria servicios"/>
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
                <div id="SectionCategoria" className="container body-content outer-top-ts">
                    <div className="row">
                        <div id="banner-destacado" className="col-xs-12 col-sm-12 col-md-12 columnas-Semana">
                            {Object.keys(this.state.cuponesServ).map (i =>{
                                //Calcular la barra
                                var valor = (this.state.cuponesServ[i].Contador / this.state.cuponesServ[i].Disponibilidad_Estandar) * 100;
                                var tiempo = new Date(this.state.cuponesServ[i].Fecha_Vencimiento) - Date.now();
                                var style = ''
                                if(tiempo < 0){
                                  style='img-agotado';
                                }
                                if(this.state.cuponesServ[i].Contador === this.state.cuponesServ[i].Disponibilidad_Estandar){
                                  style='img-agotado';
                                }
                                return (
                                <div key={i} id="banner-campanas" className="col-xs-6 col-md-6 col1 m-2">
                                    <div className="Promocion2">
                                        <div className={`${style}`}></div>
                                        <div className="promocion_2 imagen_oferta2" style={{backgroundImage:`url(${this.state.cuponesServ[i].Imagen})`}}>
                                        </div>
                                        <div className="txt_information">
                                            <h3 id="Favorito" className="Nombre_Oferta">{this.state.cuponesServ[i].Titulo}</h3>
                                            <span id="detalles_fav"></span>
                                            <div id="" className="show-code"><Link to={"/Detalles-Cupon/Cupones/"+ this.state.cuponesServ[i].Id}>AGREGAR CUPÓN</Link></div>
                                            <div className="star">
                                            <ReactStars className="star"
                                            count={5}
                                            size={36}
                                            isHalf={false}
                                            onChange={(value) => { this.onChange({i}, value, "Cupones") } }
                                            emptyIcon={<i className="far fa-star"></i>}
                                            fullIcon={<i className="fa fa-star"></i>}
                                            activeColor="#FFDB2D"
                                            />
                                            </div>
                                            <div className="contenedor-progress">
                                                <ProgressBar percent={valor} filledBackground="linear-gradient(to right, #5494f9,#ff7100, #cb0000)" height={18}/>
                                            </div>
                                        </div>
                                        <div className="cronometro">
                                            <Temporizador dataFromParent={this.state.cuponesServ[i].Id} dataFromParent2="Cupones"></Temporizador>
                                        </div>
                                    </div>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                )}
                <div className="">
                    <Footer></Footer>
                </div>
            </div>
        )
    }


}
export default Servicios;