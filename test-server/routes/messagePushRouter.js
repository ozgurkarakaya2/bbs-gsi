var express = require('express');
var messagePushRouter = express.Router();
var request = require('request');

messagePushRouter.route('')

    .post(function (req, res, next) {
        // console.log("messagePush : RequestReceived");
        var headers = {
            'Content-Type': 'application/json',
            'Authorization':'key=AIzaSyC5u5Xc9EGk1s41UoRKXA8SJfyKzKq373k',
            'TTL':'60',
            'Access-Control-Allow-Origin': 'https://android.googleapis.com'
        };

        var pushServiceURL = req.body.pushServiceURL;
        // Configure the request
        var options = {
            url: pushServiceURL,
            method: 'POST',
            headers: headers
        };
        console.log("messagePush : options set");
        // Start the request
        request(options, function (error, response, body) {
            if (response.statusCode == 201) {
                // Print out the response body
                console.log("response : "+JSON.stringify(response));
                res.json("messagePush : success");
                console.log("messagePush : success");
            }else{
                console.log("response : "+JSON.stringify(response));
                console.log("messagePush : error : " + JSON.stringify(error));
                res.json("messagePush : error");
            }
        });
    })
;

module.exports = messagePushRouter;
