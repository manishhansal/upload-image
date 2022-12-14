import "./styles.css";
import react, { useState } from "react";
import { ImUpload } from "react-icons/im";

export default function App() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const validateImg = (e) => {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Max file size is 1MB.");
    } else {
      const formData = new FormData();
      //FILE INFO NAME WILL BE "my-image-file"
      formData.append(
        "my-image-file",
        e.target.files[0],
        e.target.files[0].name
      );
      setImage(formData);
      // setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = () => {
    console.log("image", image);
    const payloadjson = JSON.stringify(image);
    console.log("payload", payloadjson);
    fetch(`http://localhost:9110/upload-image`, {
      method: "POST",
      body: image,
      headers: {
        "content-type": "application/json"
      }
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <h1>Upload image to mongodb</h1>
      <div>
        <label htmlFor="image-upload">
          <ImUpload
            style={{
              color: "var(--fundu_color)",
              marginLeft: "6px",
              marginRight: "3px",
              fontSize: "25px",
              marginTop: "3px"
            }}
          />
          <p style={{ marginTop: "5px" }}>Upload profile picture</p>
        </label>
        <input
          type="file"
          id="image-upload"
          hidden
          accept="image/png, image/jpeg"
          onChange={validateImg}
        />
      </div>
      <h4>Image preview</h4>
      {imagePreview && <img src={imagePreview} alt="preview" width="200px" />}
      <br />
      {imagePreview && (
        <div>
          <button onClick={() => setImagePreview(null)}>Clear</button>
          <button onClick={uploadImage}>Upload</button>
        </div>
      )}
    </div>
  );
}
