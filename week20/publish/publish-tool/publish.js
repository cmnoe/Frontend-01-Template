const http = require('http')
const querystring = require('querystring')
const fs = require('fs')
const archiver = require('archiver')
const child_process = require('child_process')

let packname = './package'
// fs.stat(filename, (error, stat) => {

    const redirect_uri = encodeURIComponent("http://localhost:8081/auth")
    child_process.exec(`start chrome https://github.com/login/oauth/authorize?client_id=Iv1.c58670b69a1ee597&redirect_uri=${redirect_uri}&scope=read%3Auser&state=cmnoe`)


    const server = http.createServer((request, _response) => {
        let token = request.url.match(/token=([^&]+)/)[1]
        const options = {
            host: 'localhost',
            port: 8081,
            path: `/?filename=package.zip`,
            method: 'POST',
            headers: {
                'token': token,
                'Content-Type': 'application/octet-stream'
            }
        }

        const req = http.request(options, res => {
            console.log(`STATUS: ${res.statusCode}`)
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
        })
    
        req.on('error', e => {
            console.error(`problem with request: ${e.message}`)
        })
    
        var archive = archiver('zip', {
            zlib: { level: 9 }
        })
    
        archive.directory(packname, false)
        archive.finalize()
    
        archive.pipe(req)
        
        // let readStream = fs.createReadStream(packname)
        // readStream.pipe(req)
        archive.on('end', _ => {
            req.end()
            console.log('publish success!!');
            server.close()
        })
    })
    server.listen(8080)
// })





