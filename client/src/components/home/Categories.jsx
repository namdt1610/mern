import {categoriesSection} from './Imports'
import {Link} from 'react-router-dom'

const Categories = () => {
    return (
        <>
            {/* Categories Section*/}
            <div className="categories-section shadow-xl rounded-xl p-4 my-4">
                <div className="section-header ">
                    <h3 className="text-2xl uppercase font-medium">
                        Categories
                    </h3>
                </div>
                <div className="section-body">
                    <div className="grid grid-cols-4 gap-4">
                        {categoriesSection.map((category, index) => (
                            <Link
                                to={category.link}
                                key={index}
                                className="category-card no-underline text-black"
                            >
                                <img
                                    loading="lazy"
                                    className="rounded-xl"
                                    src={category.imageUrl}
                                    alt=""
                                />
                                <div className="category-info flex items-center justify-center">
                                    <h4 className="text-lg font-medium">
                                        {category.title}
                                    </h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Categories
