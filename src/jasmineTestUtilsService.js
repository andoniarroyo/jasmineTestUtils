(function () {
    'use strict';

    var JasmineTestUtilsService = function ($q, $rootScope) {
        var service = this;

        service.cloneObject = function(objectToBeCloned) {
            var clonedObject;
            if (objectToBeCloned) {
                clonedObject = JSON.parse(JSON.stringify(objectToBeCloned));
            }
            return clonedObject;
        };

        service.stubMethodReturningValue = function(service, methodName, valueToReturn) {
            if (!isValidMethod(service, methodName)) {
                throw composeInvalidMethodNameMessage(methodName);
            } else {
                spyOn(service, methodName).and.returnValue(valueToReturn);
            }
        };

        service.stubAsyncMethodResolvingValue = function(service, methodName, valueToReturn) {
            if (!isValidMethod(service, methodName)) {
                throw composeInvalidMethodNameMessage(methodName);
            } else {
                spyOn(service, methodName).and.callFake(function() {
                    var deferred = $q.defer();
                    deferred.resolve(valueToReturn);
                    return deferred.promise;
                });
            }
        };

        service.stubAsyncMethodResolvingValueWithParameters = function(service, methodName, keyValuesToReturn) {
            if (!isValidMethod(service, methodName)) {
                throw composeInvalidMethodNameMessage(methodName);
            } else {
                spyOn(service, methodName).and.callFake(function(paramKey) {
                    var deferred = $q.defer();
                    if (keyValuesToReturn[paramKey]) {
                        deferred.resolve(keyValuesToReturn[paramKey]);
                    } else {
                        throw composeInvalidParamKeyMessage(paramKey);

                    }
                    return deferred.promise;
                });
            }
        };

        service.stubAsyncMethodResolvingValueWithParametersBasedOnTimes = function(service, methodName, paramValuesTimesToReturn) {
            if (!isValidMethod(service, methodName)) {
                throw composeInvalidMethodNameMessage(methodName);
            } else {
                var counter = 0;
                spyOn(service, methodName).and.callFake(function() {
                    var deferred = $q.defer();
                    deferred.resolve(paramValuesTimesToReturn[counter]);
                    counter++;
                    return deferred.promise;
                });
            }
        };

        service.stubAsyncMethodRejectingValue = function(service, methodName, errorToReturn) {
            if (!isValidMethod(service, methodName)) {
                throw composeInvalidMethodNameMessage(methodName);
            } else {
                spyOn(service, methodName).and.callFake(function() {
                    var deferred = $q.defer();
                    deferred.reject(errorToReturn);
                    return deferred.promise;
                });
            }
        };

        service.resolveAsyncMethods = function() {
            $rootScope.$digest();
        };

        // private methods
        var isValidMethod = function (service, methodName) {
            return (service[methodName] && typeof(service[methodName]) === 'function');
        };

        var composeInvalidMethodNameMessage = function(methodName) {
            return "The method " + methodName + " is not present at the specified object";
        };

        var composeInvalidParamKeyMessage = function(paramKey) {
            return "The key " + paramKey + " is not valid for the params specified";
        };
    };

    angular
        .module('testing', [])
        .service('jasmineTestUtilsService', [ '$q', '$rootScope', JasmineTestUtilsService]);
})();