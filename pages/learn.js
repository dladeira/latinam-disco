import { useUser } from '../lib/hooks'

export default function Learn() {
    var user = useUser({ redirectTo: '/' })

    return (
        <h1>Learn</h1>
    )
}