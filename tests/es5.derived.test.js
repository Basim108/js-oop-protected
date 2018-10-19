const ProtectedError = require('../protected-error');
const DerivedClass = require('../es5-derived');

test('should not allow to access protectedMethod', () => {
    var obj = new DerivedClass();
    expect(obj.protectedMethod).toThrow(ProtectedError);
});

test('should not throw ProtectedError when protectedMethod called from inside BaseClass functions', () => {
    var obj = new DerivedClass();
    expect(obj.usingMethod).not.toThrow(ProtectedError);
});

// test('should not allow to read protectedProperty', () => {
//     var obj = new DerivedClass();
//     expect(()=>obj.protectedProperty).toThrow(ProtectedError);
// });

// test('should not allow to set protectedProperty', () => {
//     var obj = new DerivedClass();
//     expect(()=>{obj.protectedProperty = 100;}).toThrow(ProtectedError);
// });

// test('should not throw ProtectedError when writing to protectedProperty used inside BaseClass functions', () => {
//     var obj = new DerivedClass();
//     expect(obj.writingToTheProperty).not.toThrow(ProtectedError);
// });

// test('should not throw ProtectedError when reading protectedProperty used inside BaseClass functions', () => {
//     var obj = new DerivedClass();
//     expect(obj.readingOfTheProperty).not.toThrow(ProtectedError);
// });