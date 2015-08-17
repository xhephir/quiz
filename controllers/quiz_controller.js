var models = require('../models/models');

// GET /quizes
exports.index = function(req, res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs', {quizes: quizes});
	});
}

// GET /quizes/:quizId
exports.show = function(req, res){
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		res.render('quizes/show', {quiz: quiz});
	});
};

// GET /quizes/:quizId/answer

exports.answer = function(req, res){
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		var estadoRespuesta = 'Incorrecto';
		if(req.query.respuesta.toLowerCase() === quiz.respuesta.toLowerCase()){
			estadoRespuesta = 'Correcto';
		}

		res.render('quizes/answer', {quiz: quiz, respuesta: estadoRespuesta});
	});
};