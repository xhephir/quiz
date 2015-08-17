var models = require('../models/models');

// GET /quizes/question
exports.question = function(req, res){
	models.Quiz.findAll().then(function(quiz){
		res.render('quizes/question', {pregunta: quiz[0].pregunta});
	});
};

// GET /quizes/answer

exports.answer = function(req, res){
	models.Quiz.findAll().then(function(quiz){
		var estadoRespuesta = 'Incorrecto';
		if(req.query.respuesta.toLowerCase() === quiz[0].respuesta.toLowerCase()){
			estadoRespuesta = 'Correcto';
		}

		res.render('quizes/answer', {respuesta: estadoRespuesta});
	});
};