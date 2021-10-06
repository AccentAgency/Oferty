
import Content from './Content';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';  
import Header from './Header';
import Footer from './Footer';



function Inicio() {
  return (
    <div className="">
      <Header/>
      <Content />
      <Footer/>
    </div>
  );
}

export default Inicio;