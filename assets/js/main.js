(function($, window, undefined) {
  /*!
   * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
   * http://cherne.net/brian/resources/jquery.hoverIntent.html
   *
   * You may use hoverIntent under the terms of the MIT license.
   * Copyright 2007, 2013 Brian Cherne
   */
  (function(e) {
    e.fn.hoverIntent = function(t, n, r) {
      var i = {
        interval: 100,
        sensitivity: 7,
        timeout: 0
      };
      if (typeof t === "object") {
        i = e.extend(i, t)
      } else if (e.isFunction(n)) {
        i = e.extend(i, {
          over: t,
          out: n,
          selector: r
        })
      } else {
        i = e.extend(i, {
          over: t,
          out: t,
          selector: n
        })
      }
      var s, o, u, a;
      var f = function(e) {
        s = e.pageX;
        o = e.pageY
      };
      var l = function(t, n) {
        n.hoverIntent_t = clearTimeout(n.hoverIntent_t);
        if (Math.abs(u - s) + Math.abs(a - o) < i.sensitivity) {
          e(n).off("mousemove.hoverIntent", f);
          n.hoverIntent_s = 1;
          return i.over.apply(n, [t])
        } else {
          u = s;
          a = o;
          n.hoverIntent_t = setTimeout(function() {
            l(t, n)
          }, i.interval)
        }
      };
      var c = function(e, t) {
        t.hoverIntent_t = clearTimeout(t.hoverIntent_t);
        t.hoverIntent_s = 0;
        return i.out.apply(t, [e])
      };
      var h = function(t) {
        var n = jQuery.extend({}, t);
        var r = this;
        if (r.hoverIntent_t) {
          r.hoverIntent_t = clearTimeout(r.hoverIntent_t)
        }
        if (t.type == "mouseenter") {
          u = n.pageX;
          a = n.pageY;
          e(r).on("mousemove.hoverIntent", f);
          if (r.hoverIntent_s != 1) {
            r.hoverIntent_t = setTimeout(function() {
              l(n, r)
            }, i.interval)
          }
        } else {
          e(r).off("mousemove.hoverIntent", f);
          if (r.hoverIntent_s == 1) {
            r.hoverIntent_t = setTimeout(function() {
              c(n, r)
            }, i.timeout)
          }
        }
      };
      return this.on({
        "mouseenter.hoverIntent": h,
        "mouseleave.hoverIntent": h
      }, i.selector)
    }
  })(jQuery);
  (function(c, q) {
    var m = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    c.fn.imagesLoaded = function(f) {
      function n() {
        var b = c(j),
          a = c(h);
        d && (h.length ? d.reject(e, b, a) : d.resolve(e));
        c.isFunction(f) && f.call(g, e, b, a)
      }

      function p(b) {
        k(b.target, "error" === b.type)
      }

      function k(b, a) {
        b.src === m || -1 !== c.inArray(b, l) || (l.push(b), a ? h.push(b) : j.push(b), c.data(b, "imagesLoaded", {
          isBroken: a,
          src: b.src
        }), r && d.notifyWith(c(b), [a, e, c(j), c(h)]), e.length === l.length && (setTimeout(n), e.unbind(".imagesLoaded",
          p)))
      }
      var g = this,
        d = c.isFunction(c.Deferred) ? c.Deferred() : 0,
        r = c.isFunction(d.notify),
        e = g.find("img").add(g.filter("img")),
        l = [],
        j = [],
        h = [];
      c.isPlainObject(f) && c.each(f, function(b, a) {
        if ("callback" === b) f = a;
        else if (d) d[b](a)
      });
      e.length ? e.bind("load.imagesLoaded error.imagesLoaded", p).each(function(b, a) {
          var d = a.src,
            e = c.data(a, "imagesLoaded");
          if (e && e.src === d) k(a, e.isBroken);
          else if (a.complete && a.naturalWidth !== q) k(a, 0 === a.naturalWidth || 0 === a.naturalHeight);
          else if (a.readyState || a.complete) a.src = m, a.src = d
        }) :
        n();
      return d ? d.promise(g) : g
    }
  })(jQuery);
})(jQuery, window);
/* 
This function will be called in the event when browser breakpoint changes
*/
var public_vars = public_vars || {};
jQuery.extend(public_vars, {
  breakpoints: {
    largescreen: [991, -1],
    tabletscreen: [768, 990],
    devicescreen: [420, 767],
    sdevicescreen: [0, 419]
  },
  lastBreakpoint: null
});
/* Main Function that will be called each time when the screen breakpoint changes */
function resizable(breakpoint) {
    var sb_with_animation;
    // Large Screen Specific Script
    if (is('largescreen')) {}
    // Tablet or larger screen
    if (ismdxl()) {}
    // Tablet Screen Specific Script
    if (is('tabletscreen')) {}
    // Tablet Screen Specific Script
    if (isxs()) {}
    // Trigger Event
    jQuery(window).trigger('neon.resize');
  }
  /* Functions */
  // Get current breakpoint
function get_current_breakpoint() {
    var width = jQuery(window).width(),
      breakpoints = public_vars.breakpoints;
    for (var breakpont_label in breakpoints) {
      var bp_arr = breakpoints[breakpont_label],
        min = bp_arr[0],
        max = bp_arr[1];
      if (max == -1)
        max = width;
      if (min <= width && max >= width) {
        return breakpont_label;
      }
    }
    return null;
  }
  // Check current screen breakpoint
function is(screen_label) {
    return get_current_breakpoint() == screen_label;
  }
  // Is xs device
function isxs() {
    return is('devicescreen') || is('sdevicescreen');
  }
  // Is md or xl
function ismdxl() {
    return is('tabletscreen') || is('largescreen');
  }
  // Trigger Resizable Function
function trigger_resizable() {
  if (public_vars.lastBreakpoint != get_current_breakpoint()) {
    public_vars.lastBreakpoint = get_current_breakpoint();
    resizable(public_vars.lastBreakpoint);
  }
}
(function($, window, undefined) {
  "use strict";
  $(document).ready(function() {
    // Menu Hover
    var $main_menu = $("nav.site-nav .main-menu");
    // Mobile Menu
    var $mobile_menu = $main_menu.clone();
    $("body").prepend($mobile_menu);
    $mobile_menu.removeClass('hidden-xs main-menu').addClass('mobile-menu');
    $(".menu-trigger").on('click', function(ev) {
      ev.preventDefault();
      $mobile_menu.slideToggle();
    });
    // Sub Menus
    $main_menu.find('li:has(> ul)').addClass("has-sub").each(function(i, el) {
      var $this = $(el),
        $sub = $this.children('ul'),
        $sub_sub = $sub.find('> li > ul');
      $sub.addClass('visible');
      if ($sub_sub.length) {
        $sub_sub.removeClass('visible');
      }
      $this.data('sub-height', $sub.outerHeight());
      if ($sub_sub.length) {
        $sub_sub.addClass('visible');
      }
    });
    $main_menu.find('.visible').removeClass('visible');
    // First Level
    $main_menu.find('> li:has(> ul)').addClass('is-root').each(function(i, el) {
      var $this = $(el),
        $sub = $this.children('ul');
      TweenMax.set($sub, {
        css: {
          opacity: 0
        }
      });
      $this.hoverIntent({
        over: function() {
          TweenMax.to($sub, 0.3, {
            css: {
              opacity: 1
            },
            onStart: function() {
              $this.addClass('hover');
            }
          });
          $sub.show();
        },
        out: function() {
          $sub.hide();
        },
        timeout: 300,
        interval: 0
      });
      $this.on('mouseleave', function() {
        TweenMax.to($sub, 0.15, {
          css: {
            opacity: 0
          },
          onComplete: function() {
            $this.removeClass('hover');
          }
        });
      });
    });
    $main_menu.find('li:has(> ul)').not('.is-root').each(function(i, el) {
      var $this = $(el),
        $sub = $this.children('ul'),
        height = $this.data('sub-height');
      $this.hoverIntent({
        over: function() {
          if (!$sub.is(':visible'))
            $sub.css({
              height: 0
            }).show();
          TweenMax.to($sub, .2, {
            css: {
              height: height
            },
            ease: Sine.easeOut,
            onComplete: function() {
              $sub.attr('style', '').addClass('visible');
            }
          });
        },
        out: function() {
          TweenMax.to($sub, .2, {
            css: {
              height: 0
            },
            ease: Sine.easeOut,
            onComplete: function() {
              $sub.attr('style', '').removeClass('visible');
            }
          });
        },
        interval: 150
      });
    });
    // Menu Search
    var $main_menu = $(".main-menu"),
      $menu_search = $main_menu.find('li.search .search-form .form-control');
    $main_menu.find('li.search a').click(function(ev) {
      ev.preventDefault();
      $main_menu.addClass('search-active');
      setTimeout(function() {
        $menu_search.focus();
      }, 180);
    });
    $menu_search.on('blur', function(ev) {
      $main_menu.removeClass('search-active');
    });
    // Clients Logos Carousel
    $(".client-logos").carousel();
    // Certification Carousel
    $(".certification").each(function(i, el) {
      var $this = $(el),
        items_count = $this.find('.item').length;
      $this.carousel({
        //interval: 7000
      });
      if (items_count > 1) {
        var $tnav = $('<div class="certification-nav"></div>');
        for (var i = 0; i < items_count; i++) {
          $tnav.append('<a href="#" data-index="' + i + '"></a>');
        }
        $tnav.find('a:first').addClass('active');
        $this.append($tnav);
        $tnav.on('click', 'a', function(ev) {
          ev.preventDefault();
          var index = $(this).data('index');
          $this.carousel(index);
        });
        $this.on('slide.bs.carousel', function(ev) {
          var index = $(ev.relatedTarget).index();
          $tnav.find('a').removeClass('active');
          $($tnav.find('a').get(index)).addClass('active');
        });
      }
    });
    // Alternate select box
    $(".alt-select-field").each(function(i, el) {
      var $this = $(el),
        $label = $this.find('.btn-label'),
        $items = $this.find('.dropdown-menu li'),
        $default = $('<li><a href="#" data-is-default="1">' + $label.html() + '</a></li>'),
        $current;
      $label.data('default-text', $label.html());
      $current = $items.filter('.active');
      $items.parent().prepend($default);
      if ($current.length) {
        $label.html($current.find('a').html());
      }
      // Events
      $this.find('.dropdown-menu').on('click', 'li a', function(ev) {
        ev.preventDefault();
        var $item = $(this),
          $li = $item.parent(),
          isDefault = $item.data('is-default') ? true : false;
        $this.find('.dropdown-menu li').not($li).removeClass('active');
        $li.addClass('active');
        $this.trigger('change', [{
          isDefault: isDefault,
          el: $item,
          elParent: $li,
          index: $li.index()
        }]);
        // Set Current
        $current = $this.find('.dropdown-menu li.active');
        $label.html($current.find('a').html());
        if (isDefault) {
          $current.addClass('hidden');
        } else {
          $this.find('a[data-is-default]').parent().removeClass('hidden');
        }
      });
    });
    // Slides
    var $sliders = $(".slides");
    if ($sliders.length && $.isFunction($.fn.neonSlider)) {
      $sliders.neonSlider({
        itemSelector: '.slide',
        autoSwitch: 5
      });
    }
    // Enable/Disable Resizable Event
    var wid = 0;
    $(window).resize(function() {
      clearTimeout(wid);
      wid = setTimeout(trigger_resizable, 200);
    });
  });
})(jQuery, window);
