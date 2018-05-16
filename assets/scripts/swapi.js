document.getElementById("getData").addEventListener("click", getData);
function getData() {
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
        populateForm(resp, num_people);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

function populateForm(response, num_people) {
  for (i = 0; i < num_people; i++) {
    fetch(response.results[i].species[0])
      .then(resp => resp.json()) // Transform the data into json
      .then(function(data) {
        var div = document.createElement("div");
        div.className = "person-info";
        div.innerHTML =
          "<div class='form-group'><label class='name'>Name: </label><input type='text' name='name' value=' " +
          response.results[i].name +
          "'/></div><div class='height form-group'><label class='height'>Height: </label><input type='text' name='height' value=' " +
          response.results[i].height +
          "'/></div><div class='birth_year form-group'><label class='birth_year'>Year of Birth: </label><input type='text' name='height' value='" +
          response.results[i].birth_year +
          "'/></div><div class='species form-group'><label class='species'>Species: </label><input type='text' name='height' value='" +
          data.name +
          "' /></div>";

        document.getElementById("people-info").appendChild(div);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
