export interface IProduct {
    productId: number;              // ID sản phẩm (khóa chính)
    title: string;                  // Tiêu đề sách
    author: string;                 // Tác giả
    publisher: string;             // Nhà xuất bản
    price: string;                 // Giá (dưới dạng chuỗi vì cột trong DB là varchar(20))
    description: string;           // Mô tả chi tiết
    images: string;                // Đường dẫn hình ảnh
    shortDescription: string;      // Mô tả ngắn
    publicationDate?: string | null;  // Ngày phát hành (có thể null)
    categoryId?: number | null;       // Mã danh mục (có thể null)
  }
  