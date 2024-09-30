"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var react_router_dom_1 = require("react-router-dom");
function BreadcrumbExample() {
    var location = (0, react_router_dom_1.useLocation)();
    // Tách đường dẫn hiện tại thành mảng
    var pathnames = location.pathname.split('/').filter(function (x) { return x; });
    return (react_1.default.createElement(react_bootstrap_1.Breadcrumb, null,
        react_1.default.createElement(react_bootstrap_1.Breadcrumb.Item, { linkAs: react_router_dom_1.Link, linkProps: { to: '/' } }, "Home"),
        pathnames.map(function (name, index) {
            // Tạo URL cho các breadcrumb
            var routeTo = "/".concat(pathnames.slice(0, index + 1).join('/'));
            var isLast = index === pathnames.length - 1;
            return isLast ? (
            // Breadcrumb cuối cùng là "active"
            react_1.default.createElement(react_bootstrap_1.Breadcrumb.Item, { active: true, key: name }, name)) : (react_1.default.createElement(react_bootstrap_1.Breadcrumb.Item, { linkAs: react_router_dom_1.Link, linkProps: { to: routeTo }, key: name }, name));
        })));
}
exports.default = BreadcrumbExample;
