'use strict';

(function () {

  var filterCharacter = function (coat, eyes, data) {
    var cloneData = data.slice();
    // console.warn(data);
    console.log(eyes, coat);

    // Object.assign(cloneData, {raiting: 0})
    // console.log(cloneData);

    var filter = cloneData.filter(function (current) {
      var result;
      if (current.colorCoat === coat && current.colorEyes === eyes) {
        result = Object.assign(current, {raiting: 3});
      } else if (current.colorCoat === coat) {
        result = Object.assign(current, {raiting: 2});
      } else if (current.colorEyes === eyes) {
        result = Object.assign(current, {raiting: 1});
      }
      return result;
    }).sort(function (a, b) {
      return (b.raiting - a.raiting);
    });

    console.table(filter);


    // var

    // var sameCoat = data.filter(function (current) {
    //   if (current.colorCoat === coat) {
    //     return current;
    //   } else if (current.colorEyes === eyes) {
    //     return current;
    //   }
    // });

    // for (var i = 0; i < data.length; i++) {
    //   // console.log(data);
    //   sameCoat[i] = (data[i].colorCoat === coat) ? data[i] : i;
    // }

    // console.log(sameCoat);

  };


  window.filter = {
    filterCharacter: filterCharacter,
  };

})();
