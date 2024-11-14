import IMG_URL from "../assets/img_1.jpg";

const HeadBod = () => {
  return (
    <div className="relative">
      {/* Background Image */}
      <img
        className="w-full h-[600px] object-cover"
        src={IMG_URL}
        alt="hb-img"
      />
      
      {/* Overlay with Text */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center h-full">
        <h1 className="text-white text-center px-8 sm:px-16 md:px-32 text-[80px] sm:text-[100px] md:text-[140px] font-extrabold italic p-4 rounded-lg">
          Zwigato it !!!
        </h1>
      </div>
    </div>
  );
};

export default HeadBod;
