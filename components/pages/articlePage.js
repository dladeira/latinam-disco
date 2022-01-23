import { useUser } from '../../lib/hooks'
import Bubble from '../bubble'

import styles from './articlePage.module.scss'

export function ArticlePage({ articles }) {
    const user = useUser({ redirectTo: '/login' })
    var articleRows = toRows(articles)

    return (user ? (
        <div>
            {articleRows.map((articleRow) => {
                return <ArticleRow articles={articleRow} />
            })}
        </div>
    ) : (<div />))
}

function ArticleRow({ articles }) {
    return (
        <div className={styles.row} key={Math.random().toString(36)}>
            {articles.map((article) =>
                <Bubble title={article.title}>
                    <h1 className={styles.title}>{article.title}</h1>
                    <div className={styles.textWrapper}>
                        <p className={styles.text} dangerouslySetInnerHTML={{ __html: textToMarkdown(article.text) }}></p>
                    </div>
                </Bubble>
            )
            }
        </div>
    )
}

// HELPER FUNCTIONS

function toRows(articles) {
    var articleRows = [[]]

    for (var article of articles) {
        if (article.index) {
            if (!articleRows[article.index])
                articleRows[article.index] = []

            articleRows[article.index].push(article)
        } else {
            articleRows[0].push(article)
        }
    }

    return articleRows;
}

function textToMarkdown(input) {
    input = input.replace(new RegExp(escapeRegExp("<red>"), 'g'), `<span class="${styles.red}">`)
    input = input.replace(new RegExp(escapeRegExp("<green>"), 'g'), `<span class="${styles.green}">`)
    input = input.replace(new RegExp(escapeRegExp("<blue>"), 'g'), `<span class="${styles.blue}">`)
    input = input.replace(new RegExp(escapeRegExp("<subtitle>"), 'g'), `<span class="${styles.subtitle}">`)
    input = input.replace(new RegExp(escapeRegExp("</>"), 'g'), "</span>")
    input = input.replace(new RegExp("-> ", "g"), "        ")
    input = input.replace(/(?:\r\n|\r|\n)/g, `<lineBreak class="${styles.lineBreak}"></lineBreak>`);
    return input;
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${ }()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}