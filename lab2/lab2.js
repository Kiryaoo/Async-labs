function promiseMap(arr, callback) {
    const promises = arr.map((element, index) => {
        return new Promise((resolve, reject) => {
            callback(element, index, (transformedValue) => {
                resolve(transformedValue);
            });
        });
    });
    return Promise.all(promises);
}


const numbers = [1, 2, 3, 4];

function doublePromise(num, index, callback) {
    setTimeout(() => {
        callback(num * 2);
    }, 1000);
}

promiseMap(numbers, doublePromise)
    .then((result) => {
        console.log(result); // Виведе [2, 4, 6, 8]
    })
    .catch((error) => {
        console.error(error);
    });