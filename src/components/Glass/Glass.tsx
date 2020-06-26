import React, {FunctionComponent, PropsWithChildren} from "react";
import styles from './Glass.module.scss'
import classNames from "classnames";

export interface GlassPropsType {
    className?: string
}

export const Glass: FunctionComponent<GlassPropsType> = ({children, className}) => {
    return (
        <div className={classNames(className, styles.glass)}>{children}</div>
    )
}
