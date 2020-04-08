var gallery;
var lastSearch;

function searchPhotos(text, page) {
  if (text.length === 0) {
    alert("Error: the field is required");
  }
  page = page > 0 ? page : 1;

  Flickr.searchText({
    text: text,
    per_page: 15,
    jsoncallback: "Website.Homepage.showPhotos",
    page: page,
  });
}

function showPhotos(data) {
  gallery = new Gallery(
    data.photos.photo,
    document.getElementsByClassName("js-gallery__image")[0]
  );
  gallery.createThumbnailsGallery(
    document.getElementsByClassName("js-thumbnails__list")[0]
  );
}

if (localStorage.getItem("saveSearch")) init();

function init() {
  document
    .getElementsByClassName("js-form-search")[0]
    .addEventListener("submit", function (event) {
      event.preventDefault();

      lastSearch = document.getElementById("query").value;
      if (lastSearch.length > 0) {
        searchPhotos(lastSearch, 1);
      }

      localStorage.setItem("saveSearch", lastSearch);

      if (localStorage.getItem("saveSearch")) {
        lastSearch = localStorage.getItem("saveSearch");
      } else {
        lastSearch = document.getElementById("query").value;
      }
    });

  var leftArrow = document.getElementsByClassName("js-gallery__arrow--left")[0];
  leftArrow.addEventListener("click", function () {
    gallery.showPrevious.bind(gallery)();
  });
  leftArrow.addEventListener("keydown", function (event) {
    if (event.which === 13) {
      gallery.showPrevious.bind(gallery)();
    }
  });

  var rightArrow = document.getElementsByClassName(
    "js-gallery__arrow--right"
  )[0];
  rightArrow.addEventListener("click", function () {
    gallery.showNext.bind(gallery)();
  });
  rightArrow.addEventListener("keydown", function (event) {
    if (event.which === 13) {
      gallery.showNext.bind(gallery)()();
    }
  });
}

window.Website = Utility.extend(window.Website || {}, {
  Homepage: {
    init: init,
    showPhotos: showPhotos,
  },
});
//Website.Homepage.init();
