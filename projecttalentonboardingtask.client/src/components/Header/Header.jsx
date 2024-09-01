import React from 'react';
import './index.css';

function Header() {
    return (
        <header>
            <div className="header">
                <div className="row">
                    <div className="ui grid" >
                        <div className="column">
                            <h3>React</h3>
                        </div>
                        <div className="column">
                            <a className="link" href="/">Customers</a>
                        </div>
                        <div className="column">
                            <a className="link" href="/products">Products</a>
                        </div>
                        <div className="column">
                            <a className="link" href="/stores">Stores</a>

                        </div>
                        <div className="column">
                            <a className="link" href="/sales">Sales</a>
                        </div>
                    </div>
                </div>
            </div>

        </header>
    );
}

export default Header;