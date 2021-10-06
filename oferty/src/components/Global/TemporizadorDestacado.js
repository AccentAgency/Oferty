import React, { Component } from 'react';
import config from '../../config/config';
import axios from "axios";
import './css/Temporizador.css';

//Imagen Cronometro
import img_cron from './images/cron2.png'

//Axios
const axiosInstance = axios.create({
    baseURL: config.backURL
});


class TemporizadorDestacado extends Component{
    state={
        timerOn: false,
        timerStart: 0,
        timerTime: 0
    }

    constructor(props)
    {
      super(props);
      this.state={
        user:{},
        openPay: false,
        openWha: false
      }
      this.state = {id: this.props.dataFromParent, catg: this.props.dataFromParent2}

    }

    startTimer = () =>{;
        axiosInstance.get('/get'+this.state.catg+'/'+this.state.id)
        .then(res => {
            var newDate = new Date(res.data.Fecha_Vencimiento);
            this.setState ({
              timerTime: newDate,
              timerStart: (newDate)-Date.now()
            })

            
            this.timer = setInterval(() => {
              this.setState({
                timerTime: newDate - Date.now()
              });

              if(this.state.timerTime < 0){
                this.setState({
                  timerTime: "CUPÓN VENCIDO"
                });
                clearInterval(this.timer);
              }
            }, 1000); 

            if((newDate - Date.now()) < 0){
              axiosInstance.post('/get'+ this.state.catg+'Finalizado/'+this.state.id).then(res=>{}).catch(error=>{console.log(error, this.state.id)});
            }

            
        })

    }

    componentDidMount=() =>{
        this.startTimer();
    }

    componentWillUnmount = () => {
      clearTimeout(this.timer);
    }


    render(){
        const { timerTime } = this.state;
        let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
        let dias =("0" + Math.floor(timerTime / 86400000)).slice(-2);
        if(timerTime === "CUPÓN VENCIDO")
          return(
            
              <div className="">
                  <div className="TimerDestacado">
                        <img id="Cronometro1" className="Cronometro" src={img_cron} width="230px;" alt="temporizador"/>
                        <div id="countdown1" className="float-rigth cron_txt">VENCIDO</div>
                        <div className="texto_cronometro">
                            <p className="txt_fech" style={{marginRight:'4px'}}>SEG</p>
                            <p className="txt_fech" style={{marginRight:'4px'}}>MIN</p>
                            <p className="hora_cro" style={{marginRight:'-4px'}}>HORAS</p>
                            <p className="txt_fech">DIAS</p>
                        </div>
                    </div>
              </div>
          )
        else{
          return(

          
            <div className="">
                  <div className="TimerDestacado">
                        <img id="Cronometro1" className="Cronometro" src={img_cron} width="230px;" alt="temporizador"/>
                        <div id="countdown1" className="float-rigth cron_txt"> &nbsp;{dias} :&nbsp;&nbsp;&nbsp; {hours} :&nbsp;&nbsp;&nbsp; {minutes} :&nbsp;&nbsp; {seconds}</div>
                        <div className="texto_cronometro">
                            <p className="txt_fech" style={{marginRight:'-4px'}}>SEG</p>
                            <p className="txt_fech" style={{marginRight:'-4px'}}>MINUTOS</p>
                            <p className="hora_cro" style={{marginRight:'-4px'}}>HORAS</p>
                            <p className="txt_fech">DIAS</p>
                        </div>
                    </div>
            </div>

            )
        }
    }


}

export default TemporizadorDestacado;