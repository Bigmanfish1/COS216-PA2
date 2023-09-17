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

var slider = document.getElementById("priceRange");
var output = document.getElementById("rangeValue");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
};

var slider1 = document.getElementById("priceRange1");
var output1 = document.getElementById("rangeValue1");
output1.innerHTML = slider1.value;

slider1.oninput = function () {
    output1.innerHTML = this.value;
};



//Getting the results from the api call
const req = new XMLHttpRequest();
var submit = document.getElementById("submitButton");

function getResults() {
    displayLoading();
    var s1 = slider.value;
    var s2 = slider1.value;


    if (document.querySelector('input[type="radio"][name="smart-type"]:checked') == null && s2 == 0) {
        var q1 = document.querySelector('input[type="radio"][name="petrol-type"]:checked').value;
        var q2 = document.querySelector('input[type="radio"][name="transmission"]:checked').value;
        var q3 = document.querySelector('input[type="radio"][name="car-type"]:checked').value;
        var body = JSON.stringify({
            "studentnum": "u22492616",
            "type": "GetAllCars",
            "limit": 5,
            "apikey": "a9198b68355f78830054c31a39916b7f",
            "search": {
                "engine_type": q1,
                "transmission": q2,
                "body_type": q3,
                "number_of_seats": s1
            },
            "fuzzy": true,
            "sort": "model",
            "order": "DESC",
            "return": [
                "id_trim", "make", "model", "year_to"
            ]
        });
    } else {
        var q1 = document.querySelector('input[type="radio"][name="petrol-type"]:checked').value;
        var q2 = document.querySelector('input[type="radio"][name="transmission"]:checked').value;
        var q3 = document.querySelector('input[type="radio"][name="car-type"]:checked').value;
        var q6 = document.querySelector('input[type="radio"][name="smart-type"]:checked').value;
        var body = JSON.stringify({
            "studentnum": "u22492616",
            "type": "GetAllCars",
            "limit": 5,
            "apikey": "a9198b68355f78830054c31a39916b7f",
            "search": {
                "engine_type": q1,
                "transmission": q2,
                "body_type": q3,
                "number_of_seats": s1,
                "number_of_cylinders": s2,
                "drive_wheels": q6
            },
            "fuzzy": true,
            "sort": "model",
            "order": "DESC",
            "return": [
                "id_trim", "make", "model", "year_to"
            ]
        });
    }

    req.open("POST", "https://wheatley.cs.up.ac.za/api/", true);

    req.onreadystatechange = function () {
        var res1 = document.getElementById("res0");
        var res2 = document.getElementById("res1");
        var res3 = document.getElementById("res2");
        var res4 = document.getElementById("res3");
        var res5 = document.getElementById("res4");
        var img1 = document.getElementById("img0");
        var img2 = document.getElementById("img1");
        var img3 = document.getElementById("img2");
        var img4 = document.getElementById("img3");
        var img5 = document.getElementById("img4");
        if (req.readyState == 4 && req.status == 200) {
            hideLoading();
            var text = JSON.parse(req.responseText);
            if (text.data.length == 0) {
                res1.innerHTML = "";
                res2.innerHTML = "";
                res3.innerHTML = "";
                res4.innerHTML = "";
                res5.innerHTML = "";
                img1.src = "";
                img2.src = "";
                img3.src = "";
                img4.src = "";
                img5.src = "";
                var noRes = document.getElementById("noRes");
                noRes.innerHTML = "No results were found";
            } else {
                res1.innerHTML = "";
                res2.innerHTML = "";
                res3.innerHTML = "";
                res4.innerHTML = "";
                res5.innerHTML = "";
                img1.src = "";
                img2.src = "";
                img3.src = "";
                img4.src = "";
                img5.src = "";
                var noRes = document.getElementById("noRes");
                noRes.innerHTML = "";

                for (var i = 0; i < text.data.length; i++) {
                    document.getElementById("res" + i).innerHTML = text.data[i].make + " " + text.data[i].model + " " + text.data[i].year_to;

                    const imgReq = new XMLHttpRequest();
                    imgReq.open("GET", "https://wheatley.cs.up.ac.za/api/getimage?brand=" + text.data[i].make.toLowerCase() + "&model=" + text.data[i].model.toLowerCase(), false);
                    imgReq.onreadystatechange = function () {
                        if (imgReq.readyState == 4 && imgReq.status == 200) {
                            var img1Path = imgReq.responseText;
                            document.getElementById("img"+i).src = img1Path;
                        }
                    };

                    imgReq.send();
                }
                
            }

        }


    };

    req.send(body);



}

submit.addEventListener("click", getResults);




