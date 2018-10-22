const ProtectedError = require('../modules/protected-error');
const DerivedClass = require('../modules/es5-derived');

test('should not allow to access protectedMethod: protectedMethod as a public member of DerivedClass', () => {
    var obj = new DerivedClass();
    expect(obj.protectedMethod).toThrow(ProtectedError);
});

test('should not throw ProtectedError when protectedMethod called from inside DerivedClass functions', () => {
    var obj = new DerivedClass();
    expect(obj.usingMethod).not.toThrow(ProtectedError);
});

test('should not allow to read protectedProperty: protectedProperty as a public member of DerivedClass', () => {
    var obj = new DerivedClass();
    expect(()=>obj.protectedProperty).toThrow(ProtectedError);
});

test('should not allow to set protectedProperty: protectedProperty as a public member of DerivedClass', () => {
    var obj = new DerivedClass();
    expect(()=>{obj.protectedProperty = 100;}).toThrow(ProtectedError);
});

test('should not throw ProtectedError when writing to protectedProperty used inside DerivedClass functions', () => {
    var obj = new DerivedClass();
    expect(obj.writingToTheProperty).not.toThrow(ProtectedError);
});

test('should not throw ProtectedError when reading protectedProperty used inside DerivedClass functions', () => {
    var obj = new DerivedClass();
    expect(obj.readingOfTheProperty).not.toThrow(ProtectedError);
});