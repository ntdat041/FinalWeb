var multer = require('multer');

exports.uploadFile = function(req,res,next) {
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, 'public/images/avatars')
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname )
      }
    });
    var upload = multer({ storage: storage }).single('avatar');
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        };
        return next();
    });
}

exports.uploadProduct = function(req,res,next) {
    let name;
    switch (req.headers.category_id){
		case '1':
			name = "Máy tính - Thiết bị VP";
			break;
		case '2':
			name = "Điện lạnh - Điện gia dụng";
			break;
		case '3':
			name = "Kỹ thuật số";
			break;
		case '4':
			name = "Mẹ và bé";
			break;
		case '5':
			name = "Mỹ phẩm";
			break;
		case '6':
			name = "Nhà cửa đời sống";
			break;
		case '7':
			name = "Sách";
			break;
		case '8':
			name = "Thực phẩm";
			break;
		case '9':
			name = "Tivi";
			break;
		case '10':
			name = "Văn phòng phẩm"
			break;
    };
    res.locals.name = name;
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, `public/Image Product/${name}`);
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname );
      }
    });
    var upload = multer({ storage: storage }).single('product_image');
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        };
        console.log(req);
        return next();
    });
}