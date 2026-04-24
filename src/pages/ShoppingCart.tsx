import { useState } from 'react';
import { useCart, ProductType } from '../contexts/CartContext';
import data from "../data";
import { Link } from "react-router-dom";

function countDisplay(count: any) {
    return "تعداد : " + (count);
}

const ShoppingCart = () => {


    const { cartItems, addToCart, removeFromCart, getTotalPrice } = useCart();

    return (
        <>
            <div className="center-container mt-10 m-auto p-10">
                {cartItems.length === 0 ? (
                    <p>سبد خرید خالی هست</p>
                ) : (
                    <>
                        <div className="cart-items">
                            {cartItems.map(item => {
                                let product = data.products.filter(x => x.id == item.id)[0];
                                return (<div className="cart-item p-2 rtl" >
                                    <div className='pr-10 mb-2'>
                                        {product.name}
                                    </div>
                                    <img className='w-full' src={product.src200}></img>
                                    <div className="flex">
                                        <div className='flex-1 pr-10'>
                                            <p className=''>تومان {product.price}</p>
                                            <div>
                                                <p>
                                                    {countDisplay(item.quantity)}
                                                </p>
                                            </div>

                                        </div>
                                        <div className='w-48 flex-none'>
                                            <div className='flex font-semibold'>
                                                <a onClick={() => alert("test")} className="local-btn local-btn-main">
                                                    +
                                                </a>
                                                <a onClick={() => alert("test")} className="local-btn local-btn-danger">
                                                    -
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                            }

                            )}


                        </div>
                        <div className="total">
                            <h2>Total: ${getTotalPrice().toFixed(2)}</h2>
                            <button className="checkout">Checkout</button>
                        </div>
                    </>
                )}

            </div >

        </>

    );
};

export default ShoppingCart;