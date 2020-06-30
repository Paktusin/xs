import React, {useEffect, useRef, useState} from "react";
import classes from './Text.module.scss'
import cls from 'classnames';
import {TextType} from "../../models/text";

export interface TextPropsType {
    text: TextType;
    onSave?: (text: TextType) => void;
    className?: string;
    multi?: boolean;
}

export function Text({text, onSave, className, multi}: TextPropsType) {

    const [inputText, setInputText] = useState<TextType>({...text});
    const [inputVisible, setInputVisible] = useState(false);
    const inputRef = useRef();

    function onKeyDown(e: React.KeyboardEvent) {
        if (!e.shiftKey) {
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
        }
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
        <span className={cls(classes.text, className)}
              onContextMenu={onClick}
              style={{color: text.color}}>
            <span className={classes.content} dangerouslySetInnerHTML={{__html: text.text}}/>
            {inputVisible && <div className={classes.editor}>
                {!multi && <input ref={inputRef as any}
                                  onChange={e => setInputText({...inputText, text: e.target.value})}
                                  value={inputText.text}
                                  onKeyDown={onKeyDown}/>}
                {multi && <textarea ref={inputRef as any}
                                    onChange={e => setInputText({...inputText, text: e.target.value})}
                                    value={inputText.text}
                                    onKeyDown={onKeyDown}/>}
                <input
                    onChange={e => setInputText({...inputText, color: e.target.value})}
                    value={inputText.color}
                    onKeyDown={onKeyDown}/>
            </div>}
        </span>
    );
}
