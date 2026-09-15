const form = document.getElementById("projectForm");
const analyzeBtn = document.getElementById("analyzeBtn");

const loading = document.getElementById("loading");
const results = document.getElementById("results");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    analyzeBtn.disabled = true;
    analyzeBtn.textContent = "🤖 Analyzing...";

    loading.classList.remove("hidden");
    results.classList.add("hidden");

    const data = {
        student: {
            name: document.getElementById("studentName").value,
            academic_year: document.getElementById("academicYear").value,
            skills: getList("skills"),
            experience_level: document.getElementById("experience").value,
            interests: getList("interests")
        },

        project: {
            project_name: document.getElementById("projectName").value,
            description: document.getElementById("description").value,
            project_type: document.getElementById("projectType").value,
            available_days: Number(
                document.getElementById("availableDays").value
            ),
            technology_preferences: getList("technologies"),
            constraints: getList("constraints")
        }
    };

    try {
        const response = await fetch("http://127.0.0.1:8000/project", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Backend returned an error.");
        }

        const result = await response.json();

                   displayResults(result);
                   addPlanControls(result);

                   loading.classList.add("hidden");
                   results.classList.remove("hidden");
    results.scrollIntoView({
         behavior: "smooth"
      });

    } catch (error) {

        loading.classList.add("hidden");

        alert(
            "Unable to connect to PlanX AI backend.\n\n" +
            "Make sure the FastAPI server is running."
        );

        console.error(error);

    } finally {

        analyzeBtn.disabled = false;
        analyzeBtn.textContent = "🤖 Analyze My Project";
    }
});


function getList(id) {

    return document
        .getElementById(id)
        .value
        .split(",")
        .map(item => item.trim())
        .filter(item => item.length > 0);
}


function displayResults(data) {

    displayDashboard(data);

    createTimeline(data);

    createSkillGap(data);

    displayStudent(data.student);

    displayRequirements(data.requirement_analysis);

    displayTechnologies(data.technology_analysis);

    displayProjectPlan(data.project_plan);

    displayLearningPlan(data.learning_plan);

    displayResources(data.resource_recommendations);

    displayExecutionRoadmap(data.execution_roadmap);

    addPlanControls(data);
}


/* Dashboard */

function displayDashboard(data) {

    const difficulty =
        data.requirement_analysis.difficulty;

    const available =
        data.project.available_days;

    const planned =
        data.project_plan.total_planned_days;

    const skillGap =
        data.project_plan.skill_gap || [];

    document.getElementById("difficulty").textContent =
        difficulty;

    document.getElementById("availableResult").textContent =
        available + " days";

    document.getElementById("plannedDays").textContent =
        planned + " days";

    document.getElementById("skillGapCount").textContent =
        skillGap.length;

    console.log("PlanX AI Dashboard Updated");
}


/* Student */

function displayStudent(student) {

    document.getElementById("studentResult").innerHTML = `

        <p>
            <strong>Name:</strong>
            ${escapeHTML(student.name)}
        </p>

        <p>
            <strong>Academic Year:</strong>
            ${escapeHTML(student.academic_year)}
        </p>

        <p>
            <strong>Experience:</strong>
            ${escapeHTML(student.experience_level)}
        </p>

        <h4>Skills</h4>

        <div>
            ${createTags(student.skills)}
        </div>

        <h4>Interests</h4>

        <div>
            ${createTags(student.interests)}
        </div>
    `;
}


/* Requirements */

function displayRequirements(analysis) {

    document.getElementById("requirementResult").innerHTML = `

        <p>
            <strong>Difficulty:</strong>
            ${escapeHTML(analysis.difficulty)}
        </p>

        <h4>Requirements</h4>

        ${createList(analysis.requirements)}

        <h4>Required Skills</h4>

        ${createTags(analysis.required_skills)}

    `;
}


/* Technologies */

function displayTechnologies(data) {

    let html = `

        <h4>Recommended Technologies</h4>

        <div>
            ${createTags(data.recommended_technologies)}
        </div>

        <h4>Why These Technologies?</h4>

        ${createList(data.reasons)}

        <h4>Student Skill Matches</h4>

        ${createTags(data.student_skill_matches)}
    `;

    document.getElementById("technologyResult").innerHTML =
        html;
}


/* Project Plan */

function displayProjectPlan(plan) {

    let html = `

        <p>
            <strong>Total Planned Days:</strong>
            ${plan.total_planned_days}
        </p>

        <p>
            <strong>Difficulty:</strong>
            ${escapeHTML(plan.difficulty)}
        </p>

        <h4>Skill Gap</h4>

        ${createTags(plan.skill_gap || [])}
    `;

    plan.phases.forEach(phase => {

        html += `

            <h4>
                Phase ${phase.phase}: 
                ${escapeHTML(phase.name)}
            </h4>

            <p>
                <strong>Duration:</strong>
                ${phase.duration} days
            </p>

            ${createList(phase.tasks)}
        `;
    });

    document.getElementById("projectPlanResult").innerHTML =
        html;
}


/* Learning Plan */

function displayLearningPlan(plan) {

    let html = `

        <p>
            <strong>Experience Level:</strong>
            ${escapeHTML(plan.experience_level)}
        </p>
    `;

    plan.skills_to_learn.forEach(skill => {

        html += `

            <h4>
                ${escapeHTML(skill.skill)}
            </h4>

            <p>
                <strong>Duration:</strong>
                ${skill.duration} days
            </p>

            <p>
                <strong>Topics:</strong>
            </p>

            ${createList(skill.topics)}
        `;
    });

    html += `

        <p>
            <strong>Total Learning Days:</strong>
            ${plan.total_learning_days}
        </p>
    `;

    document.getElementById("learningResult").innerHTML =
        html;
}


/* Resources */

function displayResources(data) {

    let html = `

        <p>
            <strong>Experience Level:</strong>
            ${escapeHTML(data.experience_level)}
        </p>
    `;

    data.recommendations.forEach(item => {

        html += `

            <h4>
                ${escapeHTML(item.skill)}
            </h4>
        `;

        item.resources.forEach(resource => {

            html += `

                <a
                    class="resource-link"
                    href="${escapeAttribute(resource.url)}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    📖 ${escapeHTML(resource.title)}
                    <small>
                        (${escapeHTML(resource.type)})
                    </small>
                </a>
            `;
        });

        html += `

            <p>
                <strong>Practice Tasks</strong>
            </p>

            ${createList(item.practice_tasks)}
        `;
    });

    document.getElementById("resourceResult").innerHTML =
        html;
}


/* Execution Roadmap */

function displayExecutionRoadmap(data) {

    let html = "";

    const roadmap =
        data.daily_roadmap || [];

    roadmap.forEach(day => {

        html += `
            <div class="timeline-item">

                <div class="day">
                    DAY ${day.day}
                </div>

                <div class="phase">
                    PHASE ${day.phase} —
                    ${escapeHTML(day.phase_name)}
                </div>

                <div class="task">
                    ${escapeHTML(day.task)}
                </div>

            </div>
        `;
    });

    if (roadmap.length === 0) {

        html = `
            <p>
                No execution roadmap available.
            </p>
        `;
    }

    document.getElementById("executionResult").innerHTML =
        html;
}


/* Create HTML list */

function createList(items) {

    if (!items || items.length === 0) {
        return "<p>No information available.</p>";
    }

    return `
        <ul>
            ${items.map(item => `
                <li>${escapeHTML(item)}</li>
            `).join("")}
        </ul>
    `;
}


/* Create tags */

function createTags(items) {

    if (!items || items.length === 0) {
        return "<span>No information</span>";
    }

    return items.map(item => `
        <span class="tag">
            ${escapeHTML(item)}
        </span>
    `).join("");
}


/* Security helpers */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function escapeAttribute(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}



function createTimeline(data) {

    const phases = data.project_plan.phases || [];

    let currentDay = 1;
    let html = "";

    phases.forEach(phase => {

        const startDay = currentDay;
        const endDay = currentDay + phase.duration - 1;

        const progress =
            (phase.duration / data.project_plan.total_planned_days) * 100;

        html += `
            <div class="timeline-card">

                <div class="timeline-header">

                    <div>
                        <span class="phase-number">
                            PHASE ${phase.phase}
                        </span>

                        <h3>${escapeHTML(phase.name)}</h3>
                    </div>

                    <span class="duration">
                        ${phase.duration} Days
                    </span>

                </div>

                <div class="timeline-days">
                    Day ${startDay} – Day ${endDay}
                </div>

                <div class="progress-bar">
                    <div
                        class="progress-fill"
                        style="width: ${progress}%">
                    </div>
                </div>

                <ul>
                    ${phase.tasks.map(task => `
                        <li>${escapeHTML(task)}</li>
                    `).join("")}
                </ul>

            </div>
        `;

        currentDay = endDay + 1;
    });

    const timelineContainer =
        document.getElementById("projectTimeline");

    if (timelineContainer) {
        timelineContainer.innerHTML = html;
    }
}

function createSkillGap(data) {

    const skillGap =
        data.project_plan.skill_gap || [];

    const container =
        document.getElementById("skillGapContainer");

    if (!container) {
        return;
    }

    if (skillGap.length === 0) {
        container.innerHTML = `
            <div class="no-skill-gap">
                🎉 No major skill gaps detected!
            </div>
        `;
        return;
    }

    const icons = {
        "Machine Learning": "🤖",
        "OpenCV": "👁️",
        "Data Processing": "📊"
    };

    container.innerHTML = skillGap.map(skill => {

        const icon = icons[skill] || "📚";

        return `
            <div class="skill-card">

                <div class="skill-icon">
                    ${icon}
                </div>

                <div class="skill-info">

                    <h3>${escapeHTML(skill)}</h3>

                    <span class="skill-status">
                        NEED TO LEARN
                    </span>

                </div>

            </div>
        `;

    }).join("");
}


/* =========================================
   PLANX AI - ACTION CONTROLS
========================================= */

function addPlanControls(data) {

    const results = document.getElementById("results");

    if (!results) {
        return;
    }

    const oldControls = document.getElementById("planControls");

    if (oldControls) {
        oldControls.remove();
    }

    const controls = document.createElement("div");

    controls.id = "planControls";

    controls.innerHTML = `
        <div class="plan-controls">

            <button
                class="plan-action download-action"
                id="downloadPlanBtn">
                📥 Download Plan
            </button>

            <button
                class="plan-action pdf-action"
                id="downloadPdfBtn">
                📄 Download PDF
            </button>

            <button
                class="plan-action print-action"
                id="printPlanBtn">
                🖨️ Print Plan
            </button>

            <button
                class="plan-action"
                id="newPlanBtn">
                🔄 Plan Another Project
            </button>

        </div>
    `;

    results.appendChild(controls);


    /* =========================
       DOWNLOAD JSON PLAN
    ========================= */

    const downloadPlanBtn =
        document.getElementById("downloadPlanBtn");

    if (downloadPlanBtn) {

        downloadPlanBtn.addEventListener("click", function () {

            const jsonData =
                JSON.stringify(data, null, 2);

            const blob = new Blob(
                [jsonData],
                { type: "application/json" }
            );

            const url =
                URL.createObjectURL(blob);

            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                "PlanX-AI-" +
                (data.project?.project_name || "Project")
                    .replace(/\s+/g, "-") +
                "-Plan.json";

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

            URL.revokeObjectURL(url);

        });

    }


    /* =========================
       DOWNLOAD PDF
    ========================= */

    const downloadPdfBtn =
        document.getElementById("downloadPdfBtn");

    if (downloadPdfBtn) {

        downloadPdfBtn.addEventListener("click", function () {

            if (!window.jspdf) {

                alert("PDF generator is not available.");

                return;
            }

            const { jsPDF } = window.jspdf;

            const pdf = new jsPDF();

            const projectName =
                data.project?.project_name ||
                "Project";

            let y = 20;

            pdf.setFontSize(20);

            pdf.text(
                "PlanX AI - Project Plan",
                20,
                y
            );

            y += 12;

            pdf.setFontSize(14);

            pdf.text(
                "Project: " + projectName,
                20,
                y
            );

            y += 10;

            pdf.setFontSize(11);

            pdf.text(
                "Student: " +
                (data.student?.name || ""),
                20,
                y
            );

            y += 8;

            pdf.text(
                "Academic Year: " +
                (data.student?.academic_year || ""),
                20,
                y
            );

            y += 8;

            pdf.text(
                "Experience: " +
                (data.student?.experience_level || ""),
                20,
                y
            );

            y += 12;

            pdf.setFontSize(14);

            pdf.text(
                "Project Plan",
                20,
                y
            );

            y += 10;

            pdf.setFontSize(11);

            const plan =
                data.project_plan;

            if (plan) {

                pdf.text(
                    "Difficulty: " +
                    (plan.difficulty || ""),
                    20,
                    y
                );

                y += 8;

                pdf.text(
                    "Total Planned Days: " +
                    (plan.total_planned_days || ""),
                    20,
                    y
                );

                y += 12;

                const phases =
                    plan.phases || [];

                phases.forEach(phase => {

                    if (y > 270) {

                        pdf.addPage();

                        y = 20;
                    }

                    pdf.setFontSize(12);

                    pdf.text(
                        "Phase " +
                        phase.phase +
                        ": " +
                        phase.name,
                        20,
                        y
                    );

                    y += 7;

                    pdf.setFontSize(10);

                    pdf.text(
                        "Duration: " +
                        phase.duration +
                        " days",
                        25,
                        y
                    );

                    y += 7;

                    const tasks =
                        phase.tasks || [];

                    tasks.forEach(task => {

                        if (y > 275) {

                            pdf.addPage();

                            y = 20;
                        }

                        const lines =
                            pdf.splitTextToSize(
                                "• " + task,
                                165
                            );

                        pdf.text(
                            lines,
                            30,
                            y
                        );

                        y +=
                            lines.length * 5 + 2;

                    });

                    y += 5;

                });

            }

            pdf.save(
                "PlanX-AI-" +
                projectName
                    .replace(/\s+/g, "-") +
                "-Plan.pdf"
            );

        });

    }


    /* =========================
       PRINT PLAN
    ========================= */

    const printPlanBtn =
        document.getElementById("printPlanBtn");

    if (printPlanBtn) {

        printPlanBtn.addEventListener(
            "click",
            function () {

                window.print();

            }
        );

    }


    /* =========================
       PLAN ANOTHER PROJECT
    ========================= */

    const newPlanBtn =
        document.getElementById("newPlanBtn");

    if (newPlanBtn) {

        newPlanBtn.addEventListener(
            "click",
            function () {

                form.reset();

                results.classList.add("hidden");

                loading.classList.add("hidden");

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }

}


