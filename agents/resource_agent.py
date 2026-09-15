def recommend_resources(skills_to_learn, experience_level):

    resources = {
        "Machine Learning": {
            "resources": [
                {
                    "type": "Documentation",
                    "title": "Scikit-learn User Guide",
                    "url": "https://scikit-learn.org/stable/user_guide.html"
                },
                {
                    "type": "Tutorial",
                    "title": "Google Machine Learning Crash Course",
                    "url": "https://developers.google.com/machine-learning/crash-course"
                }
            ],
            "practice_tasks": [
                "Learn basic classification",
                "Train a simple classification model",
                "Evaluate model accuracy"
            ]
        },

        "OpenCV": {
            "resources": [
                {
                    "type": "Documentation",
                    "title": "OpenCV Documentation",
                    "url": "https://docs.opencv.org/"
                }
            ],
            "practice_tasks": [
                "Read an image using OpenCV",
                "Resize an image",
                "Convert an image to grayscale",
                "Apply basic image preprocessing"
            ]
        },

        "Data Processing": {
            "resources": [
                {
                    "type": "Documentation",
                    "title": "Pandas Documentation",
                    "url": "https://pandas.pydata.org/docs/"
                }
            ],
            "practice_tasks": [
                "Load a dataset",
                "Clean missing or invalid data",
                "Organize dataset folders",
                "Split data into training and testing sets"
            ]
        }
    }

    recommendations = []

    for item in skills_to_learn:

        skill = item["skill"]

        if skill in resources:

            recommendations.append({
                "skill": skill,
                "experience_level": experience_level,
                "resources": resources[skill]["resources"],
                "practice_tasks": resources[skill]["practice_tasks"]
            })

    return {
        "experience_level": experience_level,
        "recommendations": recommendations
    }


if __name__ == "__main__":

    skills = [
        {
            "skill": "Machine Learning"
        },
        {
            "skill": "OpenCV"
        },
        {
            "skill": "Data Processing"
        }
    ]

    result = recommend_resources(
        skills,
        "Beginner"
    )

    print(result)