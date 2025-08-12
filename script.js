// File: script.js

// Catatan: Variabel `soalBank` sekarang dimuat dari file `soal_bank_kelas10.js` yang terpisah.
// Pastikan untuk menyertakan file tersebut di dalam `index.html` sebelum file ini.

// --- Variabel Global untuk Mengelola State Aplikasi ---
let indexSoal = 0; // Melacak indeks soal yang sedang ditampilkan
let mataPelajaran = null; // Menyimpan mata pelajaran yang sedang aktif
let totalSoalDikerjakan = 0;
let jawabanBenar = 0;
let username = ''; // Menyimpan nama pengguna

// --- Mengambil Referensi Elemen DOM (Document Object Model) ---
const loginArea = document.getElementById("loginArea");
const subjectArea = document.getElementById("subjectArea");
const kuisArea = document.getElementById("kuisArea");
const soalElement = document.getElementById("soal");
const inputContainer = document.getElementById("inputContainer");
const feedbackElement = document.getElementById("feedback");
const tombolBerikutnya = document.getElementById("btnNext");
const hasilAkhirElement = document.getElementById("hasilAkhir");
const hasilText = document.getElementById("hasilText");
const usernameInput = document.getElementById("usernameInput");
const greetingText = document.getElementById("greetingText");
const usernameDisplay = document.getElementById("usernameDisplay");
const logoutButton = document.getElementById("logoutButton");

// Statistik
const totalSoalDikerjakanEl = document.getElementById("totalSoalDikerjakan");
const jawabanBenarEl = document.getElementById("jawabanBenar");
const akurasiEl = document.getElementById("akurasi");


// --- Fungsi untuk Masuk Aplikasi setelah input username ---
function masukAplikasi() {
    username = usernameInput.value.trim();
    if (username) {
        // Sembunyikan area login
        loginArea.classList.add("hidden");
        // Tampilkan area pilihan mata pelajaran
        subjectArea.classList.remove("hidden");
        // Perbarui teks sapaan dengan nama pengguna
        greetingText.innerText = `Halo, ${username}!`;
        // Tampilkan nama pengguna di header
        usernameDisplay.innerText = `Halo, ${username}!`;
        usernameDisplay.classList.remove("hidden");
        // Tampilkan tombol logout
        logoutButton.classList.remove("hidden");
    } else {
        alert("Mohon masukkan nama panggilan Anda!");
    }
}

// --- Fungsi Utama untuk Menampilkan Soal ---
function tampilkanSoal() {
    // Periksa apakah bank soal dan mata pelajaran tersedia dan memiliki soal
    if (!soalBank || !soalBank[mataPelajaran] || soalBank[mataPelajaran].length === 0) {
        console.error("Bank soal atau mata pelajaran tidak ditemukan atau kosong!");
        soalElement.innerText = "Maaf, soal untuk mata pelajaran ini belum tersedia.";
        inputContainer.innerHTML = "";
        tombolBerikutnya.classList.add("hidden");
        return;
    }
    
    // Ambil soal saat ini dari bank soal
    const soal = soalBank[mataPelajaran][indexSoal];
    
    // Reset tampilan sebelumnya
    soalElement.innerHTML = `(${indexSoal + 1}) ${soal.soal}`;
    feedbackElement.innerHTML = "";
    tombolBerikutnya.classList.add("hidden");
    inputContainer.innerHTML = "";

    // Tampilkan input sesuai tipe soal (pilihan ganda atau esai)
    if (soal.tipe === "pilihan") {
        soal.pilihan.forEach(pilihanTeks => {
            const tombolPilihan = document.createElement("button");
            tombolPilihan.innerHTML = pilihanTeks;
            tombolPilihan.className = "block w-full text-left bg-gray-100 p-3 mb-2 rounded-lg text-gray-700 font-medium hover:bg-blue-200 hover:text-blue-800 transition-colors";
            tombolPilihan.onclick = () => periksaJawaban(pilihanTeks);
            inputContainer.appendChild(tombolPilihan);
        });
    } else { // Tipe 'essay'
        const inputEsai = document.createElement("input");
        inputEsai.type = "text";
        inputEsai.id = "inputJawaban";
        inputEsai.placeholder = "Ketik jawabanmu di sini";
        inputEsai.className = "w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all";
        inputContainer.appendChild(inputEsai);

        const tombolPeriksa = document.createElement("button");
        tombolPeriksa.innerText = "Periksa Jawaban";
        tombolPeriksa.className = "btn-primary w-full mt-4 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md";
        tombolPeriksa.onclick = () => {
            const jawabanUser = document.getElementById("inputJawaban").value.trim();
            if (jawabanUser) {
                periksaJawaban(jawabanUser);
            } else {
                feedbackElement.innerText = "Mohon isi jawaban Anda.";
                feedbackElement.className = "text-red-500 mt-4";
            }
        };
        inputContainer.appendChild(tombolPeriksa);
    }
    
    // Meminta MathJax untuk me-render formula matematika
    if (typeof MathJax !== 'undefined') {
        MathJax.typesetClear();
        MathJax.typesetPromise();
    }
}

// --- Fungsi untuk Memeriksa Jawaban dan Memberikan Feedback ---
function periksaJawaban(jawabanUser) {
    const soal = soalBank[mataPelajaran][indexSoal];
    const jawabanBenarSaatIni = soal.jawaban.toLowerCase().trim();
    const jawabanPengguna = jawabanUser.toLowerCase().trim();
    
    let isJawabanBenar = false;

    // Logika pemeriksaan berdasarkan tipe soal
    if (soal.tipe === "pilihan") {
        isJawabanBenar = (jawabanPengguna === jawabanBenarSaatIni);
    } else { // Tipe 'essay'
        isJawabanBenar = jawabanPengguna.includes(jawabanBenarSaatIni) || jawabanBenarSaatIni.includes(jawabanPengguna);
    }
    
    // Perbarui statistik
    totalSoalDikerjakan++;
    if (isJawabanBenar) {
        jawabanBenar++;
    }
    updateStats();

    // Tampilkan feedback visual
    if (soal.tipe === "pilihan") {
        document.querySelectorAll('#inputContainer button').forEach(btn => {
            btn.disabled = true;
            if (btn.innerHTML.toLowerCase().trim() === jawabanBenarSaatIni) {
                btn.classList.add('correct-answer');
                btn.classList.remove('bg-gray-100', 'hover:bg-blue-200', 'hover:text-blue-800', 'text-gray-700');
            } else if (btn.innerHTML.toLowerCase().trim() === jawabanPengguna && !isJawabanBenar) {
                btn.classList.add('incorrect-answer');
                btn.classList.remove('bg-gray-100', 'hover:bg-blue-200', 'hover:text-blue-800', 'text-gray-700');
            }
        });
    } else {
        document.querySelector('#inputContainer button').disabled = true;
    }

    // Perbarui skor dan pesan feedback
    if (isJawabanBenar) {
        feedbackElement.innerText = "✅ Jawaban benar!";
        feedbackElement.className = "text-green-600 mt-4 fade-in";
    } else {
        feedbackElement.innerHTML = `❌ Salah. Jawaban benar: <span class="text-green-600">${soal.jawaban}</span>.<br>Penjelasan: <span class="font-normal">${soal.penjelasan}</span>`;
        feedbackElement.className = "text-red-600 mt-4 fade-in";
    }
    
    // Meminta MathJax untuk me-render formula matematika di feedback
    if (typeof MathJax !== 'undefined') {
        MathJax.typesetClear();
        MathJax.typesetPromise();
    }

    // Tampilkan tombol "Soal Berikutnya"
    tombolBerikutnya.classList.remove("hidden");
}

// --- Fungsi untuk Memperbarui Statistik di UI ---
function updateStats() {
    totalSoalDikerjakanEl.innerText = totalSoalDikerjakan;
    jawabanBenarEl.innerText = jawabanBenar;
    let akurasi = totalSoalDikerjakan > 0 ? (jawabanBenar / totalSoalDikerjakan) * 100 : 0;
    akurasiEl.innerText = `${akurasi.toFixed(0)}%`;
}

// --- Fungsi untuk Pindah ke Soal Berikutnya ---
function soalBerikutnya() {
    indexSoal++;
    // Cek apakah masih ada soal yang tersisa
    if (indexSoal < soalBank[mataPelajaran].length) {
        tampilkanSoal();
    } else {
        tampilkanHasil();
    }
}

// --- Fungsi untuk Menampilkan Hasil Akhir Kuis ---
function tampilkanHasil() {
    kuisArea.classList.add("hidden"); // Sembunyikan area kuis
    hasilAkhirElement.classList.remove("hidden"); // Tampilkan area hasil
    hasilText.innerText = `Skor kamu: ${jawabanBenar} dari ${totalSoalDikerjakan} soal.`;
}

// --- Fungsi untuk Mengganti Mata Pelajaran ---
function gantiMapel(mapel) {
    mataPelajaran = mapel;
    // Reset state kuis
    indexSoal = 0;
    totalSoalDikerjakan = 0;
    jawabanBenar = 0;
    updateStats();
    
    // Sembunyikan area pilihan mata pelajaran, dan tampilkan area kuis
    subjectArea.classList.add("hidden");
    kuisArea.classList.remove("hidden");
    
    // Tampilkan soal pertama
    tampilkanSoal();
}

// --- Fungsi untuk Kembali ke Tampilan Pilihan Mata Pelajaran ---
function kembaliKePilihan() {
    // Reset state kuis
    indexSoal = 0;
    mataPelajaran = null;
    
    // Sembunyikan area kuis dan hasil akhir
    kuisArea.classList.add("hidden");
    hasilAkhirElement.classList.add("hidden");
    
    // Tampilkan kembali area pilihan mata pelajaran
    subjectArea.classList.remove("hidden");
}

// --- Fungsi untuk Keluar dari Aplikasi ---
function logout() {
    // Reset semua state
    indexSoal = 0;
    mataPelajaran = null;
    totalSoalDikerjakan = 0;
    jawabanBenar = 0;
    username = '';
    
    // Tampilkan kembali area login
    loginArea.classList.remove("hidden");
    // Sembunyikan area lain
    subjectArea.classList.add("hidden");
    kuisArea.classList.add("hidden");
    hasilAkhirElement.classList.add("hidden");
    usernameDisplay.classList.add("hidden");
    logoutButton.classList.add("hidden");
    
    // Bersihkan input
    usernameInput.value = '';
}


// Panggil fungsi untuk menampilkan area login saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    updateStats(); // Inisialisasi statistik awal
    // Tampilan awal adalah loginArea, jadi tidak perlu menyembunyikan atau menampilkan apapun.
});
