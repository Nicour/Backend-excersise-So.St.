'use strict';

const express 	= require("express"); 
const router = express.Router();
const app 	= express();
const request 	= require("request");

const usersUrl = "http://www.mocky.io/v2/5808862710000087232b75ac";
const policiesUrl = "http://www.mocky.io/v2/580891a4100000e8242b75c5";

router.get('/:id', (req, res, next) => {
  const {id} = req.params;
  request({
    url: usersUrl,
    json: false
  }, (error, response, body) => {  
        const usersJson = JSON.parse(body);
        const client = usersJson.clients.find(client => id === client.id)
        if (client) {
          const {id, name, email, role} = client;
          res.send({id: id, name: name, email: email, role: role}) 
        } else {
          res.send('<h1>Id Not Found</h1>')
        }         
      });
  } 
);

router.get('/username/:username', (req, res, next) => {
  const {username} = req.params;
  request({
    url: usersUrl,
    json: false
  },  (error, response, body) => {   
        const usersJson = JSON.parse(body);
        const client = usersJson.clients.find(client => username === client.name)
        if (client) {
          const {id, name, email, role} = client;
          res.send({id: id, name: name, email: email, role: role}) 
        } else {
          res.send('<h1>User Not Found</h1>')
        }        
      }
  )
});

router.get('/policieNumber/:policieId', async (req, res, next) => {
  const {policieId} = req.params;

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
    return Promise.all(endpoints.map(url => {
      return requestAsync(url);
    }));
  }

  const endpoints = [usersUrl, policiesUrl];
  getData(endpoints).then((results) => {
    const usersJson = JSON.parse(results[0]);
    const policiesJson = JSON.parse(results[1]);
    let user = null
    const policie = policiesJson.policies.find( policie => policie.id === policieId );
    if (policie) {
      user = usersJson.clients.find( client => client.id === policie.clientId);
    }
    if(user) {
      if (user.role === 'admin') {
        res.send(user)
      } else {
        res.send('<h1>User unauthorized</h1>')
      }
    } else if (policie) {
      res.send('<h1>User not found</h1>')
    } else {
      res.send('<h1>Policie Id not found</h1>')
    }
  }).catch(err => {
      
  });
})

module.exports = router;