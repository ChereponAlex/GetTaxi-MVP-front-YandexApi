import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';


const sagaMiddleware = createSagaMiddleware();

const initialState = {
  drivers: {
    crews_info: [
      {
        "crew_id": 1,
        "car_mark": "Chevrolet",
        "car_model": "Lacetti",
        "car_color": "синий",
        "car_number": "Е234КУ",
        "driver_name": "Петров",
        "driver_phone": "111",
        "lat": 55.663779,
        "lon": 37.466419,
        // "distance": 300
      },
      {
        "crew_id": 2,
        "car_mark": "Mersedes",
        "car_model": "c180",
        "car_color": "красный",
        "car_number": "Е940МС",
        "driver_name": "Иванов",
        "driver_phone": "222",
        "lat": 55.788538,
        "lon": 37.569914,
        // "distance": 500
      },
      {
        "crew_id": 3,
        "car_mark": "Hyundai",
        "car_model": "Solaris",
        "car_color": "серебристый",
        "car_number": "Т333ТР",
        "driver_name": "Хабиб",
        "driver_phone": "333",
        "lat": 55.74968,
        "lon": 37.623558,
        // "distance": 400
      },
      {
        "crew_id": 4,
        "car_mark": "Skoda",
        "car_model": "Ocravia",
        "car_color": "белый",
        "car_number": "A852AA",
        "driver_name": "Горбачев",
        "driver_phone": "444",
        "lat": 55.724507,
        "lon": 37.613743,
        // "distance": 600
      },
      {
        "crew_id": 5,
        "car_mark": "Lada",
        "car_model": "Vesta",
        "car_color": "желтый",
        "car_number": "Е234КУ",
        "driver_name": "Сидоров",
        "driver_phone": "555",
        "lat": 55.771833,
        "lon": 37.623233,
        // "distance": 100
      },
      {
        "crew_id": 6,
        "car_mark": "Kia",
        "car_model": "Rio",
        "car_color": "желтый",
        "car_number": "Н235КК",
        "driver_name": "Киркоров",
        "driver_phone": "666",
        "lat": 55.806712,
        "lon": 37.768823,
        // "distance": 100
      },
      {
        "crew_id": 7,
        "car_mark": "Hyundai",
        "car_model": "Solaris",
        "car_color": "желтый",
        "car_number": "C156HP",
        "driver_name": "Ковалев",
        "driver_phone": "777",
        "lat": 55.695392,
        "lon": 37.666645,
        // "distance": 100
      }

    ],


  },
  coordsAdress: {
    coordsByInput: {
      coordinates: [],
    }
  },
  coordsPlacemark: {
    coordsByClick: {
      coordinates: [],
    }
  },



};



const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

// sagaMiddleware.run(rootSaga);

export default store;