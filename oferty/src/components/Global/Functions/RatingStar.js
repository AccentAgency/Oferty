
import {fire} from '../../../config/firebase';
import ReactDOM from 'react-dom'

import config from '../../../config/config';
import axios from "axios";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import swal from 'sweetalert';

//Axios
const axiosInstance = axios.create({
    baseURL: config.backURL
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}



function rating(rating, idCup, catg) {
    
    fire.auth().onAuthStateChanged((user) =>{
        if(user){
            let valor = true;
            if(catg === "CuponSemana"){
                axiosInstance.post('/starRatingD',{
                    "id": idCup,
                    "star": rating
                })
                .then(res => {
                    const element = (
                        <Snackbar open={valor}>
                            <Alert severity="success">
                                Puntuación enviada correctamente. ¡Gracias por tu opinión!
                            </Alert>
                        </Snackbar>
                    )
                    ReactDOM.render(element, document.getElementById('snackbar'));
                    window.location.reload();
                })
                .catch((error) => {
                    swal({title:"Ha ocurrido un error",text:"Verifique su conexión a internet o intente de nuevo más tarde.",icon:"error",confirmButtonText: "Aceptar"});
                }) 

            }
            else if(catg === "Cupones"){
                axiosInstance.post('/starRatingC',{
                    "id": idCup,
                    "star": rating
                })
                .then(res => {
                    const element = (
                        <Snackbar open={valor}>
                            <Alert severity="success">
                                Puntuación enviada correctamente. ¡Gracias por tu opinión!
                            </Alert>
                        </Snackbar>
                    )
                    ReactDOM.render(element, document.getElementById('snackbar'));
                    window.location.reload();
                })
                .catch((error) => {
                    swal({title:"Ha ocurrido un error",text:"Verifique su conexión a internet o intente de nuevo más tarde.",icon:"error",confirmButtonText: "Aceptar"});
                }) 
            }
            else if (catg === "Comida" || catg === "MejorEnSalud" || catg === "Belleza" || catg === "TodoUnDolar"){
                axiosInstance.post('/starRatingCamp',{
                    "id": idCup,
                    "star": rating,
                    "catg": catg
                })
                .then(res => {
                    const element = (
                        <Snackbar open={valor}>
                            <Alert severity="success">
                                Puntuación enviada correctamente. ¡Gracias por tu opinión!
                            </Alert>
                        </Snackbar>
                    )
                    ReactDOM.render(element, document.getElementById('snackbar'));
                    window.location.reload();
                    
                })
                .catch((error) => {
                    swal({title:"Ha ocurrido un error",text:"Verifique su conexión a internet o intente de nuevo más tarde.",icon:"error",confirmButtonText: "Aceptar"});
                })
            }
        return true;   
        }
        else{
            let valor = true;
            const element = (
                <Snackbar open={valor}>
                    <Alert severity="warning">
                        Debes registrarte para poder votar. ¡Unete a Oferty!
                    </Alert>
                </Snackbar>
            )
            ReactDOM.render(element, document.getElementById('snackbar'));
            window.location.href = "/Login";
        }
    })
    
    

}



export default rating;
