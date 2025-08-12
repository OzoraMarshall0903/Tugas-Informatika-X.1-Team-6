// File: soal_bank_kelas10.js

// Objek `soalBank` yang berisi semua pertanyaan untuk setiap mata pelajaran.
// Data ini sekarang berada di file terpisah untuk menjaga `script.js` tetap rapi.
const soalBank = {
    matematika: [
      {
        tipe: "pilihan",
        soal: "Hasil dari $(3x^2 - 2x + 5) + (2x^2 + 4x - 3)$ adalah...",
        pilihan: ["$5x^2 + 2x + 2$", "$x^2 + 2x + 8$", "$5x^2 + 6x + 2$", "$x^2 + 6x + 8$"],
        jawaban: "$5x^2 + 2x + 2$",
        penjelasan: "Jumlahkan koefisien yang memiliki pangkat yang sama: $3x^2+2x^2 = 5x^2$, $-2x+4x = 2x$, dan $5+(-3) = 2$."
      },
      {
        tipe: "pilihan",
        soal: "Jika $f(x) = 2x - 1$, maka $f(3)$ adalah...",
        pilihan: ["5", "6", "7", "4"],
        jawaban: "5",
        penjelasan: "Substitusikan $x=3$ ke dalam fungsi: $f(3) = 2(3) - 1 = 6 - 1 = 5$."
      },
      {
        tipe: "essay",
        soal: "Sebutkan rumus umum fungsi kuadrat!",
        jawaban: "$f(x) = ax^2 + bx + c$",
        penjelasan: "Rumus umum fungsi kuadrat adalah $f(x) = ax^2 + bx + c$, dengan $a, b, c$ adalah konstanta dan $a \\ne 0$."
      },
      {
        tipe: "essay",
        soal: "Apa yang dimaksud dengan 'akar-akar persamaan kuadrat'?",
        jawaban: "nilai-nilai x yang menjadikan persamaan bernilai nol",
        penjelasan: "Akar-akar persamaan kuadrat adalah nilai-nilai x yang memenuhi persamaan, yaitu nilai x yang membuat $f(x)=0$."
      },
      {
        tipe: "pilihan",
        soal: "Penyelesaian dari persamaan linear $2x - 5 = 7$ adalah...",
        pilihan: ["$x=1$", "$x=3$", "$x=6$", "$x=8$"],
        jawaban: "$x=6$",
        penjelasan: "$2x = 7 + 5 \\implies 2x = 12 \\implies x = 6$"
      }
    ],
  
    biologi: [
      {
        tipe: "pilihan",
        soal: "Apa fungsi mitokondria dalam sel?",
        pilihan: [
          "Mengatur keluar masuknya zat",
          "Sintesis protein",
          "Respirasi seluler",
          "Mengatur pembelahan sel"
        ],
        jawaban: "Respirasi seluler",
        penjelasan: "Mitokondria berfungsi sebagai 'pembangkit energi' bagi sel, menghasilkan energi melalui proses respirasi seluler."
      },
      {
        tipe: "essay",
        soal: "Jelaskan perbedaan utama sel hewan dan sel tumbuhan!",
        jawaban: "Sel tumbuhan memiliki dinding sel dan kloroplas, sedangkan sel hewan tidak",
        penjelasan: "Sel tumbuhan memiliki ciri khas berupa dinding sel dan kloroplas untuk fotosintesis, yang tidak dimiliki oleh sel hewan."
      },
      {
        tipe: "pilihan",
        soal: "Proses pembuatan makanan pada tumbuhan dengan bantuan cahaya matahari disebut...",
        pilihan: ["Respirasi", "Transpirasi", "Fotosintesis", "Fermentasi"],
        jawaban: "Fotosintesis",
        penjelasan: "Fotosintesis adalah proses di mana tumbuhan mengubah energi cahaya menjadi energi kimia, terutama di kloroplas."
      }
    ],
  
    bahasa_inggris: [
      {
        tipe: "pilihan",
        soal: "Choose the correct past tense of the verb 'go'",
        pilihan: ["goed", "goes", "went", "gone"],
        jawaban: "went",
        penjelasan: "'Go' adalah kata kerja tidak beraturan. Bentuk past tense-nya adalah 'went'."
      },
      {
        tipe: "essay",
        soal: "Write a sentence using the word 'beautiful'",
        jawaban: "She is a beautiful girl.",
        penjelasan: "Kalimat yang menggunakan kata 'beautiful' sebagai kata sifat."
      },
      {
        tipe: "pilihan",
        soal: "What is the correct sentence structure for a simple present tense question?",
        pilihan: ["Do/Does + Subject + Verb + ...?", "Subject + Do/Does + Verb + ...?", "Verb + Subject + ...?", "Do/Does + Verb + Subject + ...?"],
        jawaban: "Do/Does + Subject + Verb + ...?",
        penjelasan: "Rumus untuk pertanyaan simple present tense adalah Do/Does diikuti subjek dan kata kerja bentuk dasar (base form)."
      }
    ]
  };
