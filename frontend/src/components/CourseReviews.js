import React, { useState, useEffect } from "react";
import { List, Form, Input, Button, Rate, message } from "antd";
import axios from "axios";

const { TextArea } = Input;

const CourseReviews = ({ courseId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0); // Rating state
  const [loading, setLoading] = useState(false);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/course/${courseId}/review/`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        message.error("Không thể tải đánh giá. Vui lòng thử lại!");
      }
    };

    fetchReviews();
  }, [courseId]);

  // Handle review submission
  const handleReviewSubmit = async () => {
    if (!newReview || newRating === 0) {
      message.error("Vui lòng nhập nội dung đánh giá và chọn số sao!");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      message.error("Bạn cần đăng nhập để gửi đánh giá.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/course/${courseId}/review/`,
        { rating: newRating, review: newReview }, // Send rating and review
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setReviews([...reviews, response.data]); // Update review list
      setNewReview("");
      setNewRating(0); // Reset rating
      message.success("Gửi đánh giá thành công!");
    } catch (error) {
      console.error("Error submitting review:", error);
      message.error(
        error.response?.data?.error || "Không thể gửi đánh giá. Vui lòng thử lại!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "24px" }}>
      <h2>Đánh giá từ người dùng</h2>
      <List
        itemLayout="horizontal"
        dataSource={reviews}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <>
                  <strong>Người dùng {item.user_id}</strong> {/* Displaying user ID */}
                  <Rate disabled defaultValue={item.rating} style={{ marginLeft: 8 }} />
                </>
              }
              description={item.review || "Không có nhận xét."}
            />
            <div>{new Date(item.review_date).toLocaleDateString()}</div>
          </List.Item>
        )}
      />

      <h3>Viết đánh giá của bạn</h3>
      <Form onFinish={handleReviewSubmit}>
        <Form.Item>
          <Rate
            value={newRating}
            onChange={(value) => setNewRating(value)}
            style={{ marginBottom: 8 }}
          />
        </Form.Item>
        <Form.Item>
          <TextArea
            rows={4}
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Nhập đánh giá của bạn..."
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Gửi đánh giá
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CourseReviews;
