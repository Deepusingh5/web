import React, { useState, useRef } from 'react';
import { Mic, MicOff, Send, Trash2, Play, Pause, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';

const VoiceRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => chunks.push(event.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => setRecordingTime(prev => prev + 1), 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check your browser permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const playAudio = () => {
    if (audioBlob && !isPlaying) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => setIsPlaying(false);
      audioRef.current.play();
      setIsPlaying(true);
    } else if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const deleteRecording = () => {
    setAudioBlob(null);
    setRecordingTime(0);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  };

  const submitRecording = async () => {
    if (!audioBlob) return;
    setIsSubmitting(true);
    setSubmitError(null);

    const fileName = `voice-note-${Date.now()}.webm`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('inquiries-voice-notes')
      .upload(fileName, audioBlob);

    if (uploadError) {
      console.error('Error uploading voice note:', uploadError);
      setSubmitError(uploadError.message);
      setIsSubmitting(false);
      return;
    }

    const { data: urlData } = supabase.storage.from('inquiries-voice-notes').getPublicUrl(fileName);
    
    const { error: insertError } = await supabase.from('inquiries').insert({
      name: 'Voice Note User',
      type: 'voice',
      subject: `Voice Note (${formatTime(recordingTime)})`,
      content: urlData.publicUrl,
      status: 'Pending',
    });

    setIsSubmitting(false);
    if (insertError) {
      console.error('Error saving voice note inquiry:', insertError);
      setSubmitError(insertError.message);
    } else {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        deleteRecording();
      }, 4000);
    }
  };

  const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-900/50 border border-green-700 rounded-lg p-8 text-center"
      >
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Voice Note Sent!</h3>
        <p className="text-green-300">We've received your recording and will get back to you shortly.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-md mx-auto"
    >
      <div className="flex flex-col items-center space-y-6">
        <motion.button
          onClick={isRecording ? stopRecording : startRecording}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isRecording ? <MicOff className="w-10 h-10 text-white" /> : <Mic className="w-10 h-10 text-white" />}
        </motion.button>

        <div className="text-center h-6">
          {isRecording && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center space-x-2 text-red-400"><div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div><span className="font-semibold">Recording... {formatTime(recordingTime)}</span></motion.div>}
          {!isRecording && !audioBlob && <p className="text-gray-400">Click the mic to record your requirement</p>}
        </div>

        <AnimatePresence>
          {audioBlob && !isRecording && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full space-y-4"
            >
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-300">Your Recording:</span>
                  <span className="text-sm font-semibold text-white">{formatTime(recordingTime)}</span>
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <button onClick={playAudio} className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">{isPlaying ? <Pause size={16} /> : <Play size={16} />}<span>{isPlaying ? 'Pause' : 'Play'}</span></button>
                  <button onClick={deleteRecording} className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"><Trash2 size={16} /><span>Delete</span></button>
                </div>
              </div>
              {submitError && <p className="text-sm text-red-400">{submitError}</p>}
              <button onClick={submitRecording} disabled={isSubmitting} className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors disabled:opacity-50">
                {isSubmitting ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <><Send size={20} /><span>Send Voice Note</span></>}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default VoiceRecorder;
