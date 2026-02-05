/****************************************************
 * ALIAA – Adaptive Learning & Interview Assessment
 * 
 * Architecture:
 * 1. DATA: Modules, concepts, question templates
 * 2. ENGINE: Session, adaptation, scoring
 * 3. UI: Multi-step flow, animations
 * 4. STORAGE: localStorage pour scores
 ****************************************************/

/* ===================================================
   THEME MANAGEMENT
   =================================================== */

function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.contains('dark');
  
  if (isDark) {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
}

/* ===================================================
   SECTION 1: DONNÉES - MODULES & CONCEPTS
   =================================================== */

// Concepts pédagogiques (textes courts et denses)
const CONCEPTS = {
  reasoning_basics: {
    id: "reasoning_basics",
    title: "Penser en développeur",
    texts: [
      "Un bon développeur ne se distingue pas par ce qu'il code, mais par ce qu'il choisit de ne pas coder.",
      "La solution la plus simple qui fonctionne est souvent meilleure que la solution la plus élégante.",
      "Comprendre le problème vaut mieux que se précipiter sur le clavier."
    ]
  },
  
  separation_concerns: {
    id: "separation_concerns",
    title: "Séparer les responsabilités",
    texts: [
      "Un code peut fonctionner tout en étant mal structuré.",
      "La séparation des responsabilités n'est pas une règle, c'est un raisonnement.",
      "Un code couplé est difficile à tester, maintenir et faire évoluer."
    ]
  },
  
  decision_quality: {
    id: "decision_quality",
    title: "Qualité des décisions",
    texts: [
      "Un développeur senior se distingue par la qualité de ses décisions, pas par la vitesse de son code.",
      "Chaque choix technique a un coût. L'ignorer est une erreur.",
      "Une bonne architecture facilite le changement. Une mauvaise le combat."
    ]
  },
  
  framework_wisdom: {
    id: "framework_wisdom",
    title: "Frameworks : outils ou béquilles ?",
    texts: [
      "Un framework accélère le développement mais n'efface pas les mauvaises décisions.",
      "Maîtriser les fondamentaux avant d'adopter des abstractions.",
      "La dépendance à un outil est un risque technique qu'il faut évaluer."
    ]
  },
  
  production_reality: {
    id: "production_reality",
    title: "La réalité de la production",
    texts: [
      "Ce qui marche en local n'est qu'une première étape.",
      "Les bugs en production révèlent la qualité réelle du code.",
      "La maintenabilité compte plus que la performance dans 90% des cas."
    ]
  },
  
  algo_thinking: {
    id: "algo_thinking",
    title: "Penser algorithmes",
    texts: [
      "L'algorithme parfait n'existe pas. Seul le contexte dicte le choix.",
      "La complexité n'est pas toujours où on le pense.",
      "Un code lisible vaut mieux qu'un code optimisé prématurément."
    ]
  }
};

// Templates de questions (générateurs)
const QUESTION_TEMPLATES = {
  // REASONING - Questions de raisonnement pur
  bug_strategy: {
    track: ["front", "back", "full"],
    level: "junior",
    category: "reasoning",
    type: "qcm",
    generateQuestion: () => {
      const bugs = [
        { context: "en production", impact: "les utilisateurs réels" },
        { context: "en staging", impact: "l'équipe QA" },
        { context: "intermittent", impact: "un module difficile à reproduire" },
        { context: "critique", impact: "les paiements bloqués" }
      ];
      
      const bug = bugs[Math.floor(Math.random() * bugs.length)];
      
      return {
        question: `Un bug ${bug.context} affecte ${bug.impact}. Quelle est la meilleure première action ?`,
        choices: [
          "Ajouter des logs ciblés pour comprendre",
          "Réécrire immédiatement le module",
          "Ignorer tant que ça fonctionne parfois",
          "Multiplier les try/catch partout"
        ],
        correct: [0],
        explanation: "Comprendre le problème avant d'agir. Les logs permettent de diagnostiquer sans casser ce qui fonctionne.",
        score: 10,
        trap: true
      };
    }
  },
  
  logic_in_ui: {
    track: ["front", "full"],
    level: "junior",
    category: "architecture",
    type: "qcm",
    generateQuestion: () => {
      const scenarios = [
        "une logique métier complexe",
        "des calculs de prix",
        "la validation métier",
        "des règles de gestion"
      ];
      
      const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
      
      return {
        question: `Quel est le principal risque de mettre ${scenario} directement dans l'UI ?`,
        choices: [
          "Le code devient difficile à tester et réutiliser",
          "L'application sera plus lente",
          "Le navigateur peut planter",
          "Le CSS sera plus complexe"
        ],
        correct: [0],
        explanation: "La séparation logique/UI facilite les tests, la maintenance et la réutilisation.",
        score: 10,
        trap: false
      };
    }
  },
  
  best_practice_trap: {
    track: ["front", "back", "full"],
    level: "intermediate",
    category: "reasoning",
    type: "qcm",
    generateQuestion: () => {
      const practices = [
        { practice: "toujours utiliser des design patterns", trap: "over-engineering" },
        { practice: "optimiser chaque ligne de code", trap: "optimisation prématurée" },
        { practice: "suivre strictement les conventions", trap: "dogmatisme" },
        { practice: "écrire des tests pour tout", trap: "tests inutiles" }
      ];
      
      const p = practices[Math.floor(Math.random() * practices.length)];
      
      return {
        question: `Quelle affirmation est la plus proche de la réalité ?`,
        choices: [
          `Il faut ${p.practice}`,
          `Il ne faut jamais ${p.practice}`,
          `Ça dépend du contexte et des contraintes`,
          `C'est une question de préférence personnelle`
        ],
        correct: [2],
        explanation: `Le contexte prime toujours. ${p.trap} peut être pire que l'absence de pratique.`,
        score: 15,
        trap: true
      };
    }
  },
  
  // FRONTEND SPECIFIC
  state_management: {
    track: ["front", "full"],
    level: "intermediate",
    category: "architecture",
    type: "qcm",
    generateQuestion: () => {
      return {
        question: "Dans une application complexe, où doit vivre l'état métier ?",
        choices: [
          "Dans les composants UI pour simplicité",
          "Dans un store global centralisé",
          "Ça dépend du scope et de la durée de vie",
          "Dans l'URL pour la persistance"
        ],
        correct: [2],
        explanation: "État local pour ce qui est éphémère et isolé, global pour ce qui est partagé. L'architecture doit servir les besoins, pas l'inverse.",
        score: 15,
        trap: true
      };
    }
  },
  
  render_performance: {
    track: ["front", "full"],
    level: "advanced",
    category: "performance",
    type: "qcm",
    generateQuestion: () => {
      return {
        question: "Une liste de 10000 items est lente à afficher. Quelle approche est la meilleure ?",
        choices: [
          "Virtualiser l'affichage (seulement le visible)",
          "Optimiser chaque composant individuellement",
          "Passer à un framework plus rapide",
          "Ajouter des Web Workers"
        ],
        correct: [0],
        explanation: "La virtualisation (windowing) ne rend que ce qui est visible. C'est le pattern optimal pour les grandes listes.",
        score: 20,
        trap: false
      };
    }
  },
  
  // BACKEND SPECIFIC
  data_validation: {
    track: ["back", "full"],
    level: "junior",
    category: "security",
    type: "qcm",
    generateQuestion: () => {
      return {
        question: "L'utilisateur envoie des données. Où doit se faire la validation principale ?",
        choices: [
          "Uniquement côté client pour l'UX",
          "Uniquement côté serveur pour la sécurité",
          "Les deux : client pour UX, serveur pour sécurité",
          "Ça dépend de la criticité des données"
        ],
        correct: [2],
        explanation: "Le client peut toujours être contourné. La validation serveur est obligatoire pour la sécurité. Le client améliore l'expérience.",
        score: 10,
        trap: false
      };
    }
  },
  
  error_handling: {
    track: ["back", "full"],
    level: "intermediate",
    category: "robustness",
    type: "qcm",
    generateQuestion: () => {
      return {
        question: "Une API externe peut échouer. Comment gérer ça proprement ?",
        choices: [
          "Try/catch global et retourner une erreur 500",
          "Retry automatique infini jusqu'à succès",
          "Circuit breaker + fallback + logging",
          "Ignorer l'erreur et continuer"
        ],
        correct: [2],
        explanation: "Circuit breaker évite de surcharger un service défaillant, fallback assure la continuité, logging permet le diagnostic.",
        score: 20,
        trap: false
      };
    }
  },
  
  database_choice: {
    track: ["back", "full"],
    level: "advanced",
    category: "architecture",
    type: "qcm",
    generateQuestion: () => {
      return {
        question: "Comment choisir entre SQL et NoSQL pour un nouveau projet ?",
        choices: [
          "SQL est toujours meilleur pour la cohérence",
          "NoSQL est toujours plus scalable",
          "Analyser les besoins: relations, schéma, scale, requêtes",
          "Prendre ce que l'équipe connaît"
        ],
        correct: [2],
        explanation: "Chaque type de BDD a ses forces. Le choix dépend des besoins réels du projet, pas des tendances.",
        score: 20,
        trap: true
      };
    }
  },
  
  // ALGORITHMES
  array_search: {
    track: ["front", "back", "full"],
    level: "junior",
    category: "algorithms",
    type: "qcm",
    generateQuestion: () => {
      return {
        question: "Pour chercher un élément dans un tableau trié de 1 million d'items, quelle méthode est optimale ?",
        choices: [
          "Parcourir tout le tableau (linear search)",
          "Recherche binaire (binary search)",
          "Trier d'abord puis chercher",
          "Utiliser un Map/Set"
        ],
        correct: [1],
        explanation: "Sur un tableau trié, la recherche binaire est O(log n) vs O(n) pour linear. C'est le pattern optimal ici.",
        score: 15,
        trap: false
      };
    }
  },
  
  complexity_trap: {
    track: ["front", "back", "full"],
    level: "intermediate",
    category: "algorithms",
    type: "qcm",
    generateQuestion: () => {
      const scenarios = [
        { code: "deux boucles séparées O(n) + O(n)", result: "O(n)" },
        { code: "une boucle dans une boucle O(n²)", result: "O(n²)" },
        { code: "tri puis recherche O(n log n) + O(log n)", result: "O(n log n)" }
      ];
      
      const s = scenarios[Math.floor(Math.random() * scenarios.length)];
      
      return {
        question: `Quelle est la complexité finale de: ${s.code} ?`,
        choices: [
          "O(1) - Constant",
          s.result,
          "O(2^n) - Exponentiel",
          "Impossible à déterminer"
        ],
        correct: [1],
        explanation: `En Big O, on garde le terme dominant. ${s.code} → ${s.result}`,
        score: 15,
        trap: true
      };
    }
  },
  
  optimization_timing: {
    track: ["front", "back", "full"],
    level: "advanced",
    category: "performance",
    type: "qcm",
    generateQuestion: () => {
      return {
        question: "Le code fonctionne mais est lent. Quelle est la première étape ?",
        choices: [
          "Réécrire en utilisant des algorithmes plus rapides",
          "Profiler pour identifier le vrai goulot d'étranglement",
          "Passer à un langage plus performant",
          "Optimiser toutes les boucles"
        ],
        correct: [1],
        explanation: "L'optimisation prématurée est la racine du mal. Toujours mesurer avant d'optimiser. 90% du temps est souvent dans 10% du code.",
        score: 20,
        trap: false
      };
    }
  },
  
  // PIÈGES & EDGE CASES
  null_undefined: {
    track: ["front", "back", "full"],
    level: "junior",
    category: "edge_cases",
    type: "qcm",
    generateQuestion: () => {
      return {
        question: "Quelle est la différence entre null et undefined en JavaScript ?",
        choices: [
          "Aucune, c'est pareil",
          "undefined = absence, null = valeur intentionnellement vide",
          "null est un bug, undefined est normal",
          "undefined est plus rapide que null"
        ],
        correct: [1],
        explanation: "undefined = la variable existe mais n'a pas de valeur. null = valeur explicitement vide (assignée).",
        score: 10,
        trap: false
      };
    }
  },
  
  async_order: {
    track: ["front", "back", "full"],
    level: "intermediate",
    category: "async",
    type: "qcm",
    generateQuestion: () => {
      return {
        question: "Dans quel ordre ces logs s'affichent ? console.log('1'); setTimeout(() => console.log('2'), 0); console.log('3');",
        choices: [
          "1, 2, 3",
          "1, 3, 2",
          "2, 1, 3",
          "Ça dépend de la machine"
        ],
        correct: [1],
        explanation: "Event loop: synchrone d'abord (1,3), puis callbacks (2). Même avec timeout 0, le callback attend la fin du call stack.",
        score: 15,
        trap: true
      };
    }
  },
  
  promise_catch: {
    track: ["front", "back", "full"],
    level: "advanced",
    category: "async",
    type: "qcm",
    generateQuestion: () => {
      return {
        question: "Quelle est la meilleure façon de gérer les erreurs avec async/await ?",
        choices: [
          "Wrapping global try/catch",
          "try/catch à chaque await",
          "Promise.catch() après chaque call",
          "Ça dépend du niveau de granularité voulu"
        ],
        correct: [3],
        explanation: "Granularité fine = try/catch par opération. Gestion globale = try/catch wrapper. Le contexte dicte le choix.",
        score: 20,
        trap: true
      };
    }
  },
  
  // FRAMEWORK QUESTIONS (débloquées après bases validées)
  react_rerender: {
    track: ["front", "full"],
    level: "intermediate",
    category: "frameworks",
    type: "qcm",
    condition: { minScore: 60 },
    generateQuestion: () => {
      return {
        question: "Qu'est-ce qui déclenche un re-render dans React ?",
        choices: [
          "Chaque modification de variable",
          "setState, props change, context change, forceUpdate",
          "Seulement setState",
          "Toutes les modifications du DOM"
        ],
        correct: [1],
        explanation: "React re-render sur les changements d'état, props, ou context. Les variables locales ne déclenchent rien.",
        score: 15,
        trap: false
      };
    }
  },
  
  framework_escape: {
    track: ["front", "back", "full"],
    level: "advanced",
    category: "frameworks",
    type: "qcm",
    condition: { minScore: 80 },
    generateQuestion: () => {
      return {
        question: "Un framework impose des patterns qui ne conviennent pas. Que faire ?",
        choices: [
          "Forcer le pattern à fonctionner quand même",
          "Changer de framework immédiatement",
          "Évaluer: est-ce un vrai problème ou un manque de compréhension ?",
          "Écrire du vanilla JavaScript à la place"
        ],
        correct: [2],
        explanation: "Souvent, la résistance vient d'une mauvaise compréhension. Si le problème persiste, réévaluer le choix technique.",
        score: 20,
        trap: true
      };
    }
  },
  
  // PRODUCTION & DEPLOYMENT
  env_variables: {
    track: ["back", "full"],
    level: "junior",
    category: "production",
    type: "qcm",
    generateQuestion: () => {
      return {
        question: "Où stocker les clés API et secrets en production ?",
        choices: [
          "Dans le code, c'est plus simple",
          "Dans des variables d'environnement sécurisées",
          "Dans un fichier .env committé",
          "Dans la base de données"
        ],
        correct: [1],
        explanation: "Les secrets ne doivent JAMAIS être dans le code ou versionné. Variables d'env + secret manager = standard.",
        score: 10,
        trap: false
      };
    }
  },
  
  logs_strategy: {
    track: ["back", "full"],
    level: "intermediate",
    category: "production",
    type: "qcm",
    generateQuestion: () => {
      return {
        question: "Quelle stratégie de logging en production ?",
        choices: [
          "Logger chaque requête et réponse",
          "Aucun log pour les performances",
          "Logs structurés avec niveaux (error, warn, info, debug)",
          "Console.log partout"
        ],
        correct: [2],
        explanation: "Logs structurés permettent le filtrage, l'analyse, et le debug sans noyer l'info. Éviter les logs excessifs ET insuffisants.",
        score: 15,
        trap: false
      };
    }
  },
  
  cache_invalidation: {
    track: ["front", "back", "full"],
    level: "advanced",
    category: "production",
    type: "qcm",
    generateQuestion: () => {
      return {
        question: "Pourquoi dit-on que l'invalidation de cache est un des problèmes les plus durs ?",
        choices: [
          "C'est une blague, c'est facile",
          "Car il faut équilibrer: fraîcheur vs performance, cohérence vs complexité",
          "Parce que les navigateurs sont imprévisibles",
          "C'est juste une question de TTL"
        ],
        correct: [1],
        explanation: "Trop de cache = données périmées. Pas assez = performances. Invalidation partielle = complexité. Il n'y a pas de solution universelle.",
        score: 20,
        trap: true
      };
    }
  }
};

// Modules structurés
const MODULES = [
  {
    id: "foundations",
    name: "Fondamentaux du raisonnement",
    description: "Comment penser en développeur",
    track: ["front", "back", "full"],
    level: "junior",
    concepts: ["reasoning_basics", "decision_quality"],
    questionCount: 5,
    templates: ["bug_strategy", "best_practice_trap", "null_undefined"]
  },
  {
    id: "architecture",
    name: "Architecture & séparation",
    description: "Structurer le code pour la maintenabilité",
    track: ["front", "back", "full"],
    level: "junior",
    concepts: ["separation_concerns"],
    questionCount: 5,
    templates: ["logic_in_ui", "data_validation", "state_management"]
  },
  {
    id: "algorithms",
    name: "Algorithmes & structures",
    description: "Raisonner sur la complexité",
    track: ["front", "back", "full"],
    level: "intermediate",
    concepts: ["algo_thinking"],
    questionCount: 5,
    templates: ["array_search", "complexity_trap", "optimization_timing"]
  },
  {
    id: "async_patterns",
    name: "Patterns asynchrones",
    description: "Maîtriser l'async et ses pièges",
    track: ["front", "back", "full"],
    level: "intermediate",
    concepts: ["decision_quality"],
    questionCount: 4,
    templates: ["async_order", "promise_catch", "error_handling"]
  },
  {
    id: "frontend_advanced",
    name: "Frontend avancé",
    description: "Performance, state, et patterns UI",
    track: ["front", "full"],
    level: "advanced",
    concepts: ["decision_quality"],
    questionCount: 4,
    templates: ["state_management", "render_performance"]
  },
  {
    id: "backend_advanced",
    name: "Backend avancé",
    description: "Scalabilité, sécurité, et robustesse",
    track: ["back", "full"],
    level: "advanced",
    concepts: ["production_reality"],
    questionCount: 4,
    templates: ["database_choice", "error_handling", "cache_invalidation"]
  },
  {
    id: "frameworks",
    name: "Frameworks & outils",
    description: "Utiliser sans dépendre",
    track: ["front", "back", "full"],
    level: "intermediate",
    unlockCondition: { minScore: 60 },
    concepts: ["framework_wisdom"],
    questionCount: 3,
    templates: ["react_rerender", "framework_escape"]
  },
  {
    id: "production",
    name: "Production & réalité",
    description: "Du local à la prod",
    track: ["back", "full"],
    level: "intermediate",
    concepts: ["production_reality"],
    questionCount: 4,
    templates: ["env_variables", "logs_strategy", "cache_invalidation"]
  }
];

/* ===================================================
   SECTION 2: MOTEUR - SESSION & LOGIQUE
   =================================================== */

// État global de la session
let SESSION = {
  // Config initiale
  track: null,              // "front" | "back" | "full"
  level: null,              // "junior" | "intermediate" | "advanced"
  mode: null,               // "normal" | "challenge"
  objective: null,          // "reviser" | "entretien" | "challenge"
  experience: null,         // "student" | "junior" | "confirmed" | "senior"
  
  // État du parcours
  currentScreen: "landing", // landing | profile | roadmap | module | result
  currentModule: null,
  currentModuleIndex: 0,
  currentQuestionIndex: 0,
  
  // Modules à parcourir (roadmap personnalisée)
  roadmap: [],
  
  // Questions de la session
  questions: [],
  currentQuestion: null,
  answeredQuestions: [],
  
  // Scoring
  score: 0,
  maxScore: 0,
  
  // Analytics
  strengths: {},
  weaknesses: {},
  categoryScores: {},
  
  // Time tracking
  startTime: null,
  questionStartTime: null,
  totalTime: 0,
  
  // Adaptation
  adaptiveLevel: null,
  consecutiveCorrect: 0,
  consecutiveWrong: 0
};

// Générer la roadmap personnalisée selon le profil
function generateRoadmap() {
  const { track, level } = SESSION;
  
  // Filtrer les modules compatibles
  let eligible = MODULES.filter(m => {
    // Vérifier track
    if (!m.track.includes(track)) return false;
    
    // Vérifier level (on inclut le niveau choisi et en-dessous)
    const levels = ["junior", "intermediate", "advanced"];
    const userLevelIndex = levels.indexOf(level);
    const moduleLevelIndex = levels.indexOf(m.level);
    
    return moduleLevelIndex <= userLevelIndex;
  });
  
  // Trier par niveau croissant
  eligible.sort((a, b) => {
    const levels = ["junior", "intermediate", "advanced"];
    return levels.indexOf(a.level) - levels.indexOf(b.level);
  });
  
  SESSION.roadmap = eligible;
  SESSION.adaptiveLevel = level;
}

// Générer les questions pour le module en cours
function generateQuestionsForModule(module) {
  const questions = [];
  const { track, adaptiveLevel } = SESSION;
  
  // Récupérer les templates du module
  const templates = module.templates || [];
  
  // Générer les questions
  templates.forEach(templateId => {
    const template = QUESTION_TEMPLATES[templateId];
    if (!template) return;
    
    // Vérifier les conditions (ex: score minimum)
    if (template.condition) {
      if (template.condition.minScore && SESSION.score < template.condition.minScore) {
        return;
      }
    }
    
    // Vérifier track compatibility
    if (template.track && !template.track.includes(track)) return;
    
    // Générer la question
    try {
      const question = template.generateQuestion();
      questions.push({
        ...question,
        id: `${templateId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        templateId,
        category: template.category,
        moduleId: module.id
      });
    } catch (e) {
      console.error("Erreur génération question:", templateId, e);
    }
  });
  
  // Mélanger les questions
  return shuffleArray(questions).slice(0, module.questionCount || 5);
}

// Sélectionner la prochaine question
function selectNextQuestion() {
  if (SESSION.currentQuestionIndex >= SESSION.questions.length) {
    return null; // Module terminé
  }
  
  const question = SESSION.questions[SESSION.currentQuestionIndex];
  SESSION.currentQuestion = question;
  SESSION.questionStartTime = Date.now();
  SESSION.maxScore += question.score;
  
  return question;
}

// Évaluer une réponse
function evaluateAnswer(selectedIndexes) {
  const question = SESSION.currentQuestion;
  if (!question) return null;
  
  const correct = question.correct;
  const isCorrect = 
    selectedIndexes.length === correct.length &&
    selectedIndexes.every(idx => correct.includes(idx));
  
  const gained = isCorrect ? question.score : 0;
  const timeSpent = Date.now() - SESSION.questionStartTime;
  
  // Enregistrer la réponse
  SESSION.answeredQuestions.push({
    questionId: question.id,
    correct: isCorrect,
    gained,
    timeSpent,
    selectedIndexes,
    expectedIndexes: correct
  });
  
  SESSION.score += gained;
  
  // Analytics par catégorie
  const cat = question.category;
  if (!SESSION.categoryScores[cat]) {
    SESSION.categoryScores[cat] = { correct: 0, total: 0 };
  }
  SESSION.categoryScores[cat].total++;
  if (isCorrect) {
    SESSION.categoryScores[cat].correct++;
    SESSION.strengths[cat] = (SESSION.strengths[cat] || 0) + 1;
  } else {
    SESSION.weaknesses[cat] = (SESSION.weaknesses[cat] || 0) + 1;
  }
  
  // Adaptation du niveau
  if (isCorrect) {
    SESSION.consecutiveCorrect++;
    SESSION.consecutiveWrong = 0;
    
    // Si 3 réponses correctes d'affilée, augmenter difficulté
    if (SESSION.consecutiveCorrect >= 3) {
      const levels = ["junior", "intermediate", "advanced"];
      const currentIdx = levels.indexOf(SESSION.adaptiveLevel);
      if (currentIdx < levels.length - 1) {
        SESSION.adaptiveLevel = levels[currentIdx + 1];
        console.log("Niveau adaptatif augmenté:", SESSION.adaptiveLevel);
      }
      SESSION.consecutiveCorrect = 0;
    }
  } else {
    SESSION.consecutiveWrong++;
    SESSION.consecutiveCorrect = 0;
    
    // Si 2 réponses fausses d'affilée, réduire difficulté
    if (SESSION.consecutiveWrong >= 2) {
      const levels = ["junior", "intermediate", "advanced"];
      const currentIdx = levels.indexOf(SESSION.adaptiveLevel);
      if (currentIdx > 0) {
        SESSION.adaptiveLevel = levels[currentIdx - 1];
        console.log("Niveau adaptatif réduit:", SESSION.adaptiveLevel);
      }
      SESSION.consecutiveWrong = 0;
    }
  }
  
  return {
    correct: isCorrect,
    gained,
    explanation: question.explanation,
    timeSpent
  };
}

// Passer au module suivant
function nextModule() {
  SESSION.currentModuleIndex++;
  
  if (SESSION.currentModuleIndex >= SESSION.roadmap.length) {
    // Fin de tous les modules
    SESSION.currentScreen = "result";
    SESSION.totalTime = Date.now() - SESSION.startTime;
    saveScore();
    return false;
  }
  
  SESSION.currentModule = SESSION.roadmap[SESSION.currentModuleIndex];
  SESSION.questions = generateQuestionsForModule(SESSION.currentModule);
  SESSION.currentQuestionIndex = 0;
  SESSION.currentScreen = "module";
  
  return true;
}

// Sauvegarder le score dans le Top 100
function saveScore() {
  const scores = JSON.parse(localStorage.getItem("aliaa_scores") || "[]");
  
  const newScore = {
    score: SESSION.score,
    maxScore: SESSION.maxScore,
    percentage: Math.round((SESSION.score / SESSION.maxScore) * 100),
    track: SESSION.track,
    level: SESSION.level,
    date: new Date().toISOString(),
    time: SESSION.totalTime,
    strengths: SESSION.strengths,
    weaknesses: SESSION.weaknesses
  };
  
  scores.push(newScore);
  scores.sort((a, b) => b.score - a.score);
  
  // Garder seulement top 100
  const top100 = scores.slice(0, 100);
  localStorage.setItem("aliaa_scores", JSON.stringify(top100));
}

// Utilitaires
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ===================================================
   SECTION 3: UI - RENDERING MULTI-STEP
   =================================================== */

const UI = {
  container: null,
  
  init() {
    this.container = document.getElementById("app");
    this.render();
  },
  
  render() {
    switch (SESSION.currentScreen) {
      case "landing":
        this.renderLanding();
        break;
      case "profile":
        this.renderProfile();
        break;
      case "roadmap":
        this.renderRoadmap();
        break;
      case "module":
        this.renderModule();
        break;
      case "question":
        this.renderQuestion();
        break;
      case "result":
        this.renderResult();
        break;
      default:
        this.renderLanding();
    }
  },
  
  // ÉCRAN 0: LANDING
  renderLanding() {
    this.container.innerHTML = `
      <div class="min-h-screen flex items-center justify-center p-6">
        <div class="max-w-4xl w-full animate-fade-in">
          
          <!-- Logo / Title -->
          <div class="text-center mb-12">
            <h1 class="font-display text-7xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
            </h1>
            <p class="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 font-mono">
              Adaptive Learning & Interview Assessment
            </p>
          </div>
          
          <!-- Introduction -->
          <div class="glass rounded-2xl p-8 md:p-12 mb-8 border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50">
            <p class="text-lg md:text-xl leading-relaxed text-neutral-700 dark:text-neutral-300 mb-6 text-center">
              <span class="text-blue-600 dark:text-blue-400 font-semibold">Ton esprit de développeur, à l’épreuve</span>
            </p>
            
            <div class="grid md:grid-cols-3 gap-6 mt-8">
              <div class="text-center">
                <p class="text-sm text-neutral-600 dark:text-neutral-400">Parcours adaptatif</p>
              </div>
              <div class="text-center">
                <p class="text-sm text-neutral-600 dark:text-neutral-400">Raisonnement > Syntaxe</p>
              </div>
              <div class="text-center">
                <p class="text-sm text-neutral-600 dark:text-neutral-400">Profil de compétences</p>
              </div>
            </div>
          </div>
          
          <!-- CTA -->
          <div class="text-center">
            <button 
              onclick="startAssessment()"
              class="btn-scan bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-12 py-5 rounded-xl transition-all transform hover:scale-105 hover:shadow-2xl"
            >
              Commencer l'évaluation
            </button>
          </div>
          
          <!-- Footer info -->
          <div class="mt-12 text-center text-sm text-neutral-500 dark:text-neutral-500">
            <p>Durée estimée: 15-25 minutes • Questions: 20-35 • Adaptatif en temps réel</p>
          </div>
          
        </div>
      </div>
    `;
  },
  
  // ÉCRAN 1: PROFIL
  renderProfile() {
    this.container.innerHTML = `
      <div class="min-h-screen flex items-center justify-center p-6">
        <div class="max-w-3xl w-full animate-slide-up">
          
          <div class="mb-8">
            <h2 class="font-display text-4xl font-bold mb-2">Configuration du profil</h2>
            <p class="text-neutral-600 dark:text-neutral-400">Ces choix déterminent ton parcours personnalisé</p>
          </div>
          
          <div class="space-y-8">
            
            <!-- Type de développeur -->
            <div class="glass rounded-xl p-6 border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50">
              <label class="block text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400">Type de développeur</label>
              <div class="grid grid-cols-3 gap-3">
                ${this.renderChoice("track", "front", "Frontend", "🎨")}
                ${this.renderChoice("track", "back", "Backend", "⚙️")}
                ${this.renderChoice("track", "full", "Full-stack", "🚀")}
              </div>
            </div>
            
            <!-- Niveau ciblé -->
            <div class="glass rounded-xl p-6 border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50">
              <label class="block text-lg font-semibold mb-4 text-cyan-600 dark:text-cyan-400">Niveau ciblé</label>
              <div class="grid grid-cols-3 gap-3">
                ${this.renderChoice("level", "junior", "Débutant", "🌱")}
                ${this.renderChoice("level", "intermediate", "Intermédiaire", "🌿")}
                ${this.renderChoice("level", "advanced", "Avancé", "🌳")}
              </div>
              <p class="text-xs text-neutral-500 mt-3">* Ce n'est pas "ton niveau réel", mais le niveau que tu veux tester</p>
            </div>
            
            <!-- Objectif -->
            <div class="glass rounded-xl p-6 border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50">
              <label class="block text-lg font-semibold mb-4 text-purple-600 dark:text-purple-400">Objectif</label>
              <div class="grid grid-cols-3 gap-3">
                ${this.renderChoice("objective", "reviser", "Réviser", "📚")}
                ${this.renderChoice("objective", "entretien", "Entretien", "💼")}
                ${this.renderChoice("objective", "challenge", "Challenge", "⚡")}
              </div>
            </div>
            
            <!-- Expérience (optionnel) -->
            <div class="glass rounded-xl p-6 border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50">
              <label class="block text-lg font-semibold mb-4 text-green-600 dark:text-green-400">Expérience (optionnel)</label>
              <div class="grid grid-cols-4 gap-3">
                ${this.renderChoice("experience", "student", "Étudiant", "🎓")}
                ${this.renderChoice("experience", "junior", "Junior", "🔰")}
                ${this.renderChoice("experience", "confirmed", "Confirmé", "✨")}
                ${this.renderChoice("experience", "senior", "Senior", "👑")}
              </div>
            </div>
            
          </div>
          
          <!-- Bouton continuer -->
          <div class="mt-8 flex justify-end">
            <button 
              id="continue-btn"
              onclick="continueToRoadmap()"
              class="bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-300 dark:disabled:bg-neutral-800 disabled:cursor-not-allowed text-white font-bold px-8 py-4 rounded-xl transition-all ${(!SESSION.track || !SESSION.level || !SESSION.objective) ? 'opacity-50' : ''}"
            >
              Continuer →
            </button>
          </div>
          
        </div>
      </div>
    `;
    
    // Mettre à jour l'état du bouton après le render
    this.updateContinueButton();
  },
  
  updateContinueButton() {
    const btn = document.getElementById("continue-btn");
    if (btn) {
      btn.disabled = !SESSION.track || !SESSION.level || !SESSION.objective;
    }
  },
  
  renderChoice(category, value, label, emoji) {
    const selected = SESSION[category] === value ? "ring-2 ring-blue-500 bg-blue-100 dark:bg-blue-600/20" : "";
    return `
      <button 
        onclick="selectOption('${category}', '${value}')"
        class="card-interactive ${selected} bg-white dark:bg-neutral-800/50 border border-neutral-300 dark:border-neutral-700 rounded-lg p-4 text-center hover:border-blue-500 transition-all"
      >
        <div class="text-3xl mb-2">${emoji}</div>
        <div class="text-sm font-semibold">${label}</div>
      </button>
    `;
  },
  
  // ÉCRAN 2: ROADMAP
  renderRoadmap() {
    const modules = SESSION.roadmap;
    
    this.container.innerHTML = `
      <div class="min-h-screen flex items-center justify-center p-6">
        <div class="max-w-4xl w-full animate-fade-in">
          
          <div class="mb-8 text-center">
            <h2 class="font-display text-4xl font-bold mb-2">Ton parcours personnalisé</h2>
            <p class="text-neutral-600 dark:text-neutral-400">Voici les modules que tu vas traverser</p>
          </div>
          
          <div class="glass rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 mb-8">
            <div class="space-y-4">
              ${modules.map((module, idx) => `
                <div class="flex items-center gap-4 p-4 bg-neutral-100 dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700" style="animation-delay: ${idx * 100}ms">
                  <div class="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
                    ${idx + 1}
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-lg">${module.name}</h3>
                    <p class="text-sm text-neutral-600 dark:text-neutral-400">${module.description}</p>
                  </div>
                  <div class="text-xs text-neutral-500">
                    ~${module.questionCount} questions
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
          
          <div class="flex justify-between items-center">
            <button 
              onclick="goBack('profile')"
              class="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition"
            >
              ← Retour
            </button>
            <button 
              onclick="startModules()"
              class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105"
            >
              Commencer les modules
            </button>
          </div>
          
        </div>
      </div>
    `;
  },
  
  // ÉCRAN 3: MODULE INTRO
  renderModule() {
    const module = SESSION.currentModule;
    const concepts = module.concepts.map(cId => CONCEPTS[cId]).filter(Boolean);
    
    this.container.innerHTML = `
      <div class="min-h-screen flex items-center justify-center p-6">
        <div class="max-w-3xl w-full animate-fade-in">
          
          <!-- Progress -->
          <div class="mb-6">
            <div class="flex justify-between text-sm text-neutral-600 dark:text-neutral-400 mb-2">
              <span>Module ${SESSION.currentModuleIndex + 1} / ${SESSION.roadmap.length}</span>
              <span>Score: ${SESSION.score}</span>
            </div>
            <div class="h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all progress-bar" 
                   style="width: ${(SESSION.currentModuleIndex / SESSION.roadmap.length) * 100}%">
              </div>
            </div>
          </div>
          
          <!-- Module Header -->
          <div class="text-center mb-8">
            <h2 class="font-display text-5xl font-bold mb-3">${module.name}</h2>
            <p class="text-xl text-neutral-600 dark:text-neutral-400">${module.description}</p>
          </div>
          
          <!-- Concepts -->
          <div class="glass rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 mb-8">
            ${concepts.map(concept => `
              <div class="mb-6 last:mb-0">
                <h3 class="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">${concept.title}</h3>
                <div class="space-y-2">
                  ${concept.texts.map(text => `
                    <p class="text-neutral-700 dark:text-neutral-300 leading-relaxed">• ${text}</p>
                  `).join("")}
                </div>
              </div>
            `).join("")}
          </div>
          
          <div class="text-center">
            <button 
              onclick="startQuestions()"
              class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-10 py-4 rounded-xl transition-all transform hover:scale-105"
            >
              Commencer les questions
            </button>
          </div>
          
        </div>
      </div>
    `;
  },
  
  // ÉCRAN 4: QUESTION
  renderQuestion() {
    const q = SESSION.currentQuestion;
    if (!q) return;
    
    const progress = ((SESSION.currentQuestionIndex + 1) / SESSION.questions.length) * 100;
    
    this.container.innerHTML = `
      <div class="min-h-screen flex items-center justify-center p-6">
        <div class="max-w-3xl w-full animate-fade-in">
          
          <!-- Header with progress -->
          <div class="mb-8">
            <div class="flex justify-between text-sm text-neutral-600 dark:text-neutral-400 mb-2">
              <span>Question ${SESSION.currentQuestionIndex + 1} / ${SESSION.questions.length}</span>
              <span>Score: ${SESSION.score} / ${SESSION.maxScore}</span>
            </div>
            <div class="h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all progress-bar" 
                   style="width: ${progress}%">
              </div>
            </div>
          </div>
          
          <!-- Question -->
          <div class="glass rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 mb-6">
            <h3 class="text-2xl font-semibold mb-6 leading-relaxed">${q.question}</h3>
            
            <div class="space-y-3" id="choices-container">
              ${q.choices.map((choice, idx) => `
                <button 
                  onclick="selectChoice(${idx})"
                  data-choice="${idx}"
                  class="choice-btn w-full text-left p-5 bg-neutral-50 dark:bg-neutral-800/50 border-2 border-neutral-300 dark:border-neutral-700 rounded-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-600/10 transition-all transform hover:translate-x-1"
                >
                  <span class="font-mono text-sm text-neutral-500 mr-3">${String.fromCharCode(65 + idx)}.</span>
                  <span>${choice}</span>
                </button>
              `).join("")}
            </div>
          </div>
          
          <!-- Submit button -->
          <div class="flex justify-end">
            <button 
              id="submit-answer-btn"
              onclick="submitCurrentAnswer()"
              disabled
              class="bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-300 dark:disabled:bg-neutral-800 disabled:cursor-not-allowed text-white font-bold px-8 py-4 rounded-xl transition-all"
            >
              Valider la réponse
            </button>
          </div>
          
        </div>
      </div>
    `;
  },
  
  // ÉCRAN 5: RÉSULTAT
  renderResult() {
    const percentage = Math.round((SESSION.score / SESSION.maxScore) * 100);
    const topScores = JSON.parse(localStorage.getItem("aliaa_scores") || "[]").slice(0, 10);
    
    // Calcul du niveau estimé
    let estimatedLevel = "Débutant";
    if (percentage >= 80) estimatedLevel = "Expert";
    else if (percentage >= 65) estimatedLevel = "Avancé";
    else if (percentage >= 45) estimatedLevel = "Intermédiaire";
    
    // Top catégories
    const sortedCategories = Object.entries(SESSION.categoryScores)
      .sort((a, b) => {
        const aPerc = (a[1].correct / a[1].total) * 100;
        const bPerc = (b[1].correct / b[1].total) * 100;
        return bPerc - aPerc;
      });
    
    this.container.innerHTML = `
      <div class="min-h-screen p-6 py-12">
        <div class="max-w-5xl mx-auto animate-fade-in">
          
          <!-- Header -->
          <div class="text-center mb-12">
            <h1 class="font-display text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Résultats
            </h1>
            <p class="text-xl text-neutral-400">Analyse de ta performance</p>
          </div>
          
          <!-- Score principal -->
          <div class="glass rounded-3xl p-12 border border-neutral-800 mb-8 text-center">
            <div class="text-8xl font-display font-bold mb-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
              ${percentage}%
            </div>
            <div class="text-2xl text-neutral-300 mb-2">
              ${SESSION.score} / ${SESSION.maxScore} points
            </div>
            <div class="inline-block px-6 py-2 bg-blue-600/20 border border-blue-500 rounded-full text-blue-400 font-semibold">
              Niveau estimé: ${estimatedLevel}
            </div>
          </div>
          
          <!-- Grid: Stats + Radar -->
          <div class="grid md:grid-cols-2 gap-8 mb-8">
            
            <!-- Stats générales -->
            <div class="glass rounded-2xl p-6 border border-neutral-800">
              <h3 class="text-xl font-semibold mb-4 text-blue-400">Statistiques</h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-neutral-400">Questions répondues:</span>
                  <span class="font-semibold">${SESSION.answeredQuestions.length}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Réponses correctes:</span>
                  <span class="font-semibold text-green-400">${SESSION.answeredQuestions.filter(a => a.correct).length}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Réponses incorrectes:</span>
                  <span class="font-semibold text-red-400">${SESSION.answeredQuestions.filter(a => !a.correct).length}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Temps total:</span>
                  <span class="font-semibold">${Math.floor(SESSION.totalTime / 60000)} min ${Math.floor((SESSION.totalTime % 60000) / 1000)} sec</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Track:</span>
                  <span class="font-semibold capitalize">${SESSION.track}</span>
                </div>
              </div>
            </div>
            
            <!-- Compétences par catégorie -->
            <div class="glass rounded-2xl p-6 border border-neutral-800">
              <h3 class="text-xl font-semibold mb-4 text-cyan-400">Compétences par catégorie</h3>
              <div class="space-y-3">
                ${sortedCategories.slice(0, 6).map(([cat, data]) => {
                  const perc = Math.round((data.correct / data.total) * 100);
                  const color = perc >= 70 ? "bg-green-500" : perc >= 50 ? "bg-yellow-500" : "bg-red-500";
                  return `
                    <div>
                      <div class="flex justify-between text-sm mb-1">
                        <span class="capitalize">${cat.replace(/_/g, " ")}</span>
                        <span>${perc}%</span>
                      </div>
                      <div class="h-2 bg-neutral-800 rounded-full overflow-hidden">
                        <div class="${color} h-full transition-all" style="width: ${perc}%"></div>
                      </div>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>
          </div>
          
          <!-- Forces & Faiblesses -->
          <div class="grid md:grid-cols-2 gap-8 mb-8">
            <div class="glass rounded-2xl p-6 border border-green-800/30">
              <h3 class="text-xl font-semibold mb-4 text-green-400">💪 Points forts</h3>
              <div class="space-y-2">
                ${Object.entries(SESSION.strengths).slice(0, 5).map(([cat, count]) => `
                  <div class="flex justify-between text-sm">
                    <span class="capitalize">${cat.replace(/_/g, " ")}</span>
                    <span class="text-green-400">+${count}</span>
                  </div>
                `).join("") || "<p class='text-neutral-500 text-sm'>Aucune donnée</p>"}
              </div>
            </div>
            
            <div class="glass rounded-2xl p-6 border border-red-800/30">
              <h3 class="text-xl font-semibold mb-4 text-red-400">🎯 À améliorer</h3>
              <div class="space-y-2">
                ${Object.entries(SESSION.weaknesses).slice(0, 5).map(([cat, count]) => `
                  <div class="flex justify-between text-sm">
                    <span class="capitalize">${cat.replace(/_/g, " ")}</span>
                    <span class="text-red-400">-${count}</span>
                  </div>
                `).join("") || "<p class='text-neutral-500 text-sm'>Aucune donnée</p>"}
              </div>
            </div>
          </div>
          
          <!-- Top 10 Scores -->
          ${topScores.length > 0 ? `
            <div class="glass rounded-2xl p-6 border border-neutral-800">
              <h3 class="text-xl font-semibold mb-4 text-purple-400">🏆 Top 10 Scores</h3>
              <div class="space-y-2">
                ${topScores.map((score, idx) => `
                  <div class="flex items-center gap-4 p-3 bg-neutral-900/50 rounded-lg ${idx === 0 ? "border-2 border-yellow-500" : ""}">
                    <div class="w-8 text-center font-bold ${idx === 0 ? "text-yellow-400" : "text-neutral-500"}">
                      ${idx + 1}
                    </div>
                    <div class="flex-1">
                      <div class="text-sm font-semibold">${score.percentage}% • ${score.score} pts</div>
                      <div class="text-xs text-neutral-500">${score.track} • ${new Date(score.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          ` : ""}
          
          <!-- Actions -->
          <div class="mt-8 flex justify-center gap-4">
            <button 
              onclick="restart()"
              class="bg-neutral-800 hover:bg-neutral-700 text-white font-bold px-8 py-4 rounded-xl transition-all"
            >
              Recommencer
            </button>
            <button 
              onclick="shareResults()"
              class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all"
            >
              Partager les résultats
            </button>
          </div>
          
        </div>
      </div>
    `;
  }
};

/* ===================================================
   SECTION 4: CONTRÔLEURS & EVENT HANDLERS
   =================================================== */

// Variables globales pour la sélection
let selectedChoices = [];

// Démarrer l'évaluation
function startAssessment() {
  SESSION.currentScreen = "profile";
  SESSION.startTime = Date.now();
  UI.render();
}

// Sélectionner une option de profil
function selectOption(category, value) {
  SESSION[category] = value;
  
  // Re-render pour mettre à jour la sélection visuelle
  UI.render();
}

// Continuer vers la roadmap
function continueToRoadmap() {
  if (!SESSION.track || !SESSION.level || !SESSION.objective) {
    alert("Veuillez sélectionner le type de développeur, le niveau et l'objectif");
    return;
  }
  
  // Définir le mode selon l'objectif
  if (SESSION.objective === "challenge") {
    SESSION.mode = "challenge";
  } else {
    SESSION.mode = "normal";
  }
  
  generateRoadmap();
  SESSION.currentScreen = "roadmap";
  UI.render();
}

// Retour
function goBack(screen) {
  SESSION.currentScreen = screen;
  UI.render();
}

// Démarrer les modules
function startModules() {
  SESSION.currentModuleIndex = 0;
  SESSION.currentModule = SESSION.roadmap[0];
  SESSION.currentScreen = "module";
  UI.render();
}

// Démarrer les questions d'un module
function startQuestions() {
  SESSION.questions = generateQuestionsForModule(SESSION.currentModule);
  SESSION.currentQuestionIndex = 0;
  SESSION.currentScreen = "question";
  selectNextQuestion();
  UI.render();
}

// Sélectionner un choix
function selectChoice(index) {
  const btns = document.querySelectorAll(".choice-btn");
  const btn = btns[index];
  
  if (btn.classList.contains("selected")) {
    btn.classList.remove("selected", "border-blue-500", "bg-blue-600/20");
    selectedChoices = selectedChoices.filter(i => i !== index);
  } else {
    btn.classList.add("selected", "border-blue-500", "bg-blue-600/20");
    selectedChoices.push(index);
  }
  
  // Activer le bouton submit
  const submitBtn = document.getElementById("submit-answer-btn");
  submitBtn.disabled = selectedChoices.length === 0;
}

// Soumettre la réponse actuelle
function submitCurrentAnswer() {
  if (selectedChoices.length === 0) return;
  
  const result = evaluateAnswer(selectedChoices);
  
  // Afficher feedback immédiat
  showFeedback(result);
  
  // Reset sélection
  selectedChoices = [];
  
  // Attendre 2 secondes puis question suivante
  setTimeout(() => {
    SESSION.currentQuestionIndex++;
    
    const next = selectNextQuestion();
    if (next) {
      UI.render();
    } else {
      // Module terminé
      const hasNext = nextModule();
      if (hasNext) {
        UI.render();
      } else {
        UI.render();
      }
    }
  }, 2500);
}

// Afficher le feedback
function showFeedback(result) {
  const container = document.getElementById("choices-container");
  
  const feedbackHTML = `
    <div class="animate-fade-in mt-6 p-6 rounded-xl border-2 ${result.correct ? "bg-green-600/10 border-green-500" : "bg-red-600/10 border-red-500"}">
      <div class="text-2xl font-bold mb-2 ${result.correct ? "text-green-400" : "text-red-400"}">
        ${result.correct ? "✓ Correct !" : "✗ Incorrect"}
      </div>
      <div class="text-sm text-neutral-300 mb-2">
        ${result.correct ? `+${result.gained} points` : "0 point"}
      </div>
      <div class="text-neutral-400 text-sm leading-relaxed">
        ${result.explanation}
      </div>
    </div>
  `;
  
  container.insertAdjacentHTML("afterend", feedbackHTML);
  
  // Désactiver tous les boutons
  document.querySelectorAll(".choice-btn").forEach(btn => {
    btn.disabled = true;
    btn.classList.add("opacity-50", "cursor-not-allowed");
  });
  
  document.getElementById("submit-answer-btn").disabled = true;
}

// Recommencer
function restart() {
  location.reload();
}

// Partager les résultats
function shareResults() {
  const text = `J'ai obtenu ${Math.round((SESSION.score / SESSION.maxScore) * 100)}% sur ALIAA ! 🚀`;
  
  if (navigator.share) {
    navigator.share({
      title: "ALIAA - Mes résultats",
      text: text
    });
  } else {
    navigator.clipboard.writeText(text);
    alert("Résultats copiés dans le presse-papier !");
  }
}

/* ===================================================
   SECTION 5: BOOTSTRAP
   =================================================== */

document.addEventListener("DOMContentLoaded", () => {
  UI.init();
});