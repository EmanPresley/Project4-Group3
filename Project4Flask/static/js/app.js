
function dropdown(){

// Get the data using the URL in line 2
d3.csv("https://raw.githubusercontent.com/ShanaraTech/Project4CSV/main/categories.csv").then(function(data) {
    console.log(data);

// Use D3 to select the dropdowns
    let dropdown1 = d3.select("#selDataset1");
    let dropdown2 = d3.select("#selDataset2");

let categories = []
function removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
}

// populate the dropdown
    for (let i = 0; i < data.length; i++){
        let category = data[i] ["Category"];
        categories.push(category)
       // dropdown1.append("option").text(category);
    }
    let unique_categories = removeDuplicates(categories);
    for (let i = 0; i < unique_categories.length; i++){
               dropdown1.append("option").text(unique_categories[i]);
    }
    let symptoms = data.filter(row => row.Category == unique_categories[0]);
    console.log(symptoms);
    for (let i = 0; i < symptoms.length; i++){
        let sym = symptoms[i] ["Symtoms"];
        
       dropdown2.append("option").text(sym);
    }


})
}
function optionChanged(category){
    d3.csv("https://raw.githubusercontent.com/ShanaraTech/Project4CSV/main/categories.csv").then(function(data) {
    console.log(data);

// Use D3 to select the dropdown
    
    let dropdown2 = d3.select("#selDataset2");
    let symptoms = data.filter(row => row.Category == category);
    console.log(symptoms);
    dropdown2.html("");
    for (let i = 0; i < symptoms.length; i++){
        let sym = symptoms[i] ["Symtoms"];
       
       dropdown2.append("option").text(sym);
    }

})
}
function table(individual){
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {
        console.log(data);

        let metadata = data.metadata;
        let resultArray = metadata.filter(row => row.id == individual);
        let result = resultArray[0];

// Use D3 to select the dropdown for metadata
let dropdownMetadata = d3.select("#sample-metadata");

dropdownMetadata.html("");
// Prints "Name" followed by "Demographic Info"
Object.entries(result).forEach(entry => {
    const [key, value] = entry;
    console.log(key, value);
    dropdownMetadata.append("h6")
    .text(`${key}: ${value}`);

  });
})
}


function charts(individual){
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {
        console.log(data);

   let samples = data.samples;
   let resultArray = samples.filter(row => row.id == individual);
   let result = resultArray[0];

   let sample_values = result.sample_values;
   let otu_ids = result.otu_ids;
   let otu_labels = result.otu_labels;

// Sort the data to get the top 10 OTUs
   let top10Values = sample_values.slice(0, 10);
   let top10Ids = otu_ids.slice(0, 10);
   let top10Labels = otu_labels.slice(0, 10);

// Sort the top10Ids array in ascending order
    top10Ids.sort((a, b) => a - b);
        
// Create a horizontal bar chart using Plotly
    let trace = {
       x: top10Values,
       y: top10Ids.map(id => `OTU ${id}`),
       text: top10Labels,
       type: "bar",
       orientation: "h",
       marker: {
            color: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // Assign a numerical value to each bar for the color scale
            colorscale: "Picnic", // Choose a color scale (e.g., Viridis, Plasma, etc.)
            reversescale: true, // This line flips the color scale
            colorbar: {
                title: "Color Scale"
            }
       }
    };

   let bar_data = [trace];

   let layout = {
       title: "Top 10 OTUs in Human Navels",
       xaxis: { title: "Sample Values" },
       yaxis: { title: "Individual OTU IDs" }
   };

Plotly.newPlot("bar",bar_data, layout);

// Create a bubble chart using Plotly
    let trace2 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        type: "scatter",
        mode: "markers",
        marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Picnic",
            reversescale: true, // This line flips the color scale
            colorbar: {
                title: "Color Scale",
                tickvals: [1, 3, 5],
                ticktext: ["Low", "Medium", "High"]
            }
        }
       };

    let bubble_data = [trace2];

// Layout options for the bubble chart
    let bubble_layout = {
        xaxis: {
            title: "OTU IDs"
        },
        yaxis: {
            title: "Sample Values",
            anchor: "x",
            position: 0.1
        },
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }
    };
        
// Create the bubble chart using Plotly
Plotly.newPlot("bubble", bubble_data, bubble_layout);
});
}
dropdown()
