// Current state
let activeCategory = 'lesson';

// Navigation Manager
function switchView(viewName) {
  document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));

  if (viewName === 'home') {
    document.getElementById('view-home').classList.add('active');
    document.getElementById('nav-home').classList.add('active');
  } else if (viewName === 'library') {
    document.getElementById('view-library').classList.add('active');
    document.getElementById('nav-library').classList.add('active');
  } else if (viewName === 'generator') {
    document.getElementById('view-generator').classList.add('active');
    document.getElementById('nav-library').classList.add('active');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Filter Books by Category Pill
function filterCategory(category, buttonEl) {
  document.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'));
  buttonEl.classList.add('active');

  const books = document.querySelectorAll('.book-card');
  books.forEach(b => {
    if (category === 'all' || b.getAttribute('data-category') === category) {
      b.style.display = 'block';
    } else {
      b.style.display = 'none';
    }
  });
}

// Search Functionality across all tomes
function handleSearch(query) {
  switchView('library');
  const term = query.toLowerCase().trim();
  const books = document.querySelectorAll('.book-card');
  
  books.forEach(book => {
    const text = (book.getAttribute('data-keywords') + " " + book.innerText).toLowerCase();
    book.style.display = text.includes(term) ? 'block' : 'none';
  });
}

// Open Specific Generator
function openGenerator(type) {
  activeCategory = type;
  buildGeneratorForm(type);
  document.getElementById('promptOutput').value = '';
  document.getElementById('charCounter').innerText = '0 chars';
  switchView('generator');
}

// Definition of 12 Generator Forms
function buildGeneratorForm(type) {
  const container = document.getElementById('activeFormContainer');

  const forms = {
    lesson: `
      <h2 class="gen-title">Lesson Plan Generator</h2>
      <button class="btn-example-autofill" onclick="populateExample('lesson')">Example</button>
      <div class="form-field"><label>Grade: <span class="star">*</span></label><input type="text" id="lp-grade" class="input-ctrl" /></div>
      <div class="form-field"><label>Subject: <span class="star">*</span></label><input type="text" id="lp-subject" class="input-ctrl" /></div>
      <div class="form-field"><label>Essential Standard: <span class="star">*</span></label><textarea id="lp-standard" rows="3" class="textarea-ctrl"></textarea></div>
      <div class="form-field"><label>Topic: <span class="star">*</span></label><input type="text" id="lp-topic" class="input-ctrl" /></div>
      <div class="form-field"><label>Learning Objectives: <span class="star">*</span></label><textarea id="lp-objectives" rows="3" class="textarea-ctrl"></textarea></div>
      <div class="form-field"><label>Time (minutes): <span class="star">*</span></label><input type="text" id="lp-time" class="input-ctrl" /></div>
    `,
    assessment: `
      <h2 class="gen-title">Assessment Generator</h2>
      <button class="btn-example-autofill" onclick="populateExample('assessment')">Example</button>
      <div class="form-field"><label>Grade: <span class="star">*</span></label><input type="text" id="as-grade" class="input-ctrl" /></div>
      <div class="form-field"><label>Subject: <span class="star">*</span></label><input type="text" id="as-subject" class="input-ctrl" /></div>
      <div class="form-field"><label>Assessment Topic: <span class="star">*</span></label><input type="text" id="as-topic" class="input-ctrl" /></div>
      <div class="form-field"><label>Learning Objectives of the Lesson: <span class="star">*</span></label><textarea id="as-objectives" rows="3" class="textarea-ctrl"></textarea></div>
      <div class="form-field">
        <label>Question Types (Can select multiple): <span class="star">*</span></label>
        <div class="selection-box">
          <label class="option-item"><input type="checkbox" name="as-type" value="Multiple Choice"> Multiple Choice</label>
          <label class="option-item"><input type="checkbox" name="as-type" value="Word Problems"> Word Problems</label>
          <label class="option-item"><input type="checkbox" name="as-type" value="Open Response"> Open Response</label>
          <label class="option-item"><input type="checkbox" name="as-type" value="Fill in the Blank"> Fill in the Blank</label>
          <label class="option-item"><input type="checkbox" name="as-type" value="True or False"> True or False</label>
        </div>
      </div>
      <div class="form-field">
        <label>Question Difficulty (Can select multiple): <span class="star">*</span></label>
        <div class="selection-box">
          <label class="option-item"><input type="checkbox" name="as-diff" value="Easy"> Easy</label>
          <label class="option-item"><input type="checkbox" name="as-diff" value="Medium"> Medium</label>
          <label class="option-item"><input type="checkbox" name="as-diff" value="Hard"> Hard</label>
          <label class="option-item"><input type="checkbox" name="as-diff" value="Mixed"> Mixed</label>
        </div>
      </div>
      <div class="form-field"><label>Quantity of Questions: <span class="star">*</span></label><input type="text" id="as-qty" class="input-ctrl" /></div>
      <div class="form-field"><label>Time Limit (optional):</label><input type="text" id="as-time" class="input-ctrl" /></div>
    `,
    slides: `
      <h2 class="gen-title">Slide Outlines Generator</h2>
      <button class="btn-example-autofill" onclick="populateExample('slides')">Example</button>
      <div class="form-field"><label>Grade / Audience: <span class="star">*</span></label><input type="text" id="sl-grade" class="input-ctrl" /></div>
      <div class="form-field"><label>Subject & Topic: <span class="star">*</span></label><input type="text" id="sl-topic" class="input-ctrl" /></div>
      <div class="form-field"><label>Number of Slides: <span class="star">*</span></label><input type="text" id="sl-count" class="input-ctrl" /></div>
      <div class="form-field"><label>Key Discussion Points / Takeaways: <span class="star">*</span></label><textarea id="sl-points" rows="3" class="textarea-ctrl"></textarea></div>
    `,
    writing: `
      <h2 class="gen-title">Writing Prompts Generator</h2>
      <button class="btn-example-autofill" onclick="populateExample('writing')">Example</button>
      <div class="form-field"><label>Grade Level: <span class="star">*</span></label><input type="text" id="wr-grade" class="input-ctrl" /></div>
      <div class="form-field"><label>Genre / Writing Style (Narrative, Persuasive, Expository, Poetry): <span class="star">*</span></label><input type="text" id="wr-genre" class="input-ctrl" /></div>
      <div class="form-field"><label>Theme or Central Subject: <span class="star">*</span></label><input type="text" id="wr-theme" class="input-ctrl" /></div>
      <div class="form-field"><label>Scaffolding / Required Literary Devices: <span class="star">*</span></label><textarea id="wr-devices" rows="2" class="textarea-ctrl"></textarea></div>
    `,
    unit: `
      <h2 class="gen-title">Unit Plans Generator</h2>
      <button class="btn-example-autofill" onclick="populateExample('unit')">Example</button>
      <div class="form-field"><label>Grade & Subject: <span class="star">*</span></label><input type="text" id="un-meta" class="input-ctrl" /></div>
      <div class="form-field"><label>Unit Title & Focus: <span class="star">*</span></label><input type="text" id="un-title" class="input-ctrl" /></div>
      <div class="form-field"><label>Duration (weeks/lessons): <span class="star">*</span></label><input type="text" id="un-duration" class="input-ctrl" /></div>
      <div class="form-field"><label>Essential Questions & Culminating Task: <span class="star">*</span></label><textarea id="un-essential" rows="3" class="textarea-ctrl"></textarea></div>
    `,
    extension: `
      <h2 class="gen-title">Extension Activities Generator</h2>
      <button class="btn-example-autofill" onclick="populateExample('extension')">Example</button>
      <div class="form-field"><label>Grade & Subject: <span class="star">*</span></label><input type="text" id="ex-meta" class="input-ctrl" /></div>
      <div class="form-field"><label>Core Concept / Skill: <span class="star">*</span></label><input type="text" id="ex-concept" class="input-ctrl" /></div>
      <div class="form-field"><label>Format (Choice Board, Socratic Seminar, Escape Room, STEAM): <span class="star">*</span></label><input type="text" id="ex-format" class="input-ctrl" /></div>
      <div class="form-field"><label>Enrichment Objectives: <span class="star">*</span></label><textarea id="ex-obj" rows="2" class="textarea-ctrl"></textarea></div>
    `,
    rubric: `
      <h2 class="gen-title">Rubrics Generator</h2>
      <button class="btn-example-autofill" onclick="populateExample('rubric')">Example</button>
      <div class="form-field"><label>Grade & Assignment Type: <span class="star">*</span></label><input type="text" id="rb-meta" class="input-ctrl" /></div>
      <div class="form-field"><label>Subject / Topic: <span class="star">*</span></label><input type="text" id="rb-topic" class="input-ctrl" /></div>
      <div class="form-field"><label>Grading Criteria Categories (e.g., Content, Organization, Mechanics): <span class="star">*</span></label><textarea id="rb-criteria" rows="2" class="textarea-ctrl"></textarea></div>
      <div class="form-field"><label>Scoring Scale (e.g., 4-Tier: Exemplary, Proficient, Developing, Beginning): <span class="star">*</span></label><input type="text" id="rb-scale" class="input-ctrl" /></div>
    `,
    simplify: `
      <h2 class="gen-title">Simplify Complex Topics Generator</h2>
      <button class="btn-example-autofill" onclick="populateExample('simplify')">Example</button>
      <div class="form-field"><label>Target Student Age / Developmental Level: <span class="star">*</span></label><input type="text" id="sm-age" class="input-ctrl" /></div>
      <div class="form-field"><label>Complex Concept or Mechanism: <span class="star">*</span></label><input type="text" id="sm-concept" class="input-ctrl" /></div>
      <div class="form-field"><label>Common Student Misconceptions: <span class="star">*</span></label><textarea id="sm-misconceptions" rows="3" class="textarea-ctrl"></textarea></div>
    `,
    summarize: `
      <h2 class="gen-title">Summarize Articles Generator</h2>
      <button class="btn-example-autofill" onclick="populateExample('summarize')">Example</button>
      <div class="form-field"><label>Target Grade / Reading Lexile Level: <span class="star">*</span></label><input type="text" id="su-level" class="input-ctrl" /></div>
      <div class="form-field"><label>Text Excerpt or Article Topic: <span class="star">*</span></label><textarea id="su-text" rows="4" class="textarea-ctrl"></textarea></div>
      <div class="form-field"><label>Summary Format (Bullet points, 100-word paragraph, Q&A format): <span class="star">*</span></label><input type="text" id="su-format" class="input-ctrl" /></div>
    `,
    feedback: `
      <h2 class="gen-title">Response Feedback Generator</h2>
      <button class="btn-example-autofill" onclick="populateExample('feedback')">Example</button>
      <div class="form-field"><label>Grade & Subject: <span class="star">*</span></label><input type="text" id="fb-meta" class="input-ctrl" /></div>
      <div class="form-field"><label>Student Work Excerpt / Response: <span class="star">*</span></label><textarea id="fb-work" rows="3" class="textarea-ctrl"></textarea></div>
      <div class="form-field"><label>Rubric Focus / Growth Area: <span class="star">*</span></label><input type="text" id="fb-focus" class="input-ctrl" /></div>
    `,
    score: `
      <h2 class="gen-title">Score Analysis Generator</h2>
      <button class="btn-example-autofill" onclick="populateExample('score')">Example</button>
      <div class="form-field"><label>Grade, Subject & Test Name: <span class="star">*</span></label><input type="text" id="sc-meta" class="input-ctrl" /></div>
      <div class="form-field"><label>Performance Data / Summary Breakdown: <span class="star">*</span></label><textarea id="sc-data" rows="3" class="textarea-ctrl"></textarea></div>
      <div class="form-field"><label>Reteach / Intervention Goal: <span class="star">*</span></label><input type="text" id="sc-goal" class="input-ctrl" /></div>
    `,
    creative: `
      <h2 class="gen-title">Creative Content Generator</h2>
      <button class="btn-example-autofill" onclick="populateExample('creative')">Example</button>
      <div class="form-field"><label>Grade: <span class="star">*</span></label><input type="text" id="cr-grade" class="input-ctrl" /></div>
      <div class="form-field"><label>Subject: <span class="star">*</span></label><input type="text" id="cr-subject" class="input-ctrl" /></div>
      <div class="form-field"><label>Type of Content (e.g., Monologue, Reader's Theater Skit, Historical Interview): <span class="star">*</span></label><input type="text" id="cr-type" class="input-ctrl" /></div>
      <div class="form-field"><label>Theme or Historical Character: <span class="star">*</span></label><input type="text" id="cr-theme" class="input-ctrl" /></div>
      <div class="form-field"><label>Length & Special Instructions: <span class="star">*</span></label><textarea id="cr-instructions" rows="2" class="textarea-ctrl"></textarea></div>
    `
  };

  container.innerHTML = forms[type] || forms.lesson;
}

// 1-Click "Example" Autofill
function populateExample(type) {
  if (type === 'lesson') {
    document.getElementById('lp-grade').value = "6th";
    document.getElementById('lp-subject').value = "World History";
    document.getElementById('lp-standard').value = "H.13.6.10 Examine key concepts and influences of major belief systems on societies";
    document.getElementById('lp-topic').value = "Abrahamic religions";
    document.getElementById('lp-objectives').value = "to compare and contrast the origins, basic beliefs, and practices of Judaism, Christianity, and Islam";
    document.getElementById('lp-time').value = "50";
  }
  else if (type === 'assessment') {
    document.getElementById('as-grade').value = "7th";
    document.getElementById('as-subject').value = "math";
    document.getElementById('as-topic').value = "ratios";
    document.getElementById('as-objectives').value = "to use ratios to solve practical word problems";
    document.querySelectorAll('input[name="as-type"]').forEach(c => c.checked = true);
    document.querySelectorAll('input[name="as-diff"]').forEach(c => c.checked = (c.value === 'Mixed'));
    document.getElementById('as-qty').value = "10";
    document.getElementById('as-time').value = "30 minutes";
  }
  else if (type === 'slides') {
    document.getElementById('sl-grade').value = "10th Grade Chemistry";
    document.getElementById('sl-topic').value = "Periodic Trends: Electronegativity and Ionization Energy";
    document.getElementById('sl-count').value = "10";
    document.getElementById('sl-points').value = "Shielding effect, atomic radius decrease across periods, Coulombic attraction, real-world chemical reactivity.";
  }
  else if (type === 'writing') {
    document.getElementById('wr-grade').value = "8th Grade Language Arts";
    document.getElementById('wr-genre').value = "Dystopian Narrative";
    document.getElementById('wr-theme').value = "A world where speaking without an AI filter is illegal.";
    document.getElementById('wr-devices').value = "Incorporate sensory imagery, dramatic irony, and a strong character motive.";
  }
  else if (type === 'unit') {
    document.getElementById('un-meta').value = "9th Grade Civics";
    document.getElementById('un-title').value = "The Bill of Rights in the Digital Age";
    document.getElementById('un-duration').value = "3 Weeks (15 lessons)";
    document.getElementById('un-essential').value = "How does digital surveillance challenge 4th Amendment privacy? Culminating task: Mock Supreme Court Oral Argument.";
  }
  else if (type === 'extension') {
    document.getElementById('ex-meta').value = "5th Grade Science";
    document.getElementById('ex-concept').value = "Ecosystem Energy Pyramids & Keystone Species";
    document.getElementById('ex-format').value = "Gamified Escape Room / Simulation Stations";
    document.getElementById('ex-obj').value = "Trace what happens to trophic levels when sea otters are removed from kelp forests.";
  }
  else if (type === 'rubric') {
    document.getElementById('rb-meta').value = "11th Grade US History Research Paper";
    document.getElementById('rb-topic').value = "Cold War Foreign Policy Analysis";
    document.getElementById('rb-criteria').value = "Primary Source Synthesis, Thesis Defense, Historical Contextualization, MLA Citations";
    document.getElementById('rb-scale').value = "4-Tier: Advanced (4), Proficient (3), Developing (2), Emerging (1)";
  }
  else if (type === 'simplify') {
    document.getElementById('sm-age').value = "4th Grade (9-10 years old)";
    document.getElementById('sm-concept').value = "How Electric Circuits and Current Flow Work";
    document.getElementById('sm-misconceptions').value = "Students often think electricity is like water spraying out of an open pipe instead of a continuous loop.";
  }
  else if (type === 'summarize') {
    document.getElementById('su-level').value = "6th Grade Reading Level (800-900L)";
    document.getElementById('su-text').value = "A peer-reviewed study regarding how microplastics permeate marine food webs, biomagnify in pelagic fish, and eventually enter human dietary streams.";
    document.getElementById('su-format').value = "3 key takeaways followed by a 4-question reading comprehension check.";
  }
  else if (type === 'feedback') {
    document.getElementById('fb-meta').value = "7th Grade Science Lab Report";
    document.getElementById('fb-work').value = "Student wrote: 'The plant in the sun grew more because the sun gives it energy. Water also helps. Plants with zero sun died fast.'";
    document.getElementById('fb-focus').value = "Guide student to use scientific vocabulary (photosynthesis, independent variable) and cite concrete metric measurements.";
  }
  else if (type === 'score') {
    document.getElementById('sc-meta').value = "8th Grade Math - Linear Equations Benchmark";
    document.getElementById('sc-data').value = "26 students: 7 advanced, 11 approaching, 8 intensive. 60% of students missed problems requiring finding negative slope from a table.";
    document.getElementById('sc-goal').value = "Plan a 3-day targeted small-group intervention station and spiral review warmup.";
  }
  else if (type === 'creative') {
    document.getElementById('cr-grade').value = "7th Grade Social Studies";
    document.getElementById('cr-subject').value = "Medieval Europe";
    document.getElementById('cr-type').value = "Reader's Theater Skit";
    document.getElementById('cr-theme').value = "A humorous dispute between a feudal Lord and a witty blacksmith about peasant taxes.";
    document.getElementById('cr-instructions').value = "4-character speaking script, under 3 minutes long, historically accurate details on the feudal contract.";
  }
}

// Generate Prompt Engine
function handleGenerate() {
  let p = "";

  if (activeCategory === 'lesson') {
    const g = document.getElementById('lp-grade').value || "[Grade]";
    const s = document.getElementById('lp-subject').value || "[Subject]";
    const std = document.getElementById('lp-standard').value || "[Standard]";
    const top = document.getElementById('lp-topic').value || "[Topic]";
    const obj = document.getElementById('lp-objectives').value || "[Objectives]";
    const t = document.getElementById('lp-time').value || "50";

    p = `Act as an expert pedagogical curriculum specialist. Construct a comprehensive, standards-aligned lesson plan:

- Grade Level: ${g}
- Subject: ${s}
- Essential Standard: ${std}
- Topic: ${top}
- Specific Learning Objectives: ${obj}
- Total Instructional Time: ${t} minutes

Please organize with:
1. Anticipatory Hook & Prior Knowledge Activation (with time allocation)
2. Direct Instruction ("I Do") with key academic vocabulary & script prompts
3. Guided Practice ("We Do") structured for peer collaboration
4. Independent Practice ("You Do") proving objective mastery
5. Exit Ticket Formative Assessment
6. Differentiation: Modifications for ELL/IEP and extensions for advanced learners
7. Required Teacher Materials & Equipment Checklist.`;
  }
  else if (activeCategory === 'assessment') {
    const g = document.getElementById('as-grade').value || "[Grade]";
    const s = document.getElementById('as-subject').value || "[Subject]";
    const top = document.getElementById('as-topic').value || "[Topic]";
    const obj = document.getElementById('as-objectives').value || "[Objectives]";
    const qty = document.getElementById('as-qty').value || "10";
    const time = document.getElementById('as-time').value || "Untimed";
    
    const types = Array.from(document.querySelectorAll('input[name="as-type"]:checked')).map(c => c.value).join(', ') || "Multiple Choice, Open Response";
    const diff = Array.from(document.querySelectorAll('input[name="as-diff"]:checked')).map(c => c.value).join(', ') || "Mixed";

    p = `Act as an assessment design specialist. Construct a rigorous, classroom-ready assessment following these exact parameters:

- Grade: ${g}
- Subject: ${s}
- Assessment Topic: ${top}
- Learning Objective Tested: ${obj}
- Question Types: ${types}
- Question Difficulty: ${diff}
- Quantity of Questions: ${qty}
- Time Limit: ${time}

Deliver:
1. Student-facing test cleanly formatted with instructions and point values.
2. Complete Answer Key with step-by-step reasoning and distractor rationale.
3. Explicit scoring criteria for free-response/word problem items.`;
  }
  else if (activeCategory === 'slides') {
    p = `Act as an educational slide designer. Create a slide-by-slide outline for ${document.getElementById('sl-grade').value || '[Audience]'} on "${document.getElementById('sl-topic').value || '[Topic]'}".
Total slides: ${document.getElementById('sl-count').value || '8'}.
Key takeaways: ${document.getElementById('sl-points').value || '[Points]'}.

For each slide, output:
- Slide Header
- Recommended Visual Graphic / Diagram
- Max 3-4 concise bullet points
- Teacher Speaker Notes and Check-for-Understanding question.`;
  }
  else if (activeCategory === 'writing') {
    p = `Act as a creative writing instructor. Generate a suite of 3 high-interest writing prompts for ${document.getElementById('wr-grade').value || '[Grade]'} students.
Genre: ${document.getElementById('wr-genre').value || '[Genre]'}
Theme: ${document.getElementById('wr-theme').value || '[Theme]'}
Requirements: ${document.getElementById('wr-devices').value || '[Devices]'}

Include a brainstorming scaffold and a 3-point self-evaluation checklist for students.`;
  }
  else if (activeCategory === 'unit') {
    p = `Act as a curriculum director using the Understanding by Design (UbD) framework.
Design a unit plan for ${document.getElementById('un-meta').value || '[Grade/Subject]'}.
Unit Title: ${document.getElementById('un-title').value || '[Title]'}
Duration: ${document.getElementById('un-duration').value || '[Duration]'}
Essential Questions & Culminating Task: ${document.getElementById('un-essential').value || '[Task]'}

Include:
- Stage 1: Enduring Understandings & Transfer Goals
- Stage 2: Formative Assessment Matrix & Summative Rubric
- Stage 3: Weekly Scope and Learning Progression.`;
  }
  else if (activeCategory === 'extension') {
    p = `Act as a gifted and differentiated education specialist. Design an enrichment activity for ${document.getElementById('ex-meta').value || '[Context]'}.
Concept: ${document.getElementById('ex-concept').value || '[Concept]'}
Format: ${document.getElementById('ex-format').value || '[Format]'}
Goal: ${document.getElementById('ex-obj').value || '[Goal]'}

Include student instructions, station materials, and critical-thinking extension prompts.`;
  }
  else if (activeCategory === 'rubric') {
    p = `Act as an instructional assessment coach. Design an analytic grading rubric for ${document.getElementById('rb-meta').value || '[Context]'}.
Topic: ${document.getElementById('rb-topic').value || '[Topic]'}
Criteria: ${document.getElementById('rb-criteria').value || '[Criteria]'}
Scale: ${document.getElementById('rb-scale').value || '[Scale]'}

Format as a markdown table with concrete, observable student descriptors for each performance tier.`;
  }
  else if (activeCategory === 'simplify') {
    p = `Act as an expert teacher using the Feynman Technique. Explain "${document.getElementById('sm-concept').value || '[Concept]'}" to ${document.getElementById('sm-age').value || '[Age]'}.
Known misconceptions: ${document.getElementById('sm-misconceptions').value || '[Misconceptions]'}.

Provide:
1. A relatable real-world analogy.
2. A 3-stage simple explanation without jargon.
3. A 2-minute hands-on demonstration using everyday desk items.
4. Two diagnostic questions to test true comprehension.`;
  }
  else if (activeCategory === 'summarize') {
    p = `Act as a literacy specialist. Summarize the following text for a reader at the ${document.getElementById('su-level').value || '[Level]'}:
Text: "${document.getElementById('su-text').value || '[Text]'}"
Format requested: ${document.getElementById('su-format').value || '[Format]'}

Also define 3 domain-specific vocabulary words in student-friendly terms.`;
  }
  else if (activeCategory === 'feedback') {
    p = `Act as a supportive, growth-oriented teacher. Provide formative feedback for this student submission in ${document.getElementById('fb-meta').value || '[Subject]'}:
Student Work: "${document.getElementById('fb-work').value || '[Work]'}"
Focus Area: ${document.getElementById('fb-focus').value || '[Focus]'}

Use the 'Praise-Question-Push' model: Celebrate specific strengths, ask a probing question, and provide an actionable revision step.`;
  }
  else if (activeCategory === 'score') {
    p = `Act as an educational data coach. Analyze this assessment dataset:
Context: ${document.getElementById('sc-meta').value || '[Context]'}
Data: ${document.getElementById('sc-data').value || '[Data]'}
Goal: ${document.getElementById('sc-goal').value || '[Goal]'}

Provide:
1. Diagnostic root-cause analysis for student mistakes.
2. 3-Tiered intervention plan (whole group, small group, individual).
3. A 3-day spiral warmup protocol to ensure mastery.`;
  }
  else if (activeCategory === 'creative') {
    p = `Act as an educational playwright and creative writer.
Grade: ${document.getElementById('cr-grade').value || '[Grade]'}
Subject: ${document.getElementById('cr-subject').value || '[Subject]'}
Format: ${document.getElementById('cr-type').value || '[Format]'}
Theme/Characters: ${document.getElementById('cr-theme').value || '[Theme]'}
Requirements: ${document.getElementById('cr-instructions').value || '[Instructions]'}

Write engaging, classroom-ready dialogue that seamlessly teaches the curriculum concepts.`;
  }

  const out = document.getElementById('promptOutput');
  out.value = p;
  document.getElementById('charCounter').innerText = `${p.length} chars`;
}

// Copy to Clipboard
function handleCopy() {
  const text = document.getElementById('promptOutput').value;
  if (!text.trim()) {
    showToast("Please generate a prompt first!");
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    showToast("Prompt copied to clipboard!");
  }).catch(() => {
    showToast("Failed to copy. Please copy manually.");
  });
}

// Direct AI Launch (Opens ChatGPT, Claude, or Gemini in new tab)
function launchAI(platform) {
  const text = document.getElementById('promptOutput').value;
  if (text.trim()) {
    navigator.clipboard.writeText(text);
    showToast("Copied! Opening AI chatbot in new tab...");
  }
  const urls = {
    chatgpt: "https://chatgpt.com",
    claude: "https://claude.ai/new",
    gemini: "https://gemini.google.com/app"
  };
  window.open(urls[platform] || urls.chatgpt, "_blank");
}

// Example AI Result Modal (Feature identical to original aipromptlibrary.org)
const sampleResults = {
  lesson: `### Lesson Plan: Abrahamic Religions Comparison
**Grade:** 6th | **Duration:** 50 mins

**Hook (7 Mins):** Display three sacred symbols (Star of David, Cross, Star & Crescent). Ask students: "What do these three symbols have in common?" Lead students to recognize they all trace lineage to Abraham.

**Direct Instruction (15 Mins):**
- Introduce the concept of Monotheism vs. Polytheism.
- Interactive Graphic Organizer comparing: Founders (Abraham/Moses/Jesus/Muhammad), Sacred Texts (Torah/Bible/Quran), and Holy Sites (Jerusalem).

**Guided Practice (15 Mins):**
- Jigsaw Partner Activity: Pairs receive 3 excerpted historical passages and match each to the correct tradition using primary evidence clues.

**Independent / Exit Ticket (10 Mins):**
- 3-2-1 Ticket: 3 shared historical connections, 2 unique practices, 1 question remaining.

**Accommodations:** Dual-language vocabulary cards with visual pictograms for ELL students.`,
  
  assessment: `### 7th Grade Math: Ratio & Proportions Assessment

1. A bakery recipe requires a ratio of 2 cups of sugar for every 5 cups of flour. If a baker uses 15 cups of flour, how many cups of sugar are needed?
   - A) 4 cups
   - B) 6 cups [CORRECT]
   - C) 8 cups
   - D) 10 cups
   *Rationale:* 15 / 5 = multiplier of 3; 2 * 3 = 6 cups.

2. A map scale shows that 2 inches represents 75 miles. Two cities are 6 inches apart on the map. What is the actual distance in miles?
   *Answer:* 225 miles. (Work: 6 / 2 = 3; 3 * 75 = 225 miles).

3. Open Response: A school has 360 students and a student-to-teacher ratio of 18:1. Explain how many new teachers the school must hire if 90 additional students enroll and the school wants to preserve the same ratio.`,
  
  creative: `### Reader's Theater: The Feudal Contract
**Characters:** Lord Walter, Master Blacksmith Geoffrey, Tax Collector Simon

**SIMON (adjusting scrolls):** My Lord Walter, Master Geoffrey here claims he cannot furnish his quarterly tribute of thirty horseshoes!
**GEOFFREY (grumbling):** Not when you've requisitioned my apprentices for the autumn harvest, Sir Simon! Even Vulcan himself could not hammer iron without hands to pump the bellows!
**LORD WALTER (stroking beard):** Peace, Geoffrey. The feudal pact binds us both: I furnish protection from northern bandits; you furnish the shoes for my cavalry...`
};

function toggleResultModal() {
  const modal = document.getElementById('exampleModal');
  const isOpen = modal.classList.contains('open');

  if (!isOpen) {
    document.getElementById('modalTitle').innerText = `Example AI Result: ${activeCategory.toUpperCase()}`;
    document.getElementById('modalContent').innerText = sampleResults[activeCategory] || sampleResults.lesson;
    modal.classList.add('open');
  } else {
    modal.classList.remove('open');
  }
}

function closeModalOnBackdrop(e) {
  if (e.target.id === 'exampleModal') toggleResultModal();
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.innerText = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}

// Initial setup
window.addEventListener('DOMContentLoaded', () => {
  buildGeneratorForm('lesson');
});
