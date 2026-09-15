def recommend_technologies(project_description, student_skills):

    description = project_description.lower()
    skills = [skill.lower() for skill in student_skills]

    technologies = []
    reasons = []

    if "image" in description or "classification" in description or "computer vision" in description:

        technologies = [
            "Python",
            "OpenCV",
            "TensorFlow",
            "FastAPI",
            "HTML",
            "CSS",
            "JavaScript"
        ]

        reasons = [
            "Python is suitable for AI and machine learning development.",
            "OpenCV can be used for image processing.",
            "TensorFlow can be used to build the image classification model.",
            "FastAPI can connect the AI model with the application.",
            "HTML, CSS and JavaScript can be used for the user interface."
        ]

    elif "website" in description or "web application" in description or "web" in description:

        technologies = [
            "HTML",
            "CSS",
            "JavaScript",
            "FastAPI",
            "SQLite"
        ]

        reasons = [
            "HTML and CSS can create the user interface.",
            "JavaScript can provide frontend functionality.",
            "FastAPI can provide backend APIs.",
            "SQLite is suitable for a small college project."
        ]

    else:

        technologies = [
            "Python",
            "FastAPI",
            "HTML",
            "CSS",
            "JavaScript",
            "SQLite"
        ]

        reasons = [
            "Python provides simple and flexible application development.",
            "FastAPI can be used to build backend APIs.",
            "HTML and CSS can create the user interface.",
            "JavaScript can provide frontend interaction.",
            "SQLite is suitable for storing project data."
        ]

    matched_skills = []

    for technology in technologies:
        if technology.lower() in skills:
            matched_skills.append(technology)

    return {
        "recommended_technologies": technologies,
        "reasons": reasons,
        "student_skill_matches": matched_skills
    }

