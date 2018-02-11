const color_init = d3.rgb("#d4d4d4");
const quantiles = [0, 0.3, 0.5, 0.7, 0.9, 1];
const width = 960, height = 430;

const svg_map = d3.select("#map-container").append("svg")
    .attr("id", "map")
    .attr("height", height)
    .attr("width", width);

const path = d3.geoPath(d3.geoRobinson());

// // init bars container
// const margin = {top: 50, right:10, bottom:50, left:30};
// const svgBarsWidth = 960 - margin.left - margin.right,
//     svgBarsHeight = 200 - margin.top - margin.bottom;
//
// const x = d3.scaleBand()
//     .rangeRound([0, svgBarsWidth])
//     .padding(.05);
//
// const y = d3.scaleLinear().range([svgBarsHeight, 0]);
//
// const svg_bars = d3.select("#medal-rank").append("svg")
//     .attr("id", "bars")
//     .attr("width", svgBarsWidth + margin.left + margin.right)
//     .attr("height", svgBarsHeight + margin.top + margin.bottom)
//     .append("g")
//     .attr("class", "bars")
//     .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


(function initMap() {

    svg_map.append("g")
        .attr("class", "legend");
    svg_map.append("g")
        .attr("class", "legend-title")
        .append("text");

    d3.json("/topojson_file/worldTopojson.json", function (error, data) {

        if (error) throw error;

        svg_map.append("g")
            .attr("class", "countries")
            .selectAll("path")
            .data(topojson.feature(data, data.objects.countries1).features)
            .enter().append("path")
            .attr("d", path)
            .attr("id", function (d) {
                return d.id;
            })
            .call(fillMap, color_init, data)
            .append("title")
            .call(setPathTitle, data);
    });



})();

async function showWorldMap() {
    let medal = contents.countryMedalValue;
    let color = calcColorScale(medal);
    updateMap(color, medal);
    renderLegend(color, medal);
    // renderBars(color, medal);

}