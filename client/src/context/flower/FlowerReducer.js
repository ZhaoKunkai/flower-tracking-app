import { 
    FLOWER_ERROR, 
    GET_FLOWERS,
    ADD_FLOWERS, 
    DELETE_FLOWER
} from "../type";

export default (state, action) => {
    switch(action.type) {
         case GET_FLOWERS:
            return{
                ...state,
                //loading:false,
                flowers:action.payload
            }
        case FLOWER_ERROR:
            return {
                ...state,
                error: action.payload
            }  
        case ADD_FLOWERS:
            return{
                ...state,
                flowers:[action.payload, ...state.flowers]
            }
        case DELETE_FLOWER:
            console.log('good');
            console.log(state.flowers);
            return{
                ...state,
                flowers:state.flowers.filter(flower => flower.flowerId !== action.payload),
            }
        default:
             return state;
    }
}