import React, { Component } from 'react';

import config from '../../../config/config';
import axios from "axios";
//import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import Menu from './Components/Menu';

import { Line } from '@reactchartjs/react-chart.js';
import Chart from "react-apexcharts";
import Footer from '../Administrador/Components/Footer';


const axiosInstance = axios.create({
    baseURL: config.backURL
});

class Detalle_Estadisticas extends Component{

    constructor(props)
    {
        super(props);
        var f = new Date();
        var fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
        this.state={
            id_cupon:this.props.match.params.id, cupones:[], contador1:0, contador2:0, contador3:0, contador4:0, contador5:0, TotalPuntos:0, fecha: fecha, ctr:0, totalPers:0,
            series:[], seriesPunt:[], loading:true,
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
                  categories: ['hasta el' + fecha],
                },
                yaxis: {
                  title: {
                    text: 'Click por Visualizacion'
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
              },

              options_puntuacion: {
                chart: {
                  type: 'bar',
                  height: 350
                },
                plotOptions: {
                  bar: {
                    dataLabels:{
                        position: 'top'
                    }
                  },
                },
                dataLabels: {
                  enabled: true,
                  formatter: function (val) {
                    return val + "%";
                    },
                    offsetY: -20,
                    style: {
                        fontSize: '12px',
                        colors: ["#9aa0ac"]
                    }
                },
                xaxis: {
                  categories: ["5 estrellas", "4 estrellas", "3 estrellas", "2 estrellas", "1 estrellas"],
                  position: 'top',
                  labels: {
                      offsetY: -8,
                      style: {
                          colors: '#9aa0ac',
                      }
                  },
                  axisBorder: {
                      show: false
                  },
                  axisTicks: {
                      show: false
                  },
                  crosshairs: {
                      fill: {
                          type: 'gradient',
                          gradient: {
                              colorFrom: '#D8E3F0',
                              colorTo: '#BED1E6',
                              stops: [0, 100],
                              opacityFrom: 0.4,
                              opacityTo: 0.5,
                          }
                      }
                  },
                  tooltip: {
                      enabled: true,
                      offsetY: -35,

                  }
                },
                yaxis: {
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false,
                    },
                    labels: {
                        show: false,
                        formatter: function (val) {
                            return val + "%";
                        }
                    }
                },
                title: {
                    text: 'Puntuado por',
                    floating: true,
                    offsetY: 320,
                    align: 'center',
                    style: {
                        color: '#9aa0ac'
                    }
                },
                fill: {
                    gradient: {
                        shade: 'light',
                        type: "horizontal",
                        shadeIntensity: 0.25,
                        gradientToColors: undefined,
                        inverseColors: true,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [50, 0, 100, 100]
                    },
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
  
    }

    //Obtener estadistica del cupon
    getCupon(){
        axiosInstance.get('/getCupones/'+ this.state.id_cupon).then(res => {
            this.setState({cupones: res.data})
            this.setState({
                series: [{
                  ...this.state.series,
                    name: 'Visualizacion',
                    data:[res.data.Visualizacion]
                  
                },
                {
                    name: 'Click',
                    data:[res.data.Click]
                }]
            })

            var ctr = ((res.data.Click/res.data.Visualizacion)*100).toFixed(1);
            this.setState({ctr: ctr, loading:false});
        })
        

        axiosInstance.get('/getPuntuacionPublicacion/'+ this.state.id_cupon).then(res => {
            var puntos =res.data;
            var totalValoracion = puntos.length;
            this.setState({totalPers: totalValoracion});
            var sumaPuntos = 0;
            var totalPuntos = 0;
            var puntuacion1 = 0;
            var puntuacion2 = 0;
            var puntuacion3 = 0;
            var puntuacion4 = 0;
            var puntuacion5 = 0;

            //Contadores
            puntos.forEach(item =>{
                if(item === 1){
                    this.setState({contador1: 1+this.state.contador1});
                }

                if(item === 2){
                    this.setState({contador2: 1+this.state.contador2});
                }

                if(item === 3){
                    this.setState({contador3: 1+this.state.contador3});
                }

                if(item === 4){
                    this.setState({contador4: 1+this.state.contador4});
                }

                if(item === 5){
                    this.setState({contador5: 1+this.state.contador5});
                }
                sumaPuntos += item;
            })
            
            totalPuntos = (sumaPuntos / totalValoracion).toFixed(1);
            this.setState({TotalPuntos: totalPuntos});

            puntuacion1 = this.trunc(((this.state.contador1/parseInt(totalValoracion))*100),2);
            puntuacion2 = this.trunc(((this.state.contador2/parseInt(totalValoracion))*100),2);
            puntuacion3 = this.trunc(((this.state.contador3/parseInt(totalValoracion))*100),2);
            puntuacion4 = this.trunc(((this.state.contador4/parseInt(totalValoracion))*100),2);
            puntuacion5 = this.trunc(((this.state.contador5/parseInt(totalValoracion))*100),2);

            this.setState({
                seriesPunt: [{
                  ...this.state.series,
                    name: 'Puntuacion',
                    data:[puntuacion5, puntuacion4, puntuacion3, puntuacion2, puntuacion1]
                }]
            })

        })
    }

    trunc (x, posiciones = 0) {
        var s = x.toString()
        var l = s.length
        var decimalLength = s.indexOf('.') + 1
      
        if (l - decimalLength <= posiciones){
          return x
        }
        // Parte decimal del número
        var isNeg  = x < 0
        var decimal =  x % 1
        var entera  = isNeg ? Math.ceil(x) : Math.floor(x)
        // Parte decimal como número entero
        // Ejemplo: parte decimal = 0.77
        // decimalFormated = 0.77 * (10^posiciones)
        // si posiciones es 2 ==> 0.77 * 100
        // si posiciones es 3 ==> 0.77 * 1000
        var decimalFormated = Math.floor(
          Math.abs(decimal) * Math.pow(10, posiciones)
        )
        // Sustraemos del número original la parte decimal
        // y le sumamos la parte decimal que hemos formateado
        var finalNum = entera +
          ((decimalFormated / Math.pow(10, posiciones))*(isNeg ? -1 : 1))
      
        return finalNum
    }

    componentDidMount = () =>{
        this.getCupon();
    }

    
    render(){
        /*
        const color = (canvas) => {
            const ctx = canvas.getContext("2d")
            var gradientStroke2 = ctx.createLinearGradient(0, 0, 700, 0);
            gradientStroke2.addColorStop(0, "rgba(255, 204, 128, 1)");
            gradientStroke2.addColorStop(0.5, "rgba(255, 152, 0, 1)");
            gradientStroke2.addColorStop(1, "rgba(239, 108, 0, 1)");
            return {
            
              backgroundColor: gradientStroke2
             
            }
        }
        */ 
        const data = {
            labels: [0, 30, 10, 120, 50, 63, 10],
            datasets: [
              {
                label: '# of Votes',
                data: [0, 30, 10, 120, 50, 63, 10],
                fill: false,
                color: '#FF7100',
                borderColor: '#FF7100',
              },
            ],
          }

          const data2 = {
            labels: [0, 30, 10, 120, 50, 63, 10],
            datasets: [
              {
                label: '# of Votes',
                data: [0, 30, 10, 120, 50, 63, 10],
                fill: false,
                color: '#0099FF',
                borderColor: '#0099FF',
              },
            ],
          }

          const data3 = {
            labels: [0, 30, 10, 120, 50, 63, 10],
            datasets: [
              {
                label: '# of Votes',
                data: [0, 30, 10, 120, 50, 63, 10],
                fill: false,
                color: '#FFCC33',
                borderColor: '#FFCC33',
              },
            ],
          }
          
          const options = {
            legend:{
                display:false
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: false,
                    display: false,
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false
                  }
                },
              ],

              xAxes:[
                {
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        display: false
                    }
                }
              ]
            },
          }

        return(
            <div className="">
                <Menu></Menu>

                {this.state.loading ? (
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

                <div className="main-content">
                    <div id="section_estadistica" className="row">
                        <div className="col-12 col-sm-12 col-lg-12">
                            <div className="card author-box card-primary">
                                <div className="card-body">
                                    <h4> Publicación: </h4>

                                    <div className="row">
                                        <div className="col-xl-3 col-lg-6 col-center">
                                            <div className="card">
                                                <div className="card-bg">
                                                    <div className="p-t-20 d-flex justify-content-between">
                                                        <div className="">
                                                            <h6 className="mb-0">Visualizaciones</h6>
                                                            <span className="font-weight-bold mb-0 font-20">{this.state.cupones.Visualizacion ? this.state.cupones.Visualizacion : 0}</span>
                                                        </div>
                                                        <i className="fa fa-eye card-icon col-orange font-30 p-r-30"></i>
                                                    </div>
                                                    <Line data={data} options={options} height={62}></Line>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-3 col-lg-6 col-center">
                                            <div className="card">
                                                <div className="card-bg">
                                                    <div className="p-t-20 d-flex justify-content-between">
                                                        <div className="">
                                                            <h6 className="mb-0">Ventas del Cupón</h6>
                                                            <span className="font-weight-bold mb-0 font-20">{this.state.cupones.Contador ? this.state.cupones.Contador : 0}</span>
                                                        </div>

                                                        <i className="fa fa-mouse-pointer card-icon col-blue2 font-30 p-r-30"></i>
                                                    </div>
                                                    <Line data={data2} options={options} height={62}></Line>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-3 col-lg-6 col-center">
                                            <div className="card">
                                                <div className="card-bg">
                                                    <div className="p-t-20 d-flex justify-content-between">
                                                        <div className="">
                                                            <h6 className="mb-0">Puntuación</h6>
                                                            <span className="font-weight-bold mb-0 font-20"> {this.state.cupones.TotalPuntos ? this.state.cupones.TotalPuntos : 0} </span>
                                                        </div>
                                                        <i className="fa fa-star card-icon col-yellow2 font-30 p-r-30"></i>
                                                    </div>
                                                    <Line data={data3} options={options} height={62}></Line>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-6">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h4>Click con respecto a visualizaciones (Tasa de Clicks)</h4>
                                                </div>

                                                <div className="card-body">
                                                    <div className="recent-report__chart">
                                                    {this.state.ctr ? (
                                                      <div className="">
                                                        <div className="">
                                                            <Chart height= '350' type= "bar" options={this.state.options} series={this.state.series}>
                                                            </Chart>
                                                        </div>


                                                        <p>Es una proporción que indica con qué frecuencia las personas que ven su cupón lo añaden al
                                                            carrito.</p>
                                                        <h4><strong>CTR = {this.state.ctr} %</strong></h4>
                                                      </div>
                                                      ): (
                                                        <h4>NO DISPONIBLE. Su cupon no tiene ninguna visualizacion.</h4>
                                                      )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-6">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h4>Balance de Puntuación</h4>
                                                </div>

                                                <div className="card-body">
                                                    <div className="recent-report__chart">
                                                      {this.state.totalPers ? (
                                                        <Chart height= '350' type= "bar" options={this.state.options_puntuacion} series={this.state.seriesPunt}>
                                                        </Chart>
                                                      ): (
                                                        <h4>NO DISPONIBLE. Su cupon no tiene ninguna puntuacion por los momentos.</h4>
                                                      )}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>            

                </div>
                )}
                <Footer></Footer>
            </div>
           
        )
    }
}
export default Detalle_Estadisticas;