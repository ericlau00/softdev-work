// Eric Lau, Yaru Luo -- YikEs
// SoftDev2 pd1
// K18 -- Come Up For Air
// 2020-04-21

let created = false;
let visualization = document.getElementById('visualization');
let decade = 1940;
let ufoData;
let greens = [ "#bfe6b8","#bee5b7","#bde5b6","#bbe4b5","#bae4b4","#b9e3b3","#b8e3b2","#b7e2b0","#b6e2af","#b5e1ae","#b3e1ad","#b2e0ac","#b1e0ab","#b0dfaa","#aedfa8","#addea7","#acdea6","#abdda5","#aadca4","#a8dca3","#a7dba2","#a6dba0","#a5da9f","#a3da9e","#a2d99d","#a1d99c","#9fd89b","#9ed799","#9dd798","#9bd697","#9ad696","#99d595","#97d494","#96d492","#95d391","#93d390","#92d28f","#91d18e","#8fd18d","#8ed08c","#8ccf8a","#8bcf89","#8ace88","#88cd87","#87cd86","#85cc85","#84cb84","#82cb83","#81ca82","#80c981","#7ec980","#7dc87f","#7bc77e","#7ac77c","#78c67b","#77c57a","#75c479","#74c478","#72c378","#71c277","#6fc276","#6ec175","#6cc074","#6bbf73","#69bf72","#68be71","#66bd70","#65bc6f","#63bc6e","#62bb6e","#60ba6d","#5eb96c","#5db86b","#5bb86a","#5ab769","#58b668","#57b568","#56b467","#54b466","#53b365","#51b264","#50b164","#4eb063","#4daf62","#4caf61","#4aae61","#49ad60","#48ac5f","#46ab5e","#45aa5d","#44a95d","#42a85c","#41a75b","#40a75a","#3fa65a","#3ea559","#3ca458","#3ba357","#3aa257","#39a156","#38a055","#379f54","#369e54","#359d53","#349c52","#339b51","#329a50","#319950","#30984f","#2f974e","#2e964d","#2d954d","#2b944c","#2a934b","#29924a","#28914a","#279049","#268f48","#258f47","#248e47","#238d46","#228c45","#218b44","#208a43","#1f8943","#1e8842","#1d8741","#1c8640","#1b8540","#1a843f","#19833e","#18823d","#17813d","#16803c","#157f3b","#147e3a","#137d3a","#127c39","#117b38","#107a37","#107937","#0f7836","#0e7735","#0d7634","#0c7534","#0b7433","#0b7332","#0a7232","#097131","#087030","#086f2f","#076e2f","#066c2e","#066b2d","#056a2d","#05692c","#04682b","#04672b","#04662a","#03642a","#036329","#026228","#026128","#026027","#025e27","#015d26","#015c25","#015b25","#015a24","#015824","#015723","#005623","#005522","#005321","#005221","#005120","#005020","#004e1f","#004d1f","#004c1e","#004a1e","#00491d","#00481d","#00471c","#00451c","#00441b"];

// create function to find the min and max of the current decade
    // parse through the ufoData object and get an array of all ufo sightings
    // use d3.min and d3.max to find min and max
// pass min and max into render function
// invoke this function and pass in the min and max to the render function
// create a coloring function (data, min, max);



document.getElementById('render-button').addEventListener('click', async () => {
    if (!created) {
        let svg = createSVG();
        decadeListener('next', 10, 2010, svg);
        decadeListener('previous', -10, 1930, svg);
	ufoData = await getData();
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
        .attr("d", d3.geoPath()).transition(
            d3.transition().duration(750)
        )
        .attr("fill", d => {

            // Handle District of Columbia edge case

            let stateName = d['properties']['name']; //retrieve the name of the state from d

            let numOfSightings = ufoData[String(decade)][stateName]; //retrieve the number of sightings by decade and state

            let colorMapper = generateColorMapper();

            console.log( colorMapper( numOfSightings));
            // based on the number of sightings create a color and set the color to the fill of the state
            // https://observablehq.com/@d3/color-schemes
            // https://observablehq.com/@d3/color-legend
            // https://github.com/d3/d3-scale-chromatic
            // https://observablehq.com/@d3/choropleth
            // console.log(color(numOfSightings));
            // console.log(decade, stateName, numOfSightings);
            return colorMapper( numOfSightings);
        })
        // d3.geoPath() gets the coordinates from the data object and constructs a path
        // MDN Docs on pathing: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
        // .attr("d", d3.geoPath());

    // Add transition on color change
    // Add legend of colors
    // The legend can change based on the maximum and minimum per decade
    // or it can be constant from 0 to [some large number]
    // http://bl.ocks.org/michellechandra/0b2ce4923dc9b5809922

    // creates a border around each state
    // don't use this unless we can explain what topojson.mesh(us, us.objects.states, (a, b)) does
    // https://github.com/topojson/topojson-client/blob/master/README.md#mesh
    // console.log(topojson.mesh(us, us.objects.states, (a, b) => a !== b));
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

// this function generates a function
const generateColorMapper = () => {
    let numOfSightings = Object.values( ufoData[ decade]);
    let min = d3.min( numOfSightings);
    let max = d3.max( numOfSightings);
    return d3.scaleQuantize( [ min, max], greens.slice( 0, greens.length));
}

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