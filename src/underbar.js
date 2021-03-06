(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    //if n is undefined, return the last element
    if (n === undefined) {
      return array[array.length - 1];
    } else if (n > array.length) {
      return array;
    } else {
      return array.slice(array.length - n);
    }
    //if n is defined, return the last n elements in the array

  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    //an array case - if it is an array
    //call iterator on each element in array
    //else (it's an object) call iterator over each key/value pair

    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }

  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });
    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    //set up an empty results array
    var results = [];
    //apply the test to each element in the collection
    //if an element passes the test, push to results
    _.each(collection, function(element) {
      if (test(element)) {
        results.push(element);
      }
    });
    return results;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(element) {
      return !test(element);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    iterator = iterator || _.identity;

    //isSorted is false //
    var results = [];
    var resultsObj = {};

    _.each(array, function(value) {
      var resultsOfIterator = iterator(value);
      if (!resultsObj[resultsOfIterator]) {
        resultsObj[resultsOfIterator] = value;
      }
    });

    results = Object.values(resultsObj);
    return results;

  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.

    var results = [];

    _.each(collection, function(value) {
      results.push(iterator(value));
    });

    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    var collectionCopy = collection;

    // check to see if accumulator undefined
    // if it is, assign accumulator collection[0]
    // assign to collectionCopy a shallow copy of collection from index 2 on
    // otherwise, collectionCopy is copy of whole array

    if (Array.isArray(collection)) {
      if (accumulator === undefined) {
        accumulator = collection[0];
        collectionCopy = collection.slice(1);
      } else {
        collectionCopy = collection.slice();
      }
    }

    // iterate over the collection
    // if an accumulator isn't provided, starts as first item in array
    // accumulator will be updated to = current value + results of calling iterator on current vallue
    // return accumulator

    _.each(collectionCopy, function(value) {
      accumulator = iterator(accumulator, value);
    });

    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    if (iterator === undefined) {
      iterator = _.identity;
    }
    // TIP: Try re-using reduce() here.
    // call the reduce function on collection
    // set accumulator to true
    // if at any time accumulator equals false return false

    return _.reduce(collection, function(accumulator, item) {
      if (!accumulator) {
        return false;
      }
      return Boolean(iterator(item));
    }, true);
    // return the results
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    if (iterator === undefined) {
      iterator = _.identity;
    }
    // TIP: There's a very clever way to re-use every() here.

    // if every item in collection is false for iterator
    // some is not true
    // otherwise some is true

    return !(_.every(collection, function(value) {
      return !iterator(value);
    }));
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    //get the arguments from the second on
    //if we can't slice args, first make it an array then slice
    var otherObjs = Array.prototype.slice.call(arguments, 1);

    //iterate through the collection of arguments, getting any key value pairs of additional objects beyond the first
    //add those key/value pairs to the first object
    _.each(otherObjs, function(objArg) {
      for (var key in objArg) {
        obj[key] = objArg[key];
      }
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    //get the arguments from the second on
    //if we can't slice args, first make it an array then slice
    var otherObjs = Array.prototype.slice.call(arguments, 1);

    //iterate through the collection of arguments, getting any key value pairs of additional objects beyond the first
    //add those key/value pairs to the first object
    _.each(otherObjs, function(objArg) {
      for (var key in objArg) {
        if (!obj.hasOwnProperty(key)) {
          obj[key] = objArg[key];
        }
      }
    });
    return obj;
  };

  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var results = {};

    return function() {
      //check an object where we've stored our function calls
      //if it doesn't, it will store the results of calling the function with these args
      //return that value from the results obj
      var args = Array.prototype.slice.call(arguments, 1);
      var argString = JSON.stringify(args);
      if (!results.hasOwnProperty(argString)) {
        results[argString] = func.apply(this, arguments);
      }
      return results[argString];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    //return settimeout
    //setTimeout(function(){ alert("Hello"); }, 3000);
    var delayTime = arguments[1];
    var args = Array.prototype.slice.call(arguments, 2);

    return setTimeout(function() {
      func.apply(this, args);
    }, delayTime);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var arrayCopy = array.slice();

    //iterate through arrayCopy
    //generate a random number between 0 and array length - 1
    //if random number is not the current index
    //swap current index with index of random number

    for (var i = 0; i < arrayCopy.length; i++) {
      var random = Math.floor(Math.random() * ((arrayCopy.length - 1) + 1));
      if (i !== random) {
        var temp = arrayCopy[random];
        arrayCopy[random] = arrayCopy[i];
        arrayCopy[i] = temp;
      }
    }

    return arrayCopy;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    var type = typeof functionOrKey;
    var results = [];

    //if functionOrKey is a function, call that function on each item in collection using apply
    //if functionOrKey is a method name, invoke that method name on each element using bracket notation
    if (type === 'function') {
      _.each(collection, function(element) {
        results.push(functionOrKey.apply(element, args));
      });
    } else if (type === 'string') {
      _.each(collection, function(element) {
        results.push(element[functionOrKey](args));
      });
    }    
    return results;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    //if iterator is a string
    var results = [];
    var resultsObj = {};
    var iterated = [];
    var sorted = [];
    var toPass = iterator;
    var uniq = [];
    
    //convert a string to a method or object lookup if needed

    if (typeof iterator === 'string') {
      toPass = function(element) {
        return element[iterator];
      };
    }

    //a new collection of the original values with iterator function and/or lookup
    iterated = _.map(collection, toPass);
    //a copy of the iterated array that is now sorted
    sorted = iterated.slice().sort();
    //store all the iterated values in an object
    for (var i = 0; i < collection.length; i++) {
      if (!resultsObj[iterated[i]]) {
        resultsObj[iterated[i]] = [collection[i]];
      } else {
        resultsObj[iterated[i]].push(collection[i]);
      }
    }
    //remove repeats for the resultsObj lookup
    uniq = _.uniq(sorted);
    //retrieve the iterated values in sorted order
    _.each(uniq, function(element) {
      _.each(resultsObj[element], function(el) {
        results.push(el);
      });
    });   
    return results;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var args = Array.prototype.slice.call(arguments);
    var zipped = [];
    var maxLength = 0;
    //get the longest length of the provided arrays in arguments
    _.each(args, function(arg) {
      if (arg.length > maxLength) {
        maxLength = arg.length;
      }
    });

    for (var i = 0; i < maxLength; i++) {
      var zip = [];
      _.each(args, function(arg) {
        if (arg[i]) {
          zip.push(arg[i]);
        } else {
          zip.push(undefined);
        }
      });
      zipped.push(zip);
    }
    return zipped;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    //if the element is an array, it recursively calls flatten. 
    return nestedArray.reduce(function(a, b) {
      return a.concat(Array.isArray(b) ? _.flatten(b) : b);      
    }, []);
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var results = [];
    var alreadyVisited = {};
    var args = Array.prototype.slice.call(arguments);
    
    for (var i = 0; i < args.length; i++) {
      _.each(args[i], function(element) {
        //if that element is already in alreadyVisited, skip it.
        //otherwise:
        //if that element is in all the other arrays, save it to alreadyVisited as true
        //otherwise save it to alreadyVisited as false
        if (!alreadyVisited[element]) {
          var result = element;
          //if we've gotten to the very last arguments array, any element not already in the object
          //is not in all of them
          if (i === args.length - 1) {
            result = false;
          } else {
            for (var j = i; j < args.length; j++) {
              if (args[j].indexOf(element) < 0) {
                result = false;
              }
            }
          }
          alreadyVisited[element] = result;
        }    
      });
    }

    for (var key in alreadyVisited) {
      if (alreadyVisited[key] !== false) {
        results.push(alreadyVisited[key]);
      }
    }
    return results;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var results = [];
    var intersections = [];
    var argsArrays = Array.prototype.slice.call(arguments, 1);
    
    _.each(argsArrays, function(argArray) {
      var intersection = _.intersection(argArray, array);
      _.each(intersection, function(element) {
        intersections.push(element);
      });
    });
    
    for (var i = 0; i < array.length; i++) {
      if (!intersections.includes(array[i])) {
        results.push(array[i]);
      }
    }
    return results;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    var alreadyCalled = 0;

    return function() {
      if (alreadyCalled < 2) {
        alreadyCalled += 1;
        setTimeout(func, wait);
      }
    };
  };
}());
