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
import Footer from './Components/Footer';

//Librerias para el modal
import Modal from '@material-ui/core/Modal';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const axiosInstance = axios.create({
    baseURL: config.backURL
});

class CuponesVencidos extends React.Component{

    constructor(props)
    {
        super(props);
        this.state ={ resultCupones:'',  resultCuponesBelleza:'',  resultCuponesSalud:'',  resultCuponesComida:'',  resultCuponesDolar:'', resultCuponesDestacado:'',
            stockMin:'', stockMax:'', fechaVenc:'',open:false, idCupon:'', error:'',openA:false, openDet:false, tienda:[], catg:'', loading:true, loading2:true, display:'none',
            errors:{
                stockMin:'',
                stockMax:'',
                fechaVenc:''
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSelectCupon = this.handleSelectCupon.bind(this);
        this.handleCloseA = this.handleCloseA.bind(this);
        this.updateCupon = this.updateCupon.bind(this);
        this.handleDetalles = this.handleDetalles.bind(this);
        this.handleSuspender = this.handleSuspender.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const value =  target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        let errors = this.state.errors;
    
        switch (name) {
        case 'stockMin':
            errors.stockMin =
            value.length === 0
            ? 'Ingresa un número mínimo de venta para el cupón.'
            : '';
        break;

        case 'stockMax':
            errors.stockMax =
            value.length === 0
            ? 'Ingresa un número máximo de venta para el cupón.'
            : '';
        break;

        case 'fechaVenc':
            errors.fechaVenc =
            value.length === 0
            ? 'Ingresa una fecha de vencimiento para el cupón.'
            : '';
        break;

        default:
        break;

        }
    }

    handleCloseA(event,reason){
        if (reason === 'clickaway') {
            return;
        }
        
        this.setState({...this.state.openA, openA:false});
    }

    handleClose(){
        this.setState({...this.state.open, open:false});
        this.setState({...this.state.openDet, openDet:false});
    }


    getCuponesVencidos(){
        axiosInstance.get('/finishCupones').then(res =>{
            this.setState({resultCupones:res.data});
            this.setState({loading2:false});
        })

        axiosInstance.get('/finishCuponesDestacado').then(res => {
            this.setState({resultCuponesDestacado:res.data});
            this.setState({loading:false});
        })

        axiosInstance.get('/finishCuponesBelleza').then(res =>{
            this.setState({resultCuponesBelleza:res.data});
        })

        axiosInstance.get('/finishCuponesComida').then(res =>{
            this.setState({resultCuponesComida:res.data});
        })

        axiosInstance.get('/finishCuponesSalud').then(res =>{
            this.setState({resultCuponesSalud:res.data});
        })

        axiosInstance.get('/finishCuponesDolar').then(res =>{
            this.setState({resultCuponesDolar:res.data});
        })


    }

    componentDidMount = () => {
        this.getCuponesVencidos();
    }

    
    handleSelectCupon(value, categoria){
        this.setState({...this.state.idCupon, idCupon:value});
        this.setState({...this.state.catg, catg:categoria});
        this.setState({...this.state.open, open:true});
    }

    handleDetalles(tienda){
        this.setState({openDet:true});
        axiosInstance.get('/getDataTienda/'+tienda).then(res=>{
            this.setState({tienda:res.data});
        })
        
    }

    handleSuspender(value, categoria){
        this.setState({display:'flex'});
        this.setState({...this.state.idCupon, idCupon:value});
        this.setState({...this.state.catg, catg:categoria});

        swal.fire({
            title: '¿Está seguro de suspender este cupón?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Aceptar",
        })
        .then(resultado => {
            if(resultado.isConfirmed){
                axiosInstance.post('/get'+this.state.catg+'Suspender/'+this.state.idCupon).then(res => {
                    swal.fire({title:"¡Cupon suspendido correctamente!", text:"Recuerde que este cupón ya no estará disponible en la página",icon:"success",confirmButtonText: "Aceptar"})
                    .then(resultado => {
                        this.setState({display:'none'});
                        window.location.reload();
                        window.scrollTo(0, 0)
                    })
                })
                .catch((error) => {
                    swal({title:"Ha ocurrido un error",text:"Verifique su conexión a internet o intente de nuevo más tarde.",icon:"error",confirmButtonText: "Aceptar"});
                })
            }
        })

    }

    updateCupon(){
        this.setState({display:'flex'});
        if(!this.state.idCupon || !this.state.stockMin || !this.state.stockMax || !this.state.fechaVenc){
            this.setState({display:'none'});
            this.setState({openA: true});
            this.setState({error:'Favor rellene todos los campos para reanudar el cupón'});
        }
        else{
            axiosInstance.post('/update'+this.state.catg+'Finalizado',{
                'idCupon': this.state.idCupon,
                'stockMax': this.state.stockMax,
                'fecha_ven': this.state.fechaVenc
            }).then(res => {
                this.setState({display:'none'});
                swal({title:"¡Cupon reanudado correctamente!",icon:"success",confirmButtonText: "Aceptar"});
                setTimeout(() => {
                    window.location.reload();
                    window.scrollTo(0, 0)
                }, 1500);
    
            }).catch(error => {
                this.setState({display:'none'});
                swal({title:"Ha ocurrido un error", text:"Favor intente más tarde",icon:"error",confirmButtonText: "Aceptar"});
                this.resetForm();
            })
        }

    }

    resetForm(){
        this.setState({
            resultCupones:'', stockMin:'', stockMax:'', fechaVenc:'',open:false, idCupon:''
        })
    }


    render(){
        const {errors} = this.state;
        return(
            <div className="">
                <Menu></Menu>
                <Snackbar open={this.state.openA} autoHideDuration={6000} onClose={this.handleCloseA}>
                        <Alert onClose={this.handleCloseA} severity="error">
                        {this.state.error}
                        </Alert>
                </Snackbar>

                <div className="loader-page3" style={{display:this.state.display}}>
                    <div className="lds-ripple"><div></div><div></div></div>
                </div>

                <Modal open={this.state.open} onClose={this.handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                    <div style={{ position: 'absolute', width: '400', backgroundColor:'white'}} className="modal-main">
                        <div className="contenedor-cupon">
                            <h4>Reanudar Cupón</h4>

                            <div className="contenido_form col-center">
                                <div className="form-group row mb-4">
                                    <label className="col-form-label text-md-right col-12 col-md-4 col-lg-4">Nuevo Stock Mínimo</label>
                                    <div className="col-sm-12 col-md-8">
                                        <input name="stockMin" type="number" className="form-control" maxLength="5" min="1" value={this.state.stockMin}
                                        onChange={this.handleChange}/>
                                        {errors.stockMin.length > 0 && 
                                        <span className='error'>{errors.stockMin}</span>}
                                    </div>
                                </div>

                       
                                <div className="form-group row mb-4">
                                    <label className="col-form-label text-md-right col-12 col-md-4 col-lg-4">Nuevo Stock Máximo</label>
                                    <div className="col-sm-12 col-md-8">
                                        <input name="stockMax" type="number" className="form-control" maxLength="5" min="1" value={this.state.stockMax}
                                        onChange={this.handleChange}/>
                                        {errors.stockMax.length > 0 && 
                                        <span className='error'>{errors.stockMax}</span>}
                                    </div>
                                </div>
                         

                                <div className="form-group row mb-4">
                                    <label className="col-form-label text-md-right col-12 col-md-4 col-lg-4">Nueva Fecha de Cierre</label>
                                    <div className="col-sm-12 col-md-8">
                                        <input name="fechaVenc" className="form-control" type="datetime-local" id="hora" value={this.state.fechaVenc}
                                        onChange={this.handleChange}/>
                                        {errors.fechaVenc.length > 0 && 
                                        <span className='error'>{errors.fechaVenc}</span>}
                                    </div>
                                </div>

                                
                                    <div className="text-center">
                                        <button id="ReanudarCupon" className="btn btn-primary" onClick={this.updateCupon}>Reanudar Cupón</button>
                                    </div>
                                
                                
                            </div>


                        </div>
                    </div>
                </Modal>

                <Modal open={this.state.openDet} onClose={this.handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                    <div style={{ position: 'absolute', width: '400', backgroundColor:'white'}} className="modal-main">
                        <div className="contenedor-datos">
                            <h4>Datos de Contacto</h4>

                            <div className="contenido_form col-center">
                                <div className="form-group row mb-4">
                                    <label className="col-form-label text-md-right col-12 col-md-4 col-lg-4">Telefóno</label>
                                    <div className="col-sm-12 col-md-8">
                                        <input name="tlf" readOnly={true} type="text" className="form-control" defaultValue={this.state.tienda[0]} />
                                    </div>
                                </div>

                                <div className="form-group row mb-4">
                                    <label className="col-form-label text-md-right col-12 col-md-4 col-lg-4">Email</label>
                                    <div className="col-sm-12 col-md-8">
                                        <input name="email" readOnly={true} type="text" className="form-control" defaultValue={this.state.tienda[1]} />
                                    </div>
                                </div>

                                <div className="form-group row mb-4">
                                    <label className="col-form-label text-md-right col-12 col-md-4 col-lg-4">Nombre</label>
                                    <div className="col-sm-12 col-md-8">
                                        <input name="name" readOnly={true} type="text" className="form-control" defaultValue={this.state.tienda[2]} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
                
                {this.state.loading && this.state.loading2 ? (
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
                    <div className="main-content">
                        <section id="panel-cupones" className="section">
                            <div id="Rows" className="row cupones ">
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 col-center">
                                    <h2>Cupones Finalizados</h2>
                                </div>

                                <div className="col-md-12 col-sm-12 col-xs-12 rows-cupones">

                                    {Object.keys(this.state.resultCuponesDestacado).map (i =>{
                                        return(
                                            <div key={i} className="card col-sm-6 col-md-6 col3 m-2">
                                                <div className="card-statistic-4">
                                                    <div className="align-items-center justify-content-between">
                                                        <div className="row cupones_check">
            
                                                            <div className="col-lg-5 col-md-5 col-sm-6 col-xs-6 pt-3">
                                                                <div className="imagen-row" style={{backgroundImage:`url(${this.state.resultCuponesDestacado[i].Imagen})`}}></div>
                                                            </div>
            
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pl-3">
                                                                <div className="card-content">
                                                                    <h5 className="font-15">{this.state.resultCuponesDestacado[i].Titulo}</h5>
                                                                    <h3 className="mb-3 font-18">{this.state.resultCuponesDestacado[i].Detalles}</h3>
                                                                    <p className="mb-0 p-red">{this.state.resultCuponesDestacado[i].Disponibilidad_Estandar} Stock</p>
                                                                    <p className="mb-o"><span className="bold"/>{this.state.resultCuponesDestacado[i].Fecha_Vencimiento}</p>
                                                                </div>
                                                                <button id="0" className="btn btn-primary btn_cupones" 
                                                                onClick={this.handleSelectCupon.bind(this, this.state.resultCuponesDestacado[i].Id, "CuponSemana")}>Reanudar</button>
                                                                <button id="0" className="btn btn-primary btn_cupones" 
                                                                onClick={this.handleDetalles.bind(this, this.state.resultCuponesDestacado[i].Tienda)}>Datos de Contacto</button>
                                                                <button id="0" className="btn btn-secondary btn_cupones" 
                                                                onClick={this.handleSuspender.bind(this, this.state.resultCuponesDestacado[i].Id, "CuponSemana")}>Suspender</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}

                                    {Object.keys(this.state.resultCupones).map (i =>{
                                        return(
                                            <div key={i} className="card col-sm-6 col-md-6 col1 m-2">
                                                <div className="card-statistic-4">
                                                    <div className="align-items-center justify-content-between">
                                                        <div className="row cupones_check">
            
                                                            <div className="col-lg-5 col-md-5 col-sm-6 col-xs-6 pt-3">
                                                                <div className="imagen-row" style={{backgroundImage:`url(${this.state.resultCupones[i].Imagen})`}}></div>
                                                            </div>
            
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pl-3">
                                                                <div className="card-content">
                                                                    <h5 className="font-15">{this.state.resultCupones[i].Titulo}</h5>
                                                                    <h3 className="mb-3 font-18">{this.state.resultCupones[i].Detalles}</h3>
                                                                    <p className="mb-0 p-red">{this.state.resultCupones[i].Disponibilidad_Estandar} Stock</p>
                                                                    <p className="mb-o"><span className="bold"/>{this.state.resultCupones[i].Fecha_Vencimiento}</p>
                                                                </div>
                                                                <button id="0" className="btn btn-primary btn_cupones" 
                                                                onClick={this.handleSelectCupon.bind(this, this.state.resultCupones[i].Id, "Cupones")}>Reanudar</button>
                                                                <button id="0" className="btn btn-primary btn_cupones" 
                                                                onClick={this.handleDetalles.bind(this, this.state.resultCupones[i].Tienda)}>Datos de Contacto</button>
                                                                <button id="0" className="btn btn-secondary btn_cupones" 
                                                                onClick={this.handleSuspender.bind(this, this.state.resultCupones[i].Id, "Cupones")}>Suspender</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}

                                    {Object.keys(this.state.resultCuponesComida).map (i =>{
                                        return(
                                            <div key={i} className="card col-sm-6 col-md-6 col1 m-2">
                                                <div className="card-statistic-4">
                                                    <div className="align-items-center justify-content-between">
                                                        <div className="row cupones_check">
            
                                                            <div className="col-lg-5 col-md-5 col-sm-6 col-xs-6 pt-3">
                                                                <div className="imagen-row" style={{backgroundImage:`url(${this.state.resultCuponesComida[i].Imagen})`}}></div>
                                                            </div>
            
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pl-3">
                                                                <div className="card-content">
                                                                    <h5 className="font-15">{this.state.resultCuponesComida[i].Titulo}</h5>
                                                                    <h3 className="mb-3 font-18">{this.state.resultCuponesComida[i].Detalles}</h3>
                                                                    <p className="mb-0 p-red">{this.state.resultCuponesComida[i].Disponibilidad_Estandar} Stock</p>
                                                                    <p className="mb-o"><span className="bold"/>{this.state.resultCuponesComida[i].Fecha_Vencimiento}</p>
                                                                </div>
                                                                <button id="0" className="btn btn-primary btn_cupones" 
                                                                onClick={this.handleSelectCupon.bind(this, this.state.resultCuponesComida[i].Id, "Comida")}>Reanudar</button>
                                                                <button id="0" className="btn btn-primary btn_cupones" 
                                                                onClick={this.handleDetalles.bind(this, this.state.resultCuponesComida[i].Tienda)}>Datos de Contacto</button>
                                                                <button id="0" className="btn btn-secondary btn_cupones" 
                                                                onClick={this.handleSuspender.bind(this, this.state.resultCuponesComida[i].Id, "Comida")}>Suspender</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}

                                    {Object.keys(this.state.resultCuponesSalud).map (i =>{
                                        return(
                                            <div key={i} className="card col-sm-6 col-md-6 col1 m-2">
                                                <div className="card-statistic-4">
                                                    <div className="align-items-center justify-content-between">
                                                        <div className="row cupones_check">
            
                                                            <div className="col-lg-5 col-md-5 col-sm-6 col-xs-6 pt-3">
                                                                <div className="imagen-row" style={{backgroundImage:`url(${this.state.resultCuponesSalud[i].Imagen})`}}></div>
                                                            </div>
            
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pl-3">
                                                                <div className="card-content">
                                                                    <h5 className="font-15">{this.state.resultCuponesSalud[i].Titulo}</h5>
                                                                    <h3 className="mb-3 font-18">{this.state.resultCuponesSalud[i].Detalles}</h3>
                                                                    <p className="mb-0 p-red">{this.state.resultCuponesSalud[i].Disponibilidad_Estandar} Stock</p>
                                                                    <p className="mb-o"><span className="bold"/>{this.state.resultCuponesSalud[i].Fecha_Vencimiento}</p>
                                                                </div>
                                                                <button id="0" className="btn btn-primary btn_cupones" 
                                                                onClick={this.handleSelectCupon.bind(this, this.state.resultCuponesSalud[i].Id, "MejorEnSalud")}>Reanudar</button>
                                                                <button id="0" className="btn btn-primary btn_cupones" 
                                                                onClick={this.handleDetalles.bind(this, this.state.resultCuponesSalud[i].Tienda)}>Datos de Contacto</button>
                                                                <button id="0" className="btn btn-secondary btn_cupones" 
                                                                onClick={this.handleSuspender.bind(this, this.state.resultCuponesSalud[i].Id, "MejorEnSalud")}>Suspender</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}

                                    {Object.keys(this.state.resultCuponesBelleza).map (i =>{
                                        return(
                                            <div key={i} className="card col-sm-6 col-md-6 col1 m-2">
                                                <div className="card-statistic-4">
                                                    <div className="align-items-center justify-content-between">
                                                        <div className="row cupones_check">
            
                                                            <div className="col-lg-5 col-md-5 col-sm-6 col-xs-6 pt-3">
                                                                <div className="imagen-row" style={{backgroundImage:`url(${this.state.resultCuponesBelleza[i].Imagen})`}}></div>
                                                            </div>
            
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pl-3">
                                                                <div className="card-content">
                                                                    <h5 className="font-15">{this.state.resultCuponesBelleza[i].Titulo}</h5>
                                                                    <h3 className="mb-3 font-18">{this.state.resultCuponesBelleza[i].Detalles}</h3>
                                                                    <p className="mb-0 p-red">{this.state.resultCuponesBelleza[i].Disponibilidad_Estandar} Stock</p>
                                                                    <p className="mb-o"><span className="bold"/>{this.state.resultCuponesBelleza[i].Fecha_Vencimiento}</p>
                                                                </div>
                                                                <button id="0" className="btn btn-primary btn_cupones" 
                                                                onClick={this.handleSelectCupon.bind(this, this.state.resultCuponesBelleza[i].Id, "Belleza")}>Reanudar</button>
                                                                <button id="0" className="btn btn-primary btn_cupones" 
                                                                onClick={this.handleDetalles.bind(this, this.state.resultCuponesBelleza[i].Tienda)}>Datos de Contacto</button>
                                                                <button id="0" className="btn btn-secondary btn_cupones" 
                                                                onClick={this.handleSuspender.bind(this, this.state.resultCuponesBelleza[i].Id, "Belleza")}>Suspender</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}

                                    {Object.keys(this.state.resultCuponesDolar).map (i =>{
                                        return(
                                            <div key={i} className="card col-sm-6 col-md-6 col1 m-2">
                                                <div className="card-statistic-4">
                                                    <div className="align-items-center justify-content-between">
                                                        <div className="row cupones_check">
            
                                                            <div className="col-lg-5 col-md-5 col-sm-6 col-xs-6 pt-3">
                                                                <div className="imagen-row" style={{backgroundImage:`url(${this.state.resultCuponesDolar[i].Imagen})`}}></div>
                                                            </div>
            
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pl-3">
                                                                <div className="card-content">
                                                                    <h5 className="font-15">{this.state.resultCuponesDolar[i].Titulo}</h5>
                                                                    <h3 className="mb-3 font-18">{this.state.resultCuponesDolar[i].Detalles}</h3>
                                                                    <p className="mb-0 p-red">{this.state.resultCuponesDolar[i].Disponibilidad_Estandar} Stock</p>
                                                                    <p className="mb-o"><span className="bold"/>{this.state.resultCuponesDolar[i].Fecha_Vencimiento}</p>
                                                                </div>
                                                                <button id="0" className="btn btn-primary btn_cupones" 
                                                                onClick={this.handleSelectCupon.bind(this, this.state.resultCuponesDolar[i].Id, "Dolar")}>Reanudar</button>
                                                                <button id="0" className="btn btn-primary btn_cupones" 
                                                                onClick={this.handleDetalles.bind(this, this.state.resultCuponesDolar[i].Tienda)}>Datos de Contacto</button>
                                                                <button id="0" className="btn btn-secondary btn_cupones" 
                                                                onClick={this.handleSuspender.bind(this, this.state.resultCuponesDolar[i].Id, "Dolar")}>Suspender</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}

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

export default CuponesVencidos;