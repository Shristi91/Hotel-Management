var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/user-management';

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/get-data', function (req, res, next) {
    var resultArray = [];
    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        var cursor = db.collection('data').find();
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function () {
            db.close();
            res.render('index', {
                items: resultArray
            });
        });
    });
});

router.post('/insert', function (req, res, next) {
    var item = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        pincode: req.body.pincode,
        Nationality: req.body.Nationality,
        aadharno: req.body.aadharno,
        rooms: req.body.noOfRooms,
        adults: req.body.noOfAdults,
        children: req.body.noOfChildren,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        purpose: req.body.purposeOfStay
    };

    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('data').insertOne(item, function (err, result) {
            assert.equal(null, err);
            console.log('Item inserted');
            db.close();
        });
    });

    res.redirect('/');
});

router.post('/update', function (req, res, next) {
    var item = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        pincode: req.body.pincode,
        Nationality: req.body.Nationality,
        aadharno: req.body.aadharno,
        rooms: req.body.noOfRooms,
        adults: req.body.noOfAdults,
        children: req.body.noOfChildren,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        purpose: req.body.purposeOfStay
    };
    var id = req.body.id;

    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('data').updateOne({
            "_id": objectId(id)
        }, {
            $set: item
        }, function (err, result) {
            assert.equal(null, err);
            console.log('Item updated');
            db.close();
        });
    });
});

router.post('/delete', function (req, res, next) {
    var id = req.body.id;
    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('data').deleteOne({
            "_id": objectId(id)
        }, function (err, result) {
            assert.equal(null, err);
            console.log('Item deleted');
            db.close();
        });
    });
});

module.exports = router;
