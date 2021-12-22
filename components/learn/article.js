import { useState } from 'react'
import styles from './article.module.scss'

export default function Article({ title, text }) {
    var [display, setDisplay] = useState(styles.hidden);

    function toggleDisplay() {
        setDisplay(display == styles.hidden ? styles.enlarged : styles.hidden);
    }

    return (
        <div className={styles.container} onClick={toggleDisplay}>
            <h1 className={styles.titleText}>{title}</h1>
            <div className={display}>
                <h1>{title}</h1>
                <p>{text}</p>
            </div>
        </div>
    )
}