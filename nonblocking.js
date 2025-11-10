// file: nonblocking.js
console.log("Start");

setTimeout(() => {
  console.log("This runs later (asynchronous)");
}, 2000);

console.log("End");
