import Article from '../components/learn/article'
import { useUser } from '../lib/hooks'

export default function Learn() {
    var user = useUser({ redirectTo: '/' })
    
    return (
        <>
            <h1>Learn</h1>
            <Article title="Introduction" text="Latin is a cool language" />
        </>
    )
}