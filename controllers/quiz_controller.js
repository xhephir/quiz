// GET /quizes/question
exports.question = function(req, res){
	res.render('quizes/question', {pregunta: 'Capital de Italia'});
};

// GET /quizes/answer

exports.answer = function(req, res){
	var estadoRespuesta = 'Incorrecto';
	if(req.query.respuesta.toLowerCase() === 'roma'){
		estadoRespuesta = 'Correcto';
	}

	res.render('quizes/answer', {respuesta: estadoRespuesta});
};