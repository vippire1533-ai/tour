const controlType = {
  inputText: 'input text',
  dropdown: 'dropdown',
  datepicker: 'datepicker',
  textarea: 'textarea',
};

const formConfig = [
  {
    label: 'Tên Tour',
    name: 'tenTour',
    controlType: controlType.inputText,
    placeholder: 'Nhập tên tour'
  },
  {
    label: 'Loại Tour',
    name: 'loaiTour',
    controlType: controlType.dropdown,
    placeholder: 'Chọn loại tour'
  },
  {
    label: 'Tỉnh',
    name: 'tinh',
    controlType: controlType.dropdown,
    placeholder: 'Chọn tỉnh/thành phố'
  },
  {
    label: 'Giá Tour',
    name: 'giaTour',
    controlType: controlType.inputText,
    placeholder: 'Nhập giá tour'
  },
  {
    label: 'Giới Thiệu',
    name: 'gioiThieu',
    controlType: controlType.textarea,
    placeholder: 'Nhập giới thiệu tour'
  },
  {
    label: 'Nội Dung',
    name: 'noiDung',
    controlType: controlType.textarea,
    placeholder: 'Nhập nội dung tour'
  },
  {
    label: 'Điểm Xuất Phát',
    name: 'diemXuatPhat',
    controlType: controlType.inputText,
    placeholder: 'Nhập điểm xuất phát'
  },
  {
    label: 'Điểm Đến',
    name: 'diemDen',
    controlType: controlType.inputText,
    placeholder: 'Nhập điểm đến'
  },
];

export { controlType, formConfig };