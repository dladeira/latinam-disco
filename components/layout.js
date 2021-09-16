import Head from 'next/head'
import Header from './gobal/header'

const Layout = (props) => (
    <>
        <Head>
            <title>Disco Latinam</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Unkempt:wght@700&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@700,500,400&display=swap" rel="stylesheet" /> 
        </Head>

        <Header />
        <div className="container">{props.children}</div>
    </>
)

export default Layout
