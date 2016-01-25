var app = require('./server/config.js').configApp();
var items={elementos:[]};
app.items=items;
app.contador=0;
//require('./server/seguridad.js').seguridad(app);
console.log('ready');

require('./server/service_central.js').service_central(app);
require('./server/service_element.js').service_element(app);
console.log('steady');

app.listen(3003);
console.log('go');