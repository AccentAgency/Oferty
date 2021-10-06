import React, { Component} from 'react';
import "./css/ValidarCupon.css"
import Header from './Header';

//Imagenes
import bannerCup from './images/banner/banner_validacion.jpg';
import cupon from './images/suscripcion/coupon.png'

//Instancia axios
import axios from "axios";
import config from '../../config/config';

import swal from 'sweetalert';
import Footer from './Footer';

const axiosInstance = axios.create({
    baseURL: config.backURL
});

class ValidarCupon extends Component{
    
    state = {
        tienda: [],
        codigo:'',
        showCod:'',
        showTit: '',
        showPago:'',
        showTienda:'',
        showPerson:'',
        tiendaSel:'',
        isDisabled: true
    }

    constructor(props)
    {
      super(props);
      this.handleSearchCupon = this.handleSearchCupon.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleChangeSelect = this.handleChangeSelect.bind(this);
      this.handleValidateCoupon = this.handleValidateCoupon.bind(this);
    
    }

    handleSearchCupon(){

        if(!this.state.tiendaSel || !this.state.codigo){
            swal('Ingrese los datos', 'Favor rellene los datos indicados para validar el cupón', 'warning');
        }
        else{
            axiosInstance.get('/validateCoupon').then(res =>{
                var array_cupones = res.data;
                const code = array_cupones.find(element => element.Codigo === this.state.codigo)
                if(code !== null){
                    this.setState({...this.state.showPago, showPago:code.TipoDePago});
                    this.setState({...this.state.showCod, showCod:code.Codigo});
                    this.setState({...this.state.showTit, showTit:code.NombreCupon});
                    this.setState({...this.state.showPerson, showPerson: code.NombreUsuario});
                    this.setState({...this.state.isDisabled, isDisabled:false})
                }
                else{
                    swal('Cupón No Encontrado', 'Favor verifique que el código sea el correcto o no haya sido utilizado', 'error');
                }
            })
        }

    }

    handleChange(event){
        const target = event.target;
        const value =  target.value;

        this.setState({
            ...this.state.codigo, codigo:value
        });

        this.setState({...this.state.isDisabled, isDisabled:true})
    }

    handleChangeSelect(event){
        const target = event.target;
        const value =  target.value;

        this.setState({
            ...this.state.tiendaSel, tiendaSel:value
        });
    }

    handleValidateCoupon(event){
        axiosInstance.get('/validateCoupon').then(res =>{
            var array_cupones = res.data
            const code = array_cupones.find(element => element.Codigo === this.state.codigo)
            if(code !== null){
                if(code.Status !== "Validado"){
                    axiosInstance.post('/couponValidate',{
                        'id_pago': code.IdPago,
                        'id_cupon':code.IdCupon,
                        'id_codigo': code.IdCodigo
                    }).then(res => {
                        swal({title:"¡Cupon validado correctamente!",icon:"success",confirmButtonText: "Aceptar"});
                        this.resetInput();
                    }).catch(error => {
                        swal({title:"Ha ocurrido un error al validar el cupón",icon:"error",confirmButtonText: "Aceptar"})
                        this.resetInput();
                        return error;
                    });
                }
                else{
                    swal({title:"Este cupón ya fue registrado", text:"Si crees que ha ocurrido un error, favor contactanos a nuestro whatsapp",icon:"warning",
                    confirmButtonText: "Aceptar"})
                    this.resetInput();
                }

            }
        })
    }

    resetInput(){
        this.setState({
            codigo:'',
            showCod:'',
            showTit: '',
            showPago:'',
            showTienda:'',
            showPerson:'',
            tiendaSel:'',
            isDisabled: true
        })

        window.scrollTo(0, 0);
    }

    getTiendas(){
        axiosInstance.get('/getTiendas').then(res => {
            this.setState({...this.state.tienda, tienda:res.data})
        })
    }

    componentDidMount=() =>{
        this.getTiendas();
    }

  render(){
    return (
    <div className="">
        <Header/>
        <div className="outer-top-ts top-banner">
            <div id="BannerValidacion" className="container">
                <img id="duplicado" className="img-responsive" src={bannerCup} alt=""/>
            </div>
        </div>

        <div id="sectin_validation" className="container">
            <div className="col-md-10 row section_validation col-center">
                <div className="form-group row mb-6 col-md-12">
                    <label className="col-form-label text-md-right col-xs-12 col-md-2 col-lg-2">Tienda</label>

                    <div className="col-xs-12 col-sm-12 col-md-8">
                        <input id="tienda_opt" list="tiendas" name="tiendas" type="text" placeholder="Seleccione una tienda" className="form-control"
                        onChange={this.handleChangeSelect} value={this.state.tiendaSel}/>

                        <datalist id="tiendas">
                            {Object.keys(this.state.tienda).map (i =>{
                                return(
                                    <option key={i} value={this.state.tienda[i].Nombre}></option>
                                )
                            })}
                        </datalist>
                        
                    </div>
                </div>

                <div className="form-group row mb-6 col-md-12">
                    <label className="col-form-label text-md-right col-12 col-md-2 col-lg-2">Código de Cupon</label>

                    <div className="col-xs-12 col-sm-12 col-md-4">
                        <input id="CodigoCupon" type="text" className="form-control" maxLength="8" value={this.state.codigo} onChange={this.handleChange}/>
                    </div>
                </div>
            </div>

            <div className="col-sm-12 col-md-10 col-center">
                <button id="ValidateCupon" className="btn btn-primary" onClick={this.handleSearchCupon}>Buscar Cupón</button>
            </div>
        </div>

        <div id="section_info" className="container">
            <div className="row clearfix">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Detalles del Cupón</h4>
                        </div>

                        <div className="card-body">
                            <div className="contenedor_info">
                                <div className="foto_cupon">
                                    <img src={cupon} className="img_size" alt="cupon"/>
                                </div>

                                <div className="txt_detalles">
                                    <div className="form-group form-float">
                                        <div className="form-line">
                                            <label className="form-label">Cupón</label>
                                            <input id="NombreCupon"  type="text" className="form-control" readOnly value={this.state.showTit}/>
                                        </div>
                                    </div>

                                    <div className="form-group form-float">
                                        <div className="form-line">
                                            <label className="form-label">Código</label>
                                            <input id="Codigo" type="text" className="form-control" readOnly value={this.state.showCod}/>
                                        </div>
                                    </div>

                                    <div className="form-group form-float">
                                        <div className="form-line">
                                            <label className="form-label">Método de Pago</label>
                                            <input id="TipoDePago" type="text" className="form-control" readOnly value={this.state.showPago}/>
                                        </div>
                                    </div>

                                    <div className="form-group form-float">
                                        <div className="form-line">
                                            <label className="form-label">Nombre de la persona</label>
                                            <input id="Nombre" type="text" className="form-control" readOnly value={this.state.showPerson}/>
                                        </div>
                                    </div>

                                    <div className="col-center">
                                        <button id="ConfirmarValidacion" className="btn btn-primary" disabled={this.state.isDisabled}
                                        onClick={this.handleValidateCoupon}>VALIDAR CUPÓN</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
    );
  }

}

export default ValidarCupon;