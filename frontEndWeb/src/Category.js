import React from "react";
import "./Category.css";
import { Link } from "react-router-dom";

function Category() {
	return (
		<div className="Category">
			<h2>CATEGORY</h2>
			<hr/>
			<div className="category_group">
				<Link to="/category/8">
					<div className="category_item">
						<img src="/thucpham.jpg" className="category_image mb-3" alt="hi"/>						
						<div className="mt-3">
							Thực Phẩm
						</div>
					</div>
				</Link>
				<Link to="/category/10">
					<div className="category_item">
						<img src="/vanphongpham.png" className="category_image" alt="hi"/>						
						<div>
							Văn Phòng Phẩm
						</div>
					</div>
				</Link>
				<Link to="/category/7">
					<div className="category_item">
						<img src="/sach.jpg" className="category_image" alt="hi"/>						
						<div>
							Sách
						</div>
					</div>
				</Link>
				<Link to="/category/9">
					<div className="category_item">
						<img src="/tivi.jpg" className="category_image" alt="hi"/>						
						<div>
							Tivi
						</div>
					</div>
				</Link>
				<Link to="/category/4">
					<div className="category_item">
						<img src="/mevabe.jpg" className="category_image" alt="hi"/>						
						<div>
							Mẹ Và Bé
						</div>
					</div>
				</Link>
				<Link to="/category/6">
					<div className="category_item">
						<img src="/nhacuadoisong.jpg" className="category_image" alt="hi"/>						
						<div>
							Nhà Cửa Đời Sống
						</div>
					</div>
				</Link>
				<Link to="/category/5">
					<div className="category_item">
						<img src="/mypham.jpg" className="category_image" alt="hi"/>						
						<div>
							Mỹ phẩm
						</div>
					</div>
				</Link>
				<Link to="/category/1">
					<div className="category_item">
						<img src="/maytinhthietbivanphong.jpg" className="category_image" alt="hi"/>						
						<div>
							Máy Tính - Thiết Bị VP
						</div>
					</div>
				</Link>
				<Link to="/category/2">
					<div className="category_item">
						<img src="/dienlanhdiengiadung.jpg" className="category_image" alt="hi"/>						
						<div>
							Điện Lạnh - Điện Gia Dụng
						</div>
					</div>
				</Link>
				<Link to="/category/3">
					<div className="category_item">
						<img src="/kythuatso.jpg" className="category_image" alt="hi"/>						
						<div>
							Kỹ thuật số
						</div>
					</div>
				</Link>
				
			</div>
		</div>
	);
}

export default Category;
