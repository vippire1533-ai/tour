import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import https from 'https';
import dbUtils from './utils/dbUtils';
import logger from './utils/logger';

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use('/api', router);

// router.route('/products').get((request, response) => {
//   dbconnect.GetDatas().then(result => {
//     response.send(result[ 0 ]);
//   });
// });
// router.route('/products/:id').get((request, response) => {
//   console.log(request.params.id);
//   dbconnect.GetData(request.params.id).then(result => {
//     response.send(result[ 0 ]);
//   });
// });
// router.route('/products').post((request, response) => {
//   let Category = { ...request.body };

//   dbconnect.addTour(Category).then(result => {
//     response.status(201).send(result);
//   });
// });
// router.route('/products/:id').put((request, response) => {
//   let eventid = request.params.id;
//   let data = request.body[ 0 ];

//   dbconnect.updateTour(eventid, data).then(result => {
//     response.status(202).send(result);
//   }).catch((err) => {
//     console.log(err);
//   });
// });
// router.route('/products/:id').delete((req, res) => {
//   let eventid = req.params.id;
//   dbconnect.deleteTour(eventid).then(result => {
//     res.status(204).send(result);
//   });
// });
// //Route loai tour
// router.route('/loaitour').get((request, response) => {
//   dbconnect.Getloaitour().then(result => {
//     response.send(result[ 0 ]);
//   });
// });
// router.route('/loaitour').post((request, response) => {
//   let listve = { ...request.body };

//   dbconnect.addloaitour(listve).then(result => {
//     response.status(206).send(result);
//   }).catch((err) => {
//     console.log('Add failed', err);
//   });
// });
// router.route('/loaitour/:id').delete((req, res) => {
//   let eventid = req.params.id;
//   dbconnect.deleteLoaiTour(eventid).then(result => {
//     res.status(208).send(result);
//   }).catch((error) => {
//     console.log('Delete Failed', error);
//   });
// });
// //Route đơn đặt vé
// router.route('/dondatve').get((request, response) => {
//   dbconnect.GetDonDatVe().then(result => {
//     response.send(result[ 0 ]);
//   });
// });
// router.route('/dondatve').post((request, response) => {
//   let listve = { ...request.body };

//   dbconnect.addDonDatVe(listve).then(result => {
//     response.status(206).send(result);
//   }).catch((err) => {
//     console.log('Add failed', err);
//   });
// });
// router.route('/dondatve/:id').delete((req, res) => {
//   let eventid = req.params.id;
//   dbconnect.deleteDonDatVe(eventid).then(result => {
//     res.status(208).send(result);
//   }).catch((error) => {
//     console.log('Delete Failed', error);
//   });
// });
//Route vé
// router.route('/veproducts').get((request,response) =>{
//     dbconnect.GetAllDatave().then(result =>{
//         response.send(result[0])
//     })
// })
// router.route('/veproducts/:id').get((request,response) =>{
//     console.log(request.params.id)
//     dbconnect.GetDatave(request.params.id).then(result =>{
//         response.send(result[0])
//     })
// })

// router.route('/veproducts').post((request,response) =>{
//     let listve = {...request.body}

//     dbconnect.addve(listve).then(result =>{
//         response.status(206).send(result);
//     }).catch((err) =>{
//         console.log('Add failed',err);
//     })
// })
// router.route('/veproducts/:id').put((request,response) =>{
//     let eventid = request.params.id;
//     let data = request.body[0];
//     dbconnect.updateVe(eventid,data).then(result =>{
//         response.status(207).send(result)
//     }).catch((err)=>{
//         console.log('Update failed',err);
//     })
// })
// router.route('/veproducts/:id').delete((req,res)=>{
//     let eventid = req.params.id
//     dbconnect.deleteVe(eventid).then(result =>{
//         res.status(208).send(result);
//     }).catch((error)=>{
//         console.log('Delete Failed',error);
//     })
// })
// dbUtils.testConnection();

dbUtils
  .connectDatabase()
  .then(() => {
    const sslServer = https.createServer(
      {
        key: fs.readFileSync('certificate/key.pem'),
        cert: fs.readFileSync('certificate/cert.pem'),
      },
      app,
    );
    sslServer.listen(8000, () => console.log('Secure server on port 8000'));
  })
  .catch((err) => {
    logger('Error while starting server', err.message);
  });
