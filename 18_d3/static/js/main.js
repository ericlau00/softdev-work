// Eric Lau, Yaru Luo -- YikEs
// SoftDev2 pd1
// K18 -- Come Up For Air
// 2020-04-21

let created = false;
let visualization = document.getElementById('visualization');
let ufoData;

let minDecade = 1920;
let maxDecade = 2010;
let decade = 1940;

let greens = ["#f7fcf5","#f6fcf4","#f5fbf3","#f5fbf2","#f4fbf2","#f4fbf1","#f3faf0","#f2faf0","#f2faef","#f1faee","#f1faee","#f0f9ed","#f0f9ec","#eff9ec","#eef9eb","#eef8ea","#edf8ea","#ecf8e9","#ecf8e8","#ebf7e7","#ebf7e7","#eaf7e6","#e9f7e5","#e9f6e4","#e8f6e4","#e7f6e3","#e7f6e2","#e6f5e1","#e5f5e1","#e4f5e0","#e4f4df","#e3f4de","#e2f4dd","#e1f4dc","#e1f3dc","#e0f3db","#dff3da","#def2d9","#ddf2d8","#ddf2d7","#dcf1d6","#dbf1d5","#daf1d4","#d9f0d3","#d8f0d2","#d7efd1","#d6efd0","#d5efcf","#d4eece","#d4eece","#d3eecd","#d2edcb","#d1edca","#d0ecc9","#cfecc8","#ceecc7","#cdebc6","#ccebc5","#cbeac4","#caeac3","#c9eac2","#c8e9c1","#c6e9c0","#c5e8bf","#c4e8be","#c3e7bd","#c2e7bc","#c1e6bb","#c0e6b9","#bfe6b8","#bee5b7","#bde5b6","#bbe4b5","#bae4b4","#b9e3b3","#b8e3b2","#b7e2b0","#b6e2af","#b5e1ae","#b3e1ad","#b2e0ac","#b1e0ab","#b0dfaa","#aedfa8","#addea7","#acdea6","#abdda5","#aadca4","#a8dca3","#a7dba2","#a6dba0","#a5da9f","#a3da9e","#a2d99d","#a1d99c","#9fd89b","#9ed799","#9dd798","#9bd697","#9ad696","#99d595","#97d494","#96d492","#95d391","#93d390","#92d28f","#91d18e","#8fd18d","#8ed08c","#8ccf8a","#8bcf89","#8ace88","#88cd87","#87cd86","#85cc85","#84cb84","#82cb83","#81ca82","#80c981","#7ec980","#7dc87f","#7bc77e","#7ac77c","#78c67b","#77c57a","#75c479","#74c478","#72c378","#71c277","#6fc276","#6ec175","#6cc074","#6bbf73","#69bf72","#68be71","#66bd70","#65bc6f","#63bc6e","#62bb6e","#60ba6d","#5eb96c","#5db86b","#5bb86a","#5ab769","#58b668","#57b568","#56b467","#54b466","#53b365","#51b264","#50b164","#4eb063","#4daf62","#4caf61","#4aae61","#49ad60","#48ac5f","#46ab5e","#45aa5d","#44a95d","#42a85c","#41a75b","#40a75a","#3fa65a","#3ea559","#3ca458","#3ba357","#3aa257","#39a156","#38a055","#379f54","#369e54","#359d53","#349c52","#339b51","#329a50","#319950","#30984f","#2f974e","#2e964d","#2d954d","#2b944c","#2a934b","#29924a","#28914a","#279049","#268f48","#258f47","#248e47","#238d46","#228c45","#218b44","#208a43","#1f8943","#1e8842","#1d8741","#1c8640","#1b8540","#1a843f","#19833e","#18823d","#17813d","#16803c","#157f3b","#147e3a","#137d3a","#127c39","#117b38","#107a37","#107937","#0f7836","#0e7735","#0d7634","#0c7534","#0b7433","#0b7332","#0a7232","#097131","#087030","#086f2f","#076e2f","#066c2e","#066b2d","#056a2d","#05692c","#04682b","#04672b","#04662a","#03642a","#036329","#026228","#026128","#026027","#025e27","#015d26","#015c25","#015b25","#015a24","#015824","#015723","#005623","#005522","#005321","#005221","#005120","#005020","#004e1f","#004d1f","#004c1e","#004a1e","#00491d","#00481d","#00471c","#00451c","#00441b"];

const colorFilter = (runs) => {
    for(let i = 0; i < runs; i++)
        for(let j = 1; j < greens.length; j+=2)
            greens.splice(j, 1); // remove every other element in greens
}

colorFilter(5);

document.getElementById('render-button').addEventListener('click', async () => {
    if (!created) {
        let svg = createSVG();
        decadeListener('next', 10, maxDecade, svg);
        decadeListener('previous', -10, minDecade, svg);
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

    // creates a color mapping function
    let colorMapper = generateColorMapper();

    svg.selectAll("path")
        .data(pathData)
        .join(
            enter => enter.append('path')
                // d3.geoPath() gets the coordinates from the data object and constructs a path
                .attr('d', d3.geoPath())
                .attr('fill', d => color(colorMapper, d)),
            update => update
                .transition(d3.transition().duration(1500))
                .attr('fill', d => color(colorMapper, d))
        );

    // Add legend of colors
    // The legend can change based on the maximum and minimum per decade
    // or it can be constant from 0 to [some large number]

    /*
        topojson.mesh(us, us.objects.states)
            creates a MultiLineString comprised of arrays
            the arrays hold coordinates that outline the state borders

        i.e. {type: "MultiLineString", coordinates: Array(195)}

        topojson.mesh is useful for creating complicated outlines that can overlap
    */
    let borderDatum = topojson.mesh(us, us.objects.states);

    svg.append("path")
        // .datum() adds a single data point
        // it also skips the enter, update, remove step
        .datum(borderDatum)
        .attr("fill", "none")
        .attr("stroke", "black")
        // stroke-linejoin defines the behavior of a stroke at corners
        .attr("stroke-linejoin", "round")
        .attr("d", d3.geoPath());
};

const color = (colorMapper, d) => {
    //retrieve the name of the state
    let stateName = d['properties']['name'];

    //retrieve the number of sightings based on decade and state name
    let numOfSightings = ufoData[String(decade)][stateName];

    // generate a color based on the number of sightings
    return colorMapper( numOfSightings);
}

const generateColorMapper = () => {
    let sightings = Object.values( ufoData[ decade]);

    // d3.scaleQuantize() creates a scaling function that maps a domain to a range
    // this is different from a linear scale because the range is not continuous
    // in our case, we map the number of sightings to colors (the colors are not continuous)
    return d3.scaleQuantize()
        .domain( [ d3.min( sightings), d3.max( sightings)])
        .range( greens.slice( 0, greens.length));
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
    for ( let i = minDecade; i <= maxDecade; i += 10) {
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

        if ( sighting[ 'country'] == 'us' && +decade >= minDecade) {
            ufoSightings[ decade][ stateMap[ abbreviation]]++;
        }
    });
    return ufoSightings;
};

/*
  Links and resources used

    General:
    https://observablehq.com/@d3/choropleth
        - This notebook by Mike Bostock got us off the ground on how to make choropleths

    Making the map:
    https://github.com/topojson/us-atlas
        - This repository contains various JSON files that outline the USA
        - topojson seems to be the go-to when making maps in D3
        - topojson is maintained by Mike Bostock

    https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
        - This documentation goes over how path elements work in SVGs

    https://github.com/topojson/topojson-client/blob/master/README.md#feature
        - This README section goes over how topojson.feature() works

    Borders:
    https://github.com/topojson/topojson-client/blob/master/README.md#mesh
        - This README section goes over how topojson.mesh() works

    https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linejoin
        - This documentation goes over what the stroke-linejoin attribute does

    https://github.com/d3/d3-selection#selection_datum
        - This README section goes over what selection.datum() is

    Colors:
    https://observablehq.com/@d3/color-schemes
    https://observablehq.com/@d3/color-legend
    https://github.com/d3/d3-scale#quantize-scales
    https://observablehq.com/@d3/quantile-quantize-and-threshold-scales

    https://observablehq.com/@d3/d3-extent
    https://observablehq.com/@d3/selection-join
    https://github.com/d3/d3-transition
*/