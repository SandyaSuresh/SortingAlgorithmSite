const COLOR_BASE_GRAPH = "red";
const COLOR_MAX_VALUE_FOUND = "blue";
const COLOR_SWAP_POSITIONS = "pink";

function randomArray(len, mod) {
    let arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(Math.random() * Number.MAX_VALUE % (mod-1) + 1)
    }
    return arr;
}

async function animateSort(sortFunction, arr) {
    let labels = arr.map(_ => {return ""})
    let background = arr.map(_ => {return COLOR_BASE_GRAPH});

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

    let generator = sortFunction(arr);
    for (const colors of generator) {
        //background[i] = COLOR_BASE_GRAPH;
        //console.log(background);

        for(let i = 0; i < background.length; i++){
            background[i] = colors[i];
        }
        //console.log(background);
        //background[j] = COLOR_BASE_GRAPH;

        //console.log(next);
        //background = next.value;
        await new Promise(_=>{setTimeout(_, 1000)});
        chart.update();
    }
}

function* bubbleSort(arr){
    for(let i = 0; i < arr.length; i++){
        let swap = false;

        for(let j = 0; j < arr.length - 1; j++){
            let color_arr = arr.map(_ => {return COLOR_BASE_GRAPH})

            if (arr[j] > arr[j+1]) {
                color_arr[j] = COLOR_MAX_VALUE_FOUND;
                color_arr[j+1] = COLOR_MAX_VALUE_FOUND;

                let tmp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = tmp;

                swap = true;
            } else {
                color_arr[j] = COLOR_SWAP_POSITIONS;
                color_arr[j+1] = COLOR_SWAP_POSITIONS;
            }

            yield color_arr;
        }

        if (!swap) {
            yield arr.map(_ => {return COLOR_BASE_GRAPH});
            return; // returning the color array results in a a false val.next, so the colors don't actually update
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
    let color_arr = [];
    for(let i = 0; i < arr.length; i++){
        arr.forEach(_ => {color_arr.push(COLOR_BASE_GRAPH)});
        let min = arr[i];
        let min_i = i;
        color_arr[i] = COLOR_MAX_VALUE_FOUND;
        for(let j = i+1; j < arr.length; j++){
            color_arr[j] = COLOR_SWAP_POSITIONS;
            yield color_arr; 
            if(arr[j] < min){
                color_arr[min_i] = min_i == i ? COLOR_SWAP_POSITIONS : COLOR_BASE_GRAPH;
                color_arr[j] = COLOR_MAX_VALUE_FOUND;
                min = arr[j];
                min_i = j;
                
            }else{color_arr[j] = COLOR_BASE_GRAPH;}
        }
        arr[min_i] = arr[i];
        arr[i] = min;
        color_arr[i] = COLOR_BASE_GRAPH;
        color_arr[min_i] = COLOR_BASE_GRAPH;
    }
    yield color_arr;
}

function* cycleSort(arr){
    for(let i = 0; i < arr.length; i++){
        cycleSortHelper(arr, arr[i]);
    }
}

function cycleSortHelper(arr, val){
        let corr_pos = 0;

        //determine the position the element in the array should be at
        for(let j = 0; j < arr.length; j++){
            if(arr[j] < val){
                corr_pos++;
            }
        }

        //if the value is already at the correct position, break out of the recursion
        if(arr[corr_pos] == val){
            return;
        }

        //replace the value at the correct position with the current value
        let temp = arr[position];
        arr[position] = arr[i];

        //recurse on the value that got replaced
        cycleSortHelper(temp);
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
