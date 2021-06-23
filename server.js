const express = require('express');
const fs = require('fs');
const { promisify } = require('util');
const { v4 } = require('uuid');

//var https = require('https'); // MP

const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);

// make sure messages folder exists
const messageFolder = './public/messages/';
if (!fs.existsSync(messageFolder)) {
  fs.mkdirSync(messageFolder);
}

const app = express();

//const bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(express.json({limit: '50mb'}));

/*var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); */

app.get('/messages', (req, res) => {
  readdir(messageFolder)
    .then(messageFilenames => {
      res.status(200).json({ messageFilenames });
    })
    .catch(err => {
      console.log('Error reading message directory', err);
      res.sendStatus(500);
    });
});

app.post('/messages', (req, res) => {
	
  // var firstName = req.getElementById('FirstName');
  //var myvar = req.body.message;
  var fName_value = req.body.fname;
  var lName_Value = req.body.lname;
  // var lastName  = document.getElementById('lastName');
  
  if (!req.body.message) {
    return res.status(400).json({ error: 'No req.body.message' });
  }
  const messageId = v4();
  // writeFile(messageFolder + messageId + fName + '.wav', req.body.message, 'base64')
  writeFile(messageFolder + fName_value + "-" + lName_Value +"_" + formatted_date() +  '.wav', req.body.message, 'base64')
  // writeFile(messageFolder + firstName + '.wav', req.body.message, 'base64')
    .then(() => {
      res.status(201).json({ message: 'Saved message' });
    })
    .catch(err => {
      console.log('Error writing message to file', err);
      res.sendStatus(500);
    });
});

const PORT = process.env.PORT || 3000;
//const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} ${formatted_date()}`);
});

function formatted_date()
{
   var result="";
   var d = new Date();
   /*result += d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate() + 
             "_"+ d.getHours()+":"+d.getMinutes()+":"+
             d.getSeconds(); //+" "+d.getMilliseconds();*/
	result += (d.getMonth()+1)+"-"+d.getDate() + 
		"_"+ d.getHours()+"-"+d.getMinutes()+"-"+
        d.getSeconds(); //+" "+d.getMilliseconds();
   return result;
}

/*app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});*/

/*https.createServer({
	cert: fs.readFileSync('server.crt'),
	key: fs.readFileSync('server.key')
}, app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
}));*/

//app.listen(PORT, "0.0.0.0");
