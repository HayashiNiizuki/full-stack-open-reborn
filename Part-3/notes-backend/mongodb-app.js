require('dotenv').config();
const mongoose = require('mongoose');

// 从 .env 文件加载 MongoDB URI
const uri = process.env.MONGO_URI;

// 连接到 MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
    console.log('Connected to MongoDB');

    // 定义一个 Schema
    const noteSchema = new mongoose.Schema({
        content: String,
        important: Boolean,
    })

    // 创建一个 Model
    const Note = mongoose.model('Note', noteSchema)

    // 插入一条文档
    /*
    try {
        const note = new Note({
            content: 'HTML is easy',
            important: true,
        })

        const savedNote = await note.save();
        console.log(`Document inserted with _id: ${savedNote._id}`);
    } catch (err) {
        console.log(err)
    } finally {
        mongoose.connection.close()
    }
    */

    // 查看数据
    /**/
    Note.find({}).then(result => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })
    /**/
});
