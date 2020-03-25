
let links = ['github', 'dartpad', 'youtube', 'flutter', 'dart', 'academind'];

for (let i = 0; i < links.length; i++) {
    let el = `#${links[i]}`
    let color = getComputedStyle(document.documentElement).getPropertyValue(`--${links[i]}-color`);
    $(el).css("border-bottom-color", color);
    $(el).mouseover(function () {
        $(this).css('background-color', color);
    });
    $(el).mouseout(function () {
        $(this).css('background-color', 'transparent');
    });
}