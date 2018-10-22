const ProtectedError = require('../modules/protected-error');
const GrandDerivedClass = require('../modules/es5-grand-derived');

test('should not allow to access protectedMethod: protectedMethod as a public member of GrandDerivedClass', () => {
    var obj = new GrandDerivedClass();
    expect(obj.protectedMethod).toThrow(ProtectedError);
});

test('should not throw ProtectedError when protectedMethod called from inside GrandDerivedClass functions', () => {
    var obj = new GrandDerivedClass();
    expect(obj.usingMethod).not.toThrow(ProtectedError);
});

test('should not allow to read protectedProperty: protectedProperty as a public member of GrandDerivedClass', () => {
    var obj = new GrandDerivedClass();
    expect(()=>obj.protectedProperty).toThrow(ProtectedError);
});

test('should not allow to set protectedProperty: protectedProperty as a public member of GrandDerivedClass', () => {
    var obj = new GrandDerivedClass();
    expect(()=>{obj.protectedProperty = 100;}).toThrow(ProtectedError);
});

test('should not throw ProtectedError when writing to protectedProperty used inside GrandDerivedClass functions', () => {
    var obj = new GrandDerivedClass();
    expect(obj.writingToTheProperty).not.toThrow(ProtectedError);
});

test('should not throw ProtectedError when reading protectedProperty used inside GrandDerivedClass functions', () => {
    var obj = new GrandDerivedClass();
    expect(obj.readingOfTheProperty).not.toThrow(ProtectedError);
});