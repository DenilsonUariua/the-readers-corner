import type { Article } from './mockApi';

export const TOPICS = [
  { id: 'politik', name: 'Politik' },
  { id: 'wirtschaft', name: 'Wirtschaft' },
  { id: 'feuilleton', name: 'Feuilleton' },
  { id: 'sport', name: 'Sport' },
  { id: 'wissenschaft', name: 'Wissenschaft' },
  { id: 'meinung', name: 'Meinung' },
  { id: 'international', name: 'International' },
  { id: 'zuerich', name: 'Zürich' },
] as const;

const AUTHORS = [
  'Anna Müller',
  'Thomas Schmidt',
  'Maria Weber',
  'Stefan Brunner',
  'Lisa Keller',
  'Michael Hoffmann',
  'Sandra Fischer',
  'Peter Zimmermann',
];

const IMAGES = [
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=450&fit=crop',
  'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&h=450&fit=crop',
  'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&h=450&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
  'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&h=450&fit=crop',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=450&fit=crop',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=450&fit=crop',
  null,
];

function generateBody(): string {
  const paragraphs = [
    'Die Entwicklung der vergangenen Monate hat gezeigt, dass sich die Situation grundlegend verändert hat. Experten sind sich einig, dass dies weitreichende Konsequenzen haben wird.',
    'In Gesprächen mit verschiedenen Akteuren wurde deutlich, dass die Herausforderungen vielfältig sind. Die unterschiedlichen Perspektiven zeigen, wie komplex die Thematik tatsächlich ist.',
    'Historisch betrachtet ist dies keine neue Entwicklung. Bereits in der Vergangenheit gab es ähnliche Situationen, die jedoch anders gelöst wurden.',
    'Die wirtschaftlichen Auswirkungen sind noch nicht vollständig absehbar. Analysten gehen davon aus, dass sich die Effekte über mehrere Jahre erstrecken werden.',
    'Kritiker bemängeln, dass die bisherigen Massnahmen nicht ausreichend sind. Sie fordern ein entschlosseneres Vorgehen und mehr Transparenz.',
    'Befürworter hingegen sehen die positive Entwicklung und betonen die bereits erzielten Fortschritte. Die Debatte wird kontrovers geführt.',
    'Internationale Beobachter verfolgen die Situation mit grossem Interesse. Die Entscheidungen hier könnten Signalwirkung für andere Länder haben.',
    'Die Zukunft wird zeigen, welcher Ansatz sich durchsetzen wird. Eines ist jedoch klar: Die Weichen werden jetzt gestellt.',
  ];
  
  const count = 4 + Math.floor(Math.random() * 4);
  const shuffled = [...paragraphs].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).join('\n\n');
}

function randomDate(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  date.setHours(Math.floor(Math.random() * 24));
  date.setMinutes(Math.floor(Math.random() * 60));
  return date.toISOString();
}

function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickRandomTopics(): { id: string; name: string }[] {
  const count = 1 + Math.floor(Math.random() * 3);
  const shuffled = [...TOPICS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(t => ({ id: t.id, name: t.name }));
}

const ARTICLE_DATA: { title: string; lead: string; topicId: string }[] = [
  // Politik
  { topicId: 'politik', title: 'Bundesrat verabschiedet neue Richtlinien zur Digitalisierung', lead: 'Die Landesregierung hat weitreichende Massnahmen beschlossen, um die Verwaltung zu modernisieren.' },
  { topicId: 'politik', title: 'Parlamentsdebatte über Rentenreform wird hitzig', lead: 'Die Fraktionen streiten über die Zukunft der Altersvorsorge. Eine Einigung scheint in weiter Ferne.' },
  { topicId: 'politik', title: 'Neue Umfrage zeigt Unzufriedenheit mit politischer Führung', lead: 'Nur noch 34 Prozent der Befragten vertrauen der aktuellen Regierung.' },
  { topicId: 'politik', title: 'Koalitionsverhandlungen stecken fest', lead: 'Nach wochenlangen Gesprächen zeichnet sich noch keine Lösung ab.' },
  { topicId: 'politik', title: 'Abstimmung über Klimagesetz findet breite Unterstützung', lead: 'Überraschend deutliche Mehrheit spricht sich für strengere Umweltauflagen aus.' },
  { topicId: 'politik', title: 'Minister tritt nach Skandal zurück', lead: 'Die Affäre um Interessenkonflikte hat nun personelle Konsequenzen.' },
  { topicId: 'politik', title: 'Gemeindewahlen bringen überraschende Ergebnisse', lead: 'Kleinere Parteien gewinnen deutlich an Boden.' },
  
  // Wirtschaft
  { topicId: 'wirtschaft', title: 'Schweizer Franken erreicht neues Jahreshoch', lead: 'Die Nationalbank beobachtet die Entwicklung genau und erwägt Interventionen.' },
  { topicId: 'wirtschaft', title: 'Tech-Konzern kündigt Entlassungen an', lead: 'Tausende Stellen sollen weltweit gestrichen werden, auch Zürich ist betroffen.' },
  { topicId: 'wirtschaft', title: 'Inflation sinkt stärker als erwartet', lead: 'Experten sehen erste Anzeichen für wirtschaftliche Entspannung.' },
  { topicId: 'wirtschaft', title: 'Startup-Szene boomt trotz schwieriger Finanzierungslage', lead: 'Innovative Unternehmen finden kreative Wege zur Kapitalbeschaffung.' },
  { topicId: 'wirtschaft', title: 'Grossbank meldet Rekordgewinn', lead: 'Die Zahlen übertreffen die Erwartungen der Analysten deutlich.' },
  { topicId: 'wirtschaft', title: 'Handelsabkommen mit Asien nimmt Gestalt an', lead: 'Nach Jahren der Verhandlungen steht der Durchbruch bevor.' },
  { topicId: 'wirtschaft', title: 'Immobilienpreise stabilisieren sich', lead: 'Nach dem starken Anstieg der letzten Jahre zeichnet sich eine Normalisierung ab.' },
  { topicId: 'wirtschaft', title: 'Energiekosten belasten Industrieunternehmen', lead: 'Viele Betriebe kämpfen mit stark gestiegenen Produktionskosten.' },
  
  // Feuilleton
  { topicId: 'feuilleton', title: 'Neue Ausstellung im Kunsthaus begeistert Kritiker', lead: 'Die Retrospektive zeigt Werke aus fünf Jahrzehnten Schaffenszeit.' },
  { topicId: 'feuilleton', title: 'Debütroman gewinnt wichtigen Literaturpreis', lead: 'Die junge Autorin überzeugte die Jury mit ihrer ungewöhnlichen Erzählweise.' },
  { topicId: 'feuilleton', title: 'Opernhaus präsentiert umstrittene Neuinszenierung', lead: 'Die moderne Interpretation spaltet das Publikum.' },
  { topicId: 'feuilleton', title: 'Filmfestival ehrt Lebenswerk von Regisseur', lead: 'Der Schweizer Filmemacher erhält die höchste Auszeichnung.' },
  { topicId: 'feuilleton', title: 'Architekturbiennale setzt auf Nachhaltigkeit', lead: 'Die diesjährige Ausgabe widmet sich dem ökologischen Bauen.' },
  { topicId: 'feuilleton', title: 'Theatergruppe feiert Premiere mit Standing Ovations', lead: 'Das experimentelle Stück begeistert das Publikum.' },
  { topicId: 'feuilleton', title: 'Museum digitalisiert seine gesamte Sammlung', lead: 'Ab sofort sind über 50000 Kunstwerke online zugänglich.' },
  
  // Sport
  { topicId: 'sport', title: 'Schweizer Ski-Team triumphiert in Kitzbühel', lead: 'Doppelsieg auf der legendären Streif sorgt für Begeisterung.' },
  { topicId: 'sport', title: 'FC Zürich gewinnt dramatisches Derby', lead: 'In der Nachspielzeit fällt das entscheidende Tor.' },
  { topicId: 'sport', title: 'Tennis-Star gibt Comeback bekannt', lead: 'Nach langer Verletzungspause kehrt der Publikumsliebling zurück.' },
  { topicId: 'sport', title: 'Olympia-Bewerbung nimmt erste Hürde', lead: 'Das Organisationskomitee zeigt sich zuversichtlich.' },
  { topicId: 'sport', title: 'Eishockey-Nationalteam qualifiziert sich für WM', lead: 'Der wichtige Sieg sichert die Teilnahme am Turnier.' },
  { topicId: 'sport', title: 'Marathonläufer bricht Landesrekord', lead: 'Die neue Bestmarke liegt nun unter 2:06 Stunden.' },
  { topicId: 'sport', title: 'Nachwuchsförderung zeigt erste Erfolge', lead: 'Immer mehr junge Talente schaffen den Sprung in den Profisport.' },
  { topicId: 'sport', title: 'Trainer wechselt überraschend den Verein', lead: 'Die Entscheidung sorgt für Aufruhr in der Liga.' },
  
  // Wissenschaft
  { topicId: 'wissenschaft', title: 'ETH-Forscher entwickeln revolutionäre Batterietechnologie', lead: 'Die neue Methode könnte die Reichweite von Elektroautos verdoppeln.' },
  { topicId: 'wissenschaft', title: 'Durchbruch in der Krebsforschung', lead: 'Schweizer Team entdeckt vielversprechenden Therapieansatz.' },
  { topicId: 'wissenschaft', title: 'Klimawandel: Gletscher schmelzen schneller als befürchtet', lead: 'Neue Messungen zeigen alarmierende Entwicklung.' },
  { topicId: 'wissenschaft', title: 'KI-System übertrifft menschliche Experten', lead: 'Bei der Diagnose seltener Krankheiten zeigt das System beeindruckende Genauigkeit.' },
  { topicId: 'wissenschaft', title: 'Archäologen entdecken römische Siedlung', lead: 'Der Fund gibt neue Einblicke in das Leben vor 2000 Jahren.' },
  { topicId: 'wissenschaft', title: 'Weltraummission liefert erste Daten', lead: 'Die Sonde sendet faszinierende Bilder vom äusseren Sonnensystem.' },
  { topicId: 'wissenschaft', title: 'Studie zeigt Zusammenhang zwischen Schlaf und Gedächtnis', lead: 'Die Erkenntnisse könnten neue Behandlungsmethoden ermöglichen.' },
  
  // Meinung
  { topicId: 'meinung', title: 'Warum wir mehr Mut brauchen', lead: 'Ein Plädoyer für entschlossenes Handeln in unsicheren Zeiten.' },
  { topicId: 'meinung', title: 'Die Grenzen der Digitalisierung', lead: 'Nicht alles, was technisch möglich ist, ist auch sinnvoll.' },
  { topicId: 'meinung', title: 'Europa muss zusammenstehen', lead: 'Nur gemeinsam können die aktuellen Herausforderungen bewältigt werden.' },
  { topicId: 'meinung', title: 'Das Ende der Globalisierung?', lead: 'Die Weltordnung befindet sich im Umbruch.' },
  { topicId: 'meinung', title: 'Bildung ist der Schlüssel zur Zukunft', lead: 'Investitionen in Schulen zahlen sich langfristig aus.' },
  { topicId: 'meinung', title: 'Zeit für einen Neuanfang', lead: 'Die alte Politik hat ausgedient.' },
  { topicId: 'meinung', title: 'Verantwortung übernehmen', lead: 'Jeder Einzelne kann einen Beitrag leisten.' },
  
  // International
  { topicId: 'international', title: 'UN-Gipfel endet ohne konkretes Ergebnis', lead: 'Die Delegationen konnten sich nicht auf gemeinsame Massnahmen einigen.' },
  { topicId: 'international', title: 'Spannungen im Pazifikraum nehmen zu', lead: 'Experten warnen vor Eskalation.' },
  { topicId: 'international', title: 'EU plant neue Sanktionen', lead: 'Die Massnahmen sollen noch diese Woche beschlossen werden.' },
  { topicId: 'international', title: 'Humanitäre Krise spitzt sich zu', lead: 'Hilfsorganisationen schlagen Alarm.' },
  { topicId: 'international', title: 'Präsidentschaftswahl bringt Überraschung', lead: 'Aussenseiter gewinnt gegen alle Erwartungen.' },
  { topicId: 'international', title: 'Friedensverhandlungen zeigen erste Fortschritte', lead: 'Nach monatelangem Stillstand gibt es Bewegung.' },
  { topicId: 'international', title: 'Migrationsdebatte spaltet Kontinent', lead: 'Die unterschiedlichen Positionen scheinen unvereinbar.' },
  { topicId: 'international', title: 'Wirtschaftskrise trifft Schwellenländer hart', lead: 'Die Auswirkungen der globalen Entwicklung sind deutlich spürbar.' },
  
  // Zürich
  { topicId: 'zuerich', title: 'Neue Tramverbindung nach Schlieren eröffnet', lead: 'Die Linie verkürzt die Fahrtzeit um 15 Minuten.' },
  { topicId: 'zuerich', title: 'Zürcher Bahnhofstrasse wird zur Fussgängerzone', lead: 'Das Pilotprojekt startet im kommenden Monat.' },
  { topicId: 'zuerich', title: 'Wohnungsknappheit verschärft sich', lead: 'Die Mieten in der Stadt steigen weiter.' },
  { topicId: 'zuerich', title: 'Seebad feiert Rekordsaison', lead: 'Noch nie kamen so viele Besucher wie in diesem Sommer.' },
  { topicId: 'zuerich', title: 'Stadtrat beschliesst neue Grünflächen', lead: 'Zehn Hektar sollen in den kommenden Jahren entstehen.' },
  { topicId: 'zuerich', title: 'Musikfestival kehrt nach drei Jahren zurück', lead: 'Das Line-up verspricht ein Highlight für Fans.' },
  { topicId: 'zuerich', title: 'Historisches Gebäude wird saniert', lead: 'Die Renovation soll den ursprünglichen Charakter bewahren.' },
  { topicId: 'zuerich', title: 'Neue Initiative für mehr Velowege gestartet', lead: 'Die Unterstützung in der Bevölkerung ist gross.' },
];

export const ARTICLES: Article[] = ARTICLE_DATA.map((data, index) => {
  const mainTopic = TOPICS.find(t => t.id === data.topicId)!;
  const otherTopics = pickRandomTopics().filter(t => t.id !== mainTopic.id);
  const topics = [{ id: mainTopic.id, name: mainTopic.name }, ...otherTopics.slice(0, 2)];
  
  return {
    id: `article-${index + 1}`,
    title: data.title,
    lead: data.lead,
    body: generateBody(),
    author: pickRandom(AUTHORS),
    publishedAt: randomDate(30),
    topics,
    premium: Math.random() > 0.7,
    imageUrl: pickRandom(IMAGES),
  };
}).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
