import React, {useEffect, useMemo, useState} from "react";
import classes from './Cover.module.scss'
import {Text} from "../Text/Text";
import {Image} from "../Image/Image";
import {CoverType} from "../../models/cover";
import LocalStorageService from "../../components/localStorageService";
import {Glass} from "../Glass/Glass";

const defaultProject = {
    image: '',
    author: {text: 'Nadegda Davlichina', color: 'black'},
    name: {text: 'Test pattern', color: 'black'},
    back: {color: 'rgba(255,255,0,.5)', image: ''},
    size: '45x45',
    colors: {text: 'Палитра DMS', color: 'black'}
};

export function Cover() {
    const service = useMemo(() => new LocalStorageService('xs'), []);
    const [data, setData] = useState<CoverType>(service.get('test', defaultProject));
    const [scale, setScale] = useState<string>('0');
    const rotate = Math.random() * 6 - 3

    useEffect(() => {
        service.put('test', data)
    }, [data])

    useEffect(() => {
        const xDiff = window.innerWidth / 720;
        const yDiff = window.innerHeight / 1280;
        setScale(Math.min(xDiff, yDiff).toFixed(2));
    }, [])

    return (
        <div id={'cover'} className={classes.coverContainer}
             style={{transform: `scale(${scale})`}}>
            <Image image={data.back.image} className={classes.cover}
                   onChange={image => setData({...data, back: {...data.back, image}})}>
            </Image>
            <Glass className={classes.authorGlass}>
                <Text text={data.author} className={classes.author} onSave={author => setData({...data, author})}/>
            </Glass>
            <div className={classes.palaroid} style={{transform: `rotate(${rotate}deg)`}}>
                <Image image={data.image} className={classes.mainImage} onChange={image => setData({...data, image})}/>
                <Text text={data.name} className={classes.name} onSave={name => setData({...data, name})}/>
            </div>
        </div>
    )
}
