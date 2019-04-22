var fs = require('fs');
path = require('path');
var databaseJsonPath = path.join(__dirname, 'database.json');

exports.database = (function () {
    // DATABASE CONFIGURATIONS AND OBJECTS
    var database = function() {
    };
    database.prototype.Init = Init;
    database.prototype.Save = writeDbJson;
    database.prototype.CreateCollection = CreateCollection;
    database.prototype.ClearCollection = ClearCollection;
    database.prototype.Reset = Reset;
    database.prototype.Refresh = Refresh;
    database.prototype.Collections = Collections;
    

    function Init(){
        var existingJson = readDbJson();
        db = new database();
        Object.keys(existingJson).forEach(key => {
            db[key] = existingJson[key];
        });
        return db;
    }
    function Refresh(){
        db.Save(db.Init());
    }
    function Reset(){
        writeDbJson({});
        return db.Init();
    }

    // FILE OPERATIONS
    function readDbJson  () {
        try{
            return JSON.parse(fs.readFileSync(databaseJsonPath));
        }catch(err){
            console.log('FAILED TO READ JSON TO FILE: ' + err);
        };
    };
    function writeDbJson(json, callback) {
        try {        
           json = typeof json === 'undefined' ? this : json;
           fs.writeFileSync(databaseJsonPath, JSON.stringify(json));
        } catch (err) {
            console.log('FAILED TO WRITE JSON TO FILE: ' + err);
        }
        if(typeof callback !== 'undefined'){
            callback();
        }
    };
    function Collections(){
        return Object.keys(db);
    }
    // COLLECTION OPERATIONS
    function CreateCollection(collection){
        if(typeof db[collection] === 'undefined'){
            db[collection] = [];
            db.Save();
            return db[collection];
        }else{
            return false;
        }
    }

    function ClearCollection(collection){
        if(typeof db[collection] !== 'undefined'){
            db[collection] = [];
            db.Refresh();
            return true;
        }else{
            return false;
        }
    }

    function genericCollectionOperation(collection, callback){
        return callback(collection);           
    }

    function Select(condition){
       return genericCollectionOperation(this, typeof condition === 'undefined' ? s => s : (data) => Array.from(data).map(condition))
    }
    
    function Where(condition){
        return genericCollectionOperation(this, (data) => Array.from(data).filter(condition))
    }

    function Update(updateInstruction){
        this.forEach(f => updateInstruction(f));
        db.Save();
        return this;
    }

    function Insert(obj, index){
        if(typeof index !== 'undefined'){
            this.splice(index, 0, obj);
        }else{
            this.push(obj);
        }
        db.Save();
        return this;
    }

    function Delete(condition){
        var Set = this.filter(condition);
        Set.forEach(f => {
            this.splice(this.indexOf(f), 1);
        });
        db.Save();
        return this;
    }

    // ARRAY PROTOTYPE OVERRIDES
    Array.prototype.Where = Where;
    Array.prototype.Select = Select;
    Array.prototype.Update = Update;
    Array.prototype.Insert = Insert;
    Array.prototype.Delete = Delete;
    
    // EXPORT
    var db = {};
    return Init();
})();