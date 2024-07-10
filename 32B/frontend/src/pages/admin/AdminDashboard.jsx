import React, { useState, useEffect } from 'react';
import { createProductApi, deleteProduct, getAllProducts } from '../../apis/Api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';
import backgroundImage from './bg.jpg'; 

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts().then((res) => {
            setProducts(res.data.products || []); // Ensure products is an array
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setProductImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleDelete = (id) => {
        const confirmDialog = window.confirm("Are you sure you want to delete?");
        if (confirmDialog) {
            deleteProduct(id).then((res) => {
                if (res.status === 201) {
                    toast.success(res.data.message);
                    setProducts(products.filter(product => product._id !== id));
                }
            }).catch((error) => {
                if (error.response.status === 500) {
                    toast.error(error.response.data.message);
                } else if (error.response.status === 400) {
                    toast.error(error.response.data.message);
                }
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productPrice', productPrice);
        formData.append('productCategory', productCategory);
        formData.append('productDescription', productDescription);
        formData.append('productImage', productImage);

        createProductApi(formData).then((res) => {
            if (res.status === 201) {
                toast.success(res.data.message);
                setProducts([...products, res.data.product]);
                setProductName('');
                setProductPrice('');
                setProductCategory('');
                setProductDescription('');
                setProductImage(null);
                setPreviewImage(null);
                document.getElementById('closeModal').click();
            } else {
                toast.error("Something went wrong in frontend!");
            }
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 400) {
                    toast.error(error.response.data.message);
                } else if (error.response.status === 500) {
                    toast.error("Internal server error");
                } else {
                    toast.error("No response!!");
                }
            }
        });
    };

    return (
        <div className='admin-dashboard-container' style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className='container'>
                <div className='d-flex justify-content-between mt-2'>
                    <h2>Admin Dashboard</h2>
                    <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Add Product
                    </button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Create a new product!</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <label>Product Name</label>
                                        <input value={productName} onChange={(e) => setProductName(e.target.value)} type="text" className='form-control' placeholder='Enter product Name' />
                                        <label className='mt-2'>Product Price</label>
                                        <input value={productPrice} onChange={(e) => setProductPrice(e.target.value)} type="number" className='form-control' placeholder='Enter product Price' />
                                        <div className='mt-2'>
                                            <label>Select Category</label>
                                            <select value={productCategory} onChange={(e) => setProductCategory(e.target.value)} className='form-control'>
                                                <option value="Apartment">Apartment</option>
                                                <option value="1bhk">1bhk</option>
                                                <option value="2bhk">2bhk</option>
                                                <option value="3bhk">3bhk</option>
                                            </select>
                                        </div>
                                        <label className='mt-2'>Type product description</label>
                                        <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className='form-control'></textarea>
                                        <label className='mt-2'>Product Image</label>
                                        <input onChange={handleImageUpload} type="file" className='form-control' />
                                        {previewImage && (
                                            <div className=''>
                                                <img src={previewImage} alt="preview image" className='img-fluid rounded object-fit-cover mt-3' />
                                            </div>
                                        )}
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button id="closeModal" type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button onClick={handleSubmit} type="button" className="btn btn-primary">Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <table className='table mt-3'>
                    <thead className='table-header'>
                        <tr>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((singleProduct) => (
                            <tr key={singleProduct._id}>
                                <td>
                                    {singleProduct.productImage ? (
                                        <img className='product-image' src={`http://localhost:5000/products/${singleProduct.productImage}`} alt="" />
                                    ) : (
                                        <span>No Image</span>
                                    )}
                                </td>
                                <td>{singleProduct.productName}</td>
                                <td>NPR.{singleProduct.productPrice}</td>
                                <td>{singleProduct.productCategory}</td>
                                <td>{singleProduct.productDescription}</td>
                                <td>
                                    <div className='btn-group' role='group'>
                                        <Link to={`/admin/update/${singleProduct._id}`} className='btn btn-success'>Edit</Link>
                                        <button onClick={() => handleDelete(singleProduct._id)} className='btn btn-danger'>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
