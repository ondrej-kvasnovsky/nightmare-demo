# Nightmare Demo

Nightmare (Electron) demo that intercepts headers and takes screen shot of a web page. 
It starts REST API server to accept requests to take print screen of a web page. 

## Usage

```
curl "http://localhost:4444/?url=https://github.com&apiKey=some-key&apiUrl=http://localhsot:3000&proxy=localhsot:3001"
```

### Run

Run on local (for MacOS).
```
$ npm install
$ DEBUG=nightmare:*,electron:* node server.js
```

Run on Ubuntu

Install all required libraries
```
$ apt-get update
$ apt-get install npm
$ npm install -g pm2
$ npm install -g nightmare@git+https://github.com/twolfson/nightmare.git#dev/fix.multiple.concurrent.frames
$ apt-get install -y xvfb cron libgtk-3-0 libasound2 xdg-utils libxss1 libnss3 \
  lsb-release gconf-service libappindicator1 fonts-liberation \
  python python-pip python-setuptools ca-certificates groff less python-dev logrotate
$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
$ sudo apt-get install -y nodejs
$ npm install xvfb
$ npm install
```

Run the server using one of these: 
```
$ node xvfb-app.js
$ DEBUG=nightmare:*,electron:* node xvfb-app.js
$ pm2 -i max start xvfb-app.js
```
