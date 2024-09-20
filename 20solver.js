const readline = require('readline');

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
            let angkaBaru = [];
            let ekspresiBaru = [];
            for (let k = 0; k < angka.length; ++k) {
                if (k !== i && k !== j) {
                    angkaBaru.push(angka[k]);
                    ekspresiBaru.push(ekspresi[k]);
                }
            }

            const operasi = ['+', '-', '*', '/'];
            for (let op of operasi) {
                if (op === '/' && angka[j] === 0) continue; 
                let hasilHitung = hitung(angka[i], angka[j], op);
                let ekspresiHitung = `(${ekspresi[i]} ${op} ${ekspresi[j]})`;
                angkaBaru.push(hasilHitung);
                ekspresiBaru.push(ekspresiHitung);
                hasil += cobaKombinasi(angkaBaru, ekspresiBaru);
                angkaBaru.pop();
                ekspresiBaru.pop();

                if ((op === '-' || op === '/') && angka[i] !== 0) { 
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
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let angka = [];
    let ekspresi = [];
    let inputCount = 0;

    function getInput() {
        if (inputCount < 4) {
            rl.question(`Angka ke - ${inputCount + 1}: `, (input) => {
                let num = parseFloat(input);
                angka.push(num);
                ekspresi.push(num.toString());
                inputCount++;
                getInput();
            });
        } else {
            let hasil = cobaKombinasi(angka, ekspresi);
            if (!hasil) {
                console.log("Tidak ada solusi ditemukan untuk 20.");
            } else {
                console.log("Solusi ditemukan:\n" + hasil);
            }
            rl.close();
        }
    }

    console.log("Masukkan 4 Angka:");
    getInput();
}

main();
