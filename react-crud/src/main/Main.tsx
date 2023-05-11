import React, {useEffect, useState} from "react";
import {Product} from "../interfaces/products";
const Main = () =>{
    const [products, setProducts] = useState([] as Product[])
    useEffect( ()=>{
        (
            async ()=>{
                const response = await fetch('http://142.3.200.35:8000/api/products/')
                const data = await response.json();
                setProducts(data)
            }
        )();
    }, [])
    const like = async (id:number) =>{
        await fetch(`http://142.3.200.35:8001/api/products/${id}/like`,
            {
                method: 'POST',
                headers: {'Content-Type':'application/json'}
            })
        setProducts(products.map(
            (product:Product) =>{
                if (product.id == id){
                    product.likes++;
                }
                return product
            }
        ))
    }
    return (
    <main>



        <div className="album py-5 bg-body-tertiary">
            <div className="container">

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {products.map(
                        (product:Product) => {
                            return (
                                <div className="col" key={product.id}>
                                    <div className="card shadow-sm">
                                        <img src={product.image} height="180"/>
                                        <div className="card-body">
                                            <p className="card-text">This is a wider card with supporting text below as a natural
                                                lead-in to additional content. This content is a little bit longer.</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group">

                                                    <button type="button" className="btn btn-sm btn-outline-secondary"
                                                    onClick={ () => like(product.id)
                                                    }
                                                    >Like</button>
                                                </div>
                                                <small className="text-body-secondary">{product.likes} likes</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    )}
                </div>
            </div>
        </div>

    </main>
    )
}
export default Main;
