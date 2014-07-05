Interpreter.prototype.reset = function()
{
  var scope = this.createScope(this.ast, null);
  this.stateStack = [{node: this.ast, scope: scope, thisExpression: scope}];
}

function initMap(interpreter, scope) {
  var map = interpreter.createObject(interpreter.OBJECT);
  interpreter.setProperty(map, "cycle", 10);
  
  
  interpreter.setProperty(scope, "Map", map);
  
}

var initFunc = function(interpreter, scope) {
  interpreter.setProperty(scope, 'url',
      interpreter.createPrimitive(location.toString()));

  var wrapper = function(text) {
    text = text ? text.toString() : '';
    return interpreter.createPrimitive(alert(text));
  };
  interpreter.setProperty(scope, 'alert',
      interpreter.createNativeFunction(wrapper));
  
  initMap(interpreter, scope);
};

var code = "var a = Map.cycle; alert(a);";

var myInterpreter = new Interpreter(code, initFunc);

myInterpreter.run();

myInterpreter.reset();

myInterpreter.run();
