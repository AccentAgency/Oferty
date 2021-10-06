import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import Menu from './Components/Menu';

import config from '../../../config/config';
import axios from "axios";
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

import Slider from "react-elastic-carousel";
import Item from "../Item";
import Footer from './Components/Footer';

const axiosInstance = axios.create({
    baseURL: config.backURL
});

const breakPoints = [
    { width: 1, itemsToShow: 2, itemsToScroll:2 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 4, itemsToScroll: 3 },
    { width: 1200, itemsToShow: 4, itemsToScroll: 3 }
];

class AgregarECuponSemana extends React.Component{

    constructor(props)
    {
        super(props);
        this.state ={
            cupones:[],
            cuponesBackUp:[],
            textBuscar:'',
            checked:false,
            categoria:'Banner',
            posicion:[],
            count: 0,
            show:false,
            showNew:false,
            showButton:false,
            stateCupon:'',
            new_categoria: 'Banner',
            selectCupon:[],
            value:[],
            id_cupon:'',
            idUpdate: '',
            loading:true,
            display:'none'
        }
        this.handleCupon = this.handleCupon.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handlePosicion = this.handlePosicion.bind(this);
        this.getAddCupones = this.getAddCupones.bind(this);
    }

    getAllCupones(){
        axiosInstance.get('/readAllCupones').then(res => {
            this.setState({cupones: res.data , cuponesBackUp: res.data});
            this.setState({loading:false});
        })
        
    }
    

    handleSelect(event){
        const target = event.target;
        const val = event.target.value;
        const name = target.name;
        this.setState({
            [name]: val
        });
        if(val === "Banner"){
            axiosInstance.get("/readBanner").then(res => {
                this.setState({posicion: res.data});
            })        
        }
        else if (val === "Slider"){
            axiosInstance.get("/readSlider").then(res => {
                this.setState({posicion: res.data});
            })    
        }
    }

    handlePosicion(event){
        const val = event.target.value;
        this.setState({idUpdate: val});
    }

    handleChangeCheckbox(event){
        this.setState({show:false, showNew:false, showButton:false});
        if(event.target.value === "Reemplazar"){
            this.setState({show:true});
            this.setState({showButton:true});
            this.setState({stateCupon:'Reemplazar'});
        }
        else if(event.target.value === "Nuevo"){
            this.setState({showButton:true});
            this.setState({showNew:true});
            this.setState({stateCupon:'Nuevo'});
        };
    }

    componentDidMount = () => {
        this.getAllCupones();

        if(this.state.categoria === "Banner"){
            axiosInstance.get("/readBanner").then(res => {
                this.setState({posicion: res.data});
            })        
        }
        else if (this.state.categoria === "Slider"){
            axiosInstance.get("/readSlider").then(res => {
                this.setState({posicion: res.data});
            })    
        }
    }

    componentDidUpdate = () => {
        if(this.state.categoria === "Banner"){
            axiosInstance.get("/readBanner").then(res => {
                this.setState({posicion: res.data});
            })        
        }
        else if (this.state.categoria === "Slider"){
            axiosInstance.get("/readSlider").then(res => {
                this.setState({posicion: res.data});
            })    
        }
    }

    getAddCupones(){
        this.setState({display:'flex'});
        var slider="No", banner="No";
        if(this.state.stateCupon === "Nuevo"){
            if(this.state.new_categoria === "Banner"){
                banner="Si";
            }
            else if(this.state.new_categoria === "Slider"){
                slider="Si";
            }

            axiosInstance.post('/addCuponesSemana', {
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
                'campBelleza': this.state.selectCupon.BellezaTop, 
                'campComida': this.state.selectCupon.Comida, 
                'campSalud' : this.state.selectCupon.MejorEnSalud, 
                'campTodoDolar' : this.state.selectCupon.TodoEnDolar,
                'consid': this.state.selectCupon.Consideraciones,
                'contraind': this.state.selectCupon.Contraindicacion,
                'plazo': this.state.selectCupon.PlazoDeUso,
                'ahorro': this.state.selectCupon.AhorroOferta,
                'inc': this.state.selectCupon.Incluye,
                'noInc': this.state.selectCupon.NoIncluye,
                'slider': slider,
                'banner': banner,
                'id_cupon': this.state.id_cupon
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
        else if (this.state.stateCupon === "Reemplazar"){
            console.log(this.state.idUpdate);
            if(this.state.categoria === "Banner"){
                banner="Si";
            }
            else if(this.state.categoria === "Slider"){
                slider="Si";
            }

            axiosInstance.post('/changeCuponesSemana', {
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
                'campBelleza': this.state.selectCupon.BellezaTop, 
                'campComida': this.state.selectCupon.Comida, 
                'campSalud' : this.state.selectCupon.MejorEnSalud, 
                'campTodoDolar' : this.state.selectCupon.TodoEnDolar,
                'consid': this.state.selectCupon.Consideraciones,
                'contraind': this.state.selectCupon.Contraindicacion,
                'plazo': this.state.selectCupon.PlazoDeUso,
                'ahorro': this.state.selectCupon.AhorroOferta,
                'inc': this.state.selectCupon.Incluye,
                'noInc': this.state.selectCupon.NoIncluye,
                'slider': slider,
                'banner': banner,
                'idCupon': this.state.idUpdate
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
            this.setState({selectCupon: res.data});

            Object.keys(res.data.Tag).forEach(function(key) {
                Object.keys(res.data.Tag[key]).forEach(function(val) {
                    array.push(res.data.Tag[key][val]);
                });
            })
            this.setState({value: array});
        })
    }

    resetForm(){
        this.setState({
            cuponesBackUp:[],
            textBuscar:'',
            checked:false,
            categoria:'Banner',
            posicion:[],
            count: 0,
            show:false,
            showNew:false,
            showButton:false,
            stateCupon:'',
            new_categoria: 'Banner',
            selectCupon:[],
            value:[],
            id_cupon:'',
        })

        var ele = document.getElementsByName("cupones");
        for(var i=0;i<ele.length;i++)
           ele[i].checked = false;
    }


    render(){
        return(

            <div className="">
                <Menu></Menu>

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
                                            <h4>Cupones de la Semana</h4>
                                        </div>

                                        <div className="categories">
                                            <ul>
                                                <li>
                                                    <Link to="Administrador-CuponSemana" data-filter="*">Crear Cupón</Link>
                                                </li>
                                                <li>
                                                    <Link to="Administrador-ModificarCuponSemana" data-filter=".web-design">Modificar Cupones</Link>
                                                </li>
                                                <li  className="active">
                                                    <Link to="Administrador-AgregarCuponSemana" data-filter="*">Agregar Cupón Existente</Link>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="card-body">
                                            <div className="card-header-form">
                                                <div className="card-body header-center">
                                                    <div id="SearchUser" className="card col-offset-3 tiendas-form">
                                                        <h5>Buscar Oferta</h5>
                                            
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

                                            <div className="card-body">
                                                <h4 className="titulo">Agregar Cupón Existente</h4>
                                                <div id="checxbox" className="form-group row mb-4 cuerpo-cupones" onChange={this.handleChangeCheckbox.bind(this)}>
                                                    <div className="form-group col-md-6">
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="radio" value="Nuevo" name="cupones" id="cupon1"/>
                                                            <label htmlFor="cupon1"> Agregar nuevo cupón a las Promociones de la Semana. </label>
                                                        </div> 
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="radio" value="Reemplazar" name="cupones" id="cupon2"/>
                                                            <label htmlFor="cupon2">Reemplazar en un cupón existente.</label>
                                                        </div>
                                                    </div> 
                                                </div>


                                                <hr className="linea"></hr>


                                                <div id="SelectCupon" className="card col-offset-3 tiendas-form" style={{display:this.state.show ? 'block' : 'none'}}>
                                                    <h4>Seleccionar Cupón a reemplazar</h4>
                                                    <div className="input-group col-md-8 col-center">
                                                        <select className="form-control" name="categoria" onChange={this.handleSelect}>
                                                            <option>Banner</option>
                                                            <option>Slider</option>
                                                        </select>
                                                    </div>
                                                    <h5>Posición</h5>
                                                    <div className="input-group col-md-8 col-center">
                                                        <select className="form-control" onChange={this.handlePosicion}>
                                                            <option>Seleccione una Posición</option>
                                                            {Object.keys(this.state.posicion).map ((i,index) =>{
                                                                return(
                                                                    <option key={i} value={i}>{index+1}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div id="SelectCupon" className="card col-offset-3 tiendas-form" style={{display:this.state.showNew ? 'block' : 'none'}}>
                                                    <h4>Seleccionar</h4>
                                                    <div className="input-group col-md-8 col-center">
                                                        <select className="form-control" name="new_categoria" onChange={this.handleSelect}>
                                                            <option>Banner</option>
                                                            <option>Slider</option>
                                                        </select>
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

                <Footer></Footer>                    
            </div>
        )
    }
}

export default AgregarECuponSemana;