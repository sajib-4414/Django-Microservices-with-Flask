import React, {PropsWithChildren, PropsWithRef, SyntheticEvent, useEffect, useState} from "react";
import Wrapper from "./Wrapper";
import {Navigate} from "react-router-dom";
import {useParams} from 'react-router-dom'
import {Product} from "../interfaces/products";

const ProductsEdit = (props:PropsWithRef<any>) =>{
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { id } = useParams()
    useEffect( ()=>{
        (
            async ()=>{
                const response = await fetch(`http://142.3.200.35:8000/api/products/${id}`)
                const product:Product = await response.json()
                setTitle(product.title)
                setImage(product.image)
            }
        )();
    }, [])

    const submit = async (event:SyntheticEvent) =>{
        event.preventDefault()
        await fetch(`http://142.3.200.35:8000/api/products/${id}`,{
            method: 'PUT',
            headers: { 'Content-type': 'application/json'},
            body: JSON.stringify({
                title, image
            })
        })
        setRedirect(true)
    }
    if (redirect){
        return <Navigate to={'/admin/products'}/>
    }
    return (
        <div>
            <Wrapper>
                <form onSubmit={submit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control" name="title"
                               defaultValue={title}
                        onChange={event => setTitle(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Image</label>
                        <input type="text" className="form-control" name="image"
                               defaultValue={image}
                               onChange={event => setImage(event.target.value)}
                        />
                    </div>
                    <button className="btn btn-outline-secondary">Save</button>
                </form>
            </Wrapper>
        </div>
    )
}
export default ProductsEdit;