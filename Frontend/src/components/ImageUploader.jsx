function ImageUploader({ setImage }) {

  return (
    <div>

      <input
        type="file"
        className="form-control"
        onChange={(e) =>
          setImage(e.target.files[0])
        }
      />

    </div>
  );
}

export default ImageUploader;