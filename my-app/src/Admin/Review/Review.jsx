import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AxiosClient from '../../Axios/AxiosClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'; // Import icon ngôi sao từ Font Awesome

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        AxiosClient.get(`/Reviews`)
            .then(response => {
                setReviews(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Không có dữ liệu</div>;
    }

    const renderStarIcons = (starNumber) => {
        const stars = [];
        for (let i = 0; i < starNumber; i++) {
            stars.push(<FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} key={i} />);
        }
        return stars;
    };

    return (
        <div className="container mt-4">
            <h2>Reviews</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Tên người dùng</th>
                        <th>Nội dung</th>
                        <th>Ngày đánh giá</th>
                        <th>Đánh giá( sao)</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map(review => (
                        <tr key={review.id}>
                            <td>{review.userName}</td>
                            <td>{review.content}</td>
                            <td>{review.reviewDate}</td>
                            <td>
                                {renderStarIcons(review.starNumber)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reviews;
