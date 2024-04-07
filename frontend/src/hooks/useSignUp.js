import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const signup = async ({ fullName, userName, password, confirmPassword, gender, language }) => {
        const success = handleInputErrors({ fullName, userName, password, confirmPassword, gender, language });
        if (!success) return;

        setLoading(true);

        try {
            const res = await fetch("http://localhost:8000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, userName, password, confirmPassword, gender, language })
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            } else {
                // Navigate to the login page upon successful signup
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

const handleInputErrors = ({ fullName, userName, password, confirmPassword, gender, language }) => {
    if (!fullName || !userName || !password || !confirmPassword || !gender || !language) {
        alert("All fields are necessary!");
        return false;
    }
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return false;
    }
    if (password.length < 6) {
        alert("Password must be at least six characters!");
        return false;
    }
    return true;
};

export default useSignUp;
