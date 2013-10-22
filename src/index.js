/* Based on:
 * Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/,

DefineClass = function(parent, instanceProps, staticProps) {
  var _super = null, childPrototype, name;
  
  // The new class
  function Class() {
    // All construction is actually done in the init method
    if ( !initializing && this.init ) {
      this.init.apply(this, arguments);
    }
  }

  if (typeof parent === 'function') {
    _super = parent.prototype;
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    childPrototype = new parent();
    initializing = false;
  } else {
    childPrototype = {};
    staticProps = instanceProps || null;
    instanceProps = parent || null;
  }
   
  // Copy the instance properties and methods over onto the new prototype
  for (name in instanceProps) {
    // Check if we're overwriting an existing function
    if (_super && typeof instanceProps[name] === "function"
        && typeof _super[name] === "function" 
        && fnTest.test(instanceProps[name])) {
      
      childPrototype[name] = (function(name, fn){
        return function() {
          var tmp = this._super;
             
          // Add a new ._super() method that is the same method
          // but on the super-class
          this._super = _super[name];
             
          // The method only need to be bound temporarily, so we
          // remove it when we're done executing
          var ret = fn.apply(this, arguments);        
          this._super = tmp;
             
          return ret;
        };
      })(name, instanceProps[name]);
    } else {
      childPrototype[name] = instanceProps[name];
    }
  }

  // Copy the static properties and methods over onto the new prototype
  for (name in staticProps) {
    Class[name] = staticProps[name];
  }

  // Populate our constructed prototype object
  Class.prototype = childPrototype;
   
  // Enforce the constructor to be what we expect
  Class.prototype.constructor = Class;
   
  return Class;
};

module.exports = DefineClass;
