import React, { useState, useEffect } from 'react';

import { titleCase, fahrConverter, convertObjToArray, currentTime, weatherIcon } from '../Helpers/Helpers';
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
    const [ search, setSearch ] = useState('');
    const [ cityData, setCityData ] = useState([]);
    const [ tempUnit, setTempUnit ] = useState('F');
    const [ timezoneOffset, setTimezoneOffset ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ url, setUrl ] = useState(
        `https://api.openweathermap.org/data/2.5/weather?q=${titleCase(cityName)}&appid=${API_Key}`
        );

    // Fetch weather data by city
    useEffect(() => {
        const fetchCityData = async () => {
            setError(false);
            setLoading(true);

            try {
                const cityDataResult = await axios(url);
                setCityData(cityDataResult.data);
                setTimezoneOffset(cityDataResult.data.timezone);
            } 

            catch (err) {
                setError(true);
                console.log(err);
            }

            setLoading(false);
        };
        
        fetchCityData();
    }, [url]);
    
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
    convertObjToArray(cityData, weatherElementsArray); // Convert the latLonData into an array

    // console.log(weatherElementsArray);
    // If the weather elements array has data then...
    if (weatherElementsArray.length === 13 || weatherElementsArray.length === 14) {
        weather = (
            <Tilty glare scale={1.03}>
                <div className={classes.Container}>
                    <div className={classes.Card}>
                        <SearchResults 
                            key={searchKeys++}
                            Name={cityName.replace('+', ' ')}
                            Temp={fahrConverter(weatherElementsArray[3].main.temp)}
                            FeelsLike={fahrConverter(weatherElementsArray[3].main.feels_like)}
                            Humidity={weatherElementsArray[3].main.humidity}
                            Desc={weatherElementsArray[1].weather[0].main}
                            Time={currentTime(timezoneOffset)}
                            Country={weatherElementsArray.length === 13 ? weatherElementsArray[8].sys.country : weatherElementsArray[9].sys.country}
                            Icon={weatherIcon(weatherElementsArray[1].weather[0].icon)}
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
                    <p className={classes.Errmsg}>Sorry there was a problem with the city entered, the city might not be found in the API's database or the city name is wrong. Please try again...</p>
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