print("✅ Step 1: Starting script...")

import time
import sounddevice as sd
from scipy.io.wavfile import write
from faster_whisper import WhisperModel

print("✅ Step 2: Libraries imported")

print("⏳ Step 3: Loading Whisper model...")

try:
    model = WhisperModel(
        "base",
        device="cpu",
        compute_type="int8"
    )
    print("✅ Step 4: Whisper model loaded successfully!")

except Exception as e:
    print("❌ Failed to load Whisper model")
    print(e)
    exit()


def record_audio(filename="input.wav", duration=8, sample_rate=16000):
    print("\n🎤 Recording will start in 3 seconds...")

    for i in range(3, 0, -1):
        print(f"{i}...")
        time.sleep(1)

    print("🎙️ Speak clearly now!")

    recording = sd.rec(
        int(duration * sample_rate),
        samplerate=sample_rate,
        channels=1,
        dtype="int16"
    )

    sd.wait()

    write(filename, sample_rate, recording)

    print("✅ Recording complete.\n")


def speech_to_text(filename="input.wav"):
    print("⏳ Transcribing audio...")

    segments, info = model.transcribe(
        filename,
        beam_size=5
    )

    text = " ".join(segment.text for segment in segments)

    return text.strip()


if __name__ == "__main__":

    print("🚀 Starting Speech-to-Text Demo")

    record_audio()

    text = speech_to_text()

    print("\n==============================")
    print("📝 Recognized Text:")
    print(text)
    print("==============================")