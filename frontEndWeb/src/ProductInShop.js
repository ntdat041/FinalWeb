import React from "react";
import { Link,useParams,useHistory } from "react-router-dom";
import "./ProductInShop.css";
import { useStateValue } from "./StateProvider";
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import CurrencyFormat from "react-currency-format";
import axios from "axios";

function ProductInShop({ product_id, product_name, product_image, product_price, quantityInStock , nosale, createdAt }) {
    const backEndServe = 'http://localhost:8000/';

    return (
        <tr className="productInShop">
            <th scope="row"><img src={backEndServe + product_image} alt="image" className="productInShop_img"/></th>
            <td class="tm-product-name">{product_name}</td>
            <td class="price"><CurrencyFormat
                    renderText={(value) => (
                    <strong>{value}</strong>
                    )}
                    decimalScale={2}
                    value={product_price}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" đ"}
            /></td>
            <td class="sold-quantity">{nosale}</td>
            <td class="stock-quantity">{quantityInStock}</td>
            <td class="date">{createdAt}</td>
            <td>
            &nbsp;
            </td>
            <td> 
                <Link to={`/editProduct/${product_id}`}>
                    <EditSharpIcon />
                </Link>
            </td>
        </tr>
    )
}

export default ProductInShop;