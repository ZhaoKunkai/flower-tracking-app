import { 
    FLOWER_ERROR, 
    GET_FLOWERS,
    ADD_FLOWERS, 
    DELETE_FLOWER,
    FILTER_FLOWERS,
    CLEAR_FILTER,
    CLEAR_FLOWERS
} from "../type";

export default (state, action) => {
    switch(action.type) {
         case GET_FLOWERS:
            return{
                ...state,
                flowers:action.payload,
                loading:false
            }
        case CLEAR_FLOWERS:
            return {
                ...state,
                flowers:null,
                filtered:null,
                error:null,
                current:null
            }
        case FLOWER_ERROR:
            return {
                ...state,
                error: action.payload
            }  
        case ADD_FLOWERS:
            return{
                ...state,
                flowers:[action.payload, ...state.flowers],
                loading:false
            }
        case DELETE_FLOWER:
            return{
                ...state,
                flowers:state.flowers.filter(flower => flower._id !== action.payload),
            }
        case FILTER_FLOWERS:
            return{
                ...state,
                filtered: state.flowers.filter(flower => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return flower.flowerName.match(regex);
                })
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered:null
            };
        default:
             return state;
    }
}