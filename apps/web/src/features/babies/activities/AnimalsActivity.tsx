import EarlyAnimalsActivity from '../../early-shared/EarlyAnimalsActivity';

interface Props {
  onInteract: () => void;
}

export default function AnimalsActivity({ onInteract }: Props) {
  return <EarlyAnimalsActivity onInteract={onInteract} />;
}
