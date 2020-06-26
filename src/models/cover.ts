import {TextType} from "./text";

export interface CoverType {
    back: { image: string; color: string; }
    image: string;
    name: TextType;
    author: TextType;
    size: string;
    description: TextType;
}
