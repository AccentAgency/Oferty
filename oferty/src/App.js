
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';  
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Inicio from './components/Global/Inicio';

import Cupones from './components/Global/Cupones';
import OfertaSemana from './components/Global/Campañas/CuponesDeLaSemana';
import CuponesSalud from './components/Global/Campañas/CuponesSalud';
import CuponesBelleza from './components/Global/Campañas/CuponesBelleza';
import CuponesComida from './components/Global/Campañas/CuponesComida';
import CuponesDolar from './components/Global/Campañas/CuponesDolar';

import CuponesCatgProductos from './components/Global/Categorias/Productos';
import CuponesCatgBelleza from './components/Global/Categorias/Belleza';
import CuponesCatgSalud from './components/Global/Categorias/Salud';
import CuponesCatgComida from './components/Global/Categorias/Comida';
import CuponesCatgServicos from './components/Global/Categorias/Servicios';

import Detalles from './components/Global/Detalles';
import SignIn from './components/Global/SignIn';
import {CartFunction} from './components/Global/Functions/CartFunction';
import Formulario from './components/Global/FormularioCompra';

import RegistroSusc from './components/Global/RegistroSuscriptor';
import ValidarCupon from './components/Global/ValidarCupon';
import Buscador from './components/Global/Buscador';
import Destacado from './components/Global/PaginaDestacados';

import DashboardAdmin from './components/Global/Administrador/Dahsboard';
import DashboardCupones from './components/Global/Administrador/DashboardCupones';
import CuponSemana from './components/Global/Administrador/CrearCuponSemana';
import ModificarCuponSemana from './components/Global/Administrador/ModificarCuponSemana';
import AgregarECuponSemana from './components/Global/Administrador/AgregarECuponSemana';
import CuponDestacado from './components/Global/Administrador/CrearCuponDestacado';
import ModificarCuponDestacado from './components/Global/Administrador/ModificarCuponDestacado';
import CuponVIP from './components/Global/Administrador/CrearCuponVip';
import ModificarCuponVIP from './components/Global/Administrador/ModificarCuponVip';
import AgregarCuponVIP from './components/Global/Administrador/AgregarECuponVip';
import AgregarCuponDestacado from './components/Global/Administrador/AgregarECuponDestacado';
import CrearCupones from './components/Global/Administrador/CrearCupones';
import ModificarCupones from './components/Global/Administrador/ModificarCupones';
import AgregarCupones from './components/Global/Administrador/AgregarECupones';
import RegistrarTienda from './components/Global/Administrador/CrearTienda';
import ModificarTienda from './components/Global/Administrador/ModificarTienda';
import CuponesVencidos from './components/Global/Administrador/CuponesVencidos';
import ReportePagos from './components/Global/Administrador/ReportePagos';
import ReportePagosWha from './components/Global/Administrador/ReporteWhatsapp';
import DetallePagos from './components/Global/Administrador/DetallePago';
import DetallePagosWha from './components/Global/Administrador/DetallePagoWhatsapp';
import DashboardSuscriptor from './components/Global/Administrador/DashboardSuscripciones';
import SolicitudPublicacion from './components/Global/Administrador/SolicitudPublicacion';
import DetailsPublicacion from './components/Global/Administrador/DetallePublicacion';
import SolicitudCancel from './components/Global/Administrador/SolicitudCancelacion';
import DetailsCancel from './components/Global/Administrador/DetallesCancelacion';
import CuponesVendidos from './components/Global/Administrador/CuponesVendidos';
import BuscarCuponesVendidos from './components/Global/Administrador/BuscarCuponesVendidos';
import ListaSuscriptor from './components/Global/Administrador/ListaSuscriptor';
import ListaUsers from './components/Global/Administrador/ListaUsuario';

import Suscripciones from './components/Global/Suscripciones';
import DashboardSusc from './components/Global/Suscripciones/DashboardSusc';
import DatosSuscriptor from './components/Global/Suscripciones/DatosSuscriptor';
import CrearPublicacion from './components/Global/Suscripciones/CrearPublicacion';
import Publicaciones from './components/Global/Suscripciones/Publicaciones';
import DetallesPub from './components/Global/Suscripciones/DetallesPublicacion';
import PublicacionAprobar from './components/Global/Suscripciones/PublicacionesEspera';
import ModificarPublicacion from './components/Global/Suscripciones/ModificarPublicacion';
import Estadistica from './components/Global/Suscripciones/Estadistica';
import DetEst from './components/Global/Suscripciones/Detalles_Estadistica';





function App() {
  return (
    <Router>
      <CartFunction>
      <Route path="/" exact component={Inicio}></Route>
      <Route path='/Suscripciones' component={Suscripciones}></Route>
      <Route path='/Login-Suscriptor' component={RegistroSusc}></Route>

      <Route path={"/Cupones"} component={Cupones}></Route>
      <Route path={"/Cupon-de-la-Semana"} component={OfertaSemana}></Route>
      <Route path={"/Cupon-Mejor-Salud"} component={CuponesSalud}></Route>
      <Route path={"/Cupon-BellezaTop"} component={CuponesBelleza}></Route>
      <Route path={"/Cupon-Comida"} component={CuponesComida}></Route>
      <Route path={"/Cupon-Dolar"} component={CuponesDolar}></Route>

      <Route path={"/Cupones-Categoria/Productos"} component={CuponesCatgProductos}></Route>
      <Route path={"/Cupones-Categoria/Belleza"} component={CuponesCatgBelleza}></Route>
      <Route path={"/Cupones-Categoria/Salud"} component={CuponesCatgSalud}></Route>
      <Route path={"/Cupones-Categoria/Comida"} component={CuponesCatgComida}></Route>
      <Route path={"/Cupones-Categoria/Servicios"} component={CuponesCatgServicos}></Route>


      <Route path={"/Detalles-Cupon/:catg/:id"} component={Detalles}></Route>
      <Route path={"/Login"} component={SignIn}></Route>
      <Route path={"/Formulario-de-Pago"} component={Formulario}></Route>
      <Route path={"/Validar-Cupon"} component={ValidarCupon}></Route>
      <Route path={"/Buscador/:ubicacion"} component={Buscador}></Route>
      <Route path={"/Cupones-Destacados"} component={Destacado}></Route>

      <Route path={"/Dashboard-Admin"} component={DashboardAdmin}></Route>
      <Route path={"/Dashboard-Cupones"} component={DashboardCupones}></Route>
      <Route path={"/Administrador-CuponSemana"} component={CuponSemana}></Route>
      <Route path={"/Administrador-ModificarCuponSemana"} component={ModificarCuponSemana}></Route>
      <Route path={"/Administrador-AgregarCuponSemana"} component={AgregarECuponSemana}></Route>
      <Route path={"/Administrador-CuponDestacado"} component={CuponDestacado}></Route>
      <Route path={"/Administrador-ModificarCuponDestacado"} component={ModificarCuponDestacado}></Route>
      <Route path={"/Administrador-AgregarCuponDestacado"} component={AgregarCuponDestacado}></Route>
      <Route path={"/Administrador-CuponVip"} component={CuponVIP}></Route>
      <Route path={"/Administrador-ModificarCuponVip"} component={ModificarCuponVIP}></Route>
      <Route path={"/Administrador-AgregarCuponVip"} component={AgregarCuponVIP}></Route>
      <Route path={"/Administrador-Cupones"} component={CrearCupones}></Route>
      <Route path={"/Administrador-ModificarCupones"} component={ModificarCupones}></Route>
      <Route path={"/Administrador-AgregarCupones"} component={AgregarCupones}></Route>
      <Route path={"/Administrador-RegistrarTiendas"} component={RegistrarTienda}></Route>
      <Route path={"/Administrador-ModificarTiendas"} component={ModificarTienda}></Route>
      <Route path={"/Administrador-PanelCuponesVencidos"} component={CuponesVencidos}></Route>
      <Route path={"/Administrador-ReporteDePagos"} component={ReportePagos}></Route>
      <Route path={"/Administrador-ReporteDePagosWhatsapp"} component={ReportePagosWha}></Route>
      <Route path={"/Administrador-DetallePagos/:id"} component={DetallePagos}></Route>
      <Route path={"/Administrador-DetallePagosWhatsapp/:id"} component={DetallePagosWha}></Route>
      <Route path={"/Dashboard-Suscripciones"} component={DashboardSuscriptor}></Route>
      <Route path={"/Administrador-SolicitudPublicacion"} component={SolicitudPublicacion}></Route>
      <Route path={"/Administrador-DetallesPublicacion/:id"} component={DetailsPublicacion}></Route>
      <Route path={"/Administrador-SolicitudCancelacion"} component={SolicitudCancel}></Route>
      <Route path={"/Administrador-DetallesCancelacion/:id/:idUser/:idCancel"} component={DetailsCancel}></Route>
      <Route path={"/Administrador-CuponesVendidos"} component={CuponesVendidos}></Route>
      <Route path={"/Administrador-BuscarCuponesVendidos"} component={BuscarCuponesVendidos}></Route>
      <Route path={"/Administrador-ListaSuscriptor"} component={ListaSuscriptor}></Route>
      <Route path={"/Administrador-ListaUsuario"} component={ListaUsers}></Route>

      <Route path={"/Dashboard-Suscriptor"} component={DashboardSusc}></Route>
      <Route path={"/Suscriptor-DatosPerfil"} component={DatosSuscriptor} ></Route>
      <Route path={"/Suscriptor-CrearPublicacion"} component={CrearPublicacion}></Route>
      <Route path={"/Suscriptor-Publicaciones"} component={Publicaciones}></Route>
      <Route path={"/Suscriptor-DetallesPublicacion/:id"} component={DetallesPub}></Route>
      <Route path={"/Suscriptor-Publicaciones-por-Validar"} component={PublicacionAprobar}></Route>
      <Route path={"/Suscriptor-ModificarPublicacion/:id"} component={ModificarPublicacion}></Route>
      <Route path={"/Suscriptor-Estadisticas"} component={Estadistica}></Route>
      <Route path={"/Suscriptor-DetallesEstadisticas/:id"} component={DetEst}></Route>
      </CartFunction>
    </Router>
    
  );
}

export default App;
