import "./ImageModal.css";

const ImageModal = (props) => {  
  return (
    <div id="image--modal-id" className="image--modal">
      <span onClick={()=>props.setImageModalVisibility(false)} className="close--image-modal">&times;</span>
      <img loading="lazy" className="image-modal--content" id="img01" src={props.src} alt="model"/>
      <div id="caption"></div>
    </div>
  );
};

export default ImageModal;
