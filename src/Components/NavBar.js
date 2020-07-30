import React, { Component } from 'react';
import { Link} from 'react-router-dom';

import {ButtonContainer} from "./button";
import styled from 'styled-components';

class NavBar extends Component {
  render() {
    return (
     <NavWrapper className="navbar navbar-expand-sm  navbar-dark px-sm-5">
   
     <ul className="navbar-nav align-items-center">
          <li className="nav-item ml-5">
              <Link to = "/" className="nav-link">
                  Sản Phẩm
              </Link>          
          </li>
     </ul>
            {/*search
        <div className="container " >
     <nav className="navbar navbar-light bg-light  ml-5">
        <form className="form-inline ">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </nav>
      </div>
*/}
     <Link to = "/cart" className="ml-auto">
        <ButtonContainer>
        <span className="mr-2">
        <i className="fas fa-cart-plus"/>
        </span>
          Giỏ Hàng     
        </ButtonContainer>
      </Link>   

     </NavWrapper>
    );
  }
}

const NavWrapper = styled.nav`
background : var(--mainBlue);
.nav-link{
  color: var(--mainWhile) !important;
  font-size : 1.3rem;
  text-tranform: capitalize !important;
}

`

export default NavBar;
 