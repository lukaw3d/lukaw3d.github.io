# Bookmarklet to select a region of a webpage and view it in picture-in-picture mode

Lets you use picture-in-picture mode to
- view multiple videos playing in a tab (e.g. Google Meet)
- or view a smaller part of a video
- or view non-video content like a live chatbox

```js
javascript:
/* select a region of a webpage and view it in picture-in-picture mode */;
/* based on https://developer.chrome.com/docs/web-platform/region-capture#demo */;
(async () => {;
  const cropArea = document.createElement('div');
  cropArea.style.position = "fixed";
  cropArea.style.top = "50px";
  cropArea.style.left = "50px";
  cropArea.style.height = "300px";
  cropArea.style.width = "300px";
  cropArea.style.cursor = "move";
  cropArea.style.zIndex = "99999999999999999999999";
  cropArea.style.outline = "4px solid deeppink";
  cropArea.style.userSelect = "none";
  cropArea.style.resize = "both";
  cropArea.style.overflow = "auto";
  document.body.appendChild(cropArea);
;
  cropArea.onpointerdown = (e) => {;
  video.requestPictureInPicture();
    let pos1, pos2, pos3, pos4;
    pos3 = e.pageX;
    pos4 = e.pageY;
;
    if (pos3 - cropArea.offsetWidth - cropArea.offsetLeft > -20 && pos4 - cropArea.offsetHeight - cropArea.offsetTop > -20) {
      /* Allow resize. */;
      return;
    }
;
    document.onpointermove = (e) => {;
      pos1 = pos3 - e.pageX;
      pos2 = pos4 - e.pageY;
      pos3 = e.pageX;
      pos4 = e.pageY;
      cropArea.style.top = cropArea.offsetTop - pos2 + "px";
      cropArea.style.left = cropArea.offsetLeft - pos1 + "px";
    };
    document.onpointerup = () => {;
      document.onpointerup = null;
      document.onpointermove = null;
    };
  };
  const cropTarget = await CropTarget.fromElement(cropArea);
;
  const stream = await navigator.mediaDevices.getDisplayMedia({ preferCurrentTab: true });
  const [videoTrack] = stream.getVideoTracks();
  await videoTrack.cropTo(cropTarget);
;
  const video = document.createElement('video');
  video.autoplay = true;
  video.playsinline = true;
  video.srcObject = stream;
  /* document.body.appendChild(video); */;
})();
```
