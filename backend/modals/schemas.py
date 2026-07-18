import requests

from stt import record_audio, speech_to_text
from tts import speak

API_URL = "http://127.0.0.1:8000/search"


def ask_ai(question):

    try:
        response = requests.post(
            API_URL,
            json={"query": question},
            timeout=30
        )

        response.raise_for_status()

        return response.json()["answer"]

    except Exception as e:
        print("Error:", e)
        return "Sorry, I couldn't process your request."


def main():

    print("=" * 60)
    print("🤖 AI Loan Assistant Started")
    print("=" * 60)

    greeting = (
        "Hello! Welcome to our AI Loan Assistant. "
        "How may I help you today?"
    )

    print(f"\n🤖 {greeting}")
    speak(greeting)

    while True:

        print("\nListening...\n")

        record_audio()

        question = speech_to_text()

        print(f"\n🧑 You: {question}")

        if question.strip().lower() in [
            "bye",
            "exit",
            "quit",
            "goodbye"
        ]:

            farewell = (
                "Thank you for calling. "
                "Have a wonderful day."
            )

            print(f"\n🤖 {farewell}")
            speak(farewell)
            break

        answer = ask_ai(question)

        print(f"\n🤖 Assistant: {answer}")

        speak(answer)


if __name__ == "__main__":
    main()