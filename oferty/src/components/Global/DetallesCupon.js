

import React, { Component} from 'react';
import './css/DetallesCupon.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';  
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Slider from "react-elastic-carousel";
import Item from "./Item2";
import Itemmin from "./Item3";
import prod from './images/prod.png';
import Comentarios from './Comentarios';
import CuponesSimilares from './CuponesSimilares';
import config from '../../config/config';
import axios from "axios";
import { Link, Redirect } from 'react-router-dom';
import {ProductConsumer} from './Functions/CartFunction';
import {fire} from '../../config/firebase';
import swal from 'sweetalert';
import ReactStars from "react-rating-stars-component";
import rating from './Functions/RatingStar';


//Imagenes
import error from './images/404Error.png';

const axiosInstance = axios.create({
    baseURL: config.backURL
});


const breakPoints = [
    { width: 1, itemsToShow: 1, },
    { width: 550, itemsToShow: 1, itemsToScroll: 1 },
    { width: 768, itemsToShow: 1, itemsToScroll: 1 },
    { width: 1200, itemsToShow: 1, itemsToScroll: 1 }
];

const breakPoints2 = [
{ width: 1, itemsToShow: 4, },
{ width: 550, itemsToShow: 4, itemsToScroll: 1 },
{ width: 768, itemsToShow: 4, itemsToScroll: 1 },
{ width: 1200, itemsToShow: 4, itemsToScroll: 1 }
];



class DetallesCupon extends Component {
   
    //Guardar datos de la base de datos
    state = {
        data : [],
        img:[],
        img2:[],
        idCup:'',
        catgCup: '',
        Cart: [],
        open:false,
        redirec:false,
        vencimiento:'',
        tienda:{
            Latitud:0,
            Longitud:0
        },
        visualizacion:0
    }


    loadData(){
        const id = this.props.dataID;
        this.setState({...this.state.idCup, idCup:id})
        const catg = this.props.dataCatg;
        this.setState({...this.state.catgCup, catgCup:catg})

        axiosInstance.get('/get'+catg+'/'+id)
        .then(res => {
            this.setState({...this.state.data, data:res.data});
            this.addVisualizacion(res.data.Visualizacion);
            var tiempo = new Date(this.state.data.Fecha_Vencimiento) -  Date.now();
            if(tiempo < 0){
                this.setState({vencimiento:true});
            }

            if(this.state.data.Contador === this.state.data.Disponibilidad_Estandar){
                this.setState({vencimiento:true});
            }

            this.Tienda(this.state.data.Tienda);

            if(this.state.data.ImagenSecundaria === ''){
            this.setState({...this.state.img, img:prod})
            }
            else{
            this.setState({...this.state.img, img:this.state.data.ImagenSecundaria})
            }


            if(this.state.data.ImagenTercero === ''){
            this.setState({...this.state.img2, img2:prod})
            }
            else{
            this.setState({...this.state.img2, img2:this.state.data.ImagenTercero})
            }
        })

        
    }

    addVisualizacion(visualizacion){
        const id = this.props.dataID;
        const catg = this.props.dataCatg;
        var contador = 1 + parseInt(visualizacion);
        axiosInstance.post('/get'+catg+'Visualizacion/'+id, {
            'cont': contador
        }).then(res=>{
        })
    }

    onChange(name, value, cupon) {
        rating(value,name,cupon);
    }


    Tienda(tienda) {
        axiosInstance.get('/getTienda/'+ tienda)
        .then(res => {
            this.setState({...this.state.tienda, tienda:res.data});

        })
    }

    

    componentDidMount=() =>{
        this.loadData();
        window.scrollTo(0,0);    
    }

    componentDidUpdate(prevProps) {
        // Uso tipico (no olvides de comparar las props):
        if (this.props.dataID !== prevProps.dataID) {
            this.loadData(); 
        }
      }



    render(){
        if(this.state.vencimiento) return <img className="img-responsive imagen-error" alt='Cupon Vencido' src={error}></img>
        if(!this.state.tienda.Longitud) return <div className="loader-pages"><div className="loaders"><span></span><span></span><span></span><span></span></div></div>;
        if (this.state.redirec) return <Redirect to="/Login"></Redirect>;
        return (
            <ProductConsumer>
                {(value => {
                    return(
                        <div className="">
                            <div id="snackbar"></div>
                            
                            <div className="breadcrumb">
                                <div className="container">
                                    <div className="breadcrumb-inner">
                                        <ul className="list-inline list-unstyled">
                                            <li><Link to="/">Inicio</Link></li>
                                            <li><Link to="/">Productos</Link></li>
                                            <li id="class_menu" className='active'></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="body-content outer-top-ts">
                                <div className='container'>
                                    <div className='row single-product'>
                                        <div className='col-md-12'>
                                            <div id="productoCupon" className="detail-block">
            
                                                <div className="row  wow fadeInUp">
                                                    <div className="col-xs-12 col-sm-5 col-md-4 gallery-holder">
                                                        <div className="product-item-holder size-big single-product-gallery small-gallery">
                                                            <Slider breakPoints={breakPoints}>
                                                                <Item className="item-carrusel">
                                                                <div className="single-product-gallery-item img_principal" id="slide1">
                                                                    <Link to="/" data-lightbox="image-1" data-title="Gallery">
                                                                        <img id="ImagenPrincipalOfertas" className="img-responsive" alt="" src={this.state.data.Imagen} />
                                                                    </Link>
                                                                </div>
                                                                </Item>
                                                                <Item className="item-carrusel">
                                                                <div className="single-product-gallery-item img_principal" id="slide1">
                                                                    <Link to="/" data-lightbox="image-1" data-title="Gallery">
                                                                        <img id="ImagenPrincipalOfertas" className="img-responsive" alt="" src={this.state.img} />
                                                                    </Link>
                                                                </div>
                                                                </Item>      
                                                            </Slider>

                                                            <div className="single-product-gallery-thumbs gallery-thumbs">
                                                                <Slider breakPoints={breakPoints2}>
                                                                    <Itemmin className="item-carrusel">
                                                                    <div className="single-product-gallery-item img_principal" id="slide1">
                                                                        <Link to="/" data-lightbox="image-1" data-title="Gallery">
                                                                            <img id="" className="img-responsive" alt="" src={this.state.data.Imagen} />
                                                                        </Link>
                                                                    </div>
                                                                    </Itemmin>
                                                                    <Itemmin className="item-carrusel">
                                                                    <div className="single-product-gallery-item img_principal" id="slide1">
                                                                        <Link to="/" data-lightbox="image-1" data-title="Gallery">
                                                                            <img id="" className="img-responsive" alt="" src={this.state.img} />
                                                                        </Link>
                                                                    </div>
                                                                    </Itemmin>
                                                                    <Itemmin className="item-carrusel">
                                                                    <div className="single-product-gallery-item img_principal" id="slide1">
                                                                        <Link to="/" data-lightbox="image-1" data-title="Gallery">
                                                                            <img id="" className="img-responsive" alt="" src={this.state.img2} />
                                                                        </Link>
                                                                    </div>
                                                                    </Itemmin>            
                                                                </Slider>
                                                            </div>


                                                        </div>
                                                    </div>
                            
                                                    {/* Informacion del cupon */}
                                                    <div className='col-sm-7 col-md-5 product-info-block'>
                                                        <div className="product-info">
                                                            <h1 id="NombreProm" className="name">{this.state.data.Titulo}</h1>
                                                            <h3 id="DetailProm" className="detail"> </h3>

                                                            <div className="rating-reviews m-t-20">
                                                                <div className="row">

                                                                </div>
                                                            </div>

                                                            <div className="stock-container info-container m-t-10">
                                                                <div className="row">
                                                                    <div className="col-lg-12">
                                                                        <div className="pull-left">
                                                                            <div className="stock-box">
                                                                                <span className="label">Reservas :</span>
                                                                            </div>
                                                                        </div>

                                                                        <div className="pull-left">
                                                                            <div className="stock-box">
                                                                                <span id="Reserv_Cont" className="value">0</span>
                                                                            </div>
                                                                        </div>    
                                                                    </div>

                                                                    <div className="col-lg-12">
                                                                        <div className="pull-left">
                                                                            <div className="stock-box">
                                                                                <span className="label">Disponible :</span>
                                                                            </div>
                                                                        </div>

                                                                        <div className="pull-left">
                                                                            <div className="stock-box">
                                                                                <span id="Stock_cup" className="value label_green">0</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="price-container info-container m-t-20">
                                                                <div className="row">


                                                                <div className="col-sm-12 col-xs-12 col-md-6 col-lg-6">
                                                                    <div className="price-box">
                                                                        <div className="contenedor-star">
                                                                            <ReactStars className="star"
                                                                            count={5}
                                                                            size={36}
                                                                            isHalf={false}
                                                                            onChange={(value) => { this.onChange(this.state.idCup, value, this.state.catgCup) } }
                                                                            emptyIcon={<i className="far fa-star"></i>}
                                                                            fullIcon={<i className="fa fa-star"></i>}
                                                                            activeColor="#FFDB2D"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                </div>
                                                            </div>

                                                            <div className="quantity-container info-container">
                                                                <div className="row">
                                                                    <div className="add-btn">
                                                                        <button id="reservar-ya" className="btn btn-block addCupon" data-id="1" data-name="1" data-producto="1p"
                                                                        onClick={()=> 
                                                                            fire.auth().onAuthStateChanged((user) =>{
                                                                                if(user){
                                                                                    value.addToCart(this.state.idCup, this.state.catgCup)
                                                                                }
                                                                                else{
                                                                                    swal('¡Registrate!', 'Para comprar en Oferty debes tener una cuenta. ¡Unete a nuestra comunidad!', 'warning').then((value => {
                                                                                        if(value){
                                                                                            this.setState({redirec:true});
                                                                                        }                                                                    
                                                                                    })
                                                                                )}
                                                                            })
                                                                        }>¡RERSERVAR YA!</button>
                                                                    </div>
                                                                </div>
                                                            </div>        

                                                        </div>
                                                    </div>

                                                    {/* Mapa */}
                                                    <div className="col-lg-3 col-sm-12 col-md-3">
                                                        <div className="store-details">
                                                            <div id="mapa" className="mapa">
                                                                <Map style={{ width: '100%', height: '100%' }}
                                                                initialCenter={{lat: this.state.tienda.Latitud, lng: this.state.tienda.Longitud}}
                                                                zoom={13}
                                                                google={this.props.google}>

                                                                    <Marker position={{ lat: this.state.tienda.Latitud, lng: this.state.tienda.Longitud }} />
                                                                </Map>    
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>  
                                                    
                                            </div>

                                            <div className="product-tabs inner-bottom-xs  wow fadeInUp">
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <ul id="product-tabs" className="nav nav-tabs nav-tab-cell">
                                                            <li><a data-toggle="tab" href="#description" className="active">Descripción</a></li>
                                                            <li><a data-toggle="tab" href="#vendor">Tienda</a></li>
                                                            <li><a data-toggle="tab" href="#review">Comentarios</a></li>
                                                            <li><a data-toggle="tab" href="#offers">Más Cupones</a></li>
                                                        </ul>
                                                    </div>


                                                    <div className="col-sm-9">

                                                        <div id="section_tienda" className="tab-content">

                                                            <div id="description" className="tab-pane in active">
                                                                <div className="product-tab">
                                                                    <p id="Descripcion" className="text">{this.state.data.Descripcion}</p>
                                                                </div>
                                                            </div>

                                                            <div id="vendor" className="tab-pane">
                                                                <div className="product-tab">
                                                                    <img id="image_tienda" src={this.state.tienda.ImagenLogo} className="img-responsive" width="80px" alt="Logo"/>
                                                                    <h3 id="name_tienda">{this.state.data.Tienda}</h3>
                                                                    <p id="info_tienda" className="text">{this.state.tienda.Detalles}<br></br></p>
                                                                </div>
                                                            </div>


                                                            <div id="review" className="tab-pane">
                                                                <div className="product-tab">

                                                                    <div className="product-reviews">
                                                                        <h4 className="title">Opiniones del Producto</h4>

                                                                    
                                                                        <Comentarios className="padd" dataFromParent={this.state.idCup} dataFromParent2={this.state.catgCup}>
                                                                            
                                                                        </Comentarios>

                                                                    </div>



                                                                </div>
                                                            </div>

                                                            <div id="offers" className="tab-pane ofertas_similares">
                                                                <div id="OfertasSimilares" className="product-tab">
                                                                    <div id="product-tabs-slider" className="scroll-tabs wow fadeInUp">
                                                                        <CuponesSimilares dataFromParent={this.state.data.Tag} dataFromParent2={this.state.catgCup}></CuponesSimilares>
                                                                    </div> 
                                                                </div>
                                                            </div>  
                                                        </div>        
                                                    </div>

                                                </div>
                                            </div>
                                        </div>    
                                    </div>
                                </div>    
                            </div>
                        </div>
                    )
                })}
            </ProductConsumer>
            
        )
    }
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyCAitQBFs-xKL_9BTPg4GdEYRBX_wmpy9o'
 }) (DetallesCupon);

