# 📱 Agriguilder Mobile

**Agriguilder Mobile** est la version mobile de l’application Agriguilder, une solution métier destinée aux coopératives agricoles (CUMA) pour la gestion des interventions, du matériel, et de la traçabilité entre adhérents.

Cette application a été développée avec **React Native** (via **Expo**) et s’intègre à l’API existante du back-office web.

---

## ✨ Fonctionnalités principales

- 🔐 Authentification des administrateurs de guilde
- 👥 Gestion des membres (ajout, édition, suppression)
- 🧰 Gestion du matériel et des outils partagés
- 📅 Déclaration et modification d'interventions
- 📊 Consultation des contestations et validations
- 📱 Interface mobile adaptée aux besoins des CUMA

---

## 🛠️ Stack technique

- **Frontend** : React Native via Expo
- **Langage** : TypeScript
- **Navigation** : `@react-navigation/native`
- **State Management** : Context API
- **UI Customisée** : Composants `AppButton`, `AppText`, `AppInput`, etc.
- **Stockage local** : `expo-secure-store` pour les tokens

---

## 🚀 Installation

### Prérequis

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Un smartphone avec l'app **Expo Go** OU un émulateur Android/iOS configuré

### Étapes

```bash
git clone https://github.com/MajorDown/agriguilder-mobile.git
cd agriguilder-mobile
npm install
npx expo start
```

Ensuite, scanne le QR Code avec **Expo Go** (sur Android ou iOS).

---

## 📁 Structure du projet

```
agriguilder-mobile/
├── assets/                 # Fichiers statiques
├── components/            # Composants réutilisables
│   ├── buttons/
│   ├── inputs/
│   ├── texts/
│   └── AppModal.tsx
├── constants/             # Types, couleurs, constantes globales
├── contexts/              # Context API (admin, etc.)
├── hooks/                 # Custom hooks (useAdminData, etc.)
├── screens/               # Écrans principaux de l'application
├── utils/                 # Fonctions de requêtes API, helpers
├── App.tsx                # Point d’entrée de l’application
└── app.json               # Configuration Expo
```

---

## 🔐 Sécurité

L’application utilise **SecureStore** d’Expo pour stocker les tokens d’authentification de manière sécurisée sur l’appareil.

---

## 📡 API

L’app consomme une API REST sécurisée (JWT Bearer Token) déployée sur [agriguilder.com/api](https://agriguilder.com/api).  
Les endpoints sont définis dans `utils/requests/`.

---

## 🤝 Contributions

Ce dépôt n’est pas ouvert aux contributions publiques pour le moment.  
Pour toute suggestion ou bug, contacter directement le développeur.

---

## 🧑‍💻 Auteur

Romain Fouillaron  
🌍 [romainfouillarondev.fr](https://romainfouillarondev.fr)  
📧 romain.fouillaron@gmx.fr  
💼 [LinkedIn](https://www.linkedin.com/in/romain-fouillaron/)  
🐙 [GitHub](https://github.com/MajorDown)

---

## ⚖️ Licence

Ce projet est sous licence MIT.