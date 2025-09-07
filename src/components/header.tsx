import { type FC, useState } from 'react';

import nav from '../assets/nav.svg';
import Menu from './menu';

const Header: FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuClose = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <Menu isOpen={isMenuOpen} onClose={handleMenuClose} />
            <header className="flex-centerAll fixed top-0 right-0 left-0 z-50 h-16 border-b border-gray-200 bg-white">
                <button
                    onClick={handleMenuToggle}
                    className="absolute left-4 rounded-full p-2"
                    aria-label="Открыть меню"
                >
                    <img src={nav} alt="Меню" className="h-6 w-6" />
                </button>
                <h1 className="text-xl font-bold text-black">BESIDER</h1>
            </header>
        </>
    );
};

export default Header;
