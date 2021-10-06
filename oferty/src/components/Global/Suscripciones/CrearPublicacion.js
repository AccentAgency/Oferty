import React, { Component } from 'react';


import config from '../../../config/config';
import {fire} from '../../../config/firebase';
import axios from "axios";

import 'font-awesome/css/font-awesome.min.css';
import Menu from './Components/Menu';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import swal from 'sweetalert2';
import Footer from '../Administrador/Components/Footer';

const axiosInstance = axios.create({
    baseURL: config.backURL
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};



class CrearPublicacion extends Component{

    constructor (props) { 
        super (props) 
        this.state = { 
          file: null, file2:null, file3:null, imagen:'No Disponible', imagen2: 'No Disponible', imagen3:'No Disponible', categoria:"Seleccione Categoria", error:'', open:false,
          titulo:'', detalles:'',stock:'Seleccione', descripcion:'',incluye:'No disponible', noIncluye:'No disponible',consideraciones:'No disponible', contraind: 'No disponible', ahorro:0,
          select_dias:"Seleccione uso", openS: false, checkbox1:false, checkbox2: false, fecha:'', display:'none', displayImage:'none',
          errors:{
              titulo:'',
              stock:'',
              descripcion:'',
              incluye:'',
              noIncluye:'',
              consideraciones:'',
              contraind: '',
              ahorro:'',
              detalles:''
            
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
          hobbies:{
            TodoEnDolar: "No",
            MejorEnSalud: "No",
            BellezaTop:"No",
            Comida:"No"
          }
        }

        this.handleChangeImagen1 = this.handleChangeImagen1.bind(this);
        this.handleChangeImagen2 = this.handleChangeImagen2.bind(this);
        this.handleChangeImagen3 = this.handleChangeImagen3.bind(this);
        this.handleCheckboxCamp = this.handleCheckboxCamp.bind(this);
        this.handleCheckboxDias = this.handleCheckboxDias.bind(this);
        this.handlePublicacion = this.handlePublicacion.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.updateCheckbox = this.updateCheckbox.bind(this);
    }

    //Evento change input file (imagen 1)
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
            swal.fire({title:"Ha ocurrido un error en subir la imagen",text:"Favor refresque la página e intente de nuevo.",icon:"error",confirmButtonText: "Aceptar"});
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
            swal.fire({title:"Ha ocurrido un error en subir la imagen",text:"Favor refresque la página e intente de nuevo.",icon:"error",confirmButtonText: "Aceptar"});
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
            swal.fire({title:"Ha ocurrido un error en subir la imagen",text:"Favor refresque la página e intente de nuevo.",icon:"error",confirmButtonText: "Aceptar"});
        })
    }

    handlePublicacion(){
        this.setState({display:'flex'});
        //Guardamos los datos en BD
        if(!this.state.titulo || !this.state.descripcion || !this.state.stock || !this.state.ahorro || !this.state.fecha){
            this.setState({open:true});
            this.setState({error: "Rellene todas los campos antes de Crear el cupón"});
        }
        else if(this.state.categoria === "Seleccione Categoria"){
            this.setState({open:true});
            this.setState({error: "Favor seleccione una categoría para su cupón"});
        }
        else if(this.state.stock === "Seleccione"){
            this.setState({open:true});
            this.setState({error: "Favor seleccione disponibilidad de su cupón"});
        }
        else if (this.state.dias.Lunes === "No" && this.state.dias.Martes === "No" && this.state.dias.Miercoles === "No" && this.state.dias.Jueves === "No" &&
            this.state.dias.Viernes === "No" && this.state.dias.Sabado === "No" && this.state.dias.Domingo === "No"){
                this.setState({open:true});
                this.setState({error: "Favor seleccione al menos un día para su cupón"});
        } 
        else{
            if(validateForm(this.state.errors)) {
                if(this.state.checkbox1 && this.state.checkbox2){
                    fire.auth().onAuthStateChanged((user) =>{
                        if(user){
                            axiosInstance.post('/savePublicacion',{
                                'catg' : this.state.categoria, 
                                'consid': this.state.consideraciones,
                                'contraind': this.state.contraind, 
                                'desc': this.state.descripcion, 
                                'lunes': this.state.dias.Lunes, 
                                'martes': this.state.dias.Martes, 
                                'mier' : this.state.dias.Miercoles, 
                                'jueves': this.state.dias.Jueves, 
                                'viern' : this.state.dias.Viernes, 
                                'sabado': this.state.dias.Sabado, 
                                'dom': this.state.dias.Domingo, 
                                'id_user': user.uid, 
                                'imgPrin': this.state.imagen, 
                                'imgSec': this.state.imagen2 ,
                                'imgTerc': this.state.imagen3,
                                'incl' : this.state.incluye, 
                                'noInc': this.state.noIncluye,
                                'plazo': this.state.select_dias,
                                'stock': this.state.stock, 
                                'titulo': this.state.titulo,
                                'campBelleza': this.state.hobbies.BellezaTop, 
                                'campComida': this.state.hobbies.Comida, 
                                'campSalud' : this.state.hobbies.MejorEnSalud, 
                                'campTodoDolar' : this.state.hobbies.TodoEnDolar,
                                'ahorro': this.state.ahorro,
                                'fechaVen': this.state.fecha,
                                'detalles':this.state.detalles
                            }).then(res => {
                                this.setState({display:'none'});
                                swal.fire({
                                    title: '¡Haz que te puedan conseguir más rapido!',
                                    text:'Ingresa tu instagram para alcanzar a más personas',
                                    input: 'textarea',
                                    icon: 'warning',
                                    showCancelButton: true,
                                    cancelButtonText:'No tengo instagram',
                                    confirmButtonText: "Aceptar",
                                })
                                .then(resultado => {
                                    this.setState({display:'flex'});
                                    if(resultado.isConfirmed){
                                        if(resultado.value){
                                            axiosInstance.post('/refreshInstagram',{
                                                'id_user': user.uid,
                                                'user': resultado.value
                                            }).then(res => {
                                                this.setState({display:'none'});
                                                this.setState({openS: true});
                                                window.location.reload();
                                            })
                                        }
                                        else{
                                            this.setState({display:'none'});
                                            alert('Favor ingrese un usuario valido')
                                        }

                                    }
                                    else{
                                        this.setState({display:'none'});
                                        this.setState({openS: true});
                                        window.location.reload();
                                    }
                                })

                            })
                            .catch((error) => {
                                swal({title:"Ha ocurrido un error",text:"Verifique su conexión a internet o intente de nuevo más tarde.",icon:"error",confirmButtonText: "Aceptar"});
                            })
                        }
                    })
                }
                else{
                    this.setState({display:'none'});
                    this.setState({open:true});
                    this.setState({error: "Favor seleccione las casillas de las normativas"});
                }

            }
            else{
                this.setState({display:'none'});
                this.setState({open:true});
                this.setState({error: "Verifique que no exista campo de advertencia antes de Crear el cupón"});
            }
        }
        

        
    }

    

    componentDidMount=() =>{
        window.scrollTo(0, 0)
    }

    handleCheckboxCamp(event){
        const target = event.target;
        var value = target.value;
        const name = target.name;
        
        if(target.checked){
            this.setState({
                ...this.state,
                hobbies: {
                   ...this.state.hobbies,
                   [name]: value
                }
            });   
        }else{
            this.state.hobbies.splice(value, 1);
        }   
    }

    handleCheckboxDias(event){
        const target = event.target;
        var value = target.value;
        const name = target.name;
        
        if(target.checked){
            this.setState({
                ...this.state,
                dias: {
                   ...this.state.dias,
                   [name]: value
                }
            });
            
        }else{
            this.state.dias.splice(value, 1);
        }   
    }

    handleSelect(event){
        const target = event.target;
        const val = event.target.value;
        const name = target.name;
        this.setState({
            [name]: val
        });
    }


    //Evento change de los input
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
                    ? 'Favor ingresar un titulo válido.'
                    : '';
            break;

            case 'detalles':
                errors.detalles =
                value.length === 0
                ? 'Favor ingrese una descripción válida'
                : '';
            break;

            case 'stock':
                errors.stock =
                value.length === 0
                ? 'Favor ingrese un nombre válido para la tienda'
                : '';
            break;
            
            case 'descripcion':
                errors.descripcion =
                value.length === 0
                ? 'Favor ingrese una descripción válida'
                : '';
            break;

            case 'ahorro':
                errors.ahorro =
                value.length ===0
                ? 'Favor ingrese un ahorro para la oferta'
                : '';
            break;

            default:
            break;
        }
        
    }

    handleClose(event,reason){
        if (reason === 'clickaway') {
            return;
        }
        
        this.setState({open:false});
        this.setState({openS:false});
    }

    updateCheckbox(event){
        const target = event.target;
        const check = event.target.checked;
        const name = target.name;
        this.setState({ [name]: check });
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


                <Snackbar open={this.state.openS} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                     Publicación creada correctamente. ¡Gracias por preferirnos!
                    </Alert>
                </Snackbar>

                <div class="loader-page3" style={{display:this.state.displayImage}}>
                    <div class="lds-ripple"><div></div><div></div></div>
                    <h4> Subiendo Imagen... </h4>
                </div>

                
                <div class="loader-page3" style={{display:this.state.display}}>
                    <div class="lds-ripple"><div></div><div></div></div>
                </div>


                <div id="Suscriptor" className="main-content">

                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 col-center">
                        <div className="card">
                            <div className="card-header">
                                <h4>Crear nuevo cupón</h4>
                            </div>

                            <div className="card-body">
                                <div className="section-title mt-0">¿Que quieres vender?</div>
                                <label>Utilice un titulo conciso y donde se sintetice los servicios en oferta para obtener un facil acceso.</label>

                                <div className="form-group">
                                    <label htmlFor="inputPassword5">Titulo listados *</label>
                                    <input type="text" id="inputTitulo" className="form-control" maxLength="20" name="titulo" onChange={this.handleChange}
                                        aria-describedby="passwordHelpBlock" />
                                    <small id="passwordHelpBlock" className="form-text text-muted">
                                    Máximo 20 carácteres.</small>
                                    {errors.titulo.length > 0 && 
                                    <span className='error'>{errors.titulo}</span>}    
                                </div>

                                
                                <div className="form-group">
                                    <label htmlFor="inputPassword5">Detalles *</label>
                                    <input type="text" id="inputTitulo" className="form-control" maxLength="15" name="detalles" onChange={this.handleChange}
                                        aria-describedby="passwordHelpBlock" />
                                    <small id="passwordHelpBlock" className="form-text text-muted">
                                    Corta descricpion del producto. Maximo 15 carácteres.</small>
                                    {errors.detalles.length > 0 && 
                                    <span className='error'>{errors.detalles}</span>}    
                                </div>



                                <div className="section-title mt-0">¿Dónde quieres publicar?</div>
                                <label>Los cupones los clasificamos por categorías, para facilitar la busqueda de nuestro clientes. Escoge donde se encuentra el tuyo.</label>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputState">Categoría *</label>
                                        <select name="categoria" id="categoria" className="form-control selectric" onChange={this.handleSelect}>
                                            <option value="0">Seleccione Categoria </option>
                                            <option value="Productos">Productos</option>
                                            <option value="Belleza">Belleza</option>
                                            <option value="Entretenimiento">Entretenimiento</option>
                                            <option value="Viaje y Turismo">Viaje y Turismo</option>
                                            <option value="Comida">Comida</option>
                                            <option value="Servicios">Servicios</option>
                                            <option value="Salud">Salud</option>
                                            <option value="Carros">Carros</option>
                                            <option value="Tecnologia">Tecnologia</option>
                                            <option value="Juguetes">Juegutes</option>
                                            <option value="Organico">Organico</option>
                                        </select>
                                    </div>
                                </div>


                                <div className="section-title mt-0">Datos del Descuento</div>


                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputEmail4">Ahorro de la Oferta*</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    $
                                                </div>
                                            </div>
                                            <input name="ahorro" id="PrecioNormal" type="text" className="form-control currency" onChange={this.handleChange}/>
                                        </div>
                                        <small id="passwordHelpBlock" className="form-text text-muted">
                                            Cuanto se esta ahorrando con este cupón.
                                        </small>
                                        {errors.ahorro.length > 0 && 
                                        <span className='error'>{errors.ahorro}</span>}   
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputEmail4">Stock Máximo*</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <i className="fa fa-tags"></i>
                                                </div>
                                            </div>
                                            <input id="StockCupon" type="text" className="form-control currency" name="stock" onChange={this.handleChange}/>
                                        </div>

                                        <small id="passwordHelpBlock" className="form-text text-muted">
                                            Cantidad disponible de cupones para vender.
                                        </small>

                                        {errors.stock.length > 0 && 
                                        <span className='error'>{errors.stock}</span>}   
                                    </div>
                                </div>


                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputEmail4">Fecha de Cierre*</label>
                                        <input name="fecha" className="form-control" type="datetime-local" id="hora" onChange={this.handleChange}/>
                                        <small id="passwordHelpBlock" className="form-text text-muted">
                                        Indique hasta que fecha y hora estará disponible su cupón.</small>
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputEmail4">Plazo para su uso*</label>
                                        <select id="inputUso" className="form-control selectric" name="select_dias" onChange={this.handleSelect}>
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


                                <div className="section-title mt-0">Dias de la Oferta</div>
                                <label>Debes seleccionar un dia en particular en el cual tu oferta estará disponibles</label>

                                <div id="CheckBox_val" className="form-row form-checkbox">
                                    <div className="form-group col-md-4">
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
                                            <label className="custom-control-label" htmlFor="customCheck-dia3">Miércoles</label>
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
                                            <label className="custom-control-label" htmlFor="customCheck-dia6">Sábado</label>
                                        </div>

                                        <div className="custom-control custom-checkbox">
                                            <input name="Domingo" type="checkbox" className="custom-control-input only-one" id="customCheck-dia7" value="Si"
                                            onChange={this.handleCheckboxDias}/>
                                            <label className="custom-control-label" htmlFor="customCheck-dia7">Domingo</label>
                                        </div>
                                    </div>
                                </div>


                                <div className="section-title mt-0">Campañas de Oferta</div>
                                <label>Puede elegir una de las siguientes campañas en donde quisieras que tu oferta esté.</label>

                                <div id="CheckBox_Campa" className="form-row form-checkbox">
                                    <div className="form-group col-md-4">
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


                                <div className="section-title">Imagenes</div>
                                <label>Este campo es importante, si no tienes imagenes de calidad podemos ayudarte en eso. Ten en consideración 
                                    que las imágenes deben ser horizontales, nítidas y claras.
                                    Asegúrate de tener los derechos de las imágenes que publicas. Formato permitido JPG y PNG</label>
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <div id="image-preview" className="image-preview" style={{backgroundImage:`url(${this.state.file})`}}>
                                            <label htmlFor="image-upload" id="image-label">{!this.state.file ? 'Imagen Principal' : 'Modificar'}</label>
                                            <input type="file" name="image" id="image-upload" onChange={this.handleChangeImagen1} />
                                        </div>
                                    </div>

                                    <div className="form-group col-md-4">
                                        <div id="image-preview2" className="image-preview" style={{backgroundImage:`url(${this.state.file2})`}}>
                                            <label htmlFor="image-upload2" id="image-label2">{!this.state.file2 ? 'AGREGAR +' : 'Modificar'}</label>
                                            <input type="file" name="image" id="image-upload2" onChange={this.handleChangeImagen2} />
                                        </div>
                                    </div>

                                    <div className="form-group col-md-4">
                                        <div id="image-preview3" className="image-preview" style={{backgroundImage:`url(${this.state.file3})`}}>
                                            <label htmlFor="image-upload3" id="image-label3">{!this.state.file3 ? 'AGREGAR +' : 'Modificar'}</label>
                                            <input type="file" name="image" id="image-upload3" onChange={this.handleChangeImagen3} />
                                        </div>
                                    </div>
                                </div>

                                <div className="section-title mt-0">¿De que se trata?</div>
                                <label>Ahora llego el momento que nos cuente información que ayudara a los clientes a elegirte.</label>
                                <div className="form-group">
                                    <label htmlFor="inputPassword5">Descripción General *</label>
                                    <textarea id="descripcion_ofer" className="form-control" name="descripcion" onChange={this.handleChange}></textarea>
                                    {errors.descripcion.length > 0 && 
                                    <span className='error'>{errors.descripcion}</span>}   
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputEmail4">Incluye</label>
                                        <textarea id="incluye_ofer" className="form-control" name="incluye"></textarea>
                                        <small id="passwordHelpBlock" className="form-text text-muted">
                                            Lo que esta incluido en la oferta (opcional).
                                        </small> 
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputEmail4">No incluye</label>
                                        <textarea id="exceptInput" className="form-control" name="noIncluye"></textarea>
                                        <small id="passwordHelpBlock" className="form-text text-muted">
                                            Las excepciones que presenta la oferta (opcional).
                                        </small>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputEmail4">Consideraciones</label>
                                        <textarea className="form-control" name="consideraciones"></textarea>
                                        <small id="considInput" className="form-text text-muted">
                                            Si existe alguna consideracion que deba saber el usuario antes de adquirir el producto (opcional).
                                        </small>
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputEmail4">Contraindicación</label>
                                            <textarea className="form-control" name="contraind"></textarea>
                                        <small id="contraInput" className="form-text text-muted">
                                            Si existe alguna contraindicación que deba saber el usuario antes de adquirir el producto.
                                        </small>
                                    </div>
                                </div>

                                <div className="section-title mt-0">Reglas</div>
                                <label>Es importante la veracidad de toda la información de este formulario, de igual forma si hay algo más que añadir no dudes en 
                                    mencionarlo a tu asesor.</label>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" name="checkbox1" onChange={this.updateCheckbox}/>
                                    <label className="custom-control-label" htmlFor="customCheck1">Para hacer uso del servicio, tendrás que contactarte con el comercio.</label>
                                </div>

                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck2" name="checkbox2" onChange={this.updateCheckbox}/>
                                    <label className="custom-control-label" htmlFor="customCheck2">El comprobante de pago será emitido por el comercio y 
                                    dependerá de su régimen.</label>
                                </div>

                            </div>

                            <div className="form-group row mb-4">
                                <div className="col-sm-12 col-md-6 text-center">

                                </div>

                                <div className="col-sm-12 col-md-6 text-center">
                                    <button id="EnviarAprobacion" className="btn btn-primary" onClick={this.handlePublicacion}>ENVIAR APROBACIÓN</button>
                                </div>
                            </div>
                        </div>
                    </div>
                     
                </div>
                <Footer/>                        
                                       
            </div>
         
        )
    }

}


export default CrearPublicacion;