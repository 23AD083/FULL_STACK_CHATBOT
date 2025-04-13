// src/services/authService.js
export const login = async (email, password) => {
    try {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);
        return data; // Return token or user data
    } catch (error) {
        console.error("Error during login:", error.message);
        throw error;
    }
};
