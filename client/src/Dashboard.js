import useAuth from './useAuth'
import { Container, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
    clientId: '60e95acabd45469ea7a6e3fb3b1048a8',
})

const Dashboard = ({code}) => {
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])

    const accessToken = useAuth(code)

    const handleChange = (e) => setSearch(e.target.value);


    useEffect(() => {
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])


    useEffect(() => {
        if(!search) return setSearchResults([])
        if(!accessToken) return

        spotifyApi.searchTracks(search).then(res => {
            console.log(res) //Getting errors on searching 
        })
    }, [search, accessToken])

    return ( 
        <Container className='d-flex flex-column py-2' style={{height: '100vh'}}>
            <Form.Control type='search' placeholder='Search Songs/Artists' value={search} onChange={handleChange}/>
            <div className='flex-grow-1 my-2' style={{ overflowY: 'auto'}}>Songs</div>
            <div>Bottom</div>
        </Container>
     );
}
 
export default Dashboard;