import { Link } from 'react-router-dom';

export default function LogInMessage() {
    return (
        <>
            <Link to='/login'><p>Please log in / sign up before booking.</p></Link>
        </>
    )
}