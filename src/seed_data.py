import os
import sys
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from src.models.user import db, User
from src.models.product import Product, Seller, MarketValue
from src.main import app

def seed_database():
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()
        
        # Create sellers
        sellers_data = [
            {
                'id': 1,
                'name': "Shree Balaji Suppliers",
                'location': "Delhi",
                'score': 1250,
                'avatar': "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                'company_name': "Shree Balaji Suppliers",
                'owner_name': "Anil Sharma",
                'phone': "+91 99887 76655",
                'email': "balaji@example.com",
                'tagline': "Quality grains, reliable delivery, every time."
            },
            {
                'id': 2,
                'name': "Green Harvest Mandi",
                'location': "Noida",
                'score': 980,
                'avatar': "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                'company_name': "Green Harvest Mandi",
                'owner_name': "Priya Singh",
                'phone': "+91 98765 43210",
                'email': "greenharvest@example.com",
                'tagline': "Fresh from farm to your table."
            },
            {
                'id': 3,
                'name': "Spice Route Traders",
                'location': "Gurgaon",
                'score': 1520,
                'avatar': "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                'company_name': "Spice Route Traders",
                'owner_name': "Rajesh Kumar",
                'phone': "+91 87654 32109",
                'email': "spiceroute@example.com",
                'tagline': "Authentic spices from across India."
            },
            {
                'id': 4,
                'name': "Urban Farms Connect",
                'location': "Faridabad",
                'score': 810,
                'avatar': "https://images.pexels.com/photos/712521/pexels-photo-712521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                'company_name': "Urban Farms Connect",
                'owner_name': "Meera Patel",
                'phone': "+91 76543 21098",
                'email': "urbanfarms@example.com",
                'tagline': "Connecting urban consumers with rural farmers."
            },
            {
                'id': 5,
                'name': "Bake Haven Supplies",
                'location': "Ghaziabad",
                'score': 1100,
                'avatar': "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                'company_name': "Bake Haven Supplies",
                'owner_name': "Amit Gupta",
                'phone': "+91 65432 10987",
                'email': "bakehaven@example.com",
                'tagline': "Premium baking ingredients and fresh breads."
            }
        ]
        
        for seller_data in sellers_data:
            seller = Seller(**seller_data)
            db.session.add(seller)
        
        # Create products
        products_data = [
            {
                'id': 1,
                'name': "Ramesh Rice Mandi",
                'description': "Basmati rice - 5kg",
                'price': 500,
                'image': "https://images.pexels.com/photos/1039864/pexels-photo-1039864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                'category': "grains",
                'seller_id': 1
            },
            {
                'id': 2,
                'name': "Fresh Local Potatoes",
                'description': "Organic potatoes - 1kg",
                'price': 50,
                'image': "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                'category': "veggies",
                'seller_id': 2
            },
            {
                'id': 3,
                'name': "Premium Turmeric Powder",
                'description': "Organic Haldi - 200g",
                'price': 120,
                'image': "https://images.pexels.com/photos/3387137/pexels-photo-3387137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                'category': "masala",
                'seller_id': 3
            },
            {
                'id': 4,
                'name': "Cinnamon Sticks",
                'description': "Ceylon Cinnamon - 50g",
                'price': 80,
                'image': "https://images.pexels.com/photos/2085350/pexels-photo-2085350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                'category': "spices",
                'seller_id': 4
            },
            {
                'id': 5,
                'name': "Artisan Sourdough Bread",
                'description': "Freshly baked daily",
                'price': 180,
                'image': "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                'category': "bakery",
                'seller_id': 5
            },
            {
                'id': 6,
                'name': "Farm Fresh Apples",
                'description': "Crisp & juicy - 1kg",
                'price': 150,
                'image': "https://images.pexels.com/photos/1020479/pexels-photo-1020479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                'category': "fruits",
                'seller_id': 1
            },
            {
                'id': 7,
                'name': "Whole Wheat Flour",
                'description': "Chakki Atta - 10kg",
                'price': 350,
                'image': "https://images.pexels.com/photos/3387133/pexels-photo-3387133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                'category': "grains",
                'seller_id': 2
            },
            {
                'id': 8,
                'name': "Red Chilli Powder",
                'description': "Spicy Mirchi - 250g",
                'price': 90,
                'image': "https://images.pexels.com/photos/2092911/pexels-photo-2092911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                'category': "masala",
                'seller_id': 3
            },
            {
                'id': 9,
                'name': "Fresh Bell Peppers",
                'description': "Mixed colors - 500g",
                'price': 70,
                'image': "https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                'category': "veggies",
                'seller_id': 4
            },
            {
                'id': 10,
                'name': "Garlic Powder",
                'description': "Aromatic - 100g",
                'price': 60,
                'image': "https://images.pexels.com/photos/236625/pexels-photo-236625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                'category': "spices",
                'seller_id': 5
            }
        ]
        
        for product_data in products_data:
            product = Product(**product_data)
            db.session.add(product)
        
        # Create market values
        market_values_data = [
            {'item_name': 'Basmati Rice (per kg)', 'current_price': 120.50, 'previous_price': 118.00, 'change_percentage': 2.12},
            {'item_name': 'Wheat Flour (per kg)', 'current_price': 35.75, 'previous_price': 36.20, 'change_percentage': -1.24},
            {'item_name': 'Turmeric Powder (per kg)', 'current_price': 180.00, 'previous_price': 175.50, 'change_percentage': 2.56},
            {'item_name': 'Red Chilli Powder (per kg)', 'current_price': 220.25, 'previous_price': 225.00, 'change_percentage': -2.11},
            {'item_name': 'Onions (per kg)', 'current_price': 25.50, 'previous_price': 28.00, 'change_percentage': -8.93},
            {'item_name': 'Potatoes (per kg)', 'current_price': 18.75, 'previous_price': 19.25, 'change_percentage': -2.60}
        ]
        
        for market_data in market_values_data:
            market_value = MarketValue(**market_data)
            db.session.add(market_value)
        
        # Create sample users
        users_data = [
            {'username': 'john_doe', 'email': 'john@example.com'},
            {'username': 'jane_smith', 'email': 'jane@example.com'},
            {'username': 'test_user', 'email': 'test@example.com'}
        ]
        
        for user_data in users_data:
            user = User(**user_data)
            db.session.add(user)
        
        db.session.commit()
        print("Database seeded successfully!")

if __name__ == '__main__':
    seed_database()

