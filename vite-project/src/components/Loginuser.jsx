import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './user.css';

function Loginuser() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Validation: Check if any field is empty
        if (!email || !password) {
            alert("Please fill in all fields."); // Alert user if fields are empty
            return; // Stop the function if validation fails
        }

        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email:email, password:password }), // Simplified body
            });
            
            if (!response.ok) {
                const errorData = await response.json(); // Get error details
                throw new Error(`Error: ${errorData.message || response.statusText}`);
            }
            const result = await response.json();
            console.log('Login Created: ', result);
            
            // Store the username in localStorage
            localStorage.setItem('username', result.user.username);
            localStorage.setItem('token', result.token);
             // Adjust based on your API response
            navigate('/'); // Redirect to the homepage after login
        } catch (error) {
            console.error('Error during login:', error.message); // Log any errors
            alert(`Login failed: ${error.message}`); // Alert user about the error
        }
    };

    return (
        <div className="userform">
            <div className="createuser-form">
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <label>Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Submit</button>
            </form>
        </div>
        </div>
        
    );
}

export default Loginuser;
