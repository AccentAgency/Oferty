
import './css/DetallesCupon.css';
import React, { Component } from 'react';
import config from '../../config/config';
import axios from "axios";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Redirect} from 'react-router-dom';

import {fire} from '../../config/firebase';

import Snackbar from '@material-ui/core/Snackbar';
import swal from 'sweetalert';
import MuiAlert from '@material-ui/lab/Alert';

import ReactPaginate from "react-paginate";

//Axios
const axiosInstance = axios.create({
  baseURL: config.backURL
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Comentario extends Component{

  constructor(props)
  {
    super(props);
    this.state={ user:{},open: false, coment:'', NombreUsuario: '', titulo: '', offset:0, comentario:[], isComment: false,
                redirect: false, dataUser: [], openTrue: false, elements:[], perPage:6, currentPage:0,pageCount:0,
                id_cup: this.props.dataFromParent, catg_cup: this.props.dataFromParent2
    }

    //Botones
    this.SubmitComentario = this.SubmitComentario.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClose2 = this.handleClose2.bind(this);
  }

  
  handleClose(event,reason){
    if (reason === 'clickaway') {
        return;
    }
    
    this.setState({...this.state.open, open:false});
  }

  handleClose2(event,reason){
    if (reason === 'clickaway') {
        return;
    }
    
    this.setState({...this.state.openTrue, openTrue:false});
  }

  //Enviar comentario
  
  SubmitComentario(event){
    event.preventDefault();
    
    this.authListener();
    if(this.state.user === null){
        this.setState({open:true});

        setTimeout(() => {
            this.setRedirect();
        }, 2500);
    }
    else{

        switch(this.state.catg_cup){
            case "CuponSemana":
                axiosInstance.get('/getUser/'+this.state.user.uid)
                .then(res => {
                  this.setState({...this.state.dataUser, dataUser:res.data});
                    axiosInstance.post('/sendCommentSlider',{
                        "id":this.state.id_cup,
                        "comentario":this.state.coment,
                        "titulo":this.state.titulo,
                        "usuario":this.state.dataUser.Nombre,
                    })
                    .then(res => {
                        // handle success
                        this.setState({openTrue:true});
                        this.setState({titulo: ""});
                        this.setState({coment: ""});
                        this.loadComentario();
                    })
                    .catch(err => {
                        // handle error
                        swal({title:"Ha ocurrido un error",text:"Verifique su conexión a internet o intente de nuevo más tarde.",icon:"error",confirmButtonText: "Aceptar"});
                    })
        
                })
            break

            case "Cupones":
                axiosInstance.get('/getUser/'+this.state.user.uid)
                .then(res => {
                  this.setState({...this.state.dataUser, dataUser:res.data});
                    axiosInstance.post('/sendCommentCupones',{
                        "id":this.state.id_cup,
                        "comentario":this.state.coment,
                        "titulo":this.state.titulo,
                        "usuario":this.state.dataUser.Nombre,
                    })
                    .then(res => {
                        // handle success
                        this.setState({openTrue:true});
                        this.setState({titulo: ""});
                        this.setState({coment: ""});
                        this.loadComentario();
                    })
                    .catch(err => {
                        // handle error
                        swal({title:"Ha ocurrido un error",text:"Verifique su conexión a internet o intente de nuevo más tarde.",icon:"error",confirmButtonText: "Aceptar"});
                    })
        
                })
            break   


            case "MejorEnSalud":
                axiosInstance.get('/getUser/'+this.state.user.uid)
                .then(res => {
                  this.setState({...this.state.dataUser, dataUser:res.data});
                    axiosInstance.post('/sendCommentCamp',{
                        "id":this.state.id_cup,
                        "comentario":this.state.coment,
                        "titulo":this.state.titulo,
                        "usuario":this.state.dataUser.Nombre,
                        "catg": this.state.catg_cup
                    })
                    .then(res => {
                        // handle success
                        this.setState({openTrue:true});
                        this.setState({titulo: ""});
                        this.setState({coment: ""});
                        this.loadComentario();
                    })
                    .catch(err => {
                        // handle error
                        swal({title:"Ha ocurrido un error",text:"Verifique su conexión a internet o intente de nuevo más tarde.",icon:"error",confirmButtonText: "Aceptar"});
                    })
        
                })
            break

            case "Belleza":
                axiosInstance.get('/getUser/'+this.state.user.uid)
                .then(res => {
                  this.setState({...this.state.dataUser, dataUser:res.data});
                    axiosInstance.post('/sendCommentCamp',{
                        "id":this.state.id_cup,
                        "comentario":this.state.coment,
                        "titulo":this.state.titulo,
                        "usuario":this.state.dataUser.Nombre,
                        "catg": this.state.catg_cup
                    })
                    .then(res => {
                        // handle success
                        this.setState({openTrue:true});
                        this.setState({titulo: ""});
                        this.setState({coment: ""});
                        this.loadComentario();
                    })
                    .catch(err => {
                        // handle error
                        swal({title:"Ha ocurrido un error",text:"Verifique su conexión a internet o intente de nuevo más tarde.",icon:"error",confirmButtonText: "Aceptar"});
                    })
        
                })
            break


            case "Comida":
                axiosInstance.get('/getUser/'+this.state.user.uid)
                .then(res => {
                  this.setState({...this.state.dataUser, dataUser:res.data});
                    axiosInstance.post('/sendCommentCamp',{
                        "id":this.state.id_cup,
                        "comentario":this.state.coment,
                        "titulo":this.state.titulo,
                        "usuario":this.state.dataUser.Nombre,
                        "catg": this.state.catg_cup
                    })
                    .then(res => {
                        // handle success
                        this.setState({openTrue:true});
                        this.setState({titulo: ""});
                        this.setState({coment: ""});
                        this.loadComentario();
                    })
                    .catch(err => {
                        // handle error
                        swal({title:"Ha ocurrido un error",text:"Verifique su conexión a internet o intente de nuevo más tarde.",icon:"error",confirmButtonText: "Aceptar"});
                    })
        
                })
            break

            default:
        }

        
    }
    
  }

  setElementsForCurrentPage(){
      if(this.state.comentario){
        let elements = this.state.comentario
        .slice(this.state.offset, this.state.offset + this.state.perPage)
        .map((element, i) => {
            return(
                <div className="review" key={i}>
                    <div className="review-title"><span className="summary">{element.Titulo}</span><span className="date"><i className="fa fa-calendar"></i><span> {element.Fecha}</span></span></div>
                    <div className="text">{element.Comentario}</div>
                </div>
            );
        });
        this.setState({elements:elements});
      }
    }

  loadComentario(){
    if(this.state.catg_cup === "CuponSemana"){
        axiosInstance.get('/comentSlider/'+this.state.id_cup,{
            "id": this.state.id_cup,
            "catg": this.state.catg_cup
        })
        .then(res => {
            this.setState({comentario:res.data, pageCount: Math.ceil(res.data.length / this.state.perPage)}, ()=> this.setElementsForCurrentPage());
        })    
    }
    else if(this.state.catg_cup === "Cupones"){
        axiosInstance.get('/comentCupones/'+this.state.id_cup,{
            "id": this.state.id_cup,
            "catg": this.state.catg_cup
        })
        .then(res => {
            this.setState({comentario:res.data, pageCount: Math.ceil(res.data.length / this.state.perPage)}, ()=> this.setElementsForCurrentPage());
        }) 
    }
    else if (this.state.catg_cup === "Comida" || this.state.catg_cup === "MejorEnSalud" || this.state.catg_cup === "Belleza"){
        axiosInstance.get('/comentCamp/'+this.state.id_cup+"/"+this.state.catg_cup,{
            "catg": this.state.catg_cup
        })
        .then(res => {
            this.setState({comentario:res.data, pageCount: Math.ceil(res.data.length / this.state.perPage)}, ()=> this.setElementsForCurrentPage());
        }) 
    }
  }

  handlePageClick = afiliado => {
    const selectedPage = afiliado.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({ currentPage: selectedPage, offset:offset}, ()=> {
        this.setElementsForCurrentPage();
        })
    }

  
  //Validar si el usuario esta logeado
  authListener(){

    fire.auth().onAuthStateChanged((user) =>{
        if(user){
            this.setState({user});

        }
        else{
            this.setState({user:null})
        }
    })
    
  }

  //Redireccionar a login
    setRedirect = () =>{
        this.setState({ redirect: true})
    }

    renderRedirect =() =>{
        if(this.state.redirect){
        return <Redirect to='/Login'/>
        }
    }

   //Handle Change
    handleChange(event){
        const target = event.target;
        const value =  target.value;
        const name = target.name;

        this.setState({
        [name]: value
        });
    }



  componentDidMount=() =>{
      this.authListener();
      this.loadComentario();
  }

  render() {
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
    return (
      <div className="pd-pd">
        
        <Snackbar open={this.state.open} autoHideDuration={3500} onClose={this.handleClose}>
            <Alert onClose={this.handleClose} severity="warning">
                Debes registrarte para poder votar. ¡Unete a Oferty!
            </Alert>
        </Snackbar>

        <Snackbar open={this.state.openTrue} autoHideDuration={3500} onClose={this.handleClose2}>
            <Alert onClose={this.handleClose2} severity="success">
                ¡Gracias por tu opinión! Asi creamos una comunidad más grande en Oferty.
            </Alert>
        </Snackbar>

        {/* Redireccionando*/}   
        {this.renderRedirect()}

        {/* Mostrar Comentarios*/} 
        <div id="reviews" className="reviews">
        {this.state.comentario ? (
            <div>

                {this.state.elements}
                
                <div>{paginationElement}</div>     
            </div>

        ) : (
            <div className="review">
                <div className="text">No hay comentarios disponible para esta oferta.</div>
            </div>
        )}

        </div>

        {/* Realizar Comentario */} 
        <div className="product-add-review">
            <div className="review-form">
                <div className="form-container">
                    <form onSubmit={this.SubmitComentario} className="cnt-form">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="exampleInputReview">Titulo <span className="astk">*</span></label>
                                    <input name="titulo" id="Titulo" type="text" className="form-control txt txt-review" placeholder="" maxLength="45" onChange={this.handleChange} value={this.state.titulo || ''}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleInputReview">Comentario <span className="astk">*</span></label>
                                    <textarea name="coment" className="form-control txt txt-review" id="Comentario" rows="4" placeholder="" onChange={this.handleChange} value={this.state.coment}></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="action text-right">
                            <button id="BtnComentario" className="btn btn-primary" type="submit">Enviar Comentario</button>
                        </div>

                    </form>
                </div>
            </div>

        </div>
      </div>
     
      
    );
  }
}

export default Comentario;