import React from 'react';
import { currentTime } from '../../Helpers/Helpers';
import classes from './SearchResults.module.scss';

const searchResults = props => {

    // if(props.Alert) alert(props.Alert); // This works but make a modal for it
    

    return (
        <div className={classes.Content}>
            <div className={classes.ImgBox}>
                {/* <img src={} /> */}
                <h4>{props.Name}</h4>
                <p>{props.Desc} | {props.Time}</p>
            </div>
            <div>
                <h2>{props.Temp}°F</h2>
                <div className={classes.ContentFlex}>
                    <p>Feels like: {props.FeelsLike}°F | Humidity: {props.Humidity}%</p>
                </div>
            </div>
        </div>
    );
};

export default searchResults;