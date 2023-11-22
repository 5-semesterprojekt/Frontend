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
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
  faEllipsisVertical,
  faFileLines,
  faHouse,
  faKey,
  faPlus,
  faRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
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
  <FontAwesomeIcon {...rest} className="anticon" />
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
export const AccountIcon = (props: IconProps) => (
  <Icon {...props} icon={faUser} />
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
export const KeyIcon = (props: IconProps) => <Icon {...props} icon={faKey} />;
export const PlusIcon = (props: IconProps) => <Icon {...props} icon={faPlus} />;
export const InformationIcon = (props: IconProps) => (
  <Icon {...props} icon={faCircleInfo} />
);

export const FacebookIcon = (props: IconProps) => (
  <Icon {...props} icon={faFacebook} />
);
export const TwitterIcon = (props: IconProps) => (
  <Icon {...props} icon={faTwitter} />
);
export const YouTubeIcon = (props: IconProps) => (
  <Icon {...props} icon={faYoutube} />
);

export const CheckCircleIcon = (props: IconProps) => (
  <Icon {...props} icon={faCircleCheck} />
);
export const XMarkCircleIcon = (props: IconProps) => (
  <Icon {...props} icon={faCircleXmark} />
);
