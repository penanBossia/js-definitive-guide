function builArray(length) {
    const arrayToSort = [];
    let i = 0;
    while (i++ < 1000) {
        const item = (Math.random() * length)
        arrayToSort.push(Math.floor(item) + 1);
    }
    return arrayToSort;
}

function bubbleSort(array) {
    let numbersSwitched;
    do {
        numbersSwitched = false;
        for (let i = 0; i < array.length; i++) {
            if (array[i+1] < array[i]) {
                let tmp = array[i];
                array[i] = array[i+1];
                array[i+1] = tmp;
                numbersSwitched = true;
            }
        }

    } while (numbersSwitched)
}

function insertSort(array) {
    const sortedArray = [];
    for (number of array) {
        for (let i=0; i<sortedArray.length; i++) {
            if (number < sortedArray[i]) {
                sortedArray.splice(i, 0, number);
                break;
            }
        }
        sortedArray.push(number);
    }
    return sortedArray;
}

function quickSort(array) {
    if (array.length < 2) {
        return array;
    }
    let lowerArray = [];
    let higherArray = [];
    let pivot = array[0];
    for (number of array) {
        if (number < pivot) {
            lowerArray.push(number);
        } else {
            higherArray.push(number);
        }
    }
    let sortedList = quickSort(lowerArray);
    sortedList = [...sortedList, ...quickSort(higherArray)];
    return sortedList;
}

let arrayToSort = builArray(10);
console.log(arrayToSort);
console.time("Bubbble sort")
bubbleSort(arrayToSort);
console.timeEnd("Bubbble sort");
console.log(arrayToSort);

arrayToSort = builArray(1000);
console.time("Insert Sort");
const insertSortArray = insertSort(arrayToSort);
console.timeEnd("Insert Sort");
console.log(insertSortArray);

/*arrayToSort = builArray(10);
console.time("Quick sort")
const sortedArray = quickSort(arrayToSort);
console.timeEnd("Quick sort");
console.log(sortedArray)*/
