import { GET_CREW} from '../type/userTypes';

const getCrew = (state = false, action) => {
  switch (action.type) {
    case GET_CREW:
      return { crews_info: action.payload };
      
   
    default:
      return state;
  }
};

export default getCrew;