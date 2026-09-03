import $ from "./helper.js";

const potus = $('#potus');
potus.css('color', 'orange');
potus.click(() => console.log('potus was clicked'));
potus.on('mouseenter', () => potus.css('backgroundColor', 'blue'));
potus.on('mouseleave', () => potus.css('backgroundColor', 'white'));

//potus.css('fontFamily', 'cursive');
console.log(potus.css('fontFamily'));

potus.css('position', 'absolute');
potus.css('bottom', 0);
// potus.hide();

$('#vp').hide();

$('#vp').display();
$('#vp').css('fontSize', '8em');
$('#vp').sparkle('color',1000, 5000);

$('h1').css('fontSize', '3em');