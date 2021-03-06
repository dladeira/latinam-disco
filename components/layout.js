import Head from 'next/head'
import Header from './gobal/header'

const Layout = (props) => (
    <>
        <Head>
            <title>Latinam Disco</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&family=Unkempt:wght@700&display=swap" rel="stylesheet" /> 
        </Head>
        <Header />
        {props.children}
    </>
)

export default Layout