function error(message) {
    throw new Error(message);
}
console.log(typeof error('test'));
function fail() {
    return error("Something failed");
}
console.log(typeof fail());
function infiniteLoop() {
    while (true) {
    }
}
