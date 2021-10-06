import '../css/Dashboard.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import * as Icon from 'react-feather';
import user from '../../images/users/Avatar1.jpg';
import logo from '../../images/logo.svg';
import { Link, NavLink } from 'react-router-dom';
import SlideToggle from "react-slide-toggle";
import {fire} from '../../../../config/firebase';
import {Redirect} from 'react-router-dom';
import { Component } from 'react';

class Menu extends Component {

    constructor(props)
    {
        super(props);
        this.state ={user:[], redirect:false}
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

    render(){
        return(
            <div id="admin" className="admin theme-white">
                {this.renderRedirect()}
                <div className="navbar-bg"></div>
    
                <nav className="navbar navbar-expand-lg main-navbar sticky">
                    <div className="form-inline mr-auto">
                        <ul className="navbar-nav mr-3 botones">
                            <li><button data-toggle="sidebar" className="nav-link nav-link-lg collapse-btn"> <Icon.AlignJustify className="feather"></Icon.AlignJustify>
                            </button></li>
                            <li><button href="#" className="nav-link nav-link-lg fullscreen-btn"><Icon.Maximize className="feather"></Icon.Maximize></button></li>
    
                            <li>
                                <form className="form-inline mr-auto">
                                    <div className="search-element">
                                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" data-width="200"/>
                                        <button className="btn" type="submit">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </div>
                                </form>
                            </li>
                        </ul>
                    </div>
    
                    <ul className="navbar-nav navbar-right">
                        <li className="dropdown"><button data-toggle="dropdown" className="nav-link dropdown-toggle nav-link-lg nav-link-user"> 
                            <img alt="img" src={user} className="user-img-radious-style"/>
                            <span className="d-sm-none d-lg-inline-block"></span></button>
    
                            <div className="dropdown-menu dropdown-menu-right pullDown">
                                <div className="dropdown-title">Hola <span id="name_susc">{this.state.user.email}</span></div>
                                <button href="DatosPerfil.html" className="dropdown-item has-icon"> <i className="fa fa-user"></i>
                                    Perfil
                                </button>
                                <div className="dropdown-divider"></div>
                                <button id="logout" type="submit" className="dropdown-item has-icon text-danger" onClick={this.logout}> <i className="fas fa-sign-out-alt"></i>
                                    Cerrar Sesion
                                </button>
                            </div>
                        </li>
                    </ul>
                </nav>
    
    
                <div className="main-sidebar sidebar-style-2">
                    <aside id="sidebar-wrapper">
                        <div className="sidebar-brand">
                            <Link to='/'> <img alt="logo-oferty" src={logo} className="header-logo"/> <span
                                className="logo-name"></span>
                            </Link>
                        </div>
                        
                        <ul className="sidebar-menu">
    
                            <li className="menu-header">Main</li>
    
                            <li className="dropdown">
                                <NavLink to='/Dashboard-Admin' className="nav-link"><Icon.Monitor className="feathers"></Icon.Monitor><span>Inicio</span></NavLink>
                            </li>
                            
                            <li className="dropdown">
                                <NavLink to='/Dashboard-Suscripciones' className="nav-link"><Icon.Tag className="feathers"></Icon.Tag><span>Suscripciones</span></NavLink>
                            </li>

                            <li className="dropdown">
                                <NavLink to='/Administrador-ReporteDePagos' className="nav-link"><Icon.CreditCard className="feathers"></Icon.CreditCard><span>Pagos</span></NavLink>
                            </li>
                            
                            <SlideToggle collapsed>
                            {({ toggle, setCollapsibleElement }) => (
                                <li className="dropdown">
                                    <button className="menu-toggle nav-link has-dropdown" onClick={toggle}>
                                        <Icon.Command className="feathers"></Icon.Command>
                                    <span>Cupones</span></button>
    
                                    <ul className="menu-admin" ref={setCollapsibleElement}>
                                        <li><NavLink to='/Administrador-CuponSemana' className="nav-link"><Icon.ChevronRight className="feathers">
                                        </Icon.ChevronRight>Cupones de la Semana</NavLink></li>
    
                                        <li><NavLink to='/Administrador-CuponDestacado' className="nav-link"><Icon.ChevronRight className="feathers">
                                        </Icon.ChevronRight>Cupones Destacados</NavLink></li>
                                        <li><NavLink to='/Administrador-Cupones' className="nav-link"><Icon.ChevronRight className="feathers"></Icon.ChevronRight>Nuevo Cupón
                                        </NavLink></li>
                                    </ul>
                                </li>
                                )}
                            </SlideToggle>
    
                            
                            <SlideToggle collapsed>
                            {({ toggle, setCollapsibleElement }) => (
                                <li className="dropdown">
                                    <button className="menu-toggle nav-link has-dropdown" onClick={toggle}>
                                        <Icon.ShoppingCart className="feathers"></Icon.ShoppingCart>
                                    <span>Tiendas</span></button>
    
                                    <ul className="menu-admin" ref={setCollapsibleElement}>
                                        <li><NavLink to='/Administrador-RegistrarTiendas' className="nav-link"><Icon.ChevronRight className="feathers"></Icon.ChevronRight>
                                            Registrar Tienda</NavLink></li>
                                        <li><NavLink to='/Dashboard-Admin' className="nav-link"><Icon.ChevronRight className="feathers"></Icon.ChevronRight>
                                            Modificar Tienda</NavLink></li>
                                    </ul>
                                </li>
                                )}
                            </SlideToggle>
    
                            <li className="menu-header">Usuarios</li>
                            <li className="dropdown">
                                <NavLink to='/Administrador-ListaSuscriptor' className="nav-link"><Icon.UserPlus className="feathers"></Icon.UserPlus><span>Suscriptores</span></NavLink>
                            </li>
    
                            <li className="dropdown">
                                <NavLink to='/Administrador-ListaUsuario' className="nav-link"><Icon.Users className="feathers"></Icon.Users><span>Estandares</span></NavLink>
                            </li>
    
    
                            <li className="menu-header">Cupones</li>
                            <li className="dropdown">
                                <NavLink to='/Dashboard-Cupones' className="nav-link"><Icon.FilePlus className="feathers"></Icon.FilePlus><span>Registrar y/o Modificar</span></NavLink>
                            </li>
                            
                            <li className="dropdown">   
                                <NavLink to='/Administrador-PanelCuponesVencidos' className="nav-link"><Icon.XCircle className="feathers"></Icon.XCircle><span>Vencidos</span></NavLink>
                            </li>

                            <li className="dropdown">
                                <NavLink to='/Administrador-CuponesVendidos' className="nav-link"><Icon.ShoppingCart className="feathers"></Icon.ShoppingCart><span>Vendidos</span></NavLink>
                            </li>

    
                        </ul>
                    </aside>
                </div>
    
            </div>
        )
    }

}

export default Menu;