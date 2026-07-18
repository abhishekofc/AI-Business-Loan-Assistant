from typing import Dict

QUESTIONS = [
    {
        "key": "age",
        "question": "What is your age?"
    },
    {
        "key": "registered",
        "question": "Is your business registered? (Yes/No)"
    },
    {
        "key": "years",
        "question": "How many years has your business been operating?"
    },
    {
        "key": "turnover",
        "question": "What is your approximate annual turnover?"
    },
    {
        "key": "loan_amount",
        "question": "What loan amount do you require?"
    }
]


class LoanWorkflow:

    def __init__(self):
        self.active = False
        self.current_step = 0
        self.answers: Dict[str, str] = {}

    def start(self):
        self.active = True
        self.current_step = 0
        self.answers = {}

        return (
            "Sure! I'll help you check your business loan eligibility.\n\n"
            + QUESTIONS[0]["question"]
        )

    def process_answer(self, answer: str):

        key = QUESTIONS[self.current_step]["key"]
        self.answers[key] = answer

        self.current_step += 1

        if self.current_step >= len(QUESTIONS):
            self.active = False
            return self.evaluate()

        return QUESTIONS[self.current_step]["question"]

    def evaluate(self):

        age = int(self.answers.get("age", "0"))

        if age < 21:
            return (
                "Unfortunately, you are not eligible because applicants "
                "must be at least 21 years old."
            )

        return f"""
✅ Based on the information you provided, you appear eligible.

Summary

• Age: {self.answers["age"]}
• Business Registered: {self.answers["registered"]}
• Years in Business: {self.answers["years"]}
• Annual Turnover: {self.answers["turnover"]}
• Loan Amount: {self.answers["loan_amount"]}

Required Documents

• Aadhaar Card
• PAN Card
• GST Certificate
• Bank Statements (Last 6 Months)
• Income Tax Returns (ITR)

Our loan officer will verify these documents before approval.
"""