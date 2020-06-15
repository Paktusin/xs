import React, {FunctionComponent, useEffect, useMemo, useRef} from "react";
import classes from './Image.module.scss'
import cls from 'classnames';

export interface ImagePropsType {
    image: string;
    color?: string;
    className?: string;
    onChange?: (image: string) => void;
}

export const Image: FunctionComponent<ImagePropsType> = ({image, color, children, className, onChange}) => {

    const inputRef = useRef<HTMLInputElement>(document.createElement('input'))
    const reader = useMemo(() => new FileReader(), []);
    reader.onload = updateFile;

    useEffect(() => {
        inputRef.current.addEventListener('change', onInputChange);
        return () => {
            inputRef.current.removeEventListener('change', onInputChange);
        }
    }, [])

    function updateFile(event: any) {
        onChange && onChange(reader.result as string);
    }

    function onInputChange(event: any) {
        const [file] = event.target.files;
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    function onClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.stopPropagation();
        event.preventDefault();
        inputRef.current.click();
    }

    return (
        <div className={cls(className, classes.image)} style={{backgroundImage: `url(${image})`}}
             onContextMenu={onClick}>
            <input ref={inputRef} type="file" accept="image/png, image/jpeg" className={classes.input}/>
            {color && <div className={classes.color} style={{backgroundColor: color}}/>}
            {children}
        </div>
    );
}
