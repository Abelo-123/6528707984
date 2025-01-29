'use client'
import React, { useEffect } from 'react';

// Assuming ChapaCheckout is a global variable provided by the loaded script
declare const ChapaCheckout: any;

const ChapaPayment = () => {
    useEffect(() => {
        // Dynamically load the Chapa inline script only if it's not already loaded
        if (!document.querySelector('script[src="https://js.chapa.co/v1/inline.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://js.chapa.co/v1/inline.js';
            script.async = true;
            script.onload = () => {
                // Initialize ChapaCheckout after the script is loaded
                const chapa = new ChapaCheckout({
                    publicKey: 'CHAPUBK-jAUMgGr2eCLXX2isTp3nu5qhfuKBROQb',
                    amount: '100',
                    currency: 'ETB',
                    mobile: '0911223344',
                    showFlag: true,
                    showPaymentMethodsNames: true,
                    onSuccessfulPayment: (result, refId) => {
                        console.log("Payment successful:", result, refId);
                    },
                    onPaymentFailure: (errorMessage) => {
                        console.error("Payment failed:", errorMessage);
                    },
                    onClose: () => {
                        console.log("Payment popup closed.");
                    },
                });

                // Initialize the Chapa inline form
                chapa.initialize('chapa-inline-form');
            };
            document.body.appendChild(script);
        }

        // Cleanup: remove the script when the component unmounts
        return () => {
            const script = document.querySelector('script[src="https://js.chapa.co/v1/inline.js"]');
            if (script) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <div>
            <div className="payment-container" id="chapa-inline-form"></div>

            <style jsx>{`
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
        }
        .payment-container {
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border: 1px solid #ddd;
          border-radius: 5px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        #chapa-phone-input-container {
          margin-bottom: 15px;
        }
        #chapa-payment-methods {
          margin-bottom: 15px;
          text-align: center;
        }
        button#chapa-pay-button {
          display: block;
          width: 100%;
          padding: 10px;
          font-size: 16px;
          border: none;
          cursor: pointer;
          background-color: #892289;
          color: #FFFFFF;
          border-radius: 10px;
        }
        button#chapa-pay-button:hover {
          background-color: #6BB300;
        }
        .chapa-payment-method {
          display: inline-block;
          cursor: pointer;
          text-align: center;
          transition: transform 0.2s, box-shadow 0.2s;
          border-radius: 10px;
          padding: 8px;
          width: 60px;
          height: 60px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
        }
        .chapa-payment-method img {
          width: 32px;
          height: 32px;
          margin-bottom: 5px;
        }
        .chapa-payment-method span {
          display: block;
          font-size: 10px;
        }
        .chapa-payment-method.selected {
          transform: scale(1.1);
          box-shadow: 0 0 10px rgba(0, 123, 255, 0.5); /* Blue glow */
          border: 2px solid #007BFF; /* Blue border */
          background-color: #f0f8ff; /* Light blue background */
        }
        #chapa-error-container {
          color: #FF0000;
          margin-top: 5px;
          font-size: 14px;
          font-weight: bold;
          display: none;
        }
        #chapa-loading-container {
          display: none;
          text-align: center;
          margin-top: 20px;
        }
        .chapa-spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-top: 4px solid #007BFF;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
        </div>
    );
};

export default ChapaPayment;
