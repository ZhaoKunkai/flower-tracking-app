import React, { useReducer } from 'react';
import FlowerContext from './flowerContext';
import flowerReducer from './FlowerReducer';
import axios from 'axios';
import { 
    GET_FLOWERS,
    FLOWER_ERROR,
    ADD_FLOWERS,
    DELETE_FLOWER,
    CLEAR_CURRENT
 } from '../type';

const FlowerState = props => {
    const initialState = {
       flowers:[],
       error:null,
       current:null,
    }
    //flowers的初值定义为null容易出问题，这里改成了[]

    const[state, dispatch] = useReducer(flowerReducer, initialState);
    
    // Get flowers
    const getFlowers = async() =>{
        try {
            const res = await axios.get('/api/inventory');
            dispatch({
                type:GET_FLOWERS,
                payload:res.data
            })
        } catch (err) {
            dispatch({
                type:FLOWER_ERROR,
                payload:err.response.msg
            })

        }
    }
    
    //Add flowers
    const addFlowers = async flower =>{
        const config = {
            headers:{'Content-Type':'application/json'}
        }
        
        try {
            const res = await axios.post('/api/inventory', flower, config);
            dispatch({
              type:ADD_FLOWERS,
              payload:res.data
            })
        } catch (err) {
            dispatch({
               type:FLOWER_ERROR,
               payload:err.response.msg
            })
        }

    }

    //Delete Flower
    const deleteFlower = async flowerId => {
        try {
            await axios.delete(`/api/inventory/${flowerId}`);
            dispatch({
                type:DELETE_FLOWER,
                payload:flowerId
            })
            console.log(state.flowers);
        } catch (err) {
            dispatch({
                type:FLOWER_ERROR,
                payload:err.response.msg
            })
        }
    }

    //Clear Current
    const clearCurrent = async ()=>{
        dispatch({
            type:CLEAR_CURRENT
        })
    }
return (
        <FlowerContext.Provider
          value = {{
            flowers:state.flowers,
            getFlowers,
            addFlowers,
            deleteFlower,
            clearCurrent
          }}>
            {props.children}
        </FlowerContext.Provider>)
}

export default FlowerState;