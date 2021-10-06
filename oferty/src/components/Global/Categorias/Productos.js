import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import config from '../../../config/config';
import axios from "axios";


import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import Header from '../Header';
import Temporizador from '../Temporizador';


//Importar imagenes
import BannerProductos from '../images/banner/Banner_categorias_Productos.jpg';
import Footer from '../Footer';

const axiosInstance = axios.create({
    baseURL: config.backURL
});


class Productos extends Component {

    constructor(props)
    {
        super(props);
        this.state={cuponesProd:[], loading:true}
    }

    readCupones(){
        axiosInstance.get('/readCuponesProductos').then(res => {
            this.setState({cuponesProd:res.data});
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
                        <img className="img-responsive" src={BannerProductos} alt="Oferty categoria productos"/>
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
                            {Object.keys(this.state.cuponesProd).map (i =>{
                                //Calcular la barra
                                var valor = (this.state.cuponesProd[i].Contador / this.state.cuponesProd[i].Disponibilidad_Estandar) * 100;
                                var tiempo = new Date(this.state.cuponesProd[i].Fecha_Vencimiento) - Date.now();
                                var style = ''
                                if(tiempo < 0){
                                  style='img-agotado';
                                }
                                if(this.state.cuponesProd[i].Contador === this.state.cuponesProd[i].Disponibilidad_Estandar){
                                  style='img-agotado';
                                }
                                return (
                                <div key={i} id="banner-campanas" className="col-xs-6 col-md-6 col1 m-2">
                                    <div className="Promocion2">
                                        <div className={`${style}`}></div>
                                        <div className="promocion_2 imagen_oferta2" style={{backgroundImage:`url(${this.state.cuponesProd[i].Imagen})`}}>
                                        </div>
                                        <div className="txt_information">
                                            <h3 id="Favorito" className="Nombre_Oferta">{this.state.cuponesProd[i].Titulo}</h3>
                                            <span id="detalles_fav"></span>
                                            <div id="" className="show-code"><Link to={"/Detalles-Cupon/Cupones/"+ this.state.cuponesProd[i].Id}>AGREGAR CUPÓN</Link></div>
                                            <div className="contenedor-progress">
                                                <ProgressBar percent={valor} filledBackground="linear-gradient(to right, #5494f9,#ff7100, #cb0000)" height={18}/>
                                            </div>
                                        </div>
                                        <div className="cronometro">
                                            <Temporizador dataFromParent={this.state.cuponesProd[i].Id} dataFromParent2="Cupones"></Temporizador>
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
export default Productos;