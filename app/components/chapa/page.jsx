"use client";
import React, { useEffect, useState } from 'react';

const EmbedHTML = () => {
    const [again, setAgain] = useState(true); // Initially set to true to show the container
    const [iframeVisible, setIframeVisible] = useState(false); // Control iframe visibility
    const [amount, setAmount] = useState('');
    const [iframeKey, setIframeKey] = useState(0); // Key to force iframe reload

    // Generate iframe src dynamically based on the amount
    const generateIframeSrc = () => {
        if (amount > 5) {
            return `https://paxyo.com/chapa.html?amount=${amount}`;
        }
        return ''; // Return an empty string if the amount is not valid
    };

    useEffect(() => {
        const handleMessage = (event) => {
            // Validate the origin to ensure the message is from the expected source
            if (event.origin !== 'https://paxyo.com') return;

            const { type, message } = event.data;

            // Handle different message types
            if (type === 'payment-success') {
                console.log(message); // e.g., "Payment was successful!"
                alert(message);
                setAgain(true); // Set to true to show the container
                setIframeVisible(true); // Make iframe visible again
            } else if (type === 'payment-failure' || type === 'payment-closed') {
                console.error(message); // Handle failure or closed event
                alert(message);
                setAgain(false); // Hide container and show iframe
           //    setIframeVisible(false); // Hide iframe on failure or closed event
            } else if (type === 'payment-closed') {
                alert(message);
                setAgain(false);
                console.log(message); // e.g., "Payment popup closed."
              //  setIframeVisible(false); // Hide iframe on close
            }
        };

        // Add the message listener
        window.addEventListener('message', handleMessage);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    return (
        <>
           

            {/* Amount input */}
            <div className="amount-container">
                <input
                    type="text"
                    placeholder="Enter amount"
                    value={amount}
                    onInput={(e) => {
                        setAmount(e.target.value);
                    }}
                />
                   <button
                onClick={() => {
                    setIframeKey((prevKey) => prevKey + 1)
                    setIframeVisible(true)
                }}
                disabled={amount <= 5 || amount === ""}
                style={{ marginTop: '10px', padding: '10px', backgroundColor: amount > 50 ? 'green' : 'gray', color: 'white' }}
            >
                {again ? "continue" : "try again"}
            </button>
                {amount !== "" && amount < 5 && "Must be greater than 50"}
            </div>

            {/* Proceed button only enabled if the amount is valid */}
           

            {/* Show iframe only after clicking Proceed */}
            <div className="iframe-container relative">
                {iframeVisible && (
                    <iframe
                        key={iframeKey} // Use key to force iframe reload
                        src={generateIframeSrc()} // Dynamically set iframe src
                        width="100%"
                        height="310rem"
                        title="Embedded HTML"
                        frameBorder="0"
                    />
                )}
            </div>
         
        </>
    );
};

export default EmbedHTML;
