import React, { Component } from 'react';
import './css/Formulario.css';

import Collapsible from 'react-collapsible';

//Configuracion Backend
import config from '../../config/config';
import axios from "axios";

//Base de datos fronted Authentication Firebase
import {fire} from '../../config/firebase';

//Imagenes
import transf from './images/iconos/transf.png';
import smart from './images/iconos/smartphone.png';
import paypal from './images/iconos/paypal.png';
import banesco from './images/bancos/banesco.jpg';
import bicent from './images/bancos/bicentenario.jpeg';
import bod from './images/bancos/bod.png';
import mercant from './images/bancos/mercantil.jpg';
import venez from './images/bancos/venezu.png';
import prov from './images/bancos/provincial.png';
import {ProductConsumer} from './Functions/CartFunction';
import logo from './images/iconos/isologo.png';
import arrow from './images/iconos/arrow.svg';
import swal from 'sweetalert';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Header from './Header';
import Footer from './Footer';



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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};



class FormularioCompra extends Component{
    state={
        emailPaypal:''
    }

    constructor(props)
    {
        super(props);
        
        this.state = {isBanco:"", isPago:"",name:'', email:'', phone:'',cedula:'',direccion:'', nameFile:'', file:'',rotate: 'rotate(0deg)', rotate2: 'rotate(0deg)',
                      numRef:'',emailPaypal:'',phonePagoMovil:'', errorMsg:'', open:false, montoTotal:0, montoBsS:0, tasaDolar:0, imagen:"No Disponible", displayImage:'none',
            errors: {
                name: '',
                email: '',
                password: '',
                phone: '',
                cedula:'',
                direccion: '',
                numRef:'',
                emailPaypal:'',
                phonePagoMovil:''
            }
        }
        this.handleTransf = this.handleTransf.bind(this);
        this.handleBanesco = this.handleBanesco.bind(this);
        this.handleProvincial = this.handleProvincial.bind(this);
        this.handleBicent = this.handleBicent.bind(this);
        this.handleMercantil = this.handleMercantil.bind(this);
        this.handleVenz = this.handleVenz.bind(this);
        this.handleBOD = this.handleBOD.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose= this.handleClose.bind(this);
        this.handleOpen2 = this.handleOpen2.bind(this);
        this.handleClose2= this.handleClose2.bind(this);
        this.handlesendPay = this.handlesendPay.bind(this);
        this.cambiarNombre = this.cambiarNombre.bind(this);
        this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);

        //OnChange para Input
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeBancos = this.handleChangeBancos.bind(this);
        

    }

    handlesendPay(cart, total){
        let pago = this.state.isPago;

        if(!this.state.name && !this.state.phone && !this.state.cedula && !this.state.direccion && !this.state.email && !this.state.isPago
            && !this.state.file){
            this.setState({errorMsg: "Favor rellene el formulario de pago para comprar sus cupones."})
            this.setState({open:true});
        }
        else if(!this.state.name || !this.state.phone || !this.state.cedula || !this.state.direccion || !this.state.email){
            this.setState({errorMsg: "Favor rellene todos los datos personales para la facturación."})
            this.setState({open:true});
        }
        else if(!this.state.isPago){
            this.setState({errorMsg: "Favor seleccione el método de pago de su comodidad."})
            this.setState({open:true});
        }
        else if((pago === "Transferencia") && (!this.state.isBanco)){
            this.state({errorMsg: "Favor seleccione el banco donde desea realizar su transacción"});
            this.setState({open:true});
        }
        else if((pago === "Transferencia") && !this.state.numRef){
            this.setState({errorMsg: "Favor ingrese un número de referencia."})
            this.setState({open:true});
        }
        else if((pago === "Paypal") && !this.state.emailPaypal){
            this.setState({errorMsg: "Favor ingrese un correo electrónico para el pago."})
            this.setState({open:true});
        }
        else if((pago === "Pago Movil") && !this.state.phonePagoMovil){
            this.setState({errorMsg: "Favor ingrese número telefonico en el registro de pago."})
            this.setState({open:true});
        }
        else if(!this.state.file){
            this.setState({errorMsg: "Favor seleccione un documento o imagen con el comprobante de la transacción."})
            this.setState({open:true});
        }
        else{
            let value = cart;
            let item =[];
            if(validateForm(this.state.errors)){
                if(value.length !== 0){
                    value.forEach(function(prod){
                        item.push(prod);
                        return item;
                    })

                    let pago ='';
                    //Tipo de pago
                    if(this.state.isPago === "Transferencia"){
                        pago = this.state.numRef;
                    }
                    else if(this.state.isPago === "Paypal"){
                        pago = this.state.emailPaypal;
                    }
                    else if(this.state.isPago === "Pago Movil"){
                        pago = this.state.phonePagoMovil;
                    }

                    fire.auth().onAuthStateChanged((user) =>{
                        if(user){
                            var value_total = total;
                            var total_bss = value_total * this.state.tasaDolar;
                            var bss_formato= new Intl.NumberFormat(["ban", "id"]).format(total_bss);

                            axiosInstance.post('/sendPayForm',{
                                'id_user': user.uid,
                                'cupones': item,
                                'metodo': this.state.isPago,
                                'cedula': this.state.cedula, 
                                'direccion': this.state.direccion,
                                'email': this.state.email, 
                                'nombre': this.state.name, 
                                'telefono': this.state.phone, 
                                'datoPago': pago, 
                                'totalBss': bss_formato, 
                                'totalDol': value_total,
                                'urlDoc': this.state.imagen
                            })
                            .then(res =>{
 
                                swal({title:"¡El pago ha sido registrado correctamente!", text:"En los proximos minutos nos contactaremos con usted.",icon:'success'}).then((value) =>{
                                    localStorage.setItem('Cart', JSON.stringify([]));
                                    this.props.history.push('/');
                                    window.location.reload();
                                });
                                    
                                    
                              
                            })
                            .catch((error) => {
                                swal({title:"Ha ocurrido un error",text:"Verifique su conexión a internet o intente de nuevo más tarde.",icon:"error",confirmButtonText: "Aceptar"});
                            })
                        }
                    })
                }
                else{
                    this.setState({errorMsg: "No hay ningun producto en el carrito, regrese a Oferty y elija algun cupón."})
                    this.setState({open:true});
                }
            }
            else{
                this.setState({errorMsg: "Favor corrija los campos marcados con error."})
                this.setState({open:true});
            }
        }



    }

    cambiarNombre(e){
        
        this.setState({nameFile: e.target.files[0].name})
        this.setState({file:e.target.files[0], displayImage:'flex'});

        //Subimos imagen en firebase
        const formData = new FormData();
        formData.append('image',e.target.files[0]);
        if(e.target.files[0].size > 5242880){
            this.setState({displayImage:'none', open:true, errorMsg:"Favor suba un documento y/o imagen que pese menos de 5MB", nameFile:'', file:''})
        }
        else{
            axiosInstance.post('/uploadImagePay', formData,{

            }).then(res => {
                this.setState({imagen: res.data, displayImage:'none'});
            })
        }


    
    }

    //Valores de input
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

            case 'phone':
                errors.phone =
                validPhone.test(value)
                ? ''
                : 'Ingrese un número de telefóno válido.';
            break;
            
            case 'cedula':
                errors.cedula =
                value.length > 6
                ? ''
                : 'Favor ingresar una cédula o RIF válido.';
            break;

            case 'direccion':
                errors.direccion =
                value.length === 0
                ? 'Favor ingresar una dirección válida.'
                : '';
            break;
            
            default:
            break;
        }

        this.setState({errors, [name]: value});
    }

    handleChangeBancos(event){
        const target = event.target;
        const value =  target.value;
        const name = target.name;
    
        this.setState({
        [name]: value
        });

        //Validaciones
        let errors = this.state.errors;

        switch (name) {
            case 'numRef':
                errors.numRef = 
                value.length < 6
                    ? 'Favor ingresar un número de referencia válido.'
                    : '';
            break;

            case 'emailPaypal':
                errors.emailPaypal = validEmailRegex.test(value)
                ? ''
                : 'Correo electrónico inválido.';
            break;

            case 'phonePagoMovil':
                errors.phonePagoMovil =
                validPhone.test(value)
                ? ''
                : 'Ingrese un número de telefóno válido.';
            break;

            default:
            break;
        }

        this.setState({errors, [name]: value});
    }
    

    handleTransf(){
        this.setState({...this.state.isPago, isPago:'Transferencia'});
    }

    handlePaypal(){
        this.setState({...this.state.isPago, isPago:'Paypal'});
    }

    handlePagoMovil(){
        this.setState({...this.state.isPago, isPago:'Pago Movil'});
    }

    handleBanesco(){
        this.setState({...this.state.isBanco, isBanco:'Banesco'});

    }

    handleMercantil(){
        this.setState({...this.state.isBanco, isBanco:'Mercantil'});

    }

    handleBicent(){
        this.setState({...this.state.isBanco, isBanco:'Bicentenario'});
    }

    handleVenz(){
        this.setState({...this.state.isBanco, isBanco:'Venezuela'});

    }

    handleProvincial(){
        this.setState({...this.state.isBanco, isBanco:'Provincial'});
    }

    handleBOD(){
        this.setState({...this.state.isBanco, isBanco:'BOD'});
       
    }

    handleOpen(){
        this.setState({...this.state.rotate, rotate:'rotate(180deg)'});
    }

    handleClose(){
        this.setState({...this.state.rotate, rotate:'rotate(0deg)'});
    }

    handleOpen2(){
        this.setState({...this.state.rotate2, rotate2:'rotate(180deg)'});
    }

    handleClose2(){
        this.setState({...this.state.rotate2, rotate2:'rotate(0deg)'});
    }

    handleCloseSnackbar(event,reason){
        if (reason === 'clickaway') {
            return;
        }
        
        this.setState({...this.state.open, open:false});

    }

    checkPay(){
        var value = this.context.total;
        this.setState({...this.state.montoTotal, montoTotal:value})

        axiosInstance.get('/tasaDolar').then(res => {
            var precioDolar = parseInt(res.data.Precio);
            var total_bss = this.state.montoTotal * precioDolar;
            var bss_formato= new Intl.NumberFormat(["ban", "id"]).format(total_bss);
            this.setState({...this.state.montoBsS, montoBsS: bss_formato});
            this.setState({...this.state.tasaDolar, tasaDolar:precioDolar});
        })
    }


    componentDidMount=() =>{
        this.checkPay();    
       
    }


    render(){
        const isPago = this.state.isPago;
        const isBanco = this.state.isBanco;
        const nameFile = this.state.nameFile;
        const {errors} = this.state;
        const emailPaypal =this.state.emailPaypal;
        return(
            <div className="body-content outer-top-ts">

                <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleCloseSnackbar} severity="error">
                     {this.state.errorMsg}
                    </Alert>
                </Snackbar>

                <Header/>

                <div className="loader-page3" style={{display:this.state.displayImage}}>
                    <div className="lds-ripple"><div></div><div></div></div>
                    <h4> Subiendo Imagen... </h4>
                </div>

                <div id="FormularioCompra" className="container">
                    <div className="row">
                    {/*-- ============================ DATOS PARA LA FACTURACION ============================== -- */}
                        <div className= "col-xs-12 col-sm-12 col-md-8">
                            <div className = "card">
                                <div className="card offset-3 tiendas-form">
                                    {/*-- ============================ FORMULARIO DE FACTURA ============================== -- */}
                                    <Collapsible onOpen={this.handleOpen2} onClose={this.handleClose2} trigger={["Paso 1 : Datos de facturación", 
                                        <img className="arrow" alt="arrow" width="20px" src={arrow} style={{transform:this.state.rotate2}} ></img>]}>

                                            <div className="Grupo-Input col-sm-6 col-md-12">
                                                <div className="wrap-input100 validate-input bg1" data-validate="Please Type Your Name">
                                                    <span className="label-input100">NOMBRE COMPLETO *</span>
                                                    <input id="NombreCliente" className="input100" type="text" name="name" placeholder="Ingrese su nombre y apellido" 
                                                    value={this.state.name} onChange={this.handleChange}/>
                                                </div>
                                                <span className='error'>{errors.name}</span>
                                            </div>    

                                            <div className="Grupo-Input col-sm-6 col-md-6 col-xs-12">
                                                <div className="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate = "Enter Your Email (e@a.x)">
                                                    <span className="label-input100">Email *</span>
                                                    <input id="EmailCliente" className="input100" type="text" name="email" placeholder="Ingrese su Correo Electronico" 
                                                    value={this.state.email} onChange={this.handleChange}/>
                                                </div>
                                                {errors.email.length > 0 && 
                                                <span className='error'>{errors.email}</span>}
                                            </div>

                                            <div className="Grupo-Input col-sm-6 col-md-6 col-xs-12">
                                                <div className="wrap-input100 bg1 rs1-wrap-input100">
                                                    <span className="label-input100">Télefono</span>
                                                    <input id="TelefonoCliente" className="input100" type="text" name="phone" placeholder="Ingrese su numero telefonico" 
                                                    value={this.state.phone} onChange={this.handleChange}/>
                                                </div>
                                                {errors.phone.length > 0 && 
                                                <span className='error'>{errors.phone}</span>}
                                            </div>

                                            <div className="Documento">

                                                <div id="contenedor_ced" className="Grupo-Input col-sm-6 col-md-3 col-xs-4">
                                                    <div className="wrap-input50 validate-input bg1 rs1-wrap-input100">
                                                        <span id="tipo_ced0" className="label-input100">Tipo *</span>
                                                        <select id="tipo_ced" className="form-control">
                                                            <option>V</option>
                                                            <option>E</option>
                                                            <option>J</option>
                                                            <option>G</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="Grupo-Input col-sm-6 col-md-6 col-xs-8">
                                                    <div className="wrap-input100 validate-input bg1 rs1-wrap-input100">
                                                        <span className="label-input100">Documento *</span>
                                                        <input id="Documento" className="input100" type="text" name="cedula" placeholder="Ingrese su documento" 
                                                        value={this.state.cedula} onChange={this.handleChange}/>
                                                    </div>
                                                    {errors.cedula.length > 0 && 
                                                    <span className='error'>{errors.cedula}</span>}
                                                </div>

                                            </div>

                                            <div className="Grupo-Input input-direccion col-sm-6 col-md-12">
                                                <div className="wrap-input100 validate-input bg0" data-validate="Please Type Your Name">
                                                <span className="label-input100">DIRECCIÓN</span>
                                                <textarea id="Direccion" className="input100" name="direccion" placeholder="Dirección..." value={this.state.direccion}
                                                onChange={this.handleChange}></textarea>
                                                </div>
                                                {errors.direccion.length > 0 && 
                                                <span className='error'>{errors.direccion}</span>}
                                            </div>

                                    </Collapsible>

                                    
                                </div>

                                <div className="card offset-3 tiendas-form tarjeta">
                                    <Collapsible onOpen={this.handleOpen} onClose={this.handleClose} trigger={["Paso 2: Registro de Pago", 
                                    <img className="arrow" alt="arrow" width="20px" src={arrow} style={{transform:this.state.rotate}}></img>]}>
                                        <div id="Content" className="content content2">
                                            

                                            <ProductConsumer>            
                                                {value => {
                                                    var total_bss = 0;
                                                    total_bss = value.total * this.state.tasaDolar;
                                                    var bss_formato= new Intl.NumberFormat(["ban", "id"]).format(total_bss);
                                                    return(
                                                        
                                                        <div className="caja">
                                                            Total a Pagar
                                                            <br/>
                                                            <span id="TotalDolaresPago">$ {value.total}</span><span> / </span><span id="TotalBolivaresPago">{bss_formato}</span>
                                                        </div>
                                                    )
            
                                                }}
                                            </ProductConsumer>  

                                            {/*-- =================================== OPCIONES METODOS DE PAGO ============================ --*/}
                                            <div id="Pagos" className="Pagos">
               
                                                <button id="Tranferencia" className="btn Tranf pago" value="Transferencia" onClick={() => this.handleTransf()}><img src={transf} alt="Transferencia" width='30px'/>Transferencia<br/> Bancaria</button>

                                                <div className="MetodoDePago">
                                                    <button id="Paypal" className="btn paypal pago" value="Paypal" onClick={() => this.handlePaypal()}><img src={paypal} alt="Paypal" width='80px'/></button>
                                                </div>

                                                <button id="PagoMovil" className="btn Tranf pago" value="PagoMovil" onClick={() => this.handlePagoMovil()}><img src={smart} alt="Pago Móvil" width='30px'/>Pago Movil</button>

                                            </div>
                                            <ProductConsumer>            
                                                {value => {
                                                    var total_bss = value.total * this.state.tasaDolar;
                                                    return(
                                                        <div>
                                                            <Pago cambiarNombre={this.cambiarNombre} isPago ={isPago} nameFile={nameFile} emailPaypal={emailPaypal} errors={errors} 
                                                            phonePagoMovil={this.state.phonePagoMovil} handleMercantil={this.handleMercantil} handleProvincial={this.handleProvincial} 
                                                            handleVenz={this.handleVenz} handleBOD = {this.handleBOD} handleBanesco = {this.handleBanesco} handleBicent={this.handleBicent} 
                                                            handleChangeBancos={this.handleChangeBancos} montoBsS={total_bss} montoDolares={value.total} />

                                                            <TipoBanco isBanco={isBanco} isPago ={isPago} errors={errors} handleChangeBancos={this.handleChangeBancos} numRef={this.state.numRef}
                                                            nameFile={nameFile} cambiarNombre={this.cambiarNombre} montoBsS={total_bss}/>
                                                        </div>
                                                    )


                                                }}
                                            </ProductConsumer>    
                                        </div>
                                    </Collapsible>
                                </div>  

                                <div className="card offset-3 tiendas-form tarjeta">
                                    <div className="Titulo_det">Detalles de la Cuponera</div>

                                    <div className="Tabla_Cont justify-content-center">
                                        <div id="carrito" className="table-responsive">
                                            <table className="table" id="lista-compra">
                                            <thead>
                                                <tr style={{ textAlign:"center"}}>
                                                <th scope="col">Imagen</th>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">Cantidad</th>
                                                <th scope="col">Eliminar</th>
                                                </tr>
                                            </thead>

                                            
                                            <ProductConsumer>            
                                                {value => {
                                                if(value.Cart.length > 0) {
                                                    return(
                                                        <tbody>
                                                        {value.Cart.map ((cartData) =>{
                                                            return(
                                                                <tr key={cartData.Id}>
                                                                    <td data-label="" className="imagen_car" style={{backgroundImage:`url(${cartData.Imagen})`}}></td>
                                                                    <td data-label="Nombre" className="tit_car">{cartData.Titulo}</td>
                                                                    <td data-label="Cantidad" className="cas_peq"><input type="number" min="1" max="100" value={cartData.Cantidad} 
                                                                    onChange={(e) => value.changeNumber(e,cartData.Id)}></input></td>
                                                                    <td data-label="Eliminar" className="cas_peq"><button className="borrar-producto fa fa-trash" style={{color:'#ed4053'}} 
                                                                    onClick={() => value.removeItem(cartData.Id)}>{null}</button></td>
                                                                </tr>
                                                            )
                                                        })}
                                                        </tbody>

                                                    )
                                                }
                                                else{
                                                    return(
                                                        <tbody>
                                                          <tr>
                                                            <td data-label="Reserva" className="td_reserva">No ha reservado ningun cupón</td>
                                                          </tr>
                                                        </tbody>
                                                    )  
                                                }
                                                
                                                
                                                }}
                                            </ProductConsumer>
                                            </table>
                                        </div>
                                    </div>
  
                                </div>
                            </div>
                        </div>

                        <div id="Factura_oferty" className= "col-xs-12 col-sm-12 col-md-4 pull-right">
                            <div className = "card factura">
                                <img src={logo} width="50px" alt="Oferty"/>
                                <div className="Oferty">Oferty, C.A</div>
                                
                                <ProductConsumer>            
                                    {value => {
                                        var total_bss = 0;
                                        total_bss = value.total * this.state.tasaDolar;
                                        var bss_formato= new Intl.NumberFormat(["ban", "id"]).format(total_bss);
                                        return(
                                            
                                            <div id="montos-total">
                                                <div id="montos">
                                                    <div className="line-monto subtotal">
                                                        <div className="bold">Subtotal</div>
                                                        <div id="Subtotal">{bss_formato}</div>
                                                    </div>

                                                    <div className="line-monto iva">
                                                        <div className="bold">IVA</div>
                                                        <div>0,00 Bs</div>
                                                    </div>
                                                </div>

                                                <hr/>

                                                <div className="line-monto total">
                                                    <div className="bold">Total</div>
                                                    <div id="Total_Bss">{bss_formato}</div>
                                                </div>

                                                <div className="line-monto tasa">
                                                    <div className="bold">Tasa</div>
                                                    <div id="TasaDolar">{this.state.tasaDolar}</div>
                                                </div>

                                                <div id="Total_Dolares" className="total-dolares">${value.total}</div>

                                                <div className="FinalizarCompra">
                                                    <button id="procesar-compra" className="stores" onClick={this.handlesendPay.bind(this, value.Cart, value.total)}>
                                                    Finalizar Compra</button>
                                                </div>
                                            </div>

                                            
                                        )
 
                                    }}

                                </ProductConsumer>    


                            </div>
                        </div>
                        
                    </div>
                </div>
                <Footer/>
            </div>            
        )
    }
}


function Pago(props,handleMercantil,handleProvincial,handleVenz,handleBOD,handleBanesco,handleBicent,handleChangeBancos) {
    const isPago = props.isPago;
    const nameFile = props.nameFile;
    const cambiarNombre2 = props.cambiarNombre;
    const phonePagoMovil = props.phonePagoMovil;
    const emailPaypal = props.emailPaypal;
    const errors = props.errors;
    const montDol = props.montoDolares;
    const montBol = props.montoBsS;

    if(isPago === "Transferencia"){
        return <div id="Div_Tranf" className="div_tranf">
                <div className="BancaAmericana">
                    <button id="Merc" className="bankNac" onClick={props.handleMercantil}>
                        <img src={mercant} width="80px" alt="Banco Mercantil"/>
                    </button>
        

                    <button id="BOD" className="bankNac" onClick={props.handleBOD}>
                        <img src={bod} width="80px" alt="Banco BOD"/>
                    </button>
        
                    <button id="Prov" className="bankNac" onClick={props.handleProvincial}>
                        <img src={prov} width="80px" alt="Banco Provincial"/>
                    </button>
        
                    <button id="Banes" className="bankNac" onClick={props.handleBanesco}>
                        <img src={banesco} width="80px" alt="Banco Banesco"/>
                    </button>
        
                    <button id="Vzla" className="bankNac" onClick={props.handleVenz}>
                        <img src={venez} width="80px" alt="Banco de Venezuela"/>
                    </button>
        
                    <button id="Bicent" className="bankNac" onClick={props.handleBicent}>
                        <img src={bicent} width="80px" alt="Banco Bicentenario"/>
                    </button>

                </div>
            </div>;
    }
    else if(isPago === "Paypal"){
        return <div id="Div_Paypal" className="div_paypal">
                <div className="DatosdelPago">
                <div className="email_bank"><strong> Correo: </strong> <span> oferty@gmail.com </span> </div>

                <div className="container-input">
                    <h5><strong>Subir comprobante bancario</strong></h5>
                    <input type="file" name="file-PayPal" id="file-PayPal" className="inputfile inputfile-6" onChange={cambiarNombre2} />

                    <label htmlFor="file-PayPal">
                    <figure>
                        <svg xmlns="http://www.w3.org/2000/svg" className="iborrainputfile" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>
                    </figure>
                    <span className="iborrainputfile">{nameFile?nameFile:'Seleccionar Archivo'}</span>
                    </label>
                </div>

                <div className="InputData">
                    <div className="Grupo-Input col-sm-6 col-md-6">
                        <div className="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate = "Enter Your Email (e@a.x)">
                            <span className="label-input100">Correo Electronico *</span>
                            <input id="EmailPaypal" className="input100 inputValorBank" type="text" name="emailPaypal" placeholder="Ingrese su Correo Electronico" 
                            value={emailPaypal} onChange={props.handleChangeBancos}/>
                        </div>
                        {errors.emailPaypal.length > 0 && 
                            <span className='error'>{errors.emailPaypal}</span>}
                    </div>

                    <div className="Grupo-Input col-sm-6 col-md-6">
                        <div className="wrap-input100 bg1 rs1-wrap-input100">
                            <span className="label-input100">MONTO $</span>
                            <input id="MontoDolares2" className="input100" type="text" name="phone" defaultValue={montDol} readOnly/>
                        </div>
                    </div>

                </div>
            </div>

      </div>;
    }
    else if(isPago === "Pago Movil"){
        return <div id="Div_PagoMovil" className="div_PM">
                    <div className="DatosdelPago">
                    <div> Datos del Pago Movil </div>
                    <div className="banco"><strong> Banco: </strong><span> Mercantil </span> </div>
                    <div className="banco"><strong> RIF: </strong><span> J-54850253355 </span> </div>
                    <div className="Nombre_bank"><strong> Télefono: </strong><span> 0424-458423687 </span> </div>
                    <div className="email_bank"><strong> Correo: </strong> <span> oferty_tranf@gmail.com </span> </div>

                    <div className="container-input">
                        <h5><strong>Subir comprobante bancario</strong></h5>
                        <input type="file" name="file-pagoMovil" id="file-pagoMovil" className="inputfile inputfile-6" onChange={cambiarNombre2}/>

                        <label htmlFor="file-pagoMovil">
                        <figure>
                            <svg xmlns="http://www.w3.org/2000/svg" className="iborrainputfile" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>
                        </figure>
                        <span className="iborrainputfile">{nameFile?nameFile:'Seleccionar Archivo'}</span>
                        </label>
                    </div>

                    <div className="InputData">
                        <div className="Grupo-Input col-sm-6 col-md-6">
                            <div className="wrap-input100 validate-input bg1 rs1-wrap-input100">
                                <span className="label-input100">Numero de Teléfono *</span>
                                <input id="TelefonoPagoMovil" className="input100 inputValorBank" type="text" name="phonePagoMovil" placeholder="Ingrese numero emisor del pago"
                                value={phonePagoMovil} onChange={props.handleChangeBancos}/>
                            </div>
                            {errors.phonePagoMovil.length > 0 && 
                            <span className='error'>{errors.phonePagoMovil}</span>}
                        </div>

                        <div className="Grupo-Input col-sm-6 col-md-6">
                            <div className="wrap-input100 bg1 rs1-wrap-input100">
                                <span className="label-input100">MONTO BSS</span>
                                <input id="MontoPM" className="input100" type="text" name="phone" defaultValue={montBol} readOnly/>
                            </div>
                        </div>

                    </div>
                </div>
              </div>;
       
    }
    else{
        return <div className="info_pago">Seleccione un método de pago</div>
    }
    
}

function TipoBanco(props, handleChangeBancos) {
    const isBanco = props.isBanco;
    const isPago = props.isPago;
    const errors = props.errors;
    const numRef = props.numRef;
    const nameFile = props.nameFile;
    const cambiarNombre2 = props.cambiarNombre;
    const monto = props.montoBsS;
    let result;

    if(isPago !== "" && isPago === "Transferencia"){
        switch(isBanco){
        
            case "Banesco":
                
            result= <div className="DatosdelPago">
                    <div> Oferty, C.A </div>
                    <div className="banco"><strong> RIF: </strong><span> J-54850253355 </span> </div>
                    <div className="Nombre_bank"><strong> N° de cuenta: </strong><span id="CuentaBanc"> 0105-0060-55-1060493268 </span> </div>
                    <div className="email_bank"><strong> Correo: </strong> <span> oferty_tranf@gmail.com </span> </div>

                <div className="container-input">
                    <h5><strong>Subir comprobante bancario</strong></h5>
                    <input type="file" name="file-Tranf" id="file-Tranf" className="inputfile inputfile-6" onChange={cambiarNombre2}/>

                    <label htmlFor="file-Tranf">
                    <figure>
                        <svg xmlns="http://www.w3.org/2000/svg" className="iborrainputfile" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>
                    </figure>
                    <span className="iborrainputfile">{nameFile?nameFile:'Seleccionar Archivo'}</span>
                    </label>
                </div>

                <div className="InputData">
                    <div className="Grupo-Input col-sm-6 col-md-6">
                        <div className="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate = "Enter Your Email (e@a.x)">
                            <span className="label-input100">Numero de Referencia *</span>
                            <input id="EmailTranf" className="input100 inputValorBank" type="text" name="numRef" placeholder="Ingrese su Correo Electronico"
                            value={numRef} onChange={props.handleChangeBancos}/>
                        </div>
                        {errors.numRef.length > 0 && 
                        <span className='error'>{errors.numRef}</span>}
                    </div>

                    <div className="Grupo-Input col-sm-6 col-md-6">
                    <div className="wrap-input100 bg1 rs1-wrap-input100">
                        <span className="label-input100">MONTO BSS</span>
                        <input id="MontoBsstranf" className="input100" type="text" name="phone" defaultValue={monto} readOnly/>
                    </div>
                    </div>

                </div>
                </div>;
            break;

            case "Mercantil":
                result=<div className="DatosdelPago">
                    <div> Oferty, C.A </div>
                    <div className="banco"><strong> RIF: </strong><span> J-54850253355 </span> </div>
                    <div className="Nombre_bank"><strong> N° de cuenta: </strong><span id="CuentaBanc"> 0105-0060-55-1060493268 </span> </div>
                    <div className="email_bank"><strong> Correo: </strong> <span> oferty_tranf@gmail.com </span> </div>

                    <div className="container-input">
                    <h5><strong>Subir comprobante bancario</strong></h5>
                    <input type="file" name="file-Tranf" id="file-Tranf" className="inputfile inputfile-6" onChange={cambiarNombre2}/>

                    <label htmlFor="file-Tranf">
                        <figure>
                        <svg xmlns="http://www.w3.org/2000/svg" className="iborrainputfile" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>
                        </figure>
                        <span className="iborrainputfile">{nameFile?nameFile:'Seleccionar Archivo'}</span>
                    </label>
                    </div>

                    <div className="InputData">
                    <div className="Grupo-Input col-sm-6 col-md-6">
                        <div className="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate = "Enter Your Email (e@a.x)">
                            <span className="label-input100">Numero de Referencia *</span>
                            <input id="EmailTranf" className="input100 inputValorBank" type="text" name="numRef" placeholder="Ingrese su Correo Electronico" 
                            value={numRef} onChange={props.handleChangeBancos}/>
                        </div>
                        {errors.numRef.length > 0 && 
                        <span className='error'>{errors.numRef}</span>}
                    </div>

                    <div className="Grupo-Input col-sm-6 col-md-6">
                        <div className="wrap-input100 bg1 rs1-wrap-input100">
                        <span className="label-input100">MONTO BSS</span>
                        <input id="MontoBsstranf" className="input100" type="text" name="phone" defaultValue={monto} readOnly/>
                        </div>
                    </div>

                    </div>
                </div>;
            break;

            case "Bicentenario":

                result = <div className="DatosdelPago">
                    <div> Oferty, C.A </div>
                    <div className="banco"><strong> RIF: </strong><span> J-54850253355 </span> </div>
                    <div className="Nombre_bank"><strong> N° de cuenta: </strong><span id="CuentaBanc"> 0105-0060-55-1060493268 </span> </div>
                    <div className="email_bank"><strong> Correo: </strong> <span> oferty_tranf@gmail.com </span> </div>

                    <div className="container-input">
                    <h5><strong>Subir comprobante bancario</strong></h5>
                    <input type="file" name="file-Tranf" id="file-Tranf" className="inputfile inputfile-6" onChange={cambiarNombre2}/>

                    <label htmlFor="file-Tranf">
                        <figure>
                        <svg xmlns="http://www.w3.org/2000/svg" className="iborrainputfile" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>
                        </figure>
                        <span className="iborrainputfile">{nameFile?nameFile:'Seleccionar Archivo'}</span>
                    </label>
                    </div>

                    <div className="InputData">
                        <div className="Grupo-Input col-sm-6 col-md-6">
                            <div className="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate = "Enter Your Email (e@a.x)">
                                <span className="label-input100">Numero de Referencia *</span>
                                <input id="EmailTranf" className="input100 inputValorBank" type="text" name="numRef" placeholder="Ingrese su Correo Electronico" 
                                value={numRef} onChange={props.handleChangeBancos}/>
                            </div>
                            {errors.numRef.length > 0 && 
                            <span className='error'>{errors.numRef}</span>}
                        </div>

                        <div className="Grupo-Input col-sm-6 col-md-6">
                            <div className="wrap-input100 bg1 rs1-wrap-input100">
                            <span className="label-input100">MONTO BSS</span>
                            <input id="MontoBsstranf" className="input100" type="text" name="phone" defaultValue={monto} readOnly/>
                            </div>
                        </div>

                    </div>
                </div>;
            break;

            case "Venezuela":

                result = <div className="DatosdelPago">
                    <div> Oferty, C.A </div>
                    <div className="banco"><strong> RIF: </strong><span> J-54850253355 </span> </div>
                    <div className="Nombre_bank"><strong> N° de cuenta: </strong><span id="CuentaBanc"> 0105-0060-55-1060493268 </span> </div>
                    <div className="email_bank"><strong> Correo: </strong> <span> oferty_tranf@gmail.com </span> </div>

                    <div className="container-input">
                    <h5><strong>Subir comprobante bancario</strong></h5>
                    <input type="file" name="file-Tranf" id="file-Tranf" className="inputfile inputfile-6" accept="image/*" onChange={cambiarNombre2}/>

                    <label htmlFor="file-Tranf">
                        <figure>
                        <svg xmlns="http://www.w3.org/2000/svg" className="iborrainputfile" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>
                        </figure>
                        <span className="iborrainputfile">{nameFile?nameFile:'Seleccionar Archivo'}</span>
                    </label>
                    </div>

                    <div className="InputData">
                        <div className="Grupo-Input col-sm-6 col-md-6">
                            <div className="wrap-input100 validate-input bg1 rs1-wrap-input100">
                                <span className="label-input100">Numero de Referencia *</span>
                                <input id="EmailTranf" className="input100 inputValorBank" type="text" name="numRef" placeholder="Ingrese su número de referencia" 
                                value={numRef} onChange={props.handleChangeBancos}/>
                            </div>
                            {errors.numRef.length > 0 && 
                            <span className='error'>{errors.numRef}</span>}
                        </div>

                        <div className="Grupo-Input col-sm-6 col-md-6">
                            <div className="wrap-input100 bg1 rs1-wrap-input100">
                                <span className="label-input100">MONTO BSS</span>
                                <input id="MontoBsstranf" className="input100" type="text" name="phone" defaultValue={monto} readOnly/>
                            </div>
                        </div>

                    </div>
                </div>;
            break;

            case "Provincial":

                result = <div className="DatosdelPago">
                    <div> Oferty, C.A </div>
                    <div className="banco"><strong> RIF: </strong><span> J-54850253355 </span> </div>
                    <div className="Nombre_bank"><strong> N° de cuenta: </strong><span id="CuentaBanc"> 0105-0060-55-1060493268 </span> </div>
                    <div className="email_bank"><strong> Correo: </strong> <span> oferty_tranf@gmail.com </span> </div>

                    <div className="container-input">
                    <h5><strong>Subir comprobante bancario</strong></h5>
                    <input type="file" name="file-Tranf" id="file-Tranf" className="inputfile inputfile-6" onChange={cambiarNombre2}/>

                    <label htmlFor="file-Tranf">
                        <figure>
                        <svg xmlns="http://www.w3.org/2000/svg" className="iborrainputfile" width="20" height="17" viewBox="0 0 20 17">
                            <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>
                        </figure>
                        <span className="iborrainputfile">{nameFile?nameFile:'Seleccionar Archivo'}</span>
                    </label>
                    </div>

                    <div className="InputData">
                        <div className="Grupo-Input col-sm-6 col-md-6">
                            <div className="wrap-input100 validate-input bg1 rs1-wrap-input100">
                                <span className="label-input100">Numero de Referencia *</span>
                                <input id="EmailTranf" className="input100 inputValorBank" type="text" name="numRef" placeholder="Ingrese su número de referencia" 
                                value={numRef} onChange={props.handleChangeBancos}/>
                            </div>

                            {errors.numRef.length > 0 && 
                            <span className='error'>{errors.numRef}</span>}
                        </div>

                        <div className="Grupo-Input col-sm-6 col-md-6">
                            <div className="wrap-input100 bg1 rs1-wrap-input100">
                                <span className="label-input100">MONTO BSS</span>
                                <input id="MontoBsstranf" className="input100" type="text" name="phone" defaultValue={monto} readOnly/>
                            </div>
                        </div>

                    </div>
                </div>;
            break;

            case "BOD":

                result = <div className="DatosdelPago">
                    <div> Oferty, C.A </div>
                    <div className="banco"><strong> RIF: </strong><span> J-54850253355 </span> </div>
                    <div className="Nombre_bank"><strong> N° de cuenta: </strong><span id="CuentaBanc"> 0105-0060-55-1060493268 </span> </div>
                    <div className="email_bank"><strong> Correo: </strong> <span> oferty_tranf@gmail.com </span> </div>

                    <div className="container-input">
                    <h5><strong>Subir comprobante bancario</strong></h5>
                    <input type="file" name="file-Tranf" id="file-Tranf" className="inputfile inputfile-6" onChange={cambiarNombre2}/>

                    <label htmlFor="file-Tranf">
                        <figure>
                        <svg xmlns="http://www.w3.org/2000/svg" className="iborrainputfile" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>
                        </figure>
                        <span className="iborrainputfile">{nameFile?nameFile:'Seleccionar Archivo'}</span>
                    </label>
                    </div>

                    <div className="InputData">
                        <div className="Grupo-Input col-sm-6 col-md-6">
                            <div className="wrap-input100 validate-input bg1 rs1-wrap-input100">
                                <span className="label-input100">Numero de Referencia *</span>
                                <input id="EmailTranf" className="input100 inputValorBank" type="text" name="numRef" placeholder="Ingrese su número de referencia"
                                value={numRef} onChange={props.handleChangeBancos}/>
                            </div>

                            {errors.numRef.length > 0 && 
                            <span className='error'>{errors.numRef}</span>}
                        </div>

                        <div className="Grupo-Input col-sm-6 col-md-6">
                            <div className="wrap-input100 bg1 rs1-wrap-input100">
                                <span className="label-input100">MONTO BSS</span>
                                <input id="MontoBsstranf" className="input100" type="text" name="phone" defaultValue={monto} readOnly/>
                            </div>
                        </div>

                    </div>
                </div>;
            break;

            default:
                result = <div className="info_pago">Seleccione un banco</div>

            
        }
        return result;
    }
    else{
        return null;
    }
    


    
}



export default FormularioCompra;