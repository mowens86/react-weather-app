import React, { useState, useEffect } from 'react';

import Logo from './Logo/Logo';
import Input from './Input/Input';
import ToggleCF from './ToggleCF/ToggleCF';
import SearchResults from './SearchResults/SearchResults';
import Tilty from 'react-tilty';
import classes from './Searchbar.module.scss';
import axios from 'axios';
import Spinner from '../UI/Spinner/Spinner';

const API_Key = process.env.REACT_APP_WEATHER_API_KEY;

const Searchbar = props => {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ search, setSearch ] = useState('');
    const [ data, setData ] = useState(null); // Set to null initially lets the data be used conditionally
    const [ url, setUrl ] = useState(
        `https://api.openweathermap.org/data/2.5/weather?q=los+angeles&appid=${API_Key}`
        );
        
    useEffect(() => {
        const fetchData = async () => {
            setError(false);
            setLoading(true);
    
            try {
                const result = await axios(url);
                // console.log(result);
                setData(result.data);
            } 
            
            catch (err) {
                setError(true);
            }

            setLoading(false);
        };
        
        fetchData();
    
    }, [url]);

    const searchHandler = (event) => {
        event.preventDefault();
        setUrl(
            `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_Key}`
            );
    };

    let searchKeys = 0;
    let weather;
    let tiltySpinner = (
        <Tilty>
            <div className={classes.Container}>
                <div className={classes.Card}>
                    <Spinner />
                </div>
            </div>
        </Tilty>
    )

    if (data !== null) {
        console.log(data);
        weather = (
            <Tilty>
                <div className={classes.Container}>
                    <div className={classes.Card}>
                        <SearchResults 
                            key={searchKeys++}
                            Name={data.name}
                            Lat={data.coord.lat}
                            Lon={data.coord.lon}
                            Description={data.weather[0].description}
                            Temp={data.main.temp}
                            FeelsLike={data.main.feels_like}
                            Humidity={data.main.humidity}
                            WindSpeed={data.wind.speed}
                            WindDeg={data.wind.deg}
                            WindGust={data.wind.gust}
                            Country={data.sys.country}
                            Sunrise={data.sys.sunrise}
                            Sunset={data.sys.sunset}
                        />
                    </div>
                </div>
            </Tilty>
        );
    }
    

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
            {!loading ? weather : weather = tiltySpinner}
        </div>
    )
};

export default Searchbar;