import { useUser } from '../../lib/hooks'
import Article from '../../models/Article'

import AdminPage from '../../components/pages/admin/adminPage'

function Page({ rawArticles }) {
    const user = useUser({ redirectTo: '/login', adminOnly: true })

    return (user && user.admin ?
        (
            <>
                <AdminPage rawArticles={rawArticles} />
            </>
        ) : <div />
    )
}



export async function getServerSideProps() {
    var articles = await Article.find({})
    var articlesData = JSON.stringify(articles)

    return {
        props: { rawArticles: articlesData }
    }
}

export default Page