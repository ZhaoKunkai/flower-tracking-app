import React, { useReducer } from 'react';
import FlowerContext from './flowerContext';
import flowerReducer from './FlowerReducer';
import axios from 'axios';
import { 
    GET_FLOWERS,
    FLOWER_ERROR,
    ADD_FLOWERS,
    DELETE_FLOWER,
    CLEAR_CURRENT,
    FILTER_FLOWERS,
    CLEAR_FILTER,
    CLEAR_FLOWERS
 } from '../type';

const FlowerState = props => {
    const initialState = {
       flowers:null,
       error:null,
       current:null,
       filtered:null,
    };
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
    const deleteFlower = async id => {
        try {
            await axios.delete(`/api/inventory/${id}`);
            dispatch({
                type:DELETE_FLOWER,
                payload:id
            })
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
    
    //Filter Flowers
    const filterFlowers = text => {
        dispatch({
            type:FILTER_FLOWERS,
            payload:text
        })
    }

    //Clear Filter
    const clearFilter = ()=>{
        dispatch({
            type:CLEAR_FILTER
        })
    }

    //Clear Flowers
    const clearFlowers = ()=>{
        dispatch({
            type:CLEAR_FLOWERS
        })
    }
return (
        <FlowerContext.Provider
          value = {{
            flowers:state.flowers,
            getFlowers,
            addFlowers,
            deleteFlower,
            clearCurrent,
            filterFlowers,
            clearFilter,
            clearFlowers
          }}>
            {props.children}
        </FlowerContext.Provider>)
}

export default FlowerState;