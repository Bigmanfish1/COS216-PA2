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
var req1 = new XMLHttpRequest();

req1.open("POST", "https://wheatley.cs.up.ac.za/api/", true);

var body = JSON.stringify({
    "studentnum": "u22492616",
    "type": "GetAllCars",
    "apikey": "a9198b68355f78830054c31a39916b7f",
    "limit": 20,
    "search": {
        "transmission": "Automatic",
        "engine_type": "Diesel",
    },
    "fuzzy": true,
    "sort": "max_speed_km_per_h",
    "order": "DESC",
    "return": [
        "id_trim", "make", "model", "year_to", "transmission", "max_speed_km_per_h", "drive_wheels", "number_of_cylinders"
    ]
})

req1.onreadystatechange = function () {
    localStorage.setItem('searchT', "normal");
    localStorage.setItem('trG', "");
    localStorage.setItem('fG',"");
    localStorage.setItem('bG', "");
    if (req1.readyState == 4 && req1.status == 200) {
        hideLoading();
        var cars = JSON.parse(req1.responseText);

        for (var i = 0; i < cars.data.length; i++) {
            var carI = "car" + i;
            var imgReq = new XMLHttpRequest();
            imgReq.open("GET", "https://wheatley.cs.up.ac.za/api/getimage?brand=" + cars.data[i].make + "&model=" + cars.data[i].model, false);
            imgReq.onreadystatechange = function () {
                if (imgReq.readyState == 4 && imgReq.status == 200) {
                    var imgPath = imgReq.responseText;
                    document.getElementById(carI).src = imgPath;
                }
            }
            imgReq.send();
            var carT = "car" + i + "T";
            var carD = "car" + i + "D";
            var carTr = "car" + i + "Tr";
            var carS = "car" + i + "S";
            var name = document.getElementById(carT);
            var drive = document.getElementById(carD);
            var transm = document.getElementById(carTr);
            var speed = document.getElementById(carS);
            name.innerHTML = cars.data[i].make + " " + cars.data[i].model + " " + cars.data[i].year_to;
            drive.innerHTML = cars.data[i].drive_wheels;
            transm.innerHTML = cars.data[i].transmission;
            speed.innerHTML = "Max speed: " + cars.data[i].max_speed_km_per_h;
        }

    }
}
req1.send(body);


function search() {
    var input = document.getElementById("search1");
    var filter = input.value;
    var noRes = document.getElementById("noRes").innerHTML = "";
    if (filter.length > 0) {
        for (var i = 0; i < 20; i++) {
            var carT = "car" + i + "T";
            var carD = "car" + i + "D";
            var carTr = "car" + i + "Tr";
            var carS = "car" + i + "S";
            document.getElementById(carT).innerHTML = "";
            document.getElementById(carD).innerHTML = "";
            document.getElementById(carTr).innerHTML = "";
            document.getElementById(carS).innerHTML = "";
            document.getElementById("car" + i).src = "";
        }
        displayLoading();
        var req = new XMLHttpRequest();
        var body = JSON.stringify({
            "studentnum": "u22492616",
            "type": "GetAllCars",
            "apikey": "a9198b68355f78830054c31a39916b7f",
            "search": {
                "make": filter
            },
            "order": "ASC",
            "limit": 20,
            "fuzzy": false,
            "return": [
                "make", "model", "year_to", "transmission", "max_speed_km_per_h", "drive_wheels", "number_of_cylinders"
            ]
        })
        localStorage.setItem('searchT', filter);
        localStorage.setItem('trG', "");
        localStorage.setItem('fG',"");
        localStorage.setItem('bG', "");
        req.open("POST", "https://wheatley.cs.up.ac.za/api/", true);
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                var cars = JSON.parse(req.responseText);
                if (cars.data.length == 0) {
                    var noRes = document.getElementById("noRes");
                    noRes.innerHTML = "No results were found";
                } else {
                    var noRes = document.getElementById("noRes");
                    noRes.innerHTML = "";
                    for (var i = 0; i < cars.data.length; i++) {
                        var carI = "car" + i;
                        var imgReq = new XMLHttpRequest();
                        imgReq.open("GET", "https://wheatley.cs.up.ac.za/api/getimage?brand=" + cars.data[i].make + "&model=" + cars.data[i].model, false);
                        imgReq.onreadystatechange = function () {
                            if (imgReq.readyState == 4 && imgReq.status == 200) {
                                var imgPath = imgReq.responseText;
                                document.getElementById(carI).src = imgPath;
                            }
                        }
                        imgReq.send();
                        var carT = "car" + i + "T";
                        var carD = "car" + i + "D";
                        var carTr = "car" + i + "Tr";
                        var carS = "car" + i + "S";
                        var name = document.getElementById(carT);
                        var drive = document.getElementById(carD);
                        var transm = document.getElementById(carTr);
                        var speed = document.getElementById(carS);
                        name.innerHTML = cars.data[i].make + " " + cars.data[i].model + " " + cars.data[i].year_to;
                        drive.innerHTML = cars.data[i].drive_wheels;
                        transm.innerHTML = cars.data[i].transmission;
                        speed.innerHTML = "Max speed: " + cars.data[i].max_speed_km_per_h;
                    }
                }
            }
            const sB = document.getElementById("sB1");
            sB.addEventListener("click", function(){
                localStorage.setItem('searchT', filter);
                localStorage.setItem('trG', "");
                localStorage.setItem('fG',"");
                localStorage.setItem('bG', "");
                input.value = "";
            });
        }

        req.send(body);
    } else {
        var req1 = new XMLHttpRequest();

        req1.open("POST", "https://wheatley.cs.up.ac.za/api/", true);

        var body = JSON.stringify({
            "studentnum": "u22492616",
            "type": "GetAllCars",
            "apikey": "a9198b68355f78830054c31a39916b7f",
            "limit": 20,
            "search": {
                "transmission": "Automatic",
                "engine_type": "Diesel",
            },
            "fuzzy": true,
            "sort": "max_speed_km_per_h",
            "order": "DESC",
            "return": [
                "id_trim", "make", "model", "year_to", "transmission", "max_speed_km_per_h", "drive_wheels", "number_of_cylinders"
            ]
        })
        req1.onreadystatechange = function () {
            localStorage.setItem('searchT', "normal");
            localStorage.setItem('trG', "");
            localStorage.setItem('fG',"");
            localStorage.setItem('bG', "");
            if (req1.readyState == 4 && req1.status == 200) {
                hideLoading();
                var cars = JSON.parse(req1.responseText);

                for (var i = 0; i < cars.data.length; i++) {
                    var carI = "car" + i;
                    var imgReq = new XMLHttpRequest();
                    imgReq.open("GET", "https://wheatley.cs.up.ac.za/api/getimage?brand=" + cars.data[i].make + "&model=" + cars.data[i].model, false);
                    imgReq.onreadystatechange = function () {
                        if (imgReq.readyState == 4 && imgReq.status == 200) {
                            var imgPath = imgReq.responseText;
                            document.getElementById(carI).src = imgPath;
                        }
                    }
                    imgReq.send();
                    var carT = "car" + i + "T";
                    var carD = "car" + i + "D";
                    var carTr = "car" + i + "Tr";
                    var carS = "car" + i + "S";
                    var name = document.getElementById(carT);
                    var drive = document.getElementById(carD);
                    var transm = document.getElementById(carTr);
                    var speed = document.getElementById(carS);
                    name.innerHTML = cars.data[i].make + " " + cars.data[i].model + " " + cars.data[i].year_to;
                    drive.innerHTML = cars.data[i].drive_wheels;
                    transm.innerHTML = cars.data[i].transmission;
                    speed.innerHTML = "Max speed: " + cars.data[i].max_speed_km_per_h;
                }

            }
                
            
        }

        
        req1.send(body);
    }
}
const input = document.querySelector("#search1");
input.addEventListener("keydown", search);


function filter(){
    val = localStorage.getItem('searchT');
    var trO = document.querySelector('#transmission').value;
    var fO = document.querySelector('#fuel-type').value;
    var carO = document.querySelector('#car-type').value;
    var transM, fuel, body, newVal;
    if(val !== "normal"){
        newVal = val;
    }else{
        newVal="";
    }
        if(trO == "none"){
            transM = "";
        }else{
            transM = trO;
        }
    
        if(fO == "none"){
            fuel = "";
        }else{
            fuel = fO;
        }
    
        if(carO == "none"){
            body="";
        }else{
            body=carO;
        }
    localStorage.setItem('trG', transM);
    localStorage.setItem('fG',fuel);
    localStorage.setItem('bG', body);
        for (var i = 0; i < 20; i++) {
            var carT = "car" + i + "T";
            var carD = "car" + i + "D";
            var carTr = "car" + i + "Tr";
            var carS = "car" + i + "S";
            document.getElementById(carT).innerHTML = "";
            document.getElementById(carD).innerHTML = "";
            document.getElementById(carTr).innerHTML = "";
            document.getElementById(carS).innerHTML = "";
            document.getElementById("car" + i).src = "";
        }
        displayLoading();
        var req = new XMLHttpRequest();
        var body = JSON.stringify({
            "studentnum": "u22492616",
            "type": "GetAllCars",
            "apikey": "a9198b68355f78830054c31a39916b7f",
            "search": {
                "make": newVal,
                "transmission": transM,
                "engine_type": fuel,
                "body_type": body
            },
            "limit": 20,
            "fuzzy": false,
            "return": [
                "make", "model", "year_to", "transmission", "max_speed_km_per_h", "drive_wheels", "number_of_cylinders"
            ]
        })
        req.open("POST", "https://wheatley.cs.up.ac.za/api/", true);
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                hideLoading();
                var cars = JSON.parse(req.responseText);
                if (cars.data.length == 0) {
                    var noRes = document.getElementById("noRes");
                    noRes.innerHTML = "No results were found";
                } else {
                    var noRes = document.getElementById("noRes");
                    noRes.innerHTML = "";
                    for (var i = 0; i < cars.data.length; i++) {
                        var carI = "car" + i;
                        var imgReq = new XMLHttpRequest();
                        imgReq.open("GET", "https://wheatley.cs.up.ac.za/api/getimage?brand=" + cars.data[i].make + "&model=" + cars.data[i].model, false);
                        imgReq.onreadystatechange = function () {
                            if (imgReq.readyState == 4 && imgReq.status == 200) {
                                var imgPath = imgReq.responseText;
                                document.getElementById(carI).src = imgPath;
                            }
                        }
                        imgReq.send();
                        var carT = "car" + i + "T";
                        var carD = "car" + i + "D";
                        var carTr = "car" + i + "Tr";
                        var carS = "car" + i + "S";
                        var name = document.getElementById(carT);
                        var drive = document.getElementById(carD);
                        var transm = document.getElementById(carTr);
                        var speed = document.getElementById(carS);
                        name.innerHTML = cars.data[i].make + " " + cars.data[i].model + " " + cars.data[i].year_to;
                        drive.innerHTML = cars.data[i].drive_wheels;
                        transm.innerHTML = cars.data[i].transmission;
                        speed.innerHTML = "Max speed: " + cars.data[i].max_speed_km_per_h;
                    }
                }
            }
        }
    
        req.send(body);
    
    

}

var filterB = document.getElementById("submit");
filterB.addEventListener("click", filter);

function sort(){
    var val = localStorage.getItem('searchT');
    var tG = localStorage.getItem('trG');
    var fG1 = localStorage.getItem('fG');
    var bG1 = localStorage.getItem('bG');
    var sortO = document.getElementById("sortBox").value;
    var val1="", sort1="", order="";
    if(val !== "normal"){
        val1 = val;
    }else{
        val1 = "";
    }

    if(sortO === "none"){
        sort1 = "";
        order = "";
    }else{
        if(sortO === "Year(ASC)"){
            order = "ASC";
            sort1 = "year_to";
        }
        
        if(sortO === "Year(DESC)"){
            order = "DESC";
            sort1 = "year_to";
        }

        if(sortO === "Name(ASC)"){
            order = "ASC";
            sort1 = "make";
        }

        if(sortO === "Name(DESC)"){
            order = "DESC";
            sort1 = "make";
        }
    }

    for (var i = 0; i < 20; i++) {
        var carT = "car" + i + "T";
        var carD = "car" + i + "D";
        var carTr = "car" + i + "Tr";
        var carS = "car" + i + "S";
        document.getElementById(carT).innerHTML = "";
        document.getElementById(carD).innerHTML = "";
        document.getElementById(carTr).innerHTML = "";
        document.getElementById(carS).innerHTML = "";
        document.getElementById("car" + i).src = "";
    }
    displayLoading();
    var req = new XMLHttpRequest();
    var body = JSON.stringify({
        "studentnum": "u22492616",
        "type": "GetAllCars",
        "apikey": "a9198b68355f78830054c31a39916b7f",
        "search": {
            "make": val1,
            "transmission": tG,
            "engine_type": fG1,
            "body_type": bG1
        },
        "sort": sort1,
        "order": order,
        "limit": 20,
        "fuzzy": false,
        "return": [
            "make", "model", "year_to", "transmission", "max_speed_km_per_h", "drive_wheels", "number_of_cylinders"
        ]
    })
    req.open("POST", "https://wheatley.cs.up.ac.za/api/", true);
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            hideLoading();
            var cars = JSON.parse(req.responseText);
            if (cars.data.length == 0) {
                var noRes = document.getElementById("noRes");
                noRes.innerHTML = "No results were found";
            } else {
                var noRes = document.getElementById("noRes");
                noRes.innerHTML = "";
                for (var i = 0; i < cars.data.length; i++) {
                    var carI = "car" + i;
                    var imgReq = new XMLHttpRequest();
                    imgReq.open("GET", "https://wheatley.cs.up.ac.za/api/getimage?brand=" + cars.data[i].make + "&model=" + cars.data[i].model, false);
                    imgReq.onreadystatechange = function () {
                        if (imgReq.readyState == 4 && imgReq.status == 200) {
                            var imgPath = imgReq.responseText;
                            document.getElementById(carI).src = imgPath;
                        }
                    }
                    imgReq.send();
                    var carT = "car" + i + "T";
                    var carD = "car" + i + "D";
                    var carTr = "car" + i + "Tr";
                    var carS = "car" + i + "S";
                    var name = document.getElementById(carT);
                    var drive = document.getElementById(carD);
                    var transm = document.getElementById(carTr);
                    var speed = document.getElementById(carS);
                    name.innerHTML = cars.data[i].make + " " + cars.data[i].model + " " + cars.data[i].year_to;
                    drive.innerHTML = cars.data[i].drive_wheels;
                    transm.innerHTML = cars.data[i].transmission;
                    speed.innerHTML = "Max speed: " + cars.data[i].max_speed_km_per_h;
                }
            }
        }
    }

    req.send(body);
}

var sortB = document.getElementById("submit1");
sortB.addEventListener("click", sort);