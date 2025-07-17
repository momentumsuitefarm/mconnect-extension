# 📺 MConnect Ekran Yayını Kayıt Uzantısı

MConnect, HTML sayfalarında bulunan yayın yapan `video`, `canvas` veya `div` elementlerini tespit ederek bunların ekran kaydını alan ve `.webm` formatında yerel olarak kaydeden bir **Chrome uzantısıdır**.

---

## 🚀 Özellikler

- Otomatik olarak `video`, `canvas` ve `div` gibi yayın elemanlarını algılar.
- MediaRecorder API ile ekran kaydını başlatır ve durdurur.
- Popup arayüzü üzerinden tek tıkla kontrol.
- `chrome.runtime` mesajlaşması üzerinden arka plan ile iletişim.
- Elde edilen kayıtlar `.webm` formatında indirilir.

---

## 🧩 Kurulum ve Geliştirme

### 1. Bu projeyi klonla veya indir:

```bash
git clone https://github.com/kullaniciadi/mconnect-extension.git
cd mconnect-extension
```

### 2. Chrome'a yükle:

1. Chrome'da `chrome://extensions/` sayfasına git  
2. Sağ üstten **Geliştirici modunu** aç  
3. **Paketlenmemiş uzantı yükle**'ye tıkla  
4. Bu klasörü (`mconnect-extension`) seç

---

## 📁 Dosya Yapısı

```text
mconnect-extension/
│
├── manifest.json         # Uzantının yapılandırma dosyası
├── popup.html            # Kullanıcı arayüzü
├── popup.js              # Popup arayüzünün JS işlevleri
├── background.js         # Arka plan işlemleri (başlat/durdur)
├── content.js            # Sayfa üzerindeki medya öğelerini tarayan içerik betiği
├── recorder.js           # Kayıt işlemlerini yöneten modül
└── icon.png              # Uzantı simgesi
```

---

## ⚠️ Bilinen Kısıtlamalar

- `chrome://` sayfalarında çalışmaz (Chrome güvenlik kısıtlaması).
- Kayıt sadece `video`, `canvas` veya `div` gibi görsel öğeler üzerinden yapılır.

---

## 📦 Geliştirici Notları

- Kod `Content Security Policy` uyumluluğu için inline script içermez.
- `MediaRecorder` API, tarayıcı desteğine göre farklılık gösterebilir.
- Video `.webm` olarak kaydedilir. Dilersen `.mp4`'e dönüştürmek için ffmpeg vb. araçlar kullanılabilir.

---

## 📝 Lisans

MIT License © [@tektashakan](https://github.com/tektashakan)


---

## 🙌 Katkıda Bulun

Pull request ve issue'lara her zaman açığız. Projeyi geliştirmek için katkılarınızı bekliyoruz!
