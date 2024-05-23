// // Controller cho Admin dashboard
// exports.getDashboard = async (req, res) => {
//       try {
//         // Giả định rằng bạn có logic để lấy dữ liệu cần thiết cho dashboard
//         const userCount = await User.countDocuments();
//         const productCount = await Product.countDocuments();
//         const orderCount = await Order.countDocuments();
//         // Thêm các thống kê khác nếu cần
//         res.status(200).json({
//           userCount,
//           productCount,
//           orderCount,
//           // Thêm các thông tin thống kê khác ở đây
//         });
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error retrieving dashboard data' });
//       }
//     };
    