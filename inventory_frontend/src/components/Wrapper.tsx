import { Link } from "react-router-dom";

export const Wrapper = (props: any) => {
  return (
    <>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
          {props.title ?? ''}
        </a>

        <div className="navbar-nav">
          <div className="navbar-brand nav-item text-nowrap">
            <Link to={`/`} className="navbar-brand text-nowrap m-4">
              Products
            </Link>
            <Link to={`/orders`} className="navbar-brand text-nowrap m-4">
              Orders
            </Link>
          </div>
        </div>
      </header>

      <div className="container-fluid">
        <div className="mx-auto">
          <nav
            id="sidebarMenu"
            className="flex-shrink-0 col-md-3 col-lg-2 bg-light sidebar collapse"
          >
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Products
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <main className="mx-auto">
            {props.children}
          </main>
        </div>
      </div>
    </>
  );
};
