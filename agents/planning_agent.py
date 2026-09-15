def create_project_plan(project_name, available_days, difficulty, student_skills, required_skills):
    skill_gap = [
        skill for skill in required_skills
        if skill.lower() not in [s.lower() for s in student_skills]
    ]

    phases = [
        {
            "phase": 1,
            "name": "Requirement Analysis",
            "duration": 3,
            "tasks": [
                "Understand project requirements",
                "Define project objectives",
                "Identify required modules"
            ]
        },
        {
            "phase": 2,
            "name": "Skill Development",
            "duration": 4,
            "tasks": [
                f"Learn {skill}" for skill in skill_gap
            ]
        },
        {
            "phase": 3,
            "name": "Research and Dataset Collection",
            "duration": 5,
            "tasks": [
                "Research existing solutions",
                "Collect required dataset",
                "Organize the dataset"
            ]
        },
        {
            "phase": 4,
            "name": "Data Preprocessing",
            "duration": 5,
            "tasks": [
                "Clean the dataset",
                "Resize and preprocess images",
                "Prepare training and testing data"
            ]
        },
        {
            "phase": 5,
            "name": "Model Development",
            "duration": 10,
            "tasks": [
                "Select machine learning model",
                "Train the model",
                "Evaluate model performance"
            ]
        },
        {
            "phase": 6,
            "name": "Backend Development",
            "duration": 5,
            "tasks": [
                "Create backend API",
                "Connect the trained model",
                "Implement prediction functionality"
            ]
        },
        {
            "phase": 7,
            "name": "Frontend Development",
            "duration": 5,
            "tasks": [
                "Create user interface",
                "Add image upload functionality",
                "Display prediction results"
            ]
        },
        {
            "phase": 8,
            "name": "Testing",
            "duration": 4,
            "tasks": [
                "Test different inputs",
                "Fix errors",
                "Verify prediction accuracy"
            ]
        },
        {
            "phase": 9,
            "name": "Documentation and Presentation",
            "duration": 3,
            "tasks": [
                "Prepare project documentation",
                "Create presentation",
                "Prepare project demonstration"
            ]
        }
    ]

    

    total_days = sum(phase["duration"] for phase in phases)

    return {
        "project_name": project_name,
        "available_days": available_days,
        "difficulty": difficulty,
        "student_skills": student_skills,
        "required_skills": required_skills,
        "skill_gap": skill_gap,
        "total_planned_days": total_days,
        "phases": phases
    }

