import React from 'react';
import classes from './Button.module.scss';

const button = props => {
    

    return (
        <button className={classes.Button}>{props.children}</button>
    )
};

export default button;