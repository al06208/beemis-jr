var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var booru = require('booru');

var botID = process.env.BOT_ID;
var img1 = "https://i.groupme.com/750x750.jpeg.fccb596a974447afa82be1da05ed4d88";
var img2 = "https://i.groupme.com/800x468.png.18fa51cc5398408c8b2dcdd314f57fc4";
var img3 = "https://i.groupme.com/600x460.jpeg.3d1e2a8b8d064bfbbc677058a6f94c15";
var img0 = "https://i.groupme.com/750x750.jpeg.7d432870139d4ef78e7c9b5e774b3307";
var imgThanos = "https://i.groupme.com/1399x1407.jpeg.da79f18b4ae8401da9465f0a895ad95b";

function respond() {

    var request = JSON.parse(this.req.chunks[0]), botRegex1 = /^\/coolguy$/, botRegex2 = /.*[Nn].[Gg][Gg].[Rr].*/, botRegex3 = /^\/8ball.*/, botRegex4 = /^\/patchnotes$/, botRegex6 = /.*[Ee]nd[Gg]ame.*$/, botRegex7=/.*[Gg][Rr][Ee][Ee][Tt][Ii][Nn][Gg].*$/;
    var botRegex5 = /.*[Uu]r.*[Mm]om.*[Gg]ay.*/;


    var reg1 = botRegex1.test(request.text);
    var reg2 = botRegex2.test(request.text);
    var reg3 = botRegex3.test(request.text);
    var reg4 = botRegex4.test(request.text);
    var reg5 = botRegex5.test(request.text);
    var reg6 = botRegex6.test(request.text);
    var reg7 = botRegex7.test(request.text);
    //console.log(JSON.parse(this.req.chunks[1]));
    //console.log(JSON.parse(this.req.chunks[2]));

    if (request.sender_type === 'user') {
        if (request.text && reg1) {
            this.res.writeHead(200);
            postMessage(cool());
            this.res.end();
        }
        else if (request.text && reg2) {
            this.res.writeHead(200);
            switch (Math.floor(Math.random() * 4)) {
                case 0:
                    postImage(img0);
                    break;
                case 1:
                    postImage(img1);
                    break;
                case 2:
                    postImage(img2);
                    break;
                case 3:
                    postImage(img3);
                    break;
                default:
                    postMessage('oh god oh fuck');
                    break;
            }
            postMessage('YOU CAN\'T SAY THAT THAT\'S RACIST');
            this.res.end();
        }
        else if (request.text && reg3) {
            this.res.writeHead(200);
            switch (Math.floor(Math.random() * 3)) {
                case 0:
                    postMessage('Yes, friend');
                    break;
                case 1:
                    postMessage('I\'m sorry, no');
                    break;
                case 2:
                    postMessage('Ask again later');
                    break;
                default:
                    postMessage('oh god oh fuck');
                    break;
            }
            this.res.end();
        }
        else if (request.text && reg4) {
            this.res.writeHead(200);
            postMessage('Hi, I\'m Beemis Jr! I\'m not as fully featured as my ancestor, but I have fun commands!\nTry /8ball or /coolguy!');
            this.res.end();
        }
        else if (request.text && reg5) {
            this.res.writeHead(200);
            console.log("gay mom detected");
            switch (Math.floor(Math.random() * 3)) {
                case 0:
                    postMessage('no u');
                    break;
                case 1:
                    postMessage('ur dad lesbian');
                    break;
                case 2:
                    postMessage('no u infinity');
                    break;
                default:
                    postMessage('oh god oh fuck');
                    break;
            }
            this.res.end();
        }
        else if (request.text && reg6) {
            this.res.writeHead(200);
            postImage(imgThanos);
            this.res.end();
        }
        else if (request.text && reg7) {
            this.res.writeHead(200);
            switch (Math.floor(Math.random() * 4)) {
                case 0:
                    postMessage('Hello, friends');
                    break;
                case 1:
                    postMessage('G\'day brethen, let\'s get this bread');
                    break;
                case 2:
                    postMessage('Hi guys');
                    break;
                case 3:
                    postMessage('Death calls us all,  and we continue to ignore its sweet beckon');
                    break;
                default:
                    postMessage('Fetus deletus');
                    break;
            }
            this.res.end();
        }
        else {
            console.log("don't care");
            this.res.writeHead(200);
            this.res.end();
        }
    }
}

function postMessage(message) {
  var botResponse, options, body, botReq;

    botResponse = message;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function postImage(image) {
    var botImg, options, body, botReq;

    botImg = image;

    options = {
        hostname: 'api.groupme.com',
        path: '/v3/bots/post',
        method: 'POST'
    };

    body = {
        "bot_id": botID,
        "attachments": [
            {
            "type": "image",
            "url": botImg
            }
        ]
    };

    console.log('sending ' + botImg + ' to ' + botID);

    botReq = HTTPS.request(options, function (res) {
        if (res.statusCode == 202) {
            //neat
        } else {
            console.log('rejecting bad status code ' + res.statusCode);
        }
    });

    botReq.on('error', function (err) {
        console.log('error posting message ' + JSON.stringify(err));
    });
    botReq.on('timeout', function (err) {
        console.log('timeout posting message ' + JSON.stringify(err));
    });
    botReq.end(JSON.stringify(body));
}


exports.respond = respond;