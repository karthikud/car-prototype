var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'application'
  }
});

/**
 * @swagger
 * /car:
 *   get:
 *     tags:
 *       - Cars
 *     description: Returns all cars
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of cars
 */

router.get('/', function(req, res, next) {
knex.select().table('car').then(function(collection){
    res.json({
      error:false,
      data: collection
    })
  })
  .catch(function(err){
    res.status(500).json({
      error:true,
      data:{
        message:err.message
      }
    })
  })
});
/**
 * @swagger
 * /car/{id}:
 *   get:
 *     tags:
 *       - Cars
 *     description: Returns a car
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: car's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: An array of car
 */

//get a car
router.get('/:id', function(req, res, next) {
	knex('car')
.where({
  id: req.params.id
}).select().then(function(collection){
    res.json({
      error:false,
      data: collection
    })
  })
  .catch(function(err){
    res.status(500).json({
      error:true,
      data:{
        message:err.message
      }
    })
  })
});
/**
 * @swagger
 * /car:
 *   post:
 *     tags:
 *       - Cars
 *     description: create a car
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: name.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: license
 *         description: license.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: car
 */
router.post('/', function(req, res, next) {

var insertParams = {};
insertParams.name  = req.body.name;
insertParams.status  = req.body.status ? req.body.status : 0 ;
insertParams.license_plate  = req.body.license;
knex('car').insert(insertParams)
.then(function(rows) {

  return knex.insert({car_id: rows, lights: 0,left_signal:0,right_signal:0,speed:0}, 'id').into('settings');
})
    .then(function(id){
      res.json({
        error:false,
        data: id
      })
    })
    .catch(function(err){
      res.status(500).json({
      error:true,
      data:{
        message:err.message
      }
      })
    })
});
/**
 * @swagger
 * /car/start:
 *   post:
 *     tags:
 *       - Cars
 *     description: start a car
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of the car to start.
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: car
 */
router.post('/start', function(req, res, next) {
	knex('car')
	.where('id', '=', req.body.id)
	.update({
	  status: 1
	})
    .then(function(id){
      res.json({
        error:false,
        data: id
      })
    })
    .catch(function(err){
      res.status(500).json({
      error:true,
      data:{
        message:err.message
      }
      })
    })
});


/**
 * @swagger
 * /car/status:
 *   post:
 *     tags:
 *       - Cars
 *     description: start a car
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of the car to change status.
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: car
 */
router.post('/status', function(req, res, next) {
	console.log('',req.body);
	console.log('',req.params);
	knex('car')
	.where('id', '=', req.body.id)
	.update({
	  status: 1
	})
    .then(function(id){
      res.json({
        error:false,
        data: id
      })
    })
    .catch(function(err){
      res.status(500).json({
      error:true,
      data:{
        message:err.message
      }
      })
    })
});

/**
 * @swagger
 * /car/status/{id}:
 *   get:
 *     tags:
 *       - Cars
 *     description: Returns a car
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: car's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: An array of car
 */
//get car status
router.get('/status/:id', function(req, res, next) {
knex('car')
.where({
  id: req.params.id
}).select('status').then(function(collection){
    res.json({
      error:false,
      data: collection
    })
  })
  .catch(function(err){
    res.status(500).json({
      error:true,
      data:{
        message:err.message
      }
    })
  })
});



/**
 * @swagger
 * /car/license:
 *   post:
 *     tags:
 *       - Cars
 *     description: set a car's License
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of the car to change status.
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: license
 *         description: license of the car to change.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: car
 */
router.post('/license', function(req, res, next) {
	knex('car')
	.where('id', '=', req.body.id)
	.update({
	  license_plate: req.body.license
	})
    .then(function(id){
      res.json({
        error:false,
        data: id
      })
    })
    .catch(function(err){
      res.status(500).json({
      error:true,
      data:{
        message:err.message
      }
      })
    })
});


/**
 * @swagger
 * /car/license/{id}:
 *   get:
 *     tags:
 *       - Cars
 *     description: Returns a car
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: car's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: An array of car
 */
router.get('/license/:id', function(req, res, next) {
knex('car')
.where({
  id: req.params.id
}).select('license_plate').then(function(collection){
    res.json({
      error:false,
      data: collection
    })
  })
  .catch(function(err){
    res.status(500).json({
      error:true,
      data:{
        message:err.message
      }
    })
  })
});


/**
 * @swagger
 * /car/lights:
 *   post:
 *     tags:
 *       - Cars
 *     description: set a car's lights
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of the car to change status.
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: lights
 *         description: lights of the car to change.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: car
 */
router.post('/lights', function(req, res, next) {
	knex('settings')
	.where('car_id', '=', req.body.id)
	.update({
	  lights: req.body.lights
	})
    .then(function(id){
      res.json({
        error:false,
        data: id
      })
    })
    .catch(function(err){
      res.status(500).json({
      error:true,
      data:{
        message:err.message
      }
      })
    })
});


/**
 * @swagger
 * /car/lights/{id}:
 *   get:
 *     tags:
 *       - Cars
 *     description: Returns a car
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: car's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: An array of car
 */
router.get('/lights/:id', function(req, res, next) {
knex('settings')
.where({
  car_id: req.params.id
}).select('lights').then(function(collection){
    res.json({
      error:false,
      data: collection
    })
  })
  .catch(function(err){
    res.status(500).json({
      error:true,
      data:{
        message:err.message
      }
    })
  })
});

/**
 * @swagger
 * /car/signal:
 *   post:
 *     tags:
 *       - Cars
 *     description: set a car's signal
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of the car to change.
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: signal
 *         description: signal of the car to change.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: car
 */
router.post('/signal', function(req, res, next) {
	var updateSignal = req.body.type == 'left' ? 'left_signal' : 'right_signal';

	knex('settings')
	.where('car_id', '=', req.body.id)
	.update(updateSignal, req.body.signal)
    .then(function(id){
      res.json({
        error:false,
        data: id
      })
    })
    .catch(function(err){
      res.status(500).json({
      error:true,
      data:{
        message:err.message
      }
      })
    })
});


/**
 * @swagger
 * /car/signal/{id}:
 *   get:
 *     tags:
 *       - Cars
 *     description: Returns a car
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: car's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: An array of car
 */
router.get('/signal/:id', function(req, res, next) {
var updateSignal = req.param('type') == 'left' ? 'left_signal' : 'right_signal';
knex('settings')
.where({
  car_id: req.params.id
}).select(updateSignal).then(function(collection){
    res.json({
      error:false,
      data: collection
    })
  })
  .catch(function(err){
    res.status(500).json({
      error:true,
      data:{
        message:err.message
      }
    })
  })
});

/**
 * @swagger
 * /car/speed:
 *   post:
 *     tags:
 *       - Cars
 *     description: set a car's speed
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of the car to change.
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: speed
 *         description: speed of the car to change.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: car
 */
router.post('/speed', function(req, res, next) {
	knex.select('*')
	.from('car')
	.where({id: req.body.id,status:1})
	.then(function(rows) {
		console.log('speed',rows);
			if(rows.length > 0){
				  return knex('settings').where('car_id', '=', req.body.id).update({speed: req.body.speed});
			}else{
				return;
			}
	})
    .then(function(id){
      res.json({
        error:false,
        data: id
      })
    })
    .catch(function(err){
      res.status(500).json({
      error:true,
      data:{
        message:err.message
      }
      })
    })
});


/**
 * @swagger
 * /car/speed/{id}:
 *   get:
 *     tags:
 *       - Cars
 *     description: Returns a car
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: car's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: An array of car
 */
router.get('/speed/:id', function(req, res, next) {
knex('settings')
.where({
  car_id: req.params.id
}).select('speed').then(function(collection){
    res.json({
      error:false,
      data: collection
    })
  })
  .catch(function(err){
    res.status(500).json({
      error:true,
      data:{
        message:err.message
      }
    })
  })
});
module.exports = router;
