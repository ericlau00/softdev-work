// Eric Lau, Yaru Luo -- YikEs
// SoftDev2 pd1
// K18 -- Come Up For Air
// 2020-04-21

let created = false;
let visualization = document.getElementById('visualization');
let decade = 1950;
let ufoData;

document.getElementById('render-button').addEventListener('click', async () => {
    if (!created) {
        ufoData = await getData();
        let svg = createSVG();
        decadeListener('next', 10, 2010, svg);
        decadeListener('previous', -10, 1950, svg);
        render(svg);
        created = true;
    }
    window.scrollTo(0, visualization.offsetTop);
});

const decadeListener = (id, change, edge, svg) => {
    document.getElementById(id).addEventListener('click', () => {
        if (decade != edge) {
            decade += change;
            render(svg);
        }
        document.getElementById('decade').innerHTML = decade;
    })
}

const createSVG = () => {
    visualization.innerHTML += `
        <div class="container-fluid vh-100">
            <div class="col">
                <div class="row py-5 justify-content-center align-items-center">
                    <div class="h2"><b>Decade: <span id="decade">${decade}</span>s<b></div>
                </div>
                <div class="row justify-content-center align-items-center pb-2" id="svg-container">
                </div>
                <div class="row d-flex justify-content-between pt-5 noselect">
                    <div class="h3 px-5 button" id="previous"><b>&#9664; Previous Decade</b></div>
                    <div class="h3 px-5 button" id="next"><b>Next Decade &#9654;</b></div>
                </div>
            </div>
        </div>`
    return d3.select('#svg-container').append('svg')
        .attr("viewBox", [0, 0, 975, 610]) // 975 by 610 is the default size for rendering a map of the USA
        .attr("width", "60%").append('g');
};

const render = async (svg) => {
    // this file contains data about the outline of the United States
    let us = await d3.json('static/json/states-albers-10m.json');

    /*
        topojson.feature(us, us.objects.states).features
            creates an array of "features" objects
            each object represents a state (or the District of Columbia)
            the object contains the outline of the state and the name of the state

        e.g.
        {
            'geometry': {'type': 'Polygon', 'coordinates': Array()},
            'id': Number(),
            'properties': {'name': 'Montana'},
            'type': 'Feature',
        }
    */

    svg.selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .join("path") // consider splitting by enter, update, remove
        .attr("fill", d => {

            // Handle District of Columbia edge case

            let stateName = d['properties']['name']; //retrieve the name of the state from d

            let numOfSightings = ufoData[String(decade)][stateName]; //retrieve the number of sightings by decade and state

            //based on the number of sightings create a color and set the color to the fill of the state

            console.log(decade, stateName, numOfSightings);
            return 'red';
        })
        // d3.geoPath() gets the coordinates from the features object and constructs a path
        // MDN Docs on pathing: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
        .attr("d", d3.geoPath());

    // Add transition on color change
    // Add legend of colors (will probably also have to change numbers on legend based on max and min? or can make constant like 0 to 10000?)
};

const getData = async () => {

    let stateMap = { "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California", "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "FL": "Florida", "GA": "Georgia", "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa", "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon", "PW": "Palau", "PA": "Pennsylvania", "PR": "Puerto Rico", "RI": "Rhode Island", "SC": "South Carolina", "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont", "VI": "Virgin Islands", "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming" };

    // make all of the abbreviations lower case and remove the upper case abbreviations
    for (const state in stateMap) {
        stateMap[state.toLowerCase()] = stateMap[state];
        delete stateMap[state];
    }

    /*
       ufoSightings Holds the number of UFO sightings in each state during each decade
        {
            '1950': {
                'Alabama': 0,
                'Alaska': 0,
                ...
            },
            '1960': {
                'Alabama': 0,
                'Alaska': 0,
                ...
            },
            ...
        }
    */
    let ufoSightings = new Object();
    for (let i = 1950; i < 2020; i += 10) {
        ufoSightings[String(i)] = new Object();
        for (const abbreviation in stateMap) {
            ufoSightings[String(i)][stateMap[abbreviation]] = 0;
        }
    }

    // fill ufoSightings with USA UFO sightings from 1950 onward.
    let data = await d3.csv("static/csv/scrubbed.csv");
    data.forEach((sighting) => {
        let abbreviation = sighting['state'];
        let date = sighting['datetime'];
        let space = date.indexOf(' ');
        let decade = date.substring(space - 4, space).substring(0, 3) + '0';

        if (sighting['country'] == 'us' && decade >= '1950') {
            ufoSightings[decade][stateMap[abbreviation]]++;
        }
    });
    return ufoSightings;
};