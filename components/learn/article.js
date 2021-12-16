import { useState } from 'react'
import styles from './article.module.scss'

export default function Article({ title, text }) {
    [display, setDisplay] = useState("none");

    function toggleDisplay() {
        setDisplay(display == "none" ? "flex" : "none");
    }

    return (
        <div className={styles.container} onClick={toggleDisplay}>
            <h1 className={styles.titleText}>{title}</h1>
            <div className={styles.enlarged}>
                <p>{title}</p>
                <p>{text}</p>
            </div>
        </div>
    )
}