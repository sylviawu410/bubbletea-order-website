'use client';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Button, Toolbar, Typography, Box } from '@mui/material';
import Container from '@mui/material/Container';

import { useEffect, useState } from 'react';
import { BubbleTeaService } from '../(services)/bubbleTeaService';
import { type BubbleTea } from '@/dexie/db';

export default function UserPage() {
  const [bubbleTeas, setBubbleTeas] = useState<BubbleTea[]>([]);

  useEffect(() => {
    async function fetchBubbleTeas() {
      const data = await BubbleTeaService.getBubbleTeas();
      setBubbleTeas(data);
      console.log("data", data);
    }

    fetchBubbleTeas();
  }, []);

  const addToCart = () => {}
  const removeFromCart = () =>{}

  return (
    <Container>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bubble Teas
          </Typography>
          <Button
            variant="outlined"
            endIcon={<ShoppingCartIcon />}
            sx={{ borderColor: 'white', color: 'white' }}
          >
            Cart
          </Button>
        </Toolbar>
      </AppBar>
      <main >
        <Box sx={{ pt: 15 }}>
          {bubbleTeas.map((tea) => (
            <div key={tea.id}>
                <div >
                  <img src={tea.assetPath ? tea.assetPath : "/placeholder.jpg"} className="product-card-img" />
                </div>
                <p className="title ">{tea.name}</p>

              <div className="container">
                <p className="price">${tea.price?.toFixed(2)}</p>
                <button onClick={addToCart} className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-stone-300 ring-inset hover:bg-gray-50">Add To Cart</button>
                <button onClick={removeFromCart} className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-stone-300 ring-inset hover:bg-gray-50">Remove From Cart</button>

              </div>
            </div>
          ))}
        </Box>

      </main>
    </Container>
  );
}
