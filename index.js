var https = require('https');

const information = {
  "@testbank": "<testbank_info>",
  "@carport": "<carport_doc>",
  "@wifi": "<wifi_info>",
  "@pledges": "<pledges_doc>"
};

function getPromise(msg) {
  return new Promise((resolve, reject) => {
    var postData = {
      "bot_id": "<bot_id>",
      "text": msg
    };
        
    const options = {
      host: 'api.groupme.com',
      path: '/v3/bots/post',
      method: 'POST',
      headers: {
        'Content-Length': Buffer.byteLength(JSON.stringify(postData))
      }
    };
        
    const req = https.request(options, (res) => {
      resolve({
        'statusCode': 200,
        'body': msg,
        'isBase64Encoded': false,
        'headers': {}
      });
    });
        
    req.on('error', (e) => {
      reject({
        'statusCode': 200,
        'body': e.message,
        'isBase64Encoded': false,
        'headers': {}
      });
    });
        
    // send the request
    req.write(JSON.stringify(postData));
    req.end();
      
    console.log(JSON.stringify(postData));
  });
}

exports.handler = async (event) => {
  console.log(event);
    
  var msg = JSON.parse(event.body);
  var response = "";

  if (msg.text === "@testbank") {
    console.log("Message received: " + msg.text);
    response = "Test Bank: " + information[msg.text];
  } else if (msg.text === "@carport") {
    console.log("Message received: " + msg.text);
    response = "Carport: " + information[msg.text];
  } else if (msg.text === "@wifi") {
    console.log("Message received: " + msg.text);
    response = "Wifi: " + information[msg.text];
  } else if (msg.text === "@pledges") {
    console.log("Message received: " + msg.text);
    response = information[msg.text];
  }
     
  if (response !== "") {
    return getPromise(response);
  }
  
  return {
    'statusCode': 200,
    'body': 'Success',
    'isBase64Encoded': false,
    'headers': {}
  };
};
