import './css/Dashboard.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';


import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';
import Menu from './Components/Menu';
import Chart from "react-apexcharts";
import Footer from './Components/Footer';

//Imagenes
import Icono2 from '../../Global/images/admin/Figura4.png';
import Icono3 from '../../Global/images/admin/Figura5.png';
import Icono4 from '../../Global/images/admin/Figura6.png';
import Icono5 from '../../Global/images/admin/Figura7.png';
import Icono6 from '../../Global/images/admin/Figura8.png';
import Icono7 from '../../Global/images/admin/Figura21.png';
import { Component } from 'react';

class Dashboard extends Component{

    constructor(props) {
        super(props);

        this.state = {
        
          series: [
            {
              name: "High - 2013",
              data: [5, 15, 14, 36, 32, 32]
            },
            {
              name: "Low - 2013",
              data: [7, 11, 30, 18, 25, 13]
            }
          ],
          options: {
            chart: {
              height: 350,
              type: 'line',
              shadow: {
                enabled: true,
                color: "#000",
                top: 18,
                left: 7,
                blur: 10,
                opacity: 1
            },
              toolbar: {
                show: false
              }
            },
            colors: ["#786BED", "#999b9c"],
            dataLabels: {
              enabled: true,
            },
            stroke: {
              curve: 'smooth'
            },
            grid: {
              borderColor: 'transparent',
              row: {
                colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            markers: {
              size: 1
            },
            xaxis: {
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              title: {
                text: 'Month'
              }
            },
            yaxis: {
                title: {
                    text: "Income"
                },
                labels: {
                    style: {
                        color: "#9aa0ac"
                    }
                },
                min: 5,
                max: 40
            },
            legend: {
                position: "top",
                horizontalAlign: "right",
                floating: true,
                offsetY: -25,
                offsetX: -5
            }
          },
        
        
        };
    }

    render(){  
        return(

            <div id="admin" className="admin theme-white">
                <Menu></Menu>

                <div className="main-content">
                    <section className="section">
                        <div className="row">

                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="card">
                                    <Link to="/Dashboard-Cupones">
                                        <div className="card-statistic-4">
                                            <div className="align-items-center justify-content-between">
                                                <div className="row ">
                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                                                        <div className="card-content">
                                                            <h5 className="font-15">Promociones en</h5>
                                                            <h2 className="mb-3 font-18">Cupones</h2>
                                                            <p className="mb-0">Agregar y/o Modificar</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                                                        <div className="banner-img">
                                                            <img src={Icono3} alt="Icono Promo"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>


                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="card">

                                    <Link to="/Administrador-RegistrarTiendas">
                                        <div className="card-statistic-4">
                                            <div className="align-items-center justify-content-between">

                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                                                        <div className="card-content">
                                                            <h5 className="font-15">Promociones en</h5>
                                                            <h2 className="mb-3 font-18">Tiendas Nuevas</h2>
                                                            <p className="mb-0">Agregar y/o Modificar</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                                                        <div className="banner-img">
                                                            <img src={Icono2} alt="Icono tiendas"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>


                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 card-coupons">
                                <div className="card">
                                    <span id="Notification_cupon" className="badge headerBadge1">
                                    6 </span>

                                    <Link to="/Administrador-PanelCuponesVencidos">
                                        <div className="card-statistic-4">
                                            <div className="align-items-center justify-content-between">
                                                <div className="row ">
                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                                                        <div className="card-content">
                                                            <h5 className="font-15">Tiempo finalizado</h5>
                                                            <h2 className="mb-3 font-18">Cupones Vencido</h2>
                                                            <p className="mb-0">Gestionar afiliados</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                                                        <div className="banner-img">
                                                            <img src={Icono4} alt="Icono Cupon"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>


                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 card-coupons">
                                <div className="card">
                                    <span id="Notification_pagos" className="badge headerBadge1">
                                    6 </span>

                                    <Link to="/Administrador-ReporteDePagos">
                                        <div className="card-statistic-4">
                                            <div className="align-items-center justify-content-between">
                                                <div className="row ">
                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                                                        <div className="card-content">
                                                            <h5 className="font-15">Pagos</h5>
                                                            <h2 className="mb-3 font-18">Reporte de Pagos</h2>
                                                            <p className="mb-0">Gestionar</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                                                        <div className="banner-img">
                                                            <img src={Icono5} alt="Icon Pago"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>


                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 card-coupons">
                                <div className="card">
                                    <span id="Notification_pagos" className="badge headerBadge1">
                                    6 </span>
                                    
                                    <Link to="/Dashboard-Suscripciones">
                                        <div className="card-statistic-4">
                                            <div className="align-items-center justify-content-between">
                                                <div className="row ">
                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                                                        <div className="card-content">
                                                            <h5 className="font-15"> </h5>
                                                            <h2 className="mb-3 font-18">Suscripciones</h2>
                                                            <p className="mb-0">Gestionar</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                                                        <div className="banner-img">
                                                            <img src={Icono6} alt="Icon Suscripcion"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 card-coupons">
                                <div className="card">
                                    
                                    <Link to="/Administrador-CuponesVendidos">
                                        <div className="card-statistic-4">
                                            <div className="align-items-center justify-content-between">
                                                <div className="row ">
                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                                                        <div className="card-content">
                                                            <h5 className="font-15"> </h5>
                                                            <h2 className="mb-3 font-18">Venta de Cupones</h2>
                                                            <p className="mb-0">Gestionar</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                                                        <div className="banner-img">
                                                            <img src={Icono7} alt="Icon Suscripcion"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-sm-12 col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4>Revenue chart</h4>
                                        <div className="card-header-action">
                                            <div className="dropdown">
                                                <button href="#" data-toggle="dropdown" className="btn btn-warning dropdown-toggle">Options</button>
                                                
                                                <div className="dropdown-menu">
                                                    <Link to='/' className="dropdown-item has-icon"><i className="fa fa-eye"></i> View</Link>
                                                    <Link to='/' className="dropdown-item has-icon"><i className="fa fa-edit"></i> Edit</Link>
                                                    <div className="dropdown-divider"></div>
                                                    <Link to='/' className="dropdown-item has-icon text-danger"><i className="fa fa-trash"></i>
                                                    Delete</Link>
                                                </div>
                                            </div>
                                            <button className="btn btn-primary">View All</button>
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-9">
                                                <div id="chart1">
                                                    <Chart 
                                                    height= '230'
                                                    type= "line"
                                                    options={this.state.options} 
                                                    series={this.state.series}
                                                    >

                                                    </Chart>
                                                </div>

                                                <div className="row mb-0">
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                                        <div className="list-inline text-center">
                                                            <div className="list-inline-item p-r-30"><Icon.ArrowUpCircle className="col-green"></Icon.ArrowUpCircle>
                                                                <h5 className="m-b-0">$675</h5>
                                                                <p className="text-muted font-14 m-b-0">Weekly Earnings</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                                        <div className="list-inline text-center">
                                                            <div className="list-inline-item p-r-30"><Icon.ArrowDownCircle className="col-orange"></Icon.ArrowDownCircle>
                                                                <h5 className="m-b-0">$1,587</h5>
                                                                <p className="text-muted font-14 m-b-0">Monthly Earnings</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                                        <div className="list-inline text-center">
                                                            <div className="list-inline-item p-r-30"><Icon.ArrowUpCircle className="col-green"></Icon.ArrowUpCircle>
                                                                <h5 className="mb-0 m-b-0">$45,965</h5>
                                                                <p className="text-muted font-14 m-b-0">Yearly Earnings</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-3">
                                                <div className="row mt-5">
                                                    <div className="col-7 col-xl-7 mb-3">Total customers</div>

                                                    <div className="col-5 col-xl-5 mb-3">
                                                        <span className="text-big">8,257</span>
                                                        <sup className="col-green">+09%</sup>
                                                    </div>

                                                    <div className="col-7 col-xl-7 mb-3">Total Income</div>
                                                    <div className="col-5 col-xl-5 mb-3">
                                                        <span className="text-big">$9,857</span>
                                                        <sup className="text-danger">-18%</sup>
                                                    </div>

                                                    <div className="col-7 col-xl-7 mb-3">Project completed</div>
                                                    <div className="col-5 col-xl-5 mb-3">
                                                        <span className="text-big">28</span>
                                                        <sup className="col-green">+16%</sup>
                                                    </div>

                                                    <div className="col-7 col-xl-7 mb-3">Total expense</div>
                                                    <div className="col-5 col-xl-5 mb-3">
                                                        <span className="text-big">$6,287</span>
                                                        <sup className="col-green">+09%</sup>
                                                    </div>

                                                    <div className="col-7 col-xl-7 mb-3">New Customers</div>
                                                    <div className="col-5 col-xl-5 mb-3">
                                                        <span className="text-big">684</span>
                                                        <sup className="col-green">+22%</sup>
                                                    </div>
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

export default Dashboard;