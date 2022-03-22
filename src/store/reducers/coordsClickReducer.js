import { GET_COORDS_BY_CLICK } from '..//type/coordsClickTypes';

const coordsClickReducer = (state = false, action) => {
    switch (action.type) {

        case GET_COORDS_BY_CLICK:
            // console.log(state, action.payload)
            return { ...state, coordsByClick: action.payload }
        default:
            return state;
    }
};

export default coordsClickReducer;