import { useState } from 'react'
import styles from './article.module.scss'

export default function Article({ title, text, id }) {
    var [display, setDisplay] = useState(styles.hidden);
    var [edit, setEdit] = useState(true)

    function toggleDisplay() {
        setDisplay(display == styles.hidden ? styles.enlarged : styles.hidden)
    }

    function toggleEdit() {
        setEdit(!edit)
    }

    async function submit(e) {
        console.log(e.target)

        const res = await fetch('/api/articleUpdate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: e.target.title.value, text: e.target.text.value, id: e.target.id.value }),
        })

        e.preventDefault()
    }

    return (edit ?
        (
            <>
                <div className={styles.container} onClick={toggleDisplay}>
                    <h1 className={styles.titleText}>{title}</h1>
                </div>
                <div className={display}>
                    <div className={styles.control}>
                        <button className={styles.editBtn} onClick={toggleEdit}>EDIT</button>
                        <button className={styles.editBtn} onClick={toggleDisplay}>CLOSE</button>
                    </div>
                    <form onSubmit={submit}>
                        <input type="hidden" name="id" value={id} />
                        <input type="text" defaultValue={title} name="title" className={styles.titleInput} />
                        <div className={styles.textWrapper}>
                            <textarea type="text" name="text" className={styles.textInput} defaultValue={text} />
                        </div>
                        <button type="submit" className={styles.submitBtn}>SUBMIT</button>
                    </form>
                </div>
            </>
        ) : (
            <>
                <div className={styles.container} onClick={toggleDisplay}>
                    <h1 className={styles.titleText}>{title}</h1>
                </div>
                <div className={display}>
                    <div className={styles.control}>
                        <button className={styles.editBtn} onClick={toggleEdit}>EDIT</button>
                        <button className={styles.editBtn} onClick={toggleDisplay}>CLOSE</button>
                    </div>
                    <h1>{title}</h1>
                    <div className={styles.textWrapper}>
                        <p className={styles.text} dangerouslySetInnerHTML={{ __html: textToMarkdown(text) }}></p>
                    </div>
                </div>
            </>
        ))
}

function textToMarkdown(text) {
    text = text.replace(new RegExp(escapeRegExp("<red>"), 'g'), `<span class="${styles.red}">`)
    text = text.replace(new RegExp(escapeRegExp("<green>"), 'g'), `<span class="${styles.green}">`)
    text = text.replace(new RegExp(escapeRegExp("<blue>"), 'g'), `<span class="${styles.blue}">`)
    text = text.replace(new RegExp(escapeRegExp("</>"), 'g'), "</span>")
    text = text.replace(new RegExp("-> ", "g"), "        ")
    text = text.replace(/(?:\r\n|\r|\n)/g, `<lineBreak class="${styles.lineBreak}"></lineBreak>`);
    return text;
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}