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
import { loginSuccess } from './action/userAction';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Sayfa yenilendiğinde veya komponent yüklendiğinde cookie'yi kontrol et
        const jwtCookie = Cookies.get('jwt');
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

                // JWT'yi cookie içine yerleştirme
                Cookies.set('jwt', data.token, { expires: 1, secure: true, sameSite: 'strict' });

                navigate('/profile');
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('hata cnm', error);
        }
    };

    return (
        <div>
            <h2>Kullanıcı Girişi</h2>
            {isLoggedIn ? (
                <div>
                    <p>Zateen.</p>
                    <button onClick={() => setIsLoggedIn(false)}>Çıkış Yap</button>
                </div>
            ) : (
                <>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label>Şifre:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit">Giriş Yap</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default LogIn;
