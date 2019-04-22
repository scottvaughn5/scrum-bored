const express = require('express'), 
path = require('path'),
api = require('./api/routes')
var db = require("./database/database").database;
const app = express();
var errorHandler = require('errorhandler'),
logger = require('morgan'),
bodyParser = require('body-parser'),
router = express.Router();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use(express.json());
app.use(bodyParser.urlencoded({  extended: true })); 
app.use(logger('dev'));

app.set('port', process.env.PORT || 3000);
app.set('views', path.join( __dirname, '/views') );


// Get HTML file for you to write your UI
app.get('/', api.Get.Home);
app.get('/users', api.Get.Users);
app.get('/scrum', api.Get.Scrum);
app.get('/manage', api.Get.Manage);
app.get('/userpane', api.Get.UserPane);
app.get('/userstatus', api.Get.UserStatus);

app.post('/newuser', api.Post.NewUser);
app.post('/updateuser', api.Post.UpdateStatus);
app.post('/deleteuser', api.Post.DeleteUser);
if (app.get('env') == 'development'){
    app.use(errorHandler());
  }
  
  app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });