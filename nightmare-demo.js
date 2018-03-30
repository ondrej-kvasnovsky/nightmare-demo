const Nightmare = require('nightmare')

module.exports = class NighmareDemo {
  constructor(proxy, apiKey) {
    this.proxy = proxy
    this.apiKey = apiKey
    Nightmare.action(
      'injectHeader',
      function(name, options, parent, win, renderer, done) {
        parent.respondTo('injectHeader', function(header, headerValue) {
          win.webContents.session.webRequest.onBeforeSendHeaders(function(details, callback) {
            details.requestHeaders[header] = headerValue
            return callback({ cancel: false, requestHeaders: details.requestHeaders })
          })
        })
        done()
        return this
      },
      function(headerValue, done) {
        this.child.call('injectHeader', apiKey, headerValue)
        return done()
      }
    )
    this.nightmare = Nightmare({
      gotoTimeout: 60000,
      switches: {
        'proxy-server': proxy,
        'ignore-certificate-errors': true
      },
      webPreferences: {
        allowRunningInsecureContent: true,
        webSecurity: false
      }
      ,
      show: true
    })
  }

  async takeScreenshot(url, apiUrl) {
    console.log(`Trying to make print screen from:   ${url}`)
    console.log(`Key to be intercepted into headers: ${this.apiKey}`)
    console.log(`API URL to get value for apiKey:    ${apiUrl}`)
    console.log(`Proxy server to be used:            ${this.proxy}`)

    const sessionId = await this.getSessionId(apiUrl)
    await this.nightmare.header(this.apiKey, sessionId)
    await this.nightmare.injectHeader(sessionId)

    const imageName = `image-${sessionId}-${Date.now()}`
    await this.nightmare
      .goto(url)
      .viewport(1280, 1024)
      .screenshot(`images/${imageName}}.jpg`)
      .end()
      .catch(error => {
        console.error('Error:', error)
      })
    console.log(`${sessionId} done`)
  }

  async getSessionId(apiUrl) {
    const axios = require('axios')
    const response = await axios.post(apiUrl)
    const sessionId = response.data.sessionId
    console.log(`${sessionId} acquired`)
    return sessionId
  }
}
