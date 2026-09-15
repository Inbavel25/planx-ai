from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import ProjectRequest
from agents.requirement_agent import analyze_project
from agents.technology_agent import recommend_technologies
from agents.planning_agent import create_project_plan
from agents.learning_agent import create_learning_plan
from agents.resource_agent import recommend_resources
from agents.execution_agent import create_execution_roadmap

app = FastAPI(
    title="PlanX AI",
    description="AI-powered personalized student project planning system",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Welcome to PlanX AI",
        "status": "Backend is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/project")
def create_project(request: ProjectRequest):

    analysis = analyze_project(
        request.project.description
    )

    technology_analysis = recommend_technologies(
        request.project.description,
        request.student.skills
    )

    project_plan = create_project_plan(
        request.project.project_name,
        request.project.available_days,
        analysis["difficulty"],
        request.student.skills,
        analysis["required_skills"]
    )

    learning_plan = create_learning_plan(
    analysis["required_skills"],
    request.student.experience_level
    )

    resource_recommendations = recommend_resources(
    learning_plan["skills_to_learn"],
    request.student.experience_level
    )

    execution_roadmap = create_execution_roadmap(
    project_plan["phases"]
    )

    return {
        "message": "Project analyzed successfully",

        "student": {
            "name": request.student.name,
            "academic_year": request.student.academic_year,
            "skills": request.student.skills,
            "experience_level": request.student.experience_level,
            "interests": request.student.interests
        },

        "project": {
            "project_name": request.project.project_name,
            "description": request.project.description,
            "project_type": request.project.project_type,
            "available_days": request.project.available_days,
            "technology_preferences": request.project.technology_preferences,
            "constraints": request.project.constraints
        },

        "requirement_analysis": analysis,

        "technology_analysis": technology_analysis,

        "project_plan": project_plan,

        "learning_plan": learning_plan,

        "resource_recommendations": resource_recommendations,

        "execution_roadmap": execution_roadmap
    }