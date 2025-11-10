const fs = require('fs');

// Write file
fs.writeFileSync('message.txt', 'Hello ReTech Backend!');

// Read file
const data = fs.readFileSync('message.txt', 'utf8');
console.log(data);
