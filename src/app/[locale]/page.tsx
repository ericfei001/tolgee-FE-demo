import { getTranslate } from '@/tolgee/server';
import ClientComponent from '@/app/component/ClientComponent';

export default async function Home() {
    // because this is server component, use `getTranslate`
    // not useTranslate from '@tolgee/react'
    const t = await getTranslate();

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <h1 style={{ color: 'white' }}>Tolgee demo</h1>
            <h2>{t('server.component.text')}</h2>
            <ClientComponent />
        </div>
    );
}
