var db = require("../database/database").database;
var expect = require('chai').expect;

expect(db.Init()).to.be.a('object');
expect(db.Reset()).to.be.a('object');
