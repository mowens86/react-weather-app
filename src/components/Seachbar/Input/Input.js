import React from 'react';
import Button from '../../UI/Button/Button';
import classes from './Input.module.scss';

const input = props => {

    return (
        <div>
            <form>
                <div className={classes.InputWrapper}>
                    <input 
                        className={classes.Input}  
                        placeholder="Type your city here" 
                    />
                    <Button>Search</Button>
                </div>
            </form>
        </div>
    )
};

export default input;