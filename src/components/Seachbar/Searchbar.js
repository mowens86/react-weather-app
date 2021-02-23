import React, { useState, useEffect } from 'react';

import Logo from './Logo/Logo';
import Input from './Input/Input';
import ToggleCF from './ToggleCF/ToggleCF';
import SearchResults from './SearchResults/SearchResults';
import classes from './Searchbar.module.scss';
import axios from 'axios';
import Spinner from '../UI/Spinner/Spinner';

const Searchbar = props => {
    const [ search, setSearch ] = useState('');
    const [ data, setData ] = useState({ data: [] });
    const [ url, setUrl ] = useState(`
        https://api.openweathermap.org/data/2.5/weather?q=los+angeles&appid=${process.env.REACT_APP_WEATHER_API_KEY}`);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setError(false);
            setLoading(true);

            try {
                const result = await axios(url);
                console.log(result);
                setData(result.data);
            } catch (err) {
                setError(true);
            }
            setLoading(false);
        };
        fetchData();
    }, [url]);

    const searchHandler = (event) => {
        event.preventDefault();
        setUrl(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`);
    };


    const weatherElements = [];
    for (const [ key, value ] of Object.entries(data)) {
        weatherElements.push({ [key]: value })
    }
    console.log(weatherElements);
    
    let weather = weatherElements.map(element => (
        <SearchResults 
            // Lat={element.coord.lat}
            // Lon={element.coord}
            Name={element.name}
            Timezone={element.timezone}
        />
    ));




    return (
        <ul className={classes.Searchbar}>
            {/* <li>
                <Logo />
            </li> */}
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
            <li>
                {weather}

            </li>
        </ul>
    )
};

export default Searchbar;