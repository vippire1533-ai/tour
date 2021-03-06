import sql from 'mssql/msnodesqlv8';
import config from './dbconfig.js';
import sendMail from './sendMail';

// ĐẶT TOUR
async function GetDatas() {
  try {
    const pool = await sql.connect(config);
    const queryString = `
    SELECT  
          MATOUR,
          lt.TENLOAI,
          TENTOUR,
          GTTOUR,
          GIATOUR,
          NOIDUNGTOUR,
          HINHANH,
          NGAYDI,
          DIEMDI,
          DIEMDEN,
          NGAYTAO,
          T_HA.MA_HINH_ANH,
          TINH,
          TINH_TRANG_TOUR
    FROM  Tour t LEFT JOIN 
          LoaiTour lt ON t.MALOAI = lt.MALOAI 
          LEFT JOIN Tour_HinhAnh T_HA ON t.MATOUR = T_HA.MA_TOUR`;
    const request = await pool.request().query(queryString);
    const tourRecords = request.recordset;
    const tours = tourRecords.reduce((acc, tour) => {
      const tourItem = acc.find((item) => item.MATOUR === tour.MATOUR);
      if (tourItem) {
        tourItem.DANH_SACH_ANH.push(tour.MA_HINH_ANH);
      } else {
        acc.push({
          ...tour,
          DANH_SACH_ANH: [tour.MA_HINH_ANH],
        });
      }
      return acc;
    }, []);
    return tours;
  } catch (error) {
    throw error;
  }
}

async function GetData(maTour) {
  try {
    const pool = await sql.connect(config);
    const queryString = `
    SELECT  
      MATOUR,
      lt.TENLOAI,
      TENTOUR,
      GTTOUR,
      GIATOUR,
      NOIDUNGTOUR,
      HINHANH,
      NGAYDI,
      DIEMDI,
      DIEMDEN,
      NGAYTAO,
      T_HA.MA_HINH_ANH,
      TINH
    FROM  
      Tour t LEFT JOIN 
      LoaiTour lt ON t.MALOAI = lt.MALOAI 
      LEFT JOIN Tour_HinhAnh T_HA ON t.MATOUR = T_HA.MA_TOUR
    WHERE t.MATOUR = @MA_TOUR
    `;
    const request = await pool.request().input('MA_TOUR', sql.Int, maTour).query(queryString);
    const tourRecords = request.recordset;
    const tour = tourRecords.reduce((acc, tour) => {
      const tourItem = acc.find((item) => item.MATOUR === tour.MATOUR);
      if (tourItem) {
        tourItem.DANH_SACH_ANH.push(tour.MA_HINH_ANH);
      } else {
        acc.push({
          ...tour,
          DANH_SACH_ANH: [tour.MA_HINH_ANH],
        });
      }
      return acc;
    }, []);
    return tour;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function addTour(tourInfo) {
  try {
    let pool = await sql.connect(config);
    let request = await pool
      .request()
      .input('MALOAI', sql.Int, tourInfo.loaiTour)
      .input('TENTOUR', sql.NVarChar, tourInfo.tenTour)
      .input('GTTOUR', sql.NVarChar, tourInfo.gioiThieuTour)
      .input('GIATOUR', sql.Int, +tourInfo.giaTour)
      .input('NOIDUNGTOUR', sql.NVarChar, tourInfo.noiDungTour)
      .input('HINHANH', sql.NVarChar, null)
      .input('NGAYDI', sql.DateTime, new Date(tourInfo.ngayDi))
      .input('DIEMDI', sql.NVarChar, tourInfo.diemDi)
      .input('DIEMDEN', sql.NVarChar, tourInfo.diemDen)
      .input('NGAYTAO', sql.DateTime, new Date())
      .input('TINH', sql.NVarChar, tourInfo.tinh)
      .execute('InsertTour');
    return request.recordset;
  } catch (err) {
    throw err;
  }
}

async function deleteTour(maTour) {
  try {
    let pool = await sql.connect(config);
    let deleteTour = await pool.request().input('MATOUR', sql.Int, maTour).execute('DeleteTour');
    return deleteTour.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function updateTour(tourId, tourPayload) {
  try {
    const pool = await sql.connect(config);
    const query = `UPDATE Tour SET GTTOUR = @tourDesc, NOIDUNGTOUR = @tourContent WHERE MATOUR = @tourId`;
    const request = await pool
      .request()
      .input('tourDesc', sql.NVarChar, tourPayload.tourDesc)
      .input('tourContent', sql.NVarChar, tourPayload.tourContent)
      .input('tourId', sql.Int, +tourId)
      .query(query);
    return request.recordset;
  } catch (error) {
    throw error;
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
        LV.MALOAI AS MA_LOAI_VE, 
        T.TENTOUR,
        T.MATOUR,
        LT.TENLOAI AS TEN_LOAI_TOUR,
        VT.NGAYCOHIEULUC, 
        VT.NGAYTAO,
        KH.MAKH, KH.HOTEN, 
        VT.GIAVE,
        VT.TRANG_THAI_VE AS TINHTRANG
    FROM  
        VeTour VT	LEFT JOIN TOUR T ON  T.MATOUR = VT.MATOUR
        LEFT JOIN LoaiTour LT ON T.MALOAI = LT.MALOAI
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
        LV.MALOAI AS MA_LOAI_VE, 
        T.TENTOUR,
        T.MATOUR,
        LT.TENLOAI AS TEN_LOAI_TOUR,
        VT.NGAYCOHIEULUC, 
        VT.NGAYTAO,
        KH.MAKH, KH.HOTEN, 
        VT.GIAVE,
        CASE
          WHEN VT.TRANG_THAI_VE = N'Đã bị xóa' THEN N'Đã bị xóa'
          WHEN VT.TRANG_THAI_VE = N'Đã bị hủy' THEN N'Đã bị hủy'
          WHEN KH.MAKH IS NOT NULL THEN N'Đã được đặt'
          WHEN KH.MAKH IS NULL AND VT.NGAYCOHIEULUC >= GETDATE() THEN N'Còn hiệu lực'
          ELSE N'Đã quá hạn'
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

async function addve(payload) {
  try {
    let pool = await sql.connect(config);
    let insertvetour = await pool
      .request()
      .input('SO_LUONG_VE', payload.SOLUONGVE)
      .input('MATOUR', sql.Int, payload.MATOUR)
      .input('NGAYCOHIEULUC', sql.DateTime, new Date(payload.NGAYCOHIEULUC))
      .input('LOAIVE', sql.Int, payload.LOAIVE)
      .input('NGAYTAO', sql.DateTime, new Date())
      .input('GIAVE', sql.Int, +payload.GIAVE)
      .input('TENKH', sql.NVarChar, payload.TENKH)
      .execute('InsertVe');
    return insertvetour.recordsets;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function deleteVe(maVe) {
  try {
    const pool = await sql.connect(config);
    const deleteVe = await pool
      .request()
      .input('MAVE', sql.Int, +maVe)
      .input('TINH_TRANG_VE', sql.NVarChar, 'Đã bị xóa')
      .execute('setTinhTrangVe');
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
    const pool = await sql.connect(config);
    const query = `
    SELECT 
      DDT.MADONDAT AS MA_DON_DAT, 
      DDT.MAKHACHHANG AS MA_KH,
      KH.HOTEN AS TEN_KHACH_HANG,
      DDT.MATOUR AS MA_TOUR,
      LT.TENLOAI AS LOAI_TOUR,
      T.TENTOUR AS TEN_TOUR,
      T.DIEMDEN AS DIEM_DEN,
      T.DIEMDI AS DIEM_DI,
      T.TINH AS TINH_THANH,
      T.GIATOUR AS GIA_TOUR,
      LV.MALOAI AS MA_LOAI_VE,
      LV.TENLOAI AS TEN_LOAI_VE,
      DDT.SOLUONGVEDAT AS SO_LUONG_VE_DAT, 
      DDT.TONGTIEN AS TONG_TIEN,
      DDT.TINHTRANGTHANHTOAN AS TINH_TRANG_THANH_TOAN,
      DDT.TINH_TRANG_DON,
      DDT.NGAYDAT AS NGAY_DAT
  FROM 
      DonDatTour DDT  
      INNER JOIN KhachHang KH on KH.MAKH = DDT.MAKHACHHANG
      INNER JOIN Tour T ON T.MATOUR = DDT.MATOUR
      INNER JOIN LoaiTour LT ON T.MALOAI = LT.MALOAI
      INNER JOIN LoaiVe LV ON LV.MALOAI = DDT.MA_LOAI_VE
  ORDER BY 
      DDT.MADONDAT DESC
    `;
    const products = await pool.request().query(query);
    return products.recordset;
  } catch (error) {
    throw error;
  }
}

async function GetDonDatVeTheoMaDonDat(maDonDat) {
  try {
    const pool = await sql.connect(config);
    const query = `
    SELECT 
      DDT.MADONDAT AS MA_DON_DAT, 
      DDT.MAKHACHHANG AS MA_KH,
      KH.HOTEN AS TEN_KHACH_HANG,
      DDT.MATOUR AS MA_TOUR,
      LT.TENLOAI AS LOAI_TOUR,
      T.TENTOUR AS TEN_TOUR,
      T.DIEMDEN AS DIEM_DEN,
      T.DIEMDI AS DIEM_DI,
      T.TINH AS TINH_THANH,
      T.GIATOUR AS GIA_TOUR,
      LV.MALOAI AS MA_LOAI_VE,
      LV.TENLOAI AS TEN_LOAI_VE,
      DDT.SOLUONGVEDAT AS SO_LUONG_VE_DAT, 
      DDT.TONGTIEN AS TONG_TIEN,
      DDT.TINHTRANGTHANHTOAN AS TINH_TRANG_THANH_TOAN,
      DDT.TINH_TRANG_DON,
      DDT.NGAYDAT AS NGAY_DAT
  FROM 
      DonDatTour DDT  
      INNER JOIN KhachHang KH on KH.MAKH = DDT.MAKHACHHANG
      INNER JOIN Tour T ON T.MATOUR = DDT.MATOUR
      INNER JOIN LoaiTour LT ON T.MALOAI = LT.MALOAI
      INNER JOIN LoaiVe LV ON LV.MALOAI = DDT.MA_LOAI_VE
  WHERE 
      DDT.MADONDAT = ${ maDonDat }
  ORDER BY 
      DDT.MADONDAT
    `;
    const products = await pool.request().query(query);
    return products.recordset;
  } catch (error) {
    throw error;
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
    throw err;
  }
}

async function declineDonDatVe(maDonDat) {
  try {
    const pool = await sql.connect(config);
    const query = `
    UPDATE 
      DonDatTour 
    SET 
      TINH_TRANG_DON = N'Đã hủy đơn', 
      TINHTRANGTHANHTOAN=N'Đã hoàn tiền' 
    WHERE 
      MADONDAT = @MADONDAT
    `;
    const deleteTour = await pool
      .request()
      .input('MADONDAT', sql.Int, +maDonDat)
      .query(query);
    const queryUpdateVeTour = `
      UPDATE 
        VeTour 
      SET 
        TRANG_THAI_VE = N'Đã bị hủy' 
      WHERE 
        MA_DON_DAT = @MA_DON_DAT
      `;
    const updateVeTour = await pool
      .request()
      .input('MA_DON_DAT', sql.Int, +maDonDat)
      .query(queryUpdateVeTour);

    return [deleteTour.recordset, updateVeTour.recordset];
  } catch (error) {
    throw error;
  }
}

const acceptOrder = async (maDonDat, maKH, danhSachCacVe) => {
  try {
    const pool = await sql.connect(config);
    const query1 = `
    UPDATE 
      DonDatTour 
    SET 
      TINH_TRANG_DON = N'Đã duyệt đơn'
    WHERE 
      MADONDAT = ${ maDonDat }
    `;
    const query2 = `
    UPDATE
      VeTour
    SET
      TRANG_THAI_VE = N'Đã được đặt',
      MAKH = '${ maKH }',
      MA_DON_DAT = ${ maDonDat }
    WHERE 
      MAVE IN (${ danhSachCacVe.join(',') })`;
    const result = await Promise.all([pool.request().query(query1), pool.request().query(query2)]);
    return result;
  } catch (error) {
    throw error;
  }
};

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
      .input('SO_TIEN_GIAM', +sql.Int, payload.SO_TIEN_GIAM)
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
      .input('SO_TIEN_GIAM', sql.Int, +payload.SO_TIEN_GIAM)
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

const findTickerByDonDatTour = async () => {
  try {
    const pool = await sql.connect(config);
    const query = `
    SELECT DISTINCT
      VT.MAVE, 
      VT.MATOUR AS MA_TOUR,
      T.TENTOUR, 
      LV.TENLOAI AS TEN_LOAI_VE, 
      LV.MALOAI AS MA_LOAI_VE, 
      LT.TENLOAI as TEN_LOAI_TOUR, 
      VT.NGAYTAO as NGAY_TAO, 
      VT.NGAYCOHIEULUC as NGAY_CO_HIEU_LUC,
      VT.GIAVE as GIA_VE
    FROM 
      VeTour VT	INNER JOIN Tour T ON VT.MATOUR = T.MATOUR 
                INNER JOIN DonDatTour DDT ON T.MATOUR = DDT.MATOUR
                INNER JOIN LoaiVe LV ON VT.LOAIVE = LV.MALOAI
                INNER JOIN LoaiTour LT ON T.MALOAI = LT.MALOAI
    WHERE 
      VT.TRANG_THAI_VE = N'Còn hiệu lực' AND
      VT.NGAYCOHIEULUC >= GETDATE()
    ORDER BY
      VT.MAVE ASC
  `;
    const data = await pool.request().query(query);
    return data.recordset;
  } catch (error) {
    throw error;
  }
};

// Tours
const getAllTours = async () => {
  try {
    const pool = await sql.connect(config);
    const query = `
      SELECT MATOUR AS MA_TOUR, TENTOUR AS TEN_TOUR, GIATOUR AS GIA_TOUR, NGAYDI AS NGAY_DI FROM Tour WHERE TINH_TRANG_TOUR = N'Còn hiệu lực'
    `;
    const result = await pool.request().query(query);
    return result.recordset;
  } catch (error) {
    throw error;
  }
};
// Thống kê
const layThongTinThongKe = async () => {
  try {
    const pool = await sql.connect(config);
    const query = `
    SELECT 
      TRANG_THAI_VE, 
      MONTH(NGAYCOHIEULUC) as THANG,
      YEAR(NGAYCOHIEULUC) as NAM,
      count(MAVE) as SO_LUONG_VE, 
      count(MAKH) as SO_KHACH_HANG, 
      sum(GIAVE) as TONG_DOANH_THU 
    FROM 
      VeTour 
    GROUP BY TRANG_THAI_VE, MONTH(NGAYCOHIEULUC), YEAR(NGAYCOHIEULUC)
    `;
    const result = await pool.request().query(query);
    return result.recordset;
  } catch (error) {
    throw error;
  }
};
// Đặt tour
const constructEmailTemplate = (info) => {
  return `
  <h2>Đặt Vé Thành Công</h2>
<table style="border-collapse: collapse; width: 500px; border: 1px solid #ccc">
  <thead>
    <tr>
      <th style="border: 1px solid #ccc; padding: 12px"></th>
      <th style="border: 1px solid #ccc; padding: 12px">Chi Tiết</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #ccc; padding: 12px">Mã Đơn Đặt</td>
      <td style="border: 1px solid #ccc; padding: 12px">${ info.MA_DON_DAT }</td>
    </tr>
    <tr>
    <td style="border: 1px solid #ccc; padding: 12px">Khách Hàng</td>
    <td style="border: 1px solid #ccc; padding: 12px">${ info.TEN_KHACH_HANG }</td>
  </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 12px">Tour</td>
      <td style="border: 1px solid #ccc; padding: 12px">${ info.TEN_TOUR }</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 12px">Điểm Đến</td>
      <td style="border: 1px solid #ccc; padding: 12px">${ info.DIEM_DEN }</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 12px">Điểm Đi</td>
      <td style="border: 1px solid #ccc; padding: 12px">${ info.DIEM_DI }</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 12px">Tỉnh/Thành Phố</td>
      <td style="border: 1px solid #ccc; padding: 12px">${ info.TINH_THANH }</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 12px">Số Lượng Vé</td>
      <td style="border: 1px solid #ccc; padding: 12px">${ info.SO_LUONG_VE_DAT }</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 12px">Loại Vé</td>
      <td style="border: 1px solid #ccc; padding: 12px">${ info.TEN_LOAI_VE }</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 12px">Tổng Tiền</td>
      <td style="border: 1px solid #ccc; padding: 12px">${ info.TONG_TIEN }</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 12px">Ngày đặt</td>
      <td style="border: 1px solid #ccc; padding: 12px">${ new Date(info.NGAY_DAT).toLocaleString() }</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 12px">Hình Thức Thanh Toán</td>
      <td style="border: 1px solid #ccc; padding: 12px">Chuyển Khoản Ngân Hàng</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 12px">Trạng Thái</td>
      <td style="border: 1px solid #ccc; padding: 12px">Đã được thanh toán. Đang chờ xử lý</td>
    </tr>
  </tbody>
</table>
`;
};

const taoDonDatTour = async (payload) => {
  try {
    const pool = await sql.connect(config);
    const { maKH, maTour, ngayDat, soLuong, tongTien, maLoaiVe, email, maGiaoDich } = payload;
    const query = `
    INSERT INTO DonDatTour (
      MAKHACHHANG, 
      MATOUR, 
      NGAYDAT, 
      TINHTRANGTHANHTOAN, 
      SOLUONGVEDAT, 
      TONGTIEN, 
      MA_LOAI_VE, 
      TINH_TRANG_DON,
      MA_PHIEN_GIAO_DICH
    )
    VALUES(
      '${ maKH }', 
      ${ maTour }, 
      ${ ngayDat }, 
      N'Đã thanh toán', 
      ${ soLuong }, 
      ${ tongTien }, 
      ${ maLoaiVe }, 
      N'Đang xử lý', 
      '${ maGiaoDich }'
    );
    SELECT SCOPE_IDENTITY() AS id;
    `;
    const record = await pool.request().query(query);
    return record.recordset;
  } catch (error) {
    throw error;
  }
};

const getOrderHistory = async () => {
  try {
    const pool = await sql.connect(config);
    const query = `
    SELECT 
      DDT.MADONDAT AS MA_DON_DAT, 
      DDT.MA_PHIEN_GIAO_DICH AS MA_PHIEN_GIAO_DICH, 
      T.TENTOUR AS TEN_TOUR,
      LV.TENLOAI AS LOAI_VE,
      T.DIEMDEN AS DIEM_DEN, 
      T.DIEMDI AS DIEM_XUAT_PHAT, 
      DDT.NGAYDAT AS NGAY_DI, 
      DDT.SOLUONGVEDAT AS SO_LUONG_VE,
      DDT.TONGTIEN AS TONG_TIEN,
      DDT.TINHTRANGTHANHTOAN AS TINH_TRANG_THANH_TOAN, 
      DDT.TINH_TRANG_DON, 
      DDT.NGAY_TAO_DON
    FROM 
      DonDatTour DDT  INNER JOIN KhachHang KH ON DDT.MAKHACHHANG = KH.MAKH
                      INNER JOIN Tour T ON DDT.MATOUR = T.MATOUR
                      INNER JOIN LoaiVe LV ON DDT.MA_LOAI_VE = LV.MALOAI
    ORDER BY 
      DDT.NGAY_TAO_DON DESC
    `;
    const request = await pool.request().query(query);
    return request.recordset;
  } catch (error) {
    throw error;
  }
};

const uploadTourImages = async (files, maTour) => {
  try {
    const pool = await sql.connect(config);
    const request = pool.request().input('maTour', sql.Int, maTour);
    if (files && files.length) {
      files.forEach((file, index) => {
        request.input(`fileName_${ index }`, sql.NVarChar, file.originalname);
        request.input(`fileSrc_${ index }`, sql.VarBinary, file.buffer);
      });
      const paramsList = files.map((_, index) => {
        return `(@fileName_${ index }, @fileSrc_${ index }, @maTour)`;
      });
      const queryString = `INSERT INTO Tour_HinhAnh(TEN_HINH_ANH, HINH_ANH_DATA, MA_TOUR) VALUES ${ paramsList.join(
        ',',
      ) }`;
      const rs = await request.query(queryString);
      return rs.recordset;
    }
  } catch (error) {
    throw error;
  }
};

const getTourIimage = async (maHinhAnh) => {
  try {
    const pool = await sql.connect(config);
    const queryString = `SELECT * FROM Tour_HinhAnh WHERE MA_HINH_ANH = @maHinhAnh`;
    const request = await pool.request().input('maHinhAnh', sql.Int, maHinhAnh).query(queryString);
    return request.recordset;
  } catch (error) {
    throw error;
  }
};

const loginIntoManagement = async (info) => {
  try {
    const pool = await sql.connect(config);
    const queryAdminTable = `SELECT * FROM Admin WHERE USERNAME = '${ info.username }' AND PASSADMIN = '${ info.password }'`;
    const queryPartnerTable = `SELECT * FROM PARTNER WHERE USERNAME = '${ info.username }' AND PASSWWORD = '${ info.password }'`;
    const [adminResponse, partnerResponse] = await Promise.all([
      pool.request().query(queryAdminTable),
      pool.request().query(queryPartnerTable),
    ]);
    return {
      accountAdmin: adminResponse.recordset.length ? adminResponse.recordset[0] : null,
      accountPartner: partnerResponse.recordset.length ? partnerResponse.recordset[0] : null,
    };
  } catch (err) {
    throw err;
  }
};

const createAccountManagement = async (info) => {
  try {
    const pool = await sql.connect(config);
    const insertIntoAdminQuery = `INSERT INTO Admin(USERNAME, PASSADMIN, STATUS) VALUES('${ info.username }', '${ info.password }', 'active')`;
    const insertIntoPartnerQuery = `INSERT INTO Admin(USERNAME, PASSWORD, STATUS) VALUES('${ info.username }', '${ info.password }', 'active')`;
    if (info.isAdmin) {
      return await pool.request().query(insertIntoAdminQuery);
    } else {
      return await pool.request().query(insertIntoPartnerQuery);
    }
  } catch (error) {
    throw error;
  }
};

const updateApplicaton = async () => {
  try {
    const pool = await sql.connect(config);
    await pool.request().execute('UpdateVeTourAndTour');
    return 'Successfully';
  } catch (error) {
    throw error;
  }
};

const createCustomerIfNotExists = async (payload) => {
  try {
    const pool = await sql.connect(config);
    const request = await pool
      .request()
      .input('MA_KHACH_HANG', sql.VarChar, payload.id)
      .input('TEN_DANG_NHAP', sql.NVarChar, payload.username)
      .input('EMAIL', sql.NVarChar, payload.email)
      .execute('CreateCustomerIfNotExists');
    return request.recordset;
  } catch (error) {
    throw error;
  }
};

const getAllAdmins = async () => {
  try {
    const pool = await sql.connect(config);
    const request = await pool.request().query('SELECT MAADMIN AS MA_USER, USERNAME, IS_ADMIN FROM Admin');
    return request.recordset;
  } catch (error) {
    throw error;
  }
};

const getAllPartners = async () => {
  try {
    const pool = await sql.connect(config);
    const request = await pool.request().query('SELECT MAPARTNER AS MA_USER, USERNAME, IS_ADMIN FROM PARTNER');
    return request.recordset;
  } catch (error) {
    throw error;
  }
};

const createMember = async (payload) => {
  try {
    const pool = await sql.connect(config);
    const query = `
    INSERT INTO ${ +payload.userRole ? 'Admin' : 'PARTNER' } 
    VALUES('${ payload.username }', '${ payload.password }', 'active', ${ payload.userRole })`;
    const request = await pool.request().query(query);
    return request.recordset;
  } catch (error) {
    throw error;
  }
};

const deleteMember = async (userRole, memberId) => {
  try {
    const pool = await sql.connect(config);
    const request = await pool
      .request()
      .input('LOAI_THANH_VIEN', sql.VarChar, userRole)
      .input('MA_THANH_VIEN', sql.Int, +memberId)
      .execute('DeleteMember');
    return request.recordset;
  } catch (error) {
    throw error;
  }
};

const updateMember = async (userRole, memberId, password) => {
  try {
    const pool = await sql.connect(config);
    const request = await pool
      .request()
      .input('LOAI_THANH_VIEN', sql.VarChar, userRole)
      .input('MA_THANH_VIEN', sql.Int, +memberId)
      .input('MAT_KHAU', sql.VarChar, password)
      .execute('UpdateMember');
    return request.recordset;
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
  declineDonDatVe,
  getAllTicketTypes,
  createTicketType,
  deleteTicketType,
  updateTicketType,
  updateTourType,
  getAllTours,
  findTickerByDonDatTour,
  acceptOrder,
  layThongTinThongKe,
  taoDonDatTour,
  uploadTourImages,
  getTourIimage,
  loginIntoManagement,
  createAccountManagement,
  updateApplicaton,
  createCustomerIfNotExists,
  getOrderHistory,
  getAllAdmins,
  getAllPartners,
  createMember,
  deleteMember,
  updateMember,
  sql,
};
