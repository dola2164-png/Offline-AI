// import React, { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { API_URL } from '../../config';
// const LANGUAGES = ['Hindi', 'English', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi', 'Urdu', 'Odia', 'Assamese', 'Konkani', 'Nepali', 'Sindhi', 'Dogri', 'Kashmiri', 'Manipuri', 'Bodo'];
// const API_BASE = `${API_URL}/api`;
// const LANGUAGE_CODES = { Hindi: 'hi-IN', Bengali: 'bn-IN', Tamil: 'ta-IN', Telugu: 'te-IN', Marathi: 'mr-IN', Gujarati: 'gu-IN', Kannada: 'kn-IN', Malayalam: 'ml-IN', Punjabi: 'pa-IN', Urdu: 'ur-IN' };

// const GREETINGS = {
//   English: "Hello! I can help with market prices, weather, truck booking, government services, and crop disease detection & treatment.",
//   Hindi: "नमस्ते! मैं मंडी भाव, मौसम, ट्रक बुकिंग, सरकारी सेवाएँ और फसल रोग की पहचान एवं उपचार में मदद कर सकता हूँ।",
//   Bengali: "হ্যালো! আমি বাজারের দাম, আবহাওয়া, ট্রাক বুকিং, সরকারি পরিষেবা এবং ফসলের রোগ শনাক্তকরণ ও চিকিৎসায় সাহায্য করতে পারি।",
//   Tamil: "வணக்கம்! சந்தை விலைகள், வானிலை, டிரக் முன்பதிவு, அரசு சேவைகள் மற்றும் பயிர் நோய் கண்டறிதல் மற்றும் சிகிச்சையில் நான் உதவ முடியும்.",
//   Telugu: "నమస్తే! నేను మార్కెట్ ధరలు, వాతావరణం, ట్రక్ బుకింగ్, ప్రభుత్వ సేవలు మరియు పంట వ్యాధి గుర్తింపు & చికిత్సలో సహాయం చేయగలను.",
//   Marathi: "नमस्कार! मी बाजारभाव, हवामान, ट्रक बुकिंग, सरकारी सेवा आणि पीक रोग ओळख व उपचारामध्ये मदत करू शकतो.",
// };

// const S = {
//   page: { display:'flex', flexDirection:'column', alignItems:'center', minHeight:'100vh', background:'#f0f4f8', padding:20, fontFamily:'system-ui, sans-serif' },
//   header: { width:'100%', maxWidth:300, display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 },
//   phone: { width:'100%', maxWidth:300, height:500, background:'#fff', borderRadius:32, boxShadow:'0 20px 40px -12px rgba(0,0,0,.25)', position:'relative', overflow:'hidden', border:'8px solid #333', display:'flex', flexDirection:'column' },
//   notch: { position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:90, height:20, background:'#333', borderRadius:'0 0 12px 12px', zIndex:10 },
//   screen: { flex:1, display:'flex', flexDirection:'column', marginTop:20, padding:16, background:'#fafafa' },
//   select: { width:'100%', padding:10, fontSize:'.95rem', borderRadius:10, border:'2px solid #e2e8f0', background:'#fff', marginBottom:20 },
//   tile: (bg,bd) => ({ display:'flex', flexDirection:'column', alignItems:'center', padding:16, borderRadius:16, border:`1px solid ${bd}`, background:bg, boxShadow:'0 4px 8px -2px rgba(0,0,0,.1)', cursor:'pointer', marginBottom:12 }),
//   phoneHeader: { display:'flex', alignItems:'center', paddingBottom:10, borderBottom:'1px solid #eee', marginBottom:10 },
//   backButton: { background:'none', border:'none', fontSize:'1.2rem', cursor:'pointer', marginRight:12, color:'#007aff' },
//   centerBox: { flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' },
//   avatar: isActive => ({ width:70, height:70, borderRadius:35, background:isActive?'#34c759':'#007aff', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2rem', marginBottom:16 }),
//   voiceButton: bg => ({ flex:1, padding:10, borderRadius:12, border:'none', fontWeight:'bold', cursor:'pointer', color:'#fff', background:bg }),
//   chatArea: { flex:1, overflowY:'auto', display:'flex', flexDirection:'column', gap:8, paddingBottom:12, minHeight:0 },
//   bubble: isUser => ({ alignSelf:isUser?'flex-end':'flex-start', background:isUser?'#007aff':'#e9ecef', color:isUser?'#fff':'#000', padding:'10px 14px', borderRadius:isUser?'16px 16px 4px 16px':'16px 16px 16px 4px', maxWidth:'85%', fontSize:'.85rem', wordBreak:'break-word' }),
//   inputContainer: { display:'flex', gap:6, paddingTop:8, borderTop:'1px solid #eee', flexShrink:0 },
//   input: { flex:1, padding:'10px 14px', borderRadius:16, border:'1px solid #ccc', fontSize:'.85rem', minWidth:0 },
//   sendButton: { background:'#007aff', color:'#fff', border:'none', padding:'0 16px', borderRadius:16, fontWeight:'bold', cursor:'pointer', whiteSpace:'nowrap' }
// };

// const formatTime = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

// // Reusable subcomponents
// const Screen = ({ children }) => <div style={S.screen}>{children}</div>;
// const PhoneHeader = ({ title, onBack }) => <div style={S.phoneHeader}><button style={S.backButton} onClick={onBack}>←</button><span>{title}</span></div>;
// const HomeTile = ({ bg, bd, icon, label, onClick }) => <button style={S.tile(bg, bd)} onClick={onClick}>{icon} <b>{label}</b></button>;
// const ActionButton = ({ bg, onClick, disabled, children }) => <button style={S.voiceButton(bg)} onClick={onClick} disabled={disabled}>{children}</button>;
// const Avatar = ({ active }) => <div style={S.avatar(active)}>AI</div>;
// const Bubble = ({ text, isUser }) => <div style={S.bubble(isUser)}>{text}</div>;

// export default function AgentExperiencePage() {
//   const [screen, setScreen] = useState('home');
//   const [language, setLanguage] = useState('English');
//   const [message, setMessage] = useState('');
  
//   // Set the initial message dynamically using the language state
//   const [messages, setMessages] = useState(() => [
//     { type: 'ai', text: GREETINGS['English'] }
//   ]);

//   const [callDuration, setCallDuration] = useState(0);
//   const [voiceStatus, setVoiceStatus] = useState('Connected');
//   const [isRecording, setIsRecording] = useState(false);
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const audioChunksRef = useRef([]), timerRef = useRef(null), messagesEndRef = useRef(null);

//   // Translate the greeting message whenever the language state changes
//   useEffect(() => {
//     setMessages(prev => {
//       const updated = [...prev];
//       if (updated.length > 0 && updated[0].type === 'ai') {
//         // Swap out the first system message with the selected language translation
//         updated[0] = { 
//           ...updated[0], 
//           text: GREETINGS[language] || GREETINGS.English 
//         };
//       }
//       return updated;
//     });
//   }, [language]);

//   useEffect(() => {
//     if (screen !== 'voice') {
//       clearInterval(timerRef.current); setCallDuration(0); setVoiceStatus('Connected'); window.speechSynthesis?.cancel();
//       if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
//       setIsRecording(false); audioChunksRef.current = [];
//       return;
//     }
//     timerRef.current = setInterval(() => setCallDuration(prev => prev + 1), 1000);
//     return () => clearInterval(timerRef.current);
//   }, [screen, mediaRecorder]); // added mediaRecorder to dependency array for safety

//   useEffect(() => {
//     if (screen === 'messages' && messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//   }, [messages, screen]);

//   const goHome = () => { window.speechSynthesis?.cancel(); setScreen('home'); };

//   const apiCall = async (endpoint, body, fallback, delay) => {
//     try {
//       const response = await fetch(`${API_BASE}${endpoint}`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) });
//       if (!response.ok) throw new Error();
//       return await response.json();
//     } catch { return new Promise(resolve => setTimeout(() => resolve({ reply: fallback }), delay)); }
//   };

//   // Plays Sarvam-generated audio if available, otherwise falls back to browser TTS
//   const speak = (data, onEnd) => {
//     if (data.audioBase64) {
//       const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
//       audio.onended = onEnd;
//       audio.onerror = () => { console.error('Sarvam audio playback failed, falling back to browser TTS'); speakBrowser(data.reply, onEnd); };
//       audio.play().catch(() => speakBrowser(data.reply, onEnd));
//     } else {
//       speakBrowser(data.reply, onEnd);
//     }
//   };

//   const speakBrowser = (text, onEnd) => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = LANGUAGE_CODES[language] || 'en-IN'; utterance.onend = onEnd;
//     window.speechSynthesis?.speak(utterance);
//   };

//   // Converts local {type, text} messages into backend {role, content} 
//   const toHistory = msgs => msgs.map(m => ({ role: m.type === 'user' ? 'user' : 'assistant', content: m.text }));

//   const sendMessage = async () => {
//     if (!message.trim()) return;
//     const updated = [...messages, { type:'user', text:message }];
//     setMessages(updated); setMessage('');
//     const data = await apiCall('/chat', { history: toHistory(updated), language }, 'Simulated response.', 700);
//     setMessages(prev => [...prev, { type:'ai', text:data.reply }]);
//   };

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const recorder = new MediaRecorder(stream);
//       setMediaRecorder(recorder);
//       audioChunksRef.current = [];
//       recorder.ondataavailable = e => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
//       recorder.onstop = async () => {
//         const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
//         const reader = new FileReader();
//         reader.readAsDataURL(audioBlob);
//         reader.onloadend = async () => {
//           const base64Audio = reader.result.split(',')[1];
//           audioChunksRef.current = [];
//           setVoiceStatus('Processing...');
//           try {
//             const data = await apiCall('/chat', { audioBase64: base64Audio, audioMimeType: 'audio/webm', language }, 'I heard you. The AI service is currently unavailable.', 2000);
//             setVoiceStatus('Speaking...');
//             speak(data, () => setVoiceStatus('Connected'));
//           } catch (error) { console.error('Error processing audio:', error); setVoiceStatus('Connected'); }
//         };
//       };
//       recorder.start(); setIsRecording(true); setVoiceStatus('Recording...');
//     } catch (error) { console.error('Error accessing microphone:', error); setVoiceStatus('Microphone access denied'); }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder && mediaRecorder.state !== 'inactive') { mediaRecorder.stop(); setIsRecording(false); setVoiceStatus('Processing...'); }
//   };

//   return (
//     <div style={S.page}>
//       <div style={S.header}>
//         <Link to="/" style={{ color:'#007aff', fontWeight:600, textDecoration:'none' }}>← Back</Link>
//         <span style={{ fontWeight:700 }}>AI Agent</span>
//         <div style={{ width:50 }} />
//       </div>
//       <div style={S.phone}>
//         <div style={S.notch} />
//         {screen === 'home' && <Screen>
//           <div style={{ textAlign:'center', fontSize:'1rem', color:'#888', marginBottom:12 }}>Offline AI Connected</div>
//           <div style={{ textAlign:'center', fontSize:'.8rem', color:'#683fc1', marginBottom:12 }}>Select your preferred language, then choose between voice call or text messages to start.</div>
//           <label style={{ fontSize:'.85rem', fontWeight:600, marginBottom:6 }}>Select Language</label>
//           <select style={S.select} value={language} onChange={e => setLanguage(e.target.value)}>
//             {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
//           </select>
//           <HomeTile bg="#f0f9ff" bd="#bae6fd" icon="📞" label="Voice Call" onClick={() => setScreen('call')} />
//           <HomeTile bg="#fdf4ff" bd="#fbcfe8" icon="💬" label="Text Message" onClick={() => setScreen('messages')} />
//         </Screen>}
//         {screen === 'call' && <Screen>
//           <PhoneHeader title="Incoming call" onBack={goHome} />
//           <div style={S.centerBox}>
//             <Avatar active={false} />
//             <div style={{ fontWeight:700 }}>Agent ({language})</div>
//             <div style={{ color:'#666', marginBottom:20 }}>Connecting...</div>
//             <div style={{ display:'flex', gap:12, width:'100%' }}>
//               <ActionButton bg="#34c759" onClick={() => setScreen('voice')}>Answer</ActionButton>
//               <ActionButton bg="#ff3b30" onClick={goHome}>Decline</ActionButton>
//             </div>
//           </div>
//         </Screen>}
//         {screen === 'voice' && <Screen>
//           <PhoneHeader title="Active Call" onBack={goHome} />
//           <div style={S.centerBox}>
//             <div style={{ textAlign:'center', fontSize:'.8rem', color:'#683fc1', marginBottom:12 }}>Tap on "Speak" to communicate in your language.</div>
//             <Avatar active={isRecording || voiceStatus === 'Speaking...'} />
//             <div style={{ fontWeight:700 }}>Agent ({language})</div>
//             <div style={{ color:voiceStatus==='Connected'?'#666':'#007aff', fontWeight:600, marginBottom:20 }}>{formatTime(callDuration)} • {voiceStatus}</div>
//             <div style={{ display:'flex', gap:10, width:'100%', marginBottom:15 }}>
//               <ActionButton bg={isRecording?'#ff9500':'#007aff'} onClick={isRecording ? stopRecording : startRecording}>{isRecording?'🎙️ Stop Recording':'🎙️ Speak'}</ActionButton>
//             </div>
//             <div style={{ display:'flex', gap:10, width:'100%', marginBottom:5 }}><ActionButton bg="#ff3b30" onClick={goHome}>End Call</ActionButton></div>
//           </div>
//         </Screen>}
//         {screen === 'messages' && <Screen>
//           <PhoneHeader title={`Chat (${language})`} onBack={goHome} />
//           <div style={S.chatArea}>
//             {messages.map((msg, index) => <Bubble key={index} text={msg.text} isUser={msg.type==='user'} />)}
//             <div ref={messagesEndRef} style={{ height:0 }} />
//           </div>
//           <div style={S.inputContainer}>
//             <input style={S.input} value={message} onChange={e => setMessage(e.target.value)} placeholder="Type your request..." onKeyDown={e => e.key==='Enter' && sendMessage()} />
//             <button style={S.sendButton} onClick={sendMessage}>Send</button>
//           </div>
//         </Screen>}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
const LANGUAGES = ['Hindi', 'English', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi', 'Urdu', 'Odia', 'Assamese', 'Konkani', 'Nepali', 'Sindhi', 'Dogri', 'Kashmiri', 'Manipuri', 'Bodo'];
const API_BASE = 'http://localhost:8080/api';
const LANGUAGE_CODES = { Hindi: 'hi-IN', Bengali: 'bn-IN', Tamil: 'ta-IN', Telugu: 'te-IN', Marathi: 'mr-IN', Gujarati: 'gu-IN', Kannada: 'kn-IN', Malayalam: 'ml-IN', Punjabi: 'pa-IN', Urdu: 'ur-IN' };

const GREETINGS = {
  English: "Hello! I can help with market prices, weather, truck booking, government services, and crop disease detection & treatment.",
  Hindi: "नमस्ते! मैं मंडी भाव, मौसम, ट्रक बुकिंग, सरकारी सेवाएँ और फसल रोग की पहचान एवं उपचार में मदद कर सकता हूँ।",
  Bengali: "হ্যালো! আমি বাজারের দাম, আবহাওয়া, ট্রাক বুকিং, সরকারি পরিষেবা এবং ফসলের রোগ শনাক্তকরণ ও চিকিৎসায় সাহায্য করতে পারি।",
  Tamil: "வணக்கம்! சந்தை விலைகள், வானிலை, டிரக் முன்பதிவு, அரசு சேவைகள் மற்றும் பயிர் நோய் கண்டறிதல் மற்றும் சிகிச்சையில் நான் உதவ முடியும்.",
  Telugu: "నమస్తే! నేను మార్కెట్ ధరలు, వాతావరణం, ట్రక్ బుకింగ్, ప్రభుత్వ సేవలు మరియు పంట వ్యాధి గుర్తింపు & చికిత్సలో సహాయం చేయగలను.",
  Marathi: "नमस्कार! मी बाजारभाव, हवामान, ट्रक बुकिंग, सरकारी सेवा आणि पीक रोग ओळख व उपचारामध्ये मदत करू शकतो.",
};

const S = {
  page: { display:'flex', flexDirection:'column', alignItems:'center', minHeight:'100vh', background:'#f0f4f8', padding:20, fontFamily:'system-ui, sans-serif' },
  header: { width:'100%', maxWidth:300, display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 },
  phone: { width:'100%', maxWidth:300, height:500, background:'#fff', borderRadius:32, boxShadow:'0 20px 40px -12px rgba(0,0,0,.25)', position:'relative', overflow:'hidden', border:'8px solid #333', display:'flex', flexDirection:'column' },
  notch: { position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:90, height:20, background:'#333', borderRadius:'0 0 12px 12px', zIndex:10 },
  screen: { flex:1, display:'flex', flexDirection:'column', marginTop:20, padding:16, background:'#fafafa' },
  select: { width:'100%', padding:10, fontSize:'.95rem', borderRadius:10, border:'2px solid #e2e8f0', background:'#fff', marginBottom:20 },
  tile: (bg,bd) => ({ display:'flex', flexDirection:'column', alignItems:'center', padding:16, borderRadius:16, border:`1px solid ${bd}`, background:bg, boxShadow:'0 4px 8px -2px rgba(0,0,0,.1)', cursor:'pointer', marginBottom:12 }),
  phoneHeader: { display:'flex', alignItems:'center', paddingBottom:10, borderBottom:'1px solid #eee', marginBottom:10 },
  backButton: { background:'none', border:'none', fontSize:'1.2rem', cursor:'pointer', marginRight:12, color:'#007aff' },
  centerBox: { flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' },
  avatar: isActive => ({ width:70, height:70, borderRadius:35, background:isActive?'#34c759':'#007aff', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2rem', marginBottom:16 }),
  voiceButton: bg => ({ flex:1, padding:10, borderRadius:12, border:'none', fontWeight:'bold', cursor:'pointer', color:'#fff', background:bg }),
  chatArea: { flex:1, overflowY:'auto', display:'flex', flexDirection:'column', gap:8, paddingBottom:12, minHeight:0 },
  bubble: isUser => ({ alignSelf:isUser?'flex-end':'flex-start', background:isUser?'#007aff':'#e9ecef', color:isUser?'#fff':'#000', padding:'10px 14px', borderRadius:isUser?'16px 16px 4px 16px':'16px 16px 16px 4px', maxWidth:'85%', fontSize:'.85rem', wordBreak:'break-word' }),
  inputContainer: { display:'flex', gap:6, paddingTop:8, borderTop:'1px solid #eee', flexShrink:0 },
  input: { flex:1, padding:'10px 14px', borderRadius:16, border:'1px solid #ccc', fontSize:'.85rem', minWidth:0 },
  sendButton: { background:'#007aff', color:'#fff', border:'none', padding:'0 16px', borderRadius:16, fontWeight:'bold', cursor:'pointer', whiteSpace:'nowrap' }
};

const formatTime = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

// Reusable subcomponents
const Screen = ({ children }) => <div style={S.screen}>{children}</div>;
const PhoneHeader = ({ title, onBack }) => <div style={S.phoneHeader}><button style={S.backButton} onClick={onBack}>←</button><span>{title}</span></div>;
const HomeTile = ({ bg, bd, icon, label, onClick }) => <button style={S.tile(bg, bd)} onClick={onClick}>{icon} <b>{label}</b></button>;
const ActionButton = ({ bg, onClick, disabled, children }) => <button style={S.voiceButton(bg)} onClick={onClick} disabled={disabled}>{children}</button>;
const Avatar = ({ active }) => <div style={S.avatar(active)}>AI</div>;
const Bubble = ({ text, isUser }) => <div style={S.bubble(isUser)}>{text}</div>;

export default function AgentExperiencePage() {
  const [screen, setScreen] = useState('home');
  const [language, setLanguage] = useState('English');
  const [message, setMessage] = useState('');

  // Set the initial message dynamically using the language state
  const [messages, setMessages] = useState(() => [
    { type: 'ai', text: GREETINGS['English'] }
  ]);

  const [callDuration, setCallDuration] = useState(0);
  const [voiceStatus, setVoiceStatus] = useState('Connected');
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const audioChunksRef = useRef([]), timerRef = useRef(null), messagesEndRef = useRef(null);
  const currentAudioRef = useRef(null); // tracks the Audio object currently playing an AI voice reply (Sarvam TTS)

  // Translate the greeting message whenever the language state changes
  useEffect(() => {
    setMessages(prev => {
      const updated = [...prev];
      if (updated.length > 0 && updated[0].type === 'ai') {
        // Swap out the first system message with the selected language translation
        updated[0] = {
          ...updated[0],
          text: GREETINGS[language] || GREETINGS.English
        };
      }
      return updated;
    });
  }, [language]);

  // Stops ANY currently playing AI voice: both the browser speechSynthesis fallback
  // and the real Sarvam-generated <audio> clip (which speechSynthesis.cancel() alone can't touch).
  const stopSpeaking = () => {
    window.speechSynthesis?.cancel();
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
  };

  useEffect(() => {
    if (screen !== 'voice') {
      clearInterval(timerRef.current); setCallDuration(0); setVoiceStatus('Connected');
      stopSpeaking();
      if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
      setIsRecording(false); audioChunksRef.current = [];
      return;
    }
    timerRef.current = setInterval(() => setCallDuration(prev => prev + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [screen, mediaRecorder]); // added mediaRecorder to dependency array for safety

  useEffect(() => {
    if (screen === 'messages' && messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, screen]);

  const goHome = () => { stopSpeaking(); setScreen('home'); };

  const apiCall = async (endpoint, body, fallback, delay) => {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) });
      if (!response.ok) throw new Error();
      return await response.json();
    } catch { return new Promise(resolve => setTimeout(() => resolve({ reply: fallback }), delay)); }
  };

  // Plays Sarvam-generated audio if available, otherwise falls back to browser TTS
  const speak = (data, onEnd) => {
    if (data.audioBase64) {
      const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
      currentAudioRef.current = audio;
      audio.onended = () => { currentAudioRef.current = null; onEnd(); };
      audio.onerror = () => {
        currentAudioRef.current = null;
        console.error('Sarvam audio playback failed, falling back to browser TTS');
        speakBrowser(data.reply, onEnd);
      };
      audio.play().catch(() => { currentAudioRef.current = null; speakBrowser(data.reply, onEnd); });
    } else {
      speakBrowser(data.reply, onEnd);
    }
  };

  const speakBrowser = (text, onEnd) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LANGUAGE_CODES[language] || 'en-IN'; utterance.onend = onEnd;
    window.speechSynthesis?.speak(utterance);
  };

  // Converts local {type, text} messages into backend {role, content}
  const toHistory = msgs => msgs.map(m => ({ role: m.type === 'user' ? 'user' : 'assistant', content: m.text }));

  const sendMessage = async () => {
    if (!message.trim()) return;
    const updated = [...messages, { type:'user', text:message }];
    setMessages(updated); setMessage('');
    const data = await apiCall('/chat', { history: toHistory(updated), language }, 'Simulated response.', 700);
    setMessages(prev => [...prev, { type:'ai', text:data.reply }]);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      audioChunksRef.current = [];
      recorder.ondataavailable = e => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result.split(',')[1];
          audioChunksRef.current = [];
          setVoiceStatus('Processing...');
          try {
            const data = await apiCall('/chat', { audioBase64: base64Audio, audioMimeType: 'audio/webm', language }, 'I heard you. The AI service is currently unavailable.', 2000);
            setVoiceStatus('Speaking...');
            speak(data, () => setVoiceStatus('Connected'));
          } catch (error) { console.error('Error processing audio:', error); setVoiceStatus('Connected'); }
        };
      };
      recorder.start(); setIsRecording(true); setVoiceStatus('Recording...');
    } catch (error) { console.error('Error accessing microphone:', error); setVoiceStatus('Microphone access denied'); }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') { mediaRecorder.stop(); setIsRecording(false); setVoiceStatus('Processing...'); }
  };

  return (
    <div style={S.page}>
      <div style={S.header}>
        <Link to="/" style={{ color:'#007aff', fontWeight:600, textDecoration:'none' }}>← Back</Link>
        <span style={{ fontWeight:700 }}>AI Agent</span>
        <div style={{ width:50 }} />
      </div>
      <div style={S.phone}>
        <div style={S.notch} />
        {screen === 'home' && <Screen>
          <div style={{ textAlign:'center', fontSize:'1rem', color:'#888', marginBottom:12 }}>Offline AI Connected</div>
          <div style={{ textAlign:'center', fontSize:'.8rem', color:'#683fc1', marginBottom:12 }}>Select your preferred language, then choose between voice call or text messages to start.</div>
          <label style={{ fontSize:'.85rem', fontWeight:600, marginBottom:6 }}>Select Language</label>
          <select style={S.select} value={language} onChange={e => setLanguage(e.target.value)}>
            {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
          </select>
          <HomeTile bg="#f0f9ff" bd="#bae6fd" icon="📞" label="Voice Call" onClick={() => setScreen('call')} />
          <HomeTile bg="#fdf4ff" bd="#fbcfe8" icon="💬" label="Text Message" onClick={() => setScreen('messages')} />
        </Screen>}
        {screen === 'call' && <Screen>
          <PhoneHeader title="Incoming call" onBack={goHome} />
          <div style={S.centerBox}>
            <Avatar active={false} />
            <div style={{ fontWeight:700 }}>Agent ({language})</div>
            <div style={{ color:'#666', marginBottom:20 }}>Connecting...</div>
            <div style={{ display:'flex', gap:12, width:'100%' }}>
              <ActionButton bg="#34c759" onClick={() => setScreen('voice')}>Answer</ActionButton>
              <ActionButton bg="#ff3b30" onClick={goHome}>Decline</ActionButton>
            </div>
          </div>
        </Screen>}
        {screen === 'voice' && <Screen>
          <PhoneHeader title="Active Call" onBack={goHome} />
          <div style={S.centerBox}>
            <div style={{ textAlign:'center', fontSize:'.8rem', color:'#683fc1', marginBottom:12 }}>Tap on "Speak" to communicate in your language.</div>
            <Avatar active={isRecording || voiceStatus === 'Speaking...'} />
            <div style={{ fontWeight:700 }}>Agent ({language})</div>
            <div style={{ color:voiceStatus==='Connected'?'#666':'#007aff', fontWeight:600, marginBottom:20 }}>{formatTime(callDuration)} • {voiceStatus}</div>
            <div style={{ display:'flex', gap:10, width:'100%', marginBottom:15 }}>
              <ActionButton bg={isRecording?'#ff9500':'#007aff'} onClick={isRecording ? stopRecording : startRecording}>{isRecording?'🎙️ Stop Recording':'🎙️ Speak'}</ActionButton>
            </div>
            <div style={{ display:'flex', gap:10, width:'100%', marginBottom:5 }}><ActionButton bg="#ff3b30" onClick={goHome}>End Call</ActionButton></div>
          </div>
        </Screen>}
        {screen === 'messages' && <Screen>
          <PhoneHeader title={`Chat (${language})`} onBack={goHome} />
          <div style={S.chatArea}>
            {messages.map((msg, index) => <Bubble key={index} text={msg.text} isUser={msg.type==='user'} />)}
            <div ref={messagesEndRef} style={{ height:0 }} />
          </div>
          <div style={S.inputContainer}>
            <input style={S.input} value={message} onChange={e => setMessage(e.target.value)} placeholder="Type your request..." onKeyDown={e => e.key==='Enter' && sendMessage()} />
            <button style={S.sendButton} onClick={sendMessage}>Send</button>
          </div>
        </Screen>}
      </div>
    </div>
  );
}
