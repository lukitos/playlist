// Retrieve all albums
var albums = {};
$.get('https://lit-fortress-6467.herokuapp.com/object').then(function(data) {
  albums = data.results;
  addTracks();
  addThumbnails();
  addEvents();
}, function(e) {
  console.log('Error occurred when retrieving album data. Please contact your system administrator! ', e);
});

function addTracks() {
  // Add 3 random albums to the track on splash page
  albums.sort(function() {
    return 0.5 - Math.random();
  });
  let tracks = albums.slice(0, 3);
  tracks.forEach(function(curr) {
    let elem = createImgElement(curr, 'img-track-album');
    $('#tracks-container').append(elem);
  });
}

function addThumbnails() {
  // Add album thumbnails to the playlist page
  albums.forEach(function(curr) {
    let elem = createImgElement(curr, 'img-thumbnail-album');
    $('#albums-container').append(elem);
  });
}

function createImgElement(item, cl) {
  let elem = document.createElement('img');
  elem.setAttribute('id', item.id);
  elem.setAttribute('src', 'images/' + item.cover_art);
  elem.setAttribute('alt', item.artist);
  if (cl !== null) {
    elem.setAttribute('class', cl);
  }
  return elem;
}

function addEvents() {

  // Add selected album to description
  $('.img-thumbnail-album').click(function() {
    let selected = albums.find(function(curr) {
      return curr.id === parseInt(this.id);
    }, this);
    let description = '<p>' + selected.artist + ': ' + selected.title + '</p>';
    $('.album-description').append(description);
  });

  // Add clear button handler
  $('#btn_clear').click(function() {
    $('.album-description').text('');
  });

  // Add submit bin button handler
  $('#btn_submit').click(function() {
    $.post('https://lit-fortress-6467.herokuapp.com/post', function(data) {
      console.log(data);
      alert(data)
    });
  });

}
