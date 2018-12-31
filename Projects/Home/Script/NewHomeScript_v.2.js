$(document).ready(function() {
// $(".menusort").sortable();

var backImages = [
  "Autumn Leaves",
  "blizzard",
  "Blossom",
  "Butterfly",
  "Cabo",
  "California Poppy",
  "Chrysanthemum",
  "cloudy-1",
  "cloudy-evening",
  "Crater",
  "Creek",
  "Desert Landscape",
  "Desert",
  "Dock",
  "El Capitan",
  "El Matador",
  "evening-sky",
  "foggy-lake",
  "foggy-mountain",
  "Forest",
  "Garden",
  "Half Dome at Sunset",
  "Humpback Whale",
  "lightning",
  "Oryx Antelope",
  "rain-blur",
  "rain-umbrella",
  "rainy-window",
  "rolling-hills",
  "sleet",
  "snowfalling",
  "sunny-lake",
  "Tree",
  "TwoJackLake",
  "Yosemite Valley"

  ];

var maxUsed = 4;
var usedImgsArr = [];

function getRandomBG() {
  var num = Math.floor(Math.random() * backImages.length);
  // console.log(num);
  // if (usedImgsArr.length === maxUsed) {
  //   usedImgsArr.shift();
  // }
  //
  // if (usedImgsArr.includes(num)) {
  //   return getRandomBG();
  // } else {
  //   usedImgsArr.push(num);
    var arrVal = backImages[num];
    // console.log(arrVal);
    var imgVal = "url('assets/"+arrVal+".jpg')";
    // console.log(imgVal);
    $('body').css("background-image", imgVal);

    // }
  }

getRandomBG();

});
