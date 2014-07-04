var element = document.querySelector("#greeting");

element.innerText = "Hello";

var jsObjs = JSJS.Init();


function objSetProperty(cx, obj, propName, strict, val) {
    switch(propName) {
    case "tester":
        element.innerText = val;
        return;
        break;
    }
    throw "Not Implemented obj prop - " + propName;
}


function objGetProperty(propName) {
    switch(propName) {
    case "tester":
        return {'type': JSJS.Types.charPtr, 'val': "hello"};
        break;
    }
    throw "Not Implemented obj prop - " + propName;
}

var jsObjClass = JSJS.CreateClass(JSJS['JSCLASS_GLOBAL_FLAGS'],
        JSJS['PropertyStub'],
        JSJS['PropertyStub'],
        JSJS.wrapGetter(objGetProperty, JSJS.Types.charPtr),
        JSJS.wrapSetter(objSetProperty),
        JSJS['EnumerateStub'],
        JSJS['ResolveStub'],
        JSJS['ConvertStub'],
        JSJS['FinalizeStub']);
var jsObj = JSJS.NewObject(jsObjs.cx, jsObjClass, 0, 0);

function callbackObject(func) {
    var jsvalout = JSJS.CreateJSVal(jsObjs.cx, func, JSJS.Types.objPtr);
    JSJS.CallFunctionValue(jsObjs.cx, jsObjs.glob, jsvalout, [JSJS.Types.objPtr], [jsObj]);
}

var wrappedCallbackObject = JSJS.wrapFunction({
    func : callbackObject,
    args : [JSJS.Types.objPtr],
    returns : null
});

JSJS.DefineFunction(jsObjs.cx, jsObjs.glob, "callbackObject", wrappedCallbackObject, 1, 0);

var rval = JSJS.EvaluateScript(jsObjs.cx, jsObjs.glob, "callbackObject(function(x) {x.tester = 'test'});");

var val = JSJS.ValueToString(jsObjs.cs, rval);

element.innerText = val;
