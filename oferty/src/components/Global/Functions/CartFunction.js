import React, {Component} from 'react'


import config from '../../../config/config';
import axios from "axios";



//Axios
const axiosInstance = axios.create({
    baseURL: config.backURL
});


export const ProductContext = React.createContext();

class CartFunction extends Component{

    state ={
        cuponItem : [],
        cupones: [],
        Cart: JSON.parse(localStorage.getItem('Cart')) || [],
        Cantidad: "1",
        total: localStorage.getItem('Total') || 1,
        redirec:false,
        message:'Cada cuponera tiene 3 espacios'
    }


    carro =() => {this.setState({cart: "chaoo"})};

    addToCart = (id,catg) =>{

        axiosInstance.get('/get'+catg+'/'+id)
        .then(res => {  
            const temProduct = res.data;
            Object.values(temProduct).forEach(dato =>{
                temProduct.Cantidad = "1";
            })

            let tempCart = [...this.state.Cart];

            if (!tempCart.find(item => item.Id === temProduct.Id)){
                this.setState(prevState => ({
                    Cart: [...prevState.Cart, temProduct]
                }))
                localStorage.setItem('Cart', JSON.stringify(this.state.Cart));
            }
            else{
                let cantidad = String(parseInt(this.state.Cantidad) + 1);
                this.setState({
                    ...this.state.Cantidad, Cantidad:cantidad
                })
            }

            this.setState({...this.state.total, total:this.totalCart()})
            localStorage.setItem('Total', this.totalCart());
        })
            
        
    }

    message = () => {
        this.setState(() => {
            return{
                message: 'Cada cuponera tiene 3 espacios'
            }
        })
    }

    removeItem = (id) => {
        let tempCart = [...this.state.Cart];
        tempCart =  tempCart.filter(item => item.Id !== id);

        this.setState(() => {
            return{
                Cart: [...tempCart]
            }
        })

        let cart = JSON.parse(localStorage.getItem('Cart'));
        cart =  cart.filter(item => item.Id !== id);
        localStorage.setItem('Cart', JSON.stringify([...cart]));
    }

    changeNumber =(e,id) =>{
        let tempCart = [...this.state.Cart];
        tempCart.map(p =>{
            if (p.Id === id){
                p.Cantidad = e.target.value
                return p;
            }
            return p;
        })
        
        this.setState(() => {
            return{
                Cart: [...tempCart]
            }
        })


        this.setState({...this.state.total, total:this.totalCart()})
        localStorage.setItem('Cart', JSON.stringify(this.state.Cart));
        localStorage.setItem('Total', this.state.total);

    }

    functionMessage = () => {
        var cantidad = 0;
        let tempCart = [...this.state.Cart];
        tempCart.map(p =>{
            cantidad += parseInt(p.Cantidad); 
            return cantidad;
        })

        if(cantidad === 0){
            return 'Cada cuponera tiene 3 espacios.'
        }
        else{
            if((cantidad % 3) === 0){
                return 'Felicidades haz logrado completar tu cuponera, ¿Deseas agregar otra?'
            }
            else{
                return 'Puedes seguir agregando cupones por el mismo precio.'
            }
        }
    }

    removeAllCupones = () => {
        this.setState(() => {
            return{
                Cart: []
            }
        })
    }

    totalCart = () => {
        var cantidad = 0;
        let tempCart = [...this.state.Cart];
        tempCart.map(p =>{
            cantidad += parseInt(p.Cantidad); 
            return cantidad;
        })
        //Calculamos precio
        var div = cantidad/3;
        if(Number.isInteger(div)){
            return div;
        }
        else{
            var decimal = Math.ceil(div);
            return decimal;
        }
    }


    render(){
        return(
            <ProductContext.Provider value={{
                ...this.state,
                addToCart : this.addToCart,
                removeItem : this.removeItem,
                changeNumber : this.changeNumber,
                removeAllCupones: this.removeAllCupones,
                totalCart : this.totalCart,
                functionMessage : this.functionMessage
            }}>
                {this.props.children}

            </ProductContext.Provider>
            
        )
    }
}


const ProductConsumer = ProductContext.Consumer;
export{CartFunction, ProductConsumer};