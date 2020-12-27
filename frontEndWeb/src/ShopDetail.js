import React, { useEffect,useState } from 'react'
import Axios from 'axios'
import BootstrapTable  from 'react-bootstrap-table-next'
import { Link, useHistory, useParams} from "react-router-dom";
import paginationFactory from 'react-bootstrap-table2-paginator'
import CurrencyFormat from "react-currency-format";
import './UserDetail.css'
export const ShopDetail =({order_id,shop_id,status} ) => {
    const backEndServe = 'http://localhost:8000/';
    const[orderDetail,setOrderDetail] =useState(null);
    
   const changShipped = () => {
        async function fetchData(){
            const result = await Axios({
                method: 'post',
                url: `http://localhost:8000/changeOrder/${order_id}`,
                data: {
                    status: "shipped"       
                }
            });
            if (result.data.message != "Success")
                return alert(result.data.message);
            return window.location.reload();
        }
        fetchData();
    }

    const changDeleted = () => {
        async function fetchData(){
            const result = await Axios({
                method: 'post',
                url: `http://localhost:8000/changeOrder/${order_id}`,
                data: {
                    status: "deleted"       
                }
            });
            if (result.data.message != "Success")
                return alert(result.data.message);
            return window.location.reload();
        }
        fetchData();
    }

    

    useEffect(() =>{
        async function fetchData() {
            const OrderDetail = await Axios({
                method:'get',
                url:`http://localhost:8000/shop/${shop_id}/order/${order_id}/detail`
            })
            setOrderDetail(OrderDetail.data)     
        }
        fetchData();
        console.log(orderDetail);
    },[order_id])
    
    
    return(
        <table className="userDetail">
            <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th> Product ID</th>
                    <th> Product Name</th>
                    <th> Quantity</th>
                    <th> Price Each</th>
                    
                    
                </tr>
            </thead>
            <tbody>
                {
                orderDetail && orderDetail.map(post =>(
                    <tr > 
                        <td key ={post.product_id}> 
                            <Link to={`/products/${post.product_id}`}>
                                <img src={backEndServe + post.product_image} className="orderdetail_img"/>
                            </Link>
                        </td>
                        <td class ="id" key ={post.product_id}> {post.product_id}   </td>
                        <td class ="name" key ={post.product_id}> {post.product_name} </td>
                        <td class ="quantity" key ={post.product_id}> {post.quantity}     </td>
                        <td class ="price" key ={post.product_id}>  <CurrencyFormat
                                            renderText={(value) => (
                                            <strong>{value}</strong>
                                            )}
                                            decimalScale={2}
                                            value={post.priceEach}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            suffix={" đ"}
                        /></td> 
                    </tr>   
                ))}
                {status=='processing' ? <button onClick={changShipped}>Shipped</button> : null}
                {status=='processing' ? <button onClick={changDeleted}>Delete Order</button> : null}
            </tbody>
        </table>
    );
};
export default ShopDetail