import React, { useState, useEffect } from 'react';

import Logo from './Logo/Logo';
import Input from './Input/Input';
import ToggleCF from './ToggleCF/ToggleCF';
import classes from './Searchbar.module.scss';
import axios from 'axios';

const Searchbar = props => {
    const [ search, setSearch ] = useState('');

    const searchHandler = (event) => {
        event.preventDefault();
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
            .then( res => {
                // Code
                console.log(res);
            })
            .catch( err => {
                // Code
                console.log(err);
            });
    };

    return (
        <ul className={classes.Searchbar}>
            <li>
                <Logo />
            </li>
            <li>
                <form onSubmit={searchHandler}>
                    <Input
                        type="text"
                        value={search}
                        placeholder="Enter your city..."
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
    )
};

export default Searchbar;