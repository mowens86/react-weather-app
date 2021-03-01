import React, { useState, useEffect } from 'react';

import { titleCase } from '../Helpers/Helpers';
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
    const [ lat, setLat ] = useState('');
    const [ lon, setLon ] = useState('');
    const [ search, setSearch ] = useState('');
    const [ data, setData ] = useState(null); // Set to null initially lets the data be used conditionally
    const [ url, setUrl ] = useState(
        `https://api.openweathermap.org/data/2.5/weather?q=${titleCase(cityName)}&appid=${API_Key}`
        );
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            setError(false);
            setLoading(true);
    
            try {
                const result = await axios(url);
                setData(result.data);
                setUrl(
                    `https://api.openweathermap.org/data/2.5/onecall?lat=${result.data.coord.lat}&lon=${result.data.coord.lon}&exclude=minutely,hourly&appid=${API_Key}`
                    );
                const newResult = await axios(url);
                setData(newResult.data);
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
            `https://api.openweathermap.org/data/2.5/weather?q=${titleCase(search)}&appid=${API_Key}`
            );
        setCityName(titleCase(search));
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
            <Tilty glare scale={1.03}>
                <div className={classes.Container}>
                    <div className={classes.Card}>
                        <SearchResults 
                            key={searchKeys++}
                            Name={cityName.replace('+', ' ')}
                            // Temp={data.current.temp}
                            // FeelsLike={data.current.feels_like}
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