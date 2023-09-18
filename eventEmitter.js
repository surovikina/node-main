class EventEmitter {
   listeners = {};
     
   on(eventName, fn) {
      if(!this.listeners[eventName]) {
         this.listeners[eventName] = [];
      } 
      this.listeners[eventName].push(fn) 
   }
        
   off(eventName, fn) {
      if (this.listeners[eventName]) {
         this.listeners[eventName] = this.listeners[eventName].filter((handler) => handler !== fn);
      }
   }
  
   once(eventName, fn) {
      const onceWrapper = (...args) => {
         fn(...args);
         this.off(eventName, onceWrapper);
      };
      this.on(eventName, onceWrapper);
   }
  
   emit(eventName, ...args) {
      if(this.listeners[eventName]) {
         this.listeners[eventName].map(fun => args ? fun(...args) : fun())
      }
   }
  
   listenerCount(eventName) {
      if(this.listeners[eventName]){
         return this.listeners[eventName].length;
      }
   }
  
   rawListeners(eventName) {
      return this.listeners[eventName];
   }
}

module.exports = EventEmitter;