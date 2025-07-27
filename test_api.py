#!/usr/bin/env python3
"""
Comprehensive API tests for VentraMarketplace Flask backend
"""
import requests
import json
import sys
import time

BASE_URL = "http://localhost:5000"
API_BASE = f"{BASE_URL}/api"

class VentraAPITester:
    def __init__(self):
        self.test_results = []
        self.passed = 0
        self.failed = 0
    
    def log_test(self, test_name, passed, message=""):
        status = "PASS" if passed else "FAIL"
        result = f"[{status}] {test_name}"
        if message:
            result += f" - {message}"
        print(result)
        self.test_results.append({
            'test': test_name,
            'passed': passed,
            'message': message
        })
        if passed:
            self.passed += 1
        else:
            self.failed += 1
    
    def test_server_running(self):
        """Test if Flask server is running"""
        try:
            response = requests.get(BASE_URL, timeout=5)
            self.log_test("Server Running", response.status_code == 200, f"Status: {response.status_code}")
            return response.status_code == 200
        except Exception as e:
            self.log_test("Server Running", False, f"Error: {str(e)}")
            return False
    
    def test_get_products(self):
        """Test GET /api/products endpoint"""
        try:
            response = requests.get(f"{API_BASE}/products")
            data = response.json()
            
            self.log_test("GET Products", response.status_code == 200, f"Found {len(data)} products")
            
            # Test product structure
            if data and len(data) > 0:
                product = data[0]
                required_fields = ['id', 'name', 'description', 'price', 'category', 'sellerId']
                has_all_fields = all(field in product for field in required_fields)
                self.log_test("Product Structure", has_all_fields, 
                            f"Fields: {list(product.keys())}")
            
            return response.status_code == 200
        except Exception as e:
            self.log_test("GET Products", False, f"Error: {str(e)}")
            return False
    
    def test_get_products_by_category(self):
        """Test GET /api/products with category filter"""
        try:
            response = requests.get(f"{API_BASE}/products?category=grains")
            data = response.json()
            
            all_grains = all(product['category'] == 'grains' for product in data)
            self.log_test("Products by Category", all_grains and len(data) > 0, 
                        f"Found {len(data)} grain products")
            return True
        except Exception as e:
            self.log_test("Products by Category", False, f"Error: {str(e)}")
            return False
    
    def test_search_products(self):
        """Test GET /api/products with search filter"""
        try:
            response = requests.get(f"{API_BASE}/products?search=rice")
            data = response.json()
            
            has_rice = any('rice' in product['name'].lower() for product in data)
            self.log_test("Product Search", has_rice, f"Found {len(data)} products matching 'rice'")
            return True
        except Exception as e:
            self.log_test("Product Search", False, f"Error: {str(e)}")
            return False
    
    def test_get_sellers(self):
        """Test GET /api/sellers endpoint"""
        try:
            response = requests.get(f"{API_BASE}/sellers")
            data = response.json()
            
            self.log_test("GET Sellers", response.status_code == 200, f"Found {len(data)} sellers")
            
            # Test seller structure
            if data and len(data) > 0:
                seller = data[0]
                required_fields = ['id', 'name', 'location', 'score']
                has_all_fields = all(field in seller for field in required_fields)
                self.log_test("Seller Structure", has_all_fields, 
                            f"Fields: {list(seller.keys())}")
            
            return response.status_code == 200
        except Exception as e:
            self.log_test("GET Sellers", False, f"Error: {str(e)}")
            return False
    
    def test_get_market_values(self):
        """Test GET /api/market-values endpoint"""
        try:
            response = requests.get(f"{API_BASE}/market-values")
            data = response.json()
            
            self.log_test("GET Market Values", response.status_code == 200, 
                        f"Found {len(data)} market values")
            return response.status_code == 200
        except Exception as e:
            self.log_test("GET Market Values", False, f"Error: {str(e)}")
            return False
    
    def test_get_categories(self):
        """Test GET /api/categories endpoint"""
        try:
            response = requests.get(f"{API_BASE}/categories")
            data = response.json()
            
            expected_categories = ['grains', 'veggies', 'masala', 'spices', 'bakery', 'fruits']
            has_expected = all(cat in data for cat in expected_categories)
            
            self.log_test("GET Categories", has_expected, f"Categories: {data}")
            return has_expected
        except Exception as e:
            self.log_test("GET Categories", False, f"Error: {str(e)}")
            return False
    
    def test_cart_operations(self):
        """Test cart CRUD operations"""
        try:
            # Test adding to cart
            cart_data = {
                'user_id': 1,
                'product_id': 1,
                'quantity': 2
            }
            
            response = requests.post(f"{API_BASE}/cart", json=cart_data)
            self.log_test("Add to Cart", response.status_code == 201, 
                        f"Response: {response.json()}")
            
            # Test getting cart
            response = requests.get(f"{API_BASE}/cart?user_id=1")
            cart_items = response.json()
            self.log_test("GET Cart", len(cart_items) > 0, 
                        f"Cart has {len(cart_items)} items")
            
            return True
        except Exception as e:
            self.log_test("Cart Operations", False, f"Error: {str(e)}")
            return False
    
    def test_user_operations(self):
        """Test user CRUD operations"""
        try:
            # Test creating user
            user_data = {
                'username': 'test_user_api',
                'email': 'testapi@example.com'
            }
            
            response = requests.post(f"{API_BASE}/users", json=user_data)
            self.log_test("Create User", response.status_code == 201, 
                        f"Created user: {response.json()}")
            
            # Test getting users
            response = requests.get(f"{API_BASE}/users")
            users = response.json()
            self.log_test("GET Users", len(users) > 0, f"Found {len(users)} users")
            
            return True
        except Exception as e:
            self.log_test("User Operations", False, f"Error: {str(e)}")
            return False
    
    def test_static_files(self):
        """Test static file serving"""
        try:
            # Test main page
            response = requests.get(BASE_URL)
            self.log_test("Static Index", response.status_code == 200 and 'Ventra' in response.text,
                        f"Status: {response.status_code}")
            
            # Test CSS file
            response = requests.get(f"{BASE_URL}/styles.css")
            self.log_test("Static CSS", response.status_code == 200,
                        f"Status: {response.status_code}")
            
            # Test JS file
            response = requests.get(f"{BASE_URL}/script.js")
            self.log_test("Static JS", response.status_code == 200,
                        f"Status: {response.status_code}")
            
            return True
        except Exception as e:
            self.log_test("Static Files", False, f"Error: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all tests"""
        print("=" * 60)
        print("VENTRA MARKETPLACE API TESTS")
        print("=" * 60)
        
        # Check if server is running first
        if not self.test_server_running():
            print("Server is not running. Please start the Flask server first.")
            return False
        
        # Wait a moment for server to be ready
        time.sleep(1)
        
        # Run all tests
        self.test_get_products()
        self.test_get_products_by_category()
        self.test_search_products()
        self.test_get_sellers()
        self.test_get_market_values()
        self.test_get_categories()
        self.test_cart_operations()
        self.test_user_operations()
        self.test_static_files()
        
        # Print summary
        print("\n" + "=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.passed + self.failed}")
        print(f"Passed: {self.passed}")
        print(f"Failed: {self.failed}")
        print(f"Success Rate: {(self.passed / (self.passed + self.failed) * 100):.1f}%")
        
        return self.failed == 0

if __name__ == "__main__":
    tester = VentraAPITester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)

