const signalr = require('node-signalr')

class SignalR {
    constructor(baseurl, username, password) {
        this.baseurl = baseurl
        this.client = new signalr.client('https://boursei.exphoenixtrade.com/realtime/', ['GetNewAPIToken'])
        this.client.callTimeout = 10000 // 10's, default 5000
        this.client.reconnectDelayTime = 2000 // 2's, default 5000
        this.client.requestTimeout = 2000 // 2's, default 5000
        this.client.on('connected', () => {
            console.log('SignalR client connected.')
        })
        this.client.on('error', (code, ex) => {
            console.log(`SignalR this.client connect error: ${code}. `)
            console.log(signalr.error)
        })
        this.client.connection.hub.on('GetNewAPIToken', 'GetNewAPIToken', (message) => {
            console.log('receive:', message)
        })
        this.client.start()
        // this.client.connection.hub.invoke('GetNewAPIToken', 'GetNewAPIToken', message)
    }

    login(username, pass) {
        this.client.connection.hub.call('GetNewAPIToken', 'GetNewAPIToken', ['samin', '123456789']).then((result) => {
            console.log('success:', result)
        }).catch((error) => {
            console.log('error:', error)
        })
    }

    kill() {
        this.client.end()
    }
}

module.exports = SignalR;
