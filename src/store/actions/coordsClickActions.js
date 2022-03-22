import *as types from '../type/coordsClickTypes'


export const saveCoordsByClick = (payload) => ({
    type: types.GET_COORDS_BY_CLICK,
    payload,
});