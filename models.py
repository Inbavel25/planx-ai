from pydantic import BaseModel
from typing import List


class StudentProfile(BaseModel):
    name: str
    academic_year: str
    skills: List[str]
    experience_level: str
    interests: List[str]


class ProjectInput(BaseModel):
    project_name: str
    description: str
    project_type: str
    available_days: int
    technology_preferences: List[str]
    constraints: List[str]


class ProjectRequest(BaseModel):
    student: StudentProfile
    project: ProjectInput