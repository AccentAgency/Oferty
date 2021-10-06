import React, { Component } from 'react';
import Menu from './Components/Menu';

import config from '../../../config/config';
import {fire} from '../../../config/firebase';
import axios from "axios";

//Importar imagen
import img from '../images/prod.png';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import swal from 'sweetalert';

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

class ModificarPublicacion extends Component{

    constructor(props){
        super(props);
        this.state = {
            id_pub: this.props.match.params.id, stateLunes:false, stateMartes:false, stateMier:false, stateJuev:false, stateViern:false, campBelleza: false, displayImage:'none',
            campSalud: false, campComida:false, campDolar:false, imagenes:'No Disponible', imagen2:"No Disponible", imagen3:"No Disponible", open:false, openS:false,
            stateSab:false, stateDom:false,
            detallesPub:{
                Titulo:'',
                Descripcion:'',
                Categoria:'Seleccione Categoria',
                Stock:'',
                Uso:'Selecciona',
                Oferta:'',
                Incluye:'No disponible',
                NoIncluye:'No disponible',
                Consid:'No disponible',
                Contraind:'No disponible',
                ImagenPrincipal:'No disponible',
                ImagenSecundaria:'No disponible',
                ImagenTercera:'No disponible',
                Comentario:'',
                Detalles:'',
                Fecha_Vencimiento:''
            },
            errors:{
                Titulo:'',
                Descripcion:'',
                Oferta:''
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

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
        this.handleChangeImagen1 = this.handleChangeImagen1.bind(this);
        this.handleChangeImagen2 = this.handleChangeImagen2.bind(this);
        this.handleChangeImagen3 = this.handleChangeImagen3.bind(this);
        this.changePublicacion = this.changePublicacion.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    //Obtener datos modificar
    getPublicacion(){
        axiosInstance.get('getDetailPublicacion/'+this.state.id_pub).then(res => {
            this.setState({...this.state.detallesPub, detallesPub: res.data })
            this.setState({...this.state.imagenes, imagenes: res.data.ImagenPrincipal});
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

            if(res.data.ImagenPrincipal === "No Disponible"){
                this.setState({
                    ...this.state,
                    detallesPub: {
                       ...this.state.detallesPub,
                       ImagenPrincipal: img
                    }
                });
            }
            else{
                this.setState({
                    ...this.state,
                    detallesPub: {
                       ...this.state.detallesPub,
                       ImagenPrincipal: res.data.ImagenPrincipal
                    }
                });
            }

            if(res.data.ImagenSecundaria === "No Disponible"){
                this.setState({
                    ...this.state,
                    detallesPub: {
                       ...this.state.detallesPub,
                       ImagenSecundaria: img
                    }
                });
            }
            else{
                this.setState({
                    ...this.state,
                    detallesPub: {
                       ...this.state.detallesPub,
                       ImagenSecundaria: res.data.ImagenSecundaria
                    }
                });
            }

            if(res.data.ImagenTercera === "No Disponible"){
                this.setState({
                    ...this.state,
                    detallesPub: {
                       ...this.state.detallesPub,
                       ImagenTercera: img
                    }
                });
            }
            else{
                this.setState({
                    ...this.state,
                    detallesPub: {
                       ...this.state.detallesPub,
                       ImagenTercera: res.data.ImagenTercera
                    }
                });
            }
        })
    }

    handleChange(event){
        const target = event.target;
        const value =  target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            detallesPub: {
               ...this.state.detallesPub,
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

        case 'Descripcion': 
            errors.Descripcion= 
            value.length === 0
                ? 'Favor ingresar una descripción válida para el cupón.'
                : '';
        break;

        
        case 'Oferta': 
            errors.Oferta= 
            value.length === 0
                ? 'Favor ingresar un precio de ahorro para el cupón.'
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



    handleChangeImagen1(event){


        this.setState({
            ...this.state,
            detallesPub:{
                ...this.state.detallesPub,
                ImagenPrincipal: URL.createObjectURL(event.target.files[0])
            },
            displayImage:'flex'

        });

        //Subimos imagen en firebase
        const formData = new FormData();
        formData.append('image',event.target.files[0]);
        axiosInstance.post('/uploadImage', formData,{

        }).then(res => {
            this.setState({imagenes: res.data});
            this.setState({displayImage:'none'})
        })
        .catch((error) => {
            swal.fire({title:"Ha ocurrido un error en subir la imagen",text:"Favor refresque la página e intente de nuevo.",icon:"error",confirmButtonText: "Aceptar"});
        })

    }

    handleChangeImagen2(event){

        this.setState({
            ...this.state,
            detallesPub:{
                ...this.state.detallesPub,
                ImagenSecundaria: URL.createObjectURL(event.target.files[0])
            },
            displayImage:'flex'

        });

        //Subimos imagen en firebase
        const formData = new FormData();
        formData.append('image',event.target.files[0]);
        axiosInstance.post('/uploadImage', formData,{

        }).then(res => {
            this.setState({imagen2: res.data});
            this.setState({displayImage:'none'});
        })
        .catch((error) => {
            swal({title:"Ha ocurrido un error en subir la imagen",text:"Favor verifique su conexión a internet e intente de nuevo.",icon:"error",confirmButtonText: "Aceptar"});
        })
    }

    handleChangeImagen3(event){
        this.setState({
            ...this.state,
            detallesPub:{
                ...this.state.detallesPub,
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
            swal({title:"Ha ocurrido un error en subir la imagen",text:"Favor verifique su conexión a internet e intente de nuevo.",icon:"error",confirmButtonText: "Aceptar"});
        })
    }

    changePublicacion(event){
        event.preventDefault();

        if(!this.state.detallesPub.Titulo || !this.state.detallesPub.Descripcion || !this.state.detallesPub.Oferta || !this.state.detallesPub.Detalles){
            this.setState({open:true});
            this.setState({error: "Rellene todas los campos antes de Crear el cupón"});
        }
        else if(this.state.detallesPub.Categoria === "Seleccione Categoria"){
            this.setState({open:true});
            this.setState({error: "Favor seleccione una categoría para su cupón"});
        }
        else if(this.state.detallesPub.Uso === "Selecciona"){
            this.setState({open:true});
            this.setState({error: "Favor seleccione disponibilidad de su cupón"});
        }
        else if (this.state.stateLunes === false && this.state.stateMartes === false && this.state.stateMier === false && this.state.stateJuev === false &&
        this.state.stateViern === false && this.state.stateSab === false && this.stateDom === false){
            this.setState({open:true});
            this.setState({error: "Favor seleccione al menos un día para su cupón"});
        }
        else{
            if(validateForm(this.state.errors)) {
                console.log(this.state.imagen);
                fire.auth().onAuthStateChanged((user) =>{
                    if(user){
                        axiosInstance.post('/updatePublicacion',{
                            'id_pub': this.state.id_pub,
                            'catg' : this.state.detallesPub.Categoria, 
                            'consid': this.state.detallesPub.Consid,
                            'contraind': this.state.detallesPub.Contraind, 
                            'desc': this.state.detallesPub.Descripcion, 
                            'lunes': this.state.DstateLunes, 
                            'martes': this.state.DstateMartes, 
                            'mier' : this.state.DstateMier, 
                            'jueves': this.state.DstateJuev, 
                            'viern' : this.state.DstateViern, 
                            'sabado': this.state.DstateSab, 
                            'dom': this.state.DstateDom, 
                            'id_user': user.uid, 
                            'imgPrin': this.state.imagenes, 
                            'imgSec': this.state.imagen2 ,
                            'imgTerc': this.state.imagen3,
                            'incl' : this.state.detallesPub.Incluye, 
                            'noInc': this.state.detallesPub.NoIncluye,
                            'plazo': this.state.detallesPub.Uso + ' días',
                            'stock': this.state.detallesPub.Stock, 
                            'titulo': this.state.detallesPub.Titulo,
                            'campBelleza': this.state.DcampBelleza, 
                            'campComida': this.state.DcampComida, 
                            'campSalud' : this.state.DcampSalud, 
                            'campTodoDolar' : this.state.DcampDolar,
                            'ahorro': this.state.detallesPub.Oferta,
                            'detalles': this.state.detallesPub.Detalles,
                            'fechaVen': this.state.detallesPub.Fecha_Vencimiento
                        }).then(res => {
                            this.setState({openS: true});
                        })
                        .catch((error) => {
                            this.setState({open:true});
                            this.setState({error: "Ha ocurrido un error verifique su conexión a internet o intente de nuevo más tarde."});
                        })
                    }
                })


            }
        } 
    }

    componentDidMount = () =>{
        this.getPublicacion();
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
                     Publicación modificada correctamente. ¡Gracias por preferirnos!
                    </Alert>
                </Snackbar>

                <div class="loader-page3" style={{display:this.state.displayImage}}>
                    <div class="lds-ripple"><div></div><div></div></div>
                    <h4> Subiendo Imagen... </h4>
                </div>


                <div id="ModificarPub" className="main-content">
                    <section className="section">
                        <div className="section-body">

                            <div className="row">
                                <div className="col-12 col-md-8 col-lg-8 col-center">
                                    <div className="card card-error">
                                        <div className="card-header">
                                            <h4 id="comentario_rechazo">Comentario del rechazo</h4>
                                        </div>

                                        <div className="card-body">
                                            <p id="comentario_rech">{this.state.detallesPub.Comentario}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 col-md-8 col-lg-8 col-center">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Detalles de la publicación</h4>
                                        </div>

                                        <div className="card-body">
                                            <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                                                <div className="imagen_cupon col-md-4">
                                                    <div id="image-preview" className="image-preview" style={{backgroundImage:`url(${this.state.detallesPub.ImagenPrincipal})`}}>
                                                        <label htmlFor="image-upload" id="image-label">Modificar</label>
                                                        <input type="file" name="image" id="image-upload" onChange={this.handleChangeImagen1}/>
                                                    </div>
                                                </div>

                                                <div className="col-md-8 col-xs-12 col-12 pull-right">
                                                    <h4 id="Titulo_cupon"> </h4>
                                                    
                                                    <div className="row">
                                                        <div className="form-group col-md-6 col-12">
                                                            <label>Titulo del cupón</label>
                                                            <input name="Titulo" id="tit_ofer" type="text" className="form-control" value={this.state.detallesPub.Titulo}
                                                            onChange={this.handleChange}/>
                                                            {errors.Titulo.length > 0 && 
                                                            <span className='error'>{errors.Titulo}</span>}  
                                                        </div>

                                                        <div className="form-group col-md-6 col-12">
                                                            <label>Detalles</label>
                                                            <input name="Detalles" id="tit_ofer" type="text" className="form-control" value={this.state.detallesPub.Detalles}
                                                            onChange={this.handleChange}/>
                                                            {errors.Titulo.length > 0 && 
                                                            <span className='error'>{errors.Titulo}</span>}  
                                                        </div>

                                                        <div className="form-group col-md-6 col-12">
                                                            <label>Descripción</label>
                                                            <input id="desc_ofer" type="text" className="form-control" value={this.state.detallesPub.Descripcion}
                                                            name="Descripcion" onChange={this.handleChange}/>
                                                            {errors.Descripcion.length > 0 && 
                                                            <span className='error'>{errors.Descripcion}</span>}  
                                                        </div>

                                                        <div className="form-group col-md-6 col-12">
                                                            <label>Categoría</label>
                                                            <select name="Categoria" id="categoria" className="form-control" value={this.state.detallesPub.Categoria} 
                                                            onChange={this.handleChange}>
                                                                <option value="Seleccione Categoria">Seleccione Categoria </option>
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

                                                        <div className="form-group col-md-6 col-12">
                                                            <label>Stock del producto</label>
                                                            <input name="Stock" id="stock" type="text" className="form-control" value={this.state.detallesPub.Stock} 
                                                            onChange={this.handleChange}/>
                                                        </div>

                                                        <div className="form-group col-md-6 col-12">
                                                            <label>Dias</label>
                                                            <div id="CheckBox_val" className="form-row form-checkbox" onChange={this.handleChangeCheckbox}>
                                                                <div className="form-group col-md-4">
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

                                                        <div className="form-group col-md-6 col-12">
                                                            <label>Plazo de Uso</label>
                                                            <select id="inputUso" className="form-control selectric" name="Uso"
                                                            value={(this.state.detallesPub.Uso).substring(0,1)} onChange={this.handleChange}>
                                                                <option value="0">Selecciona...</option>
                                                                <option value="1">1 Día</option>
                                                                <option value="2">2 Días</option>
                                                                <option value="3">3 Días</option>
                                                                <option value="4">4 Días</option>
                                                                <option value="5">5 Días</option>
                                                                <option value="6">6 Días</option>
                                                                <option value="7">7 Días</option>
                                                                <option value="8">8 Días</option>
                                                                <option value="9">9 Días</option>
                                                                <option value="10">10 Días</option>
                                                                <option value="11">11 Días</option>
                                                                <option value="12">12 Días</option>
                                                                <option value="13">13 Días</option>
                                                                <option value="14">14 Días</option>
                                                                <option value="15">15 Días</option>
                                                                <option value="16">16 Días</option>
                                                                <option value="17">17 Días</option>
                                                                <option value="18">18 Días</option>
                                                                <option value="19">19 Días</option>
                                                                <option value="20">20 Días</option>
                                                                <option value="21">21 Días</option>
                                                                <option value="22">22 Días</option>
                                                                <option value="23">23 Días</option>
                                                                <option value="24">24 Días</option>
                                                                <option value="25">25 Días</option>
                                                                <option value="26">26 Días</option>
                                                                <option value="27">27 Días</option>
                                                                <option value="28">28 Días</option>
                                                                <option value="29">29 Días</option>
                                                                <option value="30">30 Días</option>
                                                            </select>
                                                        </div>

                                                    <div className="form-group col-md-6 col-12">
                                                        <label>Ahorro de la Oferta</label>
                                                        <input name="Oferta" id="PrecioNormal" type="text" className="form-control" value={this.state.detallesPub.Oferta}
                                                        onChange={this.handleChange}/>
                                                        {errors.Oferta.length > 0 && 
                                                        <span className='error'>{errors.Oferta}</span>}  
                                                    </div>

                                                    <div className="form-group col-md-6 col-12">
                                                        <label>Incluye</label>
                                                        <input name="Incluye" id="incluye" type="text" className="form-control" value={this.state.detallesPub.Incluye}
                                                        onChange={this.handleChange}/>
                                                    </div>
                                                    
                                                    <div className="form-group col-md-6 col-12">
                                                        <label>Fecha de Cierre</label>
                                                        <input name="Fecha_Vencimiento" className="form-control" type="datetime-local" id="hora" 
                                                        value={this.state.detallesPub.Fecha_Vencimiento} onChange={this.handleChange}/>
                                                    </div>   

                                                    <div className="form-group col-md-6 col-12">
                                                        <label>No Incluye</label>
                                                        <input name="NoIncluye" id="no_incluye" type="text" className="form-control" value={this.state.detallesPub.NoIncluye}
                                                        onChange={this.handleChange}/>
                                                    </div>

                                                    <div className="form-group col-md-6 col-12">
                                                        <label>Consideraciones</label>
                                                        <input name="Consid" id="consider" type="text" className="form-control" value={this.state.detallesPub.Consid}
                                                        onChange={this.handleChange}/>
                                                    </div>

                                                    <div className="form-group col-md-6 col-12">
                                                        <label>Contraindicación</label>
                                                        <input name="Contraind" id="contra" type="text" className="form-control" value={this.state.detallesPub.Contraind}
                                                        onChange={this.handleChange}/>
                                                    </div>

                                                    <div className="form-group col-md-6 col-12">
                                                        <label>Campaña Solicitadas</label>
                                                        <div id="CheckBox_Campa" className="form-row form-checkbox">
                                                            <div className="form-group col-md-6">
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
                                        </div>
                                    </div>

                                        <div className="card-footer text-right">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 col-md-8 col-lg-8 col-center">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Imagenes de la oferta</h4>
                                        </div>

                                        <div className="card-body">
                                            <div className="gallery gallery-md">
                                                <div className="form-group col-md-3">
                                                    <div id="image-preview2" className="image-preview" style={{backgroundImage:`url(${this.state.detallesPub.ImagenSecundaria})`}}>
                                                        <label htmlFor="image-upload3" id="image-label3">Modificar</label>
                                                        <input type="file" name="image" id="image-upload3" onChange={this.handleChangeImagen2}/>
                                                    </div>
                                                </div>

                                                <div className="form-group col-md-3">
                                                    <div id="image-preview3" className="image-preview" style={{backgroundImage:`url(${this.state.detallesPub.ImagenTercera})`}}>
                                                        <label htmlFor="image-upload4" id="image-label4">Modificar</label>
                                                        <input type="file" name="image" id="image-upload4" onChange={this.handleChangeImagen3}/>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>

                    <div className="footer_btn col-md-4 col-lg-4 col-center">
                        <div className="acept_btn">
                            <button id="Btn_Publicacion" className="btn btn-primary" onClick={this.changePublicacion}>Enviar Publicación</button>
                        </div>
                    </div>
                </div>
            </div>
   

        )
    }
}

export default ModificarPublicacion;