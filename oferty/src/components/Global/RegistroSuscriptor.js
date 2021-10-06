import React, { Component } from 'react';
import './css/Login.css';
import './css/registerSusc.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import 'font-awesome/css/font-awesome.min.css';

import {Link} from 'react-router-dom';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import swal from 'sweetalert';

import config from '../../config/config';
import {fire} from '../../config/firebase';
import axios from "axios";
import Header from './Header';
import Footer from './Footer';
import Suscripcion from './Suscripciones/DashboardSusc';


//Axios
const axiosInstance = axios.create({
    baseURL: config.backURL
});

//Validaciones REGEX
const validEmailRegex = RegExp(
    /^(([^<>(),;:\s@]+(\.[^<>();:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+\.)+[^<>()[\],;:\s@]{2,})$/i
);

const validPhone = RegExp(
    /^[04|02]{2}([\d]{2}[-]*){3}[\d]{3}$/
);

const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};

//Alerta Snackbar Design
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}



class RegistroSusc extends Component {

    constructor (props) { 
        super (props) 
        this.state = { 
          file: null, file2:null, name:'', nameNeg:'', descNeg:'', catg:'', email:'', documento:'', direccion:'', phone:'', password:'', password_repeat:'',select_catg:'Belleza',
          select_ced:'V', select_location:'Agua Blanca', select_cord:'10.2006565,-68.0169797', error:'', fileImage:'', fileImage2:'', openS:false, open:false, display:'none',
          dataUser:[],
          errors:{
            name:'', 
            nameNeg:'', 
            descNeg:'', 
            catg:'', 
            email:'', 
            documento:'', 
            direccion:'', 
            phone:'', 
            password:'', 
            password_repeat:'',
            select_catg:''
          } 
        }

        this.handleChangeImagen1 = this.handleChangeImagen1.bind(this);
        this.handleChangeImagen2 = this.handleChangeImagen2.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleLocation = this.handleLocation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    //Evento change input file (imagen 1)
    handleChangeImagen1(event){
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
        this.setState({fileImage:event.target.files[0]});

    }

    //Evento change input file (imagen 2)
    handleChangeImagen2(event){
        this.setState({
            file2: URL.createObjectURL(event.target.files[0])
        })

        this.setState({fileImage2:event.target.files[0]});
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

        let ced = this.state.select_ced;
        switch (name) {
            case 'name': 
                errors.name = 
                value.length === 0
                    ? 'Favor ingresar un nombre válido.'
                    : '';
            break;

            case 'nameNeg':
                errors.nameNeg =
                value.length === 0
                ? 'Favor ingrese un nombre válido para la tienda'
                : '';
            break;
            
            case 'descNeg':
                errors.descNeg =
                value.length === 0
                ? 'Favor ingrese una descripción válida'
                : '';
            break;

            case 'email': 
            errors.email = 
                validEmailRegex.test(value)
                ? ''
                : 'Correo electrónico inválido.';
            break;

            case 'phone':
            errors.phone =
                validPhone.test(value)
                ? ''
                : 'Ingrese un número de telefóno válido.';
            break;    
            
            case 'password':
                errors.password =
                value.length > 5
                ? ''
                : "Contraseña mayor o igual a 6 caracteres." 
            break;

            case 'documento':
                if(ced === "V"){
                    errors.documento =
                    value.length > 6
                    ? ''
                    : 'Favor ingresar una cédula válida.';
                }
                else if(ced === "J" || ced==="E" || ced==="G"){
                    errors.documento =
                    value.length > 7
                    ? ''
                    : 'Favor ingresar un RIF válido'
                }
            break;

            case 'password_repeat':
                errors.password_repeat =
                this.state.password === value
                ? ''
                : 'Las contraseñas no coinciden'
            break;
            default:
            break;
        }
        
    }

    handleSelect(event){
        const val = event.target.value;
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: val
        });
    }

    handleLocation(event){
        const coord = event.target.value;
        let index = event.target.selectedIndex;
        const text = event.target.options[index].text;

        this.setState({
            select_location:text,
            select_cord: coord
        })
    }

    handleClose(event,reason){
        if (reason === 'clickaway') {
            return;
        }
        
        this.setState({...this.state.open, open:false});
    }

    componentDidMount = () => {
        this.authListener();
    }

    //Registro
    signup(e){
        e.preventDefault();
        this.setState({display:'flex'});
        var coordenadas = (this.state.select_cord).split(',');
        
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) =>{
            const formData = new FormData();
            formData.append('id', u.user.uid);
            formData.append('email', this.state.email);
            formData.append('name', this.state.name);
            formData.append('phone', this.state.phone);
            formData.append('categoria', this.state.select_catg);
            formData.append('cedula', this.state.select_ced+"- "+this.state.documento);
            formData.append('descTienda', this.state.descNeg);
            formData.append('direccion', this.state.select_location);
            formData.append('latitud', coordenadas[0]);
            formData.append('longitud', coordenadas[1]);
            formData.append('tienda', this.state.nameNeg);

            if(!this.state.fileImage && !this.state.fileImage2){
                axiosInstance.post('/registerSuscNone',formData,{
                })
                .then(res => {
                // handle success
                    this.setState({display:'none'});
                    this.setState({openS:true});
                    this.setState({success: "Registro correcto. ¡Bienvenido a Oferty, una nueva forma de vender!"});
                })
                .catch(err => {
                // handle error
                console.log(err);
                    this.setState({display:'none'});
                    swal({title:"Ha ocurrido un error",text:"Verifique su conexión a internet o intente de nuevo más tarde.",icon:"error",confirmButtonText: "Aceptar"});
                })
            }
            else if(this.state.fileImage && !this.state.fileImage2){
                formData.append('image',this.state.fileImage);

                axiosInstance.post('/registerSuscImg1',formData,{
                })
                .then(res => {
                // handle success
                    this.setState({display:'none'});
                    this.setState({openS:true});
                    this.setState({success: "Registro correcto. ¡Bienvenido a Oferty, una nueva forma de vender!"});
                })
                .catch(err => {
                // handle error
                    this.setState({display:'none'});
                    swal({title:"Ha ocurrido un error",text:"Verifique su conexión a internet o intente de nuevo más tarde.",icon:"error",confirmButtonText: "Aceptar"});
                })
            }
            else if(!this.state.fileImage && this.state.fileImage2){
                formData.append('image2',this.state.fileImage2);

                axiosInstance.post('/registerSuscImg2',formData,{
                })
                .then(res => {
                // handle success
                    this.setState({display:'none'});
                    this.setState({openS:true});
                    this.setState({success: "Registro correcto. ¡Bienvenido a Oferty, una nueva forma de vender!"});
                })
                .catch(err => {
                // handle error
                    this.setState({display:'none'});
                    swal({title:"Ha ocurrido un error",text:"Verifique su conexión a internet o intente de nuevo más tarde.",icon:"error",confirmButtonText: "Aceptar"});
                })
            }
            else{
                formData.append('image',this.state.fileImage);
                formData.append('image2',this.state.fileImage2);

                axiosInstance.post('/registerSusc',formData,{
                })
                .then(res => {
                // handle success
                    this.setState({display:'none'});
                    this.setState({openS:true});
                    this.setState({success: "Registro correcto. ¡Bienvenido a Oferty, una nueva forma de vender!"});
                })
                .catch(err => {
                // handle error
                    this.setState({display:'none'});
                    swal({title:"Ha ocurrido un error",text:"Verifique su conexión a internet o intente de nuevo más tarde.",icon:"error",confirmButtonText: "Aceptar"});
                })
            }


        }).catch((err)=>{
            this.setState({display:'none'});
            console.log(err);
            switch (err.code){
                case "auth/email-already-in-use":
                    this.setState({open:true});
                    this.setState({error: "La dirección de correo electrónico ya está siendo utilizada por otra cuenta"})
                break;

                case "auth/user-disabled":
                    this.setState({open:true});
                    this.setState({error: "La cuenta se encuentra desactivada, favor comunicate a nuestro whatsapp"});
                break;

                case "auth/argument-error":
                    this.setState({open:true});
                    this.setState({error: "Campos vacios, favor rellenar antes de registrarse"});
                break;

                case "auth/weak-password":
                    this.setState({open:true});
                    this.setState({error: "Contraseña debil, verifique que tenga al menos 6 caracteres"});
                break;

                default: 
                    this.setState({open:true});
                    this.setState({error: "Ha ocurrido un error, intente más tarde"});
            }
        })    
       
    }

    //Registrar usuario
    handleSubmit(event){
        event.preventDefault();

        if(!this.state.nameNeg || !this.state.name || !this.state.password || !this.state.password_repeat || !this.state.phone || !this.state.documento || !this.state.email){
        
            this.setState({open:true});
            this.setState({error: "Rellene todas los campos antes de Registrarse"});
        }
        else{
            if(validateForm(this.state.errors)) {
                this.signup(event);
            }else{
                this.setState({open:true});
                this.setState({error: "Verifique que no exista campo de advertencia antes de Registrarse"})
                console.error('Invalid Form')
            }
        }
        
    }

    authListener(){
        fire.auth().onAuthStateChanged((user) =>{
            if(user){
                this.setState({user});
                axiosInstance.get('/getUser/'+user.uid)
                .then(res => {
                  this.setState({...this.state.dataUser, dataUser:res.data});
                })
            }
            else{
                this.setState({user:null})
            }
        })
    }



    render(){
        const {errors} = this.state;
        switch(this.state.dataUser.Rol) {
            case 'Suscripcion':
                window.location.href = "/Dashboard-Suscriptor"
                return <Suscripcion/>
            default:
                return (
                    <div className="">
                        <Header/>
                        <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                            <Alert onClose={this.handleClose} severity="error">
                            {this.state.error}
                            </Alert>
                        </Snackbar>

                        <Snackbar open={this.state.openS} autoHideDuration={6000} onClose={this.handleClose}>
                            <Alert onClose={this.handleClose} severity="success">
                            {this.state.success}
                            </Alert>
                        </Snackbar>

                        <div className="loader-page3" style={{display:this.state.display}}>
                            <div className="lds-ripple"><div></div><div></div></div>
                        </div>

                        <div className="breadcrumb">
                            <div className="container">
                                <div className="breadcrumb-inner">
                                    <ul className="list-inline list-unstyled">
                                        <li><Link to="/">Home</Link></li>
                                        <li className='active'>Suscripción</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div id="suscription" className="body-content outer-top-ts">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div id="WAButton"></div>

                                        <div className="sign-in-page">
                                            <h4 className="">VENDE CON OFERTY</h4>
                                            <div className="row">             
                                                <div className="col-md-12 col-sm-12 sign-in">
                                                    <h4 className="">Registrate</h4>

                                                    <form className="register-form outer-top-xs" onSubmit={this.handleSubmit}>
                                                        <div className="col-md-6 col-sm-6 create-new-account">
                                                            <div className="form-group">
                                                                <label className="info-title">Nombre y Apellido <span>*</span></label>
                                                                <input type="text" className="form-control unicase-form-control text-input" id="Name" maxLength="45" name="name"
                                                                value={this.state.name} onChange={this.handleChange} />
                                                                {errors.name.length > 0 && 
                                                                <span className='error'>{errors.name}</span>}                                                        
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="info-title">Nombre de su Negocio/Tiendas <span>*</span></label>
                                                                <input type="text" className="form-control unicase-form-control text-input" id="Tienda" maxLength="45" name="nameNeg"
                                                                value={this.state.nameNeg} onChange={this.handleChange}/>
                                                                {errors.nameNeg.length > 0 && 
                                                                <span className='error'>{errors.nameNeg}</span>}                                                        
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="info-title">Descripción de su negocio <span>*</span></label>
                                                                <textarea id="description" className="form-control unicase-form-control" name="descNeg"
                                                                value={this.state.descNeg} onChange={this.handleChange}></textarea>
                                                                {errors.descNeg.length > 0 && 
                                                                <span className='error'>{errors.descNeg}</span>}                                                        
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="info-title">Categoría de su negocio <span>*</span></label>
                                                                <select name="select_catg" id="categoria" className="form-control unicase-form-control text-input selectric" 
                                                                onChange={this.handleSelect}>
                                                                    <option value="Belleza">Belleza</option>
                                                                    <option value="Comida">Comida</option>
                                                                    <option value="Salud">Salud</option>
                                                                    <option value="Productos">Productos</option>
                                                                    <option value="Servicios">Servicios</option>
                                                                    <option value="Tecnologia">Tecnología</option>
                                                                </select>
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="info-title">Correo Electrónico <span>*</span></label>
                                                                <input type="email" className="form-control unicase-form-control" id="Email" name="email"
                                                                value={this.state.email} onChange={this.handleChange}/>
                                                                {errors.email.length > 0 && 
                                                                <span className='error'>{errors.email}</span>}
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="info-title">Cédula o RIF <span>*</span></label>

                                                                <div id="ced" className="col-md-12">
                                                                    <select id="tipo_ced" className="form-control unicase-form-control text-input col-md-2" onChange={this.handleSelect}
                                                                    name="select_ced">
                                                                        <option value="V">V</option>
                                                                        <option value="E">E</option>
                                                                        <option value="J">J</option>
                                                                        <option value="G">G</option>
                                                                    </select>
                                                                    <input type="text" className="form-control unicase-form-control text-input col-xs-9 col-md-9" id="Cedula" maxLength="9"
                                                                    name="documento" value={this.state.documento} onChange={this.handleChange} />
                                                                </div>
                                                                {errors.documento.length > 0 && 
                                                                <span className='error error-ced'>{errors.documento}</span>}
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 col-sm-6 create-new-account">
                                                            <div className="form-group">
                                                                <label className="info-title">Dirección corta <span>*</span></label>

                                                                <select id="direccion" className="form-control unicase-form-control text-input selectric" onChange={this.handleLocation}>
                                                                    <option value="10.2006565,-68.0169797">Agua Blanca</option>
                                                                    <option value="10.2086134,-68.0121946,17">Camoruco</option>
                                                                    <option value="10.1581688,-67.9974168">Centro de Valencia</option>
                                                                    <option value="10.1913925,-68.0259153">El Bosque</option>
                                                                    <option value="10.2048966,-68.0347038">El Parral</option>
                                                                    <option value="10.2264576,-68.0102312">El Recreo</option>
                                                                    <option value="10.2489461,-67.9989123">El Rincon</option>
                                                                    <option value="10.2179468,-67.9990051">Trigal Centro</option>
                                                                    <option value="10.2265868,-68.0014122">Trigal Norte</option>
                                                                    <option value="10.2127434,-68.0151183">El Viñedo</option>
                                                                    <option value="10.2272177,-68.0188909">Guaparo</option>
                                                                    <option value="10.1876628,-68.0525395">Guataparo</option>
                                                                    <option value="10.2222209,-68.0129349">La Alegria</option>
                                                                    <option value="10.2402729,-68.0119317">La Granja</option>
                                                                    <option value="10.2008409,-68.0068731">La Kerdell</option>
                                                                    <option value="10.2174352,-68.0245221">La Viña</option>
                                                                    <option value="10.2048728,-68.0061006">Las Acacias</option>
                                                                    <option value="10.2484922,-68.0111351">Las Quintas I</option>
                                                                    <option value="10.2389453,-68.007616">Las Quintas II</option>
                                                                    <option value="10.2000407,-67.9994587">Las Chimeneas</option>
                                                                    <option value="10.1932443,-67.9971618">Lomas del Este</option>
                                                                    <option value="10.1922756,-68.0115884">Los Colorados</option>
                                                                    <option value="10.196692,-68.0252891">Los Mangos</option>
                                                                    <option value="10.1956704,-68.0141634">Los Nisperos</option>
                                                                    <option value="10.2074254,-68.0064466">Los Sauces</option>
                                                                    <option value="10.2348794,-68.0019165">Mañongo</option>
                                                                    <option value="10.266187,-68.0554968">Naguanagua</option>
                                                                    <option value="10.2543147,-68.0009723">Tajazal</option>
                                                                    <option value="10.208286,-68.021797">Prebo</option>
                                                                    <option value="10.2111714,-68.0069053">San Jose de Tarbes</option>
                                                                    <option value="10.2708055,-68.021384">San Diego</option>
                                                                </select>
                                                            </div>

                                                            <div className="form-group">
                                                                <label className="info-title">Télefono<span>*</span></label>
                                                                <input type="text" className="form-control unicase-form-control text-input" id="Telefono" maxLength="11"
                                                                name="phone" value={this.state.phone} onChange={this.handleChange}/>
                                                                {errors.phone.length > 0 && 
                                                                <span className='error'>{errors.phone}</span>}                                                        
                                                            </div>

                                                            <div className="form-group">
                                                                <label className="info-title">Contraseña <span>*</span></label>
                                                                <input type="password" className="form-control unicase-form-control text-input" id="Password" maxLength="15"
                                                                name="password" value={this.state.password} onChange={this.handleChange}/>
                                                                {errors.password.length > 0 && 
                                                                <span className='error'>{errors.password}</span>}                                                        
                                                            </div>

                                                            <div className="form-group">
                                                                <label className="info-title">Confirmar Contraseña <span>*</span></label>
                                                                <input type="password" id="ConfirmPassword" className="form-control unicase-form-control text-input"
                                                                name="password_repeat" value={this.state.password_repeat} onChange={this.handleChange}/>
                                                                {errors.password_repeat.length > 0 && 
                                                                <span className='error'>{errors.password_repeat}</span>}                                                        
                                                            </div>

                                                            <div id="Form_imagenes" className="form-group">
                                                                <div className="form-group col-md-6">
                                                                    <div id="image-preview" className="image-preview" style={{backgroundImage:`url(${this.state.file})`}}>
                                                                    <label htmlFor="image-upload" id="image-label">{!this.state.file ? 'Imagen Principal' : 'Modificar'}</label>
                                                                    <input type="file" name="image" id="image-upload" onChange={this.handleChangeImagen1} />
                                                                    </div>
                                                                    <label className="img_txt">Las imagenes son opcionales</label>
                                                                </div>
                                                                <div className="form-group col-md-6">
                                                                    <div id="image-preview2" className="image-preview" style={{backgroundImage:`url(${this.state.file2})`}}>
                                                                    <label htmlFor="image-upload2" id="image-label2">{!this.state.file2 ? 'Logo (OPCIONAL)' : 'Modificar'}</label>
                                                                    <input type="file" name="image" id="image-upload2" onChange={this.handleChangeImagen2} />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <button id="btn_susc" input="submit" className="btn-upper btn btn-primary">REGISTRARSE</button>


                                                        </div>
                                                    </form>
                                                </div>

                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer></Footer>
                    </div>
                )
        }
    }
}

export default RegistroSusc;