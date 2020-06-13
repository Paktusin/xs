import React, {useEffect, useRef, useState} from "react";
import classes from './Text.module.scss'

export interface TextPropsType {
    text: string;
    onSave?: (text: string) => void;
}

export function Text({text, onSave}: TextPropsType) {

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


    function onClick() {
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
        <span onClick={onClick}>
            {text}
            {inputVisible && <div className={classes.editor}>
                <input ref={inputRef} onChange={onChange} value={inputText} onBlur={onBlur}/>
                <button onClick={e => onSave && onSave(inputText)}>OK</button>
            </div>}
        </span>
    );
}
