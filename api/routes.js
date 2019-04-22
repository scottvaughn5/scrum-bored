var path = require('path')
var db = require("../database/database").database;

exports.Get = (function () {
    function Home(req, res) {
        res.sendFile(path.join(__dirname, 'public/views/index.html').replace("\api", ""));
    };
    function UserPane(req, res) {
        res.sendFile(path.join(__dirname, 'public/views/userpane.html').replace("\api", ""));
    };

    function Scrum(req, res) {
        res.sendFile(path.join(__dirname, 'public/views/scrum.html').replace("\api", ""));
    };
    function Manage(req, res) {
        res.sendFile(path.join(__dirname, 'public/views/manage.html').replace("\api", ""));
    };
    function Users(req, res) {
        res.send(db['users']);
    };
    function Statuses(req, res) {
        res.send(db['statuses']);
    };
    function UserStatus(req, res){
        var username = req.query.username;
        var status = db["users"].Where(w => w.username === username);
        if(typeof status[0] !== "undefined" && typeof status[0].status !== "undefined"){
            status = status[0].status;
        }else{
            status = "";
        }
        res.json({ status: status });
    }
    return {
        Home: Home,
        Users: Users,
        Statuses: Statuses,
        Scrum: Scrum,
        Manage: Manage,
        UserPane: UserPane,
        UserStatus: UserStatus
    };
})();

exports.Post = (function () {
    function NewUser(req, res) {
        try {
            db["users"].Insert({
              username: "New User",
              status: ""
            });
            res.send(true)
        } catch (err) {
            res.send(err);
        }
    };

    function UpdateStatus(req, res) {
        try{
            db["users"].Where(w => w.username === req.body.prevusername)
            .Update(u => {
                u.username = req.body.username;
                u.status = req.body.status;
            });
            db.Save();
            res.send(true);
        }catch(err){
            res.send(err);
        }
    };

    function DeleteUser(req, res){
        try{
            db["users"].Delete(d => d.username === req.body.username);
            db.Save();
            console.log("deleted " + req.body.username);
            res.send(true);
        } catch(err){
            res.send(false);
        }
    };

    return {
        NewUser: NewUser,
        UpdateStatus: UpdateStatus,
        DeleteUser: DeleteUser
    };
})();

