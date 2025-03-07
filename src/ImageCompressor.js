import Swal from "sweetalert2";

export const handleImage = (event, setPhoto, setImgFile) => {
  console.log(event);
  setImgFile(null);
  const file = event.target.files[0];
  // console.log('Before compression', file.size)
  let splitfile = file.name;
  let extension = splitfile.split('.').pop();
  if(extension === 'png' || extension === 'PNG' || extension === 'jpg' || extension === 'JPG' || extension === 'jpeg' || extension === 'JPEG') {
      console.log('valid file');
      var reader = new FileReader();
      if(event.target.files[0]){
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = (e)=>{
              setPhoto(e.target.result);
          }
          compressImg(event.target.files[0]).then(img => {
              setImgFile(img);
              // console.log('After compression', img.size)
          });
      }
  }else{
      Swal.fire({
          text: 'Invalid file format. Only .png, .jpg files are allowed',
          icon: 'warning',
          heightAuto: false
      })
      return
  }
}

export const compressImg = async (file) => {
  const imageType = file.type;
  const reader = new FileReader();
  reader.readAsDataURL(file);

  return new Promise((resolve, reject) => {
    // This event is triggered each time the reading operation is successfully completed.
    reader.onload = (ev) => {
      // Create an html image element
      const img = createImage(ev);
      // Fires immediately after the browser loads the object
      img.onload = () => {
        const elem = document.createElement('canvas');
        // resize width, height
        const ratio = Math.min(256 / img.width, 256 / img.height);
        elem.width = img.width * ratio;
        elem.height = img.height * ratio;
        const ctx = elem.getContext('2d');
        ctx.drawImage(img, 0, 0, elem.width, elem.height);
        ctx.canvas.toBlob(
          // callback, called when blob created
          (blob) => {
            const compressedFile = new File([blob], file.name, {
              type: imageType,
              lastModified: Date.now(),
            })
            resolve(compressedFile);
          },
          imageType
        );
      };
    };

    reader.onerror = (error) => reject(error);
  });
}

const createImage = (ev) => {
  let imageContent = ev.target.result;
  const img = new Image();
  img.src = imageContent;
  return img;
}