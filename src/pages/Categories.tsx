import * as React from "react";
import data from "../data";
import { Link } from "react-router-dom";
import { useParams } from 'react-router';


function Categories() {
    const { id } = useParams();
    let categoryId = Number(id);
    let category = data.categories.filter(x => x.id == categoryId)[0];
    return <>

        {/* <!-- Product Grid --> */}
        <main className="mx-auto px-4 py-10">
            <h2 className="head-bar mb-4">
                {category.name}
                <span style={{ width: `calc(${category.name.length}px * 12)` }}></span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.products.filter(x => x.categoryId == category.id).map((x: any) => {
                    return <Link to={"/details/" + x.id} className="bg-white shadow rounded-lg 
                overflow-hidden border-2 hover:border-color_layer_001" key={x.id}>

                        <img src={(x.src200)} alt="Product 1" className="w-full object-cover"></img>
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-right">{x.name}</h3>
                            <hr className="mt-2" />
                            <p className="text-gray-600 mt-2">{(x.price)}</p>
                        </div>
                    </Link>
                })}
            </div>



        </main>

    </>
}

export default Categories;
