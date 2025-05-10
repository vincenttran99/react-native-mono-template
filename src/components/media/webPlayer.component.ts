export default (videoId: string) => `
<!DOCTYPE html>
<html style="height: 100%; width: 100%; padding: 0; margin:0;">
  <head>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1"
    />
    <style>
      html,
      body {
        overflow-x: hidden;
        overflow-y: hidden;
        padding: 0;
        margin: 0;
      }
      body {
        position: relative;
        padding: 0;
        margin: 0;
        background-color: black;
      }
    </style>
  </head>
  <body>
    <script
      src="https://fast.wistia.com/embed/medias/${videoId}.jsonp"
      async
    ></script>
    <script
      src="https://fast.wistia.com/assets/external/E-v1.js"
      async
    ></script>
    <div
      class="wistia_responsive_padding"
      style="padding:100% 0 0 0;position:relative;"
    >
      <div
        class="wistia_responsive_wrapper"
        style="height:100%;left:0;position:absolute;top:0;width:100%;"
      >
        <div
          class="wistia_embed wistia_async_${videoId} seo=false videoFoam=true"
          style="height:100%;position:relative;width:100%"
        >
          <div
            class="wistia_swatch"
            style="height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;"
          >
            <img
              src="https://fast.wistia.com/embed/medias/${videoId}/swatch"
              style="filter:blur(5px);height:100%;object-fit:contain;width:100%;"
              alt=""
              onload="this.parentNode.style.opacity=1;"
            />
          </div>
        </div>
      </div>
    </div>
    <script>
      window._wq = window._wq || [];
      _wq.push({
        id: "${videoId}",
        onReady: function(video) {
          document.addEventListener("message", function(data) {
            let command = data.data;
            let speed = 1;
            if (command.includes("speed")) {
              speed = Number(command.split(":")[1]) || 1;
              command = "speed";
            }

            switch (command) {
              case "play":
                video.play();
                break;
              case "pause":
                video.pause();
                break;
              case "speed":
                video.playbackRate(speed);
                break;
            }
          });
        }
      });
    </script>
  </body>
</html>
`;
