import React, { useState, useEffect } from 'react';
import { useParams,useHistory} from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import './Dashboard.css';
import ChartOrders from './ChartOrders'
import ChartMoney from './ChartMoney'
import moment from 'moment'
import Axios from 'axios'
import NavShop from './NavShop';
import LoadData from './LoadData';

function Dashboard() {
    let { shop_id } = useParams();
    const [totalOrder, setTotalOrder] = useState([]);
    const [totalMoney, setTotalMoney] = useState([]);
    const [topProduct, setTopProduct] = useState([]);
    const [recentOrder, setRecentOrder] = useState([]);
    let year = moment().year();
    let month = moment().month() +1;

    useEffect(() =>{
        async function fetchData() {
            // get recentorder
            const RecentOrder = await Axios({
                method: 'get',
                url:`http://localhost:8000/shop/${shop_id}/recentorder`,
            })
            
            const TotalOrder = await Axios({
                method:'get',
                url:`http://localhost:8000/shop/${shop_id}/totalorder/${year}/${month}`
            })
            
            const TotalMoney = await Axios({
                method:'get',
                url:`http://localhost:8000/shop/${shop_id}/totalMoney/${year}/${month}`
            })
    
            const TopSale =await Axios({
                method:'get',
                url:`http://localhost:8000/shop/${shop_id}/topsales`
            })
            setRecentOrder(RecentOrder.data);
            setTopProduct(TopSale.data)
            setTotalMoney(TotalMoney.data)
            setTotalOrder(TotalOrder.data)
        }
        fetchData();
    },[])

    return (
        <div className="dashboard">
            <div>
            <LoadData />
            <NavShop/>
                <div class="content-wrapper container" >
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="page-title">
                                <h1>Dashboard <small /></h1>
                            </div>
                        </div>
                    </div>
                    <div className='div_table'>
                        <table className='dashboard__table'>
                            <thead>
                                <tr>
                                    <th>
                                        Total Order
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {totalOrder && totalOrder.map(post => (
                                        <td class="list-group-item">
                                            <small> <i class="fa fa-clock-o" key={post.total}>{post.total} orders </i> </small>
                                        </td>
                                    ))
                                    }
                                </tr>
                            </tbody>
                            <tfoot>
                            </tfoot>
                        </table>
                        <table className='dashboard__table'>
                            <thead>
                                <tr>
                                    <th>
                                        Total Money
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className ="tienanhTotal">
                                    {totalMoney && totalMoney.map(post => (
                                    <td class="list-group-item">
                                        <small> <i class="fa fa-clock-o" key={post.total}><CurrencyFormat
                                                                    renderText={(value) => (
                                                                    <strong>{value}</strong>
                                                                    )}
                                                                    decimalScale={2}
                                                                    value={post.total}
                                                                    displayType={"text"}
                                                                    thousandSeparator={true}
                                                                    suffix={" đ"}
                                    /> </i> </small>
                                    </td>
                                ))
                                }
                                </tr>
                            </tbody>
                            <tfoot>
                            </tfoot>
                        </table>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="panel panel-default recent-activites">
                                <div class="panel-heading">
                                    <h4 class="panel-title"><strong>Total Orders </strong> </h4>
                                    <div class="panel-actions">
                                        <a href="#" class="panel-action panel-action-toggle" data-panel-toggle></a>
                                        <a href="#" class="panel-action panel-action-dismiss" data-panel-dismiss></a>
                                    </div>
                                </div>
                                <div class="panel-body text-center">
                                    <div>
                                        <ChartOrders shop_id ={shop_id}></ChartOrders>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="panel panel-default recent-activites">
                                <div class="panel-heading">
                                    <h4 class="panel-title"> <strong>Total Money</strong> </h4>
                                    <div class="panel-actions">
                                        <a href="#" class="panel-action panel-action-toggle" data-panel-toggle></a>
                                        <a href="#" class="panel-action panel-action-dismiss" data-panel-dismiss></a>
                                    </div>
                                </div>
                                <div class="panel-body text-center">
                                    <div>
                                        <ChartMoney shop_id ={shop_id}></ChartMoney>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4">
                            <div class="panel panel-default recent-activites">
                                <div class="panel-heading">
                                    <h4 class="panel-title"> Top Product </h4>
                                    <div class="panel-actions">
                                        <a href="#" class="panel-action panel-action-toggle" data-panel-toggle></a>
                                        <a href="#" class="panel-action panel-action-dismiss" data-panel-dismiss></a>
                                    </div>
                                </div>
                                <div class="panel-body pad-0">
                                    <ul class="list-group">

                                        {topProduct && topProduct.map(post => (
                                            <li class="list-group-item">
                                                <a key={post.product_id}> {post.product_name} </a>
                                                <small> <i class="fa fa-clock-o" key={post.product_id}>{post.nosale} sales </i> </small>
                                            </li>
                                        ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8">

                            <div class="panel panel-default recent-activites">
                                <div class="panel-heading">
                                    <h4 class="panel-title"> Recent Orders</h4>
                                    <div class="panel-actions">
                                        <a href="#" class="panel-action panel-action-toggle" data-panel-toggle></a>
                                        <a href="#" class="panel-action panel-action-dismiss" data-panel-dismiss></a>
                                    </div>
                                </div>
                                <div class="panel-body pad-0">
                                    <div class="table-responsive">
                                        <table class="table table-hover table-recent-orders">
                                            <thead>
                                                <tr>
                                                    <th>ID order</th>
                                                    <th>ID Customer</th>
                                                    <th>Status</th>
                                                    <th>Create At</th>
                                                    <th>Required Date</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    recentOrder && recentOrder.map(order => (
                                                        <tr>
                                                            <td > {order.order_id}</td>
                                                            <td > {order.user_id}</td>
                                                            <td > {order.status}   </td>
                                                            <td > {order.orderDate}</td>
                                                            <td> {order.requiredDate}  </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default Dashboard;