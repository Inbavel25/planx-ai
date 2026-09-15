def create_execution_roadmap(phases):

    roadmap = []
    current_day = 1

    for phase in phases:

        duration = phase["duration"]
        tasks = phase["tasks"]

        for day in range(duration):

            if day < len(tasks):
                task = tasks[day]
            else:
                task = "Practice and revision"

            roadmap.append({
                "day": current_day,
                "phase": phase["phase"],
                "phase_name": phase["name"],
                "task": task
            })

            current_day += 1

    return {
        "total_execution_days": len(roadmap),
        "daily_roadmap": roadmap
    }


if __name__ == "__main__":

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
                "Learn Machine Learning",
                "Learn OpenCV",
                "Learn Data Processing"
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

    result = create_execution_roadmap(phases)

    print(result)

    