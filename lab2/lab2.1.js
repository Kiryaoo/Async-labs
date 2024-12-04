async function asyncMap(arr, callback) {
    const result = [];


    for (let i = 0; i < arr.length; i++) {
        const transformedValue = await new Promise((resolve, reject) => {
            callback(arr[i], i, (value) => resolve(value));
        });
        result[i] = transformedValue;
    }

    return result;
}


const numbers = [1, 2, 3, 4];

function doubleAsync(num, index, callback) {
    setTimeout(() => {
        callback(num * 2);
    }, 1000);
}

asyncMap(numbers, doubleAsync).then(result => {
    console.log(result);
});