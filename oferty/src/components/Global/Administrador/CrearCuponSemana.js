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
import Footer from './Components/Footer';

const axiosInstance = axios.create({
    baseURL: config.backURL
});

const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class CrearCuponSemana extends React.Component{

    constructor(props){
        super(props);
        this.state = { value: [], tipoCupon: 'Slider', titulo:'', descripcion:'', detalles:'', categoria:'Comida', tienda:[], fecha:'', ventaMin:'', ventaEstd:'',
            file: null, file2:null, file3:null, imagen:'No Disponible', imagen2: 'No Disponible', imagen3:'No Disponible', open:false, openS:false, stock:'', consid:'No disponible', 
            contra:'No disponible', select_dias:"Seleccione uso", select_prom:'Slider', select_tiendas: '300 GRADI PIZZA', display:'none',
            incluye:'No disponible', noincluye:'No disponible', fechaVen:'', ahorro:'', displayImage:'none',
            errors:{
                titulo:'',
                descripcion:'',
                detalles:'',
                fecha:'',
                ventaMin:'',
                ventaEstd:'',
                stock:'',
                ahorro:'',
                fechaVen:''
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
            }
        };

        this.handleCupon = this.handleCupon.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleChangeImagen1 = this.handleChangeImagen1.bind(this);
        this.handleChangeImagen2 = this.handleChangeImagen2.bind(this);
        this.handleChangeImagen3 = this.handleChangeImagen3.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCheckboxCamp = this.handleCheckboxCamp.bind(this);
        this.handleCheckboxDias = this.handleCheckboxDias.bind(this);
    }
    
    handleCupon(){
        this.setState({display:'flex'});
        if(!this.state.titulo || !this.state.detalles || !this.state.descripcion || !this.state.ventaMin || !this.state.ventaEstd || !this.state.stock || !this.state.fechaVen ||
            !this.state.ahorro){
            this.setState({display:'none'});
            this.setState({open:true});
            this.setState({error: "Favor rellene todos los campos para registrar el cup??n."});
        }
        else{
            if(validateForm(this.state.errors)) {
                if((this.state.value).length <=0){
                    this.setState({display:'none'});
                    this.setState({open:true});
                    this.setState({error: "Favor agregue alguna etiqueta para el cup??n."});
                }
                else{
                    if(this.state.ventaEstd <= this.state.ventaMin){
                        this.setState({display:'none'});
                        this.setState({open:true});
                        this.setState({error: "La venta est??ndar del cup??n debe ser mayor a la venta m??nima"});
                    }
                    else{
                        var slider = "No", banner="No";
                        if(this.state.select_prom === "Slider"){
                            slider = "Si"
                        }
                        
                        if(this.state.select_prom === "Banner"){
                            banner = "Si"
                        }

                        axiosInstance.post('/saveCuponesDestacado',{
                            'tag': JSON.stringify(this.state.value),
                            'categoria': this.state.categoria,
                            'descripcion': this.state.descripcion,
                            'detalles': this.state.detalles,
                            'disponibilidad':this.state.ventaEstd,
                            'dispmin': this.state.ventaMin,
                            'fecha_ven': this.state.fechaVen,
                            'imagen': this.state.imagen,
                            'imagenSec': this.state.imagen2,
                            'imagenTerc': this.state.imagen3,
                            'tienda': this.state.select_tiendas,
                            'titulo': this.state.titulo,
                            'lunes': this.state.dias.Lunes, 
                            'martes': this.state.dias.Martes, 
                            'miercoles' : this.state.dias.Miercoles, 
                            'jueves': this.state.dias.Jueves, 
                            'viernes' : this.state.dias.Viernes, 
                            'sabado': this.state.dias.Sabado, 
                            'domingo': this.state.dias.Domingo, 
                            'campBelleza': this.state.campanas.BellezaTop, 
                            'campComida': this.state.campanas.Comida, 
                            'campSalud' : this.state.campanas.MejorEnSalud, 
                            'campTodoDolar' : this.state.campanas.TodoEnDolar,
                            'consid': this.state.consid,
                            'contraind': this.state.contra,
                            'plazo': this.state.select_dias,
                            'ahorro': this.state.ahorro,
                            'inc': this.state.incluye,
                            'noInc': this.state.noincluye,
                            'slider': slider,
                            'banner': banner
                        })
                        .then(res => {
                            this.setState({display:'none'});
                            swal({title:"??Cupon registrado correctamente!",icon:"success",confirmButtonText: "Aceptar"});
                            this.resetForm();
                            window.scrollTo(0, 0)
                        })
                        .catch((error) => {
                            swal({title:"Ha ocurrido un error",text:"Verifique su conexi??n a internet o intente de nuevo m??s tarde.",icon:"error",confirmButtonText: "Aceptar"});
                        })
                    }
                }

            }
            else{
                this.setState({display:'none'});
                this.setState({open:true});
                this.setState({error: "Verifique que no exista campo de advertencia antes de registrar el cup??n"})
            }
        }

    }

    getTiendas(){
        axiosInstance.get('/getTiendas').then(res => {
            this.setState({...this.state.tienda, tienda:res.data})
        })
    }

    handleSelect(event){
        const target = event.target;
        const val = event.target.value;
        const name = target.name;
        this.setState({
            [name]: val
        });
    }

    handleClose(event,reason){
        if (reason === 'clickaway') {
            return;
        }
        
        this.setState({...this.state.open, open:false});
        this.setState({...this.state.openS, openS:false});
    }

    handleChange(event){
        const target = event.target;
        const value =  target.value;
        const name = target.name;
    
        this.setState({
        [name]: value
        });

        //Validaciones
        let errors = this.state.errors;

        switch (name) {
            case 'titulo':
                errors.titulo = 
                value.length === 0
                    ? 'Favor ingresar un titulo v??lido.'
                    : '';
            break;

            
            case 'detalles':
                errors.detalles =
                value.length === 0
                ? 'Favor ingresar los detalles del cup??n.'
                : '';
            break;

            case 'descripcion':
                errors.descripcion =
                value.length === 0
                ? 'Favor ingresar una descripci??n para el cup??n.'
                : '';
            break;

            case 'ventaMin':
                errors.ventaMin =
                value.length === 0
                ? 'Ingresa un n??mero m??nimo de venta para el cup??n.'
                : '';
            break;

            case 'ventaEstd':
                errors.ventaEstd =
                value.length === 0
                ? 'Ingresa un n??mero m??ximo de venta para el cup??n.'
                : '';
            break;

            case 'stock':
                errors.stock =
                value.length === 0
                ? 'Ingrese un valor v??lido para el stock.'
                : '';
            break;


            case 'ahorro':
                errors.ahorro =
                value.length === 0
                ? 'Ingresa un valor de oferta para el cup??n.'
                : '';
            break;

            case 'fechaVen':
                errors.fechaVen =
                value.length === 0
                ? 'Ingresa una fecha de vencimiento para el cup??n.'
                : '';
            break;
            
            default:
            break;
        }

        this.setState({errors, [name]: value});
    }

    handleChangeImagen1(event){
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
        this.setState({fileImage:event.target.files[0], displayImage:'flex'});

        //Subimos imagen en firebase
        const formData = new FormData();
        formData.append('image',event.target.files[0]);
        axiosInstance.post('/uploadImage', formData,{

        }).then(res => {
            this.setState({imagen: res.data, displayImage:'none'});
        })
        .catch((error) => {
            this.setState({displayImage:'none'});
            swal({title:"Ha ocurrido un error en subir la imagen",text:"Favor verifique su conexi??n a internet e intente de nuevo.",icon:"error",confirmButtonText: "Aceptar"});
        })
        
    }

    
    //Evento change input file (imagen 2)
    handleChangeImagen2(event){
        this.setState({
            file2: URL.createObjectURL(event.target.files[0])
        })

        this.setState({fileImage2:event.target.files[0], displayImage:'flex'});

        //Subimos imagen en firebase
        const formData = new FormData();
        formData.append('image',event.target.files[0]);
        axiosInstance.post('/uploadImage', formData,{

        }).then(res => {
            this.setState({imagen2: res.data, displayImage:'none'});
        })
        .catch((error) => {
            this.setState({displayImage:'none'});
            swal({title:"Ha ocurrido un error en subir la imagen",text:"Favor verifique su conexi??n a internet e intente de nuevo.",icon:"error",confirmButtonText: "Aceptar"});
        })
    }

    //Evento change input file (imagen 3)
    handleChangeImagen3(event){
        this.setState({
            file3: URL.createObjectURL(event.target.files[0])
        })
        this.setState({fileImage3:event.target.files[0], displayImage:'flex'});

        //Subimos imagen en firebase
        const formData = new FormData();
        formData.append('image',event.target.files[0]);
        axiosInstance.post('/uploadImage', formData,{

        }).then(res => {
            this.setState({imagen3: res.data, displayImage:'none'});
        })
        .catch((error) => {
            this.setState({displayImage:'none'});
            swal({title:"Ha ocurrido un error en subir la imagen",text:"Favor verifique su conexi??n a internet e intente de nuevo.",icon:"error",confirmButtonText: "Aceptar"});
        })
    }

    handleCheckboxCamp(event){
        
        const target = event.target;
        var value = target.value;
        const name = target.name;
        this.setState({
            ...this.state,
            campanas:{
                ...this.state.campanas,
                [name] : "No"
            }
        })

        if(target.checked){
            this.setState({
                ...this.state,
                campanas:{
                    ...this.state.campanas,
                    [name] : value
                }
            })
        }else{
        }   
    }

    handleCheckboxDias(event){
        const target = event.target;
        var value = target.value;
        const name = target.name;
        
        if(target.checked){
            this.setState({
                ...this.state,
                dias:{
                    ...this.state.dias,
                    [name] : value
                }
            })
            
        }else{
            this.state.dias.splice(value, 1);
        }   
        
    }


    resetForm(){
        this.setState({
            value:[],
            titulo:'',
            tipoCupon:'Slider',
            descripcion:'',
            detalles:'',
            categoria:'Comida',
            fecha:'',
            ventaMin:'',
            ventaEstd:'',
            file:null,
            file2:null,
            file3:null,
            imagen:'No Disponible',
            imagen2:'No Disponible',
            imagen3:'No Disponible',
            stock:'',
            consid:'No disponible',
            incluye: 'No disponible',
            noincluye: 'No disponible',
            fechaVen:'',
            ahorro:'',
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
            }
        })
    }


    componentDidMount =() =>{
        this.getTiendas();
    }

    render(){  
        const {errors} = this.state;
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

                <div className="loader-page3" style={{display:this.state.displayImage}}>
                    <div className="lds-ripple"><div></div><div></div></div>
                    <h4> Subiendo Imagen... </h4>
                </div>

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
                                                <li className="active">
                                                    <Link to="Administrador-CuponSemana" data-filter="*">Crear Cup??n</Link>
                                                </li>
                                                <li>
                                                    <Link to="Administrador-ModificarCuponSemana" data-filter=".web-design">Modificar Cupones</Link>
                                                </li>
                                                <li>
                                                    <Link to="Administrador-AgregarCuponSemana" data-filter="*">Agregar Cup??n Existente</Link>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="card-body">
                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Tipo de cup??n</label>

                                                <div className="col-sm-12 col-md-7">
                                                    <select name="select_prom" id="posicion" className="form-control selectric" onChange={this.handleSelect}>
                                                        <option>Slider</option>
                                                        <option>Banner</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Titulo</label>
                                                <div className="col-sm-12 col-md-7">
                                                    <input name="titulo" id="Titulo" type="text" className="form-control" maxLength="18" value={this.state.titulo}
                                                    onChange={this.handleChange}/>
                                                    <p id="comentario_input" className="comentario_input">Breve titulo, m??ximo 18 caracteres</p>
                                                    {errors.titulo.length > 0 && 
                                                    <span className='error'>{errors.titulo}</span>}
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Detalles</label>
                                                <div className="col-sm-12 col-md-7">
                                                    <input name="detalles" id="Detalles" type="text" className="form-control" maxLength="40" value={this.state.detalles}
                                                    onChange={this.handleChange}/>
                                                    <p id="comentario_input2" className="comentario_input2">Breve descripcion del producto, maximo 40 caracteres</p>
                                                    {errors.detalles.length > 0 && 
                                                    <span className='error'>{errors.detalles}</span>}
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Descripci??n</label>
                                                <div className="col-sm-12 col-md-7">
                                                    <textarea name="descripcion" id="Descripcion" className="form-control" value={this.state.descripcion}
                                                    onChange={this.handleChange}></textarea>
                                                    <p className="comentario_input">Descripcion m??s extensa de la oferta, sin limite de caracteres</p>
                                                    {errors.descripcion.length > 0 && 
                                                    <span className='error'>{errors.descripcion}</span>}
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Cateogor??a</label>
                                                <div className="col-sm-12 col-md-7">
                                                    <select name="categoria" id="Categorias" className="form-control selectric" onChange={this.handleSelect}>
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
                                                    <select id="inputUso" className="form-control selectric" name="select_dias" onChange={this.handleSelect}>
                                                        <option>Selecciona...</option>
                                                        <option>1 D??a</option>
                                                        <option>2 D??as</option>
                                                        <option>3 D??as</option>
                                                        <option>4 D??as</option>
                                                        <option>5 D??as</option>
                                                        <option>6 D??as</option>
                                                        <option>7 D??as</option>
                                                        <option>8 D??as</option>
                                                        <option>9 D??as</option>
                                                        <option>10 D??as</option>
                                                        <option>11 D??as</option>
                                                        <option>12 D??as</option>
                                                        <option>13 D??as</option>
                                                        <option>14 D??as</option>
                                                        <option>15 D??as</option>
                                                        <option>16 D??as</option>
                                                        <option>17 D??as</option>
                                                        <option>18 D??as</option>
                                                        <option>19 D??as</option>
                                                        <option>20 D??as</option>
                                                        <option>21 D??as</option>
                                                        <option>22 D??as</option>
                                                        <option>23 D??as</option>
                                                        <option>24 D??as</option>
                                                        <option>25 D??as</option>
                                                        <option>26 D??as</option>
                                                        <option>27 D??as</option>
                                                        <option>28 D??as</option>
                                                        <option>29 D??as</option>
                                                        <option>30 D??as</option>
                                                    </select>
                                                </div>    
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Imagenes</label>
                                                <div className="form-group col-md-2">
                                                    <div id="image-preview" className="image-preview" style={{backgroundImage:`url(${this.state.file})`}}>
                                                        <label htmlFor="image-upload" id="image-label">{!this.state.file ? 'AGREGAR +' : 'Modificar'}</label>
                                                        <input type="file" name="image" id="image-upload" onChange={this.handleChangeImagen1} />
                                                    </div>
                                                </div>

                                                <div className="form-group col-md-2">
                                                    <div id="image-preview2" className="image-preview" style={{backgroundImage:`url(${this.state.file2})`}}>
                                                        <label htmlFor="image-upload2" id="image-label2">{!this.state.file2 ? 'AGREGAR +' : 'Modificar'}</label>
                                                        <input type="file" name="image" id="image-upload2" onChange={this.handleChangeImagen2} />
                                                    </div>
                                                </div>

                                                <div className="form-group col-md-2">
                                                    <div id="image-preview3" className="image-preview" style={{backgroundImage:`url(${this.state.file3})`}}>
                                                        <label htmlFor="image-upload3" id="image-label3">{!this.state.file3 ? 'AGREGAR +' : 'Modificar'}</label>
                                                        <input type="file" name="image" id="image-upload3" onChange={this.handleChangeImagen3} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Stock</label>
                                                <div className="col-sm-12 col-md-2">
                                                    <input name="stock" id="Stock" type="number" className="form-control" value={this.state.stock}
                                                    onChange={this.handleChange}/>
                                                    {errors.stock.length > 0 && 
                                                    <span className='error'>{errors.stock}</span>}
                                                </div>

                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Ahorro de Oferta</label>
                                                <div className="col-sm-12 col-md-2">
                                                    <input name="ahorro" id="Ahorro" type="number" className="form-control" min="1" value={this.state.ahorro}
                                                    onChange={this.handleChange}/>
                                                    {errors.ahorro.length > 0 && 
                                                    <span className='error'>{errors.ahorro}</span>}
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Incluye</label>
                                                <div className="col-sm-12 col-md-2">
                                                    <textarea name="incluye" id="Incluye" type="text" className="form-control"/>
                                                </div>

                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">No Incluye</label>
                                                <div className="col-sm-12 col-md-2">
                                                    <textarea name="noincluye" id="Noinc" type="text" className="form-control"/>
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Consideraciones</label>
                                                <div className="col-sm-12 col-md-2">
                                                    <textarea name="consid" id="Consid" type="text" className="form-control"/>
                                                </div>

                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Contraindicaci??n</label>
                                                <div className="col-sm-12 col-md-2">
                                                    <textarea name="contra" id="Contra" type="text" className="form-control"/>
                                                </div>
                                            </div>
                                            
                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Tienda</label>
                                                <div className="col-sm-12 col-md-7">
                                                    <select name="select_tiendas" id="tiendas" className="form-control" onChange={this.handleSelect}>
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
                                                    <input name="fechaVen" className="form-control" type="datetime-local" id="hora" value={this.state.fechaVen}
                                                    onChange={this.handleChange}/>
                                                    {errors.fechaVen.length > 0 && 
                                                    <span className='error'>{errors.fechaVen}</span>}
                                                </div>
                                            </div>
                                            

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Venta m??nima</label>
                                                <div className="col-sm-12 col-md-7">
                                                    <input name="ventaMin" id="VentaMinima" type="number" className="form-control" min="1" value={this.state.ventaMin}
                                                    onChange={this.handleChange}/>
                                                    {errors.ventaMin.length > 0 && 
                                                    <span className='error'>{errors.ventaMin}</span>}
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Venta Est??ndar (M??xima)</label>
                                                <div className="col-sm-12 col-md-7">
                                                    <input name="ventaEstd" id="VentaEstandar" type="number" className="form-control" min="1" value={this.state.ventaEstd}
                                                    onChange={this.handleChange}/>
                                                    <p className="comentario_input">Debe ser mayor a la venta minima del cup??n</p>
                                                    {errors.ventaEstd.length > 0 && 
                                                    <span className='error'>{errors.ventaEstd}</span>}
                                                </div>
                                            </div>




                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">D??as del Cup??n</label>
                                                <div className="col-sm-12 col-md-3">
                                                    <div id="CheckBox_val" className="form-row form-checkbox">
                                                        <div className="form-group col-md-3">
                                                            <div className="custom-control custom-checkbox">
                                                                <input name="Lunes" type="checkbox" className="custom-control-input only-one" id="customCheck-dia1" value="Si"
                                                                onChange={this.handleCheckboxDias}/>
                                                                <label className="custom-control-label" htmlFor="customCheck-dia1">Lunes</label>
                                                            </div>

                                                            <div className="custom-control custom-checkbox">
                                                                <input name="Martes" type="checkbox" className="custom-control-input only-one" id="customCheck-dia2" value="Si"
                                                                onChange={this.handleCheckboxDias}/>
                                                                <label className="custom-control-label" htmlFor="customCheck-dia2">Martes</label>
                                                            </div>

                                                            <div className="custom-control custom-checkbox">
                                                                <input name="Miercoles" type="checkbox" className="custom-control-input only-one" id="customCheck-dia3" value="Si"
                                                                onChange={this.handleCheckboxDias}/>
                                                                <label className="custom-control-label" htmlFor="customCheck-dia3">Mi??rcoles</label>
                                                            </div>

                                                            <div className="custom-control custom-checkbox">
                                                                <input name="Jueves" type="checkbox" className="custom-control-input only-one" id="customCheck-dia4" value="Si"
                                                                onChange={this.handleCheckboxDias}/>
                                                                <label className="custom-control-label" htmlFor="customCheck-dia4">Jueves</label>
                                                            </div>

                                                            <div className="custom-control custom-checkbox">
                                                                <input name="Viernes" type="checkbox" className="custom-control-input only-one" id="customCheck-dia5" value="Si"
                                                                onChange={this.handleCheckboxDias}/>
                                                                <label className="custom-control-label" htmlFor="customCheck-dia5">Viernes</label>
                                                            </div>

                                                            <div className="custom-control custom-checkbox">
                                                                <input name="Sabado" type="checkbox" className="custom-control-input only-one" id="customCheck-dia6" value="Si"
                                                                onChange={this.handleCheckboxDias}/>
                                                                <label className="custom-control-label" htmlFor="customCheck-dia6">S??bado</label>
                                                            </div>

                                                            <div className="custom-control custom-checkbox">
                                                                <input name="Domingo" type="checkbox" className="custom-control-input only-one" id="customCheck-dia7" value="Si"
                                                                onChange={this.handleCheckboxDias}/>
                                                                <label className="custom-control-label" htmlFor="customCheck-dia7">Domingo</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <label className="col-form-label text-md-right col-12 col-md-2 col-lg-2">Campa??as del Cup??n</label>

                                                <div className="col-sm-12 col-md-4">
                                                    <div id="CheckBox_Campa" className="form-row form-checkbox">
                                                        <div className="form-group col-md-3">
                                                            <div className="custom-control custom-checkbox">
                                                                <input name="TodoEnDolar" type="checkbox" className="custom-control-input only-one" id="customCheck-camp1" value="Si"
                                                                onChange={this.handleCheckboxCamp}/>
                                                                <label className="custom-control-label" htmlFor="customCheck-camp1">Todo en $1</label>
                                                            </div>

                                                            <div className="custom-control custom-checkbox">
                                                                <input name="MejorEnSalud" type="checkbox" className="custom-control-input only-one" id="customCheck-camp2" value="Si"
                                                                onChange={this.handleCheckboxCamp}/>
                                                                <label className="custom-control-label" htmlFor="customCheck-camp2">Lo mejor en Salud</label>
                                                            </div>

                                                            <div className="custom-control custom-checkbox">
                                                                <input name="BellezaTop" type="checkbox" className="custom-control-input only-one" id="customCheck-camp3" value="Si"
                                                                onChange={this.handleCheckboxCamp}/>
                                                                <label className="custom-control-label" htmlFor="customCheck-camp3">Belleza Top</label>
                                                            </div>

                                                            <div className="custom-control custom-checkbox">
                                                                <input name="Comida" type="checkbox" className="custom-control-input only-one" id="customCheck-camp4" value="Si"
                                                                onChange={this.handleCheckboxCamp}/>
                                                                <label className="custom-control-label" htmlFor="customCheck-camp4">Comida</label>
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
                                                                            'Esmalte de u??a', 'Brillos', 'Labiales', 'Case', 'Forros de telefono', 'Celulares', 'Telefonos',
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
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"></label>

                                                <div className="col-sm-12 col-md-7">
                                                    <button id="CambiarBanner" className="btn btn-primary" onClick={this.handleCupon}>Crear Cup??n</button>
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
        )
    }
}
export default CrearCuponSemana;