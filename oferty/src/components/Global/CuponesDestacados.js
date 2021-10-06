
import React, { Component } from 'react';
import './css/Cupones.css';

import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';

import Carousel from 'react-grid-carousel';


import 'font-awesome/css/font-awesome.min.css';

import config from '../../config/config';
import axios from "axios";

import {Link} from 'react-router-dom';
import TemporizadorDestacado from './TemporizadorDestacado';

import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";

//Axios
const axiosInstance = axios.create({
  baseURL: config.backURL
});


class CuponesDestacados extends Component {

    state = {
        data : []

    }



    //Funcion para cargar datos

    loadData(){
        axiosInstance.get('/readCupones')
        .then(res => {
          this.setState({...this.state.data, data:res.data});
        })
    }

    componentDidMount=() =>{
        this.loadData();
    }


  render(){
    return(
        <div className="">
            <section id="" className="section home coupons-section">
                <div className="">
                    <div className="titulo_destacado">
                        <Link to="/">VER TODOS</Link>

                        <div className="tit_cup">
                        <h2>CUPONES DESTACADOS</h2>
                        </div>
                    </div>

                    <div className ="caja">
                        <div className="coupons-deals">

                            {/* CARRUSEL */}
                            <Carousel cols={2} rows={2} loop
                                responsiveLayout={[
                                {
                                    breakpoint: 1200,
                                    cols: 1,
                                    rows:2,
                                    loop: true,
                                },
                                {
                                    breakpoint: 990,
                                    cols: 1,
                                    rows:1,
                                    loop: true,
                                },
                                {
                                    breakpoint: 375,
                                    cols: 1,
                                    rows:1,
                                    loop: true,
                                    gap: 0,
                                },

                                {
                                    breakpoint: 320,
                                    cols: 1,
                                    rows:1,
                                    loop: true,
                                    gap: 0,
                                },

                                {
                                    breakpoint: 414,
                                    cols: 1,
                                    rows:1,
                                    loop: true,
                                    gap: 0,
                                },
                                {
                                    breakpoint: 768,
                                    cols: 1,
                                    rows:1,
                                    loop: true,
                                    gap: 0,
                                },
                                ]} 
                            >
                            
                            {Object.keys(this.state.data).map (i =>{
                                var valor = (this.state.data[i].Contador / this.state.data[i].Disponibilidad_Estandar) * 100;
                                var tiempo = new Date(this.state.data[i].Fecha_Vencimiento) - Date.now();
                                var style = ''
                                if(tiempo < 0){
                                  style='img-agotadoDest';
                                }
                                if(this.state.data[i].Contador === this.state.data[i].Disponibilidad_Estandar){
                                  style='img-agotadoDest';
                                }
                                return( 
                                    <Carousel.Item key={i}>
                                        <div className="products">
                                            <div className={`${style}`}></div>
                                            <TemporizadorDestacado dataFromParent={this.state.data[i].Id} dataFromParent2="Cupones"></TemporizadorDestacado>
                                            <div className="product">

                                                <div className="product-info text-left">
                                                    <div id="bakcground_ticket1" className="ticket" style={{backgroundImage:`url(${this.state.data[i].Imagen})`}}>
                                                        <Link id="01" className="btn_cupon cupon_destac1" to={"/Detalles-Cupon/Cupones/"+ this.state.data[i].Id}>AGREGAR</Link>
                                                    </div>
                                                </div>

                                                <div id="image-cupon1" className="product-image image-cupon1">
                                                    <div className="image">
                                                        <div className="txt_detail">
                                                            <div id="txt_marca1" className="text-marca">{this.state.data[i].Tienda}</div>
                                                            <div className="brander">CUPÓN </div>
                                                            <div id="brander-oferta1" className="brander-oferta">{this.state.data[i].Titulo}</div>
                                                        </div>

                                                        <div className="linea_horizontal pull-right"></div>
                                                        <hr></hr>
                                                        <h3 id="detail_ofert1" className="name"><p>VÁLIDO POR 1 SEMANA </p></h3>
                                                        <hr className="linea_2"></hr>
                                                        <p className="term_condicion">LOS CUPONES NO SON ACUMULABLES</p>
                                                        <div className="contenedor-progressDest">
                                                            <ProgressBar percent={valor} filledBackground="linear-gradient(to right, #5494f9,#ff7100, #cb0000)" height={12}/>
                                                        </div>
                                                    </div>

                                                    <div className="textVetical columnaVertical Rotar-RigthDown"> 0014551485 </div>
                                                    <span className='linea-vertical2'></span>

                                                </div>


                                            </div>

                                        </div>
                                    </Carousel.Item>

                                    
                                )
                            })
                            }
                            
                            </Carousel>    
                                        
                        </div>
                    </div>        
                </div>
            </section>                   
        </div>
    )
  }
}

export default CuponesDestacados;