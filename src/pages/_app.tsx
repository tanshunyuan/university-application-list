import { AppProps } from 'next/app';
import { defaultTheme } from '../theme/theme';
import { ThemeProvider } from 'styled-components';
import '@/styles/global.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
