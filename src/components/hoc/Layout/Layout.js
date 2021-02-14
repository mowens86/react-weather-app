import React from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.scss';

const layout = props => {

    return (
        <Auxiliary>
            <main className={classes.Layout}>
                {props.children}
            </main>
        </Auxiliary>
    )
};

export default layout;