'use client';
import { useTranslate } from '@tolgee/react';

const ClientComponent = () => {
    const { t } = useTranslate();

    return (
        <>
            <div>{t('test01')}</div>
            <div>{t('test02')}</div>
        </>
    );
};
export default ClientComponent;
