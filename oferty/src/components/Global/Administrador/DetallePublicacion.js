import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Menu from './Components/Menu';

import config from '../../../config/config';
import axios from "axios";
import swal from 'sweetalert2';

//Librerias para el modal
import { Multiselect } from 'react-widgets';
import Footer from './Components/Footer';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const axiosInstance = axios.create({
    baseURL: config.backURL
});



class DetallePublicacion extends React.Component{

    
    constructor(props)
    {
        super(props);
        this.state ={ id:this.props.match.params.id, detailsPub:[], dataComercio:[], redirec:false, dias_select:'', open:false, error:'', loading:true, display:'none', displayImage:'none',
            campBelleza: false, campSalud: false, campComida:false, campDolar:false, value:[], imagenes:'No Disponible', imagen2: 'No Disponible', imagen3:'No Disponible',
            DcampBelleza:"No",
            DcampSalud:"No", 
            DcampComida:"No", 
            DcampDolar:"No"
        }

        this.hanldeValidar = this.hanldeValidar.bind(this);
        this.handleCancelar = this.handleCancelar.bind(this);
        this.handleChangeImagen1 = this.handleChangeImagen1.bind(this);
        this.handleChangeImagen2 = this.handleChangeImagen2.bind(this);
        this.handleChangeImagen3 = this.handleChangeImagen3.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
        this.handleClose = this.handleClose.bind(this);
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

    getDetallePublicacion(){
        axiosInstance.get('/getDetallesPublicacion/'+ this.state.id).then(res => {
            this.setState({detailsPub: res.data});
            this.setState({loading:false});
            var dias = '';
            if(res.data.Lunes === "Si"){
                dias += "Lunes";
            }
          
            if(res.data.Martes === "Si"){
                if (dias !== ''){
                  dias += ", Martes";
                }else{
                  dias += "Martes";
                }
            }
          
              if(res.data.Miercoles === "Si"){

                if (dias !== ''){
                  dias += ", Miercoles";
                }else{
                  dias += "Miercoles";
                }
              }
          
              if(res.data.Jueves === "Si"){

                if (dias !== ''){
                  dias += ", Jueves";
                }else{
                  dias += "Jueves";
                }
            }
          
            if(res.data.Viernes === "Si"){
                if (dias !== ''){
                  dias += ", Viernes";
                }else{
                  dias += "Viernes";
                }
            }
          
            if(res.data.Sabado === "Si"){
                if (dias !== ''){
                  dias += ", Sabado";
                }else{
                  dias += "Sabado";
                }
            }
          
            if(res.data.Domingo === "Si"){
                if (dias !== ''){
                  dias += ", Domingo";
                }else{
                  dias += "Domingo";
                }
            }

            this.setState({dias_select: dias});
            this.setState({...this.state.imagenes, imagenes: res.data.ImagenPrincipa});
            this.setState({...this.state.imagen2, imagen2: res.data.SegundaImagen});
            this.setState({...this.state.imagen3, imagen3: res.data.TerceraImagen});
            
            if(res.data.Camp_Belleza === "Si"){
                this.setState({campBelleza:true});
                this.setState({DcampBelleza:"Si"});
            }

            if(res.data.Camp_Comida === "Si"){
                this.setState({campComida:true});
                this.setState({DcampComida:"Si"});
            }

            if(res.data.Camp_Salud === "Si"){
                this.setState({campSalud:true});
                this.setState({DcampSalud:"Si"});
            }

            if(res.data.Camp_TodoDolar === "Si"){
                this.setState({campDolar:true});
                this.setState({DcampDolar:"Si"});
            }

            axiosInstance.get('/getDetallesComercio/'+ res.data.IdUsuario).then(resData => {
                this.setState({dataComercio:resData.data});
            })
        })
    }

    hanldeValidar(){
        this.setState({display:'flex'});
        if((this.state.value).length > 0){
            axiosInstance.post('/saveAcceptPublicacion',{
                'tag': JSON.stringify(this.state.value),
                'categoria': this.state.detailsPub.Categoria,
                'descripcion': this.state.detailsPub.DescripcionProducto,
                'detalles': this.state.detailsPub.DescripcionProducto,
                'disponibilidad':this.state.detailsPub.Stock_Producto,
                'dispmin': this.state.detailsPub.Stock_Producto,
                'fecha_ven': '2021-06-14T10:00',
                'imagen': this.state.imagenes,
                'imagenSec': this.state.imagen2,
                'imagenTerc': this.state.imagen3,
                'tienda': this.state.dataComercio.Tienda,
                'titulo': this.state.detailsPub.Titulo_Oferta,
                'lunes': this.state.detailsPub.Lunes, 
                'martes': this.state.detailsPub.Martes, 
                'miercoles' : this.state.detailsPub.Miercoles, 
                'jueves': this.state.detailsPub.Jueves, 
                'viernes' : this.state.detailsPub.Viernes, 
                'sabado': this.state.detailsPub.Sabado, 
                'domingo': this.state.detailsPub.Domingo, 
                'campBelleza': this.state.DcampBelleza, 
                'campComida': this.state.DcampComida, 
                'campSalud' : this.state.DcampSalud, 
                'campTodoDolar' : this.state.DcampDolar,
                'consid': this.state.detailsPub.Consideraciones,
                'contraind': this.state.detailsPub.Contraindicacion,
                'plazo': this.state.detailsPub.PlazoDeUso,
                'ahorro': this.state.detailsPub.AhorroOferta,
                'inc': this.state.detailsPub.Incluye,
                'noInc': this.state.detailsPub.NoIncluye,
            })
            .then(res => {

                axiosInstance.post('/validatePost/'+this.state.id+'/'+ this.state.detailsPub.IdUsuario+'/'+res.data).then(resData => {
                    this.setState({display:'none'});
                    swal.fire({title:"¡Publicación validado correctamente!",icon:"success",confirmButtonText: "Aceptar"}).then((value => {
                        if(value){
                            this.setState({redirec:true})
                            if(this.state.redirec === true){
                                this.props.history.push("/Administrador-SolicitudPublicacion");
                            }
                        }
                    }));
                })
            })
            .catch((error) => {
                this.setState({display:'none'});
                swal.fire({title:"Ha ocurrido un error",text:"Verifique su conexión a internet o intente de nuevo más tarde.",icon:"error",confirmButtonText: "Aceptar"});
            })
        }
        else{
            this.setState({display:'none'});
            this.setState({open:true});
            this.setState({error:'Favor seleccione alguna etiqueta antes de aprobar el cupón'});
        }
    }

    handleClose(event,reason){
        if (reason === 'clickaway') {
            return;
        }
        
        this.setState({...this.state.open, open:false});
        this.setState({...this.state.openS, openS:false});
    }

    handleCancelar(){

        swal.fire({
            title: 'Publicación rechazada',
            text:'Escribe un comentario de porque la publicacion no cumple con los requisitos.',
            input: 'textarea',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
        })
        .then(resultado => {
            this.setState({display:'flex'});
            if(resultado.isConfirmed){
                if(resultado.value){
                    axiosInstance.post('/deniedPost',{
                        'id': this.state.id,
                        'idUser': this.state.detailsPub.IdUsuario,
                        'comentario': resultado.value
                    }).then(res => {
                        this.setState({display:'none'});
                        swal.fire({title:"¡Publicación rechazada correctamente!",icon:"success",confirmButtonText: "Aceptar"}).then((value => {
                            if(value){
                                this.setState({redirec:true})
                                if(this.state.redirec === true){
                                    this.props.history.push("/Administrador-SolicitudPublicacion");
                                }
                            }
                        }));
                    })
                    .catch((error) => {
                        this.setState({display:'none'});
                        swal.fire({title:"Ha ocurrido un error",text:"Verifique su conexión a internet o intente de nuevo más tarde.",icon:"error",confirmButtonText: "Aceptar"});
                    })
                }
                else{
                    this.setState({display:'none'});
                    alert("Favor coloque algun comentario");
                }
            }
            else{
                this.setState({display:'none'});
            }

        })
    }

    componentDidMount = () => {
        this.getDetallePublicacion();
    }

    handleChangeImagen1(event){
        this.setState({
            ...this.state,
            detailsPub:{
                ...this.state.detailsPub,
                ImagenPrincipa: URL.createObjectURL(event.target.files[0])
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
            swal({title:"Ha ocurrido un error en subir la imagen",text:"Favor refresque la página e intente de nuevo.",icon:"error",confirmButtonText: "Aceptar"});
        })

    }

    handleChangeImagen2(event){
        this.setState({
            ...this.state,
            detailsPub:{
                ...this.state.detailsPub,
                SegundaImagen: URL.createObjectURL(event.target.files[0])
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
            swal({title:"Ha ocurrido un error en subir la imagen",text:"Favor refresque la página e intente de nuevo.",icon:"error",confirmButtonText: "Aceptar"});
        })
    }

    handleChangeImagen3(event){
        this.setState({
            ...this.state,
            detailsPub:{
                ...this.state.detailsPub,
                TerceraImagen: URL.createObjectURL(event.target.files[0])
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
            swal({title:"Ha ocurrido un error en subir la imagen",text:"Favor refresque la página e intente de nuevo.",icon:"error",confirmButtonText: "Aceptar"});
        })
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
                ) : (
                    <div>
                        <div id="main-details" className="main-content">
                            <section className="section">
                                <div className="section-body">
                                    <div className="row">
                                        <div className="col-12 col-md-8 col-lg-8 col-center">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h4>Detalles de la Publicación</h4>
                                                </div>
                                                <div className="card-body">
                                                    <div className="imagen_cupon img_pago">
                                                        <div className="form-group col-md-2">
                                                            <div id="image-preview" className="image-preview" style={{backgroundImage:`url(${this.state.detailsPub.ImagenPrincipa})`}}>
                                                                <label htmlFor="image-upload" id="image-label">{!this.state.file ? 'Modificar' : 'Imagen Principal'}</label>
                                                                <input type="file" name="image" id="image-upload" onChange={this.handleChangeImagen1} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="detail_cupon">
                                                        <br></br>
                                                        <p><span className="bold">Fecha de la Solicitud: </span> <span id="Fecha_pago"> {this.state.detailsPub.Fecha}</span></p>
                                                        <hr className="linea"></hr>
                                                        <h5 className="tit_detalle">Datos del Cupón</h5>
                                                        <p><span className="bold">Titulo de la Oferta: </span><span> {this.state.detailsPub.Titulo_Oferta}</span> </p>
                                                        <p><span className="bold">Detalles: </span> <span> {this.state.detailsPub.DescripcionProducto} </span></p>
                                                        <p><span className="bold">Descripción: </span> <span> {this.state.detailsPub.DescripcionProducto} </span></p>
                                                        <p><span className="bold">Categoría: </span> <span> {this.state.detailsPub.Categoria} </span></p>
                                                        <p><span className="bold">Stock del Producto: </span> <span> {this.state.detailsPub.Stock_Producto} </span></p>
                                                        <p><span className="bold">Plazo de Uso: </span> <span> {this.state.detailsPub.PlazoDeUso} </span></p>
                                                        <p><span className="bold">Incluye: </span> <span> {this.state.detailsPub.Incluye} </span></p>
                                                        <p><span className="bold">No Incluye: </span> <span> {this.state.detailsPub.NoIncluye} </span></p>
                                                        <p><span className="bold">Consideraciones: </span> <span> {this.state.detailsPub.Consideraciones} </span></p>
                                                        <p><span className="bold">Contraindicacion: </span> <span> {this.state.detailsPub.Contraindicacion} </span></p>
                                                        <p><span className="bold">Dias: </span> <span> {this.state.dias_select} </span></p>
                                                        <p><span className="bold">Campañas: </span></p>
                                                        <div id="CheckBox_Campa" className="form-row form-checkbox">
                                                                <div className="form-group col-md-12">
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

                                                    <div className="detail_cupon">
                                                        <br/>
                                                        <br/>
                                                        <hr className="linea"></hr>
                                                        <h5 className="tit_detalle">Datos del Comercio</h5>
                                                        <p><span className="bold">Nombre del comercio: </span><span> {this.state.dataComercio.Tienda}</span> </p>
                                                        <p><span className="bold">Nombre del usuario: </span> <span> {this.state.dataComercio.Nombre} </span></p>
                                                        <p><span className="bold">Dirección: </span> <span> {this.state.dataComercio.DireccionCorta} </span></p>
                                                        <p><span className="bold">Telefono: </span> <span> {this.state.dataComercio.telefono} </span></p>
                                                        
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
                                                
                                                        <div id="image-preview2" className="image-preview" style={{backgroundImage:`url(${this.state.detailsPub.SegundaImagen})`}}>
                                                            <label htmlFor="image-upload2" id="image-label2">{this.state.detailsPub.SegundaImagen === "No Disponible" ? 'AGREGAR +' : 'Modificar'}
                                                            </label>
                                                            <input type="file" name="image" id="image-upload2" onChange={this.handleChangeImagen2} />
                                                        </div>
                                                    

                                                    
                                                        <div id="image-preview3" className="image-preview" style={{backgroundImage:`url(${this.state.detailsPub.TerceraImagen})`}}>
                                                            <label htmlFor="image-upload3" id="image-label3">{this.state.detailsPub.TerceraImagen === "No Disponible" ? 'AGREGAR +' : 'Modificar'}
                                                            </label>
                                                            <input type="file" name="image" id="image-upload3" onChange={this.handleChangeImagen3} />
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

                                    <div className="footer_btn col-md-4 col-lg-4 col-center">
                                        <div className="cancel_btn">
                                            <button id="Btn_Cancelado" href="#" className="btn btn-secondary" onClick={this.handleCancelar}>Rechazar Pago</button>
                                        </div>
                                        <div className="acept_btn">
                                            <button id="Btn_PagoCorrecto" href="#" className="btn btn-primary" onClick={this.hanldeValidar}>Validar Publicación</button>
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

export default DetallePublicacion;