const express = require('express');
const {Storage} = require('@google-cloud/storage');
const {format, callbackify} = require('util');

const uuidv4 = require('uuid/v4');
const uuid = uuidv4();
//Project's own requires
const db = require('../config/config');


const storage = new Storage({
    keyFilename:'./serviceAccountKey.json'
});

const bucket = storage.bucket(process.env.REACT_APP_STORAGE_BUCKET);

const bucket_susc = storage.bucket(process.env.REACT_APP_STORAGE_BUCKET+"/Suscripciones/SolicitudDePublicaciones");

const multer = require('multer');
const { response } = require('express');
const { config, pid } = require('process');
const { resolve } = require('path');
const e = require('express');
const { resolveSoa } = require('dns');



var upload = multer({
    
    storage: multer.memoryStorage(),

    limits: {

        fileSize: 5 * 1024 * 1024, // limiting files size to 5 MB

    },
})


//Initializations
const router = express.Router();

//Rutas
// Obtenemos Slider
router.get('/readSlider', async (req, res) => {//Ruta para obtener Slider
    var value = []
    const result = await db.database().ref("PromocionesSlider").orderByChild("Slider").equalTo("Si").once("value", function(snapshoot){
        snapshoot.forEach(function(snap){
            if(snap.val().Status === "Activa"){
                value.push(snap.val());
            }
        })
        res.send(value).end();
    });
    
});

//Obtenemos Banner
router.get('/readBanner', async (req, res) => {//Ruta para obtener Banner
    var value = [];
    const result = await db.database().ref("PromocionesSlider").orderByChild("Banner").equalTo("Si").once("value", function(snapshoot){
        snapshoot.forEach(function(snap){
            if(snap.val().Status === "Activa"){
                value.push(snap.val());
            }
        })
        res.send(value).end();
    });
    
});

//Obtenemos Cupones Destacados
router.get('/readCupones', async(req, res) => { //Ruta para obtener Cupones
    var value = [];
    const result = await db.database().ref("Cupones").orderByChild("Categoria").equalTo("CuponDestacado").once("value", function(snapshoot){
        snapshoot.forEach(function(snap){
            if(snap.val().Status === "Activa"){
                value.push(snap.val());
            }
        })
        res.send(value);
    })
})


//Obtenemos cupones de categoria : PRODUCTOS
router.get('/readCuponesProductos', async(req, res) => { //Ruta para obtener Cupones
    var value = [];
    const result = await db.database().ref("Cupones").orderByChild("Categoria").equalTo("Productos").once("value", function(snapshoot){
        snapshoot.forEach(function(snap){
            if(snap.val().Status === "Activa"){
                value.push(snap.val());
            }
        })
        res.send(value);
    })
})

//Obtenemos cupones de categoria : BELLEZA
router.get('/readCuponesBelleza', async(req, res) => { //Ruta para obtener Cupones
    var value = []
    const result = await db.database().ref("Cupones").orderByChild("Categoria").equalTo("Belleza").once("value", function(snapshoot){
        snapshoot.forEach(function(snap){
            if(snap.val().Status === "Activa"){
                value.push(snap.val());
            }
        })
        res.send(value);
    })
})

//Obtenemos cupones de categoria : SALUD
router.get('/readCuponesSalud', async(req, res) => { //Ruta para obtener Cupones
    var value = []
    const result = await db.database().ref("Cupones").orderByChild("Categoria").equalTo("Salud").once("value", function(snapshoot){
        snapshoot.forEach(function(snap){
            if(snap.val().Status === "Activa"){
                value.push(snap.val());
            }
        })
        res.send(value);
    })
})

//Obtenemos cupones de categoria : SERVICIOS
router.get('/readCuponesServicios', async(req, res) => { //Ruta para obtener Cupones
    var value = [];
    const result = await db.database().ref("Cupones").orderByChild("Categoria").equalTo("Servicios").once("value", function(snapshoot){
        snapshoot.forEach(function(snap){
            if(snap.val().Status === "Activa"){
                value.push(snap.val());
            }
        })
        res.send(value);
    })
})

//Obtenemos cupones de categoria : COMIDA
router.get('/readCuponesComida', async(req, res) => { //Ruta para obtener Cupones
    var value = [];
    const result = await db.database().ref("Cupones").orderByChild("Categoria").equalTo("Comida").once("value", function(snapshoot){
        snapshoot.forEach(function(snap){
            if(snap.val().Status === "Activa"){
                value.push(snap.val());
            }
        })
        res.send(value);
    })
})


//Obtenemos TODOS los cupones
router.get('/readAllCupones', async(req, res) => { //Ruta para obtener Cupones
    const result = await db.database().ref("Cupones").orderByChild("Status").equalTo("Activa").once("value", function(snapshoot){
        res.send(snapshoot.val());
    })
})

//Obtenemos Cupones Favoritos
router.get('/readCuponesSemana', async(req, res) => { //Ruta para obtener Cupones de la Semana
    const result = await db.database().ref("Cupones").orderByChild("Status").equalTo("Activa").limitToFirst(4).once('value',function(snapshoot){
        res.send(snapshoot.val());
    })
})

//Obtenemos Cupones del Dia
var date=new Date();
let options = {
  weekday: 'long',
};
var value = [];

switch (date.toLocaleDateString('ex-MX',options)) {

    case 'lunes':
    //LUNES
    router.get('/readCuponesHoy', async(req, res) => {
        result = await db.database().ref("Cupones").orderByChild("Status").equalTo("Activa").once("value", function(snapshoot){
            snapshoot.forEach(function(snap){
                if(snap.val().Lunes === "Si" && value.length < 4){
                    value.push(snap.val());
                }
            })
            res.send(value);
        })
    })
    break;
    
    case 'martes':
    //MARTES
    router.get('/readCuponesHoy', async (req, res) => {
        result = await db.database().ref("Cupones").orderByChild("Status").equalTo("Activa").once("value", function(snapshoot){
            snapshoot.forEach(function(snap){
                if(snap.val().Martes === "Si" && value.length < 4){
                    value.push(snap.val());
                }
            })
            res.send(value);
        })
    })

    break;


    case 'miércoles':
    //MIERCOLES
    router.get('/readCuponesHoy', async (req, res) => {
        result = await db.database().ref("Cupones").orderByChild("Status").equalTo("Activa").once("value", function(snapshoot){
            snapshoot.forEach(function(snap){
                if(snap.val().Miercoles === "Si" && value.length < 4){
                    value.push(snap.val());
                }
            })
            res.send(value);
        })
    })       
    break;

    case 'jueves':
    //JUEVES
    router.get('/readCuponesHoy', async (req, res) => {
        const result = await db.database().ref("Cupones").orderByChild("Status").equalTo("Activa").once("value", function(snapshoot){
            snapshoot.forEach(function(snap){
                if(snap.val().Jueves === "Si" && value.length < 4){
                    value.push(snap.val());
                }
            })
            res.send(value);
        })
    })
    break;

    case 'viernes':
     //VIERNES
     router.get('/readCuponesHoy', async (req, res) => {
        const result = await db.database().ref("Cupones").orderByChild("Status").equalTo("Activa").once("value", function(snapshoot){
            snapshoot.forEach(function(snap){
                if(snap.val().Viernes === "Si" && value.length < 4){
                    value.push(snap.val());
                }
            })
            res.send(value);
        })
    })       
    break;


    case 'sábado':
     //SABADO
     router.get('/readCuponesHoy', async (req, res) => {
        const result = await db.database().ref("Cupones").orderByChild("Status").equalTo("Activa").once("value", function(snapshoot){
            snapshoot.forEach(function(snap){
                if(snap.val().Sabado === "Si" && value.length < 4){
                    value.push(snap.val());
                }
            })
            res.send(value);
        })
    })   
    break;


    case 'domingo':
    
    //DOMINGO
    router.get('/readCuponesHoy', async (req, res) => {
        const result = await db.database().ref("Cupones").orderByChild("Status").equalTo("Activa").once("value", function(snapshoot){
            snapshoot.forEach(function(snap){
                if(snap.val().Domingo === "Si" && value.length < 4){
                    value.push(snap.val());
                }
            })
            res.send(value);
        })
    })
    break;


}

//Cupones Mejor en Salud Limite de 4
router.get('/readCuponSalud', async(req, res) => {
    const result = await db.database().ref("Cupones").child("MejorEnSalud").orderByChild("Status").equalTo("Activa").limitToFirst(4).once('value', function(snapshoot){
        res.send(snapshoot.val());
    })
})

//Cupones Mejor en Salud
router.get('/readAllCuponSalud', async(req, res) => {
    const result = await db.database().ref("Cupones").child("MejorEnSalud").orderByChild("Status").equalTo("Activa").once('value', function(snapshoot){
        res.send(snapshoot.val());
    })
})

//Cupones Belleza Top Limite de 4
router.get('/readCuponBelleza', async(req, res) => {
    const result = await db.database().ref("Cupones").child("Belleza").orderByChild("Status").equalTo("Activa").limitToFirst(4).once('value', function(snapshoot){
        res.send(snapshoot.val());
    })
})

//Cupones Belleza Top 
router.get('/readAllCuponBelleza', async(req, res) => {
    const result = await db.database().ref("Cupones").child("Belleza").orderByChild("Status").equalTo("Activa").once('value', function(snapshoot){
        res.send(snapshoot.val());
    })
})

//Cupones Comida Limite de 4
router.get('/readCuponComida', async(req, res) => {
    const result = await db.database().ref("Cupones").child("Comida").orderByChild("Status").equalTo("Activa").limitToFirst(4).once('value', function(snapshoot){
        res.send(snapshoot.val());
    })
})

router.get('/readAllCuponComida', async(req, res) => {
    const result = await db.database().ref("Cupones").child("Comida").orderByChild("Status").equalTo("Activa").once('value', function(snapshoot){
        res.send(snapshoot.val());
    })
})

router.get('/readAllCuponTodoUnDolar', async(req, res) => {
    const result = await db.database().ref("Cupones").child("TodoUnDolar").orderByChild("Status").equalTo("Activa").once('value', function(snapshoot){
        res.send(snapshoot.val());
    })
})

//Cupones Todo a un Dolar
router.get('/readCuponDolar', async(req, res) => {
    const result = await db.database().ref("Cupones").child("TodoUnDolar").orderByChild("Status").equalTo("Activa").limitToFirst(4).once('value', function(snapshoot){
        res.send(snapshoot.val());
    })
})


//Buscamos Los cupones de la semana
router.get('/getCuponSemana/:id', async(req, res) => {
    let { id } = req.params
    const result = await db.database().ref(`PromocionesSlider`).child(id).once('value', function(snapshoot){
        res.send(snapshoot.val());
    })
})

//Buscamos Los cupones destacados
router.get('/getCupones/:id', async(req, res) => {
    let { id } = req.params
    const result = await db.database().ref("Cupones").child(id).once('value', function(snapshoot){
        res.send(snapshoot.val());
    })
})

//Buscamos Los cupones MEJOR EN SALUD
router.get('/getMejorEnSalud/:id', async(req, res) => {
    let { id } = req.params
    const result = await db.database().ref("Cupones").child("MejorEnSalud").child(id).once('value', function(snapshoot){
        res.send(snapshoot.val());
    })
})

//Buscamos Los cupones BELLEZA TOP
router.get('/getBelleza/:id', async(req, res) => {
    let { id } = req.params
    const result = await db.database().ref("Cupones").child("Belleza").child(id).once('value', function(snapshoot){
        res.send(snapshoot.val());
    })
})

//Buscamos Los cupones COMIDA
router.get('/getComida/:id', async(req, res) => {
    let { id } = req.params
    const result = await db.database().ref("Cupones").child("Comida").child(id).once('value', function(snapshoot){
        res.send(snapshoot.val());
    })
})

//Buscamos Los cupones TODO UN DOLAR
router.get('/getTodoUnDolar/:id', async(req, res) => {
    let { id } = req.params
    const result = await db.database().ref("Cupones").child("TodoUnDolar").child(id).once('value', function(snapshoot){
        res.send(snapshoot.val());
    })
})



//Buscar datos de la tienda
router.get('/getTienda/:id', async(req, res) => {
    let { id } = req.params
    const result = await db.database().ref("Tiendas").child(id).once('value', function(snapshoot){
        res.send(snapshoot.val());
    })
})



//Creamos Usuarios nuevos
router.post('/register', async(req, res)=>{
    const {id,email,name, phone,gen} = req.body;
    
    const userReF= db.database().ref("Users").child(id).set({
        Nombre: name,
        Rol: "Usuario",
        telefono: phone,
        uID: id,
        CorreoElectronico: email,
        Genero: gen,
        
    })
    res.status(201).json({
        userReF
    })

    
});

//Buscamos usuario por ID
router.get('/getUser/:id', async(req, res) => {
    let { id } = req.params
    const result = await db.database().ref("Users").child(id).once('value', function(snapshoot){
        res.send(snapshoot.val());
    })
})


//---------------------> Guardar Puntuaciones <-------------

//Slider Destacados y Banner
router.post('/starRatingD' , async(req, res) =>{
    const {id,star} = req.body;
    const result = db.database().ref("PromocionesSlider").child(id).child("Puntuacion").push({
        Puntuacion: star
    })
    return res.json(result);
})

//Cupones Generales
router.post('/starRatingC' , async(req, res) =>{
    const {id,star} = req.body;
    const result = db.database().ref("Cupones").child(id).child("Puntuacion").push({
        Puntuacion: star
    })
    return res.json(result);
})

//Campañas de cupones
router.post('/starRatingCamp' , async(req, res) =>{
    const {id,star,catg} = req.body;
    const result = db.database().ref("Cupones").child(catg).child(id).child("Puntuacion").push({
        Puntuacion: star
    })
    return res.json(result);
})

//Obtenemos comentarios
router.get('/comentSlider/:id', async(req, res) => {
    const {id} = req.params;
    var value = [];
    const result = db.database().ref("PromocionesSlider").child(id).child("Comentarios").once('value', function(snapshoot){
        
        if(snapshoot.exists()){
            snapshoot.forEach(function(snap){
                value.push({Titulo: snap.val().Titulo, Fecha:snap.val().Fecha, Comentario:snap.val().Comentario});
            })
            res.send(value);
        }
        else{
            res.send(null);
        }
        
    })
    
    
})

router.get('/comentCupones/:id', async(req,res) => {
    const {id} = req.params;
    var value = [];
    const result = db.database().ref("Cupones").child(id).child("Comentarios").once('value', function(snapshoot){

        if(snapshoot.exists()){
            snapshoot.forEach(function(snap){
                value.push({Titulo: snap.val().Titulo, Fecha:snap.val().Fecha, Comentario:snap.val().Comentario});
            })
            res.send(value);
        }
        else{
            res.send(null);
        }
        
    })
})

router.get('/comentCamp/:id/:catg', async(req,res) => {
    const {id,catg} = req.params;
    var value = [];
    const result = db.database().ref("Cupones").child(catg).child(id).child("Comentarios").once('value', function(snapshoot){

        if(snapshoot.exists()){
            snapshoot.forEach(function(snap){
                value.push({Titulo: snap.val().Titulo, Fecha:snap.val().Fecha, Comentario:snap.val().Comentario});
            })
            res.send(value);
        }
        else{
            res.send(null);
        }
        
    })
})

//Update Visualizacion
router.post('/getCuponSemanaVisualizacion/:id', async(req, res) => {
    let { id } = req.params;
    const {cont} = req.body;
    const result = await db.database().ref('PromocionesSlider').child(id).update({
        Visualizacion: cont
    })  
    res.json(result);
})

//Buscamos Los cupones destacados
router.post('/getCuponesVisualizacion/:id', async(req, res) => {
    let { id } = req.params;
    const {cont} = req.body;
    const result = await db.database().ref("Cupones").child(id).update({
        Visualizacion: cont
    })
    res.json(result);
})

//Buscamos Los cupones MEJOR EN SALUD
router.post('/getMejorEnSaludVisualizacion/:id', async(req, res) => {
    let { id } = req.params;
    const {cont} = req.body;
    const result = await db.database().ref("Cupones").child("MejorEnSalud").child(id).update({
        Visualizacion: cont
    })
    res.json(result);
})

//Buscamos Los cupones BELLEZA TOP
router.post('/getBellezaVisualizacion/:id', async(req, res) => {
    let { id } = req.params;
    const {cont} = req.body;
    const result = await db.database().ref("Cupones").child("Belleza").child(id).update({
        Visualizacion: cont
    })
    res.json(result);
})

//Buscamos Los cupones COMIDA
router.post('/getComidaVisualizacion/:id', async(req, res) => {
    let { id } = req.params;
    const {cont} = req.body;
    const result = await db.database().ref("Cupones").child("Comida").child(id).update({
        Visualizacion: cont
    })
    res.json(result);
})

//Buscamos Los cupones TODO UN DOLAR
router.post('/getTodoUnDolarVisualizacion/:id', async(req, res) => {
    let { id } = req.params;
    const {cont} = req.body;
    const result = await db.database().ref("Cupones").child("TodoUnDolar").child(id).update({
        Visualizacion: cont
    })
    res.json(result);
})


//Cupones Vencidos

router.post('/getCuponSemanaFinalizado/:id', async(req, res) => {
    let { id } = req.params
    const result = await db.database().ref('PromocionesSlider').child(id).update({
        Tiempo: "Finalizado"
    })  
    res.json(result);
})

//Buscamos Los cupones destacados
router.post('/getCuponesFinalizado/:id', async(req, res) => {
    let { id } = req.params
    const result = await db.database().ref("Cupones").child(id).update({
        Tiempo: "Finalizado"
    })
    res.json(result);
})

//Buscamos Los cupones MEJOR EN SALUD
router.post('/getMejorEnSaludFinalizado/:id', async(req, res) => {
    let { id } = req.params
    const result = await db.database().ref("Cupones").child("MejorEnSalud").child(id).update({
        Tiempo: "Finalizado"
    })
    res.json(result);
})

//Buscamos Los cupones BELLEZA TOP
router.post('/getBellezaFinalizado/:id', async(req, res) => {
    let { id } = req.params
    const result = await db.database().ref("Cupones").child("Belleza").child(id).update({
        Tiempo: "Finalizado"
    })
    res.json(result);
})

//Buscamos Los cupones COMIDA
router.post('/getComidaFinalizado/:id', async(req, res) => {
    let { id } = req.params
    const result = await db.database().ref("Cupones").child("Comida").child(id).update({
        Tiempo: "Finalizado"
    })
    res.json(result);
})

//Buscamos Los cupones TODO UN DOLAR
router.post('/getTodoUnDolarFinalizado/:id', async(req, res) => {
    let { id } = req.params
    const result = await db.database().ref("Cupones").child("TodoUnDolar").child(id).update({
        Tiempo: "Finalizado"
    })
    res.json(result);
})




//Suspendemos los cupones vencidos
router.post('/getCuponSemanaSuspender/:id', async(req, res) => {
    let { id } = req.params
    const result = await db.database().ref('PromocionesSlider').child(id).update({
        Status: "Inactivo",
        Tiempo: "Ninguno"
    })  
    res.json(result);
})

//Buscamos Los cupones destacados
router.post('/getCuponesSuspender/:id', async(req, res) => {
    let { id } = req.params
    const result = await db.database().ref("Cupones").child(id).update({
        Status: "Inactivo",
        Tiempo: "Ninguno"
    })
    res.json(result);
})

//Buscamos Los cupones MEJOR EN SALUD
router.post('/getMejorEnSaludSuspender/:id', async(req, res) => {
    let { id } = req.params
    const result = await db.database().ref("Cupones").child("MejorEnSalud").child(id).update({
        Status: "Inactivo",
        Tiempo: "Ninguno"
    })
    res.json(result);
})

//Buscamos Los cupones BELLEZA TOP
router.post('/getBellezaSuspender/:id', async(req, res) => {
    let { id } = req.params
    const result = await db.database().ref("Cupones").child("Belleza").child(id).update({
        Status: "Inactivo",
        Tiempo: "Ninguno"
    })
    res.json(result);
})

//Buscamos Los cupones COMIDA
router.post('/getComidaSuspender/:id', async(req, res) => {
    let { id } = req.params
    const result = await db.database().ref("Cupones").child("Comida").child(id).update({
        Status: "Inactivo",
        Tiempo: "Ninguno"
    })
    res.json(result);
})

//Buscamos Los cupones TODO UN DOLAR
router.post('/getTodoUnDolarSuspender/:id', async(req, res) => {
    let { id } = req.params
    const result = await db.database().ref("Cupones").child("TodoUnDolar").child(id).update({
        Status: "Inactivo",
        Tiempo: "Ninguno"
    })
    res.json(result);
})



//Enviar Comentario
router.post('/sendCommentSlider', async(req,res) => {
    const {id,comentario,titulo,usuario} = req.body;

    //Calcular fecha
    var f = new Date();
    var fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();

    const result = db.database().ref("PromocionesSlider").child(id).child("Comentarios").push({
        Comentario: comentario,
        Fecha: fecha,
        NombreUsuario: usuario,
        Titulo: titulo
    })
    return res.json(result);
})

router.post('/sendCommentCupones', async(req,res) => {
    const {id,comentario,titulo,usuario} = req.body;

    //Calcular fecha
    var f = new Date();
    var fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();

    const result = db.database().ref("Cupones").child(id).child("Comentarios").push({
        Comentario: comentario,
        Fecha: fecha,
        NombreUsuario: usuario,
        Titulo: titulo
    })
    return res.json(result);
})

router.post('/sendCommentCamp', async(req,res) => {
    const {id,comentario,titulo,usuario,catg} = req.body;

    //Calcular fecha
    var f = new Date();
    var fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();

    const result = db.database().ref("Cupones").child(catg).child(id).child("Comentarios").push({
        Comentario: comentario,
        Fecha: fecha,
        NombreUsuario: usuario,
        Titulo: titulo
    })
    return res.json(result);
})


//Cupones comprados por formulario
    //Guardar en el usuario
    router.post('/sendPayForm', async(req,res) => {
        const {id_user, cupones,metodo,cedula, direccion, email, nombre, telefono, datoPago, totalBss, totalDol, urlDoc} = req.body;
        var f = new Date();
        var fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
        const result = db.database().ref("Users").child(id_user).child("PagoCupones").push().getKey();

        const data = db.database().ref("Users").child(id_user).child("PagoCupones").child(result).set({
            Status: "Por Validar",
            Fecha_Emision: fecha,
            Total: totalDol,
            MetodoDePago: metodo,
            IdPago:result,
        })

        let id = result;

        cupones.forEach(item => {
            const value = db.database().ref("Users").child(id_user).child("PagoCupones").child(id).child("Cupones").push({
                Id: item.Id,
                Cantidad: item.Cantidad
            })
        })

        const result_pay = db.database().ref("ReporteDePagos").child("Cupones").push({
            Status: "Por Validar",
            Fecha_Pago: fecha,
            TipoDePago:metodo,
            Id_user: id_user,
            Id_Pago: result,
            Nombre: nombre,
            Cedula: cedula,
            Direccion: direccion,
            Email: email,
            Telefono: telefono,
            MontoTotal: totalDol
        })
        

        let id2 = result_pay.key;


        cupones.forEach(data =>{
            const value = db.database().ref("ReporteDePagos").child("Cupones").child(id2).child("Cupones").push({
                Id: data.Id,
                Cantidad: data.Cantidad,
                Nombre: data.Titulo,
                Status: 'Por Validar',
                Imagen: data.Imagen,
                Codigo: "Ninguno"
            })
        })

        const pago = db.database().ref("ReporteDePagos").child("Cupones").child(id2).child("DatosDelPago").push({
            ArchivoComprobante: urlDoc,
            DatosDelPago: datoPago,
            TotalBolivares: totalBss,
            TotalDolares: totalDol
        })

        return res.json(pago);
    })

    //Guardar imagenes de pago
    router.post("/uploadImagePay", upload.single('image'), async(req,res,next) => {
        const url = req.file;
        const blob = bucket.file((url.originalname));
    
        const blobStream = blob.createWriteStream();
    
        blobStream.on('error', err => {
            next(err);
        });
    
        blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            const publicUrl = format(
                `https://storage.googleapis.com//Suscripciones/SolicitudDePublicaciones/${bucket.name}/${blob.name}`
            );
            blob.getSignedUrl({action: 'read', expires: '03-17-2095'}).then(urls => {
                const image1 = urls[0];
                res.send(image1);
            })
        })
        blobStream.end(url.buffer);    
    })

    //Cupones solicitados por whatsapp

    router.post('/sendPayWhatsapp', async(req,res) => {
        const {id_user, cupones,email, nombre, telefono, totalBss, totalDol} = req.body;
        var f = new Date();
        var fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();

        const result = db.database().ref("Users").child(id_user).child("PagoCupones").push().getKey();

        const data = db.database().ref("Users").child(id_user).child("PagoCupones").child(result).set({
            Status: "Por Validar",
            Fecha_Emision: fecha,
            Total: totalDol,
            IdPago:result,
        })

        let id = result;

        cupones.forEach(item => {
            const value = db.database().ref("Users").child(id_user).child("PagoCupones").child(id).child("Cupones").push({
                Id: item.Id,
                Cantidad: item.Cantidad
            })
        })

        const result_pay = db.database().ref("ReporteDePagos").child("Cupones").child("Whatsapp").push({
            Status: "Por Validar",
            Fecha_Pago: fecha,
            Id_user: id_user,
            Id_Pago: result,
            Nombre: nombre,
            Email: email,
            Telefono: telefono,
            TipoDePago:'Ninguno',
            MontoTotal: totalDol
        })

        let id2 = result_pay.key;

        cupones.forEach(data =>{
            const value = db.database().ref("ReporteDePagos").child("Cupones").child("Whatsapp").child(id2).child("Cupones").push({
                Id: data.Id,
                Cantidad: data.Cantidad,
                Nombre: data.Titulo,
                Status: 'Por Validar',
                Imagen: data.Imagen,
                Codigo: "Ninguno"
            })
        })

        const pago = db.database().ref("ReporteDePagos").child("Cupones").child("Whatsapp").child(id2).child("DatosDelPago").push({
            TotalBolivares: totalBss,
            TotalDolares: totalDol
        })

        return res.json(pago);
    })
     


//Creamos Suscriptores Nuevos
router.post('/registerSusc', upload.fields([{name: 'image', maxCount: 1}, {name: 'image2', maxCount: 1}]),async(req, res)=>{
    const url = req.files;
    const {id,email,name, phone,categoria,cedula,descTienda,direccion,latitud,longitud,tienda} = req.body;

    const blob = bucket.file((url.image[0].originalname));

    const blobStream = blob.createWriteStream();

    blobStream.on('error', err => {
        next(err);
    });

    blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        blob.getSignedUrl({action: 'read', expires: '03-17-2095'}).then(urls => {
            const image1 = urls[0]

            //Subir segunda foto
            const blob2= bucket.file((url.image2[0].originalname));

            const blobStream2 = blob2.createWriteStream();

            blobStream2.on('error', err => {
                next(err);
            })

            blobStream2.on('finish', () => {
                const publicUrl2 = format(`https://storage.googleapis.com/${bucket.name}/${blob2.name}`);

                blob2.getSignedUrl({action: 'read', expires: '03-17-2095'}).then(urls => {
                    const image2 = urls[0]

                    //Guardamos los datos en la base de datos
                    const userReF= db.database().ref("Users").child(id).set({
                        Categoria: categoria,
                        Documentacion: cedula,
                        CorreoElectronico: email,
                        Descripcion_Tienda: descTienda,
                        DireccionCorta: direccion,
                        Latitud: latitud,
                        Longitud: longitud,
                        Rol:"Suscripcion",
                        Tienda: tienda,
                        Nombre: name,
                        telefono: phone,
                        ImagenPrincipal: image1,
                        Logo: image2,
                        Publicaciones: 0,
                        UserInstagram: 'Ninguno'
                        
                    })
                    res.status(201).json({
                        userReF
                    })
                    
                })
            })

            blobStream2.end(url.image2[0].buffer);
        })

    })

    blobStream.end(url.image[0].buffer);
    
})

//Creamos Suscriptores Nuevos una sola imagen (IMAGEN PRINCIPAL)
router.post('/registerSuscImg1', upload.single('image'),async(req, res)=>{
    const url = req.file;
    const {id,email,name, phone,categoria,cedula,descTienda,direccion,latitud,longitud,tienda} = req.body;

    const blob = bucket.file((url.originalname));

    const blobStream = blob.createWriteStream();

    blobStream.on('error', err => {
        next(err);
    });

    blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        blob.getSignedUrl({action: 'read', expires: '03-17-2095'}).then(urls => {
            const image1 = urls[0]

            //Guardamos los datos en la base de datos
            const userReF= db.database().ref("Users").child(id).set({
                Categoria: categoria,
                Documentacion: cedula,
                CorreoElectronico: email,
                Descripcion_Tienda: descTienda,
                DireccionCorta: direccion,
                Latitud: latitud,
                Longitud: longitud,
                Rol:"Suscripcion",
                Tienda: tienda,
                Nombre: name,
                telefono: phone,
                ImagenPrincipal: image1,
                Logo: "No Disponible",
                Publicaciones: 0
                
            })
            return res.json(userReF);
        })

    })

    blobStream.end(url.buffer);
    
})

//Creamos Suscriptores Nuevos una sola imagen (LOGO)
router.post('/registerSuscImg2', upload.single('image2'),async(req, res)=>{
    const url = req.file;
    const {id,email,name, phone,categoria,cedula,descTienda,direccion,latitud,longitud,tienda} = req.body;

    const blob = bucket.file((url.originalname));

    const blobStream = blob.createWriteStream();

    blobStream.on('error', err => {
        next(err);
    });

    blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        blob.getSignedUrl({action: 'read', expires: '03-17-2095'}).then(urls => {
            const image1 = urls[0]

            //Guardamos los datos en la base de datos
            const userReF= db.database().ref("Users").child(id).set({
                Categoria: categoria,
                Documentacion: cedula,
                CorreoElectronico: email,
                Descripcion_Tienda: descTienda,
                DireccionCorta: direccion,
                Latitud: latitud,
                Longitud: longitud,
                Rol:"Suscripcion",
                Tienda: tienda,
                Nombre: name,
                telefono: phone,
                ImagenPrincipal: "No Disponible",
                Logo: image1,
                Publicaciones: 0
                
            })
            return res.status(201).json({userReF})
        })

    })

    blobStream.end(url.buffer);
    
})

router.post('/registerSuscNone', upload.single('image'),async(req, res)=>{
    const url = req.file;
    const {id,email,name, phone,categoria,cedula,descTienda,direccion,latitud,longitud,tienda} = req.body;

    const userReF= db.database().ref("Users").child(id).set({
        Categoria: categoria,
        Documentacion: cedula,
        CorreoElectronico: email,
        Descripcion_Tienda: descTienda,
        DireccionCorta: direccion,
        Latitud: latitud,
        Longitud: longitud,
        Rol:"Suscripcion",
        Tienda: tienda,
        Nombre: name,
        telefono: phone,
        ImagenPrincipal: "No Disponible",
        Logo: "No Disponible",
        Publicaciones: 0
        
    })
    res.status(201).json({
        userReF
    })
    
})

//Buscar cupon
router.get('/validateCoupon', async(req,res) => {
    const {id} = req.params;
    let value = [];
    const ref = db.database().ref('ReporteDePagos').child("Cupones").once('value', function(snapshoot){
        
        snapshoot.forEach(function (childNodes){
            var key1 = childNodes.key;
            childNodes.forEach(function(childNieto){
              var key2 = childNieto.key;
              names = childNieto.val().Nombre;
              
              childNieto.forEach(function(childData){
                  childData.forEach(function(childCodigo){
                      childCodigo.forEach(function(childValor){
                        if(childValor.val().Codigo != null){
                            value.push({Codigo: childValor.val().Codigo, TipoDePago: childNodes.val().TipoDePago, IdCodigo: childValor.key, NombreCupon: childValor.val().Nombre_Oferta,
                                NombreUsuario: childNodes.val().Nombre, IdPago: childNodes.key, IdCupon: childData.key, Status: childValor.val().Status});
                        }
                      })

                  })
              })
            })

        })
        res.send(value);
    });

})

//Obtener tiendas
router.get('/getTiendas', async(req,res) => {
    const result = db.database().ref('Tiendas').once('value', function(snap){
        res.send(snap.val());
    })
})

//Validar cupón
router.post('/couponValidate', async(req,res) => {
    const {id_pago ,id_cupon,id_codigo} = req.body;
    const result = db.database().ref('ReporteDePagos').child("Cupones").child(id_pago).child("Cupones").child(id_cupon).child("CodigoCupones").child(id_codigo).update({
        Status:'Validado'
    })
    res.json(result);
})



//Buscamos Los cupones
router.get('/readtagCupones/:tag', async(req,res) =>{
    const {tag} = req.params;
    let tag_etq = [];
    var etiqueta = JSON.parse(tag);
    let i=0;
    etiqueta.forEach(function(element){
        const ref = db.database().ref("Cupones").orderByChild('Tag').on("value", function(snapshot){
            snapshot.forEach(function (childNodes){
                i++;
                childNodes.forEach(function(childData){
                    childData.forEach(function(childNieto){
                        if(childNieto.val().etiqueta === element){
                            var code = null;
                            if(tag_etq.length === 0){
                                tag_etq.push({IdCupon:childNodes.key, Titulo:childNodes.val().Titulo, Detalles:childNodes.val().Detalles, Imagen: childNodes.val().Imagen});
                            }
                            else{
                                code = tag_etq.find(element => element.IdCupon === childNodes.key)
                                if(code != null){
                                    
                                }
                                else{
                                    tag_etq.push({IdCupon:childNodes.key, Titulo:childNodes.val().Titulo, Detalles:childNodes.val().Detalles, Imagen: childNodes.val().Imagen});
                                }
                                
                            }
                        }
                    })
                })
            })
        });
    })
    setTimeout(() => {
        res.send(tag_etq);
    }, 2000);
    
})

router.get('/readtagCuponSemana/:tag', async(req,res,next) =>{
    const {tag} = req.params;
    let tag_etq = [];
    var etiqueta = JSON.parse(tag);
    let i=0;
    
    const ref = await db.database().ref("Cupones").orderByChild('Tag').once("value", function(snapshot){
        i++;
        snapshot.forEach(function (childNodes){
            childNodes.forEach(function(childData){
                childData.forEach(function(childNieto){
                    etiqueta.forEach(function(element){
                        if(childNieto.val().etiqueta === element){
                            var code = null;
                            if(tag_etq.length === 0){
                                tag_etq.push({IdCupon:childNodes.key, Titulo:childNodes.val().Titulo, Detalles:childNodes.val().Detalles, Imagen: childNodes.val().Imagen});
                            }
                            else{
                                code = tag_etq.find(element => element.IdCupon === childNodes.key)
                                if(code != null){
                                    
                                }
                                else{
                                    tag_etq.push({IdCupon:childNodes.key, Titulo:childNodes.val().Titulo, Detalles:childNodes.val().Detalles, Imagen: childNodes.val().Imagen});
                                }
                                
                            }

                        }
                    })
                })
            })
            
        });
        return res.send(tag_etq);
    })
})

//Buscamos Los TAG cupones MEJOR EN SALUD
router.get('/readtagMejorEnSalud/:tag', async(req,res) =>{
    const {tag} = req.params;
    let tag_etq = [];
    var etiqueta = JSON.parse(tag);
    let i=1;
    etiqueta.forEach(function(element){
        const ref = db.database().ref("Cupones").child("MejorEnSalud").orderByChild('Tag').once("value", function(snapshot){
            i++;
            snapshot.forEach(function (childNodes){
                childNodes.forEach(function(childData){
                    childData.forEach(function(childNieto){
                        if(childNieto.val().etiqueta === element){
                            var code = null;
                            if(tag_etq.length === 0){
                                tag_etq.push({IdCupon:childNodes.key, Titulo:childNodes.val().Titulo, Detalles:childNodes.val().Detalles, Imagen: childNodes.val().Imagen});
                            }
                            else{
                                code = tag_etq.find(element => element.IdCupon === childNodes.key)
                                if(code != null){
                                    
                                }
                                else{
                                    tag_etq.push({IdCupon:childNodes.key, Titulo:childNodes.val().Titulo, Detalles:childNodes.val().Detalles, Imagen: childNodes.val().Imagen});
                                }
                                
                            }

                        }
                    })
                })
            })
            return tag_etq;
        });
        setTimeout(() => {
            res.send(tag_etq);
        }, 2000);
    })
})

//Buscamos Los TAG cupones BELLEZA TOP
router.get('/readtagBelleza/:tag', async(req,res) =>{

    const {tag} = req.params;
    let tag_etq = [];
    var etiqueta = JSON.parse(tag);
    let i=0;
    etiqueta.forEach(function(element){
        const ref = db.database().ref("Cupones").child("Belleza").orderByChild('Tag').once("value", function(snapshot){
            i++;
            snapshot.forEach(function (childNodes){
                childNodes.forEach(function(childData){
                    childData.forEach(function(childNieto){
                        if(childNieto.val().etiqueta === element){
                            var code = null;
                            if(tag_etq.length === 0){
                                tag_etq.push({IdCupon:childNodes.key, Titulo:childNodes.val().Titulo, Detalles:childNodes.val().Detalles, Imagen: childNodes.val().Imagen});
                            }
                            else{
                                code = tag_etq.find(element => element.IdCupon === childNodes.key)
                                if(code != null){
                                    
                                }
                                else{
                                    tag_etq.push({IdCupon:childNodes.key, Titulo:childNodes.val().Titulo, Detalles:childNodes.val().Detalles, Imagen: childNodes.val().Imagen});
                                }
                                
                            }

                        }
                    })
                })
            })

        });

        setTimeout(() => {
            res.send(tag_etq);
        }, 2000);
    })
    
})


//Buscamos Los TAG cupones COMIDA
router.get('/readtagComida/:tag', async(req,res) =>{

    const {tag} = req.params;
    let tag_etq = [];
    var etiqueta = JSON.parse(tag);
    let i=0;
    etiqueta.forEach(function(element){
        const ref = db.database().ref("Cupones").child("Comida").orderByChild('Tag').once("value", function(snapshot){
            i++;
            snapshot.forEach(function (childNodes){
                childNodes.forEach(function(childData){
                    childData.forEach(function(childNieto){
                        if(childNieto.val().etiqueta === element){
                            var code = null;
                            if(tag_etq.length === 0){
                                tag_etq.push({IdCupon:childNodes.key, Titulo:childNodes.val().Titulo, Detalles:childNodes.val().Detalles, Imagen: childNodes.val().Imagen});
                            }
                            else{
                                code = tag_etq.find(element => element.IdCupon === childNodes.key)
                                if(code != null){
                                    
                                }
                                else{
                                    tag_etq.push({IdCupon:childNodes.key, Titulo:childNodes.val().Titulo, Detalles:childNodes.val().Detalles, Imagen: childNodes.val().Imagen});
                                }
                                
                            }

                        }
                    })
                })
            })

        });
        setTimeout(() => {
            res.send(tag_etq);
        }, 2000);
    })

})

//Buscamos Los TAG cupones TODO UN DOLAR
router.get('/readtagTodoUnDolar/:tag', async(req,res) =>{

    const {tag} = req.params;
    let tag_etq = [];
    var etiqueta = JSON.parse(tag);
    let i=0;
    etiqueta.forEach(function(element){
        const ref = db.database().ref("Cupones").child("TodoUnDolar").orderByChild('Tag').once("value", function(snapshot){
            i++;
            snapshot.forEach(function (childNodes){
                childNodes.forEach(function(childData){
                    childData.forEach(function(childNieto){
                        if(childNieto.val().etiqueta === element){
                            var code = null;
                            if(tag_etq.length === 0){
                                tag_etq.push({IdCupon:childNodes.key, Titulo:childNodes.val().Titulo, Detalles:childNodes.val().Detalles, Imagen: childNodes.val().Imagen});
                            }
                            else{
                                code = tag_etq.find(element => element.IdCupon === childNodes.key)
                                if(code != null){
                                    
                                }
                                else{
                                    tag_etq.push({IdCupon:childNodes.key, Titulo:childNodes.val().Titulo, Detalles:childNodes.val().Detalles, Imagen: childNodes.val().Imagen});
                                }
                                
                            }

                        }
                    })
                })
            })

        });

        setTimeout(() => {
            res.send(tag_etq);
        }, 2000);
    })


})

//Valor del dolar
router.get('/tasaDolar', async(req,res) =>{
    const result = db.database().ref("TasaDelDolar").once('value', function(snap){
        res.send(snap.val());
    })
})

//Actualizar datos del usuario suscriptor
router.post('/updateSuscriptor', async(req,res) => {
    const {id,name, phone,direccion,latitud,longitud,tienda, desc, keyTienda,img_Log,img_Tien} = req.body;
    const result = db.database().ref("Users").child(id).update({
        Nombre: name,
        DireccionCorta: direccion,
        Telefono: phone,
        Tienda: tienda,
        Descripcion_Tienda: desc
    })

    if(keyTienda === tienda){
        const tienda_ref = db.database().ref("Tiendas").child(keyTienda).update({
            Detalles: desc,
            Direccion: direccion,
            Latitud: latitud,
            Longitud: longitud
        })
        res.json(tienda_ref);
    }
    else{
        var value = db.database().ref("Tiendas").child(keyTienda).remove();
        const tienda_ref = db.database().ref("Tiendas").child(tienda).set({
            Detalles:desc,
            Direccion: direccion,
            FotoReferencial: img_Tien,
            ImagenLogo: img_Log,
            Latitud:latitud,
            Longitud:longitud,
            Nombre: tienda
        })
        res.json(tienda_ref);
    }

    
})


//Subir imagen - Crear Publicacion
router.post('/uploadImage',  upload.single('image') ,async(req,res) => {
    const url = req.file;
    const blob = bucket.file((url.originalname));

    const blobStream = blob.createWriteStream();

    blobStream.on('error', err => {
        next(err);
    });

    blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = format(
            `https://storage.googleapis.com//Suscripciones/SolicitudDePublicaciones/${bucket.name}/${blob.name}`
        );
        blob.getSignedUrl({action: 'read', expires: '03-17-2095'}).then(urls => {
            const image1 = urls[0];
            res.send(image1);
        })
    })
    blobStream.end(url.buffer);    
})

//Guardar publicacion
router.post('/savePublicacion', async(req,res) =>{
    const {catg, consid, contraind, desc, lunes, martes, mier, jueves, viern, sabado, dom, id_user, imgPrin, imgSec, imgTerc, incl, noInc, plazo,
    stock, titulo, campBelleza, campComida, campSalud, campTodoDolar, ahorro, fechaVen, detalles} = req.body;

    var f = new Date();
    var fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();


    const result = db.database().ref("Suscripciones").child("SolicitudesPublicaciones").push({
        Categoria: catg,
        Comentario:'',
        Consideraciones: consid,
        Contraindicacion: contraind,
        Camp_Belleza: campBelleza,
        Camp_Comida: campComida,
        Camp_Salud: campSalud,
        Camp_TodoDolar: campTodoDolar,
        DescripcionProducto: desc,
        Lunes: lunes,
        Martes: martes,
        Miercoles: mier,
        Jueves: jueves,
        Viernes: viern,
        Sabado: sabado,
        Domingo: dom,
        Detalles: detalles,
        Fecha_Vencimiento: fechaVen,
        Fecha: fecha,
        IdUsuario: id_user,
        ImagenPrincipa: imgPrin,
        SegundaImagen: imgSec,
        TerceraImagen: imgTerc,
        Incluye: incl,
        NoIncluye: noInc,
        PlazoDeUso: plazo,
        Status:"Por Validar",
        Stock_Producto: stock,
        Titulo_Oferta: titulo,
        AhorroOferta: ahorro
    })

    const user = db.database().ref("Users").child(id_user).child("Publicaciones").push({
        FechaDeSolicitud: fecha,
        Id_Oferta: "Ninguno",
        Status:"Por Validar",
        id_Publicacion: result.key 
    })

    res.json(user);
})

//Insertar instagram
router.post('/refreshInstagram', async(req, res) => {
    const {id_user, user} = req.body;
    const result = db.database().ref("Users").child(id_user).update({
        UserInstagram: user
    })
    res.json(result);
})


//Publicaciones Validadas
router.get('/validatePublicacion/:id_user', async(req,res) => {
    const {id_user} = req.params;
    const result = db.database().ref("Users").child(id_user).child("Publicaciones").orderByChild("Status").equalTo("Validado").once('value', function(snap){
        if(snap.exists()){
            snap.forEach(function(snapshoot){
                
            })
            res.send(snap.val());
        }
        else{
            res.send(null);
        }
        
    })
})

//Buscar publicacion
router.get('/getPublicacion/:id/:idOferta', async(req,res) => {
    const {id, idOferta} = req.params;

    const result = db.database().ref("Suscripciones").child("SolicitudesPublicaciones").child(id).once("value", function(snap){
        var value = new Publicacion(id, snap.val().Titulo_Oferta, snap.val().ImagenPrincipa, snap.val().DescripcionProducto, snap.val().Fecha_Vencimiento, idOferta);
        res.send(value);
    })
    
})

router.post('/updatePublicacionTime', async(req,res) => {
    const {idPublicacion, stockMax, fecha_ven} = req.body;
    const update = db.database().ref("Suscripciones").child("SolicitudesPublicaciones").child(idPublicacion).update({
        Fecha_Vencimiento: fecha_ven,
        Stock_Producto: stockMax
    })
    res.json(update);
})

function Publicacion(id_Publicacion, titulo, imagen, descripcion,fecha, idOferta) {
    this.Id_Publicacion = id_Publicacion;
    this.Id_Oferta = idOferta;
    this.Titulo = titulo;
    this.Imagen = imagen;
    this.Descripcion = descripcion;
    this.Fecha_Vencimiento = fecha;
}


//Detalles de la Publicacion
router.get('/getDetailPublicacion/:id', async(req,res) => {
    const {id} = req.params;

    const result = db.database().ref("Suscripciones").child("SolicitudesPublicaciones").child(id).once("value", function(snap){
        var value = new PublicacionDetalles(id, snap.val().Titulo_Oferta, snap.val().Detalles, snap.val().Fecha_Vencimiento ,snap.val().DescripcionProducto, snap.val().Categoria,
        snap.val().Stock_Producto, snap.val().AhorroOferta, snap.val().Lunes, snap.val().Martes, snap.val().Miercoles, snap.val().Jueves, 
        snap.val().Viernes,snap.val().Sabado ,snap.val().Domingo, snap.val().PlazoDeUso, snap.val().Incluye, snap.val().NoIncluye, snap.val().Consideraciones,
        snap.val().Contraindicacion, snap.val().Camp_Belleza, snap.val().Camp_Comida, snap.val().Camp_Salud, snap.val().Camp_TodoDolar,
        snap.val().ImagenPrincipa, snap.val().SegundaImagen, snap.val().TerceraImagen, snap.val().Comentario, snap.val().IdUsuario);
        res.send(value);
    })
    
})

function PublicacionDetalles(id_Publicacion, titulo, detalles, fechaVen ,descripcion, categoria, stock, oferta, lunes,martes,miercoles,jueves,viernes,sabado,domingo,
    uso, incluye, noIncluye, consid, contraind, campBelleza, campComida, campSalud, campDolar, imagenPrin, imagenSec, imagenTerc, comentario, IdUsuario) {

    var dias = '';
    if(lunes == "Si"){
        dias += "Si";
      }
  
    if(martes == "Si"){
        if (dias != ''){
            dias += ", Martes";
        }else{
            dias += "Martes";
        }
    }

    if(miercoles == "Si"){
        if (dias != ''){
            dias += ", Miercoles";
        }else{
            dias += "Miercoles";
        }
    }

    if(jueves == "Si"){
        if (dias != ''){
            dias += ", Jueves";
        }else{
            dias += "Jueves";
        }
    }

    if(viernes == "Si"){
        if (dias != ''){
            dias += ", Viernes";
        }else{
            dias += "Viernes";
        }
    }

    if(sabado == "Si"){
        if (dias != ''){
            dias += ", Sabado";
        }else{
            dias += "Sabado";
        }
    }

    if(domingo == "Si"){
        if (dias != ''){
            dias += ", Domingo";
        }else{
            dias += "Domingo";
        }
    }
      
      
    this.Id_Publicacion = id_Publicacion;
    this.Titulo = titulo;
    this.Detalles = detalles;
    this.Fecha_Vencimiento = fechaVen;
    this.Descripcion = descripcion;
    this.Categoria = categoria;
    this.Stock = stock;
    this.Uso = uso;
    this.Incluye = incluye;
    this.NoIncluye = noIncluye;
    this.Consid = consid;
    this.Contraind = contraind;
    this.CampBelleza = campBelleza;
    this.CampSalud = campSalud;
    this.CampComida = campComida;
    this.CampDolar = campDolar;
    this.Dias = dias;
    this.Oferta = oferta;
    this.ImagenPrincipal = imagenPrin;
    this.ImagenSecundaria = imagenSec;
    this.ImagenTercera = imagenTerc;
    this.Comentario = comentario;
    this.Lunes = lunes;
    this.Martes = martes;
    this.Miercoles = miercoles;
    this.Jueves = jueves;
    this.Viernes = viernes;
    this.Sabado = sabado;
    this.Domingo = domingo;
    this.IdUsuario = IdUsuario;
}

//Solicitud de Cancelacion de Publicación
router.post("/cancelPublicacion", async(req,res)=>{
    const {idCupon, idPublicacion, coment, IdUser, User, Detalles} = req.body;
    var f = new Date();
    var fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
    const result = db.database().ref("Suscripciones").child("SolicitudDeCancelacionPublicacion").push({
        IdPublicacion: idPublicacion,
        IdCupon: idCupon,
        IdUsuario: IdUser,
        Fecha: fecha,
        Solicitud: coment,
        Status:'En espera',
        User: User,
        TituloCupon: Detalles
    })
    res.json(result);
})

//Obtener id del cupon
router.post('/getIdCupon', async(req,res) => {
    const {IdUser, idPublicacion}= req.body;
    const value = await db.database().ref("Users").child(IdUser).child('Publicaciones').orderByChild('id_Publicacion').equalTo(idPublicacion).on('value', function(snap){
        snap.forEach(function(snapData){
            res.send(snapData.val().Id_Oferta);
        })
    })
})

//Publicaciones Por validar
router.get('/denyValidatePublicacion/:id_user', async(req,res) => {
    const {id_user} = req.params;
    const result = db.database().ref("Users").child(id_user).child("Publicaciones").orderByChild("Status").equalTo("Por Validar").once('value', function(snap){
        if(snap.exists()){
            snap.forEach(function(snapshoot){
                
            })
            res.send(snap.val());
        }
        else{
            res.send(null);
        }
        
    })
})

//Publicaciones Rechazadas
router.get('/denyPublicacion/:id_user', async(req,res) => {
    const {id_user} = req.params;
    const result = db.database().ref("Users").child(id_user).child("Publicaciones").orderByChild("Status").equalTo("Rechazado").once('value', function(snap){
        if(snap.exists()){
            snap.forEach(function(snapshoot){
                
            })
            res.send(snap.val());
        }
        else{
            res.send(null);
        }
        
    })
})

//Modificar publicacion
//Guardar publicacion
router.post('/updatePublicacion', async(req,res) =>{
    const {id_pub, catg, consid, contraind, desc, lunes, martes, mier, jueves, viern, sabado, dom, id_user, imgPrin, imgSec, imgTerc, incl, noInc, plazo,
    stock, titulo, campBelleza, campComida, campSalud, campTodoDolar, ahorro, detalles, fechaVen} = req.body;

    var f = new Date();
    var fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();

    
    var ref_user =db.database().ref("Users").child(id_user).child("Publicaciones");
        ref_user.orderByChild('id_Publicacion').equalTo(id_pub).limitToFirst(1).once('value', function(snap){
            snap.forEach(function(childSnapshot) {
                var key = childSnapshot.key;

                const user = db.database().ref("Users").child(id_user).child("Publicaciones").child(key).update({
                    FechaDeSolicitud: fecha,
                    Status:"Por Validar"
                })
            })
            
        })

    const result = db.database().ref("Suscripciones").child("SolicitudesPublicaciones").child(id_pub).update({
        Categoria: catg,
        Comentario:'',
        Consideraciones: consid,
        Contraindicacion: contraind,
        Camp_Belleza: campBelleza,
        Camp_Comida: campComida,
        Camp_Salud: campSalud,
        Camp_TodoDolar: campTodoDolar,
        DescripcionProducto: desc,
        Lunes: lunes,
        Martes: martes,
        Miercoles: mier,
        Jueves: jueves,
        Viernes: viern,
        Sabado: sabado,
        Domingo: dom,
        Detalles:detalles,
        Fecha: fecha,
        Fecha_Vencimiento:fechaVen,
        IdUsuario: id_user,
        ImagenPrincipa: imgPrin,
        SegundaImagen: imgSec,
        TerceraImagen: imgTerc,
        Incluye: incl,
        NoIncluye: noInc,
        PlazoDeUso: plazo,
        Status:"Por Validar",
        Stock_Producto: stock,
        Titulo_Oferta: titulo,
        AhorroOferta: ahorro
    })
   
    res.json(result);
})

//Obtener publicaciones del usuario
router.get('/getPublicacionUser/:id', async(req,res) => {
    var value = [];
    const {id} = req.params;
    const result = db.database().ref("Users").child(id).child("Publicaciones").orderByChild('Status').equalTo('Validado').once("value", function(snap){
        if(snap.exists){
            snap.forEach(function(childData){
                value.push(childData.val().Id_Oferta)
            })
        }
    })

    setTimeout(() => {
        res.send(value);
    }, 2000);
        
    
})

//Obtener puntuacion
router.get('/getPuntuacionPublicacion/:id', async(req,res) =>{
    const {id} = req.params;
    let point = [];
    const puntuacion = db.database().ref("Cupones").child(id).child("Puntuacion").once("value", function(childData){
        if(childData.exists()){
            childData.forEach(function(childPuntos){
                point.push(childPuntos.val().Puntuacion);
            })
        }
        res.send(point);
    })
    
})

//-----------OBTENEMOS CUPONES DE LA SEMANA

router.get('/readCuponesLunes', async(req, res) => {
    var value = [];
    result = await db.database().ref("Cupones").orderByChild("Status").equalTo("Activa").once("value", function(snapshoot){
        snapshoot.forEach(function(snap){
            if(snap.val().Lunes === "Si"){
                value.push(snap.val());
            }
        })
        res.send(value);
    })
})


//MARTES
router.get('/readCuponesMartes', async (req, res) => {
    var value=[];
    result = await db.database().ref("Cupones").orderByChild("Status").equalTo("Activa").once("value", function(snapshoot){
        snapshoot.forEach(function(snap){
            if(snap.val().Martes === "Si"){
                value.push(snap.val());
            }
        })
        res.send(value);
    })
})



//MIERCOLES
router.get('/readCuponesMiercoles', async (req, res) => {
    var value = [];
    result = await db.database().ref("Cupones").orderByChild("Status").equalTo("Activa").once("value", function(snapshoot){
        snapshoot.forEach(function(snap){
            if(snap.val().Miercoles === "Si"){
                value.push(snap.val());
            }
        })
        res.send(value);
    })
})       


//JUEVES
router.get('/readCuponesJueves', async (req, res) => {
    var value = [];
    const result = await db.database().ref("Cupones").orderByChild("Status").equalTo("Activa").once("value", function(snapshoot){
        snapshoot.forEach(function(snap){
            if(snap.val().Jueves === "Si"){
                value.push(snap.val());
            }
        })
        res.send(value);
    })
})


 //VIERNES
 router.get('/readCuponesViernes', async (req, res) => {
     var value = [];
    const result = await db.database().ref("Cupones").orderByChild("Status").equalTo("Activa").once("value", function(snapshoot){
        snapshoot.forEach(function(snap){
            if(snap.val().Viernes === "Si"){
                value.push(snap.val());
            }
        })
        res.send(value);
    })
})       


 //SABADO
 router.get('/readCuponesSabado', async (req, res) => {
    var value = [];
    const result = await db.database().ref("Cupones").orderByChild("Status").equalTo("Activa").once("value", function(snapshoot){
        snapshoot.forEach(function(snap){
            if(snap.val().Sabado === "Si"){
                value.push(snap.val());
            }
        })
        res.send(value);
    })
})   


//DOMINGO
router.get('/readCuponesDomingo', async (req, res) => {
    var value = [];
    const result = await db.database().ref("Cupones").orderByChild("Status").equalTo("Activa").once("value", function(snapshoot){
        snapshoot.forEach(function(snap){
            if(snap.val().Domingo === "Si"){
                value.push(snap.val());
            }
        })
        res.send(value);
    })
})


//--------------Obtener cupones por categoria ------------//
router.get('/getCuponesProductos', async(req,res) => {
    const result = await db.database().ref("Cupones").orderByChild("Categoria").equalTo("Productos").limitToFirst(4).once("value", function(snapshoot){
        res.send(snapshoot.val());
    })
})

router.get('/getCuponesComida', async(req,res) => {
    const result = await db.database().ref("Cupones").orderByChild("Categoria").equalTo("Comida").limitToFirst(4).once("value", function(snapshoot){
        res.send(snapshoot.val());
    })
})

router.get('/getCuponesBelleza', async(req,res) => {
    const result = await db.database().ref("Cupones").orderByChild("Categoria").equalTo("Belleza").limitToFirst(4).once("value", function(snapshoot){
        res.send(snapshoot.val());
    })
})

router.get('/getCuponesSalud', async(req,res) => {
    const result = await db.database().ref("Cupones").orderByChild("Categoria").equalTo("Salud").limitToFirst(4).once("value", function(snapshoot){
        res.send(snapshoot.val());
    })
})

router.get('/getCuponesServicios', async(req,res) => {
    const result = await db.database().ref("Cupones").orderByChild("Categoria").equalTo("Servicios").limitToFirst(4).once("value", function(snapshoot){
        res.send(snapshoot.val());
    })
})

//Buscador de ubicacion
router.get('/getTiendaUbicacion/:ubicacion', async(req,res) =>{
    const {ubicacion} = req.params;
    const result = await db.database().ref("Tiendas").orderByChild("Direccion").equalTo(ubicacion).once('value', function(snapshoot){
        if(snapshoot.exists()){
            res.send(snapshoot.val());
        }
        else{
            res.send(null);
        }
        
    })
})


router.get('/getCuponForLocation/:tienda', async(req,res) => {
    const {tienda} =req.params;
    const result = await db.database().ref("Cupones").orderByChild("Tienda").equalTo(tienda).once('value', function(snapshoot){
        if(snapshoot.exists()){
            res.send(snapshoot.val());
        }
        else{
            res.send(null);
        }
    })
})

//Obtener cupones destacados por categoria

//COMIDA
router.get('/readCuponesVIP', async(req, res) => { //Ruta para obtener Cupones
    const result = await db.database().ref("Cupones").orderByChild("Categoria").equalTo("CuponesVip").once("value", function(snapshoot){
        res.send(snapshoot.val());
    })
})


//Los cupones mas vistos
router.get('/readCuponesMoreView', async(req,res) => {
    const result = await db.database().ref("Cupones").orderByChild("Visualizacion").limitToLast(8).once("value", function(snapshoot){
        var scores = [];
        snapshoot.forEach(function(childSnapshot) {
          scores.unshift(childSnapshot.val());
        });
        res.send(scores);
    })
})

///-------------------------------------------------------> FUNCIONES ADMINISTRADOR <-------------------------------------------------------------//




// ////////----////// CUPONES DE LA SEMANA // ////////----//////

    //Guardar Cupones De la Semana
    router.post('/saveCuponesDestacado', async(req,res) =>{
        const {tag, categoria, descripcion, detalles, disponibilidad, dispmin, fecha_ven, imagen, imagenSec, imagenTerc,tienda, titulo,
        lunes, martes, miercoles, jueves , viernes, sabado, domingo, campBelleza, campComida, campSalud, campTodoDolar,
        consid, contraind, plazo, ahorro, inc , noInc, slider, banner} = req.body;
        const item = JSON.parse(tag);
        
        const result =  db.database().ref("Cupones").push({
            AhorroOferta: ahorro,
            Categoria: categoria,
            CampBelleza: campBelleza,
            CampSalud: campSalud,
            CampDolar: campTodoDolar,
            CampComida: campComida,
            Click: 0,
            Contador: 0,
            Consideraciones: consid,
            Contraindicacion: contraind,
            Descripcion: descripcion, 
            Detalles: detalles,
            Disponibilidad_Estandar: disponibilidad,
            Disponibilidad_Minima: dispmin,
            Fecha_Vencimiento: fecha_ven,
            Id: 'ninguno',
            Imagen: imagen,
            ImagenSecundaria: imagenSec,
            ImagenTercera: imagenTerc,
            Incluye: inc,
            NoIncluye: noInc,
            PlazoDeUso: plazo,
            Tiempo: "Ninguno",
            Tienda: tienda,
            Titulo: titulo,
            Visualizacion: 0,
            Lunes: lunes,
            Martes: martes,
            Miercoles: miercoles,
            Jueves: jueves,
            Viernes: viernes,
            Sabado: sabado,
            Domingo: domingo
        })    

        //Guardar Tag
        item.forEach(item =>{
            const value = db.database().ref("Cupones").child(result.key).child("Tag").push({
                etiqueta:item
            });
        })


        //Guardar en Cupones de la Semana
        const result2 =  db.database().ref("PromocionesSlider").child(result.key).set({
            AhorroOferta: ahorro,
            Categoria: categoria,
            Click: 0,
            Contador: 0,
            Consideraciones: consid,
            Contraindicacion: contraind,
            Descripcion: descripcion, 
            Detalles: detalles,
            Disponibilidad_Estandar: disponibilidad,
            Disponibilidad_Minima: dispmin,
            Fecha_Vencimiento: fecha_ven,
            Id: 'ninguno',
            Imagen: imagen,
            ImagenSecundaria: imagenSec,
            ImagenTercera: imagenTerc,
            Incluye: inc,
            NoIncluye: noInc,
            PlazoDeUso: plazo,
            Tiempo: "Ninguno",
            Tienda: tienda,
            Titulo: titulo,
            Visualizacion: 0,
            Lunes: lunes,
            Martes: martes,
            Miercoles: miercoles,
            Jueves: jueves,
            Viernes: viernes,
            Sabado: sabado,
            Domingo: domingo,
            Slider: slider,
            Banner: banner
        })    

        //Guardar Tag
        item.forEach(item =>{
            const value2 = db.database().ref("PromocionesSlider").child(result.key).child("Tag").push({
                etiqueta:item
            });
        })



        //Guardar Segun campaña
        if(campBelleza === "Si"){
            const camp =  db.database().ref("Cupones").child('Belleza').child(result.key).set({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: result.key,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('Belleza').child(result.key).child("Tag").push({
                    etiqueta:item
                });
            })
        }

        if(campComida === "Si"){
            const camp =  db.database().ref("Cupones").child('Comida').child(result.key).set({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: result.key,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('Comida').child(result.key).child("Tag").push({
                    etiqueta:item
                });
            })
        }

        if(campSalud === "Si"){
            const camp =  db.database().ref("Cupones").child('MejorEnSalud').child(result.key).set({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: result.key,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('MejorEnSalud').child(result.key).child("Tag").push({
                    etiqueta:item
                });
            })
        }

        if(campTodoDolar === "Si"){
            const camp =  db.database().ref("Cupones").child('TodoUnDolar').child(result.key).set({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: result.key,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('TodoUnDolar').child(result.key).child("Tag").push({
                    etiqueta:item
                });
            })
        }


        const id_push2 = db.database().ref("PromocionesSlider").child(result.key).update({
            Id: result.key
        })

        const id_push = db.database().ref("Cupones").child(result.key).update({
            Id: result.key
        })
        
        res.json(id_push);

    })

    //Obtener cupones de la semana
    router.get('/getCuponesSemana', async(req, res) => {
        const result = await db.database().ref("PromocionesSlider").once('value', function(snapshoot){
            res.send(snapshoot.val());
        })
    })


    //Actualizar cupones
    router.post('/updateCuponesDestacado', async(req,res) =>{
        const {tag, categoria, descripcion, detalles, disponibilidad, dispmin, fecha_ven, imagen, imagenSec, imagenTerc,tienda, titulo,
        lunes, martes, miercoles, jueves , viernes, sabado, domingo, campBelleza, campComida, campSalud, campTodoDolar,
        consid, contraind, plazo, ahorro, inc , noInc, slider, banner, idCupon} = req.body;
        const item = JSON.parse(tag);
        
        const result =  db.database().ref("Cupones").child(idCupon).update({
            AhorroOferta: ahorro,
            Categoria: categoria,
            CampBelleza: campBelleza,
            CampSalud: campSalud,
            CampDolar: campTodoDolar,
            CampComida: campComida,
            Click: 0,
            Contador: 0,
            Consideraciones: consid,
            Contraindicacion: contraind,
            Descripcion: descripcion, 
            Detalles: detalles,
            Disponibilidad_Estandar: disponibilidad,
            Disponibilidad_Minima: dispmin,
            Fecha_Vencimiento: fecha_ven,
            Id: idCupon,
            Imagen: imagen,
            ImagenSecundaria: imagenSec,
            ImagenTercera: imagenTerc,
            Incluye: inc,
            NoIncluye: noInc,
            PlazoDeUso: plazo,
            Tiempo: "Ninguno",
            Tienda: tienda,
            Titulo: titulo,
            Visualizacion: 0,
            Lunes: lunes,
            Martes: martes,
            Miercoles: miercoles,
            Jueves: jueves,
            Viernes: viernes,
            Sabado: sabado,
            Domingo: domingo
        })    

        //Actualizar Tag
        var value_tag = db.database().ref("Cupones").child(idCupon).child("Tag").remove();
        item.forEach(item =>{
            const value = db.database().ref("Cupones").child(idCupon).child("Tag").push({
                etiqueta:item
            });
        })


        //Actualizar en Cupones de la Semana
        const result2 =  db.database().ref("PromocionesSlider").child(idCupon).update({
            AhorroOferta: ahorro,
            Categoria: categoria,
            Click: 0,
            Contador: 0,
            Consideraciones: consid,
            Contraindicacion: contraind,
            Descripcion: descripcion, 
            Detalles: detalles,
            Disponibilidad_Estandar: disponibilidad,
            Disponibilidad_Minima: dispmin,
            Fecha_Vencimiento: fecha_ven,
            Id: 'ninguno',
            Imagen: imagen,
            ImagenSecundaria: imagenSec,
            ImagenTercera: imagenTerc,
            Incluye: inc,
            NoIncluye: noInc,
            PlazoDeUso: plazo,
            Tiempo: "Ninguno",
            Tienda: tienda,
            Titulo: titulo,
            Visualizacion: 0,
            Lunes: lunes,
            Martes: martes,
            Miercoles: miercoles,
            Jueves: jueves,
            Viernes: viernes,
            Sabado: sabado,
            Domingo: domingo,
            Slider: slider,
            Banner: banner
        })    

        //Actualizar
        var value_tag = db.database().ref("PromocionesSlider").child(idCupon).child("Tag").remove();
        item.forEach(item =>{
            const value2 = db.database().ref("PromocionesSlider").child(idCupon).child("Tag").push({
                etiqueta:item
            });
        })



        //Guardar Segun campaña
        if(campBelleza === "Si"){
            const camp =  db.database().ref("Cupones").child('Belleza').child(idCupon).update({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: result.key,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            var camp_tag = db.database().ref("Cupones").child("Belleza").child(idCupon).child("Tag").remove();
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('Belleza').child(idCupon).child("Tag").push({
                    etiqueta:item
                });
            })
        }

        if(campComida === "Si"){
            const camp =  db.database().ref("Cupones").child('Comida').child(idCupon).update({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: result.key,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            var camp_tag = db.database().ref("Cupones").child("Comida").child(idCupon).child("Tag").remove();
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('Comida').child(idCupon).child("Tag").push({
                    etiqueta:item
                });
            })
        }

        if(campSalud === "Si"){
            const camp =  db.database().ref("Cupones").child('MejorEnSalud').child(idCupon).update({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: result.key,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            var camp_tag = db.database().ref("Cupones").child("MejorEnSalud").child(idCupon).child("Tag").remove();
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('MejorEnSalud').child(idCupon).child("Tag").push({
                    etiqueta:item
                });
            })
        }

        if(campTodoDolar === "Si"){
            const camp =  db.database().ref("Cupones").child('TodoUnDolar').child(idCupon).update({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: result.key,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            var camp_tag = db.database().ref("Cupones").child("TodoUnDolar").child(idCupon).child("Tag").remove();
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('TodoUnDolar').child(idCupon).child("Tag").push({
                    etiqueta:item
                });
            })
        }

        
        res.json(result2);

    })

    //Agregar Cupón existente a cupones de la semana
    router.post('/addCuponesSemana', async(req,res) =>{
        const {tag, categoria, descripcion, detalles, disponibilidad, dispmin, fecha_ven, imagen, imagenSec, imagenTerc,tienda, titulo,
        lunes, martes, miercoles, jueves , viernes, sabado, domingo, campBelleza, campComida, campSalud, campTodoDolar,
        consid, contraind, plazo, ahorro, inc , noInc, slider, banner, id_cupon} = req.body;
        const item = JSON.parse(tag);

        //Guardar en Cupones de la Semana
        const result2 =  db.database().ref("PromocionesSlider").child(id_cupon).set({
            AhorroOferta: ahorro,
            Categoria: categoria,
            Click: 0,
            Contador: 0,
            Consideraciones: consid,
            Contraindicacion: contraind,
            Descripcion: descripcion, 
            Detalles: detalles,
            Disponibilidad_Estandar: disponibilidad,
            Disponibilidad_Minima: dispmin,
            Fecha_Vencimiento: fecha_ven,
            Id: 'ninguno',
            Imagen: imagen,
            ImagenSecundaria: imagenSec,
            ImagenTercera: imagenTerc,
            Incluye: inc,
            NoIncluye: noInc,
            PlazoDeUso: plazo,
            Tiempo: "Ninguno",
            Tienda: tienda,
            Titulo: titulo,
            Visualizacion: 0,
            Lunes: lunes,
            Martes: martes,
            Miercoles: miercoles,
            Jueves: jueves,
            Viernes: viernes,
            Sabado: sabado,
            Domingo: domingo,
            Slider: slider,
            Banner: banner
        })    

        //Guardar Tag
        item.forEach(item =>{
            const value2 = db.database().ref("PromocionesSlider").child(id_cupon).child("Tag").push({
                etiqueta:item
            });
        })

        res.json(result2);

    })


    //Reemplazar Cupon de la Semana existente
    router.post('/changeCuponesSemana', async(req,res) =>{
        const {tag, categoria, descripcion, detalles, disponibilidad, dispmin, fecha_ven, imagen, imagenSec, imagenTerc,tienda, titulo,
        lunes, martes, miercoles, jueves , viernes, sabado, domingo, campBelleza, campComida, campSalud, campTodoDolar,
        consid, contraind, plazo, ahorro, inc , noInc, slider, banner, idCupon} = req.body;
        const item = JSON.parse(tag);
        
        //Actualizar en Cupones de la Semana
        const result2 =  db.database().ref("PromocionesSlider").child(idCupon).update({
            AhorroOferta: ahorro,
            Categoria: categoria,
            Click: 0,
            Contador: 0,
            Consideraciones: consid,
            Contraindicacion: contraind,
            Descripcion: descripcion, 
            Detalles: detalles,
            Disponibilidad_Estandar: disponibilidad,
            Disponibilidad_Minima: dispmin,
            Fecha_Vencimiento: fecha_ven,
            Id: idCupon,
            Imagen: imagen,
            ImagenSecundaria: imagenSec,
            ImagenTercera: imagenTerc,
            Incluye: inc,
            NoIncluye: noInc,
            PlazoDeUso: plazo,
            Tiempo: "Ninguno",
            Tienda: tienda,
            Titulo: titulo,
            Visualizacion: 0,
            Lunes: lunes,
            Martes: martes,
            Miercoles: miercoles,
            Jueves: jueves,
            Viernes: viernes,
            Sabado: sabado,
            Domingo: domingo,
            Slider: slider,
            Banner: banner
        })    

        //Actualizar
        var value_tag = db.database().ref("PromocionesSlider").child(idCupon).child("Tag").remove();
        item.forEach(item =>{
            const value2 = db.database().ref("PromocionesSlider").child(idCupon).child("Tag").push({
                etiqueta:item
            });
        })

        res.json(result2);
    })



// ////////----////// CUPONES DESTACADOS // ////////----//////

    //-Guardar Cupones Destacados
    router.post('/addCuponesDestacado', async(req,res) =>{
        const {tag, categoria,destacado,descripcion, detalles, disponibilidad, dispmin, fecha_ven, imagen, imagenSec, imagenTerc,tienda, titulo,
        lunes, martes, miercoles, jueves , viernes, sabado, domingo, campBelleza, campComida, campSalud, campTodoDolar,
        consid, contraind, plazo, ahorro, inc , noInc} = req.body;
        const item = JSON.parse(tag);
        
        const result =  db.database().ref("Cupones").push({
            AhorroOferta: ahorro,
            Categoria: 'CuponDestacado',
            CampBelleza: campBelleza,
            CampSalud: campSalud,
            CampDolar: campTodoDolar,
            CampComida: campComida,
            Click: 0,
            Contador: 0,
            Consideraciones: consid,
            Contraindicacion: contraind,
            Descripcion: descripcion, 
            Detalles: detalles,
            Disponibilidad_Estandar: disponibilidad,
            Disponibilidad_Minima: dispmin,
            Fecha_Vencimiento: fecha_ven,
            Id: 'ninguno',
            Imagen: imagen,
            ImagenSecundaria: imagenSec,
            ImagenTercera: imagenTerc,
            Incluye: inc,
            NoIncluye: noInc,
            PlazoDeUso: plazo,
            Tiempo: "Ninguno",
            Tienda: tienda,
            Titulo: titulo,
            Visualizacion: 0,
            Lunes: lunes,
            Martes: martes,
            Miercoles: miercoles,
            Jueves: jueves,
            Viernes: viernes,
            Sabado: sabado,
            Domingo: domingo
        })    

        //Guardar Tag
        item.forEach(item =>{
            const value = db.database().ref("Cupones").child(result.key).child("Tag").push({
                etiqueta:item
            });
        })


        //Guardar Segun campaña
        if(campBelleza === "Si"){
            const camp =  db.database().ref("Cupones").child('Belleza').child(result.key).set({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: result.key,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('Belleza').child(result.key).child("Tag").push({
                    etiqueta:item
                });
            })
        }

        if(campComida === "Si"){
            const camp =  db.database().ref("Cupones").child('Comida').child(result.key).set({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: result.key,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('Comida').child(result.key).child("Tag").push({
                    etiqueta:item
                });
            })
        }

        if(campSalud === "Si"){
            const camp =  db.database().ref("Cupones").child('MejorEnSalud').child(result.key).set({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: result.key,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('MejorEnSalud').child(result.key).child("Tag").push({
                    etiqueta:item
                });
            })
        }

        if(campTodoDolar === "Si"){
            const camp =  db.database().ref("Cupones").child('TodoUnDolar').child(result.key).set({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: result.key,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('TodoUnDolar').child(result.key).child("Tag").push({
                    etiqueta:item
                });
            })
        }


        const id_push2 = db.database().ref("PromocionesSlider").child(result.key).update({
            Id: result.key
        })

        const id_push = db.database().ref("Cupones").child(result.key).update({
            Id: result.key
        })
        
        res.json(id_push);

    })

    //MODIFICAR CUPONES DESTACADOS Y CUPONES
    router.post('/refreshCuponesDestacado', async(req,res) =>{
        const {tag, categoria ,descripcion, detalles, disponibilidad, dispmin, fecha_ven, imagen, imagenSec, imagenTerc,tienda, titulo,
        lunes, martes, miercoles, jueves , viernes, sabado, domingo, campBelleza, campComida, campSalud, campTodoDolar,
        consid, contraind, plazo, ahorro, inc , noInc, idCupon} = req.body;
        const item = JSON.parse(tag);
        
        const result =  db.database().ref("Cupones").child(idCupon).update({
            AhorroOferta: ahorro,
            Categoria: "CuponDestacado",
            CampBelleza: campBelleza,
            CampSalud: campSalud,
            CampDolar: campTodoDolar,
            CampComida: campComida,
            Click: 0,
            Contador: 0,
            Consideraciones: consid,
            Contraindicacion: contraind,
            Descripcion: descripcion, 
            Detalles: detalles,
            Disponibilidad_Estandar: disponibilidad,
            Disponibilidad_Minima: dispmin,
            Fecha_Vencimiento: fecha_ven,
            Id: idCupon,
            Imagen: imagen,
            ImagenSecundaria: imagenSec,
            ImagenTercera: imagenTerc,
            Incluye: inc,
            NoIncluye: noInc,
            PlazoDeUso: plazo,
            Tiempo: "Ninguno",
            Tienda: tienda,
            Titulo: titulo,
            Visualizacion: 0,
            Lunes: lunes,
            Martes: martes,
            Miercoles: miercoles,
            Jueves: jueves,
            Viernes: viernes,
            Sabado: sabado,
            Domingo: domingo
            
        })    

        //Actualizar Tag
        var value_tag = db.database().ref("Cupones").child(idCupon).child("Tag").remove();
        item.forEach(item =>{
            const value = db.database().ref("Cupones").child(idCupon).child("Tag").push({
                etiqueta:item
            });
        })

        //Guardar Segun campaña
        if(campBelleza === "Si"){
            const camp =  db.database().ref("Cupones").child('Belleza').child(idCupon).update({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: result.key,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            var camp_tag = db.database().ref("Cupones").child("Belleza").child(idCupon).child("Tag").remove();
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('Belleza').child(idCupon).child("Tag").push({
                    etiqueta:item
                });
            })
        }

        if(campComida === "Si"){
            const camp =  db.database().ref("Cupones").child('Comida').child(idCupon).update({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: result.key,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            var camp_tag = db.database().ref("Cupones").child("Comida").child(idCupon).child("Tag").remove();
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('Comida').child(idCupon).child("Tag").push({
                    etiqueta:item
                });
            })
        }

        if(campSalud === "Si"){
            const camp =  db.database().ref("Cupones").child('MejorEnSalud').child(idCupon).update({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: result.key,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            var camp_tag = db.database().ref("Cupones").child("MejorEnSalud").child(idCupon).child("Tag").remove();
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('MejorEnSalud').child(idCupon).child("Tag").push({
                    etiqueta:item
                });
            })
        }

        if(campTodoDolar === "Si"){
            const camp =  db.database().ref("Cupones").child('TodoUnDolar').child(idCupon).update({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: result.key,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            var camp_tag = db.database().ref("Cupones").child("TodoUnDolar").child(idCupon).child("Tag").remove();
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('TodoUnDolar').child(idCupon).child("Tag").push({
                    etiqueta:item
                });
            })
        }

        
        res.json(result);

    })

    //Agregar cupones existente a destacado
    router.post('/agregarECuponesDestacado', async(req,res) =>{
        const {id_cupon} = req.body;

        
        const result =  db.database().ref("Cupones").child(id_cupon).update({
            Categoria: 'CuponDestacado',
        })    

        res.json(result);

    })

    //Reemplazar cupones destacado con cupones existente
    router.post('/changeCuponesDestacado', async(req,res) =>{
        const {tag, categoria, descripcion, detalles, disponibilidad, dispmin, fecha_ven, imagen, imagenSec, imagenTerc,tienda, titulo,
        lunes, martes, miercoles, jueves , viernes, sabado, domingo, campBelleza, campComida, campSalud, campTodoDolar,
        consid, contraind, plazo, ahorro, inc , noInc, idCupon} = req.body;
        const item = JSON.parse(tag);
        
        //Actualizar en Cupones de la Semana
        const result2 =  db.database().ref("Cupones").child(idCupon).update({
            AhorroOferta: ahorro,
            Categoria: 'CuponDestacado',
            CampBelleza: campBelleza,
            CampSalud: campSalud,
            CampDolar: campTodoDolar,
            CampComida: campComida,
            Click: 0,
            Contador: 0,
            Consideraciones: consid,
            Contraindicacion: contraind,
            Descripcion: descripcion, 
            Detalles: detalles,
            Disponibilidad_Estandar: disponibilidad,
            Disponibilidad_Minima: dispmin,
            Fecha_Vencimiento: fecha_ven,
            Id: idCupon,
            Imagen: imagen,
            ImagenSecundaria: imagenSec,
            ImagenTercera: imagenTerc,
            Incluye: inc,
            NoIncluye: noInc,
            PlazoDeUso: plazo,
            Tiempo: "Ninguno",
            Tienda: tienda,
            Titulo: titulo,
            Visualizacion: 0,
            Lunes: lunes,
            Martes: martes,
            Miercoles: miercoles,
            Jueves: jueves,
            Viernes: viernes,
            Sabado: sabado,
            Domingo: domingo
        })    

        //Actualizar
        var value_tag = db.database().ref("Cupones").child(idCupon).child("Tag").remove();
        item.forEach(item =>{
            const value2 = db.database().ref("Cupones").child(idCupon).child("Tag").push({
                etiqueta:item
            });
        })

        res.json(result2);
    })



// ////////----////// CUPONES VIP // ////////----//////

    //-Guardar Cupones VIP
    router.post('/addCuponesVip', async(req,res) =>{
        const {tag, categoria,destacado,descripcion, detalles, disponibilidad, dispmin, fecha_ven, imagen, imagenSec, imagenTerc,tienda, titulo,
        lunes, martes, miercoles, jueves , viernes, sabado, domingo, campBelleza, campComida, campSalud, campTodoDolar,
        consid, contraind, plazo, ahorro, inc , noInc} = req.body;
        const item = JSON.parse(tag);
        
        const result =  db.database().ref("Cupones").push({
            AhorroOferta: ahorro,
            Categoria: 'CuponesVip',
            CampBelleza: campBelleza,
            CampSalud: campSalud,
            CampDolar: campTodoDolar,
            CampComida: campComida,
            Click: 0,
            Contador: 0,
            Consideraciones: consid,
            Contraindicacion: contraind,
            Descripcion: descripcion, 
            Detalles: detalles,
            Disponibilidad_Estandar: disponibilidad,
            Disponibilidad_Minima: dispmin,
            Fecha_Vencimiento: fecha_ven,
            Id: 'ninguno',
            Imagen: imagen,
            ImagenSecundaria: imagenSec,
            ImagenTercera: imagenTerc,
            Incluye: inc,
            NoIncluye: noInc,
            PlazoDeUso: plazo,
            Tiempo: "Ninguno",
            Tienda: tienda,
            Titulo: titulo,
            Visualizacion: 0,
            Lunes: lunes,
            Martes: martes,
            Miercoles: miercoles,
            Jueves: jueves,
            Viernes: viernes,
            Sabado: sabado,
            Domingo: domingo
        })    

        //Guardar Tag
        item.forEach(item =>{
            const value = db.database().ref("Cupones").child(result.key).child("Tag").push({
                etiqueta:item
            });
        })


        //Guardar Segun campaña
        if(campBelleza === "Si"){
            const camp =  db.database().ref("Cupones").child('Belleza').child(result.key).set({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: result.key,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('Belleza').child(result.key).child("Tag").push({
                    etiqueta:item
                });
            })
        }

        if(campComida === "Si"){
            const camp =  db.database().ref("Cupones").child('Comida').child(result.key).set({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: result.key,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('Comida').child(result.key).child("Tag").push({
                    etiqueta:item
                });
            })
        }

        if(campSalud === "Si"){
            const camp =  db.database().ref("Cupones").child('MejorEnSalud').child(result.key).set({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: result.key,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('MejorEnSalud').child(result.key).child("Tag").push({
                    etiqueta:item
                });
            })
        }

        if(campTodoDolar === "Si"){
            const camp =  db.database().ref("Cupones").child('TodoUnDolar').child(result.key).set({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: result.key,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('TodoUnDolar').child(result.key).child("Tag").push({
                    etiqueta:item
                });
            })
        }


        const id_push2 = db.database().ref("PromocionesSlider").child(result.key).update({
            Id: result.key
        })

        const id_push = db.database().ref("Cupones").child(result.key).update({
            Id: result.key
        })
        
        res.json(id_push);

    })

    //MODIFICAR CUPONES VIP Y CUPONES
    router.post('/refreshCuponesVip', async(req,res) =>{
        const {tag, categoria ,descripcion, detalles, disponibilidad, dispmin, fecha_ven, imagen, imagenSec, imagenTerc,tienda, titulo,
        lunes, martes, miercoles, jueves , viernes, sabado, domingo, campBelleza, campComida, campSalud, campTodoDolar,
        consid, contraind, plazo, ahorro, inc , noInc, idCupon} = req.body;
        const item = JSON.parse(tag);
        
        const result =  db.database().ref("Cupones").child(idCupon).update({
            AhorroOferta: ahorro,
            Categoria: "CuponesVip",
            CampBelleza: campBelleza,
            CampSalud: campSalud,
            CampDolar: campTodoDolar,
            CampComida: campComida,
            Click: 0,
            Contador: 0,
            Consideraciones: consid,
            Contraindicacion: contraind,
            Descripcion: descripcion, 
            Detalles: detalles,
            Disponibilidad_Estandar: disponibilidad,
            Disponibilidad_Minima: dispmin,
            Fecha_Vencimiento: fecha_ven,
            Id: idCupon,
            Imagen: imagen,
            ImagenSecundaria: imagenSec,
            ImagenTercera: imagenTerc,
            Incluye: inc,
            NoIncluye: noInc,
            PlazoDeUso: plazo,
            Tiempo: "Ninguno",
            Tienda: tienda,
            Titulo: titulo,
            Visualizacion: 0,
            Lunes: lunes,
            Martes: martes,
            Miercoles: miercoles,
            Jueves: jueves,
            Viernes: viernes,
            Sabado: sabado,
            Domingo: domingo
            
        })    

        //Actualizar Tag
        var value_tag = db.database().ref("Cupones").child(idCupon).child("Tag").remove();
        item.forEach(item =>{
            const value = db.database().ref("Cupones").child(idCupon).child("Tag").push({
                etiqueta:item
            });
        })

        //Guardar Segun campaña
        if(campBelleza === "Si"){
            const camp =  db.database().ref("Cupones").child('Belleza').child(idCupon).update({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: result.key,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            var camp_tag = db.database().ref("Cupones").child("Belleza").child(idCupon).child("Tag").remove();
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('Belleza').child(idCupon).child("Tag").push({
                    etiqueta:item
                });
            })
        }

        if(campComida === "Si"){
            const camp =  db.database().ref("Cupones").child('Comida').child(idCupon).update({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: result.key,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            var camp_tag = db.database().ref("Cupones").child("Comida").child(idCupon).child("Tag").remove();
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('Comida').child(idCupon).child("Tag").push({
                    etiqueta:item
                });
            })
        }

        if(campSalud === "Si"){
            const camp =  db.database().ref("Cupones").child('MejorEnSalud').child(idCupon).update({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: result.key,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            var camp_tag = db.database().ref("Cupones").child("MejorEnSalud").child(idCupon).child("Tag").remove();
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('MejorEnSalud').child(idCupon).child("Tag").push({
                    etiqueta:item
                });
            })
        }

        if(campTodoDolar === "Si"){
            const camp =  db.database().ref("Cupones").child('TodoUnDolar').child(idCupon).update({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: result.key,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            var camp_tag = db.database().ref("Cupones").child("TodoUnDolar").child(idCupon).child("Tag").remove();
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('TodoUnDolar').child(idCupon).child("Tag").push({
                    etiqueta:item
                });
            })
        }

        
        res.json(result);

    })

    //Agregar cupones existente a destacado
    router.post('/agregarECuponesVip', async(req,res) =>{
        const {id_cupon} = req.body;

        
        const result =  db.database().ref("Cupones").child(id_cupon).update({
            Categoria: 'CuponesVip',
        })    

        res.json(result);

    })

    //Reemplazar cupones destacado con cupones existente
    router.post('/changeCuponesVip', async(req,res) =>{
        const {tag, categoria, descripcion, detalles, disponibilidad, dispmin, fecha_ven, imagen, imagenSec, imagenTerc,tienda, titulo,
        lunes, martes, miercoles, jueves , viernes, sabado, domingo, campBelleza, campComida, campSalud, campTodoDolar,
        consid, contraind, plazo, ahorro, inc , noInc, idCupon} = req.body;
        const item = JSON.parse(tag);
        
        //Actualizar en Cupones de la Semana
        const result2 =  db.database().ref("Cupones").child(idCupon).update({
            AhorroOferta: ahorro,
            Categoria: 'CuponesVip',
            CampBelleza: campBelleza,
            CampSalud: campSalud,
            CampDolar: campTodoDolar,
            CampComida: campComida,
            Click: 0,
            Contador: 0,
            Consideraciones: consid,
            Contraindicacion: contraind,
            Descripcion: descripcion, 
            Detalles: detalles,
            Disponibilidad_Estandar: disponibilidad,
            Disponibilidad_Minima: dispmin,
            Fecha_Vencimiento: fecha_ven,
            Id: idCupon,
            Imagen: imagen,
            ImagenSecundaria: imagenSec,
            ImagenTercera: imagenTerc,
            Incluye: inc,
            NoIncluye: noInc,
            PlazoDeUso: plazo,
            Tiempo: "Ninguno",
            Tienda: tienda,
            Titulo: titulo,
            Visualizacion: 0,
            Lunes: lunes,
            Martes: martes,
            Miercoles: miercoles,
            Jueves: jueves,
            Viernes: viernes,
            Sabado: sabado,
            Domingo: domingo
        })    

        //Actualizar
        var value_tag = db.database().ref("Cupones").child(idCupon).child("Tag").remove();
        item.forEach(item =>{
            const value2 = db.database().ref("Cupones").child(idCupon).child("Tag").push({
                etiqueta:item
            });
        })

        res.json(result2);
    })

    

// ////////----////// NUEVO CUPON // ////////----//////    
    router.post('/addCupones', async(req,res) =>{
        const {tag, categoria, descripcion, detalles, disponibilidad, dispmin, fecha_ven, imagen, imagenSec, imagenTerc,tienda, titulo,
        lunes, martes, miercoles, jueves , viernes, sabado, domingo, campBelleza, campComida, campSalud, campTodoDolar,
        consid, contraind, plazo, ahorro, inc , noInc} = req.body;
        const item = JSON.parse(tag);
        
        const result =  db.database().ref("Cupones").push({
            AhorroOferta: ahorro,
            Categoria: categoria,
            CampBelleza: campBelleza,
            CampSalud: campSalud,
            CampDolar: campTodoDolar,
            CampComida: campComida,
            Click: 0,
            Contador: 0,
            Consideraciones: consid,
            Contraindicacion: contraind,
            Descripcion: descripcion, 
            Detalles: detalles,
            Disponibilidad_Estandar: disponibilidad,
            Disponibilidad_Minima: dispmin,
            Fecha_Vencimiento: fecha_ven,
            Id: 'ninguno',
            Imagen: imagen,
            ImagenSecundaria: imagenSec,
            ImagenTercera: imagenTerc,
            Incluye: inc,
            NoIncluye: noInc,
            PlazoDeUso: plazo,
            Tiempo: "Ninguno",
            Tienda: tienda,
            Titulo: titulo,
            Visualizacion: 0,
            Lunes: lunes,
            Martes: martes,
            Miercoles: miercoles,
            Jueves: jueves,
            Viernes: viernes,
            Sabado: sabado,
            Domingo: domingo
        })    

        //Guardar Tag
        item.forEach(item =>{
            const value = db.database().ref("Cupones").child(result.key).child("Tag").push({
                etiqueta:item
            });
        })


        //Guardar Segun campaña
        if(campBelleza === "Si"){
            const camp =  db.database().ref("Cupones").child('Belleza').child(result.key).set({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: result.key,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('Belleza').child(result.key).child("Tag").push({
                    etiqueta:item
                });
            })
        }

        if(campComida === "Si"){
            const camp =  db.database().ref("Cupones").child('Comida').child(result.key).set({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: result.key,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('Comida').child(result.key).child("Tag").push({
                    etiqueta:item
                });
            })
        }

        if(campSalud === "Si"){
            const camp =  db.database().ref("Cupones").child('MejorEnSalud').child(result.key).set({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: result.key,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('MejorEnSalud').child(result.key).child("Tag").push({
                    etiqueta:item
                });
            })
        }

        if(campTodoDolar === "Si"){
            const camp =  db.database().ref("Cupones").child('TodoUnDolar').child(result.key).set({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: result.key,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('TodoUnDolar').child(result.key).child("Tag").push({
                    etiqueta:item
                });
            })
        }


        const id_push2 = db.database().ref("PromocionesSlider").child(result.key).update({
            Id: result.key
        })

        const id_push = db.database().ref("Cupones").child(result.key).update({
            Id: result.key
        })
        
        res.json(id_push);

    })

    //MODIFICAR CUPONES DESTACADOS Y CUPONES
    router.post('/updateCupones', async(req,res) =>{
        const {tag, categoria ,descripcion, detalles, disponibilidad, dispmin, fecha_ven, imagen, imagenSec, imagenTerc,tienda, titulo,
        lunes, martes, miercoles, jueves , viernes, sabado, domingo, campBelleza, campComida, campSalud, campTodoDolar,
        consid, contraind, plazo, ahorro, inc , noInc, idCupon} = req.body;
        const item = JSON.parse(tag);
        
        const result =  db.database().ref("Cupones").child(idCupon).update({
            AhorroOferta: ahorro,
            Categoria: categoria,
            CampBelleza: campBelleza,
            CampSalud: campSalud,
            CampDolar: campTodoDolar,
            CampComida: campComida,
            Click: 0,
            Contador: 0,
            Consideraciones: consid,
            Contraindicacion: contraind,
            Descripcion: descripcion, 
            Detalles: detalles,
            Disponibilidad_Estandar: disponibilidad,
            Disponibilidad_Minima: dispmin,
            Fecha_Vencimiento: fecha_ven,
            Id: idCupon,
            Imagen: imagen,
            ImagenSecundaria: imagenSec,
            ImagenTercera: imagenTerc,
            Incluye: inc,
            NoIncluye: noInc,
            PlazoDeUso: plazo,
            Tiempo: "Ninguno",
            Tienda: tienda,
            Titulo: titulo,
            Visualizacion: 0,
            Lunes: lunes,
            Martes: martes,
            Miercoles: miercoles,
            Jueves: jueves,
            Viernes: viernes,
            Sabado: sabado,
            Domingo: domingo
            
        })    

        //Actualizar Tag
        var value_tag = db.database().ref("Cupones").child(idCupon).child("Tag").remove();
        item.forEach(item =>{
            const value = db.database().ref("Cupones").child(idCupon).child("Tag").push({
                etiqueta:item
            });
        })

        //Guardar Segun campaña
        if(campBelleza === "Si"){
            const camp =  db.database().ref("Cupones").child('Belleza').child(idCupon).update({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: idCupon,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            var camp_tag = db.database().ref("Cupones").child("Belleza").child(idCupon).child("Tag").remove();
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('Belleza').child(idCupon).child("Tag").push({
                    etiqueta:item
                });
            })
        }

        if(campComida === "Si"){
            const camp =  db.database().ref("Cupones").child('Comida').child(idCupon).update({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: idCupon,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            var camp_tag = db.database().ref("Cupones").child("Comida").child(idCupon).child("Tag").remove();
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('Comida').child(idCupon).child("Tag").push({
                    etiqueta:item
                });
            })
        }

        if(campSalud === "Si"){
            const camp =  db.database().ref("Cupones").child('MejorEnSalud').child(idCupon).update({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: idCupon,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            var camp_tag = db.database().ref("Cupones").child("MejorEnSalud").child(idCupon).child("Tag").remove();
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('MejorEnSalud').child(idCupon).child("Tag").push({
                    etiqueta:item
                });
            })
        }

        if(campTodoDolar === "Si"){
            const camp =  db.database().ref("Cupones").child('TodoUnDolar').child(idCupon).update({
                AhorroOferta: ahorro,
                Categoria: categoria,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: idCupon,
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
        
            //Guardar Tag
            var camp_tag = db.database().ref("Cupones").child("TodoUnDolar").child(idCupon).child("Tag").remove();
            item.forEach(item =>{
                const tagCamp = db.database().ref("Cupones").child('TodoUnDolar').child(idCupon).child("Tag").push({
                    etiqueta:item
                });
            })
        }

        
        res.json(result);

    })




// ////////----////// TIENDAS // ////////----//////

    //Registrar Tienda
    router.post('/registerTienda', async(req,res) => {
        const {nombre, detalles, categoria, imagenLogo, imagenRef, direccion, latitud, longitud} = req.body;

        const result = db.database().ref("Tiendas").child(nombre).set({
            Categoria:categoria,
            Detalles: detalles,
            Direccion: direccion,
            FotoReferencial: imagenRef,
            ImagenLogo: imagenLogo,
            Latitud:latitud,
            Longitud:longitud,
            Nombre:nombre
        })

        res.json(result);
    })

    //Modificar Tienda
    router.post('/updateTienda', async(req,res) => {
        const {nombre, detalles, categoria, imagenLogo, imagenRef, direccion, latitud, longitud} = req.body;

        const result = db.database().ref("Tiendas").child(nombre).update({
            Categoria:categoria,
            Detalles: detalles,
            Direccion: direccion,
            FotoReferencial: imagenRef,
            ImagenLogo: imagenLogo,
            Latitud:latitud,
            Longitud:longitud,
            Nombre:nombre
        })

        res.json(result);
    })




// ////////----////// CUPONES FINALIZADOS // ////////----//////

    //Obtener cupones finalizados
    router.get('/finishCupones', async(req,res) => {
        const result = await db.database().ref("Cupones").orderByChild("Tiempo").equalTo("Finalizado").once('value', function(snapshoot){
            res.send(snapshoot.val());
        })
    })

    router.get('/finishCuponesDestacado', async(req,res) => {
        const result = await db.database().ref("PromocionesSlider").orderByChild("Tiempo").equalTo("Finalizado").once('value', function(snapshoot){
            res.send(snapshoot.val());
        })
    })

    router.get('/finishCuponesBelleza', async(req,res) => {
        const result = await db.database().ref("Cupones").child("Belleza").orderByChild("Tiempo").equalTo("Finalizado").once('value', function(snapshoot){
            res.send(snapshoot.val());
        })
    })

    router.get('/finishCuponesComida', async(req,res) => {
        const result = await db.database().ref("Cupones").child("Comida").orderByChild("Tiempo").equalTo("Finalizado").once('value', function(snapshoot){
            res.send(snapshoot.val());
        })
    })

    router.get('/finishCuponesSalud', async(req,res) => {
        const result = await db.database().ref("Cupones").child("MejorEnSalud").orderByChild("Tiempo").equalTo("Finalizado").once('value', function(snapshoot){
            res.send(snapshoot.val());
        })
    })

    router.get('/finishCuponesDolar', async(req,res) => {
        const result = await db.database().ref("Cupones").child("TodoUnDolar").orderByChild("Tiempo").equalTo("Finalizado").once('value', function(snapshoot){
            res.send(snapshoot.val());
        })
    })
    

    router.post('/updateCuponesFinalizado', async(req,res) => {
        const {idCupon,stockMin, stockMax, fecha_ven} = req.body;
        const result = await db.database().ref("Cupones").child(idCupon).update({
            'Disponibilidad_Estandar': parseInt(stockMax),
            'Fecha_Vencimiento': fecha_ven,
            'Tiempo': 'Ninguno'
        })

        res.json(result);
    })

    router.post('/updateCuponSemanaFinalizado', async(req,res) => {
        const {idCupon,stockMin, stockMax, fecha_ven} = req.body;
        const result = await db.database().ref("PromocionesSlider").child(idCupon).update({
            'Disponibilidad_Estandar': parseInt(stockMax),
            'Fecha_Vencimiento': fecha_ven,
            'Tiempo': 'Ninguno'
        })
        res.json(result);
    })

    router.post('/updateBellezaFinalizado', async(req,res) => {
        const {idCupon,stockMin, stockMax, fecha_ven} = req.body;
        const result = await db.database().ref("Cupones").child("Belleza").child(idCupon).update({
            'Disponibilidad_Estandar': parseInt(stockMax),
            'Fecha_Vencimiento': fecha_ven,
            'Tiempo': 'Ninguno'
        })

        res.json(result);
    })

    router.post('/updateMejorEnSaludFinalizado', async(req,res) => {
        const {idCupon,stockMin, stockMax, fecha_ven} = req.body;
        const result = await db.database().ref("Cupones").child("MejorEnSalud").child(idCupon).update({
            'Disponibilidad_Estandar': parseInt(stockMax),
            'Fecha_Vencimiento': fecha_ven,
            'Tiempo': 'Ninguno'
        })

        res.json(result);
    })

    router.post('/updateDolarFinalizado', async(req,res) => {
        const {idCupon,stockMin, stockMax, fecha_ven} = req.body;
        const result = await db.database().ref("Cupones").child("TodoUnDolar").child(idCupon).update({
            'Disponibilidad_Estandar': parseInt(stockMax),
            'Fecha_Vencimiento': fecha_ven,
            'Tiempo': 'Ninguno'
        })

        res.json(result);
    })

    router.post('/updateComidaFinalizado', async(req,res) => {
        const {idCupon,stockMin, stockMax, fecha_ven} = req.body;
        const result = await db.database().ref("Cupones").child("Comida").child(idCupon).update({
            'Disponibilidad_Estandar': parseInt(stockMax),
            'Fecha_Vencimiento': fecha_ven,
            'Tiempo': 'Ninguno'
        })

        res.json(result);
    })


    


    //Obtener datos del cupon
    router.get('/getDataTienda/:tienda', async(req,res) => {
        const {tienda} = req.params;
        var datos = [];
        const value = db.database().ref('Users').orderByChild('Tienda').equalTo(tienda).once('value', function(snap){
            snap.forEach(function(snapshoot){
                datos.push(snapshoot.val().telefono, snapshoot.val().CorreoElectronico,snapshoot.val().Nombre);
            })
            res.send(datos);
        })
    })

    router.get('/getTiendaData/:tienda', async(req,res) => {
        const {tienda} = req.params;
        var datos = [];
        const value = db.database().ref('Users').orderByChild('Tienda').equalTo(tienda).once('value', function(snap){
            res.send(snap.val());
        })
    })



// ////////----////// REPORTE DE PAGOS // ////////----//////

    //Obtener pagos por validar
    router.get('/getPagosReportados', async(req,res) => {
        const result = await db.database().ref("ReporteDePagos").child("Cupones").orderByChild("Status").equalTo("Por Validar").once('value', function(snapshoot){
            res.send(snapshoot.val());
        })
    })

    //Obtener pagos por validar
    router.get('/getPagosReportadosWha', async(req,res) => {
        const result = await db.database().ref("ReporteDePagos").child("Cupones").child("Whatsapp").orderByChild("Status").equalTo("Por Validar").once('value', function(snapshoot){
            res.send(snapshoot.val());
        })
    })

    function Pagos(idCupon, nombreUser, fechaPago, tipoPago) {
        this.IdCupon= idCupon;
        this.NombreUser = nombreUser;
        this.FechaPago = fechaPago;
        this.TipoPago = tipoPago;
    }


    //Detalles del pago
    router.get('/getPagosDetalles/:id', async(req,res) => {
        const {id} = req.params;
        var value = [];

        const result = await db.database().ref("ReporteDePagos").child("Cupones").child(id).once('value', function(snapshoot){
                snapshoot.child("DatosDelPago").forEach(function(snap){
                    value = new GetPagos (snapshoot.val().Fecha_Pago, snapshoot.val().Email, snapshoot.val().Nombre, snapshoot.val().Telefono,
                    snapshoot.val().Id_user, snapshoot.val().Id_Pago,
                    snapshoot.val().TipoDePago, snap.val().TotalDolares, snap.val().TotalBolivares, 
                    snap.val().DatosDelPago, snap.val().ArchivoComprobante);
                })
            res.send(value);
        })
    })

    //Detalles de pago whatsapp
    router.get('/getPagosDetallesWha/:id', async(req,res) => {
        const {id} = req.params;
        var value = [];

        const result = await db.database().ref("ReporteDePagos").child("Cupones").child("Whatsapp").child(id).once('value', function(snapshoot){
                snapshoot.child("DatosDelPago").forEach(function(snap){
                    value = new GetPagos (snapshoot.val().Fecha_Pago, snapshoot.val().Email, snapshoot.val().Nombre, snapshoot.val().Telefono,
                    snapshoot.val().Id_user, snapshoot.val().Id_Pago,
                    snapshoot.val().TipoDePago, snap.val().TotalDolares, snap.val().TotalBolivares, 
                    snap.val().DatosDelPago, snap.val().ArchivoComprobante);
                })
            res.send(value);
        })
    })

    //Obtener cupones comprados
    router.get('/getPagosCupones/:id', async(req,res) =>{
        const {id} = req.params;
        
        const result = await db.database().ref("ReporteDePagos").child("Cupones").child(id).child("Cupones").once('value', function(snapshoot){
            res.send(snapshoot.val());
        })
    })

    //Obtener cupones comprados whatsapp
    router.get('/getPagosCuponesWha/:id', async(req,res) =>{
        const {id} = req.params;
        
        const result = await db.database().ref("ReporteDePagos").child("Cupones").child("Whatsapp").child(id).child("Cupones").once('value', function(snapshoot){
            res.send(snapshoot.val());
        })
    })

    function GetPagos(fechaPago ,email,nombre, telefono ,idUser, idPago ,metodoPago, totalDolares, totalBsS, datoPago, archivo) {
        
        this.FechaPago = fechaPago,
        this.Email = email,
        this.Nombre = nombre,
        this.Phone = telefono,
        this.IdUser = idUser,
        this.IdPago = idPago,
        this.MetodoDePago = metodoPago,
        this.TotalDolares = totalDolares,
        this.TotalBsS = totalBsS,
        this.DatoPago = datoPago,
        this.Archivo = archivo
    }

    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xx2xxyxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    //Validar Pago
    router.post('/validatePago', async(req,res) => {
        const {id,listCupones, instagram, telefono, direccion} = req.body;
        var cupones = JSON.parse(listCupones);
        var codigosEmail = [];
        cupones.forEach(item => {
            var cantidad = parseInt(item.Cantidad);
            codigosEmail.push(item.Nombre + ' : ')
            for (var i=0; i < cantidad ; i++){
                var value = generateUUID();
                if (cantidad === 1){
                    codigosEmail.push(value + '. <br/> Datos de Contacto: <br/> Instagram:'+instagram + '<br/> Telefono: '+telefono +
                    ' <br/> Direccion: '+direccion + '<br/><br/>')
                }
                else if(i >= (cantidad-1)){
                    codigosEmail.push(value + '.<br/> Datos de Contacto: <br/> Instagram:'+instagram + '<br/> Telefono: '+telefono +
                    ' <br/> Direccion: '+direccion + '.<br/><br/>')
                }
                else if (cantidad > 1 && i <= (cantidad-1)){
                    codigosEmail.push(value +  ', ')
                }
                const result = db.database().ref("ReporteDePagos").child("Cupones").child(id).child("Cupones").child(item.IdCuponPago).child("CodigoCupones").push({
                    Nombre_Oferta: item.Nombre,
                    Codigo: value,
                    Status: "No utilizado"
                })
            }
        })

        const value = await db.database().ref("ReporteDePagos").child("Cupones").child(id).update({
            'Status': 'Validado'
        })

        res.send(codigosEmail);
        
    })

        //Validar Pago
        router.post('/validatePagoWhatsapp', async(req,res) => {
            const {id,listCupones, tipoPago, DatosDelPago, TotalDolares, TotalBolivares, archivo} = req.body;
            var cupones = JSON.parse(listCupones);
            var codigosEmail = [];
            cupones.forEach(item => {
                var cantidad = parseInt(item.Cantidad);
                codigosEmail.push(item.Nombre + ' : ')
                for (var i=0; i < cantidad ; i++){
                    var value = generateUUID();
                    if (cantidad === 1){
                        codigosEmail.push(value + '.')
                    }
                    else if(i >= (cantidad-1)){
                        codigosEmail.push(value + '.')
                    }
                    else if (cantidad > 1 && i <= (cantidad-1)){
                        codigosEmail.push(value + ', ')
                    }
                    const result = db.database().ref("ReporteDePagos").child("Cupones").child("Whatsapp").child(id).child("Cupones").child(item.IdCuponPago)
                    .child("CodigoCupones").push({
                        Nombre_Oferta: item.Nombre,
                        Codigo: value,
                        Status: "No utilizado"
                    })
                }
            })
    
            const value = await db.database().ref("ReporteDePagos").child("Cupones").child("Whatsapp").child(id).update({
                Status: 'Validado',
                TipoDePago: tipoPago
            })

            const resultPago = await db.database().ref("ReporteDePagos").child("Cupones").child("Whatsapp").child(id).child("DatosDelPago").set({});

            const pago= await db.database().ref("ReporteDePagos").child("Cupones").child("Whatsapp").child(id).child("DatosDelPago").push({
                ArchivoComprobante: archivo,
                DatosDelPago: DatosDelPago, 
                TotalBolivares: TotalBolivares,
                TotalDolares: TotalDolares,
            });
    
            res.send(codigosEmail);
            
        })


    router.post('/contadorCupon', async(req,res) => {
        const {id, suma} = req.body;
        const update = db.database().ref("Cupones").child(id).update({
            Contador: suma
        })
        res.json(update);
    })

    //Validar Pago para el Usuario
    router.post('/validatePagoUser/:idUser/:idPago', async(req,res) => {
        const {idUser, idPago} = req.params;

        const result = await db.database().ref("Users").child(idUser).child("PagoCupones").child(idPago).update({
            Status:"Validado"
        })
        res.json(result);
    })

    router.post('/deniedPago/:id', async(req,res)=>{
        const {id} = req.params;
        const result = await db.database().ref("ReporteDePagos").child("Cupones").child(id).update({
            Status: "Rechazado"
        })
        res.json(result);
    })

    router.post('/deniedPagoWhatsapp/:id', async(req,res)=>{
        const {id} = req.params;
        const result = await db.database().ref("ReporteDePagos").child("Cupones").child("Whatsapp").child(id).update({
            Status: "No se realizo la compra"
        })
        res.json(result);
    })

    router.post('/deniedePagoUser/:idUser/:idPago', async(req,res) => {
        const {idUser, idPago} = req.params;

        const result = await db.database().ref("Users").child(idUser).child("PagoCupones").child(idPago).update({
            Status:"Rechazado"
        })
        res.json(result);
    })
module.exports = router;


// ////////----////// SUSCRIPCIONES // ////////----//////
    //Obtener solicitud de publicaciones
    router.get("/solicitudPublicacion", async(req,res) => {
        const result= await db.database().ref("Suscripciones").child("SolicitudesPublicaciones").orderByChild('Status').equalTo('Por Validar').once("value", function(snap){
            res.send(snap.val());
        })
    })

    //Obtener solicitud de cancelacion
    router.get("/solicitudCancelPublicacion", async(req,res) => {
        const result= await db.database().ref("Suscripciones").child("SolicitudDeCancelacionPublicacion").orderByChild('Status').equalTo('En espera').once("value", function(snap){
            res.send(snap.val());
        })
    })

    router.post('/updateSolicitudCancelacion/:id', async(req,res) => {
        const {id} = req.params;
        const result= await db.database().ref("Suscripciones").child("SolicitudDeCancelacionPublicacion").child(id).update({
            Status: 'Validado'
        })
        res.json(result);
    })

    //Detalle de la Solicitud
    router.get("/getDetallesCancelPublicacion/:id", async(req,res) => {
        const {id} = req.params;
        const result= await db.database().ref("Suscripciones").child("SolicitudDeCancelacionPublicacion").child(id).once("value", function(snap){
            res.send(snap.val());
        })
    })
    //Detalles de la publicacion
    router.get("/getDetallesPublicacion/:id", async(req,res) => {
        const {id} = req.params;
        const result = await db.database().ref("Suscripciones").child("SolicitudesPublicaciones").child(id).once("value", function(snap){
            res.send(snap.val());
        })
    })

    //Detalles del comercio
    router.get("/getDetallesComercio/:id", async(req,res) => {
        const {id} = req.params;
        const result = await db.database().ref("Users").child(id).once("value", function(snap){
            res.send(snap.val());
        })
    })

    //PublicacionAceptada
    router.post("/saveAcceptPublicacion", async(req,res) => {
        const {tag, categoria, descripcion, detalles, disponibilidad, dispmin, fecha_ven, imagen, imagenSec, imagenTerc,tienda, titulo,
            lunes, martes, miercoles, jueves , viernes, sabado, domingo, campBelleza, campComida, campSalud, campTodoDolar,
            consid, contraind, plazo, ahorro, inc , noInc} = req.body;
            const item = JSON.parse(tag);
            
            const result =  db.database().ref("Cupones").push({
                AhorroOferta: ahorro,
                Categoria: categoria,
                CampBelleza: campBelleza,
                CampSalud: campSalud,
                CampDolar: campTodoDolar,
                CampComida: campComida,
                Click: 0,
                Contador: 0,
                Consideraciones: consid,
                Contraindicacion: contraind,
                Descripcion: descripcion, 
                Detalles: detalles,
                Disponibilidad_Estandar: disponibilidad,
                Disponibilidad_Minima: dispmin,
                Fecha_Vencimiento: fecha_ven,
                Id: 'ninguno',
                Imagen: imagen,
                ImagenSecundaria: imagenSec,
                ImagenTercera: imagenTerc,
                Incluye: inc,
                NoIncluye: noInc,
                PlazoDeUso: plazo,
                Tiempo: "Ninguno",
                Tienda: tienda,
                Titulo: titulo,
                Visualizacion: 0,
                Lunes: lunes,
                Martes: martes,
                Miercoles: miercoles,
                Jueves: jueves,
                Viernes: viernes,
                Sabado: sabado,
                Domingo: domingo
            })    
    
            //Guardar Tag
            item.forEach(item =>{
                const value = db.database().ref("Cupones").child(result.key).child("Tag").push({
                    etiqueta:item
                });
            })
    
    
            //Guardar Segun campaña
            if(campBelleza === "Si"){
                const camp =  db.database().ref("Cupones").child('Belleza').child(result.key).set({
                    AhorroOferta: ahorro,
                    Categoria: categoria,
                    Click: 0,
                    Contador: 0,
                    Consideraciones: consid,
                    Contraindicacion: contraind,
                    Descripcion: descripcion, 
                    Detalles: detalles,
                    Disponibilidad_Estandar: disponibilidad,
                    Disponibilidad_Minima: dispmin,
                    Fecha_Vencimiento: fecha_ven,
                    Id: result.key,
                    Imagen: imagen,
                    ImagenSecundaria: imagenSec,
                    ImagenTercera: imagenTerc,
                    Incluye: inc,
                    NoIncluye: noInc,
                    PlazoDeUso: plazo,
                    Tiempo: "Ninguno",
                    Tienda: tienda,
                    Titulo: titulo,
                    Visualizacion: 0,
                    Lunes: lunes,
                    Martes: martes,
                    Miercoles: miercoles,
                    Jueves: jueves,
                    Viernes: viernes,
                    Sabado: sabado,
                    Domingo: domingo
                })    
            
                //Guardar Tag
                item.forEach(item =>{
                    const tagCamp = db.database().ref("Cupones").child('Belleza').child(result.key).child("Tag").push({
                        etiqueta:item
                    });
                })
            }
    
            if(campComida === "Si"){
                const camp =  db.database().ref("Cupones").child('Comida').child(result.key).set({
                    AhorroOferta: ahorro,
                    Categoria: categoria,
                    Click: 0,
                    Contador: 0,
                    Consideraciones: consid,
                    Contraindicacion: contraind,
                    Descripcion: descripcion, 
                    Detalles: detalles,
                    Disponibilidad_Estandar: disponibilidad,
                    Disponibilidad_Minima: dispmin,
                    Fecha_Vencimiento: fecha_ven,
                    Id: result.key,
                    Imagen: imagen,
                    ImagenSecundaria: imagenSec,
                    ImagenTercera: imagenTerc,
                    Incluye: inc,
                    NoIncluye: noInc,
                    PlazoDeUso: plazo,
                    Tiempo: "Ninguno",
                    Tienda: tienda,
                    Titulo: titulo,
                    Visualizacion: 0,
                    Lunes: lunes,
                    Martes: martes,
                    Miercoles: miercoles,
                    Jueves: jueves,
                    Viernes: viernes,
                    Sabado: sabado,
                    Domingo: domingo
                })    
            
                //Guardar Tag
                item.forEach(item =>{
                    const tagCamp = db.database().ref("Cupones").child('Comida').child(result.key).child("Tag").push({
                        etiqueta:item
                    });
                })
            }
    
            if(campSalud === "Si"){
                const camp =  db.database().ref("Cupones").child('MejorEnSalud').child(result.key).set({
                    AhorroOferta: ahorro,
                    Categoria: categoria,
                    Click: 0,
                    Contador: 0,
                    Consideraciones: consid,
                    Contraindicacion: contraind,
                    Descripcion: descripcion, 
                    Detalles: detalles,
                    Disponibilidad_Estandar: disponibilidad,
                    Disponibilidad_Minima: dispmin,
                    Fecha_Vencimiento: fecha_ven,
                    Id: result.key,
                    Imagen: imagen,
                    ImagenSecundaria: imagenSec,
                    ImagenTercera: imagenTerc,
                    Incluye: inc,
                    NoIncluye: noInc,
                    PlazoDeUso: plazo,
                    Tiempo: "Ninguno",
                    Tienda: tienda,
                    Titulo: titulo,
                    Visualizacion: 0,
                    Lunes: lunes,
                    Martes: martes,
                    Miercoles: miercoles,
                    Jueves: jueves,
                    Viernes: viernes,
                    Sabado: sabado,
                    Domingo: domingo
                })    
            
                //Guardar Tag
                item.forEach(item =>{
                    const tagCamp = db.database().ref("Cupones").child('MejorEnSalud').child(result.key).child("Tag").push({
                        etiqueta:item
                    });
                })
            }
    
            if(campTodoDolar === "Si"){
                const camp =  db.database().ref("Cupones").child('TodoUnDolar').child(result.key).set({
                    AhorroOferta: ahorro,
                    Categoria: categoria,
                    Click: 0,
                    Contador: 0,
                    Consideraciones: consid,
                    Contraindicacion: contraind,
                    Descripcion: descripcion, 
                    Detalles: detalles,
                    Disponibilidad_Estandar: disponibilidad,
                    Disponibilidad_Minima: dispmin,
                    Fecha_Vencimiento: fecha_ven,
                    Id: result.key,
                    Imagen: imagen,
                    ImagenSecundaria: imagenSec,
                    ImagenTercera: imagenTerc,
                    Incluye: inc,
                    NoIncluye: noInc,
                    PlazoDeUso: plazo,
                    Tiempo: "Ninguno",
                    Tienda: tienda,
                    Titulo: titulo,
                    Visualizacion: 0,
                    Lunes: lunes,
                    Martes: martes,
                    Miercoles: miercoles,
                    Jueves: jueves,
                    Viernes: viernes,
                    Sabado: sabado,
                    Domingo: domingo
                })    
            
                //Guardar Tag
                item.forEach(item =>{
                    const tagCamp = db.database().ref("Cupones").child('TodoUnDolar').child(result.key).child("Tag").push({
                        etiqueta:item
                    });
                })
            }
    
            const id_push = db.database().ref("Cupones").child(result.key).update({
                Id: result.key
            })
            
            res.send(result.key);
    })

    //Validar en la publicacion
    router.post('/validatePost/:id/:idUser/:idCupon', async(req,res) => {
        const {id, idUser, idCupon} = req.params;
        const result = db.database().ref("Suscripciones").child("SolicitudesPublicaciones").child(id).update({
            Status: 'Validado'
        })

        const value = await db.database().ref("Users").child(idUser).child('Publicaciones').orderByChild('id_Publicacion').equalTo(id).on('value', function(snap){
            snap.forEach(function(childSnapshot) {
                var key = childSnapshot.key;
                const update = db.database().ref("Users").child(idUser).child("Publicaciones").child(key).update({
                    Status: 'Validado',
                    Id_cupon: idCupon
                })
            
            })
        })

        res.json(value);
    })

    //Denegar publicacion
    router.post('/deniedPost', async(req,res) => {
        const {id, idUser, comentario} = req.body;
        const result = db.database().ref("Suscripciones").child("SolicitudesPublicaciones").child(id).update({
            Status: 'Rechazado',
            Comentario: comentario
        })

        const value = await db.database().ref("Users").child(idUser).child('Publicaciones').orderByChild('id_Publicacion').equalTo(id).on('value', function(snap){
            snap.forEach(function(childSnapshot) {
                var key = childSnapshot.key;
                const update = db.database().ref("Users").child(idUser).child("Publicaciones").child(key).update({
                    Status: 'Rechazado'
                })
            
            })
        })

        res.json(value);
    })

    //Lista de Afiliados
    
    router.get('/listAfiliados', async(req,res) => {
        var value = [];
        const result = await db.database().ref("Users").orderByChild("Rol").equalTo("Suscripcion").once('value', function(snap){
            snap.forEach(function(snapshoot){
                if(snapshoot.val().Publicaciones === 0){
                    value.push({nombre: snapshoot.val().Nombre, tienda: snapshoot.val().Tienda, activo: "Inactivo"});
                }
                else{
                    value.push({nombre: snapshoot.val().Nombre, tienda: snapshoot.val().Tienda, activo: "Activo"});
                }
                

            })
            res.send(value);
        })
        
    })

    router.get('/listUsers', async(req,res) => {
        var value = [];
        const result = await db.database().ref("Users").orderByChild("Rol").equalTo("Usuario").once('value', function(snap){
            snap.forEach(function(snapshoot){
                value.push({nombre: snapshoot.val().Nombre, telefono:snapshoot.val().telefono, genero: snapshoot.val().Genero});
            })
            res.send(value);
        })
        
    })



    // ------------- CUPONES VENDIDOS -------------//
    router.get('/getCuponesComprados', async (req,res) => {
        var value = [];
        const result = await db.database().ref("ReporteDePagos").child("Cupones").orderByChild("Status").equalTo("Validado").limitToFirst(10).once('value', function(snap){
            snap.forEach(function(snapshoot){
                snapshoot.forEach(function(childData){
                    childData.forEach(function(childNodes){
                        if(childNodes.exists() && childNodes.val().Cantidad != null){
                            value.push(new getCuponesUtilizados(snapshoot.val().Nombre, snapshoot.val().Fecha_Pago, childNodes.key, snapshoot.key ,childNodes.val().Nombre,
                            childNodes.val().Cantidad, snapshoot.val().MontoTotal));
                        }
                    })
                })

            })
            res.send(value);
        })
    })

    //FORMULARIO: BUSQUEDA CUPONES POR : FECHA 
    router.get('/getCuponesCompradosFecha/:mes/:year', async (req,res) => {
        const {mes, year} = req.params;
        var start ='';
        var finish = '';
        switch(mes){
            case 'Enero':
                start="1/1";
                finish="31/1";
            break;
            
            case 'Febrero':
                start="1/2";
                finish="30/2";
            break; 

            case 'Marzo':
                start="1/3";
                finish="31/3";
            break; 

            case 'Abril':
                start="1/4";
                finish="30/4";
            break; 

            case 'Mayo':
                start="1/5";
                finish="31/5";
            break; 

            case 'Junio':
                start="1/6";
                finish="30/6";
            break; 

            case 'Julio':
                start="1/7";
                finish="07-31";
            break; 

            case 'Agosto':
                start="1/8";
                finish="31/8";
            break; 

            case 'Septiembre':
                start="1/9";
                finish="30/9";
            break; 

            case 'Octubre':
                start="1/10";
                finish="31/10";
            break; 

            case 'Noviembre':
                start="1/11";
                finish="30/11";
            break;

            case 'Diciembre':
                start="1/12";
                finish="31/12";
            break; 
            
        }
        var value = [];
        const result = await db.database().ref("ReporteDePagos").child("Cupones").orderByChild("Fecha_Pago").startAt(start+'/'+year)
        .endAt(finish+'/'+year)
        .once('value', function(snap){
            snap.forEach(function(snapshoot){
                if(snapshoot.val().Status === "Validado"){
                    snapshoot.forEach(function(childData){
                        childData.forEach(function(childNodes){
                            if(childNodes.exists() && childNodes.val().Cantidad != null){
                                value.push(new getCuponesUtilizados(snapshoot.val().Nombre, snapshoot.val().Fecha_Pago, childNodes.key, snapshoot.key, childNodes.val().Nombre,
                                childNodes.val().Cantidad, snapshoot.val().MontoTotal));
                            }
                        })
                    })
                }
            })
            res.send(value);
        })

    })


    //FORMULARIO: BUSQUEDA CUPONES POR : METODO DE PAGO
    router.get('/getCuponesCompradosMetodo/:pago', async (req,res) => {
        const {pago} = req.params;
        var value = [];
        const result = await db.database().ref("ReporteDePagos").child("Cupones").orderByChild("Status").equalTo("Validado").once('value', function(snap){
            snap.forEach(function(snapshoot){
                snapshoot.forEach(function(childData){
                    childData.forEach(function(childNodes){
                        if(childNodes.exists() && childNodes.val().Cantidad != null && snapshoot.val().TipoDePago === pago){
                            value.push(new getCuponesUtilizados(snapshoot.val().Nombre, snapshoot.val().Fecha_Pago, childNodes.key, snapshoot.key, childNodes.val().Nombre,
                            childNodes.val().Cantidad, snapshoot.val().MontoTotal));
                        }
                    })
                })

            })
            res.send(value);
        })
    })

    //FORMULARIO: BUSQUEDA CUPONES POR: NOMBRE DEL CUPON
    router.get('/getCuponesCompradosTitulo/:busqueda', async (req,res) => {
        const {busqueda} = req.params;
        var value = [];
        const result = await db.database().ref("ReporteDePagos").child("Cupones").orderByChild("Status").equalTo("Validado").once('value', function(snap){
            snap.forEach(function(snapshoot){
                snapshoot.forEach(function(childData){
                    childData.forEach(function(childNodes){
                        if(childNodes.exists() && childNodes.val().Cantidad != null){
                            value.push(new getCuponesUtilizados(snapshoot.val().Nombre, snapshoot.val().Fecha_Pago, childNodes.key, snapshoot.key, childNodes.val().Nombre,
                            childNodes.val().Cantidad, snapshoot.val().MontoTotal));
                        }
                    })
                })

            })
            let expresion = new RegExp(`${busqueda}.*`, "i");
            let filtrar = value.filter(value => expresion.test(value.NombreCupones));
            res.send(filtrar);
        })
    })

    //FORMULARIO: BUSQUEDA CUPONES POR: NOMBRE DE USUARIO
    router.get('/getCuponesCompradosName/:user', async (req,res) => {
        const {user} = req.params;
        var value = [];
        const result = await db.database().ref("ReporteDePagos").child("Cupones").orderByChild("Nombre").startAt(user)
        .endAt(user+'\uf8ff')
        .once('value', function(snap){
            snap.forEach(function(snapshoot){
                if(snapshoot.val().Status === "Validado"){
                    snapshoot.forEach(function(childData){
                        childData.forEach(function(childNodes){
                            if(childNodes.exists() && childNodes.val().Cantidad != null){
                                value.push(new getCuponesUtilizados(snapshoot.val().Nombre, snapshoot.val().Fecha_Pago, childNodes.key, snapshoot.key,childNodes.val().Nombre,
                                childNodes.val().Cantidad, snapshoot.val().MontoTotal));
                            }
                        })
                    })
                }
            })
            res.send(value);
        })

    })

    function getCuponesUtilizados(nameUser, fecha, id, idGen, nameCupon, cantidad, total) {
        
        this.NameUser = nameUser,
        this.Fecha = fecha,
        this.IdCupones = id,
        this.IdGeneral = idGen,
        this.NombreCupones = nameCupon,
        this.Cantidad = cantidad,
        this.TotalDolares = total

    }

    //Buscar detalles del cupón especifico
    router.get('/detallesCuponesComprados/:idGen/:id', async(req,res) =>{
        const {idGen,id} = req.params;
        const result = await db.database().ref("ReporteDePagos").child("Cupones").child(idGen).child("Cupones").child(id).once('value', function(snap){
            res.send(snap.val());
        })
    })

    router.get('/detallesCuponesComprados2/:id', async(req,res) =>{
        const {id} = req.params;
        const result = await db.database().ref("ReporteDePagos").child("Cupones").child(id).once('value', function(snap){
            res.send(snap.val());
        })
    })


    //WHATSAPP BUSQUEDA CUPONES POR : FECHA
    router.get('/getCuponesCompradosFechaWhatsapp/:mes/:year', async (req,res) => {
        const {mes, year} = req.params;
        var start ='';
        var finish = '';
        switch(mes){
            case 'Enero':
                start="01-01";
                finish="01-31";
            break;
            
            case 'Febrero':
                start="02-01";
                finish="02-30";
            break; 

            case 'Marzo':
                start="03-01";
                finish="03-31";
            break; 

            case 'Abril':
                start="04-01";
                finish="04-30";
            break; 

            case 'Mayo':
                start="05-01";
                finish="05-31";
            break; 

            case 'Junio':
                start="06-01";
                finish="06-30";
            break; 

            case 'Julio':
                start="07-01";
                finish="07-31";
            break; 

            case 'Agosto':
                start="08-01";
                finish="08-31";
            break; 

            case 'Septiembre':
                start="09-01";
                finish="09-30";
            break; 

            case 'Octubre':
                start="10-01";
                finish="10-31";
            break; 

            case 'Noviembre':
                start="11-01";
                finish="11-30";
            break;

            case 'Diciembre':
                start="12-01";
                finish="12-31";
            break; 
            
        }
        var value = [];
        const result = await db.database().ref("ReporteDePagos").child("Cupones").child("Whatsapp").orderByChild("Fecha_Pago").startAt(year+'-'+start)
        .endAt(year+'-'+finish)
        .once('value', function(snap){
            snap.forEach(function(snapshoot){
                if(snapshoot.val().Status === "Validado"){
                    snapshoot.forEach(function(childData){
                        childData.forEach(function(childNodes){
                            if(childNodes.exists() && childNodes.val().Cantidad != null){
                                value.push(new getCuponesUtilizados(snapshoot.val().Nombre, snapshoot.val().Fecha_Pago, childNodes.key, snapshoot.key, childNodes.val().Nombre,
                                childNodes.val().Cantidad, snapshoot.val().MontoTotal));
                            }
                        })
                    })
                }
            })
            res.send(value);
        })

    })
    
    
    //WHATSAPP BUSQUEDA CUPONES POR : METODO DE PAGO
    router.get('/getCuponesCompradosMetodoWhatsapp/:pago', async (req,res) => {
        const {pago} = req.params;
        var value = [];
        const result = await db.database().ref("ReporteDePagos").child("Cupones").child("Whatsapp").orderByChild("Status").equalTo("Validado").once('value', function(snap){
            snap.forEach(function(snapshoot){
                snapshoot.forEach(function(childData){
                    childData.forEach(function(childNodes){
                        if(childNodes.exists() && childNodes.val().Cantidad != null && snapshoot.val().TipoDePago === pago){
                            value.push(new getCuponesUtilizados(snapshoot.val().Nombre, snapshoot.val().Fecha_Pago, childNodes.key, snapshoot.key, childNodes.val().Nombre,
                            childNodes.val().Cantidad, snapshoot.val().MontoTotal));
                        }
                    })
                })

            })
            res.send(value);
        })
    })
    
    //WHATSAPP BUSQUEDA CUPONES POR: NOMBRE DEL CUPON
    router.get('/getCuponesCompradosTituloWhatsapp/:busqueda', async (req,res) => {
        const {busqueda} = req.params;
        var value = [];
        const result = await db.database().ref("ReporteDePagos").child("Cupones").child("Whatsapp").orderByChild("Status").equalTo("Validado").once('value', function(snap){
            snap.forEach(function(snapshoot){
                snapshoot.forEach(function(childData){
                    childData.forEach(function(childNodes){
                        if(childNodes.exists() && childNodes.val().Cantidad != null){
                            value.push(new getCuponesUtilizados(snapshoot.val().Nombre, snapshoot.val().Fecha_Pago, childNodes.key, snapshoot.key, childNodes.val().Nombre,
                            childNodes.val().Cantidad, snapshoot.val().MontoTotal));
                        }
                    })
                })

            })
            let expresion = new RegExp(`${busqueda}.*`, "i");
            let filtrar = value.filter(value => expresion.test(value.NombreCupones));
            res.send(filtrar);
        })
    })
    
    //WHATSAPP BUSQUEDA CUPONES POR: NOMBRE DE USUARIO
    router.get('/getCuponesCompradosNameWhatsapp/:user', async (req,res) => {
        const {user} = req.params;
        var value = [];
        const result = await db.database().ref("ReporteDePagos").child("Cupones").child("Whatsapp").orderByChild("Nombre").startAt(user)
        .endAt(user+'\uf8ff')
        .once('value', function(snap){
            snap.forEach(function(snapshoot){
                if(snapshoot.val().Status === "Validado"){
                    snapshoot.forEach(function(childData){
                        childData.forEach(function(childNodes){
                            if(childNodes.exists() && childNodes.val().Cantidad != null){
                                value.push(new getCuponesUtilizados(snapshoot.val().Nombre, snapshoot.val().Fecha_Pago, childNodes.key, snapshoot.key,childNodes.val().Nombre,
                                childNodes.val().Cantidad, snapshoot.val().MontoTotal));
                            }
                        })
                    })
                }
            })
            res.send(value);
        })

    })