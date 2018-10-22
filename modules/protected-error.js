function ProtectedError() {
    this.message = "Encapsulation error, the object member you are trying to address is protected.";
}
ProtectedError.prototype = new Error();
Object.defineProperty(ProtectedError.prototype, 'constructor', {
    value: ProtectedError,
    writable: false,
    configurable: false
});
module.exports = ProtectedError;