const API_PORT = process.env.PORT || process.env.API_PORT || 3001;
const app = require('./app');

app.get('/', (_req, res) => res.send('Hello World!'));

app.listen(API_PORT);
console.log(`Server started on port ${API_PORT}`);
