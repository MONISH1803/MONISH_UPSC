import { Article } from '../types';

// Image Reference Mapping for 22 Parts of the Constitution
const constitutionTable = [
  { part: "Part I", subject: "Union & Its Territory", start: 1, end: 4 },
  { part: "Part II", subject: "Citizenship", start: 5, end: 11 },
  { part: "Part III", subject: "Fundamental Rights", start: 12, end: 35 },
  { part: "Part IV", subject: "Directive Principles of State Policy", start: 36, end: 51 },
  { part: "Part IV-A", subject: "Fundamental Duties", isSub: true, customId: "51A" },
  { part: "Part V", subject: "The Union", start: 52, end: 151 },
  { part: "Part VI", subject: "The States", start: 152, end: 237 },
  { part: "Part VII", subject: "7th Constitutional Amendment Act (Repealed)", start: 238, end: 238 },
  { part: "Part VIII", subject: "Union Territories", start: 239, end: 242 },
  { part: "Part IX", subject: "The Panchayats", start: 243, end: 243 }, 
  { part: "Part IX A", subject: "The Municipalities", isSub: true, customId: "243P-243ZG" },
  { part: "Part IX B", subject: "Cooperative Societies", isSub: true, customId: "243ZH-243ZT" },
  { part: "Part X", subject: "Scheduled and Tribal Areas", start: 244, end: 244 },
  { part: "Part XI", subject: "Relation between Union & States", start: 245, end: 263 },
  { part: "Part XII", subject: "Finance, Property, Contracts and Suits", start: 264, end: 300 },
  { part: "Part XIII", subject: "Trade, Commerce, and Intercourse within the territory of India", start: 301, end: 307 },
  { part: "Part XIV", subject: "Services under the Union and States", start: 308, end: 323 },
  { part: "Part XIV A", subject: "Tribunals", isSub: true, customId: "323A-323B" },
  { part: "Part XV", subject: "Elections", start: 324, end: 329 },
  { part: "Part XVI", subject: "Special Provisions relating to certain classes", start: 330, end: 342 },
  { part: "Part XVII", subject: "Official Languages", start: 343, end: 351 },
  { part: "Part XVIII", subject: "Emergency Provisions", start: 352, end: 360 },
  { part: "Part XIX", subject: "Miscellaneous", start: 361, end: 367 },
  { part: "Part XX", subject: "Amendment of the Constitution", start: 368, end: 368 },
  { part: "Part XXI", subject: "Temporary, Transitional, and Special Provisions", start: 369, end: 392 },
  { part: "Part XXII", subject: "Short title, Commencement, Authoritative Text in Hindi and Repeals", start: 393, end: 395 }
];

export const mockArticles: Article[] = [];

// Detailed overrides for high-priority UPSC articles
const detailedOverrides: Record<string, Partial<Article>> = {
  "1": { 
    title: "Article 1: Name and territory of the Union", 
    originalContent: `(1) India, that is Bharat, shall be a Union of States.
(2) The States and the territories thereof shall be as specified in the First Schedule.
(3) The territory of India shall comprise —
(a) the territories of the States;
(b) the Union territories specified in the First Schedule; and
(c) such other territories as may be acquired.`,
    simpleExplanation: "India, that is Bharat, shall be a Union of States. It defines the geographical foundation of the country.", 
    keywords: ["Union of States", "Territory", "Bharat"] 
  },
  "14": { 
    title: "Article 14: Equality before law", 
    originalContent: `The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.`,
    simpleExplanation: "The State shall not deny to any person equality before the law or the equal protection of the laws.", 
    relatedIssues: "Exceptions for President/Governors, concept of 'Reasonable Classification'.", 
    keywords: ["Equality", "Rule of Law"] 
  },
  "19": { 
    title: "Article 19: Protection of certain rights regarding freedom of speech, etc.", 
    originalContent: `(1) All citizens shall have the right—
(a) to freedom of speech and expression;
(b) to assemble peaceably and without arms;
(c) to form associations or unions or co-operative societies;
(d) to move freely throughout the territory of India;
(e) to reside and settle in any part of the territory of India; and
(g) to practise any profession, or to carry on any occupation, trade or business.`,
    simpleExplanation: "Guarantees six fundamental freedoms to citizens, subject to reasonable restrictions by the State.", 
    relatedIssues: "Freedom of Press, Reasonable Restrictions under Article 19(2).",
    keywords: ["Freedom of Speech", "Liberty", "Basic Rights"] 
  },
  "21": { 
    title: "Article 21: Protection of life and personal liberty", 
    originalContent: `No person shall be deprived of his life or personal liberty except according to procedure established by law.`,
    simpleExplanation: "No person shall be deprived of his life or personal liberty except according to procedure established by law.", 
    examples: "Puttaswamy case (Right to Privacy), Maneka Gandhi case.", 
    keywords: ["Right to Life", "Liberty", "Privacy"] 
  },
  "32": { 
    title: "Article 32: Remedies for enforcement of rights", 
    originalContent: `(1) The right to move the Supreme Court by appropriate proceedings for the enforcement of the rights conferred by this Part is guaranteed.
(2) The Supreme Court shall have power to issue directions or orders or writs, including writs in the nature of habeas corpus, mandamus, prohibition, quo warranto and certiorari, whichever may be appropriate, for the enforcement of any of the rights conferred by this Part.`,
    simpleExplanation: "Heart and soul of the Constitution. Gives citizens the right to move the Supreme Court to seek enforcement of Fundamental Rights.", 
    keywords: ["Constitutional Remedies", "Writs", "Supreme Court"] 
  },
  "51A": { 
    title: "Article 51A: Fundamental Duties", 
    originalContent: `It shall be the duty of every citizen of India—
(a) to abide by the Constitution and respect its ideals and institutions, the National Flag and the National Anthem;
(b) to cherish and follow the noble ideals which inspired our national struggle for freedom;
(c) to uphold and protect the sovereignty, unity and integrity of India;
(d) to defend the country and render national service when called upon to do so;
(e) to promote harmony and the spirit of common brotherhood amongst all the people of India transcending religious, linguistic and regional or sectional diversities; to renounce practices derogatory to the dignity of women;
(f) to value and preserve the rich heritage of our composite culture;
(g) to protect and improve the natural environment including forests, lakes, rivers and wild life, and to have compassion for living creatures;
(h) to develop the scientific temper, humanism and the spirit of inquiry and reform;
(i) to safeguard public property and to abjure violence;
(j) to strive towards excellence in all spheres of individual and collective activity so that the nation constantly rises to higher levels of endeavour and achievement;
(k) who is a parent or guardian to provide opportunities for education to his child or, as the case may be, ward between the age of six and fourteen years.`,
    simpleExplanation: "Outlines the fundamental duties of citizens. Added via the 42nd Amendment, with clause (k) added by the 86th Amendment.", 
    keywords: ["Fundamental Duties", "Swaran Singh Committee", "Citizenship"] 
  },
  "368": { 
    title: "Article 368: Power of Parliament to amend the Constitution and procedure therefor", 
    originalContent: `(1) Notwithstanding anything in this Constitution, Parliament may in exercise of its constituent power amend by way of addition, variation or repeal any provision of this Constitution in accordance with the procedure laid down in this article.
(2) An amendment of this Constitution may be initiated only by the introduction of a Bill for the purpose in either House of Parliament, and when the Bill is passed in each House by a majority of the total membership of that House and by a majority of not less than two-thirds of the members of that House present and voting, it shall be presented to the President who shall give his assent to the Bill and thereupon the Constitution shall stand amended...`,
    simpleExplanation: "Details the procedure by which the Parliament can amend the Constitution, subject to the 'Basic Structure' doctrine.", 
    examples: "Kesavananda Bharati case, Shankari Prasad case.", 
    keywords: ["Constitutional Amendment", "Basic Structure"] 
  }
};

constitutionTable.forEach(section => {
  if (section.isSub && section.customId) {
    // Handle Sub-parts (like Part IV-A) as a dedicated study module
    const details = detailedOverrides[section.customId] || {};
    mockArticles.push({
      id: `const_${section.customId}`,
      title: details.title || `${section.part} - Articles ${section.customId}`,
      originalContent: details.originalContent || `Provisions under ${section.part} (${section.subject}).`,
      aiSummary: details.aiSummary || `Constitutional framework governing ${section.subject}.`,
      simpleExplanation: details.simpleExplanation || `This module focuses on ${section.subject} under ${section.part}. Treat this as a comprehensive study of these related clauses.`,
      part: section.part,
      subject: section.subject,
      keywords: details.keywords || [section.part, "UPSC", section.subject.split(" ")[0]],
      relevanceInfo: `Belongs to ${section.part}: ${section.subject}. In UPSC, focus on the Constitutional Amendments that added this section.`,
      relatedIssues: details.relatedIssues,
      examples: details.examples,
      isCompleted: false
    });
  } else if (section.start && section.end) {
    // Iterate through numerical articles
    for (let i = section.start; i <= section.end; i++) {
      const strId = String(i);
      const details = detailedOverrides[strId] || {};
      
      mockArticles.push({
        id: `const_${i}`,
        title: details.title || `${section.part} - Article ${i}`,
        originalContent: details.originalContent || `[Exact Text for Article ${i} is pending sync from the official gazette database. In a production app, this would fetch from a trusted JSON dataset of the Constitution.]`,
        aiSummary: details.aiSummary || `This article forms part of ${section.part}, which governs ${section.subject}.`,
        simpleExplanation: details.simpleExplanation || `This falls under the subject of "${section.subject}". Focus on understanding its role within the wider context of ${section.part}.`,
        part: section.part,
        subject: section.subject,
        keywords: details.keywords || [section.part, "UPSC", `Article ${i}`],
        relevanceInfo: `Part of ${section.part} (${section.subject}). Study any recent political events, court rulings, or current affairs linked to this article.`,
        relatedIssues: details.relatedIssues,
        examples: details.examples,
        isCompleted: false
      });
    }
  }
});
