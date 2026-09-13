// Läxförhörsfrågor per ämne
// Format: samma som NP-frågor (type: 'mc', 'open', 'match')
// Alla frågor nedan är av typen 'open' (öppna frågor) och bedöms av
// Claude via /api/chat i lax.js. modelAnswer = nyckelbegrepp facit
// skickar med som bedömningsunderlag.

const LAX_DATA = {
  cellen: [
    {
      id: "cellen-1",
      type: "open",
      text:
        "Redogör för olika organellers funktion (cellkärna, ribosom, kloroplaster, mitokondrier) samt cellvägg och cellmembran.",
      modelAnswer:
        "Cellkärna: styr cellens funktioner, innehåller DNA. Ribosom: cellens proteinfabriker. " +
        "Mitokondrie: cellens kraftverk, energi ur socker och syre genom cellandning. " +
        "Kloroplast: finns i växtceller, innehåller klorofyll, här sker fotosyntesen. " +
        "Cellvägg: hårt yttre skikt hos växtceller som ger stabilitet och form. " +
        "Cellmembran: skyddande hud runt cellen som reglerar vilka ämnen som släpps in och ut.",
    },
    {
      id: "cellen-2",
      type: "open",
      text: "Beskriv fotosyntes och cellandning.",
      modelAnswer:
        "Fotosyntes (kloroplaster): vatten + koldioxid + solenergi → glukos + syre. " +
        "Cellandning (mitokondrier): glukos + syre → koldioxid + vatten + energi.",
    },
    {
      id: "cellen-3",
      type: "open",
      text: "Redogör för skillnader mellan en djur- och en växtcell.",
      modelAnswer:
        "Växtceller har cellvägg, stor vattenfylld vakuol och kloroplaster med klorofyll. " +
        "Djurceller saknar cellvägg, kloroplaster och stor vakuol.",
    },
  ],

  skelett: [
    {
      id: "skelett-1",
      type: "open",
      text: "Vilken funktion har skelettet?",
      modelAnswer:
        "Ger kroppen stadga, skyddar inre organ (kranium, bröstkorg), tillverkar blodkroppar i röda benmärgen, " +
        "fungerar som mineralförråd (kalcium/fosfat).",
    },
    {
      id: "skelett-2",
      type: "open",
      text: "Vilken funktion har lederna?",
      modelAnswer:
        "Kopplar ihop ben och gör att kroppen kan röra sig utan friktion tack vare ledbrosk, ledvätska och ledband.",
    },
    {
      id: "skelett-3",
      type: "open",
      text: "Vilken funktion har musklerna?",
      modelAnswer:
        "Drar ihop sig för att skapa rörelse (skelettmuskler), pumpa blod (hjärtat) eller styra inre organ och blodkärl (glatta muskler).",
    },
  ],

  hud: [
    {
      id: "hud-1",
      type: "open",
      text: "Vilken funktion har huden?",
      modelAnswer:
        "Skyddande barriär mot skador och bakterier, reglerar kroppstemperatur (blodkärl, svettning), " +
        "förhindrar avdunstning, ger känsel.",
    },
  ],

  andning: [
    {
      id: "andning-1",
      type: "open",
      text: "Vilka är våra andningsorgan?",
      modelAnswer:
        "Munhåla, näshåla, bihålor, svalg, struphuvud (stämband), luftstrupe, luftrör (bronker), " +
        "lungor (lungblåsor/alveoler), mellangärdet (diafragman).",
    },
    {
      id: "andning-2",
      type: "open",
      text: "Vad händer i lungblåsorna?",
      modelAnswer:
        "Gasutbyte mellan luft och blod i kapillärerna: blodet tar upp syre och avger koldioxid som andas ut.",
    },
    {
      id: "andning-3",
      type: "open",
      text: "Beskriv hur in- och utandning går till.",
      modelAnswer:
        "Diafragman och muskler mellan revbenen styr andningen. Diafragman spänns och dras nedåt, brösthålan förstoras, " +
        "luft sugs in. Diafragman slappnar av, volymen minskar, luft pressas ut.",
    },
  ],

  blodlopp: [
    {
      id: "blodlopp-1",
      type: "open",
      text: "Beskriv blodets väg i de båda kretsloppen.",
      modelAnswer:
        "Lilla kretsloppet: höger förmak → höger kammare → lungor (syresätts, avger koldioxid) → vänster förmak. " +
        "Stora kretsloppet: vänster förmak → vänster kammare → aorta → artärer/kapillärer till kroppens celler → vener → höger förmak.",
    },
    {
      id: "blodlopp-2",
      type: "open",
      text: "Ge exempel på hur blodet kan fördelas mellan olika organ.",
      modelAnswer:
        "I vila ca 25% till tarmarna, 20% till njurarna, 20% till hjärnan. Efter matintag mer blod till tarmarna, " +
        "vid tänkande till hjärnan, vid ansträngning mest blod till musklerna.",
    },
    {
      id: "blodlopp-3",
      type: "open",
      text: "Vad kallas hjärtats fyra hålrum?",
      modelAnswer: "Höger förmak, höger kammare, vänster förmak, vänster kammare.",
    },
    {
      id: "blodlopp-4",
      type: "open",
      text: "Vad menas med att hjärtat är en dubbelpump?",
      modelAnswer:
        "Hjärtats två halvor arbetar samtidigt: höger kammare pumpar till lilla kretsloppet (lungorna) samtidigt " +
        "som vänster kammare pumpar till stora kretsloppet (kroppen).",
    },
    {
      id: "blodlopp-5",
      type: "open",
      text: "Vilken uppgift har hjärtats kranskärl?",
      modelAnswer: "Omger hjärtmuskeln och förser hjärtat med syre och näringsämnen för dess oavbrutna arbete.",
    },
    {
      id: "blodlopp-6",
      type: "open",
      text: "Hur kan blodet ta sig från benen tillbaka till hjärtat?",
      modelAnswer:
        "Skelettmuskler pressar blodet uppåt i venerna (muskelpumpen), venklaffar hindrar blodet från att rinna tillbaka nedåt.",
    },
  ],

  blod: [
    {
      id: "blod-1",
      type: "open",
      text: "Vilka funktioner har blodet?",
      modelAnswer:
        "Transporterar syre, näring, koldioxid och avfall; sprider hormoner; försvarar mot infektioner (vita blodkroppar); " +
        "koagulerar och stoppar blödningar (blodplättar); hjälper till med temperaturreglering.",
    },
    {
      id: "blod-2",
      type: "open",
      text: "Vilka delar finns det i blodet?",
      modelAnswer:
        "Ca 55% blodplasma (vatten, salter, socker, proteiner) och ca 45% blodkroppar: röda blodkroppar (hemoglobin, syretransport), " +
        "vita blodkroppar (immunförsvar), blodplättar (koagulering).",
    },
    {
      id: "blod-3",
      type: "open",
      text: "Varför kan man inte alltid ge blod till en person med annan blodgrupp?",
      modelAnswer:
        "Röda blodkroppar har antigener (A, B, Rh) på ytan, plasman har antikroppar mot antigener personen saknar. " +
        "Olämpligt blod gör att mottagarens antikroppar angriper och klumpar ihop (agglutinerar) givarens blodkroppar.",
    },
  ],

  forsvar: [
    {
      id: "forsvar-1",
      type: "open",
      text: "Hur bekämpar din munhåla och magsäck bakterier?",
      modelAnswer:
        "Saliven innehåller ämnen och enzymer som skadar bakterier. Magsäckens saltsyra dödar de flesta mikroorganismer i maten.",
    },
    {
      id: "forsvar-2",
      type: "open",
      text: "Beskriv hur din näsa och dina luftvägar kan rena den luft du andas in.",
      modelAnswer:
        "Näshålans slemhinna har hår och slem som fångar partiklar. Luftstrupen/luftrören har flimmerhår som " +
        "transporterar slem och smuts uppåt mot svalget där de sväljs eller hostas ut.",
    },
    {
      id: "forsvar-3",
      type: "open",
      text: "Nämn några organ som ingår i immunförsvaret.",
      modelAnswer:
        "Benmärgen (vita blodkroppar bildas), lymfkörtlarna (vita blodkroppar förökas/specialiseras), " +
        "mjälten (tillverkar vita blodkroppar), huden, slemhinnorna, magsäcken.",
    },
    {
      id: "forsvar-4",
      type: "open",
      text: "Vad menas med att bli immun efter en infektion?",
      modelAnswer:
        "T- och B-celler skapar minnesceller som kommer ihåg smittämnet. Vid ny smitta produceras snabbt rätt " +
        "antikroppar innan man blir sjuk.",
    },
    {
      id: "forsvar-5",
      type: "open",
      text: "Beskriv hur olika typer av vita blodkroppar samarbetar för att bekämpa en bakterieinfektion.",
      modelAnswer:
        "Fagocyter äter upp bakterier direkt. T-celler upptäcker inkräktare och larmar B-celler. " +
        "B-celler tillverkar antikroppar som binder till och oskadliggör bakterierna.",
    },
    {
      id: "forsvar-6",
      type: "open",
      text: "Hur fungerar en vaccination?",
      modelAnswer:
        "Ett försvagat eller dött smittämne (eller delar av det) sprutas in. Immunförsvaret lär sig tillverka " +
        "antikroppar och minnesceller utan att man blir sjuk på riktigt.",
    },
    {
      id: "forsvar-7",
      type: "open",
      text: "Vad är skillnaden mellan en bakterie och ett virus?",
      modelAnswer:
        "Bakterier är encelliga levande organismer med egen ämnesomsättning, kan bekämpas med antibiotika. " +
        "Virus är inte levande, saknar cellstruktur, förökar sig bara genom att infektera en värdcell.",
    },
    {
      id: "forsvar-8",
      type: "open",
      text: "Vilka uppgifter har njurarna och levern?",
      modelAnswer:
        "Levern: lagrar näringsämnen, avgiftar skadliga ämnen, tillverkar galla. " +
        "Njurarna: renar blodet från avfall och överskottsvätska, bildar urin.",
    },
  ],

  matspjalk: [
    {
      id: "matspjalk-1",
      type: "open",
      text: "Vilka är de näringsämnen vi behöver för att må bra?",
      modelAnswer: "Kolhydrater, fetter, proteiner, vitaminer, mineralämnen (t.ex. järn, kalcium), vatten.",
    },
    {
      id: "matspjalk-2",
      type: "open",
      text: "Hur bearbetas maten i magsäcken?",
      modelAnswer:
        "Mekaniskt: glatta muskulaturen knådar innehållet. Kemiskt: magsaft med saltsyra (dödar bakterier) " +
        "och enzymet pepsin (sönderdelar proteiner).",
    },
    {
      id: "matspjalk-3",
      type: "open",
      text: "Var sugs näringsämnena från maten upp av blodet?",
      modelAnswer:
        "I tunntarmen, via tarmludd med rikligt med blodkärl/kapillärer som tar upp näringsmolekylerna.",
    },
    {
      id: "matspjalk-4",
      type: "open",
      text: "Var i matspjälkningskanalen sugs det mesta av vattnet upp?",
      modelAnswer: "I tjocktarmen sugs vatten och salter upp så att tarminnehållet blir fastare.",
    },
    {
      id: "matspjalk-5",
      type: "open",
      text: "Beskriv översiktligt matens väg från munnen till ändtarmen.",
      modelAnswer:
        "Munhåla → svalg → matstrupe → magsäck → tolvfingertarm → tunntarm → tjocktarm → ändtarm.",
    },
    {
      id: "matspjalk-6",
      type: "open",
      text:
        "Förklara var och hur kolhydrater, proteiner och fetter sönderdelas till mindre molekyler under färden genom matsmältningskanalen.",
      modelAnswer:
        "Kolhydrater: enzymer i saliven (munnen) och bukspottet (tolvfingertarmen/tunntarmen) bryter ner till glukos. " +
        "Proteiner: pepsin i magsäcken börjar nedbrytningen, spjälkas i tunntarmen till aminosyror. " +
        "Fetter: galla från levern finfördelar i tolvfingertarmen, bukspottets enzymer klipper ner till glycerol och fettsyror.",
    },
    {
      id: "matspjalk-7",
      type: "open",
      text: "Hur sönderdelas fett?",
      modelAnswer:
        "Galla från levern finfördelar fettet i tolvfingertarmen (ökar ytan), enzymer bryter ner till glycerol och fettsyror.",
    },
    {
      id: "matspjalk-8",
      type: "open",
      text: "Hur sönderdelas kolhydrater?",
      modelAnswer:
        "Enzymer i saliven (munhålan) och bukspottet (tolvfingertarmen) klipper ner komplexa kedjor till enkla sockerarter som glukos.",
    },
    {
      id: "matspjalk-9",
      type: "open",
      text: "Hur sönderdelas proteiner?",
      modelAnswer:
        "Först i magsäcken av enzymet pepsin tillsammans med saltsyra, sedan i tunntarmen till aminosyror.",
    },
    {
      id: "matspjalk-10",
      type: "open",
      text: "Hur ser kroppen till att maten inte går till luftstrupen?",
      modelAnswer:
        "Vid sväljning höjs gommen och struplocket (epiglottis) läggs som ett lock över luftstrupen så maten leds ner i matstrupen.",
    },
  ],
};
