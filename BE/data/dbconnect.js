import sql from 'mssql/msnodesqlv8';
import config from './dbconfig.js';

// ĐẶT TOUR
async function GetDatas() {
  try {
    let pool = await sql.connect(config);
    let products = await pool
      .request()
      .query(
        'select MATOUR,lt.TENLOAI,TENTOUR,GTTOUR,GIATOUR,NOIDUNGTOUR,HINHANH,NGAYDI,DIEMDI,DIEMDEN,NGAYTAO  from Tour t,LoaiTour lt  where t.MALOAI=lt.MALOAI',
      );
    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function GetData(CategoryMATOUR) {
  try {
    let pool = await sql.connect(config);
    let product = await pool
      .request()
      .input('MATOUR', sql.Int, CategoryMATOUR)
      .query('SELECT * FROM Tour where MATOUR = @MATOUR');
    return product.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function addTour(Category) {
  try {
    let pool = await sql.connect(config);
    let insertproduct = await pool
      .request()
      .input('MALOAI', sql.Int, Category.MALOAI)
      .input('TENTOUR', sql.NVarChar, Category.TENTOUR)
      .input('GTTOUR', sql.NVarChar, Category.GTTOUR)
      .input('GIATOUR', sql.Int, Category.GIATOUR)
      .input('NOIDUNGTOUR', sql.NVarChar, Category.NOIDUNGTOUR)
      .input('HINHANH', sql.NVarChar, Category.HINHANH)
      .input('NGAYDI', sql.DateTime, Category.NGAYDI)
      .input('DIEMDI', sql.NVarChar, Category.DIEMDI)
      .input('DIEMDEN', sql.NVarChar, Category.DIEMDEN)
      .input('NGAYTAO', sql.DateTime, Category.NGAYTAO)
      .execute('InsertTour');
    return insertproduct.recordsets;
  } catch (err) {
    console.log(err);
  }
}
async function deleteTour(CategoryMATOUR) {
  try {
    let pool = await sql.connect(config);
    let deleteTour = await pool
      .request()
      .input('MATOUR', sql.Int, CategoryMATOUR)
      .execute('DeleteTour');
    return deleteTour.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function updateTour(CategoryMATOUR, Category) {
  try {
    let pool = await sql.connect(config);
    let updateproduct = await pool
      .request()
      .input('MATOUR', sql.Int, CategoryMATOUR)
      .input('MALOAI', sql.Int, Category.MALOAI)
      .input('TENTOUR', sql.NVarChar, Category.TENTOUR)
      .input('GTTOUR', sql.NVarChar, Category.GTTOUR)
      .input('GIATOUR', sql.Int, Category.GIATOUR)
      .input('NOIDUNGTOUR', sql.NVarChar, Category.NOIDUNGTOUR)
      .input('HINHANH', sql.NVarChar, Category.HINHANH)
      .input('NGAYDI', sql.DateTime, Category.NGAYDI)
      .input('DIEMDI', sql.NVarChar, Category.DIEMDI)
      .input('DIEMDEN', sql.NVarChar, Category.DIEMDEN)
      .input('NGAYTAO', sql.DateTime, Category.NGAYTAO)
      .execute('UpdateTour');
    return updateproduct.recordsets;
  } catch (error) {
    console.log(error);
  }
}

// ĐẶT VÉ;
async function getAllTickets() {
  try {
    const pool = await sql.connect(config);
    const query = `
    SELECT 
        VT.MAVE, 
        LV.TENLOAI AS LOAIVE, 
        (SELECT LV1.MALOAI FROM LoaiVe LV1 WHERE LV1.MALOAI = LV.MALOAI) AS MALOAIVE,
        LT.TENLOAI AS LOAITOUR, 
        (SELECT LT1.MALOAI FROM LoaiTour LT1 WHERE LT1.MALOAI = LT.MALOAI) AS MALOAITOUR,
        VT.NGAYCOHIEULUC, 
        VT.NGAYTAO,
        KH.MAKH, KH.HOTEN, 
        VT.GIAVE,
        CASE
          WHEN KH.MAKH IS NOT NULL THEN N'booked'
          WHEN KH.MAKH IS NULL AND VT.NGAYCOHIEULUC >= GETDATE() THEN N'active'
          ELSE N'expired'
        END AS TINHTRANG
    FROM  
        VeTour VT	LEFT JOIN LoaiTour LT ON  LT.MALOAI = VT.MATOUR
        LEFT JOIN LoaiVe LV ON  LV.MALOAI = VT.LOAIVE
        LEFT JOIN KhachHang KH ON KH.MAKH = VT.MAKH
    ORDER BY 
        VT.MAVE ASC
    `;
    const products = await pool.request().query(query);
    return products.recordset;
  } catch (error) {
    throw error;
  }
}

async function getTicketByMaVe(maVe) {
  try {
    const pool = await sql.connect(config);
    const queryString = `
    SELECT 
        VT.MAVE, 
        LV.TENLOAI AS LOAIVE, 
        (SELECT LV1.MALOAI FROM LoaiVe LV1 WHERE LV1.MALOAI = LV.MALOAI) AS MALOAIVE,
        LT.TENLOAI AS LOAITOUR, 
        (SELECT LT1.MALOAI FROM LoaiTour LT1 WHERE LT1.MALOAI = LT.MALOAI) AS MALOAITOUR,
        VT.NGAYCOHIEULUC, 
        VT.NGAYTAO,
        KH.MAKH, KH.HOTEN, 
        VT.GIAVE,
        CASE
          WHEN KH.MAKH IS NOT NULL THEN N'Đã Được Đặt'
          WHEN KH.MAKH IS NULL AND VT.NGAYCOHIEULUC >= GETDATE() THEN N'Còn Hiệu Lực'
          ELSE N'Đã Hết Hạn'
        END AS TINHTRANG
    FROM  
        VeTour VT	LEFT JOIN LoaiTour LT ON  LT.MALOAI = VT.MATOUR
        LEFT JOIN LoaiVe LV ON  LV.MALOAI = VT.LOAIVE
        LEFT JOIN KhachHang KH ON KH.MAKH = VT.MAKH
    WHERE
        VT.MAVE = @VeTour
    ORDER BY 
        VT.MAVE ASC
    `;
    const product = await pool
      .request()
      .input('VeTour', sql.Int, +maVe)
      .query(queryString);
    return product.recordset;
  } catch (error) {
    throw error;
  }
}

async function addve(listve) {
  try {
    let pool = await sql.connect(config);
    let insertvetour = await pool
      .request()
      .input('MATOUR', sql.Int, listve.MATOUR)
      .input('NGAYCOHIEULUC', sql.DateTime, new Date(listve.NGAYCOHIEULUC))
      .input('LOAIVE', sql.Int, listve.LOAIVE)
      .input('NGAYTAO', sql.DateTime, new Date())
      .input('GIAVE', sql.Int, +listve.GIAVE)
      .input('TENKH', sql.NVarChar, listve.TENKH)
      .execute('InsertVe');
    return insertvetour.recordsets;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function deleteVe(listveMAVE) {
  try {
    let pool = await sql.connect(config);
    let deleteVe = await pool
      .request()
      .input('MAVE', sql.Int, listveMAVE)
      .execute('DeleteVe');
    return deleteVe.recordsets;
  } catch (error) {
    throw error;
  }
}

async function updateVe(ticketId, data) {
  try {
    const pool = await sql.connect(config);
    const updateveproducts = await pool
      .request()
      .input('MAVE', sql.Int, +ticketId)
      .input('MATOUR', sql.Int, +data.MATOUR)
      .input('NGAYCOHIEULUC', sql.DateTime, new Date(data.NGAYCOHIEULUC))
      .input('LOAIVE', sql.Int, data.LOAIVE)
      .input('NGAYTAO', sql.DateTime, new Date(data.NGAYTAO))
      .input('GIAVE', sql.Int, +data.GIAVE)
      .input('TENKH', sql.NVarChar, data.TENKH)
      .execute('UpdateVe');
    return updateveproducts.recordsets;
  } catch (error) {
    throw error;
  }
}
//  Loai Tour
async function getAllTourTypes() {
  try {
    const pool = await sql.connect(config);
    const query = `SELECT * FROM LoaiTour`;
    const products = await pool.request().query(query);
    return products.recordset;
  } catch (error) {
    throw error;
  }
}

async function addTourType(payload) {
  try {
    const pool = await sql.connect(config);
    const insertproduct = await pool
      .request()
      .input('TENLOAI', sql.NVarChar, payload.TENLOAI)
      .execute('InsertLoaiTour');
    return insertproduct.recordsets;
  } catch (err) {
    throw err;
  }
}

const updateTourType = async (maLoaiTour, payload) => {
  try {
    const pool = await sql.connect(config);
    const query = `
      UPDATE LoaiTour
      SET
        TENLOAI = @TENLOAI
      WHERE 
        MALOAI = @MALOAI
    `;
    const result = await pool
      .request()
      .input('MALOAI', sql.Int, +maLoaiTour)
      .input('TENLOAI', sql.NVarChar, payload.TENLOAI)
      .query(query);
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

async function deleteTourType(maLoaiTour) {
  try {
    let pool = await sql.connect(config);
    let deleteTour = await pool
      .request()
      .input('MALOAI', sql.Int, +maLoaiTour)
      .execute('DeleteLoaiTour');
    return deleteTour.recordsets;
  } catch (error) {
    console.log(error);
  }
}
// Đơn đặt vé
async function GetDonDatVe() {
  try {
    let pool = await sql.connect(config);
    let products = await pool.request().query('select * FROM DONDATVE');
    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function addDonDatVe(listdondatve) {
  try {
    let pool = await sql.connect(config);
    let insertproduct = await pool
      .request()
      .input('MALOAI', sql.Int, listdondatve.MADATVE)
      .input('TENLOAI', sql.Int, listdondatve.MANGUOIDAT)
      .input('MALOAI', sql.DateTime, listdondatve.NGAYDAT)
      .input('TENLOAI', sql.NVarChar, listdondatve.TINHTRANGTHANHTOAN)
      .input('MALOAI', sql.Int, listdondatve.SOLUONGVEDAT)
      .execute('InsertLoaiTour');
    return insertproduct.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function deleteDonDatVe(listdondatveMADATVE) {
  try {
    let pool = await sql.connect(config);
    let deleteTour = await pool
      .request()
      .input('MADATVE', sql.Int, listdondatveMADATVE)
      .execute('DeleteLoaiTour');
    return deleteTour.recordsets;
  } catch (error) {
    throw error;
  }
}

const getAllTicketTypes = async () => {
  try {
    const pool = await sql.connect(config);
    const query = `SELECT * FROM LoaiVe`;
    const data = await pool.request().query(query);
    return data.recordset;
  } catch (error) {
    throw error;
  }
};

const createTicketType = async (payload) => {
  try {
    const pool = await sql.connect(config);
    const data = await pool
      .request()
      .input('TENLOAI', sql.NVarChar, payload.TENLOAI)
      .execute('InsertLoaiVe');
    return data.recordset;
  } catch (error) {
    throw error;
  }
};

const updateTicketType = async (maLoaiVe, payload) => {
  try {
    const pool = await sql.connect(config);
    const data = await pool
      .request()
      .input('MALOAI', sql.Int, +maLoaiVe)
      .input('TENLOAI', sql.NVarChar, payload.TENLOAI)
      .execute('UpdateLoaiVe');
    return data.recordset;
  } catch (error) {
    throw error;
  }
};

const deleteTicketType = async (maLoaiVe) => {
  try {
    const pool = await sql.connect(config);
    const data = await pool
      .request()
      .input('MALOAI', sql.Int, +maLoaiVe)
      .execute('DeleteLoaiVe');
    return data.recordset;
  } catch (error) {
    throw error;
  }
};

export default {
  GetData,
  GetDatas,
  getAllTourTypes,
  GetDonDatVe,
  getAllTickets,
  getTicketByMaVe,
  addTour,
  deleteTour,
  updateTour,
  addve,
  updateVe,
  deleteVe,
  addTourType,
  deleteTourType,
  addDonDatVe,
  deleteDonDatVe,
  getAllTicketTypes,
  createTicketType,
  deleteTicketType,
  updateTicketType,
  updateTourType,
  sql,
};
