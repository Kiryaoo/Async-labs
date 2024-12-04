async function* asyncIterator(data) {
    for (let i = 0; i < data.length; i++) {
        yield new Promise((resolve) => {
            setTimeout(() => resolve(data[i]), 1000);
        });
    }
}


const data = [1, 2, 3, 4, 5];
async function processData() {
    for await (const item of asyncIterator(data)) {
        console.log('Processed item:', item);
    }
}

processData();
