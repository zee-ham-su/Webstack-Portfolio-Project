const backendUrl = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
    fetchAllProducts();

});


function fetchAllProducts() {
    fetch(`${backendUrl}/api/products`)
        .then(response => response.json())
        .then(products => {
            console.log('All Products:', products);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

function fetchProductById(productId) {
    fetch(`${backendUrl}/api/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            console.log('Product:', product);
        })
        .catch(error => {
            console.error('Error fetching product by ID:', error);
        });
}


function addProduct(productData) {
    fetch(`${backendUrl}/api/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    })
    .then(response => response.json())
    .then(newProduct => {
        console.log('New Product:', newProduct);
    })
    .catch(error => {
        console.error('Error adding product:', error);
    });
}


function updateProduct(productId, updatedProductData) {
    fetch(`${backendUrl}/api/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProductData)
    })
    .then(response => response.json())
    .then(updatedProduct => {
        console.log('Updated Product:', updatedProduct);
    })
    .catch(error => {
        console.error('Error updating product:', error);
    });
}


function deleteProduct(productId) {
    fetch(`${backendUrl}/api/products/${productId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            console.log('Product deleted successfully');
        } else {
            console.error('Failed to delete product');
        }
    })
    .catch(error => {
        console.error('Error deleting product:', error);
    });

}