import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


import Menu from './Components/Menu';

import config from '../../../config/config';
import axios from "axios";
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

import Slider from "react-elastic-carousel";
import Item from "../Item";
import Footer from './Components/Footer';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const axiosInstance = axios.create({
    baseURL: config.backURL
});

const breakPoints = [
    { width: 1, itemsToShow: 2, itemsToScroll:2 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 4, itemsToScroll: 3 },
    { width: 1200, itemsToShow: 4, itemsToScroll: 3 }
];

class AgregarECupones extends React.Component{

    constructor(props)
    {
        super(props);
        this.state ={
            cupones:[],
            cuponesBackUp:[],
            textBuscar:'',
            checked:false,
            posicion:[],
            count: 0,
            show:false,
            showButton:false,
            stateCupon:'',
            selectCupon:[],
            value:[],
            id_cupon:'',
            open:false,
            error:'',
            loading:true,
            display:'none',

            DcampBelleza:"No",
            DcampSalud:"No", 
            DcampComida:"No", 
            DcampDolar:"No",

            campBelleza: false, 
            campSalud: false, 
            campComida:false, 
            campDolar:false

        }
        this.handleCupon = this.handleCupon.bind(this);
        this.getAddCupones = this.getAddCupones.bind(this);
        this.handleCheckboxCamp = this.handleCheckboxCamp.bind(this);
    }

    getAllCupones(){
        axiosInstance.get('/readAllCupones').then(res => {
            this.setState({cupones: res.data , cuponesBackUp: res.data});
            this.setState({loading:false});
        })
        
    }
    

    componentDidMount = () => {
        this.getAllCupones();
    }


    getAddCupones(){
        this.setState({display:'flex'});
        if(!this.state.id_cupon){
            this.setState({display:'none'});
            this.setState({error: "Favor seleccione un cupón", open:true});
        }
        else{
            if(this.state.DcampBelleza === "No" && this.state.DcampComida === "No" && this.state.DcampDolar === "No" && this.state.DcampSalud){
                swal({
                    title: "¿Esta seguro de agregar este cupón sin ninguna campaña?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((value) => {
                    if (value) {
                        axiosInstance.post('/updateCupones', {
                            'tag': JSON.stringify(this.state.value),
                            'categoria': this.state.selectCupon.Categoria,
                            'descripcion': this.state.selectCupon.Descripcion,
                            'detalles': this.state.selectCupon.Detalles,
                            'disponibilidad':this.state.selectCupon.Disponibilidad_Estandar,
                            'dispmin': this.state.selectCupon.Disponibilidad_Minima,
                            'fecha_ven': this.state.selectCupon.Fecha_Vencimiento,
                            'imagen': this.state.selectCupon.Imagen,
                            'imagenSec': this.state.selectCupon.ImagenSecundaria,
                            'imagenTerc': this.state.selectCupon.ImagenTercera,
                            'tienda': this.state.selectCupon.Tienda,
                            'titulo': this.state.selectCupon.Titulo,
                            'lunes': this.state.selectCupon.Lunes, 
                            'martes': this.state.selectCupon.Martes, 
                            'miercoles' : this.state.selectCupon.Miercoles, 
                            'jueves': this.state.selectCupon.Jueves, 
                            'viernes' : this.state.selectCupon.Viernes, 
                            'sabado': this.state.selectCupon.Sabado, 
                            'domingo': this.state.selectCupon.Domingo, 
                            'campBelleza': this.state.selectCupon.CampBelleza, 
                            'campComida': this.state.selectCupon.CampComida, 
                            'campSalud' : this.state.selectCupon.CampSalud, 
                            'campTodoDolar' : this.state.selectCupon.CampDolar,
                            'consid': this.state.selectCupon.Consideraciones,
                            'contraind': this.state.selectCupon.Contraindicacion,
                            'plazo': this.state.selectCupon.PlazoDeUso,
                            'ahorro': this.state.selectCupon.AhorroOferta,
                            'inc': this.state.selectCupon.Incluye,
                            'noInc': this.state.selectCupon.NoIncluye,
                            'idCupon': this.state.id_cupon
                        })
                        .then(res => {
                            this.setState({display:'none'});
                            swal({title:"¡Cupon registrado correctamente!",icon:"success",confirmButtonText: "Aceptar"});
                            this.resetForm();
                            window.scrollTo(0, 0)
                        })
                        .catch((error) => {
                            this.setState({display:'none'});
                            swal({title:"Ha ocurrido un error",text:"Verifique su conexión a internet o intente de nuevo más tarde.",icon:"error",confirmButtonText: "Aceptar"});
                        })

                    } else {
                        this.setState({display:'none'});
                    }
                });
            }
            else{
                axiosInstance.post('/updateCupones', {
                    'tag': JSON.stringify(this.state.value),
                    'categoria': this.state.selectCupon.Categoria,
                    'descripcion': this.state.selectCupon.Descripcion,
                    'detalles': this.state.selectCupon.Detalles,
                    'disponibilidad':this.state.selectCupon.Disponibilidad_Estandar,
                    'dispmin': this.state.selectCupon.Disponibilidad_Minima,
                    'fecha_ven': this.state.selectCupon.Fecha_Vencimiento,
                    'imagen': this.state.selectCupon.Imagen,
                    'imagenSec': this.state.selectCupon.ImagenSecundaria,
                    'imagenTerc': this.state.selectCupon.ImagenTercera,
                    'tienda': this.state.selectCupon.Tienda,
                    'titulo': this.state.selectCupon.Titulo,
                    'lunes': this.state.selectCupon.Lunes, 
                    'martes': this.state.selectCupon.Martes, 
                    'miercoles' : this.state.selectCupon.Miercoles, 
                    'jueves': this.state.selectCupon.Jueves, 
                    'viernes' : this.state.selectCupon.Viernes, 
                    'sabado': this.state.selectCupon.Sabado, 
                    'domingo': this.state.selectCupon.Domingo, 
                    'campBelleza': this.state.DcampBelleza, 
                    'campComida': this.state.DcampComida, 
                    'campSalud' : this.state.DcampSalud, 
                    'campTodoDolar' : this.state.DcampDolar,
                    'consid': this.state.selectCupon.Consideraciones,
                    'contraind': this.state.selectCupon.Contraindicacion,
                    'plazo': this.state.selectCupon.PlazoDeUso,
                    'ahorro': this.state.selectCupon.AhorroOferta,
                    'inc': this.state.selectCupon.Incluye,
                    'noInc': this.state.selectCupon.NoIncluye,
                    'idCupon': this.state.id_cupon
                })
                .then(res => {
                    this.setState({display:'none'});
                    swal({title:"¡Cupon registrado correctamente!",icon:"success",confirmButtonText: "Aceptar"});
                    this.resetForm();
                    window.scrollTo(0, 0)
                })
                .catch((error) => {
                    swal({title:"Ha ocurrido un error",text:"Verifique su conexión a internet o intente de nuevo más tarde.",icon:"error",confirmButtonText: "Aceptar"});
                })
            }
        }
        
    }


    filter(event){
        var text = event.target.value;
        const data = this.state.cuponesBackUp;

        const newData = Object.values(data).filter(function(item){
            if(item.Titulo != null){
                const itemData = item.Titulo.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1
            }
            return item;
        })

        this.setState({
            cupones: newData,
            textBuscar: text,
        })
    }

    handleCupon(id){
        this.setState({id_cupon: id});
        var array = [];
        axiosInstance.get('/getCupones/'+ id).then(res => {
            this.setState({show:true});
            this.setState({selectCupon: res.data});

            Object.keys(res.data.Tag).forEach(function(key) {
                Object.keys(res.data.Tag[key]).forEach(function(val) {
                    array.push(res.data.Tag[key][val]);
                });
            })
            this.setState({value: array});

            if(res.data.CampBelleza === "Si"){
                this.setState({campBelleza:true});
                this.setState({DcampBelleza:"Si"});
            }

            if(res.data.CampComida === "Si"){
                this.setState({campComida:true});
                this.setState({DcampComida:"Si"});
            }

            if(res.data.CampSalud === "Si"){
                this.setState({campSalud:true});
                this.setState({DcampSalud:"Si"});
            }

            if(res.data.CampDolar === "Si"){
                this.setState({campDolar:true});
                this.setState({DcampDolar:"Si"});
            }

        })
    }

    resetForm(){
        this.setState({
            cuponesBackUp:[],
            textBuscar:'',
            checked:false,
            posicion:[],
            count: 0,
            show:false,
            showButton:false,
            stateCupon:'',
            selectCupon:[],
            value:[],
            id_cupon:'',
            cupones:[]
        })

        var ele = document.getElementsByName("cupones");
        for(var i=0;i<ele.length;i++)
           ele[i].checked = false;

        this.getAllCupones();   
    }

    handleCheckboxCamp(event){
        this.setState({showButton: true});
        const target = event.target;
        const name = target.name;
        const nameD = 'D' + name;
        if(this.state[name] === true){
            this.setState({[name]:false});
            this.setState({[nameD]:"No"});
        }
        else{
            this.setState({[name]:true});
            this.setState({[nameD]:"Si"});
        } 
    }


    render(){
        return(

            <div className="">
                <Menu></Menu>

                <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error">
                     {this.state.error}
                    </Alert>
                </Snackbar>

                <div className="loader-page3" style={{display:this.state.display}}>
                    <div className="lds-ripple"><div></div><div></div></div>
                </div>
                
                {this.state.loading ? (
                    <div className="loader-page-circle">
                        <div className="wrappers">
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="shadow"></div>
                            <div className="shadow"></div>
                            <div className="shadow"></div>
                        </div>
                    </div>
                ):(
                <div id="admin-post" className="main-content">
                    <section className="section">
                        <div className="section-body">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Cupones</h4>
                                        </div>

                                        <div className="categories">
                                            <ul>
                                                <li>
                                                    <Link to="Administrador-Cupones" data-filter="*">Crear Cupón</Link>
                                                </li>
                                                <li>
                                                    <Link to="Administrador-ModificarCupones" data-filter=".web-design">Modificar Cupones</Link>
                                                </li>
                                                <li  className="active">
                                                    <Link to="Administrador-AgregarCupones" data-filter="*">Agregar Cupón a Campañas</Link>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="card-body">
                                            <div className="card-header-form">
                                                <div className="card-body header-center">
                                                    <div id="SearchUser" className="card col-offset-3 tiendas-form">
                                                        <h5>Buscar Cupón</h5>
                                            
                                                        <div className="input-group col-md-8 col-center">
                                                            <input id="User" type="text" className="form-control" placeholder="Buscar Cupón..." value={this.state.text}
                                                            onChange={(text) => this.filter(text)}/>
                                                            <div className="input-group-btn">
                                                                <button className="btn btn-primary"><i className="fa fa-search"></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="tab-content outer-top-xs">
                                                <div className="tab-pane in active" id="all">
                                                    <Slider className="" breakPoints={breakPoints}>
                                                        {Object.keys(this.state.cupones).map (i =>{
                                                        return( 
                                                        <Item className="" key={i}>
                                                            <div className="products">
                                                                <div className="product">
                                                                <div className="product-image">
                                                                    <div className="image">
                                                                        <div className="image" style={{backgroundImage:`url(${this.state.cupones[i].Imagen})`}} alt=""
                                                                        onClick={this.handleCupon.bind(this, this.state.cupones[i].Id)}/>
                                                                    </div>
                                                                </div>
                                                                <div className="product-info text-left">
                                                                    <div className="Contenedor">
                                                                        <h3 id="tit1" className="name">{this.state.cupones[i].Titulo}</h3>
                                                                        <div className="description">{this.state.cupones[i].detalles}</div>
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

                                            <hr className="linea"></hr>

                                            <div className="card-body">
                                                <h4 className="titulo">Información General del Cupón Seleccionado</h4>

                                                <div className="form-group row mb-4">
                                                    <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Titulo</label>
                                                    <div className="col-sm-12 col-md-7">
                                                        <input name="titulo" id="Titulo" type="text" className="form-control" maxLength="18" 
                                                        defaultValue={this.state.selectCupon.Titulo}
                                                        readOnly/>
                                                    </div>
                                                </div>

                                                <div className="form-group row mb-4">
                                                    <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Detalles</label>
                                                    <div className="col-sm-12 col-md-7">
                                                        <input name="detalles" id="Detalles" type="text" className="form-control" maxLength="40" 
                                                        defaultValue={this.state.selectCupon.Detalles}
                                                        readOnly/>
                                                    </div>
                                                </div>

                                                <div className="form-group row mb-4">
                                                    <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Stock</label>
                                                    <div className="col-sm-12 col-md-7">
                                                        <input name="stock" type="text" className="form-control" maxLength="40" 
                                                        defaultValue={this.state.selectCupon.Stock_Producto}
                                                        readOnly/>
                                                    </div>
                                                </div>

                                                <div className="form-group row mb-4">
                                                    <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Fecha_Vencimiento</label>
                                                    <div className="col-sm-12 col-md-7">
                                                        <input name="detalles" id="Detalles" type="datetime-local" className="form-control" maxLength="40" readOnly
                                                        defaultValue={this.state.selectCupon.Fecha_Vencimiento}/>
                                                    </div>
                                                </div>
                                            </div>    

                                            <hr className="linea"></hr>

                                            <div className="card-body" style={{display:this.state.show ? 'block' : 'none'}}>
                                                <h5 className="titulo">Seleccionar Campaña/s a las que desea agregar el cupón</h5>
                                                <div className="input-group justify-content-center">                                                  
                                                   
                                                        <div className="custom-control custom-checkbox checkbox-inline">
                                                            <input name="campDolar" type="checkbox" className="custom-control-input only-one" id="customCheck-camp1" value="Si"
                                                            checked={this.state.campDolar} onChange={this.handleCheckboxCamp}/>
                                                            <label className="custom-control-label" htmlFor="customCheck-camp1">Todo en $1</label>
                                                        </div>

                                                        <div className="custom-control custom-checkbox checkbox-inline">
                                                            <input name="campSalud" type="checkbox" className="custom-control-input only-one" id="customCheck-camp2" value="Si"
                                                            checked={this.state.campSalud} onChange={this.handleCheckboxCamp}/>
                                                            <label className="custom-control-label" htmlFor="customCheck-camp2">Lo mejor en Salud</label>
                                                        </div>

                                                        <div className="custom-control custom-checkbox checkbox-inline">
                                                            <input name="campBelleza" type="checkbox" className="custom-control-input only-one" id="customCheck-camp3" value="Si"
                                                            checked={this.state.campBelleza} onChange={this.handleCheckboxCamp}/>
                                                            <label className="custom-control-label" htmlFor="customCheck-camp3">Belleza Top</label>
                                                        </div>

                                                        <div className="custom-control custom-checkbox checkbox-inline">
                                                            <input name="campComida" type="checkbox" className="custom-control-input only-one" id="customCheck-camp4" value="Si"
                                                            checked={this.state.campComida} onChange={this.handleCheckboxCamp}/>
                                                            <label className="custom-control-label" htmlFor="customCheck-camp4">Comida</label>
                                                        </div>
                                                    
                                                        
                                                </div>

                                                <div className="form-group row mb-4"  style={{display:this.state.showButton ? 'block' : 'none'}}>
                                                    <div id="contenedor_btn" className="col-sm-12 col-md-12">
                                                        <button id="CambiarBanner" className="btn btn-primary" onClick={this.getAddCupones}>Agregar Cupón</button>
                                                    </div> 
                                                </div>
                                            </div>

                                        </div>                   
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>                    
                )}
                <Footer/>
            </div>
        )
    }
}

export default AgregarECupones;