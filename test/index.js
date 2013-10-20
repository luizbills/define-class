var DefineClass = require('../src');

// Person Class
var Person = DefineClass({
  //put all static method/props here

  // constructor
  init: function(name) {
    this.name = name;
  },

  dance: function() {
    return this.name + " says: I'm dancing";
  }
}, {
  // put all static method/props here
  someStaticMethod: function() {
    return 'called a static method';
  }
});

var person = new Person('Phil');
console.log( person.dance() );

// Ninja Class
var Ninja = DefineClass(Person /*parent class*/, {
  //put all static method/props here

  // constructor
  init: function(name) {
    //call the method of parent class 
    this._super(name);
  },

  dance: function() {
    return this._super() + ", but I'm a ninja!";
  }
}, {
  // put all static method/props here
  NinjaStaticMethod: function() {
    return 'called a static method';
  }
});
// note: static methods don't are extended

var ninja = new Ninja('Jack');
console.log( ninja.dance() );
