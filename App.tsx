
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Sidebar from './components/Sidebar';
import AdminPortal from './components/AdminPortal';
import AudioController from './components/AudioController';
import { 
  POPULAR_DUAS, 
  SPECIAL_AMALS, 
  ZIYARATS, 
  WEEKLY_AMAAL, 
  TASBIH_PRESETS, 
  RECITERS,
  DIVINE_PEARLS
} from './constants';
import { Surah, Ayah, Dua, Reciter, NamazLogEntry, QadhaState, TasbihPreset } from './types';
import { 
  getIslamicGuidance, 
  askGeminiChat, 
  generateDivineImage, 
  generateVeoVideo, 
  searchMaps, 
  analyzeImage, 
  speakText 
} from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [selectedReciter, setSelectedReciter] = useState<Reciter>(RECITERS[0]);
  const [showReciterModal, setShowReciterModal] = useState(false);
  const [selectedDua, setSelectedDua] = useState<Dua | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  
  const [trackerMode, setTrackerMode] = useState<'daily' | 'qadha' | 'stats'>('daily');

  // AI Hub States
  const [aiChatInput, setAiChatInput] = useState('');
  const [aiChatResponse, setAiChatResponse] = useState('');
  const [aiChatLoading, setAiChatLoading] = useState(false);
  const [imgGenPrompt, setImgGenPrompt] = useState('');
  const [imgGenResult, setImgGenResult] = useState('');
  const [imgGenLoading, setImgGenLoading] = useState(false);
  const [vidGenPrompt, setVidGenPrompt] = useState('');
  const [vidGenResult, setVidGenResult] = useState('');
  const [vidGenLoading, setVidGenLoading] = useState(false);
  const [imgGenSize, setImgGenSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [imgGenAspect, setImgGenAspect] = useState('1:1');

  // Persistence: Tasbih
  const [customTasbihs, setCustomTasbihs] = useState<TasbihPreset[]>(() => {
    const saved = localStorage.getItem('customTasbihs');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedTasbih, setSelectedTasbih] = useState<TasbihPreset>(TASBIH_PRESETS[0]);
  const [tasbihCount, setTasbihCount] = useState(0);
  const [showCustomTasbihForm, setShowCustomTasbihForm] = useState(false);
  const [newTasbih, setNewTasbih] = useState({ name: '', max: 100 });

  // Persistence: Namaz
  const [namazStats, setNamazStats] = useState(() => {
    const saved = localStorage.getItem('namazStats');
    const today = new Date().toLocaleDateString('en-CA');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.date === today) return parsed.data;
    }
    return { Fajr: false, Dhuhr: false, Asr: false, Maghrib: false, Isha: false };
  });

  const [qadhaStats, setQadhaStats] = useState<QadhaState>(() => {
    const saved = localStorage.getItem('qadhaStats');
    return saved ? JSON.parse(saved) : { Fajr: 0, Dhuhr: 0, Asr: 0, Maghrib: 0, Isha: 0 };
  });

  const [namazHistory, setNamazHistory] = useState<NamazLogEntry[]>(() => {
    const saved = localStorage.getItem('namazHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [isGuardianUnlocked, setIsGuardianUnlocked] = useState(() => {
    return sessionStorage.getItem('guardian_unlocked') === 'true';
  });

  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(false);
  const [hijriDate, setHijriDate] = useState('Divine Sync...');
  const [hijriMonth, setHijriMonth] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState('');
  const [prayerTimes, setPrayerTimes] = useState<any>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [fatihaCount, setFatihaCount] = useState(() => Number(localStorage.getItem('fatihaCount')) || 0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const res = await fetch('https://api.alquran.cloud/v1/surah');
        const data = await res.json();
        setSurahs(data.data);
      } catch (e) { setFetchError("Failed to fetch surah list."); }
    };
    fetchSurahs();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=1`);
        const data = await res.json();
        setPrayerTimes(data.data.timings);
        setHijriDate(`${data.data.date.hijri.day} ${data.data.date.hijri.month.en} ${data.data.date.hijri.year}`);
        setHijriMonth(data.data.date.hijri.month.en);
      });
    }
  }, []);

  const handleAiChat = async () => {
    if (!aiChatInput.trim()) return;
    setAiChatLoading(true);
    try {
      const res = await askGeminiChat(aiChatInput);
      setAiChatResponse(res || 'No response');
    } catch (e) { setAiChatResponse('Error in communication.'); }
    finally { setAiChatLoading(false); }
  };

  const handleImgGen = async () => {
    if (!imgGenPrompt.trim()) return;
    setImgGenLoading(true);
    try {
      const res = await generateDivineImage(imgGenPrompt, imgGenSize, imgGenAspect);
      if (res) setImgGenResult(res);
    } catch (e) { console.error(e); }
    finally { setImgGenLoading(false); }
  };

  const handleVidGen = async () => {
    if (!vidGenPrompt.trim()) return;
    setVidGenLoading(true);
    try {
      const res = await generateVeoVideo(vidGenPrompt);
      if (res) setVidGenResult(res);
    } catch (e) { console.error(e); }
    finally { setVidGenLoading(false); }
  };

  const playTTS = async (text: string) => {
    const base64 = await speakText(text);
    if (base64) {
      const audio = new Audio(`data:audio/pcm;base64,${base64}`);
      audio.play();
    }
  };

  const handleSurahSelection = async (s: Surah) => {
    setSelectedSurah(s);
    setLoading(true);
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${s.number}/${selectedReciter.id}`);
      const data = await res.json();
      const resUrdu = await fetch(`https://api.alquran.cloud/v1/surah/${s.number}/ur.jalandhry`);
      const dataUrdu = await resUrdu.json();
      setAyahs(data.data.ayahs.map((a: any, i: number) => ({ 
        ...a, 
        translation: dataUrdu.data.ayahs[i].text 
      })));
    } catch (e) { 
      setFetchError("Failed to load Surah."); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (selectedSurah && activeTab === 'quran') {
      handleSurahSelection(selectedSurah);
    }
  }, [selectedReciter, activeTab, selectedSurah]);

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-[#011a14] text-white">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed} 
        onAdminClick={() => setIsAdminPortalOpen(true)}
        onFeedbackClick={() => {}}
        isLocked={!isGuardianUnlocked}
      />

      {isAdminPortalOpen && <AdminPortal onClose={() => setIsAdminPortalOpen(false)} isUnlocked={isGuardianUnlocked} onUnlock={(pin) => {}} onLock={() => {}} />}

      <main className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar pb-32">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           <div>
              <h1 className="text-xl font-black luxury-text uppercase tracking-widest">Syed Muhammad Tahir Ibne Syed Muhammad Mehdi</h1>
              <p className="text-[10px] font-black text-[#d4af37] uppercase tracking-widest mt-1 italic">Shia Islamic AI Hub</p>
           </div>
           <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-lg font-black uppercase">{currentTime}</p>
                <p className="text-[8px] font-black text-[#d4af37] uppercase tracking-widest">{hijriDate}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                <i className="fas fa-microchip text-[#d4af37]"></i>
              </div>
           </div>
        </header>

        {activeTab === 'home' && (
          <div className="space-y-10 animate-in fade-in duration-700">
             <section className="bg-gradient-to-br from-[#022c22] to-[#011a14] rounded-[3rem] p-10 md:p-20 text-center border border-white/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5 pointer-events-none"></div>
                <h2 className="text-4xl md:text-7xl font-black luxury-text uppercase mb-6 leading-tight">Divine Intelligence<br/>For The Shia Path</h2>
                <p className="max-w-xl mx-auto text-sm md:text-lg font-serif italic text-white/40 mb-12">"Acquire knowledge, for it is the adornment of the believer." — Imam Ali (as)</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                   <div className="glass-card p-8 rounded-3xl border-[#d4af37]/10 flex flex-col items-center">
                      <p className="text-[10px] font-black text-[#d4af37] uppercase mb-2">Sawab-e-Jariya</p>
                      <p className="text-5xl font-black mb-1">{fatihaCount}</p>
                      <p className="text-[8px] font-bold text-white/30 uppercase">Fatihas Recited</p>
                   </div>
                   <button onClick={() => { setFatihaCount(f => f+1); localStorage.setItem('fatihaCount', (fatihaCount+1).toString()); }} className="bg-[#d4af37] text-[#011a14] rounded-3xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl flex flex-col items-center justify-center p-8">
                      <i className="fas fa-heart text-2xl mb-2 animate-pulse"></i>
                      Recite Fatiha
                   </button>
                   <div className="glass-card p-8 rounded-3xl border-[#d4af37]/10 flex flex-col items-center">
                      <p className="text-[10px] font-black text-[#d4af37] uppercase mb-2">AI Hub</p>
                      <p className="text-xl font-black mb-1">Advanced Mode</p>
                      <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Gemini 3 Powered</p>
                   </div>
                </div>
             </section>
          </div>
        )}

        {activeTab === 'ask' && (
          <div className="space-y-8 animate-in fade-in duration-500">
             <div className="glass-card p-8 rounded-[2.5rem] border-white/10">
                <h3 className="text-xl font-black luxury-text uppercase mb-6">Celestial Chatbot</h3>
                <div className="flex gap-4">
                   <input 
                    value={aiChatInput}
                    onChange={e => setAiChatInput(e.target.value)}
                    placeholder="Ask about Shia history, Fiqh, or spirituality..."
                    className="flex-1 bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-[#d4af37]/50 text-sm"
                   />
                   <button 
                    onClick={handleAiChat}
                    disabled={aiChatLoading}
                    className="bg-[#d4af37] text-[#011a14] px-8 rounded-xl font-black uppercase text-xs"
                   >
                     {aiChatLoading ? 'Thinking...' : 'Consult'}
                   </button>
                </div>
                {aiChatResponse && (
                  <div className="mt-8 bg-white/5 p-6 rounded-2xl border border-white/5 prose prose-invert max-w-none">
                     <p className="text-white/80 whitespace-pre-wrap">{aiChatResponse}</p>
                     <button onClick={() => playTTS(aiChatResponse)} className="mt-4 text-[#d4af37] text-[10px] font-black uppercase flex items-center gap-2">
                        <i className="fas fa-volume-up"></i> Listen to Guidance
                     </button>
                  </div>
                )}
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card p-8 rounded-[2.5rem] border-white/10">
                   <h3 className="text-xl font-black luxury-text uppercase mb-6">Sacred Image Gen</h3>
                   <textarea 
                    value={imgGenPrompt}
                    onChange={e => setImgGenPrompt(e.target.value)}
                    placeholder="Describe a celestial scene, historical calligraphy, or sacred geometry..."
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-[#d4af37]/50 text-sm h-32 resize-none mb-4"
                   />
                   <div className="flex gap-4 mb-4">
                      <select value={imgGenSize} onChange={e => setImgGenSize(e.target.value as any)} className="flex-1 bg-white/5 border border-white/10 p-2 rounded-lg text-[10px] font-black uppercase">
                         <option value="1K">1K Res</option>
                         <option value="2K">2K Res</option>
                         <option value="4K">4K Res</option>
                      </select>
                      <select value={imgGenAspect} onChange={e => setImgGenAspect(e.target.value)} className="flex-1 bg-white/5 border border-white/10 p-2 rounded-lg text-[10px] font-black uppercase">
                         <option value="1:1">1:1 Square</option>
                         <option value="16:9">16:9 Landscape</option>
                         <option value="9:16">9:16 Portrait</option>
                      </select>
                   </div>
                   <button 
                    onClick={handleImgGen}
                    disabled={imgGenLoading}
                    className="w-full bg-white/5 border border-[#d4af37]/30 text-[#d4af37] py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-[#d4af37] hover:text-[#011a14] transition-all"
                   >
                     {imgGenLoading ? 'Manifesting...' : 'Generate Image'}
                   </button>
                   {imgGenResult && <img src={imgGenResult} alt="Generated" className="mt-6 rounded-2xl w-full shadow-2xl" />}
                </div>

                <div className="glass-card p-8 rounded-[2.5rem] border-white/10">
                   <h3 className="text-xl font-black luxury-text uppercase mb-6">Veo Video Manifest</h3>
                   <textarea 
                    value={vidGenPrompt}
                    onChange={e => setVidGenPrompt(e.target.value)}
                    placeholder="Animate a scene of spiritual reflection or cosmic light..."
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-[#d4af37]/50 text-sm h-32 resize-none mb-4"
                   />
                   <button 
                    onClick={handleVidGen}
                    disabled={vidGenLoading}
                    className="w-full bg-white/5 border border-[#d4af37]/30 text-[#d4af37] py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-[#d4af37] hover:text-[#011a14] transition-all"
                   >
                     {vidGenLoading ? 'Forging Video...' : 'Generate Video'}
                   </button>
                   {vidGenResult && <video src={vidGenResult} controls className="mt-6 rounded-2xl w-full shadow-2xl" />}
                </div>
             </div>
          </div>
        )}

        {activeTab === 'quran' && (
           <div className="space-y-6">
             {!selectedSurah ? (
               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                 {surahs.map(s => (
                   <button key={s.number} onClick={() => { handleSurahSelection(s); }} className="glass-card p-8 rounded-2xl text-left hover:border-[#d4af37]/40 transition-all group">
                     <span className="text-[10px] font-black text-[#d4af37] mb-2 block tracking-widest">№ {s.number}</span>
                     <h5 className="text-[12px] font-black uppercase">{s.englishName}</h5>
                     <span className="quran-text text-xl text-white/10 group-hover:text-[#d4af37] block text-right mt-4">{s.name}</span>
                   </button>
                 ))}
               </div>
             ) : (
               <div>
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
                    <button onClick={() => setSelectedSurah(null)} className="text-[#d4af37] uppercase font-black text-[10px]"><i className="fas fa-arrow-left"></i> All Surahs</button>
                    
                    <button 
                      onClick={() => setShowReciterModal(true)}
                      className="glass-card px-6 py-3 rounded-2xl border-[#d4af37]/20 flex items-center gap-4 group hover:border-[#d4af37]/50 transition-all"
                    >
                       <div className="text-right">
                          <p className="text-[8px] font-black text-white/30 uppercase tracking-widest">Current Reciter</p>
                          <p className="text-[10px] font-black text-[#d4af37] uppercase">{selectedReciter.name}</p>
                       </div>
                       <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center group-hover:bg-[#d4af37]/20 transition-all">
                          <i className="fas fa-microphone-lines text-[#d4af37]"></i>
                       </div>
                    </button>
                  </div>

                  <div className="glass-card p-12 rounded-[3rem] text-center border-[#d4af37]/20 mb-10">
                     <h2 className="text-4xl font-black luxury-text mb-4">{selectedSurah.englishName}</h2>
                     <p className="text-2xl quran-text text-[#d4af37]">{selectedSurah.name}</p>
                  </div>
                  
                  {loading ? (
                    <div className="text-center py-20 text-[#d4af37] font-black uppercase tracking-widest animate-pulse">Synchronizing Celestial Verses...</div>
                  ) : (
                    <div className="space-y-6">
                      {ayahs.map(a => (
                        <div key={a.number} className="glass-card p-10 rounded-[3rem] border-white/5">
                           <div className="flex justify-between items-start gap-10 mb-8">
                              <span className="w-12 h-12 shrink-0 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center text-xs font-black text-[#d4af37] border border-[#d4af37]/20">{a.numberInSurah}</span>
                              <p className="quran-text text-4xl text-right leading-relaxed flex-1">{a.text}</p>
                           </div>
                           <p className="text-sm md:text-lg text-white/60 font-serif italic mb-8 border-l-2 border-[#d4af37]/20 pl-6">{a.translation}</p>
                        </div>
                      ))}
                    </div>
                  )}
               </div>
             )}
           </div>
        )}

        {showReciterModal && (
          <div className="fixed inset-0 z-[1000] bg-[#011a14]/95 backdrop-blur-3xl flex items-center justify-center p-6 animate-in fade-in duration-300">
             <div className="glass-card p-10 rounded-[3rem] border-[#d4af37]/20 w-full max-w-4xl max-h-[80vh] overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-center mb-10">
                   <div>
                      <h3 className="text-2xl font-black luxury-text uppercase tracking-widest">Celestial Reciters</h3>
                      <p className="text-[10px] font-black text-[#d4af37] uppercase tracking-widest mt-1">Select the voice of your spiritual journey</p>
                   </div>
                   <button onClick={() => setShowReciterModal(false)} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all">
                      <i className="fas fa-times"></i>
                   </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {RECITERS.map(r => (
                     <button 
                      key={r.id}
                      onClick={() => {
                        setSelectedReciter(r);
                        setShowReciterModal(false);
                      }}
                      className={`text-left p-8 rounded-[2.5rem] border transition-all group relative overflow-hidden ${selectedReciter.id === r.id ? 'bg-[#d4af37]/10 border-[#d4af37]/40 shadow-2xl shadow-[#d4af37]/5' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                     >
                        <div className="flex justify-between items-start mb-6">
                           <div>
                              <div className="flex items-center gap-3 mb-2">
                                 <h4 className="text-lg font-black uppercase text-white group-hover:text-[#d4af37] transition-all">{r.name}</h4>
                                 {r.country && (
                                   <span className="text-lg" title={r.country}>{r.country === 'KW' ? '🇰🇼' : r.country === 'EG' ? '🇪🇬' : '🌍'}</span>
                                 )}
                              </div>
                              <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">{r.fullName}</p>
                           </div>
                           {selectedReciter.id === r.id && (
                             <div className="w-8 h-8 rounded-full bg-[#d4af37] flex items-center justify-center text-[#011a14] shadow-lg">
                                <i className="fas fa-check text-xs"></i>
                             </div>
                           )}
                        </div>
                        <p className="text-xs text-white/50 font-serif italic line-clamp-2">{r.bio}</p>
                        
                        <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-10 transition-all">
                           <i className="fas fa-microphone-alt text-8xl"></i>
                        </div>
                     </button>
                   ))}
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
