(function() {
  var ab_content, ab_contentW, col, colNum, colW, curEl, els, _i, _j, _len, _len1;

  ab_content = $('.about-content');

  ab_contentW = ab_content.find('.container').width();

  col = ab_content.find('.column');

  colW = col.width();

  colNum = ab_contentW / colW;

  colNum = (colNum > 1 ? Math.floor(colNum) : Math.ceil(colNum));

  if (colNum === 1) {
    for (_i = 0, _len = col.length; _i < _len; _i++) {
      curEl = col[_i];
      curEl = Array.prototype.pop.apply(col);
      $(curEl).css({
        "border": "none"
      });
    }
  } else {
    els = (function() {
      var _j, _ref, _results;
      _results = [];
      for (curEl = _j = _ref = col.length - 1; _j >= 0; curEl = _j += -1) {
        if (!(colNum > 0)) {
          continue;
        }
        colNum--;
        _results.push(Array.prototype.pop.apply(col));
      }
      return _results;
    })();
    for (_j = 0, _len1 = els.length; _j < _len1; _j++) {
      curEl = els[_j];
      $(curEl).css({
        "border-bottom": "none"
      });
    }
  }

}).call(this);
