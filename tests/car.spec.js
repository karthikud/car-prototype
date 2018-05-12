'use strict'

var express = require('express');
var request = require('supertest');
var helper = require('./helpers/common');

describe('Get All Cars', function() {

    it('/api/car should return 200', function(done) {
        request(require('../app'))
            .get('/api/car')
            .expect(200)
            .end(function(err, res) {
                helper.end(err, res, done);
            });
    });
})

describe('Get a Car', function() {

    it('/api/car should return 200', function(done) {
        request(require('../app'))
            .get('/api/car/1')
            .expect(200)
            .end(function(err, res) {
                helper.end(err, res, done);
            });
    });
})

describe('Create a Car', function() {

    it('/api/car should return 200', function(done) {
    	var car = {name: 'testCar',license:'Tn55',status:0};

        request(require('../app'))
            .post('/api/car')
            .send(car)
            .expect(200)
            .end(function(err, res) {
                helper.end(err, res, done);
            });
    });
})

describe('Start a Car', function() {

    it('/api/car should return 200', function(done) {
    	var car = {id:7,status:1};

        request(require('../app'))
            .post('/api/car/status')
            .send(car)
            .expect(200)
            .end(function(err, res) {
                helper.end(err, res, done);
            });
    });
})
describe('Start a Car', function() {

    it('/api/car should return 200', function(done) {
    	var car = {id:7,status:1};

        request(require('../app'))
            .post('/api/car/status')
            .send(car)
            .expect(200)
            .end(function(err, res) {
                helper.end(err, res, done);
            });
    });
})

describe('Car Status', function() {

    it('/api/car/status should return 200', function(done) {
        request(require('../app'))
            .get('/api/car/status')
            .expect(200)
            .end(function(err, res) {
                helper.end(err, res, done);
            });
    });
    it('/api/car/status should return 200', function(done) {
    	var car = {id:7,status:1};

        request(require('../app'))
            .post('/api/car/status')
            .send(car)
            .expect(200)
            .end(function(err, res) {
                helper.end(err, res, done);
            });
    });
})

describe('Car license', function() {

    it('/api/car/license should return 200', function(done) {
        request(require('../app'))
            .get('/api/car/license')
            .expect(200)
            .end(function(err, res) {
                helper.end(err, res, done);
            });
    });
    it('/api/car/license should return 200', function(done) {
    	var car = {id:7,license:'Tn22677'};

        request(require('../app'))
            .post('/api/car/license')
            .send(car)
            .expect(200)
            .end(function(err, res) {
                helper.end(err, res, done);
            });
    });
})

describe('Car Lights', function() {

    it('/api/car/Lights should return 200', function(done) {
        request(require('../app'))
            .get('/api/car/Lights')
            .expect(200)
            .end(function(err, res) {
                helper.end(err, res, done);
            });
    });
    it('/api/car/Lights should return 200', function(done) {
    	var car = {id:7,lights:1};

        request(require('../app'))
            .post('/api/car/Lights')
            .send(car)
            .expect(200)
            .end(function(err, res) {
                helper.end(err, res, done);
            });
    });
})

describe('Car signals', function() {

    it('/api/car/signals should return 200', function(done) {
        request(require('../app'))
            .get('/api/car/signal')
            .expect(200)
            .end(function(err, res) {
                helper.end(err, res, done);
            });
    });
    it('/api/car/signal should return 200', function(done) {
    	var car = {id:7,signal:1,type:'left'};

        request(require('../app'))
            .post('/api/car/signal')
            .send(car)
            .expect(200)
            .end(function(err, res) {
                helper.end(err, res, done);
            });
    });
    it('/api/car/signal should return 200', function(done) {
    	var car = {id:7,signal:1,type:'right'};

        request(require('../app'))
            .post('/api/car/signal')
            .send(car)
            .expect(200)
            .end(function(err, res) {
                helper.end(err, res, done);
            });
    });
})


describe('Car Speed', function() {

    it('/api/car/speed should return 200', function(done) {
        request(require('../app'))
            .get('/api/car/speed')
            .expect(200)
            .end(function(err, res) {
                helper.end(err, res, done);
            });
    });
    it('/api/car/speed should return 200', function(done) {
    	var car = {id:7,speed:200};

        request(require('../app'))
            .post('/api/car/speed')
            .send(car)
            .expect(200)
            .end(function(err, res) {
                helper.end(err, res, done);
            });
    });

})