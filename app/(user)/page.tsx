'use client';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Button, Toolbar, Typography, Box } from '@mui/material';
import Container from '@mui/material/Container';

import { useEffect, useState } from 'react';
import { BubbleTeaService } from '../(services)/bubbleTeaService';
import { CartService } from '../(services)/cartService';

import { type BubbleTea, type CartItem } from '@/dexie/db';

function groupBubbleTeasByLabels(bubbleTeas: BubbleTea[]) {
  const grouped: { [key: string]: BubbleTea[] } = {};

  bubbleTeas.forEach((tea) => {
    tea.labels?.forEach((label) => {
      if (!grouped[label]) {
        grouped[label] = [];
      }
      grouped[label].push(tea);
    });
  });

  // Return grouped data as an array of objects
  const groupedArray = Object.keys(grouped).map((label) => ({
    label,
    teas: grouped[label],
  }));

  // Sort the groups: "Popular" first, then the rest alphabetically
  return groupedArray.sort((a, b) => {
    if (a.label === 'popular') return -1;
    if (b.label === 'popular') return 1;
    return a.label.localeCompare(b.label);
  });
}

export default function UserPage() {
  const [groupedBubbleTeas, setGroupedBubbleTeas] = useState<
    { label: string; teas: BubbleTea[] }[]
  >([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchBubbleTeas() {
      const data = await BubbleTeaService.getBubbleTeas();
      const listedBubbleTeas = data.filter((tea) => tea.isListed);
      const grouped = groupBubbleTeasByLabels(listedBubbleTeas);
      setGroupedBubbleTeas(grouped);
      // console.log("Grouped Data", grouped);
    }

    async function fetchCartItems() {
      const items = await CartService.getCartItems();
      setCartItems(items);
    }

    fetchCartItems();
    fetchBubbleTeas();
  }, []);

    useEffect(() => {
      const calculateTotal = async () => {
        let totalAmount = 0;
        for (const item of cartItems) {
          totalAmount += item.price * item.quantity;
        }
        setTotal(totalAmount);
      };
      if (cartItems.length > 0) {
        calculateTotal();
      } else {
        setTotal(0);
      }
    }, [cartItems]);

  const handleAddToCart = async (tea: BubbleTea) => {
    await CartService.addToCart({ id: tea.id, name: tea.name, price: tea.price });
    const items = await CartService.getCartItems();
    setCartItems(items);
  };

  const handleRemoveFromCart = async (id: number) => {
    await CartService.removeFromCart(id);
    const items = await CartService.getCartItems();
    setCartItems(items);
  };

  const handleSubmitCart = async () => {
    await CartService.clearCart();
    setCartItems([]);
    alert('Cart submitted successfully!');
  };

  return (
    <Container>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bubble Teas
          </Typography>
          <div className="shopping-cart">
            <div>
              <Button
                variant="outlined"
                endIcon={<ShoppingCartIcon />}
                className='shopping-cart-btn'
                sx={{ borderColor: 'white', color: 'white' }}
                aria-expanded={isHovered || isClicked}
                aria-haspopup={isHovered || isClicked}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsClicked(!isClicked)}
              >
                CART
              </Button>
              {((isHovered || isClicked)) && (
                <form
                  className="cart-form">
                  <div>
                    <div className="mt-1">
                      {cartItems.length === 0 ? (
                        <p>Your cart is empty</p>
                      ) : (
                        <ul>
                          {cartItems.map((item) => (
                            <li key={item.id} className="cart-item-container">
                              {/* <img className="shop-item" src={`/${item.assetPath}`} alt='' /> */}
                              <div className="cart-item-name">{item.name}</div>
                              <div>${item.price}</div>
                              <div>{item.quantity}</div>
                              <button
                                className="btn"
                                onClick={() => handleRemoveFromCart(item.id)}
                                type="button"
                              >
                                remove
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className='cart-total'>
                        <strong>Total: ${ total }</strong>
                      </div>
                      <div className='checkout-btn'>
                        <Button variant="outlined"
                          onClick={handleSubmitCart}
                        >Checkout</Button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

        </Toolbar>
      </AppBar>

      <main >
        <Box sx={{ pt: 5 }}>
          {groupedBubbleTeas.map((group) => (
            <div className='group-label' key={group.label}>
              <h2>{group.label}</h2>
              <div className="group">
                {group.teas.map((tea) => (
                  <div key={tea.id}>
                    <div>
                      <img
                        src={tea.assetPath ? tea.assetPath : '/placeholder.jpg'}
                        className="tea-img"
                      />
                    </div>
                    <p className="title">{tea.name}</p>

                    <div className="container">
                      <p className="price">${tea.price?.toFixed(2)}</p>
                      <button
                        onClick={() => handleAddToCart(tea)}
                        className="btn"
                      >
                        Add To Cart
                      </button>
                      <button
                        onClick={() => handleRemoveFromCart(tea.id)}
                        className="btn"
                      >
                        Remove From Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Box>

      </main>
    </Container>
  );
}
