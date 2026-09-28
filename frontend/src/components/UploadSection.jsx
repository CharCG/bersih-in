import { useState, useRef } from 'react';
import axios from 'axios';
import imgUpload from '../assets/icon-upload.png';

const apiBaseUrl = import.meta.env.VITE_API_URL.replace(/\/$/, '');
const classifyApiUrl = `${apiBaseUrl}/classify`;

const UploadSection = () => {
  const [inputType, setInputType] = useState('drag');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [preview, setPreview] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [urlError, setUrlError] = useState('');
  const fileInputRef = useRef();
  const videoRef = useRef();
  const [cameraActive, setCameraActive] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImageUrl('');
    setPreview(file ? URL.createObjectURL(file) : '');
    setResult(null);
  };

  const handleUrlChange = (e) => {
    const value = e.target.value.trim();
    setImageUrl(value);
    setImageFile(null);
    setResult(null);
    setUrlError('');
    setPreview('');

    if (!value) return;

    try {
      new URL(value);
      setPreview(value);
    } catch {
      setUrlError('URL is not valid');
    }
  };

  const createFormData = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return formData;
  };

  const handleClassify = async () => {
    setLoading(true);
    setResult(null);
    try {
      let response;
      if (inputType === 'drag' && imageFile) {
        response = await axios.post(classifyApiUrl, createFormData(imageFile));
      } else if (inputType === 'url' && imageUrl) {
        response = await axios.post(classifyApiUrl, { url: imageUrl });
      } else if (inputType === 'camera' && preview) {
        const blob = await fetch(preview).then(r => r.blob());
        const file = new File([blob], 'image_from_camera.png', { type: blob.type });
        response = await axios.post(classifyApiUrl, createFormData(file));
      };
      if (response) setResult(response.data);
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    };
  };

  const handleOpenCamera = async () => {
    setCameraActive(true);
    setPreview('');
    setImageFile(null);
    setImageUrl('');
    setResult(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } else {
        setCameraActive(false);
        setResult({ error: 'Camera is not supported in this browser.' });
      }
    } catch (err) {
      setCameraActive(false);
      setResult({ error: 'Unable to access camera: ' + (err && err.message ? err.message : 'Unknown error') });
    }
  };

  const handleCapture = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas.getContext('2d').drawImage(video, 0, 0);

    canvas.toBlob(blob => {
      setPreview(URL.createObjectURL(blob));
      setCameraActive(false);
    }, 'image/png');

    const stream = video.srcObject;
    stream?.getTracks().forEach(t => t.stop());
  };

  const handleInputTypeChange = (e) => {
    const value = e.target.value;
    setInputType(value);
    if (value !== 'camera') {
      setCameraActive(false);
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach(t => t.stop());
        videoRef.current.srcObject = null;
      }
    }
  };

  return (
    <div className='upload-section' id='upload-section'>
      <div className='input-type-dropdown'>
        <h3 className='upload-section-heading'>
          Try <span className='upload-section-heading-green'>Bersih.In</span>, Now.
        </h3>
        <select
          id='inputType'
          value={inputType}
          onChange={handleInputTypeChange}
          className='upload-section-select'
        >
          <option value='drag'>Browse File</option>
          <option value='url'>Import URL</option>
          <option value='camera'>Camera</option>
        </select>
      </div>

      {inputType === 'drag' && (
        <div className='upload-box-container'>
          <input
            type='file'
            accept='image/*'
            className='file-input-hidden'
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <label className='upload-label' onClick={() => fileInputRef.current.click()}>
            <img src={imgUpload} alt='Upload' className='upload-icon' />
            <span className='upload-text'>Drag and drop your image here, or <span className='browse-file'>browse file</span></span>
            <span className='supported-text'>Supported formats: PNG, JPG, JPEG (max. 25 MB)</span>
          </label>
        </div>
      )}

      {inputType === 'url' && (
        <div className='url-import-container'>
          <div className='url-input-wrapper'>
            <input
              type='text'
              className='url-input'
              placeholder='Add Image URL'
              value={imageUrl}
              onChange={handleUrlChange}
            />
          </div>
          {urlError && <div className='result-error'>{urlError}</div>}
        </div>
      )}

      {inputType === 'camera' && (
        <div className='camera-container'>
          {cameraActive ? (
            <>
              <video ref={videoRef} width='720' height='540' autoPlay />
              <div className='camera-btn-row'>
                <button className='btn-capture' onClick={handleCapture}></button>
              </div>
            </>
          ) : (
            <div className='camera-btn-row'>
              <button className='btn-open-camera' onClick={handleOpenCamera}>Open Camera</button>
            </div>
          )}
        </div>
      )}

      {preview && !urlError && (
        <div className='upload-preview'>
          <img src={preview} alt='Preview' className='preview-image' />
        </div>
      )}
      <button
        className='btn-classify'
        onClick={handleClassify}
        disabled={loading || (inputType === 'drag' && !imageFile) || (inputType === 'url' && !imageUrl) || (inputType === 'camera' && !preview)}
      >
        {loading ? 'Classifying...' : 'Classify'}
      </button>
      {result && (
        <div className='result-section'>
          <h3 className='result-title'>Result</h3>
          <div className='result-content'>
            {result.error ? (
              <div className='result-error'>{result.error}</div>
            ) : (
              result.data && (
                <div className='result-tables-row'>
                  <table className='result-table'>
                    <tbody>
                      <tr>
                        <th>Prediction</th>
                        <td>{result.data.prediction.charAt(0).toUpperCase() + result.data.prediction.slice(1)}</td>
                      </tr>
                      <tr>
                        <th>Confidence</th>
                        <td>{result.data.confidence}%</td>
                      </tr>
                      {result.data.metadata && result.data.metadata.metrics && <>
                        <tr>
                          <th>Estimated Decomposition Time</th>
                          <td>{
                            result.data.metadata.metrics.estimated_decomposition_time == null
                              ? `N/A`
                              : result.data.metadata.metrics.estimated_decomposition_time
                          }</td>
                        </tr>
                        <tr>
                          <th>Estimated CO₂ Emissions</th>
                          <td>{
                            result.data.metadata.metrics.estimated_co2_emissions == null
                              ? `N/A`
                              : result.data.metadata.metrics.estimated_co2_emissions
                          }</td>
                        </tr>
                        <tr>
                          <th>Estimated Water Footprint</th>
                          <td>{
                            result.data.metadata.metrics.estimated_water_footprint == null
                              ? `N/A`
                              : result.data.metadata.metrics.estimated_water_footprint
                          }</td>
                        </tr>
                        <tr>
                          <th>Estimated Energy Embodied</th>
                          <td>{
                            result.data.metadata.metrics.estimated_energy_embodied == null
                              ? `N/A`
                              : result.data.metadata.metrics.estimated_energy_embodied
                          }</td>
                        </tr>
                      </>}
                    </tbody>
                  </table>
                  {result.data.metadata && result.data.metadata.properties && (
                    <table className='result-table'>
                      <tbody>
                        <tr>
                          <th>Organic</th>
                          <td>{
                            result.data.metadata.properties.is_organic == null
                              ? `N/A`
                              : (typeof result.data.metadata.properties.is_organic == 'boolean'
                                ? (result.data.metadata.properties.is_organic ? 'Yes' : 'No')
                                : result.data.metadata.properties.is_organic)
                          }</td>
                        </tr>
                        <tr>
                          <th>Recyclable</th>
                          <td>{
                            result.data.metadata.properties.is_recyclable == null
                              ? `N/A`
                              : (typeof result.data.metadata.properties.is_recyclable == 'boolean'
                                ? (result.data.metadata.properties.is_recyclable ? 'Yes' : 'No')
                                : result.data.metadata.properties.is_recyclable)
                          }</td>
                        </tr>
                        <tr>
                          <th>Compostable</th>
                          <td>{
                            result.data.metadata.properties.is_compostable == null
                              ? `N/A`
                              : (typeof result.data.metadata.properties.is_compostable == 'boolean'
                                ? (result.data.metadata.properties.is_compostable ? 'Yes' : 'No')
                                : result.data.metadata.properties.is_compostable)
                          }</td>
                        </tr>
                        <tr>
                          <th>Hazardous</th>
                          <td>{
                            result.data.metadata.properties.is_hazardous == null
                              ? `N/A`
                              : (typeof result.data.metadata.properties.is_hazardous == 'boolean'
                                ? (result.data.metadata.properties.is_hazardous ? 'Yes' : 'No')
                                : result.data.metadata.properties.is_hazardous)
                          }</td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadSection;
