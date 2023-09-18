const EventEmitter = require('./eventEmitter');

class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
      this.emit('start');
      console.time('execute');
        
      try {
        const response = await asyncFunc(...args);
        const jsonData = response.data;
        this.emit('data', jsonData);
        console.log('Fetched and transformed data:', jsonData);
      } catch (error) {
        this.emit('error', error);
        console.error('Error:', error.message);
      } finally {
        console.timeEnd('execute');
        this.emit('end');
      }
    }
 }

 module.exports = WithTime;