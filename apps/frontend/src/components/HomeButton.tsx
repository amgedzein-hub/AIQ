'use client';

import { useRouter } from 'next/navigation';
import { Home } from 'lucide-react';

interface HomeButtonProps {
    showConfirmation?: boolean;
    confirmationMessage?: string;
    className?: string;
}

export default function HomeButton({
    showConfirmation = false,
    confirmationMessage = 'هل أنت متأكد أنك تريد العودة إلى الصفحة الرئيسية؟',
    className = '',
}: HomeButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        if (showConfirmation) {
            if (window.confirm(confirmationMessage)) {
                router.push('/');
            }
        } else {
            router.push('/');
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`fixed top-6 left-6 rtl:right-6 rtl:left-auto z-50 
        flex items-center gap-2 px-4 py-2 
        bg-white/90 hover:bg-white 
        border border-gray-200 hover:border-gray-300
        rounded-lg shadow-md hover:shadow-lg
        transition-all duration-200
        text-gray-700 hover:text-gray-900
        font-medium text-sm
        ${className}`}
            aria-label="العودة للصفحة الرئيسية"
        >
            <Home size={18} />
            <span>الرئيسية</span>
        </button>
    );
}
