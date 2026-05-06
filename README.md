# Pluxee Mobile App Redesign

Pluxee Türkiye uygulamasının alternatif bir varyasyonu. React Native + Expo ile geliştirilmiş, mock backend ile çalışan, modüler bir mobil uygulama projesi.

> ⚠️ Bu proje resmi Pluxee uygulaması değildir. Eğitim ve portfolio amaçlı bir yeniden tasarım çalışmasıdır.

## 🏗️ Proje Yapısı

Bu proje **monorepo** olarak yapılandırılmıştır. İki ana paket içerir:

```
pluxee-mobile-app-redesign/
├── packages/
│   ├── design-system/      # Bağımsız design system paketi
│   └── mobile-app/         # Pluxee mobil uygulaması (Expo)
├── package.json            # Root workspace
└── tsconfig.json           # Root TS config
```

### `@pluxee/design-system`

Pluxee'nin design system'ini React Native'e taşıyan bağımsız paket. Bu paketi başka projelerde de kullanabilirsiniz.

İçerik:

- 134 core color token
- 35 typography token (TT Travels font)
- 120+ semantic token
- Spacing, radius, shadow scale'leri
- 225 illustration registry
- Atom componentleri (Button, Text, Input, vb.)

### `@pluxee/mobile-app`

Pluxee uygulamasının kendisi. Design system'i tüketir, mock backend ile çalışır.

## 🚀 Başlangıç

### Önkoşullar

- Node.js 18+ (önerilen: v20 LTS)
- npm 9+
- Expo Go uygulaması (telefonda)

### Kurulum

```bash
# Repo'yu klonla
git clone <repo-url>
cd pluxee-mobile-app-redesign

# Tüm bağımlılıkları yükle
npm install

# Mobil uygulamayı başlat (Expo)
npm run app:start
```

## 📜 Komutlar

### Root komutları (tüm paketleri etkiler)

| Komut | Açıklama |
|-------|----------|
| `npm run lint` | Tüm paketleri lint et |
| `npm run lint:fix` | Lint hatalarını otomatik düzelt |
| `npm run format` | Tüm dosyaları Prettier ile formatla |
| `npm run format:check` | Formatlama kontrolü (CI için) |

### Design system komutları

| Komut | Açıklama |
|-------|----------|
| `npm run ds:typecheck` | Design system TypeScript kontrolü |
| `npm run ds:lint` | Sadece design system lint |
| `npm run ds:format` | Sadece design system format |

## 🎨 Design System Felsefesi

Pluxee'nin web design system'i (https://designsystem.pluxee.app) baz alınarak React Native'e adapte edilmiştir. Atomic Design metodolojisi (Atoms → Molecules → Organisms) takip edilir.

**Token sistemi:**

- **Core tokens**: Ham renk/spacing değerleri (`core.confidentlyCoral.7`)
- **Semantic tokens**: Bağlamsal anlamlı isimler (`semantic.cta.primary`)
- **Component'ler**: Sadece semantic token kullanır

## 🤝 Çalışma Prensipleri

- **Kod**: İngilizce
- **Yorumlar**: Türkçe (anlaşılırlık için)
- **Function components only** (class yok)
- **Named exports** > default exports
- **Asla raw hex/magic number** yazma — her zaman token kullan

## 📦 Tech Stack

- **Framework**: React Native + Expo SDK
- **Dil**: TypeScript (strict mode)
- **State**: Zustand
- **Forms**: React Hook Form + Zod
- **Navigation**: React Navigation
- **Mock Backend**: MSW (Mock Service Worker)
- **Styling**: StyleSheet + design system tokens
- **SVG**: react-native-svg
- **Code Quality**: ESLint + Prettier

## 📝 Lisans

UNLICENSED — Eğitim/portfolio amaçlı kişisel proje.