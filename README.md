# ALIAA - Adaptive Learning & Interview Assessment App

ALIAA est une plateforme d'évaluation adaptative pour développeurs qui **n'évalue pas un langage, mais ta façon de penser, décider et raisonner**.

Contrairement aux tests techniques classiques :

- ✅ Focus sur le **raisonnement** et les **décisions**
- ✅ Parcours **100% adaptatif** (jamais le même)
- ✅ Questions générées via **templates intelligents**
- ✅ Évaluation **multi-dimensionnelle** (architecture, algo, production, frameworks)

## 🚀 Fonctionnalités

### Parcours Personnalisé

- **3 tracks** : Frontend, Backend, Full-stack
- **3 niveaux** : Junior, Intermédiaire, Avancé
- **3 modes** : Révision, Entretien, Challenge

### Système Adaptatif

- Le niveau de difficulté **évolue en temps réel** selon tes réponses
- Questions ciblées sur tes **faiblesses**
- Modules débloqués progressivement

### Contenu Riche

- **Concepts pédagogiques** (textes courts et denses)
- **Centaines de questions** générées dynamiquement
- **8 modules** couvrant :
  - Raisonnement & fondamentaux
  - Architecture & séparation
  - Algorithmes & structures
  - Patterns asynchrones
  - Frontend/Backend avancé
  - Frameworks & outils
  - Production & déploiement

### Évaluation Complète

- **Score pondéré** par catégorie
- **Profil de compétences** détaillé
- **Top 100** sauvegardé localement
- Analyse forces/faiblesses

## 🛠️ Stack Technique

### Architecture

```
/
├── index.html    (Structure HTML sémantique)
├── style.css     (Animations & styles custom)
└── app.js        (Moteur complet : données + logique + UI)
```

### Technologies

- **HTML5** sémantique
- **Tailwind CSS** (CDN) pour le design
- **Vanilla JavaScript** pur (pas de framework)
- **LocalStorage** pour persistence
- **Google Fonts** (Syne + DM Mono)

### Points Techniques Forts

#### 1. Génération Dynamique de Questions

```javascript
// Template de question avec variations infinies
generateQuestion: () => {
  const scenarios = [...];
  const scenario = scenarios[random()];

  return {
    question: `Dans ${scenario}...`,
    choices: [...],
    correct: [...],
    explanation: "..."
  };
}
```

#### 2. Moteur Adaptatif

```javascript
// Le niveau évolue selon les performances
if (consecutiveCorrect >= 3) {
  adaptiveLevel = nextLevel(); // Monte la difficulté
}
if (consecutiveWrong >= 2) {
  adaptiveLevel = previousLevel(); // Réduit la difficulté
}
```

#### 3. Système de Modules

- Conditionnels (débloqués selon score)
- Hiérarchisés (fondamentaux → avancé)
- Contextuels (track-specific)

## 🧠 Architecture Logique

### Flow UX

```
Landing
  ↓
Profil (Track + Level + Mode)
  ↓
Roadmap personnalisée
  ↓
Module 1 (Concepts + Questions)
  ↓
Module 2...
  ↓
Résultat (Score + Profil + Top 100)
```

## 📊 Métriques & Analytics

### Tracking

- Score global et par catégorie
- Temps de réponse par question
- Taux de réussite par module
- Forces/faiblesses identifiées

### Adaptation

- Niveau adaptatif en temps réel
- Sélection intelligente des questions
- Pondération selon historique

### Extensions Possibles

- [ ] Backend pour persistence cloud
- [ ] Partage social des résultats
- [ ] Mode multijoueur / compétition
- [ ] Export PDF du profil
- [ ] API pour intégration entreprise
- [ ] Analytics avancées
- [ ] Plus de langages (Python, etc.)

---

**ALIAA** - _Parce que le code, c'est avant tout une façon de penser._
