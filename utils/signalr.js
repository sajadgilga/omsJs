const signalr = require('node-signalr')

// const signalr = require('signalr-client')

class SignalR {
    constructor(baseurl, username, password) {
        this.baseurl = baseurl
        this.client = new signalr.client("https://boursei.ephoenix.ir/realtime", ['OmsClientTokenHub'])
        this.client.headers['token'] = ''
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
        this.client.connection.hub.on('OmsClientTokenHub', 'GetNewAPIToken', (message) => {
            console.log('receive:', message)
        })
        this.client.start()
        setTimeout(() => {
            this.login('','')

        }, 1000)
        // this.client.connection.hub.call('OmsClientTokenHub', 'GetNewAPIToken', ['samin', '123456789']).then((res) => {
        //     console.log("result").catch((err) => {
        //         console.log("error happened:", err)
        //     })
        // })

        // this.client = new signalr.client(
        //     //signalR service URL
        //     "https://boursei.ephoenix.ir/realtime",
        //
        //     // array of hubs to be supported in the connection
        //     ['OmsClientTokenHub'], 10, true
        //     //, 10 /* Reconnection Timeout is optional and defaulted to 10 seconds */
        //     //, false /* doNotStart is option and defaulted to false. If set to true
        //     // client will not start until .start() is called */
        // )
        // this.client.serviceHandlers.connected = () => {
        //     console.log("connected")
        // }
        // this.client.serviceHandlers.onerror = (e) => {
        //     console.log('error')
        // }
        // this.client.serviceHandlers.onUnauthorized = (e) => {
        //     console.log('unauthorized')
        // }
        // this.client.start()
        // setTimeout(() => {
        //     this.login('','')
        //
        // }, 1000)
    }

    login(username, pass) {
        // this.client.connection.hub.call('OmsClientTokenHub', 'GetNewAPIToken', ['samin', '123456789']).done((err, res) => {
        //     console.log(err)
        //     console.log(res)
        // })
        this.client.connection.hub.call('OmsClientTokenHub', 'GetNewAPIToken', 'samin', '123456789').then((result) => {
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
