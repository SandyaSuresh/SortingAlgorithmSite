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

function selectionSort(arr){
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
    }
}

function cycleSort(){

}

function heapSort(){

}

function mergeSort(){

}