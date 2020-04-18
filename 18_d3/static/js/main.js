// Eric Lau, Yaru Luo -- YikEs
// SoftDev2 pd1
// K18 -- Come Up For Air
// 2020-04-21

let created = false;
let visualization = document.getElementById('visualization');
let decade = 1930;
let ufoData;

// create function to find the min and max of the current decade
    // parse through the ufoData object and get an array of all ufo sightings
    // use d3.min and d3.max to find min and max
// pass min and max into render function
// invoke this function and pass in the min and max to the render function
// create a coloring function (data, min, max);

window.onload = async () => { ufoData = await getData(); }

document.getElementById('render-button').addEventListener('click', () => {
    if (!created) {
        let svg = createSVG();
        decadeListener('next', 10, 2010, svg);
        decadeListener('previous', -10, 1930, svg);
        // findMinMax();
        render(svg);
        created = true;
    }
    window.scrollTo(0, visualization.offsetTop);
});

const decadeListener = (id, change, edge, svg) => {
    document.getElementById(id).addEventListener('click', () => {
        if (decade != edge) {
            // consider counting down or up the years while the colors are transitioning
            decade += change;
            // findMinMax();
            render(svg);
        }
        document.getElementById('decade').innerHTML = decade;
    });
}

const createSVG = () => {
    visualization.style.display = 'block';
    document.getElementById('decade').innerHTML = decade;

    return d3.select('#svg-container').append('svg')
        // 975 by 610 is the default size for rendering a map of the USA
        .attr("viewBox", [0, 0, 975, 610])
        .attr("width", "60%")
        .append('g');
};

const render = async (svg) => {
    // states-albers-10m.json contains data about the outline of the United States
    // more json files for the US can be found here https://github.com/topojson/us-atlas
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
    let pathData = topojson.feature(us, us.objects.states).features;

    svg.selectAll("path")
        .data(pathData)
        .join("path")
        // consider splitting by enter, update, remove
        // https://observablehq.com/@d3/selection-join
        // consider moving .attr("d", d3.geoPath()) to only be called inside enter
        // (don't want to redraw the paths everytime)
        .attr("fill", d => {

            // Handle District of Columbia edge case

            let stateName = d['properties']['name']; //retrieve the name of the state from d

            let numOfSightings = ufoData[String(decade)][stateName]; //retrieve the number of sightings by decade and state

            // based on the number of sightings create a color and set the color to the fill of the state
            // https://observablehq.com/@d3/color-schemes
            // https://observablehq.com/@d3/color-legend
            // https://github.com/d3/d3-scale-chromatic
            // https://observablehq.com/@d3/choropleth

            console.log(decade, stateName, numOfSightings);
            return 'green';
        })
        // d3.geoPath() gets the coordinates from the data object and constructs a path
        // MDN Docs on pathing: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
        .attr("d", d3.geoPath());

    // Add transition on color change
    // Add legend of colors
    // The legend can change based on the maximum and minimum per decade
    // or it can be constant from 0 to [some large number]
    // http://bl.ocks.org/michellechandra/0b2ce4923dc9b5809922

    // creates a border around each state
    // don't use this unless we can explain what topojson.mesh(us, us.objects.states, (a, b)) does
    // https://github.com/topojson/topojson-client/blob/master/README.md#mesh
    console.log(topojson.mesh(us, us.objects.states, (a, b) => a !== b));
    svg.append("path")
        //.datum adds a single data point
        .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
        .attr("fill", "none")
        .attr("stroke", "white")
        // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linejoin
        .attr("stroke-linejoin", "round")
        .attr("d", d3.geoPath());

    // consider making a variable for d3.geoPath() if we also do borders
    // we use d3.geoPath() twice.
};

const getData = async () => {

    let stateMap = { "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California", "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "FL": "Florida", "GA": "Georgia", "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa", "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina", "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont", "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming" };

    // make all of the abbreviations lower case and remove the upper case abbreviations
    for ( const state in stateMap) {
        stateMap[ state.toLowerCase()] = stateMap[ state];
        delete stateMap[ state];
    }

    /*
       ufoSightings holds the number of UFO sightings in each state during each decade
        {
            '1930': {
                'Alabama': 0,
                'Alaska': 0,
                ...
            },
            '1940': {
                'Alabama': 0,
                'Alaska': 0,
                ...
            },
            ...
        }
    */
    let ufoSightings = new Object();
    for ( let i = 1930; i < 2020; i += 10) {
        ufoSightings[ String(i)] = new Object();
        for ( const abbreviation in stateMap) {
            ufoSightings[ String(i)][ stateMap[ abbreviation]] = 0;
        }
    }

    // fill ufoSightings with USA UFO sightings from 1930 onward.
    let data = await d3.csv( "static/csv/scrubbed.csv");
    data.forEach( sighting => {
        let abbreviation = sighting[ 'state'];
        let date = sighting[ 'datetime'];
        let space = date.indexOf( ' ');
        let decade = date.substring( space - 4, space - 1) + '0';

        if ( sighting[ 'country'] == 'us' && decade >= '1930') {
            ufoSightings[ decade][ stateMap[ abbreviation]]++;
        }
    });
    return ufoSightings;
};