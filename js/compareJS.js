/*jshint esversion: 6 */
//I used asynchronous calls for my data because it did not really affect the results whether they were in order or not as the data would be organisd
//once the result of the call is received.
//I used synchronous calls for my images so that they can all be processed in the specific order in which each api call was made so that the images
//can match the information that is displayed on the page
const loader = document.querySelector("#loader");
const loader1 = document.querySelector("#loader1");
const loader2 = document.querySelector("#loader2");
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

function displayLoading1() {
    loader1.classList.add("display");
    // to stop loading after some time
    setTimeout(() => {
        loader1.classList.remove("display");
    }, 5000);
}

// hiding loading 
function hideLoading1() {
    loader1.classList.remove("display");
}

function displayLoading2() {
    loader2.classList.add("display");
    // to stop loading after some time
    setTimeout(() => {
        loader2.classList.remove("display");
    }, 5000);
}

// hiding loading 
function hideLoading2() {
    loader2.classList.remove("display");
}

function search() {
    var input = document.getElementById("search1");
    var filter = input.value;
    var list = document.getElementById("list");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    if (filter.length > 0) {
        var req = new XMLHttpRequest();
        var body = JSON.stringify({
            "studentnum": "u22492616",
            "type": "GetAllCars",
            "apikey": "a9198b68355f78830054c31a39916b7f",
            "search": {
                "make": filter
            },
            "order": "ASC",
            "limit": 500,
            "fuzzy": false,
            "return": [
                "make", "model"
            ]
        });

        req.open("POST", "https://wheatley.cs.up.ac.za/api/", true);
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                var allCars = JSON.parse(req.responseText);
                if (allCars.data.length == 0) {
                    list.innerHTML += "<li>No results.</li>";
                } else {
                    for (var i = 0; i < allCars.data.length; i++) {
                        list.innerHTML += "<li>" + allCars.data[i].make + "_" + allCars.data[i].model + "</li>";
                    }
                }


                var li = list.getElementsByTagName("li");
                for (var i = 0; i < li.length; i++) {
                    li[i].style.display = "";
                }
            }

            const searchBar = document.getElementById("search1");

            // Add a mouseover event listener to each list item
            list.querySelectorAll("li").forEach(item => {
                item.addEventListener("click", () => {
                    // Set the value of the search bar to the content of the hovered list item
                    searchBar.value = item.textContent.trim();
                    getRes1();
                    searchBar.value = "";
                });
            });
        };
        req.send(body);
    }

}

function search1() {
    var input = document.getElementById("search2");
    var filter = input.value;

    var list = document.getElementById("list1");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    if (filter.length > 0) {
    var req = new XMLHttpRequest();
    var body = JSON.stringify({
        "studentnum": "u22492616",
        "type": "GetAllCars",
        "apikey": "a9198b68355f78830054c31a39916b7f",
        "search": {
            "make": filter,
        },
        "order": "ASC",
        "limit": 500,
        "fuzzy": false,
        "return": [
            "make", "model"
        ]
    });

    req.open("POST", "https://wheatley.cs.up.ac.za/api/", true);
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            var allCars = JSON.parse(req.responseText);

            if (allCars.data.length == 0) {
                list.innerHTML += "<li>No results.</li>";
            } else {
                for (var i = 0; i < allCars.data.length; i++) {
                    list.innerHTML += "<li>" + allCars.data[i].make + "_" + allCars.data[i].model + "</li>";
                }
            }

            var li = list.getElementsByTagName("li");
            for (var i = 0; i < li.length; i++) {
                li[i].style.display = "";
            }

        }

        const searchBar = document.getElementById("search2");

        // Add a mouseover event listener to each list item
        list.querySelectorAll("li").forEach(item => {
            item.addEventListener("click", () => {
                // Set the value of the search bar to the content of the hovered list item
                searchBar.value = item.textContent.trim();
                getRes2();
                searchBar.value = "";
            });
        });


    };



    req.send(body);
    }
}

function search2() {
    var input = document.getElementById("search3");
    var filter = input.value;

    var list = document.getElementById("list2");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    if (filter.length > 0) {
    var req = new XMLHttpRequest();
    var body = JSON.stringify({
        "studentnum": "u22492616",
        "type": "GetAllCars",
        "apikey": "a9198b68355f78830054c31a39916b7f",
        "search": {
            "make": filter,
        },
        "order": "ASC",
        "limit": 500,
        "fuzzy": false,
        "return": [
            "make", "model"
        ]
    });

    req.open("POST", "https://wheatley.cs.up.ac.za/api/", true);
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            var allCars = JSON.parse(req.responseText);

            if (allCars.data.length == 0) {
                list.innerHTML += "<li>No results.</li>";
            } else {
                for (var i = 0; i < allCars.data.length; i++) {
                    list.innerHTML += "<li>" + allCars.data[i].make + "_" + allCars.data[i].model + "</li>";
                }
            }

            var li = list.getElementsByTagName("li");
            for (var i = 0; i < li.length; i++) {
                li[i].style.display = "";
            }

        }

        const searchBar = document.getElementById("search3");

        // Add a mouseover event listener to each list item
        list.querySelectorAll("li").forEach(item => {
            item.addEventListener("click", () => {
                // Set the value of the search bar to the content of the hovered list item
                searchBar.value = item.textContent.trim();
                getRes3();
                searchBar.value = "";
            });
        });


    };
    req.send(body);
}
}

const input = document.querySelector("#search1");
input.addEventListener("keydown", search);

const input1 = document.querySelector("#search2");
input1.addEventListener("keydown", search1);

const input2 = document.querySelector("#search3");
input2.addEventListener("keydown", search2);

function getRes1() {

    var list = document.getElementById("list");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    displayLoading();
    let searchVal = document.getElementById("search1").value;
    var make = searchVal.substring(0, searchVal.indexOf("_"));
    var model = searchVal.substring(searchVal.indexOf("_") + 1, searchVal.length);
    var req = new XMLHttpRequest();
    var body = JSON.stringify({
        "studentnum": "u22492616",
        "type": "GetAllCars",
        "apikey": "a9198b68355f78830054c31a39916b7f",
        "search": {
            "make": make,
            "model": model
        },
        "fuzzy": true,
        "return": [
            "make", "model", "year_to", "transmission", "engine_type", "body_type", "max_speed_km_per_h", "number_of_cylinders"
        ]
    });

    req.open("POST", "https://wheatley.cs.up.ac.za/api/", true);
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            hideLoading();
            var car2 = JSON.parse(req.responseText);
            document.getElementById("n1").innerHTML = car2.data[0].make + " " + car2.data[0].model + " " + car2.data[0].year_to;
            document.getElementById("tr1").innerHTML = car2.data[0].transmission;
            document.getElementById("et1").innerHTML = car2.data[0].engine_type;
            document.getElementById("vt1").innerHTML = car2.data[0].body_type;
            document.getElementById("ms1").innerHTML = car2.data[0].max_speed_km_per_h;
            document.getElementById("nc1").innerHTML = car2.data[0].number_of_cylinders;

            const imgReq = new XMLHttpRequest();
            imgReq.open("GET", "https://wheatley.cs.up.ac.za/api/getimage?brand=" + car2.data[0].make + "&model=" + car2.data[0].model, false);
            imgReq.onreadystatechange = function () {
                if (imgReq.readyState == 4 && imgReq.status == 200) {
                    var img1Path = imgReq.responseText;
                    document.getElementById("img1").src = img1Path;
                }
            };

            imgReq.send();
        }
    };
    req.send(body);
}

function getRes2() {

    var list = document.getElementById("list1");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    displayLoading1();
    let searchVal = document.getElementById("search2").value;
    var make = searchVal.substring(0, searchVal.indexOf("_"));
    var model = searchVal.substring(searchVal.indexOf("_") + 1, searchVal.length);
    var req = new XMLHttpRequest();
    var body = JSON.stringify({
        "studentnum": "u22492616",
        "type": "GetAllCars",
        "apikey": "a9198b68355f78830054c31a39916b7f",
        "search": {
            "make": make,
            "model": model
        },
        "fuzzy": true,
        "return": [
            "make", "model", "year_to", "transmission", "engine_type", "body_type", "max_speed_km_per_h", "number_of_cylinders"
        ]
    });

    req.open("POST", "https://wheatley.cs.up.ac.za/api/", true);
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            hideLoading1();
            var car2 = JSON.parse(req.responseText);
            document.getElementById("n2").innerHTML = car2.data[0].make + " " + car2.data[0].model + " " + car2.data[0].year_to;
            document.getElementById("tr2").innerHTML = car2.data[0].transmission;
            document.getElementById("et2").innerHTML = car2.data[0].engine_type;
            document.getElementById("vt2").innerHTML = car2.data[0].body_type;
            document.getElementById("ms2").innerHTML = car2.data[0].max_speed_km_per_h;
            document.getElementById("nc2").innerHTML = car2.data[0].number_of_cylinders;

            const imgReq = new XMLHttpRequest();
            imgReq.open("GET", "https://wheatley.cs.up.ac.za/api/getimage?brand=" + car2.data[0].make + "&model=" + car2.data[0].model, false);
            imgReq.onreadystatechange = function () {
                if (imgReq.readyState == 4 && imgReq.status == 200) {
                    var img1Path = imgReq.responseText;
                    document.getElementById("img2").src = img1Path;
                }
            };

            imgReq.send();
        }
    };
    req.send(body);
}

function getRes3() {
    var list = document.getElementById("list2");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    displayLoading2();
    let searchVal = document.getElementById("search3").value;
    var make = searchVal.substring(0, searchVal.indexOf("_"));
    var model = searchVal.substring(searchVal.indexOf("_") + 1, searchVal.length);
    var req = new XMLHttpRequest();
    var body = JSON.stringify({
        "studentnum": "u22492616",
        "type": "GetAllCars",
        "apikey": "a9198b68355f78830054c31a39916b7f",
        "search": {
            "make": make,
            "model": model
        },
        "fuzzy": true,
        "return": [
            "make", "model", "year_to", "transmission", "engine_type", "body_type", "max_speed_km_per_h", "number_of_cylinders"
        ]
    });

    req.open("POST", "https://wheatley.cs.up.ac.za/api/", true);
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            hideLoading2();
            var car2 = JSON.parse(req.responseText);
            document.getElementById("n3").innerHTML = car2.data[0].make + " " + car2.data[0].model + " " + car2.data[0].year_to;
            document.getElementById("tr3").innerHTML = car2.data[0].transmission;
            document.getElementById("et3").innerHTML = car2.data[0].engine_type;
            document.getElementById("vt3").innerHTML = car2.data[0].body_type;
            document.getElementById("ms3").innerHTML = car2.data[0].max_speed_km_per_h;
            document.getElementById("nc3").innerHTML = car2.data[0].number_of_cylinders;

            const imgReq = new XMLHttpRequest();
            imgReq.open("GET", "https://wheatley.cs.up.ac.za/api/getimage?brand=" + car2.data[0].make + "&model=" + car2.data[0].model, false);
            imgReq.onreadystatechange = function () {
                if (imgReq.readyState == 4 && imgReq.status == 200) {
                    var img1Path = imgReq.responseText;
                    document.getElementById("img3").src = img1Path;
                }
            };

            imgReq.send();
        }
    };
    req.send(body);
}

