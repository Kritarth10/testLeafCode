
function launchBrowser(browserName){
    if(browserName=="chrome")
    console.log("Your browser is ",browserName);
    else
    console.log("Incorrect browser");
}

launchBrowser("chrome");
launchBrowser("safari");

function runTests(testType){
    switch(testType) {
        case "smoke":
            console.log(testType + " test");
            break;
        case "sanity":
            console.log(testType + " test");
            break;
        case "regression":
            console.log(testType + " test");
            break;
        default:
            console.log("Smoke test");
    }
}
runTests("smoke");
runTests("sanity");
runTests("e2e");