const axios = require('axios');

const WithTime = require('./withTime')

const withTime = new WithTime();

withTime.on('begin', () => {
  console.log('About to execute');
});

withTime.on('end', () => {
  console.log('Done with execute');
});

withTime.on('data', (data) => {
  console.log('Received data:', data);
});

withTime.on('error', (error) => {
  console.error('Received error:', error);
});

const asyncFunction = async () => {
  return await axios.get('https://jsonplaceholder.typicode.com/posts/1');
};

withTime.execute(asyncFunction);

console.log(withTime.rawListeners("end"));
 