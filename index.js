const fetch = require('node-fetch');

/**
 * Runs the generator function for asynchronous functions.
 * @param {Function} generator 
 */
function run(generator) {
    const iterator = generator();
    function iterate(iteration) {
        if (iteration.done) return iteration.value;
        const promise = iteration.value;
        return promise.then(x => iterate(iterator.next(x)));
    };
    return iterate(iterator.next());
}

/*
        *   The yield keyword hands over the promise returned by fetch and yields it to the generator function run().
        *   After run() resolves the promise, then the value of the resolved fetch() promise is passed into the response variable.
        *   This operation is repeated and post receives an object from the generator.
    */ 
run(function *() {
    const uri = 'https://jsonplaceholder.typicode.com/posts/1';
    const response = yield fetch(uri);
    const post = yield response.json();
    const title = post.title;
    return title;
})
.catch(error => console.log(error.stack))
.then(data => console.log('run() resulted in: ', data))