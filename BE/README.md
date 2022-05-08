# Kết Nối Database

- Tạo file .env trong thư mục root

  - Ví dụ: Trong project này là thư mục **_BE_**

- Thực hiện cấu hình như sau

```env
CONFIG_SERVER = 'localhost\SQLEXPRESS'
CONFIG_DB = 'TOUR'
CONFIG_CONNECTION_TIMEOUT = 50000
CONFIG_POOL_MAX = 10
CONFIG_POOL_MIN = 0
CONFIG_IDLE_TIMEOUT = 30000
```

- Cần thay đổi lại các biến:

  - **CONFIG_SERVER**: đổi lại theo cấu hình Sql Server Instance của bạn
  - **CONFIG_DB**: đổi lại theo tên _database_ của bạn
