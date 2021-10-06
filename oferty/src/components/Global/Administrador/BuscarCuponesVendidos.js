import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import Menu from './Components/Menu';

import config from '../../../config/config';
import axios from "axios";

import icono from '../../Global/images/admin/icono.png';

//Librerias para el modal
import Modal from '@material-ui/core/Modal';

import Chart from "react-apexcharts";
import Footer from './Components/Footer';

const axiosInstance = axios.create({
    baseURL: config.backURL
});




class BuscarCuponesVendidos extends React.Component{

    
    constructor(props)
    {
        super(props);
        this.state ={ cuponesVendidos:[], metodo:'none', fecha:'none', titulo:'none', usuario:'none', mes:'Enero', year:'2021', displayTable:'none', img:'flex', gif:'none',
        Metodo:'Efectivo', tittle:'', user:'', open:false, details:[], details2:[],tienda:[], codigos:[], displayFecha:'none', Estadistica:'none', series:[], cuponesData:'',
        cuponesVendidosWha:[],
        total:'',
        options: {
            chart: {
              type: 'bar',
              height: 350
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '35%',
                endingShape: 'rounded'
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: ['value'],
            },
            yaxis: {
              title: {
                text: 'Ventas de cada cupón'
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val 
                }
              }
            }
          }
        }

        this.handleSelectCupon = this.handleSelectCupon.bind(this);
        this.handleClickFecha = this.handleClickFecha.bind(this);
        this.handleSelectFecha = this.handleSelectFecha.bind(this);
        this.handleClickMetodo = this.handleClickMetodo.bind(this);
        this.handleClickTitulo = this.handleClickTitulo.bind(this);
        this.handleClickUser = this.handleClickUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDetalles = this.handleDetalles.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickEstadistica = this.handleClickEstadistica.bind(this);
    }

    handleClose(){
        this.setState({...this.state.open, open:false});    
    }

    handleDetalles(value,value2){
        var val = [];
        axiosInstance.get('/detallesCuponesComprados/'+value + '/'+ value2).then(res=> {
            Object.keys(res.data.CodigoCupones).map(i => {
                val.push(res.data.CodigoCupones[i]);
                return val;
            })
            this.setState({codigos: val})

            axiosInstance.get('/getCupones/'+ res.data.Id).then(resData => {
                this.setState({tienda:resData.data});

                axiosInstance.get('/detallesCuponesComprados2/'+value).then(resChild => {
                    this.setState({details2:resChild.data});
                    this.setState({open:true});
                })
            })

        })
    }

    handleSelectCupon(event){
        const val = event.target.value;
        this.setState({fecha:'none', titulo:'none', metodo:'none', usuario:'none', displayTable:'none', img:'block', cuponesVendidos:''})
        switch(val){
            case 'Fecha':
                this.setState({fecha:'flex'});
            break;

            case 'Titulo':
                this.setState({titulo:'flex'});
            break;

            case 'Metodo':
                this.setState({metodo:'flex'});
            break;

            case 'Usuario':
                this.setState({usuario:'flex'});
            break;

            default:
                this.setState({fecha:'none', titulo:'none', metodo:'none', usuario:'none',displayTable:'none'});
            break;
        }
    }

    handleChange(event){
        const target = event.target;
        const value =  target.value;
        const name = target.name;
    
        this.setState({
        [name]: value
        });
    }

    functionEstadistica(){
        var data=[];
        var cantidad=[];
        let total = 0;
        Object.keys(this.state.cuponesVendidos).map(i=>{
            data.push(this.state.cuponesVendidos[i].NombreCupones);
            cantidad.push(this.state.cuponesVendidos[i].Cantidad);
            total += parseInt(this.state.cuponesVendidos[i].Cantidad);
            return data;
        })

        Object.keys(this.state.cuponesVendidosWha).map(i=>{
            data.push(this.state.cuponesVendidosWha[i].NombreCupones);
            cantidad.push(this.state.cuponesVendidosWha[i].Cantidad);
            total += parseInt(this.state.cuponesVendidosWha[i].Cantidad);
            return data;
        })

        this.setState({
            options: {
              ...this.state.options,
              xaxis: {
                ...this.state.options.xaxis,
                categories: data
              }
            },
            series: [{
                ...this.state.series,
                name:'Cantidad',
                data:cantidad
            }],
        })

        var div = total/3;
        if(Number.isInteger(div)){
            this.setState({total: div})
        }
        else{
            var decimal = Math.ceil(div);
            this.setState({total: decimal})
        }

    }



    handleSelectFecha(event){
        const val = event.target.value;
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: val
        });
    }

    handleClickFecha(){
        this.setState({img:'none', gif:'flex', displayFecha:'flex'});
        axiosInstance('/getCuponesCompradosFecha/'+ this.state.mes +'/'+this.state.year).then(res=>{
            this.setState({displayTable:'block', gif:'none'})
            this.setState({cuponesVendidos:res.data})
        })

        axiosInstance('/getCuponesCompradosFechaWhatsapp/'+ this.state.mes +'/'+this.state.year).then(res=>{
            this.setState({cuponesVendidosWha:res.data})
        })
    }

    handleClickMetodo(){
        this.setState({img:'none', gif:'flex'});
        axiosInstance('/getCuponesCompradosMetodo/'+ this.state.Metodo).then(res=>{
            this.setState({displayTable:'block', gif:'none'})
            this.setState({cuponesVendidos:res.data})
        })

        axiosInstance('/getCuponesCompradosMetodoWhatsapp/'+ this.state.Metodo).then(res=>{
            this.setState({displayTable:'block', gif:'none'})
            this.setState({cuponesVendidosWha:res.data})
        })
    }

    handleClickTitulo(){
        this.setState({img:'none', gif:'flex'});
        axiosInstance('/getCuponesCompradosTitulo/'+ this.state.tittle).then(res=>{
            this.setState({displayTable:'block', gif:'none'})
            this.setState({cuponesVendidos:res.data})
        })

        axiosInstance('/getCuponesCompradosTituloWhatsapp/'+ this.state.tittle).then(res=>{
            this.setState({displayTable:'block', gif:'none'})
            this.setState({cuponesVendidosWha:res.data})
        })
    }

    handleClickUser(){
        this.setState({img:'none', gif:'flex'});
        axiosInstance('/getCuponesCompradosName/'+ this.state.user).then(res=>{
            this.setState({displayTable:'block', gif:'none'})
            this.setState({cuponesVendidos:res.data})
        })

        axiosInstance('/getCuponesCompradosNameWhatsapp/'+ this.state.user).then(res=>{
            this.setState({displayTable:'block', gif:'none'})
            this.setState({cuponesVendidosWha:res.data})
        })
    }

    handleClickEstadistica(){
        this.setState({Estadistica:'block'});
        this.functionEstadistica();
    }

    render(){
        var cont=0;
        return(
            <div className="">
                <Menu></Menu>

                <Modal open={this.state.open} onClose={this.handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                    <div style={{ position: 'absolute', width: '400', backgroundColor:'white'}} className="modal-main">
                        <div className="contenedor-cupon">
                            <h4>Detalles del Cupón</h4>
                            <hr></hr>
                            <p><strong>Usuario: </strong><span> {this.state.details2.Nombre}</span></p>
                            <p><strong>Cupon de la Tienda: </strong><span> {this.state.tienda.Tienda}</span></p>
                            <p><strong>Tipo de Pago: </strong> {this.state.details2.TipoDePago}</p>
                            <hr></hr>
                            <h4>Códigos del Cupón</h4>
                            <table>
                                <thead>  
                                    <tr>
                                        <th>Cupon</th>
                                        <th>Código</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>   
                                <tbody>
                                    {Object.keys(this.state.codigos).map(i =>{
                                        cont++;
                                        return(
                                            <tr key={i}>
                                                <td><strong>Cupon {cont}:</strong></td>
                                                <td>{this.state.codigos[i].Codigo}</td>
                                                <td>{this.state.codigos[i].Status}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>    
                        </div>
                    </div>
                </Modal> 

                <div id="main-pago" className="main-content">
                    <section id="section-searchCup" className="section">
                        <div className="section-body">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header header-center">
                                            <h5>Buscar por</h5>
                                            <div className="card-header-form">
                                                <form>
                                                    <div className="input-group">
                                                        <select type="text" className="form-control form-select" onChange={this.handleSelectCupon}>
                                                            <option>Seleccione una opción</option>
                                                            <option value="Fecha">Fecha</option>
                                                            <option value="Titulo">Titulo del Cupón</option>
                                                            <option value="Metodo">Método de Pago</option>
                                                            <option value="Usuario">Usuario</option>
                                                        </select>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                        <div className="card-header header-center cont-space" style={{display:this.state.fecha}}>
                                            <h6>Seleccionar Mes: </h6>
                                            <div className="card-header-form">
                                                <form>
                                                    <div className="input-group">
                                                        <select name="mes" type="text" className="form-control form-select" onChange={this.handleSelectFecha}>
                                                            <option value="Enero">Enero</option>
                                                            <option value="Febrero">Febrero</option>
                                                            <option value="Marzo">Marzo</option>
                                                            <option value="Abril">Abril</option>
                                                            <option value="Mayo">Mayo</option>
                                                            <option value="Junio">Junio</option>
                                                            <option value="Julio">Julio</option>
                                                            <option value="Agosto">Agosto</option>
                                                            <option value="Septiembre">Septiembre</option>
                                                            <option value="Octubre">Octubre</option>
                                                            <option value="Noviembre">Noviembre</option>
                                                            <option value="Diciembre">Diciembre</option>
                                                        </select>
                                                    </div>
                                                </form>
                                            </div>
                                            <h6 className="margin-left">Año: </h6>
                                            <div className="card-header-form">
                                                <form>
                                                    <div className="input-group">
                                                        <select name="year" type="text" className="form-control form-select" onChange={this.handleSelectFecha}>
                                                            <option value="2021">2021</option>
                                                            <option value="2022">2022</option>
                                                            <option value="2023">2023</option>
                                                            <option value="2024">2024</option>
                                                            <option value="2025">2025</option>
                                                            <option value="2026">2026</option>
                                                        </select>
                                                    </div>
                                                </form>
                                            </div>
                                            <button className="btn btn-primary margin-left" onClick={this.handleClickFecha}>Buscar</button>
                                        </div>

                                        <div className="card-header header-center cont-space" style={{display:this.state.metodo}}>
                                            <h6>Seleccionar Método de Pago: </h6>
                                            <div className="card-header-form">
                                                <form>
                                                    <div className="input-group">
                                                        <select name="Metodo" type="text" className="form-control form-select" onChange={this.handleSelectFecha}>
                                                            <option value="Efectivo">Efectivo</option>
                                                            <option value="Transferencia">Transferencia</option>
                                                            <option value="Pago Movil">Pago móvil</option>
                                                            <option value="Paypal">Paypal</option>
                                                        </select>
                                                    </div>
                                                </form>
                                            </div>
                                            <button className="btn btn-primary margin-left" onClick={this.handleClickMetodo}>Buscar</button>
                                        </div>

                                        <div className="card-header header-center cont-space" style={{display:this.state.titulo}}>
                                            <h6>Titulo: </h6>
                                            <div className="card-header-form">
                                                <form>
                                                    <div className="input-group">
                                                    <input name="tittle" type="text" placeholder="Titulo del Cupón" className="form-control"
                                                    onChange={this.handleChange} value={this.state.tittle}></input>
                                                    </div>
                                                </form>
                                            </div>
                                            <button className="btn btn-primary margin-left" onClick={this.handleClickTitulo}>Buscar</button>
                                        </div>

                                        <div className="card-header header-center cont-space" style={{display:this.state.usuario}}>
                                            <h6>Usuario: </h6>
                                            <div className="card-header-form">
                                                <form>
                                                    <div className="input-group">
                                                    <input name="user" type="text" placeholder="Nombre del Usuario" className="form-control"
                                                    onChange={this.handleChange} value={this.state.user}></input>
                                                    </div>
                                                </form>
                                            </div>
                                            <button className="btn btn-primary margin-left" onClick={this.handleClickUser}>Buscar</button>
                                        </div>
                                        

                                        <div className="card-body p-0">
                                            <div className="contenedoradm-img" style={{display:this.state.img}}>
                                                <img src={icono} alt="Icono Busqueda" className="img-responsive"></img>
                                            </div>

                                            <div className="lds-roller" style={{display:this.state.gif}}><div>
                                            </div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>


                                            <div className="table-responsive" style={{display: this.state.displayTable}}>
                                                <table id="tabla_pagos" className="table table-striped">
                                                    <thead>  
                                                        <tr>
                                                            <th className="text-center"></th>
                                                            <th>Fecha de Compra</th>
                                                            <th>Nombre de Usuario</th>
                                                            <th>Nombre del Cupón</th>
                                                            <th>Cantidad</th>
                                                            <th>Acción</th>
                                                        </tr>
                                                    </thead>     

                                                    {this.state.cuponesVendidos.length > 0 || this.state.cuponesVendidosWha.length > 0 ? (
                                                        <tbody>
                                                            {Object.keys(this.state.cuponesVendidos).map (i =>{ 
                                                                return(
                                                                    <tr key={i}>
                                                                        <td></td>
                                                                        <td className="nombre">{(this.state.cuponesVendidos[i].Fecha)}</td>
                                                                        <td className="email">{this.state.cuponesVendidos[i].NameUser}</td>
                                                                        <td>{this.state.cuponesVendidos[i].NombreCupones}</td>
                                                                        <td>{this.state.cuponesVendidos[i].Cantidad}</td>

                                                                        <td>
                                                                            <button id="detail" className="btn btn-prim btn_detail" 
                                                                            onClick={this.handleDetalles.bind(this,this.state.cuponesVendidos[i].IdGeneral,
                                                                                this.state.cuponesVendidos[i].IdCupones)}>Ver Detalles</button>
                                                                        </td>
                                                                    </tr>

                                                                )

                                                            })}

                                                            {Object.keys(this.state.cuponesVendidosWha).map (i =>{ 
                                                                return(
                                                                    <tr key={i}>
                                                                        <td></td>
                                                                        <td className="nombre">{(this.state.cuponesVendidosWha[i].Fecha)}</td>
                                                                        <td className="email">{this.state.cuponesVendidosWha[i].NameUser}</td>
                                                                        <td>{this.state.cuponesVendidosWha[i].NombreCupones}</td>
                                                                        <td>{this.state.cuponesVendidosWha[i].Cantidad}</td>

                                                                        <td>
                                                                            <button id="detail" className="btn btn-prim btn_detail" 
                                                                            onClick={this.handleDetalles.bind(this,this.state.cuponesVendidosWha[i].IdGeneral,
                                                                                this.state.cuponesVendidosWha[i].IdCupones)}>Ver Detalles</button>
                                                                        </td>
                                                                    </tr>

                                                                )

                                                            })}
                                                        </tbody>
                                                    ):(
                                                        <tbody>
                                                            <tr>
                                                                <td className="p-0 text-center"></td>
                                                                <td>No hay cupones disponibles.</td>
                                                            </tr>
                                                        </tbody>

                                                    )
                                                    }
                                                </table>
                                            </div>
                                        </div>                 
                                    </div>
                                    <div className="btn-center" style={{display:this.state.displayFecha}}>
                                        <button className="btn btn-success" onClick={this.handleClickEstadistica}> VER ESTADÍSTICAS</button>
                                    </div>
                                </div>
                            </div>

                            <div id="Estadistica_card" className="row" style={{display:this.state.Estadistica}}>
                                <div className="col-12">
                                    <div className="card">
                                        <h5>Estadísticas del Mes de {this.state.mes}</h5>
                                        <div className="card-estadistica">
                                                <div className="recent-report__chart">
                                                    {this.state.cuponesVendidos ? (
                                                        <div className="">
                                                            <div className="">
                                                                <Chart height= '350' type= "bar" options={this.state.options} series={this.state.series}>
                                                                </Chart>
                                                            </div>

                                                            <h4><strong>TOTAL = {this.state.total} $</strong></h4>
                                                        </div>
                                                        ): (
                                                        <h4>NO DISPONIBLE. No hay ninguna venta para esa fecha</h4>
                                                    )}
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

export default BuscarCuponesVendidos;