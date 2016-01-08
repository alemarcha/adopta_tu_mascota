module.exports.service_element = function (app) {
        
    app.get('/api/pub/element/:id', function (req, res, next) {
        console.log(req.params.id)
       setTimeout(function (){res.json(1)},1000);
	});
}