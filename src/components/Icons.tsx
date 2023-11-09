import {
  faFacebook,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import {
  faAddressCard,
  faCircleQuestion,
  faPenToSquare,
  faTrashCan,
} from '@fortawesome/free-regular-svg-icons';
import {
  faCalendarAlt,
  faEllipsisVertical,
  faFileLines,
  faHouse,
  faPlus,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import { Typography } from 'antd';
import { BaseType } from 'antd/es/typography/Base';
import { CSSProperties } from 'react';

interface InternalIconProps
  extends Omit<FontAwesomeIconProps, 'type'>,
    IconProps {}

export interface IconProps {
  style?: CSSProperties;
  type?: BaseType;
}

export const Icon = ({ type, ...rest }: InternalIconProps) => (
  <Typography.Text type={type} className="anticon">
    <FontAwesomeIcon {...rest} />
  </Typography.Text>
);

export const HouseIcon = (props: IconProps) => (
  <Icon {...props} icon={faHouse} />
);
export const CalendarIcon = (props: IconProps) => (
  <Icon {...props} icon={faCalendarAlt} />
);
export const AboutIcon = (props: IconProps) => (
  <Icon {...props} icon={faFileLines} />
);
export const LoginIcon = (props: IconProps) => (
  <Icon {...props} icon={faRightFromBracket} />
);
export const RegisterIcon = (props: IconProps) => (
  <Icon {...props} icon={faAddressCard} />
);

export const QuestionIcon = (props: IconProps) => (
  <Icon {...props} icon={faCircleQuestion} />
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
export const PlusIcon = (props: IconProps) => <Icon {...props} icon={faPlus} />;

export const FacebookIcon = (props: IconProps) => (
  <Icon {...props} icon={faFacebook} />
);
export const TwitterIcon = (props: IconProps) => (
  <Icon {...props} icon={faTwitter} />
);
export const YouTubeIcon = (props: IconProps) => (
  <Icon {...props} icon={faYoutube} />
);
