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
};
