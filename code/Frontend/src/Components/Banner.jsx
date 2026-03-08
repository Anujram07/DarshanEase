import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Banner = () => {

  const settings = {
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false
  };

  return (
    <div className="mt-6 flex flex-col items-center px-4">

      {/* Slider Section */}
      <div className="w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl">
        <Slider {...settings}>

          {/* Slide 1 */}
          <div className="relative group">
            <img
              src="https://www.oyorooms.com/blog/wp-content/uploads/2017/10/Feature-Image-min-2-1.jpg"
              alt="First slide"
              className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h2 className="text-white text-3xl md:text-4xl font-bold text-center">
                Experience Divine Darshan
              </h2>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="relative group">
            <img
              src="https://d2al04l58v9bun.cloudfront.net/blog/wp-content/uploads/2022/07/20122054/Indian-Temple-Architecture-With-The-Most-Amazing-Stories.jpg"
              alt="Second slide"
              className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h2 className="text-white text-3xl md:text-4xl font-bold">
                Book Temple Darshan Online
              </h2>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="relative group">
            <img
              src="https://blogs.revv.co.in/blogs/wp-content/uploads/2020/11/Somnath-Temple.jpg"
              alt="Third slide"
              className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h2 className="text-white text-3xl md:text-4xl font-bold">
                Avoid Long Temple Queues
              </h2>
            </div>
          </div>

          {/* Slide 4 */}
          <div className="relative group">
            <img
              src="https://img.veenaworld.com/wp-content/uploads/2021/02/10-Famous-South-Indian-Temples-You-Should-Not-Miss.jpg"
              alt="Fourth slide"
              className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h2 className="text-white text-3xl md:text-4xl font-bold">
                Safe & Easy Darshan Booking
              </h2>
            </div>
          </div>

        </Slider>
      </div>

      {/* Marquee Section */}
      <div className="w-full max-w-6xl bg-gradient-to-r from-blue-300 via-purple-200 to-green-300 mt-6 py-3 rounded-lg shadow-lg">
        <div className="overflow-hidden whitespace-nowrap">
          <p className="animate-[marquee_18s_linear_infinite] text-gray-800 font-semibold text-lg px-4">
            🙏 Book your tickets for Temple Darshan now! Limited slots available. Don't miss the divine experience.
          </p>
        </div>
      </div>

    </div>
  )
}

export default Banner