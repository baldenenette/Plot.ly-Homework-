function buildGauge(freq) {
  var data = [
    {
      value: freq,
      title: { text: "Belly Button Wash Frequency/Week" },
      type: "indicator",
      mode: "gauge+number",
      gauge: { axis: { range: [null, 9], tickmode: "linear" } }
    }
  ];

  Plotly.newPlot("gauge", data);
}
