import React from 'react';
import {Breadcrumb} from 'react-bootstrap';
import {Link, useLocation} from 'react-router-dom';

function BreadcrumbExample() {
  const location = useLocation();

  // Tách đường dẫn hiện tại thành mảng
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <Breadcrumb>  
      {/* Breadcrumb "Home" luôn xuất hiện */}
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Home</Breadcrumb.Item>

      {/* Render các Breadcrumb còn lại dựa trên đường dẫn */}
      {pathnames.map((name, index) => {
        // Tạo URL cho các breadcrumb
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          // Breadcrumb cuối cùng là "active"
          <Breadcrumb.Item active key={name}>{name}</Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: routeTo }} key={name}>
            {name}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}

export default BreadcrumbExample;
