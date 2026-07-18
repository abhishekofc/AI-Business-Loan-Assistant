# import os

# from dotenv import load_dotenv
# from elevenlabs.client import ElevenLabs

# load_dotenv()

# client = ElevenLabs(
#     api_key=os.getenv("ELEVENLABS_API_KEY")
# )


# def speak(text: str):
#     audio = client.text_to_speech.convert(
#         voice_id="21m00Tcm4TlvDq8ikWAM",  # Rachel
#         model_id="eleven_multilingual_v2",
#         text=text,
#         output_format="mp3_44100_128"
#     )

#     return b"".join(audio)



import asyncio
import os
import tempfile

import edge_tts


VOICE = "en-US-AriaNeural"


async def _generate_audio(text: str):
    communicate = edge_tts.Communicate(text, VOICE)

    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp:
        temp_path = temp.name

    await communicate.save(temp_path)

    with open(temp_path, "rb") as f:
        audio_bytes = f.read()

    os.remove(temp_path)

    return audio_bytes


def speak(text: str):
    return asyncio.run(_generate_audio(text))