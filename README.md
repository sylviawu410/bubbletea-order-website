# Bubble Tea Web Interview Exercise Template

## Overview

This is a bubble tea ordering web development exercise.


## Tech Stack

- **React** (Frontend framework)
- **Material UI** (UI components)
- **TypeScript** (Type checking)
- **Dexie** (Database management)

## Features

### User Page

- **Bubble Tea List**:
  - Displays only listed bubble teas
  - Each item shows:
    - Name
    - Description (optional)
    - Price
    - Image (optional)
    - "Add to cart" button
    - "Remove from cart" button
- **Organization**:
  - Bubble teas are grouped by labels (Popular should sort to top, others are sorted alphabetically)
  - Items with multiple labels appear in multiple sections

### Shopping Cart

- **Persistence**:
  - Uses Dexie table to maintain cart items (persists through browser refresh)
- **Display**:
  - Shows list of added bubble teas with properties and quantities
- **Submission**:
  - Submit button adds to bottom of list
  - On success:
    - Clears shopping cart
    - Shows success popup/toast

### Admin Page

- **Functionality**:
  - Table displays all bubble tea information
  - Checkbox toggles list/unlist status for each bubble tea
  - Updates the database dynamically

### Services

- **BubbleTeaService**:
  - Load bubble tea data from JSON file given into the table
  - Implement bubble tea list and delist feature

- **CartTeaService**:
  - Implement cart item add and delete feature

## Implementation Considerations

- UI/UX design quality
- Database schema and query design
- Performance optimisation

## Folder Structure

```
/app # Base layout with UI components and services
/data # Bubble tea data
/dexie # IndexedDB setup
/public # Assets
```

