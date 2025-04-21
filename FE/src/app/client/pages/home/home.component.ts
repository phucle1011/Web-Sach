import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  categories = [
    {
      title: 'Tự Hào Việt Nam',
      link: 'tu-hao',
      image: 'https://cdn1.fahasa.com/media/wysiwyg/HUYEN-1/2000214296235-removebg-preview.png'
    },
    {
      title: 'Thiết Bị Số',
      link: 'bach-hoa-tong-hop/thiet-bi-so-phu-kien-so.html?order=created_at&limit=24&p=1',
      image: 'https://cdn1.fahasa.com/media/wysiwyg/HUYEN-1/6902957303958-removebg-preview.png'
    },
    {
      title: 'Đèn Chống Cận',
      link: 'den-ban',
      image: 'https://cdn1.fahasa.com/media/wysiwyg/HUYEN-1/image_233034-removebg-preview.png'
    },
    {
      title: 'Đam Mỹ',
      link: 'sach-trong-nuoc/dam-my.html',
      image: 'https://cdn1.fahasa.com/media/wysiwyg/Duy-VHDT/Danh-muc-san-pham/2411/tashiro_3_ao_toai.jpg'
    },
    {
      title: 'Lịch Sử Việt Nam',
      link: 'tu-sach-lich-su-vn',
      image: 'https://cdn1.fahasa.com/media/wysiwyg/Duy-VHDT/Danh-muc-san-pham/2502/8935244874389.jpg'
    },
    {
      title: 'Văn Học',
      link: 'trang-van-hoc',
      image: 'https://cdn1.fahasa.com/media/wysiwyg/Duy-VHDT/Danh-muc-tu-sach/8934974182375.jpg'
    },
    {
      title: 'Tâm Lý Kỹ Năng',
      link: '/trang-tam-ly',
      image: 'https://cdn1.fahasa.com/media/wysiwyg/Duy-VHDT/Danh-muc-san-pham/240715/atomichabit100x100.jpg'
    },
    {
      title: 'Thiếu Nhi',
      link: '/trang-thieu-nhi',
      image: 'https://cdn1.fahasa.com/media/wysiwyg/Duy-VHDT/Danh-muc-san-pham/bup-sen-xanh-100x100.png'
    },
    {
      title: 'Sách Học Ngoại Ngữ',
      link: '/sach-trong-nuoc/sach-hoc-ngoai-ngu.html?order=num_orders&limit=24&p=1',
      image: 'https://cdn1.fahasa.com/media/wysiwyg/Duy-VHDT/Danh-muc-san-pham/240715/hsk100x100.jpg'
    },
    {
      title: 'Ngoại Văn',
      link: '/multilingual-bookshelf',
      image: 'https://cdn1.fahasa.com/media/wysiwyg/Duy-VHDT/ngoai-van-t1-24(1).jpg'
    }
  ];
  icons = [
    { src: 'assets/images/icon/dday.png', label: 'DDay 04.04' },
    { src: 'assets/images/icon/flashsale.png', label: 'Flash Sale' },
    { src: 'assets/images/icon/mcbooks.png', label: 'McBooks' },
    { src: 'assets/images/icon/sbooks.png', label: 'SBooks' },
    { src: 'assets/images/icon/magiamgia.png', label: 'Mã Giảm Giá' },
    { src: 'assets/images/icon/new.png', label: 'Sản Phẩm Mới' }
  ];
  
  books = [
    {
      title: 'Hiểu Về Đồng Tiền',
      image: 'https://cdn0.fahasa.com/media/catalog/product/c/h/chu-cho-ho-menh---bookmark.jpg',
      price: 46400,
      originalPrice: 58000,
      discount: '-20%',
    },
    {
      title: 'Lạc Quan Tếu',
      image: 'https://cdn0.fahasa.com/media/catalog/product/c/h/chu-cho-ho-menh---bookmark.jpg',
      price: 28000,
      originalPrice: 35000,
      discount: '-20%',
    },
    {
      title: 'MBA Trong Tầm Tay',
      image: 'https://cdn0.fahasa.com/media/catalog/product/c/h/chu-cho-ho-menh---bookmark.jpg',
      price: 155200,
      originalPrice: 194000,
      discount: '-20%',
    },
    {
      title: 'Sách Học Lập Trình',
      image: 'https://cdn0.fahasa.com/media/catalog/product/c/h/chu-cho-ho-menh---bookmark.jpg',
      price: 50000,
      originalPrice: 60000,
      discount: '-17%',
    },
    {
      title: 'Nghệ Thuật Sống Đẹp',
      image: 'https://cdn0.fahasa.com/media/catalog/product/c/h/chu-cho-ho-menh---bookmark.jpg',
      price: 72000,
      originalPrice: 90000,
      discount: '-20%',
    },
    {
      title: 'Bí Quyết Thành Công',
      image: 'https://cdn0.fahasa.com/media/catalog/product/c/h/chu-cho-ho-menh---bookmark.jpg',
      price: 80000,
      originalPrice: 100000,
      discount: '-20%',
    },
    {
      title: 'Phát Triển Bản Thân',
      image: 'https://cdn0.fahasa.com/media/catalog/product/c/h/chu-cho-ho-menh---bookmark.jpg',
      price: 64000,
      originalPrice: 80000,
      discount: '-20%',
    },
    {
      title: 'Làm Chủ Tài Chính',
      image: 'https://cdn0.fahasa.com/media/catalog/product/c/h/chu-cho-ho-menh---bookmark.jpg',
      price: 54000,
      originalPrice: 67500,
      discount: '-20%',
    },
    {
      title: 'Sức Mạnh Tư Duy',
      image: 'https://cdn0.fahasa.com/media/catalog/product/c/h/chu-cho-ho-menh---bookmark.jpg',
      price: 48000,
      originalPrice: 60000,
      discount: '-20%',
    },
    {
      title: 'Kỹ Năng Giao Tiếp',
      image: 'https://cdn0.fahasa.com/media/catalog/product/c/h/chu-cho-ho-menh---bookmark.jpg',
      price: 52000,
      originalPrice: 65000,
      discount: '-20%',
    },
    {
      title: 'Khởi Nghiệp Thông Minh',
      image: 'https://cdn0.fahasa.com/media/catalog/product/c/h/chu-cho-ho-menh---bookmark.jpg',
      price: 68000,
      originalPrice: 85000,
      discount: '-20%',
    },
    {
      title: 'Thấu Hiểu Bản Thân',
      image: 'https://cdn0.fahasa.com/media/catalog/product/c/h/chu-cho-ho-menh---bookmark.jpg',
      price: 47000,
      originalPrice: 59000,
      discount: '-20%',
    },
    {
      title: 'Chiến Lược Kinh Doanh',
      image: 'https://cdn0.fahasa.com/media/catalog/product/c/h/chu-cho-ho-menh---bookmark.jpg',
      price: 99000,
      originalPrice: 123000,
      discount: '-20%',
    },
    {
      title: 'Sách Văn Học Hiện Đại',
      image: 'https://cdn0.fahasa.com/media/catalog/product/c/h/chu-cho-ho-menh---bookmark.jpg',
      price: 76000,
      originalPrice: 95000,
      discount: '-20%',
    },
    {
      title: 'Tâm Lý Học Ứng Dụng',
      image: 'https://cdn0.fahasa.com/media/catalog/product/c/h/chu-cho-ho-menh---bookmark.jpg',
      price: 83000,
      originalPrice: 104000,
      discount: '-20%',
    },
    {
      title: 'Bí Mật Sự Thành Đạt',
      image: 'https://cdn0.fahasa.com/media/catalog/product/c/h/chu-cho-ho-menh---bookmark.jpg',
      price: 56000,
      originalPrice: 70000,
      discount: '-20%',
    },
    {
      title: 'Hành Trình Khám Phá',
      image: 'https://cdn0.fahasa.com/media/catalog/product/c/h/chu-cho-ho-menh---bookmark.jpg',
      price: 60000,
      originalPrice: 75000,
      discount: '-20%',
    },
    {
      title: 'Tư Duy Phản Biện',
      image: 'https://cdn0.fahasa.com/media/catalog/product/c/h/chu-cho-ho-menh---bookmark.jpg',
      price: 65000,
      originalPrice: 82000,
      discount: '-20%',
    },
  ];
  

  
  pageSize = 6;
  currentPage = 1;

  get totalPages(): number {
    return Math.ceil(this.categories.length / this.pageSize);
  }

  get paginatedCategories() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.categories.slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

}
