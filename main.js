function randomArray(len, mod) {
    let arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(Math.random() * Number.MAX_VALUE % (mod-1) + 1)
    }
    return arr;
}

function animateSort(sortFunction, arr) {
    let labels = [];
    arr.forEach(_ => {labels.push("")});

    let bgraph_element = document.getElementById("bargraph")
    let chart = new Chart(bgraph_element, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'label',
                data: arr
            }]
        }
    })

    let generator = sortFunction(arr);
    const timedLoop = () => {
        setTimeout((_) => {
            if (!generator.next()["done"]) {
                chart.update()
                timedLoop();
            } else {
                chart.update();
            }

        }, 1000)
    }

    timedLoop();
}

function bubbleSort(arr){
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr.length; j++){
            if(arr[i] > arr[j]){

            }
        }
    }
}

function insertionSort(arr){
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < i; j++){
            if(arr[i] < arr[j]){
                arr.insert(j, arr[i]);
            }
        }
    }
}

function* selectionSort(arr){
    for(let i = 0; i < arr.length; i++){
        let min = arr[i]
        let min_i = i;
        for(let j = i; j < arr.length; j++){
            if(arr[j] < min){
                min = arr[j];
                min_i = j;
            }
        }
        arr[min_i] = arr[i];
        arr[i] = min;
        yield;
    }
}

function cycleSort(){

}

function heapSort(arr){
    // swap lowest to start of array as 0 idx is treated as null to simplify parent/child calculations
    let idx = 0;
    let lowest = arr[0];

    for (let i = 0; i < arr.length; i++) {
        if (lowest > arr[i]) {
            lowest = arr[i];
            idx = i;
        }
    }

    arr[idx] = arr[0];
    arr[0] = lowest;


    for (let i = Math.floor(arr.length / 2); i > 0; i--) {
        heapSortPertubateDown(arr, i, arr.length);
    }

    console.log(arr)

    for (let i = arr.length - 1; i > 1; i--) {
        let tmp = arr[1];
        arr[1] = arr[i];
        arr[i] = tmp;

        heapSortPertubateDown(arr, 1, i);

    }
}

function heapSortPertubateDown(arr, idx, sorted_idx) {
    // recursively swap parent with greatest child if needed 
    let child_idx = idx * 2;

    if (child_idx >= sorted_idx) {
        return;
    } 

    let child_value = arr[child_idx];

    if (idx * 2 + 1 < sorted_idx) {
        let right_child_idx = idx * 2 + 1;
        let right_child_value = arr[right_child_idx];

        if (right_child_value > child_value) {
            child_idx = right_child_idx;
            child_value = right_child_value
        }
    }

    if (child_value > arr[idx]) {
        let tmp = arr[idx];
        arr[idx] = arr[child_idx];
        arr[child_idx] = tmp;

        heapSortPertubateDown(arr, child_idx, sorted_idx);
    }
}

function mergeSort(){

}