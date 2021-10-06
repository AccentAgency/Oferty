
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';  
import {BrowserRouter as Router, Route} from 'react-router-dom';


import DashboardSusc from './components/Global/Suscripciones/DashboardSusc';
import Inicio from './components/Global/Inicio';

function Admin() {
  return (
    <Router>
      <Route path="/" exact component={Inicio}></Route>
      <Route path={"/Dashboard-Suscriptor"} component={DashboardSusc}></Route>

    </Router>
  );
}

export default Admin;
