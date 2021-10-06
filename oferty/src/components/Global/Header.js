
import './css/Header.css';
import React, { Component } from 'react';
import config from '../../config/config';
import axios from "axios";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';


//Librerias para el modal
import Modal from '@material-ui/core/Modal';


//Imagenes
import logo from './images/logo.svg';
import cupon from './images/cupon.png';
import whatsapp from './images/iconos/whatsapp.png';
import form from './images/iconos/formulario.png';
import logo_oferty from './images/iconos/isologo.png';

//Imagenes Usuario
import av1 from './images/users/Avatar1.jpg';
import av2 from './images/users/Avatar2.jpg';
import av3 from './images/users/Avatar3.jpg';
import av4 from './images/users/Avatar4.jpg';
import av5 from './images/users/Avatar5.jpg';
import av6 from './images/users/Avatar6.jpg';
import iconMap from './images/iconos/mapa.svg';

import {fire} from '../../config/firebase';
import {ProductConsumer} from './Functions/CartFunction';
import swal from 'sweetalert';

import WhatsAppWidget from 'react-whatsapp-widget'
import 'react-whatsapp-widget/dist/index.css'

//Axios
const axiosInstance = axios.create({
  baseURL: config.backURL
});


class Header extends Component{
  _isMounted = false;
  
  state = {
    dataUser : [],
    img: [],
    openPay: false,
    openWha: false,
    cuponesComprados: ''
  }

  constructor(props)
  {
      super(props);
      this.state={
        user:{},
        userId:'',
        openPay: false,
        openWha: false,
        dataUser:[],
        img: [],
        cuponesComprados: '',
        cuponesSearch:[],
        searchCupones:'',
        redirect:false,
        openLoc:false,
        tasaDolar:0,
      }


      this.handleClose = this.handleClose.bind(this);
      this.handleChangeSelect = this.handleChangeSelect.bind(this);
      this.handleSelectUbicacion = this.handleSelectUbicacion.bind(this);
      this.hanldeOpenModal = this.hanldeOpenModal.bind(this);
  }

  authListener = ()=>{
    var user_imagen = [];
    fire.auth().onAuthStateChanged((user) =>{
        if(user){
            this.setState({user});
            this.setState({userId: user.uid});
            //Obtenemos genero del usuario para la imgane
            axiosInstance.get('/getUser/'+user.uid)
            .then(res => {
              this.setState({...this.state.dataUser, dataUser:res.data});
              
                  if(res.data.Genero === "Femenino"){
                    user_imagen[0] = av2;
                    user_imagen[1] = av3;
                    user_imagen[2] =av6;
    
                    this.setState({...this.state.img, img: user_imagen[this.rand(2)-1]});
                  }
                  else{
                    user_imagen[0] = av1;
                    user_imagen[1] = av4;
                    user_imagen[2] = av5;
    
                    this.setState({...this.state.img, img: user_imagen[this.rand(2)-1]});
                  }

            })
        }
        else{
            this.setState({user:null})
        }
    })
  }


  logout(){
    fire.auth().signOut();
  }

  componentDidMount=() =>{
    this.authListener();
    this.getAllCupones();
  }


  rand(n){
     return(Math.floor(Math.random() * n + 1 ));
  }

  handleClose(){
    this.setState({...this.state.openPay, openPay:false});
    this.setState({...this.state.openWha, openWha:false});
    this.setState({...this.state.openLoc, openLoc:false});
  }

  buyCupones(){
    this.setState({...this.state.openPay, openPay:true});
    this.checkPay();
  }

  handleWhatsapp(){
    this.setState({...this.state.openPay, openPay:false});
    this.setState({...this.state.openWha, openWha:true});
  }
  
  handleSelectUbicacion(event){
    const target = event.target;
    const value =  target.value;
    this.setState({openLoc:false});
    window.location= '/Buscador/'+value;
  }

  hanldeOpenModal(){
    this.setState({openLoc:true});
  }

  //Funcion que abre whatsapp
  whatsappClick(cart, total){
    let item =[];
    cart.forEach(function(prod){
      item.push(prod);
      return item;
    })

    var value_total = total;
    var total_bss = value_total * this.state.tasaDolar;
    var bss_formato= new Intl.NumberFormat(["ban", "id"]).format(total_bss);

    let valor = '';
    let i=0;
    cart.map((cartData) => {
      i++;

      if(i>1){
        valor += "," + cartData.Titulo;
      }
      else{
        valor += cartData.Titulo;
      }
      return valor;
    })

    swal({
      title: "¿Está seguro de finalizar su compra?",
      text: "Cuando finalice su pedido el carrito de compra se vaciará.",
      icon: "warning",
      buttons: true

    }).then(respuesta =>{
      if(respuesta){
        axiosInstance.post('/sendPayWhatsapp',{
          'id_user': this.state.userId,
          'cupones': item,
          'email': this.state.dataUser.CorreoElectronico, 
          'nombre': this.state.dataUser.Nombre, 
          'telefono': this.state.dataUser.telefono, 
          'totalBss': bss_formato, 
          'totalDol': value_total
        })
        .then(res =>{
          this.setState({...this.state.openWha, openWha:false});
          window.open('https://api.whatsapp.com/send?phone=16475575532&text=Hola,%20Oferty%20quiero%20confirmar,%20%20el%20pago%20de%20los%20cupones:%0A' + valor + ".", "_blank");
          window.location.reload();
          localStorage.setItem('Cart', JSON.stringify([]));
        })
        .catch((error) => {
          swal({title:"Ha ocurrido un error",text:"Verifique su conexión a internet o intente de nuevo más tarde.",icon:"error",confirmButtonText: "Aceptar"});
        })
      }
      else{
        this.setState({...this.state.openWha, openWha:false});
        swal({text:"¡Muchas ofertas esperan por ti, te esperamos para comprar!", timer:2000})
      }
    })
  }

  checkPay(){
    axiosInstance.get('/tasaDolar').then(res => {
      var precioDolar = parseInt(res.data.Precio);
      this.setState({...this.state.tasaDolar, tasaDolar:precioDolar});
    })
  }

  handleChangeSelect(event){
    const target = event.target;
    const value =  target.value;
    this.setState({
      ...this.state.searchCupones, searchCupones:value
    });


    var id = "";
    var inputValue = document.getElementById("inputSearch").value;
    var options = document.getElementById("cupones").childNodes;
    for (var i = 0; i < options.length; i++) {
      if (options[i].value === inputValue) {
        // Send to DB - options[i].attributes.value
        id = options[i].attributes.dataid.value;
        if(id !== ""){
          window.location.href= '/Detalles-Cupon/Cupones/'+id;
        }
        break;
      }
    }

  }

  getAllCupones(){
    axiosInstance.get("/readAllCupones").then(res => {
      
        this.setState({cuponesSearch: res.data});
      
    })
  }





  //Diseño del modal

  render() {
    return (
      <div className="">
        <WhatsAppWidget message='¡Hola! 👋🏼 ¿Cómo podemos ayudarte?' phoneNumber='16475575532' companyName='Oferty' />
        <Modal
        open={this.state.openPay}
        onClose={this.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
          <div style={{ position: 'absolute', width: '400', backgroundColor:'white'}} className="modal-main">
            <div className="contenedor-gen">
              <div className="contenedor-imagen">
                <div className="contenedor-transparentes-naranja">
                    <div className="contenido-cont">
                      <h2>Seleccione por donde efectuará su pago</h2>

                      <div className="iconos-circulo">
                        <div className="icon_circ wha"onClick={() => this.handleWhatsapp()}>
                          <img src={whatsapp} alt="whatsapp"/>
                          <h3>Whatsapp</h3>
                        </div>
                        
                        <Link to="/Formulario-de-Pago" onClick={() => this.handleClose()}>
                          <div className="icon_circ form">
                            <img src={form} alt="formulario"/>
                            <h3>Pago Rápido</h3>
                          </div>
                        </Link>
                      </div>
                    </div>
                    
                    
                </div>
              </div>
            </div>
          </div>

        </Modal>


        {/* MODAL DE WHATSAPP */}

        <Modal
        open={this.state.openWha}
        onClose={this.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
          <div style={{ position: 'absolute', width: '400', backgroundColor:'white'}} className="modal-main">
            <div className="contenedor-wha">
                <div className="contenido-text">
                  <h2>Confirmar cupones</h2>
                  <img src={logo_oferty} alt="Oferty"/>
                  <p>Oferty, C.A</p>
                </div>

                <div className="cupones-list">
                  <ProductConsumer>            
                    {value => {
                      if(value.Cart.length > 0) {
                        return(
                          <table>
                            <tbody>
                              {value.Cart.map (cartData =>{
                                return(
                                  <tr key={cartData.id} className="table-cupones">
                                    <tr key={cartData.id}>
                                      <td className="imagen_car" style={{backgroundImage:`url(${cartData.Imagen})`}}></td>
                                      <td className="tit_car" colSpan="2">{cartData.Titulo}</td>
                                      <td className="cas_peq">{value.Cantidad}</td>
                                    </tr>
                                  </tr>

                                    
                                )
                              })}

                              <tr className="precios">
                                <td>TOTAL:</td>
                                <td>${value.total}</td>
                              </tr>
                               

                              <button onClick={this.whatsappClick.bind(this,value.Cart, value.total)}>Enviar a Whatsapp</button>
                              
                  
                            </tbody>
                          </table>

                          
                        )
                      }
                      else{
                        return(
                          <table>
                            <tbody>
                              <tr>
                                <td className="td_reserva">No ha reservado ningun cupón</td>
                              </tr>
                            </tbody>
                          </table>
                        )

                      }
                    }}
                  </ProductConsumer>
                </div>
                

               
         
            </div>
          </div>

        </Modal>

        {/* MODAL DE UBICACION */}
        <Modal
        open={this.state.openLoc}
        onClose={this.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
          <div style={{ position: 'absolute', width: '400', backgroundColor:'white'}} className="modal-main">
            <div className="contenedor-ubicacion">

              <div className="contenedor-img">
                <div className="contenedor-trans-naranja">
                    <div className="contenido-txt">
                      <h2>Busca de acuerdo a tu ubicación las ofertas mas cercanas a ti</h2>


                      <div className="icon_ubicacion">
                        <img className="img-responsive" src={iconMap} alt="mapa"></img>
                      </div>

                      <div className="select-ubi">
                        <select className="form-control" onChange={this.handleSelectUbicacion}>
                          <option value="Agua Blanca">Agua Blanca</option>
                          <option value="Camoruco">Camoruco</option>
                          <option value="Centro de Valencia">Centro de Valencia</option>
                          <option value="El Bosque">El Bosque</option>
                          <option value="El Parral">El Parral</option>
                          <option value="El Recreo">El Recreo</option>
                          <option value="El Rincon">El Rincon</option>
                          <option value="Trigal Centro">Trigal Centro</option>
                          <option value="Trigal Norte">Trigal Norte</option>
                          <option value="El Viñedo">El Viñedo</option>
                          <option value="Guaparo">Guaparo</option>
                          <option value="Guataparo">Guataparo</option>
                          <option value="La Alegria">La Alegria</option>
                          <option value="La Granja">La Granja</option>
                          <option value="La Kerdell">La Kerdell</option>
                          <option value="La Viña">La Viña</option>
                          <option value="Las Acacias">Las Acacias</option>
                          <option value="Las Quintas I">Las Quintas I</option>
                          <option value="Las Quintas II">Las Quintas II</option>
                          <option value="Las Chimeneas">Las Chimeneas</option>
                          <option value="Lomas del Este">Lomas del Este</option>
                          <option value="Los Colorados">Los Colorados</option>
                          <option value="10.196692,-68.0252891">Los Mangos</option>
                          <option value="Los Nisperos">Los Nisperos</option>
                          <option value="Los Sauces">Los Sauces</option>
                          <option value="Mañongo">Mañongo</option>
                          <option value="Naguanagua">Naguanagua</option>
                          <option value="Tajazal">Tajazal</option>
                          <option value="Prebo">Prebo</option>
                          <option value="San Jose de Tarbes">San Jose de Tarbes</option>
                          <option value="San Diego">San Diego</option>
                        </select>
                      </div>
                     
                    </div> 
                </div>
              </div>
                

               
         
            </div>
          </div>

        </Modal>
        
        {this.state.user ? (
          <div className="ctn-home">
        
          <header className="header-style-1">

            <div className="top-bar animate-dropdown">
              <Container>
                <div className="header-top-inner">
                  <div className="cnt-account">
                    <ul className="list-unstyled">
                      <li><Link to="/Login"><i className="icon fa fa-user"></i>¿Eres nuevo aquí?</Link></li>
                      <li><Link to="/Validar-Cupon"><i className="icon fa fa-heart"></i>¡Válida tu cupon!</Link></li>
                      <li><Link to="/Suscripciones"><i className="icon fa fa-heart"></i>Vende con Oferty</Link></li>
                    </ul>
                  </div>
                </div>
              </Container>
            </div>

            <div className="main-header">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-lg-2 col-sm-12 col-md-3 logo-holder">
                    <div className="logo"> <Link to="/"> <img src={logo} alt="logo" height='88px'/> </Link> 
                    </div>
                  </div> 

                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 top-search-holder">
                    <div className="search-area">
                      <form>
                        <div className="control-group">
                          <div className="control-group">
                          <input id="inputSearch" list="cupones" name="cupones" type="text" placeholder="Busca aquí" className="search-field"
                            onChange={this.handleChangeSelect} value={this.state.searchCupones}/>
                            <datalist id="cupones" onChange={this.hanldeClick}>
                              {Object.keys(this.state.cuponesSearch).map (i =>{
                                if(this.state.cuponesSearch[i].Titulo){
                                  return(
                                    <option key={i} dataid={i} value={this.state.cuponesSearch[i].Titulo}></option>
                                  ) 
                                }
                                return null;
                              })}
                            </datalist>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-5 col-sm-12 col-xs-12 navmenu">
                    <div className="yamm navbar navbar-default" role="navigation">
                      <div className="navbar-header">
                        <div className="nav-bg-class">
                          <div className="navbar-collapse">
                            <div className="nav-outer">
                              <ul className="nav navbar-nav">
                                <li className="map-radius" onClick={this.hanldeOpenModal}><i className="icon fa fa-map-marker"></i></li>
                                <li className="dropdown inicio_btn"> <NavLink to="/">Inicio</NavLink>
                                </li>

                                <li className="dropdown"> <NavLink to="/Cupones-Destacados"  className="btn-destacado">Destacado</NavLink>
                                </li>

                                <li className="dropdown"> <NavLink to="/Cupones">Cupones</NavLink>
                                </li>

                                <div className="dropdown img_perfil">
                                    <button className="dropdown-toggle" data-hover="dropdown" data-toggle="dropdown" ><img id="Perfil_img" src={this.state.img} width="50px" 
                                    alt="Foto de Perfil"/></button>
                                    <ul className="dropdown-menu">
                                      <li>
                                        <div className="yamm-content">
                                          <div className="">
                                            <div className=" col-menu">
                                              <ul className="links">
                                                <li className="user_email">{this.state.user.email}</li>
                                                <li><button id="btn-logout" onClick={this.logout}>Cerrar Sesión</button></li>
                                                {this.state.dataUser.Rol === "Suscripcion" ? (
                                                  <li><Link id="btn-logout" to="/Dashboard-Suscriptor">Perfil</Link></li>
                                                ):(
                                                  <li></li>
                                                )}
                                                {this.state.dataUser.Rol === "Administrador" ? (
                                                  <li><Link id="btn-logout" to="/Dashboard-Admin">Perfil</Link></li>
                                                ):(
                                                  <li></li>
                                                )}
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                              </ul>

                              <div className="clearfix"></div>

                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="top-cart-row">
                      <div className="dropdown dropdown-cart"> <button className="dropdown-toggle lnk-cupon" data-toggle="dropdown"><img src={cupon} width='60' alt="Cupón" /></button>
                        <ul id="carrito-cupon" className="dropdown-menu">
                          <li>
                            <h4 className="cupon_hist">CUPONERA</h4>
    

                            <div className="cart-item product-summary">
                              <table id="lista-cupon" className="table">
                                <thead>
                                  <tr>

                                  </tr>
                                </thead>
                                
                                <ProductConsumer>
                                  
                                  {value => {
                                    if(value.Cart.length > 0) {
                                      return(
                                        
                                        <tbody>
                                          {value.Cart.map ((cartData,i) =>{
                                            return(
                                                <tr key={i}>
                                                  <td className="imagen_car" style={{backgroundImage:`url(${cartData.Imagen})`}}></td>
                                                  <td className="tit_car" colSpan="2">{cartData.Titulo}</td>
                                                  <td className="cas_peq"><input type="number" min="1" max="100" value={cartData.Cantidad} 
                                                  onChange={(e) => value.changeNumber(e,cartData.Id)}></input></td>
                                                  <td className="cas_peq"><button className="borrar-producto fa fa-trash" style={{color:'#ed4053'}} 
                                                  onClick={() => value.removeItem(cartData.Id)}>{null}</button></td>
                                                </tr>
                                            )
                                          })}
                                          <tr className="balloon">
                                            <th>{value.functionMessage()}</th>
                                          </tr>
                                          <tr className="Botones">
                                              <th className="precios">
                                                <p className="total_value">TOTAL : &nbsp;</p>
                                                <p className="precio_carrito">&nbsp; ${value.total}</p>
                                              </th>

                                              <th className="comprar">
                                                <button id="vaciar-carrito" className="btn btn-block boton_vaciar" onClick={() => value.removeAllCupones()}>
                                                  <i className="fa fa-trash"></i>Vaciar</button>
                                                <button id="btnProcesarCompra" className="btn btn-block boton_compra" onClick={() => this.buyCupones()}>Pagar Cupones</button>
                                              </th>
                                          </tr>
                                        </tbody>

                                       
                                      )
                                    }
                                    else{
                                      return(
                                        <tbody>
                                          <tr>
                                            <td className="td_reserva">No ha reservado ningun cupón</td>
                                          </tr>
                                          <tr className="ballon-vacio balloon">
                                            <th>Cada cuponera tiene 3 espacios.</th>
                                          </tr>
                                        </tbody>
                                      )

                                    }
                                  }}
                              </ProductConsumer>
                                
                              </table>
                            </div>


                          </li>
                        </ul>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
          </header>

          <div className="body-content outer-top-ts menu-destacado" id="top-banner-and-menu">
            <div className="yamm navbar navbar-default" role="navigation">
              <div className="nav-destacado">
                <div className="navbar-header">
                  <button data-target="#mc-horizontal-menu-collapse" data-toggle="collapse" className="navbar-toggle collapsed" type="button">
                  <span className="sr-only">Toggle navigation</span> <span className="icon-bar"></span> <span className="icon-bar"></span> <span className="icon-bar"></span></button>
                </div>

                <div className="nav-bg-class">
                  <div className="navbar-collapse collapse" id="mc-horizontal-menu-collapse">
                    <div className="nav-outer">
                      <ul className="nav navbar-nav">
      
                        <li className="dropdown"> <NavLink  to="/Cupon-de-la-Semana" className="menu_movil">CUPONES DE LA SEMANA</NavLink >
                        </li>

                        <li className="dropdown"> <NavLink  to="/Cupon-Dolar">TODO EN $1</NavLink >
                        </li>

                        <li className="dropdown sign"> <NavLink  className="menu_movil" to={"/Cupon-Mejor-Salud"}>LO MEJOR EN SALUD</NavLink >
                        </li>

                        <li className="dropdown sign"> <NavLink  to="/Cupon-BellezaTop">BELLEZA TOP</NavLink >
                        </li>

                        <li className="dropdown sign"> <NavLink  to="/Cupon-Comida">COMIDA</NavLink >
                        </li>

                      </ul>
      
                      <div className="clearfix"></div>

                    </div>
                  </div>
                </div>
    

              </div>
            </div>
          </div>
        </div>

        ) : (

          <div className="ctn-home">

            <header className="header-style-1">
    
              <div className="top-bar animate-dropdown">
                <Container>
                  <div className="header-top-inner">
                    <div className="cnt-account">
                      <ul className="list-unstyled">
                        <li><Link to="/Login"><i className="icon fa fa-user"></i>¿Eres nuevo aquí?</Link></li>
                        <li><a href="/Validar-Cupon"><i className="icon fa fa-heart"></i>¡Válida tu cupon!</a></li>
                        <li><a href="/Suscripciones"><i className="icon fa fa-heart"></i>Vende con Oferty</a></li>
                      </ul>
                    </div>
                  </div>
                </Container>
              </div>
    
              <div className="main-header">
                <div className="container">
                  <div className="row">
                    <div className="col-xs-12 col-lg-2 col-sm-12 col-md-3 logo-holder">
                      <div className="logo"> <Link to="/"> <img src={logo} alt="logo" height='88px'/> </Link> 
                      </div>
                    </div> 
    
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 top-search-holder">
                      <div className="search-area">
                        <form>
                          <div className="control-group">
                            <input id="inputSearch" list="cupones" name="cupones" type="text" placeholder="Busca aquí" className="search-field"
                            onChange={this.handleChangeSelect} value={this.state.searchCupones}/>
                            <datalist id="cupones" onChange={this.hanldeClick}>
                              {Object.keys(this.state.cuponesSearch).map (i =>{
                                if(this.state.cuponesSearch[i].Titulo){
                                  return(
                                    <option key={i} dataid={i} value={this.state.cuponesSearch[i].Titulo}></option>
                                  )
                                }
                                return null;
                              })}
                            </datalist>
                          </div>
                        </form>
                      </div>
                    </div>
    
                    <div className="col-lg-6 col-md-5 col-sm-12 col-xs-12 navmenu">
                      <div className="yamm navbar navbar-default" role="navigation">
                        <div className="navbar-header">
                          <div className="nav-bg-class">
                            <div className="navbar-collapse">
                              <div className="nav-outer">
                                <ul className="nav navbar-nav">
                                  <li className="map-radius" onClick={this.hanldeOpenModal}><i className="icon fa fa-map-marker"></i></li>
                                  <li className="dropdown inicio_btn"> <NavLink to="/">Inicio</NavLink>
                                  </li>
    
                                  <li className="dropdown"> <NavLink to="/Cupones-Destacados">Destacado</NavLink>
                                  </li>
    
                                  <li className="dropdown"> <NavLink to="/Cupones">Cupones</NavLink>
                                  </li>
    
                                  <li id="button_sign" className="dropdown sign"> <NavLink className="sign-in" to="/Login">Ingresar</NavLink>
                                  </li>
    

                                </ul>
    
                                <div className="clearfix"></div>
    
                              </div>
                            </div>
                          </div>
                        </div>
    
                        <div className="top-cart-row">
                        <div className="dropdown dropdown-cart"> <button className="dropdown-toggle lnk-cupon" data-toggle="dropdown"><img src={cupon} width='60' alt="Cupón" /></button>
                          <ul id="carrito-cupon" className="dropdown-menu">
                            <li>
                              <h4 className="cupon_hist">Reserva de Cupones</h4>
                              <div className="cart-item product-summary">
                                <table id="lista-cupon cupon-login" className="table">
                                  <thead>
                                    <tr>
    
                                    </tr>
                                  </thead>
    
                                  <tbody className="cupon-login">
                                    <tr>
                                      <td className="td_reserva">Para poder comprar cupones.<Link to="/Login">Inicia Sesión</Link></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>


                            </li>
                          </ul>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> 
            </header>
    
            <div className="body-content outer-top-ts menu-destacado" id="top-banner-and-menu">
              <div className="yamm navbar navbar-default" role="navigation">
                <div className="nav-destacado">
                  <div className="navbar-header">
                    <button data-target="#mc-horizontal-menu-collapse" data-toggle="collapse" className="navbar-toggle collapsed" type="button">
                    <span className="sr-only">Toggle navigation</span> <span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button>
                  </div>
    
                  <div className="nav-bg-class">
                    <div className="navbar-collapse collapse" id="mc-horizontal-menu-collapse">
                      <div className="nav-outer">
                        <ul className="nav navbar-nav">
        
                          <li className="dropdown"> <NavLink to="/Cupon-de-la-Semana" className="menu_movil">CUPONES DE LA SEMANA</NavLink>
                          </li>
    
                          <li className="dropdown"> <NavLink to='/Cupon-Dolar'>TODO EN $1</NavLink>
                          </li>
    
                          <li className="dropdown sign"> <NavLink className="menu_movil" to={'/Cupon-Mejor-Salud'}>LO MEJOR EN SALUD</NavLink>
                          </li>
    
                          <li className="dropdown sign"> <NavLink to='/Cupon-BellezaTop'>BELLEZA TOP</NavLink>
                          </li>
    
                          <li className="dropdown sign"> <NavLink to='/Cupon-Comida'>COMIDA</NavLink>
                          </li>
    
                        </ul>
        
                        <div className="clearfix"></div>
    
                      </div>
                    </div>
                  </div>
      
    
                </div>
              </div>
            </div>
            
    
            
            
          </div>
  

        )}
      </div>
     
      
    );
  }
}


export default Header;