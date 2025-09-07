

const Image = (
    { className="",src,width,height,alt=""}
) => {
  return (
    <img
    className={className}
    src={src}
    onError={(e) => {
      e.target.src = 'fallback-image.jpg';
    }}
    alt={alt}
    width={width}
    height={height}
    loading="lazy"
    style={{ borderRadius: '10px' }}
  />
  )
}

export default Image
