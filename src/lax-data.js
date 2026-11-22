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

  genetik: [
    {
      id: "genetik-1",
      type: "open",
      text: "Hur får celler sin energi?",
      modelAnswer:
        "Celler får energi genom cellandning i mitokondrier: socker + syre → koldioxid + vatten + energi.",
    },
    {
      id: "genetik-2",
      type: "open",
      text: "Förklara hur begreppen cell, vävnad, organ och organsystem hänger ihop.",
      modelAnswer:
        "Cellen är kroppens minsta levande enhet och kan specialiseras (t.ex. nervceller, muskelceller, hudceller). " +
        "Flera liknande celler som samarbetar bildar en vävnad. Olika vävnader tillsammans bildar ett organ, som har " +
        "en specifik funktion. Flera organ som arbetar tillsammans för en komplex funktion bildar ett organsystem " +
        "(t.ex. hjärtat, blodkärlen och blodet bildar tillsammans cirkulationssystemet).",
    },
    {
      id: "genetik-3",
      type: "open",
      text: "Vilka huvuduppgifter har våra gener? Vad består en gen av?",
      modelAnswer:
        "Gener innehåller instruktioner för att bygga proteiner. En gen består av DNA och är en viss sekvens av " +
        "kvävebaser som bär instruktioner för att tillverka ett visst protein.",
    },
    {
      id: "genetik-4",
      type: "open",
      text:
        "Beskriv hur begreppen kromosom, DNA och gen hänger ihop. Hur många kromosomer har vanligtvis en människa? Hur många kromosomer har våra könsceller?",
      modelAnswer:
        "DNA är en lång, spiralformad molekyl som bär den genetiska koden, uppbyggd av baserna A, T, C och G. " +
        "En gen är en specifik sekvens av DNA som innehåller instruktioner för att tillverka ett protein. " +
        "En kromosom är en struktur av tätt packat DNA. Människan har 23 par (46) kromosomer, och könsceller har " +
        "23 kromosomer efter reduktionsdelning (meios).",
    },
    {
      id: "genetik-5",
      type: "open",
      text: "Varför har vi en dubbeluppsättning av våra gener? Hur fungerar dominanta och vikande (recessiva) anlag?",
      modelAnswer:
        "Vi får en kromosomuppsättning från varje förälder, vilket ger två kopior av varje gen. Det ger genetisk " +
        "variation och gör att en frisk genkopia kan kompensera om den andra är skadad. Ett dominant anlag uttrycks " +
        "om det finns, oavsett vad den andra allelen är, och betecknas ofta med stor bokstav (t.ex. 'A'). Ett " +
        "recessivt anlag uttrycks bara om båda allelerna är recessiva, dvs. individen har ärvt samma recessiva " +
        "allel från båda föräldrarna.",
    },
    {
      id: "genetik-6",
      type: "open",
      text: "Ge två exempel på egenskaper som enbart styrs av det biologiska arvet.",
      modelAnswer:
        "Exempel: ögonfärg, blodgrupp, hårfärg, naturlig kroppslängd, vissa sjukdomar/funktionsnedsättningar " +
        "(t.ex. färgblindhet), hudfärg.",
    },
    {
      id: "genetik-7",
      type: "open",
      text: "Förklara varför enäggstvillingar är mer lika än tvåäggstvillingar.",
      modelAnswer:
        "Enäggstvillingar bildas när ett enda befruktat ägg delas i två delar tidigt i utvecklingen, och har därför " +
        "identiska gener. Tvåäggstvillingar bildas när två separata ägg befruktas av två olika spermier samtidigt, " +
        "och delar bara ungefär hälften av sitt genetiska material, precis som vanliga syskon.",
    },
    {
      id: "genetik-8",
      type: "open",
      text: "Förklara varför det är vanligare bland män än kvinnor att vara färgblind.",
      modelAnswer:
        "Färgblindhet orsakas oftast av en X-kromosombunden recessiv mutation. Män har bara en X-kromosom, så en " +
        "defekt gen där räcker för att de ska bli färgblinda. Kvinnor har två X-kromosomer och måste ha den defekta " +
        "genen på båda för att bli färgblinda — har de bara en defekt kopia blir de symptomfria bärare eftersom den " +
        "andra, fungerande X-kromosomen kompenserar.",
    },
    {
      id: "genetik-9",
      type: "open",
      text:
        "En brunögd pappa och en blåögd mamma skaffar barn (brun ögonfärg är dominant över blå). Rita/beskriv ett korsningsschema och motivera vilken ögonfärg barnen bör få. Skulle föräldrarna kunna ha andra anlag än de du angav men ändå oförändrad ögonfärg hos sig själva — och skulle det i så fall kunna påverka barnens ögonfärg?",
      modelAnswer:
        "Blå ögonfärg är recessiv (bb), så en blåögd förälder har alltid genotypen bb. Om den brunögda pappan är " +
        "homozygot dominant (BB) blir alla barn Bb (bruna). Om pappan istället är heterozygot (Bb) — vilket ger samma " +
        "bruna ögonfärg hos honom men ett dolt recessivt anlag — blir korsningen Bb × bb, vilket ger 50 % Bb (bruna) " +
        "och 50 % bb (blå) barn. Föräldrarnas egen ögonfärg avslöjar alltså inte säkert deras fullständiga genotyp, " +
        "och ett dolt recessivt anlag hos den brunögda föräldern kan ge blåögda barn.",
    },
    {
      id: "genetik-10",
      type: "open",
      text: "Hur är DNA uppbyggd?",
      modelAnswer:
        "DNA är en dubbelspiral (dubbelhelix) av två långa kedjor som hålls samman av kvävebaser (A-T och C-G). " +
        "Sekvensen av kvävebaser utgör den genetiska koden som styr kroppens funktioner och egenskaper. Baserna " +
        "binder alltid parvis, två och två.",
    },
    {
      id: "genetik-11",
      type: "open",
      text:
        "Innan en cell delar sig kopieras cellens DNA-molekyler så att de båda dottercellerna kan få varsin komplett uppsättning DNA. Förklara hur denna DNA-kopiering går till.",
      modelAnswer:
        "Dubbelhelixen öppnar sig som ett blixtlås. Varje sträng fungerar som mall för att bygga en komplementär " +
        "sträng, eftersom varje kvävebas binder till en specifik motpart: A binder till ett nytt T (och T till A), " +
        "C binder till ett nytt G (och G till C).",
    },
    {
      id: "genetik-12",
      type: "open",
      text: "Vad är vanlig celldelning och reduktionsdelning? Var i kroppen sker den ena och den andra?",
      modelAnswer:
        "Vanlig celldelning (mitos) är processen där kroppsceller (somatiska celler) delas till två identiska " +
        "dotterceller, där varje dottercell får en fullständig uppsättning DNA — antalet kromosomer bevaras. " +
        "Reduktionsdelning (meios) är den celldelning som sker för att bilda könsceller, som får hälften så många " +
        "kromosomer som vanliga celler. Det är viktigt för sexuell reproduktion, eftersom ägg och spermie tillsammans " +
        "då ger en komplett uppsättning kromosomer.",
    },
    {
      id: "genetik-13",
      type: "open",
      text: "Beskriv kortfattat hur ett protein bildas. Varför tillverkar inte alla celler samma proteiner?",
      modelAnswer:
        "DNA finns i cellkärnan. En del av DNA kopieras till en enkelsträngad RNA-molekyl med samma information som " +
        "den ena DNA-strängen. RNA:t transporteras till ribosomerna, där varje kombination av tre baser (en triplett) " +
        "motsvarar en aminosyra, och aminosyrorna läggs ihop i rätt ordning enligt RNA:t. Celler specialiserar sig " +
        "(t.ex. till hud- eller muskelceller) genom att stänga av vissa gener — detta kallas genreglering, och " +
        "förklarar varför olika celler tillverkar olika proteiner trots att alla har samma DNA.",
    },
    {
      id: "genetik-14",
      type: "open",
      text: "Vad är bioteknik? Ge tre exempel på tillämpningar.",
      modelAnswer:
        "Bioteknik är teknik som utnyttjar biologiska system, organismer eller delar av dem för att utveckla " +
        "produkter eller lösa problem. Exempel: genmodifierade grödor (GMO), insulinproduktion med hjälp av " +
        "bakterier, fosterdiagnostik/DNA-tester, antibiotikaframställning, kloning av djur.",
    },
    {
      id: "genetik-15",
      type: "open",
      text:
        "Vad kan man göra med genteknik? Diskutera (i flera led) möjligheter och risker med a) GMO och b) fosterdiagnostik.",
      modelAnswer:
        "GMO — möjligheter: högre skördar, sjukdoms- och skadedjursresistenta grödor, mer näringsrik mat. " +
        "Risker: minskad biologisk mångfald, oförutsedda ekologiska effekter, etiska/ekonomiska frågor kring " +
        "patent och stora företags kontroll över utsäde. " +
        "Fosterdiagnostik — möjligheter: tidig upptäckt av genetiska sjukdomar, möjlighet att förbereda vård eller " +
        "behandling i tid. Risker: etiska dilemman kring abort och selektering av foster, frågor om integritet och " +
        "vem som ska ha tillgång till informationen.",
    },
  ],

  // Evolution: fem kryssfrågor + fyra provfrågor (åk 7 skarpt prov, åk 7 omprov, åk 9 prov, åk 9 omprov).
  // Poängfördelningen i fråga 1 är ett förslag (originalet saknades).
  evolution: [
    {
      "id": "evolution-k1",
      "type": "multi",
      "halfCredit": true,
      "text": "Begrepp i evolutionen: Kryssa i alla påståenden som är rätta.",
      "opts": {
        "A": "Variation betyder att individer i en art skiljer sig något åt i sina egenskaper.",
        "B": "Mutationer är slumpmässiga förändringar i arvsmassan.",
        "C": "Mutationer uppstår för att individen behöver en ny egenskap.",
        "D": "Naturligt urval innebär att individer med fördelaktiga egenskaper oftare överlever och får fler ungar.",
        "E": "Egenskaper som en individ lär sig under sitt liv ärvs av ungarna."
      },
      "correct": [
        "A",
        "B",
        "D"
      ]
    },
    {
      "id": "evolution-k2",
      "type": "multi",
      "halfCredit": true,
      "text": "Naturligt urval: Kryssa i alla påståenden som är rätta.",
      "opts": {
        "A": "Naturligt urval kräver att det finns variation inom arten.",
        "B": "Naturligt urval fungerar bara om egenskaperna går i arv.",
        "C": "Individer kan bestämma sig för att få en ny egenskap som passar miljön.",
        "D": "Naturligt urval bestämmer vilka mutationer som uppstår.",
        "E": "Naturligt urval gör alltid att arten blir starkare och större."
      },
      "correct": [
        "A",
        "B"
      ]
    },
    {
      "id": "evolution-k3",
      "type": "multi",
      "halfCredit": true,
      "text": "Anpassning: Kryssa i alla påståenden som är rätta.",
      "opts": {
        "A": "En art är anpassad när den har egenskaper som passar miljön den lever i.",
        "B": "Anpassningar uppstår under många generationer.",
        "C": "Fjällharen blev vit på vintern för att den ville vara osynlig.",
        "D": "Om miljön förändras kan en tidigare fördel bli en nackdel.",
        "E": "Anpassning betyder att varje individ ändrar sina gener när miljön förändras."
      },
      "correct": [
        "A",
        "B",
        "D"
      ]
    },
    {
      "id": "evolution-k4",
      "type": "multi",
      "halfCredit": true,
      "text": "Antibiotikaresistens: Kryssa i alla påståenden som är rätta.",
      "opts": {
        "A": "Resistenta bakterier har fått sin egenskap genom en slumpmässig mutation.",
        "B": "Antibiotikan gör att bakterierna muterar för att kunna överleva.",
        "C": "Vid behandling med antibiotika överlever de resistenta bakterierna oftare än de känsliga.",
        "D": "Ju mer antibiotika som används, desto större andel av bakteriepopulationen kan bli resistent.",
        "E": "De resistenta bakterierna för sin egenskap vidare till sina avkomlingar."
      },
      "correct": [
        "A",
        "C",
        "D",
        "E"
      ]
    },
    {
      "id": "evolution-k5",
      "type": "multi",
      "halfCredit": true,
      "text": "Bevis för evolution: Kryssa i alla påståenden som är rätta.",
      "opts": {
        "A": "Fossil visar hur arter har förändrats under lång tid.",
        "B": "Likheter i DNA mellan arter tyder på att de har en gemensam förfader.",
        "C": "Fossil finns bara av arter som lever idag.",
        "D": "Antibiotikaresistens hos bakterier är ett exempel på evolution som vi kan se hända.",
        "E": "Ju fler likheter i DNA två arter har, desto längre tillbaka delade de förfader."
      },
      "correct": [
        "A",
        "B",
        "D"
      ]
    },
    {
      "id": "evolution-1",
      "type": "open",
      "points": 4,
      "text": "Fjällharen har brun päls på sommaren och vit päls på vintern. Förklara hur det kan ha gått till när fjällharen under många generationer fick vit vinterpäls. Använd begreppen variation, mutation, naturligt urval och anpassning. Beskriv också vad som kan hända med fjällharen om snön kommer allt senare på hösten på grund av ett varmare klimat.",
      "modelAnswer": "1 p: Det finns variation i pälsfärg, och den uppstår bland annat genom mutationer. 1 p: Ljusa harar syntes sämre i snön och togs mer sällan av rovdjur (naturligt urval). 1 p: De överlevde, fick fler ungar och förde generna vidare. Efter många generationer blev arten anpassad med vit vinterpäls. 1 p: Om snön kommer senare syns de vita hararna på den bruna marken och blir lättare byten. Arten kan minska, eller så gynnas harar som byter päls senare, om den variationen finns."
    },
    {
      "id": "evolution-3",
      "type": "open",
      "points": 3,
      "text": "När antibiotika används mycket, till exempel när det skrivs ut i onödan eller ges till friska djur, blir allt fler bakterier resistenta. Det betyder att antibiotikan inte längre dödar dem. Förklara med hjälp av evolutionsteorin hur en bakteriepopulation kan bli resistent. Använd begreppen mutation, variation, naturligt urval och arv.",
      "modelAnswer": "1 p: Det finns variation mellan bakterierna. Genom slumpmässiga mutationer får några få bakterier en egenskap som gör dem motståndskraftiga mot antibiotikan. 1 p: När antibiotika används dör de känsliga bakterierna, medan de resistenta överlever. Det är naturligt urval. 1 p: De resistenta bakterierna förökar sig och för anlaget vidare till sina avkommor (arv). Ju mer antibiotika som används, desto större andel av populationen blir resistent."
    },
    {
      "id": "evolution-4",
      "type": "open",
      "points": 3,
      "text": "Björkmätaren är en fjäril som vilar på trädstammar under dagen. Förr var nästan alla björkmätare i England ljusa, och de syntes dåligt mot de ljusa björkstammarna. När fabrikerna under 1800-talet gjorde trädstammarna svarta av sot blev de mörka björkmätarna allt vanligare. Förklara med hjälp av evolutionsteorin varför de mörka björkmätarna blev vanligare. Använd begreppen mutation, variation, naturligt urval och arv.",
      "modelAnswer": "1 p: Det finns variation, och den uppstår genom mutationer (mörka björkmätare har uppstått genom mutationer). 1 p: När stammarna blev svarta av sot syntes de ljusa fjärilarna tydligt och åts upp av fåglar, medan de mörka var kamouflerade. De mörka överlevde oftare och fick fler ungar (naturligt urval). 1 p: Den mörka färgen sitter i generna och förs vidare till ungarna (arv). Efter många generationer blev de mörka björkmätarna vanligast."
    },
  ],

  // Resonera åk 9: fyra resonemangsfrågor (minst tre led). Poängen (3 p/fråga) är ett förslag.
  resonera9: [
    {
      "id": "resonera9-1",
      "type": "open",
      "points": 3,
      "text": "Många bönder använder konstgödsel för att deras grödor ska växa bättre, men detta kan få stora konsekvenser för miljön i närliggande sjöar och hav. Förklara hur användningen av konstgödsel på land kan leda till att fiskar och andra djur dör på havets botten. I ditt svar ska du föra ett naturvetenskapligt resonemang i minst tre led (steg) som visar på sambanden mellan mänsklig aktivitet och miljöpåverkan.",
      "modelAnswer": "Konstgödsel med kväve- och fosforföreningar sprids på åkrar → växter tar inte upp allt, det andra följer med vattnet via regn ut i närliggande vattendrag och hav → mycket näring i havet leder till algblomning → döda alger sjunker till botten och bryts ner av bakterier, vilket förbrukar syret → det konkurrerar ut fiskar som inte får tillräckligt mycket syre och dör."
    },
    {
      "id": "resonera9-2",
      "type": "open",
      "points": 3,
      "text": "Havsörnen är en toppkonsument som under lång tid har varit hotad av miljögifter som PCB och DDT. Trots att halterna av dessa gifter kan vara mycket låga i havsvattnet, kan de bli livsfarliga för havsörnen högst upp i näringskedjan. Förklara varför halten av miljögifter ökar ju högre upp i en näringskedja man kommer, och vilka konsekvenser detta får för en toppkonsument som havsörnen. I ditt svar ska du föra ett naturvetenskapligt resonemang i minst tre led (steg).",
      "modelAnswer": "Organiska miljögifter som PCB och DDT är opolära och mycket svåra för naturen att bryta ner → lagras i fettväven hos organismer istället för att försvinna som energi eller kissas ut → rovdjur samlar på sig alla gifter från de tusentals bytesdjur den äter under sin livstid → halten gift anrikas till livsfarliga nivåer hos havsörnen → skador på DNA eller att de får svårt att få ungar."
    },
    {
      "id": "resonera9-3",
      "type": "open",
      "points": 3,
      "text": "Människans användning av fossila bränslen, som kol och olja, påverkar inte bara klimatet utan förändrar även kemin i världshaven. Detta beskrivs ofta som ett stort hot mot korallreven. Förklara hur förbränning av fossila bränslen leder till att koraller får svårt att bygga sina skelett. I ditt svar ska du föra ett naturvetenskapligt resonemang i minst tre led (steg) som visar på de kemiska och biologiska sambanden.",
      "modelAnswer": "Människan förbränner fossila bränslen som frigör stora mängder koldioxid till atmosfären → tas upp av världshaven → koldioxiden reagerar med vatten och bildar kolsyra → sänker havets pH-värde → gör att karbonatjoner reagerar och försvinner → koralldjur får svårt att bygga sina skelett och skal eftersom de saknar de karbonatjoner de behöver → vilket leder till att korallreven skadas."
    },
    {
      "id": "resonera9-4",
      "type": "open",
      "points": 3,
      "text": "Vårt moderna samhälle är helt beroende av metaller för allt från smartphones till elbilar och vindkraftverk. Förklara varför det är bättre för miljön och klimatet att återvinna metaller framför att bryta ny malm. I ditt svar ska du föra ett naturvetenskapligt resonemang i minst tre led (steg) som visar på sambanden mellan resursanvändning och miljöpåverkan.",
      "modelAnswer": "Människan bryter ny metallmalm ur berggrunden med tunga maskiner → kräver enorma mängder energi och kemikalier → leder till stora utsläpp av koldioxid → påverkar klimatet (+ giftigt läckage från gruvorna → förstör lokala ekosystem + tungmetaller).\n\nÅtervinning av metaller i en cirkulär ekonomi minskar behovet av gruvdrift och skyddar miljön → sparar på jordens ändliga resurser och minskar den enorma energiåtgången och de koldioxidutsläpp som krävs för att bryta och förädla ny malm → förhindrar att farliga tungmetaller läcker ut och sprids i luft och vatten via kemikalier och gruvavfall från gruvindustrin → stoppar gifterna från att ackumuleras och anrikas i näringskedjan, vilket förhindrar att toppkonsumenter får i sig livsfarliga koncentrationer av miljögifter."
    }
  ],

  evolution7: [
    {
      id: "evolution7-1",
      type: "open",
      text: "Vad är biologi?",
      modelAnswer: "Biologi är läran om allt levande.",
    },
    {
      id: "evolution7-2",
      type: "open",
      text: "Redogör kort för de grundläggande egenskaperna för det som är levande.",
      modelAnswer:
        "Levande organismer får i sig energi och näring, förändras över flera generationer så att nya arter kan " +
        "bildas, kan föröka sig (fortplanta sig, få avkomma) och är uppbyggda av celler.",
    },
    {
      id: "evolution7-3",
      type: "open",
      text: "Beskriv kortfattat hur jorden och senare livet blev till.",
      modelAnswer:
        "Universum bildades för ca 14 miljarder år sedan genom en kraftig expansion. Solsystemet och jorden " +
        "bildades för knappt 5 miljarder år sedan av partiklar som slogs samman på grund av gravitationskraften. " +
        "Jorden var först ett glödande klot som träffades av kometer med is, vilket blev till vattenånga. När " +
        "temperaturen sjönk kondenserade vattnet och bildade hav. En teori är att enkla kemiska ämnen i vattnet, " +
        "med hjälp av mycket energi (t.ex. blixtar), kunde bygga den första självkopierande molekylen — och livet " +
        "var igång.",
    },
    {
      id: "evolution7-4",
      type: "open",
      text:
        "Beskriv fotosyntes och cellandning. Redogör för energiomvandlingar inom fotosyntes och cellandning samt för kolets kretslopp.",
      modelAnswer:
        "Fotosyntes: koldioxid + vatten + solenergi → socker + syre. Cellandning: socker + syre → energi + " +
        "koldioxid + vatten. Energiomvandling: solenergin lagras som kemisk energi i sockermolekyler vid " +
        "fotosyntesen, och frigörs sedan vid cellandningen när sockret bränns med syre och omvandlas till t.ex. " +
        "rörelseenergi eller värmeenergi. Kolets kretslopp: i fotosyntesen tas kolatomer från koldioxid i " +
        "atmosfären upp och bygger sockermolekyler; i cellandningen avges kolatomerna tillbaka som koldioxid " +
        "till atmosfären.",
    },
    {
      id: "evolution7-5",
      type: "open",
      text: "Redogör kortfattat för evolutionsteorin.",
      modelAnswer:
        "Evolution är en process där alla organismer förändras över generationer, vilket ger upphov till nya " +
        "arter. Förändringarna drivs bland annat av mutationer samt naturligt och sexuellt urval — de individer " +
        "som har egenskaper som är bäst anpassade för sin miljö har större chans att överleva och föra vidare " +
        "sina egenskaper till kommande generationer.",
    },
    {
      id: "evolution7-6",
      type: "open",
      text: "Förklara kort följande begrepp: naturligt urval, sexuellt urval, mutationer, anpassning.",
      modelAnswer:
        "Naturligt urval: individer med egenskaper som är bäst anpassade för den miljö de lever i har större " +
        "chans att överleva och föra vidare sina egenskaper. Sexuellt urval: avgör vilka individer som får " +
        "avkomma — vissa egenskaper ökar chansen att hitta en partner och sprida sina egenskaper vidare. " +
        "Mutation: en felkopiering som sker när en cell delas; sker felet i en könscell förändras egenskaperna " +
        "hos avkomman, vilket kan ge en nackdel eller en fördel. Anpassning: förmågan att klara sig i en viss " +
        "miljö, t.ex. att skaffa föda, skydd eller partner.",
    },
    {
      id: "evolution7-7",
      type: "open",
      text: "Beskriv två observationer som stärker (bevisar) evolutionsteorin.",
      modelAnswer:
        "Exempel på bevis: (1) Fossil — avtryck från döda växter och djur; ju äldre fossil, desto enklare " +
        "organismer, vilket visar att organismer utvecklats till mer komplicerade strukturer över tid. " +
        "(2) Likheter i anatomi — stora likheter i kroppskonstruktion inom djurgrupper visar på gemensamt " +
        "ursprung, t.ex. har alla däggdjur tydliga likheter i skelettet. Andra godtagbara exempel: likheter i " +
        "fosterutveckling (tidiga foster hos fisk, höna, gris, kanin och människa är svåra att skilja åt) och " +
        "likheter i DNA (visar hur nära släkt olika organismer är).",
    },
  ],

  ekologi7: [
    {
      id: "ekologi7-1",
      type: "open",
      text: "Vad skiljer en biotop från ett habitat?",
      modelAnswer:
        "En biotop är i princip en viss naturtyp, t.ex. en äng, med typiska växt- och djursamhällen. Ett habitat är " +
        "den livsmiljö en viss organism behöver för att kunna utvecklas. Biotopen och habitatet kan ofta " +
        "sammanfalla, men en art kan behöva olika habitat under olika tider (t.ex. ålen eller flyttfåglar).",
    },
    {
      id: "ekologi7-2",
      type: "open",
      text: "Varför råder det ständig konkurrens i ett ekosystem?",
      modelAnswer:
        "Det råder ständig konkurrens eftersom alla organismer vill föröka sig och därmed ta så mycket resurser som " +
        "möjligt i anspråk, och resurserna är begränsade.",
    },
    {
      id: "ekologi7-3",
      type: "open",
      text: "Varför kan två arter inte dela samma ekologiska nisch någon längre tid?",
      modelAnswer:
        "Om två arter delade samma ekologiska nisch skulle de ha exakt samma krav på sin omgivning, och till slut " +
        "skulle den ena arten konkurrera ut den andra.",
    },
    {
      id: "ekologi7-4",
      type: "open",
      text: "Varför växer tallen oftare på hällmarker och myrar än på bördigare mark?",
      modelAnswer:
        "Tallen växer helst på magra hällmarker och myrar. Den skulle gärna växa på näringsrika sluttningar också, " +
        "men där konkurreras den ut av granen.",
    },
    {
      id: "ekologi7-5",
      type: "open",
      text: "Vilka fördelar finns det med att vara opportunist, specialist respektive pionjär?",
      modelAnswer:
        "Opportunisten kan dra fördel av okända miljöer (t.ex. kråkfåglar som lätt anpassar sig till ett liv i " +
        "städer). Specialisten är stark i den miljö arten är anpassad för och tränger undan konkurrenterna där. " +
        "Pionjären är mästare på att utnyttja tillfälliga störningar som skogsbränder eller jordskred. Ingen av " +
        "strategierna är generellt bättre än de andra.",
    },
    {
      id: "ekologi7-6",
      type: "open",
      text: "Hur bidrar konkurrensen till att evolutionen ständigt pågår?",
      modelAnswer:
        "Konkurrensen gynnar alltid de individer som utvecklar nya egenskaper som ökar deras konkurrenskraft. På så " +
        "vis förändras arterna ständigt under evolutionen, och på lång sikt bildas nya arter medan andra går under.",
    },
    {
      id: "ekologi7-7",
      type: "open",
      text: "Varför är fotosyntesen basen för näringsförsörjningen i nästan alla ekosystem?",
      modelAnswer:
        "Fotosyntesen är basen för näringsförsörjningen eftersom de gröna växterna är födan för alla växtätare, " +
        "som i sin tur är födan för alla rovdjur.",
    },
    {
      id: "ekologi7-8",
      type: "open",
      text: "Hur samspelar producenter och konsumenter i ett ekosystem?",
      modelAnswer:
        "Ju mer producenterna (de gröna växterna) kan tillverka föda, desto fler blir konsumenterna. Då kan de beta " +
        "växterna så hårt att produktionen minskar igen. På så sätt samspelar producenter och konsumenter hela " +
        "tiden i ett ekosystem.",
    },
    {
      id: "ekologi7-9",
      type: "open",
      text: "Vilken roll spelar nedbrytarna i en näringskedja?",
      modelAnswer:
        "Nedbrytarna bryter ner spillning och döda djur- och växtdelar till ämnen som de gröna växterna kan ta upp " +
        "och använda igen, till exempel vid sin fotosyntes.",
    },
    {
      id: "ekologi7-10",
      type: "open",
      text: "Varför förlorar näringskedjan nästan 90 % av energin och näringen mellan trofinivåerna?",
      modelAnswer:
        "Näringskedjan förlorar nästan 90 % av energin och näringen mellan två trofinivåer eftersom merparten av " +
        "energin och näringen behövs för att organismen själv ska kunna leva och röra på sig.",
    },
    {
      id: "ekologi7-11",
      type: "open",
      text: "Varför riskerar toppkonsumenter att drabbas av miljögifter?",
      modelAnswer:
        "Toppkonsumenter drabbas hårdast eftersom miljögifter inte försvinner ur kroppen, utan lagras i djurens " +
        "fett. När ett djur äter många mindre djur tar det över allt gift som de mindre djuren har samlat på sig " +
        "under sina liv. Giftet förs på så sätt vidare uppåt i näringskedjan och lagras i allt större mängder för " +
        "varje steg. Eftersom toppkonsumenten äter väldigt mycket mat från ledet under sig, hamnar till slut " +
        "gigantiska mängder gift i dess kropp, vilket kan göra djuret sjukt.",
    },
  ],

  // ── Läxförhör kemi: Periodiska systemet åk 9 ──────────────────────
  // 27 skrivfrågor (type "open"), AI-bedömda mot modelAnswer (= lärarens facit).
  // Delarna i ordning: atomens uppbyggnad, elektronskal, periodiska systemet, kemisk bindning.
  // OBS: två frågor är anpassade för appen eftersom man inte kan rita i den (markerade nedan).
  periodiska9: [
    // ── Atomens uppbyggnad ──
    {
      id: "periodiska9-1a",
      type: "open",
      text: "Vilka partiklar är en atom byggd av och var i atomen finns de?",
      modelAnswer:
        "En atom består av protoner (+) och neutroner (neutrala) i atomkärnan, samt elektroner (-) som rör sig i " +
        "skal runt kärnan.",
    },
    {
      id: "periodiska9-1b",
      type: "open",
      text: "Vad är skillnaden mellan olika atomslag?",
      modelAnswer: "Antalet protoner i kärnan.",
    },
    {
      id: "periodiska9-1c",
      type: "open",
      text: "Vilka elektriska laddningar har partiklarna i en atom?",
      modelAnswer: "Protoner är positiva, elektroner är negativa och neutroner är oladdade.",
    },
    {
      id: "periodiska9-1d",
      type: "open",
      text: "Varför är en atom oladdad?",
      modelAnswer:
        "Atomen är oladdad eftersom den innehåller lika många protoner som elektroner, vilket gör att " +
        "laddningarna tar ut varandra.",
    },
    {
      id: "periodiska9-1e",
      type: "open",
      text: "Varför far elektronerna inte iväg från atomkärnan och varför dras de inte in till den?",
      modelAnswer:
        "Elektriska krafter håller kvar elektronerna, medan deras höga hastighet hindrar dem från att dras in " +
        "i kärnan.",
    },
    {
      id: "periodiska9-1f",
      type: "open",
      text: "Ibland brukar man jämföra atomen med solsystemet. Vad kan du se för likheter och skillnader?",
      modelAnswer:
        "Likheten är att partiklar kretsar kring ett centrum. Skillnaden är att atomen styrs av elektrisk kraft " +
        "medan solsystemet styrs av gravitation.",
    },
    {
      id: "periodiska9-1g",
      type: "open",
      text: "Vad vet man om atomen om man känner till atomnumret?",
      modelAnswer: "Det anger hur många protoner (och därmed elektroner) atomen har.",
    },
    {
      id: "periodiska9-1h",
      type: "open",
      text: "Vad menas med isotoper? Hur betecknar man olika isotoper av helium?",
      modelAnswer:
        "Isotoper är varianter av ett grundämne med samma antal protoner men olika antal neutroner. Olika " +
        "heliumisotoper betecknas genom att skriva masstalet (t.ex. 3 eller 4) snett ovanför He, alltså 3He och 4He.",
    },
    {
      id: "periodiska9-1i",
      type: "open",
      text: "Vilken uppgift har neutronerna i atomkärnan?",
      modelAnswer:
        "Neutronerna fungerar som ett \"klister\" som neutraliserar de positiva protonerna så att de inte stöter " +
        "bort varandra.",
    },

    // ── Elektronskal ──
    {
      id: "periodiska9-2a",
      type: "open",
      text: "Vad menas med elektronskal, valensskal och valenselektroner?",
      modelAnswer:
        "Elektronskal är banorna där elektronerna rör sig. Valensskalet är det yttersta skalet och " +
        "valenselektroner är elektronerna som finns där.",
    },
    {
      id: "periodiska9-2b",
      type: "open",
      text: "Vad heter de tre första elektronskalen?",
      modelAnswer: "De tre första skalen heter K, L och M.",
    },
    // Originalet (U2) ber eleven rita elektronkonfiguration. Eleven klickar nu själv ihop elektronerna i skalen
    // (frågetyp "shells"). Ämnena kol, syre och natrium är valda av Claude – byt z/sym/name för andra ämnen.
    {
      id: "periodiska9-2c-kol",
      type: "shells",
      z: 6, sym: "C", name: "kol",
      text: "Rita elektronerna i skalen för kol (atomnummer 6): lägg till elektroner i skalen K, L och M.",
      modelAnswer: "Kol: 2 elektroner i K-skalet och 4 i L-skalet (2, 4).",
    },
    {
      id: "periodiska9-2c-syre",
      type: "shells",
      z: 8, sym: "O", name: "syre",
      text: "Rita elektronerna i skalen för syre (atomnummer 8): lägg till elektroner i skalen K, L och M.",
      modelAnswer: "Syre: 2 elektroner i K-skalet och 6 i L-skalet (2, 6).",
    },
    {
      id: "periodiska9-2c-natrium",
      type: "shells",
      z: 11, sym: "Na", name: "natrium",
      text: "Rita elektronerna i skalen för natrium (atomnummer 11): lägg till elektroner i skalen K, L och M.",
      modelAnswer: "Natrium: 2 elektroner i K-skalet, 8 i L-skalet och 1 i M-skalet (2, 8, 1).",
    },

    // ── Periodiska systemet ──
    {
      id: "periodiska9-3a",
      type: "open",
      text: "Vem upptäckte det periodiska systemet?",
      modelAnswer: "Den ryske kemisten Mendelejev.",
    },
    {
      id: "periodiska9-3b",
      type: "open",
      text: "Vad kallas de vågräta och de lodräta raderna i systemet?",
      modelAnswer: "Vågräta rader kallas perioder och lodräta kolumner kallas grupper.",
    },
    {
      id: "periodiska9-3c",
      type: "open",
      text: "Förklara varför ämnen som är i samma grupp har liknande egenskaper.",
      modelAnswer: "De har lika många valenselektroner, vilket ger dem liknande kemiska egenskaper.",
    },
    {
      id: "periodiska9-3d",
      type: "open",
      text: "Vad har atomslagen i en period gemensamt?",
      modelAnswer: "De har lika många elektronskal.",
    },
    {
      id: "periodiska9-3e",
      type: "open",
      text: "Ge tre exempel på ädelgaser och vad som är specifikt för atomer i den gruppen.",
      modelAnswer:
        "Exempel: helium, neon och argon. De har fulla elektronskal, vilket gör dem stabila och oreaktiva.",
    },
    {
      id: "periodiska9-3f",
      type: "open",
      text: "Förklara varför man sällan hittar alkalimetaller i metallform ute i naturen.",
      modelAnswer:
        "De är mycket reaktiva och vill gärna lämna ifrån sig sin enda valenselektron för att få fullt skal; " +
        "därför finns de oftast bara som joner i föreningar.",
    },
    {
      id: "periodiska9-3g",
      type: "open",
      text: "Förklara med en kemisk reaktionsformel hur litium reagerar med vatten. Vilka ämnen bildas?",
      modelAnswer:
        "Reaktionen behöver inte vara balanserad, så man kan bortse från tvåorna framför de kemiska " +
        "beteckningarna: Li + H2O -> Li+ + OH- + H2. Balanserad: 2Li + 2H2O -> 2Li+ + 2OH- + H2. " +
        "Det bildas litiumjoner (Li+), hydroxidjoner (OH-) och vätgas (H2). " +
        "Med ord: litium + vatten -> litiumjoner + hydroxidjoner + vätgas.",
    },

    // ── Kemisk bindning ──
    {
      id: "periodiska9-4a",
      type: "open",
      text: "Vad är en jon?",
      modelAnswer:
        "En jon är en atom som har lämnat ifrån sig eller tagit upp elektroner så att den blivit elektriskt laddad.",
    },
    // Originalet ber eleven rita molekylbindningen för CH4, H2O eller H2. Eleven bygger nu molekylen själv genom att
    // dra valenselektroner till mitten mellan atomerna (frågetyp "molecule"). Tre molekyler (H2, H2O, CH4) – lägg till fler på samma sätt.
    {
      id: "periodiska9-4b-h2",
      type: "molecule",
      name: "vätgas", formula: "H₂",
      atoms: [["H", 130, 150], ["H", 270, 150]],
      bonds: [[0, 1, 1]],
      text: "Bygg molekylen vätgas (H₂): dra valenselektronerna till mitten mellan atomerna så att de bildar delade elektronpar. Varje atom ska få fullt yttre skal (väte 2 elektroner, övriga 8).",
      modelAnswer: "Atomerna delar på ett elektronpar (en enkelbindning) så att båda väteatomerna får fullt skal med 2 elektroner.",
    },
    {
      id: "periodiska9-4b-h2o",
      type: "molecule",
      name: "vatten", formula: "H₂O",
      atoms: [["O", 200, 100], ["H", 110, 205], ["H", 290, 205]],
      bonds: [[0, 1, 1], [0, 2, 1]],
      text: "Bygg molekylen vatten (H₂O): dra valenselektronerna till mitten mellan atomerna så att de bildar delade elektronpar. Varje atom ska få fullt yttre skal (väte 2 elektroner, övriga 8).",
      modelAnswer: "Syreatomen delar ett elektronpar med var och en av väteatomerna (två enkelbindningar). Då får syre 8 elektroner i yttre skalet och varje väte 2.",
    },
    {
      id: "periodiska9-4b-ch4",
      type: "molecule",
      name: "metan", formula: "CH₄",
      atoms: [["C", 200, 150], ["H", 200, 38], ["H", 200, 262], ["H", 88, 150], ["H", 312, 150]],
      bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]],
      text: "Bygg molekylen metan (CH₄): dra valenselektronerna till mitten mellan atomerna så att de bildar delade elektronpar. Varje atom ska få fullt yttre skal (väte 2 elektroner, övriga 8).",
      modelAnswer: "Kolatomen delar ett elektronpar med var och en av de fyra väteatomerna (fyra enkelbindningar). Då får kol 8 elektroner i yttre skalet och varje väte 2.",
    },
    {
      id: "periodiska9-4c",
      type: "open",
      text:
        "I en syremolekyl (O2) hålls syreatomerna ihop av en dubbelbindning. Förklara vad det betyder och varför " +
        "atomerna är ”nöjda” då.",
      modelAnswer:
        "Det betyder att atomerna delar på två elektronpar. De blir nöjda för att de då får fulla yttersta skal.",
    },
    {
      id: "periodiska9-4d",
      type: "open",
      text: "Förklara hur kol och väte håller samman i en metanmolekyl.",
      modelAnswer: "Kolatomen delar sina fyra valenselektroner med fyra väteatomer i gemensamma elektronpar.",
    },
    {
      // Originalet saknade facit (troligen en ritfråga). Facit nedan är skrivet av Claude utifrån facit till
      // föregående fråga och standardkemi (metan CH4) – justera gärna efter hur du vill att eleverna svarar.
      id: "periodiska9-4e",
      type: "open",
      text: "Beskriv metanmolekylen med hjälp av molekylbindningar.",
      modelAnswer:
        "Metan (CH4) består av en kolatom och fyra väteatomer. Kolatomen delar ett elektronpar med varje " +
        "väteatom, alltså fyra enkelbindningar. Då får kol 8 elektroner i sitt yttersta skal och varje väte 2, " +
        "så alla atomerna får fulla skal.",
    },
    {
      id: "periodiska9-4f",
      type: "open",
      text: "Hur fungerar metallbindning?",
      modelAnswer:
        "Atomerna ligger inbäddade i ett gemensamt moln av fria elektroner som håller ihop hela metallbiten.",
    },
    {
      id: "periodiska9-4g",
      type: "open",
      points: 1,
      text:
        "En järnatom kan lämna bort tre elektroner. Hur skriver man med kemiskt tecken den järnjon som bildas?",
      modelAnswer: "Fe3+ (Fe med 3+ som upphöjd text).",
    },
    {
      id: "periodiska9-4h",
      type: "open",
      text: "Vilka ämnen bildar lättast positiva joner och vilka ämnen bildar lättast negativa joner?",
      modelAnswer:
        "Metaller bildar lättast positiva joner, medan icke-metaller lättast bildar negativa joner.",
    },
  ],

  // ── Prov ──────────────────────────────────────────────────────────
  // ── Läxförhör fysik: Kraft och rörelse åk 7 ──────────────────────
  // 14 skrivfrågor ur läxförhöret (frågorna 1, 3, 4, 6 och 9–18). Facit är hämtat ur häftets lösningsförslag.
  // Fråga 4 (rita krafter) är en klickövning (frågetyp "forces"); den saknade lösningsförslag i häftet, så facit där är skrivet av Claude.
  kraft7: [
    {
      id: "kraft7-1",
      type: "open",
      points: 1,
      text: "Vad är tyngden av en 1000 kg tung bil på jorden?",
      modelAnswer:
        "Tyngdkraften på jorden är ungefär 10 gånger massan i kg. Tyngden är 10 000 N.",
    },
    {
      id: "kraft7-3",
      type: "open",
      points: 2,
      text: "Vad är normalkraften från vägen på en 1000 kg tung bil på jorden? Förklara varför.",
      modelAnswer:
        "Normalkraften är 10 000 N. 1 p: Tyngdkraften på bilen är 10 000 N och drar bilen nedåt. 1 p: Bilen står still och går inte genom vägen, så det måste finnas en motriktad kraft, normalkraften, som är riktad uppåt och lika stor som tyngdkraften, och därför tar ut den.",
    },
    {
      id: "kraft7-4",
      type: "forces",
      points: 3,
      text: "Rita krafterna som verkar på lampan i de tre fallen: a) lampan hänger stilla i en tråd från taket, b) tråden har gått av och lampan faller, c) lampan står stilla på golvet.",
      // Facit saknades i häftet för uppgift 4 (ritfråga). Facit nedan är skrivet av Claude utifrån häftets avsnitt "Rita krafter".
      modelAnswer:
        "a) Tyngdkraften verkar nedåt och en lika stor dragkraft från tråden verkar uppåt, så krafterna tar ut varandra. b) Bara tyngdkraften verkar nedåt, så lampan accelererar nedåt. c) Tyngdkraften verkar nedåt och en lika stor normalkraft från golvet verkar uppåt, så krafterna tar ut varandra.",
    },
    {
      id: "kraft7-6",
      type: "open",
      points: 2,
      text: "På längdskidor vallar man mitten av undersidan med fästvalla som liknar klister, och fram- och bakdelen av undersidan med glidvalla. Varför är det så?",
      modelAnswer:
        "1 p: Man vill ha bra glid framåt, och för att skidorna ska glida är det glidvalla fram och bak. 1 p: För att ta sig fram måste man trycka bakåt mot snön, och då får skidan inte glida. Det krävs bra friktion, och när man trycker på skidan pressas mitten med fästvallan mot snön. När skidan glider böjs mitten upp så att så lite fästvalla som möjligt är i kontakt med snön.",
    },
    {
      id: "kraft7-9",
      type: "open",
      points: 1,
      text: "På en gungbräda sitter en man som väger 60 kg och ett barn som väger 30 kg. Räkna mannens och barnets tyngd. Det är tyngdkraften som verkar på gungbrädan.",
      modelAnswer:
        "Tyngden är ungefär 10 gånger massan i kg. Mannen: 600 N. Barnet: 300 N.",
    },
    {
      id: "kraft7-10",
      type: "open",
      points: 2,
      text: "På en gungbräda sitter en man som väger 60 kg (tyngd 600 N) på avståndet L från vridpunkten, och ett barn som väger 30 kg (tyngd 300 N) 2,0 m från vridpunkten på andra sidan. Visa att gungbrädan är i balans om avståndet L = 1 m. Använd relevanta begrepp.",
      modelAnswer:
        "1 p: Gungan är i jämvikt när kraftmomentet (kraft gånger avstånd) är lika på båda sidorna. Barnets kraftmoment är 300 N · 2 m = 600 Nm. 1 p: Mannens kraftmoment är 600 N · 1 m = 600 Nm. Kraftmomenten är lika stora, så gungan är i jämvikt. Godta också: mannen väger dubbelt så mycket som barnet och måste därför sitta på halva avståndet, 2 / 2 = 1 m.",
    },
    {
      id: "kraft7-11",
      type: "open",
      points: 2,
      text: "Kan du förklara hur en så kallad kofot fungerar? (En kofot är en lång stång med en böjd ände som används för att dra upp en spik.)",
      modelAnswer:
        "1 p: En kofot fungerar som en hävstång. Avståndet mellan spiken och rotationspunkten är mycket kortare än avståndet mellan rotationspunkten och punkten där man trycker. För att få upp spiken lätt trycker man vid kofotens ände, så att avståndet blir så stort som möjligt. 1 p: Kraftmoment är kraft gånger avstånd, så en liten kraft med långt avstånd ger ett stort kraftmoment. Det motsvarar en stor dragkraft på spiken (kort avstånd) som får upp den.",
    },
    {
      id: "kraft7-12",
      type: "open",
      points: 1,
      text: "Beräkna farten för ett tåg som kör 450 km på 3 timmar.",
      modelAnswer:
        "Fart = sträcka / tid = 450 km / 3 h = 150 km/h.",
    },
    {
      id: "kraft7-13",
      type: "open",
      points: 1,
      text: "Beräkna farten för en tennisboll som tar en sekund att färdas 60 meter.",
      modelAnswer:
        "Bollen färdas 60 m på 1 s, så farten är 60 m/s.",
    },
    {
      id: "kraft7-14",
      type: "open",
      points: 1,
      text: "Ljusets hastighet är 300 000 km/s. Hur långt färdas ljuset på en minut?",
      modelAnswer:
        "En minut är 60 s. Sträckan är 300 000 km/s · 60 s = 18 000 000 km, alltså 18 miljoner km.",
    },
    {
      id: "kraft7-15",
      type: "open",
      points: 1,
      text: "Kevin bor 2 km från skolan. Det tar 20 minuter för honom att gå från hemmet till skolan. Med vilken fart går han?",
      modelAnswer:
        "20 minuter är en tredjedel av en timme. På en timme går han tre gånger så långt: 2 km · 3 = 6 km/h.",
    },
    {
      id: "kraft7-16",
      type: "open",
      points: 1,
      text: "En bil ökar hastighet från 0 till 100 m/s på 10 sekunder. Vilken är dess medelacceleration?",
      modelAnswer:
        "Hastigheten ökar med 100 m/s på 10 s, alltså 100 / 10 = 10 m/s varje sekund. Accelerationen är 10 m/s².",
    },
    {
      id: "kraft7-17",
      type: "open",
      points: 3,
      text: "Beskriv vad som händer om du åker pulka i hög fart och kommer på en grusväg där pulkan tvärstannar.",
      modelAnswer:
        "1 p: Din kropp har en hastighet och en massa. På grund av tröghet fortsätter din kropp framåt trots att pulkan stannar (Newtons 1:a lag: det krävs en kraft för att ändra hastigheten). Om du inte bromsar med ben eller händer flyger du iväg. 1 p: Tyngdkraften drar dig nedåt tills du landar på marken. 1 p: Friktionskraften från grusvägen sänker din hastighet till noll, och du står stilla med en normalkraft från vägen som tar ut din tyngd.",
    },
    {
      id: "kraft7-18",
      type: "open",
      points: 3,
      text: "Beskriv vad som händer med en astronaut i rymden som kastar ett verktyg framåt.",
      modelAnswer:
        "1 p: Astronauten utövar en kraft på verktyget så att det accelererar framåt. 1 p: Enligt kraft och motkraft (Newtons 3:e lag) utövar verktyget en lika stor kraft på astronauten, men åt motsatt håll. Astronauten åker därför baklänges, bort från rymdskeppet. 1 p: Astronautens massa är större än verktygets, så astronautens fart blir lägre än verktygets.",
    },
    // Fyra egna frågor om centralrörelse och fritt fall (facit skrivet av Claude, ej från häftet).
    {
      id: "kraft7-c1",
      type: "open",
      points: 2,
      text: "En släggkastare snurrar släggan i en cirkel och släpper sedan vajern. Åt vilket håll far släggan iväg, och varför?",
      modelAnswer:
        "1 p: Släggan far rakt fram i en rak linje, i tangentens riktning (inte utåt från mitten), åt det håll den rörde sig i just det ögonblicket. 1 p: Förklaring: Tröghet. Ett föremål fortsätter med samma fart och riktning om ingen kraft ändrar det. Så länge vajern höll i drog den släggan inåt (centripetalkraft) och böjde banan, och när vajern släpps finns ingen sådan kraft kvar.",
    },
    {
      id: "kraft7-c2",
      type: "open",
      points: 2,
      text: "I en karusell känns det som att du trycks utåt. Förklara varför det känns så. Är centrifugalkraften en riktig kraft?",
      modelAnswer:
        "1 p: Kroppen vill fortsätta rakt fram på grund av tröghet, men karusellen tvingar den att svänga hela tiden. Det är därför det känns som att något trycker dig utåt. 1 p: Centrifugalkraften är ingen riktig kraft utan en skenkraft, en effekt av tröghet. Den enda riktiga kraften i centralrörelsen är centripetalkraften, som är riktad inåt mot mitten.",
    },
    {
      id: "kraft7-c3",
      type: "open",
      points: 2,
      text: "En sten faller fritt (räkna med g = 10 m/s², bortse från luftmotståndet). Vilken fart har stenen efter 3 sekunder, och hur långt har den fallit då?",
      modelAnswer:
        "1 p: Farten ökar med 10 m/s varje sekund, så efter 3 s är farten 10 m/s · 3 = 30 m/s. 1 p: Medelfarten är (0 + 30) / 2 = 15 m/s, och sträckan är 15 m/s · 3 s = 45 m. (Samma resultat med sträcka = 5 · t² = 5 · 9 = 45 m.)",
    },
    {
      id: "kraft7-c4",
      type: "open",
      points: 3,
      text: "Ett klot av papper och ett klot av järn har exakt samma form och storlek och släpps samtidigt i luft. Vilket når marken först, och varför? Vad händer om försöket görs i vakuum?",
      modelAnswer:
        "1 p: Järnklotet når marken först. 1 p: Luftmotståndet är ungefär lika stort på båda eftersom formen är lika, men tyngdkraften på pappersklotet är mycket mindre, så luftmotståndet bromsar pappersklotet mycket mer. Järnklotet har så stor tyngdkraft att luftmotståndet knappt märks. 1 p: I vakuum finns inget luftmotstånd, så båda faller lika snabbt (bara tyngdkraften verkar, samma tyngdacceleration) och landar samtidigt.",
    },
  ],

  // ── Prov Biologi åk 7 – Ekologi och evolution (29 p) ──
  // Del A: 12 kryssfrågor (1 p, 0,5 p vid högst ett fel). Del B: skrivfrågor med provets poäng.
  biologi7: [
    // ── Del A ──
    {
      id: "biologi7-k1",
      type: "multi",
      halfCredit: true,
      text: "Ekologiska begrepp: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "Alla gäddor i en sjö bildar tillsammans en population.",
        B: "Ett samhälle är alla individer av en och samma art.",
        C: "Ett ekosystem kan vara så litet som en stubbe eller ett akvarium.",
        D: "En art består av individer som kan få ungar som själva kan få ungar.",
        E: "Ekologi är läran om hur man tillverkar mediciner av växter.",
      },
      correct: ["A", "C", "D"],
    },
    {
      id: "biologi7-k2",
      type: "multi",
      halfCredit: true,
      text: "Vilka av följande är biotiska faktorer? Kryssa i alla som stämmer.",
      opts: {
        A: "Nederbörd",
        B: "Maskar",
        C: "Vind",
        D: "Salthalt i havet",
        E: "Mineralämnen i berggrunden",
      },
      correct: ["B"],
    },
    {
      id: "biologi7-k3",
      type: "multi",
      halfCredit: true,
      text: "Konkurrens och nisch: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "Konkurrens uppstår eftersom resurser som mat och boplatser är begränsade.",
        B: "Konkurrens betyder alltid att djuren slåss med varandra.",
        C: "Två arter med olika nischer kan leva sida vid sida i samma ekosystem.",
        D: "Arter som lätt hittar nya boplatser och anpassar sig till nya miljöer kallas specialister.",
        E: "Konkurrens finns bara mellan olika arter, aldrig inom samma art.",
      },
      correct: ["A", "C"],
    },
    {
      id: "biologi7-k4",
      type: "multi",
      halfCredit: true,
      text: "Fotosyntes: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "Syret som bildas vid fotosyntesen släpps ut i luften.",
        B: "Växten tar upp vattnet till fotosyntesen från luften genom bladen.",
        C: "Sockret används av växten både som byggmaterial och som energi.",
        D: "Fotosyntes kan ske i totalt mörker.",
        E: "Det är kolet från luftens koldioxid som bygger upp trädstammar och löv.",
      },
      correct: ["A", "C", "E"],
    },
    {
      id: "biologi7-k5",
      type: "multi",
      halfCredit: true,
      text: "Cellandning och energi: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "Vid cellandningen omvandlas kemisk energi i socker till till exempel rörelseenergi och värmeenergi.",
        B: "Vid cellandningen tar kroppen upp koldioxid.",
        C: "Vi andas in syre för att kunna förbränna socker i cellerna.",
        D: "Vid cellandningen tillverkas socker.",
        E: "Solenergi omvandlas direkt till rörelseenergi i våra muskler.",
      },
      correct: ["A", "C"],
    },
    {
      id: "biologi7-k6",
      type: "multi",
      halfCredit: true,
      text: "Näringskedjor och näringsvävar: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "En näringsväv består av många näringskedjor som hänger ihop.",
        B: "Ett djur kan bara ha en roll i en näringsväv, antingen växtätare eller rovdjur.",
        C: "Toppkonsumenter är de djur som kommer sist i en näringskedja.",
        D: "Växterna är konsumenter i en näringskedja.",
        E: "Pilarna i en näringskedja visar åt vilket håll näringen går.",
      },
      correct: ["A", "C", "E"],
    },
    {
      id: "biologi7-k7",
      type: "multi",
      halfCredit: true,
      text: "Näringspyramiden och miljögifter: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "Halten av miljögifter är oftast högst längst ner i näringskedjan.",
        B: "Miljögifter lagras ofta i djurens fett.",
        C: "Det krävs mycket växter för att försörja ett litet antal rovdjur.",
        D: "Energi och miljögifter försvinner på samma sätt mellan nivåerna i en näringskedja.",
        E: "Människor kan vara toppkonsumenter.",
      },
      correct: ["B", "C", "E"],
    },
    {
      id: "biologi7-k8",
      type: "multi",
      halfCredit: true,
      text: "Kolets och vattnets kretslopp: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "När vi eldar ved släpps kolet i veden tillbaka till luften som koldioxid.",
        B: "Olja, stenkol och naturgas har bildats av växter och djur som dog för miljontals år sedan.",
        C: "När havsvatten avdunstar följer saltet med upp i molnen.",
        D: "Kolets snabba kretslopp tar alltid miljontals år.",
        E: "Växterna tar upp mineralämnen ur luften.",
      },
      correct: ["A", "B"],
    },
    {
      id: "biologi7-k9",
      type: "multi",
      halfCredit: true,
      text: "Biologisk mångfald och ekosystemtjänster: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "Våtmarker som renar vatten är ett exempel på en ekosystemtjänst.",
        B: "Genetisk variation uppstår bland annat genom sexuell förökning och mutationer.",
        C: "En regnskog har oftast låg biologisk mångfald.",
        D: "Om en art försvinner påverkar det aldrig andra arter.",
        E: "Fisk och trä från naturen räknas inte som ekosystemtjänster.",
      },
      correct: ["A", "B"],
    },
    {
      id: "biologi7-k10",
      type: "multi",
      halfCredit: true,
      text: "Livet och dess uppkomst: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "Alla organismer är uppbyggda av celler.",
        B: "När en organism växer är det samma sak som evolution.",
        C: "Flytande vatten är en förutsättning för att liv ska kunna uppstå.",
        D: "De första organismerna på jorden var flercelliga djur.",
        E: "Jorden ligger på lagom avstånd från solen, vilket ger en temperatur som passar liv.",
      },
      correct: ["A", "C", "E"],
    },
    {
      id: "biologi7-k11",
      type: "multi",
      halfCredit: true,
      text: "Naturligt och sexuellt urval: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "De flesta arter får fler ungar än det finns resurser för att alla ska överleva.",
        B: "En individ kan ändra sina gener genom att träna mycket.",
        C: "Påfågelhanens stora och färggranna stjärt kan förklaras med sexuellt urval.",
        D: "De flesta mutationer är till fördel för individen.",
        E: "Evolutionen strävar efter att arterna ska bli så perfekta som möjligt.",
      },
      correct: ["A", "C"],
    },
    {
      id: "biologi7-k12",
      type: "multi",
      halfCredit: true,
      text: "Vilka av följande är bevis för evolution? Kryssa i alla som stämmer.",
      opts: {
        A: "Människan har en svanskota, en rest av en kroppsdel som hade en funktion hos våra förfäder.",
        B: "Likheter i DNA visar hur nära släkt olika organismer är med varandra.",
        C: "En katt kan få ungar med olika pälsfärg i samma kull.",
        D: "Människor kan lära sig nya saker under livet.",
        E: "Vissa djur sover på vintern.",
      },
      correct: ["A", "B"],
    },
    // ── Del B ──
    {
      id: "biologi7-13",
      type: "open",
      points: 4,
      text: "Kolets kretslopp (4 p): En gammal tall i skogen dör och faller omkull. Beskriv vad som händer med kolet i trädet efter att det har dött, och hur kolet sedan kan bli en del av ett nytt träd. Förklara också varför ved som eldas räknas till kolets snabba kretslopp, medan olja räknas till det långsamma kretsloppet.",
      modelAnswer:
        "1 p: Nedbrytare (svampar, bakterier, maskar) bryter ner det döda trädet. 1 p: Vid nedbrytningen andas nedbrytarna ut kolet som koldioxid till luften. 1 p: Ett nytt träd tar upp koldioxiden vid fotosyntesen och bygger socker, stam och löv av kolet. 1 p: Ved har nyss tagit upp kolet från luften (snabba kretsloppet, upp till ca 100 år). Olja bildades av växter och djur för miljontals år sedan, så kolet har varit fastlåst länge (långsamma kretsloppet).",
    },
    {
      id: "biologi7-14",
      type: "open",
      points: 4,
      text: "Evolution (4 p): Fjällharen har brun päls på sommaren och vit päls på vintern. Förklara hur det kan ha gått till när fjällharen under många generationer fick vit vinterpäls. Använd begreppen variation, mutation, naturligt urval och anpassning. Beskriv också vad som kan hända med fjällharen om snön kommer allt senare på hösten på grund av ett varmare klimat.",
      modelAnswer:
        "1 p: Det finns variation i pälsfärg mellan harar, bland annat genom mutationer. 1 p: Harar med ljusare vinterpäls syntes sämre i snön och blev mer sällan tagna av rovdjur (naturligt urval). 1 p: De överlevde, fick fler ungar och förde vidare generna. Efter många generationer blev arten anpassad med vit vinterpäls. 1 p: Om snön kommer senare syns de vita hararna på den bruna marken och blir lättare byten. Arten kan minska, eller så gynnas harar som byter päls senare om den variationen finns.",
    },
    {
      id: "biologi7-15",
      type: "open",
      points: 3,
      text: "Näringsväv (3 p): I en sjö finns denna näringsväv: växtplankton äts av djurplankton. Djurplankton äts av både mört och abborre. Abborren äter också mört. Gäddan äter både mört och abborre. Fiskgjusen fångar gädda och abborre. Tänk dig att människor fiskar upp nästan alla gäddor i sjön. Beskriv minst två saker som kan hända med de andra arterna och förklara varför.",
      modelAnswer:
        "1 p: Mört och abborre blir fler, eftersom färre gäddor äter dem. 1 p: Fler mörtar och abborrar äter mer djurplankton. Djurplankton minskar och växtplankton kan öka. 1 p: Fiskgjusen får färre gäddor att fånga, men kan äta fler abborrar. Förklaring: arterna hänger ihop i flera näringskedjor, så förändringen sprider sig i väven.",
    },
    {
      id: "biologi7-16",
      type: "open",
      points: 3,
      text: "Miljögifter och bioackumulering (3 p): I en sjö har det kommit ut en liten mängd miljögift. Anna äter ofta gädda från sjön. Erik äter mest grönsaker som odlats vid sjön. Vem av dem riskerar att få i sig mest miljögift? Förklara varför, och förklara varför miljögiftet inte försvinner på vägen genom näringskedjan på samma sätt som energin gör.",
      modelAnswer:
        "1 p: Anna riskerar mest, eftersom gäddan är en toppkonsument högt upp i näringskedjan. 1 p: Varje djur äter många byten och samlar på sig allt deras gift, så halten ökar för varje steg. 1 p: Energin förbrukas när djuren rör sig och håller värmen, men miljögiftet kan inte förbrännas eller kissas ut. Det lagras i fettet.",
    },
    {
      id: "biologi7-17",
      type: "open",
      points: 3,
      text: "Toppkonsumenter och område (3 p): Ett lodjur behöver ett mycket större område att leva i än en skogshare. Förklara varför toppkonsumenter behöver större områden än växtätare. Använd näringspyramiden och det du vet om hur mycket energi som går förlorad mellan nivåerna i en näringskedja.",
      modelAnswer:
        "1 p: Ungefär 90 % av energin går förlorad mellan varje nivå, eftersom djuren använder den till att röra sig och hålla värmen. 1 p: Därför finns det mycket mindre energi kvar högst upp i näringspyramiden, och det finns färre rovdjur än växtätare. 1 p: Lodjuret måste äta många harar för att få tillräckligt med energi, och hararna behöver i sin tur mycket växter. Det kräver ett stort område.",
    },
  ],
  // ── Prov Biologi åk 9 – Genetik, evolution och människokroppen (29 p) ──
  // Del A: 12 kryssfrågor (1 p, 0,5 p vid högst ett fel). Del B: skrivfrågor med provets poäng.
  biologi9: [
    // ── Del A ──
    {
      id: "biologi9-k1",
      type: "multi",
      halfCredit: true,
      text: "DNA, gener och kromosomer: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "En gen är en del av en DNA-molekyl som innehåller instruktioner för att tillverka ett visst protein.",
        B: "I DNA kan alla kvävebaser binda till varandra.",
        C: "En kromosom består av tätt packat DNA.",
        D: "En människas könsceller innehåller 46 kromosomer.",
        E: "En gen är uppbyggd av aminosyror.",
      },
      correct: ["A", "C"],
    },
    {
      id: "biologi9-k2",
      type: "multi",
      halfCredit: true,
      text: "Celldelning: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "Vid vanlig celldelning (mitos) får de två dottercellerna samma genetiska information som ursprungscellen.",
        B: "Reduktionsdelning (meios) sker när kroppen växer och när sår läker.",
        C: "Vid reduktionsdelning halveras antalet kromosomer.",
        D: "Innan en cell delar sig öppnas DNA-molekylen som ett blixtlås, och varje sträng används som mall för en ny sträng.",
        E: "En mutation i en hudcell förs vidare till personens barn.",
      },
      correct: ["A", "C", "D"],
    },
    {
      id: "biologi9-k3",
      type: "multi",
      halfCredit: true,
      text: "Dominanta och recessiva anlag: Brun ögonfärg (B) dominerar över blå (b). Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "En person med anlagen Bb har bruna ögon.",
        B: "Två blåögda föräldrar kan få ett brunögt barn.",
        C: "Två brunögda föräldrar kan få ett blåögt barn.",
        D: "En person med blå ögon har anlagen bb.",
        E: "Ett recessivt anlag syns alltid, även om personen bara har det i enkel uppsättning.",
      },
      correct: ["A", "C", "D"],
    },
    {
      id: "biologi9-k4",
      type: "multi",
      halfCredit: true,
      text: "Könsbundet arv: Kryssa i alla påståenden som stämmer om röd-grön färgblindhet.",
      opts: {
        A: "Anlaget för färgblindhet sitter på X-kromosomen.",
        B: "Färgblindhet är vanligare hos män, eftersom män bara har en X-kromosom.",
        C: "En kvinna som har anlaget på en av sina X-kromosomer är alltid färgblind.",
        D: "En son ärver alltid sin X-kromosom från sin pappa.",
        E: "En färgblind pappa för alltid över färgblindhet till sina söner.",
      },
      correct: ["A", "B"],
    },
    {
      id: "biologi9-k5",
      type: "multi",
      halfCredit: true,
      text: "Proteinsyntesen: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "En kopia av genen i form av RNA förs ut från cellkärnan till ribosomerna.",
        B: "Två kvävebaser i rad motsvarar en aminosyra.",
        C: "Proteiner tillverkas inne i mitokondrierna.",
        D: "Alla celler i kroppen tillverkar exakt samma proteiner hela tiden.",
        E: "Proteinets form avgör vilken uppgift det får i kroppen, till exempel som enzym eller hormon.",
      },
      correct: ["A", "E"],
    },
    {
      id: "biologi9-k6",
      type: "multi",
      halfCredit: true,
      text: "Genteknik och epigenetik: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "En GMO är en organism vars DNA har förändrats med genteknik.",
        B: "Bakterier kan med genteknik fås att tillverka mänskligt insulin.",
        C: "Epigenetik innebär att ordningen på kvävebaserna i DNA ändras.",
        D: "Livsstil som kost, rökning och stress kan påverka vilka gener som är påslagna.",
        E: "Enäggstvillingar har olika DNA.",
      },
      correct: ["A", "B", "D"],
    },
    {
      id: "biologi9-k7",
      type: "multi",
      halfCredit: true,
      text: "Evolutionens drivkrafter: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "Naturligt urval innebär att de individer som är bäst anpassade till miljön har störst chans att överleva och få ungar.",
        B: "En individ kan få nya egenskaper som går i arv genom att anstränga sig mycket.",
        C: "Genetisk variation uppstår genom mutationer och sexuell förökning.",
        D: "Evolutionen har ett mål och strävar mot mer komplicerade varelser.",
        E: "Sexuellt urval kan förklara egenskaper som inte hjälper individen att överleva, som påfågelns stora stjärt.",
      },
      correct: ["A", "C", "E"],
    },
    {
      id: "biologi9-k8",
      type: "multi",
      halfCredit: true,
      text: "Bevis för evolution och artbildning: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "Människans arm, valens fena och fågelns vinge har liknande skelett, vilket tyder på ett gemensamt ursprung.",
        B: "Ju mer lika två arters DNA är, desto närmare släkt är de.",
        C: "En ny art bildas oftast när två populationer av samma art lever tillsammans och parar sig med varandra.",
        D: "Svanskotan hos människan är en rest av en kroppsdel som hade en funktion hos våra förfäder.",
        E: "Yngre fossil ligger oftast djupare i marken än äldre fossil.",
      },
      correct: ["A", "B", "D"],
    },
    {
      id: "biologi9-k9",
      type: "multi",
      halfCredit: true,
      text: "Fotosyntes och cellandning: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "Fotosyntesen sker i kloroplasterna, och cellandningen sker i mitokondrierna.",
        B: "Växter har bara fotosyntes, inte cellandning.",
        C: "Ämnena som bildas vid fotosyntesen används vid cellandningen, och tvärtom.",
        D: "Vid cellandningen omvandlas solenergi direkt till rörelseenergi.",
        E: "Djur hade inte kunnat finnas på jorden innan det fanns organismer med fotosyntes.",
      },
      correct: ["A", "C", "E"],
    },
    {
      id: "biologi9-k10",
      type: "multi",
      halfCredit: true,
      text: "Människokroppens organsystem: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "Flera liknande celler som samarbetar bildar en vävnad, och flera vävnader kan bilda ett organ.",
        B: "De röda blodkropparna transporterar syre till kroppens celler.",
        C: "Gasutbytet mellan luft och blod sker i lungblåsorna.",
        D: "Hjärtmuskeln styrs med viljan, precis som skelettmusklerna.",
        E: "Näringsämnena från maten tas främst upp i tjocktarmen.",
      },
      correct: ["A", "B", "C"],
    },
    {
      id: "biologi9-k11",
      type: "multi",
      halfCredit: true,
      text: "Näringspyramiden: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "Ungefär 90 % av energin går förlorad mellan varje nivå i näringspyramiden.",
        B: "Energin går främst förlorad som värme och rörelse.",
        C: "Det finns oftast fler toppkonsumenter än växtätare i ett ekosystem.",
        D: "Det krävs mycket växter för att försörja ett litet antal rovdjur.",
        E: "Toppkonsumenterna får mest energi av alla nivåer i näringspyramiden.",
      },
      correct: ["A", "B", "D"],
    },
    {
      id: "biologi9-k12",
      type: "multi",
      halfCredit: true,
      text: "Miljögifter och bioackumulering: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "Stabila miljögifter bryts inte ner, utan lagras i djurens fettvävnad.",
        B: "Halten av miljögifter är högst hos producenterna.",
        C: "Toppkonsumenter får högst halt, eftersom de äter många byten som redan innehåller gift.",
        D: "Miljögifter försvinner som värme mellan nivåerna i näringskedjan, precis som energi.",
        E: "Människor som ofta äter rovfisk kan få i sig mer miljögifter än människor som mest äter växter.",
      },
      correct: ["A", "C", "E"],
    },
    // ── Del B ──
    {
      id: "biologi9-13a",
      type: "open",
      points: 2,
      text: "Genetik – albinism (2 p): Albinism innebär att kroppen inte kan tillverka färgpigment, så att hud, hår och ögon blir mycket ljusa. Anlaget för albinism (a) är recessivt, och anlaget för normalt pigment (A) är dominant. Emma och Jonas har båda normalt pigment. De får en son som har albinism. Vilka anlag måste Emma och Jonas ha? Förklara hur du vet det.",
      modelAnswer:
        "1 p: Båda är Aa (bärare). 1 p: Förklaringen: de har normalt pigment, så de har minst ett A. Sonen är aa och har fått ett a från var och en av dem, så båda måste bära på a.",
    },
    {
      id: "biologi9-13b",
      type: "open",
      points: 2,
      text: "Genetik – albinism (2 p): Albinism innebär att kroppen inte kan tillverka färgpigment, så att hud, hår och ögon blir mycket ljusa. Anlaget för albinism (a) är recessivt, och anlaget för normalt pigment (A) är dominant. Emma och Jonas har båda normalt pigment. De får en son som har albinism. Beskriv i text hur ett korsningsschema för deras barn ser ut och hur stor sannolikheten är att deras nästa barn också får albinism.",
      modelAnswer:
        "1 p: Korsningsschema Aa × Aa med utfallen AA, Aa, Aa och aa. 1 p: Sannolikheten för albinism är 1 av 4, alltså 25 %, vid varje graviditet. (Anpassad för appen: originalet ber eleven rita korsningsschemat.)",
    },
    {
      id: "biologi9-13c",
      type: "open",
      points: 1,
      text: "Genetik – albinism (1 p): Albinism innebär att kroppen inte kan tillverka färgpigment, så att hud, hår och ögon blir mycket ljusa. Anlaget för albinism (a) är recessivt, och anlaget för normalt pigment (A) är dominant. Emma och Jonas har båda normalt pigment. De får en son som har albinism. Emma och Jonas får också en dotter som har normalt pigment. Vilka anlag kan hon ha? Hur stor är sannolikheten för vart och ett av alternativen?",
      modelAnswer:
        "1 p: Dottern kan vara AA eller Aa. Bland barnen utan albinism är sannolikheten 1 av 3 för AA och 2 av 3 för Aa (bärare). Godta även svaret 25 % AA och 50 % Aa, räknat på alla fyra rutorna i korsningsschemat, om eleven förklarar det.",
    },
    {
      id: "biologi9-14",
      type: "open",
      points: 3,
      text: "Evolution – antibiotikaresistens (3 p): När antibiotika används mycket, till exempel när det skrivs ut i onödan eller ges till friska djur, blir allt fler bakterier resistenta. Det betyder att antibiotikan inte längre dödar dem. Förklara med hjälp av evolutionsteorin hur en bakteriepopulation kan bli resistent. Använd begreppen mutation, variation, naturligt urval och arv.",
      modelAnswer:
        "1 p: Det finns variation mellan bakterierna. Genom slumpmässiga mutationer får några få bakterier en egenskap som gör dem motståndskraftiga mot antibiotikan. 1 p: När antibiotika används dör de känsliga bakterierna, medan de resistenta överlever. Det är naturligt urval. 1 p: De resistenta bakterierna förökar sig och för anlaget vidare till sina avkommor (arv). Ju mer antibiotika som används, desto större andel av populationen blir resistent. Svar som säger att bakterierna \"vänjer sig\" eller \"lär sig tåla\" antibiotikan ger inte poäng. Det är samma missförstånd som Lamarcks giraff.",
    },
    {
      id: "biologi9-15a",
      type: "open",
      points: 2,
      text: "Organsystemens samarbete vid muskelarbete (2 p): I labben om muskelarbete mätte tre elever sin puls och hur länge det tog för BTB-lösningen att byta färg när de blåste i den. BTB byter färg från blå till grön/gul när det kommer koldioxid i lösningen. Resultat – i vila: puls 70, 72 och 94 slag/min, tid för färgbyte 16, 11 och 9 s (elev 1, 2, 3). Efter dynamiskt arbete (springa i trappan): puls 128, 180 och 151 slag/min, tid för färgbyte 13, 7 och 8 s. Förklara varför pulsen och mängden koldioxid i utandningsluften ökar vid muskelarbete. Koppla din förklaring till cellandningen.",
      modelAnswer:
        "1 p: Musklerna behöver mer energi vid arbete och får den genom cellandning i muskelcellernas mitokondrier: druvsocker + syre → koldioxid + vatten + energi. Mer cellandning ger större behov av syre och mer koldioxid. 1 p: Hjärtat slår snabbare så att blodet hinner transportera mer syre och druvsocker till musklerna och föra bort mer koldioxid till lungorna, där den andas ut.",
    },
    {
      id: "biologi9-15b",
      type: "open",
      points: 3,
      text: "Organsystemens samarbete vid muskelarbete (3 p): Beskriv hur minst fyra av kroppens organsystem samarbetar när musklerna arbetar. Berätta vad varje organsystem gör. Följ sedan vägen för syre och druvsocker fram till muskelcellerna, och vägen för koldioxiden ut ur kroppen.",
      modelAnswer:
        "1 p: Eleven beskriver minst fyra organsystem med korrekt uppgift, till exempel: Rörelseorganen: skelettmusklerna drar ihop sig och rör skelettet i lederna. Nervsystemet: hjärnan skickar signaler till musklerna och ökar puls och andning, utan att vi behöver tänka på det. Andningsorganen: vi andas snabbare och djupare, så att mer syre tas upp och mer koldioxid vädras ut i lungblåsorna. Blodomloppet: hjärtat pumpar blodet, och de röda blodkropparna transporterar syre till muskelcellerna. Matspjälkningsorganen: bryter ner maten till druvsocker, som är bränslet i cellandningen. Levern lagrar socker. Huden: svettas och vidgar blodkärlen så att kroppen kyls ner, eftersom muskelarbetet ger värme. 1 p: Vägen för syre och druvsocker: syre tas upp i lungblåsorna och druvsocker i tunntarmen, och blodet transporterar båda till muskelcellerna där de används i cellandningen. 1 p: Vägen för koldioxiden: den bildas i muskelcellerna, förs med blodet tillbaka till lungorna och andas ut.",
    },
    {
      id: "biologi9-16a",
      type: "open",
      points: 1,
      text: "Näringspyramid och bioackumulering (1 p): I Östersjön finns en näringskedja: växtplankton → djurplankton → strömming → gråsäl. På 1970-talet hade sälarna så höga halter av miljögiftet PCB att många honor inte kunde få ungar, trots att halten i vattnet var mycket låg. Förklara med hjälp av näringspyramiden varför det finns mycket färre sälar än strömmingar i Östersjön.",
      modelAnswer:
        "1 p: Ungefär 90 % av energin går förlorad mellan varje nivå, främst som värme och rörelse. Högst upp finns så lite energi kvar att den bara räcker till få sälar, och varje säl måste äta många strömmingar.",
    },
    {
      id: "biologi9-16b",
      type: "open",
      points: 2,
      text: "Näringspyramid och bioackumulering (2 p): I Östersjön finns en näringskedja: växtplankton → djurplankton → strömming → gråsäl. På 1970-talet hade sälarna så höga halter av miljögiftet PCB att många honor inte kunde få ungar, trots att halten i vattnet var mycket låg. Förklara varför sälarna hade så mycket högre halt av PCB än vattnet och planktonen.",
      modelAnswer:
        "1 p: PCB är ett stabilt miljögift som inte bryts ner eller utsöndras, utan lagras i fettvävnaden. 1 p: Varje djur äter många byten och samlar på sig allt gift som de innehöll. Halten ökar för varje steg i näringskedjan (anrikning/bioackumulering), så sälen som toppkonsument får högst halt.",
    },
    {
      id: "biologi9-16c",
      type: "open",
      points: 1,
      text: "Näringspyramid och bioackumulering (1 p): Jämför hur energi och miljögifter förflyttas genom näringskedjan. Vad är skillnaden, och varför?",
      modelAnswer:
        "1 p: Energin minskar för varje steg, eftersom den används och försvinner som värme. Miljögiftet försvinner inte utan stannar kvar i kroppen, så det koncentreras i stället. Energin minskar uppåt medan halten gift ökar uppåt.",
    },
  ],

  // Övningsprov åk 8.
  // Del A: 12 kryssfrågor (type "multi") – kryssa i ALLA rätta påståenden. 1 p per fråga om alla
  //        påståenden bedöms rätt. "correct" = lista med rätta bokstäver, "expl" = "Varför" ur facit.
  // Del B: skrivfrågor (type "open") med provets poäng i "points". modelAnswer innehåller facit
  //        inklusive poängsättning, som AI-bedömningen utgår från.
  biologi8: [
    // ══ DEL A – KRYSSFRÅGOR ═══════════════════════════════════════
    {
      id: "biologi8-k1",
      type: "multi",
      text: "Cellen: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "Cellmembranet finns bara i växtceller.",
        B: "Mitokondrierna är cellens kraftverk, där cellandningen sker.",
        C: "Allt liv är uppbyggt av celler.",
        D: "Vid cellandningen bildas syre och socker.",
        E: "Växtceller har kloroplaster, där fotosyntesen sker.",
      },
      correct: ["B", "C", "E"],
      expl:
        "Varför: Alla celler har cellmembran. Vid cellandningen förbrukas socker och syre, och det bildas " +
        "energi, koldioxid och vatten.",
    },
    {
      id: "biologi8-k2",
      type: "multi",
      text: "Skelett, muskler och hud: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "Skelettet skyddar inre organ, till exempel skyddar skallen hjärnan.",
        B: "Glatt muskulatur finns främst i armar och ben.",
        C: "Huden är kroppens största organ.",
        D: "Vi svettas för att värma upp kroppen.",
        E: "Skelettet består av döda celler utan blodkärl.",
      },
      correct: ["A", "C"],
      expl:
        "Varför: Glatt muskulatur finns i till exempel tarmar och blodkärl. Svett kyler kroppen. Skelettet är " +
        "levande och bildar blodkroppar i benmärgen.",
    },
    {
      id: "biologi8-k3",
      type: "multi",
      text: "Andning: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "Luften går genom luftstrupen direkt in i hjärtat.",
        B: "Lungblåsorna är omgivna av tunna blodkärl som kallas kapillärer.",
        C: "Syre och koldioxid transporteras i blodet av blodplättarna.",
        D: "När vi andas ut lämnar koldioxid kroppen.",
        E: "Andningens viktigaste uppgift är att ge cellerna socker.",
      },
      correct: ["B", "D"],
      expl:
        "Varför: Luften går till lungorna. Syre transporteras av de röda blodkropparna. Andningen ger cellerna " +
        "syre och för bort koldioxid.",
    },
    {
      id: "biologi8-k4",
      type: "multi",
      text: "Blodomloppet: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "Hjärtat pumpar runt ungefär 5 liter blod i kroppen.",
        B: "Kapillärerna är kroppens största blodkärl.",
        C: "Det lilla kretsloppet går mellan hjärtat och lungorna.",
        D: "I det stora kretsloppet transporterar blodet syre, näring och hormoner ut till kroppens celler.",
        E: "Hjärtat är en enkel pump med bara ett kretslopp.",
      },
      correct: ["A", "C", "D"],
      expl: "Varför: Kapillärerna är de minsta blodkärlen. Hjärtat är en dubbelpump med två kretslopp.",
    },
    {
      id: "biologi8-k5",
      type: "multi",
      text: "Blod och blodgrupper: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "De vita blodkropparna ingår i immunförsvaret.",
        B: "Blodplasman består mest av röda blodkroppar.",
        C: "De röda blodkropparna hjälper till när ett sår ska läka.",
        D: "En person som är Rh− har Rh-proteinet på sina röda blodkroppar.",
        E: "Blodgrupp AB har både A- och B-proteiner på de röda blodkropparna.",
      },
      correct: ["A", "E"],
      expl:
        "Varför: Blodplasman består mest av vatten. Det är blodplättarna som hjälper vid sårläkning. Rh− betyder " +
        "att man saknar proteinet.",
    },
    {
      id: "biologi8-k6",
      type: "multi",
      text: "Bakterier, virus och kroppens försvar: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "Bakterier är encelliga organismer, och de flesta är ofarliga eller till och med nyttiga.",
        B: "Alla bakterier orsakar sjukdomar.",
        C: "Virus kan föröka sig på egen hand, utan att ta över en levande cell.",
        D: "Vaccination fungerar genom att döda alla bakterier i kroppen.",
        E: "Flimmerhår och slemhinnor hör till kroppens inre försvar.",
      },
      correct: ["A"],
      expl:
        "Varför: De flesta bakterier är ofarliga. Virus måste ta över en cell för att föröka sig. Vaccin lär " +
        "immunförsvaret att känna igen ett smittämne. Flimmerhår och slemhinnor är en del av det yttre försvaret.",
    },
    {
      id: "biologi8-k7",
      type: "multi",
      text: "Njurar, lever och lymfsystem: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "Lymfsystemet tar upp överskottsvätska från vävnaderna och för tillbaka den till blodet.",
        B: "Urinen samlas i urinblåsan innan den lämnar kroppen.",
        C: "Levern tillverkar urin.",
        D: "Njurarna tillverkar galla som finfördelar fettet i maten.",
        E: "I lymfkörtlarna renas lymfan av vita blodkroppar.",
      },
      correct: ["A", "B", "E"],
      expl: "Varför: Det är njurarna som bildar urin, och det är levern som tillverkar galla.",
    },
    {
      id: "biologi8-k8",
      type: "multi",
      text: "Nervsystemet och hormonsystemet: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "Storhjärnan tolkar sinnesintryck och styr de rörelser vi gör med viljan.",
        B: "Hypotalamus reglerar hunger och törst och styr hormonsystemet via hypofysen.",
        C: "Ryggmärgen ingår inte i nervsystemet.",
        D: "Hormoner skickas som elektriska signaler genom nerverna.",
        E: "Hjärnstammen kontrollerar balansen och samordnar rörelserna.",
      },
      correct: ["A", "B"],
      expl:
        "Varför: Nervsystemet består av hjärnan, ryggmärgen och nerverna. Hormoner sprids med blodet. Det är " +
        "lillhjärnan som styr balansen.",
    },
    {
      id: "biologi8-k9",
      type: "multi",
      text: "Sinnen och droger: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "Alkohol förstärker hjärnans signaler, så att man reagerar snabbare.",
        B: "Smaksinnet kan bara registrera fem grundsmaker: sött, salt, surt, beskt och umami.",
        C: "Luktsinnet tröttnar aldrig, så man känner alltid lukten i sitt eget hem lika starkt.",
        D: "Abstinens innebär att man mår dåligt, till exempel blir ångestfylld eller fysiskt sjuk, när drogen går ur kroppen.",
        E: "Stavarna i ögats näthinna gör att vi ser färger.",
      },
      correct: ["B", "D"],
      expl:
        "Varför: Alkohol bedövar nervsystemet. Luktsinnet tröttnar (adaptation). Det är tapparna som ser färger, " +
        "stavarna ser ljus och svartvitt.",
    },
    {
      id: "biologi8-k10",
      type: "multi",
      text: "Pubertet och fortplantning: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "Vid IVF (konstgjord befruktning) befruktas ägget av spermier i en odlingsskål.",
        B: "Enäggstvillingar bildas av två olika ägg som befruktas samtidigt.",
        C: "Könshormonerna testosteron och östrogen sätter igång kroppens förändringar i puberteten.",
        D: "En graviditet varar ungefär 20 veckor.",
        E: "När en spermie har trängt in i ägget ändras äggets yta, så att inga fler spermier kommer in.",
      },
      correct: ["A", "C", "E"],
      expl:
        "Varför: Enäggstvillingar bildas av ett ägg som delar sig. Två ägg ger tvåäggstvillingar. En graviditet " +
        "varar ungefär 40 veckor.",
    },
    {
      id: "biologi8-k11",
      type: "multi",
      text: "Preventivmedel och könssjukdomar: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "Spiral och p-stav skyddar inte mot könssjukdomar.",
        B: "Hiv kan botas med antibiotika.",
        C: "Klamydia orsakas av bakterier och kan botas med antibiotika.",
        D: "Att bara ha sex under ”säkra perioder” i menscykeln är en säker metod för att undvika graviditet.",
        E: "Kondom skyddar inte mot könssjukdomar vid oralsex.",
      },
      correct: ["A", "C"],
      expl:
        "Varför: Hiv är ett virus, och antibiotika hjälper inte mot virus. Spermier kan leva flera dygn, så " +
        "”säkra perioder” är en mycket osäker metod. Kondom skyddar vid vaginala, anala och orala samlag.",
    },
    {
      id: "biologi8-k12",
      type: "multi",
      text: "Relationer, identitet och samtycke: Kryssa i alla påståenden som är rätta.",
      opts: {
        A: "Om man har varit tillsammans länge behöver man inte bry sig om samtycke.",
        B: "Samtycke betyder att båda vill och visar det.",
        C: "Om någon är så full att hen inte kan svara räknas det som ett ja.",
        D: "Att kontrollera sin partners mobil och bestämma vem hen får träffa är tecken på en relation som inte är bra.",
        E: "Könsidentitet handlar om ens inre upplevelse av vilket kön man har.",
      },
      correct: ["B", "D", "E"],
      expl:
        "Varför: Samtycke gäller alltid, även i långa relationer. Den som inte kan svara kan inte samtycka, och " +
        "tystnad eller passivitet är aldrig ett ja.",
    },

    // ══ DEL B – SKRIVFRÅGOR ═══════════════════════════════════════
    // ── 13. Blodet och blodomloppet (5 p) ──────────────────────────
    {
      id: "biologi8-13a",
      type: "open",
      points: 2,
      text:
        "Blodet består av fyra delar. Nämn dem och beskriv vad var och en gör. (2 p)",
      modelAnswer:
        "Blodplasma: en vätska som mest består av vatten och transporterar näring och andra ämnen. " +
        "Röda blodkroppar: transporterar syre. Vita blodkroppar: bekämpar bakterier och virus. " +
        "Blodplättar: hjälper till vid sårläkning. " +
        "Poängsättning: 1 p om två delar är rätt nämnda och beskrivna, 2 p om alla fyra delar är rätt nämnda och beskrivna.",
    },
    {
      id: "biologi8-13b",
      type: "open",
      points: 2,
      text:
        "Beskriv blodets väg i det lilla och det stora kretsloppet. Berätta vad som händer med blodet i lungorna och i kapillärerna ute i kroppen. (2 p)",
      modelAnswer:
        "1 p – lilla kretsloppet: hjärtat pumpar blodet till lungorna, där blodet tar upp syre och lämnar koldioxid, " +
        "och blodet går sedan tillbaka till hjärtat. " +
        "1 p – stora kretsloppet: hjärtat pumpar ut det syrerika blodet i artärerna till kroppen. I kapillärerna " +
        "lämnar syre och näring blodet och går till cellerna, och koldioxid och avfall tas upp. Blodet går tillbaka " +
        "till hjärtat i venerna.",
    },
    {
      id: "biologi8-13c",
      type: "open",
      points: 1,
      text:
        "Lisa har blodgrupp A och har förlorat mycket blod i en olycka. Förklara varför hon inte kan få blod från vem som helst. (1 p)",
      modelAnswer:
        "Blodgruppen avgörs av proteiner på de röda blodkropparna. Om Lisa får blod som inte passar ihop med hennes " +
        "blodgrupp kan kroppen reagera mot blodet, och det kan vara livsfarligt. Givarens och mottagarens " +
        "blodgrupper måste passa ihop.",
    },

    // ── 14. Vaccination och antibiotika (4 p) ──────────────────────
    {
      id: "biologi8-14a",
      type: "open",
      points: 1,
      text: "Förklara skillnaden mellan bakterier och virus. (1 p)",
      modelAnswer:
        "Bakterier är encelliga levande organismer. Virus räknas inte som levande, eftersom de måste ta över en " +
        "levande cell för att föröka sig. Antibiotika hjälper mot bakterier men inte mot virus.",
    },
    {
      id: "biologi8-14b",
      type: "open",
      points: 2,
      text:
        "Förklara hur en vaccination gör att man blir immun mot en sjukdom. Använd begreppen smittämne, B-celler, antikroppar och minne. (2 p)",
      modelAnswer:
        "1 p: Vid vaccination sprutas en liten mängd av ett smittämne in i kroppen. Immunförsvaret lär sig känna " +
        "igen det, och B-cellerna börjar tillverka antikroppar. " +
        "1 p: Kroppen skapar ett minne (med hjälp av T- och B-celler). Om man senare möter det riktiga smittämnet är " +
        "försvaret redo direkt, och man blir inte sjuk. Då är man immun.",
    },
    {
      id: "biologi8-14c",
      type: "open",
      points: 1,
      text: "Ge två orsaker till att allt fler bakterier blir resistenta mot antibiotika. (1 p)",
      modelAnswer:
        "Två av följande: antibiotika skrivs ut i onödan, till exempel mot virusinfektioner; djur får antibiotika i " +
        "fodret för att växa snabbare; fabriker som tillverkar antibiotika släpper ut rester i naturen. " +
        "För 1 p ska två orsaker vara rätt angivna.",
    },

    // ── 15. Pubertet och graviditet (4 p) ──────────────────────────
    {
      id: "biologi8-15a",
      type: "open",
      points: 1,
      text:
        "Vad startar puberteten, och vilka hormoner gör att kroppen förändras? (1 p)",
      modelAnswer:
        "Puberteten startar med hormoner från hypofysen. De gör att könshormonerna testosteron och östrogen börjar " +
        "bildas, och de sätter igång kroppens förändringar.",
    },
    {
      id: "biologi8-15b",
      type: "open",
      points: 1,
      text: "Beskriv spermiernas väg efter ett samlag och var befruktningen sker. (1 p)",
      modelAnswer:
        "Spermierna simmar från slidan, genom livmodern och upp i äggledarna. Befruktningen sker i äggledaren, där " +
        "en spermie kan möta ett moget ägg.",
    },
    {
      id: "biologi8-15c",
      type: "open",
      points: 2,
      text:
        "Beskriv hur fostret får näring och skydd under graviditeten. Använd begreppen moderkaka, navelsträng och fostervatten. (2 p)",
      modelAnswer:
        "1 p: Fostret får näring och syre från moderkakan via navelsträngen. " +
        "1 p: Fostret svävar i fostervatten innanför fosterhinnorna, som skyddar det.",
    },

    // ── 16. Droger, relationer och samtycke (4 p) ──────────────────
    {
      id: "biologi8-16a",
      type: "open",
      points: 1,
      text:
        "Sam och Robin träffas på en fest. Robin har druckit mycket alkohol. Förklara hur alkohol påverkar nervsystemet och omdömet. (1 p)",
      modelAnswer:
        "Alkohol bedövar nervsystemet genom att förstärka bromsande signaler. Omdömet och minnet blir sämre, och " +
        "risken för olyckor ökar.",
    },
    {
      id: "biologi8-16b",
      type: "open",
      points: 1,
      text:
        "Sam och Robin träffas på en fest och Robin har druckit mycket alkohol. Sam vill ha sex med Robin. Förklara med hjälp av samtyckeslagen varför Sam inte kan anta att Robin samtycker. (1 p)",
      modelAnswer:
        "Enligt samtyckeslagen ska sex vara frivilligt, och båda måste vilja och visa det. Den som är kraftigt " +
        "berusad kan inte ge ett riktigt samtycke, och tystnad eller passivitet är inte ett ja.",
    },
    {
      id: "biologi8-16c",
      type: "open",
      points: 1,
      text:
        "En person på en fest har haft sex utan kondom med en ny partner, men har inga symtom. Förklara varför hen ändå bör testa sig, och vad smittskyddslagen säger. (1 p)",
      modelAnswer:
        "Många könssjukdomar ger inga symtom, så man kan vara smittad och sprida smittan utan att veta om det. " +
        "Enligt smittskyddslagen måste man testa sig vid misstanke om smitta, och vården kontaktar dem man haft sex " +
        "med så att smittspridningen stoppas.",
    },
    {
      id: "biologi8-16d",
      type: "open",
      points: 1,
      text: "Ge två exempel på vad som kännetecknar en bra relation. (1 p)",
      modelAnswer:
        "Två exempel, till exempel: man respekterar varandra, man litar på varandra, man kan säga vad man tycker " +
        "och känner, ingen kontrollerar eller pressar den andra.",
    },
  ],
};

// ── Läxförhör Människokroppen åk 8 ─────────────────────────────────
// De åtta delområdena ovan (cellen … matspjälkning) slås ihop till ETT läxförhör
// med nyckeln "manniska8", som är det som kortet i index.html använder.
// Delområdena ligger kvar som separata listor ovan för överskådlighetens skull
// men tas bort som egna nycklar här, så de inte dyker upp som egna läxförhör.
const MANNISKA8_DELOMRADEN = [
  "cellen", "skelett", "hud", "andning",
  "blodlopp", "blod", "forsvar", "matspjalk",
];
LAX_DATA.manniska8 = MANNISKA8_DELOMRADEN.flatMap(k => LAX_DATA[k]);
MANNISKA8_DELOMRADEN.forEach(k => { delete LAX_DATA[k]; });
