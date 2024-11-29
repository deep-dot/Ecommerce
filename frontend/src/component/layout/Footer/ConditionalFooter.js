import Footer from './Footer';
import { useLocation } from 'react-router-dom';
const ConditionalFooter = () => {
    const location = useLocation();
    const hideFooterOn = [ "/login", "/account","/me/update", "/process/payment", "/shipping", "/order/confirm"];
 // console.log('location.pathname in conditional footer==',hideFooterOn);

    if (hideFooterOn.includes(location.pathname)) {
      return null;
    }

    return <Footer />; 
  };
  export default ConditionalFooter;