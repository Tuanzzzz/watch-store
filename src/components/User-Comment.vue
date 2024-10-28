<template>
  <div class="comments">
    <h2>Đánh giá sản phẩm</h2>
    <button @click="showForm = !showForm" class="btn btn-secondary mb-3">Viết đánh giá</button>
    <form v-if="showForm" @submit.prevent="addComment" class="mb-3">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" v-model="newComment.name" id="name" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="rating">Rating:</label>
        <input type="number" v-model="newComment.rating" id="rating" class="form-control" min="1" max="5" required>
      </div>
      <div class="form-group">
        <label for="message">Comment:</label>
        <textarea v-model="newComment.message" id="message" class="form-control" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Add Comment</button>
    </form>
    <div v-for="(comment, index) in paginatedComments" :key="index" class="comment-item">
      <h4>{{ comment.name }}</h4>
      <div>
        <span v-for="(filled, index) in getStars(comment.rating)" :key="index">
          <svg v-if="filled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="14px" height="14px">
            <path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="14px" height="14px">
            <path fill="currentColor" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.3-124.1-65.3-124.1 65.3 23.7-138.3-100.6-98 139-20.2 62.1-126 62.1 126 139 20.2-100.6 98z"></path>
          </svg>
        </span>
      </div>
      <p>{{ comment.date }}</p>
      <p>{{ comment.message }}</p>
    </div>
    <div class="pagination">
      <nav aria-label="Page navigation">
        <ul class="pagination pagination-sm">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="prevPage">Previous</a>
          </li>
          <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
            <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comments: [
        { name: 'John Doe', rating: 7, date: '2023-01-01', message: 'Great product!' },
        { name: 'John Doe', rating: 6, date: '2023-01-01', message: 'Great product!' },
        { name: 'John Doe', rating: 5, date: '2023-01-01', message: 'Great product!' },
        { name: 'Jane Smith', rating: 4, date: '2023-01-02', message: 'Very good!' },
        { name: 'Alice Johnson', rating: 3, date: '2023-01-03', message: 'It\'s okay.' },
        { name: 'Bob Brown', rating: 2, date: '2023-01-04', message: 'Not great.' },
        { name: 'Charlie Davis', rating: 1, date: '2023-01-05', message: 'Terrible!' }
      ],
      newComment: {
        name: '',
        rating: null,
        message: ''
      },
      showForm: false,
      currentPage: 1,
      commentsPerPage: 4
    };
  },
  computed: {
    paginatedComments() {
      const start = (this.currentPage - 1) * this.commentsPerPage;
      const end = start + this.commentsPerPage;
      return this.comments.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.comments.length / this.commentsPerPage);
    }
  },
  methods: {
    getStars(rating) {
      return Array.from({ length: 5 }, (_, index) => index < rating);
    },
    addComment() {
      this.comments.push({
        ...this.newComment,
        date: new Date().toISOString().split('T')[0]
      });
      this.newComment.name = '';
      this.newComment.rating = null;
      this.newComment.message = '';
      this.showForm = false;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    }
  }
};
</script>

<style scoped>
.comment-item {
  margin-bottom: 20px;
}
.pagination {
  display: flex;

  align-items: left;
  margin-bottom: 20px;
}
.page-item.disabled .page-link {
  pointer-events: none;
  cursor: default;
}
.page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
}
.comment-item svg {
  color: gold;
}
</style>