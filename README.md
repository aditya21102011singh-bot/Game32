# AGRI-OPS: Field Command
An FPS-lobby styled learning game for **CBSE Class 10 Geography — Chapter: Agriculture**.

**v2 update:** expanded from 9 → 15 game modes, 155 → 255 questions (including
Assertion-Reason and case/competency-based items), added per-team correct/wrong/accuracy
tracking + rank + avatars, a Mystery Box bonus, a full Settings panel (volume, theme,
difficulty filter, timer/question-count config), and real PDF/Excel export.

## Run it
No build step. Either:
- Double-click `index.html`, **or**
- Serve it locally (needed for the offline service worker to register):
  ```
  cd agriculture-fps
  python3 -m http.server 8000
  ```
  then open `http://localhost:8000`.
- To host it for real: drag the folder into **Netlify Drop**, or push to **GitHub Pages** / **Vercel** — it's a static site, so all three work with zero config.

## What's in the box
```
index.html          → all views (home, modes, teams, game, teacher, end)
css/style.css        → the entire visual system (dark HUD theme)
js/questions.js       → 155-question bank (MCQ, True/False, Fill-blank, Match pairs, Crop-ID)
js/app.js            → game engine, teams, audio, scoring, teacher panel, persistence
sw.js                → offline caching (service worker)
README.md            → this file
```

## Game modes (15)
Rapid Fire Round · Group Battle · Match the Following · True or False · Guess the Crop ·
Image Identification (farming tools & irrigation methods) · Fill in the Blanks ·
Multiple Choice Quiz · Map Challenge (state-grid) · Crop Detective (progressive clues) ·
Farming Championship (mixed final) · Spin the Wheel (random category) · Harvest Hunt
(collect crops on correct answers) · Survival Mode (one life) · Final Boss Round
(hardest questions only, double points, one life).

A bonus **Puzzle Challenge** (term-unscramble) engine also ships in `app.js`
(`runPuzzle()`) from v1 — it isn't on the mode-select grid because the brief that
drove this update lists a different 15, but it's fully functional if you want to
wire a 16th tile back in.

## Teacher / Admin
Click the 🔐 icon top-right. Default password is **`teacher123`** — open `js/app.js`,
search for `TEACHER_PASSWORD`, and change it before you use this in a real classroom.
From there you can add MCQ questions, delete custom ones, reset scores, and export results.

## Honest scope notes — please read before your audit/demo
The original brief asked for a few things that need real infrastructure or paid/licensed
assets I can't provision from inside a document-generation task. Here's what I built instead,
and why:

- **Firebase → browser `localStorage`.** Firebase needs a project you create and your own
  API keys, so I couldn't wire up a live one. Everything (teams, scores, custom questions,
  streaks, leaderboard, achievements) persists in the browser via `localStorage` instead —
  works fully offline, no account needed. If you want real Firebase (e.g. for a shared
  leaderboard across devices), I'm happy to wire that in — just paste your Firebase config.
- **Photos → emoji + text clues.** "Image Identification" uses large emoji + a factual clue
  rather than photographs, since I can't license/host real crop photography inside the
  project. Swap in real images easily: replace the `emoji` field in `js/questions.js` →
  `CROP_BANK` with an `<img>` path and update the render call in `runCropId()` in `app.js`.
- **Audio → generated tones, not recorded files.** All SFX and the background loop are
  synthesized in-browser with the Web Audio API (no external `.mp3`/`.wav` assets to host).
  It's lightweight and works offline, but it's chiptune-style, not orchestral.
- **Excel/PDF export is now real**, via jsPDF and SheetJS loaded from a CDN (`<script defer>`
  tags in `index.html`). These only need internet access in the *player's* browser at the
  moment Export is clicked — nothing to install. If the browser is fully offline, both fall
  back automatically to CSV / print-to-PDF so Export never just fails silently.
- **Map Challenge uses a clickable state-grid, not a real SVG/GeoJSON map of India.** Drawing
  and hit-testing accurate state boundaries needs a licensed or hand-traced map file I can't
  generate from inside this task. The state-grid version tests the same knowledge (which state
  leads production of a given crop) with real click interaction — swapping in an actual map
  later just means replacing the button grid in `runMapChallenge()` with `<path>` click handlers.
- **Image Identification (tools & irrigation) and Guess the Crop both use emoji + text clues**,
  same reasoning as before — no licensed photography bundled. `TOOLS_BANK` in `questions.js` is
  ready to take real `<img>` paths.
- **~300 questions → 255.** All are original, factually checked against the NCERT Class 10
  Geography Agriculture chapter, including new Assertion-Reason and case/competency-based
  items as requested. I'd rather ship 255 accurate, non-duplicate questions than pad to 300 —
  easy to keep growing via the Teacher panel, or ask me for another batch.
- **GSAP / Framer Motion / Lottie → native CSS animations + Canvas confetti.** Everything
  (page transitions, hover states, timers, confetti, trophy bounce) is done with CSS
  keyframes and a small canvas routine, so there are no external animation library downloads
  required and nothing to break if a CDN is unreachable during a school demo.

None of this is padding — every button works, every mode is fully playable, scores persist
across reloads, and it runs offline after the first load. The list above is just so nothing
surprises you in front of a CBSE audit committee.

## Accessibility
Keyboard-navigable (Tab/Enter), visible focus rings, `prefers-reduced-motion` respected,
high-contrast toggle in the top bar, responsive type sizing down to small phones.

## Extending it
- Add questions fastest via the Teacher panel (MCQ only there); for other types, edit
  `js/questions.js` directly — each bank is a plain array, well-commented.
- Timer lengths, rounds-per-team, etc. live in `STATE.settings` in `js/app.js`.
