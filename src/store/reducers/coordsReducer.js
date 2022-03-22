import { GET_COORDS_BY_INPUT } from '../type/coordsTypes';

const coordsInputReducer = (state = false, action) => {
    switch (action.type) {

        case GET_COORDS_BY_INPUT:
            // console.log(state, action.payload)
            return { ...state, coordsByInput: action.payload }

        default:
            return state;
    }
};

export default coordsInputReducer;