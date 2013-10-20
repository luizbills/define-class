var DefineClass = require('./lib/class'),

Person = DefineClass({
  init: function(name) {
    this.name = name;
  }
});

Ninja = DefineClass(Person, {
  init: function(name) {
    this._super(name);
  }
});

var p = new Person('John');
console.log( p.name );// => "John"

var n = new Ninja('Jack');
console.log( n.name ); // => "Jack"
