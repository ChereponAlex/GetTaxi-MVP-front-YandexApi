import { YMaps, Map, Placemark, ZoomControl } from 'react-yandex-maps';
import { useState } from 'react';
import { Input } from './UI/input/input';
import './App.css';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import * as actions from './store/actions/coordsActions';
import * as actionClick from './store/actions/coordsClickActions';

import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';

import { parsingInput } from './functionParse/parsingInput';


function App() {

  const dispatch = useDispatch();
  const [inputValue, setinputvalue] = useState('');
  const [placeMark, setPlaceMark] = useState(null);

  const [clickOrder, setClickOrder] = useState(true);

  const [state, setState] = useState(null);
  const [arrOfCoordinates, setArrOfCoordinates] = useState('')
  const [sorted, setsorted] = useState([])

  const { crews_info } = useSelector((state) => state.drivers);
  const { coordsByInput } = useSelector((state) => state.coordsAdress);
  const { coordsByClick } = useSelector((state) => state.coordsPlacemark);


  const centerMsc = [55.755819, 37.617644]

  const findAdress = async (e) => {
    e.preventDefault()
    await axios.get(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=e266f36c-f50a-43a0-a5a4-d30d07bdaf3f&geocode=Москва+${parsingInput(inputValue)}&lang=ru`)
      .then(response => {
        const answer = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
        const coordinates = answer.split(' ').reverse().map(el => Number(el))
        dispatch(actions.saveCoordsByInput({ coordinates }))
        const newCrew = crews_info.map((el, index) => ({ ...el, distance: Number(window.ymaps.coordSystem.geo.getDistance(coordinates, [el.lat, el.lon]).toFixed(0)) }))
        const fullSort = newCrew.sort((a, b) => {
          if (a['distance'] > b['distance']) return 1;
          if (a['distance'] < b['distance']) return -1;
          return 0;
        });
        setPlaceMark(null)
        if ((coordinates[0] === centerMsc[0]) && (coordinates[1] === centerMsc[1])) return setArrOfCoordinates(null)
        else setArrOfCoordinates(coordinates)
        setsorted(fullSort)
      }).catch(() => alert('что-то пошло не так'))

    setState(true)
  }

  const getCoordinatesByClick = (e) => {

    setArrOfCoordinates(null)

    axios.get(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=e266f36c-f50a-43a0-a5a4-d30d07bdaf3f&geocode=${e.get('coords').reverse().join(',')}&lang=ru`)
      .then(response => setinputvalue(response.data.response.GeoObjectCollection.featureMember[0].GeoObject.name))
        const coordinates = e.get('coords').reverse()
    dispatch(actionClick.saveCoordsByClick({ coordinates }))

    setPlaceMark(coordinates)
    setState(true)

    const newCrew = crews_info.map((el, index) => ({ ...el, distance: Number(window.ymaps.coordSystem.geo.getDistance(e.get('coords'), [el.lat, el.lon]).toFixed(0)) }))
  
    const fullSort = newCrew.sort((a, b) => {
      if (a['distance'] > b['distance']) return 1;
      if (a['distance'] < b['distance']) return -1;
      return 0;
    });


    setsorted(fullSort)
  }
  const pushOrder = () => {
    if (inputValue === '') {
      setClickOrder(false)
      // setState(false)
    }
    // сигнатура запроса на backend
    console.log({
      "source_time": new Date(),
      "addresses": [
        {
          "address": inputValue,
          "lat": coordsByClick.coordinates[0] || coordsByInput.coordinates[0],
          "lon": coordsByClick.coordinates[1] || coordsByInput.coordinates[1],
        }
      ],
      "crew_id": sorted[0].crew_id
    }
    )
  }
  return (
    <div className="App">
      <div className="desription">Детали заказа
      </div>
      <hr style={{ width: '820px' }}></hr>

      <form className='input-form' onSubmit={findAdress}>
        <div className='description-input'>
          Откуда
        </div>
        <Input setinputvalue={setinputvalue} inputValue={inputValue} />

      </form>
      {arrOfCoordinates === null && !placeMark ? <div style={{ color: 'red', fontSize: '12px' }}>Адрес не найден</div> : ''}
      {!clickOrder && !inputValue ? <div style={{ color: 'red', fontSize: '12px' }}>Поле обязательное</div> : null}

      {state && sorted.length > 0 && (
        <div className='conteiner-driver-closer'>
          <div className='description-item-driver-closer'>Подходящий экипаж:</div>
          <div className='item-driver-closer'>
            <div>{<FaIcons.FaTaxi style={{ width: '30px', height: '30px', color: '#c1baba' }} />}</div>
            <div className='car-box'>
              <div className='car-name'>{sorted[0].car_mark}  {sorted[0].car_model}</div>
              <div className='car-color'>{sorted[0].car_color}</div>
              <div className='car-number'>{sorted[0].car_number}</div>
            </div>
          </div>
        </div>
      )
      }

      <div className="conteiner">
        <div className="map">
          <YMaps >
            <div>
              <Map
                onClick={getCoordinatesByClick}
                state={{
                  center: ([55.75, 37.57] || arrOfCoordinates || placeMark),
                  zoom: 9,
                  control: ['zoomControl']
                }}
                style={{ width: '500px', height: '500px', zIndex: '10' }}>
                <Placemark
                  geometry={arrOfCoordinates || placeMark}
                  options={{
                    hasHint: true,
                    iconColor: 'orange',
                    cursor: 'pointer',
                    hideIconOnBalloonOpen: false,
                  }}
                  properties={{
                    hintContent: '123',
                    balloonContent: ['Body'],
                  }}
                />
                {(placeMark || arrOfCoordinates) && crews_info.map((el, index) => (<Placemark key={el.crew_id} geometry={[el.lat, el.lon]} options={{ iconColor: 'green' }} onClick={(e) => console.log(e.get('coords'))} />))}
                <ZoomControl options={{}} />

              </Map>

            </div>
          </YMaps>
        </div>
        <div className="conteiner-driver-list">
          {state && sorted.length > 0 && sorted.map((el, index) => <div key={el.crew_id} className='item-driver'>

            <div>{<FaIcons.FaTaxi style={{ width: '30px', height: '30px', color: '#c1baba' }} />}</div>
            <div className='car-box'>
              <div className='car-name'>{el.car_mark}  {el.car_model} {el.crew_id}</div>
              <div className='car-color'>{el.car_color}</div>
            </div>
            <div style={{ position: 'relative', right: '-40px', bottom: '-10px' }}>{el.distance}м</div>
            <div>{<MdIcons.MdKeyboardArrowRight style={{ width: '25px', height: '25px', color: '#c1baba', position: 'relative', right: '-10px' }} />}</div>

          </div>
          )}
        </div>

      </div>
      <button disabled={(arrOfCoordinates === null && !placeMark) || (!clickOrder && !inputValue) ? true : false} onClick={pushOrder}>Заказать</button>
    </div >
  );
}

export default App;
