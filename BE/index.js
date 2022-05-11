import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import https from 'https';
import dbconnect from './data/dbconnect.js';
import router from './routes/route.js';

// app.use("/",TourRoutes);
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);

router.use((request, response, next) => {
  console.log(`${ request.method } ${ request.url }`);
  next();
});

router.route('/products').get((request, response) => {
  dbconnect.GetDatas().then((result) => {
    response.send(result[0]);
  });
});
router.route('/products/:id').get((request, response) => {
  console.log(request.params.id);
  dbconnect.GetData(request.params.id).then((result) => {
    response.send(result[0]);
  });
});
router.route('/products').post((request, response) => {
  let Category = { ...request.body };

  dbconnect.addTour(Category).then((result) => {
    response.status(201).send(result);
  });
});
router.route('/products/:id').put((request, response) => {
  let eventid = request.params.id;
  let data = request.body[0];

  dbconnect
    .updateTour(eventid, data)
    .then((result) => {
      response.status(202).send(result);
    })
    .catch((err) => {
      console.log(err);
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
      response.status(206).send(result);
    })
    .catch((err) => {
      console.log('Add failed', err);
    });
});
router.route('/loaitour/:id').delete((req, res) => {
  let eventid = req.params.id;
  dbconnect
    .deleteLoaiTour(eventid)
    .then((result) => {
      res.status(208).send(result);
    })
    .catch((error) => {
      console.log('Delete Failed', error);
    });
});
//Route đơn đặt vé
router.route('/dondatve').get((request, response) => {
  dbconnect.GetDonDatVe().then((result) => {
    response.send(result[0]);
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
      console.log('Add failed', err);
    });
});
router.route('/dondatve/:id').delete((req, res) => {
  let eventid = req.params.id;
  dbconnect
    .deleteDonDatVe(eventid)
    .then((result) => {
      res.status(208).send(result);
    })
    .catch((error) => {
      console.log('Delete Failed', error);
    });
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
      response.status(500).json({
        message: err.message,
      });
    });
});

router.route('/veproducts/:id').put((request, response) => {
  const eventId = request.params.id;
  const data = request.body[0];
  dbconnect
    .updateVe(eventId, data)
    .then((result) => {
      response.status(207).send(result);
    })
    .catch((err) => {
      console.log('Update failed', err);
    });
});

router.route('/veproducts/:id').delete((req, res) => {
  const eventId = req.params.id;
  dbconnect
    .deleteVe(eventId)
    .then((result) => {
      res.status(208).send(result);
    })
    .catch((error) => {
      console.log('Delete Failed', error);
    });
});

const sslServer = https.createServer(
  {
    key: fs.readFileSync('cetificate/key.pem'),
    cert: fs.readFileSync('cetificate/cert.pem'),
  },
  app,
);

sslServer.listen(8000, () => console.log('Secure server on port 8000'));
