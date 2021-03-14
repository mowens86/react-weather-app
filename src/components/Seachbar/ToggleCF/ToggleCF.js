import React from 'react';
import classes from './ToggleCF.module.scss';

const toggle = props => {

    return (
        <label className={classes.Switch}>
            <input type="checkbox" onClick={props.toggleSwitch}/>
            <span className={`${classes.Slider} ${classes.Round}`}></span>
        </label>
    )
};

export default toggle;
