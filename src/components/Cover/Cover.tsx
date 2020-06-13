import React from "react";
import classes from './Cover.module.scss'
import {Text} from "../Text/Text";
import {Image} from "../Image/Image";
import {CoverType} from "../../models/cover";

export function Cover() {
    const data: CoverType = {
        image: '',
        author: 'Nadegda Davlichina',
        name: 'Fall coming',
        back: {color: 'rgba(255,255,0,.5)', image: ''},
        size: '45x45',
        colors: 'Палитра DMS'
    }

    return (
        <Image image={data.back.image} className={classes.cover}>
            <Text text={'test'}/>
            <Image image={data.image}/>
        </Image>
    )
}
