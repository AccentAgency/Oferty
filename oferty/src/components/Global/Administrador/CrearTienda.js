import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


import Menu from './Components/Menu';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

import config from '../../../config/config';
import axios from "axios";
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import Footer from './Components/Footer';


const axiosInstance = axios.create({
    baseURL: config.backURL
});


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class CrearTienda extends React.Component{

    constructor(props)
    {
        super(props);
        this.state ={nombre:'', detalles:'', file: null, file2:null, file3:null, imagen:'No Disponible', imagen2: 'No Disponible', lat:10.1579312, display:'none',
            lng: -67.9972104, markLat:'', markLong:'', show:false, showButton:false, ubicacion:'Seleccionar...', error:'', open:false, categoria:'Comida', displayImage:'none',
            markers:{
                position: (10.1579312, -67.9972104),
                defaultAnimation: 2
            },
            errors:{
                nombre:'',
                detalles:''
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSelectUbicacion = this.handleSelectUbicacion.bind(this);
        this.handleTienda = this.handleTienda.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChangeImagen1 = this.handleChangeImagen1.bind(this);
        this.handleChangeImagen2 = this.handleChangeImagen2.bind(this);
    }

    
    onMarkerDragEnd = (coord) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();


        this.setState({lat:lat, lng:lng});
        
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
            case 'nombre':
                errors.nombre = 
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

            
            default:
            break;
        }

        this.setState({errors, [name]: value});
    }

    handleClose(event,reason){
        if (reason === 'clickaway') {
            return;
        }
        
        this.setState({...this.state.open, open:false});
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

    handleSelectUbicacion(event){
        const coord = event.target.value;
        let index = event.target.selectedIndex;
        const text = event.target.options[index].text;

        this.setState({
            select_location:text,
            select_cord: coord
        })

        var coordenadas = (coord).split(',');
        this.setState({lat: coordenadas[0], lng:coordenadas[1]})
        this.setState({showButton:true});
        this.setState({ubicacion: text});
    }

    handleSelect(event){
        const target = event.target;
        const val = event.target.value;
        const name = target.name;
        this.setState({
            [name]: val
        });
    }

    handleTienda(){
        this.setState({display:'flex'});
        if(!this.state.nombre || !this.state.detalles || this.state.ubicacion === "Seleccionar..."){
            this.setState({display:'none'});
            this.setState({error: "Favor rellene todos los campos para registrar la tienda."})
            this.setState({open:true});
        }
        else{
            axiosInstance.post('/registerTienda', {
                'nombre' : this.state.nombre, 
                'detalles': this.state.detalles, 
                'categoria': this.state.categoria, 
                'imagenLogo': this.state.imagen, 
                'imagenRef': this.state.imagen2, 
                'direccion': this.state.ubicacion, 
                'latitud': this.state.lat, 
                'longitud': this.state.lng
            }).then(res => {
                this.setState({display:'none'});
                swal({title:"??Comercio registrado correctamente!",icon:"success",confirmButtonText: "Aceptar"});
                this.resetForm();
                window.scrollTo(0, 0);
            })
            .catch((error) => {
                swal({title:"Ha ocurrido un error",text:"Verifique su conexi??n a internet o intente de nuevo m??s tarde.",icon:"error",confirmButtonText: "Aceptar"});
            })
        }
    }

    resetForm(){
        this.setState({
            nombre:'', detalles:'', file: null, file2:null, file3:null, imagen:'No Disponible', imagen2: 'No Disponible', lat:10.1579312,
            lng: -67.9972104, markLat:'', markLong:'', show:false, showButton:false, ubicacion:'Seleccionar...', error:'', open:false, categoria:'Comida',
            markers:{
                position: (10.1579312, -67.9972104),
                defaultAnimation: 2
            },
            errors:{
                nombre:'',
                detalles:''
            }
        })
    }
    

    render(){
        const {errors} = this.state;
        const style = {
            width: '100%',
            height: '350px'
        }
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
                                            <h4>Tiendas</h4>
                                        </div>
        
                                        <div className="categories">
                                            <ul>
                                            <li className="active">
                                                <Link to="Administrador-RegistrarTiendas" data-filter="*">Agregar Tiendas</Link>
                                            </li>
                                            <li>
                                                <Link to="Administrador-ModificarTiendas" data-filter="*">Modificar/Eliminar Tiendas</Link>
                                            </li>
                                            </ul>
                                        </div>
        
                                        <div className="card-body">

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Nombre</label>
                                                <div className="col-sm-12 col-md-7">
                                                    <input name="nombre" id="Titulo" type="text" className="form-control" maxLength="18" value={this.state.nombre}
                                                    onChange={this.handleChange}/>
                                                    {errors.nombre.length > 0 && 
                                                    <span className='error'>{errors.nombre}</span>}
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Detalles</label>
                                                <div className="col-sm-12 col-md-7">
                                                    <textarea name="detalles" id="Detalles" type="text" className="form-control" value={this.state.detalles}
                                                    onChange={this.handleChange}/>
                                                    {errors.detalles.length > 0 && 
                                                    <span className='error'>{errors.detalles}</span>}
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
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Imagenes</label>
                                                <div className="form-group col-md-2">
                                                    <div id="image-preview" className="image-preview" style={{backgroundImage:`url(${this.state.file})`}}>
                                                        <label htmlFor="image-upload" id="image-label">{!this.state.file ? 'LOGO ' : 'Modificar'}</label>
                                                        <input type="file" name="image" id="image-upload" onChange={this.handleChangeImagen1} />
                                                    </div>
                                                </div>

                                                <div className="form-group col-md-2">
                                                    <div id="image-preview2" className="image-preview" style={{backgroundImage:`url(${this.state.file2})`}}>
                                                        <label htmlFor="image-upload2" id="image-label2">{!this.state.file2 ? 'FOTO REFERENCIAL +' : 'Modificar'}</label>
                                                        <input type="file" name="image" id="image-upload2" onChange={this.handleChangeImagen2} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Seleccionar Ubicaci??n</label>

                                                <div className="col-sm-12 col-md-7">
                                                    <select name="ubicacion" id="Categorias" className="form-control selectric" onChange={this.handleSelectUbicacion}>
                                                        <option value="0,0">Seleccionar...</option>
                                                        <option value="10.2006565,-68.0169797">Agua Blanca</option>
                                                        <option value="10.2086134,-68.0121946,17">Camoruco</option>
                                                        <option value="10.1581688,-67.9974168">Centro de Valencia</option>
                                                        <option value="10.1913925,-68.0259153">El Bosque</option>
                                                        <option value="10.2048966,-68.0347038">El Parral</option>
                                                        <option value="10.2264576,-68.0102312">El Recreo</option>
                                                        <option value="10.2489461,-67.9989123">El Rincon</option>
                                                        <option value="10.2179468,-67.9990051">Trigal Centro</option>
                                                        <option value="10.2265868,-68.0014122">Trigal Norte</option>
                                                        <option value="10.2127434,-68.0151183">El Vi??edo</option>
                                                        <option value="10.2272177,-68.0188909">Guaparo</option>
                                                        <option value="10.2668481,-67.9563639">Guacara</option>
                                                        <option value="10.1876628,-68.0525395">Guataparo</option>
                                                        <option value="10.2222209,-68.0129349">La Alegria</option>
                                                        <option value="10.2402729,-68.0119317">La Granja</option>
                                                        <option value="10.2008409,-68.0068731">La Kerdell</option>
                                                        <option value="10.2174352,-68.0245221">La Vi??a</option>
                                                        <option value="10.2048728,-68.0061006">Las Acacias</option>
                                                        <option value="10.2484922,-68.0111351">Las Quintas I</option>
                                                        <option value="10.2389453,-68.007616">Las Quintas II</option>
                                                        <option value="10.2000407,-67.9994587">Las Chimeneas</option>
                                                        <option value="10.1720376,-67.9940522">Libertador</option>
                                                        <option value="10.1932443,-67.9971618">Lomas del Este</option>
                                                        <option value="10.1922756,-68.0115884">Los Colorados</option>
                                                        <option value="10.196692,-68.0252891">Los Mangos</option>
                                                        <option value="10.1956704,-68.0141634">Los Nisperos</option>
                                                        <option value="10.2074254,-68.0064466">Los Sauces</option>
                                                        <option value="10.1823553,-67.9393674">Los Guayos</option>
                                                        <option value="10.2348794,-68.0019165">Ma??ongo</option>
                                                        <option value="10.266187,-68.0554968">Naguanagua</option>
                                                        <option value="10.2543147,-68.0009723">Tajazal</option>
                                                        <option value="10.208286,-68.021797">Prebo</option>
                                                        <option value="10.2111714,-68.0069053">San Jose de Tarbes</option>
                                                        <option value="10.2708055,-68.021384">San Diego</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-offset-3 tiendas-form mapas-form">
                                                <h4 className="masthead-brand">Direcci??n en el Mapa</h4>
                                                <main role="main" className="inner cover">
                                                    <div className="row col-md-12">
                                                        <div className="col-md-5 col-offset-2">
                                                            <input name="markLat" type="text" id="txtLat" className="form-control" placeholder="Latitud" value={this.state.lat}
                                                            onChange={this.handleChange}/>
                                                        </div>

                                                        <div className="col-md-5 col-offset-2">
                                                            <input name="markLong" type="text" id="txtLng" className="form-control" placeholder="Longitud" value={this.state.lng}
                                                            onChange={this.handleChange}/>
                                                        </div>
                                                    </div>
                                                    <div className="canvas">
                                                        <Map
                                                        google={this.props.google}
                                                        draggable={true}
                                                        zoom={11}
                                                        style={style}
                                                        initialCenter={{
                                                            lat: this.state.lat,
                                                            lng: this.state.lng
                                                        }}
                                                        center={{
                                                            lat: this.state.lat,
                                                            lng: this.state.lng
                                                        }}
                                                        onClick={this.mapClicked}
                                                        >
                                                        <Marker
                                                            title={'Geolocation'}
                                                            draggable={true}
                                                            position={{
                                                            lat:this.state.lat,
                                                            lng:this.state.lng,
                                                            }}
                                                            onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)}
                                                        />
                                                        </Map>
                                                    </div>


                                                </main>
                                            </div>
                                            <div id="btn_tienda" className="form-group row mb-4" style={{display:this.state.showButton ? 'block' : 'none'}}>
                                                <div id="contenedor_btn" className="col-sm-12 col-md-12">
                                                    <button id="CambiarBanner" className="btn btn-primary" onClick={this.handleTienda}>Registrar Tienda</button>
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

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCAitQBFs-xKL_9BTPg4GdEYRBX_wmpy9o'
}) (CrearTienda);