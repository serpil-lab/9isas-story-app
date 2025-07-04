import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';

const VerificationPendingPage: React.FC = () => {
    const { logOut, user, reloadUser } = useAuth();
    const [message, setMessage] = useState<string | null>(null);
    const [isChecking, setIsChecking] = useState(false);

    const handleResend = async () => {
        if (user) {
            try {
                await sendEmailVerification(user);
                setMessage("A new verification email has been sent. Please check your inbox (and spam folder).");
            } catch (error) {
                setMessage("Failed to resend verification email. Please try again later.");
            }
        }
    };

    const handleCheckVerification = async () => {
        setIsChecking(true);
        setMessage(null);
        try {
            await reloadUser();
            // onIdTokenChanged in AuthContext handles navigation if verified.
        } catch (error) {
            console.error("Error reloading user status:", error);
            setMessage("An error occurred while checking your verification status.");
        } finally {
            // Add a small delay for user feedback on the button
            setTimeout(() => setIsChecking(false), 2000);
        }
    };

    return (
        <div className="min-h-screen w-full bg-slate-900 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-gray-200 flex items-center justify-center p-4">
            <div className="w-full max-w-lg text-center mx-auto bg-slate-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl shadow-purple-900/30 animate-fade-in">
                <h1 className="text-4xl font-bold text-white font-title mb-4">Almost there!</h1>
                <p className="text-lg text-gray-300 mb-6">
                    We've sent a verification link to <strong className="text-purple-300">{user?.email}</strong>. Please check your inbox and click the link to activate your account.
                </p>
                
                {message && <p className="text-green-300 bg-green-900/50 p-3 rounded-lg mb-6">{message}</p>}

                <div className="flex flex-col items-center justify-center gap-4">
                    <button
                        onClick={handleCheckVerification}
                        disabled={isChecking}
                        className="w-full max-w-xs px-6 py-3 font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-wait"
                    >
                        {isChecking ? 'Checking...' : "I've Verified, Continue"}
                    </button>
                    <div className="flex items-center gap-6">
                        <button
                            onClick={handleResend}
                            className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                        >
                            Resend Email
                        </button>
                        <button
                            onClick={logOut}
                            className="text-sm font-semibold text-gray-400 hover:text-gray-300 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
                 <p className="text-sm text-gray-500 mt-8">
                    Clicked the link in your email? Click the "Continue" button above to proceed.
                </p>
            </div>
        </div>
    );
};

export default VerificationPendingPage;