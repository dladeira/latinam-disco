import { useEffect } from 'react'
import Article from '../components/learn/article'
import { useUser } from '../lib/hooks'

export default function Learn({ articles }) {
    const user = useUser({ redirectTo: '/login' })

    var articleRows = [[], [], [], [], []]

    for (var article of articles) {
        if (article.index) {
            articleRows[article.index].push(article)
        } else {
            articleRows[0].push(article)
        }
    }

    return (user ? (
        <div className="container">
            {articleRows.map((articleRow) => {
                return (<div className="row" key={Math.random().toString(36)}>{articleRow.map((article) => <Article key={article.title} rawTitle={article.title} rawText={article.text} id={article._id} admin={user.admin} />)}</div>)
            })}
            <style jsx>{`
        .container {
          margin: 50px;
        }
        .row {
            display: flex;
            flex-direction: row;

            width: 40%;

            margin: 0 auto;
        }
      `}</style>
        </div>
    ) : (
        <>
        </>
    )
    )
}

Learn.getInitialProps = async ({ req }) => {
    if (req) { // SERVER-SIDE
        const res = await fetch(process.env.ORIGIN + "/api/articles")
        const json = await res.json()
        return {
            articles: json
        }
    } else { // CLIENT-SIDE
        const res = await fetch("/api/articles")
        const json = await res.json()
        return {
            articles: json
        }
    }

}
