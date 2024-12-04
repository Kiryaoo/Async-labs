function asyncMap(arr, callback) {
    let result = [];
    let completed = 0;


    for (let i = 0; i < arr.length; i++) {

        callback(arr[i], i, function(transformedValue) {
            result[i] = transformedValue;
            completed++;


            if (completed === arr.length) {
                console.log(result);
            }
        });
    }
}


const numbers = [1, 2, 3, 4];

function doubleAsync(num, index, callback) {
    setTimeout(() => {
        callback(num * 2);
    }, 1000);
}

asyncMap(numbers, doubleAsync);

