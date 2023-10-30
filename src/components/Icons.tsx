import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import {
  faEllipsisVertical,
  faFileLines,
  faHouse,
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import { CSSProperties } from 'react';

export interface IconProps {
  style?: CSSProperties;
}

export const Icon = (props: FontAwesomeIconProps) => {
  return <FontAwesomeIcon {...props} className="anticon" />;
};

export const HouseIcon = (props: IconProps) => (
  <Icon {...props} icon={faHouse} />
);
export const AboutIcon = (props: IconProps) => (
  <Icon {...props} icon={faFileLines} />
);

export const EditIcon = (props: IconProps) => (
  <Icon {...props} icon={faPenToSquare} />
);
export const DeleteIcon = (props: IconProps) => (
  <Icon {...props} icon={faTrashCan} />
);
export const ThreeDotsIcon = (props: IconProps) => (
  <Icon {...props} icon={faEllipsisVertical} />
);
