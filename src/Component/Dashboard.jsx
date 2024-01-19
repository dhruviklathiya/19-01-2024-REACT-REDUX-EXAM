import Cookies from 'js-cookie'
import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'

const Dashboard = () => {
    // let role = "admin"
    const role = Cookies.get("Role")
    let total = 0
    const product_name = useRef()
    const product_price = useRef()

    const [data, setdata] = useState([])
    const [view, setview] = useState({})
    const [index, setindex] = useState()
    const [cart, setcart] = useState([])

    const arr = JSON.parse(localStorage.getItem("detail")) || []
    const cart_arr = JSON.parse(localStorage.getItem("cart")) || []

    useEffect(() => {
        setdata([...arr])
        setcart([...cart_arr])
    }, [])

    const submit_handle = () => {
        const input = {
            product_name: product_name.current.value,
            product_price: product_price.current.value,
        }
        arr.push(input)
        localStorage.setItem("detail", JSON.stringify(arr))
        setdata([...arr])
        Swal.fire({
            title: "Item added successfully !",
            text: "You clicked the button!",
            icon: "success"
        })
    }

    const delete_handler = (ind_) => {
        arr.splice(ind_, 1)
        localStorage.setItem("detail", JSON.stringify(arr))
        setdata([...arr])
        Swal.fire({
            title: "Deleted successfully !",
            text: "You clicked the button!",
            icon: "success"
        })
    }

    const view_handler = (ind_) => {
        setview(arr[ind_])
        setindex(ind_)
    }

    const update_input_handler = (e) => {
        setview({ ...view, [e.target.name]: e.target.value })
    }

    const update_handle = () => {
        arr.splice(index, 1, view)
        localStorage.setItem("detail", JSON.stringify(arr))
        setdata([...arr])
        Swal.fire({
            title: "Updated successfully !",
            text: "You clicked the button!",
            icon: "success"
        })
    }

    const cart_add = (val_, ind_) => {
        cart_arr.push(arr[ind_])
        localStorage.setItem("cart", JSON.stringify(cart_arr))
        setcart([...cart_arr])
        Swal.fire({
            title: "Item added to cart successfully !",
            text: "You clicked the button!",
            icon: "success"
        })
    }

    const cart_item_remove = (ind_) => {
        cart_arr.splice(ind_, 1)
        localStorage.setItem("cart", JSON.stringify(cart_arr))
        setcart([...cart_arr])
        Swal.fire({
            title: "Item removed from cart successfully !",
            text: "You clicked the button!",
            icon: "success"
        })
    }

    if (role === "admin") {
        return (
            <>
                <div className='col-6 offset-3 py-3 border border-dark rounded-5 mb-5'>
                    <input className='form-control my-4' type="text" name='product_name' placeholder='Product name' ref={product_name} />
                    <input className='form-control my-4' type="number" name='product_price' placeholder='Product price' ref={product_price} />
                    <button className='d-block w-100 btn btn-outline-info' type='button' onClick={submit_handle}>Submit</button>
                </div>
                <div className='col-6 offset-3 py-3 border border-dark rounded-4'>
                    <input type="text" className='form-control my-4' name='product_name' value={view.product_name} onChange={update_input_handler} />
                    <input type="number" className='form-control my-4' name='product_price' value={view.product_price} onChange={update_input_handler} />
                    <button type='button' className='d-block w-100 btn btn-outline-info' onClick={update_handle}>Update</button>
                </div>
                <div className='d-flex flex-wrap'>
                    {
                        data?.map((val_, ind_) => {
                            return (
                                <>
                                    <div className='col-4 my-3'>
                                        <div class="card">
                                            <div class="card-body">
                                                <h5 class="card-title">{val_.product_name}</h5>
                                                <h6 class="card-subtitle mb-2 text-muted">{val_.product_price}</h6>
                                                <button className='btn btn-outline-info' onClick={() => delete_handler(ind_)}>Delete</button>
                                                <button className='btn btn-outline-info' onClick={() => view_handler(ind_)}>View</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <h1 align="center">=== === === Available products === === ===</h1>
                <div className='d-flex flex-wrap'>
                    {
                        data?.map((val_, ind_) => {
                            return (
                                <>
                                    <div className='col-4 my-3'>
                                        <div class="card">
                                            <div class="card-body">
                                                <h5 class="card-title">{val_.product_name}</h5>
                                                <h6 class="card-subtitle mb-2 text-muted">${val_.product_price}</h6>
                                                <button className='btn btn-outline-info' onClick={() => cart_add(val_, ind_)}>Add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <h1 align="center">=== === === Cart === === ===</h1>
                <div className='d-flex flex-wrap'>
                    {
                        cart?.map((val_, ind_) => {
                            total += Number(val_.product_price)
                            return (
                                <>
                                    <div className='col-4 my-3'>
                                        <div class="card">
                                            <div class="card-body">
                                                <h5 class="card-title">{val_.product_name}</h5>
                                                <h6 class="card-subtitle mb-2 text-muted">${val_.product_price}</h6>
                                                <button className='btn btn-outline-info' onClick={() => cart_item_remove(ind_)}>Remove from cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <h1 align="center">Total: ${total}</h1>
            </>
        )
    }
}

export default Dashboard