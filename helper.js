function showRenameConfirmation(file, newName) {
  return new Promise((resolve, reject) => {
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('modalImage');
    const modalClose = document.getElementsByClassName('close')[0];
    const newFileName = document.getElementById('newName');
    const confirmRenameButton = document.getElementById('confirmRenameButton');

    newFileName.textContent = `- ${newName}`;

    modal.style.display = 'block';
    modalImg.src = URL.createObjectURL(file);

    modalClose.onclick = function () {
      modal.style.display = 'none';
      reject(new Error('Rename canceled'));
    };

    confirmRenameButton.onclick = function () {
      modal.style.display = 'none';
      resolve(true);
    };
  });
}

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString('base64'),
      mimeType,
    },
  };
}

function handleFileSelect(event) {
  const files = event.target.files;
  const previewContainer = document.getElementById('imagePreview');
  previewContainer.innerHTML = '';

  for (const file of files) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.classList.add('image-preview-item');
      previewContainer.appendChild(img);
    };

    reader.readAsDataURL(file);
  }
}

module.exports = {
  showRenameConfirmation,
  fileToGenerativePart,
  handleFileSelect,
};
