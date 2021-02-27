import React from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.scss';

const layout = props => {

    return (
        <Auxiliary>
            <div className={classes.Cloud}>
            <main className={classes.Layout}>
                {props.children}
            </main>
            </div>
        </Auxiliary>
    )
};

export default layout;