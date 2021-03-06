import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import https from 'https';
import dbconnect from './data/dbconnect.js';
import uploadFiles from './data/uploadFiles';
import router from './routes/route.js';
import connectDatabase from './utils/testConnection.js';
import stripeHandler from './data/stripe.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);

router.use((request, response, next) => {
  console.log(`${ request.method } ${ request.url }`);
  next();
});

router.route('/products').get((request, response) => {
  dbconnect
    .GetDatas()
    .then((result) => {
      response.send(result);
    })
    .catch((err) => {
      console.log(err);
      response.status(500).send(err);
    });
});

router.route('/products/:id').get((request, response) => {
  dbconnect
    .GetData(request.params.id)
    .then((result) => {
      if (result.length) {
        return response.status(200).send(result);
      } else {
        return response.status(404).send('Không tìm thấy liệu');
      }
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).send(err);
    });
});

router.route('/products').post(
  uploadFiles.fields([
    {
      name: 'images',
      maxCount: 10,
    },
  ]),
  async (request, response) => {
    const tourInfo = JSON.parse(request.body.tourInfo);
    try {
      const newTourRecord = await dbconnect.addTour(tourInfo);
      const [newTour] = newTourRecord;
      const imageRecord = await dbconnect.uploadTourImages(request.files.images, newTour.MA_TOUR);
      return response.status(201).send({ newTourRecord, imageRecord });
    } catch (error) {
      console.log(error);
      return response.status(500).send(error);
    }
  },
);

router.route('/products/:id').put((request, response) => {
  const tourId = request.params.id;
  const tourPayload = request.body;
  if (!tourId || !tourPayload) {
    return response.status(400).send(new Error('Vui lòng nhập thông tin tour để chỉnh sửa'));
  }
  dbconnect
    .updateTour(tourId, tourPayload)
    .then((result) => {
      response.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      response.status(500).send(err);
    });
});

router.route('/products/:id').delete((req, res) => {
  let eventid = req.params.id;
  dbconnect.deleteTour(eventid).then((result) => {
    res.status(204).send(result);
  });
});

//Route loai tour
router.route('/loaitour').get((request, response) => {
  dbconnect.Getloaitour().then((result) => {
    response.send(result[0]);
  });
});

router.route('/loaitour').post((request, response) => {
  let listve = { ...request.body };

  dbconnect
    .addloaitour(listve)
    .then((result) => {
      response.status(201).send(result);
    })
    .catch((err) => {
      console.log('Add failed', err);
    });
});

//Route đơn đặt vé
router.route('/dondatve').get((request, response) => {
  dbconnect
    .GetDonDatVe()
    .then((result) => {
      response.send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.route('/dondatve').post((request, response) => {
  let listve = { ...request.body };

  dbconnect
    .addDonDatVe(listve)
    .then((result) => {
      response.status(206).send(result);
    })
    .catch((err) => {
      console.log(err);
      response.status(500).send(err);
    });
});

router
  .route('/dondatve/:id')
  .delete((req, res) => {
    let eventid = req.params.id;
    dbconnect
      .declineDonDatVe(eventid)
      .then((result) => {
        res.status(204).send(result);
      })
      .catch((error) => {
        console.log('Delete Failed', error);
        res.status(500).send(error);
      });
  })
  .put(async (req, res) => {
    try {
      const id = req.params.id;
      const resutl = await dbconnect.acceptOrder(id, req.body.maKH, req.body.danhSachCacVe);
      res.status(200).send(resutl);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

// Route vé
router.route('/veproducts').get((req, response) => {
  dbconnect
    .getAllTickets()
    .then((result) => {
      response.send(result);
    })
    .catch((err) => {
      response.status(500).json({
        message: err.message,
      });
    });
});

router.route('/veproducts/:id').get((request, response) => {
  dbconnect
    .getTicketByMaVe(request.params.id)
    .then((result) => {
      response.send(result);
    })
    .catch((err) => {
      response.status(500).json({
        message: err.message,
      });
    });
});

router.route('/veproducts').post((request, response) => {
  const listve = { ...request.body };
  dbconnect
    .addve(listve)
    .then((result) => {
      response.status(201).json({
        result,
        message: 'Tạo vé thành công',
      });
    })
    .catch((err) => {
      console.log(err);
      response.status(500).send(err);
    });
});

router.route('/veproducts/:id').put((request, response) => {
  const ticketId = request.params.id;
  const data = request.body;
  dbconnect
    .updateVe(ticketId, data)
    .then((result) => {
      response.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      response.status(500).send(err);
    });
});

router.route('/veproducts/:id').delete((req, res) => {
  const eventId = req.params.id;
  dbconnect
    .deleteVe(eventId)
    .then((result) => {
      res.status(204).send(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

// Tour Type Routes
router
  .route('/tourTypes/:id')
  .delete(async (req, res) => {
    try {
      const { id } = req.params.id;
      const result = dbconnect.deleteTourType(id);
      return res.status(204).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  })
  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const result = dbconnect.updateTourType(id, req.body);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });

router
  .route('/tourTypes')
  .get(async (req, res) => {
    try {
      const result = await dbconnect.getAllTourTypes();
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  })
  .post(async (req, res) => {
    try {
      const result = await dbconnect.addTourType(req.body);
      return res.status(201).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

// Ticket Type Routes
router
  .route('/ticketTypes/:id')
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      const data = await dbconnect.deleteTicketType(id);
      return res.status(204).send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  })
  .put(async (req, res) => {
    const { id } = req.params;
    try {
      const data = await dbconnect.updateTicketType(id, req.body);
      return res.status(204).send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

router
  .route('/ticketTypes')
  .get(async (req, res) => {
    try {
      const result = await dbconnect.getAllTicketTypes();
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  })
  .post(async (req, res) => {
    try {
      const result = await dbconnect.createTicketType(req.body);
      res.status(201).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

// Tours

router.route('/tours').get(async (req, res) => {
  try {
    const result = await dbconnect.getAllTours();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find Ticket By DonDatTour

router.get('/getTicktByDDT', async (req, res) => {
  try {
    const { maTour, maLoaiVe, ngayDat, soLuong } = req.query;
    const result = await dbconnect.findTickerByDonDatTour(maTour, maLoaiVe, ngayDat, soLuong);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get('/thongKe', async (req, res) => {
  try {
    const result = await dbconnect.layThongTinThongKe();
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post('/datTour', async (req, res) => {
  try {
    const result = await dbconnect.taoDonDatTour(req.body);
    return res.status(201).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get('/lich-su-dat-tour', async (req, res) => {
  try {
    const histories = await dbconnect.getOrderHistory();
    return res.status(200).send(histories);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.get('/tour/images/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [imageRecord] = await dbconnect.getTourIimage(id);
    if (imageRecord) {
      return res.header('Content-Type', 'image/jpeg').status(200).send(imageRecord.HINH_ANH_DATA);
    } else {
      return res.status(404).send('Không tìm thấy dữ liệu');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.post('/login-management', async (req, res) => {
  try {
    const request = await dbconnect.loginIntoManagement(req.body);
    if (!request.accountAdmin && !request.accountPartner) {
      return res.status(404).json({
        message: 'Tên đăng nhập hoặc mật khẩu không chính xác',
      });
    } else {
      if (request.accountAdmin) {
        const { PASSADMIN, ...restInfo } = request.accountAdmin;
        return res.status(200).send({ ...restInfo, role: 'admin' });
      }
      if (request.accountPartner) {
        const { PASSWWORD, ...restInfo } = request.accountPartner;
        return res.status(200).send({ ...restInfo, role: 'partner' });
      }
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post('/create-account-management', async (req, res) => {
  try {
    await dbconnect.createAccountManagement(req.body);
    return res.status(201).send('Tạo tài khoản thành công');
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post('/update-application', async (req, res) => {
  try {
    await dbconnect.updateApplicaton();
    return res.status(200).send('Update successfully!');
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.post('/create-customer', async (req, res) => {
  try {
    const request = await dbconnect.createCustomerIfNotExists(req.body);
    return res.status(201).send(request);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.get('/get-all-members', async (req, res) => {
  try {
    const [adminUsers, partnerUsers] = await Promise.all([dbconnect.getAllAdmins(), dbconnect.getAllPartners()]);
    return res.status(200).send({ adminUsers, partnerUsers });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.post('/create-member', async (req, res) => {
  try {
    const response = await dbconnect.createMember(req.body);
    return res.status(201).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.delete('/delete-member/:userRole/:memberId', async (req, res) => {
  try {
    const { userRole, memberId } = req.params;
    if (!userRole || !memberId) {
      return res.status(400).send({ message: 'Vui lòng truyền vai trò và mã của người dùng để thực hiện thao tác' });
    }
    const request = await dbconnect.deleteMember(userRole, memberId);
    return res.status(204).send(request);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

router.put('/update-member/:userRole/:memberId', async (req, res) => {
  try {
    const { userRole, memberId } = req.params;
    if (!userRole || !memberId || !req.body.password || req.body.password.length < 6) {
      return res.status(400).send({ message: 'Vui lòng truyền vai trò và mã của người dùng để thực hiện thao tác' });
    }
    const request = await dbconnect.updateMember(userRole, memberId, req.body.password);
    return res.status(200).send(request);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

router.post('/payment_intents', stripeHandler);

const sslServer = https.createServer(
  {
    key: fs.readFileSync('cetificate/key.pem'),
    cert: fs.readFileSync('cetificate/cert.pem'),
  },
  app,
);

connectDatabase()
  .then(() => {
    console.log('Connect database successfully');
    sslServer.listen(PORT, () => console.log(`Secure server is running on port ${ PORT }`));
  })
  .catch((err) => {
    console.log('Error when connecting database');
    console.log(err);
  });
