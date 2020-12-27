import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import './Orders.css'
import { useStateValue } from "./StateProvider";
import ShopDetail from './ShopDetail'
import Axios from 'axios'
import paginationFactory from 'react-bootstrap-table2-paginator'
import BootstrapTable from 'react-bootstrap-table-next'
import LoadData from './LoadData'
import NavShop from './NavShop'
import { Modal, Button, Input, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter'
function OrdersForShop() {
    const [{ basket, shop }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [rowInfo, setRowInfo] = useState();
    const [showModal, SetShowModal] = useState(false);
    let { shop_id } = useParams();
    const [orderDetail, setOrderDetail] = useState(null);
    const [order_id, setOrder_id] = useState();
    const formatButton = (cell, row) => {
        if (row.order_id) {
            return (
                <div>
                    <button className="btn btn-sm btn-success"> Change Status</button>
                </div>
            )
        }
    }
    useEffect(() => {
        async function fetchData() {

            const Order = await Axios({
                method: 'get',
                url: `http://localhost:8000/shop/${shop_id}/order`,
            })
            setOrders(Order.data)
            console.log(Order.data)
        }
        fetchData();
    }, [])
    const columns = [
        { dataField: "order_id", text: "Order ID" },
        {dataField :"name" , text :"Name" },
        { dataField: "comment" ,text :"Address"},
        { dataField: "phone_number",text:"Phone Order"},
        { dataField: "total", text: "Total money " },
        { dataField: "orderDate", text: "Created At" },
        { dataField: "receivedDate", text: "Received Date" },
        { dataField: "shippedDate", text: "Shipped Date" },
        { dataField: "status", text: "Status" ,filter:textFilter() },
    ];
    const rowEvents = {
        onClick: (e, row) => {
            setRowInfo(row);
            setOrder_id(row.order_id)
            toggleTrueFalse();
        },
    };
    const toggleTrueFalse = () => {
        SetShowModal(handleShow);
    };

    const ShopOrderDetail = () => {
        return (
            <Modal isOpen backdrop={false} fade={false} >
                <ModalHeader>
                    Order Detail
                </ModalHeader>
                <ModalBody>
                    <ShopDetail order_id={rowInfo.order_id} shop_id={shop_id} status={rowInfo.status}/>
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    };
    return (

        <div className='orders'>
            <NavShop/>
            <LoadData />
            <h1>Your Orders</h1>
            <BootstrapTable
                keyField="order_id"
                data={orders}
                columns={columns}
                pagination={paginationFactory()}
                rowEvents={rowEvents}
                filter ={filterFactory()}
            />
            {show ? <ShopOrderDetail /> : null}

        </div>
    )
}

export default OrdersForShop
