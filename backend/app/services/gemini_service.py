import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def load_prompt(filename: str):

    prompt_path = os.path.join(
        os.path.dirname(__file__),
        "..",
        "prompts",
        filename
    )

    with open(prompt_path, "r", encoding="utf-8") as file:
        return file.read()


from google.genai import errors

def generate_response(system_prompt: str, user_input: str):
    prompt = f"""
{system_prompt}

User Input:
{user_input}
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return {
            "success": True,
            "response": response.text
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
    except Exception as e:

        if "429" in str(e):
            return {
                "success": True,
                "response": """
                {
                    "battle_plan":[
                    {
                        "task":"Finish Dashboard",
                        "start":"09:00",
                        "end":"11:00",
                        "reason":"Highest priority task"
                    }
                    ],
                    "focus_tip":"Work in 25 minute blocks",
                    "energy_prediction":"High"
                }
                """
            }

        return {
            "success": False,
            "error": str(e)
        }