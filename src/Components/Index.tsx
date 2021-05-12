import React, {Component} from 'react';
import { IPosition, IState,  IResults, ICity } from './Interfaces'
import Weather from './Weather'
import CircularProgress from '@material-ui/core/CircularProgress';

class OpenWeather extends Component <{}, IState> {
    constructor(){
        super('')
        this.state = {
            key: '55408e009ad035e0b0cea0036b638810',
            baseURL: 'https://api.openweathermap.org/data/2.5/onecall',
            weather: {
                name: '',
                description: '',
                wind_speed: 0,
                main: '',
                feels_like: 0,
                weather: [],
             },
            searched: false,
            farenheight: false
        }
    }


    

     conversion = (kelvin: number) => {
        const farenheightDegrees = (kelvin - 273.15) * 1.8000 + 32
        let newFarenheight = farenheightDegrees.toString()
        if(newFarenheight){
            let display = newFarenheight.slice(0, 3)
            return display
        }
        return  this.setState({farenheight: true})
      }


    success = (position: IPosition) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude

        let url = `${this.state.baseURL}?lat=${lat}&lon=${lon}&appid=${this.state.key}`
        
        fetch(url, {
            method: 'GET'
        }).then(res => res.json())
        .then(json => this.displayWeather(json))

    }

    displayWeather(json: IResults){
        this.setState({weather: json.current})
        this.setState({searched: true})
    }

    componentDidMount(){
        navigator.geolocation.getCurrentPosition(this.success)
    }

    render(){
        return(
            <div>
                {
                    this.state.searched ? this.state.weather.weather.map((weather: ICity) => {
                       
                            return weather.main == 'Clouds' ?
                              <div>
                                <iframe  src="https://giphy.com/embed/3o7aD4WmSr6b9LgOli" width="280" height="170" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/cat-cute-yes-3o7aD4WmSr6b9LgOli">via GIPHY</a></p>
                                <Weather weather={weather} farenheight={this.state.farenheight} conversion={this.conversion} weatherInfo={this.state.weather} />
                              </div>
                              : weather.main === 'Sun' ?
                                <div>
                                  <iframe  src="https://giphy.com/embed/lI8YNZc734UH6" width="380" height="180" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/sunny-lI8YNZc734UH6">via GIPHY</a></p>
                                  <Weather weather={weather} farenheight={this.state.farenheight} conversion={this.conversion} weatherInfo={this.state.weather} />
                              </div>
                                : weather.main === 'Rain' ?
                                  <div>
                                    <iframe  src="https://giphy.com/embed/dI3D3BWfDub0Q" width="280" height="170" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/rain-ahh-dI3D3BWfDub0Q">via GIPHY</a></p>
                                <Weather weather={weather} farenheight={this.state.farenheight} conversion={this.conversion} weatherInfo={this.state.weather} />
                                  </div>
                                  : weather.main === 'Drizzle' ?
                                    <div>
                                      <iframe  src="https://giphy.com/embed/dI3D3BWfDub0Q" width="280" height="170" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/rain-ahh-dI3D3BWfDub0Q">via GIPHY</a></p>
                                      <Weather weather={weather} farenheight={this.state.farenheight} conversion={this.conversion} weatherInfo={this.state.weather} />

                                    </div>
                                    : weather.main === 'Clear' ?
                                      <div><iframe  src="https://giphy.com/embed/0tLvvglXfGOITSFJSU" width="280" height="180" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/happy-day-beautiful-clear-sky-0tLvvglXfGOITSFJSU">via GIPHY</a></p>
                                         <Weather weather={weather} farenheight={this.state.farenheight} conversion={this.conversion} weatherInfo={this.state.weather} />

                                      </div>
                  
                                      : <div><iframe src="https://giphy.com/lafaembed/za5xikuRr0OzK" width="380" height="270" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/batman-weather-za5xikuRr0OzK">via GIPHY</a></p></div>
                  
                          }) : this.state.weather.weather === [] ? <h4>No info found yet, try searching a different city to find more!</h4>: <CircularProgress style={{marginTop: '50%'}}/>
                }
            </div>
        )
    }
}

export default OpenWeather