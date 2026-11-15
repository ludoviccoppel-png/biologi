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
    {
      // ANPASSAD: originalet ber eleven rita elektronkonfiguration (uppgift U2). Det går inte att rita i
      // appen, så frågan är omformulerad till text. Facit nedan är skrivet av Claude, inte hämtat ur ditt underlag.
      id: "periodiska9-2c",
      type: "open",
      text:
        "Ange elektronkonfigurationen (antal elektroner i skalen K, L och M) för kol (atomnummer 6), " +
        "syre (atomnummer 8) och natrium (atomnummer 11).",
      modelAnswer:
        "Kol: 2 elektroner i K-skalet och 4 i L-skalet (2, 4). Syre: 2 i K och 6 i L (2, 6). " +
        "Natrium: 2 i K, 8 i L och 1 i M (2, 8, 1). Elektronerna fyller skalen inifrån och ut: K rymmer högst 2 " +
        "och L högst 8.",
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
    {
      // ANPASSAD: originalet ber eleven rita (CH4, H2O eller H2). Det går inte i appen, så eleven ska förklara i text.
      id: "periodiska9-4b",
      type: "open",
      text: "Hur fungerar en molekylbindning? Förklara med hjälp av något av exemplen CH4, H2O eller H2.",
      modelAnswer: "Atomer delar på elektronpar så att båda atomerna får fulla skal.",
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
  // Biologi åk 7 och åk 9: inga frågor inlagda ännu. Korten i index.html visar
  // "Kommer snart" tills listan fylls på (samma frågeformat som biologi8 nedan).
  biologi7: [],
  biologi9: [],

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
