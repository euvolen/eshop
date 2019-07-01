import React from 'react'

function About() {
    return (
        <main className="page">
        <section className="clean-block about-us">
        <div className="container">
            <div className="block-heading">
                <h2 className="text-info">About this App</h2>
                <p>I started it as a challenge, can i or not create public shopping cart with out cookies. And I assume I nailed it. Of course, if you reload a page you will lost all products from the cart, but you have to pay for everything, as one
                    guy once said.</p>
            </div>
            <div className="row justify-content-center">
                <div className="col-sm-6 col-lg-4">
                    <div className="card clean-card text-center"><img alt=""className="card-img-top w-100 d-block" src="/assets/img/mern.png"/>
                        <div className="card-body info">
                            <h4 className="card-title">Eugen Volen</h4>
                            <p className="card-text">Software developer</p>
                            <div className="icons"><a href="#"><i className="icon-social-facebook"></i></a><a href="#"><i className="icon-social-instagram"></i></a><a href="#"><i className="icon-social-twitter"></i></a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </main>
    )
}

export default About
