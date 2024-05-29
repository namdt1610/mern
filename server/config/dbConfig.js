const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');

// Load biến môi trường từ file .env
dotenv.config();

const uri = process.env.MONGO_URI;

// Tạo một MongoClient với các tùy chọn để đặt phiên bản API ổn định
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const connectDB = async () => {
  try {
    // Kết nối client đến server
    await client.connect();
    // Gửi lệnh ping để xác nhận kết nối thành công
    await client.db("sample_mflix").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  } finally {
    // Đảm bảo rằng client sẽ đóng khi bạn hoàn thành/lỗi
    await client.close();
  }
};

module.exports = connectDB;
