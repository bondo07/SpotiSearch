const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');



const app = express();


app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhose:3000',
        clientId: '60e95acabd45469ea7a6e3fb3b1048a8',
        clientSecret: 'd2a05c2e8fcb432989389afed3c35159',
})

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch(() => {
        res.sendStatus(400)
    })
})