// Eric Lau, Yaru Luo -- YikEs
// SoftDev2 pd1
// K18 -- Come Up For Air
// 2020-04-21

console.log('Hello, World!');

const width = 975;
const height = 610;
const svg = d3.select('body').append('svg').attr("viewBox", [0, 0, width, height]);

const path = d3.geoPath();

let render = async () => {
    let us = await d3.json('static/json/states-albers-10m.json');

    svg.append("g")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .join("path")
    .attr("fill", 'red')
    .attr("d", path)
}

render();