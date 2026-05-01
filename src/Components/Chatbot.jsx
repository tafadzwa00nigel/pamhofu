import React, { useState, useEffect, useRef } from 'react';
import mhofu from '../assets/icons/Mhofu.webp';

const API_BASE = 'https://pamhofuabattoir.co.zw/api';

const SESSION_ID = Math.random().toString(36).substring(7);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Welcome to Pamhofu Centre. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const messagesEndRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const recordingStartRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { if (isOpen) scrollToBottom(); }, [messages, isTyping, isOpen]);

  // ── ElevenLabs Audio Playback ──────────────────────────────
  const playAudio = (audio_b64) => {
    if (!audio_b64) return;
    try {
      const audioBytes = Uint8Array.from(atob(audio_b64), c => c.charCodeAt(0));
      const blob = new Blob([audioBytes], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onplay = () => setIsSpeaking(true);
      audio.onended = () => { setIsSpeaking(false); URL.revokeObjectURL(url); };
      audio.onerror = () => setIsSpeaking(false);
      audio.play();
    } catch (e) {
      console.error("Audio playback error:", e);
    }
  };

  const stopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsSpeaking(false);
    }
  };

  // ── Send Message ───────────────────────────────────────────
  // audio_mode = true means the request came from voice input
  // the backend will only generate audio response when audio_mode is true
  const handleSend = async (textOverride, audio_mode = false) => {
    const userMessage = textOverride || input;
    if (!userMessage.trim()) return;

    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          session_id: SESSION_ID,
          audio_mode: audio_mode  // tells backend whether to generate audio
        }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);

      // Only play audio if this was a voice message
      if (audio_mode && data.audio_b64) {
        playAudio(data.audio_b64);
      }

    } catch (error) {
      setMessages(prev => [...prev, { text: "Connection error. Please try again.", sender: 'bot' }]);
    } finally {
      setIsTyping(false);
    }
  };

  // ── Voice Recording — Click to START, click again to STOP ─
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks = [];

      mediaRecorder.ondataavailable = e => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());

        // Ignore if recording was under 1.5 seconds
        const duration = Date.now() - recordingStartRef.current;
        if (duration < 1500) {
          console.log("⚠️ Recording too short, ignoring.");
          return;
        }

        const blob = new Blob(chunks, { type: 'audio/webm' });

        if (blob.size < 1000) {
          console.log("⚠️ Audio blob too small, likely silence.");
          setMessages(prev => [...prev, {
            text: "Could not hear anything. Please try again.",
            sender: 'bot'
          }]);
          return;
        }

        const formData = new FormData();
        formData.append('audio', blob, 'recording.webm');
        setIsTyping(true);

        try {
          const res = await fetch(`${API_BASE}/transcribe`, {
            method: 'POST',
            body: formData,
          });
          const data = await res.json();

          if (data.text?.trim() && data.text.trim() !== '...') {
            // Pass audio_mode = true so backend generates voice response
            await handleSend(data.text.trim(), true);
          } else {
            setMessages(prev => [...prev, {
              text: "Could not hear that clearly. Please speak closer to your mic and try again.",
              sender: 'bot'
            }]);
          }
        } catch (err) {
          console.error("Transcription error:", err);
          setMessages(prev => [...prev, {
            text: "Voice message failed. Please type instead.",
            sender: 'bot'
          }]);
        } finally {
          setIsTyping(false);
        }
      };

      mediaRecorder.start(100);
      recordingStartRef.current = Date.now();
      setIsRecording(true);

    } catch {
      alert("Microphone access denied. Please allow mic access in your browser settings.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');
        .chat-wrapper * { font-family: 'Nunito', sans-serif; box-sizing: border-box; }

        .chat-card {
          width: 370px; max-width: 92vw; border-radius: 20px;
          overflow: hidden; display: flex; flex-direction: column;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }
        .chat-header {
          background: linear-gradient(135deg, #4b49ac, #6c63ff);
          color: white; padding: 14px 18px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .chat-header h6 { margin: 0; font-size: 15px; font-weight: 700; }
        .chat-header small { opacity: 0.8; font-size: 11px; }
        .close-btn {
          background: rgba(255,255,255,0.2); border: none; color: white;
          width: 28px; height: 28px; border-radius: 50%; cursor: pointer;
          font-size: 14px; display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .close-btn:hover { background: rgba(255,255,255,0.35); }

        .chat-body {
          height: 360px; overflow-y: auto; padding: 16px 14px;
          display: flex; flex-direction: column; gap: 10px;
          background: linear-gradient(160deg, #f3f0ff 0%, #fff8e1 50%, #ede7ff 100%);
        }
        .chat-body::-webkit-scrollbar { width: 4px; }
        .chat-body::-webkit-scrollbar-thumb { background: rgba(107,99,255,0.2); border-radius: 4px; }

        .bubble-user {
          background: linear-gradient(135deg, #4b49ac, #6c63ff); color: white;
          border-radius: 18px 18px 4px 18px; padding: 10px 14px;
          max-width: 78%; font-size: 13.5px; line-height: 1.5;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08); align-self: flex-end;
        }
        .bubble-bot {
          background: #fff9e6; color: #1a1a1a;
          border: 1px solid rgba(255,193,7,0.4);
          border-radius: 18px 18px 18px 4px; padding: 10px 14px;
          max-width: 78%; font-size: 13.5px; line-height: 1.5;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08); align-self: flex-start;
        }

        .typing-bubble {
          background: #fff9e6; border: 1px solid rgba(255,193,7,0.4);
          border-radius: 18px 18px 18px 4px; padding: 12px 16px;
          display: inline-flex; align-items: center; gap: 5px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .typing-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #ffc107;
          animation: typingBounce 1.2s infinite ease-in-out;
        }
        .typing-dot:nth-child(1) { animation-delay: 0s; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typingBounce {
          0%,60%,100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }

        .speaking-bar {
          display: flex; align-items: center; gap: 8px;
          font-size: 11px; color: #6c63ff; padding: 5px 10px;
          background: #f0eeff; border-radius: 10px; align-self: flex-start;
        }
        .stop-btn {
          border: none; background: #e0dcff; color: #4b49ac;
          border-radius: 8px; padding: 2px 8px; font-size: 11px;
          cursor: pointer; font-family: 'Nunito', sans-serif;
        }
        .stop-btn:hover { background: #cdc8f5; }

        .recording-bar {
          display: flex; align-items: center; gap: 6px;
          padding: 6px 12px; background: #fff0f0;
          border-top: 1px solid #ffd5d5;
          font-size: 12px; color: #dc3545; font-weight: 700;
        }
        .recording-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #dc3545;
          animation: recPulse 1s infinite; flex-shrink: 0;
        }
        @keyframes recPulse {
          0%,100% { opacity: 1; } 50% { opacity: 0.3; }
        }

        .chat-footer {
          padding: 10px 12px; background: white;
          border-top: 1px solid #f0f0f0;
          display: flex; gap: 7px; align-items: center;
        }
        .chat-input {
          flex: 1; border: 1.5px solid #e8e8f0; border-radius: 12px;
          padding: 9px 14px; font-size: 13.5px; font-family: 'Nunito', sans-serif;
          outline: none; background: #f8f8fc; transition: border-color 0.2s;
          min-width: 0;
          color: #1a1a1a; /* 👈 add this */
        }
        .chat-input:focus { border-color: #6c63ff; background: white; }
        .chat-input:disabled { opacity: 0.6; cursor: not-allowed; }

        .mic-btn {
          width: 40px; height: 40px; border-radius: 12px; border: none;
          font-size: 16px; cursor: pointer;
          transition: transform 0.1s, background 0.2s;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .mic-btn.idle { background: #f0eeff; color: #4b49ac; }
        .mic-btn.idle:hover { background: #e0dcff; }
        .mic-btn.recording { background: #dc3545; color: white; animation: micPulse 1s infinite; }
        .mic-btn:disabled { opacity: 0.5; cursor: not-allowed; animation: none; }
        @keyframes micPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(220,53,69,0.4); }
          50% { box-shadow: 0 0 0 6px rgba(220,53,69,0); }
        }

        .send-btn {
          background: linear-gradient(135deg, #4b49ac, #6c63ff);
          color: white; border: none; border-radius: 12px;
          padding: 9px 16px; font-size: 13.5px; font-family: 'Nunito', sans-serif;
          font-weight: 700; cursor: pointer;
          transition: opacity 0.2s, transform 0.1s;
          white-space: nowrap; flex-shrink: 0;
        }
        .send-btn:hover:not(:disabled) { opacity: 0.9; transform: scale(1.03); }
        .send-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .toggle-btn {
          width: 65px; height: 65px; border-radius: 50%;
          background: linear-gradient(135deg, #ffc107, #ffca28);
          border: 3px solid white; cursor: pointer; padding: 0;
          box-shadow: 0 8px 24px rgba(255,193,7,0.5);
          transition: transform 0.2s, box-shadow 0.2s; overflow: hidden;
        }
        .toggle-btn:hover { transform: scale(1.08); box-shadow: 0 12px 30px rgba(255,193,7,0.55); }
        .toggle-btn img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .toggle-close {
          font-size: 22px; color: #4b49ac;
          display: flex; align-items: center; justify-content: center;
          width: 100%; height: 100%;
        }
      `}</style>

      <div
        className="chat-wrapper"
        style={{
          position: 'fixed', bottom: '24px', right: '24px',
          zIndex: 10000, display: 'flex',
          flexDirection: 'column', alignItems: 'flex-end', gap: '12px'
        }}
      >
        {isOpen && (
          <div className="chat-card">

            {/* Header */}
            <div className="chat-header">
              <div>
                <h6>Mhofu Assistant 🐃</h6>
                <small>● Online — Pamhofu Centre</small>
              </div>
              <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
            </div>

            {/* Messages */}
            <div className="chat-body">
              {isSpeaking && (
                <div className="speaking-bar">
                  🔊 Mhofu is speaking...
                  <button className="stop-btn" onClick={stopSpeaking}>Stop</button>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={msg.sender === 'user' ? 'bubble-user' : 'bubble-bot'}>
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="typing-bubble">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Recording indicator bar */}
            {isRecording && (
              <div className="recording-bar">
                <span className="recording-dot" />
                Recording... click 🎤 again when done speaking
              </div>
            )}

            {/* Input area */}
            <div className="chat-footer">
              <input
                className="chat-input"
                type="text"
                placeholder={isRecording ? "Speak now, click 🎤 to send..." : "Ask me anything..."}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && !isRecording && handleSend()}
                disabled={isTyping || isRecording}
              />
              <button
                className={`mic-btn ${isRecording ? 'recording' : 'idle'}`}
                onClick={handleMicClick}
                disabled={isTyping}
                title={isRecording ? "Click to stop and send" : "Click to start recording"}
              >
                {isRecording ? '⏹' : '🎤'}
              </button>
              <button
                className="send-btn"
                onClick={() => handleSend()}
                disabled={isTyping || isRecording}
              >
                Send
              </button>
            </div>

          </div>
        )}

        {/* Toggle button */}
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen
            ? <span className="toggle-close">✖</span>
            : <img src={mhofu} alt="Chat with Mhofu" />
          }
        </button>

      </div>
    </>
  );
};

export default Chatbot;
