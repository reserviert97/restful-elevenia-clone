const cloudinary = require('cloudinary').v2;

exports.config = () => {
  cloudinary.config({
    cloud_name: 'elevania789',
    api_key: '121298662299568',
    api_secret: 'rbCJKjZ6rUAGMM6OttHgCgTpirY'
  });

}

exports.uploader = cloudinary.uploader;