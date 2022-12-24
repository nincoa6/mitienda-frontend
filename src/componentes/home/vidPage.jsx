const VidPage = () => {
  return (
    <div className="row m-0 row-cols-1 row-cols-md-2 g-2">
      <div className="col">
        <div class="ratio ratio-16x9">
          <iframe
            src="https://www.youtube.com/embed/Snwx1dzWScw"
            title="YouTube video"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <div className="col">
        <div class="ratio ratio-16x9">
          <iframe
            src="https://www.youtube.com/embed/cXuZTbHMt9A"
            title="YouTube video"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  )
}
export default VidPage