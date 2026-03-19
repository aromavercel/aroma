"use client";
const reviews = [
  {
    id: 1,
    name: "Emily R.",
    date: "Mar 3rd, 2025",
    avatar: "/images/avatar/blog-author-1.jpg",
    rating: 4,
    comment:
      "Absolutely stunning! I bought a gold necklace from here, and the quality exceeded my expectations. The craftsmanship is top-notch, and the packaging was beautiful. Will definitely return for more!",
  },
  {
    id: 2,
    name: "James L.",
    date: "Mar 3rd, 2025",
    avatar: "/images/avatar/blog-author-2.jpg",
    rating: 5,
    comment:
      "I purchased an engagement ring, and my fiancée loves it! The diamonds sparkle beautifully, and the staff was incredibly helpful in guiding me through the selection process. Highly recommend!",
  },
  {
    id: 3,
    name: "Sophia M.",
    date: "Mar 3rd, 2025",
    avatar: "/images/avatar/blog-author-3.jpg",
    rating: 5,
    comment:
      "This jewelry shop is my go-to! The designs are elegant, and the prices are reasonable for the quality you get. I recently got a pair of silver earrings, and they are just perfect. Amazing service too!",
  },
];

export default function Reviews() {
  return (
    <>
      <div className="review-heading">
        <h6 className="title">Customer review</h6>
        <div className="box-rate-review">
          <div className="rating-summary">
            <ul className="list-star">
              <li>
                <i className="icon icon-star" />
              </li>
              <li>
                <i className="icon icon-star" />
              </li>
              <li>
                <i className="icon icon-star" />
              </li>
              <li>
                <i className="icon icon-star" />
              </li>
              <li>
                <i className="icon icon-star" />
              </li>
              <li>
                <span className="count-star text-md">(3)</span>
              </li>
            </ul>
            <span className="text-md rating-average">4.5/5.0</span>
          </div>
          <div className="rating-breakdown">
            <div className="rating-breakdown-item">
              <div className="rating-score">
                5 <i className="icon icon-star" />
              </div>
              <div className="rating-bar">
                <div className="value" style={{ width: "100%" }} />
              </div>
              <span className="rating-count">10</span>
            </div>
            <div className="rating-breakdown-item">
              <div className="rating-score">
                4 <i className="icon icon-star" />
              </div>
              <div className="rating-bar">
                <div className="value" style={{ width: "50%" }} />
              </div>
              <span className="rating-count">5</span>
            </div>
            <div className="rating-breakdown-item">
              <div className="rating-score">
                3 <i className="icon icon-star" />
              </div>
              <div className="rating-bar">
                <div className="value" style={{ width: "0%" }} />
              </div>
              <span className="rating-count">3</span>
            </div>
            <div className="rating-breakdown-item">
              <div className="rating-score">
                2 <i className="icon icon-star" />
              </div>
              <div className="rating-bar">
                <div className="value" style={{ width: "0%" }} />
              </div>
              <span className="rating-count">3</span>
            </div>
            <div className="rating-breakdown-item">
              <div className="rating-score">
                1 <i className="icon icon-star" />
              </div>
              <div className="rating-bar">
                <div className="value" style={{ width: "0%" }} />
              </div>
              <span className="rating-count">3</span>
            </div>
          </div>
        </div>
        <a href="#form-review" className="tf-btn btn-dark2 animate-btn">
          Write a review
        </a>
      </div>
      <div className="review-section">
        <ul className="review-list">
          {reviews.map((review) => (
            <li className="review-item" key={review.id}>
              <div className="review-avt">
                <img alt="avt" src={review.avatar} width={100} height={100} />
              </div>
              <div className="review-content">
                <div className="review-info">
                  <div className="review-meta">
                    <span className="review-author fw-medium text-md">
                      {review.name}
                    </span>
                    <span className="review-date text-sm">{review.date}</span>
                  </div>
                  <div
                    className={`list-star ${
                      review.rating === 4 ? "star-4" : ""
                    }`}
                  >
                    {[...Array(5)].map((_, index) => (
                      <i className="icon icon-star" key={index} />
                    ))}
                  </div>
                </div>
                <p className="text text-sm text-main-4">{review.comment}</p>
              </div>
            </li>
          ))}
        </ul>
        <form
          id="form-review"
          onSubmit={(e) => e.preventDefault()}
          className="form-review"
        >
          <h6 className="title">Write a review</h6>
          <p className="note text-md text-main-4">
            Your email address will not be published.&nbsp;Required fields are
            marked&nbsp;*
          </p>
          <div className="box-rating">
            <span className="text-md">Your rating *</span>
            <div className="list-rating-check">
              <input type="radio" id="star5" name="rate" defaultValue={5} />
              <label htmlFor="star5" title="text" />
              <input type="radio" id="star4" name="rate" defaultValue={4} />
              <label htmlFor="star4" title="text" />
              <input type="radio" id="star3" name="rate" defaultValue={3} />
              <label htmlFor="star3" title="text" />
              <input type="radio" id="star2" name="rate" defaultValue={2} />
              <label htmlFor="star2" title="text" />
              <input type="radio" id="star1" name="rate" defaultValue={1} />
              <label htmlFor="star1" title="text" />
            </div>
          </div>
          <div className="group-2-ip">
            <input type="text" className="" placeholder="Name *" />
            <input type="email" className="" placeholder="Email *" />
          </div>
          <textarea
            name="note"
            id="note"
            placeholder="Your review *"
            defaultValue={""}
          />
          <div className="check-save">
            <input type="checkbox" className="tf-check" id="checksave" />
            <label htmlFor="checksave" className="label text-md">
              Save my name, email, and website in this browser for the next time
              I comment.
            </label>
          </div>
          <button type="submit" className="tf-btn animate-btn">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
