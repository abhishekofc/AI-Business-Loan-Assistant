import requests

from stt import record_audio, speech_to_text
from tts import speak

from state.conversation_manager import ConversationManager
from state.call_state import CallState

API_URL = "http://127.0.0.1:8000/search"

manager = ConversationManager()

# Conversation memory
conversation_history = []


def ask_ai(question):

    try:
        response = requests.post(
            API_URL,
            json={
                "query": question,
                "history": conversation_history[-10:]
            },
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
        "Hello! Welcome to ABC Loan Services. "
        "Are you looking for a Personal Loan or a Business Loan?"
    )

    print(f"\n🤖 {greeting}")
    speak(greeting)

    while True:

        print("\nListening...\n")

        record_audio()

        question = speech_to_text().strip()

        if not question:
            print("Didn't catch that.")
            continue

        print(f"\n🧑 You: {question}")

        # Exit
        if question.lower() in [
            "bye",
            "goodbye",
            "exit",
            "quit"
        ]:

            farewell = "Thank you for calling. Have a great day."

            print(f"\n🤖 {farewell}")
            speak(farewell)
            break

        # -----------------------------
        # STATE : GREETING
        # -----------------------------
        if manager.state == CallState.GREETING:

            if "business" in question.lower():

                manager.set_loan_type("Business Loan")

                reply = (
                    "Great! You selected Business Loan. "
                    "May I know your age?"
                )

                print(f"\n🤖 {reply}")
                speak(reply)

                continue

            elif "personal" in question.lower():

                manager.set_loan_type("Personal Loan")

                reply = (
                    "Great! You selected Personal Loan. "
                    "May I know your age?"
                )

                print(f"\n🤖 {reply}")
                speak(reply)

                continue

            else:

                reply = (
                    "Please choose either Personal Loan or Business Loan."
                )

                print(f"\n🤖 {reply}")
                speak(reply)

                continue

        # -----------------------------
        # STATE : ELIGIBILITY
        # -----------------------------
        if manager.state == CallState.ELIGIBILITY:

            try:

                age = int(question)

                eligible = manager.set_age(age)

                if eligible:

                    manager.state = CallState.FAQ

                    reply = (
                        "Great! You are eligible. "
                        "Please keep your PAN Card, Aadhaar Card and "
                        "Bank Statements ready. "
                        "Now you can ask me anything about your loan."
                    )

                else:

                    reply = (
                        "Sorry. The minimum age for applying is 21 years."
                    )

                print(f"\n🤖 {reply}")
                speak(reply)

                continue

            except ValueError:

                reply = "Please tell me your age in numbers."

                print(f"\n🤖 {reply}")
                speak(reply)

                continue

        # -----------------------------
        # STATE : FAQ (RAG)
        # -----------------------------
        if manager.state == CallState.FAQ:

            conversation_history.append({
                "role": "user",
                "content": question
            })

            answer = ask_ai(question)

            conversation_history.append({
                "role": "assistant",
                "content": answer
            })

            print(f"\n🤖 {answer}")

            speak(answer)


if __name__ == "__main__":
    main()