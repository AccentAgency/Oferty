import React, { Component } from 'react';
import './css/DetallesCupon.css';
import './css/Login.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import 'font-awesome/css/font-awesome.min.css';


import config from '../../config/config';
import {fire,googleAuthProvider,facebookAuthProvider} from '../../config/firebase';
import axios from "axios";
import Footer from './Footer';


import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';



//Imagenes
import img_cint from './images/Cintillos/vendeOferty.jpg';
import Header from './Header';


//Axios
const axiosInstance = axios.create({
    baseURL: config.backURL
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


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

const validateFormLogin = errorsLogin => {
    let valid = true;
    Object.values(errorsLogin).forEach(val => val.length > 0 && (valid = false));
    return valid;
};


class Login extends Component {

    
    constructor(props) {
        super(props);
        this.state = {name:'', phone: '', email:'' ,open: false, error:'', openS: false,openF: false ,success:'', focus:false, emailLG:'', passwordLG:'', display:'none', 
        password_repeat:'', genero:'',
            errors: {
                Name: '',
                email: '',
                password: '',
                phone: '',
                password_repeat:''

            },
            errorsLG:{
                emailLG: '',
                passwordLG: ''
            }
        };

        //Botones
            
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //OnChange para Input
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.ForgetPassword = this.ForgetPassword.bind(this);
        this.handlefacebookLogin= this.handlefacebookLogin.bind(this);
        this.handlegoogleLogin= this.handlegoogleLogin.bind(this);
    }


    handleClose(event,reason){
        if (reason === 'clickaway') {
            return;
        }
        
        this.setState({...this.state.open, open:false});
        this.setState({...this.state.openS, openS:false});
        this.setState({...this.state.openF, openF:false});
    }

    //Registrarse con facebook
    handlefacebookLogin(){
        fire.auth().signInWithPopup(facebookAuthProvider).then(result => {
            axiosInstance.post('/register',{
                "id": result.user.uid,
                "phone": ' ',
                "email": result.user.email,
                "name": result.user.displayName,
                "gen": 'Ninguno'
            })
            .then(res => {
            // handle success
            this.setState({openS: true});
            this.setState({success: "Registro correcto. ¡Bienvenido a Oferty!"});
            console.log(res.data)
            })
            .catch(err => {
            // handle error
                this.setState({open:true});
                this.setState({error: "Ha ocurrido un error verifique su conexión a internet o intente de nuevo más tarde."});
            })
        })
    }

    handlegoogleLogin(){
        fire.auth().signInWithPopup(googleAuthProvider).then(result => {
            axiosInstance.post('/register',{
                "id": result.user.uid,
                "phone": ' ',
                "email": result.user.email,
                "name": result.user.displayName,
                "gen": 'Ninguno'
            })
            .then(res => {
                // handle success
                this.setState({openS: true});
                this.setState({success: "Registro correcto. ¡Bienvenido a Oferty!"});
            })
            .catch((error) => {
                // handle error
                this.setState({open:true, error: "Ha ocurrido un error verifique su conexión a internet o intente de nuevo más tarde."});
            })
        })
    }

    ForgetPassword(e){
        if(!this.state.emailLG){
            this.setState({openF:true});
            this.emailInput.focus();
        }
        else{
            fire.auth().sendPasswordResetEmail(this.state.emailLG).then((u) =>{
                this.setState({openS: true});
                this.setState({success: "Se ha enviado un correo electrónico a su cuenta. Por favor sigue los pasos indicados."});
            }).catch((err)=>{
                console.log(err);
    
                switch (err.code){
                    case "auth/user-not-found":
                        this.setState({open:true});
                        this.setState({error: "El usuario especificado no existe. Favor intente con un email registrado"});
                    break;
                    
                    default:
                        this.setState({open:true});
                        this.setState({error: "Ha ocurrido un error en restablecer la contraseña, favor intente más tarde."});
                    break;
                }
            })
        }
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
        case 'name': 
            errors.ame = 
            value.length === 0
                ? 'Favor ingresar un nombre válido.'
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
            
            default:

        }
    
        this.setState({errors, [name]: value});
    }

    handleChangeLogin(event) {
        const target = event.target;
        const value =  target.value;
        const name = target.name;
    
        this.setState({
        [name]: value
        });

        //Validaciones
        let errorsLG = this.state.errorsLG;

        switch (name) {
            
            case 'emailLG': 
            errorsLG.emailLG = 
                validEmailRegex.test(value)
                ? ''
                : 'Correo electrónico inválido.';
            break;

            case 'passwordLG':
                errorsLG.passwordLG =
                value.length > 5
                ? ''
                : "Contraseña mayor o igual a 6 caracteres." 
            
            break;

            default:

        }

    }


    handleSubmitLogin(event){
        event.preventDefault();
        if(!this.state.emailLG || !this.state.passwordLG){
            this.setState({open:true});
            this.setState({error: "Rellene todas los campos antes de Iniciar Sesión"})
        }
        else{
            if(validateFormLogin(this.state.errorsLG)) {
                this.login(event);
                
            }else{
                console.error('Invalid Form')
                this.setState({open:true});
                this.setState({error: "Verifique que no exista campo de advertencia antes de Iniciar Sesión"})
            }
        }

        
    }
    

    handleSubmit(event){
        event.preventDefault();
        if(!this.state.email || !this.state.password || !this.state.name || !this.state.phone || !this.state.genero || !this.state.password_repeat){
            this.setState({open:true});
            this.setState({error: "Rellene todas los campos antes de Registrarse"});

        }
        else{

            if(this.state.password === this.state.password_repeat){
                if(validateForm(this.state.errors)) {
                    this.signup(event);

                }else{
                    this.setState({open:true});
                    this.setState({error: "Verifique que no exista campo de advertencia antes de Registrarse"})
                    console.error('Invalid Form')
                }
            }
            else{
                this.setState({open:true});
                this.setState({error: "Las contraseñas no coinciden"});
            }
        }

    }

    //Funcion para Iniciar Sesion
    login(e){
        this.setState({display:'flex'});
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.emailLG, this.state.passwordLG).then((u) =>{
            this.setState({display:'none'});
            this.setState({openS: true});
            this.setState({success: "Inicio de Sesión correcto. ¡Bienvenido a Oferty!"});
        }).catch((err)=>{
            switch (err.code){
                case "auth/invalid-email":
                    this.setState({display:'none'});
                    this.setState({open:true});
                    this.setState({error: "El valor de email no es válido, debe ser una dirección de correo electrónico"})
                break;

                case "auth/user-disabled":
                    this.setState({display:'none'});
                    this.setState({open:true});
                    this.setState({error: "La cuenta se encuentra desactivada, favor comunicate a nuestro whatsapp"});
                break;

                case "auth/argument-error":
                    this.setState({display:'none'});
                    this.setState({open:true});
                    this.setState({error: "Campos vacios, favor rellenar antes de iniciar sesión"});
                break;

                case "auth/user-not-found":
                    this.setState({display:'none'});
                    this.setState({open:true});
                    this.setState({error: "No existe ningún usuario que corresponda con los datos ingresados"});
                break;

                case "auth/wrong-password":
                    this.setState({display:'none'});
                    this.setState({open:true});
                    this.setState({error: "La contraseña es incorrecta. Vuelve a intentarlo o haz clic en '¿Olvidaste tu contraseña?' para restablecerla."});
                break;

                default:
                    this.setState({display:'none'}); 
                    this.setState({open:true});
                    this.setState({error: "Ha ocurrido un error, intente más tarde"});
            }
        })
    }

    //Funcion para Registrarse
    signup(e){
        this.setState({display:'flex'});
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) =>{
            axiosInstance.post('/register',{
                "id": u.user.uid,
                "phone": this.state.phone,
                "email": u.user.email,
                "name": this.state.name,
                "gen": this.state.genero
            })
            .then(res => {
                this.setState({display:'none'});
                this.setState({openS: true});
                this.setState({success: "Registro correcto. ¡Bienvenido a Oferty!"});
            })
            .catch(err => {
                this.setState({display:'none'});
                this.setState({open:true});
                this.setState({error: "Ha ocurrido un error, favor intente más tarde"});
            })
            
        }).catch((err)=>{
            switch (err.code){
                case "auth/email-already-in-use":
                    this.setState({display:'none'});
                    this.setState({open:true});
                    this.setState({error: "La dirección de correo electrónico ya está siendo utilizada por otra cuenta"})
                break;

                case "auth/user-disabled":
                    this.setState({display:'none'});
                    this.setState({open:true});
                    this.setState({error: "La cuenta se encuentra desactivada, favor comunicate a nuestro whatsapp"});
                break;

                case "auth/argument-error":
                    this.setState({display:'none'});
                    this.setState({open:true});
                    this.setState({error: "Campos vacios, favor rellenar antes de registrarse"});
                break;

                case "auth/weak-password":
                    this.setState({display:'none'});
                    this.setState({open:true});
                    this.setState({error: "Contraseña debil, verifique que tenga al menos 6 caracteres"});
                break;

                default: 
                    this.setState({display:'none'});
                    this.setState({open:true});
                    this.setState({error: "Ha ocurrido un error, intente más tarde"});
            }
        })
    }




    //Validar Formulario
    validarFormulario(){
        
        let campo = this.state.campo;
        let error = {};
        let formularioValido = true;


        //<-------------------------------- Email ------------------------------->
        if (!campo["email"]) {
            formularioValido = false;
            error["email"] = "Por favor, ingresa tu correo.";
        }

        // Validamos si el formato del Email es correcto 
        if (typeof campo["email"] !== "undefined") {
            let posicionArroba = campo["email"].lastIndexOf('@');
            let posicionPunto = campo["email"].lastIndexOf('.');

            if (!(posicionArroba < posicionPunto && posicionArroba > 0 && campo["email"].indexOf('@@') === -1 && posicionPunto > 2 && (campo["email"].length - posicionPunto) > 2)) {
                formularioValido = false;
                error["email"] = "Por favor, ingresa un correo válido.";
            }
        }

        this.setState({
            error: error
        });
        
        return formularioValido;

    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }
    
    


    render(){
        const {errors} = this.state;
        const {errorsLG}= this.state;
        return(
            <div className="">
                <Header></Header>
                <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error">
                     {this.state.error}
                    </Alert>
                </Snackbar>

                <Snackbar open={this.state.openF} autoHideDuration={6000} onClose={this.handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <Alert onClose={this.handleClose} severity="error">
                        Agregue el correo electrónico que desea restablecer la contraseña.
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
                                <li><a href="index.html">Home</a></li>
                                <li className='active'>Login</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="body-content outer-top-ts">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                            
                                <div className="sign-in-page">
                                    <div className="row">

                                        {/* INICIAR SESION */}
                                        <div className="col-md-6 col-sm-6 sign-in">
                                            <h4 className="">Iniciar Sesión</h4>
                                            <div className="social-sign-in outer-top-xs">
                                                <button onClick={this.handlefacebookLogin} id="btn-facebook" className="facebook-sign-in"><i className="fa fa-facebook"></i> 
                                                Continuar con Facebook</button>
                                                <button onClick={this.handlegoogleLogin} id="btn-google" className="twitter-sign-in"><i className="fa fa-google"></i> Continuar con Google</button>
                                            </div>

                                            <form className="register-form outer-top-xs" onSubmit={this.handleSubmitLogin} >
                                                <div className="form-group">
                                                    <label className="info-title" htmlFor="exampleInputEmail1">Correo Electrónico <span>*</span></label>
                                                    <input name="emailLG" type="email" className="form-control unicase-form-control text-input" id="Email" 
                                                    value={this.state.emailLG} onChange={this.handleChangeLogin}
                                                     ref={input => {this.emailInput = input}} />
                                                    {errorsLG.emailLG.length > 0 && 
                                                    <span className='error'>{errorsLG.emailLG}</span>}
                                                </div>
                                                <div className="form-group">
                                                    <label className="info-title" htmlFor="exampleInputPassword1">Contraseña <span>*</span></label>
                                                    <input name="passwordLG" type="password" className="form-control unicase-form-control text-input" id="Password" 
                                                    value={this.state.passwordLG} onChange={this.handleChangeLogin} />
                                                    {errorsLG.passwordLG.length > 0 && 
                                                    <span className='error'>{errorsLG.passwordLG}</span>}
                                                </div>
                                                <div className="radio outer-xs">
                                                    <button id="ForgotPassword" href="#" className="forgot-password pull-right" onClick={this.ForgetPassword} >
                                                        ¿Olvidaste tu Contraseña?</button>
                                                </div>
                                                <button id="btn-login" type="submit" className="btn-upper btn btn-primary checkout-page-button">INICIAR SESIÓN</button>
                                            </form>
                                        </div>

                                        {/* REGISTRARSE */}
                                        <div className="col-md-6 col-sm-6 create-new-account">
                                            <h4 className="checkout-subtitle">Registrarse</h4>
                                            <form onSubmit={this.handleSubmit} className="register-form outer-top-xs">
                                                <div className="form-group">
                                                    <label className="info-title" htmlFor="exampleInputEmail2">Correo Electrónico <span>*</span></label>
                                                    <input name="email" type="email" className="form-control unicase-form-control text-input" id="RegisterEmail" 
                                                    value={this.state.email} onChange={this.handleChange}  />
                                                    {errors.email.length > 0 && 
                                                    <span className='error'>{errors.email}</span>}
                                                </div>

                                                <div className="form-group">
                                                    <label className="info-title" htmlFor="exampleInputEmail1">Nombre <span>*</span></label>
                                                    <input name="name" type="text" className="form-control unicase-form-control text-input" id="Name" 
                                                    value={this.state.name} onChange={this.handleChange} />
                                                    <span className='error'>{errors.Name}</span>
                                                </div>

                                                <div className="form-group">
                                                    <label className="info-title" htmlFor="exampleInputEmail1">Número de Teléfono <span>*</span></label>
                                                    <input name="phone" type="text" className="form-control unicase-form-control text-input" id="Phone" 
                                                    value={this.state.phone} onChange={this.handleChange} />
                                                    {errors.phone.length > 0 && 
                                                    <span className='error'>{errors.phone}</span>}
                                                </div>

                                                <div className="form-group">
                                                    <label className="info-title" htmlFor="exampleInputEmail1">Genero <span>*</span></label>

                                                    <div className="selectgroup w-100" onChange={this.handleChange} value={this.state.genero}>
                                                        <label className="selectgroup-item">
                                                            <input type="radio" name="genero" value="Femenino" className="selectgroup-input-radio" />
                                                            <span className="selectgroup-button">FEMENINO</span>
                                                        </label>
                                                        <label className="selectgroup-item">
                                                            <input type="radio" name="genero" value="Masculino" className="selectgroup-input-radio"/>
                                                            <span className="selectgroup-button">MASCULINO</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label className="info-title" htmlFor="password">Contraseña <span>*</span></label>
                                                    <input name="password" type="password" className="form-control unicase-form-control text-input" id="RegisterPassword" 
                                                    value={this.state.password} onChange={this.handleChange} />
                                                    {errors.password.length > 0 && 
                                                    <span className='error'>{errors.password}</span>}
                                                </div>

                                                <div className="form-group">
                                                    <label className="info-title" htmlFor="exampleInputEmail1">Confirmar Contraseña <span>*</span></label>
                                                    <input name="password_repeat" type="password" className="form-control unicase-form-control text-input"
                                                    id="exampleInputConfirmPassword" onChange={this.handleChange} />
                                                    {errors.password_repeat.length > 0 && 
                                                    <span className='error'>{errors.password_repeat}</span>}
                                                </div>

                                                <button id="btn-register" type="submit" className="btn-upper btn btn-primary checkout-page-button" 
                                                onClick={this.handleClick}>REGISTRARSE</button>
                                            </form>

                                        </div>
                                    </div>
                                </div>  
                            </div>  
                        </div>
                        <div id="banner-susc1" className="">
                            <a href="Suscripciones.html">
                                <img src={img_cint} className="img-responsive" alt="¡VENDE CON OFERTY!"/>
                            </a>
                        </div>
                    </div>
                </div>

                <Footer/>                

            </div>
        )
    }
}
export default Login;