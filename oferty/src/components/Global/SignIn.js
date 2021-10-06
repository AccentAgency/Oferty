import React, { Component } from 'react';
import './css/DetallesCupon.css';
import './css/Login.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Login from './Login';
import Inicio from './Inicio';
import Administrador from './Administrador/Dahsboard';
import Suscripcion from './Suscripciones/DashboardSusc';

import {fire} from '../../config/firebase';

import config from '../../config/config';
import axios from "axios";
//Axios
const axiosInstance = axios.create({
    baseURL: config.backURL
});


class SignIn extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            user:{},
            dataUser:[]
        }
    }

    authListener(){
        fire.auth().onAuthStateChanged((user) =>{
            if(user){
                this.setState({user});
                axiosInstance.get('/getUser/'+user.uid)
                .then(res => {
                  this.setState({...this.state.dataUser, dataUser:res.data});
                })
            }
            else{
                this.setState({user:null})
            }
        })
    }

    componentDidMount=() =>{
        this.authListener();
    }
    
    render(){
        switch(this.state.dataUser.Rol) {
            case 'Administrador':
                window.location.href = "/Dashboard-Admin"
                return <Administrador/>
            case 'Usuario':
                return <Inicio/>
            case 'Suscripcion':
                window.location.href = "/Dashboard-Suscriptor"
                return <Suscripcion/>
            default:
                return <Login/>
        }
    }

}

export default SignIn;