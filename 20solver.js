function duaPuluh(nilai) {
    return nilai > 19.99 && nilai < 20.01;
}

function hitung(a, b, op) {
    switch(op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': 
            if (b !== 0) return a / b;
            return 0;
        default: return 0;
    }
}

function cobaKombinasi(angka, ekspresi) {
    if (angka.length === 1) {
        if (duaPuluh(angka[0])) {
            return ekspresi[0] + "\n";
        }
        return "";
    }

    let hasil = "";
    for (let i = 0; i < angka.length; ++i) {
        for (let j = i + 1; j < angka.length; ++j) {
            // Menghapus angka kedua (j) dan menyimpan angka yang tersisa
            let angkaBaru = [];
            let ekspresiBaru = [];
            for (let k = 0; k < angka.length; ++k) {
                if (k !== i && k !== j) {
                    angkaBaru.push(angka[k]);
                    ekspresiBaru.push(ekspresi[k]);
                }
            }

            // Mencoba setiap operasi
            const operasi = ['+', '-', '*', '/'];
            for (let op of operasi) {
                let hasilHitung = hitung(angka[i], angka[j], op);
                let ekspresiHitung = `(${ekspresi[i]} ${op} ${ekspresi[j]})`;
                angkaBaru.push(hasilHitung);
                ekspresiBaru.push(ekspresiHitung);
                hasil += cobaKombinasi(angkaBaru, ekspresiBaru);
                angkaBaru.pop();
                ekspresiBaru.pop();

                // Mencoba operasi dengan urutan yang terbalik
                if (op === '-' || op === '/') {
                    hasilHitung = hitung(angka[j], angka[i], op);
                    ekspresiHitung = `(${ekspresi[j]} ${op} ${ekspresi[i]})`;
                    angkaBaru.push(hasilHitung);
                    ekspresiBaru.push(ekspresiHitung);
                    hasil += cobaKombinasi(angkaBaru, ekspresiBaru);
                    angkaBaru.pop();
                    ekspresiBaru.pop();
                }
            }
        }
    }
    return hasil;
}

// Fungsi utama
function main() {
    let angka = [];
    let ekspresi = [];
    
    console.log("Masukkan 4 Angka:");
    for (let i = 0; i < 4; ++i) {
        let input = prompt(`Angka ke - ${i + 1}:`);
        let num = parseFloat(input);
        angka.push(num);
        ekspresi.push(num.toString());
    }
    
    let hasil = cobaKombinasi(angka, ekspresi);
    if (!hasil) {
        console.log("Tidak ada solusi ditemukan untuk 20.");
    } else {
        console.log("Solusi ditemukan:\n" + hasil);
    }
}

main();
