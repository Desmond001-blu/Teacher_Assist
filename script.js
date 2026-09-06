// Global State
let currentGenerator = 'lesson';

// Navigation Switcher
function switchView(viewName) {
  document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));

  if (viewName === 'home') {
    document.getElementById('view-home').classList.add('active');
    document.getElementById('nav-home').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (viewName === 'library') {
    document.getElementById('view-library').classList.add('active');
    document.getElementById('nav-library').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (viewName === 'generator') {
    document.getElementById('view-generator').classList.add('active');
    document.getElementById('nav-library').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Search bar filter for books
function handleSearch(query) {
  switchView('library');
  const books = document.querySelectorAll('.book-item');
  const q = query.toLowerCase().trim();
  books.forEach(b => {
    const text = b.getAttribute('data-title') + " " + b.innerText.toLowerCase();
    if (text.includes(q)) {
      b.style.display = 'block';
    } else {
      b.style.display = 'none';
    }
  });
}

// Open specific generator
function openGenerator(type) {
  currentGenerator = type;
  renderGeneratorForm(type);
  document.getElementById('promptOutput').innerText = "";
  switchView('generator');
}

// Form Templates Definition
function renderGeneratorForm(type) {
  const container = document.getElementById('generatorFormArea');

  if (type === 'lesson') {
    container.innerHTML = `
      <h2 class="gen-header-title">Lesson Plan Generator</h2>
      <button class="btn-example" onclick="fillExample('lesson')">Example</button>
      
      <div class="form-group">
        <label class="form-label">Grade: <span class="required">*</span></label>
        <input type="text" id="lp-grade" class="input-text" />
      </div>

      <div class="form-group">
        <label class="form-label">Subject: <span class="required">*</span></label>
        <input type="text" id="lp-subject" class="input-text" />
      </div>

      <div class="form-group">
        <label class="form-label">Essential Standard: <span class="required">*</span></label>
        <textarea id="lp-standard" rows="3" class="textarea-input"></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Topic: <span class="required">*</span></label>
        <input type="text" id="lp-topic" class="input-text" />
      </div>

      <div class="form-group">
        <label class="form-label">Learning Objectives: <span class="required">*</span></label>
        <textarea id="lp-objectives" rows="3" class="textarea-input"></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Time (minutes): <span class="required">*</span></label>
        <input type="text" id="lp-time" class="input-text" />
      </div>
    `;
  } 
  else if (type === 'assessment') {
    container.innerHTML = `
      <h2 class="gen-header-title">Assessment Generator</h2>
      <button class="btn-example" onclick="fillExample('assessment')">Example</button>

      <div class="form-group">
        <label class="form-label">Grade: <span class="required">*</span></label>
        <input type="text" id="as-grade" class="input-text" />
      </div>

      <div class="form-group">
        <label class="form-label">Subject: <span class="required">*</span></label>
        <input type="text" id="as-subject" class="input-text" />
      </div>

      <div class="form-group">
        <label class="form-label">Assessment Topic: <span class="required">*</span></label>
        <input type="text" id="as-topic" class="input-text" />
      </div>

      <div class="form-group">
        <label class="form-label">Learning Objectives of the Lesson: <span class="required">*</span></label>
        <textarea id="as-objectives" rows="3" class="textarea-input"></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Question Types (Can select multiple): <span class="required">*</span></label>
        <div class="checkbox-panel">
          <label class="check-item"><input type="checkbox" name="as-qtype" value="Multiple Choice"> Multiple Choice</label>
          <label class="check-item"><input type="checkbox" name="as-qtype" value="Word Problems"> Word Problems</label>
          <label class="check-item"><input type="checkbox" name="as-qtype" value="Open Response"> Open Response</label>
          <label class="check-item"><input type="checkbox" name="as-qtype" value="Fill in the Blank"> Fill in the Blank</label>
          <label class="check-item"><input type="checkbox" name="as-qtype" value="True or False"> True or False</label>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Question Difficulty (Can select multiple): <span class="required">*</span></label>
        <div class="checkbox-panel">
          <label class="check-item"><input type="checkbox" name="as-diff" value="Easy"> Easy</label>
          <label class="check-item"><input type="checkbox" name="as-diff" value="Medium"> Medium</label>
          <label class="check-item"><input type="checkbox" name="as-diff" value="Hard"> Hard</label>
          <label class="check-item"><input type="checkbox" name="as-diff" value="Mixed"> Mixed</label>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Quantity of Questions: <span class="required">*</span></label>
        <input type="text" id="as-qty" class="input-text" />
      </div>

      <div class="form-group">
        <label class="form-label">Time Limit (optional):</label>
        <input type="text" id="as-time" class="input-text" />
      </div>
    `;
  }
  else if (type === 'slides') {
    container.innerHTML = `
      <h2 class="gen-header-title">Slides Outline Generator</h2>
      <button class="btn-example" onclick="fillExample('slides')">Example</button>
      
      <div class="form-group">
        <label class="form-label">Grade Level: <span class="required">*</span></label>
        <input type="text" id="sl-grade" class="input-text" />
      </div>
      <div class="form-group">
        <label class="form-label">Subject & Topic: <span class="required">*</span></label>
        <input type="text" id="sl-topic" class="input-text" />
      </div>
      <div class="form-group">
        <label class="form-label">Target Slide Count: <span class="required">*</span></label>
        <input type="text" id="sl-count" class="input-text" />
      </div>
      <div class="form-group">
        <label class="form-label">Key Learning Takeaways: <span class="required">*</span></label>
        <textarea id="sl-takeaways" rows="3" class="textarea-input"></textarea>
      </div>
    `;
  }
  else if (type === 'unit') {
    container.innerHTML = `
      <h2 class="gen-header-title">Unit Plan Generator</h2>
      <button class="btn-example" onclick="fillExample('unit')">Example</button>
      
      <div class="form-group">
        <label class="form-label">Grade & Subject: <span class="required">*</span></label>
        <input type="text" id="un-grade" class="input-text" />
      </div>
      <div class="form-group">
        <label class="form-label">Unit Title & Central Theme: <span class="required">*</span></label>
        <input type="text" id="un-theme" class="input-text" />
      </div>
      <div class="form-group">
        <label class="form-label">Unit Duration (e.g. 3 Weeks): <span class="required">*</span></label>
        <input type="text" id="un-duration" class="input-text" />
      </div>
      <div class="form-group">
        <label class="form-label">Essential Questions & Culminating Project: <span class="required">*</span></label>
        <textarea id="un-project" rows="3" class="textarea-input"></textarea>
      </div>
    `;
  }
  else if (type === 'extended') {
    container.innerHTML = `
      <h2 class="gen-header-title">Extended Activities Generator</h2>
      <button class="btn-example" onclick="fillExample('extended')">Example</button>
      
      <div class="form-group">
        <label class="form-label">Grade & Subject: <span class="required">*</span></label>
        <input type="text" id="ex-grade" class="input-text" />
      </div>
      <div class="form-group">
        <label class="form-label">Core Topic / Concept: <span class="required">*</span></label>
        <input type="text" id="ex-topic" class="input-text" />
      </div>
      <div class="form-group">
        <label class="form-label">Activity Type (e.g. Socratic Seminar, Escape Room, Tiered Project): <span class="required">*</span></label>
        <input type="text" id="ex-type" class="input-text" />
      </div>
      <div class="form-group">
        <label class="form-label">Student Learning Objective: <span class="required">*</span></label>
        <textarea id="ex-objectives" rows="3" class="textarea-input"></textarea>
      </div>
    `;
  }
  else if (type === 'simplify') {
    container.innerHTML = `
      <h2 class="gen-header-title">Simplify Complex Topics Generator</h2>
      <button class="btn-example" onclick="fillExample('simplify')">Example</button>
      
      <div class="form-group">
        <label class="form-label">Target Grade / Developmental Age: <span class="required">*</span></label>
        <input type="text" id="sm-grade" class="input-text" />
      </div>
      <div class="form-group">
        <label class="form-label">Complex Topic / Concept: <span class="required">*</span></label>
        <input type="text" id="sm-topic" class="input-text" />
      </div>
      <div class="form-group">
        <label class="form-label">Common Student Misconceptions: <span class="required">*</span></label>
        <textarea id="sm-misconceptions" rows="3" class="textarea-input"></textarea>
      </div>
    `;
  }
  else if (type === 'score') {
    container.innerHTML = `
      <h2 class="gen-header-title">Score Analysis Generator</h2>
      <button class="btn-example" onclick="fillExample('score')">Example</button>
      
      <div class="form-group">
        <label class="form-label">Grade, Subject & Assessment Name: <span class="required">*</span></label>
        <input type="text" id="sc-meta" class="input-text" />
      </div>
      <div class="form-group">
        <label class="form-label">Score Summary / Data Points: <span class="required">*</span></label>
        <textarea id="sc-data" rows="4" class="textarea-input" placeholder="e.g. 24 students tested. 6 proficient, 12 approaching, 6 intensive. Most missed questions on finding ratios from word problems."></textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Target Intervention Goal: <span class="required">*</span></label>
        <input type="text" id="sc-goal" class="input-text" />
      </div>
    `;
  }
}

// "Example" autofill matching screenshots
function fillExample(type) {
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
    document.querySelectorAll('input[name="as-qtype"]').forEach(c => c.checked = true);
    document.querySelectorAll('input[name="as-diff"]').forEach(c => {
      c.checked = (c.value === "Mixed");
    });
    document.getElementById('as-qty').value = "10";
    document.getElementById('as-time').value = "30 minutes";
  }
  else if (type === 'slides') {
    document.getElementById('sl-grade').value = "9th Grade Biology";
    document.getElementById('sl-topic').value = "Cellular Respiration vs Photosynthesis";
    document.getElementById('sl-count').value = "8 slides";
    document.getElementById('sl-takeaways').value = "Understand ATP energy cycles, inputs/outputs of chloroplasts and mitochondria, and real-world ecological interdependence.";
  }
  else if (type === 'unit') {
    document.getElementById('un-grade').value = "8th Grade English Language Arts";
    document.getElementById('un-theme').value = "Dystopian Literature & Rhetoric of Control";
    document.getElementById('un-duration').value = "4 Weeks";
    document.getElementById('un-project').value = "How do authors warn societies of danger? Culminating task: Students write their own dystopian prologue and deliver a persuasive address.";
  }
  else if (type === 'extended') {
    document.getElementById('ex-grade').value = "5th Grade Science";
    document.getElementById('ex-topic').value = "Ecosystem Energy Pyramids & Food Webs";
    document.getElementById('ex-type').value = "Collaborative Escape Room & Food Web Simulation";
    document.getElementById('ex-objectives').value = "Students trace what happens when an apex predator is removed from a marine ecosystem.";
  }
  else if (type === 'simplify') {
    document.getElementById('sm-grade').value = "4th Grade (9-10 years old)";
    document.getElementById('sm-topic').value = "How Electricity and Circuits Work";
    document.getElementById('sm-misconceptions').value = "Students often think electricity is like water leaking from a hose rather than an unbroken loop of flowing electrons.";
  }
  else if (type === 'score') {
    document.getElementById('sc-meta').value = "7th Grade Math - Unit 2 Ratios & Proportions Benchmark";
    document.getElementById('sc-data').value = "Total students: 28. Class average: 68%. 45% of students missed Q4 & Q7 involving multi-step unit rate conversions with fractional ratios.";
    document.getElementById('sc-goal').value = "Develop a 3-day targeted small-group reteach and spiraled do-now warm-ups.";
  }
}

// Prompt Compilation Engine
function generatePrompt() {
  let promptText = "";

  if (currentGenerator === 'lesson') {
    const grade = document.getElementById('lp-grade').value || "[Grade]";
    const subject = document.getElementById('lp-subject').value || "[Subject]";
    const standard = document.getElementById('lp-standard').value || "[Standard]";
    const topic = document.getElementById('lp-topic').value || "[Topic]";
    const objectives = document.getElementById('lp-objectives').value || "[Objectives]";
    const time = document.getElementById('lp-time').value || "50";

    promptText = `You are a master pedagogical curriculum designer. Design a highly engaging, structured, and standards-aligned lesson plan based on the following specifications:

- Grade Level: ${grade}
- Subject: ${subject}
- Essential Standard: ${standard}
- Topic: ${topic}
- Learning Objective(s): ${objectives}
- Total Instructional Time: ${time} minutes

Please construct the complete lesson plan with the following components:
1. Lesson Overview & Hook / Anticipatory Set (timed)
2. Direct Instruction / "I Do" with key vocabulary and teacher script
3. Guided Practice / "We Do" with collaborative partner activity
4. Independent Practice / "You Do" demonstrating mastery
5. Formative Assessment / Exit Ticket
6. Accommodations & Differentiation (Supports for ELL/IEP students and extensions for advanced learners)
7. Materials & Teacher Preparation checklist`;
  }
  else if (currentGenerator === 'assessment') {
    const grade = document.getElementById('as-grade').value || "[Grade]";
    const subject = document.getElementById('as-subject').value || "[Subject]";
    const topic = document.getElementById('as-topic').value || "[Topic]";
    const objectives = document.getElementById('as-objectives').value || "[Objectives]";
    const qty = document.getElementById('as-qty').value || "10";
    const time = document.getElementById('as-time').value || "Untimed";

    const selectedTypes = Array.from(document.querySelectorAll('input[name="as-qtype"]:checked')).map(cb => cb.value);
    const typesStr = selectedTypes.length ? selectedTypes.join(', ') : "Multiple Choice, Open Response";

    const selectedDiff = Array.from(document.querySelectorAll('input[name="as-diff"]:checked')).map(cb => cb.value);
    const diffStr = selectedDiff.length ? selectedDiff.join(', ') : "Mixed";

    promptText = `You are an expert assessment specialist and educator. Construct a rigorous, classroom-ready assessment following these exact parameters:

- Grade Level: ${grade}
- Subject: ${subject}
- Assessment Topic: ${topic}
- Learning Objective Tested: ${objectives}
- Question Types: ${typesStr}
- Difficulty Level: ${diffStr}
- Total Number of Questions: ${qty}
- Suggested Time Limit: ${time}

Please provide:
1. The student-facing assessment (cleanly formatted with clear instructions and point values for each question).
2. Complete Teacher Answer Key with detailed step-by-step explanations and common distractor analysis for multiple-choice items.
3. Scoring rubric for any open-response/word problem questions.`;
  }
  else if (currentGenerator === 'slides') {
    const grade = document.getElementById('sl-grade').value || "[Grade/Subject]";
    const topic = document.getElementById('sl-topic').value || "[Topic]";
    const count = document.getElementById('sl-count').value || "8";
    const takeaways = document.getElementById('sl-takeaways').value || "[Takeaways]";

    promptText = `You are an instructional presentation designer. Create a slide-by-slide outline for a classroom presentation based on the following:

- Class / Audience: ${grade}
- Topic: ${topic}
- Slide Count: ${count}
- Key Takeaways: ${takeaways}

For each slide, specify:
1. Slide Title & Core Concept
2. Recommended Visuals/Diagrams (detailed description)
3. Concise On-Slide Bullet Points (max 4 bullets)
4. Speaker Notes & Teacher Discussion Prompts/Questions for students.`;
  }
  else if (currentGenerator === 'unit') {
    const grade = document.getElementById('un-grade').value || "[Grade/Subject]";
    const theme = document.getElementById('un-theme').value || "[Theme]";
    const duration = document.getElementById('un-duration').value || "[Duration]";
    const project = document.getElementById('un-project').value || "[Project]";

    promptText = `You are a curriculum director. Build an overarching unit plan according to the Understanding by Design (UbD) framework with the following details:

- Grade & Course: ${grade}
- Unit Title & Theme: ${theme}
- Duration: ${duration}
- Essential Questions & Final Performance Task: ${project}

Provide:
1. Stage 1: Desired Results (Transfer goals, enduring understandings, essential questions).
2. Stage 2: Assessment Evidence (Formative benchmarks & culminating rubric).
3. Stage 3: Weekly Learning Sequence outline (Week-by-week progression from foundational concepts to synthesis).`;
  }
  else if (currentGenerator === 'extended') {
    const grade = document.getElementById('ex-grade').value || "[Grade/Subject]";
    const topic = document.getElementById('ex-topic').value || "[Topic]";
    const type = document.getElementById('ex-type').value || "[Activity Type]";
    const objectives = document.getElementById('ex-objectives').value || "[Objectives]";

    promptText = `You are an experiential learning specialist. Design an engaging extended/enrichment activity for students:

- Grade & Subject: ${grade}
- Topic: ${topic}
- Activity Format: ${type}
- Learning Objective: ${objectives}

Include:
1. Hook & Scenario Narrative
2. Step-by-Step Student Instructions & Group Roles
3. Required Materials & Station Setup
4. Formative Reflection Questions & Extension Challenge for early finishers.`;
  }
  else if (currentGenerator === 'simplify') {
    const grade = document.getElementById('sm-grade').value || "[Target Age/Grade]";
    const topic = document.getElementById('sm-topic').value || "[Topic]";
    const misconceptions = document.getElementById('sm-misconceptions').value || "[Misconceptions]";

    promptText = `You are a master teacher renowned for explaining difficult concepts using the Feynman Technique. 

- Target Audience: ${grade}
- Concept to Explain: ${topic}
- Known Student Misconceptions: ${misconceptions}

Please deliver:
1. A vivid, relatable real-world analogy appropriate for this age.
2. A 3-step scaffolded explanation using accessible language without dumbing down the core scientific/academic truth.
3. A quick hands-on demonstration or visual thought-experiment the teacher can do in 2 minutes with common items.
4. Two diagnostic check-for-understanding questions to verify the misconception has been dispelled.`;
  }
  else if (currentGenerator === 'score') {
    const meta = document.getElementById('sc-meta').value || "[Assessment Details]";
    const data = document.getElementById('sc-data').value || "[Data Summary]";
    const goal = document.getElementById('sc-goal').value || "[Goal]";

    promptText = `You are an educational data analyst and instructional coach. Analyze this classroom assessment data and construct a responsive intervention roadmap:

- Context: ${meta}
- Assessment Data / Observed Performance: ${data}
- Target Intervention Goal: ${goal}

Generate:
1. Diagnostic Root-Cause Analysis (Why did students struggle with these specific concepts?).
2. 3-Tiered Action Plan (Whole-group reteaching strategy, Small-group targeted interventions, Independent practice).
3. A 5-minute daily spiral warm-up plan for the next 3 days to rebuild mastery.`;
  }

  document.getElementById('promptOutput').innerText = promptText;
}

// Copy to Clipboard with notification
function copyPrompt() {
  const text = document.getElementById('promptOutput').innerText;
  if (!text || text.trim() === "") {
    showToast("Please generate a prompt first!");
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    showToast("Prompt copied to clipboard!");
  }).catch(() => {
    showToast("Failed to copy. Please select text manually.");
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.innerText = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

// Default initialization
window.addEventListener('DOMContentLoaded', () => {
  renderGeneratorForm('lesson');
});