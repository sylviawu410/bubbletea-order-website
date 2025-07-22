"use client"
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { theme } from './theme';
import { db } from './../dexie/db';
import bubbleTeas from '../data/bubbleTeas.json';
import './globals.css';

export default function RootLayout(props: { children: React.ReactNode }) {
  React.useEffect(() => {
    async function populateDatabase() {
      try {
        const existingData = await db.bubbleTeas.toArray();

        // Merge existing data with new data
        const newData = bubbleTeas.map((bubbleTea) => {
          const existing = existingData.find((item) => item.id === bubbleTea.id);
          return {
            ...bubbleTea,
            isListed: existing ? existing.isListed : true, // Preserve isListed if it exists
          };
        });

        // Clear and bulk add the merged data
        await db.bubbleTeas.clear();
        await db.bubbleTeas.bulkAdd(newData);

        console.log('Database populated or updated.');
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