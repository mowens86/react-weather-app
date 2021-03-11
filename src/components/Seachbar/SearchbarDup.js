import React, { useState, useEffect } from 'react';

import { titleCase, fahrConverter, convertObjToArray, currentTime } from '../Helpers/Helpers';
import Input from './Input/Input';
import ToggleCF from './ToggleCF/ToggleCF';
import SearchResults from './SearchResults/SearchResults';
import Tilty from 'react-tilty';
import Spinner from '../UI/Spinner/Spinner';
import axios from 'axios';
import classes from './Searchbar.module.scss'; 

const API_Key = process.env.REACT_APP_WEATHER_API_KEY;

const Searchbar = props => {
    // States
    const [ cityName, setCityName ] = useState('Los Angeles');
    const [ lat, setLat ] = useState(34.0522);
    const [ lon, setLon ] = useState(-118.2437);
    const [ search, setSearch ] = useState('');
    const [ cityData, setCityData ] = useState([]);
    const [ latLonData, setLatLonData ] = useState([]);
    const [ timezoneOffset, setTimezoneOffset ] = useState(null);
    const [ url, setUrl ] = useState(
        `https://api.openweathermap.org/data/2.5/weather?q=${titleCase(cityName)}&appid=${API_Key}`
        );
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);

    // Fetch weather data by city
    useEffect(() => {
        const fetchCityData = async () => {
            setError(false);
            setLoading(true);

            try {
                const cityDataResult = await axios(url);
                setCityData(cityDataResult.data);
                setLat(cityDataResult.data.coord.lat);
                setLon(cityDataResult.data.coord.lon); 
            } 

            catch (err) {
                setError(true);
                console.log(err);
            }

            setLoading(false);
        };
        
        fetchCityData();
    }, [url]);

    // Fetch weather data by longitude and latitude from the weather data by city
    useEffect(() => {
        const fetchLatLonData = async () => {
            setError(false);
            setLoading(true);

            try {
                const latLonDataResult = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${API_Key}`);
                setLatLonData(latLonDataResult.data);
                setTimezoneOffset(latLonDataResult.data.timezone_offset);
            } 

            catch (err) {
                setError(true);
                console.log(err);
            }

            setLoading(false);
        };
        
        fetchLatLonData();
    }, [lat, lon]);
    
    // Handle event when search button is clicked
    const searchHandler = (event) => {
        event.preventDefault();
        setUrl(
            `https://api.openweathermap.org/data/2.5/weather?q=${titleCase(search)}&appid=${API_Key}`
            );
        setCityName(titleCase(search));
    };


    let searchKeys = 0;
    let weather;
    const weatherElementsArray = [];
    convertObjToArray(latLonData, weatherElementsArray); // Convert the latLonData into an array

    console.log(timezoneOffset);
    // If the weather elements array has data then...
    if (weatherElementsArray.length > 0) { // As of 3/7/2021, the data being gathered sometimes is a little buggy and the timezone keeps the previous timezone. Need figure out the bug to update properly.
        weather = (
            <Tilty glare scale={1.03}>
                <div className={classes.Container}>
                    <div className={classes.Card}>
                        <SearchResults 
                            key={searchKeys++}
                            Name={cityName.replace('+', ' ')}
                            Temp={fahrConverter(weatherElementsArray[4].current.temp)}
                            FeelsLike={fahrConverter(weatherElementsArray[4].current.feels_like)}
                            Humidity={weatherElementsArray[4].current.humidity}
                            Desc={weatherElementsArray[4].current.weather[0].main}
                            Time={currentTime(timezoneOffset)}
                            Alert={weatherElementsArray[6] ? weatherElementsArray[6].alerts[0].description : null}
                        />
                    </div>
                </div>
            </Tilty>
        );
    }

    // Error card
    const errorSpinner = (
        <Tilty>
            <div className={classes.Container}>
                <div className={classes.Card}>
                    <Spinner />
                    <p className={classes.Errmsg}>Sorry there was a problem with the city entered, the city might not be found in the API's data or the city name is wrong. Please try again...</p>
                </div>
            </div>
        </Tilty>        
    )

    // Spinner to be used when data is being fetched
    const tiltySpinner = (
        <Tilty>
            <div className={classes.Container}>
                <div className={classes.Card}>
                    <Spinner />
                </div>
            </div>
        </Tilty>
    )

    if (error) weather = errorSpinner;
    if (loading) weather = tiltySpinner;

    return (
        <div>
            <ul className={classes.Searchbar}>
                <li>
                    <form onSubmit={searchHandler}>
                        <Input
                            value={search}
                            onChange={event => setSearch(event.target.value)}
                        />
                    </form>
                </li>
                <li>
                    <div className={classes.ToggleWrapper}>
                        C <ToggleCF /> F
                    </div>
                </li>
            </ul>
            {weather}
        </div>
    )
};

export default Searchbar;