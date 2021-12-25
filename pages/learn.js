import { useEffect } from 'react'
import Article from '../components/learn/article'
import { useUser } from '../lib/hooks'

export default function Learn({ articles }) {
    const user = useUser({ redirectTo: '/' })
    
    return (user ? (
        <>
            {articles.map((article) => <Article title={article.title} text={article.text} id={article._id} admin={user.admin} />)}
        </>
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