var app = require('./server/config.js').configApp();
//require('./server/seguridad.js').seguridad(app);
console.log('ready');

require('./server/service_central.js').service_central(app);
//require('./server/movimientos.js').routeMovimientos(app);
console.log('steady');

app.listen(3003);
console.log('go');