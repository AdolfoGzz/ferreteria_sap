export const API_ENDPOINTS = {
  // Auth endpoints
  auth: {
    login: '/api/auth/login',
  },
  
  // Inventory endpoints
  inventory: {
    all_inventory: '/api/inventario/with-details',
    update: '/api/inventario/update-inventario-producto'
  },

  // User endpoints
  user: {
    all_users: '/api/usuarios', // GET
    create: '/api/usuarios', // POST
    roles: '/api/usuarios/roles', // GET
    update: (userId: number) => `/api/usuarios/${userId}`, // PUT
    delete: (userId: number) => `/api/usuarios/${userId}` // DELETE - Dynamic endpoint for delete
  },

  // Order endpoints
  order: {
    all_orders: '/api/ordenes/with-details',
    create: '/api/ordenes', // POST
    update_status: (orderId: number) => `/api/ordenes/${orderId}/estado` // PATCH
  },

  // Supplier endpoints
  supplier: {
    all_suppliers: '/api/proveedores' // GET
  },

  // Product endpoints
  product: {
    all_products: '/api/productos' // GET
  },

  // AI endpoints
  ai: {
    predict: '/api/ia/predict'
  }
} as const;