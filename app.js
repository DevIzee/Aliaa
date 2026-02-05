/****************************************************
 * ALIAA – Dev Reasoning Engine
 * Tout le moteur logique est ici.
 * HTML/CSS = simple support d'affichage.
 ****************************************************/

/* ==================================================
   1. BASE DE DONNÉES : QUESTIONS
   --------------------------------------------------
   - Data-driven
   - Le moteur ne connaît PAS le contenu
   - Il applique juste des règles
================================================== */

const QUESTIONS = [
  {
    id: "logic_001",
    tracks: ["front", "back", "full"],
    level: "junior",
    category: "reasoning",
    type: "qcm",
    question:
      "Face à un bug intermittent en production, quelle est la meilleure première action ?",
    choices: [
      "Ajouter des logs ciblés",
      "Réécrire le module",
      "Ignorer tant que ça marche",
      "Ajouter des try/catch partout"
    ],
    correct: [0],
    score: 10,
    trap: true
  },
  {
    id: "logic_002",
    tracks: ["front", "full"],
    level: "junior",
    category: "decision",
    type: "qcm",
    question:
      "Quel est le principal risque d'une logique métier directement dans l'UI ?",
    choices: [
      "Le code devient difficile à tester",
      "L'application est plus lente",
      "Le navigateur peut planter",
      "Le CSS devient plus complexe"
    ],
    correct: [0],
    score: 10,
    trap: false
  }
];

/* ==================================================
   2. SESSION STATE
   --------------------------------------------------
   - Représente UNE tentative utilisateur
   - Peut être sauvegardée plus tard
================================================== */

const session = {
  track: "front",        // front | back | full
  level: "junior",       // junior | intermediate | advanced
  mode: "normal",        // normal | challenge
  score: 0,
  step: 0,
  answeredIds: [],       // questions déjà posées
  weaknesses: {},        // catégories ratées
  strengths: {}          // catégories réussies
};

/* ==================================================
   3. SÉLECTION D'UNE QUESTION
   --------------------------------------------------
   - Filtre par track + niveau
   - Évite les répétitions
   - Non déterministe (aléatoire)
================================================== */

function selectQuestion() {
  const candidates = QUESTIONS.filter(q =>
    q.tracks.includes(session.track) &&
    q.level === session.level &&
    !session.answeredIds.includes(q.id)
  );

  if (candidates.length === 0) {
    return null; // plus de questions
  }

  // Ici on pourra plus tard pondérer selon weaknesses
  const index = Math.floor(Math.random() * candidates.length);
  return candidates[index];
}

/* ==================================================
   4. ÉVALUATION D'UNE RÉPONSE
   --------------------------------------------------
   - Compare choix utilisateur vs réponse attendue
   - Pas de demi-point volontairement
================================================== */

function evaluate(question, userAnswers) {
  // Mauvais nombre de réponses
  if (userAnswers.length !== question.correct.length) {
    return 0;
  }

  // Vérifie que chaque réponse est correcte
  for (let answer of userAnswers) {
    if (!question.correct.includes(answer)) {
      return 0;
    }
  }

  return question.score;
}

/* ==================================================
   5. MOTEUR PRINCIPAL (1 QUESTION = 1 STEP)
================================================== */

let currentQuestion = selectQuestion();

function submitAnswer(selectedIndexes) {
  if (!currentQuestion) return;

  const gainedScore = evaluate(currentQuestion, selectedIndexes);
  session.score += gainedScore;
  session.answeredIds.push(currentQuestion.id);

  // Analyse du résultat
  if (gainedScore === 0) {
    session.weaknesses[currentQuestion.category] =
      (session.weaknesses[currentQuestion.category] || 0) + 1;
  } else {
    session.strengths[currentQuestion.category] =
      (session.strengths[currentQuestion.category] || 0) + 1;
  }

  session.step++;
  currentQuestion = selectQuestion();
  render();
}

/* ==================================================
   6. RENDER UI (TAILWIND)
   --------------------------------------------------
   - UI volontairement simple
   - Toute l'intelligence est AU-DESSUS
================================================== */

function render() {
  const app = document.getElementById("app");

  // FIN DU TEST
  if (!currentQuestion) {
    app.innerHTML = `
      <h1 class="text-2xl font-bold mb-4">Résultat final</h1>

      <p class="mb-2">
        Score : <strong>${session.score}</strong>
      </p>

      <div class="mt-4">
        <h2 class="font-semibold">Forces</h2>
        <pre class="text-sm bg-green-900/20 p-3 rounded">
${JSON.stringify(session.strengths, null, 2)}
        </pre>
      </div>

      <div class="mt-4">
        <h2 class="font-semibold">Faiblesses</h2>
        <pre class="text-sm bg-red-900/20 p-3 rounded">
${JSON.stringify(session.weaknesses, null, 2)}
        </pre>
      </div>
    `;
    return;
  }

  // QUESTION EN COURS
  app.innerHTML = `
    <h1 class="text-xl font-semibold mb-4">
      ${currentQuestion.question}
    </h1>

    <div class="space-y-3">
      ${currentQuestion.choices
        .map(
          (choice, index) => `
        <button
          class="w-full text-left p-4 border rounded-lg
                 hover:bg-slate-200 dark:hover:bg-slate-800
                 transition"
          onclick="submitAnswer([${index}])"
        >
          ${choice}
        </button>
      `
        )
        .join("")}
    </div>

    <p class="mt-6 text-sm opacity-60">
      Question ${session.step + 1}
    </p>
  `;
}

/* ==================================================
   7. BOOTSTRAP
================================================== */

render();
