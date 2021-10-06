
import Content from './DetallesCupon';
import React, { Component} from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';  
import Header from './Header';
import Footer from './Footer';


class Detalles extends Component{
  _isMounted = false;
  constructor(props)
  {
    super(props);
    this.state ={dataCatg:'', dataID:''}
  }



  render(){
    return (
      <div className="">
        <Header/>
        <Content dataCatg={this.props.match.params.catg} dataID={this.props.match.params.id} />
        <Footer/>
      </div>
    );
  }

}

export default Detalles;