var app = require('./server/config.js').configApp();

//require('./server/seguridad.js').seguridad(app);
console.log('ready');

require('./server/service_middleware.js').service_middleware(app);
require('./server/service/service_auth.js').service_auth(app);
require('./server/service/service_central.js').service_central(app);
require('./server/service/service_element.js').service_element(app);
require('./server/service/service_tipos_mascotas.js').service_tipos_mascotas(app);
require('./server/service/service_provincias.js').service_provincias(app);

console.log('steady');

app.listen(3003);
console.log('go');
