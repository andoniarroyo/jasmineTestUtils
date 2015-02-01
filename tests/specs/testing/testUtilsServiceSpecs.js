describe('The jasmine test utils service', function () {
    'use strict';

    var _jasmineTestUtilsService;

    beforeEach(module('andoniarroyo.testing'));

    beforeEach(inject(function (jasmineTestUtilsService) {
        _jasmineTestUtilsService = jasmineTestUtilsService;
    }));

    describe('working with objects', function() {

        it('should clone the received object', function () {
            // Arrange
            var objectToBeCloned = { id: 'testObject', description: 'testDescriptionObject'};

            // Act
            var clonedObject = _jasmineTestUtilsService.cloneObject(objectToBeCloned);

            // Assert
            expect(clonedObject).toEqual(objectToBeCloned);
            expect(clonedObject).not.toBe(objectToBeCloned);
        });

        it('should return undefined if the object to be cloned is not defined', function () {
            // Arrange
            var objectToBeCloned;

            // Act
            var clonedObject = _jasmineTestUtilsService.cloneObject(objectToBeCloned);

            // Assert
            expect(clonedObject).not.toBeDefined();
        });

    });

    describe('stubbing synchronous callings', function() {

        it('should stub a method returning the specified value', function () {
            // Arrange
            var dummyObject = { method: function() { return 'testObject'}};
            var methodName = 'method';
            var valueToReturn = 'canned value';

            // Act
            _jasmineTestUtilsService.stubMethodReturningValue(dummyObject, methodName, valueToReturn);
            var returnedValue = dummyObject.method();

            // Assert
            expect(dummyObject.method).toHaveBeenCalled();
            expect(returnedValue).toEqual(valueToReturn);
        });

        it('should thrown an error if a non existing method is trying to be stubbed', function () {
            // Arrange
            var dummyObject = { method: function() { return 'testObject'}};
            var methodName = 'invalidMethod';
            var valueToReturn = 'canned value';

            var expectedError = "The method " + methodName + " is not present at the specified object";

            // Act
            var generatedError;
            try {
                _jasmineTestUtilsService.stubMethodReturningValue(dummyObject, methodName, valueToReturn);
            }
            catch (error) {
                generatedError = error;
            }

            // Assert
            expect(generatedError).toBe(expectedError);
        });

        it('should thrown an error if an existing property is trying to be stubbed', function () {
            // Arrange
            var dummyObject = { id: 'id',  method: function() { return 'testObject'}};
            var methodName = 'id';
            var valueToReturn = 'canned value';

            var expectedError = "The method " + methodName + " is not present at the specified object";

            // Act
            var generatedError;
            try {
                _jasmineTestUtilsService.stubMethodReturningValue(dummyObject, methodName, valueToReturn);
            }
            catch (error) {
                generatedError = error;
            }

            // Assert
            expect(generatedError).toBe(expectedError);

        });

    });

    describe('stubbing asynchronous callings', function() {

        describe('resolving promises', function() {

            it('should stub a method returning a resolved promise with the specified value', function () {
                // Arrange
                var dummyAsyncObject = { asyncMethod: function() { return 'testObject'}};
                var methodName = 'asyncMethod';
                var valueToReturn = 'canned value';

                // Act
                _jasmineTestUtilsService.stubAsyncMethodResolvingValue(dummyAsyncObject, methodName, valueToReturn);

                var returnedValue;
                dummyAsyncObject.asyncMethod()
                    .then(
                        function (value) {
                            returnedValue = value;
                        });

                _jasmineTestUtilsService.resolveAsyncMethods();

                // Assert
                expect(dummyObject.method).toHaveBeenCalled();
                expect(returnedValue).toEqual(valueToReturn);
            });

            it('should thrown an error if a non existing method is trying to be stubbed', function () {
                // Arrange
                var dummyAsyncObject = { asyncMethod: function() { return 'testObject'}};
                var methodName = 'nonExistingAsyncMethod';
                var valueToReturn = 'canned value';

                var expectedError = "The method " + methodName + " is not present at the specified object";

                // Act
                var generatedError;
                try {
                    _jasmineTestUtilsService.stubAsyncMethodResolvingValue(dummyAsyncObject, methodName, valueToReturn);
                }
                catch (error) {
                    generatedError = error;
                }

                // Assert
                expect(generatedError).toBe(expectedError);
            });

            it('should thrown an error if an existing property is trying to be stubbed', function () {
                // Arrange
                var dummyObject = { id: 'id', asyncMethod: function() { return 'testObject'}};
                var methodName = 'id';
                var valueToReturn = 'canned value';

                var expectedError = "The method " + methodName + " is not present at the specified object";

                // Act
                var generatedError;
                try {
                    _jasmineTestUtilsService.stubAsyncMethodResolvingValue(dummyObject, methodName, valueToReturn);
                }
                catch (error) {
                    generatedError = error;
                }

                // Assert
                expect(generatedError).toBe(expectedError);
            });

            describe ('with results based on parameters', function() {

                it('should stub a method returning a resolved promise with the value of the key specified by the parameters ', function () {
                    // Arrange
                    var dummyAsyncObject = { asyncMethod: function() { return 'testObject'}};
                    var methodName = 'asyncMethod';
                    var paramValuesToReturn = { key1 : 'value1', key2: 'value2'};
                    var keyParam = 'key1';

                    // Act
                    _jasmineTestUtilsService.stubAsyncMethodResolvingValueWithParameters(dummyAsyncObject, methodName, paramValuesToReturn);

                    var returnedValue;
                    dummyAsyncObject.asyncMethod(keyParam)
                        .then(
                            function (value) {
                                returnedValue = value;
                            });

                    _jasmineTestUtilsService.resolveAsyncMethods();

                    // Assert
                    expect(returnedValue).toEqual(paramValuesToReturn[keyParam]);
                });

                it('should thrown an error if a non existing method is trying to be stubbed', function () {
                    // Arrange
                    var dummyAsyncObject = { asyncMethod: function() { return 'testObject'}};
                    var methodName = 'nonExistingAsyncMethod';
                    var valueToReturn = 'canned value';

                    var expectedError = "The method " + methodName + " is not present at the specified object";

                    // Act
                    var generatedError;
                    try {
                        _jasmineTestUtilsService.stubAsyncMethodResolvingValueWithParameters(dummyAsyncObject, methodName, valueToReturn);
                    }
                    catch (error) {
                        generatedError = error;
                    }

                    // Assert
                    expect(generatedError).toBe(expectedError);
                });

                it('should thrown an error if an existing property is trying to be stubbed', function () {
                    // Arrange
                    var dummyObject = { id: 'id', asyncMethod: function() { return 'testObject'}};
                    var methodName = 'id';
                    var valueToReturn = 'canned value';

                    var expectedError = "The method " + methodName + " is not present at the specified object";

                    // Act
                    var generatedError;
                    try {
                        _jasmineTestUtilsService.stubAsyncMethodResolvingValueWithParameters(dummyObject, methodName, valueToReturn);
                    }
                    catch (error) {
                        generatedError = error;
                    }

                    // Assert
                    expect(generatedError).toBe(expectedError);

                });

                it('should thrown an error if the stubbed method is invoked with a non existing param key', function () {
                    // Arrange
                    var dummyAsyncObject = { asyncMethod: function() { return 'testObject'}};
                    var methodName = 'asyncMethod';
                    var paramValuesToReturn = { key1 : 'value1', key2: 'value2'};
                    var keyParam = 'nonExistingKey';

                    var expectedError = "The key nonExistingKey is not valid for the params specified";

                    // Act
                    var generatedError;
                    _jasmineTestUtilsService.stubAsyncMethodResolvingValueWithParameters(dummyAsyncObject, methodName, paramValuesToReturn );

                    try {
                        dummyAsyncObject.asyncMethod(keyParam);
                    }
                    catch (error) {
                        generatedError = error;
                    }

                    // Assert
                    expect(generatedError).toBe(expectedError);
                });

            });

            describe ('with results based on the invocation times', function() {

                it('should stub a method returning a resolved promise with the value of the index of the parameters', function () {
                    // Arrange
                    var dummyAsyncObject = { asyncMethod: function() { return 'testObject'}};
                    var methodName = 'asyncMethod';
                    var paramValuesTimesToReturn = ['value1', 'value2'];

                    // Act
                    _jasmineTestUtilsService.stubAsyncMethodResolvingValueWithParametersBasedOnTimes(dummyAsyncObject, methodName, paramValuesTimesToReturn);

                    var returnedValue;
                    dummyAsyncObject.asyncMethod()
                        .then(
                            function () {
                                dummyAsyncObject.asyncMethod()
                                    .then(
                                        function (value) {
                                            returnedValue = value;
                                        }
                                    )
                            }
                        );

                    _jasmineTestUtilsService.resolveAsyncMethods();

                    // Assert
                    expect(returnedValue).toEqual(paramValuesTimesToReturn[1]);
                });

                it('should thrown an error if a non existing method is trying to be stubbed', function () {
                    // Arrange
                    var dummyAsyncObject = { asyncMethod: function() { return 'testObject'}};
                    var methodName = 'nonExistingAsyncMethod';
                    var paramValuesTimesToReturn = ['value1', 'value2'];

                    var expectedError = "The method " + methodName + " is not present at the specified object";

                    // Act
                    var generatedError;
                    try {
                        _jasmineTestUtilsService.stubAsyncMethodResolvingValueWithParametersBasedOnTimes(dummyAsyncObject, methodName, paramValuesTimesToReturn);
                    }
                    catch (error) {
                        generatedError = error;
                    }

                    // Assert
                    expect(generatedError).toBe(expectedError);
                });

                it('should thrown an error if an existing property is trying to be stubbed', function () {
                    // Arrange
                    var dummyObject = { id: 'id', asyncMethod: function() { return 'testObject'}};
                    var methodName = 'id';
                    var paramValuesTimesToReturn = ['value1', 'value2'];

                    var expectedError = "The method " + methodName + " is not present at the specified object";

                    // Act
                    var generatedError;
                    try {
                        _jasmineTestUtilsService.stubAsyncMethodResolvingValueWithParametersBasedOnTimes(dummyObject, methodName, paramValuesTimesToReturn);
                    }
                    catch (error) {
                        generatedError = error;
                    }

                    // Assert
                    expect(generatedError).toBe(expectedError);

                });

             })

        });

        describe('rejecting promises', function() {

            it('should stub a method returning a rejected promise with the specified error', function () {
                // Arrange
                var dummyAsyncObject = { asyncMethod: function() { return 'testObject'}};
                var methodName = 'asyncMethod';
                var errorToReturn = 'error';

                // Act
                _jasmineTestUtilsService.stubAsyncMethodRejectingValue(dummyAsyncObject, methodName, errorToReturn);

                var returnedError;
                dummyAsyncObject.asyncMethod()
                    .then(
                        null,
                        function (error) {
                            returnedError = error;
                        }
                    );

                _jasmineTestUtilsService.resolveAsyncMethods();

                // Assert
                expect(returnedError).toEqual(errorToReturn);
            });

            it('should thrown an error if a non existing method is trying to be stubbed', function () {
                // Arrange
                var dummyAsyncObject = { asyncMethod: function() { return 'testObject'}};
                var methodName = 'nonExistingAsyncMethod';
                var errorToReturn = 'error';

                var expectedError = "The method " + methodName + " is not present at the specified object";

                // Act
                var generatedError;
                try {
                    _jasmineTestUtilsService.stubAsyncMethodRejectingValue(dummyAsyncObject, methodName, errorToReturn);
                }
                catch (error) {
                    generatedError = error;
                }

                // Assert
                expect(generatedError).toBe(expectedError);
            });

            it('should thrown an error if an existing property is trying to be stubbed', function () {
                // Arrange
                var dummyObject = { id: 'id', asyncMethod: function() { return 'testObject'}};
                var methodName = 'id';
                var errorToReturn = 'error';

                var expectedError = "The method " + methodName + " is not present at the specified object";

                // Act
                var generatedError;
                try {
                    _jasmineTestUtilsService.stubAsyncMethodRejectingValue(dummyObject, methodName, errorToReturn);
                }
                catch (error) {
                    generatedError = error;
                }

                // Assert
                expect(generatedError).toBe(expectedError);

            });

        });

    });

});