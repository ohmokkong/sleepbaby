import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Moon, Sun, Wind, Music, Heart, User, ChevronRight, Star, Home, ArrowLeft } from 'lucide-react';

// --- Types ---
type Step = 'landing' | 'questionnaire' | 'dashboard';

// --- Components ---

const Button = ({ children, onClick, variant = 'primary', className = '' }: { children: React.ReactNode; onClick: () => void; variant?: 'primary' | 'secondary' | 'kakao' | 'naver'; className?: string }) => {
    const baseStyle = "relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden group";

    const variants = {
        primary: "bg-gradient-to-r from-[#7EA7E0] to-[#C5B4E7] text-white shadow-[0_10px_30px_rgba(126,167,224,0.4)] hover:shadow-[0_15px_40px_rgba(126,167,224,0.6)] hover:-translate-y-1",
        secondary: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
        kakao: "bg-[#FEE500] text-[#3C1E1E] hover:bg-[#FADA0A] shadow-lg",
        naver: "bg-[#03C75A] text-white hover:bg-[#02b351] shadow-lg",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`${baseStyle} ${variants[variant]} ${className}`}
        >
            <span className="relative z-10 flex items-center gap-2">{children}</span>
            {variant === 'primary' && (
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            )}
        </motion.button>
    );
};

const Questionnaire = ({ onComplete }: { onComplete: () => void }) => {
    const [step, setStep] = useState(0);
    const questions = [
        { title: '오늘 밤, 당신의 기분은 어떤가요?', options: ['잠이 오지 않아요 🌙', '스트레스가 많았어요 🤯', '불안한 마음이에요 😟', '편안하게 쉬고 싶어요 🌿'] },
        { title: '어떤 소리를 들으며 잠들고 싶나요?', options: ['토닥이는 빗소리 ☔', '잔잔한 피아노 🎹', '따뜻한 모닥불 🔥', '조용한 명상 🧘'] },
        { title: '평소 수면 시간은 어떻게 되나요?', options: ['5시간 미만', '6~7시간', '8시간 이상', '불규칙해요'] },
    ];

    const handleNext = () => {
        if (step < questions.length - 1) setStep(step + 1);
        else onComplete();
    };

    return (
        <div className="w-full max-w-lg mx-auto">
            <div className="flex gap-2 mb-8 justify-center">
                {questions.map((_, i) => (
                    <motion.div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-500 ${i <= step ? 'w-8 bg-[#C5B4E7]' : 'w-2 bg-white/20'}`}
                    />
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                    transition={{ duration: 0.5 }}
                    className="glass p-8 md:p-10 rounded-[2rem] border border-white/10 shadow-2xl bg-white/5 backdrop-blur-2xl"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white text-center leading-tight">
                        {questions[step].title}
                    </h2>
                    <div className="grid gap-4">
                        {questions[step].options.map((option, i) => (
                            <motion.button
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={handleNext}
                                className="w-full p-5 text-lg font-medium text-left rounded-2xl bg-white/5 border border-white/10 hover:bg-white/15 hover:border-[#C5B4E7]/50 hover:pl-7 transition-all duration-300 group flex justify-between items-center"
                            >
                                <span className="text-white/90 group-hover:text-white">{option}</span>
                                <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-[#C5B4E7] group-hover:translate-x-1 transition-all" />
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-8 left-0 right-0 mx-auto w-[90%] max-w-xl glass rounded-[2rem] p-3 pl-5 pr-5 flex items-center gap-5 z-50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 ring-1 ring-white/20"
        >
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#7EA7E0] to-[#C5B4E7] flex items-center justify-center shadow-inner shrink-0 animate-pulse-slow">
                <Music className="text-white w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-white truncate">제주도 사려니 숲길의 밤</h4>
                <p className="text-sm text-white/60 truncate">자연의 소리 • 15분</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
                <button className="p-2 text-white/60 hover:text-white transition-colors"><SkipBack className="w-6 h-6" /></button>
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 rounded-full bg-white text-[#4F67A0] flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                >
                    {isPlaying ? <Pause fill="currentColor" className="w-5 h-5" /> : <Play fill="currentColor" className="w-5 h-5 ml-1" />}
                </button>
                <button className="p-2 text-white/60 hover:text-white transition-colors"><SkipForward className="w-6 h-6" /></button>
            </div>
        </motion.div>
    );
};

export default function App() {
    const [step, setStep] = useState<Step>('landing');

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-x-hidden font-sans selection:bg-[#C5B4E7]/30">

            {/* --- Background Elements --- */}
            {/* 1. Hero Image Background with Fade */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/20 to-[#0a0a0a] z-10" />
                <img
                    src="/hero_v2.png"
                    alt="Background"
                    className="w-full h-[80vh] object-cover opacity-70"
                />
            </div>

            {/* 2. Ambient Gradient Orbs (Colors) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#7EA7E0]/20 rounded-full blur-[120px] mix-blend-screen animate-float" />
                <div className="absolute bottom-[-10%] right-[-20%] w-[60vw] h-[60vw] bg-[#C5B4E7]/15 rounded-full blur-[120px] mix-blend-screen animate-float" style={{ animationDelay: '-3s' }} />
            </div>

            {/* --- Main Content --- */}
            <main className="relative z-10 min-h-screen flex flex-col px-6 md:px-12 max-w-7xl mx-auto w-full">

                {/* Header */}
                <header className="w-full py-8 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Moon className="w-6 h-6 text-[#C5B4E7]" />
                        <span className="text-xl font-bold tracking-tight text-white">SleepBaby</span>
                    </div>
                    {step === 'dashboard' && (
                        <div className="flex gap-3">
                            <button className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors"><Heart className="w-5 h-5" /></button>
                            <button className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors"><User className="w-5 h-5" /></button>
                        </div>
                    )}
                </header>

                <div className="flex-1 flex flex-col justify-center items-center pb-20">
                    <AnimatePresence mode="wait">

                        {/* 1. Landing Page */}
                        {step === 'landing' && (
                            <motion.div
                                key="landing"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-center max-w-4xl mx-auto"
                            >
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.8 }}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8"
                                >
                                    <Star className="w-4 h-4 text-[#FFDE9E] fill-[#FFDE9E]" />
                                    <span className="text-sm font-medium text-white/80">당신을 위한 프리미엄 수면 케어</span>
                                </motion.div>

                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-wide leading-[3]">
                                    오늘 밤, <br className="md:hidden" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7EA7E0] via-[#C5B4E7] to-[#F9E0D4]">
                                        가장 평온한 꿈
                                    </span>을<br />
                                    선물해 드릴게요.
                                </h1>

                                <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-2xl mx-auto">
                                    복잡한 하루의 끝, 오직 당신만을 위해 준비된<br className="hidden md:block" />
                                    맞춤형 사운드와 명상으로 깊은 휴식을 경험하세요.
                                </p>

                                <div className="flex flex-col items-center gap-4 w-full max-w-sm mx-auto">
                                    <Button onClick={() => setStep('questionnaire')} className="w-full">
                                        3초 만에 시작하기 <ChevronRight className="w-5 h-5" />
                                    </Button>
                                    <div className="grid grid-cols-2 gap-3 w-full">
                                        <Button variant="kakao" onClick={() => { }} className="text-sm py-3">카카오 시작</Button>
                                        <Button variant="naver" onClick={() => { }} className="text-sm py-3">네이버 시작</Button>
                                    </div>
                                    <p className="text-xs text-white/30 mt-4">회원가입 없이 바로 체험해보세요.</p>
                                </div>
                            </motion.div>
                        )}

                        {/* 2. Questionnaire */}
                        {step === 'questionnaire' && (
                            <motion.div
                                key="questionnaire"
                                className="w-full"
                            >
                                <Questionnaire onComplete={() => setStep('dashboard')} />
                            </motion.div>
                        )}

                        {/* 3. Dashboard */}
                        {step === 'dashboard' && (
                            <motion.div
                                key="dashboard"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="w-full max-w-6xl"
                            >
                                <div className="mb-12 text-center md:text-left">
                                    <h2 className="text-3xl md:text-4xl font-bold mb-2">반가워요, <span className="text-[#C5B4E7]">지친 하루</span>님 🌙</h2>
                                    <p className="text-white/60 text-lg">분석된 수면 패턴에 딱 맞는 플랜을 준비했어요.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                                    {[
                                        { title: "깊은 수면 유도", desc: "델타파 바이노럴 비트", icon: <Moon className="w-8 h-8 text-white" />, color: "from-blue-600/50 to-indigo-700/50" },
                                        { title: "불안감 해소", desc: "4-7-8 호흡법 가이드", icon: <Wind className="w-8 h-8 text-white" />, color: "from-teal-500/50 to-emerald-600/50" },
                                        { title: "아침 긍정 확언", desc: "활기찬 하루 시작", icon: <Sun className="w-8 h-8 text-white" />, color: "from-orange-400/50 to-rose-500/50" },
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            whileHover={{ y: -10, scale: 1.02 }}
                                            className={`relative overflow-hidden p-8 rounded-[2rem] bg-gradient-to-br ${item.color} shadow-2xl cursor-pointer group backdrop-blur-xl border border-white/10`}
                                        >
                                            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-125 transition-transform duration-500">
                                                {item.icon}
                                            </div>
                                            <div className="relative z-10">
                                                <div className="mb-6 bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                                    {item.icon}
                                                </div>
                                                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                                                <p className="text-white/80">{item.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <section>
                                    <div className="flex justify-between items-end mb-8 px-2">
                                        <h3 className="text-2xl font-bold">오늘의 추천 사운드</h3>
                                        <button className="text-[#C5B4E7] text-sm font-medium hover:text-white transition-colors">전체보기</button>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        {[1, 2, 3, 4].map((i) => (
                                            <motion.div
                                                key={i}
                                                whileHover={{ y: -5 }}
                                                className="aspect-[4/5] rounded-[2rem] glass overflow-hidden relative group cursor-pointer border border-white/5"
                                            >
                                                <img
                                                    src={`https://picsum.photos/seed/${i + 100}/400/500`}
                                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
                                                    alt="Sound"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                                        <Play className="w-5 h-5 fill-white text-white" />
                                                    </div>
                                                    <p className="font-bold text-lg leading-tight mb-1">편안한 빗소리 {i}</p>
                                                    <p className="text-xs text-white/60">자연의 소리 • 30분</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </section>

                                <AudioPlayer />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* Navigation Buttons (Floating) */}
            {step !== 'landing' && (
                <div className="fixed bottom-8 left-8 z-50 flex gap-4">
                    <button
                        onClick={() => {
                            if (step === 'dashboard') setStep('questionnaire');
                            else if (step === 'questionnaire') setStep('landing');
                        }}
                        className="p-4 rounded-full glass border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.3)] group"
                        title="이전 화면"
                    >
                        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <button
                        onClick={() => setStep('landing')}
                        className="p-4 rounded-full glass border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.3)] group"
                        title="처음으로"
                    >
                        <Home className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            )}

            {/* Footer info */}
            <footer className="fixed bottom-4 left-0 w-full text-center z-10 text-xs text-white/20 pointer-events-none">
                © 2026 SleepBaby. All rights reserved.
            </footer>
        </div>
    );
}
