import { useState } from "react"

import styles from './adminPage.module.scss'

export default ({ rawArticles }) => {
    var articles = JSON.parse(rawArticles)

    return (
        <>
            <h1>Admin</h1>
            <div className={styles.container}>
                {articles.map((article) => {
                    return <EditArticle rawTitle={article.title} rawText={article.text} rawIndex={article.index} id={article._id} />
                })}
            </div>
        </>

    )
}

function EditArticle({ rawTitle, rawText, rawIndex, id }) {
    var [title, setTitle] = useState(rawTitle)
    var [text, setText] = useState(rawText)
    var [index, setIndex] = useState(rawIndex)
    var [changed, setChanged] = useState(false)

    async function submit(e) {
        e.preventDefault()

        console.log(e.target.title.value)

        await fetch('/api/articleUpdate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: e.target.title.value, text: e.target.text.value, index: e.target.index.value, id: e.target.id.value }),
        })

        setChanged(false)
    }

    return (
        <form className={styles.form} onSubmit={submit}>
            <input type="hidden" name="id" value={id} />
            <input className={styles.title} type="text" name="title" value={title} onChange={(e) => { setTitle(e.target.value); setChanged(true) }} />
            <input className={styles.index} type="text" name="index" value={index} onChange={(e) => { setIndex(e.target.value); setChanged(true) }} />
            <button className={changed ? styles.submit : styles.saved} disabled={!changed} type="submit">{changed ? "SAVE" : "SAVED"}</button>
            <textarea className={styles.text} name="text" value={text} onChange={(e) => { setText(e.target.value); setChanged(true) }} />
        </form>
    )
}