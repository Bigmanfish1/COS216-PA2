/*jshint esversion: 6 */
//I used asynchronous calls for my data because it did not really affect the results whether they were in order or not as the data would be organisd
//once the result of the call is received.
//I used synchronous calls for my images so that they can all be processed in the specific order in which each api call was made so that the images
//can match the information that is displayed on the page
const loader = document.querySelector("#loader");

// showing loading
function displayLoading() {
    loader.classList.add("display");
    // to stop loading after some time
    setTimeout(() => {
        loader.classList.remove("display");
    }, 5000);
}

// hiding loading 
function hideLoading() {
    loader.classList.remove("display");
}

displayLoading();

var req = new XMLHttpRequest();

req.open("POST", "https://wheatley.cs.up.ac.za/api/", true);
var body = JSON.stringify({
    "studentnum": "u22492616",
    "type": "GetAllCars",
    "apikey": "a9198b68355f78830054c31a39916b7f",
    "search":{
        "transmission": "Automatic"
    },
    "limit": 499,
    "return": ["make"]
});

req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
        var brands = JSON.parse(req.responseText);
        var bArray = [];
        brands.data.forEach(element => {
            if(!bArray.includes(element.make)){
                bArray.push(element.make);
            }
        });
        
        var nS, pS;
        var ranNum = [];
        var minN = 0;
        var maxN = bArray.length-1;
        var num = 24;

        for(var j = 0; j < num; j++){
            do{
                nS = Math.floor(Math.random() * (maxN - minN + 1)) + minN;
                pS = ranNum.includes(nS);
                if(!pS){
                    ranNum.push(nS);
                }
            }while(pS == true);
        }

        for (var i = 0; i < 24; i++) {
            
            var idName = "brand" + i;
            const req1 = new XMLHttpRequest();
            req1.open("GET", "https://wheatley.cs.up.ac.za/api/getimage?brand=" + bArray[ranNum[i]], false);   
            req1.onreadystatechange = function () {
                if (req1.readyState == 4 && req1.status == 200) {
                    hideLoading();
                    var imgPath1 = req1.responseText;
                    document.getElementById(idName).src = imgPath1;

                }
            };

            req1.send();

        }
    }
    
};

req.send(body);
