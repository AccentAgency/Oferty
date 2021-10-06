
import './css/Footer.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

function Footer() {
  return (
    <div className="">

        <footer id="footer" className="footer color-bg">
            <div className="footer-bottom">
            <div className="container">
                <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-center">

                <div id="fila_footer" className="col-xs-12 col-sm-6 col-md-4 col-lg-4">

                    <div className="module-heading">
                        <h4 className="module-title">TERMINOS</h4>
                    </div>
                    {/*-- /.Modulo encabezado : Terminos -->*/}

                    <div className="module-body">
                        <ul className='list-unstyled'>
                        <li className="first"><a href="TerminosCondiciones.html" title="Terminos y Condiciones">Términos y condiciones</a></li>
                        <li><a href="Politica.html" title="Politica">Políticas de privacidad</a></li>
                        <li><a href="PoliticaCambio.html" title="Devolucion">Políticas de cambio y devolución</a></li>
                        </ul>
                    </div>
                    {/*-- /.Cuerpo del modulo : Terminos --*/}
                    </div>


                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">

                    <div className="module-heading">
                        <h4 className="module-title">SOBRE OFERTY</h4>
                    </div>
                    {/*-- /.Modulo encabezado : Sobre Oferty --*/}


                    <div className="module-body">
                        <ul className='list-unstyled'>
                        <li className="first"><a href="QuienesSomos.html" title="Contact us">¿Quiénes somos?</a></li>
                        <li><a href="PublicaOferty.html" title="Vende en Oferty">Publica en oferty</a></li>
                        <li><a href="ComprarCupones.html" title="Cupones">¿Cómo comprar cupones?</a></li>
                        </ul>
                    </div>
                    {/*-- /.Cuerpo del Modulo: Sobre Oferty --*/}
                    </div>


                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <div className="module-heading">
                        <h4 className="module-title">Contacto</h4>
                    </div>
                    {/*-- /.Modulo encabezado : Contacto --*/}

                    <div className="module-body">
                        <ul className='list-unstyled'>
                        <li className="first"><a title="WhatsApp" href="https://api.whatsapp.com/send?phone=16475575532&text=Hola,%20Oferty%20necesito%20ayuda.">Telefono de Contacto</a></li>
                        <li><a title="Information" href="DondeUbicarnos.html">Donde nos encontramos</a></li>
                        <li><a title="Addresses" href="Ayuda.html">Ayuda Oferty</a></li>
                        </ul>
                    </div>
                    {/*-- /.Cuerpo del Modulo: Contacto --*/}
                    </div>

                </div>
                </div>
            </div>
            </div>

            <div className="copyright-bar">
                <div className="container">
                    <div className="col-xs-12 col-sm-12 no-padding social">
                    <ul className="links">
                        <li className="fb"><a target="_blank" rel="noopener noreferrer" href="https://facebook.com" title="Facebook"> </a> </li>
                        <li className="tw"><a target="_blank" rel="noopener noreferrer" href="https://twitter.com" title="Twitter"> </a> </li>
                        <li className="googleplus"><a target="_blank" rel="noopener noreferrer" href="mailto:ofertyweb@gmail.com" title="Correo Electronico"> </a> </li>
                        <li className="rss"><a target="_blank" rel="noopener noreferrer" href="https://instagram.com/oferty.val?igshid=74ep9yrg8hej" title="Instagram"> </a> </li>
                        <li className="youtube"><a target="_blank" rel="noopener noreferrer" href="https://youtube.com" title="Youtube"> </a> </li>
                    </ul>
                    </div>
                    <div className="col-xs-12 col-sm-12 no-padding copyright">&copy; Copyright 2020 Oferty. </div>

                </div>
            </div>
        </footer>

    </div>

    
  );
}

export default Footer;