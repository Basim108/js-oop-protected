import ProtectedError from "./protectedError";
import BaseClass from "./es5-base";

module.exports = function DerivedClass() {
    // Make sure that instance was created correctly
    if (!(this instanceof DerivedClass))
        return new DerivedClass();

    var _base = {
        /** Get protectedMethod from BaseClass and bind it into instance of DerivedClass. */
        protectedMethod: this.protectedMethod.bind(this),
        /** Get protectedProperty from BaseClass and bind it into instance of DerivedClass. */
        protectedProperty: this.protectedProperty.bind(this)
    };

    /** @summary Check context that is called from derived classes */
    function checkAccess() {
        if (this.constructor === DerivedClass)
            throw new ProtectedError();
    }

    Object.defineProperty(DerivedClass.prototype, 'protectedMethod', {
        // Hiding method from for-in cycles
        enumerable: false,
        // Do checks and then call protectedMEthod from BaseClass
        value: function () {
            checkAccess.call(this);
            return _base.protectedMethod();
        }
    });

    /** @description It is vitally important to redifne the property in DerivedClass
     * and check the access here. Because only here we can forbid access from such a case:
     * var obj = new DeriverClass();
     * obj.protectedProperty = 12; 
     * Therefore, we must check access here in the DerivedClass.
     * */
    Object.defineProperty(DerivedClass.prototype, 'protectedProperty', {
        get: function () {
            checkAccess.call(this);
            return base.protectedProperty;
        },
        set: function (value) {
            checkAccess.call(this);
            _base.protectedProperty = value;
        },
        enumerable: false,
        configurable: false
    });

    // Use of protected members inside the DerivedClass
    this.someMethod = function () {
        console.log(_base.protectedMethod());
        console.log(_base.protectedProperty);
        _base.protectedProperty = 12;
    }
}
DerivedClass.prototype = new BaseClass();
Object.defineProperty(DerivedClass.prototype, 'constructor', {
    value: DerivedClass,
    writable: false,
    configurable: false
});
