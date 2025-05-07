let khodamData = [];

// Load data khodam
fetch('khodam.json')
  .then(response => response.json())
  .then(data => {
    khodamData = data;
    console.log('Data khodam berhasil dimuat');
  })
  .catch(error => {
    console.error('Gagal memuat data khodam:', error);
  });

// Event listener untuk input nama (tekan Enter)
document.getElementById('namaInput').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    cekKhodam();
  }
});

function cekKhodam() {
  const namaInput = document.getElementById('namaInput');
  const nama = namaInput.value.trim();
  
  if (!nama) {
    showNotification('Isi dulu namanya ya!');
    namaInput.focus();
    return;
  }

  // Efek loading
  const hasil = document.getElementById('hasil');
  hasil.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Sedang mencari khodam...</div>';
  
  // Simulasi loading (untuk UX yang lebih baik)
  setTimeout(() => {
    // Pilih khodam secara random
    const randomIndex = Math.floor(Math.random() * khodamData.length);
    const khodam = khodamData[randomIndex];
    
    // Tampilkan hasil dengan animasi
    hasil.innerHTML = `
      <div class="khodam-result">
        <i class="fas ${khodam.icon} khodam-icon" style="color:var(--accent)"></i>
        <h3 class="khodam-name">${khodam.name}</h3>
        <p class="khodam-desc">${khodam.description}</p>
      </div>
    `;
    
    // Tambahkan ke riwayat
    addToHistory(nama, khodam.name);
    
    // Reset input field
    namaInput.value = '';
  }, 800); // Delay 800ms untuk efek loading
}

function addToHistory(nama, khodamName) {
  const riwayat = document.getElementById('riwayat');
  const date = new Date();
  const timeString = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  
  const entry = document.createElement('div');
  entry.className = 'riwayat-item';
  entry.innerHTML = `
    ${nama} <span>${khodamName}</span>
    <small>${timeString}</small>
  `;
  
  riwayat.prepend(entry);
  
  // Batasi riwayat hanya 20 entri
  const items = riwayat.querySelectorAll('.riwayat-item');
  if (items.length > 20) {
    riwayat.removeChild(items[items.length - 1]);
  }
  
  // Simpan ke localStorage
  saveHistory();
}

function saveHistory() {
  // Implementasi penyimpanan riwayat ke localStorage bisa ditambahkan di sini
  // contoh:
  // const historyItems = Array.from(document.querySelectorAll('.riwayat-item')).map(item => item.innerText);
  // localStorage.setItem('khodamHistory', JSON.stringify(historyItems));
}

function showNotification(message) {
  // Cek apakah notifikasi sudah ada
  let notification = document.querySelector('.notification');
  
  if (notification) {
    notification.remove();
  }
  
  notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Hapus notifikasi setelah 2.5 detik
  setTimeout(() => {
    notification.remove();
  }, 2500);
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('Service Worker: Registered', reg.scope))
    .catch(err => console.error('Service Worker: Registration Failed', err));
}
