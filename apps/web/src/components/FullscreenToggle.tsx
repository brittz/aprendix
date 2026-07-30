import { useEffect, useState } from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { contractOutline, expandOutline } from 'ionicons/icons';
import {
  isFullscreenActive,
  isFullscreenSupported,
  onFullscreenChange,
  toggleFullscreen,
} from '../utils/fullscreen';

interface Props {
  className?: string;
  /** `icon` for header icon buttons; `outline` for play toolbars. */
  mode?: 'icon' | 'outline';
  enterLabel?: string;
  exitLabel?: string;
}

/**
 * Toggles the browser Fullscreen API on `document.documentElement`.
 * Desktop + mobile browsers that expose the API (incl. webkit prefixes).
 */
export default function FullscreenToggle({
  className,
  mode = 'icon',
  enterLabel = 'Tela cheia',
  exitLabel = 'Sair da tela cheia',
}: Props) {
  const [active, setActive] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(isFullscreenSupported());
    setActive(isFullscreenActive());
    return onFullscreenChange(() => setActive(isFullscreenActive()));
  }, []);

  if (!supported) return null;

  const label = active ? exitLabel : enterLabel;
  const icon = active ? contractOutline : expandOutline;

  if (mode === 'outline') {
    return (
      <IonButton
        size="small"
        fill="outline"
        className={className}
        aria-label={label}
        aria-pressed={active}
        onClick={() => {
          void toggleFullscreen();
        }}
      >
        <IonIcon slot="start" icon={icon} />
        {label}
      </IonButton>
    );
  }

  return (
    <button
      type="button"
      className={className ?? 'home-icon-btn'}
      aria-label={label}
      aria-pressed={active}
      onClick={() => {
        void toggleFullscreen();
      }}
    >
      <IonIcon icon={icon} />
    </button>
  );
}
