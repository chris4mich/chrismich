import { useCallback, useEffect, useRef, useState } from "react";

export const IDENTITY_MODE = "IDENTITY_MODE";
export const TERMINAL_MODE = "TERMINAL_MODE";
export const KONAMI_MODE = "KONAMI_MODE";
export const PROJECT_MODE = "PROJECT_MODE";
export const MOBILE_MODE = "MOBILE_MODE";

const SECRET_PHRASE = "chrismich";
const PROJECT_PHRASE = "hire christos";
const MAX_BUFFER_LENGTH = SECRET_PHRASE.length + 9;
const MODE_DURATIONS = {
  [IDENTITY_MODE]: 3500,
  [TERMINAL_MODE]: 4000,
  [KONAMI_MODE]: 4000,
  [PROJECT_MODE]: 3000,
  [MOBILE_MODE]: 3000,
};
const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

function isEditableTarget(target) {
  if (!target || !(target instanceof Element)) {
    return false;
  }

  const tagName = target.tagName.toLowerCase();

  return (
    tagName === "input" ||
    tagName === "textarea" ||
    tagName === "select" ||
    target.isContentEditable
  );
}

function isTextEntryTarget(target) {
  if (!target || !(target instanceof Element)) {
    return false;
  }

  const tagName = target.tagName.toLowerCase();

  return tagName === "input" || tagName === "textarea";
}

export function useEasterEggs() {
  const [activeMode, setActiveMode] = useState(null);
  const activeModeRef = useRef(null);
  const closeTimerRef = useRef(null);
  const phraseBufferRef = useRef("");
  const konamiIndexRef = useRef(0);
  const projectPhraseStateRef = useRef(new WeakMap());

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const deactivate = useCallback(() => {
    clearCloseTimer();
    activeModeRef.current = null;
    setActiveMode(null);
  }, [clearCloseTimer]);

  const activateMode = useCallback(
    (mode, duration) => {
      if (activeModeRef.current) {
        return;
      }

      clearCloseTimer();
      activeModeRef.current = mode;
      setActiveMode(mode);

      closeTimerRef.current = window.setTimeout(() => {
        activeModeRef.current = null;
        setActiveMode(null);
        closeTimerRef.current = null;
      }, duration);
    },
    [clearCloseTimer]
  );

  const activateIdentityMode = useCallback(() => {
    activateMode(IDENTITY_MODE, MODE_DURATIONS[IDENTITY_MODE]);
  }, [activateMode]);

  const activateTerminalMode = useCallback(() => {
    activateMode(TERMINAL_MODE, MODE_DURATIONS[TERMINAL_MODE]);
  }, [activateMode]);

  const activateKonamiMode = useCallback(() => {
    activateMode(KONAMI_MODE, MODE_DURATIONS[KONAMI_MODE]);
  }, [activateMode]);

  const activateProjectMode = useCallback(() => {
    activateMode(PROJECT_MODE, MODE_DURATIONS[PROJECT_MODE]);
  }, [activateMode]);

  const activateMobileMode = useCallback(() => {
    activateMode(MOBILE_MODE, MODE_DURATIONS[MOBILE_MODE]);
  }, [activateMode]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && activeModeRef.current) {
        deactivate();
        return;
      }

      if (isEditableTarget(event.target)) {
        return;
      }

      const expectedKonamiKey = KONAMI_SEQUENCE[konamiIndexRef.current];
      const konamiKey = event.key.length === 1 ? event.key.toLowerCase() : event.key;

      if (konamiKey === expectedKonamiKey) {
        konamiIndexRef.current += 1;

        if (konamiIndexRef.current === KONAMI_SEQUENCE.length) {
          konamiIndexRef.current = 0;
          activateKonamiMode();
        }
      } else {
        konamiIndexRef.current = konamiKey === KONAMI_SEQUENCE[0] ? 1 : 0;
      }

      if (event.key.length !== 1) {
        return;
      }

      phraseBufferRef.current = `${phraseBufferRef.current}${event.key.toLowerCase()}`.slice(
        -MAX_BUFFER_LENGTH
      );

      if (phraseBufferRef.current.endsWith(SECRET_PHRASE)) {
        phraseBufferRef.current = "";
        activateIdentityMode();
      }
    };

    const handleInput = (event) => {
      if (!isTextEntryTarget(event.target)) {
        return;
      }

      const value = event.target.value || "";
      const normalizedValue = value.toLowerCase();
      const hadProjectPhrase = projectPhraseStateRef.current.get(event.target) || false;
      const hasProjectPhrase = normalizedValue.includes(PROJECT_PHRASE);

      projectPhraseStateRef.current.set(event.target, hasProjectPhrase);

      if (hasProjectPhrase && !hadProjectPhrase) {
        activateProjectMode();
      }
    };

    const handleTerminalModeEvent = () => {
      activateTerminalMode();
    };

    const handleMobileModeEvent = () => {
      if (activeModeRef.current) {
        return;
      }

      if (navigator.vibrate) {
        navigator.vibrate(25);
      }

      activateMobileMode();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("input", handleInput, true);
    window.addEventListener("cm:terminal-mode", handleTerminalModeEvent);
    window.addEventListener("cm:mobile-mode", handleMobileModeEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("input", handleInput, true);
      window.removeEventListener("cm:terminal-mode", handleTerminalModeEvent);
      window.removeEventListener("cm:mobile-mode", handleMobileModeEvent);
    };
  }, [
    activateIdentityMode,
    activateKonamiMode,
    activateMobileMode,
    activateProjectMode,
    activateTerminalMode,
    deactivate,
  ]);

  useEffect(() => {
    document.body.classList.toggle("easter-identity-mode", activeMode === IDENTITY_MODE);
    document.body.classList.toggle("easter-terminal-mode", activeMode === TERMINAL_MODE);
    document.body.classList.toggle("easter-konami-mode", activeMode === KONAMI_MODE);
    document.body.classList.toggle("easter-project-mode", activeMode === PROJECT_MODE);
    document.body.classList.toggle("easter-mobile-mode", activeMode === MOBILE_MODE);

    return () => {
      document.body.classList.remove("easter-identity-mode");
      document.body.classList.remove("easter-terminal-mode");
      document.body.classList.remove("easter-konami-mode");
      document.body.classList.remove("easter-project-mode");
      document.body.classList.remove("easter-mobile-mode");
    };
  }, [activeMode]);

  useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, [clearCloseTimer]);

  return {
    activeMode,
    activateIdentityMode,
    activateTerminalMode,
    activateKonamiMode,
    activateProjectMode,
    activateMobileMode,
    deactivate,
  };
}
