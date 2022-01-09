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
                console.log(articleRow)
                return (<div className="row">{articleRow.map((article) => <Article rawTitle={article.title} rawText={article.text} id={article._id} admin={user.admin} />)}</div>)
            })}
            <style jsx>{`
        .container {
          margin: 50px;
        }
        .row {
            display: flex;
            flex-direction: row;

        }
      `}</style>
        </div>
    ) : (
        <>
        </>
    )
    )
}

Learn.getInitialProps = async () => {
    const res = await fetch("http://localhost:3000/api/articles")
    const json = await res.json()
    return {
        articles: json
    }
}