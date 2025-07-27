#!/usr/bin/env python3
"""
Frontend functionality tests for VentraMarketplace
"""
import requests
import time
import json

BASE_URL = "http://localhost:5000"

class VentraFrontendTester:
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
    
    def test_page_loads(self):
        """Test if main pages load correctly"""
        pages = [
            ('/', 'Ventra - Online Marketplace'),
            ('/signin.html', 'Ventra - Sign In'),
            ('/signup.html', 'Ventra - Sign Up'),
            ('/checkout.html', 'Ventra - Checkout'),
            ('/delivery.html', 'Ventra - Delivery'),
            ('/buyer-profile.html', 'Ventra - Buyer Profile'),
            ('/seller-profile.html', 'Ventra - Seller Profile')
        ]
        
        for path, expected_title in pages:
            try:
                response = requests.get(f"{BASE_URL}{path}")
                has_title = expected_title in response.text
                self.log_test(f"Page Load: {path}", 
                            response.status_code == 200 and has_title,
                            f"Status: {response.status_code}, Title found: {has_title}")
            except Exception as e:
                self.log_test(f"Page Load: {path}", False, f"Error: {str(e)}")
    
    def test_static_resources(self):
        """Test if static resources load correctly"""
        resources = [
            '/styles.css',
            '/script.js'
        ]
        
        for resource in resources:
            try:
                response = requests.get(f"{BASE_URL}{resource}")
                self.log_test(f"Static Resource: {resource}", 
                            response.status_code == 200,
                            f"Status: {response.status_code}")
            except Exception as e:
                self.log_test(f"Static Resource: {resource}", False, f"Error: {str(e)}")
    
    def test_javascript_functionality(self):
        """Test JavaScript functionality by checking script content"""
        try:
            response = requests.get(f"{BASE_URL}/script.js")
            script_content = response.text
            
            # Check for key JavaScript functions
            key_functions = [
                'displayProducts',
                'displaySellers',
                'addToCart',
                'updateMarketValues',
                'filterProducts',
                'searchProducts'
            ]
            
            for func in key_functions:
                has_function = func in script_content
                self.log_test(f"JS Function: {func}", has_function,
                            "Found" if has_function else "Missing")
                
        except Exception as e:
            self.log_test("JavaScript Functionality", False, f"Error: {str(e)}")
    
    def test_css_styling(self):
        """Test CSS styling by checking stylesheet content"""
        try:
            response = requests.get(f"{BASE_URL}/styles.css")
            css_content = response.text
            
            # Check for key CSS classes
            key_classes = [
                '.product-grid',
                '.seller-grid',
                '.cart-count',
                '.market-value-panel',
                '.category-button',
                '.search-input'
            ]
            
            for css_class in key_classes:
                has_class = css_class in css_content
                self.log_test(f"CSS Class: {css_class}", has_class,
                            "Found" if has_class else "Missing")
                
        except Exception as e:
            self.log_test("CSS Styling", False, f"Error: {str(e)}")
    
    def test_html_structure(self):
        """Test HTML structure of main page"""
        try:
            response = requests.get(BASE_URL)
            html_content = response.text
            
            # Check for key HTML elements
            key_elements = [
                'id="product-grid"',
                'id="seller-grid"',
                'id="cart-item-count"',
                'id="market-value-display"',
                'class="search-input"',
                'class="category-button"'
            ]
            
            for element in key_elements:
                has_element = element in html_content
                self.log_test(f"HTML Element: {element}", has_element,
                            "Found" if has_element else "Missing")
                
        except Exception as e:
            self.log_test("HTML Structure", False, f"Error: {str(e)}")
    
    def run_all_tests(self):
        """Run all frontend tests"""
        print("=" * 60)
        print("VENTRA MARKETPLACE FRONTEND TESTS")
        print("=" * 60)
        
        self.test_page_loads()
        self.test_static_resources()
        self.test_javascript_functionality()
        self.test_css_styling()
        self.test_html_structure()
        
        # Print summary
        print("\n" + "=" * 60)
        print("FRONTEND TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.passed + self.failed}")
        print(f"Passed: {self.passed}")
        print(f"Failed: {self.failed}")
        print(f"Success Rate: {(self.passed / (self.passed + self.failed) * 100):.1f}%")
        
        return self.failed == 0

if __name__ == "__main__":
    tester = VentraFrontendTester()
    success = tester.run_all_tests()
    exit(0 if success else 1)

