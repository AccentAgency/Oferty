import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


import Menu from './Components/Menu';
import { Multiselect } from 'react-widgets';

import config from '../../../config/config';
import axios from "axios";
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

import Slider from "react-elastic-carousel";
import Item from "../Item";
import Footer from './Components/Footer';

const breakPoints = [
    { width: 1, itemsToShow: 2, itemsToScroll:2 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 4, itemsToScroll: 3 },
    { width: 1200, itemsToShow: 4, itemsToScroll: 3 }
  ];

const axiosInstance = axios.create({
    baseURL: config.backURL
});


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class ModificarCuponSemana extends React.Component{

    constructor(props)
    {
        super(props);
        this.state ={
            promociones:[],stateLunes:false, stateMartes:false, stateMier:false, stateJuev:false, stateViern:false, stateSab:false, stateDom:false,
            campBelleza: false, campSalud: false, campComida:false, campDolar:false, id_cupon: '', open:false, value:[], Categoria:'',
            tienda:[],imagenes:'No Disponible', imagen2: 'No Disponible', imagen3:'No Disponible', loading:true, display:'none', displayImage:'none',
            dataSelect:{
                AhorroOferta:'',
                Categoria:'Comida',
                Consideraciones:'',
                Contraindicacion:'',
                Descripcion:'',
                Detalles:'',
                Disponibilidad_Estandar:'',
                Disponibilidad_Minima:'',
                Domingo:'',
                Fecha_Vencimiento:'',
                Imagen:'No disponible',
                ImagenSecundaria:'No disponible',
                ImagenTercera:'No disponible',
                Incluye:'',
                Jueves:'',
                Lunes:'',
                Martes:'',
                Miercoles:'',
                NoIncluye:'',
                PlazoDeUso:'',
                Sabado:'',
                Stock_Producto:'',
                Tienda:'300 GRADI PIZZA',
                Titulo:'',
                Viernes: ''
            },
            errors:{
                Titulo:'',
                Descripcion:'',
                Detalles:'',
                Fecha_Vencimiento:'',
                Disponibilidad_Minima:'',
                Disponibilidad_Estandar:'',
                Stock_Producto:'',
                AhorroOferta:''
            },
            dias:{
                Lunes:"No",
                Martes:"No",
                Miercoles:"No",
                Jueves: "No",
                Viernes: "No",
                Sabado: "No",
                Domingo: "No"
            },

            campanas:{
              TodoEnDolar: "No",
              MejorEnSalud: "No",
              BellezaTop:"No",
              Comida:"No"
            },

            DstateLunes:'No',
            DstateMartes:'No',
            DstateMier:'No',
            DstateJuev:'No',
            DstateViern:'No',
            DstateSab:'No',
            DstateDom:'No',
    
            DcampBelleza:"No",
            DcampSalud:"No", 
            DcampComida:"No", 
            DcampDolar:"No"

        }
        this.handleCupon = this.handleCupon.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleChangeImagen1 = this.handleChangeImagen1.bind(this);
        this.handleChangeImagen2 = this.handleChangeImagen2.bind(this);
        this.handleChangeImagen3 = this.handleChangeImagen3.bind(this);
        this.updatePromo = this.updatePromo.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    getCuponesSemana(){
        axiosInstance.get('/getCuponesSemana')
        .then(res =>{
            this.setState({...this.state.promociones, promociones:res.data});
            this.setState({loading:false});
        })
    }

    getTiendas(){
        axiosInstance.get('/getTiendas').then(res => {
            this.setState({...this.state.tienda, tienda:res.data})
        })
    }

    handleChange(event){
        const target = event.target;
        const value =  target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            dataSelect: {
               ...this.state.dataSelect,
               [name]: target.value
            }
        });

        let errors = this.state.errors;
    
        switch (name) {
        case 'Titulo': 
            errors.Titulo= 
            value.length === 0
                ? 'Favor ingresar un titulo válido para el cupón.'
                : '';
        break;

        case 'Detalles': 
            errors.Descripcion= 
            value.length === 0
            ? 'Favor ingresar una descripción válida para el cupón.'
            : '';
        break;

        case 'Descripcion': 
            errors.Descripcion= 
            value.length === 0
                ? 'Favor ingresar una descripción válida para el cupón.'
                : '';
        break;

        
        case 'AhorroOferta': 
            errors.AhorroOferta= 
            value.length === 0
                ? 'Favor ingresar un precio de ahorro para el cupón.'
                : '';
        break;


        case 'Disponibilidad_Minima':
            errors.Disponibilidad_Minima =
            value.length === 0
            ? 'Ingresa un número mínimo de venta para el cupón.'
            : '';
        break;

        case 'Disponibilidad_Estandar':
            errors.Disponibilidad_Estandar =
            value.length === 0
            ? 'Ingresa un número máximo de venta para el cupón.'
            : '';
        break;

        case 'Stock_Producto':
            errors.Stock_Producto =
            value.length === 0
            ? 'Ingrese un valor válido para el stock.'
            : '';
        break;

        case 'Fecha_Vencimiento':
            errors.Fecha_Vencimiento =
            value.length === 0
            ? 'Ingresa una fecha de vencimiento para el cupón.'
            : '';
        break;

        default:
        break;

        }
    }

    handleSelect(event){
        const target = event.target;
        const val = event.target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            dataSelect: {
               ...this.state.dataSelect,
               [name]: val
            }
        });
    }

    handleChangeCheckbox(event){
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
    
    componentDidMount = () =>{
        this.getCuponesSemana();
        this.getTiendas();
    }

    handleCupon(value){
        var array = [];
        this.resetInput();
        this.setState({id_cupon: value});
        axiosInstance.get('/getCuponSemana/'+ value)
        .then(res => {
            this.setState({...this.state.dataSelect, dataSelect: res.data})
            Object.keys(res.data.Tag).forEach(function(key) {
                Object.keys(res.data.Tag[key]).forEach(function(val) {
                    array.push(res.data.Tag[key][val]);
                });
            })
            this.setState({value: array});

            this.setState({...this.state.imagenes, imagenes: res.data.Imagen});
            this.setState({...this.state.imagen2, imagen2: res.data.ImagenSecundaria});
            this.setState({...this.state.imagen3, imagen3: res.data.ImagenTercera});

            if(res.data.Lunes === "Si"){
                this.setState({stateLunes:true});
                this.setState({DstateLunes:"Si"});
            }

            
            if(res.data.Martes === "Si"){
                this.setState({stateMartes:true});
                this.setState({DstateMartes:"Si"});
            }

            
            if(res.data.Miercoles === "Si"){
                this.setState({stateMier:true});
                this.setState({DstateMier:"Si"});
            }

            
            if(res.data.Jueves === "Si"){
                this.setState({stateJuev:true});
                this.setState({DstateJuev:"Si"});
            }

            
            if(res.data.Viernes === "Si"){
                this.setState({stateViern:true});
                this.setState({DstateViern:"Si"});
            }

            
            if(res.data.Sabado === "Si"){
                this.setState({stateSab:true});
                this.setState({DstateSab:"Si"});
            }

            if(res.data.Domingo === "Si"){
                this.setState({stateDom:true});

                this.setState({DstateDom:"Si"});
            }

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

            if(res.data.Slider === "Si"){
                this.setState({Categoria: "Slider"});
            }
            else if(res.data.Banner === "Si"){
                this.setState({Categoria: "Banner"});
            }

            if(res.data.Imagen === "No Disponible" || res.data.Imagen === ""){
                this.setState({
                    ...this.state,
                    dataSelect: {
                       ...this.state.dataSelect,
                       Imagen: ''
                    }
                });
            }
            else{
                this.setState({
                    ...this.state,
                    dataSelect: {
                       ...this.state.dataSelect,
                       Imagen: res.data.Imagen
                    }
                });
            }

            if(res.data.ImagenSecundaria === "No Disponible" || res.data.ImagenSecundaria === ""){
                this.setState({
                    ...this.state,
                    dataSelect: {
                       ...this.state.dataSelect,
                       ImagenSecundaria: ''
                    }
                });
            }
            else{
                this.setState({
                    ...this.state,
                    dataSelect: {
                       ...this.state.dataSelect,
                       ImagenSecundaria: res.data.ImagenSecundaria
                    }
                });
            }

            if(res.data.ImagenTercera === "No Disponible" || res.data.ImagenTercera === ""){
                this.setState({
                    ...this.state,
                    dataSelect: {
                       ...this.state.dataSelect,
                       ImagenTercera: ''
                    }
                });
            }
            else{
                this.setState({
                    ...this.state,
                    dataSelect: {
                       ...this.state.dataSelect,
                       ImagenTercera: res.data.ImagenTercera
                    }
                });
            }

            
        })
    }



    handleChangeImagen1(event){
        this.setState({
            ...this.state,
            dataSelect:{
                ...this.state.dataSelect,
                Imagen: URL.createObjectURL(event.target.files[0])
            },
            displayImage:'flex'

        });

        //Subimos imagen en firebase
        const formData = new FormData();
        formData.append('image',event.target.files[0]);
        axiosInstance.post('/uploadImage', formData,{

        }).then(res => {
            this.setState({imagenes: res.data, displayImage:'none'});
        })
        .catch((error) => {
            this.setState({displayImage:'none'});
            swal.fire({title:"Ha ocurrido un error en subir la imagen",text:"Favor refresque la página e intente de nuevo.",icon:"error",confirmButtonText: "Aceptar"});
        })

    }

    handleChangeImagen2(event){
        this.setState({
            ...this.state,
            dataSelect:{
                ...this.state.dataSelect,
                ImagenSecundaria: URL.createObjectURL(event.target.files[0])
            },
            displayImage:'flex'

        });

        //Subimos imagen en firebase
        const formData = new FormData();
        formData.append('image',event.target.files[0]);
        axiosInstance.post('/uploadImage', formData,{

        }).then(res => {
            this.setState({imagen2: res.data, displayImage:'none'});
        })
        .catch((error) => {
            this.setState({displayImage:'none'});
            swal.fire({title:"Ha ocurrido un error en subir la imagen",text:"Favor refresque la página e intente de nuevo.",icon:"error",confirmButtonText: "Aceptar"});
        })
    }

    handleChangeImagen3(event){
        this.setState({
            ...this.state,
            dataSelect:{
                ...this.state.dataSelect,
                ImagenTercera: URL.createObjectURL(event.target.files[0])
            },
            displayImage:'flex'

        });

        //Subimos imagen en firebase
        const formData = new FormData();
        formData.append('image',event.target.files[0]);
        axiosInstance.post('/uploadImage', formData,{

        }).then(res => {
            this.setState({imagen3: res.data, displayImage:'none'});
        })
        .catch((error) => {
            this.setState({displayImage:'none'});
            swal.fire({title:"Ha ocurrido un error en subir la imagen",text:"Favor refresque la página e intente de nuevo.",icon:"error",confirmButtonText: "Aceptar"});
        })
    }

    
    handleClose(event,reason){
        if (reason === 'clickaway') {
            return;
        }
        
        this.setState({...this.state.open, open:false});
    }

    resetInput(){
        this.setState({
            Categoria:'',
            stateLunes:false, 
            stateMartes:false, 
            stateMier:false, 
            stateJuev:false, 
            stateViern:false, 
            stateSab:false, 
            stateDom:false,
            campBelleza: false, 
            campSalud: false, 
            campComida:false, 
            campDolar:false,

            DstateLunes:'No',
            DstateMartes:'No',
            DstateMier:'No',
            DstateJuev:'No',
            DstateViern:'No',
            DstateSab:'No',
            DstateDom:'No',
    
            DcampBelleza:"No",
            DcampSalud:"No", 
            DcampComida:"No", 
            DcampDolar:"No"
        })

        this.setState({
            ...this.state,
            dataSelect: {
               ...this.state.dataSelect,
               AhorroOferta:'',
               Consideraciones:'',
               Contraindicacion:'',
               Descripcion:'',
               Detalles:'',
               Disponibilidad_Estandar:'',
               Disponibilidad_Minima:'',
               Domingo:'',
               Fecha_Vencimiento:'',
               Imagen:'',
               ImagenSecundaria:'',
               ImagenTercera:'',
               Incluye:'',
               Jueves:'',
               Lunes:'',
               Martes:'',
               Miercoles:'',
               NoIncluye:'',
               PlazoDeUso:'',
               Sabado:'',
               Stock_Producto:'',
               Tienda:'300 GRADI PIZZA',
               Titulo:'',
               Viernes: '',

            }
        });

        this.setState({
            ...this.state,
            dias: {
               ...this.state.dias,
               Lunes:"No",
               Martes:"No",
               Miercoles:"No",
               Jueves: "No",
               Viernes: "No",
               Sabado: "No",
               Domingo: "No"

            }
        });

        this.setState({
            ...this.state,
            campanas: {
               ...this.state.campanas,
               TodoEnDolar: "No",
               MejorEnSalud: "No",
               BellezaTop:"No",
               Comida:"No"
            }
        });
    }

    updatePromo(){
        this.setState({display:'flex'});
        if(!this.state.id_cupon){
            this.setState({display:'none'});
            this.setState({open:true});
            this.setState({error:"Favor seleccione cupón a modificar"});
        }
        else{
            if(!this.state.dataSelect.Titulo || !this.state.dataSelect.Detalles || !this.state.dataSelect.Descripcion || !this.state.dataSelect.Stock_Producto ||
                !this.state.dataSelect.AhorroOferta || !this.state.dataSelect.Disponibilidad_Estandar || !this.state.dataSelect.Disponibilidad_Minima){
                this.setState({display:'none'});    
                this.setState({open:true});
                this.setState({error: "Favor rellene todos los campos para registrar el cupón."});
            }
            else{
                if(!this.state.value){
                    this.setState({display:'none'});
                    this.setState({open:true});
                    this.setState({error: "Favor agregue alguna etiqueta para el cupón."});
                }
                else{

                    if(this.state.dataSelect.Disponibilidad_Estandar < this.state.dataSelect.Disponibilidad_Minima){
                        this.setState({display:'none'});
                        this.setState({open:true});
                        this.setState({error: "La venta estándar del cupón debe ser mayor a la venta mínima"});
                    }
                    else{
                        var slider = "No", banner="No";
                        if(this.state.Categoria === "Slider"){
                            slider = "Si"
                        }
                        
                        if(this.state.Categoria=== "Banner"){
                            banner = "Si"
                        }

                        axiosInstance.post('/updateCuponesDestacado',{
                            'tag': JSON.stringify(this.state.value),
                            'categoria': this.state.Categoria,
                            'descripcion': this.state.dataSelect.Descripcion,
                            'detalles': this.state.dataSelect.Detalles,
                            'disponibilidad':this.state.dataSelect.Disponibilidad_Estandar,
                            'dispmin': this.state.dataSelect.Disponibilidad_Minima,
                            'fecha_ven': this.state.dataSelect.Fecha_Vencimiento,
                            'imagen': this.state.imagenes,
                            'imagenSec': this.state.imagen2,
                            'imagenTerc': this.state.imagen3,
                            'tienda': this.state.dataSelect.Tienda,
                            'titulo': this.state.dataSelect.Titulo,
                            'lunes': this.state.DstateLunes, 
                            'martes': this.state.DstateMartes, 
                            'miercoles' : this.state.DstateMier, 
                            'jueves': this.state.DstateJuev, 
                            'viernes' : this.state.DstateViern, 
                            'sabado': this.state.DstateSab, 
                            'domingo': this.state.DstateDom, 
                            'campBelleza': this.state.DcampBelleza, 
                            'campComida': this.state.DcampComida, 
                            'campSalud' : this.state.DcampSalud, 
                            'campTodoDolar' : this.state.DcampDolar,
                            'consid': this.state.dataSelect.Consideraciones,
                            'contraind': this.state.dataSelect.Contraindicacion,
                            'stock': this.state.dataSelect.Stock_Producto,
                            'plazo': this.state.dataSelect.PlazoDeUso,
                            'ahorro': this.state.dataSelect.AhorroOferta,
                            'inc': this.state.dataSelect.Incluye,
                            'noInc': this.state.dataSelect.NoIncluye,
                            'slider': slider,
                            'banner': banner,
                            'idCupon': this.state.id_cupon
                        })
                        .then(res => {
                            this.setState({display:'none'});
                            swal({title:"¡Cupon modificado correctamente!",icon:"success"});
                            setTimeout(() => {
                                window.location.reload();
                                window.scrollTo(0, 0)
                            }, 1000);
                            
                        }).catch(error => {
                            this.setState({display:'none'});
                            swal({title:"Ha ocurrido un error, favor intente de nuevo",icon:"error"});
                            setTimeout(() => {
                                window.location.reload();
                                window.scrollTo(0, 0)
                            }, 1000);
                        })
                    }
                }
            }
        }
    }



    render(){
        const {errors} = this.state;
        return(
            <div className="">
                
                <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error">
                     {this.state.error}
                    </Alert>
                </Snackbar>

                <div className="loader-page3" style={{display:this.state.display}}>
                    <div className="lds-ripple"><div></div><div></div></div>
                </div>

                <div className="loader-page3" style={{display:this.state.displayImage}}>
                    <div className="lds-ripple"><div></div><div></div></div>
                    <h4> Subiendo Imagen... </h4>
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
                    <div>
                        <Menu></Menu>
                        <div id="admin-post" className="main-content">
                            <section className="section">
                                <div className="section-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h4>Cupones de la Semana</h4>
                                                </div>
        
                                                <div className="categories">
                                                    <ul>
                                                        <li>
                                                            <Link to="Administrador-CuponSemana" data-filter="*">Crear Cupón</Link>
                                                        </li>
                                                        <li className="active">
                                                            <Link to="Administrador-ModificarCuponSemana" data-filter=".web-design">Modificar Cupones</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="Administrador-AgregarCuponSemana" data-filter="*">Agregar Cupón Existente</Link>
                                                        </li>
                                                    </ul>
                                                </div>
        
                                                <div className="card-body">
                                                    <div className="tab-content outer-top-xs">
                                                        <div className="tab-pane in active" id="all">
                                                            <Slider className="" breakPoints={breakPoints}>
                                                                {Object.keys(this.state.promociones).map (i =>{
                                                                return( 
                                                                <Item className="" key={i}>
                                                                    <div className="products">
                                                                        <div className="product">
                                                                        <div className="product-image">
                                                                            <div className="image">
                                                                                <div className="image" style={{backgroundImage:`url(${this.state.promociones[i].Imagen})`}} alt=""
                                                                                onClick={this.handleCupon.bind(this, this.state.promociones[i].Id)}/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="product-info text-left">
                                                                            <div className="Contenedor">
                                                                                <h3 id="tit1" className="name">{this.state.promociones[i].Titulo}</h3>
                                                                                <div className="description">{this.state.promociones[i].detalles}</div>
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
                                                    
                                                    <div className="card-body">
                                                        <div className="form-group row mb-4">
                                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Tipo de cupón</label>
        
                                                            <div className="col-sm-12 col-md-7">
                                                                <select name="Categoria" id="posicion" className="form-control selectric" value={this.state.Categoria} 
                                                                onChange={this.handleSelect}>
                                                                    <option>Slider</option>
                                                                    <option>Banner</option>
                                                                </select>
                                                            </div>
                                                        </div>
        
                                                        <div className="form-group row mb-4">
                                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Titulo</label>
                                                            <div className="col-sm-12 col-md-7">
                                                                <input name="Titulo" id="Titulo" type="text" className="form-control" maxLength="45" value ={this.state.dataSelect.Titulo}
                                                                onChange={this.handleChange}/>
                                                                {errors.Titulo.length > 0 && 
                                                                <span className='error'>{errors.Titulo}</span>}
                                                            </div>
                                                        </div>
        
                                                        <div className="form-group row mb-4">
                                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Detalles</label>
                                                            <div className="col-sm-12 col-md-7">
                                                                <input name="Detalles" type="text" className="form-control" maxLength="45" value ={this.state.dataSelect.Detalles}
                                                                onChange={this.handleChange}/>
                                                                {errors.Detalles.length > 0 && 
                                                                <span className='error'>{errors.Detalles}</span>}                                                        
                                                            </div>
                                                        </div>
        
                                                        <div className="form-group row mb-4">
                                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Descripción</label>
                                                            <div className="col-sm-12 col-md-7">
                                                                <textarea name="Descripcion" id="Descripcion" className="form-control" value ={this.state.dataSelect.Descripcion}
                                                                onChange={this.handleChange}></textarea>
                                                                <p className="comentario_input">Descripcion más extensa de la oferta, sin limite de caracteres</p>
                                                            
                                                                {errors.Descripcion.length > 0 && 
                                                                <span className='error'>{errors.Descripcion}</span>}
                                                                
                                                            </div>
                                                        </div>
        
                                                        <div className="form-group row mb-4">
                                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Cateogoría</label>
                                                            <div className="col-sm-12 col-md-7">
                                                                <select name="Categoria" id="Categorias" className="form-control selectric" onChange={this.handleSelect}
                                                                value={this.state.dataSelect.Categoria}>
                                                                    <option>Comida</option>
                                                                    <option>Belleza</option>
                                                                    <option>Productos</option>
                                                                    <option>Salud</option>
                                                                    <option>Servicios</option>
                                                                </select>
                                                            </div>
                                                        </div>
        
                                                        <div className="form-group row mb-4">
                                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Plazo para su uso*</label>
                                                            <div className="col-sm-12 col-md-7">
                                                                <select name="PlazoDeUso" id="inputUso" className="form-control selectric" value={this.state.dataSelect.PlazoDeUso} 
                                                                onChange={this.handleSelect}>
                                                                    <option>Selecciona...</option>
                                                                    <option>1 Día</option>
                                                                    <option>2 Días</option>
                                                                    <option>3 Días</option>
                                                                    <option>4 Días</option>
                                                                    <option>5 Días</option>
                                                                    <option>6 Días</option>
                                                                    <option>7 Días</option>
                                                                    <option>8 Días</option>
                                                                    <option>9 Días</option>
                                                                    <option>10 Días</option>
                                                                    <option>11 Días</option>
                                                                    <option>12 Días</option>
                                                                    <option>13 Días</option>
                                                                    <option>14 Días</option>
                                                                    <option>15 Días</option>
                                                                    <option>16 Días</option>
                                                                    <option>17 Días</option>
                                                                    <option>18 Días</option>
                                                                    <option>19 Días</option>
                                                                    <option>20 Días</option>
                                                                    <option>21 Días</option>
                                                                    <option>22 Días</option>
                                                                    <option>23 Días</option>
                                                                    <option>24 Días</option>
                                                                    <option>25 Días</option>
                                                                    <option>26 Días</option>
                                                                    <option>27 Días</option>
                                                                    <option>28 Días</option>
                                                                    <option>29 Días</option>
                                                                    <option>30 Días</option>
                                                                </select>
                                                            </div>    
                                                        </div>
        
                                                        <div className="form-group row mb-4">
                                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Imagenes</label>
                                                            <div className="form-group col-md-2">
                                                                <div id="image-preview" className="image-preview" style={{backgroundImage:`url(${this.state.dataSelect.Imagen})`}}>
                                                                    <label htmlFor="image-upload" id="image-label">{!this.state.file ? 'AGREGAR +' : 'Modificar'}</label>
                                                                    <input type="file" name="image" id="image-upload" onChange={this.handleChangeImagen1} />
                                                                </div>
                                                            </div>
        
                                                            <div className="form-group col-md-2">
                                                                <div id="image-preview2" className="image-preview" style={{backgroundImage:`url(${this.state.dataSelect.ImagenSecundaria})`}}>
                                                                    <label htmlFor="image-upload2" id="image-label2">{!this.state.dataSelect.ImagenSecundaria ? 'AGREGAR +' : 'Modificar'}
                                                                    </label>
                                                                    <input type="file" name="image" id="image-upload2" onChange={this.handleChangeImagen2} />
                                                                </div>
                                                            </div>
        
                                                            <div className="form-group col-md-2">
                                                                <div id="image-preview3" className="image-preview" style={{backgroundImage:`url(${this.state.dataSelect.ImagenTercera})`}}>
                                                                    <label htmlFor="image-upload3" id="image-label3">{!this.state.dataSelect.ImagenTercera ? 'AGREGAR +' : 'Modificar'}
                                                                    </label>
                                                                    <input type="file" name="image" id="image-upload3" onChange={this.handleChangeImagen3} />
                                                                </div>
                                                            </div>
                                                        </div>
        
                                                        <div className="form-group row mb-4">
                                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Stock</label>
                                                            <div className="col-sm-12 col-md-2">
                                                                <input name="Stock_Producto" id="Stock" type="number" className="form-control" value={this.state.dataSelect.Stock_Producto}
                                                                onChange={this.handleChange}/>
                                                                {errors.Stock_Producto.length > 0 && 
                                                                <span className='error'>{errors.Stock_Producto}</span>}
                                                            </div>
        
                                                            <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Ahorro de Oferta</label>
                                                            <div className="col-sm-12 col-md-2">
                                                                <input name="AhorroOferta" id="Ahorro" type="number" className="form-control" min="1" 
                                                                value={this.state.dataSelect.AhorroOferta}
                                                                onChange={this.handleChange}/>
                                                                {errors.AhorroOferta.length > 0 && 
                                                                <span className='error'>{errors.AhorroOferta}</span>}
                                                            </div>
                                                        </div>
        
                                                    <div className="form-group row mb-4">
                                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Incluye</label>
                                                        <div className="col-sm-12 col-md-2">
                                                            <textarea name="Incluye" id="Incluye" type="text" className="form-control" value={this.state.dataSelect.Incluye}
                                                            onChange={this.handleChange}/>
                                                        </div>
        
                                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">No Incluye</label>
                                                        <div className="col-sm-12 col-md-2">
                                                            <textarea name="NoIncluye" id="Noinc" type="text" className="form-control" value={this.state.dataSelect.NoIncluye}
                                                            onChange={this.handleChange}/>
                                                        </div>
                                                    </div>
        
                                                    <div className="form-group row mb-4">
                                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Consideraciones</label>
                                                        <div className="col-sm-12 col-md-2">
                                                            <textarea name="Consideraciones" type="text" className="form-control" value={this.state.dataSelect.Consideraciones}
                                                            onChange={this.handleChange}/>
                                                        </div>
        
                                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Contraindicación</label>
                                                        <div className="col-sm-12 col-md-2">
                                                            <textarea name="Contraindicacion" id="Contra" type="text" className="form-control" value={this.state.dataSelect.Contraindicacion}
                                                            onChange={this.handleChange}/>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="form-group row mb-4">
                                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Tienda</label>
                                                        <div className="col-sm-12 col-md-7">
                                                            <select name="Tienda" id="tiendas" className="form-control" onChange={this.handleSelect} 
                                                            value={this.state.dataSelect.Tienda}>
                                                                
                                                                {Object.keys(this.state.tienda).map (i =>{
                                                                    return(
                                                                        <option key={i}>{this.state.tienda[i].Nombre}</option>
                                                                    )
                                                                })}
                                                                
                                                            </select>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="form-group row mb-4">
                                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Fecha de cierre</label>
                                                        <div className="col-sm-12 col-md-7">
                                                            <input name="Fecha_Vencimiento" className="form-control" type="datetime-local" id="hora" 
                                                            value={this.state.dataSelect.Fecha_Vencimiento} onChange={this.handleChange}/>
                                                            {errors.Fecha_Vencimiento.length > 0 && 
                                                            <span className='error'>{errors.Fecha_Vencimiento}</span>}
                                                        </div>
                                                    </div>
                                                    
        
                                                    <div className="form-group row mb-4">
                                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Venta mínima</label>
                                                        <div className="col-sm-12 col-md-7">
                                                            <input name="Disponibilidad_Minima" id="VentaMinima" type="number" className="form-control" min="1" 
                                                            value={this.state.dataSelect.Disponibilidad_Minima}
                                                            onChange={this.handleChange}></input>
                                                            {errors.Disponibilidad_Minima.length > 0 && 
                                                            <span className='error'>{errors.Disponibilidad_Minima}</span>}
                                                        </div>
                                                    </div>
        
                                                    <div className="form-group row mb-4">
                                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Venta Estándar (Máxima)</label>
                                                        <div className="col-sm-12 col-md-7">
                                                            <input name="Disponibilidad_Estandar" id="VentaEstandar" type="number" className="form-control" min="1"
                                                            onChange={this.handleChange} value={this.state.dataSelect.Disponibilidad_Estandar}/>
                                                            <p className="comentario_input">Debe ser mayor a la venta minima del cupón</p>
                                                            {errors.Disponibilidad_Estandar.length > 0 && 
                                                            <span className='error'>{errors.Disponibilidad_Estandar}</span>}
                                                        </div>
                                                    </div>
        
                                                    <div className="form-group row mb-4">
                                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Días del Cupón</label>
                                                        <div className="col-sm-12 col-md-3">
                                                            <div id="CheckBox_val" className="form-row form-checkbox">
                                                                <div className="form-group col-md-3">
                                                                    <div className="custom-control custom-checkbox">
                                                                        <input type="checkbox" className="custom-control-input only-one" id="customCheck-dia1" value="Lunes"
                                                                        name="stateLunes" checked={this.state.stateLunes} onChange={this.handleChangeCheckbox}/>
                                                                        <label className="custom-control-label" htmlFor="customCheck-dia1">Lunes</label>
                                                                    </div>
        
                                                                    <div className="custom-control custom-checkbox">
                                                                        <input type="checkbox" className="custom-control-input only-one" id="customCheck-dia2" value="Martes"
                                                                        name="stateMartes" checked={this.state.stateMartes} onChange={this.handleChangeCheckbox}/>
                                                                        <label className="custom-control-label" htmlFor="customCheck-dia2">Martes</label>
                                                                    </div>
        
                                                                    <div className="custom-control custom-checkbox">
                                                                        <input type="checkbox" className="custom-control-input only-one" id="customCheck-dia3" value="Miercoles"
                                                                        name="stateMier" checked={this.state.stateMier} onChange={this.handleChangeCheckbox}/>
                                                                        <label className="custom-control-label" htmlFor="customCheck-dia3">Miércoles</label>
                                                                    </div>
        
                                                                    <div className="custom-control custom-checkbox">
                                                                        <input type="checkbox" className="custom-control-input only-one" id="customCheck-dia4" value="Jueves"
                                                                        name="stateJuev" checked={this.state.stateJuev} onChange={this.handleChangeCheckbox}/>
                                                                        <label className="custom-control-label" htmlFor="customCheck-dia4">Jueves</label>
                                                                    </div>
        
                                                                    <div className="custom-control custom-checkbox">
                                                                        <input type="checkbox" className="custom-control-input only-one" id="customCheck-dia5" value="Viernes"
                                                                        name="stateViern" checked={this.state.stateViern} onChange={this.handleChangeCheckbox}/>
                                                                        <label className="custom-control-label" htmlFor="customCheck-dia5">Viernes</label>
                                                                    </div>
        
                                                                    <div className="custom-control custom-checkbox">
                                                                        <input type="checkbox" className="custom-control-input only-one" id="customCheck-dia6" value="Sabado"
                                                                        name="stateSab" checked={this.state.stateSab} onChange={this.handleChangeCheckbox}/>
                                                                        <label className="custom-control-label" htmlFor="customCheck-dia6">Sábado</label>
                                                                    </div>
        
                                                                    <div className="custom-control custom-checkbox">
                                                                        <input type="checkbox" className="custom-control-input only-one" id="customCheck-dia7" value="Domingo"
                                                                        name="stateDom" checked={this.state.stateDom} onChange={this.handleChangeCheckbox}/>
                                                                        <label className="custom-control-label" htmlFor="customCheck-dia7">Domingo</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <label className="col-form-label text-md-right col-12 col-md-2 col-lg-2">Campañas del Cupón</label>
        
                                                        <div className="col-sm-12 col-md-4">
                                                            <div id="CheckBox_Campa" className="form-row form-checkbox">
                                                                <div className="form-group col-md-3">
                                                                    <div className="custom-control custom-checkbox">
                                                                        <input type="checkbox" className="custom-control-input only-one" id="customCheck-camp1" 
                                                                            name="campDolar" checked={this.state.campDolar} onChange={this.handleChangeCheckbox} />
                                                                        <label className="custom-control-label" htmlFor="customCheck-camp1">Todo en $1</label>
                                                                    </div>
        
                                                                    <div className="custom-control custom-checkbox">
                                                                        <input type="checkbox" className="custom-control-input only-one" id="customCheck-camp2" value="MejorEnSalud"
                                                                        name="campSalud" checked={this.state.campSalud} onChange={this.handleChangeCheckbox} />
                                                                        <label className="custom-control-label" htmlFor="customCheck-camp2">Lo mejor en Salud</label>
                                                                    </div>
        
                                                                    <div className="custom-control custom-checkbox">
                                                                        <input type="checkbox" className="custom-control-input only-one" id="customCheck-camp3" value="BellezaTop"
                                                                        name="campBelleza" checked={this.state.campBelleza} onChange={this.handleChangeCheckbox}/>
                                                                        <label className="custom-control-label" htmlFor="customCheck-camp3">Belleza Top</label>
                                                                    </div>
        
                                                                    <div className="custom-control custom-checkbox">
                                                                        <input type="checkbox" className="custom-control-input only-one" id="customCheck-camp4" value="Comida"
                                                                        name="campComida" checked={this.state.campComida} onChange={this.handleChangeCheckbox}/>
                                                                        <label className="custom-control-label" htmlFor="customCheck-camp4">Comida</label>
                                                                    </div>
        
                                                                </div>
                                                            </div>
                                                        </div>
        
                                                    </div>
                                                    
                                                </div>
        
                                                <div className="row">
                                                        <div className="col-12 col-md-8 col-lg-8 col-center">
                                                            <div className="card">
                                                                <div className="card-header">
                                                                    <h4>Agregar etiquetas</h4>
                                                                </div>
        
                                                                <div className="card-body">
                                                                    <div className="form-group">
                                                                        <label className="col-xs-3 control-label">Etiquetas:</label>
                                                                        <div className="">
                                                                            <Multiselect
                                                                                data={[
                                                                                    'Accesorios','Accesorio de Telefonos', 'Cintillos', 'Mascarillas', 'Camisas', 'Franela',
                                                                                    'Blusa', 'Pantalon', 'Short', 'Falda', 'Sueter', 'Vestido', 'Audifonos', 'Zapatos',
                                                                                    'Zapatillas', 'Sandalias', 'Zapato Deportivo', 'Relojes', 'Abrigos', 'Corneta', 'Parrillera',
                                                                                    'Cocina', 'Alcohol', 'Antibacterial', 'Farmacia', 'Medicamentos', 'Protector Facial', 'Careta Facial',
                                                                                    'Atomizador', 'Splash', 'Perfume', 'Nutella', 'Chocolates', 'Dulces', 'Donas', 'Paletas', 'Tortas',
                                                                                    'Helado', 'Pizza', 'Hamburguesa', 'Sushi', 'Comida asiatica', 'Comida arabe', 'Comida china',
                                                                                    'Shawarma', 'Costillas', 'Papas fritas', 'Conos', 'Helado', 'Perro caliente', 'Comida rapida',
                                                                                    'Esmalte de uña', 'Brillos', 'Labiales', 'Case', 'Forros de telefono', 'Celulares', 'Telefonos',
                                                                                    'Ipad y Tablet', 'Laptop', 'Computadora', 'PC', 'Aros de Luz', 'Smartwatch', 'Galletas', 'Lavado',
                                                                                    'Lavado de Carros', 'Autopartes', 'Respuestos de carro', 'Servicio de carro', 'Respuestos de telefono',
                                                                                    'Bolso', 'Morral', 'Cartera', 'Termometro', 'Mecanica', 'Agendas', 'Lapiceros', 'Papeleria', 'Cocina',
                                                                                    'Peluqueria', 'Corte de Cabello', 'Tinte', 'Masajes', 'Spa', 'Televisor', 'Bebidas', 'Carnes',
                                                                                    'Alitas de Pollo', 'Cremas', 'Cuidado Personal', 'Tortas', 'Marquesas', 'Arreglos y regalos', 
                                                                                    'Aseo Personal', 'Hogar', 'Lentes', 'Maquillaje', 'Carro', 'Vehiculo', 'Electronico'
                                                                                ]}
                                                                                value={this.state.value}
                                                                                onChange={(value) => {
                                                                                    this.setState({ value })
                                                                                }
                                                                                }
                                                                                >
        
                                                                            </Multiselect>
                                                                        </div>                                                             
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>        
                                                    
                                                <div className="form-group row mb-4">
                                                    <div id="contenedor_btn" className="col-sm-12 col-md-12">
                                                        <button id="ModificarBanner" className="btn btn-primary" onClick={this.updatePromo}>Modificar Banner</button>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <Footer></Footer>
                    </div>    
                )}

            </div>


        )
    }
}

export default ModificarCuponSemana;