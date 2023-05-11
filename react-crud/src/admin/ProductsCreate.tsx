import React, {PropsWithChildren, SyntheticEvent, useState} from "react";
import Wrapper from "./Wrapper";
import {Navigate} from "react-router-dom";

const ProductsCreate = (props:PropsWithChildren<any>) =>{
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [redirect, setRedirect] = useState(false);
    const submit = async (event:SyntheticEvent) =>{
        event.preventDefault()
        await fetch('http://142.3.200.35:8000/api/products/',{
            method: 'POST',
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
                        onChange={event => setTitle(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Image</label>
                        <input type="text" className="form-control" name="image"
                               onChange={event => setImage(event.target.value)}
                        />
                    </div>
                    <button className="btn btn-outline-secondary">Save</button>
                </form>
            </Wrapper>
        </div>
    )
}
export default ProductsCreate;