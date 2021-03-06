// Generated by CoffeeScript 1.6.3
(function() {
  var gen, getQuery, getTable, text;

  getQuery = function(name) {
    var key, param, params, ret, val, _i, _len, _ref;
    params = (function() {
      var _i, _len, _ref, _results;
      _ref = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        param = _ref[_i];
        _results.push(param.split('='));
      }
      return _results;
    })();
    ret = {};
    for (_i = 0, _len = params.length; _i < _len; _i++) {
      _ref = params[_i], key = _ref[0], val = _ref[1];
      ret[key] = val;
    }
    if (name) {
      return ret[name];
    } else {
      return ret;
    }
  };

  getTable = function(text, size, bg, fg) {
    var col, counts, qrcode, row, tds, trs;
    qrcode = new QRCode(-1, QRErrorCorrectLevel.H);
    qrcode.addData(text);
    qrcode.make();
    counts = qrcode.getModuleCount();
    tds = (function() {
      var _i, _results;
      _results = [];
      for (row = _i = 0; 0 <= counts ? _i < counts : _i > counts; row = 0 <= counts ? ++_i : --_i) {
        _results.push((function() {
          var _j, _results1;
          _results1 = [];
          for (col = _j = 0; 0 <= counts ? _j < counts : _j > counts; col = 0 <= counts ? ++_j : --_j) {
            _results1.push("<td style=\"width: " + size + "px; background: " + (qrcode.isDark(row, col) ? bg : fg) + "\"></td>");
          }
          return _results1;
        })());
      }
      return _results;
    })();
    trs = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = tds.length; _i < _len; _i++) {
        row = tds[_i];
        _results.push("<tr style=\"height: " + size + "px\">" + (row.join('')) + "</tr>");
      }
      return _results;
    })();
    return "<table style=\"width: " + (size * counts) + "px; height: " + (size * counts) + "px\">" + (trs.join('')) + "</table>";
  };

  gen = function(text) {
    var qrcode, size;
    qrcode = document.getElementById('qrcode');
    size = Math.min(qrcode.clientWidth, qrcode.clientHeight);
    return qrcode.innerHTML = getTable(text, Math.min(10, Math.floor(size / 21)), '#000', '#fff');
  };

  window.go = function() {
    var base, text;
    text = document.getElementById('text').value;
    if (text) {
      base = window.location.href.split('?')[0];
      return window.location.href = "" + base + "?text=" + (encodeURIComponent(text));
    }
  };

  text = getQuery('text');

  if (text) {
    gen(decodeURIComponent(text));
  }

}).call(this);
