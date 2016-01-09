module.exports.service_element = function (app) {
        
    app.get('/api/pub/element/:id', function (req, res, next) {
        console.log(req.params.id)
        if(req.params.id === 'id2'){
            res.status(404).send('Sesión caducada');
        }else{
            setTimeout(function (){res.json(1)},1000);     
        }
       
	});
}