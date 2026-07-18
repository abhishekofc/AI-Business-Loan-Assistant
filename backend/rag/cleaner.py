import re


def clean_text(text: str) -> str:
    # Normalize line endings
    text = text.replace("\r\n", "\n").replace("\r", "\n")

    # Remove extra spaces but preserve new lines
    text = re.sub(r"[ \t]+", " ", text)

    # Remove too many blank lines
    text = re.sub(r"\n{3,}", "\n\n", text)

    return text.strip()


if __name__ == "__main__":
    sample = """
    Hello      World


    This    is     AI.
    """

    print(clean_text(sample))