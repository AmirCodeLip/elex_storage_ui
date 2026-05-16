import { Link } from "react-router-dom";
import { useParams } from 'react-router';
import { useCart, CartProvider, CartContextType, ProductType } from '../contexts/CartContext';


function Details() {
    const { id } = useParams();
    const { cartItems, addToCart, removeFromCart, getTotalPrice } = useCart();

    let productId = Number(id)


    if (isNaN(productId))
        return <></>;


    return <div className="px-4 min-h-screen">
        <div className="flex mt-16">

            {/* <!-- Image Section --> */}
            <div className="w-1/4 h-auto mt-4 border">

                <div className="p-4">
                    {/* <img src={item.src200} className="w-full" alt="Image" /> */}
                </div>

                <div className="local-divider"></div>

                {/* Price and Add btn */}
                <div className="w-full p-2">
                    {/* <div className="rial-price" style={{}}>
                        <span>{item.price}</span>
                    </div>
                    <Link to={"/cart"} onClick={add} className="local-btn local-btn-main">
                        افزودن به سبد خرید
                    </Link> */}
                </div>
            </div>


            <div className="pl-[10px] flex-grow text-center">
                {/* <!-- Title --> */}
                {/* <h1 className="head-bar">
                    {item.name}
                    <span style={{ width: `calc(${item.name.length}px * 10 - 40px)` }}></span>
                </h1> */}

                {/* <!-- Description --> */}
                <div className="min-h-[220px]">
                    <div className="mt-4 font-bold text-right text-[20px]">:توضیحات</div>
                    <div className="px-6 text-right overflow-hidden mt-2 iranwebyekan-2">
                        {/* <div className="description-box" dangerouslySetInnerHTML={{ __html: item.description!.replace(/\n/g, '<br />') }} /> */}
                    </div>
                </div>

                <div className="local-divider"></div>
                {/* <!-- Specification --> */}
                <div className="min-h-[220px]">
                    <div className="mt-4 font-bold text-right text-[20px]">:مشخصات</div>
                    <div className="px-6 text-right overflow-hidden mt-2 iranwebyekan-2">
                        {/* {item.properties?.map((x, i) => {
                            return <div key={i} className="flex" style={{ direction: "rtl" }}>
                                <div className="">{x.n}</div>
                                <div className="">:</div>
                                <div className="">{x.v}</div>
                            </div>
                        })} */}

                    </div>
                </div>

            </div>
        </div>

    </div>
}

export default Details;
