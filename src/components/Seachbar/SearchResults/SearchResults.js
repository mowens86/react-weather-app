import React from 'react';
import Tilty from 'react-tilty';
import Spinner from '../../UI/Spinner/Spinner';
import classes from './SearchResults.module.scss';

const searchResults = props => {


    return (
        <div>
            <div className={classes.ImgBox}>
                {/* <img src={} /> */}
            </div>
            <div className={classes.Content}>
                <p>{props.Description}</p>
                <p>{props.Country}</p>
            </div>
        </div>
    );
};

export default searchResults;