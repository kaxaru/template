(function() {
  var about_slider, content_slider, slider,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  slider = (function() {
    function slider(el, numOnPage, time, width) {
      this.el = el;
      this.backward = __bind(this.backward, this);
      this.forward = __bind(this.forward, this);
      this.clickSlide = __bind(this.clickSlide, this);
      this.numOnPage = numOnPage || 1;
      this.time = time || .73;
    }

    slider.prototype.init = function() {
      this.setElsSlide();
      this.control();
      this.events();
    };

    slider.prototype.control = function() {
      var controlEl, i, listControl, _i, _ref;
      controlEl = this.blockEls.find('div[class$=control]');
      listControl = $('<ul></ul>');
      for (i = _i = 0, _ref = this.elsSlide.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        listControl.append($('<li></li>').addClass('slide' + i));
      }
      listControl.children().first().addClass('active');
      controlEl.append(listControl);
    };

    slider.prototype.setElsSlide = function() {
      this.blockEls = $('div[class^=' + this.el.slice(1) + ']');
      this.elsSlide = this.blockEls.find('li[class$=el]').length === 0 ? this.blockEls.find('div[class$=el]') : this.blockEls.find('li[class$=el]');
    };

    slider.prototype.setWidth = function() {
      this.width = this.elsSlide[0].offsetWidth;
    };

    slider.prototype.events = function() {
      return $('li[class^=slide]').on('click', this.clickSlide);
    };

    slider.prototype.clickSlide = function(e) {
      var activeSlide, activeSlideClassL, activeSlideNum, classListEl, controlBlock, controlBlockClass, currentClass, elSlideNum, elsSlide, sliderBlock, sliderBlockClass;
      e.preventDefault();
      classListEl = $(e.target.classList);
      if (__indexOf.call(classListEl, 'active') >= 0) {

      } else {
        elSlideNum = classListEl[0].slice(-1);
        controlBlock = $(e.target).parent().parent();
        controlBlockClass = controlBlock[0].classList[0];
        sliderBlockClass = controlBlockClass.slice(0, controlBlockClass.indexOf('__'));
        sliderBlock = $('.' + sliderBlockClass);
        elsSlide = sliderBlock.find('li[class$=el]');
        activeSlide = controlBlock.find('.active');
        activeSlideClassL = activeSlide[0].classList;
        activeSlideNum = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = activeSlideClassL.length; _i < _len; _i++) {
            currentClass = activeSlideClassL[_i];
            if (currentClass.includes('slide')) {
              _results.push(currentClass.slice(-1));
            }
          }
          return _results;
        })();
        if (activeSlideNum.length === 1) {
          activeSlide.removeClass('active');
          $(e.target).addClass('active');
          if (+activeSlideNum[0] < +elSlideNum) {
            this.forward(+elSlideNum, +activeSlideNum[0]);
          } else {
            this.backward(+elSlideNum, +activeSlideNum[0]);
          }
        }
      }
    };

    slider.prototype.forward = function(clickNum, activeNum) {
      var el, i, mLeft, offsetEls, _i, _len, _ref;
      this.setWidth();
      offsetEls = clickNum - activeNum;
      _ref = this.elsSlide;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        el = _ref[i];
        if (!(i < clickNum)) {
          continue;
        }
        if ($(el).css('margin-left') != null) {
          mLeft = $(el).css('margin-left');
        }
        mLeft = +mLeft.slice(0, mLeft.length - 2);
        TweenMax.to(el, this.time, {
          css: {
            'margin-left': -(this.width + 40) * offsetEls + mLeft,
            ease: Elastic.easeOut
          }
        });
        if (i >= activeNum) {
          offsetEls--;
        }
      }
    };

    slider.prototype.backward = function(clickNum, activeNum) {
      var el, i, mLeft, offset, offsetEls, _i, _len, _ref;
      offsetEls = activeNum - clickNum;
      _ref = this.elsSlide;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        el = _ref[i];
        if ($(el).css('margin-left') != null) {
          mLeft = $(el).css('margin-left');
        }
        mLeft = +mLeft.slice(0, mLeft.length - 2);
        offset = (this.width + 40) * offsetEls + mLeft;
        if (offset > 0) {
          offset = 0;
        }
        TweenMax.to(el, this.time, {
          css: {
            'margin-left': offset,
            ease: Elastic.easeOut
          }
        });
        if (i >= clickNum && offset > 0) {
          offset--;
        }
      }
    };

    return slider;

  })();

  if (!!($('.content-slider'))) {
    content_slider = new slider('.content-slider', 2, .8);
    content_slider.init();
  }

  if (!!($('.about-wordpress'))) {
    about_slider = new slider('.about-wordpress');
    about_slider.init();
  }

}).call(this);
