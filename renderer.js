const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');
const {
  showRenameConfirmation,
  fileToGenerativePart,
  handleFileSelect,
} = require('./helper');

document
  .getElementById('imageInput')
  .addEventListener('change', handleFileSelect);

document.getElementById('renameButton').addEventListener('click', async () => {
  const files = document.getElementById('imageInput').files;

  console.log(files);

  if (files.length == 0) {
    alert('Please select an image to rename.');
    return;
  }

  await renameImages(files);
});

async function renameImages(files) {
  const genAI = new GoogleGenerativeAI(
    'AIzaSyCIHmEtu35pAL3rIAxThtUPUeHQEofgJP8'
  );

  const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

  const prompt =
    'Rename image to a concise description of the main content using lowercase_separators under 5 words.';
  // 'Anaylze the image and provide the best name for it based on the image content in max 3 words.';

  for (const file of files) {
    const loader = document.getElementById('loader-container');
    loader.style.display = 'flex';

    try {
      const image = fileToGenerativePart(file.path, file.type);

      const result = await model.generateContent([prompt, image]);

      const response = await result.response;
      const newName = response.text();
      console.log('name - ', newName);

      const newFilePath = path.join(
        path.dirname(file.path),
        newName + path.extname(file.path)
      );
      console.log('newFilePath - ', newFilePath);

      const confirmName = await showRenameConfirmation(file, newName);

      console.log('confirmName - ', confirmName);
      if (confirmName) {
        fs.renameSync(file.path, newFilePath);
      }
    } catch (error) {
      console.error('Error during renaming:', error);
    } finally {
      loader.style.display = 'none';
    }
  }
}
