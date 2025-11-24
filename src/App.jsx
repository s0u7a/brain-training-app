import React from 'react';
import DualNBackGame from './components/DualNBackGame';

function App() {
    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Brain Training</h1>
                <p>Dual N-Back</p>
            </header>
            <main>
                <DualNBackGame />
            </main>
        </div>
    );
}

export default App;
