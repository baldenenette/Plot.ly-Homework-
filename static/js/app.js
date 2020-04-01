// @TODO: Complete the following function that builds the metadata panel
// Use `d3.json` to fetch the metadata for a sample
function buildMetadata(index) {
  var panel = d3.select("#sample-metadata");
  panel.html("");
  var list = panel
    .append("ul")
    .style("list-style-type", "none")
    .style("padding-left", "0");
  d3.json("samples.json").then(data => {
    Object.entries(data.metadata[index]).forEach(([key, value]) => {
      list.append("li").text(`${key}: ${value}`);
    });

    // BONUS: Build the Gauge Chart
  });
}

function buildCharts(index) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`samples.json`).then(data => {
    console.log(data);
    var otu_ids = data.samples[index].otu_ids.slice(0, 10);
    var otu_labels = data.samples[index].otu_labels.slice(0, 10);
    var sample_values = data.samples[index].sample_values.slice(0, 10);
    buildGauge(data.metadata[index].wfreq);
    // @TODO: Build a Bubble Chart using the sample data
    var trace = {
      x: otu_ids,
      y: sample_values,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      },
      text: otu_labels
    };

    var data = [trace];
    var layout = {
      xaxis: { title: "OTU ID" },
      title: "Belly Button Bacteria Bubble Chart"
    };

    Plotly.newPlot("bubble", data, layout);

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

    var trace = {
      x: sample_values,
      y: otu_ids.map(d => "OTU " + d),
      type: "bar",
      orientation: "h",
      text: otu_labels
    };
    var data = [trace];
    var layout = {
      title: "Belly Button Bacteria Bar Chart"
    };
    Plotly.newPlot("bar", data, layout);
  });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then(sampleData => {
    sampleData.names.forEach((sample, i) => {
      selector
        .append("option")
        .text(sample)
        .attr("value", i);
    });

    // Use the first sample from the list to build the initial plots
    buildCharts(0);
    buildMetadata(0);
    buildGauge(sampleData.metadata[0].wfreq);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
