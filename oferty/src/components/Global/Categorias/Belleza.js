import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import config from '../../../config/config';
import axios from "axios";


import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import Header from '../Header';
import Temporizador from '../Temporizador';

//Importar imagenes
import BannerBelleza from '../images/banner/Banner_categorias_Belleza.jpg';
import Footer from '../Footer';

const axiosInstance = axios.create({
    baseURL: config.backURL
});


class Belleza extends Component {

    constructor(props)
    {
        super(props);
        this.state={cuponesBell:[], loading:true}
    }

    readCupones(){
        axiosInstance.get('/readCuponesBelleza').then(res => {
            this.setState({cuponesBell:res.data});
            this.setState({loading:false});
        })
    }

    componentDidMount = () =>{
        this.readCupones();
    }

    render() {
        return (
            <div id="" className="">
                <Header></Header>
                <div className="outer-top-ts top-banner">
                    <div id="BannerValidacion" className="container">
                        <img className="img-responsive" src={BannerBelleza} alt="Oferty categoria belleza"/>
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
                        <div id="" className="col-xs-12 col-sm-12 col-md-12 columnas-Semana">
                            {Object.keys(this.state.cuponesBell).map (i =>{
                                //Calcular la barra
                                var valor = (this.state.cuponesBell[i].Contador / this.state.cuponesBell[i].Disponibilidad_Estandar) * 100;
                                var tiempo = new Date(this.state.cuponesBell[i].Fecha_Vencimiento) - Date.now();
                                var style = ''
                                if(tiempo < 0){
                                  style='img-agotado';
                                }
                                if(this.state.cuponesBell[i].Contador === this.state.cuponesBell[i].Disponibilidad_Estandar){
                                  style='img-agotado';
                                }
                                return (
                                <div key={i} id="banner-campanas" className="col-xs-6 col-md-6 col1 m-2">
                                    <div className="Promocion2">
                                        <div className={`${style}`}></div>
                                        <div className="promocion_2 imagen_oferta2" style={{backgroundImage:`url(${this.state.cuponesBell[i].Imagen})`}}>
                                        </div>
                                        <div className="txt_information">
                                            <h3 id="Favorito" className="Nombre_Oferta">{this.state.cuponesBell[i].Titulo}</h3>
                                            <span id="detalles_fav"></span>
                                            <div id="" className="show-code"><Link to={"/Detalles-Cupon/Cupones/"+ this.state.cuponesBell[i].Id}>AGREGAR CUPÓN</Link></div>
                                            <div className="contenedor-progress">
                                                <ProgressBar percent={valor} filledBackground="linear-gradient(to right, #5494f9,#ff7100, #cb0000)" height={18}/>
                                            </div>
                                        </div>
                                        <div className="cronometro">
                                            <Temporizador dataFromParent={this.state.cuponesBell[i].Id} dataFromParent2="Cupones"></Temporizador>
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
export default Belleza;