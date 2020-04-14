// Eric Lau, Yaru Luo -- YikEs
// SoftDev2 pd1
// K18 -- Come Up For Air
// 2020-04-21

let created = false;

let visualization = document.getElementById('visualization')

document.getElementById('render-button').addEventListener('click', () => {
    if (!created) {
        let svg = createSVG();
        render(svg);
        created = true;
    }
    window.scrollTo(0, visualization.offsetTop);
});

const createSVG = () => {
    visualization.innerHTML += `
        <div class="container-fluid vh-100">
            <div class="col">
                <div class="row py-5 justify-content-center align-items-center">
                    <div class="h2"><b>Decade: 19<span id="decade">40</span>s<b></div>
                </div>
                <div class="row justify-content-center align-items-center pb-2" id="svg-container">
                </div>
                <div class="row d-flex justify-content-between pt-5">
                <div class="h3 px-5 button" id="previous"><b>&#9664; Previous Decade</b></div>
                <div class="h3 px-5 button" id="next"><b>Next Decade &#9654;</b></div>
                </div>
            </div>
        </div>`
    return d3.select('#svg-container').append('svg')
        .attr("viewBox", [0, 0, 975, 610])
        .attr("width", "60%");
};

const render = async (svg) => {
    let us = await d3.json('static/json/states-albers-10m.json');

    svg.append("g")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .join("path")
        .attr("fill", 'red')
        .attr("d", d3.geoPath());
};
