import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

const Registrations = () => {
  const navigate = useNavigate();

  const handleItems = () => {
    navigate('/items');
  };

  // カメラ機能追加
  const productWebcamRef = useRef(null);
  const warrantyWebcamRef = useRef(null);
  const [productImgSrc, setProductImgSrc] = useState(null);
  const [warrantyImgSrc, setWarrantyImgSrc] = useState(null);
  const [showProductCamera, setShowProductCamera] = useState(false);
  const [showWarrantyCamera, setShowWarrantyCamera] = useState(false);

  const capture = (webcamRef, setImgSrc, setShowCamera) => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    console.log('imageSrc', imageSrc);
    setShowCamera(false);
  };

  return (
    <div className="registration__container">
      <div className="items__header">
        <button className="items__btn" onClick={handleItems}>
          戻る
        </button>
      </div>
      <div className="registration__box">
        <p className="login__input-title">商品名</p>
        <input className="login__input" type="text" placeholder="例）冷蔵庫" />
        <p className="login__input-title">購入日</p>
        <input className="login__input" type="date" placeholder="yyyy/mm/dd" />
        <p className="login__input-title">保証期間</p>
        <input className="login__input" type="number" placeholder="例）３" />
        <select name="unit" className="login__input">
          <option>年</option>
          <option>月</option>
        </select>
        <p className="login__input-title">購入先</p>
        <input className="login__input" type="text" placeholder="例）エディオン本店" />

        <p className="login__input-title">商品写真</p>
        {productImgSrc && !showProductCamera && <div>撮影した画像</div>}
        {showProductCamera && <Webcam audio={false} ref={productWebcamRef} screenshotFormat="image/jpeg" />}
        {productImgSrc && !showProductCamera && <img src={productImgSrc} alt="Captured" />}
        {!showProductCamera && <button onClick={() => setShowProductCamera(true)}>商品の写真を撮る</button>}
        {showProductCamera && <button onClick={() => capture(productWebcamRef, setProductImgSrc, setShowProductCamera)}>撮影</button>}

        <p className="login__input-title">保証書写真</p>
        {warrantyImgSrc && !showWarrantyCamera && <div>撮影した画像</div>}
        {showWarrantyCamera && <Webcam audio={false} ref={warrantyWebcamRef} screenshotFormat="image/jpeg" />}
        {warrantyImgSrc && !showWarrantyCamera && <img src={warrantyImgSrc} alt="Captured" />}
        {!showWarrantyCamera && <button onClick={() => setShowWarrantyCamera(true)}>保証書の写真を撮る</button>}
        {showWarrantyCamera && <button onClick={() => capture(warrantyWebcamRef, setWarrantyImgSrc, setShowWarrantyCamera)}>撮影</button>}
      </div>
      <div className="registration__footer">
        <button className="items__btn" onClick={() => alert('保存しました！')}>
          上記の内容で保存する
        </button>
      </div>
    </div>
  );
};

export default Registrations;
