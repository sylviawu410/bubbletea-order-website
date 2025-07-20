"use client"
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { theme } from './theme';
import { db } from './../dexie/db';
import bubbleTeas from '../data/bubbleTeas.json';

export default function RootLayout(props: { children: React.ReactNode }) {
    React.useEffect(() => {
    async function populateDatabase() {
      try {
        const count = await db.bubbleTeas.count();
        if (count === 0) {
          // await db.bubbleTeas.clear(); 
          await db.bubbleTeas.bulkAdd(
            bubbleTeas.map((bubbleTea) => ({
              ...bubbleTea,
              isListed: true,
            }))
          );
        } else {
          console.log('Database already populated');
        }
      } catch (err) {
        console.error('Failed to populate database:', err);
      }
    }

    populateDatabase();
  }, []);
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {props.children}
        </ThemeProvider>
      </body>
    </html>
  );
}