import React, {useEffect, useMemo, useState} from "react";
import classes from './Cover.module.scss'
import {Text} from "../Text/Text";
import {Image} from "../Image/Image";
import {CoverType} from "../../models/cover";
import LocalStorageService from "../../services/localStorage";

const defaultProject = {
    image: '',
    author: 'Nadegda Davlichina',
    name: 'Fall coming',
    back: {color: 'rgba(255,255,0,.5)', image: ''},
    size: '45x45',
    colors: 'Палитра DMS'
};

export function Cover() {
    const service = useMemo(() => new LocalStorageService('xs'), []);
    const [data, setData] = useState<CoverType>(service.get('test', defaultProject));

    useEffect(() => {
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
