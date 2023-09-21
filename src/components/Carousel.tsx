import { useState } from 'react';

const IMAGE_1_URL = 'https://picsum.photos/id/29/1000/800';
const IMAGE_2_URL = 'https://picsum.photos/id/49/1000/800';
const IMAGE_3_URL = 'https://picsum.photos/id/59/1000/800';

export default function Carousel() {
  const [activeImage, setActiveImage] = useState(1);

  return (
    <>
      <section className="carousel">
        <ul className="carousel__slides">
          <input
            type="radio"
            name="radio-buttons"
            id="img-1"
            checked={activeImage === 1}
            readOnly
          />
          <li className="carousel__slide-container">
            <div className="carousel__slide-img">
              <img src={IMAGE_1_URL} alt="scenery 1" />
            </div>
            <div className="carousel__controls">
              <button
                onClick={() => setActiveImage(3)}
                className="carousel__slide-prev"
              >
                <span>&lsaquo;</span>
              </button>
              <button
                onClick={() => setActiveImage(2)}
                className="carousel__slide-next"
              >
                <span>&rsaquo;</span>
              </button>
            </div>
          </li>
          <input
            type="radio"
            name="radio-buttons"
            id="img-2"
            checked={activeImage === 2}
            readOnly
          />
          <li className="carousel__slide-container">
            <div className="carousel__slide-img">
              <img src={IMAGE_2_URL} alt="scenery 2" />
            </div>
            <div className="carousel__controls">
              <button
                onClick={() => setActiveImage(1)}
                className="carousel__slide-prev"
              >
                <span>&lsaquo;</span>
              </button>
              <button
                onClick={() => setActiveImage(3)}
                className="carousel__slide-next"
              >
                <span>&rsaquo;</span>
              </button>
            </div>
          </li>
          <input
            type="radio"
            name="radio-buttons"
            id="img-3"
            checked={activeImage === 3}
            readOnly
          />
          <li className="carousel__slide-container">
            <div className="carousel__slide-img">
              <img src={IMAGE_3_URL} alt="scenery 3" />
            </div>
            <div className="carousel__controls">
              <button
                onClick={() => setActiveImage(2)}
                className="carousel__slide-prev"
              >
                <span>&lsaquo;</span>
              </button>
              <button
                onClick={() => setActiveImage(1)}
                className="carousel__slide-next"
              >
                <span>&rsaquo;</span>
              </button>
            </div>
          </li>
          <div className="carousel__dots">
            <button
              onClick={() => setActiveImage(1)}
              className="carousel__dot"
              id="img-dot-1"
            />
            <button
              onClick={() => setActiveImage(2)}
              className="carousel__dot"
              id="img-dot-2"
            />
            <button
              onClick={() => setActiveImage(3)}
              className="carousel__dot"
              id="img-dot-3"
            />
          </div>
        </ul>
      </section>
    </>
  );
}
