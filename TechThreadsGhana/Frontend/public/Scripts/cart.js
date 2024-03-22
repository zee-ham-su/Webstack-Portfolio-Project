const backendUrl = 'http://localhost:3000';
// Function to add items to the cart
async function addToCart(items) {
    try {
        const response = await fetch(`${backendUrl}/api/carts/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ items })
        });
        const data = await response.json();
        console.log('Added to cart:', data);
        return data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw new Error('Error adding to cart');
    }
}

// Function to get all carts
async function getAllCarts() {
    try {
        const response = await fetch(`${backendUrl}/api/carts`, {
            method: 'GET'
        });
        const data = await response.json();
        console.log('All carts:', data);
        return data;
    } catch (error) {
        console.error('Error fetching carts:', error);
        throw new Error('Error fetching carts');
    }
}

// Function to update a cart item
async function updateCartItem(cartId, itemId, quantity) {
    try {
        const response = await fetch(`${backendUrl}/api/carts/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cartId, itemId, quantity })
        });
        const data = await response.json();
        console.log('Updated cart item:', data);
        return data;
    } catch (error) {
        console.error('Error updating cart item:', error);
        throw new Error('Error updating cart item');
    }
}

// Function to delete an item from a cart
async function deleteCartItem(cartId, itemId) {
    try {
        const response = await fetch(`${backendUrl}/api/carts/${cartId}/items/${itemId}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        console.log('Deleted cart item:', data);
        return data;
    } catch (error) {
        console.error('Error deleting cart item:', error);
        throw new Error('Error deleting cart item');
    }
}

// Function to delete a cart
async function deleteCart(cartId) {
    try {
        const response = await fetch(`${backendUrl}/api/carts/${cartId}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        console.log('Deleted cart:', data);
        return data;
    } catch (error) {
        console.error('Error deleting cart:', error);
        throw new Error('Error deleting cart');
    }
}
