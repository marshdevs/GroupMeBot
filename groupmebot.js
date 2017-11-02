var express = require('express');
var request = require('request');
var app = express()

function sendMessage(res) {
    var jsonRes = {
	"bot_id":"<bot_id>",
	"text":res
    };
    request.post(' https://api.groupme.com/v3/bots/post', {json: jsonRes}, function(error, response, body){
	if (!error && response.statusCode == 200) {
	    console.log(body);
	}
    });
}

app.post('/slackbot', function(req, res){
    console.log('Received a POST request.');
    req.on('data', function(chunk) {
	var message = JSON.parse(chunk.toString());

	if (message.text === "@testbank") {
	    console.log("Message received: " + message.text);
	    testBankResponse = "Test Bank: <test bank usernames and passwords>"

	    sendMessage(testBankResponse);
	}

	if (message.text === "@carport") {
	    console.log("Message received: " + message.text);
	    carPortResponse = "Carport: <car port map link>";
	    
	    sendMessage(carPortResponse);
	}

	if (message.text === "@wifi") {
	    console.log("Message received: " + message.text);
	    wifiResponse = "Wifi: <network names and passwords>";
	    
	    sendMessage(wifiResponse);
	}

	if (message.text === "@pledges") {
	    console.log("Message received: " + message.text);
	    pledgesResponse = "Pledges: <link to list of new members>";

	    sendMessage(pledgesResponse);
	}
    });
});

app.listen(6969, function(){
    console.log("Listening on Port <port_num>...");
});
