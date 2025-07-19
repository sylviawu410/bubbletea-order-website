# Bubble Tea Web Interview Exercise Template

## Overview

This template provides a starting point for the bubble tea web interview exercise. Applicants are encouraged to make any necessary adjustments. The solution will be evaluated based on:

- Feature completion
- Code quality
- Performance

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

> **UI already implemented but feel free to modify if needed**

- **Functionality**:
  - Table displays all bubble tea information
  - Checkbox toggles list/unlist status for each bubble tea

### Services

> **Add other services if needed**

- **BubbleTeaService**:
  - Load bubble tea data from JSON file given into the table
  - Implement bubble tea list and delist feature

## Implementation Considerations

- UI/UX design quality
- Database schema and query design
- Performance optimization

## Folder Structure

```
/app # Base layout with UI components and services
/data # Bubble tea data
/dexie # IndexedDB setup
/public # Assets
```

## Notes

Feel free to modify this template as needed to best showcase your skills and approach to the problem.
