import *as types from '../type/coordsTypes'


export const saveCoordsByInput = (payload) => ({
    type: types.GET_COORDS_BY_INPUT,
    payload,
});

