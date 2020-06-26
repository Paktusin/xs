import React, {useEffect, useMemo, useState} from "react";
import classes from './Cover.module.scss'
import {Text} from "../Text/Text";
import {Image} from "../Image/Image";
import {CoverType} from "../../models/cover";
import LocalStorageService from "../../components/localStorageService";

const defaultProject = {
    image: '',
    author: {text: 'Nadegda Davlichina', color: 'black'},
    name: {text: 'Fall coming', color: 'white'},
    back: {color: 'rgba(255,255,0,.5)', image: ''},
    size: '45x45',
    colors: {text: 'Палитра DMS', color: 'white'}
};

export function Cover() {
    const service = useMemo(() => new LocalStorageService('xs'), []);
    const [data, setData] = useState<CoverType>(service.get('test', defaultProject));

    useEffect(() => {
        console.log(data);
        service.put('test', data)
    }, [data])

    return (
        <div className={classes.coverContainer}>
            <Image image={data.back.image} className={classes.cover}
                   onChange={image => setData({...data, back: {...data.back, image}})}>
            </Image>
            <Text text={data.author} className={classes.author} onSave={author => setData({...data, author})}/>
            <Image image={data.image} className={classes.mainImage} onChange={image => setData({...data, image})}/>
            <Text text={data.name} className={classes.name} onSave={name => setData({...data, name})}/>
        </div>
    )
}
