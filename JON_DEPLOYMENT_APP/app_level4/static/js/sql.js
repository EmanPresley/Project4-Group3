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
            renderTable(returnedData);

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });

}

function renderTable(inp_data) {
    // init html string
    let html = "";

    // destroy datatable
    $('#sql_table').DataTable().clear().destroy();

    // loop through all rows
    inp_data.forEach(function(row) {
        html += "<tr>";

        // loop through each cell (order matters)
        html += `<td>${row.PassengerId}</td>`;
        html += `<td>${row.Survived}</td>`;
        html += `<td>${row.Pclass}</td>`;
        html += `<td>${row.Name}</td>`;
        html += `<td>${row.Sex}</td>`;
        html += `<td>${row.Age}</td>`;
        html += `<td>${row.SibSp}</td>`;
        html += `<td>${row.Parch}</td>`;
        html += `<td>${row.Ticket}</td>`;
        html += `<td>${row.Fare}</td>`;
        html += `<td>${row.Cabin}</td>`;
        html += `<td>${row.Embarked}</td>`;

        // close the row
        html += "</tr>";
    });

    // shove the html in our elements
    console.log(html);
    $("#sql_table tbody").html("");
    $("#sql_table tbody").append(html);

    // remake data table
    $('#sql_table').DataTable();
}