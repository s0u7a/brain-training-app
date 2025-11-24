import React, { useState, useEffect } from 'react';
import { useDualNBack } from '../hooks/useDualNBack';
import './DualNBackGame.css';

const DualNBackGame = () => {
    const [nLevel, setNLevel] = useState(1);
    const {
        isPlaying,
        currentStimulus,
        score,
        currentStep,
        totalSteps,
        feedback,
        gameOver,
        startGame,
        stopGame,
        checkMatch
    } = useDualNBack(nLevel);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isPlaying) return;
            if (e.code === 'KeyA') checkMatch('position');
            if (e.code === 'KeyL') checkMatch('audio');
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isPlaying, checkMatch]);

    if (gameOver) {
        return (
            <div className="game-over-screen">
                <h2>Session Complete!</h2>
                <p>Final Score: <span style={{ color: 'var(--success-color)', fontSize: '1.5rem' }}>{score}</span></p>
                <p>N-Level: {nLevel}</p>
                <button className="btn btn-primary" onClick={startGame}>Play Again</button>
                <button className="btn" onClick={() => window.location.reload()}>Menu</button>
            </div>
        );
    }

    if (!isPlaying) {
        return (
            <div className="start-screen">
                <h2>Dual N-Back</h2>
                <p>Match the position and sound from <strong>N</strong> steps ago.</p>

                <div className="n-selector">
                    <button className="btn" onClick={() => setNLevel(Math.max(1, nLevel - 1))}>-</button>
                    <div className="n-value">N = {nLevel}</div>
                    <button className="btn" onClick={() => setNLevel(nLevel + 1)}>+</button>
                </div>

                <button className="btn btn-primary" onClick={startGame}>Start Game</button>

                <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--secondary-color)' }}>
                    <p>Controls:</p>
                    <p><strong>A</strong> or Button: Match Position</p>
                    <p><strong>L</strong> or Button: Match Sound</p>
                </div>
            </div>
        );
    }

    return (
        <div className="game-container">
            <div className="game-info">
                <div>N: {nLevel}</div>
                <div>Score: {score}</div>
                <div>Step: {currentStep}/{totalSteps}</div>
            </div>

            <div className="grid-container">
                {[...Array(9)].map((_, i) => (
                    <div
                        key={i}
                        className={`grid-cell ${currentStimulus.position === i ? 'active' : ''}`}
                    />
                ))}
            </div>

            <div className="controls">
                <button
                    className={`btn btn-match ${feedback.position}`}
                    onClick={() => checkMatch('position')}
                >
                    Position Match
                    <span>(Press A)</span>
                </button>
                <button
                    className={`btn btn-match ${feedback.audio}`}
                    onClick={() => checkMatch('audio')}
                >
                    Sound Match
                    <span>(Press L)</span>
                </button>
            </div>
        </div>
    );
};

export default DualNBackGame;
