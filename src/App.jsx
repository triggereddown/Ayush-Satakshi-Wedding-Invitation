import { useState, useEffect } from 'react';
import './styles/global.css';
import { weddingConfig } from './config/weddingConfig';

// Sections
import { CoverSection }         from './components/cover/CoverSection';
import { BlessingSection }      from './components/blessing/BlessingSection';
import { NamesSection }         from './components/names/NamesSection';
import { SaveTheDateSection }   from './components/savedate/SaveTheDateSection';
import { EventsHeaderSection }  from './components/events/EventsHeaderSection';
import { HaldiCard }            from './components/events/HaldiCard';
import { MehndiCard }           from './components/events/MehndiCard';
import { SangeetCard }          from './components/events/SangeetCard';
import { WeddingCard }          from './components/events/WeddingCard';
import { WardrobeSection }      from './components/wardrobe/WardrobeSection';
import { VenueSection }         from './components/venue/VenueSection';
import { ClosingSection }       from './components/closing/ClosingSection';

const { events, wardrobe } = weddingConfig;

const haldiEvent   = events.find((e) => e.id === 'haldi');
const mehndiEvent  = events.find((e) => e.id === 'mehndi');
const sangeetEvent = events.find((e) => e.id === 'sangeet');
const weddingEvent = events.find((e) => e.id === 'wedding');

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // DevTools and right-click inspection block for code security
  useEffect(() => {
    // Only enable protection blocks in production builds (disabled during local npm run dev testing)
    if (!import.meta.env.PROD) return;

    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);

    const handleKeyDown = (e) => {
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || // Ctrl+Shift+I/J/C
        (e.ctrlKey && e.keyCode === 85) // Ctrl+U
      ) {
        e.preventDefault();
        return false;
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Debugger trap loop
    const trap = setInterval(() => {
      (function() {
        try {
          (function check(i) {
            if (("" + i / i).length !== 1 || i % 20 === 0) {
              (function() {}).constructor("debugger")();
            } else {
              debugger;
            }
            check(++i);
          })(0);
        } catch (e) {}
      })();
    }, 200);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(trap);
    };
  }, []);

  // Audio elements ref control
  useEffect(() => {
    if (isOpened) {
      const audio = document.getElementById('bg-audio');
      if (audio) {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.log('Audio autoplay blocked by browser policy:', err);
        });
      }
    }
  }, [isOpened]);

  const handleOpen = () => {
    setIsOpened(true);
  };

  const toggleAudio = () => {
    const audio = document.getElementById('bg-audio');
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className={`wedding-page ${isOpened ? 'is-page-opened' : 'is-page-locked'}`}>
      {/* Background audio track */}
      <audio src="/audio/background.mp3" preload="auto" loop id="bg-audio"></audio>

      {/* Floating mute/unmute button */}
      {isOpened && (
        <button
          type="button"
          onClick={toggleAudio}
          className="audio-toggle-btn"
          aria-label="Toggle background music"
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path><path d="M16 9a5 5 0 0 1 0 6"></path><path d="M19.364 18.364a9 9 0 0 0 0-12.728"></path></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path><line x1="22" y1="9" x2="16" y2="15"></line><line x1="16" y1="9" x2="22" y2="15"></line></svg>
          )}
        </button>
      )}

      {/* 1. Cover — envelope + YOU'RE INVITED */}
      <CoverSection config={weddingConfig} isOpened={isOpened} onOpen={handleOpen} />

      {/* Main Content Sections (Revealed after envelope is opened) */}
      <div className={`invitation-content-layer ${isOpened ? 'is-visible' : 'is-hidden'}`}>
        {/* 2. Blessing — Ganesh, shloka, couple names */}
        <BlessingSection config={weddingConfig} />

        {/* 3. Names — illustrated couple + script names */}
        <NamesSection config={weddingConfig} />

        {/* 4. Save The Date — scratch card */}
        <SaveTheDateSection config={weddingConfig} />

        {/* 5. Events Schedule header */}
        <EventsHeaderSection config={weddingConfig} />

        {/* 6. Haldi Ceremony */}
        <HaldiCard event={haldiEvent} />

        {/* 7. Mehndi Ceremony */}
        <MehndiCard event={mehndiEvent} />

        {/* 8. Sangeet Celebration */}
        <SangeetCard event={sangeetEvent} />

        {/* 9. Wedding Ceremony */}
        <WeddingCard event={weddingEvent} />

        {/* 10. Wardrobe Guide */}
        <WardrobeSection wardrobe={wardrobe} headerText={weddingConfig.wardrobeHeader} />

        {/* 11. Venue */}
        <VenueSection config={weddingConfig} />

        {/* 12. Closing */}
        <ClosingSection config={weddingConfig} />
      </div>
    </div>
  );
}

export default App;
