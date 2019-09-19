'use strict';

const express 	= require("express"); 
const router = express.Router();
const app 	= express();
const request 	= require("request");

const usersUrl = "http://www.mocky.io/v2/5808862710000087232b75ac";
const policiesUrl = "http://www.mocky.io/v2/580891a4100000e8242b75c5";


router.get('/username/:username', async (req, res, next) => {
  const {username} = req.params;

  const requestAsync = url => {
    return new Promise((resolve, reject) => {
      request(url, (err, response, body) => {
        if (err) {
            reject(err);
        } else if (response.statusCode !== 200) {
            reject(new Error("response.statusCode = " + response.statusCode));
        } else {
            resolve(body);
        }
      });
    });
  }


  const getData = endpoints => {
      return Promise.all(endpoints.map((url) => {
          return requestAsync(url);
      }));
  }

  const endpoints = [usersUrl, policiesUrl];
  getData(endpoints).then((results) => {
    const usersJson = JSON.parse(results[0]);
    const policiesJson = JSON.parse(results[1]);
    let policie = null;
    const user = usersJson.clients.find( client => client.name === username);
    if(user) {
      policie = policiesJson.policies.filter( policie => policie.clientId === user.id );
    }
    if(policie) {
      if(user.role === 'admin') {
        res.send(policie)
      } else {
        res.send('<h1>User unauthorized</h1>')
      }
    } else if(user) {
      res.send('<h1>Policie not found</h1>')
    } else {
      res.send('<h1>User not found</h1>')
    }
  }).catch(err => {
      
  });
})

module.exports = router;