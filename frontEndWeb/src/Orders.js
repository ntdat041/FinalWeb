import React, { useState, useEffect } from 'react';
import { useParams,useHistory} from "react-router-dom";
import './Orders.css'
import { useStateValue } from "./StateProvider";
import UserDetail from './UserDetail'
import Axios from 'axios'
import paginationFactory from 'react-bootstrap-table2-paginator'
import BootstrapTable  from 'react-bootstrap-table-next'
import LoadData from './LoadData'
import{Modal,Button, Input ,ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import filterFactory ,{ textFilter } from 'react-bootstrap-table2-filter';


function Orders() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);
    const [show,setShow] = useState(false);
    const handleClose = () =>setShow(false);
    const handleShow  = () =>setShow(true);
    const [rowInfo,setRowInfo] =useState();
    
    const [showModal,SetShowModal] =useState(false);
    let { user_id } = useParams();
    const[orderDetail,setOrderDetail] =useState(null);
    const[order_id,setOrder_id] =useState(); 
    useEffect(() =>{
        async function fetchData() {
           
            const Order = await Axios({
                method: 'get',
                url:`http://localhost:8000/user/${user_id}/purchase`,
            })
            
            setOrders(Order.data)    
        }
        fetchData();
    },[])
    const columns =[
        {dataField :"order_id" ,     text :"Order ID" },
        {dataField :"name"    ,text:"Shop Name", filter : textFilter()},
        {dataField :"status" ,       text :"Status" },
        {dataField :"total" ,        text :"Total Money " } , 
        {dataField :"orderDate" ,    text :"Order Date" },
        {dataField :"receivedDate" , text :"Received Date" },
        {dataField :"shippedDate"  , text :"Shipped Date" },
        
     
        
    ];
    const rowEvents = {
        onClick : (e,row) =>{
        setRowInfo(row) ;
        setOrder_id(row.order_id)
        toggleTrueFalse();
        
    },
    };
    const toggleTrueFalse = () =>{
        SetShowModal(handleShow);
    };
    
    const UserOrderDetail =() =>{
        return(
            <Modal isOpen backdrop={false} fade={false} >
                <ModalHeader>
                Order Details
                </ModalHeader>
                <ModalBody>
                    <UserDetail order_id={rowInfo.order_id} user_id={user_id} status={rowInfo.status}/>
                </ModalBody>
                <ModalFooter>
                    <Button variant ="secondary" onClick = {handleClose}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal> 
        );
    };
    return (
        
        <div className='orders'>
            <LoadData/>
            <h1>Your Orders</h1>
            <BootstrapTable
            keyField ="order_id"
            data ={orders}
            columns ={columns}
            pagination ={paginationFactory()}
            rowEvents = {rowEvents}
            filter ={filterFactory()}
            />
            {show? <UserOrderDetail  /> :null}
            
        </div>
    )
}

export default Orders
