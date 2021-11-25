(self["webpackChunk"] = self["webpackChunk"] || []).push([["assets_jquery_nivo_slider_js"],{

/***/ "./assets/jquery.nivo.slider.js":
/*!**************************************!*\
  !*** ./assets/jquery.nivo.slider.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
__webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");

__webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");

__webpack_require__(/*! core-js/modules/es.array.index-of.js */ "./node_modules/core-js/modules/es.array.index-of.js");

__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.string.split.js */ "./node_modules/core-js/modules/es.string.split.js");

__webpack_require__(/*! core-js/modules/es.parse-int.js */ "./node_modules/core-js/modules/es.parse-int.js");

__webpack_require__(/*! core-js/modules/es.array.reverse.js */ "./node_modules/core-js/modules/es.array.reverse.js");

/*
 * jQuery Nivo Slider v3.2
 * http://nivo.dev7studios.com
 *
 * Copyright 2012, Dev7studios
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function ($) {
  var NivoSlider = function NivoSlider(element, options) {
    // Defaults are below
    var settings = $.extend({}, $.fn.nivoSlider.defaults, options); // Useful variables. Play carefully.

    var vars = {
      currentSlide: 0,
      currentImage: '',
      totalSlides: 0,
      running: false,
      paused: false,
      stop: false,
      controlNavEl: false
    }; // Get this slider

    var slider = $(element);
    slider.data('nivo:vars', vars).addClass('nivoSlider'); // Find our slider children

    var kids = slider.children();
    kids.each(function () {
      var child = $(this);
      var link = '';

      if (!child.is('img')) {
        if (child.is('a')) {
          child.addClass('nivo-imageLink');
          link = child;
        }

        child = child.find('img:first');
      } // Get img width & height


      var childWidth = childWidth === 0 ? child.attr('width') : child.width(),
          childHeight = childHeight === 0 ? child.attr('height') : child.height();

      if (link !== '') {
        link.css('display', 'none');
      }

      child.css('display', 'none');
      vars.totalSlides++;
    }); // If randomStart

    if (settings.randomStart) {
      settings.startSlide = Math.floor(Math.random() * vars.totalSlides);
    } // Set startSlide


    if (settings.startSlide > 0) {
      if (settings.startSlide >= vars.totalSlides) {
        settings.startSlide = vars.totalSlides - 1;
      }

      vars.currentSlide = settings.startSlide;
    } // Get initial image


    if ($(kids[vars.currentSlide]).is('img')) {
      vars.currentImage = $(kids[vars.currentSlide]);
    } else {
      vars.currentImage = $(kids[vars.currentSlide]).find('img:first');
    } // Show initial link


    if ($(kids[vars.currentSlide]).is('a')) {
      $(kids[vars.currentSlide]).css('display', 'block');
    } // Set first background


    var sliderImg = $('<img alt="fight" src="#"/>').addClass('nivo-main-image');
    sliderImg.attr('src', vars.currentImage.attr('src')).show();
    slider.append(sliderImg); // Detect Window Resize

    $(window).resize(function () {
      slider.children('img').width(slider.width());
      sliderImg.attr('src', vars.currentImage.attr('src'));
      sliderImg.stop().height('auto');
      $('.nivo-slice').remove();
      $('.nivo-box').remove();
    }); //Create caption

    slider.append($('<div class="nivo-caption"></div>')); // Process caption function

    var processCaption = function processCaption(settings) {
      var nivoCaption = $('.nivo-caption', slider);

      if (vars.currentImage.attr('title') != '' && vars.currentImage.attr('title') != undefined) {
        var title = vars.currentImage.attr('title');
        if (title.substr(0, 1) == '#') title = $(title).html();

        if (nivoCaption.css('display') == 'block') {
          setTimeout(function () {
            nivoCaption.html(title);
          }, settings.animSpeed);
        } else {
          nivoCaption.html(title);
          nivoCaption.stop().fadeIn(settings.animSpeed);
        }
      } else {
        nivoCaption.stop().fadeOut(settings.animSpeed);
      }
    }; //Process initial  caption


    processCaption(settings); // In the words of Super Mario "let's a go!"

    var timer = 0;

    if (!settings.manualAdvance && kids.length > 1) {
      timer = setInterval(function () {
        nivoRun(slider, kids, settings, false);
      }, settings.pauseTime);
    } // Add Direction nav


    if (settings.directionNav) {
      slider.append('<div class="nivo-directionNav"><a class="nivo-prevNav">' + settings.prevText + '</a><a class="nivo-nextNav">' + settings.nextText + '</a></div>');
      $(slider).on('click', 'a.nivo-prevNav', function () {
        if (vars.running) {
          return false;
        }

        clearInterval(timer);
        timer = '';
        vars.currentSlide -= 2;
        nivoRun(slider, kids, settings, 'prev');
      });
      $(slider).on('click', 'a.nivo-nextNav', function () {
        if (vars.running) {
          return false;
        }

        clearInterval(timer);
        timer = '';
        nivoRun(slider, kids, settings, 'next');
      });
    } // Add Control nav


    if (settings.controlNav) {
      vars.controlNavEl = $('<div class="nivo-controlNav"></div>');
      slider.after(vars.controlNavEl);

      for (var i = 0; i < kids.length; i++) {
        if (settings.controlNavThumbs) {
          vars.controlNavEl.addClass('nivo-thumbs-enabled');
          var child = kids.eq(i);

          if (!child.is('img')) {
            child = child.find('img:first');
          }

          if (child.attr('data-thumb')) vars.controlNavEl.append('<a href="#" class="nivo-control" rel="' + i + '"><img src="' + child.attr('data-thumb') + '" alt="" /></a>');
        } else {
          vars.controlNavEl.append('<a class="nivo-control" href="#" rel="' + i + '">' + (i + 1) + '</a>');
        }
      } //Set initial active link


      $('a:eq(' + vars.currentSlide + ')', vars.controlNavEl).addClass('active');
      $('a', vars.controlNavEl).bind('click', function () {
        if (vars.running) return false;
        if ($(this).hasClass('active')) return false;
        clearInterval(timer);
        timer = '';
        sliderImg.attr('src', vars.currentImage.attr('src'));
        vars.currentSlide = $(this).attr('rel') - 1;
        nivoRun(slider, kids, settings, 'control');
      });
    } //For pauseOnHover setting


    if (settings.pauseOnHover) {
      slider.hover(function () {
        vars.paused = true;
        clearInterval(timer);
        timer = '';
      }, function () {
        vars.paused = false; // Restart the timer

        if (timer === '' && !settings.manualAdvance) {
          timer = setInterval(function () {
            nivoRun(slider, kids, settings, false);
          }, settings.pauseTime);
        }
      });
    } // Event when Animation finishes


    slider.bind('nivo:animFinished', function () {
      sliderImg.attr('src', vars.currentImage.attr('src'));
      vars.running = false; // Hide child links

      $(kids).each(function () {
        if ($(this).is('a')) {
          $(this).css('display', 'none');
        }
      }); // Show current link

      if ($(kids[vars.currentSlide]).is('a')) {
        $(kids[vars.currentSlide]).css('display', 'block');
      } // Restart the timer


      if (timer === '' && !vars.paused && !settings.manualAdvance) {
        timer = setInterval(function () {
          nivoRun(slider, kids, settings, false);
        }, settings.pauseTime);
      } // Trigger the afterChange callback


      settings.afterChange.call(this);
    }); // Add slices for slice animations

    var createSlices = function createSlices(slider, settings, vars) {
      if ($(vars.currentImage).parent().is('a')) $(vars.currentImage).parent().css('display', 'block');
      $('img[src="' + vars.currentImage.attr('src') + '"]', slider).not('.nivo-main-image,.nivo-control img').width(slider.width()).css('visibility', 'hidden').show();
      var sliceHeight = $('img[src="' + vars.currentImage.attr('src') + '"]', slider).not('.nivo-main-image,.nivo-control img').parent().is('a') ? $('img[src="' + vars.currentImage.attr('src') + '"]', slider).not('.nivo-main-image,.nivo-control img').parent().height() : $('img[src="' + vars.currentImage.attr('src') + '"]', slider).not('.nivo-main-image,.nivo-control img').height();

      for (var i = 0; i < settings.slices; i++) {
        var sliceWidth = Math.round(slider.width() / settings.slices);

        if (i === settings.slices - 1) {
          slider.append($('<div class="nivo-slice" name="' + i + '"><img src="' + vars.currentImage.attr('src') + '" style="position:absolute; width:' + slider.width() + 'px; height:auto; display:block !important; top:0; left:-' + (sliceWidth + i * sliceWidth - sliceWidth) + 'px;" /></div>').css({
            left: sliceWidth * i + 'px',
            width: slider.width() - sliceWidth * i + 'px',
            height: sliceHeight + 'px',
            opacity: '0',
            overflow: 'hidden'
          }));
        } else {
          slider.append($('<div class="nivo-slice" name="' + i + '"><img src="' + vars.currentImage.attr('src') + '" style="position:absolute; width:' + slider.width() + 'px; height:auto; display:block !important; top:0; left:-' + (sliceWidth + i * sliceWidth - sliceWidth) + 'px;" /></div>').css({
            left: sliceWidth * i + 'px',
            width: sliceWidth + 'px',
            height: sliceHeight + 'px',
            opacity: '0',
            overflow: 'hidden'
          }));
        }
      }

      $('.nivo-slice', slider).height(sliceHeight);
      sliderImg.stop().animate({
        height: $(vars.currentImage).height()
      }, settings.animSpeed);
    }; // Add boxes for box animations


    var createBoxes = function createBoxes(slider, settings, vars) {
      if ($(vars.currentImage).parent().is('a')) $(vars.currentImage).parent().css('display', 'block');
      $('img[src="' + vars.currentImage.attr('src') + '"]', slider).not('.nivo-main-image,.nivo-control img').width(slider.width()).css('visibility', 'hidden').show();
      var boxWidth = Math.round(slider.width() / settings.boxCols),
          boxHeight = Math.round($('img[src="' + vars.currentImage.attr('src') + '"]', slider).not('.nivo-main-image,.nivo-control img').height() / settings.boxRows);

      for (var rows = 0; rows < settings.boxRows; rows++) {
        for (var cols = 0; cols < settings.boxCols; cols++) {
          if (cols === settings.boxCols - 1) {
            slider.append($('<div class="nivo-box" name="' + cols + '" rel="' + rows + '"><img alt="fight" src="' + vars.currentImage.attr('src') + '" style="position:absolute; width:' + slider.width() + 'px; height:auto; display:block; top:-' + boxHeight * rows + 'px; left:-' + boxWidth * cols + 'px;" /></div>').css({
              opacity: 0,
              left: boxWidth * cols + 'px',
              top: boxHeight * rows + 'px',
              width: slider.width() - boxWidth * cols + 'px'
            }));
            $('.nivo-box[name="' + cols + '"]', slider).height($('.nivo-box[name="' + cols + '"] img', slider).height() + 'px');
          } else {
            slider.append($('<div class="nivo-box" name="' + cols + '" rel="' + rows + '"><img alt="fight2" src="' + vars.currentImage.attr('src') + '" style="position:absolute; width:' + slider.width() + 'px; height:auto; display:block; top:-' + boxHeight * rows + 'px; left:-' + boxWidth * cols + 'px;" /></div>').css({
              opacity: 0,
              left: boxWidth * cols + 'px',
              top: boxHeight * rows + 'px',
              width: boxWidth + 'px'
            }));
            $('.nivo-box[name="' + cols + '"]', slider).height($('.nivo-box[name="' + cols + '"] img', slider).height() + 'px');
          }
        }
      }

      sliderImg.stop().animate({
        height: $(vars.currentImage).height()
      }, settings.animSpeed);
    }; // Private run method


    var nivoRun = function nivoRun(slider, kids, settings, nudge) {
      // Get our vars
      var vars = slider.data('nivo:vars'); // Trigger the lastSlide callback

      if (vars && vars.currentSlide === vars.totalSlides - 1) {
        settings.lastSlide.call(this);
      } // Stop


      if ((!vars || vars.stop) && !nudge) {
        return false;
      } // Trigger the beforeChange callback


      settings.beforeChange.call(this); // Set current background before change

      if (!nudge) {
        sliderImg.attr('src', vars.currentImage.attr('src'));
      } else {
        if (nudge === 'prev') {
          sliderImg.attr('src', vars.currentImage.attr('src'));
        }

        if (nudge === 'next') {
          sliderImg.attr('src', vars.currentImage.attr('src'));
        }
      }

      vars.currentSlide++; // Trigger the slideshowEnd callback

      if (vars.currentSlide === vars.totalSlides) {
        vars.currentSlide = 0;
        settings.slideshowEnd.call(this);
      }

      if (vars.currentSlide < 0) {
        vars.currentSlide = vars.totalSlides - 1;
      } // Set vars.currentImage


      if ($(kids[vars.currentSlide]).is('img')) {
        vars.currentImage = $(kids[vars.currentSlide]);
      } else {
        vars.currentImage = $(kids[vars.currentSlide]).find('img:first');
      } // Set active links


      if (settings.controlNav) {
        $('a', vars.controlNavEl).removeClass('active');
        $('a:eq(' + vars.currentSlide + ')', vars.controlNavEl).addClass('active');
      } // Process caption


      processCaption(settings); // Remove any slices from last transition

      $('.nivo-slice', slider).remove(); // Remove any boxes from last transition

      $('.nivo-box', slider).remove();
      var currentEffect = settings.effect,
          anims = ''; // Generate random effect

      if (settings.effect === 'random') {
        anims = new Array('sliceDownRight', 'sliceDownLeft', 'sliceUpRight', 'sliceUpLeft', 'sliceUpDown', 'sliceUpDownLeft', 'fold', 'fade', 'boxRandom', 'boxRain', 'boxRainReverse', 'boxRainGrow', 'boxRainGrowReverse');
        currentEffect = anims[Math.floor(Math.random() * (anims.length + 1))];

        if (currentEffect === undefined) {
          currentEffect = 'fade';
        }
      } // Run random effect from specified set (eg: effect:'fold,fade')


      if (settings.effect.indexOf(',') !== -1) {
        anims = settings.effect.split(',');
        currentEffect = anims[Math.floor(Math.random() * anims.length)];

        if (currentEffect === undefined) {
          currentEffect = 'fade';
        }
      } // Custom transition as defined by "data-transition" attribute


      if (vars.currentImage.attr('data-transition')) {
        currentEffect = vars.currentImage.attr('data-transition');
      } // Run effects


      vars.running = true;
      var timeBuff = 0,
          i = 0,
          slices = '',
          firstSlice = '',
          totalBoxes = '',
          boxes = '';

      if (currentEffect === 'sliceDown' || currentEffect === 'sliceDownRight' || currentEffect === 'sliceDownLeft') {
        createSlices(slider, settings, vars);
        timeBuff = 0;
        i = 0;
        slices = $('.nivo-slice', slider);

        if (currentEffect === 'sliceDownLeft') {
          slices = $('.nivo-slice', slider)._reverse();
        }

        slices.each(function () {
          var slice = $(this);
          slice.css({
            'top': '0px'
          });

          if (i === settings.slices - 1) {
            setTimeout(function () {
              slice.animate({
                opacity: '1.0'
              }, settings.animSpeed, '', function () {
                slider.trigger('nivo:animFinished');
              });
            }, 100 + timeBuff);
          } else {
            setTimeout(function () {
              slice.animate({
                opacity: '1.0'
              }, settings.animSpeed);
            }, 100 + timeBuff);
          }

          timeBuff += 50;
          i++;
        });
      } else if (currentEffect === 'sliceUp' || currentEffect === 'sliceUpRight' || currentEffect === 'sliceUpLeft') {
        createSlices(slider, settings, vars);
        timeBuff = 0;
        i = 0;
        slices = $('.nivo-slice', slider);

        if (currentEffect === 'sliceUpLeft') {
          slices = $('.nivo-slice', slider)._reverse();
        }

        slices.each(function () {
          var slice = $(this);
          slice.css({
            'bottom': '0px'
          });

          if (i === settings.slices - 1) {
            setTimeout(function () {
              slice.animate({
                opacity: '1.0'
              }, settings.animSpeed, '', function () {
                slider.trigger('nivo:animFinished');
              });
            }, 100 + timeBuff);
          } else {
            setTimeout(function () {
              slice.animate({
                opacity: '1.0'
              }, settings.animSpeed);
            }, 100 + timeBuff);
          }

          timeBuff += 50;
          i++;
        });
      } else if (currentEffect === 'sliceUpDown' || currentEffect === 'sliceUpDownRight' || currentEffect === 'sliceUpDownLeft') {
        createSlices(slider, settings, vars);
        timeBuff = 0;
        i = 0;
        var v = 0;
        slices = $('.nivo-slice', slider);

        if (currentEffect === 'sliceUpDownLeft') {
          slices = $('.nivo-slice', slider)._reverse();
        }

        slices.each(function () {
          var slice = $(this);

          if (i === 0) {
            slice.css('top', '0px');
            i++;
          } else {
            slice.css('bottom', '0px');
            i = 0;
          }

          if (v === settings.slices - 1) {
            setTimeout(function () {
              slice.animate({
                opacity: '1.0'
              }, settings.animSpeed, '', function () {
                slider.trigger('nivo:animFinished');
              });
            }, 100 + timeBuff);
          } else {
            setTimeout(function () {
              slice.animate({
                opacity: '1.0'
              }, settings.animSpeed);
            }, 100 + timeBuff);
          }

          timeBuff += 50;
          v++;
        });
      } else if (currentEffect === 'fold') {
        createSlices(slider, settings, vars);
        timeBuff = 0;
        i = 0;
        $('.nivo-slice', slider).each(function () {
          var slice = $(this);
          var origWidth = slice.width();
          slice.css({
            top: '0px',
            width: '0px'
          });

          if (i === settings.slices - 1) {
            setTimeout(function () {
              slice.animate({
                width: origWidth,
                opacity: '1.0'
              }, settings.animSpeed, '', function () {
                slider.trigger('nivo:animFinished');
              });
            }, 100 + timeBuff);
          } else {
            setTimeout(function () {
              slice.animate({
                width: origWidth,
                opacity: '1.0'
              }, settings.animSpeed);
            }, 100 + timeBuff);
          }

          timeBuff += 50;
          i++;
        });
      } else if (currentEffect === 'fade') {
        createSlices(slider, settings, vars);
        firstSlice = $('.nivo-slice:first', slider);
        firstSlice.css({
          'width': slider.width() + 'px'
        });
        firstSlice.animate({
          opacity: '1.0'
        }, settings.animSpeed * 2, '', function () {
          slider.trigger('nivo:animFinished');
        });
      } else if (currentEffect === 'slideInRight') {
        createSlices(slider, settings, vars);
        firstSlice = $('.nivo-slice:first', slider);
        firstSlice.css({
          'width': '0px',
          'opacity': '1'
        });
        firstSlice.animate({
          width: slider.width() + 'px'
        }, settings.animSpeed * 2, '', function () {
          slider.trigger('nivo:animFinished');
        });
      } else if (currentEffect === 'slideInLeft') {
        createSlices(slider, settings, vars);
        firstSlice = $('.nivo-slice:first', slider);
        firstSlice.css({
          'width': '0px',
          'opacity': '1',
          'left': '',
          'right': '0px'
        });
        firstSlice.animate({
          width: slider.width() + 'px'
        }, settings.animSpeed * 2, '', function () {
          // Reset positioning
          firstSlice.css({
            'left': '0px',
            'right': ''
          });
          slider.trigger('nivo:animFinished');
        });
      } else if (currentEffect === 'boxRandom') {
        createBoxes(slider, settings, vars);
        totalBoxes = settings.boxCols * settings.boxRows;
        i = 0;
        timeBuff = 0;
        boxes = shuffle($('.nivo-box', slider));
        boxes.each(function () {
          var box = $(this);

          if (i === totalBoxes - 1) {
            setTimeout(function () {
              box.animate({
                opacity: '1'
              }, settings.animSpeed, '', function () {
                slider.trigger('nivo:animFinished');
              });
            }, 100 + timeBuff);
          } else {
            setTimeout(function () {
              box.animate({
                opacity: '1'
              }, settings.animSpeed);
            }, 100 + timeBuff);
          }

          timeBuff += 20;
          i++;
        });
      } else if (currentEffect === 'boxRain' || currentEffect === 'boxRainReverse' || currentEffect === 'boxRainGrow' || currentEffect === 'boxRainGrowReverse') {
        createBoxes(slider, settings, vars);
        totalBoxes = settings.boxCols * settings.boxRows;
        i = 0;
        timeBuff = 0; // Split boxes into 2D array

        var rowIndex = 0;
        var colIndex = 0;
        var box2Darr = [];
        box2Darr[rowIndex] = [];
        boxes = $('.nivo-box', slider);

        if (currentEffect === 'boxRainReverse' || currentEffect === 'boxRainGrowReverse') {
          boxes = $('.nivo-box', slider)._reverse();
        }

        boxes.each(function () {
          box2Darr[rowIndex][colIndex] = $(this);
          colIndex++;

          if (colIndex === settings.boxCols) {
            rowIndex++;
            colIndex = 0;
            box2Darr[rowIndex] = [];
          }
        }); // Run animation

        for (var cols = 0; cols < settings.boxCols * 2; cols++) {
          var prevCol = cols;

          for (var rows = 0; rows < settings.boxRows; rows++) {
            if (prevCol >= 0 && prevCol < settings.boxCols) {
              /* Due to some weird JS bug with loop vars 
              being used in setTimeout, this is wrapped
              with an anonymous function call */
              (function (row, col, time, i, totalBoxes) {
                var box = $(box2Darr[row][col]);
                var w = box.width();
                var h = box.height();

                if (currentEffect === 'boxRainGrow' || currentEffect === 'boxRainGrowReverse') {
                  box.width(0).height(0);
                }

                if (i === totalBoxes - 1) {
                  setTimeout(function () {
                    box.animate({
                      opacity: '1',
                      width: w,
                      height: h
                    }, settings.animSpeed / 1.3, '', function () {
                      slider.trigger('nivo:animFinished');
                    });
                  }, 100 + time);
                } else {
                  setTimeout(function () {
                    box.animate({
                      opacity: '1',
                      width: w,
                      height: h
                    }, settings.animSpeed / 1.3);
                  }, 100 + time);
                }
              })(rows, prevCol, timeBuff, i, totalBoxes);

              i++;
            }

            prevCol--;
          }

          timeBuff += 100;
        }
      }
    }; // Shuffle an array


    var shuffle = function shuffle(arr) {
      for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i, 10), x = arr[--i], arr[i] = arr[j], arr[j] = x) {
        ;
      }

      return arr;
    }; // For debugging


    var trace = function trace(msg) {
      if (this.console && typeof console.log !== 'undefined') {
        console.log(msg);
      }
    }; // Start / Stop


    this.stop = function () {
      if (!$(element).data('nivo:vars').stop) {
        $(element).data('nivo:vars').stop = true;
        trace('Stop Slider');
      }
    };

    this.start = function () {
      if ($(element).data('nivo:vars').stop) {
        $(element).data('nivo:vars').stop = false;
        trace('Start Slider');
      }
    }; // Trigger the afterLoad callback


    settings.afterLoad.call(this);
    return this;
  };

  $.fn.nivoSlider = function (options) {
    return this.each(function (key, value) {
      var element = $(this); // Return early if this element already has a plugin instance

      if (element.data('nivoslider')) {
        return element.data('nivoslider');
      } // Pass options to plugin constructor


      var nivoslider = new NivoSlider(this, options); // Store plugin object in this element's data

      element.data('nivoslider', nivoslider);
    });
  }; //Default settings


  $.fn.nivoSlider.defaults = {
    effect: 'random',
    slices: 15,
    boxCols: 8,
    boxRows: 4,
    animSpeed: 500,
    pauseTime: 3000,
    startSlide: 0,
    directionNav: true,
    controlNav: true,
    controlNavThumbs: false,
    pauseOnHover: true,
    manualAdvance: false,
    prevText: '',
    nextText: '',
    randomStart: false,
    beforeChange: function beforeChange() {},
    afterChange: function afterChange() {},
    slideshowEnd: function slideshowEnd() {},
    lastSlide: function lastSlide() {},
    afterLoad: function afterLoad() {}
  };
  $.fn._reverse = [].reverse;
})(jQuery);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzX2pxdWVyeV9uaXZvX3NsaWRlcl9qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsQ0FBQyxVQUFVQSxDQUFWLEVBQWE7QUFDVixNQUFJQyxVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFVQyxPQUFWLEVBQW1CQyxPQUFuQixFQUE0QjtBQUN6QztBQUNBLFFBQUlDLFFBQVEsR0FBR0osQ0FBQyxDQUFDSyxNQUFGLENBQVMsRUFBVCxFQUFhTCxDQUFDLENBQUNNLEVBQUYsQ0FBS0MsVUFBTCxDQUFnQkMsUUFBN0IsRUFBdUNMLE9BQXZDLENBQWYsQ0FGeUMsQ0FJekM7O0FBQ0EsUUFBSU0sSUFBSSxHQUFHO0FBQ1BDLE1BQUFBLFlBQVksRUFBRSxDQURQO0FBRVBDLE1BQUFBLFlBQVksRUFBRSxFQUZQO0FBR1BDLE1BQUFBLFdBQVcsRUFBRSxDQUhOO0FBSVBDLE1BQUFBLE9BQU8sRUFBRSxLQUpGO0FBS1BDLE1BQUFBLE1BQU0sRUFBRSxLQUxEO0FBTVBDLE1BQUFBLElBQUksRUFBRSxLQU5DO0FBT1BDLE1BQUFBLFlBQVksRUFBRTtBQVBQLEtBQVgsQ0FMeUMsQ0FlekM7O0FBQ0EsUUFBSUMsTUFBTSxHQUFHakIsQ0FBQyxDQUFDRSxPQUFELENBQWQ7QUFDQWUsSUFBQUEsTUFBTSxDQUFDQyxJQUFQLENBQVksV0FBWixFQUF5QlQsSUFBekIsRUFBK0JVLFFBQS9CLENBQXdDLFlBQXhDLEVBakJ5QyxDQW1CekM7O0FBQ0EsUUFBSUMsSUFBSSxHQUFHSCxNQUFNLENBQUNJLFFBQVAsRUFBWDtBQUNBRCxJQUFBQSxJQUFJLENBQUNFLElBQUwsQ0FBVSxZQUFZO0FBQ2xCLFVBQUlDLEtBQUssR0FBR3ZCLENBQUMsQ0FBQyxJQUFELENBQWI7QUFDQSxVQUFJd0IsSUFBSSxHQUFHLEVBQVg7O0FBQ0EsVUFBSSxDQUFDRCxLQUFLLENBQUNFLEVBQU4sQ0FBUyxLQUFULENBQUwsRUFBc0I7QUFDbEIsWUFBSUYsS0FBSyxDQUFDRSxFQUFOLENBQVMsR0FBVCxDQUFKLEVBQW1CO0FBQ2ZGLFVBQUFBLEtBQUssQ0FBQ0osUUFBTixDQUFlLGdCQUFmO0FBQ0FLLFVBQUFBLElBQUksR0FBR0QsS0FBUDtBQUNIOztBQUNEQSxRQUFBQSxLQUFLLEdBQUdBLEtBQUssQ0FBQ0csSUFBTixDQUFXLFdBQVgsQ0FBUjtBQUNILE9BVGlCLENBVWxCOzs7QUFDQSxVQUFJQyxVQUFVLEdBQUlBLFVBQVUsS0FBSyxDQUFoQixHQUFxQkosS0FBSyxDQUFDSyxJQUFOLENBQVcsT0FBWCxDQUFyQixHQUEyQ0wsS0FBSyxDQUFDTSxLQUFOLEVBQTVEO0FBQUEsVUFDSUMsV0FBVyxHQUFJQSxXQUFXLEtBQUssQ0FBakIsR0FBc0JQLEtBQUssQ0FBQ0ssSUFBTixDQUFXLFFBQVgsQ0FBdEIsR0FBNkNMLEtBQUssQ0FBQ1EsTUFBTixFQUQvRDs7QUFHQSxVQUFJUCxJQUFJLEtBQUssRUFBYixFQUFpQjtBQUNiQSxRQUFBQSxJQUFJLENBQUNRLEdBQUwsQ0FBUyxTQUFULEVBQW9CLE1BQXBCO0FBQ0g7O0FBQ0RULE1BQUFBLEtBQUssQ0FBQ1MsR0FBTixDQUFVLFNBQVYsRUFBcUIsTUFBckI7QUFDQXZCLE1BQUFBLElBQUksQ0FBQ0csV0FBTDtBQUNILEtBbkJELEVBckJ5QyxDQTBDekM7O0FBQ0EsUUFBSVIsUUFBUSxDQUFDNkIsV0FBYixFQUEwQjtBQUN0QjdCLE1BQUFBLFFBQVEsQ0FBQzhCLFVBQVQsR0FBc0JDLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsS0FBZ0I1QixJQUFJLENBQUNHLFdBQWhDLENBQXRCO0FBQ0gsS0E3Q3dDLENBK0N6Qzs7O0FBQ0EsUUFBSVIsUUFBUSxDQUFDOEIsVUFBVCxHQUFzQixDQUExQixFQUE2QjtBQUN6QixVQUFJOUIsUUFBUSxDQUFDOEIsVUFBVCxJQUF1QnpCLElBQUksQ0FBQ0csV0FBaEMsRUFBNkM7QUFDekNSLFFBQUFBLFFBQVEsQ0FBQzhCLFVBQVQsR0FBc0J6QixJQUFJLENBQUNHLFdBQUwsR0FBbUIsQ0FBekM7QUFDSDs7QUFDREgsTUFBQUEsSUFBSSxDQUFDQyxZQUFMLEdBQW9CTixRQUFRLENBQUM4QixVQUE3QjtBQUNILEtBckR3QyxDQXVEekM7OztBQUNBLFFBQUlsQyxDQUFDLENBQUNvQixJQUFJLENBQUNYLElBQUksQ0FBQ0MsWUFBTixDQUFMLENBQUQsQ0FBMkJlLEVBQTNCLENBQThCLEtBQTlCLENBQUosRUFBMEM7QUFDdENoQixNQUFBQSxJQUFJLENBQUNFLFlBQUwsR0FBb0JYLENBQUMsQ0FBQ29CLElBQUksQ0FBQ1gsSUFBSSxDQUFDQyxZQUFOLENBQUwsQ0FBckI7QUFDSCxLQUZELE1BRU87QUFDSEQsTUFBQUEsSUFBSSxDQUFDRSxZQUFMLEdBQW9CWCxDQUFDLENBQUNvQixJQUFJLENBQUNYLElBQUksQ0FBQ0MsWUFBTixDQUFMLENBQUQsQ0FBMkJnQixJQUEzQixDQUFnQyxXQUFoQyxDQUFwQjtBQUNILEtBNUR3QyxDQThEekM7OztBQUNBLFFBQUkxQixDQUFDLENBQUNvQixJQUFJLENBQUNYLElBQUksQ0FBQ0MsWUFBTixDQUFMLENBQUQsQ0FBMkJlLEVBQTNCLENBQThCLEdBQTlCLENBQUosRUFBd0M7QUFDcEN6QixNQUFBQSxDQUFDLENBQUNvQixJQUFJLENBQUNYLElBQUksQ0FBQ0MsWUFBTixDQUFMLENBQUQsQ0FBMkJzQixHQUEzQixDQUErQixTQUEvQixFQUEwQyxPQUExQztBQUNILEtBakV3QyxDQW1FekM7OztBQUNBLFFBQUlNLFNBQVMsR0FBR3RDLENBQUMsQ0FBQyw0QkFBRCxDQUFELENBQWdDbUIsUUFBaEMsQ0FBeUMsaUJBQXpDLENBQWhCO0FBQ0FtQixJQUFBQSxTQUFTLENBQUNWLElBQVYsQ0FBZSxLQUFmLEVBQXNCbkIsSUFBSSxDQUFDRSxZQUFMLENBQWtCaUIsSUFBbEIsQ0FBdUIsS0FBdkIsQ0FBdEIsRUFBcURXLElBQXJEO0FBQ0F0QixJQUFBQSxNQUFNLENBQUN1QixNQUFQLENBQWNGLFNBQWQsRUF0RXlDLENBd0V6Qzs7QUFDQXRDLElBQUFBLENBQUMsQ0FBQ3lDLE1BQUQsQ0FBRCxDQUFVQyxNQUFWLENBQWlCLFlBQVk7QUFDekJ6QixNQUFBQSxNQUFNLENBQUNJLFFBQVAsQ0FBZ0IsS0FBaEIsRUFBdUJRLEtBQXZCLENBQTZCWixNQUFNLENBQUNZLEtBQVAsRUFBN0I7QUFDQVMsTUFBQUEsU0FBUyxDQUFDVixJQUFWLENBQWUsS0FBZixFQUFzQm5CLElBQUksQ0FBQ0UsWUFBTCxDQUFrQmlCLElBQWxCLENBQXVCLEtBQXZCLENBQXRCO0FBQ0FVLE1BQUFBLFNBQVMsQ0FBQ3ZCLElBQVYsR0FBaUJnQixNQUFqQixDQUF3QixNQUF4QjtBQUNBL0IsTUFBQUEsQ0FBQyxDQUFDLGFBQUQsQ0FBRCxDQUFpQjJDLE1BQWpCO0FBQ0EzQyxNQUFBQSxDQUFDLENBQUMsV0FBRCxDQUFELENBQWUyQyxNQUFmO0FBQ0gsS0FORCxFQXpFeUMsQ0FpRnpDOztBQUNBMUIsSUFBQUEsTUFBTSxDQUFDdUIsTUFBUCxDQUFjeEMsQ0FBQyxDQUFDLGtDQUFELENBQWYsRUFsRnlDLENBb0Z6Qzs7QUFDQSxRQUFJNEMsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFVeEMsUUFBVixFQUFvQjtBQUNyQyxVQUFJeUMsV0FBVyxHQUFHN0MsQ0FBQyxDQUFDLGVBQUQsRUFBa0JpQixNQUFsQixDQUFuQjs7QUFDQSxVQUFJUixJQUFJLENBQUNFLFlBQUwsQ0FBa0JpQixJQUFsQixDQUF1QixPQUF2QixLQUFtQyxFQUFuQyxJQUF5Q25CLElBQUksQ0FBQ0UsWUFBTCxDQUFrQmlCLElBQWxCLENBQXVCLE9BQXZCLEtBQW1Da0IsU0FBaEYsRUFBMkY7QUFDdkYsWUFBSUMsS0FBSyxHQUFHdEMsSUFBSSxDQUFDRSxZQUFMLENBQWtCaUIsSUFBbEIsQ0FBdUIsT0FBdkIsQ0FBWjtBQUNBLFlBQUltQixLQUFLLENBQUNDLE1BQU4sQ0FBYSxDQUFiLEVBQWdCLENBQWhCLEtBQXNCLEdBQTFCLEVBQStCRCxLQUFLLEdBQUcvQyxDQUFDLENBQUMrQyxLQUFELENBQUQsQ0FBU0UsSUFBVCxFQUFSOztBQUUvQixZQUFJSixXQUFXLENBQUNiLEdBQVosQ0FBZ0IsU0FBaEIsS0FBOEIsT0FBbEMsRUFBMkM7QUFDdkNrQixVQUFBQSxVQUFVLENBQUMsWUFBWTtBQUNuQkwsWUFBQUEsV0FBVyxDQUFDSSxJQUFaLENBQWlCRixLQUFqQjtBQUNILFdBRlMsRUFFUDNDLFFBQVEsQ0FBQytDLFNBRkYsQ0FBVjtBQUdILFNBSkQsTUFJTztBQUNITixVQUFBQSxXQUFXLENBQUNJLElBQVosQ0FBaUJGLEtBQWpCO0FBQ0FGLFVBQUFBLFdBQVcsQ0FBQzlCLElBQVosR0FBbUJxQyxNQUFuQixDQUEwQmhELFFBQVEsQ0FBQytDLFNBQW5DO0FBQ0g7QUFDSixPQVpELE1BWU87QUFDSE4sUUFBQUEsV0FBVyxDQUFDOUIsSUFBWixHQUFtQnNDLE9BQW5CLENBQTJCakQsUUFBUSxDQUFDK0MsU0FBcEM7QUFDSDtBQUNKLEtBakJELENBckZ5QyxDQXdHekM7OztBQUNBUCxJQUFBQSxjQUFjLENBQUN4QyxRQUFELENBQWQsQ0F6R3lDLENBMkd6Qzs7QUFDQSxRQUFJa0QsS0FBSyxHQUFHLENBQVo7O0FBQ0EsUUFBSSxDQUFDbEQsUUFBUSxDQUFDbUQsYUFBVixJQUEyQm5DLElBQUksQ0FBQ29DLE1BQUwsR0FBYyxDQUE3QyxFQUFnRDtBQUM1Q0YsTUFBQUEsS0FBSyxHQUFHRyxXQUFXLENBQUMsWUFBWTtBQUM1QkMsUUFBQUEsT0FBTyxDQUFDekMsTUFBRCxFQUFTRyxJQUFULEVBQWVoQixRQUFmLEVBQXlCLEtBQXpCLENBQVA7QUFDSCxPQUZrQixFQUVoQkEsUUFBUSxDQUFDdUQsU0FGTyxDQUFuQjtBQUdILEtBakh3QyxDQW1IekM7OztBQUNBLFFBQUl2RCxRQUFRLENBQUN3RCxZQUFiLEVBQTJCO0FBQ3ZCM0MsTUFBQUEsTUFBTSxDQUFDdUIsTUFBUCxDQUFjLDREQUE0RHBDLFFBQVEsQ0FBQ3lELFFBQXJFLEdBQWdGLDhCQUFoRixHQUFpSHpELFFBQVEsQ0FBQzBELFFBQTFILEdBQXFJLFlBQW5KO0FBRUE5RCxNQUFBQSxDQUFDLENBQUNpQixNQUFELENBQUQsQ0FBVThDLEVBQVYsQ0FBYSxPQUFiLEVBQXNCLGdCQUF0QixFQUF3QyxZQUFZO0FBQ2hELFlBQUl0RCxJQUFJLENBQUNJLE9BQVQsRUFBa0I7QUFDZCxpQkFBTyxLQUFQO0FBQ0g7O0FBQ0RtRCxRQUFBQSxhQUFhLENBQUNWLEtBQUQsQ0FBYjtBQUNBQSxRQUFBQSxLQUFLLEdBQUcsRUFBUjtBQUNBN0MsUUFBQUEsSUFBSSxDQUFDQyxZQUFMLElBQXFCLENBQXJCO0FBQ0FnRCxRQUFBQSxPQUFPLENBQUN6QyxNQUFELEVBQVNHLElBQVQsRUFBZWhCLFFBQWYsRUFBeUIsTUFBekIsQ0FBUDtBQUNILE9BUkQ7QUFVQUosTUFBQUEsQ0FBQyxDQUFDaUIsTUFBRCxDQUFELENBQVU4QyxFQUFWLENBQWEsT0FBYixFQUFzQixnQkFBdEIsRUFBd0MsWUFBWTtBQUNoRCxZQUFJdEQsSUFBSSxDQUFDSSxPQUFULEVBQWtCO0FBQ2QsaUJBQU8sS0FBUDtBQUNIOztBQUNEbUQsUUFBQUEsYUFBYSxDQUFDVixLQUFELENBQWI7QUFDQUEsUUFBQUEsS0FBSyxHQUFHLEVBQVI7QUFDQUksUUFBQUEsT0FBTyxDQUFDekMsTUFBRCxFQUFTRyxJQUFULEVBQWVoQixRQUFmLEVBQXlCLE1BQXpCLENBQVA7QUFDSCxPQVBEO0FBUUgsS0F6SXdDLENBMkl6Qzs7O0FBQ0EsUUFBSUEsUUFBUSxDQUFDNkQsVUFBYixFQUF5QjtBQUNyQnhELE1BQUFBLElBQUksQ0FBQ08sWUFBTCxHQUFvQmhCLENBQUMsQ0FBQyxxQ0FBRCxDQUFyQjtBQUNBaUIsTUFBQUEsTUFBTSxDQUFDaUQsS0FBUCxDQUFhekQsSUFBSSxDQUFDTyxZQUFsQjs7QUFDQSxXQUFLLElBQUltRCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHL0MsSUFBSSxDQUFDb0MsTUFBekIsRUFBaUNXLENBQUMsRUFBbEMsRUFBc0M7QUFDbEMsWUFBSS9ELFFBQVEsQ0FBQ2dFLGdCQUFiLEVBQStCO0FBQzNCM0QsVUFBQUEsSUFBSSxDQUFDTyxZQUFMLENBQWtCRyxRQUFsQixDQUEyQixxQkFBM0I7QUFDQSxjQUFJSSxLQUFLLEdBQUdILElBQUksQ0FBQ2lELEVBQUwsQ0FBUUYsQ0FBUixDQUFaOztBQUNBLGNBQUksQ0FBQzVDLEtBQUssQ0FBQ0UsRUFBTixDQUFTLEtBQVQsQ0FBTCxFQUFzQjtBQUNsQkYsWUFBQUEsS0FBSyxHQUFHQSxLQUFLLENBQUNHLElBQU4sQ0FBVyxXQUFYLENBQVI7QUFDSDs7QUFDRCxjQUFJSCxLQUFLLENBQUNLLElBQU4sQ0FBVyxZQUFYLENBQUosRUFBOEJuQixJQUFJLENBQUNPLFlBQUwsQ0FBa0J3QixNQUFsQixDQUF5QiwyQ0FBMkMyQixDQUEzQyxHQUErQyxjQUEvQyxHQUFnRTVDLEtBQUssQ0FBQ0ssSUFBTixDQUFXLFlBQVgsQ0FBaEUsR0FBMkYsaUJBQXBIO0FBQ2pDLFNBUEQsTUFPTztBQUNIbkIsVUFBQUEsSUFBSSxDQUFDTyxZQUFMLENBQWtCd0IsTUFBbEIsQ0FBeUIsMkNBQTJDMkIsQ0FBM0MsR0FBK0MsSUFBL0MsSUFBdURBLENBQUMsR0FBRyxDQUEzRCxJQUFnRSxNQUF6RjtBQUNIO0FBQ0osT0Fkb0IsQ0FnQnJCOzs7QUFDQW5FLE1BQUFBLENBQUMsQ0FBQyxVQUFVUyxJQUFJLENBQUNDLFlBQWYsR0FBOEIsR0FBL0IsRUFBb0NELElBQUksQ0FBQ08sWUFBekMsQ0FBRCxDQUF3REcsUUFBeEQsQ0FBaUUsUUFBakU7QUFFQW5CLE1BQUFBLENBQUMsQ0FBQyxHQUFELEVBQU1TLElBQUksQ0FBQ08sWUFBWCxDQUFELENBQTBCc0QsSUFBMUIsQ0FBK0IsT0FBL0IsRUFBd0MsWUFBWTtBQUNoRCxZQUFJN0QsSUFBSSxDQUFDSSxPQUFULEVBQWtCLE9BQU8sS0FBUDtBQUNsQixZQUFJYixDQUFDLENBQUMsSUFBRCxDQUFELENBQVF1RSxRQUFSLENBQWlCLFFBQWpCLENBQUosRUFBZ0MsT0FBTyxLQUFQO0FBQ2hDUCxRQUFBQSxhQUFhLENBQUNWLEtBQUQsQ0FBYjtBQUNBQSxRQUFBQSxLQUFLLEdBQUcsRUFBUjtBQUNBaEIsUUFBQUEsU0FBUyxDQUFDVixJQUFWLENBQWUsS0FBZixFQUFzQm5CLElBQUksQ0FBQ0UsWUFBTCxDQUFrQmlCLElBQWxCLENBQXVCLEtBQXZCLENBQXRCO0FBQ0FuQixRQUFBQSxJQUFJLENBQUNDLFlBQUwsR0FBb0JWLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUTRCLElBQVIsQ0FBYSxLQUFiLElBQXNCLENBQTFDO0FBQ0E4QixRQUFBQSxPQUFPLENBQUN6QyxNQUFELEVBQVNHLElBQVQsRUFBZWhCLFFBQWYsRUFBeUIsU0FBekIsQ0FBUDtBQUNILE9BUkQ7QUFTSCxLQXhLd0MsQ0EwS3pDOzs7QUFDQSxRQUFJQSxRQUFRLENBQUNvRSxZQUFiLEVBQTJCO0FBQ3ZCdkQsTUFBQUEsTUFBTSxDQUFDd0QsS0FBUCxDQUFhLFlBQVk7QUFDckJoRSxRQUFBQSxJQUFJLENBQUNLLE1BQUwsR0FBYyxJQUFkO0FBQ0FrRCxRQUFBQSxhQUFhLENBQUNWLEtBQUQsQ0FBYjtBQUNBQSxRQUFBQSxLQUFLLEdBQUcsRUFBUjtBQUNILE9BSkQsRUFJRyxZQUFZO0FBQ1g3QyxRQUFBQSxJQUFJLENBQUNLLE1BQUwsR0FBYyxLQUFkLENBRFcsQ0FFWDs7QUFDQSxZQUFJd0MsS0FBSyxLQUFLLEVBQVYsSUFBZ0IsQ0FBQ2xELFFBQVEsQ0FBQ21ELGFBQTlCLEVBQTZDO0FBQ3pDRCxVQUFBQSxLQUFLLEdBQUdHLFdBQVcsQ0FBQyxZQUFZO0FBQzVCQyxZQUFBQSxPQUFPLENBQUN6QyxNQUFELEVBQVNHLElBQVQsRUFBZWhCLFFBQWYsRUFBeUIsS0FBekIsQ0FBUDtBQUNILFdBRmtCLEVBRWhCQSxRQUFRLENBQUN1RCxTQUZPLENBQW5CO0FBR0g7QUFDSixPQVpEO0FBYUgsS0F6THdDLENBMkx6Qzs7O0FBQ0ExQyxJQUFBQSxNQUFNLENBQUNxRCxJQUFQLENBQVksbUJBQVosRUFBaUMsWUFBWTtBQUN6Q2hDLE1BQUFBLFNBQVMsQ0FBQ1YsSUFBVixDQUFlLEtBQWYsRUFBc0JuQixJQUFJLENBQUNFLFlBQUwsQ0FBa0JpQixJQUFsQixDQUF1QixLQUF2QixDQUF0QjtBQUNBbkIsTUFBQUEsSUFBSSxDQUFDSSxPQUFMLEdBQWUsS0FBZixDQUZ5QyxDQUd6Qzs7QUFDQWIsTUFBQUEsQ0FBQyxDQUFDb0IsSUFBRCxDQUFELENBQVFFLElBQVIsQ0FBYSxZQUFZO0FBQ3JCLFlBQUl0QixDQUFDLENBQUMsSUFBRCxDQUFELENBQVF5QixFQUFSLENBQVcsR0FBWCxDQUFKLEVBQXFCO0FBQ2pCekIsVUFBQUEsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRZ0MsR0FBUixDQUFZLFNBQVosRUFBdUIsTUFBdkI7QUFDSDtBQUNKLE9BSkQsRUFKeUMsQ0FTekM7O0FBQ0EsVUFBSWhDLENBQUMsQ0FBQ29CLElBQUksQ0FBQ1gsSUFBSSxDQUFDQyxZQUFOLENBQUwsQ0FBRCxDQUEyQmUsRUFBM0IsQ0FBOEIsR0FBOUIsQ0FBSixFQUF3QztBQUNwQ3pCLFFBQUFBLENBQUMsQ0FBQ29CLElBQUksQ0FBQ1gsSUFBSSxDQUFDQyxZQUFOLENBQUwsQ0FBRCxDQUEyQnNCLEdBQTNCLENBQStCLFNBQS9CLEVBQTBDLE9BQTFDO0FBQ0gsT0Fad0MsQ0FhekM7OztBQUNBLFVBQUlzQixLQUFLLEtBQUssRUFBVixJQUFnQixDQUFDN0MsSUFBSSxDQUFDSyxNQUF0QixJQUFnQyxDQUFDVixRQUFRLENBQUNtRCxhQUE5QyxFQUE2RDtBQUN6REQsUUFBQUEsS0FBSyxHQUFHRyxXQUFXLENBQUMsWUFBWTtBQUM1QkMsVUFBQUEsT0FBTyxDQUFDekMsTUFBRCxFQUFTRyxJQUFULEVBQWVoQixRQUFmLEVBQXlCLEtBQXpCLENBQVA7QUFDSCxTQUZrQixFQUVoQkEsUUFBUSxDQUFDdUQsU0FGTyxDQUFuQjtBQUdILE9BbEJ3QyxDQW1CekM7OztBQUNBdkQsTUFBQUEsUUFBUSxDQUFDc0UsV0FBVCxDQUFxQkMsSUFBckIsQ0FBMEIsSUFBMUI7QUFDSCxLQXJCRCxFQTVMeUMsQ0FtTnpDOztBQUNBLFFBQUlDLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQVUzRCxNQUFWLEVBQWtCYixRQUFsQixFQUE0QkssSUFBNUIsRUFBa0M7QUFDakQsVUFBSVQsQ0FBQyxDQUFDUyxJQUFJLENBQUNFLFlBQU4sQ0FBRCxDQUFxQmtFLE1BQXJCLEdBQThCcEQsRUFBOUIsQ0FBaUMsR0FBakMsQ0FBSixFQUEyQ3pCLENBQUMsQ0FBQ1MsSUFBSSxDQUFDRSxZQUFOLENBQUQsQ0FBcUJrRSxNQUFyQixHQUE4QjdDLEdBQTlCLENBQWtDLFNBQWxDLEVBQTZDLE9BQTdDO0FBQzNDaEMsTUFBQUEsQ0FBQyxDQUFDLGNBQWNTLElBQUksQ0FBQ0UsWUFBTCxDQUFrQmlCLElBQWxCLENBQXVCLEtBQXZCLENBQWQsR0FBOEMsSUFBL0MsRUFBcURYLE1BQXJELENBQUQsQ0FBOEQ2RCxHQUE5RCxDQUFrRSxvQ0FBbEUsRUFBd0dqRCxLQUF4RyxDQUE4R1osTUFBTSxDQUFDWSxLQUFQLEVBQTlHLEVBQThIRyxHQUE5SCxDQUFrSSxZQUFsSSxFQUFnSixRQUFoSixFQUEwSk8sSUFBMUo7QUFDQSxVQUFJd0MsV0FBVyxHQUFJL0UsQ0FBQyxDQUFDLGNBQWNTLElBQUksQ0FBQ0UsWUFBTCxDQUFrQmlCLElBQWxCLENBQXVCLEtBQXZCLENBQWQsR0FBOEMsSUFBL0MsRUFBcURYLE1BQXJELENBQUQsQ0FBOEQ2RCxHQUE5RCxDQUFrRSxvQ0FBbEUsRUFBd0dELE1BQXhHLEdBQWlIcEQsRUFBakgsQ0FBb0gsR0FBcEgsQ0FBRCxHQUE2SHpCLENBQUMsQ0FBQyxjQUFjUyxJQUFJLENBQUNFLFlBQUwsQ0FBa0JpQixJQUFsQixDQUF1QixLQUF2QixDQUFkLEdBQThDLElBQS9DLEVBQXFEWCxNQUFyRCxDQUFELENBQThENkQsR0FBOUQsQ0FBa0Usb0NBQWxFLEVBQXdHRCxNQUF4RyxHQUFpSDlDLE1BQWpILEVBQTdILEdBQXlQL0IsQ0FBQyxDQUFDLGNBQWNTLElBQUksQ0FBQ0UsWUFBTCxDQUFrQmlCLElBQWxCLENBQXVCLEtBQXZCLENBQWQsR0FBOEMsSUFBL0MsRUFBcURYLE1BQXJELENBQUQsQ0FBOEQ2RCxHQUE5RCxDQUFrRSxvQ0FBbEUsRUFBd0cvQyxNQUF4RyxFQUEzUTs7QUFFQSxXQUFLLElBQUlvQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHL0QsUUFBUSxDQUFDNEUsTUFBN0IsRUFBcUNiLENBQUMsRUFBdEMsRUFBMEM7QUFDdEMsWUFBSWMsVUFBVSxHQUFHOUMsSUFBSSxDQUFDK0MsS0FBTCxDQUFXakUsTUFBTSxDQUFDWSxLQUFQLEtBQWlCekIsUUFBUSxDQUFDNEUsTUFBckMsQ0FBakI7O0FBRUEsWUFBSWIsQ0FBQyxLQUFLL0QsUUFBUSxDQUFDNEUsTUFBVCxHQUFrQixDQUE1QixFQUErQjtBQUMzQi9ELFVBQUFBLE1BQU0sQ0FBQ3VCLE1BQVAsQ0FDSXhDLENBQUMsQ0FBQyxtQ0FBbUNtRSxDQUFuQyxHQUF1QyxjQUF2QyxHQUF3RDFELElBQUksQ0FBQ0UsWUFBTCxDQUFrQmlCLElBQWxCLENBQXVCLEtBQXZCLENBQXhELEdBQXdGLG9DQUF4RixHQUErSFgsTUFBTSxDQUFDWSxLQUFQLEVBQS9ILEdBQWdKLDBEQUFoSixJQUErTW9ELFVBQVUsR0FBSWQsQ0FBQyxHQUFHYyxVQUFuQixHQUFrQ0EsVUFBaFAsSUFBOFAsZUFBL1AsQ0FBRCxDQUFpUmpELEdBQWpSLENBQXFSO0FBQ2pSbUQsWUFBQUEsSUFBSSxFQUFHRixVQUFVLEdBQUdkLENBQWQsR0FBbUIsSUFEd1A7QUFFalJ0QyxZQUFBQSxLQUFLLEVBQUdaLE1BQU0sQ0FBQ1ksS0FBUCxLQUFrQm9ELFVBQVUsR0FBR2QsQ0FBaEMsR0FBc0MsSUFGb087QUFHalJwQyxZQUFBQSxNQUFNLEVBQUVnRCxXQUFXLEdBQUcsSUFIMlA7QUFJalJLLFlBQUFBLE9BQU8sRUFBRSxHQUp3UTtBQUtqUkMsWUFBQUEsUUFBUSxFQUFFO0FBTHVRLFdBQXJSLENBREo7QUFTSCxTQVZELE1BVU87QUFDSHBFLFVBQUFBLE1BQU0sQ0FBQ3VCLE1BQVAsQ0FDSXhDLENBQUMsQ0FBQyxtQ0FBbUNtRSxDQUFuQyxHQUF1QyxjQUF2QyxHQUF3RDFELElBQUksQ0FBQ0UsWUFBTCxDQUFrQmlCLElBQWxCLENBQXVCLEtBQXZCLENBQXhELEdBQXdGLG9DQUF4RixHQUErSFgsTUFBTSxDQUFDWSxLQUFQLEVBQS9ILEdBQWdKLDBEQUFoSixJQUErTW9ELFVBQVUsR0FBSWQsQ0FBQyxHQUFHYyxVQUFuQixHQUFrQ0EsVUFBaFAsSUFBOFAsZUFBL1AsQ0FBRCxDQUFpUmpELEdBQWpSLENBQXFSO0FBQ2pSbUQsWUFBQUEsSUFBSSxFQUFHRixVQUFVLEdBQUdkLENBQWQsR0FBbUIsSUFEd1A7QUFFalJ0QyxZQUFBQSxLQUFLLEVBQUVvRCxVQUFVLEdBQUcsSUFGNlA7QUFHalJsRCxZQUFBQSxNQUFNLEVBQUVnRCxXQUFXLEdBQUcsSUFIMlA7QUFJalJLLFlBQUFBLE9BQU8sRUFBRSxHQUp3UTtBQUtqUkMsWUFBQUEsUUFBUSxFQUFFO0FBTHVRLFdBQXJSLENBREo7QUFTSDtBQUNKOztBQUVEckYsTUFBQUEsQ0FBQyxDQUFDLGFBQUQsRUFBZ0JpQixNQUFoQixDQUFELENBQXlCYyxNQUF6QixDQUFnQ2dELFdBQWhDO0FBQ0F6QyxNQUFBQSxTQUFTLENBQUN2QixJQUFWLEdBQWlCdUUsT0FBakIsQ0FBeUI7QUFDckJ2RCxRQUFBQSxNQUFNLEVBQUUvQixDQUFDLENBQUNTLElBQUksQ0FBQ0UsWUFBTixDQUFELENBQXFCb0IsTUFBckI7QUFEYSxPQUF6QixFQUVHM0IsUUFBUSxDQUFDK0MsU0FGWjtBQUdILEtBbkNELENBcE55QyxDQXlQekM7OztBQUNBLFFBQUlvQyxXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFVdEUsTUFBVixFQUFrQmIsUUFBbEIsRUFBNEJLLElBQTVCLEVBQWtDO0FBQ2hELFVBQUlULENBQUMsQ0FBQ1MsSUFBSSxDQUFDRSxZQUFOLENBQUQsQ0FBcUJrRSxNQUFyQixHQUE4QnBELEVBQTlCLENBQWlDLEdBQWpDLENBQUosRUFBMkN6QixDQUFDLENBQUNTLElBQUksQ0FBQ0UsWUFBTixDQUFELENBQXFCa0UsTUFBckIsR0FBOEI3QyxHQUE5QixDQUFrQyxTQUFsQyxFQUE2QyxPQUE3QztBQUMzQ2hDLE1BQUFBLENBQUMsQ0FBQyxjQUFjUyxJQUFJLENBQUNFLFlBQUwsQ0FBa0JpQixJQUFsQixDQUF1QixLQUF2QixDQUFkLEdBQThDLElBQS9DLEVBQXFEWCxNQUFyRCxDQUFELENBQThENkQsR0FBOUQsQ0FBa0Usb0NBQWxFLEVBQXdHakQsS0FBeEcsQ0FBOEdaLE1BQU0sQ0FBQ1ksS0FBUCxFQUE5RyxFQUE4SEcsR0FBOUgsQ0FBa0ksWUFBbEksRUFBZ0osUUFBaEosRUFBMEpPLElBQTFKO0FBQ0EsVUFBSWlELFFBQVEsR0FBR3JELElBQUksQ0FBQytDLEtBQUwsQ0FBV2pFLE1BQU0sQ0FBQ1ksS0FBUCxLQUFpQnpCLFFBQVEsQ0FBQ3FGLE9BQXJDLENBQWY7QUFBQSxVQUNJQyxTQUFTLEdBQUd2RCxJQUFJLENBQUMrQyxLQUFMLENBQVdsRixDQUFDLENBQUMsY0FBY1MsSUFBSSxDQUFDRSxZQUFMLENBQWtCaUIsSUFBbEIsQ0FBdUIsS0FBdkIsQ0FBZCxHQUE4QyxJQUEvQyxFQUFxRFgsTUFBckQsQ0FBRCxDQUE4RDZELEdBQTlELENBQWtFLG9DQUFsRSxFQUF3Ry9DLE1BQXhHLEtBQW1IM0IsUUFBUSxDQUFDdUYsT0FBdkksQ0FEaEI7O0FBSUEsV0FBSyxJQUFJQyxJQUFJLEdBQUcsQ0FBaEIsRUFBbUJBLElBQUksR0FBR3hGLFFBQVEsQ0FBQ3VGLE9BQW5DLEVBQTRDQyxJQUFJLEVBQWhELEVBQW9EO0FBQ2hELGFBQUssSUFBSUMsSUFBSSxHQUFHLENBQWhCLEVBQW1CQSxJQUFJLEdBQUd6RixRQUFRLENBQUNxRixPQUFuQyxFQUE0Q0ksSUFBSSxFQUFoRCxFQUFvRDtBQUNoRCxjQUFJQSxJQUFJLEtBQUt6RixRQUFRLENBQUNxRixPQUFULEdBQW1CLENBQWhDLEVBQW1DO0FBQy9CeEUsWUFBQUEsTUFBTSxDQUFDdUIsTUFBUCxDQUNJeEMsQ0FBQyxDQUFDLGlDQUFpQzZGLElBQWpDLEdBQXdDLFNBQXhDLEdBQW9ERCxJQUFwRCxHQUEyRCwwQkFBM0QsR0FBd0ZuRixJQUFJLENBQUNFLFlBQUwsQ0FBa0JpQixJQUFsQixDQUF1QixLQUF2QixDQUF4RixHQUF3SCxvQ0FBeEgsR0FBK0pYLE1BQU0sQ0FBQ1ksS0FBUCxFQUEvSixHQUFnTCx1Q0FBaEwsR0FBMk42RCxTQUFTLEdBQUdFLElBQXZPLEdBQStPLFlBQS9PLEdBQStQSixRQUFRLEdBQUdLLElBQTFRLEdBQWtSLGVBQW5SLENBQUQsQ0FBcVM3RCxHQUFyUyxDQUF5UztBQUNyU29ELGNBQUFBLE9BQU8sRUFBRSxDQUQ0UjtBQUVyU0QsY0FBQUEsSUFBSSxFQUFHSyxRQUFRLEdBQUdLLElBQVosR0FBb0IsSUFGMlE7QUFHclNDLGNBQUFBLEdBQUcsRUFBR0osU0FBUyxHQUFHRSxJQUFiLEdBQXFCLElBSDJRO0FBSXJTL0QsY0FBQUEsS0FBSyxFQUFHWixNQUFNLENBQUNZLEtBQVAsS0FBa0IyRCxRQUFRLEdBQUdLLElBQTlCLEdBQXVDO0FBSnVQLGFBQXpTLENBREo7QUFTQTdGLFlBQUFBLENBQUMsQ0FBQyxxQkFBcUI2RixJQUFyQixHQUE0QixJQUE3QixFQUFtQzVFLE1BQW5DLENBQUQsQ0FBNENjLE1BQTVDLENBQW1EL0IsQ0FBQyxDQUFDLHFCQUFxQjZGLElBQXJCLEdBQTRCLFFBQTdCLEVBQXVDNUUsTUFBdkMsQ0FBRCxDQUFnRGMsTUFBaEQsS0FBMkQsSUFBOUc7QUFDSCxXQVhELE1BV087QUFDSGQsWUFBQUEsTUFBTSxDQUFDdUIsTUFBUCxDQUNJeEMsQ0FBQyxDQUFDLGlDQUFpQzZGLElBQWpDLEdBQXdDLFNBQXhDLEdBQW9ERCxJQUFwRCxHQUEyRCwyQkFBM0QsR0FBeUZuRixJQUFJLENBQUNFLFlBQUwsQ0FBa0JpQixJQUFsQixDQUF1QixLQUF2QixDQUF6RixHQUF5SCxvQ0FBekgsR0FBZ0tYLE1BQU0sQ0FBQ1ksS0FBUCxFQUFoSyxHQUFpTCx1Q0FBakwsR0FBNE42RCxTQUFTLEdBQUdFLElBQXhPLEdBQWdQLFlBQWhQLEdBQWdRSixRQUFRLEdBQUdLLElBQTNRLEdBQW1SLGVBQXBSLENBQUQsQ0FBc1M3RCxHQUF0UyxDQUEwUztBQUN0U29ELGNBQUFBLE9BQU8sRUFBRSxDQUQ2UjtBQUV0U0QsY0FBQUEsSUFBSSxFQUFHSyxRQUFRLEdBQUdLLElBQVosR0FBb0IsSUFGNFE7QUFHdFNDLGNBQUFBLEdBQUcsRUFBR0osU0FBUyxHQUFHRSxJQUFiLEdBQXFCLElBSDRRO0FBSXRTL0QsY0FBQUEsS0FBSyxFQUFFMkQsUUFBUSxHQUFHO0FBSm9SLGFBQTFTLENBREo7QUFRQXhGLFlBQUFBLENBQUMsQ0FBQyxxQkFBcUI2RixJQUFyQixHQUE0QixJQUE3QixFQUFtQzVFLE1BQW5DLENBQUQsQ0FBNENjLE1BQTVDLENBQW1EL0IsQ0FBQyxDQUFDLHFCQUFxQjZGLElBQXJCLEdBQTRCLFFBQTdCLEVBQXVDNUUsTUFBdkMsQ0FBRCxDQUFnRGMsTUFBaEQsS0FBMkQsSUFBOUc7QUFDSDtBQUNKO0FBQ0o7O0FBRURPLE1BQUFBLFNBQVMsQ0FBQ3ZCLElBQVYsR0FBaUJ1RSxPQUFqQixDQUF5QjtBQUNyQnZELFFBQUFBLE1BQU0sRUFBRS9CLENBQUMsQ0FBQ1MsSUFBSSxDQUFDRSxZQUFOLENBQUQsQ0FBcUJvQixNQUFyQjtBQURhLE9BQXpCLEVBRUczQixRQUFRLENBQUMrQyxTQUZaO0FBR0gsS0FyQ0QsQ0ExUHlDLENBaVN6Qzs7O0FBQ0EsUUFBSU8sT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBVXpDLE1BQVYsRUFBa0JHLElBQWxCLEVBQXdCaEIsUUFBeEIsRUFBa0MyRixLQUFsQyxFQUF5QztBQUNuRDtBQUNBLFVBQUl0RixJQUFJLEdBQUdRLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLFdBQVosQ0FBWCxDQUZtRCxDQUluRDs7QUFDQSxVQUFJVCxJQUFJLElBQUtBLElBQUksQ0FBQ0MsWUFBTCxLQUFzQkQsSUFBSSxDQUFDRyxXQUFMLEdBQW1CLENBQXRELEVBQTBEO0FBQ3REUixRQUFBQSxRQUFRLENBQUM0RixTQUFULENBQW1CckIsSUFBbkIsQ0FBd0IsSUFBeEI7QUFDSCxPQVBrRCxDQVNuRDs7O0FBQ0EsVUFBSSxDQUFDLENBQUNsRSxJQUFELElBQVNBLElBQUksQ0FBQ00sSUFBZixLQUF3QixDQUFDZ0YsS0FBN0IsRUFBb0M7QUFDaEMsZUFBTyxLQUFQO0FBQ0gsT0Faa0QsQ0FjbkQ7OztBQUNBM0YsTUFBQUEsUUFBUSxDQUFDNkYsWUFBVCxDQUFzQnRCLElBQXRCLENBQTJCLElBQTNCLEVBZm1ELENBaUJuRDs7QUFDQSxVQUFJLENBQUNvQixLQUFMLEVBQVk7QUFDUnpELFFBQUFBLFNBQVMsQ0FBQ1YsSUFBVixDQUFlLEtBQWYsRUFBc0JuQixJQUFJLENBQUNFLFlBQUwsQ0FBa0JpQixJQUFsQixDQUF1QixLQUF2QixDQUF0QjtBQUNILE9BRkQsTUFFTztBQUNILFlBQUltRSxLQUFLLEtBQUssTUFBZCxFQUFzQjtBQUNsQnpELFVBQUFBLFNBQVMsQ0FBQ1YsSUFBVixDQUFlLEtBQWYsRUFBc0JuQixJQUFJLENBQUNFLFlBQUwsQ0FBa0JpQixJQUFsQixDQUF1QixLQUF2QixDQUF0QjtBQUNIOztBQUNELFlBQUltRSxLQUFLLEtBQUssTUFBZCxFQUFzQjtBQUNsQnpELFVBQUFBLFNBQVMsQ0FBQ1YsSUFBVixDQUFlLEtBQWYsRUFBc0JuQixJQUFJLENBQUNFLFlBQUwsQ0FBa0JpQixJQUFsQixDQUF1QixLQUF2QixDQUF0QjtBQUNIO0FBQ0o7O0FBRURuQixNQUFBQSxJQUFJLENBQUNDLFlBQUwsR0E3Qm1ELENBOEJuRDs7QUFDQSxVQUFJRCxJQUFJLENBQUNDLFlBQUwsS0FBc0JELElBQUksQ0FBQ0csV0FBL0IsRUFBNEM7QUFDeENILFFBQUFBLElBQUksQ0FBQ0MsWUFBTCxHQUFvQixDQUFwQjtBQUNBTixRQUFBQSxRQUFRLENBQUM4RixZQUFULENBQXNCdkIsSUFBdEIsQ0FBMkIsSUFBM0I7QUFDSDs7QUFDRCxVQUFJbEUsSUFBSSxDQUFDQyxZQUFMLEdBQW9CLENBQXhCLEVBQTJCO0FBQ3ZCRCxRQUFBQSxJQUFJLENBQUNDLFlBQUwsR0FBcUJELElBQUksQ0FBQ0csV0FBTCxHQUFtQixDQUF4QztBQUNILE9BckNrRCxDQXNDbkQ7OztBQUNBLFVBQUlaLENBQUMsQ0FBQ29CLElBQUksQ0FBQ1gsSUFBSSxDQUFDQyxZQUFOLENBQUwsQ0FBRCxDQUEyQmUsRUFBM0IsQ0FBOEIsS0FBOUIsQ0FBSixFQUEwQztBQUN0Q2hCLFFBQUFBLElBQUksQ0FBQ0UsWUFBTCxHQUFvQlgsQ0FBQyxDQUFDb0IsSUFBSSxDQUFDWCxJQUFJLENBQUNDLFlBQU4sQ0FBTCxDQUFyQjtBQUNILE9BRkQsTUFFTztBQUNIRCxRQUFBQSxJQUFJLENBQUNFLFlBQUwsR0FBb0JYLENBQUMsQ0FBQ29CLElBQUksQ0FBQ1gsSUFBSSxDQUFDQyxZQUFOLENBQUwsQ0FBRCxDQUEyQmdCLElBQTNCLENBQWdDLFdBQWhDLENBQXBCO0FBQ0gsT0EzQ2tELENBNkNuRDs7O0FBQ0EsVUFBSXRCLFFBQVEsQ0FBQzZELFVBQWIsRUFBeUI7QUFDckJqRSxRQUFBQSxDQUFDLENBQUMsR0FBRCxFQUFNUyxJQUFJLENBQUNPLFlBQVgsQ0FBRCxDQUEwQm1GLFdBQTFCLENBQXNDLFFBQXRDO0FBQ0FuRyxRQUFBQSxDQUFDLENBQUMsVUFBVVMsSUFBSSxDQUFDQyxZQUFmLEdBQThCLEdBQS9CLEVBQW9DRCxJQUFJLENBQUNPLFlBQXpDLENBQUQsQ0FBd0RHLFFBQXhELENBQWlFLFFBQWpFO0FBQ0gsT0FqRGtELENBbURuRDs7O0FBQ0F5QixNQUFBQSxjQUFjLENBQUN4QyxRQUFELENBQWQsQ0FwRG1ELENBc0RuRDs7QUFDQUosTUFBQUEsQ0FBQyxDQUFDLGFBQUQsRUFBZ0JpQixNQUFoQixDQUFELENBQXlCMEIsTUFBekIsR0F2RG1ELENBeURuRDs7QUFDQTNDLE1BQUFBLENBQUMsQ0FBQyxXQUFELEVBQWNpQixNQUFkLENBQUQsQ0FBdUIwQixNQUF2QjtBQUVBLFVBQUl5RCxhQUFhLEdBQUdoRyxRQUFRLENBQUNpRyxNQUE3QjtBQUFBLFVBQ0lDLEtBQUssR0FBRyxFQURaLENBNURtRCxDQStEbkQ7O0FBQ0EsVUFBSWxHLFFBQVEsQ0FBQ2lHLE1BQVQsS0FBb0IsUUFBeEIsRUFBa0M7QUFDOUJDLFFBQUFBLEtBQUssR0FBRyxJQUFJQyxLQUFKLENBQVUsZ0JBQVYsRUFBNEIsZUFBNUIsRUFBNkMsY0FBN0MsRUFBNkQsYUFBN0QsRUFBNEUsYUFBNUUsRUFBMkYsaUJBQTNGLEVBQThHLE1BQTlHLEVBQXNILE1BQXRILEVBQ0osV0FESSxFQUNTLFNBRFQsRUFDb0IsZ0JBRHBCLEVBQ3NDLGFBRHRDLEVBQ3FELG9CQURyRCxDQUFSO0FBRUFILFFBQUFBLGFBQWEsR0FBR0UsS0FBSyxDQUFDbkUsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxNQUFpQmlFLEtBQUssQ0FBQzlDLE1BQU4sR0FBZSxDQUFoQyxDQUFYLENBQUQsQ0FBckI7O0FBQ0EsWUFBSTRDLGFBQWEsS0FBS3RELFNBQXRCLEVBQWlDO0FBQzdCc0QsVUFBQUEsYUFBYSxHQUFHLE1BQWhCO0FBQ0g7QUFDSixPQXZFa0QsQ0F5RW5EOzs7QUFDQSxVQUFJaEcsUUFBUSxDQUFDaUcsTUFBVCxDQUFnQkcsT0FBaEIsQ0FBd0IsR0FBeEIsTUFBaUMsQ0FBQyxDQUF0QyxFQUF5QztBQUNyQ0YsUUFBQUEsS0FBSyxHQUFHbEcsUUFBUSxDQUFDaUcsTUFBVCxDQUFnQkksS0FBaEIsQ0FBc0IsR0FBdEIsQ0FBUjtBQUNBTCxRQUFBQSxhQUFhLEdBQUdFLEtBQUssQ0FBQ25FLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsS0FBaUJpRSxLQUFLLENBQUM5QyxNQUFsQyxDQUFELENBQXJCOztBQUNBLFlBQUk0QyxhQUFhLEtBQUt0RCxTQUF0QixFQUFpQztBQUM3QnNELFVBQUFBLGFBQWEsR0FBRyxNQUFoQjtBQUNIO0FBQ0osT0FoRmtELENBa0ZuRDs7O0FBQ0EsVUFBSTNGLElBQUksQ0FBQ0UsWUFBTCxDQUFrQmlCLElBQWxCLENBQXVCLGlCQUF2QixDQUFKLEVBQStDO0FBQzNDd0UsUUFBQUEsYUFBYSxHQUFHM0YsSUFBSSxDQUFDRSxZQUFMLENBQWtCaUIsSUFBbEIsQ0FBdUIsaUJBQXZCLENBQWhCO0FBQ0gsT0FyRmtELENBdUZuRDs7O0FBQ0FuQixNQUFBQSxJQUFJLENBQUNJLE9BQUwsR0FBZSxJQUFmO0FBQ0EsVUFBSTZGLFFBQVEsR0FBRyxDQUFmO0FBQUEsVUFDSXZDLENBQUMsR0FBRyxDQURSO0FBQUEsVUFFSWEsTUFBTSxHQUFHLEVBRmI7QUFBQSxVQUdJMkIsVUFBVSxHQUFHLEVBSGpCO0FBQUEsVUFJSUMsVUFBVSxHQUFHLEVBSmpCO0FBQUEsVUFLSUMsS0FBSyxHQUFHLEVBTFo7O0FBT0EsVUFBSVQsYUFBYSxLQUFLLFdBQWxCLElBQWlDQSxhQUFhLEtBQUssZ0JBQW5ELElBQXVFQSxhQUFhLEtBQUssZUFBN0YsRUFBOEc7QUFDMUd4QixRQUFBQSxZQUFZLENBQUMzRCxNQUFELEVBQVNiLFFBQVQsRUFBbUJLLElBQW5CLENBQVo7QUFDQWlHLFFBQUFBLFFBQVEsR0FBRyxDQUFYO0FBQ0F2QyxRQUFBQSxDQUFDLEdBQUcsQ0FBSjtBQUNBYSxRQUFBQSxNQUFNLEdBQUdoRixDQUFDLENBQUMsYUFBRCxFQUFnQmlCLE1BQWhCLENBQVY7O0FBQ0EsWUFBSW1GLGFBQWEsS0FBSyxlQUF0QixFQUF1QztBQUNuQ3BCLFVBQUFBLE1BQU0sR0FBR2hGLENBQUMsQ0FBQyxhQUFELEVBQWdCaUIsTUFBaEIsQ0FBRCxDQUF5QjZGLFFBQXpCLEVBQVQ7QUFDSDs7QUFFRDlCLFFBQUFBLE1BQU0sQ0FBQzFELElBQVAsQ0FBWSxZQUFZO0FBQ3BCLGNBQUl5RixLQUFLLEdBQUcvRyxDQUFDLENBQUMsSUFBRCxDQUFiO0FBQ0ErRyxVQUFBQSxLQUFLLENBQUMvRSxHQUFOLENBQVU7QUFBQyxtQkFBTztBQUFSLFdBQVY7O0FBQ0EsY0FBSW1DLENBQUMsS0FBSy9ELFFBQVEsQ0FBQzRFLE1BQVQsR0FBa0IsQ0FBNUIsRUFBK0I7QUFDM0I5QixZQUFBQSxVQUFVLENBQUMsWUFBWTtBQUNuQjZELGNBQUFBLEtBQUssQ0FBQ3pCLE9BQU4sQ0FBYztBQUFDRixnQkFBQUEsT0FBTyxFQUFFO0FBQVYsZUFBZCxFQUFnQ2hGLFFBQVEsQ0FBQytDLFNBQXpDLEVBQW9ELEVBQXBELEVBQXdELFlBQVk7QUFDaEVsQyxnQkFBQUEsTUFBTSxDQUFDK0YsT0FBUCxDQUFlLG1CQUFmO0FBQ0gsZUFGRDtBQUdILGFBSlMsRUFJTixNQUFNTixRQUpBLENBQVY7QUFLSCxXQU5ELE1BTU87QUFDSHhELFlBQUFBLFVBQVUsQ0FBQyxZQUFZO0FBQ25CNkQsY0FBQUEsS0FBSyxDQUFDekIsT0FBTixDQUFjO0FBQUNGLGdCQUFBQSxPQUFPLEVBQUU7QUFBVixlQUFkLEVBQWdDaEYsUUFBUSxDQUFDK0MsU0FBekM7QUFDSCxhQUZTLEVBRU4sTUFBTXVELFFBRkEsQ0FBVjtBQUdIOztBQUNEQSxVQUFBQSxRQUFRLElBQUksRUFBWjtBQUNBdkMsVUFBQUEsQ0FBQztBQUNKLFNBaEJEO0FBaUJILE9BMUJELE1BMEJPLElBQUlpQyxhQUFhLEtBQUssU0FBbEIsSUFBK0JBLGFBQWEsS0FBSyxjQUFqRCxJQUFtRUEsYUFBYSxLQUFLLGFBQXpGLEVBQXdHO0FBQzNHeEIsUUFBQUEsWUFBWSxDQUFDM0QsTUFBRCxFQUFTYixRQUFULEVBQW1CSyxJQUFuQixDQUFaO0FBQ0FpRyxRQUFBQSxRQUFRLEdBQUcsQ0FBWDtBQUNBdkMsUUFBQUEsQ0FBQyxHQUFHLENBQUo7QUFDQWEsUUFBQUEsTUFBTSxHQUFHaEYsQ0FBQyxDQUFDLGFBQUQsRUFBZ0JpQixNQUFoQixDQUFWOztBQUNBLFlBQUltRixhQUFhLEtBQUssYUFBdEIsRUFBcUM7QUFDakNwQixVQUFBQSxNQUFNLEdBQUdoRixDQUFDLENBQUMsYUFBRCxFQUFnQmlCLE1BQWhCLENBQUQsQ0FBeUI2RixRQUF6QixFQUFUO0FBQ0g7O0FBRUQ5QixRQUFBQSxNQUFNLENBQUMxRCxJQUFQLENBQVksWUFBWTtBQUNwQixjQUFJeUYsS0FBSyxHQUFHL0csQ0FBQyxDQUFDLElBQUQsQ0FBYjtBQUNBK0csVUFBQUEsS0FBSyxDQUFDL0UsR0FBTixDQUFVO0FBQUMsc0JBQVU7QUFBWCxXQUFWOztBQUNBLGNBQUltQyxDQUFDLEtBQUsvRCxRQUFRLENBQUM0RSxNQUFULEdBQWtCLENBQTVCLEVBQStCO0FBQzNCOUIsWUFBQUEsVUFBVSxDQUFDLFlBQVk7QUFDbkI2RCxjQUFBQSxLQUFLLENBQUN6QixPQUFOLENBQWM7QUFBQ0YsZ0JBQUFBLE9BQU8sRUFBRTtBQUFWLGVBQWQsRUFBZ0NoRixRQUFRLENBQUMrQyxTQUF6QyxFQUFvRCxFQUFwRCxFQUF3RCxZQUFZO0FBQ2hFbEMsZ0JBQUFBLE1BQU0sQ0FBQytGLE9BQVAsQ0FBZSxtQkFBZjtBQUNILGVBRkQ7QUFHSCxhQUpTLEVBSU4sTUFBTU4sUUFKQSxDQUFWO0FBS0gsV0FORCxNQU1PO0FBQ0h4RCxZQUFBQSxVQUFVLENBQUMsWUFBWTtBQUNuQjZELGNBQUFBLEtBQUssQ0FBQ3pCLE9BQU4sQ0FBYztBQUFDRixnQkFBQUEsT0FBTyxFQUFFO0FBQVYsZUFBZCxFQUFnQ2hGLFFBQVEsQ0FBQytDLFNBQXpDO0FBQ0gsYUFGUyxFQUVOLE1BQU11RCxRQUZBLENBQVY7QUFHSDs7QUFDREEsVUFBQUEsUUFBUSxJQUFJLEVBQVo7QUFDQXZDLFVBQUFBLENBQUM7QUFDSixTQWhCRDtBQWlCSCxPQTFCTSxNQTBCQSxJQUFJaUMsYUFBYSxLQUFLLGFBQWxCLElBQW1DQSxhQUFhLEtBQUssa0JBQXJELElBQTJFQSxhQUFhLEtBQUssaUJBQWpHLEVBQW9IO0FBQ3ZIeEIsUUFBQUEsWUFBWSxDQUFDM0QsTUFBRCxFQUFTYixRQUFULEVBQW1CSyxJQUFuQixDQUFaO0FBQ0FpRyxRQUFBQSxRQUFRLEdBQUcsQ0FBWDtBQUNBdkMsUUFBQUEsQ0FBQyxHQUFHLENBQUo7QUFDQSxZQUFJOEMsQ0FBQyxHQUFHLENBQVI7QUFDQWpDLFFBQUFBLE1BQU0sR0FBR2hGLENBQUMsQ0FBQyxhQUFELEVBQWdCaUIsTUFBaEIsQ0FBVjs7QUFDQSxZQUFJbUYsYUFBYSxLQUFLLGlCQUF0QixFQUF5QztBQUNyQ3BCLFVBQUFBLE1BQU0sR0FBR2hGLENBQUMsQ0FBQyxhQUFELEVBQWdCaUIsTUFBaEIsQ0FBRCxDQUF5QjZGLFFBQXpCLEVBQVQ7QUFDSDs7QUFFRDlCLFFBQUFBLE1BQU0sQ0FBQzFELElBQVAsQ0FBWSxZQUFZO0FBQ3BCLGNBQUl5RixLQUFLLEdBQUcvRyxDQUFDLENBQUMsSUFBRCxDQUFiOztBQUNBLGNBQUltRSxDQUFDLEtBQUssQ0FBVixFQUFhO0FBQ1Q0QyxZQUFBQSxLQUFLLENBQUMvRSxHQUFOLENBQVUsS0FBVixFQUFpQixLQUFqQjtBQUNBbUMsWUFBQUEsQ0FBQztBQUNKLFdBSEQsTUFHTztBQUNINEMsWUFBQUEsS0FBSyxDQUFDL0UsR0FBTixDQUFVLFFBQVYsRUFBb0IsS0FBcEI7QUFDQW1DLFlBQUFBLENBQUMsR0FBRyxDQUFKO0FBQ0g7O0FBRUQsY0FBSThDLENBQUMsS0FBSzdHLFFBQVEsQ0FBQzRFLE1BQVQsR0FBa0IsQ0FBNUIsRUFBK0I7QUFDM0I5QixZQUFBQSxVQUFVLENBQUMsWUFBWTtBQUNuQjZELGNBQUFBLEtBQUssQ0FBQ3pCLE9BQU4sQ0FBYztBQUFDRixnQkFBQUEsT0FBTyxFQUFFO0FBQVYsZUFBZCxFQUFnQ2hGLFFBQVEsQ0FBQytDLFNBQXpDLEVBQW9ELEVBQXBELEVBQXdELFlBQVk7QUFDaEVsQyxnQkFBQUEsTUFBTSxDQUFDK0YsT0FBUCxDQUFlLG1CQUFmO0FBQ0gsZUFGRDtBQUdILGFBSlMsRUFJTixNQUFNTixRQUpBLENBQVY7QUFLSCxXQU5ELE1BTU87QUFDSHhELFlBQUFBLFVBQVUsQ0FBQyxZQUFZO0FBQ25CNkQsY0FBQUEsS0FBSyxDQUFDekIsT0FBTixDQUFjO0FBQUNGLGdCQUFBQSxPQUFPLEVBQUU7QUFBVixlQUFkLEVBQWdDaEYsUUFBUSxDQUFDK0MsU0FBekM7QUFDSCxhQUZTLEVBRU4sTUFBTXVELFFBRkEsQ0FBVjtBQUdIOztBQUNEQSxVQUFBQSxRQUFRLElBQUksRUFBWjtBQUNBTyxVQUFBQSxDQUFDO0FBQ0osU0F2QkQ7QUF3QkgsT0FsQ00sTUFrQ0EsSUFBSWIsYUFBYSxLQUFLLE1BQXRCLEVBQThCO0FBQ2pDeEIsUUFBQUEsWUFBWSxDQUFDM0QsTUFBRCxFQUFTYixRQUFULEVBQW1CSyxJQUFuQixDQUFaO0FBQ0FpRyxRQUFBQSxRQUFRLEdBQUcsQ0FBWDtBQUNBdkMsUUFBQUEsQ0FBQyxHQUFHLENBQUo7QUFFQW5FLFFBQUFBLENBQUMsQ0FBQyxhQUFELEVBQWdCaUIsTUFBaEIsQ0FBRCxDQUF5QkssSUFBekIsQ0FBOEIsWUFBWTtBQUN0QyxjQUFJeUYsS0FBSyxHQUFHL0csQ0FBQyxDQUFDLElBQUQsQ0FBYjtBQUNBLGNBQUlrSCxTQUFTLEdBQUdILEtBQUssQ0FBQ2xGLEtBQU4sRUFBaEI7QUFDQWtGLFVBQUFBLEtBQUssQ0FBQy9FLEdBQU4sQ0FBVTtBQUFDOEQsWUFBQUEsR0FBRyxFQUFFLEtBQU47QUFBYWpFLFlBQUFBLEtBQUssRUFBRTtBQUFwQixXQUFWOztBQUNBLGNBQUlzQyxDQUFDLEtBQUsvRCxRQUFRLENBQUM0RSxNQUFULEdBQWtCLENBQTVCLEVBQStCO0FBQzNCOUIsWUFBQUEsVUFBVSxDQUFDLFlBQVk7QUFDbkI2RCxjQUFBQSxLQUFLLENBQUN6QixPQUFOLENBQWM7QUFBQ3pELGdCQUFBQSxLQUFLLEVBQUVxRixTQUFSO0FBQW1COUIsZ0JBQUFBLE9BQU8sRUFBRTtBQUE1QixlQUFkLEVBQWtEaEYsUUFBUSxDQUFDK0MsU0FBM0QsRUFBc0UsRUFBdEUsRUFBMEUsWUFBWTtBQUNsRmxDLGdCQUFBQSxNQUFNLENBQUMrRixPQUFQLENBQWUsbUJBQWY7QUFDSCxlQUZEO0FBR0gsYUFKUyxFQUlOLE1BQU1OLFFBSkEsQ0FBVjtBQUtILFdBTkQsTUFNTztBQUNIeEQsWUFBQUEsVUFBVSxDQUFDLFlBQVk7QUFDbkI2RCxjQUFBQSxLQUFLLENBQUN6QixPQUFOLENBQWM7QUFBQ3pELGdCQUFBQSxLQUFLLEVBQUVxRixTQUFSO0FBQW1COUIsZ0JBQUFBLE9BQU8sRUFBRTtBQUE1QixlQUFkLEVBQWtEaEYsUUFBUSxDQUFDK0MsU0FBM0Q7QUFDSCxhQUZTLEVBRU4sTUFBTXVELFFBRkEsQ0FBVjtBQUdIOztBQUNEQSxVQUFBQSxRQUFRLElBQUksRUFBWjtBQUNBdkMsVUFBQUEsQ0FBQztBQUNKLFNBakJEO0FBa0JILE9BdkJNLE1BdUJBLElBQUlpQyxhQUFhLEtBQUssTUFBdEIsRUFBOEI7QUFDakN4QixRQUFBQSxZQUFZLENBQUMzRCxNQUFELEVBQVNiLFFBQVQsRUFBbUJLLElBQW5CLENBQVo7QUFFQWtHLFFBQUFBLFVBQVUsR0FBRzNHLENBQUMsQ0FBQyxtQkFBRCxFQUFzQmlCLE1BQXRCLENBQWQ7QUFDQTBGLFFBQUFBLFVBQVUsQ0FBQzNFLEdBQVgsQ0FBZTtBQUNYLG1CQUFTZixNQUFNLENBQUNZLEtBQVAsS0FBaUI7QUFEZixTQUFmO0FBSUE4RSxRQUFBQSxVQUFVLENBQUNyQixPQUFYLENBQW1CO0FBQUNGLFVBQUFBLE9BQU8sRUFBRTtBQUFWLFNBQW5CLEVBQXNDaEYsUUFBUSxDQUFDK0MsU0FBVCxHQUFxQixDQUEzRCxFQUErRCxFQUEvRCxFQUFtRSxZQUFZO0FBQzNFbEMsVUFBQUEsTUFBTSxDQUFDK0YsT0FBUCxDQUFlLG1CQUFmO0FBQ0gsU0FGRDtBQUdILE9BWE0sTUFXQSxJQUFJWixhQUFhLEtBQUssY0FBdEIsRUFBc0M7QUFDekN4QixRQUFBQSxZQUFZLENBQUMzRCxNQUFELEVBQVNiLFFBQVQsRUFBbUJLLElBQW5CLENBQVo7QUFFQWtHLFFBQUFBLFVBQVUsR0FBRzNHLENBQUMsQ0FBQyxtQkFBRCxFQUFzQmlCLE1BQXRCLENBQWQ7QUFDQTBGLFFBQUFBLFVBQVUsQ0FBQzNFLEdBQVgsQ0FBZTtBQUNYLG1CQUFTLEtBREU7QUFFWCxxQkFBVztBQUZBLFNBQWY7QUFLQTJFLFFBQUFBLFVBQVUsQ0FBQ3JCLE9BQVgsQ0FBbUI7QUFBQ3pELFVBQUFBLEtBQUssRUFBRVosTUFBTSxDQUFDWSxLQUFQLEtBQWlCO0FBQXpCLFNBQW5CLEVBQW9EekIsUUFBUSxDQUFDK0MsU0FBVCxHQUFxQixDQUF6RSxFQUE2RSxFQUE3RSxFQUFpRixZQUFZO0FBQ3pGbEMsVUFBQUEsTUFBTSxDQUFDK0YsT0FBUCxDQUFlLG1CQUFmO0FBQ0gsU0FGRDtBQUdILE9BWk0sTUFZQSxJQUFJWixhQUFhLEtBQUssYUFBdEIsRUFBcUM7QUFDeEN4QixRQUFBQSxZQUFZLENBQUMzRCxNQUFELEVBQVNiLFFBQVQsRUFBbUJLLElBQW5CLENBQVo7QUFFQWtHLFFBQUFBLFVBQVUsR0FBRzNHLENBQUMsQ0FBQyxtQkFBRCxFQUFzQmlCLE1BQXRCLENBQWQ7QUFDQTBGLFFBQUFBLFVBQVUsQ0FBQzNFLEdBQVgsQ0FBZTtBQUNYLG1CQUFTLEtBREU7QUFFWCxxQkFBVyxHQUZBO0FBR1gsa0JBQVEsRUFIRztBQUlYLG1CQUFTO0FBSkUsU0FBZjtBQU9BMkUsUUFBQUEsVUFBVSxDQUFDckIsT0FBWCxDQUFtQjtBQUFDekQsVUFBQUEsS0FBSyxFQUFFWixNQUFNLENBQUNZLEtBQVAsS0FBaUI7QUFBekIsU0FBbkIsRUFBb0R6QixRQUFRLENBQUMrQyxTQUFULEdBQXFCLENBQXpFLEVBQTZFLEVBQTdFLEVBQWlGLFlBQVk7QUFDekY7QUFDQXdELFVBQUFBLFVBQVUsQ0FBQzNFLEdBQVgsQ0FBZTtBQUNYLG9CQUFRLEtBREc7QUFFWCxxQkFBUztBQUZFLFdBQWY7QUFJQWYsVUFBQUEsTUFBTSxDQUFDK0YsT0FBUCxDQUFlLG1CQUFmO0FBQ0gsU0FQRDtBQVFILE9BbkJNLE1BbUJBLElBQUlaLGFBQWEsS0FBSyxXQUF0QixFQUFtQztBQUN0Q2IsUUFBQUEsV0FBVyxDQUFDdEUsTUFBRCxFQUFTYixRQUFULEVBQW1CSyxJQUFuQixDQUFYO0FBRUFtRyxRQUFBQSxVQUFVLEdBQUd4RyxRQUFRLENBQUNxRixPQUFULEdBQW1CckYsUUFBUSxDQUFDdUYsT0FBekM7QUFDQXhCLFFBQUFBLENBQUMsR0FBRyxDQUFKO0FBQ0F1QyxRQUFBQSxRQUFRLEdBQUcsQ0FBWDtBQUVBRyxRQUFBQSxLQUFLLEdBQUdNLE9BQU8sQ0FBQ25ILENBQUMsQ0FBQyxXQUFELEVBQWNpQixNQUFkLENBQUYsQ0FBZjtBQUNBNEYsUUFBQUEsS0FBSyxDQUFDdkYsSUFBTixDQUFXLFlBQVk7QUFDbkIsY0FBSThGLEdBQUcsR0FBR3BILENBQUMsQ0FBQyxJQUFELENBQVg7O0FBQ0EsY0FBSW1FLENBQUMsS0FBS3lDLFVBQVUsR0FBRyxDQUF2QixFQUEwQjtBQUN0QjFELFlBQUFBLFVBQVUsQ0FBQyxZQUFZO0FBQ25Ca0UsY0FBQUEsR0FBRyxDQUFDOUIsT0FBSixDQUFZO0FBQUNGLGdCQUFBQSxPQUFPLEVBQUU7QUFBVixlQUFaLEVBQTRCaEYsUUFBUSxDQUFDK0MsU0FBckMsRUFBZ0QsRUFBaEQsRUFBb0QsWUFBWTtBQUM1RGxDLGdCQUFBQSxNQUFNLENBQUMrRixPQUFQLENBQWUsbUJBQWY7QUFDSCxlQUZEO0FBR0gsYUFKUyxFQUlOLE1BQU1OLFFBSkEsQ0FBVjtBQUtILFdBTkQsTUFNTztBQUNIeEQsWUFBQUEsVUFBVSxDQUFDLFlBQVk7QUFDbkJrRSxjQUFBQSxHQUFHLENBQUM5QixPQUFKLENBQVk7QUFBQ0YsZ0JBQUFBLE9BQU8sRUFBRTtBQUFWLGVBQVosRUFBNEJoRixRQUFRLENBQUMrQyxTQUFyQztBQUNILGFBRlMsRUFFTixNQUFNdUQsUUFGQSxDQUFWO0FBR0g7O0FBQ0RBLFVBQUFBLFFBQVEsSUFBSSxFQUFaO0FBQ0F2QyxVQUFBQSxDQUFDO0FBQ0osU0FmRDtBQWdCSCxPQXhCTSxNQXdCQSxJQUFJaUMsYUFBYSxLQUFLLFNBQWxCLElBQStCQSxhQUFhLEtBQUssZ0JBQWpELElBQXFFQSxhQUFhLEtBQUssYUFBdkYsSUFBd0dBLGFBQWEsS0FBSyxvQkFBOUgsRUFBb0o7QUFDdkpiLFFBQUFBLFdBQVcsQ0FBQ3RFLE1BQUQsRUFBU2IsUUFBVCxFQUFtQkssSUFBbkIsQ0FBWDtBQUVBbUcsUUFBQUEsVUFBVSxHQUFHeEcsUUFBUSxDQUFDcUYsT0FBVCxHQUFtQnJGLFFBQVEsQ0FBQ3VGLE9BQXpDO0FBQ0F4QixRQUFBQSxDQUFDLEdBQUcsQ0FBSjtBQUNBdUMsUUFBQUEsUUFBUSxHQUFHLENBQVgsQ0FMdUosQ0FPdko7O0FBQ0EsWUFBSVcsUUFBUSxHQUFHLENBQWY7QUFDQSxZQUFJQyxRQUFRLEdBQUcsQ0FBZjtBQUNBLFlBQUlDLFFBQVEsR0FBRyxFQUFmO0FBQ0FBLFFBQUFBLFFBQVEsQ0FBQ0YsUUFBRCxDQUFSLEdBQXFCLEVBQXJCO0FBQ0FSLFFBQUFBLEtBQUssR0FBRzdHLENBQUMsQ0FBQyxXQUFELEVBQWNpQixNQUFkLENBQVQ7O0FBQ0EsWUFBSW1GLGFBQWEsS0FBSyxnQkFBbEIsSUFBc0NBLGFBQWEsS0FBSyxvQkFBNUQsRUFBa0Y7QUFDOUVTLFVBQUFBLEtBQUssR0FBRzdHLENBQUMsQ0FBQyxXQUFELEVBQWNpQixNQUFkLENBQUQsQ0FBdUI2RixRQUF2QixFQUFSO0FBQ0g7O0FBQ0RELFFBQUFBLEtBQUssQ0FBQ3ZGLElBQU4sQ0FBVyxZQUFZO0FBQ25CaUcsVUFBQUEsUUFBUSxDQUFDRixRQUFELENBQVIsQ0FBbUJDLFFBQW5CLElBQStCdEgsQ0FBQyxDQUFDLElBQUQsQ0FBaEM7QUFDQXNILFVBQUFBLFFBQVE7O0FBQ1IsY0FBSUEsUUFBUSxLQUFLbEgsUUFBUSxDQUFDcUYsT0FBMUIsRUFBbUM7QUFDL0I0QixZQUFBQSxRQUFRO0FBQ1JDLFlBQUFBLFFBQVEsR0FBRyxDQUFYO0FBQ0FDLFlBQUFBLFFBQVEsQ0FBQ0YsUUFBRCxDQUFSLEdBQXFCLEVBQXJCO0FBQ0g7QUFDSixTQVJELEVBaEJ1SixDQTBCdko7O0FBQ0EsYUFBSyxJQUFJeEIsSUFBSSxHQUFHLENBQWhCLEVBQW1CQSxJQUFJLEdBQUl6RixRQUFRLENBQUNxRixPQUFULEdBQW1CLENBQTlDLEVBQWtESSxJQUFJLEVBQXRELEVBQTBEO0FBQ3RELGNBQUkyQixPQUFPLEdBQUczQixJQUFkOztBQUNBLGVBQUssSUFBSUQsSUFBSSxHQUFHLENBQWhCLEVBQW1CQSxJQUFJLEdBQUd4RixRQUFRLENBQUN1RixPQUFuQyxFQUE0Q0MsSUFBSSxFQUFoRCxFQUFvRDtBQUNoRCxnQkFBSTRCLE9BQU8sSUFBSSxDQUFYLElBQWdCQSxPQUFPLEdBQUdwSCxRQUFRLENBQUNxRixPQUF2QyxFQUFnRDtBQUM1QztBQUM1QjtBQUNBO0FBQzRCLGVBQUMsVUFBVWdDLEdBQVYsRUFBZUMsR0FBZixFQUFvQkMsSUFBcEIsRUFBMEJ4RCxDQUExQixFQUE2QnlDLFVBQTdCLEVBQXlDO0FBQ3RDLG9CQUFJUSxHQUFHLEdBQUdwSCxDQUFDLENBQUN1SCxRQUFRLENBQUNFLEdBQUQsQ0FBUixDQUFjQyxHQUFkLENBQUQsQ0FBWDtBQUNBLG9CQUFJRSxDQUFDLEdBQUdSLEdBQUcsQ0FBQ3ZGLEtBQUosRUFBUjtBQUNBLG9CQUFJZ0csQ0FBQyxHQUFHVCxHQUFHLENBQUNyRixNQUFKLEVBQVI7O0FBQ0Esb0JBQUlxRSxhQUFhLEtBQUssYUFBbEIsSUFBbUNBLGFBQWEsS0FBSyxvQkFBekQsRUFBK0U7QUFDM0VnQixrQkFBQUEsR0FBRyxDQUFDdkYsS0FBSixDQUFVLENBQVYsRUFBYUUsTUFBYixDQUFvQixDQUFwQjtBQUNIOztBQUNELG9CQUFJb0MsQ0FBQyxLQUFLeUMsVUFBVSxHQUFHLENBQXZCLEVBQTBCO0FBQ3RCMUQsa0JBQUFBLFVBQVUsQ0FBQyxZQUFZO0FBQ25Ca0Usb0JBQUFBLEdBQUcsQ0FBQzlCLE9BQUosQ0FBWTtBQUFDRixzQkFBQUEsT0FBTyxFQUFFLEdBQVY7QUFBZXZELHNCQUFBQSxLQUFLLEVBQUUrRixDQUF0QjtBQUF5QjdGLHNCQUFBQSxNQUFNLEVBQUU4RjtBQUFqQyxxQkFBWixFQUFpRHpILFFBQVEsQ0FBQytDLFNBQVQsR0FBcUIsR0FBdEUsRUFBMkUsRUFBM0UsRUFBK0UsWUFBWTtBQUN2RmxDLHNCQUFBQSxNQUFNLENBQUMrRixPQUFQLENBQWUsbUJBQWY7QUFDSCxxQkFGRDtBQUdILG1CQUpTLEVBSU4sTUFBTVcsSUFKQSxDQUFWO0FBS0gsaUJBTkQsTUFNTztBQUNIekUsa0JBQUFBLFVBQVUsQ0FBQyxZQUFZO0FBQ25Ca0Usb0JBQUFBLEdBQUcsQ0FBQzlCLE9BQUosQ0FBWTtBQUFDRixzQkFBQUEsT0FBTyxFQUFFLEdBQVY7QUFBZXZELHNCQUFBQSxLQUFLLEVBQUUrRixDQUF0QjtBQUF5QjdGLHNCQUFBQSxNQUFNLEVBQUU4RjtBQUFqQyxxQkFBWixFQUFpRHpILFFBQVEsQ0FBQytDLFNBQVQsR0FBcUIsR0FBdEU7QUFDSCxtQkFGUyxFQUVOLE1BQU13RSxJQUZBLENBQVY7QUFHSDtBQUNKLGVBbEJELEVBa0JHL0IsSUFsQkgsRUFrQlM0QixPQWxCVCxFQWtCa0JkLFFBbEJsQixFQWtCNEJ2QyxDQWxCNUIsRUFrQitCeUMsVUFsQi9COztBQW1CQXpDLGNBQUFBLENBQUM7QUFDSjs7QUFDRHFELFlBQUFBLE9BQU87QUFDVjs7QUFDRGQsVUFBQUEsUUFBUSxJQUFJLEdBQVo7QUFDSDtBQUNKO0FBQ0osS0EzVUQsQ0FsU3lDLENBK21CekM7OztBQUNBLFFBQUlTLE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQVVXLEdBQVYsRUFBZTtBQUN6QixXQUFLLElBQUlDLENBQUosRUFBT0MsQ0FBUCxFQUFVN0QsQ0FBQyxHQUFHMkQsR0FBRyxDQUFDdEUsTUFBdkIsRUFBK0JXLENBQS9CLEVBQWtDNEQsQ0FBQyxHQUFHRSxRQUFRLENBQUM5RixJQUFJLENBQUNFLE1BQUwsS0FBZ0I4QixDQUFqQixFQUFvQixFQUFwQixDQUFaLEVBQXFDNkQsQ0FBQyxHQUFHRixHQUFHLENBQUMsRUFBRTNELENBQUgsQ0FBNUMsRUFBbUQyRCxHQUFHLENBQUMzRCxDQUFELENBQUgsR0FBUzJELEdBQUcsQ0FBQ0MsQ0FBRCxDQUEvRCxFQUFvRUQsR0FBRyxDQUFDQyxDQUFELENBQUgsR0FBU0MsQ0FBL0c7QUFBa0g7QUFBbEg7O0FBQ0EsYUFBT0YsR0FBUDtBQUNILEtBSEQsQ0FobkJ5QyxDQXFuQnpDOzs7QUFDQSxRQUFJSSxLQUFLLEdBQUcsU0FBUkEsS0FBUSxDQUFVQyxHQUFWLEVBQWU7QUFDdkIsVUFBSSxLQUFLQyxPQUFMLElBQWdCLE9BQU9BLE9BQU8sQ0FBQ0MsR0FBZixLQUF1QixXQUEzQyxFQUF3RDtBQUNwREQsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlGLEdBQVo7QUFDSDtBQUNKLEtBSkQsQ0F0bkJ5QyxDQTRuQnpDOzs7QUFDQSxTQUFLcEgsSUFBTCxHQUFZLFlBQVk7QUFDcEIsVUFBSSxDQUFDZixDQUFDLENBQUNFLE9BQUQsQ0FBRCxDQUFXZ0IsSUFBWCxDQUFnQixXQUFoQixFQUE2QkgsSUFBbEMsRUFBd0M7QUFDcENmLFFBQUFBLENBQUMsQ0FBQ0UsT0FBRCxDQUFELENBQVdnQixJQUFYLENBQWdCLFdBQWhCLEVBQTZCSCxJQUE3QixHQUFvQyxJQUFwQztBQUNBbUgsUUFBQUEsS0FBSyxDQUFDLGFBQUQsQ0FBTDtBQUNIO0FBQ0osS0FMRDs7QUFPQSxTQUFLSSxLQUFMLEdBQWEsWUFBWTtBQUNyQixVQUFJdEksQ0FBQyxDQUFDRSxPQUFELENBQUQsQ0FBV2dCLElBQVgsQ0FBZ0IsV0FBaEIsRUFBNkJILElBQWpDLEVBQXVDO0FBQ25DZixRQUFBQSxDQUFDLENBQUNFLE9BQUQsQ0FBRCxDQUFXZ0IsSUFBWCxDQUFnQixXQUFoQixFQUE2QkgsSUFBN0IsR0FBb0MsS0FBcEM7QUFDQW1ILFFBQUFBLEtBQUssQ0FBQyxjQUFELENBQUw7QUFDSDtBQUNKLEtBTEQsQ0Fwb0J5QyxDQTJvQnpDOzs7QUFDQTlILElBQUFBLFFBQVEsQ0FBQ21JLFNBQVQsQ0FBbUI1RCxJQUFuQixDQUF3QixJQUF4QjtBQUVBLFdBQU8sSUFBUDtBQUNILEdBL29CRDs7QUFpcEJBM0UsRUFBQUEsQ0FBQyxDQUFDTSxFQUFGLENBQUtDLFVBQUwsR0FBa0IsVUFBVUosT0FBVixFQUFtQjtBQUNqQyxXQUFPLEtBQUttQixJQUFMLENBQVUsVUFBVWtILEdBQVYsRUFBZUMsS0FBZixFQUFzQjtBQUNuQyxVQUFJdkksT0FBTyxHQUFHRixDQUFDLENBQUMsSUFBRCxDQUFmLENBRG1DLENBRW5DOztBQUNBLFVBQUlFLE9BQU8sQ0FBQ2dCLElBQVIsQ0FBYSxZQUFiLENBQUosRUFBZ0M7QUFDNUIsZUFBT2hCLE9BQU8sQ0FBQ2dCLElBQVIsQ0FBYSxZQUFiLENBQVA7QUFDSCxPQUxrQyxDQU1uQzs7O0FBQ0EsVUFBSXdILFVBQVUsR0FBRyxJQUFJekksVUFBSixDQUFlLElBQWYsRUFBcUJFLE9BQXJCLENBQWpCLENBUG1DLENBUW5DOztBQUNBRCxNQUFBQSxPQUFPLENBQUNnQixJQUFSLENBQWEsWUFBYixFQUEyQndILFVBQTNCO0FBQ0gsS0FWTSxDQUFQO0FBV0gsR0FaRCxDQWxwQlUsQ0FncUJWOzs7QUFDQTFJLEVBQUFBLENBQUMsQ0FBQ00sRUFBRixDQUFLQyxVQUFMLENBQWdCQyxRQUFoQixHQUEyQjtBQUN2QjZGLElBQUFBLE1BQU0sRUFBRSxRQURlO0FBRXZCckIsSUFBQUEsTUFBTSxFQUFFLEVBRmU7QUFHdkJTLElBQUFBLE9BQU8sRUFBRSxDQUhjO0FBSXZCRSxJQUFBQSxPQUFPLEVBQUUsQ0FKYztBQUt2QnhDLElBQUFBLFNBQVMsRUFBRSxHQUxZO0FBTXZCUSxJQUFBQSxTQUFTLEVBQUUsSUFOWTtBQU92QnpCLElBQUFBLFVBQVUsRUFBRSxDQVBXO0FBUXZCMEIsSUFBQUEsWUFBWSxFQUFFLElBUlM7QUFTdkJLLElBQUFBLFVBQVUsRUFBRSxJQVRXO0FBVXZCRyxJQUFBQSxnQkFBZ0IsRUFBRSxLQVZLO0FBV3ZCSSxJQUFBQSxZQUFZLEVBQUUsSUFYUztBQVl2QmpCLElBQUFBLGFBQWEsRUFBRSxLQVpRO0FBYXZCTSxJQUFBQSxRQUFRLEVBQUUsRUFiYTtBQWN2QkMsSUFBQUEsUUFBUSxFQUFFLEVBZGE7QUFldkI3QixJQUFBQSxXQUFXLEVBQUUsS0FmVTtBQWdCdkJnRSxJQUFBQSxZQUFZLEVBQUUsd0JBQVksQ0FDekIsQ0FqQnNCO0FBa0J2QnZCLElBQUFBLFdBQVcsRUFBRSx1QkFBWSxDQUN4QixDQW5Cc0I7QUFvQnZCd0IsSUFBQUEsWUFBWSxFQUFFLHdCQUFZLENBQ3pCLENBckJzQjtBQXNCdkJGLElBQUFBLFNBQVMsRUFBRSxxQkFBWSxDQUN0QixDQXZCc0I7QUF3QnZCdUMsSUFBQUEsU0FBUyxFQUFFLHFCQUFZLENBQ3RCO0FBekJzQixHQUEzQjtBQTRCQXZJLEVBQUFBLENBQUMsQ0FBQ00sRUFBRixDQUFLd0csUUFBTCxHQUFnQixHQUFHNkIsT0FBbkI7QUFFSCxDQS9yQkQsRUErckJHQyxNQS9yQkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanF1ZXJ5Lm5pdm8uc2xpZGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIGpRdWVyeSBOaXZvIFNsaWRlciB2My4yXHJcbiAqIGh0dHA6Ly9uaXZvLmRldjdzdHVkaW9zLmNvbVxyXG4gKlxyXG4gKiBDb3B5cmlnaHQgMjAxMiwgRGV2N3N0dWRpb3NcclxuICogRnJlZSB0byB1c2UgYW5kIGFidXNlIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cclxuICogaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuICovXHJcblxyXG4oZnVuY3Rpb24gKCQpIHtcclxuICAgIHZhciBOaXZvU2xpZGVyID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcclxuICAgICAgICAvLyBEZWZhdWx0cyBhcmUgYmVsb3dcclxuICAgICAgICB2YXIgc2V0dGluZ3MgPSAkLmV4dGVuZCh7fSwgJC5mbi5uaXZvU2xpZGVyLmRlZmF1bHRzLCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgLy8gVXNlZnVsIHZhcmlhYmxlcy4gUGxheSBjYXJlZnVsbHkuXHJcbiAgICAgICAgdmFyIHZhcnMgPSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTbGlkZTogMCxcclxuICAgICAgICAgICAgY3VycmVudEltYWdlOiAnJyxcclxuICAgICAgICAgICAgdG90YWxTbGlkZXM6IDAsXHJcbiAgICAgICAgICAgIHJ1bm5pbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICBwYXVzZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdG9wOiBmYWxzZSxcclxuICAgICAgICAgICAgY29udHJvbE5hdkVsOiBmYWxzZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIEdldCB0aGlzIHNsaWRlclxyXG4gICAgICAgIHZhciBzbGlkZXIgPSAkKGVsZW1lbnQpO1xyXG4gICAgICAgIHNsaWRlci5kYXRhKCduaXZvOnZhcnMnLCB2YXJzKS5hZGRDbGFzcygnbml2b1NsaWRlcicpO1xyXG5cclxuICAgICAgICAvLyBGaW5kIG91ciBzbGlkZXIgY2hpbGRyZW5cclxuICAgICAgICB2YXIga2lkcyA9IHNsaWRlci5jaGlsZHJlbigpO1xyXG4gICAgICAgIGtpZHMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZCA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIHZhciBsaW5rID0gJyc7XHJcbiAgICAgICAgICAgIGlmICghY2hpbGQuaXMoJ2ltZycpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQuaXMoJ2EnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmFkZENsYXNzKCduaXZvLWltYWdlTGluaycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmsgPSBjaGlsZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNoaWxkID0gY2hpbGQuZmluZCgnaW1nOmZpcnN0Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gR2V0IGltZyB3aWR0aCAmIGhlaWdodFxyXG4gICAgICAgICAgICB2YXIgY2hpbGRXaWR0aCA9IChjaGlsZFdpZHRoID09PSAwKSA/IGNoaWxkLmF0dHIoJ3dpZHRoJykgOiBjaGlsZC53aWR0aCgpLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRIZWlnaHQgPSAoY2hpbGRIZWlnaHQgPT09IDApID8gY2hpbGQuYXR0cignaGVpZ2h0JykgOiBjaGlsZC5oZWlnaHQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChsaW5rICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgbGluay5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNoaWxkLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgIHZhcnMudG90YWxTbGlkZXMrKztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gSWYgcmFuZG9tU3RhcnRcclxuICAgICAgICBpZiAoc2V0dGluZ3MucmFuZG9tU3RhcnQpIHtcclxuICAgICAgICAgICAgc2V0dGluZ3Muc3RhcnRTbGlkZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHZhcnMudG90YWxTbGlkZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2V0IHN0YXJ0U2xpZGVcclxuICAgICAgICBpZiAoc2V0dGluZ3Muc3RhcnRTbGlkZSA+IDApIHtcclxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLnN0YXJ0U2xpZGUgPj0gdmFycy50b3RhbFNsaWRlcykge1xyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3Muc3RhcnRTbGlkZSA9IHZhcnMudG90YWxTbGlkZXMgLSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhcnMuY3VycmVudFNsaWRlID0gc2V0dGluZ3Muc3RhcnRTbGlkZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEdldCBpbml0aWFsIGltYWdlXHJcbiAgICAgICAgaWYgKCQoa2lkc1t2YXJzLmN1cnJlbnRTbGlkZV0pLmlzKCdpbWcnKSkge1xyXG4gICAgICAgICAgICB2YXJzLmN1cnJlbnRJbWFnZSA9ICQoa2lkc1t2YXJzLmN1cnJlbnRTbGlkZV0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhcnMuY3VycmVudEltYWdlID0gJChraWRzW3ZhcnMuY3VycmVudFNsaWRlXSkuZmluZCgnaW1nOmZpcnN0Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTaG93IGluaXRpYWwgbGlua1xyXG4gICAgICAgIGlmICgkKGtpZHNbdmFycy5jdXJyZW50U2xpZGVdKS5pcygnYScpKSB7XHJcbiAgICAgICAgICAgICQoa2lkc1t2YXJzLmN1cnJlbnRTbGlkZV0pLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2V0IGZpcnN0IGJhY2tncm91bmRcclxuICAgICAgICB2YXIgc2xpZGVySW1nID0gJCgnPGltZyBhbHQ9XCJmaWdodFwiIHNyYz1cIiNcIi8+JykuYWRkQ2xhc3MoJ25pdm8tbWFpbi1pbWFnZScpO1xyXG4gICAgICAgIHNsaWRlckltZy5hdHRyKCdzcmMnLCB2YXJzLmN1cnJlbnRJbWFnZS5hdHRyKCdzcmMnKSkuc2hvdygpO1xyXG4gICAgICAgIHNsaWRlci5hcHBlbmQoc2xpZGVySW1nKTtcclxuXHJcbiAgICAgICAgLy8gRGV0ZWN0IFdpbmRvdyBSZXNpemVcclxuICAgICAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2xpZGVyLmNoaWxkcmVuKCdpbWcnKS53aWR0aChzbGlkZXIud2lkdGgoKSk7XHJcbiAgICAgICAgICAgIHNsaWRlckltZy5hdHRyKCdzcmMnLCB2YXJzLmN1cnJlbnRJbWFnZS5hdHRyKCdzcmMnKSk7XHJcbiAgICAgICAgICAgIHNsaWRlckltZy5zdG9wKCkuaGVpZ2h0KCdhdXRvJyk7XHJcbiAgICAgICAgICAgICQoJy5uaXZvLXNsaWNlJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICQoJy5uaXZvLWJveCcpLnJlbW92ZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL0NyZWF0ZSBjYXB0aW9uXHJcbiAgICAgICAgc2xpZGVyLmFwcGVuZCgkKCc8ZGl2IGNsYXNzPVwibml2by1jYXB0aW9uXCI+PC9kaXY+JykpO1xyXG5cclxuICAgICAgICAvLyBQcm9jZXNzIGNhcHRpb24gZnVuY3Rpb25cclxuICAgICAgICB2YXIgcHJvY2Vzc0NhcHRpb24gPSBmdW5jdGlvbiAoc2V0dGluZ3MpIHtcclxuICAgICAgICAgICAgdmFyIG5pdm9DYXB0aW9uID0gJCgnLm5pdm8tY2FwdGlvbicsIHNsaWRlcik7XHJcbiAgICAgICAgICAgIGlmICh2YXJzLmN1cnJlbnRJbWFnZS5hdHRyKCd0aXRsZScpICE9ICcnICYmIHZhcnMuY3VycmVudEltYWdlLmF0dHIoJ3RpdGxlJykgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGl0bGUgPSB2YXJzLmN1cnJlbnRJbWFnZS5hdHRyKCd0aXRsZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpdGxlLnN1YnN0cigwLCAxKSA9PSAnIycpIHRpdGxlID0gJCh0aXRsZSkuaHRtbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChuaXZvQ2FwdGlvbi5jc3MoJ2Rpc3BsYXknKSA9PSAnYmxvY2snKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5pdm9DYXB0aW9uLmh0bWwodGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIHNldHRpbmdzLmFuaW1TcGVlZCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG5pdm9DYXB0aW9uLmh0bWwodGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5pdm9DYXB0aW9uLnN0b3AoKS5mYWRlSW4oc2V0dGluZ3MuYW5pbVNwZWVkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5pdm9DYXB0aW9uLnN0b3AoKS5mYWRlT3V0KHNldHRpbmdzLmFuaW1TcGVlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vUHJvY2VzcyBpbml0aWFsICBjYXB0aW9uXHJcbiAgICAgICAgcHJvY2Vzc0NhcHRpb24oc2V0dGluZ3MpO1xyXG5cclxuICAgICAgICAvLyBJbiB0aGUgd29yZHMgb2YgU3VwZXIgTWFyaW8gXCJsZXQncyBhIGdvIVwiXHJcbiAgICAgICAgdmFyIHRpbWVyID0gMDtcclxuICAgICAgICBpZiAoIXNldHRpbmdzLm1hbnVhbEFkdmFuY2UgJiYga2lkcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgbml2b1J1bihzbGlkZXIsIGtpZHMsIHNldHRpbmdzLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0sIHNldHRpbmdzLnBhdXNlVGltZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZGQgRGlyZWN0aW9uIG5hdlxyXG4gICAgICAgIGlmIChzZXR0aW5ncy5kaXJlY3Rpb25OYXYpIHtcclxuICAgICAgICAgICAgc2xpZGVyLmFwcGVuZCgnPGRpdiBjbGFzcz1cIm5pdm8tZGlyZWN0aW9uTmF2XCI+PGEgY2xhc3M9XCJuaXZvLXByZXZOYXZcIj4nICsgc2V0dGluZ3MucHJldlRleHQgKyAnPC9hPjxhIGNsYXNzPVwibml2by1uZXh0TmF2XCI+JyArIHNldHRpbmdzLm5leHRUZXh0ICsgJzwvYT48L2Rpdj4nKTtcclxuXHJcbiAgICAgICAgICAgICQoc2xpZGVyKS5vbignY2xpY2snLCAnYS5uaXZvLXByZXZOYXYnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFycy5ydW5uaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcbiAgICAgICAgICAgICAgICB0aW1lciA9ICcnO1xyXG4gICAgICAgICAgICAgICAgdmFycy5jdXJyZW50U2xpZGUgLT0gMjtcclxuICAgICAgICAgICAgICAgIG5pdm9SdW4oc2xpZGVyLCBraWRzLCBzZXR0aW5ncywgJ3ByZXYnKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKHNsaWRlcikub24oJ2NsaWNrJywgJ2Eubml2by1uZXh0TmF2JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhcnMucnVubmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG4gICAgICAgICAgICAgICAgdGltZXIgPSAnJztcclxuICAgICAgICAgICAgICAgIG5pdm9SdW4oc2xpZGVyLCBraWRzLCBzZXR0aW5ncywgJ25leHQnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZGQgQ29udHJvbCBuYXZcclxuICAgICAgICBpZiAoc2V0dGluZ3MuY29udHJvbE5hdikge1xyXG4gICAgICAgICAgICB2YXJzLmNvbnRyb2xOYXZFbCA9ICQoJzxkaXYgY2xhc3M9XCJuaXZvLWNvbnRyb2xOYXZcIj48L2Rpdj4nKTtcclxuICAgICAgICAgICAgc2xpZGVyLmFmdGVyKHZhcnMuY29udHJvbE5hdkVsKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBraWRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MuY29udHJvbE5hdlRodW1icykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhcnMuY29udHJvbE5hdkVsLmFkZENsYXNzKCduaXZvLXRodW1icy1lbmFibGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkID0ga2lkcy5lcShpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNoaWxkLmlzKCdpbWcnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZCA9IGNoaWxkLmZpbmQoJ2ltZzpmaXJzdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGQuYXR0cignZGF0YS10aHVtYicpKSB2YXJzLmNvbnRyb2xOYXZFbC5hcHBlbmQoJzxhIGhyZWY9XCIjXCIgY2xhc3M9XCJuaXZvLWNvbnRyb2xcIiByZWw9XCInICsgaSArICdcIj48aW1nIHNyYz1cIicgKyBjaGlsZC5hdHRyKCdkYXRhLXRodW1iJykgKyAnXCIgYWx0PVwiXCIgLz48L2E+Jyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhcnMuY29udHJvbE5hdkVsLmFwcGVuZCgnPGEgY2xhc3M9XCJuaXZvLWNvbnRyb2xcIiBocmVmPVwiI1wiIHJlbD1cIicgKyBpICsgJ1wiPicgKyAoaSArIDEpICsgJzwvYT4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9TZXQgaW5pdGlhbCBhY3RpdmUgbGlua1xyXG4gICAgICAgICAgICAkKCdhOmVxKCcgKyB2YXJzLmN1cnJlbnRTbGlkZSArICcpJywgdmFycy5jb250cm9sTmF2RWwpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICQoJ2EnLCB2YXJzLmNvbnRyb2xOYXZFbCkuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFycy5ydW5uaW5nKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG4gICAgICAgICAgICAgICAgdGltZXIgPSAnJztcclxuICAgICAgICAgICAgICAgIHNsaWRlckltZy5hdHRyKCdzcmMnLCB2YXJzLmN1cnJlbnRJbWFnZS5hdHRyKCdzcmMnKSk7XHJcbiAgICAgICAgICAgICAgICB2YXJzLmN1cnJlbnRTbGlkZSA9ICQodGhpcykuYXR0cigncmVsJykgLSAxO1xyXG4gICAgICAgICAgICAgICAgbml2b1J1bihzbGlkZXIsIGtpZHMsIHNldHRpbmdzLCAnY29udHJvbCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vRm9yIHBhdXNlT25Ib3ZlciBzZXR0aW5nXHJcbiAgICAgICAgaWYgKHNldHRpbmdzLnBhdXNlT25Ib3Zlcikge1xyXG4gICAgICAgICAgICBzbGlkZXIuaG92ZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFycy5wYXVzZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcbiAgICAgICAgICAgICAgICB0aW1lciA9ICcnO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXJzLnBhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gUmVzdGFydCB0aGUgdGltZXJcclxuICAgICAgICAgICAgICAgIGlmICh0aW1lciA9PT0gJycgJiYgIXNldHRpbmdzLm1hbnVhbEFkdmFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbml2b1J1bihzbGlkZXIsIGtpZHMsIHNldHRpbmdzLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgc2V0dGluZ3MucGF1c2VUaW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBFdmVudCB3aGVuIEFuaW1hdGlvbiBmaW5pc2hlc1xyXG4gICAgICAgIHNsaWRlci5iaW5kKCduaXZvOmFuaW1GaW5pc2hlZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2xpZGVySW1nLmF0dHIoJ3NyYycsIHZhcnMuY3VycmVudEltYWdlLmF0dHIoJ3NyYycpKTtcclxuICAgICAgICAgICAgdmFycy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIEhpZGUgY2hpbGQgbGlua3NcclxuICAgICAgICAgICAgJChraWRzKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKCdhJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBTaG93IGN1cnJlbnQgbGlua1xyXG4gICAgICAgICAgICBpZiAoJChraWRzW3ZhcnMuY3VycmVudFNsaWRlXSkuaXMoJ2EnKSkge1xyXG4gICAgICAgICAgICAgICAgJChraWRzW3ZhcnMuY3VycmVudFNsaWRlXSkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gUmVzdGFydCB0aGUgdGltZXJcclxuICAgICAgICAgICAgaWYgKHRpbWVyID09PSAnJyAmJiAhdmFycy5wYXVzZWQgJiYgIXNldHRpbmdzLm1hbnVhbEFkdmFuY2UpIHtcclxuICAgICAgICAgICAgICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5pdm9SdW4oc2xpZGVyLCBraWRzLCBzZXR0aW5ncywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSwgc2V0dGluZ3MucGF1c2VUaW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBUcmlnZ2VyIHRoZSBhZnRlckNoYW5nZSBjYWxsYmFja1xyXG4gICAgICAgICAgICBzZXR0aW5ncy5hZnRlckNoYW5nZS5jYWxsKHRoaXMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBBZGQgc2xpY2VzIGZvciBzbGljZSBhbmltYXRpb25zXHJcbiAgICAgICAgdmFyIGNyZWF0ZVNsaWNlcyA9IGZ1bmN0aW9uIChzbGlkZXIsIHNldHRpbmdzLCB2YXJzKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHZhcnMuY3VycmVudEltYWdlKS5wYXJlbnQoKS5pcygnYScpKSAkKHZhcnMuY3VycmVudEltYWdlKS5wYXJlbnQoKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICAgICAgJCgnaW1nW3NyYz1cIicgKyB2YXJzLmN1cnJlbnRJbWFnZS5hdHRyKCdzcmMnKSArICdcIl0nLCBzbGlkZXIpLm5vdCgnLm5pdm8tbWFpbi1pbWFnZSwubml2by1jb250cm9sIGltZycpLndpZHRoKHNsaWRlci53aWR0aCgpKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJykuc2hvdygpO1xyXG4gICAgICAgICAgICB2YXIgc2xpY2VIZWlnaHQgPSAoJCgnaW1nW3NyYz1cIicgKyB2YXJzLmN1cnJlbnRJbWFnZS5hdHRyKCdzcmMnKSArICdcIl0nLCBzbGlkZXIpLm5vdCgnLm5pdm8tbWFpbi1pbWFnZSwubml2by1jb250cm9sIGltZycpLnBhcmVudCgpLmlzKCdhJykpID8gJCgnaW1nW3NyYz1cIicgKyB2YXJzLmN1cnJlbnRJbWFnZS5hdHRyKCdzcmMnKSArICdcIl0nLCBzbGlkZXIpLm5vdCgnLm5pdm8tbWFpbi1pbWFnZSwubml2by1jb250cm9sIGltZycpLnBhcmVudCgpLmhlaWdodCgpIDogJCgnaW1nW3NyYz1cIicgKyB2YXJzLmN1cnJlbnRJbWFnZS5hdHRyKCdzcmMnKSArICdcIl0nLCBzbGlkZXIpLm5vdCgnLm5pdm8tbWFpbi1pbWFnZSwubml2by1jb250cm9sIGltZycpLmhlaWdodCgpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXR0aW5ncy5zbGljZXM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNsaWNlV2lkdGggPSBNYXRoLnJvdW5kKHNsaWRlci53aWR0aCgpIC8gc2V0dGluZ3Muc2xpY2VzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gc2V0dGluZ3Muc2xpY2VzIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlci5hcHBlbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJzxkaXYgY2xhc3M9XCJuaXZvLXNsaWNlXCIgbmFtZT1cIicgKyBpICsgJ1wiPjxpbWcgc3JjPVwiJyArIHZhcnMuY3VycmVudEltYWdlLmF0dHIoJ3NyYycpICsgJ1wiIHN0eWxlPVwicG9zaXRpb246YWJzb2x1dGU7IHdpZHRoOicgKyBzbGlkZXIud2lkdGgoKSArICdweDsgaGVpZ2h0OmF1dG87IGRpc3BsYXk6YmxvY2sgIWltcG9ydGFudDsgdG9wOjA7IGxlZnQ6LScgKyAoKHNsaWNlV2lkdGggKyAoaSAqIHNsaWNlV2lkdGgpKSAtIHNsaWNlV2lkdGgpICsgJ3B4O1wiIC8+PC9kaXY+JykuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IChzbGljZVdpZHRoICogaSkgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IChzbGlkZXIud2lkdGgoKSAtIChzbGljZVdpZHRoICogaSkpICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogc2xpY2VIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogJzAnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyLmFwcGVuZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnPGRpdiBjbGFzcz1cIm5pdm8tc2xpY2VcIiBuYW1lPVwiJyArIGkgKyAnXCI+PGltZyBzcmM9XCInICsgdmFycy5jdXJyZW50SW1hZ2UuYXR0cignc3JjJykgKyAnXCIgc3R5bGU9XCJwb3NpdGlvbjphYnNvbHV0ZTsgd2lkdGg6JyArIHNsaWRlci53aWR0aCgpICsgJ3B4OyBoZWlnaHQ6YXV0bzsgZGlzcGxheTpibG9jayAhaW1wb3J0YW50OyB0b3A6MDsgbGVmdDotJyArICgoc2xpY2VXaWR0aCArIChpICogc2xpY2VXaWR0aCkpIC0gc2xpY2VXaWR0aCkgKyAncHg7XCIgLz48L2Rpdj4nKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogKHNsaWNlV2lkdGggKiBpKSArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogc2xpY2VXaWR0aCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHNsaWNlSGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6ICcwJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICQoJy5uaXZvLXNsaWNlJywgc2xpZGVyKS5oZWlnaHQoc2xpY2VIZWlnaHQpO1xyXG4gICAgICAgICAgICBzbGlkZXJJbWcuc3RvcCgpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAkKHZhcnMuY3VycmVudEltYWdlKS5oZWlnaHQoKVxyXG4gICAgICAgICAgICB9LCBzZXR0aW5ncy5hbmltU3BlZWQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIEFkZCBib3hlcyBmb3IgYm94IGFuaW1hdGlvbnNcclxuICAgICAgICB2YXIgY3JlYXRlQm94ZXMgPSBmdW5jdGlvbiAoc2xpZGVyLCBzZXR0aW5ncywgdmFycykge1xyXG4gICAgICAgICAgICBpZiAoJCh2YXJzLmN1cnJlbnRJbWFnZSkucGFyZW50KCkuaXMoJ2EnKSkgJCh2YXJzLmN1cnJlbnRJbWFnZSkucGFyZW50KCkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgICQoJ2ltZ1tzcmM9XCInICsgdmFycy5jdXJyZW50SW1hZ2UuYXR0cignc3JjJykgKyAnXCJdJywgc2xpZGVyKS5ub3QoJy5uaXZvLW1haW4taW1hZ2UsLm5pdm8tY29udHJvbCBpbWcnKS53aWR0aChzbGlkZXIud2lkdGgoKSkuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpLnNob3coKTtcclxuICAgICAgICAgICAgdmFyIGJveFdpZHRoID0gTWF0aC5yb3VuZChzbGlkZXIud2lkdGgoKSAvIHNldHRpbmdzLmJveENvbHMpLFxyXG4gICAgICAgICAgICAgICAgYm94SGVpZ2h0ID0gTWF0aC5yb3VuZCgkKCdpbWdbc3JjPVwiJyArIHZhcnMuY3VycmVudEltYWdlLmF0dHIoJ3NyYycpICsgJ1wiXScsIHNsaWRlcikubm90KCcubml2by1tYWluLWltYWdlLC5uaXZvLWNvbnRyb2wgaW1nJykuaGVpZ2h0KCkgLyBzZXR0aW5ncy5ib3hSb3dzKTtcclxuXHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciByb3dzID0gMDsgcm93cyA8IHNldHRpbmdzLmJveFJvd3M7IHJvd3MrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgY29scyA9IDA7IGNvbHMgPCBzZXR0aW5ncy5ib3hDb2xzOyBjb2xzKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29scyA9PT0gc2V0dGluZ3MuYm94Q29scyAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVyLmFwcGVuZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJzxkaXYgY2xhc3M9XCJuaXZvLWJveFwiIG5hbWU9XCInICsgY29scyArICdcIiByZWw9XCInICsgcm93cyArICdcIj48aW1nIGFsdD1cImZpZ2h0XCIgc3JjPVwiJyArIHZhcnMuY3VycmVudEltYWdlLmF0dHIoJ3NyYycpICsgJ1wiIHN0eWxlPVwicG9zaXRpb246YWJzb2x1dGU7IHdpZHRoOicgKyBzbGlkZXIud2lkdGgoKSArICdweDsgaGVpZ2h0OmF1dG87IGRpc3BsYXk6YmxvY2s7IHRvcDotJyArIChib3hIZWlnaHQgKiByb3dzKSArICdweDsgbGVmdDotJyArIChib3hXaWR0aCAqIGNvbHMpICsgJ3B4O1wiIC8+PC9kaXY+JykuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IChib3hXaWR0aCAqIGNvbHMpICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IChib3hIZWlnaHQgKiByb3dzKSArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IChzbGlkZXIud2lkdGgoKSAtIChib3hXaWR0aCAqIGNvbHMpKSArICdweCdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcubml2by1ib3hbbmFtZT1cIicgKyBjb2xzICsgJ1wiXScsIHNsaWRlcikuaGVpZ2h0KCQoJy5uaXZvLWJveFtuYW1lPVwiJyArIGNvbHMgKyAnXCJdIGltZycsIHNsaWRlcikuaGVpZ2h0KCkgKyAncHgnKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXIuYXBwZW5kKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnPGRpdiBjbGFzcz1cIm5pdm8tYm94XCIgbmFtZT1cIicgKyBjb2xzICsgJ1wiIHJlbD1cIicgKyByb3dzICsgJ1wiPjxpbWcgYWx0PVwiZmlnaHQyXCIgc3JjPVwiJyArIHZhcnMuY3VycmVudEltYWdlLmF0dHIoJ3NyYycpICsgJ1wiIHN0eWxlPVwicG9zaXRpb246YWJzb2x1dGU7IHdpZHRoOicgKyBzbGlkZXIud2lkdGgoKSArICdweDsgaGVpZ2h0OmF1dG87IGRpc3BsYXk6YmxvY2s7IHRvcDotJyArIChib3hIZWlnaHQgKiByb3dzKSArICdweDsgbGVmdDotJyArIChib3hXaWR0aCAqIGNvbHMpICsgJ3B4O1wiIC8+PC9kaXY+JykuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IChib3hXaWR0aCAqIGNvbHMpICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IChib3hIZWlnaHQgKiByb3dzKSArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGJveFdpZHRoICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLm5pdm8tYm94W25hbWU9XCInICsgY29scyArICdcIl0nLCBzbGlkZXIpLmhlaWdodCgkKCcubml2by1ib3hbbmFtZT1cIicgKyBjb2xzICsgJ1wiXSBpbWcnLCBzbGlkZXIpLmhlaWdodCgpICsgJ3B4Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzbGlkZXJJbWcuc3RvcCgpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAkKHZhcnMuY3VycmVudEltYWdlKS5oZWlnaHQoKVxyXG4gICAgICAgICAgICB9LCBzZXR0aW5ncy5hbmltU3BlZWQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFByaXZhdGUgcnVuIG1ldGhvZFxyXG4gICAgICAgIHZhciBuaXZvUnVuID0gZnVuY3Rpb24gKHNsaWRlciwga2lkcywgc2V0dGluZ3MsIG51ZGdlKSB7XHJcbiAgICAgICAgICAgIC8vIEdldCBvdXIgdmFyc1xyXG4gICAgICAgICAgICB2YXIgdmFycyA9IHNsaWRlci5kYXRhKCduaXZvOnZhcnMnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRyaWdnZXIgdGhlIGxhc3RTbGlkZSBjYWxsYmFja1xyXG4gICAgICAgICAgICBpZiAodmFycyAmJiAodmFycy5jdXJyZW50U2xpZGUgPT09IHZhcnMudG90YWxTbGlkZXMgLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3MubGFzdFNsaWRlLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFN0b3BcclxuICAgICAgICAgICAgaWYgKCghdmFycyB8fCB2YXJzLnN0b3ApICYmICFudWRnZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBUcmlnZ2VyIHRoZSBiZWZvcmVDaGFuZ2UgY2FsbGJhY2tcclxuICAgICAgICAgICAgc2V0dGluZ3MuYmVmb3JlQ2hhbmdlLmNhbGwodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgY3VycmVudCBiYWNrZ3JvdW5kIGJlZm9yZSBjaGFuZ2VcclxuICAgICAgICAgICAgaWYgKCFudWRnZSkge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVySW1nLmF0dHIoJ3NyYycsIHZhcnMuY3VycmVudEltYWdlLmF0dHIoJ3NyYycpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChudWRnZSA9PT0gJ3ByZXYnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVySW1nLmF0dHIoJ3NyYycsIHZhcnMuY3VycmVudEltYWdlLmF0dHIoJ3NyYycpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChudWRnZSA9PT0gJ25leHQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVySW1nLmF0dHIoJ3NyYycsIHZhcnMuY3VycmVudEltYWdlLmF0dHIoJ3NyYycpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFycy5jdXJyZW50U2xpZGUrKztcclxuICAgICAgICAgICAgLy8gVHJpZ2dlciB0aGUgc2xpZGVzaG93RW5kIGNhbGxiYWNrXHJcbiAgICAgICAgICAgIGlmICh2YXJzLmN1cnJlbnRTbGlkZSA9PT0gdmFycy50b3RhbFNsaWRlcykge1xyXG4gICAgICAgICAgICAgICAgdmFycy5jdXJyZW50U2xpZGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3Muc2xpZGVzaG93RW5kLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHZhcnMuY3VycmVudFNsaWRlIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgdmFycy5jdXJyZW50U2xpZGUgPSAodmFycy50b3RhbFNsaWRlcyAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFNldCB2YXJzLmN1cnJlbnRJbWFnZVxyXG4gICAgICAgICAgICBpZiAoJChraWRzW3ZhcnMuY3VycmVudFNsaWRlXSkuaXMoJ2ltZycpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXJzLmN1cnJlbnRJbWFnZSA9ICQoa2lkc1t2YXJzLmN1cnJlbnRTbGlkZV0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFycy5jdXJyZW50SW1hZ2UgPSAkKGtpZHNbdmFycy5jdXJyZW50U2xpZGVdKS5maW5kKCdpbWc6Zmlyc3QnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU2V0IGFjdGl2ZSBsaW5rc1xyXG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MuY29udHJvbE5hdikge1xyXG4gICAgICAgICAgICAgICAgJCgnYScsIHZhcnMuY29udHJvbE5hdkVsKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkKCdhOmVxKCcgKyB2YXJzLmN1cnJlbnRTbGlkZSArICcpJywgdmFycy5jb250cm9sTmF2RWwpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUHJvY2VzcyBjYXB0aW9uXHJcbiAgICAgICAgICAgIHByb2Nlc3NDYXB0aW9uKHNldHRpbmdzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSBhbnkgc2xpY2VzIGZyb20gbGFzdCB0cmFuc2l0aW9uXHJcbiAgICAgICAgICAgICQoJy5uaXZvLXNsaWNlJywgc2xpZGVyKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSBhbnkgYm94ZXMgZnJvbSBsYXN0IHRyYW5zaXRpb25cclxuICAgICAgICAgICAgJCgnLm5pdm8tYm94Jywgc2xpZGVyKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50RWZmZWN0ID0gc2V0dGluZ3MuZWZmZWN0LFxyXG4gICAgICAgICAgICAgICAgYW5pbXMgPSAnJztcclxuXHJcbiAgICAgICAgICAgIC8vIEdlbmVyYXRlIHJhbmRvbSBlZmZlY3RcclxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmVmZmVjdCA9PT0gJ3JhbmRvbScpIHtcclxuICAgICAgICAgICAgICAgIGFuaW1zID0gbmV3IEFycmF5KCdzbGljZURvd25SaWdodCcsICdzbGljZURvd25MZWZ0JywgJ3NsaWNlVXBSaWdodCcsICdzbGljZVVwTGVmdCcsICdzbGljZVVwRG93bicsICdzbGljZVVwRG93bkxlZnQnLCAnZm9sZCcsICdmYWRlJyxcclxuICAgICAgICAgICAgICAgICAgICAnYm94UmFuZG9tJywgJ2JveFJhaW4nLCAnYm94UmFpblJldmVyc2UnLCAnYm94UmFpbkdyb3cnLCAnYm94UmFpbkdyb3dSZXZlcnNlJyk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50RWZmZWN0ID0gYW5pbXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGFuaW1zLmxlbmd0aCArIDEpKV07XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudEVmZmVjdCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEVmZmVjdCA9ICdmYWRlJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUnVuIHJhbmRvbSBlZmZlY3QgZnJvbSBzcGVjaWZpZWQgc2V0IChlZzogZWZmZWN0Oidmb2xkLGZhZGUnKVxyXG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MuZWZmZWN0LmluZGV4T2YoJywnKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGFuaW1zID0gc2V0dGluZ3MuZWZmZWN0LnNwbGl0KCcsJyk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50RWZmZWN0ID0gYW5pbXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGFuaW1zLmxlbmd0aCkpXTtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50RWZmZWN0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50RWZmZWN0ID0gJ2ZhZGUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDdXN0b20gdHJhbnNpdGlvbiBhcyBkZWZpbmVkIGJ5IFwiZGF0YS10cmFuc2l0aW9uXCIgYXR0cmlidXRlXHJcbiAgICAgICAgICAgIGlmICh2YXJzLmN1cnJlbnRJbWFnZS5hdHRyKCdkYXRhLXRyYW5zaXRpb24nKSkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudEVmZmVjdCA9IHZhcnMuY3VycmVudEltYWdlLmF0dHIoJ2RhdGEtdHJhbnNpdGlvbicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBSdW4gZWZmZWN0c1xyXG4gICAgICAgICAgICB2YXJzLnJ1bm5pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB2YXIgdGltZUJ1ZmYgPSAwLFxyXG4gICAgICAgICAgICAgICAgaSA9IDAsXHJcbiAgICAgICAgICAgICAgICBzbGljZXMgPSAnJyxcclxuICAgICAgICAgICAgICAgIGZpcnN0U2xpY2UgPSAnJyxcclxuICAgICAgICAgICAgICAgIHRvdGFsQm94ZXMgPSAnJyxcclxuICAgICAgICAgICAgICAgIGJveGVzID0gJyc7XHJcblxyXG4gICAgICAgICAgICBpZiAoY3VycmVudEVmZmVjdCA9PT0gJ3NsaWNlRG93bicgfHwgY3VycmVudEVmZmVjdCA9PT0gJ3NsaWNlRG93blJpZ2h0JyB8fCBjdXJyZW50RWZmZWN0ID09PSAnc2xpY2VEb3duTGVmdCcpIHtcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVNsaWNlcyhzbGlkZXIsIHNldHRpbmdzLCB2YXJzKTtcclxuICAgICAgICAgICAgICAgIHRpbWVCdWZmID0gMDtcclxuICAgICAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgICAgICAgICAgc2xpY2VzID0gJCgnLm5pdm8tc2xpY2UnLCBzbGlkZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRFZmZlY3QgPT09ICdzbGljZURvd25MZWZ0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWNlcyA9ICQoJy5uaXZvLXNsaWNlJywgc2xpZGVyKS5fcmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNsaWNlcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2xpY2UgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWNlLmNzcyh7J3RvcCc6ICcwcHgnfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IHNldHRpbmdzLnNsaWNlcyAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGljZS5hbmltYXRlKHtvcGFjaXR5OiAnMS4wJ30sIHNldHRpbmdzLmFuaW1TcGVlZCwgJycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXIudHJpZ2dlcignbml2bzphbmltRmluaXNoZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAoMTAwICsgdGltZUJ1ZmYpKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNlLmFuaW1hdGUoe29wYWNpdHk6ICcxLjAnfSwgc2V0dGluZ3MuYW5pbVNwZWVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgKDEwMCArIHRpbWVCdWZmKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVCdWZmICs9IDUwO1xyXG4gICAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRFZmZlY3QgPT09ICdzbGljZVVwJyB8fCBjdXJyZW50RWZmZWN0ID09PSAnc2xpY2VVcFJpZ2h0JyB8fCBjdXJyZW50RWZmZWN0ID09PSAnc2xpY2VVcExlZnQnKSB7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVTbGljZXMoc2xpZGVyLCBzZXR0aW5ncywgdmFycyk7XHJcbiAgICAgICAgICAgICAgICB0aW1lQnVmZiA9IDA7XHJcbiAgICAgICAgICAgICAgICBpID0gMDtcclxuICAgICAgICAgICAgICAgIHNsaWNlcyA9ICQoJy5uaXZvLXNsaWNlJywgc2xpZGVyKTtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50RWZmZWN0ID09PSAnc2xpY2VVcExlZnQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpY2VzID0gJCgnLm5pdm8tc2xpY2UnLCBzbGlkZXIpLl9yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2xpY2VzLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzbGljZSA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpY2UuY3NzKHsnYm90dG9tJzogJzBweCd9KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gc2V0dGluZ3Muc2xpY2VzIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNlLmFuaW1hdGUoe29wYWNpdHk6ICcxLjAnfSwgc2V0dGluZ3MuYW5pbVNwZWVkLCAnJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlci50cmlnZ2VyKCduaXZvOmFuaW1GaW5pc2hlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sICgxMDAgKyB0aW1lQnVmZikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2UuYW5pbWF0ZSh7b3BhY2l0eTogJzEuMCd9LCBzZXR0aW5ncy5hbmltU3BlZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAoMTAwICsgdGltZUJ1ZmYpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGltZUJ1ZmYgKz0gNTA7XHJcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudEVmZmVjdCA9PT0gJ3NsaWNlVXBEb3duJyB8fCBjdXJyZW50RWZmZWN0ID09PSAnc2xpY2VVcERvd25SaWdodCcgfHwgY3VycmVudEVmZmVjdCA9PT0gJ3NsaWNlVXBEb3duTGVmdCcpIHtcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVNsaWNlcyhzbGlkZXIsIHNldHRpbmdzLCB2YXJzKTtcclxuICAgICAgICAgICAgICAgIHRpbWVCdWZmID0gMDtcclxuICAgICAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIHYgPSAwO1xyXG4gICAgICAgICAgICAgICAgc2xpY2VzID0gJCgnLm5pdm8tc2xpY2UnLCBzbGlkZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRFZmZlY3QgPT09ICdzbGljZVVwRG93bkxlZnQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpY2VzID0gJCgnLm5pdm8tc2xpY2UnLCBzbGlkZXIpLl9yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2xpY2VzLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzbGljZSA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2UuY3NzKCd0b3AnLCAnMHB4Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGljZS5jc3MoJ2JvdHRvbScsICcwcHgnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodiA9PT0gc2V0dGluZ3Muc2xpY2VzIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNlLmFuaW1hdGUoe29wYWNpdHk6ICcxLjAnfSwgc2V0dGluZ3MuYW5pbVNwZWVkLCAnJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlci50cmlnZ2VyKCduaXZvOmFuaW1GaW5pc2hlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sICgxMDAgKyB0aW1lQnVmZikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2UuYW5pbWF0ZSh7b3BhY2l0eTogJzEuMCd9LCBzZXR0aW5ncy5hbmltU3BlZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAoMTAwICsgdGltZUJ1ZmYpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGltZUJ1ZmYgKz0gNTA7XHJcbiAgICAgICAgICAgICAgICAgICAgdisrO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudEVmZmVjdCA9PT0gJ2ZvbGQnKSB7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVTbGljZXMoc2xpZGVyLCBzZXR0aW5ncywgdmFycyk7XHJcbiAgICAgICAgICAgICAgICB0aW1lQnVmZiA9IDA7XHJcbiAgICAgICAgICAgICAgICBpID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcubml2by1zbGljZScsIHNsaWRlcikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNsaWNlID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb3JpZ1dpZHRoID0gc2xpY2Uud2lkdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICBzbGljZS5jc3Moe3RvcDogJzBweCcsIHdpZHRoOiAnMHB4J30pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSBzZXR0aW5ncy5zbGljZXMgLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2UuYW5pbWF0ZSh7d2lkdGg6IG9yaWdXaWR0aCwgb3BhY2l0eTogJzEuMCd9LCBzZXR0aW5ncy5hbmltU3BlZWQsICcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVyLnRyaWdnZXIoJ25pdm86YW5pbUZpbmlzaGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgKDEwMCArIHRpbWVCdWZmKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGljZS5hbmltYXRlKHt3aWR0aDogb3JpZ1dpZHRoLCBvcGFjaXR5OiAnMS4wJ30sIHNldHRpbmdzLmFuaW1TcGVlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sICgxMDAgKyB0aW1lQnVmZikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aW1lQnVmZiArPSA1MDtcclxuICAgICAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50RWZmZWN0ID09PSAnZmFkZScpIHtcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVNsaWNlcyhzbGlkZXIsIHNldHRpbmdzLCB2YXJzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmaXJzdFNsaWNlID0gJCgnLm5pdm8tc2xpY2U6Zmlyc3QnLCBzbGlkZXIpO1xyXG4gICAgICAgICAgICAgICAgZmlyc3RTbGljZS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IHNsaWRlci53aWR0aCgpICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZmlyc3RTbGljZS5hbmltYXRlKHtvcGFjaXR5OiAnMS4wJ30sIChzZXR0aW5ncy5hbmltU3BlZWQgKiAyKSwgJycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXIudHJpZ2dlcignbml2bzphbmltRmluaXNoZWQnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRFZmZlY3QgPT09ICdzbGlkZUluUmlnaHQnKSB7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVTbGljZXMoc2xpZGVyLCBzZXR0aW5ncywgdmFycyk7XHJcblxyXG4gICAgICAgICAgICAgICAgZmlyc3RTbGljZSA9ICQoJy5uaXZvLXNsaWNlOmZpcnN0Jywgc2xpZGVyKTtcclxuICAgICAgICAgICAgICAgIGZpcnN0U2xpY2UuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAnd2lkdGgnOiAnMHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAnb3BhY2l0eSc6ICcxJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZmlyc3RTbGljZS5hbmltYXRlKHt3aWR0aDogc2xpZGVyLndpZHRoKCkgKyAncHgnfSwgKHNldHRpbmdzLmFuaW1TcGVlZCAqIDIpLCAnJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlci50cmlnZ2VyKCduaXZvOmFuaW1GaW5pc2hlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudEVmZmVjdCA9PT0gJ3NsaWRlSW5MZWZ0Jykge1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlU2xpY2VzKHNsaWRlciwgc2V0dGluZ3MsIHZhcnMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZpcnN0U2xpY2UgPSAkKCcubml2by1zbGljZTpmaXJzdCcsIHNsaWRlcik7XHJcbiAgICAgICAgICAgICAgICBmaXJzdFNsaWNlLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJzogJzBweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ29wYWNpdHknOiAnMScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2xlZnQnOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAncmlnaHQnOiAnMHB4J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZmlyc3RTbGljZS5hbmltYXRlKHt3aWR0aDogc2xpZGVyLndpZHRoKCkgKyAncHgnfSwgKHNldHRpbmdzLmFuaW1TcGVlZCAqIDIpLCAnJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlc2V0IHBvc2l0aW9uaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RTbGljZS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnbGVmdCc6ICcwcHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAncmlnaHQnOiAnJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlci50cmlnZ2VyKCduaXZvOmFuaW1GaW5pc2hlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudEVmZmVjdCA9PT0gJ2JveFJhbmRvbScpIHtcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUJveGVzKHNsaWRlciwgc2V0dGluZ3MsIHZhcnMpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRvdGFsQm94ZXMgPSBzZXR0aW5ncy5ib3hDb2xzICogc2V0dGluZ3MuYm94Um93cztcclxuICAgICAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGltZUJ1ZmYgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIGJveGVzID0gc2h1ZmZsZSgkKCcubml2by1ib3gnLCBzbGlkZXIpKTtcclxuICAgICAgICAgICAgICAgIGJveGVzLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBib3ggPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSB0b3RhbEJveGVzIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJveC5hbmltYXRlKHtvcGFjaXR5OiAnMSd9LCBzZXR0aW5ncy5hbmltU3BlZWQsICcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVyLnRyaWdnZXIoJ25pdm86YW5pbUZpbmlzaGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgKDEwMCArIHRpbWVCdWZmKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3guYW5pbWF0ZSh7b3BhY2l0eTogJzEnfSwgc2V0dGluZ3MuYW5pbVNwZWVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgKDEwMCArIHRpbWVCdWZmKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVCdWZmICs9IDIwO1xyXG4gICAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRFZmZlY3QgPT09ICdib3hSYWluJyB8fCBjdXJyZW50RWZmZWN0ID09PSAnYm94UmFpblJldmVyc2UnIHx8IGN1cnJlbnRFZmZlY3QgPT09ICdib3hSYWluR3JvdycgfHwgY3VycmVudEVmZmVjdCA9PT0gJ2JveFJhaW5Hcm93UmV2ZXJzZScpIHtcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUJveGVzKHNsaWRlciwgc2V0dGluZ3MsIHZhcnMpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRvdGFsQm94ZXMgPSBzZXR0aW5ncy5ib3hDb2xzICogc2V0dGluZ3MuYm94Um93cztcclxuICAgICAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGltZUJ1ZmYgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNwbGl0IGJveGVzIGludG8gMkQgYXJyYXlcclxuICAgICAgICAgICAgICAgIHZhciByb3dJbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29sSW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIGJveDJEYXJyID0gW107XHJcbiAgICAgICAgICAgICAgICBib3gyRGFycltyb3dJbmRleF0gPSBbXTtcclxuICAgICAgICAgICAgICAgIGJveGVzID0gJCgnLm5pdm8tYm94Jywgc2xpZGVyKTtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50RWZmZWN0ID09PSAnYm94UmFpblJldmVyc2UnIHx8IGN1cnJlbnRFZmZlY3QgPT09ICdib3hSYWluR3Jvd1JldmVyc2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm94ZXMgPSAkKCcubml2by1ib3gnLCBzbGlkZXIpLl9yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBib3hlcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBib3gyRGFycltyb3dJbmRleF1bY29sSW5kZXhdID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICBjb2xJbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2xJbmRleCA9PT0gc2V0dGluZ3MuYm94Q29scykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dJbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xJbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJveDJEYXJyW3Jvd0luZGV4XSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJ1biBhbmltYXRpb25cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGNvbHMgPSAwOyBjb2xzIDwgKHNldHRpbmdzLmJveENvbHMgKiAyKTsgY29scysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZDb2wgPSBjb2xzO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHJvd3MgPSAwOyByb3dzIDwgc2V0dGluZ3MuYm94Um93czsgcm93cysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2Q29sID49IDAgJiYgcHJldkNvbCA8IHNldHRpbmdzLmJveENvbHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIER1ZSB0byBzb21lIHdlaXJkIEpTIGJ1ZyB3aXRoIGxvb3AgdmFycyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlaW5nIHVzZWQgaW4gc2V0VGltZW91dCwgdGhpcyBpcyB3cmFwcGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoIGFuIGFub255bW91cyBmdW5jdGlvbiBjYWxsICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKHJvdywgY29sLCB0aW1lLCBpLCB0b3RhbEJveGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJveCA9ICQoYm94MkRhcnJbcm93XVtjb2xdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdyA9IGJveC53aWR0aCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoID0gYm94LmhlaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50RWZmZWN0ID09PSAnYm94UmFpbkdyb3cnIHx8IGN1cnJlbnRFZmZlY3QgPT09ICdib3hSYWluR3Jvd1JldmVyc2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJveC53aWR0aCgwKS5oZWlnaHQoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09PSB0b3RhbEJveGVzIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJveC5hbmltYXRlKHtvcGFjaXR5OiAnMScsIHdpZHRoOiB3LCBoZWlnaHQ6IGh9LCBzZXR0aW5ncy5hbmltU3BlZWQgLyAxLjMsICcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVyLnRyaWdnZXIoJ25pdm86YW5pbUZpbmlzaGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgKDEwMCArIHRpbWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJveC5hbmltYXRlKHtvcGFjaXR5OiAnMScsIHdpZHRoOiB3LCBoZWlnaHQ6IGh9LCBzZXR0aW5ncy5hbmltU3BlZWQgLyAxLjMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAoMTAwICsgdGltZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKHJvd3MsIHByZXZDb2wsIHRpbWVCdWZmLCBpLCB0b3RhbEJveGVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2Q29sLS07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVCdWZmICs9IDEwMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFNodWZmbGUgYW4gYXJyYXlcclxuICAgICAgICB2YXIgc2h1ZmZsZSA9IGZ1bmN0aW9uIChhcnIpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiwgeCwgaSA9IGFyci5sZW5ndGg7IGk7IGogPSBwYXJzZUludChNYXRoLnJhbmRvbSgpICogaSwgMTApLCB4ID0gYXJyWy0taV0sIGFycltpXSA9IGFycltqXSwgYXJyW2pdID0geCkgO1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIEZvciBkZWJ1Z2dpbmdcclxuICAgICAgICB2YXIgdHJhY2UgPSBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnNvbGUgJiYgdHlwZW9mIGNvbnNvbGUubG9nICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFN0YXJ0IC8gU3RvcFxyXG4gICAgICAgIHRoaXMuc3RvcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCEkKGVsZW1lbnQpLmRhdGEoJ25pdm86dmFycycpLnN0b3ApIHtcclxuICAgICAgICAgICAgICAgICQoZWxlbWVudCkuZGF0YSgnbml2bzp2YXJzJykuc3RvcCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0cmFjZSgnU3RvcCBTbGlkZXInKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkKGVsZW1lbnQpLmRhdGEoJ25pdm86dmFycycpLnN0b3ApIHtcclxuICAgICAgICAgICAgICAgICQoZWxlbWVudCkuZGF0YSgnbml2bzp2YXJzJykuc3RvcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdHJhY2UoJ1N0YXJ0IFNsaWRlcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gVHJpZ2dlciB0aGUgYWZ0ZXJMb2FkIGNhbGxiYWNrXHJcbiAgICAgICAgc2V0dGluZ3MuYWZ0ZXJMb2FkLmNhbGwodGhpcyk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICAkLmZuLm5pdm9TbGlkZXIgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAvLyBSZXR1cm4gZWFybHkgaWYgdGhpcyBlbGVtZW50IGFscmVhZHkgaGFzIGEgcGx1Z2luIGluc3RhbmNlXHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmRhdGEoJ25pdm9zbGlkZXInKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuZGF0YSgnbml2b3NsaWRlcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFBhc3Mgb3B0aW9ucyB0byBwbHVnaW4gY29uc3RydWN0b3JcclxuICAgICAgICAgICAgdmFyIG5pdm9zbGlkZXIgPSBuZXcgTml2b1NsaWRlcih0aGlzLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgLy8gU3RvcmUgcGx1Z2luIG9iamVjdCBpbiB0aGlzIGVsZW1lbnQncyBkYXRhXHJcbiAgICAgICAgICAgIGVsZW1lbnQuZGF0YSgnbml2b3NsaWRlcicsIG5pdm9zbGlkZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL0RlZmF1bHQgc2V0dGluZ3NcclxuICAgICQuZm4ubml2b1NsaWRlci5kZWZhdWx0cyA9IHtcclxuICAgICAgICBlZmZlY3Q6ICdyYW5kb20nLFxyXG4gICAgICAgIHNsaWNlczogMTUsXHJcbiAgICAgICAgYm94Q29sczogOCxcclxuICAgICAgICBib3hSb3dzOiA0LFxyXG4gICAgICAgIGFuaW1TcGVlZDogNTAwLFxyXG4gICAgICAgIHBhdXNlVGltZTogMzAwMCxcclxuICAgICAgICBzdGFydFNsaWRlOiAwLFxyXG4gICAgICAgIGRpcmVjdGlvbk5hdjogdHJ1ZSxcclxuICAgICAgICBjb250cm9sTmF2OiB0cnVlLFxyXG4gICAgICAgIGNvbnRyb2xOYXZUaHVtYnM6IGZhbHNlLFxyXG4gICAgICAgIHBhdXNlT25Ib3ZlcjogdHJ1ZSxcclxuICAgICAgICBtYW51YWxBZHZhbmNlOiBmYWxzZSxcclxuICAgICAgICBwcmV2VGV4dDogJycsXHJcbiAgICAgICAgbmV4dFRleHQ6ICcnLFxyXG4gICAgICAgIHJhbmRvbVN0YXJ0OiBmYWxzZSxcclxuICAgICAgICBiZWZvcmVDaGFuZ2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFmdGVyQ2hhbmdlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzbGlkZXNob3dFbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxhc3RTbGlkZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWZ0ZXJMb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAkLmZuLl9yZXZlcnNlID0gW10ucmV2ZXJzZTtcclxuXHJcbn0pKGpRdWVyeSk7Il0sIm5hbWVzIjpbIiQiLCJOaXZvU2xpZGVyIiwiZWxlbWVudCIsIm9wdGlvbnMiLCJzZXR0aW5ncyIsImV4dGVuZCIsImZuIiwibml2b1NsaWRlciIsImRlZmF1bHRzIiwidmFycyIsImN1cnJlbnRTbGlkZSIsImN1cnJlbnRJbWFnZSIsInRvdGFsU2xpZGVzIiwicnVubmluZyIsInBhdXNlZCIsInN0b3AiLCJjb250cm9sTmF2RWwiLCJzbGlkZXIiLCJkYXRhIiwiYWRkQ2xhc3MiLCJraWRzIiwiY2hpbGRyZW4iLCJlYWNoIiwiY2hpbGQiLCJsaW5rIiwiaXMiLCJmaW5kIiwiY2hpbGRXaWR0aCIsImF0dHIiLCJ3aWR0aCIsImNoaWxkSGVpZ2h0IiwiaGVpZ2h0IiwiY3NzIiwicmFuZG9tU3RhcnQiLCJzdGFydFNsaWRlIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwic2xpZGVySW1nIiwic2hvdyIsImFwcGVuZCIsIndpbmRvdyIsInJlc2l6ZSIsInJlbW92ZSIsInByb2Nlc3NDYXB0aW9uIiwibml2b0NhcHRpb24iLCJ1bmRlZmluZWQiLCJ0aXRsZSIsInN1YnN0ciIsImh0bWwiLCJzZXRUaW1lb3V0IiwiYW5pbVNwZWVkIiwiZmFkZUluIiwiZmFkZU91dCIsInRpbWVyIiwibWFudWFsQWR2YW5jZSIsImxlbmd0aCIsInNldEludGVydmFsIiwibml2b1J1biIsInBhdXNlVGltZSIsImRpcmVjdGlvbk5hdiIsInByZXZUZXh0IiwibmV4dFRleHQiLCJvbiIsImNsZWFySW50ZXJ2YWwiLCJjb250cm9sTmF2IiwiYWZ0ZXIiLCJpIiwiY29udHJvbE5hdlRodW1icyIsImVxIiwiYmluZCIsImhhc0NsYXNzIiwicGF1c2VPbkhvdmVyIiwiaG92ZXIiLCJhZnRlckNoYW5nZSIsImNhbGwiLCJjcmVhdGVTbGljZXMiLCJwYXJlbnQiLCJub3QiLCJzbGljZUhlaWdodCIsInNsaWNlcyIsInNsaWNlV2lkdGgiLCJyb3VuZCIsImxlZnQiLCJvcGFjaXR5Iiwib3ZlcmZsb3ciLCJhbmltYXRlIiwiY3JlYXRlQm94ZXMiLCJib3hXaWR0aCIsImJveENvbHMiLCJib3hIZWlnaHQiLCJib3hSb3dzIiwicm93cyIsImNvbHMiLCJ0b3AiLCJudWRnZSIsImxhc3RTbGlkZSIsImJlZm9yZUNoYW5nZSIsInNsaWRlc2hvd0VuZCIsInJlbW92ZUNsYXNzIiwiY3VycmVudEVmZmVjdCIsImVmZmVjdCIsImFuaW1zIiwiQXJyYXkiLCJpbmRleE9mIiwic3BsaXQiLCJ0aW1lQnVmZiIsImZpcnN0U2xpY2UiLCJ0b3RhbEJveGVzIiwiYm94ZXMiLCJfcmV2ZXJzZSIsInNsaWNlIiwidHJpZ2dlciIsInYiLCJvcmlnV2lkdGgiLCJzaHVmZmxlIiwiYm94Iiwicm93SW5kZXgiLCJjb2xJbmRleCIsImJveDJEYXJyIiwicHJldkNvbCIsInJvdyIsImNvbCIsInRpbWUiLCJ3IiwiaCIsImFyciIsImoiLCJ4IiwicGFyc2VJbnQiLCJ0cmFjZSIsIm1zZyIsImNvbnNvbGUiLCJsb2ciLCJzdGFydCIsImFmdGVyTG9hZCIsImtleSIsInZhbHVlIiwibml2b3NsaWRlciIsInJldmVyc2UiLCJqUXVlcnkiXSwic291cmNlUm9vdCI6IiJ9