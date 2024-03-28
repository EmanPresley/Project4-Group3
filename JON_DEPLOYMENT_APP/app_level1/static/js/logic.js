$(document).ready(function() {
    console.log("Page Loaded");

    $("#filter").click(function() {
        // alert("button clicked!");
        makePredictions();
    });
});

// call Flask API endpoint
function makePredictions() {
    var sex_flag = $("#gender").val();
    var age = $("#age").val();
    var fare = $("#fare").val();
    var familySize = $("#familySize").val();
    var p_class = $("#pclass").val();
    var embarked = $("#embarked").val();

    // check if inputs are valid

    // create the payload
    var payload = {
        "sex_flag": sex_flag,
        "age": age,
        "fare": fare,
        "familySize": familySize,
        "p_class": p_class,
        "embarked": embarked
    }

    // Perform a POST request to the query URL
    $.ajax({
        type: "POST",
        url: "/makePredictions",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({ "data": payload }),
        success: function(returnedData) {
            // print it
            console.log(returnedData);

            if (returnedData["prediction"] == 1) {
                $("#output").text("You Survived!");
            } else {
                $("#output").text("You did not survive, sorry. :(");
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });

}