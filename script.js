// script.js

// Add to cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cart = [];

addToCartButtons.forEach(button => {
    button.addEventListener('click', event => {
        const productId = event.target.dataset.productId;
        cart.push(productId);
        console.log(`Added product ${productId} to cart.`);
    });
});

// Smooth scrolling navigation
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        targetElement.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Interactive features
const interactiveElements = document.querySelectorAll('.interactive');
interactiveElements.forEach(element => {
    element.addEventListener('mouseover', () => {
        element.classList.add('hover');
    });
    element.addEventListener('mouseout', () => {
        element.classList.remove('hover');
    });
});