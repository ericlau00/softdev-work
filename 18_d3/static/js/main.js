// Eric Lau, Yaru Luo -- YikEs
// SoftDev2 pd1
// K18 -- Come Up For Air
// 2020-04-21

let created = false;

document.getElementById('render-button').addEventListener('click', () => {
    if (!created) {
        let svg = createSVG();
        render(svg);
        created = true;
    }
    window.scrollTo(0, document.getElementById('svg-container').offsetTop);
})

const createSVG = () => {
    document.getElementById('visualization').innerHTML += `
        <div class="container-fluid vh-100">
            <div class="row vh-100 justify-content-center align-items-center" id="svg-container">
            </div>
        </div>`
    return d3.select('#svg-container').append('svg')
        .attr("viewBox", [0, 0, 975, 610])
        .attr("width", "50%");
}

const path = d3.geoPath();

const render = async (svg) => {
    let us = await d3.json('static/json/states-albers-10m.json');

    svg.append("g")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .join("path")
        .attr("fill", 'red')
        .attr("d", path);
}
