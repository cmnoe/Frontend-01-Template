const http = require('http')
const fs = require('fs')
const unzip = require('unzipper')
const https = require('https')

const server = http.createServer((req, res) => {

    if (req.url.match(/^\/auth/)) {
        return auth(req, res)
    }
    if (!req.url.match(/^\/?/)) {
        res.writeHead(404, { 
            'Content-Type': 'text/plain' 
        })
        res.end('not found')
        return
    }
    
    const options = {
        hostname: 'api.github.com',
        port: 443,
        path: `/user`,
        method: 'GET',
        headers: {
            Authorization: `token ${req.headers.token}`,
            "User-Agent": "cmnoe-toy-publish"
        }
    }

    const request = https.request(options, response => {
        let body = ''
        response.on('data', d => {
            body += d.toString()
        })
        response.on('end', _ => {
            let user = JSON.parse(body)
            console.log(user);
            let writeStream = unzip.Extract({path: '../server/public'})
            req.pipe(writeStream)
            req.on('end', _ => {
                res.writeHead(200, { 'Content-Type': 'text/plain' })
                res.end('okay')
            })
        })
    })

    request.on('error', e => {
        console.error(e);
    })
    request.end()
})

function auth(req, res) {
    const code = req.url.match(/code=([^&]+)/)[1],
        state = 'cmnoe',
        client_secret = "f60bb4fd1ea50bd30cc2e6d5cd5f88380d662535",
        client_id = "Iv1.c58670b69a1ee597",
        redirect_uri = encodeURIComponent("http://localhost:8000/auth")

    const params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`

    const options = {
        hostname: 'github.com',
        port: 443,
        path: `/login/oauth/access_token?${params}`,
        method: 'POST'
    }

    const request = https.request(options, response => {
        response.on('data', d => {
            let result = d.toString().match(/access_token=([^&]+)/)
            if (result) {
                let token = result[1]
                res.writeHead(200, { 
                    'access_token': token,
                    'Content-Type': 'text/html' 
                })
                res.end(`<a href="http://localhost:8080/publish?token=${token}">publish</a>`)
            } else {
                res.writeHead(200, { 
                    'Content-Type': 'text/plain' 
                })
                res.end('error')
            }
        })
    })

    request.on('error', e => {
        console.error(e);
    })
    request.end()

    // res.writeHead(200, { 'Content-Type': 'text/plain' })
    // res.end('okay')
}

server.listen(8081)