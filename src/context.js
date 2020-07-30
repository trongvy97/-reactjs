import React, { Component } from 'react';
import {storeProducts, detailProduct} from './data';
  const ProductContext = React.createContext();
//Provider
//Consumer
class ProductProvider extends Component {
  
  state ={
    products : [],
    detailProduct: detailProduct,
    cart :[],    
    modalOpen : false,  //?4:01
    modalProduct :  detailProduct,
    cartSubTotal: 0,
    cartTax : 0,
    cartTotal: 0
  }
  componentDidMount(){ // dùng để gọi api sử lí dữ liệu,update
    this.setProducts();
  }
  setProducts = () =>{
    let tempProducts = [];
    storeProducts.forEach(item =>{
      const singleItem = {...item};
      tempProducts = [...tempProducts,singleItem];
    })
    this.setState(()=>{
      return {products:tempProducts}
    })
  }

  getItem = id =>{
    const product = this.state.products.find(item => item.id === id);
    //Hàm find sẽ trả về giá trị của phần tử đầu tiên trong mảng thỏa mãn được điều kiện kiểm tra
    return product;
  }

  handleDetail = id =>{
    const product = this.getItem(id);
    this.setState(() => {
      return {detailProduct:product}
    })
  }

  addToCart = id =>{
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id)) //Hàm indexOf sẽ tìm kiếm một phần tử trong mảng dựa vào giá trị của phần tử,
                                                  // hàm sẽ trả về vị trị( khóa) của phần tử nếu tìm thấy và trả về -1 nếu không tìm thấy.
    const product = tempProducts[index];
    product.inCart = true;                    // ban đâu incart(sản phẩm trong giỏ hàng) bằng false,khi click vào chuyển thành true
    product.count = 1;                           // gán số lương sản phẩm =1
    const price = product.price;                          // cập nhật giá sản phẩm khi được thên vào
    product.total = price;                      //tổng giá sp
    // sau khi thực hiện cập nhật lại state
    this.setState( () => {
      return {product: tempProducts, cart : [...this.state.cart, product]};
    }, () => {
      this.addTotals(); //tổng giá trị sp
    })
  };

openModal = id => {
  const product = this.getItem(id);
  this.setState( () => {
    return {modalProduct : product, modalOpen: true}
  })
}
closeModal = () => {
  this.setState( () => {
    return {modalOpen :false}
  })
}

increment = (id) => {
  let tempCart = [...this.state.cart];

  const selectProduct = tempCart.find(item => item.id === id)
  const index = tempCart.indexOf(selectProduct);
  const product = tempCart[index];

  product.count = product.count +1;
  product.total = product.count * product.price;
  
  this.setState( 
    () => {
      return {cart: [...tempCart]};
    }, 
    ()=> {this.addTotals();
    }    
  );
};

decrement = (id) => {
  let tempCart = [...this.state.cart];

  const selectProduct = tempCart.find(item => item.id === id)
  const index = tempCart.indexOf(selectProduct);
  const product = tempCart[index];

  product.count = product.count -1;
  if(product.count === 0) {
    this.removeItem(id)
  }
  else {
    product.total = product.count * product.price;
    this.setState( 
      () => {
        return {cart: [...tempCart]};
      }, 
      ()=> {this.addTotals();
      }    
    );
  }
}

removeItem = id => {
  let tempProducts = [...this.state.products];
  let tempCart = [...this.state.cart];
  tempCart = tempCart.filter(item => item.id !== id);
  const index = tempProducts.indexOf(this.getItem(id));
  let removeProduct = tempProducts[index]
  removeProduct.inCart = false;
  removeProduct.count = 0;
  removeProduct.total = 0;
  this.setState(() => {
    return {
      cart: [...tempCart],
      product: [...tempProducts]
    }
  },
    () => {
      this.addTotals()
    }
  )
}

clearCart = () => {
  this.setState(() => {
    return {cart: []}
  }, () => {
    this.setProducts();
    this.addTotals();
  })
}

addTotals = () => {
  let subTotal = 0;
  this.state.cart.map(item => (subTotal += item.total));
  const tempTax = subTotal * 0.1;
  const tax = parseFloat(tempTax.toFixed(2));
  const total = subTotal + tax
  this.setState(() =>{
    return {
      cartSubTotal : subTotal,
      cartTax : tax,
      cartTotal : total
    }
  })
}
  render() {
    return (
      <ProductContext.Provider
       value={{...this.state,
      handleDetail:this.handleDetail,
      addToCart:this.addToCart,
      openModal: this.openModal,
      closeModal: this.closeModal,
      increment: this.increment,
      decrement: this.decrement,
      removeItem: this.removeItem,
      clearCart: this.clearCart
      }}>
    
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;


export {ProductProvider,ProductConsumer};
