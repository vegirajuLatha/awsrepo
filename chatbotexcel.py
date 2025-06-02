import os
from langchain_groq import ChatGroq
from langchain_community.utilities.wikipedia import WikipediaAPIWrapper
from crewai import Agent, Task, Crew, Process

# === Set your Groq API key ===
GROQ_API_KEY = "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"

# === Initialize the language model ===
llm = ChatGroq(
    model="llama3-70b",
    temperature=0.5,
    groq_api_key=GROQ_API_KEY
)

# === Wikipedia research wrapper ===
wikipedia_api_wrapper = WikipediaAPIWrapper()

# === Define Agents ===

researcher = Agent(
    role='Tech Skills Researcher',
    goal="Identify and explain top 5 most important tech skills for 2024",
    backstory="A tech research specialist tracking AI, ML, cloud, cybersecurity, and data trends.",
    verbose=True,
    allow_delegation=False,
    llm=llm
)

writer = Agent(
    role='LinkedIn Content Writer',
    goal="Write fun and engaging LinkedIn posts about tech skills",
    backstory="A social media creator who turns technical content into viral, emoji-filled posts.",
    verbose=True,
    allow_delegation=False,
    llm=llm
)

editor = Agent(
    role='Content Editor',
    goal="Polish LinkedIn posts for clarity, engagement, and professionalism",
    backstory="A sharp editor skilled in refining short-form social content for professional platforms.",
    verbose=True,
    allow_delegation=False,
    llm=llm
)

# === Manual research function ===
def get_research_data():
    skills = ["Artificial Intelligence", "Machine Learning", "Cloud Computing", "Cybersecurity", "Data Science"]
    research_data = []

    for skill in skills:
        try:
            info = wikipedia_api_wrapper.run(skill)
            summary = info[:300].replace('\n', ' ') + "..."
            research_data.append(f"{skill}: {summary}")
        except:
            research_data.append(f"{skill}: A key technology for 2024 with strong career demand.")

    return "\n".join(research_data)

# === Define Tasks ===

task1 = Task(
    description=f"""
    Analyze the top 5 tech skills for 2024 using this research:
    {get_research_data()}

    For each skill, describe:
    - What it is
    - Why it's important
    - Career roles it leads to
    - Salary potential

    Present this as a bullet-pointed report.
    """,
    agent=researcher,
    expected_output="Detailed report of 5 tech skills with bullet points"
)

task2 = Task(
    description="""
    Turn the report into a 200-word LinkedIn post.

    Include:
    - Eye-catching headline (<30 characters)
    - Emojis 🌟
    - Clear call-to-action
    - Professional + conversational tone
    """,
    agent=writer,
    expected_output="LinkedIn post draft with emojis and strong engagement"
)

task3 = Task(
    description="""
    Edit the LinkedIn post:
    - Grammar and spelling perfect
    - Headline is punchy and <30 characters
    - Emojis are balanced
    - Word count < 200
    - Call-to-action clear
    """,
    agent=editor,
    expected_output="Final polished LinkedIn post"
)

# === Create the Crew ===
crew = Crew(
    agents=[researcher, writer, editor],
    tasks=[task1, task2, task3],
    process=Process.sequential,
    verbose=True
)

# === Main execution ===
if __name__ == "__main__":
    print("🚀 Starting LinkedIn Post Generator...")
    print("=" * 60)

    try:
        result = crew.kickoff()
        print("\n" + "=" * 60)
        print("✅ FINAL LINKEDIN POST:")
        print("=" * 60)
        print(result)
    except Exception as e:
        print(f"❌ Error: {str(e)}")