import type { FC } from 'react';

import newsApi from '../assets/newsApi.png';

const Footer: FC = () => {
    return (
        <footer className="flex-centerAll flex-col gap-6 border-t border-gray-200 bg-white px-4 py-6">
            <nav aria-label="Footer">
                <ul className="flex flex-wrap justify-center gap-4 text-xs">
                    <li>
                        <a href="/login" className="text-gray-600 transition-colors hover:text-gray-900">
                            Log In
                        </a>
                    </li>
                    <li>
                        <a href="/about" className="text-gray-600 transition-colors hover:text-gray-900">
                            About Us
                        </a>
                    </li>
                    <li>
                        <a href="/publishers" className="text-gray-600 transition-colors hover:text-gray-900">
                            Publishers
                        </a>
                    </li>
                    <li>
                        <a href="/sitemap" className="text-gray-600 transition-colors hover:text-gray-900">
                            Sitemap
                        </a>
                    </li>
                </ul>
            </nav>

            <a href="https://developer.nytimes.com/" target="_blank" className="text-center text-sm text-gray-600">
                Powered by <img src={newsApi} alt="New York Times API" className="mx-auto mt-2 w-fit" />
            </a>

            <p className="text-xs">© 2023 Besider. Inspired by Insider</p>
        </footer>
    );
};

export default Footer;
