// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { loginSuccess } from './action/userAction';
// import { useNavigate } from 'react-router-dom';

// const LogIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (isLoggedIn) {
//         console.log('Kullanıcı zaten giriş yapmış.');
//         return;
//       }

//       const response = await fetch('http://localhost:3000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),

//       });
     
//       const data = await response.json();

//       console.log(data,"heyy");
 
//       if (response.ok) {
//         setIsLoggedIn(true);
//         dispatch(loginSuccess());
//         navigate('/profile');

//       } else {
//         setError(data.message);
//       }
//     } catch (error) {
//       console.error('hata cnm', error);
//     }

//   };


//   return (
//     <div>
//       <h2>Kullanıcı Girişi</h2>
//       {isLoggedIn ? (
//         <div>
//           <p>Zateen.</p>
//           <button onClick={() => setIsLoggedIn(false)}>Çıkış Yap</button>
//         </div>
//       ) : (
//         <>
//           {error && <div style={{ color: 'red' }}>{error}</div>}
//           <form onSubmit={handleSubmit}>
//             <div>
//               <label>Email:</label>
//               <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//             </div>
//             <div>
//               <label>Şifre:</label>
//               <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//             </div>
//             <button type="submit">Giriş Yap</button>
//           </form>
//         </>
//       )}
//     </div>
//   );
// };

// export default LogIn;
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, logoutSuccess } from './action/userAction';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import "./styles/Login.css";
import { getUserId } from './helpers/auth';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null); 


    useEffect(() => {
        const jwtCookie = Cookies.get('user_token');
        if (jwtCookie) {
            setIsLoggedIn(true);
        }
    }, []);

      

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLoggedIn) {
                console.log('Kullanıcı zaten giriş yapmış.');
                return;
            }
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
           });

            const data = await response.json();

            if (response.ok) {
                setIsLoggedIn(true);
                dispatch(loginSuccess());

                const d = new Date();
                d.setTime(d.getTime() + (24 * 60 * 60 * 1000));   
                document.cookie = `user_token=${data.cookie}; expires=${d.toUTCString()}; path=/; Secure; SameSite=Lax`;
    
                navigate('/profile');
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('hata cnm', error);
        }
    };
    const handleLogout = () => {
        Cookies.remove('user_token'); 
        setIsLoggedIn(false); 
        dispatch(logoutSuccess()); 
        navigate('/login'); 
    };


    useEffect(() => {
        const id = getUserId(); 
        setUserId(id); 
    }, []); 

    useEffect(() => {
        if (userId) {
            console.log("User ID:", userId); // userId var ise konsola yazdır
        }
    }, [userId]);

    return (
        <div className="login-container">
            <h2>User Log In</h2>
            {isLoggedIn ? (
                <div>
                    <p>Zateen.</p>
                    <button onClick={() => setIsLoggedIn(false)}>Çıkış Yap</button>
                </div>
            ) : (
                <>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <form className='login-form' onSubmit={handleSubmit}>
                        <div>
                            <label>Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit">Log In</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default LogIn;
