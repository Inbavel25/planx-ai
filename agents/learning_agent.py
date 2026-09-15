def create_learning_plan(skill_gap, experience_level):

    learning_resources = {
        "Machine Learning": {
            "topics": [
                "Machine Learning fundamentals",
                "Classification algorithms",
                "Model training",
                "Model evaluation"
            ],
            "duration": 4
        },

        "OpenCV": {
            "topics": [
                "Image reading",
                "Image resizing",
                "Image preprocessing",
                "Image manipulation"
            ],
            "duration": 3
        },

        "Data Processing": {
            "topics": [
                "Dataset cleaning",
                "Data organization",
                "Train and test data splitting",
                "Data preprocessing"
            ],
            "duration": 3
        }
    }

    learning_plan = []

    for skill in skill_gap:

        if skill in learning_resources:

            learning_plan.append({
                "skill": skill,
                "experience_level": experience_level,
                "topics": learning_resources[skill]["topics"],
                "duration": learning_resources[skill]["duration"]
            })

    total_learning_days = sum(
        item["duration"] for item in learning_plan
    )

    return {
        "experience_level": experience_level,
        "skills_to_learn": learning_plan,
        "total_learning_days": total_learning_days
    }

if __name__ == "__main__":

    skill_gap = [
        "Machine Learning",
        "OpenCV",
        "Data Processing"
    ]

    result = create_learning_plan(
        skill_gap,
        "Beginner"
    )

    print(result)