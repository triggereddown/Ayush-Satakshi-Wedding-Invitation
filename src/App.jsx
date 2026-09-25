import { useState, useEffect } from 'react';
import './styles/global.css';
import { weddingConfig } from './config/weddingConfig';
import { PetalShower } from './components/shared/PetalShower';

// Sections
import { CoverSection }         from './components/cover/CoverSection';
import { BlessingSection }      from './components/blessing/BlessingSection';
import { NamesSection }         from './components/names/NamesSection';
import { SaveTheDateSection }   from './components/savedate/SaveTheDateSection';
import { EventsHeaderSection }  from './components/events/EventsHeaderSection';
import { HaldiCard }            from './components/events/HaldiCard';
import { WeddingCard }          from './components/events/WeddingCard';
import { SangeetCard }          from './components/events/SangeetCard';
import { ReceptionCard }        from './components/events/ReceptionCard';
import { VenueSection }         from './components/venue/VenueSection';
import { ClosingSection }       from './components/closing/ClosingSection';

const { events = [] } = weddingConfig;

const haldiEvent     = events.find((e) => e.id?.toLowerCase() === 'haldi');
const weddingEvent   = events.find((e) => e.id?.toLowerCase() === 'wedding');
const sangeetEvent   = events.find((e) => e.id?.toLowerCase() === 'sangeet');
const receptionEvent = events.find((e) => e.id?.toLowerCase() === 'reception');

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

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Audio elements ref control and body scroll locking
  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      const audio = document.getElementById('bg-audio');
      if (audio) {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.log('Audio autoplay blocked by browser policy:', err);
        });
      }
    } else {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
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
    <>
      {/* Background audio track */}
      <audio src="/audio/background.mp3" preload="auto" loop id="bg-audio"></audio>

      {/* Global page-wide falling petal shower — fixed, scroll-safe, pointer-events:none */}
      {isOpened && <PetalShower count={28} />}

      {/* Floating Sticky Mute/Unmute button - always stays fixed in viewport */}
      {isOpened && (
        <button
          type="button"
          onClick={toggleAudio}
          className={`audio-toggle-btn ${isPlaying ? 'is-playing' : 'is-muted'}`}
          aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
          title={isPlaying ? 'Mute Music' : 'Play Music'}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          )}
          <span className="audio-btn-ripple" aria-hidden="true" />
        </button>
      )}

      <div className={`wedding-page ${isOpened ? 'is-page-opened' : 'is-page-locked'}`}>
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

        {/* 6. Haldi Ceremony - 21st Nov Morning */}
        {haldiEvent && <HaldiCard event={haldiEvent} />}

        {/* 7. Wedding Ceremony - 21st Nov Evening */}
        {weddingEvent && <WeddingCard event={weddingEvent} />}

        {/* 8. Sangeet Celebration - 22nd Nov Evening */}
        {sangeetEvent && <SangeetCard event={sangeetEvent} />}

        {/* 9. Reception Ceremony - 23rd Nov */}
        {receptionEvent && <ReceptionCard event={receptionEvent} />}

        {/* 10. Venue */}
        <VenueSection config={weddingConfig} />

        {/* 11. Closing */}
        <ClosingSection config={weddingConfig} />
      </div>
    </div>
    </>
  );
}

export default App;
