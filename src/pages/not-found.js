/* eslint-disable */
import { useEffect } from 'react';

export default function NotFound() {
    useEffect(() => {
        document.title = 'Not Found - Instagram';
    }, []);

    return (
        <div className="bg-gray-background">
            <div className="max-w-screen-lg mx-auth">
                <p className="text-2xl text-center">
                    Not Found!
                </p>
            </div>
        </div>
    );
}