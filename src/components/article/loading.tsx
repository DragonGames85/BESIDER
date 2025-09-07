import type { FC } from 'react';

import loadingImg from '../../assets/loading.svg';

const Loading: FC = () => {
    return (
        <div role="status" className="w-full">
            <img src={loadingImg} className="mx-auto animate-spin" />
        </div>
    );
};

export default Loading;
