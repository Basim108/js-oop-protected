const ProtectedError = require('../protected-error');
const BaseClass = require('../es5-base');

test('should not allow to access protectedMethod', () => {
    var obj = new BaseClass();
    expect(obj.protectedMethod).toThrow(ProtectedError);
});

test('should not throw ProtectedError when protectedMethod called from inside BaseClass functions', () => {
    var obj = new BaseClass();
    expect(obj.useProtectedMethodInside).not.toThrow(ProtectedError);
});

test('should not allow to read protectedProperty', () => {
    var obj = new BaseClass();
    expect(()=>obj.protectedProperty).toThrow(ProtectedError);
});

test('should not allow to set protectedProperty', () => {
    var obj = new BaseClass();
    expect(()=>{obj.protectedProperty = 100;}).toThrow(ProtectedError);
});

test('should not throw ProtectedError when protectedProperty used inside BaseClass functions', () => {
    var obj = new BaseClass();
    expect(obj.useProtectedPropertyInside).not.toThrow(ProtectedError);
});