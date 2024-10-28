<template>
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section about">
            <h3>About Us</h3>
            <p>
              We are a company dedicated to providing the best service and products to our customers.
            </p>
          </div>
          <div class="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div class="footer-section contact">
            <h3>Contact Us</h3>
            <p>
              <i class="fas fa-map-marker-alt"></i> 123 Street, City, Country
            </p>
            <p>
              <i class="fas fa-phone"></i> +123 456 7890
            </p>
            <p>
              <i class="fas fa-envelope"></i> info@company.com
            </p>
          </div>
        </div>
        <div class="footer-bottom">
          &copy; 2023 Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer'
  }
  </script>
  
  <style scoped>
  .footer {

    bottom: 0;
    width: 100%;
    background-color: #333;
    color: white;
    text-align: center;
    padding: 20px 0;
  }
  
  .container {
    max-width: 1024px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 20px 0;
  }
  
  .footer-section {
    flex: 1;
    padding: 10px;
  }
  
  .footer-section h3 {
    margin-bottom: 15px;
  }
  
  .footer-section p,
  .footer-section ul,
  .footer-section li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  .footer-section ul {
    padding-left: 0;
  }
  
  .footer-section ul li {
    margin-bottom: 10px;
  }
  
  .footer-section ul li a {
    color: white;
    text-decoration: none;
  }
  
  .footer-section ul li a:hover {
    text-decoration: underline;
  }
  
  .footer-bottom {
    margin-top: 20px;
    font-size: 14px;
  }
  
  .footer-section i {
    margin-right: 10px;
  }
  </style>