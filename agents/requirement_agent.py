def analyze_project(project_description: str):
    description = project_description.lower()

    requirements = []
    modules = []
    skills = []

    if "image" in description or "classification" in description:
        requirements.extend([
            "Image input",
            "Image preprocessing",
            "Classification system",
            "Prediction output"
        ])

        modules.extend([
            "Image Upload",
            "Image Processing",
            "Model Training",
            "Classification",
            "Result Display"
        ])

        skills.extend([
            "Python",
            "Machine Learning",
            "OpenCV",
            "Data Processing"
        ])

        difficulty = "Intermediate"

    elif "website" in description or "web" in description:
        requirements.extend([
            "User interface",
            "Backend API",
            "Database",
            "Data management"
        ])

        modules.extend([
            "Frontend",
            "Backend",
            "Database",
            "Authentication",
            "Testing"
        ])

        skills.extend([
            "HTML",
            "CSS",
            "JavaScript",
            "Backend Development",
            "Database"
        ])

        difficulty = "Beginner to Intermediate"

    else:
        requirements.extend([
            "Requirement analysis",
            "Core application logic",
            "User interface",
            "Data management",
            "Testing"
        ])

        modules.extend([
            "User Interface",
            "Core Logic",
            "Data Management",
            "Testing"
        ])

        skills.extend([
            "Programming",
            "Problem Solving",
            "Database Basics"
        ])

        difficulty = "Intermediate"

    return {
        "difficulty": difficulty,
        "requirements": requirements,
        "modules": modules,
        "required_skills": skills
    }


