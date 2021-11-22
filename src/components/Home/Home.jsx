import React, { useEffect, useState } from 'react';
import ProductCard from '../Products/ProductCard/ProductCard';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './Home.css';
import Modal from '../Modal/Modal';


const Home = () => {
    
        const [products, setProducts] = useState([]);
        const [filter, setFilter] = useState(products);
        const [searchTerm, setSearchTerm] = useState("")
        const [catagory, setCatagory] = useState([]);
        const [loading, setLoading] = useState(false);      
        const [useModal, setUseModal] = useState(false);

        const openModal = (prev) =>{
            setUseModal(prev => !prev)
        }

        let componentMounted = true;
    
        useEffect(() =>{
            const getProducts = async () => {
                setLoading(true);
                const response = await fetch ('https://fakestoreapi.com/products');
                if(componentMounted){
                    setProducts(await response.clone().json());
                    setFilter(await response.json());
                    setLoading(false);
                }
    
                return () => {
                    componentMounted = false;
                }
            }
    
            getProducts();
        }, [])

    
        useEffect(() => {
            fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then(data => setCatagory(data))
        }, []);


        const filterProduct = (cat) =>{
            const updateList = products.filter((x) => x.category === cat);
            setFilter(updateList);
        }

        const searchProduct = (value) =>{
            
        } 

        const Loading = () =>{
           return(
                <div className="row">
                    <div className="col-md-3">
                        <Skeleton height={350} count={5}/>
                    </div>
                    <div className="col-md-3">
                        <Skeleton height={350} count={5}/>
                    </div>
                    <div className="col-md-3">
                        <Skeleton height={350} count={5}/>
                    </div>
                    <div className="col-md-3">
                        <Skeleton height={350} count={5}/>
                    </div>
                </div>
           )
        }

        const ShowProducts = () => {
            return(
                <div>
                    {
                        filter.filter((product)=>{
                            if(searchTerm == ""){
                                return product;
                            }else if(product.title.toLowerCase().includes(searchTerm.toLowerCase())){
                                return product;
                            }
                        }).map((product) => <ProductCard product={product} />)
                    }
                </div>
            )
        }

       

    return (
     <section>   
        <div className="navbar">
            <div className="navbar-item">
                    <div class="dropdown">
                        <div class="dropdown-select">
                            <span class="select">Selected item</span>
                            <i class="fa fa-caret-down icon"></i>
                        </div>

                        <div class="dropdown-list">
                            <div class="dropdown-list__item" onClick={()=> setFilter(products)}>All Products</div>
                            <div class="dropdown-list__item" onClick={()=> filterProduct("electronics")}>{catagory[0]}</div>
                            <div class="dropdown-list__item" onClick={()=> filterProduct("jewelery")}>{catagory[1]}</div>
                            <div class="dropdown-list__item" onClick={()=> filterProduct("men's clothing")}>{catagory[2]}</div>
                            <div class="dropdown-list__item" onClick={()=> filterProduct("women's clothing")}>{catagory[3]}</div>
                        </div>
                    </div>

                    <div className="">
                        <div className="search-box" >
                            <input type="text" placeholder="search item" onChange={event => setSearchTerm(event.target.value)}/>
                        </div>
                    </div>
            </div>
        </div>
        <div>
            <button onClick={openModal} className="floating-button">ANALYSE</button>
            <Modal useModal={useModal} setUseModal={setUseModal} />
        </div>
        <div>
            {loading ? <Loading/> : <ShowProducts />}
        </div>
        
    </section>  
        
    );
};

export default Home;