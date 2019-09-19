'use strict';

const express 	= require("express"); 
const router = express.Router();
const app 	= express();
const request 	= require("request");

const usersUrl = "http://www.mocky.io/v2/5808862710000087232b75ac";
const policiesUrl = "http://www.mocky.io/v2/580891a4100000e8242b75c5";

router.get('/', (req, res) => {
	request({
	  url: usersUrl,
	  json: false
	}, (error, response, body) => {
	    if (!error && response.statusCode === 200) {
	      res.send(body) 
	    } else {
				res.send('<h1>404 Not-Found</h1>')
			}
    }
  )
});

module.exports = router;