import { useState, useEffect } from "react";

const SUPA_URL = "https://rlihxbfvigzmqjgqoqiu.supabase.co";
const SUPA_KEY = "sb_publishable_LonxXVeF0nc5EHDcmGR_Lw_AHfFaVjO";

async function sbGet(table) {
  const r = await fetch(SUPA_URL+"/rest/v1/"+table+"?select=*", {
    headers: {"apikey":SUPA_KEY,"Authorization":"Bearer "+SUPA_KEY,"Content-Type":"application/json"}
  });
  return r.ok ? r.json() : [];
}
async function sbUpsert(table, row) {
  await fetch(SUPA_URL+"/rest/v1/"+table, {
    method:"POST",
    headers: {"apikey":SUPA_KEY,"Authorization":"Bearer "+SUPA_KEY,"Content-Type":"application/json","Prefer":"resolution=merge-duplicates"},
    body: JSON.stringify(row)
  });
}
async function sbDelete(table, id) {
  await fetch(SUPA_URL+"/rest/v1/"+table+"?id=eq."+id, {
    method:"DELETE",
    headers: {"apikey":SUPA_KEY,"Authorization":"Bearer "+SUPA_KEY}
  });
}

const LS_KEY = "califts_v4";
const defaultExercises = [
  {id:"ex001",name:"COIFFE DES ROTATEURS",category:"Epaules",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=32"},
  {id:"ex002",name:"ROTATIONS CUBAINES POULIE",category:"Epaules",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=55"},
  {id:"ex003",name:"CORDE A SAUTER",category:"Cardio",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=80"},
  {id:"ex004",name:"INCH WORM",category:"Mobilite",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=92"},
  {id:"ex005",name:"GAINAGE PLANCHE",category:"Abdos",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=111"},
  {id:"ex006",name:"GAINAGE MILITAIRE",category:"Abdos",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=127"},
  {id:"ex007",name:"GAINAGE SUPERMAN LOMB",category:"Lombaires",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=140"},
  {id:"ex008",name:"GAINAGE SUPERMAN ABDOS",category:"Abdos",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=154"},
  {id:"ex009",name:"GAINAGE LATERAL",category:"Abdos",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=168"},
  {id:"ex010",name:"GAINAGE SWISS BALL",category:"Abdos",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=190"},
  {id:"ex011",name:"GLUTE BRIDGE SWISS BALL",category:"Fessiers",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=212"},
  {id:"ex012",name:"CURL ISCHIO SWISS BALL",category:"Ischios",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=231"},
  {id:"ex013",name:"KICKBACK TALONS CIEL",category:"Fessiers",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=256"},
  {id:"ex014",name:"CLAMS",category:"Fessiers",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=279"},
  {id:"ex015",name:"HOLLOW PLANCHE",category:"Abdos",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=298"},
  {id:"ex016",name:"POMPES",category:"Poitrine",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=314"},
  {id:"ex017",name:"HANDSTAND PUSH-UP",category:"Epaules",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=369"},
  {id:"ex018",name:"L-SIT BAR",category:"Abdos",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=388"},
  {id:"ex019",name:"CRUNCH / SIT-UP",category:"Abdos",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=414"},
  {id:"ex020",name:"JUMPING-JACK",category:"Cardio",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=436"},
  {id:"ex021",name:"BURPEES / BROAD JUMP",category:"Cardio",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=447"},
  {id:"ex022",name:"BOX JUMP",category:"Cardio",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=465"},
  {id:"ex023",name:"MOUNTAIN CLIMBER",category:"Cardio",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=476"},
  {id:"ex024",name:"BATTLE ROPE",category:"Cardio",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=486"},
  {id:"ex025",name:"RAMEUR",category:"Cardio",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=496"},
  {id:"ex026",name:"ASSAULT BIKE",category:"Cardio",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=517"},
  {id:"ex027",name:"SKI-ERG",category:"Cardio",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=528"},
  {id:"ex028",name:"DIPS",category:"Bras",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=548"},
  {id:"ex029",name:"TRACTIONS PRONATION",category:"Dos",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=563"},
  {id:"ex030",name:"TRACTIONS SUPINATION",category:"Dos",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=590"},
  {id:"ex031",name:"TRACTIONS PRISE NEUTRE",category:"Dos",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=607"},
  {id:"ex032",name:"TRACTIONS AUSTRA PRONA",category:"Dos",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=632"},
  {id:"ex033",name:"TRACTIONS AUSTRA SUPI",category:"Dos",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=660"},
  {id:"ex034",name:"TRACTIONS AUSTRA TRX",category:"Dos",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=673"},
  {id:"ex035",name:"SKULL-CRUSHER",category:"Bras",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=686"},
  {id:"ex036",name:"BARRE AU FRONT EZ",category:"Bras",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=703"},
  {id:"ex037",name:"CURL BICEPS EZ",category:"Bras",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=728"},
  {id:"ex038",name:"TIRAGE MENTON EZ",category:"Epaules",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=752"},
  {id:"ex039",name:"EXT TRICEPS HALTERE",category:"Bras",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=777"},
  {id:"ex040",name:"GOBLET SQUAT",category:"Jambes",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=798"},
  {id:"ex041",name:"KETTLEBELL SWING RUSSIAN",category:"Fessiers",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=817"},
  {id:"ex042",name:"KETTLEBELL SWING US",category:"Fessiers",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=831"},
  {id:"ex043",name:"TIRAGE BUCHERON",category:"Dos",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=840"},
  {id:"ex044",name:"CURL MARTEAU ASSIS",category:"Bras",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=873"},
  {id:"ex045",name:"CURL SPIDER",category:"Bras",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=895"},
  {id:"ex046",name:"DEVELOPPE COUCHE BARRE",category:"Poitrine",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=913"},
  {id:"ex047",name:"BACK SQUAT",category:"Jambes",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=962"},
  {id:"ex048",name:"SOULEVE DE TERRE",category:"Dos",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1000"},
  {id:"ex049",name:"RDL",category:"Ischios",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1032"},
  {id:"ex050",name:"HIP-THRUST",category:"Fessiers",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1066"},
  {id:"ex051",name:"ROWING BUSTE PENCHE",category:"Dos",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1108"},
  {id:"ex052",name:"DEVELOPPE MILITAIRE BARRE",category:"Epaules",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1129"},
  {id:"ex053",name:"DEV MILITAIRE BARRE ASSIS",category:"Epaules",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1155"},
  {id:"ex054",name:"DEV MILITAIRE HALTERE ASSIS",category:"Epaules",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1187"},
  {id:"ex055",name:"FRONT SQUAT",category:"Jambes",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1210"},
  {id:"ex056",name:"ZERCHER SQUAT",category:"Jambes",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1236"},
  {id:"ex057",name:"ZERCHER FENTES ARRIERE",category:"Jambes",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1270"},
  {id:"ex058",name:"FENTES ARRIERE ALTERNEES",category:"Jambes",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1283"},
  {id:"ex059",name:"FENTES ARRIERE CLASSIQUE",category:"Jambes",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1295"},
  {id:"ex060",name:"FENTES MARCHEES",category:"Jambes",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1312"},
  {id:"ex061",name:"FENTES BULGARES",category:"Jambes",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1329"},
  {id:"ex062",name:"FENTES ARRIERE BARRE",category:"Jambes",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1358"},
  {id:"ex063",name:"FENTES SANDBAG",category:"Jambes",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1378"},
  {id:"ex064",name:"SLED PUSH",category:"Cardio",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1388"},
  {id:"ex065",name:"SLED PULL",category:"Cardio",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1414"},
  {id:"ex066",name:"GHD",category:"Lombaires",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1432"},
  {id:"ex067",name:"CHAISE ROMAINE FESSIER",category:"Fessiers",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1466"},
  {id:"ex068",name:"CHAISE ROMAINE LOMB",category:"Lombaires",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1491"},
  {id:"ex069",name:"DEV COUCHE PRISE SERREE",category:"Poitrine",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1505"},
  {id:"ex070",name:"ECARTE COUCHE HALTERE",category:"Poitrine",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1538"},
  {id:"ex071",name:"PULL OVER HALTERE",category:"Dos",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1572"},
  {id:"ex072",name:"PULL OVER POULIE HAUTE",category:"Dos",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1598"},
  {id:"ex073",name:"EXTENSION TRICEPS CORDE",category:"Bras",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1622"},
  {id:"ex074",name:"EXT TRICEPS DOS A POULIE",category:"Bras",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1647"},
  {id:"ex075",name:"PALLOF PRESS ROTATION",category:"Abdos",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1669"},
  {id:"ex076",name:"VIS A VIS POULIE HAUTE",category:"Poitrine",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1713"},
  {id:"ex077",name:"VIS A VIS POULIE BASSE",category:"Poitrine",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1740"},
  {id:"ex078",name:"VIS A VIS POULIE NEUTRE",category:"Poitrine",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1764"},
  {id:"ex079",name:"FACE PULL",category:"Epaules",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1788"},
  {id:"ex080",name:"REVERSE CURL",category:"Bras",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1806"},
  {id:"ex081",name:"RUSSIAN TWIST PRESS",category:"Abdos",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1831"},
  {id:"ex082",name:"SHUTTLE RUN",category:"Cardio",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1867"},
  {id:"ex083",name:"ELEVATION FRONTALE",category:"Epaules",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1888"},
  {id:"ex084",name:"ELEVATION LATERALE",category:"Epaules",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1910"},
  {id:"ex085",name:"OISEAU BUSTE PENCHE",category:"Epaules",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1934"},
  {id:"ex086",name:"DEV COUCHE HALTERE",category:"Poitrine",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1956"},
  {id:"ex087",name:"DEVELOPPE INCLINE HALTERE",category:"Poitrine",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=1996"},
  {id:"ex088",name:"DEVELOPPE INCLINE BARRE",category:"Poitrine",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=2024"},
  {id:"ex089",name:"SHRUGS",category:"Dos",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=2054"},
  {id:"ex090",name:"FARMER WALK",category:"Fonctionnel",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=2081"},
  {id:"ex091",name:"BICEPS CORDE POULIE BAS",category:"Bras",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=2093"},
  {id:"ex092",name:"TIRAGE VERTICAL POULIE",category:"Dos",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=2126"},
  {id:"ex093",name:"GTO",category:"Fonctionnel",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=2160"},
  {id:"ex094",name:"THRUSTER",category:"Fonctionnel",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=2180"},
  {id:"ex095",name:"BEAR HUG SANDBAG CARRY",category:"Fonctionnel",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=2207"},
  {id:"ex096",name:"WALL BALL SHOT",category:"Fonctionnel",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=2252"},
  {id:"ex097",name:"JET DE BALLE",category:"Fonctionnel",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=2273"},
  {id:"ex098",name:"TIRAGE HORIZONTAL POULIE",category:"Dos",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=2298"},
  {id:"ex099",name:"TIRAGE HORIZONTAL UNI",category:"Dos",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=2321"},
  {id:"ex100",name:"PEC PRESS CONVERGENTE",category:"Poitrine",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=2344"},
  {id:"ex101",name:"LEG EXTENSION",category:"Jambes",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=2377"},
  {id:"ex102",name:"LEG CURL",category:"Ischios",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=2405"},
  {id:"ex103",name:"MACHINE ADDUCTION",category:"Jambes",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=2429"},
  {id:"ex104",name:"MACHINE ABDUCTION",category:"Jambes",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=2454"},
  {id:"ex105",name:"PRESS VERTICALE",category:"Jambes",videoUrl:"https://www.youtube.com/watch?v=tbAJMerEf6s&t=2485"},
];

const defaultData = {coachPin:"1199",exercises:defaultExercises,clients:[],programs:[]};

function loadDataLocal() {
  try { const r=localStorage.getItem(LS_KEY); return r?JSON.parse(r):defaultData; }
  catch(e) { return defaultData; }
}
function saveDataLocal(d) {
  try { localStorage.setItem(LS_KEY,JSON.stringify(d)); } catch(e) {}
}

async function loadDataFromSupabase() {
  try {
    const [clients, programmes, exercises, settings] = await Promise.all([
      sbGet("clients"), sbGet("programmes"), sbGet("exercises"), sbGet("settings")
    ]);
    const coachPin = settings.find(s=>s.key==="coachPin");
    const data = {
      coachPin: coachPin ? coachPin.value : "1199",
      clients: clients.map(c=>({
        id:c.id, prenom:c.prenom, nom:c.nom, email:c.email||"", pin:c.pin,
        mode:c.mode||"presentiel", objectif:c.objectif||"",
        calories:c.calories||"", proteines:c.proteines||"",
        glucides:c.glucides||"", lipides:c.lipides||"",
        nutritionLogs:c.nutrition_logs||[], createdAt:c.created_at
      })),
      programs: programmes.map(p=>({
        id:p.id, nom:p.nom, clientId:p.client_id||"",
        seances:p.seances||[], createdAt:p.created_at
      })),
      exercises: exercises.length>0 ? exercises.map(e=>({
        id:e.id, name:e.name, category:e.category, videoUrl:e.video_url||""
      })) : defaultExercises
    };
    saveDataLocal(data);
    return data;
  } catch(e) {
    console.error("Supabase load error:", e);
    return loadDataLocal();
  }
}

async function saveClientToSupabase(c) {
  await sbUpsert("clients", {
    id:c.id, prenom:c.prenom, nom:c.nom, email:c.email||"", pin:c.pin,
    mode:c.mode, objectif:c.objectif||"",
    calories:c.calories||"", proteines:c.proteines||"",
    glucides:c.glucides||"", lipides:c.lipides||"",
    nutrition_logs:c.nutritionLogs||[]
  });
}
async function saveProgramToSupabase(p) {
  await sbUpsert("programmes", {id:p.id, nom:p.nom, client_id:p.clientId||"", seances:p.seances||[]});
}
async function saveExerciseToSupabase(e) {
  await sbUpsert("exercises", {id:e.id, name:e.name, category:e.category, video_url:e.videoUrl||""});
}
async function saveCoachPin(pin) {
  await sbUpsert("settings", {key:"coachPin", value:pin});
}

function saveData(d) {
  saveDataLocal(d);
  // Sync all to Supabase in background
  d.clients.forEach(c=>saveClientToSupabase(c));
  d.programs.forEach(p=>saveProgramToSupabase(p));
  d.exercises.forEach(e=>saveExerciseToSupabase(e));
}
function uid() { return Math.random().toString(36).slice(2,9); }
function exportJSON(d) {
  const b=new Blob([JSON.stringify(d,null,2)],{type:"application/json"});
  const u=URL.createObjectURL(b);
  const a=document.createElement("a");a.href=u;a.download="califts_backup.json";a.click();
  URL.revokeObjectURL(u);
}

const S = {
  btn:    {background:"#00c896",color:"#000",border:"none",borderRadius:10,padding:"0.7rem 1.4rem",fontWeight:700,cursor:"pointer",fontSize:"0.95rem"},
  btnSm:  {background:"#00c896",color:"#000",border:"none",borderRadius:8,padding:"0.4rem 0.9rem",fontWeight:700,cursor:"pointer",fontSize:"0.82rem"},
  btnOut: {background:"transparent",color:"#00c896",border:"1px solid #00c896",borderRadius:10,padding:"0.55rem 1rem",fontWeight:600,cursor:"pointer",fontSize:"0.88rem"},
  ghost:  {background:"none",border:"none",cursor:"pointer",color:"#555"},
  card:   {background:"#12122a",borderRadius:14,padding:"1.1rem",border:"1px solid #1e1e3a",marginBottom:"0.8rem"},
  inp:    {background:"#1a1a2e",border:"1px solid #2a2a4a",borderRadius:8,color:"#fff",padding:"0.6rem 0.9rem",fontSize:"0.93rem",width:"100%",boxSizing:"border-box"},
  lbl:    {color:"#888",fontSize:"0.78rem",marginBottom:"0.25rem",display:"block"},
};

function IcUsers({s,c}) { return React.createElement("svg",{width:s,height:s,fill:"none",stroke:c||"currentColor",strokeWidth:"2",viewBox:"0 0 24 24"},React.createElement("path",{d:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}),React.createElement("circle",{cx:"9",cy:"7",r:"4"}),React.createElement("path",{d:"M23 21v-2a4 4 0 0 0-3-3.87"}),React.createElement("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})); }
function IcClip({s,c}) { return React.createElement("svg",{width:s,height:s,fill:"none",stroke:c||"currentColor",strokeWidth:"2",viewBox:"0 0 24 24"},React.createElement("rect",{x:"9",y:"2",width:"6",height:"4",rx:"1"}),React.createElement("path",{d:"M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2"}),React.createElement("path",{d:"M9 12h6"}),React.createElement("path",{d:"M9 16h4"})); }
function IcDumb({s,c}) { return React.createElement("svg",{width:s,height:s,fill:"none",stroke:c||"currentColor",strokeWidth:"2",viewBox:"0 0 24 24"},React.createElement("path",{d:"M6.5 6.5h11"}),React.createElement("path",{d:"M6.5 17.5h11"}),React.createElement("path",{d:"M3 9.5h2v5H3z"}),React.createElement("path",{d:"M19 9.5h2v5h-2z"}),React.createElement("path",{d:"M5 7h1v10H5z"}),React.createElement("path",{d:"M18 7h1v10h-1z"})); }
function IcApple({s,c}) { return React.createElement("svg",{width:s,height:s,fill:"none",stroke:c||"currentColor",strokeWidth:"2",viewBox:"0 0 24 24"},React.createElement("path",{d:"M12 2a3 3 0 0 0-3 3c0 1.5.8 2.8 2 3.5"}),React.createElement("path",{d:"M17.5 6C15.5 4.5 13 4 12 4S8.5 4.5 6.5 6C4 8 3 11 3 14c0 4 2.5 8 5 8 1 0 2-.5 4-.5s3 .5 4 .5c2.5 0 5-4 5-8 0-3-1-6-3.5-8z"})); }
function IcCog({s,c}) { return React.createElement("svg",{width:s,height:s,fill:"none",stroke:c||"currentColor",strokeWidth:"2",viewBox:"0 0 24 24"},React.createElement("circle",{cx:"12",cy:"12",r:"3"}),React.createElement("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"})); }
function IcPlay({s,c}) { return React.createElement("svg",{width:s,height:s,fill:c||"currentColor",viewBox:"0 0 24 24"},React.createElement("polygon",{points:"5,3 19,12 5,21"})); }
function IcPlus({s,c}) { return React.createElement("svg",{width:s,height:s,fill:"none",stroke:c||"currentColor",strokeWidth:"2",viewBox:"0 0 24 24"},React.createElement("path",{d:"M12 5v14M5 12h14"})); }
function IcTrash({s,c}) { return React.createElement("svg",{width:s,height:s,fill:"none",stroke:c||"currentColor",strokeWidth:"2",viewBox:"0 0 24 24"},React.createElement("polyline",{points:"3,6 5,6 21,6"}),React.createElement("path",{d:"M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"}),React.createElement("path",{d:"M10 11v6M14 11v6"}),React.createElement("path",{d:"M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"})); }
function IcEdit({s,c}) { return React.createElement("svg",{width:s,height:s,fill:"none",stroke:c||"currentColor",strokeWidth:"2",viewBox:"0 0 24 24"},React.createElement("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),React.createElement("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})); }
function IcBack({s,c}) { return React.createElement("svg",{width:s,height:s,fill:"none",stroke:c||"currentColor",strokeWidth:"2",viewBox:"0 0 24 24"},React.createElement("polyline",{points:"15,18 9,12 15,6"})); }
function IcX({s,c}) { return React.createElement("svg",{width:s,height:s,fill:"none",stroke:c||"currentColor",strokeWidth:"2",viewBox:"0 0 24 24"},React.createElement("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),React.createElement("line",{x1:"6",y1:"6",x2:"18",y2:"18"})); }
function IcDown({s,c}) { return React.createElement("svg",{width:s,height:s,fill:"none",stroke:c||"currentColor",strokeWidth:"2",viewBox:"0 0 24 24"},React.createElement("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),React.createElement("polyline",{points:"7,10 12,15 17,10"}),React.createElement("line",{x1:"12",y1:"15",x2:"12",y2:"3"})); }
function IcVid({s,c}) { return React.createElement("svg",{width:s,height:s,fill:"none",stroke:c||"currentColor",strokeWidth:"2",viewBox:"0 0 24 24"},React.createElement("polygon",{points:"23,7 16,12 23,17"}),React.createElement("rect",{x:"1",y:"5",width:"15",height:"14",rx:"2"})); }
function IcLock({s,c}) { return React.createElement("svg",{width:s,height:s,fill:"none",stroke:c||"currentColor",strokeWidth:"2",viewBox:"0 0 24 24"},React.createElement("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2"}),React.createElement("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})); }

function Modal({title,onClose,children}) {
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <div style={{background:"#0d0d1a",borderRadius:"20px 20px 0 0",width:"100%",maxWidth:520,maxHeight:"92vh",overflowY:"auto",padding:"1.5rem"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.25rem"}}>
          <h3 style={{margin:0,fontSize:"1rem"}}>{title}</h3>
          <button onClick={onClose} style={S.ghost}><IcX s={22} c="#aaa"/></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function PinLogin({onCoach,onClient,clients,coachPin}) {
  const [pin,setPin] = useState("");
  const [mode,setMode] = useState(null);
  const [clientId,setClientId] = useState("");
  const [err,setErr] = useState("");
  function tryLogin() {
    if(mode==="coach") { if(pin===coachPin){onCoach();}else{setErr("PIN incorrect");setPin("");} }
    else { const c=clients.find(x=>x.id===clientId&&x.pin===pin); if(c){onClient(c);}else{setErr("Profil ou PIN incorrect");setPin("");} }
  }
  return (
    <div style={{minHeight:"100vh",background:"#0d0d1a",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"2rem",fontFamily:"system-ui",color:"#fff"}}>
      <div style={{textAlign:"center",marginBottom:"2rem"}}>
        <div style={{background:"#00c896",borderRadius:16,width:60,height:60,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1rem"}}>
          <IcDumb s={30} c="#000"/>
        </div>
        <h1 style={{margin:0,fontSize:"1.8rem",fontWeight:800}}>Califts Evo</h1>
      </div>
      {!mode ? (
        <div style={{display:"flex",flexDirection:"column",gap:"1rem",width:"100%",maxWidth:300}}>
          <button onClick={()=>setMode("coach")} style={{...S.btn,width:"100%",padding:"1rem",display:"flex",alignItems:"center",justifyContent:"center",gap:"0.6rem"}}><IcCog s={20} c="#000"/>Acces Coach</button>
          <button onClick={()=>setMode("client")} style={{...S.btnOut,width:"100%",padding:"1rem",display:"flex",alignItems:"center",justifyContent:"center",gap:"0.6rem"}}><IcUsers s={20} c="#00c896"/>Acces Client</button>
        </div>
      ) : (
        <div style={{width:"100%",maxWidth:300}}>
          <button onClick={()=>{setMode(null);setErr("");setPin("");}} style={{...S.ghost,color:"#aaa",marginBottom:"1.5rem",display:"flex",alignItems:"center",gap:"0.4rem",fontSize:"0.85rem"}}><IcBack s={16} c="#aaa"/>Retour</button>
          {mode==="client" && (
            <div style={{marginBottom:"1rem"}}>
              <span style={S.lbl}>Ton profil</span>
              <select style={S.inp} value={clientId} onChange={e=>setClientId(e.target.value)}>
                <option value="">-- Choisir --</option>
                {clients.map(c=><option key={c.id} value={c.id}>{c.prenom} {c.nom}</option>)}
              </select>
            </div>
          )}
          <div style={{marginBottom:"1rem"}}>
            <span style={S.lbl}>PIN</span>
            <input style={{...S.inp,letterSpacing:"0.3em",fontSize:"1.3rem",textAlign:"center"}} type="password" inputMode="numeric" maxLength={6} value={pin} onChange={e=>{setPin(e.target.value);setErr("");}} placeholder="* * * *"/>
          </div>
          {err && <p style={{color:"#ff6b35",fontSize:"0.82rem",marginBottom:"0.75rem"}}>{err}</p>}
          <button onClick={tryLogin} style={{...S.btn,width:"100%",padding:"0.9rem"}}>Se connecter</button>

        </div>
      )}
    </div>
  );
}

function RestTimer({seconds,label,onDone}) {
  const [rem,setRem] = useState(seconds);
  useEffect(()=>{
    if(rem<=0){onDone();return;}
    const t=setTimeout(()=>setRem(r=>r-1),1000);
    return()=>clearTimeout(t);
  },[rem]);
  const pct=((seconds-rem)/seconds)*100;
  return (
    <div style={{textAlign:"center",padding:"2.5rem 1rem"}}>
      <div style={{position:"relative",width:130,height:130,margin:"0 auto 1rem"}}>
        <svg width="130" height="130" style={{transform:"rotate(-90deg)"}}>
          <circle cx="65" cy="65" r="56" fill="none" stroke="#1a1a2e" strokeWidth="8"/>
          <circle cx="65" cy="65" r="56" fill="none" stroke="#00c896" strokeWidth="8" strokeDasharray={String(2*Math.PI*56)} strokeDashoffset={String(2*Math.PI*56*(1-pct/100))} style={{transition:"stroke-dashoffset 1s linear"}}/>
        </svg>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2.2rem",fontWeight:800,color:"#00c896"}}>{rem}s</div>
      </div>
      <p style={{color:"#888",marginBottom:"1.25rem"}}>{label||"Repos"}</p>
      <button onClick={onDone} style={{...S.btn,padding:"0.6rem 2rem"}}>Passer</button>
    </div>
  );
}

function DurTimer({seconds,name,onDone}) {
  const [rem,setRem] = useState(seconds);
  useEffect(()=>{
    if(rem<=0){onDone();return;}
    const t=setTimeout(()=>setRem(r=>r-1),1000);
    return()=>clearTimeout(t);
  },[rem]);
  const pct=((seconds-rem)/seconds)*100;
  return (
    <div style={{textAlign:"center",padding:"1rem"}}>
      <div style={{position:"relative",width:150,height:150,margin:"0 auto 1rem"}}>
        <svg width="150" height="150" style={{transform:"rotate(-90deg)"}}>
          <circle cx="75" cy="75" r="65" fill="none" stroke="#1a1a2e" strokeWidth="10"/>
          <circle cx="75" cy="75" r="65" fill="none" stroke="#6c63ff" strokeWidth="10" strokeDasharray={String(2*Math.PI*65)} strokeDashoffset={String(2*Math.PI*65*(1-pct/100))} style={{transition:"stroke-dashoffset 1s linear"}}/>
        </svg>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2.4rem",fontWeight:800,color:"#6c63ff"}}>{rem}s</div>
      </div>
      <p style={{color:"#aaa",marginBottom:"1.25rem",fontWeight:600}}>{name}</p>
      <button onClick={onDone} style={{...S.btn,padding:"0.6rem 2rem"}}>Termine</button>
    </div>
  );
}

function buildSteps(seance,exercises) {
  const exos = seance.exercices||[];
  const steps = [];
  let i=0;
  while(i<exos.length) {
    const ex = exos[i];
    const grp = ex.supersetGroup||"";
    if(grp) {
      const members=[ex];
      let j=i+1;
      while(j<exos.length&&(exos[j].supersetGroup||"")===grp){members.push(exos[j]);j++;}
      const maxS=Math.max(...members.map(m=>parseInt(m.series)||1));
      for(let s=1;s<=maxS;s++){
        members.forEach((m,mi)=>{
          const info=exercises.find(e=>e.id===m.exerciceId)||{};
          const isLast=mi===members.length-1;
          const isLastS=s===maxS;
          steps.push({...m,info,setNum:s,totalSeries:maxS,isLastInGroup:isLast,isLastSerie:isLastS,
            restAfter:isLast&&!isLastS?parseInt(m.reposApres)||0:0,
            restFinal:isLast&&isLastS?parseInt(m.reposApres)||0:0,
          });
        });
      }
      i=j;
    } else {
      const info=exercises.find(e=>e.id===ex.exerciceId)||{};
      const maxS=parseInt(ex.series)||1;
      for(let s=1;s<=maxS;s++){
        const isLastS=s===maxS;
        steps.push({...ex,info,setNum:s,totalSeries:maxS,isLastInGroup:true,isLastSerie:isLastS,
          restAfter:!isLastS?parseInt(ex.reposSeries)||0:0,
          restFinal:isLastS?parseInt(ex.reposApres)||0:0,
        });
      }
      i++;
    }
  }
  return steps;
}

function SeancePlayer({seance,exercises,onClose}) {
  const [step,setStep] = useState(0);
  const [resting,setResting] = useState(false);
  const [restSecs,setRestSecs] = useState(0);
  const [restLabel,setRestLabel] = useState("");
  const [done,setDone] = useState(false);
  const steps = buildSteps(seance,exercises);
  const cur = steps[step];

  function finishExec() {
    const isLast=step+1>=steps.length;
    if(isLast){setDone(true);return;}
    const rs=cur.restAfter>0?cur.restAfter:cur.restFinal>0?cur.restFinal:0;
    if(rs>0){
      setRestSecs(rs);
      setRestLabel(cur.restAfter>0?"Repos entre les rounds":"Repos");
      setResting(true);
    } else {
      setStep(s=>s+1);
    }
  }

  function afterRest(){setResting(false);setStep(s=>s+1);}

  if(done) return (
    <div style={{textAlign:"center",padding:"3rem 1rem"}}>
      <div style={{fontSize:"4rem",marginBottom:"1rem"}}>OK</div>
      <h2 style={{color:"#00c896"}}>Seance terminee !</h2>
      <p style={{color:"#888",marginBottom:"2rem"}}>Excellent travail.</p>
      <button onClick={onClose} style={S.btn}>Retour</button>
    </div>
  );
  if(!cur) return null;

  const ytUrl=cur.info&&cur.info.videoUrl?cur.info.videoUrl:null;
  const nextStep=steps[step+1];
  const nextName=nextStep&&nextStep.exerciceId!==cur.exerciceId?nextStep.info&&nextStep.info.name?nextStep.info.name:"":null;
  const isSuperset=!!(cur.supersetGroup);
  const grpLabel=isSuperset?(cur.supersetGroup==="triset"?"TRISET":"SUPERSET"):null;

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.25rem"}}>
        <button onClick={onClose} style={S.ghost}><IcBack s={22} c="#aaa"/></button>
        <h2 style={{margin:0,fontSize:"1rem",fontWeight:800,color:"#fff",letterSpacing:"-0.01em"}}>{seance.nom}</h2>
      </div>
      <div style={{background:"#1a1a2e",borderRadius:8,padding:"0.7rem 1rem",marginBottom:"1.25rem",display:"flex",alignItems:"center",gap:"0.75rem"}}>
        <span style={{color:"#888",fontSize:"0.8rem",whiteSpace:"nowrap"}}>{step+1}/{steps.length}</span>
        <div style={{flex:1,background:"#0d0d1a",borderRadius:4,height:6}}>
          <div style={{background:"#00c896",height:6,borderRadius:4,width:((step+1)/steps.length*100)+"%",transition:"width 0.3s"}}/>
        </div>
      </div>
      {resting ? (
        <RestTimer seconds={restSecs} label={restLabel} onDone={afterRest}/>
      ) : (
        <div>
          {grpLabel && (
            <div style={{background:"#6c63ff20",border:"1px solid #6c63ff",borderRadius:8,padding:"0.3rem 0.8rem",display:"inline-block",marginBottom:"0.75rem",fontSize:"0.75rem",fontWeight:700,color:"#6c63ff"}}>
              {grpLabel} {cur.setNum}/{cur.totalSeries}
            </div>
          )}
          {nextName && (
            <div style={{background:"#0d0d1a",borderRadius:8,padding:"0.45rem 0.85rem",marginBottom:"0.75rem",display:"flex",gap:"0.5rem",alignItems:"center"}}>
              <span style={{color:"#555",fontSize:"0.72rem"}}>Prochain :</span>
              <span style={{color:"#aaa",fontSize:"0.78rem",fontWeight:600}}>{nextName}</span>
            </div>
          )}
          {ytUrl ? (
            <a href={ytUrl} target="_blank" rel="noopener noreferrer" style={{display:"block",textDecoration:"none",marginBottom:"1.25rem"}}>
              <div style={{borderRadius:12,background:"#1a1a2e",aspectRatio:"16/9",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"0.75rem",border:"2px solid #00c896",cursor:"pointer"}}>
                <div style={{background:"#00c896",borderRadius:"50%",width:56,height:56,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <IcPlay s={24} c="#000"/>
                </div>
                <span style={{color:"#00c896",fontWeight:700,fontSize:"0.95rem"}}>Voir la video</span>
                <span style={{color:"#555",fontSize:"0.72rem"}}>Ouvre YouTube au bon moment</span>
              </div>
            </a>
          ) : (
            <div style={{borderRadius:12,background:"#1a1a2e",marginBottom:"1.25rem",aspectRatio:"16/9",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"0.5rem"}}>
              <IcVid s={38} c="#333"/>
              <span style={{color:"#444",fontSize:"0.82rem"}}>Aucune video</span>
            </div>
          )}
          <div style={{...S.card,marginBottom:"1.25rem"}}>
            <h3 style={{margin:"0 0 1rem",fontSize:"1.15rem",color:"#fff"}}>{cur.info&&cur.info.name?cur.info.name:"Exercice"}</h3>
            {cur.mode==="duree" ? (
              <DurTimer seconds={parseInt(cur.duree)||30} name={cur.info&&cur.info.name?cur.info.name:""} onDone={finishExec}/>
            ) : (
              <div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"0.55rem",textAlign:"center",marginBottom:"0.5rem"}}>
                  {[["Serie",cur.setNum+"/"+cur.totalSeries],cur.mode==="distance"?["Dist",cur.distance?cur.distance+"m":"-"]:cur.mode==="duree"?["Duree",cur.duree?cur.duree+"s":"-"]:["Reps",cur.reps||"-"],["Poids",cur.poids?cur.poids+"kg":"-"],["Repos",restSecs>0?restSecs+"s":cur.restAfter>0?cur.restAfter+"s":cur.restFinal>0?cur.restFinal+"s":"-"]].map(function(pair){
                    return (
                      <div key={pair[0]} style={{background:"#0d0d1a",borderRadius:8,padding:"0.6rem 0.25rem"}}>
                        <div style={{color:"#00c896",fontWeight:800,fontSize:"1rem"}}>{pair[1]}</div>
                        <div style={{color:"#666",fontSize:"0.68rem",marginTop:"0.2rem"}}>{pair[0]}</div>
                      </div>
                    );
                  })}
                </div>
                {cur.tempo ? (
                  <div style={{background:"#0d0d1a",borderRadius:8,padding:"0.5rem 0.75rem",display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"0.5rem"}}>
                    <span style={{color:"#888",fontSize:"0.75rem"}}>Tempo :</span>
                    <span style={{color:"#ffd166",fontWeight:700,fontSize:"0.95rem"}}>{cur.tempo}</span>
                    <span style={{color:"#555",fontSize:"0.68rem"}}>(exc-bas-con-haut)</span>
                  </div>
                ) : null}
                <button onClick={finishExec} style={{...S.btn,width:"100%",padding:"0.9rem",fontSize:"1rem",marginTop:"0.5rem"}}>
                  {step+1>=steps.length ? "Terminer" : isSuperset&&!cur.isLastInGroup ? "Exercice suivant" : "Serie terminee"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ExRow({ex,onChange,onRemove,exercises}) {
  const info=exercises.find(e=>e.id===ex.exerciceId)||{};
  const isDur=ex.mode==="duree";
  return (
    <div style={{background:"#12122a",borderRadius:10,padding:"0.8rem",marginBottom:"0.5rem",border:"1px solid #1e1e3a"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.5rem"}}>
        <span style={{fontWeight:700,fontSize:"0.85rem",color:"#fff"}}>{info.name||"?"}</span>
        <button onClick={onRemove} style={S.ghost}><IcX s={13} c="#555"/></button>
      </div>
      <div style={{display:"flex",gap:"0.4rem",marginBottom:"0.6rem"}}>
        {["reps","duree","distance"].map(m=>(
          <button key={m} onClick={()=>onChange("mode",m)} style={{flex:1,background:ex.mode===m?"#00c896":"#1a1a2e",color:ex.mode===m?"#000":"#888",border:"none",borderRadius:6,padding:"0.3rem",fontSize:"0.68rem",fontWeight:700,cursor:"pointer"}}>
            {m==="reps"?"Reps":m==="duree"?"Duree (s)":"Distance (m)"}
          </button>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.4rem",marginBottom:"0.4rem"}}>
        <div><span style={{...S.lbl,fontSize:"0.68rem"}}>Series</span><input style={{...S.inp,padding:"0.3rem 0.4rem",fontSize:"0.82rem",textAlign:"center"}} type="number" value={ex.series||""} onChange={e=>onChange("series",e.target.value)} placeholder="3"/></div>
        {ex.mode==="duree"
          ? <div><span style={{...S.lbl,fontSize:"0.68rem"}}>Duree (s)</span><input style={{...S.inp,padding:"0.3rem 0.4rem",fontSize:"0.82rem",textAlign:"center"}} type="number" value={ex.duree||""} onChange={e=>onChange("duree",e.target.value)} placeholder="30"/></div>
          : ex.mode==="distance"
          ? <div><span style={{...S.lbl,fontSize:"0.68rem"}}>Distance (m)</span><input style={{...S.inp,padding:"0.3rem 0.4rem",fontSize:"0.82rem",textAlign:"center"}} type="number" value={ex.distance||""} onChange={e=>onChange("distance",e.target.value)} placeholder="25"/></div>
          : <div><span style={{...S.lbl,fontSize:"0.68rem"}}>Reps</span><input style={{...S.inp,padding:"0.3rem 0.4rem",fontSize:"0.82rem",textAlign:"center"}} type="number" value={ex.reps||""} onChange={e=>onChange("reps",e.target.value)} placeholder="12"/></div>
        }
        <div><span style={{...S.lbl,fontSize:"0.68rem"}}>Poids (kg)</span><input style={{...S.inp,padding:"0.3rem 0.4rem",fontSize:"0.82rem",textAlign:"center"}} type="number" value={ex.poids||""} onChange={e=>onChange("poids",e.target.value)} placeholder="0"/></div>
        <div><span style={{...S.lbl,fontSize:"0.68rem"}}>Tempo</span><input style={{...S.inp,padding:"0.3rem 0.4rem",fontSize:"0.82rem",textAlign:"center"}} value={ex.tempo||""} onChange={e=>onChange("tempo",e.target.value)} placeholder="3-1-2-0"/></div>
        <div><span style={{...S.lbl,fontSize:"0.68rem"}}>Repos/serie (s)</span><input style={{...S.inp,padding:"0.3rem 0.4rem",fontSize:"0.82rem",textAlign:"center"}} type="number" value={ex.reposSeries||""} onChange={e=>onChange("reposSeries",e.target.value)} placeholder="60"/></div>
        <div><span style={{...S.lbl,fontSize:"0.68rem"}}>Repos apres exo (s)</span><input style={{...S.inp,padding:"0.3rem 0.4rem",fontSize:"0.82rem",textAlign:"center"}} type="number" value={ex.reposApres||""} onChange={e=>onChange("reposApres",e.target.value)} placeholder="90"/></div>
        <div><span style={{...S.lbl,fontSize:"0.68rem"}}>Distance (m)</span><input style={{...S.inp,padding:"0.3rem 0.4rem",fontSize:"0.82rem",textAlign:"center"}} type="number" value={ex.distance||""} onChange={e=>onChange("distance",e.target.value)} placeholder="--"/></div>
      </div>
      <div style={{display:"flex",gap:"0.4rem",marginTop:"0.3rem",alignItems:"center"}}>
        <span style={{...S.lbl,fontSize:"0.68rem",margin:0,whiteSpace:"nowrap"}}>Grouper :</span>
        {[{v:"",l:"Aucun"},{v:"superset",l:"Superset"},{v:"triset",l:"Triset"}].map(opt=>(
          <button key={opt.v} onClick={()=>onChange("supersetGroup",opt.v)} style={{flex:1,background:(ex.supersetGroup||"")===opt.v?"#6c63ff":"#0d0d1a",color:(ex.supersetGroup||"")===opt.v?"#fff":"#555",border:"none",borderRadius:6,padding:"0.25rem",fontSize:"0.68rem",fontWeight:600,cursor:"pointer"}}>
            {opt.l}
          </button>
        ))}
      </div>
    </div>
  );
}

function ClientsView({data,setData,onSelect}) {
  const [show,setShow] = useState(false);
  const [editClient,setEditClient] = useState(null);
  const [showEdit,setShowEdit] = useState(false);
  const [ef,setEf] = useState({objectif:"",calories:"",proteines:"",glucides:"",lipides:"",mode:"presentiel",pin:""});
  const [f,setF] = useState({nom:"",prenom:"",email:"",pin:"",mode:"presentiel",objectif:"",calories:"",proteines:"",glucides:"",lipides:""});
  function add(){
    if(!f.nom||!f.prenom||!f.pin)return;
    const u={...data,clients:[...data.clients,{id:uid(),...f,nutritionLogs:[],createdAt:new Date().toISOString()}]};
    setData(u);saveData(u);setShow(false);
    setF({nom:"",prenom:"",email:"",pin:"",mode:"presentiel",objectif:"",calories:"",proteines:"",glucides:"",lipides:""});
  }
  function toggle(id){
    const u={...data,clients:data.clients.map(c=>c.id===id?{...c,mode:c.mode==="presentiel"?"distanciel":"presentiel"}:c)};
    setData(u);saveData(u);
  }
  function del(id){if(!confirm("Supprimer ?"))return;sbDelete("clients",id);const u={...data,clients:data.clients.filter(c=>c.id!==id)};setData(u);saveDataLocal(u);}
  function openEdit(c){setEditClient(c);setEf({objectif:c.objectif||"",calories:c.calories||"",proteines:c.proteines||"",glucides:c.glucides||"",lipides:c.lipides||"",mode:c.mode||"presentiel",pin:c.pin||""});setShowEdit(true);}
  function saveEdit(){
    if(!editClient)return;
    const u={...data,clients:data.clients.map(c=>c.id===editClient.id?{...c,...ef}:c)};
    setData(u);saveData(u);setShowEdit(false);setEditClient(null);
  }
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.25rem"}}>
        <h2 style={{margin:0}}>Mes clients</h2>
        <button onClick={()=>setShow(true)} style={S.btn}><span style={{display:"flex",alignItems:"center",gap:"0.4rem"}}><IcPlus s={16} c="#000"/>Ajouter</span></button>
      </div>
      {data.clients.length===0 && <div style={{...S.card,textAlign:"center",padding:"2.5rem",color:"#444"}}><IcUsers s={40} c="#333"/><p style={{marginTop:"1rem"}}>Aucun client</p></div>}
      {data.clients.map(c=>(
        <div key={c.id} style={S.card}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div style={{cursor:"pointer",flex:1}} onClick={()=>onSelect(c)}>
              <div style={{fontWeight:700,color:"#fff"}}>{c.prenom} {c.nom}</div>
              {c.email?<div style={{color:"#888",fontSize:"0.8rem"}}>{c.email}</div>:null}
              {c.objectif?<div style={{color:"#555",fontSize:"0.78rem",marginTop:"0.2rem"}}>{c.objectif}</div>:null}
              <div style={{color:"#333",fontSize:"0.72rem",marginTop:"0.2rem",display:"flex",alignItems:"center",gap:"0.3rem"}}><IcLock s={11} c="#333"/>PIN : {c.pin}</div>
            </div>
            <div style={{display:"flex",gap:"0.5rem",alignItems:"center",flexShrink:0}}>
              <button onClick={()=>toggle(c.id)} style={{background:c.mode==="distanciel"?"#00c89620":"#ff6b3520",color:c.mode==="distanciel"?"#00c896":"#ff6b35",border:"1px solid "+(c.mode==="distanciel"?"#00c896":"#ff6b35"),borderRadius:20,padding:"0.3rem 0.7rem",fontSize:"0.72rem",fontWeight:700,cursor:"pointer"}}>{c.mode}</button>
              <button onClick={()=>openEdit(c)} style={S.ghost}><IcEdit s={15} c="#aaa"/></button>
              <button onClick={()=>del(c.id)} style={S.ghost}><IcTrash s={15}/></button>
            </div>
          </div>
          {c.calories?(
            <div style={{display:"flex",gap:"0.4rem",marginTop:"0.7rem",flexWrap:"wrap"}}>
              {[["🔥",c.calories,"kcal"],["🥩",c.proteines,"prot"],["🍞",c.glucides,"glu"],["🥑",c.lipides,"lip"]].filter(function(x){return x[1];}).map(function(x){return(<div key={x[2]} style={{background:"#0d0d1a",borderRadius:6,padding:"0.25rem 0.5rem",fontSize:"0.72rem",color:"#888"}}>{x[0]} {x[1]}{x[2]!=="kcal"?"g":""} <span style={{color:"#444"}}>{x[2]}</span></div>);})}
            </div>
          ):null}
        </div>
      ))}
      {showEdit && editClient && (
        <Modal title={"Modifier - "+editClient.prenom+" "+editClient.nom} onClose={()=>setShowEdit(false)}>
          <div style={{display:"flex",flexDirection:"column",gap:"0.8rem"}}>
            <div><span style={S.lbl}>Mode</span><select style={S.inp} value={ef.mode} onChange={e=>setEf({...ef,mode:e.target.value})}><option value="presentiel">Presentiel</option><option value="distanciel">Distanciel</option></select></div>
            <div><span style={S.lbl}>PIN client</span><input style={S.inp} value={ef.pin} onChange={e=>setEf({...ef,pin:e.target.value})} placeholder="PIN" inputMode="numeric"/></div>
            <div><span style={S.lbl}>Objectif</span><input style={S.inp} value={ef.objectif} onChange={e=>setEf({...ef,objectif:e.target.value})} placeholder="Prise de masse..."/></div>
            <div style={{borderTop:"1px solid #1e1e3a",paddingTop:"0.75rem"}}>
              <p style={{color:"#00c896",fontSize:"0.82rem",fontWeight:700,margin:"0 0 0.75rem"}}>Objectifs nutritionnels</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.6rem"}}>
                {[["calories","Calories (kcal)"],["proteines","Proteines (g)"],["glucides","Glucides (g)"],["lipides","Lipides (g)"]].map(function(kp){return(<div key={kp[0]}><span style={S.lbl}>{kp[1]}</span><input style={S.inp} type="number" value={ef[kp[0]]} onChange={e=>setEf({...ef,[kp[0]]:e.target.value})} placeholder="0"/></div>);})}
              </div>
            </div>
            <button onClick={saveEdit} style={{...S.btn,width:"100%",marginTop:"0.25rem"}}>Enregistrer</button>
          </div>
        </Modal>
      )}
      {show && (
        <Modal title="Nouveau client" onClose={()=>setShow(false)}>
          <div style={{display:"flex",flexDirection:"column",gap:"0.8rem"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.7rem"}}>
              <div><span style={S.lbl}>Prenom *</span><input style={S.inp} value={f.prenom} onChange={e=>setF({...f,prenom:e.target.value})} placeholder="Prenom"/></div>
              <div><span style={S.lbl}>Nom *</span><input style={S.inp} value={f.nom} onChange={e=>setF({...f,nom:e.target.value})} placeholder="Nom"/></div>
            </div>
            <div><span style={S.lbl}>Email</span><input style={S.inp} value={f.email} onChange={e=>setF({...f,email:e.target.value})} placeholder="email@..."/></div>
            <div><span style={S.lbl}>PIN client *</span><input style={S.inp} value={f.pin} onChange={e=>setF({...f,pin:e.target.value})} placeholder="Ex: 5678" inputMode="numeric"/></div>
            <div><span style={S.lbl}>Objectif</span><input style={S.inp} value={f.objectif} onChange={e=>setF({...f,objectif:e.target.value})} placeholder="Prise de masse..."/></div>
            <div><span style={S.lbl}>Mode</span><select style={S.inp} value={f.mode} onChange={e=>setF({...f,mode:e.target.value})}><option value="presentiel">Presentiel</option><option value="distanciel">Distanciel</option></select></div>
            <div style={{borderTop:"1px solid #1e1e3a",paddingTop:"0.75rem"}}>
              <p style={{color:"#888",fontSize:"0.8rem",margin:"0 0 0.7rem"}}>Objectifs nutritionnels (optionnel)</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.6rem"}}>
                {[["calories","Calories (kcal)"],["proteines","Proteines (g)"],["glucides","Glucides (g)"],["lipides","Lipides (g)"]].map(function(kp){return(<div key={kp[0]}><span style={S.lbl}>{kp[1]}</span><input style={S.inp} type="number" value={f[kp[0]]} onChange={e=>setF({...f,[kp[0]]:e.target.value})} placeholder="0"/></div>);})}
              </div>
            </div>
            <button onClick={add} style={{...S.btn,width:"100%",marginTop:"0.25rem"}}>Creer</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function ExercicesView({data,setData}) {
  const [show,setShow] = useState(false);
  const [editId,setEditId] = useState(null);
  const [f,setF] = useState({name:"",category:"",videoUrl:""});
  const [search,setSearch] = useState("");
  const cats=[...new Set(data.exercises.map(e=>e.category))].sort();
  const filtered=data.exercises.filter(e=>e.name.toLowerCase().includes(search.toLowerCase())||e.category.toLowerCase().includes(search.toLowerCase()));
  const byC=cats.reduce(function(acc,cat){acc[cat]=filtered.filter(e=>e.category===cat);return acc;},{});
  function openEdit(ex){setEditId(ex.id);setF({name:ex.name,category:ex.category,videoUrl:ex.videoUrl||""});setShow(true);}
  function save(){
    if(!f.name||!f.category)return;
    const u=editId?{...data,exercises:data.exercises.map(e=>e.id===editId?{...e,...f}:e)}:{...data,exercises:[...data.exercises,{id:uid(),...f}]};
    setData(u);saveData(u);setShow(false);setEditId(null);
  }
  function del(id){const u={...data,exercises:data.exercises.filter(e=>e.id!==id)};setData(u);saveData(u);}
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}}>
        <h2 style={{margin:0}}>Exercices ({data.exercises.length})</h2>
        <button onClick={()=>{setEditId(null);setF({name:"",category:"",videoUrl:""});setShow(true);}} style={S.btn}><span style={{display:"flex",alignItems:"center",gap:"0.4rem"}}><IcPlus s={16} c="#000"/>Ajouter</span></button>
      </div>
      <input style={{...S.inp,marginBottom:"1rem"}} placeholder="Rechercher..." value={search} onChange={e=>setSearch(e.target.value)}/>
      {Object.entries(byC).map(function(entry){
        const cat=entry[0];const exs=entry[1];
        if(!exs.length)return null;
        return (
          <div key={cat} style={{marginBottom:"1.1rem"}}>
            <div style={{color:"#00c896",fontSize:"0.75rem",fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:"0.4rem"}}>{cat} ({exs.length})</div>
            {exs.map(ex=>(
              <div key={ex.id} style={{...S.card,padding:"0.8rem 1rem",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontWeight:600,fontSize:"0.92rem",color:"#fff"}}>{ex.name}</div>
                  {ex.videoUrl?<div style={{color:"#00c896",fontSize:"0.72rem",marginTop:"0.2rem",display:"flex",alignItems:"center",gap:"0.3rem"}}><IcVid s={11} c="#00c896"/>Video liee</div>:<div style={{color:"#333",fontSize:"0.72rem",marginTop:"0.2rem"}}>Pas de video</div>}
                </div>
                <div style={{display:"flex",gap:"0.5rem"}}>
                  <button onClick={()=>openEdit(ex)} style={S.ghost}><IcEdit s={15} c="#aaa"/></button>
                  <button onClick={()=>del(ex.id)} style={S.ghost}><IcTrash s={15}/></button>
                </div>
              </div>
            ))}
          </div>
        );
      })}
      {show && (
        <Modal title={editId?"Modifier":"Nouvel exercice"} onClose={()=>setShow(false)}>
          <div style={{display:"flex",flexDirection:"column",gap:"0.8rem"}}>
            <div><span style={S.lbl}>Nom *</span><input style={S.inp} value={f.name} onChange={e=>setF({...f,name:e.target.value})} placeholder="Ex: Squat bulgare"/></div>
            <div><span style={S.lbl}>Categorie *</span><input style={S.inp} list="cats" value={f.category} onChange={e=>setF({...f,category:e.target.value})} placeholder="Jambes, Poitrine..."/><datalist id="cats">{cats.map(c=><option key={c} value={c}/>)}</datalist></div>
            <div><span style={S.lbl}>Lien YouTube</span><input style={S.inp} value={f.videoUrl} onChange={e=>setF({...f,videoUrl:e.target.value})} placeholder="https://youtube.com/watch?v=..."/></div>
            <button onClick={save} style={{...S.btn,width:"100%",marginTop:"0.25rem"}}>{editId?"Enregistrer":"Ajouter"}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function ProgrammesView({data,setData,clientFilter}) {
  const [show,setShow] = useState(false);
  const [editId,setEditId] = useState(null);
  const [f,setF] = useState({nom:"",clientId:"",seances:[]});
  const [playing,setPlaying] = useState(null);
  const programs=clientFilter?data.programs.filter(p=>p.clientId===clientFilter):data.programs;
  function openAdd(){setEditId(null);setF({nom:"",clientId:clientFilter||"",seances:[]});setShow(true);}
  function openEdit(p){setEditId(p.id);setF({nom:p.nom,clientId:p.clientId,seances:JSON.parse(JSON.stringify(p.seances))});setShow(true);}
  function save(){
    if(!f.nom)return;
    const u=editId?{...data,programs:data.programs.map(p=>p.id===editId?{...p,...f}:p)}:{...data,programs:[...data.programs,{id:uid(),...f,createdAt:new Date().toISOString()}]};
    setData(u);saveData(u);setShow(false);
  }
  function del(id){if(!confirm("Supprimer ?"))return;sbDelete("programmes",id);const u={...data,programs:data.programs.filter(p=>p.id!==id)};setData(u);saveDataLocal(u);}
  function addSeance(){setF(fv=>({...fv,seances:[...fv.seances,{id:uid(),nom:"Seance "+(fv.seances.length+1),exercices:[]}]}));}
  function addEx(si,exId){
    setF(fv=>{const s=[...fv.seances];s[si]={...s[si],exercices:[...s[si].exercices,{id:uid(),exerciceId:exId,series:3,reps:12,duree:30,distance:"",poids:"",tempo:"",reposSeries:60,reposApres:90,supersetGroup:"",mode:"reps"}]};return{...fv,seances:s};});
  }
  function upEx(si,ei,field,val){
    setF(fv=>{const s=[...fv.seances];const ex=[...s[si].exercices];ex[ei]={...ex[ei],[field]:val};s[si]={...s[si],exercices:ex};return{...fv,seances:s};});
  }
  function rmEx(si,ei){setF(fv=>{const s=[...fv.seances];s[si]={...s[si],exercices:s[si].exercices.filter(function(_,i){return i!==ei;})};return{...fv,seances:s};});}
  if(playing)return <SeancePlayer seance={playing} exercises={data.exercises} onClose={()=>setPlaying(null)}/>;
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.25rem"}}>
        <h2 style={{margin:0}}>Programmes</h2>
        <button onClick={openAdd} style={S.btn}><span style={{display:"flex",alignItems:"center",gap:"0.4rem"}}><IcPlus s={16} c="#000"/>Creer</span></button>
      </div>
      {programs.length===0&&<div style={{...S.card,textAlign:"center",padding:"2.5rem",color:"#444"}}><IcClip s={40} c="#333"/><p style={{marginTop:"1rem"}}>Aucun programme</p></div>}
      {programs.map(prog=>{
        const client=data.clients.find(c=>c.id===prog.clientId);
        return (
          <div key={prog.id} style={S.card}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"0.75rem"}}>
              <div>
                <div style={{fontWeight:700,color:"#fff"}}>{prog.nom}</div>
                {!clientFilter&&client?<div style={{color:"#888",fontSize:"0.8rem"}}>{client.prenom} {client.nom}</div>:null}
              </div>
              <div style={{display:"flex",gap:"0.5rem"}}>
                <button onClick={()=>openEdit(prog)} style={S.ghost}><IcEdit s={15} c="#aaa"/></button>
                <button onClick={()=>del(prog.id)} style={S.ghost}><IcTrash s={15}/></button>
              </div>
            </div>
            {prog.seances.map(s=>(
              <div key={s.id} style={{background:"#0d0d1a",borderRadius:8,padding:"0.6rem 0.9rem",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.4rem"}}>
                <div>
                  <div style={{fontWeight:600,fontSize:"0.88rem",color:"#fff"}}>{s.nom}</div>
                  <div style={{color:"#555",fontSize:"0.75rem"}}>{s.exercices.length} exercice{s.exercices.length>1?"s":""}</div>
                </div>
                <button onClick={()=>setPlaying(s)} style={{...S.btnSm,display:"flex",alignItems:"center",gap:"0.3rem"}}>
                  <IcPlay s={11} c="#000"/>Demarrer
                </button>
              </div>
            ))}
          </div>
        );
      })}
      {show && (
        <Modal title={editId?"Modifier":"Nouveau programme"} onClose={()=>setShow(false)}>
          <div style={{display:"flex",flexDirection:"column",gap:"0.8rem"}}>
            <div><span style={S.lbl}>Nom *</span><input style={S.inp} value={f.nom} onChange={e=>setF({...f,nom:e.target.value})} placeholder="Programme Jambes..."/></div>
            {!clientFilter&&(
              <div><span style={S.lbl}>Client</span><select style={S.inp} value={f.clientId} onChange={e=>setF({...f,clientId:e.target.value})}><option value="">-- Aucun --</option>{data.clients.map(c=><option key={c.id} value={c.id}>{c.prenom} {c.nom}</option>)}</select></div>
            )}
            <div style={{borderTop:"1px solid #1e1e3a",paddingTop:"0.75rem"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.7rem"}}>
                <span style={{fontWeight:600,fontSize:"0.88rem"}}>Seances</span>
                <button onClick={addSeance} style={S.btnOut}>+ Seance</button>
              </div>
              {f.seances.map((seance,si)=>(
                <div key={seance.id} style={{background:"#0d0d1a",borderRadius:10,padding:"0.9rem",marginBottom:"0.7rem"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.7rem"}}>
                    <input style={{...S.inp,flex:1,marginRight:"0.5rem",padding:"0.4rem 0.6rem"}} value={seance.nom} onChange={e=>{const s=[...f.seances];s[si]={...s[si],nom:e.target.value};setF({...f,seances:s});}}/>
                    <button onClick={()=>setF(fv=>({...fv,seances:fv.seances.filter(function(_,i){return i!==si;})}))} style={S.ghost}><IcTrash s={14}/></button>
                  </div>
                  {seance.exercices.map((ex,ei)=>(
                    <ExRow key={ex.id} ex={ex} exercises={data.exercises}
                      onChange={(field,val)=>upEx(si,ei,field,val)}
                      onRemove={()=>rmEx(si,ei)}
                    />
                  ))}
                  <select style={{...S.inp,marginTop:"0.5rem",color:"#666"}} value="" onChange={e=>{if(e.target.value)addEx(si,e.target.value);}}>
                    <option value="">+ Ajouter un exercice...</option>
                    {[...new Set(data.exercises.map(e=>e.category))].sort().map(cat=>(
                      <optgroup key={cat} label={cat}>{data.exercises.filter(e=>e.category===cat).map(e=><option key={e.id} value={e.id}>{e.name}</option>)}</optgroup>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <button onClick={save} style={{...S.btn,width:"100%",marginTop:"0.25rem"}}>{editId?"Enregistrer":"Creer"}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function NutritionView({data,setData,fixedClientId}) {
  const [selC,setSelC] = useState(fixedClientId||"");
  const [log,setLog] = useState({aliment:"",calories:"",proteines:"",glucides:"",lipides:""});
  const [date,setDate] = useState(new Date().toISOString().slice(0,10));
  const client=data.clients.find(c=>c.id===selC);
  const logs=(client&&client.nutritionLogs||[]).filter(l=>l.date===date);
  const totals=logs.reduce(function(a,l){return{calories:a.calories+(+l.calories||0),proteines:a.proteines+(+l.proteines||0),glucides:a.glucides+(+l.glucides||0),lipides:a.lipides+(+l.lipides||0)};},{calories:0,proteines:0,glucides:0,lipides:0});
  function addLog(){
    if(!selC||!log.aliment)return;
    const nl={id:uid(),date,...log};
    const u={...data,clients:data.clients.map(c=>c.id===selC?{...c,nutritionLogs:[...(c.nutritionLogs||[]),nl]}:c)};
    setData(u);saveData(u);setLog({aliment:"",calories:"",proteines:"",glucides:"",lipides:""});
  }
  function delLog(lid){const u={...data,clients:data.clients.map(c=>c.id===selC?{...c,nutritionLogs:(c.nutritionLogs||[]).filter(l=>l.id!==lid)}:c)};setData(u);saveData(u);}
  function Bar({label,val,goal,color}){
    const pct=goal?Math.min((val/goal)*100,100):0;
    return(
      <div style={{marginBottom:"0.7rem"}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.8rem",marginBottom:"0.25rem"}}>
          <span style={{color:"#888"}}>{label}</span>
          <span style={{color:"#fff"}}>{Math.round(val)}{label==="Calories"?" kcal":"g"}{goal?<span style={{color:"#444"}}> / {goal}</span>:null}</span>
        </div>
        <div style={{background:"#1a1a2e",borderRadius:4,height:6}}><div style={{background:color,height:6,borderRadius:4,width:pct+"%",transition:"width 0.3s"}}/></div>
      </div>
    );
  }
  return (
    <div>
      <h2 style={{marginTop:0}}>Nutrition</h2>
      {!fixedClientId&&<select style={{...S.inp,marginBottom:"1rem"}} value={selC} onChange={e=>setSelC(e.target.value)}><option value="">Selectionner un client</option>{data.clients.map(c=><option key={c.id} value={c.id}>{c.prenom} {c.nom}</option>)}</select>}
      <input type="date" style={{...S.inp,marginBottom:"1rem"}} value={date} onChange={e=>setDate(e.target.value)}/>
      {client&&(
        <div>
          <div style={{...S.card,marginBottom:"1rem"}}>
            <div style={{color:"#888",fontSize:"0.78rem",marginBottom:"0.85rem"}}>Bilan du {date}</div>
            <Bar label="Calories" val={totals.calories} goal={client.calories} color="#ff6b35"/>
            <Bar label="Proteines" val={totals.proteines} goal={client.proteines} color="#00c896"/>
            <Bar label="Glucides" val={totals.glucides} goal={client.glucides} color="#6c63ff"/>
            <Bar label="Lipides" val={totals.lipides} goal={client.lipides} color="#ffd166"/>
          </div>
          <div style={S.card}>
            <div style={{fontWeight:600,marginBottom:"0.8rem",fontSize:"0.88rem"}}>Ajouter un aliment</div>
            <div style={{display:"flex",flexDirection:"column",gap:"0.55rem"}}>
              <input style={S.inp} value={log.aliment} onChange={e=>setLog({...log,aliment:e.target.value})} placeholder="Nom de l aliment"/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.55rem"}}>
                {[["calories","Calories (kcal)"],["proteines","Proteines (g)"],["glucides","Glucides (g)"],["lipides","Lipides (g)"]].map(function(kp){return(<input key={kp[0]} style={S.inp} type="number" value={log[kp[0]]} onChange={e=>setLog({...log,[kp[0]]:e.target.value})} placeholder={kp[1]}/>);})}
              </div>
              <button onClick={addLog} style={{...S.btn,width:"100%"}}>Ajouter</button>
            </div>
          </div>
          {logs.length>0&&(
            <div style={{marginTop:"1rem"}}>
              {logs.map(l=>(
                <div key={l.id} style={{...S.card,padding:"0.7rem 1rem",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{fontWeight:600,fontSize:"0.88rem",color:"#fff"}}>{l.aliment}</div>
                    <div style={{color:"#555",fontSize:"0.75rem"}}>{l.calories&&l.calories+" kcal"}{l.proteines&&" | "+l.proteines+"g prot"}{l.glucides&&" | "+l.glucides+"g glu"}{l.lipides&&" | "+l.lipides+"g lip"}</div>
                  </div>
                  <button onClick={()=>delLog(l.id)} style={S.ghost}><IcTrash s={14}/></button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ClientDetail({client,data,setData,onBack}) {
  const [tab,setTab] = useState("programmes");
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.25rem"}}>
        <button onClick={onBack} style={S.ghost}><IcBack s={22} c="#aaa"/></button>
        <div>
          <h2 style={{margin:0,fontSize:"1.1rem",color:"#fff"}}>{client.prenom} {client.nom}</h2>
          <span style={{color:client.mode==="distanciel"?"#00c896":"#ff6b35",fontSize:"0.78rem",fontWeight:700}}>{client.mode}</span>
        </div>
      </div>
      <div style={{display:"flex",gap:"0.5rem",marginBottom:"1.25rem"}}>
        {[["programmes","Programmes"],["nutrition","Nutrition"]].map(function(item){return(<button key={item[0]} onClick={()=>setTab(item[0])} style={{flex:1,background:tab===item[0]?"#00c896":"#1a1a2e",color:tab===item[0]?"#000":"#888",border:"none",borderRadius:8,padding:"0.55rem",fontWeight:700,cursor:"pointer",fontSize:"0.85rem"}}>{item[1]}</button>);})}
      </div>
      {tab==="programmes"?<ProgrammesView data={data} setData={setData} clientFilter={client.id}/>:<NutritionView data={data} setData={setData} fixedClientId={client.id}/>}
    </div>
  );
}

function ClientPortal({client,data,setData,onLogout}) {
  const [tab,setTab] = useState("programmes");
  const [playing,setPlaying] = useState(null);
  const programs=data.programs.filter(p=>p.clientId===client.id);
  if(playing)return <SeancePlayer seance={playing} exercises={data.exercises} onClose={()=>setPlaying(null)}/>;
  const nav=[{id:"programmes",Ic:IcClip,label:"Programmes"},{id:"nutrition",Ic:IcApple,label:"Nutrition"}];
  return (
    <div style={{background:"#0d0d1a",minHeight:"100vh",color:"#fff",fontFamily:"'Inter',system-ui,sans-serif",maxWidth:480,margin:"0 auto",display:"flex",flexDirection:"column"}}>
      <div style={{background:"#0d0d1a",borderBottom:"1px solid #1e1e3a",padding:"1rem 1.25rem 0.85rem",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:10}}>
        <div style={{display:"flex",alignItems:"center",gap:"0.6rem"}}>
          <div style={{background:"#00c896",borderRadius:8,width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center"}}><IcDumb s={15} c="#000"/></div>
          <div>
            <span style={{fontWeight:800,fontSize:"1.05rem",color:"#fff"}}>Califts Evo</span>
            <span style={{background:"#6c63ff20",color:"#6c63ff",fontSize:"0.68rem",fontWeight:700,borderRadius:6,padding:"0.15rem 0.45rem",marginLeft:"0.5rem"}}>{client.prenom.toUpperCase()}</span>
          </div>
        </div>
        <button onClick={onLogout} style={{background:"none",border:"1px solid #1e1e3a",borderRadius:8,padding:"0.35rem 0.7rem",color:"#888",cursor:"pointer",fontSize:"0.75rem"}}>Quitter</button>
      </div>
      <div style={{flex:1,padding:"1.25rem",paddingBottom:"5.5rem",overflowY:"auto"}}>
        {tab==="programmes"?(
          programs.length===0?(
            <div style={{...S.card,textAlign:"center",padding:"2.5rem",color:"#444"}}><IcClip s={40} c="#333"/><p style={{marginTop:"1rem"}}>Aucun programme assigne</p></div>
          ):(
            programs.map(prog=>(
              <div key={prog.id} style={S.card}>
                <div style={{fontWeight:700,marginBottom:"0.75rem",color:"#fff",fontSize:"1rem"}}>{prog.nom}</div>
                {prog.seances.map(s=>(
                  <div key={s.id} style={{background:"#0d0d1a",borderRadius:10,padding:"0.75rem 1rem",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.5rem",border:"1px solid #1e1e3a"}}>
                    <div>
                      <div style={{fontWeight:700,fontSize:"0.92rem",color:"#fff"}}>{s.nom}</div>
                      <div style={{color:"#555",fontSize:"0.75rem",marginTop:"0.2rem"}}>{s.exercices.length} exercice{s.exercices.length>1?"s":""}</div>
                    </div>
                    <button onClick={()=>setPlaying(s)} style={{background:"#00c896",color:"#000",border:"none",borderRadius:8,padding:"0.45rem 1rem",fontWeight:700,cursor:"pointer",fontSize:"0.85rem",display:"flex",alignItems:"center",gap:"0.35rem"}}>
                      <IcPlay s={13} c="#000"/>Demarrer
                    </button>
                  </div>
                ))}
              </div>
            ))
          )
        ):(
          <NutritionView data={data} setData={setData} fixedClientId={client.id}/>
        )}
      </div>
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"#0d0d1a",borderTop:"1px solid #1e1e3a",display:"flex",padding:"0.45rem 0 0.7rem"}}>
        {nav.map(function(item){const active=tab===item.id;return(<button key={item.id} onClick={()=>setTab(item.id)} style={{flex:1,background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:"0.25rem",color:active?"#00c896":"#555",padding:"0.35rem 0",transition:"color 0.15s"}}><item.Ic s={21} c={active?"#00c896":"#555"}/><span style={{fontSize:"0.62rem",fontWeight:600}}>{item.label}</span></button>);})}
      </div>
    </div>
  );
}

function SettingsView({data,setData,onLogout}) {
  const [pin,setPin] = useState(data.coachPin);
  const [ok,setOk] = useState(false);
  function savePin(){if(pin.length<4)return;const u={...data,coachPin:pin};setData(u);saveDataLocal(u);saveCoachPin(pin);setOk(true);setTimeout(()=>setOk(false),2000);}
  return (
    <div>
      <h2 style={{marginTop:0}}>Parametres</h2>
      <div style={S.card}>
        <div style={{fontWeight:600,marginBottom:"0.85rem",color:"#fff"}}>PIN Coach</div>
        <input style={{...S.inp,marginBottom:"0.75rem",letterSpacing:"0.2em"}} type="password" inputMode="numeric" value={pin} onChange={e=>setPin(e.target.value)} placeholder="Nouveau PIN"/>
        <button onClick={savePin} style={{...S.btn,width:"100%"}}>{ok?"OK - Enregistre":"Changer le PIN"}</button>
      </div>
      <div style={S.card}>
        <div style={{fontWeight:600,marginBottom:"0.85rem",color:"#fff"}}>Sauvegarde</div>
        <p style={{color:"#555",fontSize:"0.8rem",margin:"0 0 0.75rem"}}>Donnees sauvegardees sur cet appareil. Exportez regulierement.</p>
        <button onClick={()=>exportJSON(data)} style={{...S.btnOut,width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem"}}><IcDown s={16} c="#00c896"/>Exporter les donnees</button>
      </div>
      <button onClick={onLogout} style={{...S.btn,width:"100%",background:"#1a1a2e",color:"#ff6b35",marginTop:"0.5rem"}}>Se deconnecter</button>
    </div>
  );
}

export default function App() {
  const [data,setData] = useState(null);
  const [session,setSession] = useState(null);
  const [tab,setTab] = useState("clients");
  const [selClient,setSelClient] = useState(null);
  const [syncing,setSyncing] = useState(false);
  useEffect(()=>{
    loadDataFromSupabase().then(d=>{
      // Si Supabase n'a pas d'exercices, pousser les 105 par defaut
      if(d.exercises.length===0) {
        d.exercises = defaultExercises;
        defaultExercises.forEach(e=>saveExerciseToSupabase(e));
      }
      setData(d);
    });
  },[]);
  if(!data)return(<div style={{background:"#0d0d1a",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontFamily:"system-ui"}}><div style={{textAlign:"center"}}><div style={{background:"#00c896",borderRadius:12,width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1rem"}}><IcDumb s={22} c="#000"/></div><p style={{color:"#555"}}>Chargement...</p></div></div>);
  if(!session)return <PinLogin coachPin={data.coachPin} clients={data.clients} onCoach={()=>setSession("coach")} onClient={c=>setSession({client:c})}/>;
  if(session&&session.client)return <ClientPortal client={session.client} data={data} setData={setData} onLogout={()=>setSession(null)}/>;
  const nav=[{id:"clients",Ic:IcUsers,label:"Clients"},{id:"programmes",Ic:IcClip,label:"Programmes"},{id:"exercices",Ic:IcDumb,label:"Exercices"},{id:"nutrition",Ic:IcApple,label:"Nutrition"},{id:"settings",Ic:IcCog,label:"Reglages"}];
  return (
    <div style={{background:"#0d0d1a",minHeight:"100vh",color:"#fff",fontFamily:"system-ui",maxWidth:480,margin:"0 auto",display:"flex",flexDirection:"column"}}>
      <div style={{background:"#0d0d1a",borderBottom:"1px solid #1e1e3a",padding:"1rem 1.25rem 0.85rem",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:10}}>
        <div style={{display:"flex",alignItems:"center",gap:"0.6rem"}}>
          <div style={{background:"#00c896",borderRadius:8,width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center"}}><IcDumb s={15} c="#000"/></div>
          <span style={{fontWeight:800,fontSize:"1.05rem",color:"#fff"}}>Califts Evo</span>
          <span style={{background:"#00c89620",color:"#00c896",fontSize:"0.68rem",fontWeight:700,borderRadius:6,padding:"0.15rem 0.45rem"}}>COACH</span>
          {syncing && <span style={{color:"#555",fontSize:"0.65rem"}}>sync...</span>}
        </div>
      </div>
      <div style={{flex:1,padding:"1.25rem",paddingBottom:"5.5rem",overflowY:"auto"}}>
        {selClient?<ClientDetail client={selClient} data={data} setData={setData} onBack={()=>setSelClient(null)}/>:
         tab==="clients"?<ClientsView data={data} setData={setData} onSelect={c=>setSelClient(c)}/>:
         tab==="programmes"?<ProgrammesView data={data} setData={setData}/>:
         tab==="exercices"?<ExercicesView data={data} setData={setData}/>:
         tab==="nutrition"?<NutritionView data={data} setData={setData}/>:
         <SettingsView data={data} setData={setData} onLogout={()=>setSession(null)}/>}
      </div>
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"#0d0d1a",borderTop:"1px solid #1e1e3a",display:"flex",padding:"0.45rem 0 0.7rem"}}>
        {nav.map(function(item){const active=tab===item.id&&!selClient;return(<button key={item.id} onClick={()=>{setTab(item.id);setSelClient(null);}} style={{flex:1,background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:"0.25rem",color:active?"#00c896":"#555",padding:"0.35rem 0",transition:"color 0.15s"}}><item.Ic s={21} c={active?"#00c896":"#555"}/><span style={{fontSize:"0.62rem",fontWeight:600}}>{item.label}</span></button>);})}
      </div>
    </div>
  );
}
