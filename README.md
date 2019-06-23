This is an e-commerce site with a persistent cart.  The backend uses postgreSQL and sequelize.  

Schema Elements: 
The database schema contains a cart, an item, and a user as models.  Cart to item is a one to many relationship.  A cart has one user and a user has one cart (one to one).  An item has many carts (one to many).  
