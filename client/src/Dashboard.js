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

        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
            if(cancel) return
            setSearchResults(res.body.tracks.items.map(track => {
                const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
                    if (image.height < smallest.height) return image
                    return smallest
                }, track.album.images[0])
                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestAlbumImage.url
                }
            }))
        })

        return () => cancel = true
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