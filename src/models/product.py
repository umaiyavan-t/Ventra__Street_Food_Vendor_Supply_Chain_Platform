from flask_sqlalchemy import SQLAlchemy
from src.models.user import db

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    image = db.Column(db.String(500), nullable=True)
    category = db.Column(db.String(100), nullable=False)
    seller_id = db.Column(db.Integer, db.ForeignKey('seller.id'), nullable=False)
    
    def __repr__(self):
        return f'<Product {self.name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'image': self.image,
            'category': self.category,
            'sellerId': self.seller_id
        }

class Seller(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    score = db.Column(db.Integer, default=0)
    avatar = db.Column(db.String(500), nullable=True)
    company_name = db.Column(db.String(200), nullable=True)
    owner_name = db.Column(db.String(200), nullable=True)
    phone = db.Column(db.String(20), nullable=True)
    email = db.Column(db.String(120), nullable=True)
    tagline = db.Column(db.String(500), nullable=True)
    
    products = db.relationship('Product', backref='seller', lazy=True)
    
    def __repr__(self):
        return f'<Seller {self.name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'score': self.score,
            'avatar': self.avatar,
            'company_name': self.company_name,
            'owner_name': self.owner_name,
            'phone': self.phone,
            'email': self.email,
            'tagline': self.tagline
        }

class CartItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    
    user = db.relationship('User', backref='cart_items')
    product = db.relationship('Product', backref='cart_items')
    
    def __repr__(self):
        return f'<CartItem {self.product_id} for User {self.user_id}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'product_id': self.product_id,
            'quantity': self.quantity,
            'product': self.product.to_dict() if self.product else None
        }

class MarketValue(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String(200), nullable=False)
    current_price = db.Column(db.Float, nullable=False)
    previous_price = db.Column(db.Float, nullable=True)
    change_percentage = db.Column(db.Float, nullable=True)
    last_updated = db.Column(db.DateTime, default=db.func.current_timestamp())
    
    def __repr__(self):
        return f'<MarketValue {self.item_name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'item_name': self.item_name,
            'current_price': self.current_price,
            'previous_price': self.previous_price,
            'change_percentage': self.change_percentage,
            'last_updated': self.last_updated.isoformat() if self.last_updated else None
        }

