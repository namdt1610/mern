// middlewares/isAuthenticated.ts
import jwt from 'jsonwebtoken'

const isAuthenticated = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    try {
        const decoded = await jwt.verify(token, 'dangtrannam')
        req.user = decoded

        // if (req.user.role !== 'admin') {
        //     return res.status(403).json({ message: 'Forbidden' })
        // }

        next()
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}

export default isAuthenticated
