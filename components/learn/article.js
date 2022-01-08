import { useState } from 'react'
import styles from './article.module.scss'

export default function Article({ rawTitle, rawText, id, admin }) {
    var [title, setTitle] = useState(rawTitle)
    var [text, setText] = useState(rawText)
    var [display, setDisplay] = useState(styles.hidden);
    var [edit, setEdit] = useState(false)

    function toggleDisplay() {
        setDisplay(display == styles.hidden ? styles.enlarged : styles.hidden)
    }

    function toggleEdit() {
        setEdit(!edit)
    }

    async function submit(e) {
        e.preventDefault()

        await fetch('/api/articleUpdate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: e.target.title.value, text: e.target.text.value, id: e.target.id.value }),
        })

        setTitle(e.target.title.value)
        setText(e.target.text.value)

        setEdit(false)
    }

    return (edit ?
        (
            <>
                <div className={styles.container} onClick={toggleDisplay}>
                    <h1 className={styles.titleText}>{title}</h1>
                </div>
                <div className={display}>
                    <div className={styles.control}>
                        {admin ? (<button className={styles.editBtn} onClick={toggleEdit}>EDIT</button>) : (<></>)}
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
                        {admin ? (<button className={styles.editBtn} onClick={toggleEdit}>EDIT</button>) : (<></>)}
                        <button className={styles.editBtn} onClick={toggleDisplay}>CLOSE</button>
                    </div>
                    <h1 className={styles.enlargedTitle}>{title}</h1>
                    <div className={styles.textWrapper}>
                        <p className={styles.text} dangerouslySetInnerHTML={{ __html: textToMarkdown(text) }}></p>
                    </div>
                </div>
            </>
        ))
}

function textToMarkdown(input) {
    input = input.replace(new RegExp(escapeRegExp("<red>"), 'g'), `<span class="${styles.red}">`)
    input = input.replace(new RegExp(escapeRegExp("<green>"), 'g'), `<span class="${styles.green}">`)
    input = input.replace(new RegExp(escapeRegExp("<blue>"), 'g'), `<span class="${styles.blue}">`)
    input = input.replace(new RegExp(escapeRegExp("</>"), 'g'), "</span>")
    input = input.replace(new RegExp("-> ", "g"), "        ")
    input = input.replace(/(?:\r\n|\r|\n)/g, `<lineBreak class="${styles.lineBreak}"></lineBreak>`);
    return input;
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}