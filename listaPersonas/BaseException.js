"use strict";

function BaseException(){

}
BaseException.prototype = new Error();
BaseException.prototype.constructor = BaseException;

function InvalidValueException(param){
    this.name="InvalidValueException";
    this.message="Error: The parameter " + param + " has an invalid value";
}
InvalidValueException.prototype = new BaseException();
InvalidValueException.prototype.constructor = InvalidValueException;