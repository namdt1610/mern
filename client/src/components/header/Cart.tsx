import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBasket } from 'lucide-react'

export default function Cart() {
    return (
        <Link to={'/cart'} className="mx-2">
            <ShoppingBasket size={48} />
        </Link>
    )
}
