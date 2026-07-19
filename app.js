/* =========================================================================
   AGRI-OPS :: FIELD COMMAND — application engine
   ========================================================================= */

/* ---------------- State & persistence ---------------- */
const AVATAR_EMOJIS = ["🛡️","⚡","🔥","🌪️","🦅","🐺","🦁","🐉","⭐","🎯","🚀","🧭"];
const DEFAULT_STATE = {
  title: "AGRI-OPS: FIELD COMMAND",
  teams: [
    {id:"A", name:"Group A", color:"#00e5ff", score:0, correct:0, wrong:0, avatar:"🛡️"},
    {id:"B", name:"Group B", color:"#39ff88", score:0, correct:0, wrong:0, avatar:"⚡"},
    {id:"C", name:"Group C", color:"#ff8a1e", score:0, correct:0, wrong:0, avatar:"🔥"}
  ],
  settings:{
    muted:false, musicOn:true, highContrast:false, lightMode:false, animationsOn:true,
    rapidSeconds:180, battleSeconds:20, quizSeconds:15, roundsPerTeam:5,
    musicVolume:.6, sfxVolume:.8, defaultQuestionCount:10, difficultyFilter:"all"
  },
  xp:0, level:1, bestStreak:0, totalCorrect:0, sinceMysteryBox:0,
  achievements:[],
  customQuestions:[],
  leaderboard:[]
};

let STATE = loadState();

function loadState(){
  try{
    const raw = localStorage.getItem("agriops_state_v1");
    if(!raw) return structuredClone(DEFAULT_STATE);
    const parsed = JSON.parse(raw);
    const merged = Object.assign(structuredClone(DEFAULT_STATE), parsed);
    merged.settings = Object.assign(structuredClone(DEFAULT_STATE.settings), parsed.settings||{});
    merged.teams = (parsed.teams||DEFAULT_STATE.teams).map(t=>Object.assign({correct:0,wrong:0,avatar:"🛡️"},t));
    return merged;
  }catch(e){ return structuredClone(DEFAULT_STATE); }
}
function saveState(){
  localStorage.setItem("agriops_state_v1", JSON.stringify(STATE));
}

/* ---------------- Audio engine (procedural, no external files) ---------------- */
const Audio_ = (function(){
  let ctx=null, musicNodes=[], musicPlaying=false, musicTimer=null;
  function getCtx(){ if(!ctx){ ctx = new (window.AudioContext||window.webkitAudioContext)(); } return ctx; }
  function tone(freq,dur,type="sine",vol=.18,delay=0,isMusic=false){
    if(STATE.settings.muted) return;
    const mult = isMusic ? STATE.settings.musicVolume : STATE.settings.sfxVolume;
    const finalVol = vol * (mult==null?1:mult);
    if(finalVol<=0) return;
    const c = getCtx();
    const t0 = c.currentTime + delay;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type; osc.frequency.setValueAtTime(freq,t0);
    gain.gain.setValueAtTime(0,t0);
    gain.gain.linearRampToValueAtTime(finalVol,t0+.02);
    gain.gain.exponentialRampToValueAtTime(.0001,t0+dur);
    osc.connect(gain).connect(c.destination);
    osc.start(t0); osc.stop(t0+dur+.05);
  }
  return{
    click:()=>tone(320,.06,"square",.12),
    correct:()=>{tone(523,.12,"sine",.2);tone(784,.16,"sine",.18,.1);},
    wrong:()=>{tone(160,.25,"sawtooth",.16);},
    tick:()=>tone(880,.05,"square",.12),
    warn:()=>tone(220,.12,"square",.18),
    victory:()=>{[523,659,784,1046].forEach((f,i)=>tone(f,.35,"triangle",.22,i*.15));},
    levelup:()=>{[440,554,659,880].forEach((f,i)=>tone(f,.25,"sine",.2,i*.09));},
    startMusic(){
      if(musicPlaying || STATE.settings.muted || !STATE.settings.musicOn) return;
      musicPlaying = true;
      const notes=[196,220,246.9,196,261.6,246.9,220,196];
      let i=0;
      musicTimer = setInterval(()=>{
        if(STATE.settings.muted || !STATE.settings.musicOn) return;
        tone(notes[i%notes.length]/2,.9,"sine",.15,0,true);
        tone(notes[i%notes.length],.6,"triangle",.1,.15,true);
        i++;
      },900);
    },
    stopMusic(){ musicPlaying=false; clearInterval(musicTimer); }
  };
})();

/* ---------------- DOM helpers ---------------- */
const $ = (sel,ctx=document)=>ctx.querySelector(sel);
const $$ = (sel,ctx=document)=>Array.from(ctx.querySelectorAll(sel));
function el(tag,attrs={},children=[]){
  const n = document.createElement(tag);
  for(const k in attrs){
    if(k==="class") n.className=attrs[k];
    else if(k==="html") n.innerHTML=attrs[k];
    else if(k.startsWith("on")) n.addEventListener(k.slice(2),attrs[k]);
    else n.setAttribute(k,attrs[k]);
  }
  (Array.isArray(children)?children:[children]).forEach(c=>{
    if(c==null) return;
    n.appendChild(typeof c==="string"?document.createTextNode(c):c);
  });
  return n;
}
function toast(msg,ms=2600){
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast._tm);
  toast._tm = setTimeout(()=>t.classList.remove("show"),ms);
}

/* ---------------- View routing ---------------- */
function showView(id){
  $$(".view").forEach(v=>v.classList.remove("active"));
  const target = $("#"+id);
  target.classList.add("active");
  $("#scoreboard-mini").classList.toggle("show", id!=="view-home");
  window.scrollTo({top:0,behavior:"smooth"});
}

/* ---------------- Scoreboard ---------------- */
function renderMiniScoreboard(){
  const box = $("#scoreboard-mini");
  box.innerHTML="";
  STATE.teams.forEach(t=>{
    box.appendChild(el("div",{class:"score-chip"},[
      t.name+": ", el("b",{},String(t.score))
    ]));
  });
}
function addScore(teamId, pts){
  const team = STATE.teams.find(t=>t.id===teamId);
  if(!team) return;
  team.score += pts;
  STATE.xp += Math.max(pts,0);
  const newLevel = Math.floor(STATE.xp/100)+1;
  if(newLevel>STATE.level){ STATE.level=newLevel; Audio_.levelup(); toast(`⬆ LEVEL UP! Level ${STATE.level}`); }
  saveState();
  renderMiniScoreboard();
}

/* ---------------- Teams page ---------------- */
function renderTeams(){
  const grid = $("#team-grid");
  grid.innerHTML="";
  const ranked = [...STATE.teams].sort((a,b)=>b.score-a.score);
  STATE.teams.forEach(t=>{
    const rank = ranked.findIndex(x=>x.id===t.id)+1;
    const total = t.correct+t.wrong;
    const acc = total? Math.round((t.correct/total)*100) : 0;
    const card = el("div",{class:"panel team-card"},[
      el("div",{class:"team-colorbar",style:`background:${t.color}`}),
      el("div",{class:"flex-between"},[
        el("div",{class:"name"},[`#${rank} `, el("button",{class:"iconbtn",style:"width:28px;height:28px;font-size:.9rem;",title:"Change avatar",onclick:()=>cycleAvatar(t.id)},t.avatar), " "+t.name]),
      ]),
      el("div",{class:"pts mono"},String(t.score)),
      el("div",{class:"mono",style:"font-size:.75rem;color:var(--muted)"}, `✔ ${t.correct}  ✘ ${t.wrong}  · ${acc}% accuracy`),
      el("div",{class:"row"},[
        el("button",{class:"btn ghost sm",onclick:()=>renameTeam(t.id)},"Rename"),
        el("button",{class:"btn ghost sm",onclick:()=>{if(STATE.teams.length>1){STATE.teams=STATE.teams.filter(x=>x.id!==t.id);saveState();renderTeams();renderMiniScoreboard();toast("Team removed");}else{toast("At least one team is required");}}},"Delete")
      ])
    ]);
    grid.appendChild(card);
  });
}
function cycleAvatar(id){
  const t = STATE.teams.find(x=>x.id===id);
  const i = AVATAR_EMOJIS.indexOf(t.avatar);
  t.avatar = AVATAR_EMOJIS[(i+1)%AVATAR_EMOJIS.length];
  saveState(); renderTeams();
}
function renameTeam(id){
  const t = STATE.teams.find(x=>x.id===id);
  const name = prompt("New team name:", t.name);
  if(name && name.trim()){ t.name=name.trim(); saveState(); renderTeams(); renderMiniScoreboard(); }
}
function addTeam(){
  const name = $("#new-team-name").value.trim();
  if(!name){ toast("Enter a team name first"); return; }
  const colors=["#00e5ff","#39ff88","#ff8a1e","#ff2d55","#c77dff","#ffe066","#5ee7ff","#7bff9c"];
  const id = "T"+Date.now();
  STATE.teams.push({id,name,color:colors[STATE.teams.length%colors.length],score:0,correct:0,wrong:0,avatar:AVATAR_EMOJIS[STATE.teams.length%AVATAR_EMOJIS.length]});
  $("#new-team-name").value="";
  saveState(); renderTeams(); renderMiniScoreboard();
  Audio_.click();
}
function resetAllScores(){
  STATE.teams.forEach(t=>{t.score=0;t.correct=0;t.wrong=0;});
  saveState(); renderTeams(); renderMiniScoreboard();
  toast("All scores reset to zero");
}

/* ---------------- Question pool helpers ---------------- */
function allMcq(){ return MCQ_BANK.concat(STATE.customQuestions||[]); }
function applyDifficulty(arr){
  const f = STATE.settings.difficultyFilter;
  if(!f || f==="all") return arr;
  const filtered = arr.filter(q=>q.d===f);
  return filtered.length ? filtered : arr; // fall back if a bank has none of that difficulty
}
function pickN(arr,n){ return shuffleArray(applyDifficulty(arr)).slice(0,Math.min(n,arr.length)); }

/* ---------------- Mode metadata ---------------- */
const MODES = [
  {id:"rapid", icon:"🎯", name:"Rapid Fire Round", tag:"3-MIN SOLO", desc:"Beat the clock. Answer as many questions as you can before time runs out. +10 per hit."},
  {id:"battle", icon:"⚔️", name:"Group Battle", tag:"TEAM VS TEAM", desc:"Teams take turns under a 20s shot clock. Miss and the turn passes to the next squad."},
  {id:"match", icon:"🔗", name:"Match the Following", tag:"LINK & SCORE", desc:"Pair crops with their season, state, soil or climate before the board clears."},
  {id:"tf", icon:"✅", name:"True or False", tag:"QUICKFIRE", desc:"Ten statements. Call it right or wrong, fast."},
  {id:"crop", icon:"🌾", name:"Guess the Crop", tag:"IMAGE ID", desc:"Identify the crop from its icon and field clue."},
  {id:"image", icon:"🚜", name:"Image Identification", tag:"TOOLS & IRRIGATION", desc:"Recognise farming tools and irrigation methods from icon + clue."},
  {id:"fill", icon:"⌨️", name:"Fill in the Blanks", tag:"RECALL", desc:"Type the missing term to complete the briefing."},
  {id:"mcq", icon:"🧠", name:"Multiple Choice Quiz", tag:"CLASSIC", desc:"Straight MCQ gauntlet across easy, medium and hard intel."},
  {id:"mapchallenge", icon:"🗺️", name:"Map Challenge", tag:"STATE GRID", desc:"Tap the Indian state that leads production of the named crop."},
  {id:"detective", icon:"🕵️", name:"Crop Detective", tag:"3 CLUES", desc:"Guess the crop from three progressively specific clues — fewer clues, more points."},
  {id:"mega", icon:"🏆", name:"Farming Championship", tag:"MIXED FINAL", desc:"A mixed gauntlet of every question type — the chapter's full test."},
  {id:"wheel", icon:"🎡", name:"Spin the Wheel", tag:"RANDOM CATEGORY", desc:"Spin to land on a topic, then answer a short quiz from that category only."},
  {id:"harvest", icon:"🧺", name:"Harvest Hunt", tag:"COLLECT CROPS", desc:"Every correct answer adds a crop to your basket. Fill it before time's up."},
  {id:"survival", icon:"💀", name:"Survival Mode", tag:"ONE LIFE", desc:"Answer until your first mistake. One slip ends the run — how far can you go?"},
  {id:"boss", icon:"👑", name:"Final Boss Round", tag:"HARDEST · 2x PTS", desc:"Only hard-difficulty questions, double points, one life. The ultimate test."}
];

function renderModes(){
  const grid = $("#mode-grid");
  grid.innerHTML="";
  MODES.forEach(m=>{
    grid.appendChild(el("div",{class:"panel mode-card",tabindex:"0",role:"button",
      onclick:()=>openPreGame(m.id),
      onkeydown:(e)=>{if(e.key==="Enter")openPreGame(m.id);}},[
      el("div",{class:"icon"},m.icon),
      el("h3",{},m.name),
      el("p",{},m.desc),
      el("span",{class:"tag"},m.tag)
    ]));
  });
}

/* ---------------- Pre-game team select ---------------- */
let activeTeamId = STATE.teams[0] ? STATE.teams[0].id : null;
function openPreGame(modeId){
  Audio_.click();
  const mode = MODES.find(m=>m.id===modeId);
  const mount = $("#pregame-mount");
  mount.innerHTML="";
  if(modeId==="battle"){
    if(STATE.teams.length<2){ toast("Group Battle needs at least 2 teams — add one on the Teams page."); return; }
    mount.appendChild(el("p",{},`All ${STATE.teams.length} teams will play in rotation, ${STATE.settings.roundsPerTeam} question(s) per team per round.`));
    mount.appendChild(el("div",{class:"btn-row",style:"margin-top:1.5rem;"},[
      el("button",{class:"btn primary",onclick:()=>{showView("view-game");runBattle();}},"▶ Start Battle"),
      el("button",{class:"btn ghost",onclick:()=>showView("view-home")},"Cancel")
    ]));
  }else{
    const select = el("select",{class:"field",id:"pg-team-select"});
    STATE.teams.forEach(t=>select.appendChild(el("option",{value:t.id},t.name)));
    select.value = activeTeamId;
    mount.appendChild(el("label",{},["Playing as: ", select]));
    mount.appendChild(el("div",{class:"btn-row",style:"margin-top:1.5rem;"},[
      el("button",{class:"btn primary",onclick:()=>{
        activeTeamId = select.value;
        showView("view-game");
        launchMode(modeId);
      }},"▶ Start Mission"),
      el("button",{class:"btn ghost",onclick:()=>showView("view-home")},"Cancel")
    ]));
  }
  $("#pregame-title").textContent = mode.name;
  showView("view-pregame");
}
function launchMode(modeId){
  Audio_.startMusic();
  ({
    rapid: runRapidFire, match: runMatch, tf: ()=>runStraightQuiz("tf"),
    crop: runCropId, fill: ()=>runStraightQuiz("fill"), mcq: ()=>runStraightQuiz("mcq"),
    puzzle: runPuzzle, mega: runMega,
    image: runImageID, mapchallenge: runMapChallenge, detective: runCropDetective,
    wheel: runSpinWheel, harvest: runHarvestHunt, survival: runSurvival, boss: runFinalBoss
  })[modeId]();
}

/* ---------------- Session tracking (streak/xp) ---------------- */
let sessionStreak = 0;
function registerAnswer(correct, teamId, points){
  const team = STATE.teams.find(t=>t.id===teamId);
  if(correct){
    sessionStreak++;
    STATE.totalCorrect++;
    STATE.sinceMysteryBox++;
    if(team) team.correct++;
    if(sessionStreak>STATE.bestStreak) STATE.bestStreak=sessionStreak;
    let bonus = sessionStreak>=3 ? Math.min(5*(sessionStreak-2),20) : 0;
    addScore(teamId, points+bonus);
    if(bonus>0) toast(`🔥 Combo x${sessionStreak}! +${bonus} bonus`);
    Audio_.correct();
    checkAchievements();
    if(STATE.sinceMysteryBox>=4){
      STATE.sinceMysteryBox=0;
      setTimeout(()=>openMysteryBox(teamId),350);
    }
  }else{
    sessionStreak = 0;
    if(team) team.wrong++;
    addScore(teamId, 0);
    Audio_.wrong();
  }
  saveState();
}

/* ---------------- Mystery Box ---------------- */
function openMysteryBox(teamId){
  const backdrop = $("#mystery-backdrop");
  const box = $("#mystery-box-content");
  box.innerHTML="";
  box.appendChild(el("h3",{},"🎁 MYSTERY BOX"));
  box.appendChild(el("p",{style:"color:var(--muted);margin-bottom:1rem"},"Four correct answers! Pick a crate:"));
  const row = el("div",{class:"btn-row",style:"justify-content:center;"});
  const rewards = [
    ()=>{ addScore(teamId,15); toast("📦 +15 bonus points!"); },
    ()=>{ addScore(teamId,25); toast("📦 Jackpot! +25 bonus points!"); },
    ()=>{ addScore(teamId,5); toast("📦 A small crate: +5 points."); }
  ];
  ["🎁","📦","🧰"].forEach((icon,i)=>{
    row.appendChild(el("button",{class:"btn orange",onclick:()=>{ rewards[i](); backdrop.classList.remove("show"); }},icon));
  });
  box.appendChild(row);
  backdrop.classList.add("show");
}
const ACHIEVEMENTS = [
  {id:"first_blood", label:"🩸 First Blood — first correct answer", test:()=>STATE.totalCorrect>=1},
  {id:"sharp5", label:"🎯 Sharpshooter — 5-answer streak", test:()=>STATE.bestStreak>=5},
  {id:"century", label:"💯 Century — 100 correct answers lifetime", test:()=>STATE.totalCorrect>=100},
  {id:"level5", label:"⭐ Field Veteran — reached Level 5", test:()=>STATE.level>=5}
];
function checkAchievements(){
  ACHIEVEMENTS.forEach(a=>{
    if(!STATE.achievements.includes(a.id) && a.test()){
      STATE.achievements.push(a.id);
      toast("🏅 Achievement unlocked: "+a.label);
    }
  });
}

/* ---------------- Generic quiz card renderer ---------------- */
function renderQImage(q){
  if(!q.img) return el("div",{});
  return el("img",{src:q.img,style:"max-width:100%;max-height:220px;border-radius:4px;margin-bottom:1rem;border:1px solid var(--border);"});
}
function questionMeta(q){
  return el("div",{class:"qmeta"},[
    el("span",{class:"pill "+(q.d||"medium")},q.d||"medium"),
    el("span",{class:"pill"},q.cat||"General")
  ]);
}
function flashFeedback(correct){
  const f = $("#feedback-flash");
  f.className = "feedback-flash "+(correct?"correct":"wrong");
  void f.offsetWidth;
  setTimeout(()=>f.className="feedback-flash",500);
}

/* ---------------- MODE: Rapid Fire ---------------- */
function runRapidFire(){
  const mount = $("#game-mount");
  let pool = shuffleArray(allMcq().concat(
    TF_BANK.map(q=>({...q,qtype:"tf"})),
    FILL_BANK.map(q=>({...q,qtype:"fill"}))
  ));
  let idx=0, correctCount=0, total=0, timeLeft=STATE.settings.rapidSeconds, running=true;
  sessionStreak=0;

  function frame(){
    mount.innerHTML="";
    mount.appendChild(el("div",{class:"game-hud"},[
      el("div",{},[
        el("div",{class:"eyebrow mono"},"MISSION: RAPID FIRE"),
        el("div",{class:"timer-display "+(timeLeft<=30?"warn":""),id:"rf-timer"},fmtTime(timeLeft))
      ]),
      el("div",{style:"text-align:right"},[
        el("div",{class:"mono",style:"color:var(--muted)"},`Hits: ${correctCount} / ${total}`),
        el("button",{class:"btn danger sm",onclick:endEarly},"⏹ End Early")
      ])
    ]));
    renderQ();
  }
  function renderQ(){
    const old = $("#rf-qcard"); if(old) old.remove();
    if(idx>=pool.length){ idx=0; } // recycle if exhausted (never repeat until all used, per spec)
    const q = pool[idx];
    const card = el("div",{class:"panel qcard",id:"rf-qcard"});
    card.appendChild(questionMeta(q));
    card.appendChild(renderQImage(q));
    card.appendChild(el("div",{class:"qtext"}, q.q));
    card.appendChild(renderAnswerArea(q, (correct)=>{
      total++; if(correct) correctCount++;
      registerAnswer(correct, activeTeamId, correct?10:0);
      flashFeedback(correct);
      idx++;
      if(running) renderQ();
    }));
    mount.appendChild(card);
  }
  function fmtTime(s){ const m=Math.floor(s/60); const ss=String(s%60).padStart(2,"0"); return `${m}:${ss}`; }
  const timer = setInterval(()=>{
    timeLeft--;
    const disp = $("#rf-timer");
    if(disp){ disp.textContent = fmtTime(timeLeft); disp.className="timer-display "+(timeLeft<=30?"warn":""); }
    if(timeLeft<=10 && timeLeft>0) Audio_.warn();
    if(timeLeft<=0){ finish(); }
  },1000);
  function endEarly(){ finish(); }
  function finish(){
    if(!running) return;
    running=false; clearInterval(timer);
    showRoundSummary("Rapid Fire Round", correctCount, total);
  }
  frame();
}

/* ---------------- MODE: straight quiz (tf / fill / mcq) ---------------- */
function runStraightQuiz(type){
  const mount = $("#game-mount");
  const n = STATE.settings.defaultQuestionCount || 10;
  let pool;
  if(type==="tf") pool = pickN(TF_BANK,n).map(q=>({...q,qtype:"tf"}));
  else if(type==="fill") pool = pickN(FILL_BANK,n).map(q=>({...q,qtype:"fill"}));
  else pool = pickN(allMcq(),n).map(q=>({...q,qtype:"mcq"}));
  let idx=0, correctCount=0;
  sessionStreak=0;
  const labels={tf:"TRUE OR FALSE",fill:"FILL IN THE BLANKS",mcq:"MULTIPLE CHOICE QUIZ"};
  function renderQ(){
    mount.innerHTML="";
    const q = pool[idx];
    mount.appendChild(el("div",{class:"game-hud"},[
      el("div",{class:"eyebrow mono"},`${labels[type]} — Q${idx+1}/${pool.length}`),
      el("div",{style:"text-align:right"},[el("div",{class:"mono",style:"color:var(--muted)"},`Score: ${correctCount}✔`)])
    ]));
    const card = el("div",{class:"panel qcard"});
    card.appendChild(questionMeta(q));
    card.appendChild(renderQImage(q));
    card.appendChild(el("div",{class:"qtext"}, q.q));
    card.appendChild(renderAnswerArea(q,(correct)=>{
      if(correct) correctCount++;
      registerAnswer(correct, activeTeamId, correct?10:0);
      flashFeedback(correct);
      idx++;
      if(idx<pool.length) setTimeout(renderQ,650);
      else setTimeout(()=>showRoundSummary(labels[type], correctCount, pool.length),650);
    }));
    mount.appendChild(card);
  }
  renderQ();
}

/* ---------------- Answer area renderer (shared) ---------------- */
function renderAnswerArea(q, onDone){
  const wrap = el("div",{});
  let answered=false;
  if(q.qtype==="tf"){
    const grid = el("div",{class:"tf-grid"});
    const mk = (val,label,cls)=> el("button",{class:"btn opt-btn tf-btn "+cls,onclick:(e)=>{
      if(answered) return; answered=true;
      const correct = (val===q.a);
      e.target.classList.add(correct?"correct":"wrong");
      onDone(correct);
    }},label);
    grid.appendChild(mk(true,"TRUE","true"));
    grid.appendChild(mk(false,"FALSE","false"));
    wrap.appendChild(grid);
  }else if(q.qtype==="fill"){
    const row = el("div",{class:"fill-wrap"});
    const input = el("input",{class:"field",type:"text",placeholder:"Type your answer...",autocomplete:"off"});
    const submit = ()=>{
      if(answered) return; answered=true;
      const correct = input.value.trim().toLowerCase()===String(q.a).toLowerCase();
      input.style.borderColor = correct?"var(--green)":"var(--danger)";
      onDone(correct);
    };
    input.addEventListener("keydown",(e)=>{if(e.key==="Enter") submit();});
    row.appendChild(input);
    row.appendChild(el("button",{class:"btn primary",onclick:submit},"Submit"));
    wrap.appendChild(row);
  }else{ // mcq
    const grid = el("div",{class:"options-grid"});
    q.opts.forEach((opt,i)=>{
      grid.appendChild(el("button",{class:"btn opt-btn",onclick:(e)=>{
        if(answered) return; answered=true;
        const correct = i===q.a;
        e.currentTarget.classList.add(correct?"correct":"wrong");
        if(!correct){
          $$(".opt-btn",grid)[q.a].classList.add("correct");
        }
        $$(".opt-btn",grid).forEach(b=>b.disabled=true);
        onDone(correct);
      }}, `${String.fromCharCode(65+i)}.  ${opt}`));
    });
    wrap.appendChild(grid);
  }
  return wrap;
}

/* ---------------- MODE: Guess the Crop ---------------- */
function runCropId(){
  const mount = $("#game-mount");
  let pool = shuffleArray(CROP_BANK);
  let idx=0, correctCount=0;
  sessionStreak=0;
  function renderQ(){
    mount.innerHTML="";
    const q = pool[idx];
    const wrongNames = shuffleArray(CROP_BANK.filter(c=>c.name!==q.name)).slice(0,3).map(c=>c.name);
    const options = shuffleArray([q.name,...wrongNames]);
    mount.appendChild(el("div",{class:"eyebrow mono"},`IMAGE IDENTIFICATION — Q${idx+1}/${pool.length}`));
    const card = el("div",{class:"panel qcard"});
    card.appendChild(el("div",{class:"crop-display"}, q.emoji));
    card.appendChild(el("div",{class:"crop-clue"}, q.clue));
    const grid = el("div",{class:"options-grid"});
    let answered=false;
    options.forEach(name=>{
      grid.appendChild(el("button",{class:"btn opt-btn",onclick:(e)=>{
        if(answered) return; answered=true;
        const correct = name===q.name;
        e.currentTarget.classList.add(correct?"correct":"wrong");
        if(!correct){ $$(".opt-btn",grid).forEach(b=>{ if(b.textContent.trim()===q.name) b.classList.add("correct"); }); }
        $$(".opt-btn",grid).forEach(b=>b.disabled=true);
        if(correct) correctCount++;
        registerAnswer(correct, activeTeamId, correct?10:0);
        flashFeedback(correct);
        idx++;
        setTimeout(()=>{ idx<pool.length ? renderQ() : showRoundSummary("Guess the Crop", correctCount, pool.length); },700);
      }}, name));
    });
    card.appendChild(grid);
    mount.appendChild(card);
  }
  renderQ();
}

/* ---------------- MODE: Match the Following ---------------- */
function runMatch(){
  const mount = $("#game-mount");
  const group = MATCH_BANK[Math.floor(Math.random()*MATCH_BANK.length)];
  const lefts = shuffleArray(group.pairs.map((p,i)=>({...p,idx:i})));
  const rights = shuffleArray(group.pairs.map((p,i)=>({...p,idx:i})));
  let selectedLeft=null, matchedCount=0;
  mount.innerHTML="";
  mount.appendChild(el("div",{class:"eyebrow mono"},`MATCH THE FOLLOWING — ${group.title}`));
  const wrap = el("div",{class:"panel match-wrap"});
  const colL = el("div",{class:"match-col"},[el("h4",{},"Crop / Term")]);
  const colR = el("div",{class:"match-col"},[el("h4",{},"Match")]);
  lefts.forEach(p=>{
    const item = el("div",{class:"match-item",tabindex:"0","data-idx":p.idx,onclick:function(){
      if(this.classList.contains("matched")) return;
      $$(".match-item",colL).forEach(x=>x.classList.remove("selected"));
      this.classList.add("selected");
      selectedLeft = this;
    }}, p.left);
    colL.appendChild(item);
  });
  rights.forEach(p=>{
    const item = el("div",{class:"match-item",tabindex:"0","data-idx":p.idx,onclick:function(){
      if(this.classList.contains("matched") || !selectedLeft) return;
      const li = Number(selectedLeft.dataset.idx), ri = Number(this.dataset.idx);
      if(li===ri){
        selectedLeft.classList.remove("selected");
        selectedLeft.classList.add("matched");
        this.classList.add("matched");
        matchedCount++;
        registerAnswer(true, activeTeamId, 10);
        flashFeedback(true);
        selectedLeft=null;
        if(matchedCount===group.pairs.length){
          setTimeout(()=>showRoundSummary("Match the Following", matchedCount, group.pairs.length),500);
        }
      }else{
        this.classList.add("wrong-flash");
        selectedLeft.classList.add("wrong-flash");
        Audio_.wrong(); flashFeedback(false);
        registerAnswer(false, activeTeamId, 0);
        setTimeout(()=>{ this.classList.remove("wrong-flash"); if(selectedLeft) selectedLeft.classList.remove("wrong-flash","selected"); selectedLeft=null; },400);
      }
    }}, p.right);
    colR.appendChild(item);
  });
  wrap.appendChild(colL); wrap.appendChild(colR);
  mount.appendChild(wrap);
}

/* ---------------- MODE: Puzzle Challenge (word scramble) ---------------- */
const PUZZLE_TERMS = ["JHUMMING","PLANTATION","MONSOON","IRRIGATION","GROUNDNUT","SUGARCANE","HORTICULTURE","ZAMINDARI","LEGUMINOUS","SUBSISTENCE"];
function scramble(word){
  let a = word.split("");
  do{ a = shuffleArray(a); } while(a.join("")===word && word.length>1);
  return a.join("");
}
function runPuzzle(){
  const mount = $("#game-mount");
  const terms = pickN(PUZZLE_TERMS,6);
  let idx=0, correctCount=0;
  sessionStreak=0;
  function renderQ(){
    mount.innerHTML="";
    const word = terms[idx];
    mount.appendChild(el("div",{class:"eyebrow mono"},`PUZZLE CHALLENGE — Q${idx+1}/${terms.length}`));
    const card = el("div",{class:"panel qcard"});
    card.appendChild(el("div",{class:"qtext mono",style:"letter-spacing:.3em;font-size:1.8rem;color:var(--orange)"}, scramble(word)));
    card.appendChild(el("p",{style:"color:var(--muted);margin-bottom:1rem"},"Unscramble this Agriculture-chapter term"));
    const row = el("div",{class:"fill-wrap"});
    const input = el("input",{class:"field",type:"text",placeholder:"Type the unscrambled word...",autocomplete:"off"});
    let answered=false;
    const submit=()=>{
      if(answered) return; answered=true;
      const correct = input.value.trim().toUpperCase()===word;
      input.style.borderColor = correct?"var(--green)":"var(--danger)";
      if(!correct) toast("Answer: "+word);
      if(correct) correctCount++;
      registerAnswer(correct, activeTeamId, correct?15:0);
      flashFeedback(correct);
      idx++;
      setTimeout(()=>{ idx<terms.length ? renderQ() : showRoundSummary("Puzzle Challenge", correctCount, terms.length); },900);
    };
    input.addEventListener("keydown",(e)=>{if(e.key==="Enter") submit();});
    row.appendChild(input);
    row.appendChild(el("button",{class:"btn primary",onclick:submit},"Submit"));
    card.appendChild(row);
    mount.appendChild(card);
  }
  renderQ();
}

/* ---------------- MODE: Group Battle ---------------- */
function runBattle(){
  const mount = $("#game-mount");
  const teams = STATE.teams;
  const totalTurns = teams.length * STATE.settings.roundsPerTeam;
  let pool = shuffleArray(allMcq());
  let turn=0, qi=0, timeLeft=STATE.settings.battleSeconds, timer=null;
  function currentTeam(){ return teams[turn % teams.length]; }
  function renderQ(){
    clearInterval(timer);
    if(qi>=pool.length) qi=0;
    const q = pool[qi];
    timeLeft = STATE.settings.battleSeconds;
    mount.innerHTML="";
    mount.appendChild(el("div",{class:"turn-banner"}, `TURN ${turn+1}/${totalTurns} — ${currentTeam().name}'S SHOT`));
    mount.appendChild(el("div",{class:"game-hud"},[
      el("div",{},[el("div",{class:"eyebrow mono"},"GROUP BATTLE"), el("div",{class:"timer-display",id:"gb-timer"},String(timeLeft))]),
      el("div",{},STATE.teams.map(t=>el("div",{class:"mono",style:`color:${t.color};font-size:.8rem`},`${t.name}: ${t.score}`)))
    ]));
    const card = el("div",{class:"panel qcard"});
    card.appendChild(questionMeta(q));
    card.appendChild(renderQImage(q));
    card.appendChild(el("div",{class:"qtext"}, q.q));
    let answered=false;
    const grid = el("div",{class:"options-grid"});
    q.opts.forEach((opt,i)=>{
      grid.appendChild(el("button",{class:"btn opt-btn",onclick:(e)=>{
        if(answered) return; answered=true; clearInterval(timer);
        const correct = i===q.a;
        e.currentTarget.classList.add(correct?"correct":"wrong");
        if(!correct) $$(".opt-btn",grid)[q.a].classList.add("correct");
        $$(".opt-btn",grid).forEach(b=>b.disabled=true);
        registerAnswer(correct, currentTeam().id, correct?10:0);
        flashFeedback(correct);
        advance();
      }}, `${String.fromCharCode(65+i)}.  ${opt}`));
    });
    card.appendChild(grid);
    mount.appendChild(card);
    timer = setInterval(()=>{
      timeLeft--;
      const d = $("#gb-timer"); if(d) d.textContent=String(timeLeft);
      if(timeLeft<=5 && timeLeft>0) Audio_.warn();
      if(timeLeft<=0 && !answered){
        answered=true; clearInterval(timer);
        toast(currentTeam().name+" ran out of time!");
        advance();
      }
    },1000);
  }
  function advance(){
    turn++; qi++;
    if(turn>=totalTurns){
      setTimeout(()=>finishBattle(),700);
    }else{
      setTimeout(renderQ,700);
    }
  }
  function finishBattle(){
    logLeaderboard("Group Battle");
    showEndScreen();
  }
  renderQ();
}

/* ---------------- MODE: Final Mega Challenge ---------------- */
function runMega(){
  const mount = $("#game-mount");
  let pool = shuffleArray([
    ...pickN(allMcq(),5).map(q=>({...q,qtype:"mcq"})),
    ...pickN(TF_BANK,3).map(q=>({...q,qtype:"tf"})),
    ...pickN(FILL_BANK,2).map(q=>({...q,qtype:"fill"}))
  ]);
  let idx=0, correctCount=0, timeLeft=STATE.settings.quizSeconds, timer=null;
  sessionStreak=0;
  function renderQ(){
    clearInterval(timer);
    timeLeft=STATE.settings.quizSeconds;
    mount.innerHTML="";
    const q = pool[idx];
    mount.appendChild(el("div",{class:"turn-banner"},"👑 FINAL MEGA CHALLENGE — DOUBLE POINTS"));
    mount.appendChild(el("div",{class:"game-hud"},[
      el("div",{class:"eyebrow mono"},`Q${idx+1}/${pool.length}`),
      el("div",{class:"timer-display",id:"mega-timer"},String(timeLeft))
    ]));
    const card = el("div",{class:"panel qcard"});
    card.appendChild(questionMeta(q));
    card.appendChild(renderQImage(q));
    card.appendChild(el("div",{class:"qtext"}, q.q));
    let answered=false;
    card.appendChild(renderAnswerArea(q,(correct)=>{
      if(answered) return; answered=true; clearInterval(timer);
      if(correct) correctCount++;
      registerAnswer(correct, activeTeamId, correct?20:0);
      flashFeedback(correct);
      idx++;
      setTimeout(()=>{ idx<pool.length ? renderQ() : finishMega(); },700);
    }));
    mount.appendChild(card);
    timer = setInterval(()=>{
      timeLeft--;
      const d = $("#mega-timer"); if(d) d.textContent=String(timeLeft);
      if(timeLeft<=5 && timeLeft>0) Audio_.warn();
      if(timeLeft<=0 && !answered){
        answered=true; clearInterval(timer);
        registerAnswer(false, activeTeamId, 0);
        idx++;
        setTimeout(()=>{ idx<pool.length ? renderQ() : finishMega(); },500);
      }
    },1000);
  }
  function finishMega(){
    logLeaderboard("Final Mega Challenge");
    showEndScreen();
  }
  renderQ();
}

/* ---------------- MODE: Image Identification (tools & irrigation) ---------------- */
function runImageID(){
  const mount = $("#game-mount");
  let pool = shuffleArray(TOOLS_BANK);
  let idx=0, correctCount=0;
  sessionStreak=0;
  function renderQ(){
    mount.innerHTML="";
    const q = pool[idx];
    const wrongNames = shuffleArray(TOOLS_BANK.filter(c=>c.name!==q.name)).slice(0,3).map(c=>c.name);
    const options = shuffleArray([q.name,...wrongNames]);
    mount.appendChild(el("div",{class:"eyebrow mono"},`IMAGE IDENTIFICATION — Q${idx+1}/${pool.length} (${q.cat==="tool"?"Farming Tool":"Irrigation Method"})`));
    const card = el("div",{class:"panel qcard"});
    card.appendChild(el("div",{class:"crop-display"}, q.emoji));
    card.appendChild(el("div",{class:"crop-clue"}, q.clue));
    const grid = el("div",{class:"options-grid"});
    let answered=false;
    options.forEach(name=>{
      grid.appendChild(el("button",{class:"btn opt-btn",onclick:(e)=>{
        if(answered) return; answered=true;
        const correct = name===q.name;
        e.currentTarget.classList.add(correct?"correct":"wrong");
        if(!correct){ $$(".opt-btn",grid).forEach(b=>{ if(b.textContent.trim()===q.name) b.classList.add("correct"); }); }
        $$(".opt-btn",grid).forEach(b=>b.disabled=true);
        if(correct) correctCount++;
        registerAnswer(correct, activeTeamId, correct?10:0);
        flashFeedback(correct);
        idx++;
        setTimeout(()=>{ idx<pool.length ? renderQ() : showRoundSummary("Image Identification", correctCount, pool.length); },700);
      }}, name));
    });
    card.appendChild(grid);
    mount.appendChild(card);
  }
  renderQ();
}

/* ---------------- MODE: Map Challenge (state grid) ---------------- */
function runMapChallenge(){
  const mount = $("#game-mount");
  let pool = shuffleArray(STATE_BANK);
  let idx=0, correctCount=0;
  sessionStreak=0;
  function renderQ(){
    mount.innerHTML="";
    const q = pool[idx];
    mount.appendChild(el("div",{class:"eyebrow mono"},`MAP CHALLENGE — Q${idx+1}/${pool.length}`));
    const card = el("div",{class:"panel qcard"});
    card.appendChild(el("div",{class:"qtext"}, `Which state is the leading producer of ${q.crop}?`));
    card.appendChild(el("div",{class:"crop-clue"}, q.clue));
    const grid = el("div",{class:"options-grid",style:"grid-template-columns:repeat(auto-fit,minmax(140px,1fr));"});
    let answered=false;
    const displayStates = shuffleArray(Array.from(new Set([...q.options, ...pickN(INDIA_STATE_GRID.filter(s=>!q.options.includes(s)),Math.max(0,8-q.options.length))])));
    displayStates.forEach(state=>{
      grid.appendChild(el("button",{class:"btn opt-btn sm",onclick:(e)=>{
        if(answered) return; answered=true;
        const correct = state===q.correct;
        e.currentTarget.classList.add(correct?"correct":"wrong");
        if(!correct){ $$(".opt-btn",grid).forEach(b=>{ if(b.textContent.trim()===q.correct) b.classList.add("correct"); }); }
        $$(".opt-btn",grid).forEach(b=>b.disabled=true);
        if(correct) correctCount++;
        registerAnswer(correct, activeTeamId, correct?10:0);
        flashFeedback(correct);
        idx++;
        setTimeout(()=>{ idx<pool.length ? renderQ() : showRoundSummary("Map Challenge", correctCount, pool.length); },700);
      }}, state));
    });
    card.appendChild(grid);
    mount.appendChild(card);
  }
  renderQ();
}

/* ---------------- MODE: Crop Detective (progressive clues) ---------------- */
function runCropDetective(){
  const mount = $("#game-mount");
  let pool = shuffleArray(CLUE_BANK);
  let idx=0, correctCount=0;
  sessionStreak=0;
  function renderQ(){
    let revealed=1, answered=false;
    function draw(){
      mount.innerHTML="";
      const q = pool[idx];
      mount.appendChild(el("div",{class:"eyebrow mono"},`CROP DETECTIVE — Case ${idx+1}/${pool.length}`));
      const card = el("div",{class:"panel qcard"});
      for(let i=0;i<revealed;i++){
        card.appendChild(el("p",{style:"margin-bottom:.6rem;font-style:italic;color:var(--ink)"}, `🔍 Clue ${i+1}: ${q.clues[i]}`));
      }
      const pts = revealed===1?15:revealed===2?10:5;
      card.appendChild(el("p",{class:"mono",style:"color:var(--orange);margin:.5rem 0 1rem"},`Worth ${pts} points if you solve it now`));
      const row = el("div",{class:"fill-wrap"});
      const input = el("input",{class:"field",type:"text",placeholder:"Which crop am I?",autocomplete:"off"});
      const submit=()=>{
        if(answered) return; answered=true;
        const correct = input.value.trim().toLowerCase()===q.name.toLowerCase();
        input.style.borderColor = correct?"var(--green)":"var(--danger)";
        if(!correct) toast("It was: "+q.name);
        if(correct) correctCount++;
        registerAnswer(correct, activeTeamId, correct?pts:0);
        flashFeedback(correct);
        idx++;
        setTimeout(()=>{ idx<pool.length ? renderQ() : showRoundSummary("Crop Detective", correctCount, pool.length); },900);
      };
      input.addEventListener("keydown",(e)=>{if(e.key==="Enter") submit();});
      row.appendChild(input);
      row.appendChild(el("button",{class:"btn primary",onclick:submit},"Accuse"));
      card.appendChild(row);
      if(revealed<q.clues.length){
        card.appendChild(el("button",{class:"btn ghost sm",style:"margin-top:1rem",onclick:()=>{ revealed++; draw(); }},"🔍 Reveal Next Clue (-points)"));
      }
      mount.appendChild(card);
    }
    draw();
  }
  renderQ();
}

/* ---------------- MODE: Spin the Wheel ---------------- */
function runSpinWheel(){
  const mount = $("#game-mount");
  const cats = Array.from(new Set(MCQ_BANK.map(q=>q.cat)));
  mount.innerHTML="";
  mount.appendChild(el("div",{class:"eyebrow mono"},"SPIN THE WHEEL — RANDOM CATEGORY"));
  const card = el("div",{class:"panel qcard"});
  const wheel = el("div",{id:"wheel-disc",style:`
    width:min(70vw,260px);height:min(70vw,260px);border-radius:50%;margin:1rem auto;
    background:conic-gradient(${cats.map((c,i)=>`${i%2?"var(--blue)":"var(--green)"} ${i*360/cats.length}deg ${(i+1)*360/cats.length}deg`).join(",")});
    border:4px solid var(--orange); transition:transform 4s cubic-bezier(.17,.67,.32,1.02);
    box-shadow:0 0 30px rgba(255,138,30,.4);
  `});
  card.appendChild(wheel);
  const resultText = el("div",{class:"qtext",id:"wheel-result"}, "Spin to select a mission category!");
  card.appendChild(resultText);
  const spinBtn = el("button",{class:"btn primary",onclick:()=>{
    spinBtn.disabled = true;
    const chosenIdx = Math.floor(Math.random()*cats.length);
    const segDeg = 360/cats.length;
    const targetDeg = 360*5 + (360 - (chosenIdx*segDeg + segDeg/2));
    wheel.style.transform = `rotate(${targetDeg}deg)`;
    Audio_.click();
    setTimeout(()=>{
      const category = cats[chosenIdx];
      resultText.textContent = `🎯 Category selected: ${category}`;
      card.appendChild(el("button",{class:"btn orange",style:"margin-top:1rem",onclick:()=>runCategoryQuiz(category)}, "▶ Start "+category+" Quiz"));
    },4100);
  }}, "🎡 SPIN");
  card.appendChild(spinBtn);
  mount.appendChild(card);
}
function runCategoryQuiz(category){
  const mount = $("#game-mount");
  let pool = pickN(allMcq().filter(q=>q.cat===category),5).map(q=>({...q,qtype:"mcq"}));
  if(!pool.length){ toast("Not enough questions in this category yet"); return; }
  let idx=0, correctCount=0;
  sessionStreak=0;
  function renderQ(){
    mount.innerHTML="";
    const q = pool[idx];
    mount.appendChild(el("div",{class:"eyebrow mono"},`${category.toUpperCase()} — Q${idx+1}/${pool.length}`));
    const card = el("div",{class:"panel qcard"});
    card.appendChild(questionMeta(q));
    card.appendChild(renderQImage(q));
    card.appendChild(el("div",{class:"qtext"}, q.q));
    card.appendChild(renderAnswerArea(q,(correct)=>{
      if(correct) correctCount++;
      registerAnswer(correct, activeTeamId, correct?10:0);
      flashFeedback(correct);
      idx++;
      setTimeout(()=>{ idx<pool.length ? renderQ() : showRoundSummary("Spin the Wheel: "+category, correctCount, pool.length); },650);
    }));
    mount.appendChild(card);
  }
  renderQ();
}

/* ---------------- MODE: Harvest Hunt ---------------- */
function runHarvestHunt(){
  const mount = $("#game-mount");
  const targetCount = 8;
  let pool = shuffleArray(allMcq()).map(q=>({...q,qtype:"mcq"}));
  let idx=0, basket=[];
  sessionStreak=0;
  function renderQ(){
    mount.innerHTML="";
    const q = pool[idx];
    mount.appendChild(el("div",{class:"eyebrow mono"},`HARVEST HUNT — Basket: ${basket.length}/${targetCount}`));
    mount.appendChild(el("div",{style:"font-size:2rem;text-align:center;margin-bottom:1rem;letter-spacing:.3em;"}, basket.join(" ")||"🧺 empty basket"));
    const card = el("div",{class:"panel qcard"});
    card.appendChild(questionMeta(q));
    card.appendChild(renderQImage(q));
    card.appendChild(el("div",{class:"qtext"}, q.q));
    card.appendChild(renderAnswerArea(q,(correct)=>{
      registerAnswer(correct, activeTeamId, correct?10:0);
      flashFeedback(correct);
      if(correct){ basket.push(CROP_BANK[Math.floor(Math.random()*CROP_BANK.length)].emoji); }
      idx++;
      setTimeout(()=>{
        if(basket.length>=targetCount || idx>=pool.length){ showRoundSummary("Harvest Hunt", basket.length, targetCount); }
        else renderQ();
      },650);
    }));
    mount.appendChild(card);
  }
  renderQ();
}

/* ---------------- MODE: Survival Mode ---------------- */
function runSurvival(){
  const mount = $("#game-mount");
  let pool = shuffleArray([
    ...allMcq().map(q=>({...q,qtype:"mcq"})),
    ...TF_BANK.map(q=>({...q,qtype:"tf"})),
    ...FILL_BANK.map(q=>({...q,qtype:"fill"}))
  ]);
  let idx=0, survived=0;
  sessionStreak=0;
  function renderQ(){
    mount.innerHTML="";
    if(idx>=pool.length) idx=0;
    const q = pool[idx];
    mount.appendChild(el("div",{class:"turn-banner"},`💀 SURVIVAL MODE — ${survived} SURVIVED — ONE MISTAKE ENDS THE RUN`));
    const card = el("div",{class:"panel qcard"});
    card.appendChild(questionMeta(q));
    card.appendChild(renderQImage(q));
    card.appendChild(el("div",{class:"qtext"}, q.q));
    card.appendChild(renderAnswerArea(q,(correct)=>{
      registerAnswer(correct, activeTeamId, correct?10:0);
      flashFeedback(correct);
      if(correct){
        survived++; idx++;
        setTimeout(renderQ,600);
      }else{
        setTimeout(()=>showRoundSummary("Survival Mode", survived, survived+1),700);
      }
    }));
    mount.appendChild(card);
  }
  renderQ();
}

/* ---------------- MODE: Final Boss Round ---------------- */
function runFinalBoss(){
  const mount = $("#game-mount");
  let hardPool = shuffleArray([
    ...MCQ_BANK.filter(q=>q.d==="hard").map(q=>({...q,qtype:"mcq"})),
    ...TF_BANK.filter(q=>q.d==="hard").map(q=>({...q,qtype:"tf"})),
    ...FILL_BANK.filter(q=>q.d==="hard").map(q=>({...q,qtype:"fill"}))
  ]);
  let idx=0, survived=0;
  sessionStreak=0;
  function renderQ(){
    mount.innerHTML="";
    if(idx>=hardPool.length){ setTimeout(()=>{ logLeaderboard("Final Boss Round"); showEndScreen(); },400); return; }
    const q = hardPool[idx];
    mount.appendChild(el("div",{class:"turn-banner",style:"border-color:var(--danger);color:var(--danger);background:rgba(255,45,85,.1)"},`👑 FINAL BOSS ROUND — HARD ONLY · DOUBLE POINTS · ONE LIFE`));
    const card = el("div",{class:"panel qcard"});
    card.appendChild(questionMeta(q));
    card.appendChild(renderQImage(q));
    card.appendChild(el("div",{class:"qtext"}, q.q));
    card.appendChild(renderAnswerArea(q,(correct)=>{
      registerAnswer(correct, activeTeamId, correct?20:0);
      flashFeedback(correct);
      if(correct){ survived++; idx++; setTimeout(renderQ,650); }
      else{ setTimeout(()=>{ logLeaderboard("Final Boss Round"); showEndScreen(); },700); }
    }));
    mount.appendChild(card);
  }
  renderQ();
}

/* ---------------- Round summary (non-battle modes) ---------------- */
function showRoundSummary(modeName, correct, total){
  const mount = $("#game-mount");
  mount.innerHTML="";
  const acc = total? Math.round((correct/total)*100):0;
  mount.appendChild(el("div",{class:"panel qcard"},[
    el("h2",{style:"color:var(--green);margin-bottom:1rem"},"MISSION COMPLETE"),
    el("p",{class:"mono",style:"font-size:1.1rem;margin-bottom:.5rem"},`${modeName}`),
    el("p",{class:"mono",style:"font-size:2rem;color:var(--blue)"},`${correct} / ${total} correct (${acc}%)`),
    el("div",{class:"btn-row",style:"justify-content:center;margin-top:1.5rem"},[
      el("button",{class:"btn primary",onclick:()=>showView("view-home")},"🏠 Return Home"),
      el("button",{class:"btn orange",onclick:()=>showEndScreen()},"🏆 Declare Winner")
    ])
  ]));
  logLeaderboard(modeName);
}

function logLeaderboard(modeName){
  const top = [...STATE.teams].sort((a,b)=>b.score-a.score)[0];
  STATE.leaderboard.unshift({mode:modeName, team:top?top.name:"—", score:top?top.score:0, date:new Date().toISOString()});
  STATE.leaderboard = STATE.leaderboard.slice(0,25);
  saveState();
}

/* ---------------- End / Winner screen ---------------- */
function showEndScreen(){
  Audio_.victory(); Audio_.stopMusic();
  const sorted = [...STATE.teams].sort((a,b)=>b.score-a.score);
  const winner = sorted[0];
  $("#winner-name").textContent = winner ? `${winner.name} WINS!` : "No teams";
  const board = $("#final-board");
  board.innerHTML="";
  sorted.forEach((t,i)=>{
    board.appendChild(el("div",{class:"panel team-card"},[
      el("div",{class:"team-colorbar",style:`background:${t.color}`}),
      el("div",{class:"name"}, (i===0?"🥇 ":i===1?"🥈 ":i===2?"🥉 ":"")+t.name),
      el("div",{class:"pts mono"}, String(t.score))
    ]));
  });
  showView("view-end");
  launchConfetti();
}
function playAgain(){ showView("view-home"); }

/* ---------------- Confetti canvas ---------------- */
function launchConfetti(){
  const canvas = $("#confetti");
  canvas.width = innerWidth; canvas.height = innerHeight;
  const ctx = canvas.getContext("2d");
  const colors = ["#00e5ff","#39ff88","#ff8a1e","#ff2d55","#ffe066"];
  let pieces = Array.from({length:140},()=>({
    x:Math.random()*canvas.width, y:-20-Math.random()*canvas.height,
    r:4+Math.random()*6, c:colors[Math.floor(Math.random()*colors.length)],
    vy:2+Math.random()*3, vx:-1.5+Math.random()*3, rot:Math.random()*360, vr:-6+Math.random()*12
  }));
  let frames=0;
  function loop(){
    frames++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy; p.rot+=p.vr;
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot*Math.PI/180);
      ctx.fillStyle=p.c; ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r*1.6);
      ctx.restore();
    });
    if(frames<260) requestAnimationFrame(loop);
    else ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  loop();
}

/* ---------------- Daily Challenge ---------------- */
function startDailyChallenge(){
  const seed = new Date().toISOString().slice(0,10).split("-").reduce((a,b)=>a+Number(b),0);
  const pool = allMcq();
  const shuffled = pool.slice().sort((a,b)=> ((a.id.charCodeAt(1)+seed)%7) - ((b.id.charCodeAt(1)+seed)%7));
  window.__dailyPool = shuffled.slice(0,10);
  activeTeamId = STATE.teams[0].id;
  showView("view-game");
  runDailyFromPool();
}
function runDailyFromPool(){
  const mount = $("#game-mount");
  let pool = window.__dailyPool.map(q=>({...q,qtype:"mcq"}));
  let idx=0, correctCount=0;
  sessionStreak=0;
  function renderQ(){
    mount.innerHTML="";
    const q = pool[idx];
    mount.appendChild(el("div",{class:"eyebrow mono"},`📅 DAILY CHALLENGE — Q${idx+1}/${pool.length}`));
    const card = el("div",{class:"panel qcard"});
    card.appendChild(questionMeta(q));
    card.appendChild(renderQImage(q));
    card.appendChild(el("div",{class:"qtext"}, q.q));
    card.appendChild(renderAnswerArea(q,(correct)=>{
      if(correct) correctCount++;
      registerAnswer(correct, activeTeamId, correct?10:0);
      flashFeedback(correct);
      idx++;
      setTimeout(()=>{ idx<pool.length?renderQ():showRoundSummary("Daily Challenge",correctCount,pool.length); },650);
    }));
    mount.appendChild(card);
  }
  renderQ();
}

/* ---------------- Leaderboard view ---------------- */
function renderLeaderboard(){
  const box = $("#leaderboard-list");
  box.innerHTML="";
  if(!STATE.leaderboard.length){ box.appendChild(el("p",{style:"color:var(--muted)"},"No completed missions yet. Finish a game mode to appear here.")); return; }
  STATE.leaderboard.forEach(entry=>{
    box.appendChild(el("div",{class:"panel flex-between",style:"margin-bottom:.6rem;padding:.9rem 1.2rem"},[
      el("div",{},[el("strong",{},entry.team), el("div",{style:"color:var(--muted);font-size:.78rem"},entry.mode+" · "+new Date(entry.date).toLocaleString())]),
      el("div",{class:"mono",style:"color:var(--green);font-size:1.2rem"}, String(entry.score))
    ]));
  });
}

/* ---------------- Teacher / Admin Panel ---------------- */
const TEACHER_PASSWORD = "teacher123";
function tryTeacherLogin(){
  const pass = $("#teacher-pass").value;
  if(pass===TEACHER_PASSWORD){
    $("#teacher-login").classList.add("hidden");
    $("#teacher-panel").classList.remove("hidden");
    renderTeacherQuestions();
    toast("Teacher access granted");
  }else{
    toast("Incorrect password");
  }
}
function renderTeacherQuestions(){
  const box = $("#teacher-question-list");
  box.innerHTML="";
  if(!STATE.customQuestions.length){ box.appendChild(el("p",{style:"color:var(--muted)"},"No custom questions added yet.")); return; }
  STATE.customQuestions.forEach((q,i)=>{
    box.appendChild(el("div",{class:"panel flex-between",style:"margin-bottom:.5rem;padding:.7rem 1rem"},[
      el("div",{},q.q),
      el("button",{class:"btn danger sm",onclick:()=>{STATE.customQuestions.splice(i,1);saveState();renderTeacherQuestions();}},"Delete")
    ]));
  });
}
let _tqImageData = null;
function handleTqImageUpload(e){
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = ()=>{ _tqImageData = reader.result; toast("Image attached to next question"); };
  reader.readAsDataURL(file);
}
function addCustomQuestion(){
  const q = $("#tq-question").value.trim();
  const opts = [$("#tq-opt0").value.trim(),$("#tq-opt1").value.trim(),$("#tq-opt2").value.trim(),$("#tq-opt3").value.trim()];
  const correctIdx = Number($("#tq-correct").value);
  const difficulty = $("#tq-difficulty").value;
  const category = $("#tq-category").value.trim() || "Teacher Added";
  if(!q || opts.some(o=>!o)){ toast("Fill in the question and all four options"); return; }
  STATE.customQuestions.push({id:"custom"+Date.now(),d:difficulty,cat:category,q,opts,a:correctIdx,exp:"Added by teacher.",img:_tqImageData||null});
  _tqImageData = null;
  saveState(); renderTeacherQuestions();
  ["tq-question","tq-opt0","tq-opt1","tq-opt2","tq-opt3","tq-category"].forEach(id=>$("#"+id).value="");
  $("#tq-image").value="";
  toast("Question added to the bank");
}
function exportResultsCSV(){
  let rows = [["Team","Score","Correct","Wrong","Accuracy"]];
  STATE.teams.forEach(t=>{
    const total=t.correct+t.wrong; const acc = total?Math.round(t.correct/total*100):0;
    rows.push([t.name,t.score,t.correct,t.wrong,acc+"%"]);
  });
  rows.push([]); rows.push(["Mode","Winning Team","Score","Date"]);
  STATE.leaderboard.forEach(l=>rows.push([l.mode,l.team,l.score,l.date]));
  const csv = rows.map(r=>r.join(",")).join("\n");
  const blob = new Blob([csv],{type:"text/csv"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "agri-ops-results.csv";
  a.click();
  toast("CSV downloaded — opens directly in Excel");
}
function exportResultsPDF(){
  if(window.jspdf && window.jspdf.jsPDF){
    const {jsPDF} = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(16); doc.text("AGRI-OPS Field Command — Mission Results",10,15);
    doc.setFontSize(11);
    let y=28;
    doc.text("Team Standings:",10,y); y+=8;
    [...STATE.teams].sort((a,b)=>b.score-a.score).forEach((t,i)=>{
      const total=t.correct+t.wrong; const acc=total?Math.round(t.correct/total*100):0;
      doc.text(`${i+1}. ${t.name} — Score ${t.score} | Correct ${t.correct} | Wrong ${t.wrong} | Accuracy ${acc}%`,10,y);
      y+=7;
    });
    y+=6;
    doc.text("Recent Missions:",10,y); y+=8;
    STATE.leaderboard.slice(0,18).forEach(l=>{
      if(y>280){ doc.addPage(); y=15; }
      doc.text(`${l.mode} — Winner: ${l.team} (${l.score} pts) — ${new Date(l.date).toLocaleDateString()}`,10,y);
      y+=7;
    });
    doc.save("agri-ops-results.pdf");
    toast("PDF downloaded");
  }else{
    toast("PDF library unavailable offline — opening browser Print instead");
    window.print();
  }
}
function exportResultsXLSX(){
  if(window.XLSX){
    const teamRows = STATE.teams.map(t=>{
      const total=t.correct+t.wrong; const acc=total?Math.round(t.correct/total*100):0;
      return {Team:t.name,Score:t.score,Correct:t.correct,Wrong:t.wrong,"Accuracy %":acc};
    });
    const lbRows = STATE.leaderboard.map(l=>({Mode:l.mode,Winner:l.team,Score:l.score,Date:l.date}));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(teamRows), "Team Standings");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(lbRows), "Leaderboard");
    XLSX.writeFile(wb, "agri-ops-results.xlsx");
    toast("Excel file downloaded");
  }else{
    toast("Excel library unavailable offline — downloading CSV instead");
    exportResultsCSV();
  }
}

/* ---------------- Fullscreen / Mute / Contrast ---------------- */
function toggleFullscreen(){
  if(!document.fullscreenElement) document.documentElement.requestFullscreen().catch(()=>toast("Fullscreen not available"));
  else document.exitFullscreen();
}
function toggleMute(){
  STATE.settings.muted = !STATE.settings.muted;
  $("#mute-icon").textContent = STATE.settings.muted ? "🔇" : "🔊";
  if(STATE.settings.muted) Audio_.stopMusic(); else Audio_.startMusic();
  saveState();
}
function toggleContrast(){
  STATE.settings.highContrast = !STATE.settings.highContrast;
  document.body.classList.toggle("high-contrast", STATE.settings.highContrast);
  saveState();
}
function setLightMode(on){
  STATE.settings.lightMode = on;
  document.body.classList.toggle("light-mode", on);
  saveState();
}
function setAnimations(on){
  STATE.settings.animationsOn = on;
  document.body.classList.toggle("no-anim", !on);
  saveState();
}

/* ---------------- Settings view ---------------- */
function initSettingsView(){
  const s = STATE.settings;
  $("#set-music-vol").value = Math.round(s.musicVolume*100);
  $("#set-sfx-vol").value = Math.round(s.sfxVolume*100);
  $("#set-theme").value = s.lightMode ? "light":"dark";
  $("#set-animations").value = s.animationsOn ? "on":"off";
  $("#set-difficulty").value = s.difficultyFilter;
  $("#set-qcount").value = s.defaultQuestionCount;
  $("#set-rapid-secs").value = s.rapidSeconds;
  $("#set-battle-secs").value = s.battleSeconds;
  $("#set-quiz-secs").value = s.quizSeconds;
  $("#set-rounds").value = s.roundsPerTeam;

  $("#set-music-vol").oninput = (e)=>{ s.musicVolume = Number(e.target.value)/100; saveState(); };
  $("#set-sfx-vol").oninput = (e)=>{ s.sfxVolume = Number(e.target.value)/100; saveState(); Audio_.click(); };
  $("#set-theme").onchange = (e)=> setLightMode(e.target.value==="light");
  $("#set-animations").onchange = (e)=> setAnimations(e.target.value==="on");
  $("#set-difficulty").onchange = (e)=>{ s.difficultyFilter = e.target.value; saveState(); toast("Difficulty filter set to "+e.target.value); };
  $("#set-qcount").onchange = (e)=>{ s.defaultQuestionCount = Math.max(3,Math.min(30,Number(e.target.value)||10)); saveState(); };
  $("#set-rapid-secs").onchange = (e)=>{ s.rapidSeconds = Math.max(30,Number(e.target.value)||180); saveState(); };
  $("#set-battle-secs").onchange = (e)=>{ s.battleSeconds = Math.max(5,Number(e.target.value)||20); saveState(); };
  $("#set-quiz-secs").onchange = (e)=>{ s.quizSeconds = Math.max(5,Number(e.target.value)||15); saveState(); };
  $("#set-rounds").onchange = (e)=>{ s.roundsPerTeam = Math.max(1,Number(e.target.value)||5); saveState(); };
  $("#set-music-toggle").checked = s.musicOn;
  $("#set-music-toggle").onchange = (e)=>{ s.musicOn = e.target.checked; if(!s.musicOn) Audio_.stopMusic(); else Audio_.startMusic(); saveState(); };
}

/* ---------------- Title editing ---------------- */
function initTitle(){
  const h1 = $("#site-title");
  h1.textContent = STATE.title;
  h1.addEventListener("blur",()=>{
    STATE.title = h1.textContent.trim() || DEFAULT_STATE.title;
    h1.textContent = STATE.title;
    saveState();
  });
  h1.addEventListener("keydown",(e)=>{ if(e.key==="Enter"){ e.preventDefault(); h1.blur(); } });
}

/* ---------------- Init ---------------- */
function init(){
  document.body.classList.toggle("high-contrast", STATE.settings.highContrast);
  document.body.classList.toggle("light-mode", STATE.settings.lightMode);
  document.body.classList.toggle("no-anim", !STATE.settings.animationsOn);
  $("#mute-icon").textContent = STATE.settings.muted ? "🔇" : "🔊";
  initTitle();
  renderMiniScoreboard();
  renderModes();
  renderTeams();
  $("#add-team-btn").addEventListener("click",addTeam);
  $("#new-team-name").addEventListener("keydown",(e)=>{if(e.key==="Enter")addTeam();});
  $("#reset-scores-btn").addEventListener("click",resetAllScores);
  $("#fullscreen-btn").addEventListener("click",toggleFullscreen);
  $("#mute-btn").addEventListener("click",toggleMute);
  $("#contrast-btn").addEventListener("click",toggleContrast);
  $("#daily-btn").addEventListener("click",startDailyChallenge);
  $("#leaderboard-btn").addEventListener("click",()=>{renderLeaderboard();showView("view-leaderboard");});
  $("#teacher-btn").addEventListener("click",()=>showView("view-teacher"));
  $("#settings-btn").addEventListener("click",()=>{initSettingsView();showView("view-settings");});
  $("#teacher-login-btn").addEventListener("click",tryTeacherLogin);
  $("#add-question-btn").addEventListener("click",addCustomQuestion);
  $("#tq-image").addEventListener("change",handleTqImageUpload);
  $("#export-csv-btn").addEventListener("click",exportResultsCSV);
  $("#export-pdf-btn").addEventListener("click",exportResultsPDF);
  $("#export-xlsx-btn").addEventListener("click",exportResultsXLSX);
  $("#teacher-reset-btn").addEventListener("click",resetAllScores);
  $("#mystery-close-btn").addEventListener("click",()=>$("#mystery-backdrop").classList.remove("show"));
  $$(".nav-home").forEach(b=>b.addEventListener("click",()=>showView("view-home")));
  $$(".nav-modes").forEach(b=>b.addEventListener("click",()=>{renderModes();showView("view-modes");}));
  $$(".nav-teams").forEach(b=>b.addEventListener("click",()=>{renderTeams();showView("view-teams");}));
  $("#play-again-btn").addEventListener("click",()=>{resetAllScores();showView("view-home");});
  $("#end-return-home-btn").addEventListener("click",()=>showView("view-home"));
  $("#start-game-btn").addEventListener("click",()=>{renderModes();showView("view-modes");Audio_.click();});

  document.addEventListener("click",()=>{ if(!STATE.settings.muted) Audio_.startMusic(); },{once:true});

  window.addEventListener("resize",()=>{ const c=$("#confetti"); if(c){c.width=innerWidth;c.height=innerHeight;} });

  // Register service worker for offline play
  if("serviceWorker" in navigator){
    navigator.serviceWorker.register("./sw.js").catch(()=>{});
  }

  setTimeout(()=>{
    $("#loader").style.opacity="0";
    setTimeout(()=>$("#loader").remove(),500);
  },1200);

  showView("view-home");
}
document.addEventListener("DOMContentLoaded",init);
