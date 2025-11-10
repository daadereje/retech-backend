const path = require('path');

const filePath = '/users/retech/app.js';
console.log('Base:', path.basename(filePath));
console.log('Dir:', path.dirname(filePath));
console.log('Ext:', path.extname(filePath));
console.log('Join:', path.join(__dirname, 'data', 'file.txt'));
