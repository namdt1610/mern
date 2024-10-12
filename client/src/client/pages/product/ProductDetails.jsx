import { Link } from 'react-router-dom'
import s from './ProductDetails.module.scss'
import Loading from '../../../components/loading'

export default function ProductDetails({ p }) {
    // console.log(p)
    return !p ? (
        <div className={s.loadingContainer}>
            <Loading />
        </div>
    ) : (
        <div className={s.container}>
            <div className={s.imageGrid}>
                {[...Array(10)].map((_, i) => (
                    <Link key={i}>
                        <img
                            src="https://via.placeholder.com/400"
                            alt="product"
                            className="rounded-md"
                        />
                    </Link>
                ))}
            </div>
            <div className="price-container m-6 ">
                <div className="product-category">{p.category}</div>
                <p className="product-name text-4xl">{p.name}</p>
                <span className="sales">{p.price}</span>
                <div className="rating">
                    <div className="start">
                        <span>⭐️</span>
                        <span>⭐️</span>
                        <span>⭐️</span>
                        <span>⭐️</span>
                        <span>⭐️</span>
                    </div>
                    <div className="avg-rating">
                        <span>4.5</span>
                    </div>
                    <div className="reviews">
                        <span>(100 reviews)</span>
                    </div>
                </div>
                <div className="color-seletor my-6">
                    <div className="flex justify-between">
                        <div className="color-name ">
                            <span>Color</span>
                        </div>
                        <div className="color">
                            <span>Black</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-1">
                        {[...Array(10)].map((_, i) => (
                            <Link key={i}>
                                <img
                                    key={i}
                                    src="https://via.placeholder.com/200"
                                    alt="product"
                                    className="rounded-md"
                                />
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="size-selector my-6">
                    <div className="size-selector-header flex justify-between">
                        <div className="size-name">
                            <span>Size</span>
                        </div>
                        <div className="size-guide">
                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                            <button
                                className="btn btn-neutral"
                                onClick={() =>
                                    document
                                        .getElementById('my_modal_2')
                                        .showModal()
                                }
                            >
                                Size Guide
                            </button>
                            <dialog id="my_modal_2" className="modal">
                                <div className="modal-box">
                                    <div className="modal-header pb-6">
                                        <h1 className="text-2xl">
                                            Men's Shoes Size &amp; Fit Chart
                                        </h1>
                                    </div>
                                    <div className="modal-body">
                                        <table className="table table-zebra">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <b>US Men</b>
                                                    </td>
                                                    <td>
                                                        <b>US Women</b>
                                                    </td>
                                                    <td>
                                                        <b>UK</b>
                                                    </td>
                                                    <td>
                                                        <b>EU</b>
                                                    </td>
                                                    <td>
                                                        <b>Length (cm)</b>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>1</b>
                                                    </td>
                                                    <td>-</td>
                                                    <td>.5</td>
                                                    <td>32.5</td>
                                                    <td>19</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>1.5</b>
                                                    </td>
                                                    <td>3</td>
                                                    <td>1</td>
                                                    <td>33</td>
                                                    <td>19.5</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>2</b>
                                                    </td>
                                                    <td>3.5</td>
                                                    <td>1.5</td>
                                                    <td>33.5</td>
                                                    <td>20</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>2.5</b>
                                                    </td>
                                                    <td>4</td>
                                                    <td>2</td>
                                                    <td>34.5</td>
                                                    <td>20.5</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>3</b>
                                                    </td>
                                                    <td>4.5</td>
                                                    <td>2.5</td>
                                                    <td>35</td>
                                                    <td>21</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>3.5</b>
                                                    </td>
                                                    <td>5</td>
                                                    <td>3</td>
                                                    <td>35.5</td>
                                                    <td>21.5</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>4</b>
                                                    </td>
                                                    <td>5.5</td>
                                                    <td>3.5</td>
                                                    <td>36</td>
                                                    <td>22</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>4.5</b>
                                                    </td>
                                                    <td>6</td>
                                                    <td>4</td>
                                                    <td>37</td>
                                                    <td>22.5</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>5</b>
                                                    </td>
                                                    <td>6.5</td>
                                                    <td>4.5</td>
                                                    <td>37.5</td>
                                                    <td>23</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>5.5</b>
                                                    </td>
                                                    <td>7</td>
                                                    <td>5</td>
                                                    <td>38</td>
                                                    <td>23.5</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>6</b>
                                                    </td>
                                                    <td>7.5</td>
                                                    <td>5.5</td>
                                                    <td>38.5</td>
                                                    <td>24</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>6.5</b>
                                                    </td>
                                                    <td>8</td>
                                                    <td>6</td>
                                                    <td>39.5</td>
                                                    <td>24.5</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>7</b>
                                                    </td>
                                                    <td>8.5</td>
                                                    <td>6.5</td>
                                                    <td>40</td>
                                                    <td>25</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>7.5</b>
                                                    </td>
                                                    <td>9</td>
                                                    <td>7</td>
                                                    <td>40.5</td>
                                                    <td>25.5</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>8</b>
                                                    </td>
                                                    <td>9.5</td>
                                                    <td>7.5</td>
                                                    <td>41.5</td>
                                                    <td>26</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>8.5</b>
                                                    </td>
                                                    <td>10</td>
                                                    <td>8</td>
                                                    <td>42</td>
                                                    <td>26.5</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>9</b>
                                                    </td>
                                                    <td>10.5</td>
                                                    <td>8.5</td>
                                                    <td>42.5</td>
                                                    <td>27</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>9.5</b>
                                                    </td>
                                                    <td>11</td>
                                                    <td>9</td>
                                                    <td>43</td>
                                                    <td>27.5</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>10</b>
                                                    </td>
                                                    <td>11.5</td>
                                                    <td>9.5</td>
                                                    <td>44</td>
                                                    <td>28</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>10.5</b>
                                                    </td>
                                                    <td>12</td>
                                                    <td>10</td>
                                                    <td>44.5</td>
                                                    <td>28.5</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>11</b>
                                                    </td>
                                                    <td>12.5</td>
                                                    <td>10.5</td>
                                                    <td>45</td>
                                                    <td>29</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>11.5</b>
                                                    </td>
                                                    <td>13</td>
                                                    <td>11</td>
                                                    <td>45.5</td>
                                                    <td>29.5</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>12</b>
                                                    </td>
                                                    <td>13.5</td>
                                                    <td>11.5</td>
                                                    <td>46.5</td>
                                                    <td>30</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>12.5</b>
                                                    </td>
                                                    <td>14</td>
                                                    <td>12</td>
                                                    <td>47</td>
                                                    <td>30.5</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>13</b>
                                                    </td>
                                                    <td>14.5</td>
                                                    <td>12.5</td>
                                                    <td>47.5</td>
                                                    <td>31</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>14</b>
                                                    </td>
                                                    <td>-</td>
                                                    <td>13.5</td>
                                                    <td>49</td>
                                                    <td>32</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>15</b>
                                                    </td>
                                                    <td>-</td>
                                                    <td>14.5</td>
                                                    <td>50</td>
                                                    <td>33</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>16</b>
                                                    </td>
                                                    <td>-</td>
                                                    <td>15.5</td>
                                                    <td>51</td>
                                                    <td>34</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>17</b>
                                                    </td>
                                                    <td>-</td>
                                                    <td>16.5</td>
                                                    <td>52</td>
                                                    <td>35</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>18</b>
                                                    </td>
                                                    <td>-</td>
                                                    <td>17.5</td>
                                                    <td>53</td>
                                                    <td>36</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>19</b>
                                                    </td>
                                                    <td>-</td>
                                                    <td>18.5</td>
                                                    <td>54</td>
                                                    <td>37</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>20</b>
                                                    </td>
                                                    <td>-</td>
                                                    <td>19.5</td>
                                                    <td>55</td>
                                                    <td>38</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <form
                                    method="dialog"
                                    className="modal-backdrop"
                                >
                                    <button>close</button>
                                </form>
                            </dialog>
                        </div>
                    </div>
                    <div className="size-selector-body grid grid-cols-4 gap-1">
                        {[...Array(16)].map((_, i) => (
                            <Link key={i} className="">
                                <img
                                    src="https://via.placeholder.com/200"
                                    alt="product"
                                />
                            </Link>
                        ))}
                    </div>
                    <div className="my-4">
                        <Link to="">Most people go down for 0.5 US Sizes</Link>
                    </div>

                    <div className="my-4">
                        <button className="btn btn-neutral btn-block my-2">
                            Add to Cart
                        </button>
                        <button className="btn btn-block btn-outline btn-secondary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                            Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>
            <div className="recommened col-span-2 py-8">
                <p className="text-2xl py-2">You may also like</p>
                <div className="carousel carousel-center rounded-box">
                    {[...Array(10)].map((_, i) => (
                        <div className="carousel-item mr-4">
                            <Link key={i}>
                                <img
                                    src="https://via.placeholder.com/200"
                                    alt="product"
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className="reviews col-span-2">
                <p className="text-2xl py-2">Reviews (4.5/5)</p>
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="review my-4">
                        <div className="reviewer flex items-center">
                            <div className="reviewer-image">
                                <img
                                    src="https://via.placeholder.com/200"
                                    alt="reviewer"
                                    className="rounded-full w-12 h-12"
                                />
                            </div>
                            <div className="reviewer-name ml-2">
                                <span className="text-2xl">John Doe</span>
                            </div>
                        </div>
                        <div className="review-body">
                            <div className="rating flex">
                                {[...Array(5)].map((_, index) => (
                                    <span key={index}>⭐️</span>
                                ))}
                            </div>
                            <div className="review-text">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Sed sit amet accumsan arcu.
                                    Curabitur vel elit at nunc sodales
                                    tincidunt. Nulla facilisi.
                                </p>
                            </div>
                            <div className="review-images">
                                <div className="flex flex-row">
                                    {[...Array(4)].map((_, i) => (
                                        <Link key={i} className="mx-1">
                                            <img
                                                src="https://via.placeholder.com/200"
                                                alt="product"
                                                className="rounded-md"
                                            />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
