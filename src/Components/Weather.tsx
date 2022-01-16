import React from 'react';
import Chip from '@mui/material/Chip';
import CloudIcon from '@material-ui/icons/Cloud';
import ExploreIcon from '@material-ui/icons/Explore';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import {  ICity } from './Interfaces'


interface IProps {
  weather: ICity,
  weatherInfo: ICity,
  farenheight: boolean,
  conversion: (feels_like: number) => void
}

const Weather = (props: IProps) => {
  const {
    weather,
    conversion,
    farenheight,
    weatherInfo,
  } = props


  return (
    <div>
      <h1>{weather.name}</h1>
      <Chip
        icon={<CloudIcon />}
        variant='outlined'
        label={`You are seeing ${weather.description}`}
      />
      <br />
      <br />
      <Chip
        icon={<ExploreIcon />}
        variant='outlined'
        label={`Windspeeds at ${weatherInfo.wind_speed}`}
      />
      <br />
      <br />
      <Chip
        icon={<Brightness5Icon />}
        variant='outlined'
        label={`Feels like ${conversion(weatherInfo.feels_like)} degrees ${farenheight ? 'farenheight' : 'celcius'}`}
      />

    </div>
  )
}


export default Weather;