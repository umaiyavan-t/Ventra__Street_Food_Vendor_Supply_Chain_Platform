from flask import Blueprint, jsonify, request
from src.models.product import Product, Seller, CartItem, MarketValue, db
from src.models.user import User

product_bp = Blueprint('product', __name__)

@product_bp.route('/products', methods=['GET'])
def get_products():
    category = request.args.get('category')
    search = request.args.get('search')
    
    query = Product.query
    
    if category and category != 'all':
        query = query.filter(Product.category == category)
    
    if search:
        query = query.filter(Product.name.contains(search))
    
    products = query.all()
    return jsonify([product.to_dict() for product in products])

@product_bp.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify(product.to_dict())

@product_bp.route('/sellers', methods=['GET'])
def get_sellers():
    sellers = Seller.query.all()
    return jsonify([seller.to_dict() for seller in sellers])

@product_bp.route('/sellers/<int:seller_id>', methods=['GET'])
def get_seller(seller_id):
    seller = Seller.query.get_or_404(seller_id)
    return jsonify(seller.to_dict())

@product_bp.route('/cart', methods=['GET'])
def get_cart():
    user_id = request.args.get('user_id', type=int)
    if not user_id:
        return jsonify({'error': 'User ID required'}), 400
    
    cart_items = CartItem.query.filter_by(user_id=user_id).all()
    return jsonify([item.to_dict() for item in cart_items])

@product_bp.route('/cart', methods=['POST'])
def add_to_cart():
    data = request.json
    user_id = data.get('user_id')
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)
    
    if not user_id or not product_id:
        return jsonify({'error': 'User ID and Product ID required'}), 400
    
    # Check if item already exists in cart
    existing_item = CartItem.query.filter_by(user_id=user_id, product_id=product_id).first()
    
    if existing_item:
        existing_item.quantity += quantity
    else:
        cart_item = CartItem(user_id=user_id, product_id=product_id, quantity=quantity)
        db.session.add(cart_item)
    
    db.session.commit()
    return jsonify({'message': 'Item added to cart'}), 201

@product_bp.route('/cart/<int:item_id>', methods=['PUT'])
def update_cart_item(item_id):
    cart_item = CartItem.query.get_or_404(item_id)
    data = request.json
    
    cart_item.quantity = data.get('quantity', cart_item.quantity)
    db.session.commit()
    
    return jsonify(cart_item.to_dict())

@product_bp.route('/cart/<int:item_id>', methods=['DELETE'])
def remove_from_cart(item_id):
    cart_item = CartItem.query.get_or_404(item_id)
    db.session.delete(cart_item)
    db.session.commit()
    return '', 204

@product_bp.route('/market-values', methods=['GET'])
def get_market_values():
    market_values = MarketValue.query.all()
    return jsonify([value.to_dict() for value in market_values])

@product_bp.route('/categories', methods=['GET'])
def get_categories():
    categories = db.session.query(Product.category).distinct().all()
    return jsonify([category[0] for category in categories])

