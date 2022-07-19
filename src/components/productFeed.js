import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"
import { loadAllProducts } from "../ApiCalls/productFeedApi";
import { toast } from 'react-toastify';


const ProductFeed = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [cartInfo, setCartInfo] = useState({});


    const loadProducts = async () => {

        try {
            const res = await loadAllProducts();
            setProducts(res.data.data);
        } catch (error) {

            toast.error(error.response.data.error.message)
        }


        // axios({
        //     method: "GET",
        //     url: "https://api.chec.io/v1/products",
        //     params: {

        //     },
        //     headers: {
        //         "X-Authorization": "pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b",
        //     }
        // }).then((res) => {
        //     console.log(res,"dfvfSBD");
        //     setProducts(res.data.data)
        // }).catch((err) => {
        //     console.log("failed dff", err);
        // })
    }



    const createLoadCart = async () => {
        const cartID = localStorage.getItem("CARTID")
        if (cartID) {
            axios({
                method: "GET",
                url: `https://api.chec.io/v1/carts/${cartID}`,
                headers: {
                    "X-Authorization": "pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b"
                }
            }).then((res) => {
                console.log(res.data, "allllll");
            }).catch((err) => {
                console.log(err);
            })

        } else {
            axios({
                method: "GET",
                url: "https://api.chec.io/v1/carts",
                headers: {
                    "X-Authorization": "pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b"
                }

            }).then((res) => {
                console.log(res, "clicked");
                if (res.status == 201) {
                    localStorage.setItem("CARTID", res.data.id)
                    setCartInfo(res.data)
                }
            }).catch((err) => {
                console.log(err);
            })
      
        }

    }




    //component did mount
    useEffect(() => {
        loadProducts();
        createLoadCart();
    }, [])



    const handleLogout = () => {
        console.log("logout");
        localStorage.setItem("EcommerAuthToken", "");
        navigate("/login");

    }


    const handleAddCart = (product_id) => {
        console.log("adddd");
        const cartID = localStorage.getItem("CARTID")
        axios({
            method: "POST",
            url: `https://api.chec.io/v1/carts/${cartID}`,
            headers: {
                "X-Authorization": "pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b"
            },
            data: {
                id: product_id,
                quantity: 1
            }
        }).then((res) => {
            console.log(res.data, "datataaa");
            setCartInfo(res.data.cart)
        }).catch((err) => {
            console.log(err);
        })
    }



    const handleCartRemove = (productId) => {

    //     console.log("removeeee");
    //     const cartID = localStorage.getItem("CARTID");
    //     const remove_res=cartInfo.line_items.filter((element,index)=>{
    //         return productId===element.product_id;
    //     });

    //     axios({
    //         method: "DELETE",
    //         url: `https://api.chec.io/v1/carts/${cartID}/items/${remove_res[0].id}`,
    //         headers: {
    //             "X-Authorization": "pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b"
    //         }

    //     }).then((response) => {
    //         console.log(response, "removeee");
    //     }).catch((error) => {
    //         console.log(error);
    //     })
    }


    const addedProducts = cartInfo.line_items ? cartInfo.line_items.map((product) => product.product_id) : [];
    console.log(addedProducts, "addededdda");


    return (
        <>
            <div style={{ color: "blue", backgroundColor: "pink" }}>

                <h1 >Ecommerce App In  Shopping Products </h1>

            </div>

            <div style={{
                textAlign: "center", display: "flex",
                justifyContent: "center", alignItems: "center", backgroundColor: "aqua"
            }}>


                <button className="btn btn-danger"
                    style={{ marginLeft: 1090, marginTop: 0 }}
                    onClick={handleLogout}>Logout</button>
            </div >

            {
                cartInfo && (

                    <div style={{ backgroundColor: "lavenderblush", color: "darkviolet" }}>
                        <p>Products Added-{cartInfo.total_items || 0}</p>
                        <p>Grand Total-{cartInfo.subtotal ? cartInfo.subtotal.formatted_with_code : "0.00 INR"}</p>
                    </div>
                )}




            <div style={{
                display: "flex", flexWrap: "wrap", justifyContent: "center",
                alignItems: "center", backgroundColor: "orange", marginTop: 10
            }}>
                {
                    products.map((product) => {
                        const id = product.id;
                        return (
                            <div className="card"
                                style={{ width: 390, margin: 20, marginTop: 10 }}>
                                <img src={product.image.url}
                                    style={{ width: '100%', height: 300 }}
                                    className="card-img-top" alt="..."></img>

                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <h6 className="text-success">price-{product.price.formatted_with_symbol}</h6>
                                    <p className="card-text">
                                        {product.description}
                                    </p>
                                </div>
                                {
                                    addedProducts.includes(product.id) ? (
                                        <button className="btn btn-danger" onClick={() => { handleCartRemove(product.id) }}>Remove from Cart</button>
                                    ) : (

                                        <button className="btn btn-primary" onClick={() => { handleAddCart(product.id) }}>Add To Cart </button>
                                    )}
                            </div>

                        )
                    })

                }

            </div>
        </>
    )
}
export default ProductFeed;