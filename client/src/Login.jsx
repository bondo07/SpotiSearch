import { Container } from 'react-bootstrap'


const Login = () => {
    const client_id = '60e95acabd45469ea7a6e3fb3b1048a8'
    const redirect_uri = 'http://localhost:3000'

    const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`


    return ( 
        <Container className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh'}}>
            <a className='btn btn-success btn-lg' href={AUTH_URL}>Login with Spotify</a>
        </Container>
     );
}
 
export default Login;