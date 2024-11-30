export function validateFail (message, newItem) {
    alert(message);
    for(item of newItem){
        console.log(item);
    }
}