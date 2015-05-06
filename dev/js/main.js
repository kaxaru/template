(function() {
  var icon;

  icon = $('.content__icon-el');

  icon.on({
    'mouseenter': function() {
      return $(this).parent().find('.content__icon-text').css({
        'color': 'red'
      });
    },
    'mouseleave': function() {
      return $(this).parent().find('.content__icon-text').css({
        'color': '#666666'
      });
    }
  });

}).call(this);
