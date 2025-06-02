import React from 'react';

const Results = ({ results }) => {
    return (
        <div className="slide">
            <h2>Health Results</h2>
            <div className={results.alertMessage ? 'alert-message' : 'good-health-message'}>
                {results.alertMessage || 'All metrics are normal!'}
            </div>
            {results.recommendedTests.length > 0 && (
                <ul className="tests">
                    {results.recommendedTests.map((test, index) => (
                        <li key={index}>{test}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Results;
