import { useEffect } from "react";

const HomeLanding = () => {
  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player("youtube-player", {
        videoId: "Yi5PBAh2KPw",
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: "Yi5PBAh2KPw",
          controls: 0,
          showinfo: 0,
          rel: 0,
          mute: 1,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
            event.target.setPlaybackQuality("hd1080");
          },
        },
      });
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div
          id="youtube-player"
          className="absolute w-[300%] h-[300%] -left-[100%] -top-[100%] pointer-events-none"
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-white px-4 md:px-8">
        <h1
          className="text-4xl sm:text-5xl md:text-7xl font-light tracking-[0.2em] mb-8 text-center 
                     transform transition-all duration-700 animate-fadeIn"
        >
          GOOD TIMES GREAT TASTES
        </h1>

        {/* Bottom Left - Visit Us Section */}
        <div className="absolute bottom-16 sm:bottom-20 left-4 sm:left-12 md:left-20 animate-fadeIn">
          <span className="text-xs sm:text-sm tracking-[0.3em] mb-2 sm:mb-4 block opacity-70">
            / VISIT US
          </span>
          <a
            href="https://goo.gl/maps/..."
            className="text-base sm:text-lg hover:text-gray-300 transition-colors duration-300
                     font-light tracking-wide block"
          >
            House 61, Road 1, Sector 3,
            <br />
            Uttara, Dhaka 1230
          </a>
        </div>

        {/* Bottom Right - Rotating Circle */}
        <div className="absolute bottom-16 sm:bottom-20 right-4 sm:right-12 md:right-20 hidden sm:block">
          <div className="relative w-40 h-40">
            {/* Glass Background */}
            <div className="absolute inset-0 rounded-full border border-white/30 backdrop-blur-md bg-white/10 shadow-2xl" />

            {/* Rotating Text Container */}
            <div className="absolute inset-0 rounded-full animate-spin-slow">
              {Array.from("RESERVE YOUR TABLE • ").map((char, i) => (
                <span
                  key={i}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 text-xs tracking-[0.15em] uppercase text-white/90"
                  style={{
                    transformOrigin: "0 -50px",
                    transform: `
              rotate(${i * (360 / 19)}deg)
              translateY(-50%)
            `,
                  }}
                >
                  {char}
                </span>
              ))}
            </div>

            {/* Clickable Area */}
            <a
              href="/reservations"
              className="absolute inset-0 rounded-full cursor-pointer hover:bg-white/5 transition-colors duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLanding;
