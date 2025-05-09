module.exports = {
    extends: "next/core-web-vitals",
    plugins: ["@typescript-eslint"], // Add the @typescript-eslint plugin
    rules: {
        // Disable all rules
        "no-unused-vars": "off",
        "no-undef": "off",
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        // Add other rules here as needed
    },
};
