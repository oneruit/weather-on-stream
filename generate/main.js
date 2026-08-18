function generateLink() {
  const location = document.getElementById('location').value || 'Москва,Россия';
  const lang = document.getElementById('language').value || 'ru';
  const apiKey = document.getElementById('apiKey').value.trim();

  let link = window.location.origin + '?q=' + encodeURIComponent(location) + '&lang=' + lang;
  
  if (apiKey) {
    link += '&key=' + encodeURIComponent(apiKey);
  }

  const linkElement = document.getElementById('generatedLink');
  linkElement.href = link;
  linkElement.textContent = link;
  
  document.getElementById('resultContainer').classList.remove('hidden');
}

function copyLink() {
  const link = document.getElementById('generatedLink').textContent;
  navigator.clipboard.writeText(link).then(() => {
    alert('Ссылка скопирована в буфер обмена!');
  }).catch(() => {
    const textarea = document.createElement('textarea');
    textarea.value = link;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Ссылка скопирована в буфер обмена!');
  });
}

window.onload = function() {
  generateLink();
};
