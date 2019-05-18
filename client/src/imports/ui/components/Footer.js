import React from 'react';

export default () => {
  return (
    <div className="footer-clean">
    <footer>
            <div className="container">
                <div className="row justify-content-center">
        
                    <div className="col-sm-4 col-md-3 item">
                        <h3>About</h3>
                        <ul>
                            <li><a href="#">Company</a></li>
                            <li><a href="#">Team</a></li>
                            <li><a href="#">Legacy</a></li>
                        </ul>
                    </div>
    
                    <div className="col-lg-3 justify-content-end item social"><a href="#"><i className="icon ion-social-facebook"></i></a><a href="#"><i className="icon ion-social-twitter"></i></a><a href="#"><i className="icon ion-social-snapchat"></i></a><a href="#"><i className="icon ion-social-instagram"></i></a>
                        <p className="copyright">  Copyright &copy; {new Date().getFullYear()} Eugelion</p>
                    </div>
         
                </div>
            </div>
        </footer>
   </div>
  );
};
