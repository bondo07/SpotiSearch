import useAuth from './useAuth'
import { Container, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from './TrackSearchResult';
import Player from './Player';

const spotifyApi = new SpotifyWebApi({
    clientId: '0fd5af8b613d4d009f7a6f0f3238a61e',
})

const Dashboard = ({code}) => {
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()

    

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
            <div className='flex-grow-1 my-2' style={{ overflowY: 'auto'}}>
                {searchResults.map(track => (
                    <TrackSearchResult track={track} key= {track.uri}/>
            ))}</div>
            <div><Player accessToken={accessToken} /></div>
        </Container>
     );
}
 
export default Dashboard;