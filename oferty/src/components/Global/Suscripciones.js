import './css/Suscripciones.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {Link} from 'react-router-dom';

//Imagenes
import banner from './images/banner/banner-suscripciones.jpg';
import logo from './images/logo.svg';
import coupon from './images/suscripcion/coupon.png';
import bannerDon from './images/suscripcion/banner_donacion.png';
import bannerEco from './images/suscripcion/banner_ecologico.png';
import imagPago from './images/suscripcion/banner-pago.png';
import imgLaptop from './images/suscripcion/oferty_laptop.png';
import icon1 from './images/suscripcion/paso1.png';
import icon2 from './images/suscripcion/paso2.png';
import icon3 from './images/suscripcion/paso3.png';
import imgModelo from './images/suscripcion/modelo.png';

import Footer from './Footer';

function Suscripciones() {
    return (
      <div className="">

          <div className="ctn-home">
                <header className="header-style-1">

                    <div className="top-bar animate-dropdown">
                        <div className="container">
                            <div className="header-top-inner">
                                <div className="cnt-account">
                                    <ul className="list-unstyled">
                                        <li><Link to="/Login"><i className="icon fa fa-user"></i>¿Eres nuevo aquí?</Link></li>
                                        <li><Link to="/Validar-Cupon"><i className="icon fa fa-heart"></i>¡Válida tu cupon!</Link></li>
                                        <li><Link to="/Suscripciones"><i className="icon fa fa-heart"></i>Vende con Oferty</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>

            <div className="container">
              <div className="row">
                <div className="outer-top-t top-banner">
                    <div id="suscription" className="container">
                        <div className="contenedor_imagen">
                            <Link to="/Login-Suscriptor">
                                <div className="boton"></div>
                            </Link>
                            <img id="duplicado" className="img-responsive" src={banner} alt=""/>
                            <div className="contenedor-transparente">
                                <div className="centrado"><img src={logo} alt="logo"/></div>
                                
                                <div className="btn_oferty">
                                    <Link to="/" className="show-codes" href="index.html">IR A OFERTY</Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* -------- CONTENIDO ------- */}
                <div className="container">
                    <div id="Section_CuponesSusc" className= "col-xs-12 col-sm-12 col-md-12">

                        <div className="cupones_suscription">
                            <h1>¡CUPONES!</h1>
                            <h3>OBTÉN MÁS FLUJOS DE CLIENTES DE FORMA SEGURA</h3>
                        </div>

                        <div id="contenido_cupones" className="col-xs-12 col-sm-12 col-md-12">
                            <div className="img_cupon col-xs-6 col-sm-6 col-md-6">
                                <img src={coupon} className="img-responsive" alt="cupon"/>
                            </div>

                            <div className="txt_cupon col-xs-6 col-sm-6 col-md-6">
                                <p>
                                La función de Oferty es ayudar al comercio a
                                diseñar un descuento que se adapte a sus necesidades, minimizando la capacidad ociosa
                                del negocio, se establece un mínimo de compradores en las primeras 24horas, para activar
                                el cupón.
                                <br></br>
                                <br></br>
                                Una vez logrado el mínimo de compradores ,
                                se activa el cupón y los clientes ya pueden proceder a pagar.
                                </p>
                            </div>
                        </div>

                        <div className="contenidoCupon col-xs-12 col-sm-12 col-md-12">
                            ASÍ LOS CLIENTES OBTIENEN UNOS CUPONES CON DESCUENTOS INCREÍBLES
                            <br></br>
                            Y EL LOCAL UN MAYOR FLUJO DE CLIENTES , ES DECIR MARKETING LIBRE DE RIESGO.
                        </div>    
                    </div>
                    
                    <div id="banner_info" className="col-xs-12 col-sm-12 col-md-12">
                        <div className="banner_imagen">
                            <div className="background_img" style={{backgroundImage:`url(${imagPago})`}}>
                                <div className="contenedor-transparente-naranja">
                                    <h2>¿CÓMO VENDER EN OFERTY?</h2>

                                    <div className="txt_pasos col-xs-12 col-sm-12 col-md-12">

                                        <div className="paso_1 col-xs-4 col-sm-4 col-md-4">
                                            <img className="img-responsive" src={icon1} alt="icono"/>
                                            <div className="contenido_pasos">PASO 1</div>
                                            <p>
                                                Regístrate como perfil de empresa.
                                            </p>
                                        </div>

                                        <div className="paso_1 col-xs-4 col-sm-4 col-md-4">
                                            <img className="img-responsive" src={icon2} alt="icono2"/>
                                            <div className="contenido_pasos">PASO 2</div>
                                            <p>
                                                Registra tus datos y obtendrás acceso a tu página de administrador.
                                            </p>
                                        </div>

                                        <div className="paso_3 col-xs-4 col-sm-4 col-md-4">
                                            <img className="img-responsive" src={icon3} alt="icono"/>
                                            <div className="contenido_pasos">PASO 3</div>
                                            <p>
                                                Comienza a publicar y a vender tus ofertas.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="somos_info" className="col-xs-12 col-sm-12 col-md-12">
                        <div id="banner-info1" className="col-xs-12 col-sm-12 col-md-12">
                            <img src={bannerDon} className="img-responsive" alt="Banner donacion"/>
                        </div>

                        <div id="contenido_somos" className="col-xs-12 col-sm-12 col-md-12">
                            <div className="img_oferty col-xs-12 col-sm-6 col-md-6">
                                <img src={imgLaptop} className="img-responsive" alt="Oferty pagina web"/>
                            </div>

                            <div className="txt_somos col-xs-12 col-sm-6 col-md-6">
                                <h2>¿QUIÉNES SOMOS?</h2>
                                <p>
                                    Somos una empresa formada por un conjunto de jóvenes
                                    venezolanos el cual está al servicio del consumidor agrupando en la propia plataforma móvil y web los catálogos de ofertas y productos de las mejores tiendas locales.
                                    <br></br>
                                    <br></br>
                                    La misión es contribuir a los usuarios a compartir las emociones de sus compras, digitalizando, categorizando y geolocalizando cada una de las ofertas
                                    para que dichos logren beneficiarse de los mejores descuentos.
                                </p>
                            </div>
                        </div>

                        <div id="contenido_somos2" className="col-xs-12 col-sm-12 col-md-12">
                            <div className="fondo_cont col-xs-12 col-sm-6 col-md-6">
                                <div className="background_naranja">
                                    <p>
                                        Por medio de <strong>Oferty</strong>, los comercios tradicionales y las
                                        marcas poseen una plataforma digital para exponer sus catálogos de una forma eficaz, medible y ecológica, llegando a los
                                        clientes en todo momento.
                                        <br></br>
                                        <br></br>
                                        Adicionalmente <strong>Oferty</strong> reduce la capacidad ociosa de los
                                        comercios a través de los cupones así los negocios obtienen
                                        un importante flujo de clientes sin necesidad de invertir en
                                        marketing, es decir el comercio logra promoción libre de
                                        riesgo.
                                    </p>
                                </div>
                            </div>

                            <div className="img_oferty col-xs-12 col-sm-6 col-md-6">
                                <img src={imgModelo} className="img-responsive" alt="imagen"/>
                            </div>
                        </div>
                    </div>

                    <div id="banner_oferty" className="col-xs-12 col-sm-12 col-md-12">
                        <div id="contenido_somos" className="col-xs-12 col-sm-12 col-md-12">
                            <div className="col-xs-12 col-sm-12 col-md-12">
                                <img src={bannerEco} className="img-responsive" alt="Oferty ecologico"/>
                            </div>
                        </div>
                    </div>
                </div>
            
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Suscripciones;