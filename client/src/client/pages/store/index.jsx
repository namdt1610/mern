function Store() {
    return (
        <div className="gap-2 m-6">
            <div className="flex my-2">
                <h1 className="text-2xl font-semibold m-2">Filter</h1>
                <select className="m-2 p-2 rounded-lg shadow-lg bg-gray-100">
                    <option value="all">All</option>
                    <option value="popular">Popular</option>
                    <option value="decrease">Decreasing Price</option>
                    <option value="increase">Increasing Price</option>
                </select>
            </div>
            <div className="flex overflow-x-auto my-4">
                {Array.from(Array(15)).map((_, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 m-2 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                    >
                        <img
                            src={`https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTNoD9oT_VnEYNKKeOor8U4qK5T1LF4bC2iRDD75fQdveQMHTUA`}
                            alt="Brand 1"
                            className="w-24 rounded-lg shadow-lg my-3"
                        />
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
                {Array.from(Array(16)).map((_, index) => (
                    <div
                        key={index}
                        className="p-2 rounded-lg shadow-lg bg-gray-100 min-h-48 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                    >
                        <div className="h-48 bg-gray-200 mb-2 rounded-lg shadow-lg">
                            {/* Phần hình ảnh */}
                            <img
                                src={`https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/2fb6ff59-aca1-4f1f-a836-0888d4f119a6/v2k-run-shoes-zJV8TV.png`}
                                alt={`Product ${index + 1}`}
                                className="object-cover w-full h-full rounded-lg"
                            />
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            {/* Phần thông tin giày */}
                            <h3 className="text-lg font-semibold mb-2">
                                Product {index + 1}
                            </h3>
                            <p className="text-gray-600">
                                Thông tin về giày...
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Store
