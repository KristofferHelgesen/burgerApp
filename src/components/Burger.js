import React from 'react'
import axios from 'axios';

import Input from './inputFields/Input';
import IngredientTemplate from './IngredientTemplate';

import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBomZLkN1uVFQLP3edgbQiaAovzp63xzBM",
    authDomain: "burger-b7fa8.firebaseapp.com",
    databaseURL: "https://burger-b7fa8.firebaseio.com",
    projectId: "burger-b7fa8",
    storageBucket: "burger-b7fa8.appspot.com",
    messagingSenderId: "388726341922",
    appId: "1:388726341922:web:0750ea77a061792506657b"
}

firebase.initializeApp(config);


const RenderBurger = (props) => {
    
    let ingredientKeys  = Object.keys(props.state.ingredients);

    const ingredients = ingredientKeys.map((ingredient) => (props.state.ingredients[ingredient].amount.length !== 0 ) ? props.state.ingredients[ingredient].amount.map(() =><IngredientTemplate type={ingredient} />)  : null );
    
    return(

        <div>
            
            {ingredients}
           
        </div>
    
    )

}

const RenderInputButtons = (props) => {

    let ingredients  = Object.keys(props.state.ingredients).filter(function(value){
        //All burgers must contain this!
        return (value != 'BreadTop' && value != 'BreadBottom') ? value : null;
    
    });
     
    
    const buttons = ingredients.map(ingredient =>  <Input updateValue={ingredient} change={props.change}  />  );

    return(
        <div>
             {buttons}
        </div>
    )   
    
 }

 const PriceContainer = (props) => {

    let totPrice  = Number(0);  
    let ingredients  = Object.keys(props.state.ingredients).filter(function(value){
        //All burgers must contain this!
        return (value != 'BreadTop' && value != 'BreadBottom') ? value : null;
        
    });

    ingredients.map((ingredient) => (props.state.ingredients[ingredient].amount.length !== 0 ) ? totPrice  += Number(props.state.ingredients[ingredient].amount.length * props.state.ingredients[ingredient].price) : null )

    return <h1>Total price: {totPrice}</h1>
 }
  
export default class Burger extends React.Component {

    componentDidMount() {
 
        const rootRef = firebase.database().ref().child('config');
  
        rootRef.on('value',snap => {
           
            this.setState({
                ingredients : snap.child('ingredients').val()
            })
        });
    }
    state = {

        ingredients: null

    }


    changeHandler = (updateValue,addedRemoved) => () => {

        let ingredients  = JSON.parse(JSON.stringify(this.state.ingredients));
        
        if(addedRemoved === 'add'){
            ingredients[updateValue].amount.push(1);
            
        }else if(addedRemoved === "remove"){
            ingredients[updateValue].amount.pop();
        }
        //WTF, i dont set the state but it updates? 
        firebase.database().ref().child('config').update(
            {
                ingredients
        
            }
          );
        this.setState({
            ingredients : ingredients
        });
    
 
    }

 
    render() {
   
        let returnJSX  = null;
        if(this.state.ingredients){
            
             returnJSX = [ <div>
                <RenderBurger state={this.state}/>
                <RenderInputButtons change={this.changeHandler} state={this.state}/>
                <PriceContainer state={this.state} />
            </div>]

        }else{
            returnJSX = <p>Loading.....</p>;
        }
        
        return (
          [returnJSX]
        )
    }
}
