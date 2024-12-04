function asyncMapWithAbort(arr, callback, signal) {
    return new Promise((resolve, reject) => {
        if (signal?.aborted) {
            return reject(new Error("Operation aborted"));
        }

        const result = [];
        let completed = 0;

        signal?.addEventListener("abort", () => {
            reject(new Error("Operation aborted"));
        });

        for (let i = 0; i < arr.length; i++) {
            callback(arr[i], i, signal, (transformedValue) => {
                if (signal?.aborted) return;

                result[i] = transformedValue;
                completed++;

                if (completed === arr.length) {
                    resolve(result);
                }
            });
        }
    });
}


function doubleAsyncWithAbort(num, index, signal, callback) {
    const timeout = setTimeout(() => {
        if (!signal.aborted) {
            callback(num * 2);
        }
    }, 1000);

    // Очищення timeout при скасуванні
    signal.addEventListener("abort", () => {
        clearTimeout(timeout);
    });
}

// Використання:
const numbers = [1, 2, 3, 4];
const controller = new AbortController();

asyncMapWithAbort(numbers, doubleAsyncWithAbort, controller.signal)
    .then((result) => {
        console.log("Result:", result);
    })
    .catch((err) => {
        console.error("Error:", err.message);
    });


setTimeout(() => {
    controller.abort();
}, 2500);
