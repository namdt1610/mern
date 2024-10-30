import React from 'react'

export default function Sidebar() {
    return (
        <>
            <div className="col-sm-12 col-lg-3 account-menu-wrapper">
                <nav aria-label="Account Menu">
                    <ul className="w-100 account-menu">
                        <li
                            className="menu-item col-lg-8 col-sm-auto orders"
                            aria-current="page"
                        >
                            <a href="/orders/">
                                <div className="d-flex" data-cs-mask="">
                                    <svg
                                        role="img"
                                        className="icon svg-icon "
                                        width={24}
                                        height={24}
                                    >
                                        <title>icon</title>
                                        <desc>icon</desc>
                                        <use xlinkHref="#account-orders-box" />
                                    </svg>
                                    <p className="name">Orders</p>
                                </div>
                            </a>
                        </li>
                        <li className="menu-item col-lg-8 col-sm-auto profile">
                            <a href="/on/demandware.store/Sites-NBUS-Site/en_US/Account-Profile">
                                <div className="d-flex" data-cs-mask="">
                                    <svg
                                        role="img"
                                        className="icon svg-icon "
                                        width={24}
                                        height={24}
                                    >
                                        <title>icon</title>
                                        <desc>icon</desc>
                                        <use xlinkHref="#account-icon" />
                                    </svg>
                                    <p className="name">Personal details</p>
                                </div>
                            </a>
                        </li>
                        <li className="menu-item col-lg-8 col-sm-auto wallet">
                            <a href="/wallet/">
                                <div className="d-flex" data-cs-mask="">
                                    <svg
                                        role="img"
                                        className="icon svg-icon "
                                        width={24}
                                        height={24}
                                    >
                                        <title>icon</title>
                                        <desc>icon</desc>
                                        <use xlinkHref="#credit-card" />
                                    </svg>
                                    <p className="name">Payments</p>
                                </div>
                            </a>
                        </li>
                        <li className="menu-item col-lg-8 col-sm-auto addressbook">
                            <a href="/address-book/">
                                <div className="d-flex" data-cs-mask="">
                                    <svg
                                        role="img"
                                        className="icon svg-icon "
                                        width={24}
                                        height={24}
                                    >
                                        <title>icon</title>
                                        <desc>icon</desc>
                                        <use xlinkHref="#addresses-icon" />
                                    </svg>
                                    <p className="name">Addresses</p>
                                </div>
                            </a>
                        </li>
                        <li className="menu-item col-lg-8 col-sm-auto footscan">
                            <a href="/on/demandware.store/Sites-NBUS-Site/en_US/Volumental-ViewScan">
                                <div className="d-flex" data-cs-mask="">
                                    <svg
                                        role="img"
                                        className="icon svg-icon "
                                        width={24}
                                        height={24}
                                    >
                                        <title>icon</title>
                                        <desc>icon</desc>
                                        <use xlinkHref="#3d-cube-sphere" />
                                    </svg>
                                    <p className="name">3D foot scan</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="w-100 only-desktop mb-8">
                    <a
                        href="/on/demandware.store/Sites-NBUS-Site/en_US/Login-Logout"
                        className="logout-link"
                    >
                        Log out
                    </a>
                </div>
            </div>
        </>
    )
}
