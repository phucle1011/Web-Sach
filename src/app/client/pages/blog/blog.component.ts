import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  intro = {
    title: 'Blog Sách Hay',
    description: 'Nơi chia sẻ những cuốn sách truyền cảm hứng, sách ảnh nghệ thuật và câu chuyện đằng sau từng trang giấy.'
  };

  blogPosts = [
    {
      title: 'Đắt Nhân Tâm',
      description: 'Những bức ảnh tuyệt đẹp ghi lại vẻ đẹp tự nhiên và văn hoá Việt Nam.',
      image: '/assets/images/products/datnhantam.png'
    },
    {
      title: 'Nhà Giả Kim',
      description: 'Bộ sách ảnh về con người và núi rừng Tây Bắc đầy ấn tượng.',
      image: '/assets/images/products/nhakim.png'
    },
    {
      title: 'Thành phố và ký ức',
      description: 'Một góc nhìn nghệ thuật về các đô thị hiện đại và cuộc sống thường nhật.',
      image: '/assets/images/products/thanhpho.jpg'
    },

  ];
}
