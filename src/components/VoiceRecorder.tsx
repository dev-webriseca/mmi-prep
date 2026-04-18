"use client";

import { useState, useEffect, useRef } from "react";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface VoiceRecorderProps {
  onTranscript: (text: string) => void;
  isActive: boolean;
}

export default function VoiceRecorder({ onTranscript, isActive }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  // Initialize SpeechRecognition once
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        const recognition = recognitionRef.current;
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = () => setIsRecording(true);
        recognition.onend = () => setIsRecording(false);
        recognition.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsRecording(false);
        };

        recognition.onresult = (event: any) => {
          let currentFinalTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              currentFinalTranscript += event.results[i][0].transcript + " ";
            }
          }
          if (currentFinalTranscript) {
            onTranscript(currentFinalTranscript);
          }
        };
      } else {
        setIsSupported(false);
      }
    }
  }, [onTranscript]);

  // Handle external start/stop via isActive prop
  useEffect(() => {
    if (!recognitionRef.current) return;
    
    if (isActive && !isRecording) {
      try {
        recognitionRef.current.start();
      } catch (err) {
         // ignore already started errors
      }
    } else if (!isActive && isRecording) {
      try {
        recognitionRef.current.stop();
      } catch (err) {}
    }
  }, [isActive, isRecording]);

  if (!isSupported) {
    return (
      <div className="voice-recorder unsupported" style={{ fontSize: '0.8rem', padding: '4px 8px' }}>
        <span className="unsupported-icon">⚠️</span> Browser audio not supported
      </div>
    );
  }

  if (isRecording) {
    return (
      <div className="voice-recorder-status" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span className="recording-dot"></span>
        <span className="recording-status" style={{ margin: 0 }}>Listening...</span>
      </div>
    );
  }

  return null;
}
