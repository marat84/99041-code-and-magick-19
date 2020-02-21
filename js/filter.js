'use strict';

(function () {
  var COAT_RATING = 2;
  var EYES_RATING = 1;

  var filterCharacter = function (coat, eyes, data) {
    var cloneData = data.slice();

    return cloneData.filter(function (current) {
      var result;
      if (current.colorCoat === coat && current.colorEyes === eyes) {
        result = Object.assign(current, {rating: COAT_RATING + EYES_RATING});
      } else if (current.colorCoat === coat) {
        result = Object.assign(current, {rating: COAT_RATING});
      } else if (current.colorEyes === eyes) {
        result = Object.assign(current, {rating: EYES_RATING});
      }
      return result;
    }).sort(function (a, b) {
      return (b.rating - a.rating);
    });

  };


  window.filter = {
    filterCharacter: filterCharacter
  };

})();
