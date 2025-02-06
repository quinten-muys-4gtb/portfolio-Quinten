// Data structuur voor albums en foto's
const albums = {
    album1: [],
    album2: []
  };
  
  // Upload functionaliteit
  const uploadForm = document.getElementById('uploadForm');
  const fileInput = document.getElementById('fileInput');
  const dropZone = document.getElementById('dropZone');
  const uploadPreview = document.getElementById('uploadPreview');
  const albumSelect = document.getElementById('albumSelect');
  
  // Ondersteuning voor drag & drop
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });
  
  dropZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
  });
  
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length) {
      fileInput.files = files; // Zet de gedroppte bestanden in het file input element
      previewFiles(files);
    }
  });
  
  // Als er via het file input element een bestand geselecteerd wordt
  fileInput.addEventListener('change', (e) => {
    previewFiles(e.target.files);
  });
  
  // Functie om een preview te tonen van de geselecteerde foto('s)
  function previewFiles(files) {
    uploadPreview.innerHTML = '';
    Array.from(files).forEach(file => {
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const img = document.createElement('img');
          img.src = e.target.result;
          uploadPreview.appendChild(img);
        }
        reader.readAsDataURL(file);
      }
    });
  }
  
  // Verwerk het uploadformulier
  uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedAlbum = albumSelect.value;
    const files = fileInput.files;
    if (files.length) {
      Array.from(files).forEach(file => {
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = function(e) {
            // Voeg de foto toe aan het geselecteerde album
            albums[selectedAlbum].push(e.target.result);
            // Als dit album geopend is, vernieuw de weergave
            if (currentAlbum === selectedAlbum) {
              displayAlbumPhotos(selectedAlbum);
            }
          }
          reader.readAsDataURL(file);
        }
      });
      alert("Foto('s) succesvol geüpload naar " + selectedAlbum);
      // Reset het formulier en de preview
      uploadForm.reset();
      uploadPreview.innerHTML = '';
    } else {
      alert("Selecteer eerst een foto.");
    }
  });
  
  // Album weergave functionaliteit
  const albumGrid = document.getElementById('albumGrid');
  const albumPhotosSection = document.getElementById('albumPhotos');
  const photosGrid = document.getElementById('photosGrid');
  const albumTitle = document.getElementById('albumTitle');
  const backToAlbums = document.getElementById('backToAlbums');
  
  let currentAlbum = null;
  
  // Wanneer op een album wordt geklikt
  albumGrid.addEventListener('click', (e) => {
    const albumElement = e.target.closest('.album');
    if (albumElement) {
      const albumId = albumElement.getAttribute('data-album');
      currentAlbum = albumId;
      albumTitle.textContent = albumElement.querySelector('h3').textContent;
      displayAlbumPhotos(albumId);
      albumGrid.classList.add('hidden');
      albumPhotosSection.classList.remove('hidden');
    }
  });
  
  // Terug naar de albumoverzicht
  backToAlbums.addEventListener('click', () => {
    albumGrid.classList.remove('hidden');
    albumPhotosSection.classList.add('hidden');
    photosGrid.innerHTML = '';
    currentAlbum = null;
  });
  
  // Functie om de foto’s van een album te tonen
  function displayAlbumPhotos(albumId) {
    photosGrid.innerHTML = '';
    const photos = albums[albumId];
    if (photos.length === 0) {
      photosGrid.innerHTML = '<p>Geen foto\'s in dit album.</p>';
    } else {
      photos.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        photosGrid.appendChild(img);
      });
    }
  }
  