(function () {
  function getHeight() {
    var body = document.body;
    var root = document.documentElement;
    return Math.max(
      body ? body.scrollHeight : 0,
      body ? body.offsetHeight : 0,
      root ? root.scrollHeight : 0,
      root ? root.offsetHeight : 0
    );
  }

  function postHeight(requestId) {
    try {
      window.parent.postMessage(
        {
          type: 'component-library:frame-height',
          height: getHeight(),
          requestId: requestId || null
        },
        '*'
      );
    } catch (error) {}
  }

  function scheduleHeightPass() {
    postHeight(null);
    window.setTimeout(function () { postHeight(null); }, 60);
    window.setTimeout(function () { postHeight(null); }, 180);
  }

  window.addEventListener('load', scheduleHeightPass);
  window.addEventListener('resize', function () { postHeight(null); });

  window.addEventListener('message', function (event) {
    if (event.data && event.data.type === 'component-library:request-height') {
      postHeight((event.data && event.data.requestId) || null);
    }
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { postHeight(null); });
  }

  var observer = new MutationObserver(function () { postHeight(null); });
  observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, characterData: true });

  Array.prototype.forEach.call(document.images || [], function (img) {
    if (!img.complete) {
      img.addEventListener('load', function () { postHeight(null); });
      img.addEventListener('error', function () { postHeight(null); });
    }
  });
})();
