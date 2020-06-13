import React, {FunctionComponent} from "react";
import classes from './Image.module.scss'
import cls from 'classnames';

export interface ImagePropsType {
    image: string;
    color?: string;
    className?: string;
}

export const Image: FunctionComponent<ImagePropsType> = ({image, color, children, className}) => {
    return (
        <div className={cls(classes.image, className)} style={{backgroundImage: image}}>
            {color && <div className={classes.color} style={{backgroundColor: color}}/>}
            {children}
        </div>
    );
}
