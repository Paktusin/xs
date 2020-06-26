import React, {useEffect, useRef, useState} from "react";
import classes from './Text.module.scss'
import cls from 'classnames';
import {TextType} from "../../models/text";

export interface TextPropsType {
    text: TextType;
    onSave?: (text: TextType) => void;
    className?: string;
}

export function Text({text, onSave, className}: TextPropsType) {

    const [inputText, setInputText] = useState<TextType>({...text});
    const [inputVisible, setInputVisible] = useState(false);
    const inputRef = useRef<HTMLInputElement>(document.createElement("input"));

    function onKeyDown(e: React.KeyboardEvent) {
        switch (e.key) {
            case 'Enter':
                onSave && onSave({...inputText});
                setInputVisible(false);
                break;
            case 'Escape':
                setInputText({...text});
                setInputVisible(false);
                break;
            default:
                return
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
        <span className={cls(classes.text, className)} onContextMenu={onClick} style={{color: text.color}}>
            {text.text}
            {inputVisible && <div className={classes.editor}>
                <input ref={inputRef}
                       onChange={e => setInputText({...inputText, text: e.target.value})}
                       value={inputText.text}
                       onKeyDown={onKeyDown}/>
                <input
                       onChange={e => setInputText({...inputText, color: e.target.value})}
                       value={inputText.color}
                       onKeyDown={onKeyDown}/>
            </div>}
        </span>
    );
}
