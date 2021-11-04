function createIcon(imgSrc, imgAlt) {
  const img = document.createElement('img');
  img.classList.add('main-icon');
  img.src = imgSrc;
  img.alt = `${imgAlt} image icon.`;
  return img;
}

export { createIcon };
