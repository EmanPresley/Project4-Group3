// Initialize an empty object to store symptoms
let symptoms = {};

$(document).ready(function() {
    console.log("Page Loaded");
    dropdown();

    // Add an event listener to the submit button
    $('#submit').on('click', function() {
        // Iterate over each dropdown menu
        for (let i = 1; i <= 5; i++) {
            let dropdown = d3.select(`#cat${i}`);
            // Get the selected options from the dropdown
            let selectedOptions = dropdown.selectAll('option:checked').nodes();
            // Update the symptoms dictionary for each selected symptom
            selectedOptions.forEach(option => {
                symptoms[option.textContent] = 1;
            });
        }
        console.log(symptoms); // Optionally, you can log the updated symptoms dictionary

        // Perform a POST request to the query URL
        $.ajax({
            type: "POST",
            url: "/makePredictions",
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({ "data": symptoms }),
            success: function(returnedData) {
                // print it
                console.log(returnedData);
                let prediction = returnedData["prediction"][0];
                let randomAmount = Math.floor(Math.random() * 10000) + 1; // Generate a random number between 1 and 1000
                $("#output").css("color", "White");
                $("#output").text(`There is a ${Math.round(100*prediction[1], 2)}% probability that you have ${prediction[0]}. Your bill is $${randomAmount}. Have a nice day! `);

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus);
                alert("Error: " + errorThrown);
            }
        });

    });

});



function dropdown(){

    // Get the data using the URL in line 2
    d3.csv("static/data/categories.csv").then(function(data) {
        console.log(data);

     // Extract symptom names from the data and initialize them to 0
        data.forEach(function(d) {
            symptoms[d.Symptoms] = 0;
        });

        // Use D3 to select the dropdowns
        let dropdown1 = d3.select("#cat1");
        let dropdown2 = d3.select("#cat2");
        let dropdown3 = d3.select("#cat3");
        let dropdown4 = d3.select("#cat4");
        let dropdown5 = d3.select("#cat5");


        // populate the dropdown
        for (let i = 0; i < data.length; i++){
            let category = data[i]["Category"]; 
            if (category ==="Aches/Pain/Discomfort"){
                let sym = data[i]["Symptoms"];
            
                dropdown1.append("option").text(sym);
            } else if (category ==="General"){
                let sym = data[i]["Symptoms"];
            
                dropdown2.append("option").text(sym);
            } else if (category ==="Physical"){
                let sym = data[i]["Symptoms"];
            
                dropdown3.append("option").text(sym);
            } else if (category ==="Physiological"){
                let sym = data[i]["Symptoms"];
            
                dropdown4.append("option").text(sym);
            } else if (category ==="Psychological"){
                let sym = data[i]["Symptoms"];
            
                dropdown5.append("option").text(sym);
            }
        }


    });
}

