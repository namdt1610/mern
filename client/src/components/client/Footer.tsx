import React from 'react'
import { Button, Input, Divider } from 'antd'
import { motion } from 'framer-motion'
import {
    FacebookOutlined,
    TwitterOutlined,
    InstagramOutlined,
    LinkedinOutlined,
    SendOutlined,
    PhoneOutlined,
    MailOutlined,
    EnvironmentOutlined,
} from '@ant-design/icons'

export default function Footer() {
    const footerSections = [
        {
            title: 'About Us',
            links: [
                { label: 'Our Story', href: '/about' },
                { label: 'Team', href: '/team' },
                { label: 'Careers', href: '/careers' },
                { label: 'Press', href: '/press' },
            ],
        },
        {
            title: 'Support',
            links: [
                { label: 'Help Center', href: '/help' },
                { label: 'Safety Center', href: '/safety' },
                { label: 'Community Guidelines', href: '/guidelines' },
                { label: 'Contact Us', href: '/contact' },
            ],
        },
        {
            title: 'Legal',
            links: [
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Cookie Policy', href: '/cookies' },
                { label: 'Accessibility', href: '/accessibility' },
            ],
        },
    ]

    const socialLinks = [
        { icon: <FacebookOutlined />, href: 'https://facebook.com' },
        { icon: <TwitterOutlined />, href: 'https://twitter.com' },
        { icon: <InstagramOutlined />, href: 'https://instagram.com' },
        { icon: <LinkedinOutlined />, href: 'https://linkedin.com' },
    ]

    return (
        <footer className="bg-gray-50">
            {/* Newsletter Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h3
                        className="text-2xl font-bold text-gray-800 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Subscribe to Our Newsletter
                    </motion.h3>
                    <motion.p
                        className="text-gray-600 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Stay updated with our latest releases and author
                        interviews
                    </motion.p>
                    <motion.div
                        className="flex gap-2 max-w-md mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Input
                            placeholder="Enter your email"
                            size="large"
                            className="rounded-l-full"
                        />
                        <Button
                            type="primary"
                            size="large"
                            icon={<SendOutlined />}
                            className="rounded-r-full"
                        >
                            Subscribe
                        </Button>
                    </motion.div>
                </div>
            </div>

            <Divider className="my-0" />

            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <img
                            src="/img/DTN.webp"
                            alt="logo"
                            className="h-8 w-auto"
                        />
                        <p className="text-gray-600">
                            Your trusted source for books, ebooks, and
                            audiobooks.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-600">
                                <PhoneOutlined /> <span>+1 234 567 890</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <MailOutlined />{' '}
                                <span>contact@example.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <EnvironmentOutlined />{' '}
                                <span>123 Book Street, Reading City</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Footer Sections */}
                    {footerSections.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                {section.title}
                            </h4>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="text-gray-600 hover:text-blue-600 transition-colors"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-600 text-sm">
                            © 2024 Your Company. All rights reserved.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((link, index) => (
                                <motion.a
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-blue-600 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {link.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
