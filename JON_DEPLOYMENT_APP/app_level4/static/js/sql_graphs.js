$(document).ready(function() {
    console.log("Page Loaded");

    $("#filter").click(function() {
        // alert("button clicked!");
        getSQL();
    });
});


// call Flask API endpoint
function getSQL() {
    var sex_flag = $("#gender").val();
    var min_age = $("#min_age").val();
    var max_age = $("#max_age").val();


    // check if inputs are valid

    // create the payload
    var payload = {
        "sex_flag": sex_flag,
        "min_age": min_age,
        "max_age": max_age
    }

    // Perform a POST request to the query URL
    $.ajax({
        type: "POST",
        url: "/getSQL",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({ "data": payload }),
        success: function(returnedData) {
            // print it
            console.log(returnedData);
            makeGraph(returnedData);

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });

}

function makeGraph(inp_data) {
    var trace1 = {
        x: inp_data.filter(x => x.Survived == 0).map(x => x.Age),
        y: inp_data.filter(x => x.Survived == 0).map(x => x.Fare),
        mode: 'markers',
        type: 'scatter',
        marker: {
            "color": "firebrick"
        },
        name: "Died"
    };

    var trace2 = {
        x: inp_data.filter(x => x.Survived == 1).map(x => x.Age),
        y: inp_data.filter(x => x.Survived == 1).map(x => x.Fare),
        mode: 'markers',
        type: 'scatter',
        marker: {
            "color": "skyblue"
        },
        name: "Survived"
    };

    var data = [trace1, trace2];
    var layout = {
        title: 'Titanic Age vs Fare for Filter',
        xaxis: { "title": "Age" },
        yaxis: { "title": "Fare" }
    };

    Plotly.newPlot('scatter', data, layout);
}