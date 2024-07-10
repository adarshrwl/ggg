import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleProduct, updateProduct } from '../../apis/Api';
import { toast } from 'react-toastify';
import './AdminDashboard.css';
import backgroundImage from './bg.jpg';

const AdminUpdate = () => {
    const { id } = useParams();

    useEffect(() => {
        getSingleProduct(id).then((res) => {
            setProductName(res.data.product.productName);
            setProductPrice(res.data.product.productPrice);
            setProductDescription(res.data.product.productDescription);
            setProductCategory(res.data.product.productCategory);
            setOldImage(res.data.product.productImage);
        }).catch((error) => {
            console.log(error);
        });
    }, [id]);

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productNewImage, setProductNewImage] = useState(null);
    const [previewNewImage, setPreviewNewImage] = useState(null);
    const [oldImage, setOldImage] = useState('');

    const handleImage = (event) => {
        const file = event.target.files[0];
        setProductNewImage(file);
        setPreviewNewImage(URL.createObjectURL(file));
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productPrice', productPrice);
        formData.append('productCategory', productCategory);
        formData.append('productDescription', productDescription);

        if (productNewImage) {
            formData.append('productImage', productNewImage);
        }

        updateProduct(id, formData).then((res) => {
            if (res.status === 201) {
                toast.success(res.data.message);
            }
        }).catch((error) => {
            if (error.response.status === 500) {
                toast.error(error.response.data.message);
            } else if (error.response.status === 400) {
                toast.warning(error.response.data.message);
            }
        });
    };

    return (
        <div className='admin-dashboard-container' style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className='container'>
                <h2 className='mt-3'>Update product for <span className='text-danger'>'{productName}'</span></h2>
                <div className='d-flex gap-3'>
                    <form className='flex-fill'>
                        <label>Product Name</label>
                        <input value={productName} onChange={(e) => setProductName(e.target.value)} className='form-control' type="text" placeholder='Enter your product name' />

                        <label className='mt-2'>Product Price</label>
                        <input value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className='form-control' type="number" placeholder='Enter your product price' />

                        <label className='mt-2'>Choose category</label>
                        <select value={productCategory} onChange={(e) => setProductCategory(e.target.value)} className='form-control'>
                            <option value="Apartment">Apartment</option>
                            <option value="1bhk">1bhk</option>
                            <option value="2bhk">2bhk</option>
                            <option value="3bhk">3bhk</option>
                        </select>

                        <label className='mt-2'>Enter description</label>
                        <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className='form-control'></textarea>

                        <label className='mt-2'>Choose product Image</label>
                        <input onChange={handleImage} type="file" className='form-control' />

                        <button onClick={handleUpdate} className='btn btn-primary w-100 mt-2'>Update Product</button>
                    </form>
                    <div className='image-section'>
                        <h6>Old Image Preview</h6>
                        <img className='img-fluid object-fit-cover rounded-4' height={'200px'} width={'200px'} src={`http://localhost:5000/products/${oldImage}`} alt="" />
                        {previewNewImage && (
                            <div>
                                <h6>New Image Preview</h6>
                                <img className='img-fluid object-fit-cover rounded-4' height={'200px'} width={'200px'} src={previewNewImage} alt="" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUpdate;
