// ========================================
// MENÚ RESPONSIVE
// ========================================

// Buscamos el botón del menú
const menuToggle = document.querySelector(".menu-toggle");

// Buscamos la lista de enlaces
const navLinks = document.querySelector(".nav-links");

// Detectamos cuando se hace clic en el botón
menuToggle.addEventListener("click", function () {

    // Agrega o elimina la clase "active"
    navLinks.classList.toggle("active");

});


// Buscamos todos los enlaces del menú
const navItems = document.querySelectorAll(".nav-links a");

// Recorremos cada enlace
navItems.forEach(function(navItem) {

    // Detectamos cuando se hace clic en un enlace
    navItem.addEventListener("click", function() {

        // Cerramos el menú móvil
        navLinks.classList.remove("active");

    });

});


// ========================================
// CATÁLOGO DE PRODUCTOS
// ========================================

// Creamos una lista que almacenará nuestros productos
const products = [
    {
        name: "Galletitas",
        price: 15,
        image: "Images/Product-6.jpg",
        images: [
            "Images/Galletitas/Imagen-1.jpg",
            "Images/Galletitas/Imagen-2.jpg",
            "Images/Galletitas/Imagen-3.jpeg",
            "Images/Galletitas/Imagen-4.jpeg"
        ],
        description: "Deliciosas galletas con chispas de chocolate",
        details: "Galletas horneadas con chispas de chocolate, ideales para acompañar tu café, té o simplemente disfrutar como un antojo dulce."
    },

    {
        name: "Muffitos",
        price: 10,
        image: "Images/Product-4.jpg",
        images: [
            "Images/Muffitos/Imagen-1.jpg",
            "Images/Muffitos/Imagen-2.jpg"
        ],
        description: "Pastelillos de chocolate o vainilla acompañados de crema pastelera",
        details: "Suaves pastelillos disponibles en sabores chocolate o vainilla, acompañados de una cremosa crema pastelera que complementa su sabor."
    },

    {
        name: "Quequitos",
        price: 30,
        image: "Images/Product-2.jpg",
        images: [
            "Images/Quequitos/Imagen-1.jpg",
            "Images/Quequitos/Imagen-2.jpg"
        ],
        description: "Mini hot cakes suaves acompañados de fruta y lechera",
        details: "Mini hot cakes preparados para disfrutar con fruta y lechera, una combinación dulce y suave perfecta para comenzar el día o darte un gusto."
    },

    {
        name: "Pastelin",
        price: 100,
        image: "Images/Product-5.jpg",
        images: [
            "Images/Pastelin/Imagen-1.jpg",
            "Images/Pastelin/Imagen-2.jpg"
        ],
        description: "Un pastel lleno de sabor ideal para compartir",
        details: "Un pastel preparado para compartir en momentos especiales, con una textura suave y un sabor que lo convierte en una opción ideal para cualquier ocasión."
    },

    {
        name: "Muffitos Red Velvet",
        price: 15,
        image: "Images/Product-3.jpg",
        images: [
            "Images/Red Velvet/Imagen-1.jpg"
        ],
        description: "Pastelillo suave acompañado de un topping de butter cream",
        details: "Suave pastelillo Red Velvet acompañado de un delicioso topping de butter cream, creando una combinación cremosa y equilibrada en cada bocado."
    }
];


// Buscamos el contenedor de productos
const productsContainer = document.querySelector("#products-container");

// Recorremos cada producto
products.forEach(function(product) {

    // Creamos una nueva tarjeta
    const productCard = document.createElement("div");

    // Le asignamos la clase de producto
    productCard.classList.add("product-card");

    // Agregamos el contenido de la tarjeta
    productCard.innerHTML = `
        <!-- Imagen del producto -->
        <img 
            src="${product.image}" 
            alt="${product.name}"
        >

        <!-- Información del producto -->
        <div class="product-info">

            <!-- Nombre del producto -->
            <h3>${product.name}</h3>

            <!-- Descripción del producto -->
            <p class="product-description">
                ${product.description}
            </p>

            <!-- Precio del producto -->
            <p class="product-price">
                $${product.price}
            </p>

            <!-- Botón para ordenar -->
            <button 
                class="product-button" 
                data-product="${product.name}"
            >
                Ver mas
            </button>

        </div>
    `;

    // Agregamos la tarjeta al contenedor
    productsContainer.appendChild(productCard);

});

// ========================================
// MODAL DE PRODUCTO
// ========================================

// Buscamos el modal
const productModal = document.querySelector("#product-modal");
// Obtiene la ventana emergente del HTML

// Buscamos el contenedor donde mostraremos el producto
const modalProduct = document.querySelector("#modal-product");
// Obtiene el espacio donde aparecerá la información del producto

// Buscamos el botón para cerrar el modal
const modalClose = document.querySelector("#modal-close");
// Obtiene el botón con la X para cerrar el modal


// ========================================
// FUNCIÓN PARA ABRIR UN PRODUCTO
// ========================================

// Creamos una función para mostrar cualquier producto
function openProductModal(selectedProduct) {

    // Generamos el contenido del modal
    modalProduct.innerHTML = `

        <!-- Nombre del producto -->
        <h2 class="modal-product-name">
            ${selectedProduct.name}
        </h2>

        <!-- Imagen principal de la galería -->
        <img 
            id="gallery-image"
            src="${selectedProduct.images[0]}" 
            alt="${selectedProduct.name}"
            class="modal-product-image"
        >

        <!-- Controles de la galería -->
        <div class="gallery-controls">

            <!-- Botón para mostrar la imagen anterior -->
            <button id="gallery-prev" class="gallery-button">
                ‹
            </button>

            <!-- Indica qué imagen estamos viendo -->
            <span id="gallery-counter">
                1 / ${selectedProduct.images.length}
            </span>

            <!-- Botón para mostrar la imagen siguiente -->
            <button id="gallery-next" class="gallery-button">
                ›
            </button>

        </div>

        <!-- Información adicional del producto -->
        <div class="modal-product-info">

            <!-- Título de la información -->
            <h3 class="modal-product-info-title">
                Sobre este producto
            </h3>

            <!-- Descripción detallada -->
            <p class="modal-product-description">
                ${selectedProduct.details}
            </p>

        </div>

        <!-- Precio del producto -->
        <p class="modal-product-price">
            $${selectedProduct.price}
        </p>

        <!-- Productos relacionados -->
        <div class="related-products">

            <!-- Título de productos relacionados -->
            <h3 class="related-products-title">
                Podría interesarte
            </h3>

            <!-- Contenedor de los enlaces -->
            <div class="related-products-links">

                ${products
                    .filter(function(product) {
                        // Excluye el producto que actualmente está abierto
                        return product.name !== selectedProduct.name;
                    })
                    .map(function(product) {
                        // Crea un enlace para cada producto restante
                        return `
                            <a 
                                href="#" 
                                class="related-product-link"
                                data-product="${product.name}"
                            >
                                ${product.name}
                            </a>
                        `;
                    })
                    .join(" · ")}

            </div>

        </div>
    `;


    // ========================================
    // GALERÍA DE IMÁGENES
    // ========================================

    // Guarda la posición de la imagen que estamos viendo
    let currentImage = 0;

    // Obtiene la imagen de la galería
    const galleryImage = document.querySelector("#gallery-image");

    // Obtiene el indicador de posición
    const galleryCounter = document.querySelector("#gallery-counter");

    // Obtiene el botón para retroceder
    const galleryPrev = document.querySelector("#gallery-prev");

    // Obtiene el botón para avanzar
    const galleryNext = document.querySelector("#gallery-next");


    // Creamos una función para actualizar la galería
    function updateGallery() {

        // Cambia la imagen mostrada
        galleryImage.src = selectedProduct.images[currentImage];

        // Actualiza el número de imagen
        galleryCounter.textContent = `${currentImage + 1} / ${selectedProduct.images.length}`;

    }


    // Detectamos cuando se pulsa el botón anterior
    galleryPrev.addEventListener("click", function() {

        // Retrocede una posición
        currentImage--;

        // Si llegamos antes de la primera imagen, vamos a la última
        if (currentImage < 0) {
            currentImage = selectedProduct.images.length - 1;
        }

        // Actualiza la galería
        updateGallery();

    });


    // Detectamos cuando se pulsa el botón siguiente
    galleryNext.addEventListener("click", function() {

        // Avanza una posición
        currentImage++;

        // Si llegamos después de la última imagen, volvemos a la primera
        if (currentImage >= selectedProduct.images.length) {
            currentImage = 0;
        }

        // Actualiza la galería
        updateGallery();

    });


    // ========================================
    // PRODUCTOS RELACIONADOS
    // ========================================

    // Buscamos todos los enlaces de productos relacionados
    const relatedProductLinks = document.querySelectorAll(".related-product-link");

    // Recorremos todos los enlaces
    relatedProductLinks.forEach(function(link) {

        // Detectamos cuando se pulsa un producto relacionado
        link.addEventListener("click", function(event) {

            // Evita que el enlace recargue la página
            event.preventDefault();

            // Obtiene el nombre del producto seleccionado
            const productName = link.dataset.product;

            // Busca el producto correspondiente
            const relatedProduct = products.find(function(product) {

                // Compara los nombres de los productos
                return product.name === productName;

            });

            // Abre el producto seleccionado en el mismo modal
            openProductModal(relatedProduct);

        });

    });


    // Mostramos el modal
    productModal.style.display = "flex";

}


// ========================================
// BOTONES "VER MAS"
// ========================================

// Buscamos todos los botones de los productos
const productButtons = document.querySelectorAll(".product-button");

// Recorremos todos los botones
productButtons.forEach(function(button) {

    // Detectamos cuando se hace clic
    button.addEventListener("click", function() {

        // Obtenemos el nombre del producto seleccionado
        const productName = button.dataset.product;

        // Buscamos el producto correspondiente
        const selectedProduct = products.find(function(product) {

            // Comparamos los nombres
            return product.name === productName;

        });

        // Abrimos el modal del producto
        openProductModal(selectedProduct);

    });

});


// ========================================
// CERRAR MODAL
// ========================================

// Detectamos cuando se pulsa la X
modalClose.addEventListener("click", function() {

    // Ocultamos el modal
    productModal.style.display = "none";

});