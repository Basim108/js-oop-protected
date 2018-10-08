import ProtectedError from "./protectedError";

module.exports = function BaseClass() {
    // Make sure that instance was created correctly
    if (!(this instanceof BaseClass))
        return new BaseClass();

    // Close the instance in order to get access to class members 
    // from private and protected methods
    var _self = this;

    /** @summary Check context that is called from derived classes */
    function checkAccess() {
        if (!(this instanceof BaseClass))
            throw new ProtectedError();
        if (this.constructor === BaseClass)
            throw new ProtectedError()
    }

    // Define method that will be not writable, configurable and visible in for-in cycles.
    Object.defineProperty(BaseClass.prototype, 'protectedMethod', {
        value: function(){
            checkAccess.call(this);
            protectedMethod();
        },
        enumerable: false,
        writable: false,
        configurable: false
    });

    // closed method in order to use it from other methods inside this instance
    function protectedMethod() {
        // ---------------------------------------
        // Place for useful code
        return 'value from protected method';
    }

    var _protectedProperty;
    Object.defineProperty(BaseClass.prototype, 'protectedProperty', {
        get: function () {
            checkAccess.call(this);
            return _protectedProperty;
        },
        set: function (value) {
            checkAccess.call(this);
            _protectedProperty = value;
        },
        enumerable: false,
        configurable: false
    });

    this.publicMethod = function () {
        protectedMethod(); // правильный способ вызова защищенного метода из других методов класса BaseClass
        //this.protectedMethod(); // Неправильный способ вызова, т.к. он приведет к выбросу исключения ProtectedError
    }
}
