function randomArray(len, mod) {
    let arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(Math.random() * Number.MAX_VALUE % (mod-1) + 1)
    }
    return arr;
}

async function animateSort(sortFunction, arr) {
    let labels = [];
    let background = [];
    arr.forEach(_ => {labels.push("")});
    arr.forEach(_ => {background.push("red")});
    background[0] = "blue";

    let bgraph_element = document.getElementById("bargraph")
    let chart = new Chart(bgraph_element, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'label',
                data: arr,
                backgroundColor: background
            }]
        }
    })


    var i;
    var j;
    var next = {"done": false}
    let generator = sortFunction(arr);
    while (!next["done"]) {
        background[i] = "red";
        background[j] = "red";

        next = generator.next();
        i = next.value.i;
        j = next.value.j;
        background[i] = "pink";
        background[j] = "pink";
        await new Promise(_=>{setTimeout(_, 1000)});
        chart.update();
    }
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
            yield {i: i, j: j}; 
            if(arr[j] < min){
                min = arr[j];
                min_i = j;
            }
        }
        arr[min_i] = arr[i];
        arr[i] = min;

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
