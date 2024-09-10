import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import TolgeeNextProvider from '@/tolgee/clientProvider';
import { ALL_LOCALES, getStaticData } from '@/tolgee/shared';

type Props = {
    children: ReactNode;
    params: { locale: string };
};

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = params;
    if (!ALL_LOCALES.includes(locale)) {
        notFound();
    }

    // it's important you provide all data which are needed for initial render
    // so current locale and also fallback locales + necessary namespaces
    const locales = await getStaticData(['en', locale]);

    return (
        <html lang={locale}>
            <body>
                <TolgeeNextProvider locale={locale} locales={locales}>
                    {children}
                </TolgeeNextProvider>
            </body>
        </html>
    );
}
