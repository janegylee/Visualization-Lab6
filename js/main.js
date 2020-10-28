import StackedAreaChart from "./StackedAreaChart.js";
import AreaChart from "./AreaChart.js";


// Variables for the visualization instances
let stackChart = StackedAreaChart();
let filterCategory, filterRange;

// Start application by loading the data
  d3.csv("unemployment.csv", d => {
    return d;
  })
  .then(data => {

  // Call the stacked area chart
  d3.select("#stacked-area-chart")
    .datum(data)
    .call(stackChart);


// callback for selecting a category in the stack area chart
function onSelectCategory(d, i) {
  filterCategory = filterCategory === d ? null : d; // toggle the filter to go back to all categories
  let filtered = filterCategoryData(filterCategory, filterRange);
  d3.select("#stacked-area-chart")
    .datum(filtered)
    .call(areachart);
}

// callback for brushing on the timeline
function onBrushRange(dateRange) {
  filterRange = dateRange;
  let filtered = filterCategoryData(filterCategory, filterRange);
  d3.select("#stacked-area-chart")
    .datum(filtered)
    .call(areachart);
}

// check if a year is within the year range
function within(d, range) {
  return d.getTime() >= range[0].getTime() && d.getTime() <= range[1].getTime();
}

// filter category data based on a specific category (if any) and year range
function filterCategoryData(category, dateRange) {
  let filtered = dateRange
    ? categoryData.filter(d => within(d.date, dateRange))
    : categoryData;
  filtered = filtered.map(row => {
    return category
      ? {
          date: row.date,
          [category]: row[category]
        }
      : row;
  });
  return filtered;
}
  
});
