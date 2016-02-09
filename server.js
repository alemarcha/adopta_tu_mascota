var app = require('./server/config.js').configApp();
var items={elementos:[]};
app.items=items;

for(i=0;i<100;i++){
	if(i==0){
		console.log("Aqui otra vez");
	}
	app.items.elementos.push({ 
		"id" : "id"+i,
		"titulo" : "Titulo "+ i,
		"valor"  : i
	});
}
//require('./server/seguridad.js').seguridad(app);
console.log('ready');

require('./server/service_middleware.js').service_middleware(app);
require('./server/service_auth.js').service_auth(app);
require('./server/service_central.js').service_central(app);
require('./server/service_element.js').service_element(app);

console.log('steady');

app.listen(3003);
console.log('go');