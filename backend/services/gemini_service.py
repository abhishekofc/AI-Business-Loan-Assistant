from google import genai
from config import GEMINI_API_KEY

client = genai.Client(api_key=GEMINI_API_KEY)

MODELS = [
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite",
    "gemini-3.1-flash-lite",
    "gemini-3.5-flash",
]


class GeminiService:

    @staticmethod
    def generate_answer(prompt: str):

        last_error = None

        for model in MODELS:
            try:

                response = client.models.generate_content(
                    model=model,
                    contents=prompt,
                )

                return response.text

            except Exception as e:
                print(f"{model} failed -> {e}")
                last_error = e

        return f"All Gemini models failed.\n{last_error}"