let khodamData = [];

fetch('khodam.json')
  .then(response => response.json())
  .then(data => {
    khodamData = data;
  });

function cekKhodam() {
  const nama = document.getElementById('namaInput').value.trim();
  if (!nama) return alert('Isi dulu namanya ya');

  const randomIndex = Math.floor(Math.random() * khodamData.length);
  const khodam = khodamData[randomIndex];

  document.getElementById('hasil').innerHTML = `
    <h3>Nama Khodam kamu:</h3>
    <i class="fas ${khodam.icon}" style="font-size:48px; color:#4CAF50;"></i>
    <p><strong>${khodam.name}</strong></p>
    <p>${khodam.description}</p>
  `;

  const riwayat = document.getElementById('riwayat');
  const entry = document.createElement('div');
  entry.textContent = `${nama} - ${khodam.name}`;
  riwayat.prepend(entry);
}
