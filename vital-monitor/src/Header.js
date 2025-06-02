import React from 'react';

const Header = ({ currentSlideIndex }) => {
    return (
        <header>
            <h1>Vital Monitor</h1>
            <nav>
                {currentSlideIndex > 0 && <button onClick={() => window.location.reload()}>Home</button>}
                {currentSlideIndex > 0 && <button onClick={() => window.history.back()}>Back</button>}
            </nav>
        </header>
    );
};

export default Header;
