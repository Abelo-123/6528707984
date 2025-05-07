import React, { useState, useEffect } from 'react';

const ButtonComponent = ({ status }: { status: string }) => {
    const [isCooldown, setIsCooldown] = useState(false);

    useEffect(() => {
        if (status === "Completed") {
            setIsCooldown(true);
            const cooldownTimer = setTimeout(() => {
                setIsCooldown(false);
            }, 3 * 60 * 1000); // 3 minutes cooldown

            return () => clearTimeout(cooldownTimer); // Cleanup on unmount
        }
    }, [status]);

    return (
        <button disabled={isCooldown}>
            {isCooldown ? "Cooldown Active" : "Click Me"}
        </button>
    );
};

export default ButtonComponent;
