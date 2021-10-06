import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Menu from './Components/Menu';

import PubDisponible from './Components/PublicacionesPorValidar';
import Footer from '../Administrador/Components/Footer';


class PublicacionesEspera extends Component{
    render(){
        return(
            <div>
                <Menu></Menu>

                <div className="main-content">
                    <section className="section">
                        <div className="section-body">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="bootstrap snippet">
                                                <section id="portfolio" className="gray-bg padding-top-bottom">
                                                    <div className="categories">
                                                        <ul>
                                                            <li>
                                                                <Link to="/Suscriptor-Publicaciones" data-filter="*">Publicaciones</Link>
                                                            </li>
                                                            <li className="active">
                                                                <Link to="Suscriptor-Publicaciones-por-Validar" data-filter=".web-design">Publicaciones por Aprobar</Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div id="publicaciones_list" className="row">
                                                        <PubDisponible></PubDisponible>
                                                    </div>
                                                </section>
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


export default PublicacionesEspera;