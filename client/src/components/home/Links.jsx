import {Link} from 'react-router-dom'
import {linkSections} from './Imports'

const Links = () => {
    return (
        <div className="container mx-auto my-5">
            <div className="grid grid-cols-2 grid-rows-2 gap-5 px-52">
                {linkSections.map((section) => {
                    return (
                        <div className="transform transition-transform duration-300 hover:scale-110 cursor-pointer">
                            <Link
                                to={section.link}
                                key={section.index}
                                className="no-underline text-black link-section flex flex-col items-center justify-center"
                            >
                                <img
                                    className="rounded-xl object-cover w-full h-full"
                                    src={section.imageUrl}
                                    alt={section.title}
                                />
                                <h1 className="text-2xl font-medium">
                                    {section.title}
                                </h1>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Links
