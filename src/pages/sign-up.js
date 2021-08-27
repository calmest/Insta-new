/* eslint-disable */
import { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';

export default function SignUp() {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === '';

    const handleSignUp = async (event) => {
        event.preventDefault();

        const usernameExists = await doesUsernameExist(username);
        if (!usernameExists.length) {
            try {
                const createdUserResult = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(emailAddress, password);

                // authentication
                // -> emailAddress & password & username (displayName)
                await createdUserResult.user.updateProfile({
                    displayName: username
                });

                // firebase user collection (create a document)
                await firebase.firestore().collection('users').add({
                    userId: createdUserResult.user.uid,
                    username: username.toLowerCase(),
                    fullName,
                    emailAddress: emailAddress.toLowerCase(),
                    following: [],
                    dateCreated: Date.now()
                });

                history.push(ROUTES.DASHBOARD);

            } catch (error) {
                setFullName('');
                setEmailAddress('');
                setPassword('');
                setError(error.message)
            }
        } else {
            setError('That username is already taken, please try another.')
        }
    };

    useEffect(() => {
        document.title = 'Sign Up - Instagram';
    }, []);

    return (
        <div className="container flex items-center h-screen max-w-screen-md mx-auto">
            <div className="flex w-3/5">
                <img src="/images/iphone-with-profile.jpg" alt="iPhone with Instagram" />
            </div>
            <div className="flex flex-col w-2/5 w-flex">
                <div className="flex flex-col items-center p-4 mb-4 bg-white border rounded border-gray-primary">
                    <h1 className="flex justify-center w-full">
                        <img src="/images/logo.png" alt="Instagram" className="w-6/12 mt-2 mb-4"/>
                    </h1>

                    {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                    <form onSubmit={handleSignUp} method="POST">
                        <input 
                            aria-label="Enter your username" 
                            type="text"
                            placeholder="Username" 
                            className="w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border rounded text-gray-base border-gray-primary"
                            onChange={({ target }) => setUsername(target.value)}
                            value={username}
                        />
                        <input 
                            aria-label="Enter your full name" 
                            type="text"
                            placeholder="Full Name" 
                            className="w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border rounded text-gray-base border-gray-primary"
                            onChange={({ target }) => setFullName(target.value)}
                            value={fullName}
                        />
                        <input 
                            aria-label="Enter your email address" 
                            type="text"
                            placeholder="Email address" 
                            className="w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border rounded text-gray-base border-gray-primary"
                            onChange={({ target }) => setEmailAddress(target.value)}
                            value={emailAddress}
                        />
                        <input 
                            aria-label="Enter your password" 
                            type="password"
                            placeholder="Password" 
                            className="w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border rounded text-gray-base border-gray-primary"
                            onChange={({ target }) => setPassword(target.value)}
                            value={password}
                        />
                        <button 
                            disabled={isInvalid}
                            type="submit" 
                            className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50'}`}
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
                <div className="flex flex-col items-center justify-center w-full p-4 bg-white border rounded border-gray-primary">
                    <p className="text-sm">
                        Have an account?{` `}
                        <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}