import React, {ReactEventHandler, useEffect, useRef, useState} from "react";
import classes from './Text.module.scss'
import cls from 'classnames';

export interface TextPropsType {
    text: string;
    onSave?: (text: string) => void;
    className?: string;
}

export function Text({text, onSave, className}: TextPropsType) {

    const [inputText, setInputText] = useState(text);
    const [inputVisible, setInputVisible] = useState(false);
    const inputRef = useRef<HTMLInputElement>(document.createElement("input"));

    function onChange({target}: any) {
        setInputText(target.value);
    }

    function onBlur() {
        setInputText(text);
        setInputVisible(false);
    }

    function onKeyDown(e: React.KeyboardEvent) {
        switch (e.key) {
            case 'Enter':
                onSave && onSave(inputText);
                setInputVisible(false);
                break;
            case 'Escape':
                setInputText(text);
                setInputVisible(false);
                break;
            default:
                return
        }

        if (e.key === 'Enter') {
            onSave && onSave(inputText);
        }
        setInputVisible(false);
    }

    function onClick(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        e.stopPropagation();
        e.preventDefault();
        if (!inputVisible) {
            setInputVisible(true);
        }
    }

    useEffect(() => {
        if (inputVisible) {
            (inputRef as any).current.focus();
        }
    }, [inputVisible])

    return (
        <span className={cls(classes.text, className)} onContextMenu={onClick}>
            {text}
            {inputVisible && <div className={classes.editor}>
                <input ref={inputRef} onChange={onChange} value={inputText} onBlur={onBlur} onKeyDown={onKeyDown}/>
            </div>}
        </span>
    );
}
