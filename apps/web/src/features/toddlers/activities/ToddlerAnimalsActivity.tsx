import EarlyAnimalsActivity from '../../early-shared/EarlyAnimalsActivity';

interface Props {
  onInteract: () => void;
}

export default function ToddlerAnimalsActivity({ onInteract }: Props) {
  return <EarlyAnimalsActivity onInteract={onInteract} />;
}
