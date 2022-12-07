import Nav from "react-bootstrap/Nav";
import "../css/footer.css";
import { Link } from "react-router-dom";
import twitter from "../img/twitter.png";
import instagram from "../img/instagram.png";
import facebook from "../img/facebook.png";

function Footer() {
  return (
    <section className='footer-style'>
      <h3>Follow Us:</h3>
      <img src={instagram} alt='instagram icon'></img>
      <img src={twitter} alt='twitter icon'></img>
      <img src={facebook} alt='facebook icon'></img>

      <Nav defaultActiveKey='/home' as='ul' className='mt-auto'>
        <Nav.Item as='li'>
          <Nav.Link className='link-light m-2'>Sports</Nav.Link>
        </Nav.Item>
        <Nav.Item as='li'>
          <Nav.Link className='link-light m-2'>Cooking</Nav.Link>
        </Nav.Item>
        <Nav.Item as='li'>
          <Nav.Link className='link-light m-2'>Tech</Nav.Link>
        </Nav.Item>
        <Nav.Item as='li'>
          <Link className='link-light m-2' to={`/articles`}>
            Articles
          </Link>
        </Nav.Item>
      </Nav>
    </section>
  );
}

export default Footer;
