CODIGO: mongodb+srv://bacigaluppipili_db_user:Ia10Jh6usgG2NYqU@cluster-entrega1.yoinnhu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-entrega1

CODIGO: mongodb+srv://bacigaluppipili_db_user:Ia10Jh6usgG2NYqU@cluster-entrega1.yoinnhu.mongodb.net/<DB_NAME>?retryWrites=true&w=majority&appName=Cluster-entrega1

# API REST para la Gestión de Libros 

### Estructura de Archivos
```
├── app.js
├── package.json
├── package-lock.json
├── server.js
├── data/
│   └── carts.json
│   └── products.json
├── managers/
│   └── CartManager.js
│   └── ProductManager.js
│   └── ViewsManager.js
├── public/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── index.js
├── src/
│   ├── controllers/
│   │   ├── products.controller.js
│   │   ├── carts.controller.js
│   │   └── views.controller.js
│   ├── config/
│   │   ├── config.js
│   ├── views/
│   │   ├── layouts/
│   │   │   └── main.hbs
│   │   ├── pages/
│   │   │   ├── home.hbs
│   │   │   └── realtimeProducts.hbs
│   │   └── partials/
│   │       ├── footer.hbs
│   │       └── header.hbs
│   └── routes/
│       ├── products.router.js
│       ├── carts.router.js
│       ├── views.router.js
│       └── index.js
└── server.js
```
### Descripción del Proyecto

Este proyecto es una API REST para la gestión de libros. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una colección de libros, utilizando una arquitectura modular que separa las diferentes responsabilidades en capas. Además tiene una vista con websockets incorporado, permitiendo hacer estas operaciones en tiempo real.

### Características Clave
1. **Modularización**: Separación clara en capas (Views, Controllers, Routes, Managers)
2. **Validaciones**:
   - Campos obligatorios en libros
   - Manejo de errores centralizado
3. **Persistencia**:
   - Libros y carritos en archivos JSON
4. **Seguridad**:
   - Try/catch en todos los controladores
   - Manejo de errores global
5. **Configuración**:
   - Ruta dinámica para archivo de libros

### Ejecución
1. Instalar dependencias:
```bash
npm install express dotenv
npm install socket.io
npm install express 
npm install express-handlebars
npm install morgan
```

2. Iniciar servidor:
```bash
npm start
```

### Endpoints Disponibles

**Libros:**
- `GET /api/books`
- `GET /api/books/:id`
- `POST /api/books`
- `PUT /api/books/:id`
- `DELETE /api/books/:id`

**Carritos:**
- `GET /api/carts/:id`
- `POST /api/carts`
- `POST /api/carts/:cid/product/:pid`

**Vistas:**
- `GET /home`
- `GET /realtimeproducts`

---

## Modo de Uso
### Lista de 5 Libros para Pruebas
```json
[
  {
        "id": "664f3c8a8d1d1a0f9c7a5b1a",
        "title": "Yo antes de ti",
        "description": "La vida de Louisa Clark, una chica alegre y alocada, que va empalmando un trabajo con otro para ayudar a su familia a subsistir, cambia por completo cuando comienza a trabajar como cuidadora de un joven millonario, quien quedó paralítico tras un accidente. Poco a poco, se va estableciendo entre ellos una conexión cada vez más íntima.",
        "code": "MOV1006",
        "price": 11.99,
        "status": "available",
        "stock": 30,
        "category": "Drama",
        "thumbnails": ["https://m.media-amazon.com/images/S/pv-target-images/20d5708d15616c1cacb57351d47118756a5abd3037583b62b8ebe44525ae54d9.jpg",
            "https://confidencial.digital/wp-content/uploads/2022/11/emilia-clarke-yo-antes-de-ti.jpg",
            "https://www.sandrasomera.com/wp-content/uploads/2021/11/Escena-mallas-1024x464.jpg"
        ]
    },
    {
        "id": "664f3c8a8d1d1a0f9c7a5b1b",
        "title": "La La Land",
        "description": "Una aspirante a actriz y un músico luchan por sus sueños en Los Ángeles.",
        "code": "MOV1007",
        "price": 10.49,
        "status": "available",
        "stock": 45,
        "category": "Musical",
        "thumbnails": ["https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png",
            "https://i.blogs.es/495160/277365.jpg-r_1920_1080-f_jpg-q_x-xxyxx/1366_2000.jpg",
            "https://c.files.bbci.co.uk/9238/production/_93323473_lalaland3ap.jpg"
        ]
    },
    {
        "id": "664f3c8a8d1d1a0f9c7a5b1c",
        "title": "The Matrix",
        "description": "Un hacker descubre que el mundo es una simulación controlada por máquinas.",
        "code": "MOV1008",
        "price": 11.49,
        "status": "available",
        "stock": 55,
        "category": "Acción",
        "thumbnails": ["https://upload.wikimedia.org/wikipedia/en/d/db/The_Matrix.png",
            "https://i.blogs.es/3bbc27/matrix1/1366_2000.jpg",
            "https://cdn.origo.hu/2023/12/WeCETQbN0_2e1ol_9tlLPyogTj9Z8YlEghjeE9Ztzcw/fill/1347/758/no/1/aHR0cHM6Ly9jbXNjZG4uYXBwLmNvbnRlbnQucHJpdmF0ZS9jb250ZW50LzZhYWM4NTkxMzhmMjQ3OTZiNjRlYTU5NTYyODhlZmU1.webp"
        ]
    },
    {
        "id": "664f3c8a8d1d1a0f9c7a5b1d",
        "title": "Moonrise Kingdom",
        "description": "Dos niños enamorados huyen de casa, causando una búsqueda frenética en su comunidad.",
        "code": "MOV1009",
        "price": 8.49,
        "status": "available",
        "stock": 20,
        "category": "Drama",
        "thumbnails": ["https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p9005688_p_v10_ac.jpg",
            "https://filmquarterly.org/wp-content/uploads/2014/01/moonrise_featured.jpg",
            "https://m.media-amazon.com/images/S/pv-target-images/b54230798b5bf9db5f08b0a6b61c242325441dd1169300f8eacb7b658d75f2b8._SX1080_FMjpg_.jpg"
        ]
    },
    {
        "id": "664f3c8a8d1d1a0f9c7a5b1e",
        "title": "Whiplash",
        "description": "Un joven baterista se enfrenta a un implacable profesor en un conservatorio de música.",
        "code": "MOV1010",
        "price": 10.99,
        "status": "available",
        "stock": 28,
        "category": "Drama",
        "thumbnails": ["https://image.tmdb.org/t/p/original/whiplash.jpg"]
    }
]
```

### Pasos para Probar Todas las Rutas de Libros

#### 1. Preparar el entorno
1. Iniciar el servidor: `npm start`
2. Instalar Thunder Client (extensión de VSCode) o usar Postman

---

#### 2. Probar GET /api/products (Listar libros)
- **Método**: GET
- **URL**: `http://localhost:8080/api/products`
- **Respuesta Esperada**: Array vacío o con libros existentes
- **Código**: 200 OK

#### 2. b. Probar GET by ID /api/products/:id (Obtener libro por ID)
- **Método**: GET
- **URL**: `http://localhost:8080/api/products/664f3c8a8d1d1a0f9c7a5b1b` (usar id real)
- **Respuesta Esperada**: Objeto del libro correspondiente
- **Código**: 200 OK

---

#### 3. Probar POST /api/products (Crear libro)
- **Método**: POST
- **URL**: `http://localhost:8080/api/products`
- **Body** (usar un libro de la lista sin `id`):
```json
{
    "title": "Whiplash",
    "description": "Un joven baterista se enfrenta a un implacable profesor en un conservatorio de música.",
    "code": "MOV1010",
    "price": 10.99,
    "status": "available",
    "stock": 28,
    "category": "Drama",
    "thumbnails": ["https://image.tmdb.org/t/p/original/whiplash.jpg"]
}
```

- **Respuesta Esperada**:
```json
{
    "id": "...",
    "title": "Whiplash",
    "description": "Un joven baterista se enfrenta a un implacable profesor en un conservatorio de música.",
    "code": "MOV1010",
    "price": 10.99,
    "status": "available",
    "stock": 28,
    "category": "Drama",
    "thumbnails": ["https://image.tmdb.org/t/p/original/whiplash.jpg"]
}
```
- **Código**: 201 Created
- **Nota**: Guardar el `id` devuelto para pruebas posteriores

---

#### 4. Probar PUT /api/products/:id (Actualizar libro)
- **Método**: PUT
- **URL**: `http://localhost:8080/api/products/664f3c8a8d1d1a0f9c7a5b1b` (usar id real)
- **Body**:
```json
{
    "price": 101,
    "stock": 999999999,
    "description": "Na na na na na naaaa!!!    - NA NA!"
}
```

- **Respuesta Esperada**:
```json
{
    "id": "664f3c8a8d1d1a0f9c7a5b1b",
    "title": "Yo antes de ti",
    "description": "Na na na na na naaaa!!!    - NA NA!",
    "code": "MOV1006",
    "price": 101,
    "status": "available",
    "stock": 999999999,
    "category": "Drama",
    "thumbnails": ["https://m.media-amazon.com/images/S/pv-target-images/20d5708d15616c1cacb57351d47118756a5abd3037583b62b8ebe44525ae54d9.jpg",
        "https://confidencial.digital/wp-content/uploads/2022/11/emilia-clarke-yo-antes-de-ti.jpg",
        "https://www.sandrasomera.com/wp-content/uploads/2021/11/Escena-mallas-1024x464.jpg"
    ]
}
```
- **Código**: 200 OK

---

#### 5. Probar DELETE /api/products/:id (Eliminar libro)
- **Método**: DELETE
- **URL**: `http://localhost:8080/api/products/664f3c8a8d1d1a0f9c7a5b1b` (usar id real)
- **Respuesta Esperada**:
```json
{
  "message": "Producto eliminado con éxito"
}
```
- **Código**: 200 OK

#### 6. Probar GET by ID /api/carts/:id (Obtener carrito por ID)
- **Método**: GET
- **URL**: `http://localhost:8080/api/carts/cart-uuid-1234` (usar id real)
- **Respuesta Esperada**: Objeto del libro correspondiente
- **Código**: 200 OK

---

#### 7. Probar POST /api/carts (Crear carrito)
- **Método**: POST
- **URL**: `http://localhost:8080/api/carts`
- **Body** *(vacío, crea carrito con array vacío)*
- **Respuesta Esperada**:
```json
{
  "id": "...",
  "products": []
}
```
- **Código**: 201 Created
- **Nota**: Guardar el `id` devuelto para pruebas posteriores

#### 8. Probar POST /api/carts/:cid/product/:pid (Agregar producto a un carrito)
- **Método**: POST
- **URL**: `http://localhost:8080/api/carts/cart-uuid-1234/product/664f3c8a8d1d1a0f9c7a5b1b` (usar id real)
- **Body** *(vacío, solo indica incremento de cantidad o agrega si no existe)*
- **Respuesta Esperada**:
```json
{
    "id": "cart-uuid-1234",
    "products": [
        {
        "product": "664f3c8a8d1d1a0f9c7a5b1b",
        "quantity": 1
        }
    ]
}

```
- **Código**: 200 OK
- **Nota**: Guardar el `id` devuelto para pruebas posteriores

#### 9. Probar GET /home (Home)
- **Método**: GET
- **URL**: `http://localhost:8080/home`
- **Respuesta Esperada**: Renderiza la vista home.handlebars con todos los productos listados en cards.
- **Código**: 200 OK

#### 10. Probar GET /realtimeproducts (Tiempo Real)
- **Método**: GET
- **URL**: `http://localhost:8080/realtimeproducts`
- **Respuesta Esperada**: Renderiza la vista realTimeProducts.handlebars, conectada a websockets.
Cada vez que se crea o elimina un producto, la lista se actualiza en tiempo real.
- **Código**: 200 OK

---

#### 11. Probar Casos de Error

a) **POST con campos faltantes**:
```json
{
  "title": "Libro incompleto",
  "price": 15.99
}
```
- **Código Esperado**: 400 Bad Request
- **Mensaje**: "Los campos de título, codigo, precio y categoría son obligatorios y el stock debe ser un número válido."

b) **PUT con ID inexistente**:
- URL: `http://localhost:8080/api/products/id_inexistente`
- **Código Esperado**: 404 Not Found

c) **DELETE con ID inexistente**:
- URL: `http://localhost:8080/api/products/id_inexistente`
- **Código Esperado**: 404 Not Found

---

### Verificación Final:
- Revisar el archivo `data/books.json` para confirmar que los cambios persisten
- Verificar que las operaciones CRUD mantienen la integridad de los datos
- Confirmar que los errores se manejan adecuadamente con mensajes claros
