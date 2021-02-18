import React from 'react';
import Button from '../../UI/Button/Button';
import classes from './Input.module.scss';

const input = props => {

    return (
            
            <div className={classes.InputWrapper}>
                <input 
                    className={classes.Input}  
                    placeholder={props.placeholder}
                    type={props.text}
                    onChange={props.onChange}
                />
                <Button>Search</Button>
            </div>
    )
};

export default input;