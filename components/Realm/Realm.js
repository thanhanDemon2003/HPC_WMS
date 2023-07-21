import Realm from 'realm';

// Định nghĩa mô hình dữ liệu
const Sanphamnhap = {
  name: 'hangnhap',
  properties: {
    sp: 'int',
    TEN_SP: 'string',
    HSD: 'date',
    REF: 'string',
    SO_LUONG: 'int',
    KHOI_LUONG: 'double',
  },
};

const realm = new Realm({ schema: [Sanphamnhap] });

export default realm;