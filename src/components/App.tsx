import React from 'react';
import {Cover} from "./Cover/Cover";
import styles from './App.module.scss'
import html2canvas from "html2canvas";

function App() {

    function print() {
        html2canvas(document.querySelector("#cover") as HTMLElement, {
            scrollX: 0,
            scrollY: -window.scrollY
        }).then(canvas => {
            saveAs(canvas.toDataURL(), 'cover.png');
        });
    }

    function saveAs(uri: string, filename: string) {
        const link = document.createElement('a');
        link.href = uri;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div>
            <Cover/>
            <button onClick={print} className={styles.print}>Print</button>
        </div>
    );
}

export default App;
