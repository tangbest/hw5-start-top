// Generated by CoffeeScript 1.9.1
(function() {
  var $, $$, addClickHandlerToAllButtons, allButtonsHaveDone, calculateResult, callback, displayResultOnBubble, makeRequest, reset;

  $ = function(id) {
    return document.getElementById(id);
  };

  $$ = function(tag) {
    return document.getElementsByTagName(tag);
  };

  window.onload = function() {
    $('info-bar').className = 'bubbleDisable';
    $('info-bar').onclick = function() {
      if (allButtonsHaveDone()) {
        this.innerHTML = calculateResult();
      }
      return this.className = 'bubbleDisable';
    };
    $('button').onmouseout = function() {
      var e, reltg;
      e = window.event;
      reltg = (e.relatedTarget ? e.relatedTarget : e.toElement);
      while (reltg && reltg !== this) {
        reltg = reltg.parentNode;
      }
      if (reltg !== this) {
        return reset();
      }
    };
    return addClickHandlerToAllButtons();
  };

  addClickHandlerToAllButtons = function() {
    var i, item, len, ref, results;
    ref = $$('button');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      results.push(item.onclick = function() {
        var j, len1, otherItem, ref1;
        this.innerHTML = this.innerHTML + "<span class='unread'>...</span>";
        this.disabled = 'disabled';
        ref1 = $$('button');
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          otherItem = ref1[j];
          if (otherItem !== this) {
            if (!otherItem.getElementsByTagName('span')[0]) {
              otherItem.className = 'disable';
              otherItem.disabled = 'disabled';
            }
          }
        }
        return makeRequest(this.id);
      });
    }
    return results;
  };

  makeRequest = function(id) {
    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        return callback(xmlHttp.responseText, id);
      }
    };
    xmlHttp.open('GET', '/', true);
    return xmlHttp.send(null);
  };

  callback = function(number, id) {
    var i, len, otherItem, ref, thisButton;
    thisButton = $(id);
    if (thisButton.getElementsByTagName('span')[0]) {
      thisButton.innerHTML = thisButton.innerHTML.replace('...', number);
      thisButton.className = 'disable';
      thisButton.disabled = 'disabled';
      ref = $$('button');
      for (i = 0, len = ref.length; i < len; i++) {
        otherItem = ref[i];
        if (otherItem !== thisButton && !otherItem.getElementsByTagName('span')[0]) {
          otherItem.className = 'active';
          otherItem.disabled = '';
        }
      }
      if (allButtonsHaveDone()) {
        return displayResultOnBubble();
      }
    }
  };

  allButtonsHaveDone = function() {
    var flag, i, item, len, ref;
    flag = true;
    ref = $$('button');
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      if (!item.getElementsByTagName('span')[0] || item.getElementsByTagName('span')[0] === '...') {
        flag = false;
      }
    }
    return flag;
  };

  calculateResult = function() {
    var i, item, len, ref, result;
    result = 0;
    ref = $$('button');
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      result += parseInt(item.getElementsByTagName('span')[0].innerHTML);
    }
    return result;
  };

  reset = function() {
    var button, i, len, ref, results;
    $('info-bar').innerHTML = '';
    $('info-bar').className = 'bubbleDisable';
    ref = $$('button');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      button = ref[i];
      button.className = 'active';
      button.disabled = '';
      if (button.getElementsByTagName('span')[0] != null) {
        results.push(button.removeChild(button.getElementsByTagName('span')[0]));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  displayResultOnBubble = function() {
    return $('info-bar').className = 'bubbleActive';
  };

}).call(this);
