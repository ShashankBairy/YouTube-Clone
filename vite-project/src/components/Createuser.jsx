import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './user.css';

function Createuser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error: ${errorData.message || response.statusText}`);
            }

            const data = await response.json();
            console.log('User created:', data);
            console.log("username:", data.user.username);

            localStorage.setItem('username', data.user.username);

            navigate('/login');
        } catch (error) {
            console.error('Error during registration:', error.message);
            alert(`Registration failed: ${error.message}`);
        } // here it is used to creating the user
    };
    return (
        <div className="userform">
            <div className="createuser-form">
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Username" 
                    required 
                />
                
                <label>Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email"
                    required 
                />
                <label>Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password"
                    required 
                />
                <button style={{marginBottom:'10px'}}type="submit">Register</button>
                
                <label>Already a User?</label>
                <button type="button" onClick={() => navigate('/login')}>
                    Login
                </button>
                
              
            </form>
        </div>
        </div>
        
    );
}

export default Createuser;
