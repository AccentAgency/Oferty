
import React, { Component } from 'react';
import config from '../../config/config';
import axios from "axios";

import {Link} from 'react-router-dom';
import Slider from "react-elastic-carousel";
import Item from "./Item";


const breakPoints = [
    { width: 1, itemsToShow: 1, itemsToScroll:1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 1 },
    { width: 768, itemsToShow: 3, itemsToScroll: 3 },
    { width: 1200, itemsToShow: 3, itemsToScroll: 3 }
  ];

  

//Axios
const axiosInstance = axios.create({
  baseURL: config.backURL
});

class CuponesSimilares extends Component{

    constructor(props)
    {
      super(props);
      this.state = {tag: this.props.dataFromParent, catg_cup: this.props.dataFromParent2, sliderCupones:''}
      this.handleClick = this.handleClick.bind(this);
    }


    handleClick(){
        window.location.reload();
    }


    //Cargar cupones similares
    loadCuponesSlider(){
        let val=[]
        Object.keys(this.state.tag).map(item =>{
            val.push(this.state.tag[item].etiqueta);
            return val;
        })
        axiosInstance.get('/readtag'+this.state.catg_cup+'/'+ JSON.stringify(val)).then(res => {
            var array = res.data;
            this.setState({sliderCupones: array});
        })
    }

    componentDidMount = () =>{
        this.loadCuponesSlider();
    }

    render() {
        return (
            <div>
                {this.state.sliderCupones ? (
                    <div className="tab-content outer-top-xs">
                        <div className="tab-pane in active" id="all">

                            <div className="product-slider">
                                <div id="Carrousel" className="">
                                <Slider breakPoints={breakPoints}>
                                    {Object.keys(this.state.sliderCupones).map (i =>{
                                        return( 
                                            <Item key={i}>
                                                <div className="products">
                                                    <div className="product-contenedor">
                                                        <div className="product-image">
                                                            <div className="image" onClick={this.handleClick}>
                                                                <Link to={"/Detalles-Cupon/Cupones/"+ this.state.sliderCupones[i].IdCupon}>
                                                                <div className="background_busqueda back-imag" style={{backgroundImage:`url(${this.state.sliderCupones[i].Imagen})`}}>  
                                                                </div>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="product-info text-left">
                                                            <div className="Contenedor-slider">
                                                                <h3 id="tit1" className="name"><Link to={"/Detalles-Cupon/CuponSemana/"+ i}></Link>
                                                                {this.state.sliderCupones[i].Titulo}</h3>
                                                                <div className="description">{this.state.sliderCupones[i].Detalles}</div>
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
                    </div>
                ):(
                    <div id="noDisponible" className="product-tab">
                        <p className="text">No hay ninguna oferta disponible</p>
                    </div>
            )}
            </div>

        )
    }
}
export default CuponesSimilares;