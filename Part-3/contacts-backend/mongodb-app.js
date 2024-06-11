require('dotenv').config();
const mongoose = require('mongoose');

// 从 .env 文件加载 MongoDB URI
const uri = process.env.MONGO_URI;

// 连接到 MongoDB
mongoose.connect(uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');

  // 定义一个 Schema
  const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

  // 创建一个 Model
  const Contact = mongoose.model('Contact', contactSchema)

  // 插入一条文档
  /*
  try {
      const contact = new Contact({
          name: 'Arto Hellas',
          number: "040-123456",
      })

      const savedContact = await contact.save();
      console.log(`Document inserted with _id: ${savedContact._id}`);
  } catch (err) {
      console.log(err)
  } finally {
      mongoose.connection.close()
  }
  */

  // 查看数据
  /*
  */
  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(contact)
    })
    mongoose.connection.close()
  })
});
