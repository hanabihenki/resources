(function () {
  var starField = document.createElement('div');
  starField.id = 'star-field';
  starField.setAttribute('aria-hidden', 'true');
  document.body.insertBefore(starField, document.body.firstChild);

  var starCount = 155;

  for (var i = 0; i < starCount; i++) {
    var star = document.createElement('span');
    var size = Math.random() > 0.92 ? 3 : Math.random() > 0.62 ? 2 : 1;

    star.className = 'star';
    if (size === 3) {
      star.className += ' big-star';
    }

    star.style.left = (Math.random() * 100) + '%';
    star.style.top = (Math.random() * 100) + '%';
    star.style.setProperty('--star-size', size + 'px');
    star.style.setProperty('--star-speed', (0.9 + Math.random() * 3.2) + 's');
    star.style.setProperty('--star-delay', (Math.random() * 4) + 's');

    starField.appendChild(star);
  }
}());

var codeBoxes = document.querySelectorAll('.code-box');

function copyText(text, note) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }

  var textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return Promise.resolve();
  } catch (error) {
    document.body.removeChild(textarea);
    return Promise.reject(error);
  }
}

for (var i = 0; i < codeBoxes.length; i++) {
  codeBoxes[i].addEventListener('click', function () {
    var code = this.querySelector('code').innerText;
    var note = this.querySelector('.copy-note');

    copyText(code, note).then(function () {
      note.innerText = 'copied!';
      setTimeout(function () {
        note.innerText = 'click code to copy';
      }, 1200);
    }).catch(function () {
      note.innerText = 'copy failed, select text';
      setTimeout(function () {
        note.innerText = 'click code to copy';
      }, 1600);
    });
  });
}
