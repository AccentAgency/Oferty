import React, { Component } from 'react';
import config from '../../config/config';
import axios from "axios";
import './css/Temporizador.css';


//Axios
const axiosInstance = axios.create({
    baseURL: config.backURL
});


class Temporizador extends Component{
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
      this._isMounted = false;
      this.state = {id: this.props.dataFromParent, catg: this.props.dataFromParent2}

    }

    startTimer = () =>{;
        axiosInstance.get('/get'+this.state.catg+'/'+this.state.id)
        .then(res => {
            var newDate = new Date(res.data.Fecha_Vencimiento);
            if (this._isMounted){
              this.setState ({
                timerTime: newDate,
                timerStart: (newDate)-Date.now()
              })
            }

            
            this.timer = setInterval(() => {
              this.setState({
                timerTime: newDate - Date.now()
              });
              if(this.state.timerTime < 0){
                if (this._isMounted){
                  this.setState({
                    timerTime: "CUPÓN VENCIDO"
                  });
                }
                clearInterval(this.timer);
              }
            }, 1000); 

            if((newDate - Date.now()) < 0){
              axiosInstance.post('/get'+this.state.catg+'Finalizado/'+this.state.id).then(res=>{}).catch(error=>{console.log(error, this.state.id)});
            }
        })
    }

    componentDidMount=() =>{
      this._isMounted = true;
      this._isMounted && this.startTimer();
    }

    componentWillUnmount = () => {
      this._isMounted = false;
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
                <div className="Timer">
                  <div className="float-rigth countdown"> VENCIDO </div>
                </div>
              </div>
          )
        else{
          return(
          
            <div className="">
                <div className="Timer">
                    <div className="float-rigth countdown"> {dias} : {hours} : {minutes} : {seconds}</div>
              </div>
            </div>
        )
        }
    }


}

export default Temporizador;