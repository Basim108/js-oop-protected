const ProtectedError = require('./protected-error');
const DerivedClass = require('./es5-derived');

/**
 * @class 
 * @extends DerivedClass
 */
function GrandDerivedClass() {
    // Make sure that instance was created correctly
    if (!(this instanceof GrandDerivedClass))
        return new GrandDerivedClass();
    
    var _self = this;
    var _baseProtectedPropertyDescriptor = Object.getOwnPropertyDescriptor(_self, 'protectedProperty');
    var _base = {
        /** Get protectedMethod from DerivedClass and bind it into instance of GrandDerivedClass. */
        protectedMethod: _self.protectedMethod.bind(_self),
    };

    Object.defineProperty(_base, 'protectedProperty', {
        get: function() {
            return _baseProtectedPropertyDescriptor.get.call(_self);
        },
        set: function(value){ 
            _baseProtectedPropertyDescriptor.set.call(_self, value);
        }
    })

    /** @summary Check context that is called from derived classes */
    function checkAccess() {
        if (this.constructor === GrandDerivedClass)
            throw new ProtectedError();
    }

    Object.defineProperty(_self, 'protectedMethod', {
        // Hiding method from for-in cycles
        enumerable: false,
        // Do checks and then call protectedMEthod from DerivedClass
        value: function () {
            checkAccess.call(_self); 
            return _base.protectedMethod();
        }
    });

    /** @description It is vitally important to redifne the property in GrandDerivedClass
     * and check the access here. Because only here we can forbid access from 
     * using protectedProperty as a public member of GrandDerivedClass instance: e.g.
     * var obj = new DeriverClass();
     * obj.protectedProperty = 12; 
     * */
    Object.defineProperty(_self, 'protectedProperty', {
        get: function () {
            checkAccess.call(_self);
            return base.protectedProperty;
        },
        set: function (value) {
            checkAccess.call(_self);
            _base.protectedProperty = value;
        },
        enumerable: false,
        configurable: false
    });

    // Use of protected method inside the DerivedClass
    this.usingMethod = function () {
        console.log(_base.protectedMethod());
    }
    // Use of protected property inside the DerivedClass
    this.writingToTheProperty = function () {
        _base.protectedProperty = 12;
    }    
    // Use of protected property inside the DerivedClass
    this.readingOfTheProperty = function () {
        console.log(_base.protectedProperty);
    }     
}
GrandDerivedClass.prototype = new DerivedClass();
Object.defineProperty(GrandDerivedClass.prototype, 'constructor', {
    value: GrandDerivedClass,
    writable: false,
    configurable: false
});
module.exports = GrandDerivedClass;