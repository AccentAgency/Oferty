import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import Menu from './Components/Menu';

import config from '../../../config/config';
import axios from "axios";

import { Link } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import Footer from './Components/Footer';

const axiosInstance = axios.create({
    baseURL: config.backURL
});



class ListaSuscriptor extends React.Component{

    
    constructor(props)
    {
        super(props);
        this.state ={ afiliados:[], offset:0, elements:[], perPage:8, currentPage:0, pageCount:0, loading:true }
    }

    getAfiliados(){
        axiosInstance.get('/listUsers').then(res => {
            this.setState({afiliados:res.data, pageCount: Math.ceil(res.data.length / this.state.perPage)}, ()=> this.setElementsForCurrentPage());
            this.setState({loading:false});
        })
    }

    setElementsForCurrentPage(){
        let elements = this.state.afiliados
        .slice(this.state.offset, this.state.offset + this.state.perPage)
        .map((afiliado, i) => {
            return(
                <tr key={i}>
                    <td></td>
                    <td>{afiliado.nombre}</td>
                    <td>{afiliado.genero}</td>
                    <td>{afiliado.telefono}</td>
                    <td>
                        <Link id="detail" className="btn btn-prim btn_detail" 
                        to={'/Administrador-DetallesPublicacion/'+ i}>Ver Detalles</Link>
                    </td>
                </tr>
            );
        });
        this.setState({elements:elements});
    }

    handlePageClick = afiliado => {
        const selectedPage = afiliado.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({ currentPage: selectedPage, offset:offset}, ()=> {
            this.setElementsForCurrentPage();
        })
    }

    componentDidMount = () => {
        this.getAfiliados();
    }

    render(){
        let paginationElement;
        if (this.state.pageCount > 1) {
            paginationElement = (
                <ReactPaginate
                previousLabel={"← Anterior"}
                nextLabel={"Siguiente →"}
                breakLabel={<span className="gap">...</span>}
                pageCount={this.state.pageCount}
                onPageChange={this.handlePageClick}
                forcePage={this.state.currentPage}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-link"}
                previousClassName={"page-link"}
                previousLinkClassName={"page-item"}
                nextClassName={"page-link"}
                nextLinkClassName={"page-item"}
                disabledClassName={"disabled"}
                activeClassName={"page-item active"}
                activeLinkClassName={"page-link"}
                />
            );
        }
        return(
            <div className="">
                <Menu></Menu>

                {this.state.loading ? (
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
                ) : (
                <div id="main-pago" className="main-content">
                    <section className="section">
                        <div className="section-body">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Usuarios en Oferty</h4>
                                            <div className="card-header-form">
                                                <form>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" placeholder="Search"/>
                                                        <div className="input-group-btn">
                                                            <button className="btn btn-primary"><i className="fas fa-search"></i></button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                        <div className="card-body p-0">
                                            {this.state.afiliados.length > 0 && (
                                            <div className="table-responsive">
                                                <table id="tabla_pagos" className="table table-striped">
                                                    <thead>  
                                                        <tr>
                                                            <th className="text-center"></th>
                                                            <th>Nombre</th>
                                                            <th>Género</th>
                                                            <th>Teléfono</th>
                                                            <th>Acción</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.elements}
                                                    </tbody>     
                                                </table>
                                                <div>{paginationElement}</div>
                                            </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
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

export default ListaSuscriptor;