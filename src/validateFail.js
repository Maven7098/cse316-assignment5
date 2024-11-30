export function validateFail (message, newItem) {
    alert(message);
    for(const item in newItem){
        console.log(newItem[item]);
    }
}