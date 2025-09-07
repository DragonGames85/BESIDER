import type { FC } from 'react';

import cross from '../assets/cross.svg';

interface MenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const Menu: FC<MenuProps> = ({ isOpen, onClose }) => {
    const categories = ['SCIENCE', 'GENERAL', 'ENTERTAINMENT', 'TECHNOLOGY', 'BUSINESS', 'HEALTH', 'SPORTS'];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-white">
            <div className="flex justify-end p-4">
                <button
                    onClick={onClose}
                    className="rounded-full p-2 transition-colors hover:bg-gray-100"
                    aria-label="Закрыть меню"
                >
                    <img src={cross} alt="Закрыть" className="h-6 w-6" />
                </button>
            </div>

            <nav className="px-6 py-8">
                <ul className="space-y-6">
                    {categories.map(category => (
                        <li key={category}>
                            <button
                                className="text-2xl font-bold tracking-wide text-black uppercase transition-colors hover:text-gray-600"
                                onClick={onClose}
                            >
                                {category}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Menu;
