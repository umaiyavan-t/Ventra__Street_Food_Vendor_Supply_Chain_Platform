#!/usr/bin/env python3
"""
Integration tests for VentraMarketplace - Frontend-Backend communication
"""
import requests
import json
import time

BASE_URL = "http://localhost:5000"
API_BASE = f"{BASE_URL}/api"

class VentraIntegrationTester:
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
    
    def test_frontend_backend_integration(self):
        """Test if frontend can communicate with backend APIs"""
        try:
            # Test if main page loads with products
            response = requests.get(BASE_URL)
            main_page = response.text
            
            # Check if page has product grid
            has_product_grid = 'id="product-grid"' in main_page
            self.log_test("Frontend Product Grid", has_product_grid, 
                        "Product grid element found" if has_product_grid else "Missing product grid")
            
            # Test API endpoints that frontend would use
            api_tests = [
                ('/api/products', 'Products API'),
                ('/api/sellers', 'Sellers API'),
                ('/api/market-values', 'Market Values API'),
                ('/api/categories', 'Categories API')
            ]
            
            for endpoint, test_name in api_tests:
                try:
                    api_response = requests.get(f"{BASE_URL}{endpoint}")
                    data = api_response.json()
                    self.log_test(f"{test_name} Integration", 
                                api_response.status_code == 200 and len(data) > 0,
                                f"Status: {api_response.status_code}, Data count: {len(data)}")
                except Exception as e:
                    self.log_test(f"{test_name} Integration", False, f"Error: {str(e)}")
            
        except Exception as e:
            self.log_test("Frontend Backend Integration", False, f"Error: {str(e)}")
    
    def test_cors_headers(self):
        """Test CORS headers for frontend-backend communication"""
        try:
            # Test OPTIONS request (preflight)
            headers = {
                'Origin': 'http://localhost:5000',
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Request-Headers': 'Content-Type'
            }
            
            response = requests.options(f"{API_BASE}/products", headers=headers)
            
            # Check for CORS headers
            has_cors = 'Access-Control-Allow-Origin' in response.headers
            self.log_test("CORS Headers", has_cors,
                        f"CORS enabled: {has_cors}")
            
        except Exception as e:
            self.log_test("CORS Headers", False, f"Error: {str(e)}")
    
    def test_data_consistency(self):
        """Test data consistency between different endpoints"""
        try:
            # Get products and sellers
            products_response = requests.get(f"{API_BASE}/products")
            sellers_response = requests.get(f"{API_BASE}/sellers")
            
            products = products_response.json()
            sellers = sellers_response.json()
            
            # Check if all products have valid seller IDs
            seller_ids = {seller['id'] for seller in sellers}
            product_seller_ids = {product['sellerId'] for product in products}
            
            valid_seller_refs = product_seller_ids.issubset(seller_ids)
            self.log_test("Data Consistency", valid_seller_refs,
                        f"All product seller IDs valid: {valid_seller_refs}")
            
            # Check if categories are consistent
            categories_response = requests.get(f"{API_BASE}/categories")
            categories = set(categories_response.json())
            product_categories = {product['category'] for product in products}
            
            consistent_categories = product_categories.issubset(categories)
            self.log_test("Category Consistency", consistent_categories,
                        f"All product categories valid: {consistent_categories}")
            
        except Exception as e:
            self.log_test("Data Consistency", False, f"Error: {str(e)}")
    
    def test_cart_workflow(self):
        """Test complete cart workflow"""
        try:
            # Create a test user first
            user_data = {'username': 'integration_test', 'email': 'integration@test.com'}
            user_response = requests.post(f"{API_BASE}/users", json=user_data)
            
            if user_response.status_code == 201:
                user = user_response.json()
                user_id = user['id']
                
                # Add item to cart
                cart_data = {'user_id': user_id, 'product_id': 1, 'quantity': 2}
                cart_response = requests.post(f"{API_BASE}/cart", json=cart_data)
                
                # Get cart
                get_cart_response = requests.get(f"{API_BASE}/cart?user_id={user_id}")
                cart_items = get_cart_response.json()
                
                workflow_success = (cart_response.status_code == 201 and 
                                  len(cart_items) > 0 and 
                                  cart_items[0]['quantity'] == 2)
                
                self.log_test("Cart Workflow", workflow_success,
                            f"Cart operations successful: {workflow_success}")
            else:
                self.log_test("Cart Workflow", False, "Failed to create test user")
                
        except Exception as e:
            self.log_test("Cart Workflow", False, f"Error: {str(e)}")
    
    def test_search_and_filter(self):
        """Test search and filter functionality"""
        try:
            # Test category filter
            grains_response = requests.get(f"{API_BASE}/products?category=grains")
            grains = grains_response.json()
            
            all_grains = all(product['category'] == 'grains' for product in grains)
            self.log_test("Category Filter", all_grains and len(grains) > 0,
                        f"Found {len(grains)} grain products")
            
            # Test search
            search_response = requests.get(f"{API_BASE}/products?search=rice")
            search_results = search_response.json()
            
            has_rice_results = any('rice' in product['name'].lower() for product in search_results)
            self.log_test("Search Functionality", has_rice_results,
                        f"Found {len(search_results)} products matching 'rice'")
            
        except Exception as e:
            self.log_test("Search and Filter", False, f"Error: {str(e)}")
    
    def run_all_tests(self):
        """Run all integration tests"""
        print("=" * 60)
        print("VENTRA MARKETPLACE INTEGRATION TESTS")
        print("=" * 60)
        
        self.test_frontend_backend_integration()
        self.test_cors_headers()
        self.test_data_consistency()
        self.test_cart_workflow()
        self.test_search_and_filter()
        
        # Print summary
        print("\n" + "=" * 60)
        print("INTEGRATION TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.passed + self.failed}")
        print(f"Passed: {self.passed}")
        print(f"Failed: {self.failed}")
        print(f"Success Rate: {(self.passed / (self.passed + self.failed) * 100):.1f}%")
        
        return self.failed == 0

if __name__ == "__main__":
    tester = VentraIntegrationTester()
    success = tester.run_all_tests()
    exit(0 if success else 1)

