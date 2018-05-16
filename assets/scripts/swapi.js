window.onload = function(){ 
    document.getElementById("submit").addEventListener("click", function(){
        var num_people = parseInt(document.getElementById("people").value);
        console.log("number of poeple in form is " + num_people);    
        if(!Number.isInteger(num_people)){
            alert(" Please enter a valid number")
        };
        var request = new XMLHttpRequest();
        var url = "https://swapi.co/api/people/";
        request.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                var response = JSON.parse(this.responseText);
                populateForm(response);
            }
        }
        request.open("GET", url, true);
        request.send();
        function populateForm(response){
            
            for(i=0;i<num_people;i++){
              
                
                var div = document.createElement("div");
                div.className = "person-info"
                div.innerHTML = "<div class='form-group'><label class='name'>Name: </label><input type='text' name='name' value=' "+response.results[i].name+"'/></div><div class='height form-group'><label class='height'>Height: </label><input type='text' name='height' value=' "+response.results[i].height+ "'/></div><div class='birth_year form-group'><label class='birth_year'>Year of Birth: </label><input type='text' name='height' value='"+ response.results[i].birth_year+ "'/></div>"
                
                
                
                  var speciesURL = response.results[i].species[0];
                var speciesRequest = new XMLHttpRequest();
                 speciesRequest.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                var speciesresponse = JSON.parse(this.responseText);
                    speciesName(speciesresponse);
                    
                    }
                 }
                  speciesRequest.open("GET", speciesURL, true);
                    speciesRequest.send();
                function speciesName(response){
                    console.log("response is"+ response.name);
                    document.getElementById("species").innerHTML = response.name;
                }
                
                document.getElementById("people-info").appendChild(div);
                
                
                
            }
        }
    });
}
