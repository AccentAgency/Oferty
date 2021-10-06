import React, { Component } from 'react';

//Firebase
import config from '../../../config/config';
import {fire} from '../../../config/firebase';

import 'font-awesome/css/font-awesome.min.css';
import Menu from './Components/Menu';

//Imagen
import img_perfil from '../images/users/Avatar1.jpg';

//Configuracion Backend
import axios from "axios";


import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Footer from '../Administrador/Components/Footer';

const axiosInstance = axios.create({
    baseURL: config.backURL
});

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


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


class DatosSuscriptor extends Component{

    state = {
        dataUser : [], tienda:[]
    }

    constructor(props) {
        super(props);
        this.state = {name:'', phone: '', email:'',direccion:'',select_cord:'',select_location:'',open:false, openS:false, keyTienda:'', imagenTienda:'', logoTienda:'',
        loading:true, loading2:true, display:'none',
            errors: {
                name: '',
                email: '',
                direccion: '',
                phone: '',
                tienda:'',
                desc:'',
                descripcionTienda:''
            },
            dataUser: {
                Nombre:'',
                Tienda:'',
                DireccionCorta:'Agua Blanca',
                email:'',
                Descripcion_Tienda:'',
            },
            tienda: {
                Latitud:'',
                Longitud:'',
                Direccion:''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdateUser = this.handleUpdateUser.bind(this);
        this.handleLocation = this.handleLocation.bind(this);
    }

    //Obtener datos del usario
    getData(){
        fire.auth().onAuthStateChanged((user) =>{
            if(user){
                axiosInstance.get('/getUser/'+user.uid)
                .then(res => {
                  this.setState({...this.state.dataUser, dataUser:res.data});
                  this.setState({...this.state.keyTienda, keyTienda: res.data.Tienda});
                  this.setState({loading:false});

                  axiosInstance.get('/getTienda/'+ res.data.Tienda)
                  .then(res => {
                    this.setState({...this.state.tienda, tienda:res.data});
                    this.setState({...this.state.imagenTienda, imagenTienda: res.data.FotoReferencial});
                    this.setState({...this.state.logoTienda, logoTienda: res.data.ImagenLogo});
                    this.setState({loading2:false});
                    })
                })
                
            }
            else{

            }
        })
    }

    handleChange(event){
        const target = event.target;
        const value =  target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            dataUser: {
               ...this.state.dataUser,
               [name]: target.value
            }
         });

        //Validaciones
        let errors = this.state.errors;
    
        switch (name) {
        case 'Nombre': 
            errors.name = 
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

            case 'telefono':
            errors.phone =
                validPhone.test(value)
                ? ''
                : 'Ingrese un número de telefóno válido.';
            break;    
            
            case 'Tienda':
                errors.tienda =
                value.length === 0
                ? 'Favor ingrese un nombre válido para su tienda'
                : '' 
            break;

            case 'Descripcion_Tienda':
                errors.desc =
                value.length === 0
                ? 'Favor ingrese una descripcion valida para su tienda'
                : ''
            break;

            default:

        }
    
        this.setState({errors, [name]: value});
    }

    handleUpdateUser(event){
        event.preventDefault();
        if(!this.state.dataUser.Nombre|| !this.state.dataUser.Tienda || !this.state.dataUser.telefono){
            this.setState({open:true});
            this.setState({error: "Rellene todas los campos antes de actualizar su perfil"})
        }
        else{
            if(validateForm(this.state.errors)) {
                this.update(event);

            }else{
                this.setState({open:true});
                this.setState({error: "Verifique que no exista campo de advertencia antes de actualizar su perfil"})
                console.error('Invalid Form')
            }
        }
    }

    update(event){
        this.setState({display:'flex'});
        fire.auth().onAuthStateChanged((user) =>{
            if(user){
                axiosInstance.post('/updateSuscriptor', {
                    'id': user.uid,
                    'name' : this.state.dataUser.Nombre,
                    'phone': this.state.dataUser.telefono,
                    'direccion': this.state.tienda.Direccion,
                    'latitud': this.state.tienda.Latitud,
                    'longitud': this.state.tienda.Longitud,
                    'tienda': this.state.dataUser.Tienda,
                    'desc': this.state.dataUser.Descripcion_Tienda, 
                    'keyTienda': this.state.keyTienda,
                    'img_Log': this.state.logoTienda,
                    'img_Tien': this.state.imagenTienda
                }).then(res => {
                    this.setState({display:'none'});
                    this.setState({openS:true});
                    this.setState({success: "Datos actualizados correctamente"});
                })
                .catch(err => {
                    // handle error
                    console.log(err);
                    this.setState({display:'none'});
                    this.setState({open:true});
                    this.setState({error: "Ha ocurrido un error, favor intente más tarde."})
                })
            }
        })
    }

    
    handleLocation(event){
        const coord = event.target.value;
        let index = event.target.selectedIndex;
        const text = event.target.options[index].text;
        var coordenadas = (coord).split(',');


        this.setState({
            ...this.state,
            tienda: {
               ...this.state.tienda,
               Latitud: coordenadas[0],
               Longitud: coordenadas[1],
               Direccion: text
            }
         });

    }

    
    componentDidMount=() =>{
      this.getData();
    }


    render(){
        const {errors} = this.state;
        if(!this.state.dataUser) return <span>Cargando...</span>;
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
                     {this.state.success}
                    </Alert>
                </Snackbar>

                
                <div className="loader-page3" style={{display:this.state.display}}>
                    <div className="lds-ripple"><div></div><div></div></div>
                </div>


                {this.state.loading && this.state.loading2 ? (
                    <div className="loader-page-circle">
                        <div className="wrapper">
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
                    <div className="main-content">
                    <section id="admin" className="section">
                        <div className="section-body">
                            <div className="row mt-sm-4">
                                <div className="col-12 col-md-12 col-lg-4">
                                    <div className="card author-box">

                                        <div className="card-body">
                                            <div className="author-box-center">
                                                <img src={img_perfil} className="rounded-circle author-box-picture" alt="perfil"/>
                                                <div className="clearfix"></div>

                                                <div className="author-box-name">
                                                    <p id="Name_persona">{this.state.dataUser.Nombre}</p>
                                                </div>

                                                <div className="author-box-job">Suscripción Oferty</div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Resumen</h4>
                                        </div>

                                        <div className="card-body">
                                            <div className="py-4">
                                                <div className="clearfix">
                                                    <span className="float-left">
                                                        Telefono
                                                    </span>
                                                    <span id="tlf_resumen" className="float-right text-muted">
                                                        {this.state.dataUser.telefono}
                                                    </span>
                                                </div>

                                                <div className="clearfix">
                                                    <span className="float-left">
                                                        Correo Electronico
                                                    </span>
                                                    <span id="email_resumen" className="float-right text-muted">
                                                    {this.state.dataUser.CorreoElectronico}
                                                    </span>
                                                </div>

                                                <div className="clearfix">
                                                    <span className="float-left">
                                                        Facebook
                                                    </span>
                                                    <span className="float-right text-muted">
                                                    {this.state.dataUser.CorreoElectronico}
                                                    </span>
                                                </div>

                                                <div className="clearfix">
                                                    <span className="float-left">
                                                        Instagram
                                                    </span>
                                                    <span className="float-right text-muted">
                                                        <p>{this.state.dataUser.Nombre}</p>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                                <div className="col-12 col-md-12 col-lg-8">
                                    <div className="card">
                                        <div className="padding-20">
                                            <ul className="nav nav-tabs" id="myTab2" role="tablist">

                                                <li className="nav-item">
                                                    <a className="nav-link active" id="home-tab2" data-toggle="tab" href="#about" role="tab"
                                                    aria-selected="true">información</a>
                                                </li>

                                                <li className="nav-item">
                                                    <a className="nav-link" id="profile-tab2" data-toggle="tab" href="#settings" role="tab"
                                                    aria-selected="false">Configuración</a>
                                                </li>
                                            </ul>

                                            <div className="tab-content tab-bordered" id="myTab3Content">
                                                <div className="tab-pane fade show active" id="about" role="tabpanel" aria-labelledby="home-tab2">
                                                    <div className="row">
                                                        <div className="col-md-3 col-6 b-r">
                                                            <strong>Cédula/RIF</strong>
                                                            <br/>
                                                            <p id="Cedula_info" className="text-muted">{this.state.dataUser.Documentacion}</p>
                                                        </div>

                                                        <div className="col-md-3 col-6 b-r">
                                                            <strong>Télefono</strong>
                                                            <br/>
                                                            <p id="tlf_info" className="text-muted">{this.state.dataUser.telefono}</p>
                                                        </div>

                                                        <div className="col-md-3 col-6 b-r">
                                                            <strong>Correo Electrónico</strong>
                                                            <br/>
                                                            <p id="email_info" className="text-muted">{this.state.dataUser.CorreoElectronico}</p>
                                                        </div>

                                                        <div className="col-md-3 col-6">
                                                            <strong>Dirección</strong>
                                                            <br/>
                                                            <p id="direccion_info" className="text-muted">{this.state.dataUser.DireccionCorta}</p>
                                                        </div>
                                                    </div>

                                                    <div className="section-title">Información de Tienda/ Marca</div>

                                                    <ul>
                                                        <p><strong>Nombre: </strong><span id="name_marca">{this.state.dataUser.Tienda}</span></p>
                                                        <p><strong>Descripción: </strong><span id="detalles_marca">{this.state.dataUser.Descripcion_Tienda}</span></p>
                                                        <p><strong>Dirección: </strong><span id="direccion_marca">{this.state.dataUser.DireccionCorta}</span></p>
                                                    </ul>

                                                </div>


                                                <div className="tab-pane fade" id="settings" role="tabpanel" aria-labelledby="profile-tab2">
                                                    <form method="post" className="needs-validation" onSubmit={this.handleUpdateUser}>
                                                        <div className="card-header">
                                                            <h4>Editar Perfil</h4>
                                                        </div>

                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="form-group col-md-6 col-12">
                                                                    <label>Nombre Completo</label>
                                                                    <input id="name_edit" type="text" className="form-control" value={this.state.dataUser.Nombre}
                                                                   name="Nombre" onChange={this.handleChange}/>
                                                                    {errors.name.length > 0 && 
                                                                    <span className='error'>{errors.name}</span>}
                                                                </div>

                                                                <div className="form-group col-md-6 col-12">
                                                                    <label>Cédula/ RIF</label>
                                                                    <input id="ced_edit" type="text" className="form-control" value={this.state.dataUser.Documentacion}
                                                                    readOnly/>
                                                                    <div className="invalid-feedback"></div>
                                                                </div>

                                                                <div className="form-group col-md-6 col-12">
                                                                    <label>Nombre de la tienda</label>
                                                                    <input id="tienda_edit" type="text" className="form-control" 
                                                                    name="Tienda" value={this.state.dataUser.Tienda} onChange={this.handleChange}/>
                                                                    {errors.tienda.length > 0 && 
                                                                    <span className='error'>{errors.tienda}</span>}
                                                                </div>

                                                                <div className="form-group col-md-6 col-12">
                                                                    <label>Descripción de la tienda</label>
                                                                    <textarea id="tienda_edit" className="form-control" 
                                                                    name="Descripcion_Tienda" value={this.state.dataUser.Descripcion_Tienda} onChange={this.handleChange}/>
                                                                    {errors.descripcionTienda.length > 0 && 
                                                                    <span className='error'>{errors.descripcionTienda}</span>}
                                                                </div>

                                                                

                                                            </div>

                                                            <div className="row">

                                                                <div className="form-group col-md-7 col-12">
                                                                    <label>Email</label>
                                                                    <input id="email_edit" type="email" name="email" className="form-control" 
                                                                    defaultValue={this.state.dataUser.CorreoElectronico} readOnly/>
                                                                    <div className="invalid-feedback">
                                                                        Please fill in the email
                                                                    </div>
                                                                </div>

                                                                <div className="form-group col-md-5 col-12">
                                                                    <label>Télefono</label>
                                                                    <input id="tlf_edit" type="tel" name="telefono" className="form-control" 
                                                                    value={this.state.dataUser.telefono} onChange={this.handleChange}/>
                                                                    {errors.phone.length > 0 && 
                                                                    <span className='error'>{errors.phone}</span>}                                                                    
                                                                </div>
                                                            </div>


                                                            <div className="row">
                                                                <div className="form-group col-12">
                                                                    <label>Dirección</label>
                                                                    <select id="direccion" className="form-control text-input selectric" 
                                                                    onChange={this.handleLocation} value={this.state.tienda.Latitud+","+this.state.tienda.Longitud}>
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
                                                            </div>  

                                                            <div className="card-footer text-right">
                                                                <button id="btn_actualizar" className="btn btn-primary">Guardar Cambios</button>
                                                            </div>
                                                        </div>    
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="settingSidebar">
                        <button href="" className="settingPanelToggle"><i className="fa fa-spin fa-cog"></i></button>
                        <div className="settingSidebar-body ps-container ps-theme-default">
                            <div className=" fade show active">
                            <div className="setting-panel-header">Setting Panel</div>

                            <div className="p-15 border-bottom">
                                <h6 className="font-medium m-b-10">Select Layout</h6>
                                <div className="selectgroup layout-color w-50">
                                    <label className="selectgroup-item">
                                        <input type="radio" name="value" defaultChecked="1" className="selectgroup-input-radio select-layout"/>
                                        <span className="selectgroup-button">Light</span>
                                    </label>

                                    <label className="selectgroup-item">
                                        <input type="radio" name="value2" defaultChecked="2" className="selectgroup-input-radio select-layout"/>
                                        <span className="selectgroup-button">Dark</span>
                                    </label>
                                </div>
                            </div>
                            
                            <div className="p-15 border-bottom">
                                <h6 className="font-medium m-b-10">Sidebar Color</h6>

                                <div className="selectgroup selectgroup-pills sidebar-color">
                                    <label className="selectgroup-item">
                                        <input type="radio" name="icon-input" defaultChecked="1" className="selectgroup-input select-sidebar"/>
                                        <span className="selectgroup-button selectgroup-button-icon" data-toggle="tooltip"
                                        data-original-title="Light Sidebar"><i className="fa fa-sun"></i></span>
                                    </label>

                                    <label className="selectgroup-item">
                                        <input type="radio" name="icon-input" defaultChecked="2" className="selectgroup-input select-sidebar"/>
                                        <span className="selectgroup-button selectgroup-button-icon" data-toggle="tooltip"
                                        data-original-title="Dark Sidebar"><i className="fa fa-moon"></i></span>
                                    </label>
                                </div>
                            </div>

                            <div className="p-15 border-bottom">
                                <h6 className="font-medium m-b-10">Color Theme</h6>
                                <div className="theme-setting-options">
                                    <ul className="choose-theme list-unstyled mb-0">
                                        <li title="white" className="active">
                                            <div className="white"></div>
                                        </li>

                                        <li title="cyan">
                                            <div className="cyan"></div>
                                        </li>

                                        <li title="black">
                                            <div className="black"></div>
                                        </li>

                                        <li title="purple">
                                            <div className="purple"></div>
                                        </li>

                                        <li title="orange">
                                            <div className="orange"></div>
                                        </li>

                                        <li title="green">
                                            <div className="green"></div>
                                        </li>
                                        
                                        <li title="red">
                                            <div className="red"></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>


                            <div className="p-15 border-bottom">
                                <div className="theme-setting-options">
                                    <label className="m-b-0">
                                        <input type="checkbox" name="custom-switch-checkbox" className="custom-switch-input"
                                        id="mini_sidebar_setting"/>
                                        <span className="custom-switch-indicator"></span>
                                        <span className="control-label p-l-10">Mini Sidebar</span>
                                    </label>
                                </div>
                            </div>

                            <div className="p-15 border-bottom">
                                <div className="theme-setting-options">
                                    <label className="m-b-0">
                                        <input type="checkbox" name="custom-switch-checkbox" className="custom-switch-input"
                                        id="sticky_header_setting"/>
                                        <span className="custom-switch-indicator"></span>
                                        <span className="control-label p-l-10">Sticky Header</span>
                                    </label>
                                </div>
                            </div>

                            <div className="mt-4 mb-4 p-3 align-center rt-sidebar-last-ele">
                                <button href="#" className="btn btn-icon icon-left btn-primary btn-restore-theme">
                                    <i className="fa fa-undo"></i> Restore Default
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                </div>
                <Footer></Footer>
                </div>
                )}

                
            </div>
         
        )
    }

}


export default DatosSuscriptor;