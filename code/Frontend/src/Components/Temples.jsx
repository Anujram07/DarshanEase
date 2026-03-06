import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const TempleCard = ({ imageSrc, title, description }) => {

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  return (
    <Card
      className="w-[24rem] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >

      {isHovered ? (
        <Card.Body className="flex flex-col justify-center items-center h-[200px] text-center p-4 bg-white">
          <Card.Text>
            <strong className="text-orange-500 text-lg">Advance Darshan</strong>
            <br /><br />
            <strong className="text-gray-800">{title}</strong>
            <br /><br />
            <p className="text-gray-600">{description}</p>
          </Card.Text>
        </Card.Body>
      ) : (
        <div className="overflow-hidden">
          <Card.Img
            variant="top"
            src={imageSrc}
            alt={title}
            className="w-full h-[200px] object-cover hover:scale-105 transition duration-500"
          />
        </div>
      )}

    </Card>
  );
};

const Temples = () => {

  return (

    <div
      id="temples"
      className="bg-gray-100 py-10"
    >

      <h1 className="text-center text-4xl font-bold text-orange-600 mb-10">
        Temples
      </h1>

      <Link to="/ulogin" className="no-underline">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">

          <TempleCard
            imageSrc="https://d3k1i85mml78tf.cloudfront.net/Blogs/1677258515580_post_image_1.jpg"
            title="Shri Thakur Banke Bihari Ji Mandir"
            description="Click here to Register Shri Thakur Banke Bihari Ji Mandir Online Darshan Booking"
          />

          <TempleCard
            imageSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Shiv_khori_2.jpg/1200px-Shiv_khori_2.jpg"
            title="Shiv Khori Mandir"
            description="Click here to Register Shiv Khori Mandir Online Darshan Booking"
          />

          <TempleCard
            imageSrc="https://upload.wikimedia.org/wikipedia/commons/4/4e/Tirumala_090615.jpg"
            title="Tirupati Tirumala Temple"
            description="Click here to Register Tirupati Tirumala Temple Online Darshan Booking"
          />

          <TempleCard
            imageSrc="https://imageio.forbes.com/blogs-images/jimdobson/files/2016/05/Sree_Padmanabhaswamy_Temple.jpg?height=459&width=711&fit=bounds"
            title="Padmanabaswamy Temple"
            description="Click here to Register Padmanabaswamy Temple Online Darshan Booking"
          />

          <TempleCard
            imageSrc="https://upload.wikimedia.org/wikipedia/commons/e/e4/Sai_baba_samadhi_mandir_.jpg"
            title="Shirdi Sai Baba Mandir"
            description="Click here to Register Shirdi Sai Baba Mandir Online Darshan Booking"
          />

          <TempleCard
            imageSrc="https://upload.wikimedia.org/wikipedia/commons/9/94/The_Golden_Temple_of_Amrithsar_7.jpg"
            title="Golden Temple"
            description="Click here to Register Golden Temple Online Darshan Booking"
          />

        </div>

      </Link>

    </div>
  )
}

export default Temples