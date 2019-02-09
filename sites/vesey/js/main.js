$(document).ready(function () {
  // ID of the Google Spreadsheet (dummy data)
  var spreadsheetID = "1HR3T8Xv5TU75S01Zsu0Jq7ObMVgoB8JBaWB3epPWPF0",
    templateRoot = '../',
    customJSON = {
      "mapwidth":"5264",
      "mapheight":"3867",
      "levels":[
        {
          "id": "floor-14",
          "title": "14th Floor",
          "map": "maps/office-map-1.svg",
          "locations": [
            {
              "id":"d1",
              "title": "Jerry Seinfeld",
              "description":"",
              "pin":"iconpin purple fa fa-rocket",
              "category": "business",
              "x":"0.165",
              "y":"0.1084"
            }
          ]
        },
        {
          "id": "floor-15",
          "title": "15th Floor",
          "show": true,
          "map": "maps/office-map-2.svg",
          "locations": [
            {
              "id":"o20",
              "title": "Kramer",
              "description":"",
              "pin":"iconpin purple fa fa-rocket",
              "category": "business",
              "x":"0.1252",
              "y":"0.17001"
            }
          ]
        }
      ],
      "minimap":"false",
      "sidebar":"true",
      "zoomlimit":"1"
    },
    floor14 = [],
    floor15 = [];
  
  var spreadsheetTest = 'https://spreadsheets.google.com/feeds/list/'

  // Make sure it is public or set to Anyone with link can view 
  var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

  var googleJSON = $.getJSON(url, function (data) {

    var entry = data.feed.entry;
    console.log(entry);

    $(entry).each(function () {
      var  name = this.gsx$first.$t + ' ' + this.gsx$last.$t,
          table = this.gsx$table.$t,
          floor = this.gsx$floor.$t,
              x = this.gsx$x.$t,
              y = this.gsx$y.$t;
      
      if (floor == '14' || floor == 14) {
    
        floor14.push({
          id: name.replace(/\s/g, ''),
          title: name,
          x: x,
          y: y,
          pin: 'hidden',
        });
      } else if (floor == '15' || floor == 15) {
        floor15.push({
          id: name.replace(/\s/g, ''),
          title: name,
          x: x,
          y: y,
          pin: 'hidden',
        });
      }
    });
  });
  
  
  // Sheets --> Json callback
  googleJSON.done(function() {
    console.log(floor14);
    customJSON.levels[0].locations = floor14;
    customJSON.levels[1].locations = floor15;
    console.log(customJSON.levels[0].locations);
    initMap();
  });
  
  function initMap() {
    var map = $('.mapplic-container').mapplic({
  //    source: 'seating.json',
      source: customJSON,
      height: 465,
      sidebar: true,
//      developer: true, //dev
      hovertip: false,
      markers: false,
      minimap: false,
      fullscreen: false,
      zoombuttons: false,
      clearbutton: false,
      maxscale: .1 //the max scale is actually 1+ this number
    });
  }
  
  function initDevMap() {
    console.log('firing initDevMap');
    var map = $('.mapplic-dev-container').mapplic({
  //    source: 'seating.json',
      source: customJSON,
      height: 465,
      sidebar: true,
      developer: true, //dev
      hovertip: false,
      markers: false,
      minimap: false,
      fullscreen: false,
      zoombuttons: false,
      clearbutton: false,
      maxscale: .1 //the max scale is actually 1+ this number
    });
  }
  
  // hover, shame
  $('.large-nav').on('mouseover', function() {
    var navItem = $(this).attr('id');
    var newSource = 'images/nav/' + navItem + '-o.png';
    $(this).find('img').attr('src', newSource);
  });
  
  $('.large-nav').on('mouseout', function() {
    var navItem = $(this).attr('id');
    var newSource = 'images/nav/' + navItem + '.png';
    $(this).find('img').attr('src', newSource);
  });
  
  // Triple click listener //shame?
  $('#hiddenbutton').click(function (evt) {
    console.log('click');
    if (evt.detail === 5) {
      $('.mapplic-container').remove();
      initDevMap();
    }
  });
});