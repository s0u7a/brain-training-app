import { useState, useEffect, useRef, useCallback } from 'react';

const GRID_SIZE = 9;
const LETTERS = ['A', 'B', 'C', 'H', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T'];

export const useDualNBack = (n = 1, roundLength = 20, speed = 2500) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [score, setScore] = useState(0);
    const [history, setHistory] = useState([]);
    const [currentStimulus, setCurrentStimulus] = useState({ position: null, letter: null });
    const [feedback, setFeedback] = useState({ position: null, audio: null }); // 'correct', 'wrong', 'missed'
    const [gameOver, setGameOver] = useState(false);

    const timerRef = useRef(null);
    const responsesRef = useRef({ position: false, audio: false });

    const generateStimulus = () => {
        const position = Math.floor(Math.random() * GRID_SIZE);
        const letter = LETTERS[Math.floor(Math.random() * LETTERS.length)];
        return { position, letter };
    };

    const speakLetter = (letter) => {
        // Use the backend proxy for Google TTS
        // Add a timestamp to prevent caching if needed, though caching is actually good here
        const audio = new Audio(`/api/tts?text=${letter}`);
        audio.play().catch(e => console.error("Audio play failed:", e));
    };

    const startGame = () => {
        setIsPlaying(true);
        setGameOver(false);
        setScore(0);
        setCurrentStep(0);
        setHistory([]);
        setFeedback({ position: null, audio: null });
        responsesRef.current = { position: false, audio: false };
        nextTurn();
    };

    const stopGame = () => {
        setIsPlaying(false);
        clearTimeout(timerRef.current);
        window.speechSynthesis.cancel();
    };

    const nextTurn = useCallback(() => {
        if (currentStep >= roundLength) {
            stopGame();
            setGameOver(true);
            return;
        }

        // Process missed matches from previous turn
        // (Logic simplified for now: we only score on user action or end of turn)

        const newStimulus = generateStimulus();

        // Occasionally force a match to ensure playability (approx 30% chance)
        if (history.length >= n && Math.random() < 0.3) {
            const target = history[history.length - n];
            if (Math.random() < 0.5) newStimulus.position = target.position;
            if (Math.random() < 0.5) newStimulus.letter = target.letter;
        }

        setHistory(prev => [...prev, newStimulus]);
        setCurrentStimulus(newStimulus);
        setFeedback({ position: null, audio: null });
        responsesRef.current = { position: false, audio: false };

        speakLetter(newStimulus.letter);
        setCurrentStep(prev => prev + 1);

        timerRef.current = setTimeout(nextTurn, speed);
    }, [currentStep, roundLength, n, speed, history]);

    const checkMatch = (type) => { // type: 'position' | 'audio'
        if (!isPlaying || responsesRef.current[type]) return;

        responsesRef.current[type] = true;

        if (history.length <= n) {
            // Cannot match yet
            setFeedback(prev => ({ ...prev, [type]: 'wrong' }));
            return;
        }

        const current = history[history.length - 1];
        const target = history[history.length - 1 - n];

        const isMatch = type === 'position'
            ? current.position === target.position
            : current.letter === target.letter;

        if (isMatch) {
            setScore(prev => prev + 100);
            setFeedback(prev => ({ ...prev, [type]: 'correct' }));
        } else {
            setScore(prev => Math.max(0, prev - 50));
            setFeedback(prev => ({ ...prev, [type]: 'wrong' }));
        }
    };

    useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);

    return {
        isPlaying,
        currentStimulus,
        score,
        currentStep,
        totalSteps: roundLength,
        feedback,
        gameOver,
        startGame,
        stopGame,
        checkMatch
    };
};
