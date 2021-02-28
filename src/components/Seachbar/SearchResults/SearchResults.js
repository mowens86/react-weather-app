import React from 'react';
import classes from './SearchResults.module.scss';

const searchResults = props => {

    const celsius = Math.round(props.Temp - 273.15);
    const fahrenheit = Math.round(((props.Temp - 273.15) * 1.8) + 32);
    const feelCels = Math.round(props.FeelsLike - 273.1);
    const feelFahr = Math.round(((props.FeelsLike - 273.15) * 1.8) + 32);



    return (
        <div className={classes.Content}>
            <div className={classes.ImgBox}>
                {/* <img src={} /> */}
                <h4>{props.Name}</h4>
                <p>{props.Description}</p>
            </div>
            <div >
                <h2>{fahrenheit}°F</h2>
                <div className={classes.ContentFlex}>
                    <p>Feels like: {feelFahr}°F</p>
                    {/* <p>Humidity: {props.Humidity}%</p>
                    <p>{props.Country}</p>
                    <p>{props.WindSpeed}</p> */}
                </div>
            </div>
        </div>
    );
};

export default searchResults;