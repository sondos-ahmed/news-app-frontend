import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <section>
      <p className='display-1 text-danger'>404</p>
      <p>page not found</p>
      <Link to='/'>Home Page</Link>
    </section>
  );
}

export default PageNotFound;
