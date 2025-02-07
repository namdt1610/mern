import React from 'react'
import { motion } from 'framer-motion'

const QuickCategories = () => {
    return (
        <motion.div
            className="flex gap-4 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
        >
            {['Fiction', 'Business', 'Self-Help', 'Science'].map((category) => (
                <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all text-gray-600 hover:text-gray-900 border border-gray-200"
                >
                    {category}
                </motion.button>
            ))}
        </motion.div>
    )
}

export default QuickCategories
