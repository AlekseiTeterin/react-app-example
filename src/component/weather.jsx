import React from 'react';
import axios from 'axios';
import clouds from './clouds.jpg';
import clearSky from './clearSky.jpg';
import fewClouds from './fewClouds.jpg';
import scateredClouds from './scateredClouds.jpg';
import showeredRain from './showeredRain.jpg';
import rain from './rain.jpg';
import flash from './molnii.jpg';
import snow from './snow.jpg';
import mist from './mist.jpg';

class Weather extends React.Component {
    temp = 0;
    feels = 0;
    wind = 0;
    humidity = 0;
    pressure = 0;
    weather = '';
    imgNum = -1;

    constructor(props) {        
        super(props); 

        this.submitHandler = this.submitHandler.bind(this);
        this.cityInputChangeHandler = this.cityInputChangeHandler.bind(this);

        this.state = {
            city: "Москва",
            image: clouds
        };
    }

    cityInputChangeHandler(e) {
        this.setState({
            city: e.target.value
        });  
    }  

    submitHandler(e) {
        // извлечь данные из полей формы
        const _city = this.state.city;
        let _image = this.state.image;
        const apiKey = "131aaec3ea306573195e36e16a1d73e4";
        

        var imgArray = ['0', clearSky, fewClouds, scateredClouds, 
            clouds, '5', '6', '7', '8', showeredRain, rain, flash,
            '12', snow];
        imgArray[50] = mist;

        

        const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + this.state.city + '&lang=ru&units=metric&appid=' + apiKey;
        
        axios.get(url)
        .then((response) => {
            console.log(response.data);
            this.temp = response.data.main.temp + ' градусов';
            this.feels = response.data.main.feels_like + ' градусов';
            this.wind = response.data.wind.speed + ' м/с';
            this.humidity = response.data.main.humidity + ' %';
            this.pressure = response.data.main.pressure*0.75 + ' мм.рт.ст.';
            this.weather = response.data.weather[0].description;
            this.imgNum = response.data.weather[0]['icon'].slice(0, -1);
        })
        .catch((er) => {
            console.log(`error -> ${er}`)
        });

        _image = imgArray[parseInt(this.imgNum, 10)];

        this.setState({
            city: _city,
            image: _image
        });
        
        
    }

    render() {
        return <div>
        <div className='widget' style={{backgroundImage: `url(${this.state.image})`}}>
            <div>
                <form className="form-style" method="get" action="#" onSubmit={this.submitHandler}>
                    <div className="form-field">
                        <div>
                            <label className="form-field1">
                                <div className='txt'>Город</div>
                                <div>
                                    <input style={{width:"160px", borderRadius:"5px", textAlign: "center"}} id="user-name" type="text" 
                                        placeholder={this.state.city} onChange={this.cityInputChangeHandler}/> 
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className="form-field">
                            <div>
                                <button style={{width:"140px", marginTop:"10px", borderRadius:"5px", background:"rgb(222, 230, 235)"}}>Узнать погоду</button>
                            </div>
                        </div>
                </form>
            </div>
            <div className='value-block'>
                <div className='str' style={{textAlign: "center", fontWeight: "1500"}}>В городе {this.state.city} сейчас:</div>
                <div className='str'>Температура: {this.temp}</div> 
                <div className='str'>Ощущается как: {this.feels}</div> 
                <div className='str'>Скорость ветра: {this.wind}</div>
                <div className='str'>Относительная влажность: {this.humidity}</div>
                <div className='str'>Атм. давление: {this.pressure}</div>
                <div className='str'>На улице: {this.weather}</div>
            </div>
        </div>
    </div>
    } 
}
export default Weather;