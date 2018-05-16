document.getElementById("submit").addEventListener("click", getData);
var getNames = [];
var setData = [];
function getData() {
    document.getElementById("people-info").innerHTML = "";
    var num_people = parseInt(document.getElementById("people").value);
    console.log("number of poeple in form is " + num_people);
    if (!Number.isInteger(num_people)) {
        alert(" Please enter a valid number");
    } else {
        var url = "https://swapi.co/api/people/";
        fetch(url)
            .then(resp => resp.json()) // Transform the data into json
            .then(function(data) {
            console.log(data);
            var resp = data;
            populateForm(resp, num_people, check);
        })
            .catch(function(error) {
            console.log(error);
        });
    }
}
var check = function(url, response, i) {
    var div = document.createElement("div");
    div.className = "person-info";
    div.innerHTML =
        "<div class='form-group'><label class='name'>Name: </label><input type='text' name='name' value=' " +
        response.results[i].name +
        "'/></div><div class='height form-group'><label class='height'>Height: </label><input type='text' name='height' value=' " +
        response.results[i].height +
        "'/></div><div id='birth' class='birth_year form-group'><label class='birth_year'>Year of Birth: </label><input type='text' name='height' value='" +
        response.results[i].birth_year +
        "'/></div>" +
        "<div class='species form-group'><label class='species'>Species: </label><input type='text' id='" +
        i +
        "'  /></div>";
    document.getElementById("people-info").appendChild(div);
    fetch(url)
        .then(resp => resp.json()) 
        .then(function(data) {
        console.log(div.className);
        document.getElementById(i).value = data.name;
    })
        .catch(function(error) {
        console.log(error);
    });
};
function populateForm(response, num_people, callback) {
    for (i = 0; i < num_people; i++) {
        console.log("ie " + i + " url " + response.results[i].species[0]);
        callback(response.results[i].species[0], response, i);
    }
}