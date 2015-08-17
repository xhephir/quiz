var models = require('../models/models');

//Autoload - factoriza el código si ruta incluye :quizId

exports.load = function(req, re, next, quizId){
	models.Quiz.findById(quizId).then(function(quiz){
		if(quiz){
			req.quiz = quiz;
			next();
		}else{
			next(new Error('No existe el quizId=' + quizId));
		}
	}).catch(function(error){
		next(error);
	});
};

// GET /quizes
exports.index = function(req, res, next){
	var parametrosBusqueda = {};
	if (req.query.search){
		var textoBuscar = req.query.search || '';
		textoBuscar = '%' + textoBuscar.trim() + '%';
		textoBuscar = textoBuscar.replace(/ /g, '%');
		parametrosBusqueda = { 
			where: ["pregunta like ?", textoBuscar], 
			order: 'pregunta ASC' 
		};
	}

	models.Quiz.findAll(parametrosBusqueda).then(function(quizes){
		res.render('quizes/index.ejs', {quizes: quizes});
	}).catch(function(error){
		next(error);
	});
};

// GET /quizes/:quizId
exports.show = function(req, res){
	res.render('quizes/show', {quiz: req.quiz});
};

// GET /quizes/:quizId/answer

exports.answer = function(req, res){	
	var estadoRespuesta = 'Incorrecto';
	if(req.query.respuesta.toLowerCase() === req.quiz.respuesta.toLowerCase()){
		estadoRespuesta = 'Correcto';
	}

	res.render('quizes/answer', {quiz: req.quiz, respuesta: estadoRespuesta});
};