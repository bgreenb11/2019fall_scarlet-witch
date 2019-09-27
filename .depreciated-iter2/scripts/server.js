const server = require('server');
const { get, post } = server.router;

server([
    get('/outlet_on', () => showState('on')),
    get('/outlet_off', () => showState('off'))
  ]);