import os
from openai import OpenAI
import streamlit as st
from youtube_transcript_api import YouTubeTranscriptApi
from langchain.text_splitter import RecursiveCharacterTextSplitter
from moviepy import VideoFileClip
import re
import whisper

def load_whisper_model():
    model = whisper.load_model("base")  # You can use "base", "small", or "large" models
    return model

def load_environment():
    api_key = os.getenv('GROQ_API_KEY')
    if not api_key:
        st.error("Please set the GROQ_API_KEY environment variable")
        st.stop()
    return api_key

# Initialize Groq client
try:
    api_key = load_environment()
    groq_client = OpenAI(
        api_key=api_key,
        base_url="https://api.groq.com/openai/v1"
    )
except Exception as e:
    st.error(f"Error initializing API client: {str(e)}")
    st.stop()

def extract_audio(video_path, output_audio_path):
    try:
        video = VideoFileClip(video_path)
        video.audio.write_audiofile(output_audio_path, codec="pcm_s16le")
        return output_audio_path
    except Exception as e:
        raise ValueError(f"Error extracting audio: {str(e)}")    
    
# Transcribe audio using Whisper
def transcribe_audio(audio_path, model):
    try:
        result = model.transcribe(audio_path)
        return result["text"]
    except Exception as e:
        raise ValueError(f"Error transcribing audio: {str(e)}")    

def create_summary_prompt(text, target_language, mode='video'):
    """Create an optimized prompt for summarization in the target language and mode"""
    language_prompts = {
        'en': {
            'title': 'TITLE',
            'overview': 'OVERVIEW',
            'key_points': 'KEY POINTS',
            'takeaways': 'MAIN TAKEAWAYS',
            'context': 'CONTEXT & IMPLICATIONS'
        },
    }

    prompts = language_prompts.get(target_language, language_prompts['en'])

    system_prompt = f"""You are an expert content analyst and summarizer. Create a comprehensive 
        summary in {target_language}. Ensure all content is fully translated and culturally adapted 
        to the target language."""

    user_prompt = f"""Please provide a detailed summary of the following content in {target_language}. 
        Structure your response as follows:

        🎯 {prompts['title']}: Create a descriptive title

        📝 {prompts['overview']} (2-3 sentences):
        - Provide a brief context and main purpose

        🔑 {prompts['key_points']}:
        - Extract and explain the main arguments
        - Include specific examples
        - Highlight unique perspectives

        💡 {prompts['takeaways']}:
        - List 3-5 practical insights
        - Explain their significance

        🔄 {prompts['context']}:
        - Broader context discussion
        - Future implications

        Text to summarize: {text}

        Ensure the summary is comprehensive enough for someone who hasn't seen the original content."""

    return system_prompt, user_prompt

def summarize_with_langchain_and_openai(transcript, language_code, model_name='llama-3.1-8b-instant', mode='video'):
    # Initial split with larger chunks
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=7000,  # Keep this to ensure we have room for prompts
        chunk_overlap=1000,
        length_function=len
    )
    texts = text_splitter.split_text(transcript)
    
    # Create context-rich intermediate summaries
    intermediate_summaries = []
    
    for i, text_chunk in enumerate(texts):
        # Customized system prompt for intermediate summaries
        system_prompt = f"""You are an expert content summarizer. Create a detailed 
        summary of section {i+1} in {language_code}. Maintain important details, arguments, 
        and connections. This summary will later be part of a comprehensive final summary."""

        # Customized user prompt for intermediate summaries
        user_prompt = f"""Create a detailed summary of the following section. 
        Maintain all important information, arguments, and connections.
        Pay special attention to:
        - Main topics and arguments
        - Important details and examples
        - Connections with other mentioned topics
        - Key statements and conclusions

        Text: {text_chunk}"""
        
        try:
            response = groq_client.chat.completions.create(
                model=model_name,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.7,
                max_tokens=8000  # Increased to maximum available tokens
            )
            
            summary = response.choices[0].message.content
            intermediate_summaries.append(summary)
            
        except Exception as e:
            st.error(f"Error with Groq API during intermediate summarization: {str(e)}")
            return None
    
    # Combine intermediate summaries
    combined_summary = "\n\n=== Next Section ===\n\n".join(intermediate_summaries)
    
    # Final summary with optimized prompt
    final_system_prompt = f"""You are an expert in creating comprehensive summaries. 
    Create a coherent, well-structured complete summary in {language_code} from the 
    provided intermediate summaries. Connect the information logically and establish 
    important relationships."""
    
    final_user_prompt = f"""Create a final, comprehensive summary from the following 
    intermediate summaries. The summary should:
    - Include all important topics and arguments
    - Establish logical connections between topics
    - Have a clear structure
    - Highlight key statements and most important insights
    
    Intermediate summaries:
    {combined_summary}"""
    
    try:
        final_response = groq_client.chat.completions.create(
            model=model_name,
            messages=[
                {"role": "system", "content": final_system_prompt},
                {"role": "user", "content": final_user_prompt}
            ],
            temperature=0.7,
            max_tokens=8000  # Increased to maximum available tokens
        )
        
        final_summary = final_response.choices[0].message.content
        return final_summary
    except Exception as e:
        st.error(f"Error with Groq API during final summarization: {str(e)}")
        return None

def main():
    st.title('Class_Owl.Ai')
    st.markdown("""
    A tool to make your class lecture easy and handful
    """)
    
    col1, col2, col3 = st.columns([3, 1, 1])
    
    with col1:
        link = st.file_uploader("Upload a video file", type=["mp4", "mkv", "avi", "mov"])


    if st.button('Generate Summary'):
        if link and api_key:
            try:
                with st.spinner('Processing...'):
                    progress = st.progress(0)
                    status_text = st.empty()

                    status_text.text('📥 Fetching video transcript...')
                    progress.progress(25)

                    video_path = "temp_video.mp4"
                    with open(video_path, "wb") as f:
                        f.write(link.getbuffer())

                    audio_path = "temp_audio.wav"
                    audio_path = extract_audio(video_path, audio_path)

                    whisper_model = load_whisper_model()

                    transcript = transcribe_audio(audio_path, whisper_model)

                    status_text.text(f'🤖 Generating content summary...')
                    progress.progress(75)

                    summary = summarize_with_langchain_and_openai(
                        transcript, 
                        language_code = 'en',
                        model_name='llama-3.1-8b-instant',
                        mode = 'video'
                    )

                    status_text.text('✨ Summary Ready!')
                    st.markdown(summary)
                    progress.progress(100)

                    # Cleanup temporary files
                    os.remove(video_path)
                    os.remove(audio_path)
            except Exception as e:
                st.error(f"An error occurred: {str(e)}")
        else:
            st.warning('Naahaaaa')

if __name__ == "__main__":
    main()
