const express = require('express');
const sql = require('mssql');

const app = express();
const port = 3000;

// Veritabanı bağlantı dizesi
const config = {
  user: 'u0518116_ilyas',
  password: 'ilyAS*2022*Bilgic',
  server: '94.73.151.2',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  database: 'u0518116_SecDB',
};

// Verileri getirmek için bir endpoint oluşturuluyor
app.get('/login', async (req, res) => {
  try {
    // Parametrelerin alınması
    const userName = req.query.userName;
    const password = req.query.password;

    // Veritabanına bağlanılıyor
    await sql.connect(config);

    // Sorgu ve parametrelerin hazırlanması
    const query = `SELECT * FROM KULLANICI WHERE KULLANICIADI = '${userName}' AND SIFRE = '${password}'`;
    const result = await sql.query(query);

    // Sonuçlar JSON formatına dönüştürülüyor
    const data = JSON.stringify(result.recordset);

    // Sonuçları gönderiliyor
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send('Bir hata oluştu');
  }
});

// Uygulama belirtilen portta dinlemeye başlıyor
app.listen(3000, () => {
  console.log(`Uygulama http://localhost:${port} adresinde çalışıyor`);
});
