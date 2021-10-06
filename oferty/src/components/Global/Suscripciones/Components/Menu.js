import React, { Component } from 'react';

//CSS
import '../../css/DashboardSusc.css'


import user from '../../images/users/Avatar1.jpg';
import logo from '../../images/logo.svg';
import * as Icon from 'react-feather';
import { Link, NavLink } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import {fire} from '../../../../config/firebase';
import {Redirect} from 'react-router-dom';


class Menu extends Component{

    constructor(props)
    {
        super(props);
        this.state ={ estado:'',user:[], redirect:false, left:''}
        this.handleButton = this.handleButton.bind(this);
    }

    logout(){
        fire.auth().signOut();
    }

    authListener = ()=>{
        fire.auth().onAuthStateChanged((user) =>{
            if(user){
                this.setState({user});
            }
            else{
                this.setRedirect();
            }
        })
    }
    
    setRedirect = () =>{
        this.setState({ redirect: true})
    }

    renderRedirect =() =>{
        if(this.state.redirect){
          return <Redirect to='/'/>
        }
    }

    componentDidMount=() =>{
        this.authListener();
    }

    handleButton(){
        if(this.state.left === ''){
            this.setState({left:'show-left'});
        }
        else{
            this.setState({left:''});
        }

        console.log(this.state.left);
    }



    render(){
        return(
            <div id="admin" className={`light light-sidebar theme-white ${this.state.estado}`}>
                {this.renderRedirect()}
                <div className="main-wrapper main-wrapper-1 admin">

                {/*-- ============================ Barra Superior Menu ================================ --*/}
                    <div className='navbar-bg'></div>
                    <nav className={`navbar navbar-expand-lg main-navbar sticky ${this.state.left}`}>
                        <div className="form-inline mr-auto">
                            <ul className="navbar-nav mr-3 botones">
                                <li><button data-toggle="sidebar" className="nav-link nav-link-lg collapse-btn" onClick={this.handleButton}> 
                                <Icon.AlignJustify className="feather clickMenu"></Icon.AlignJustify>
                                </button></li>


                                <li><button data-target="#mc-horizontal-menu-collapse" data-toggle="collapse" className="navadmin-toggle collapsed" type="button" onClick={this.handleButton}> 
                                <Icon.AlignJustify className="feather clickMenu"></Icon.AlignJustify>
                                </button></li>
                                

                                <div className="navbar-collapse collapse" id="mc-horizontal-menu-collapse">
                                    <div className="main-sidebar2 sidebar-style-2">
                                        <aside id="sidebar-wrapper">
                                            <div className="sidebar-brand">
                                                <Link to="/"> <img alt="logo" src={logo} className="header-logo" /> <span
                                                    className="logo-name"></span>
                                                </Link>
                                            </div>

                                            <ul className="sidebar-menu">
                                                <li className="menu-header">Main</li>
                                                <li className="dropdown">
                                                    <NavLink to="/Dashboard-Suscriptor" className="nav-link"><Icon.Monitor className="feathers"> </Icon.Monitor> <span> Inicio</span></NavLink>
                                                </li>

                                                <li className="menu-header">Suscriptor</li>

                                                <li><NavLink className="nav-link" to="/Suscriptor-DatosPerfil"><Icon.User className="feathers"></Icon.User><span>Mis Datos</span></NavLink></li>

                                                <li><NavLink className="nav-link" to="/Suscriptor-CrearPublicacion"><Icon.Image className="feathers"></Icon.Image><span>Crear Cupones</span>
                                                </NavLink></li>

                                                <li><NavLink className="nav-link" to="/Suscriptor-Publicaciones"><Icon.Image className="feathers"></Icon.Image><span>Publicaciones</span></NavLink></li>

                                                <li id="page_estadistica"><Link className="nav-link" to="/Suscriptor-Estadisticas"><Icon.TrendingUp className="feathers"></Icon.TrendingUp>
                                                <span>Estadísticas</span></Link></li>


                                                <li><a className="nav-link" href="timeline.html"><Icon.Book className="feathers"></Icon.Book><span>Manual de Validación</span></a></li>

                                                <li className="menu-header">Mi Cuenta</li>

                                                <li><a className="nav-link" href="timeline.html"><Icon.User className="feathers"></Icon.User><span>Perfil</span></a></li>

                                                <li><a className="nav-link" href="timeline.html"><Icon.Inbox className="feathers"></Icon.Inbox><span>Mensajes</span></a></li>

                                                <li><a className="nav-link" href="timeline.html"><Icon.LogIn className="feathers"></Icon.LogIn><span>Cerrar Sesion</span></a></li>

                                            </ul>
                                        </aside>
                                    </div>
                                </div>

                                <li><button className="nav-link nav-link-lg fullscreen-btn"><Icon.Maximize className="feather"></Icon.Maximize></button></li>
                            </ul>
                        </div>




                        <ul className="navbar-nav navbar-right">

                            {/*-- ==================== Menu - Perfil Administrador =================== --*/}
                            <li className="dropdown"><button data-toggle="dropdown" className="nav-link dropdown-toggle nav-link-lg nav-link-user"> 
                                <img alt="img" src={user} className="user-img-radious-style"/>
                                <span className="d-sm-none d-lg-inline-block"></span></button>

                                <div className="dropdown-menu dropdown-menu-right pullDown">
                                    <div className="dropdown-title">Hola <span id="name_susc">{this.state.user.email}</span></div>
                                    <button href="DatosPerfil.html" className="dropdown-item has-icon"> <i className="fa fa-user"></i>
                                        Perfil
                                    </button>
                                    <div className="dropdown-divider"></div>
                                    <button id="logout" type="submit" className="dropdown-item has-icon text-danger" onClick={this.logout}><i className="fas fa-sign-out-alt"></i>
                                        Cerrar Sesion
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </nav>

                    <div className="main-sidebar sidebar-style-2">
                        <aside id="sidebar-wrapper">
                            <div className="sidebar-brand">
                                <Link to="/"> <img alt="logo" src={logo} className="header-logo" /> <span
                                    className="logo-name"></span>
                                </Link>
                            </div>

                            <ul className="sidebar-menu">
                                <li className="menu-header">Main</li>
                                <li className="dropdown">
                                    <NavLink to="/Dashboard-Suscriptor" className="nav-link"><Icon.Monitor className="feathers"> </Icon.Monitor> <span> Inicio</span></NavLink>
                                </li>

                                <li className="menu-header">Suscriptor</li>

                                <li><NavLink className="nav-link" to="/Suscriptor-DatosPerfil"><Icon.User className="feathers"></Icon.User><span>Mis Datos</span></NavLink></li>

                                <li><NavLink className="nav-link" to="/Suscriptor-CrearPublicacion"><Icon.Image className="feathers"></Icon.Image><span>Crear Cupones</span>
                                </NavLink></li>

                                <li><NavLink className="nav-link" to="/Suscriptor-Publicaciones"><Icon.Image className="feathers"></Icon.Image><span>Publicaciones</span></NavLink></li>

                                <li id="page_estadistica"><NavLink className="nav-link" to="/Suscriptor-Estadisticas"><Icon.TrendingUp className="feathers"></Icon.TrendingUp>
                                <span>Estadísticas</span></NavLink></li>


                                <li><a className="nav-link" href="timeline.html"><Icon.Book className="feathers"></Icon.Book><span>Manual de Validación</span></a></li>

                                <li className="menu-header">Mi Cuenta</li>

                                <li><a className="nav-link" href="timeline.html"><Icon.LogIn className="feathers"></Icon.LogIn><span>Cerrar Sesion</span></a></li>

                            </ul>
                        </aside>
                    </div>

                 </div>   
            </div>
        )
    }
}


export default Menu;