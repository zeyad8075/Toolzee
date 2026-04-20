import type { CSSProperties } from 'react';
import {
  Archive,
  Contact,
  FileImage,
  Files,
  ImageDown,
  KeyRound,
  LetterText,
  MessageCircle,
  Minimize2,
  QrCode,
  RefreshCw,
  Scaling,
  Scissors,
  Wifi,
  type LucideIcon,
} from 'lucide-react';

export type ToolIconKey =
  | 'compress'
  | 'convert'
  | 'resize'
  | 'qr'
  | 'imageToPdf'
  | 'mergePdf'
  | 'splitPdf'
  | 'compressPdf'
  | 'pdfToImage'
  | 'wordCounter'
  | 'passwordGenerator'
  | 'wifiQr'
  | 'whatsappQr'
  | 'vcardQr';

const icons: Record<ToolIconKey, LucideIcon> = {
  compress: Minimize2,
  convert: RefreshCw,
  resize: Scaling,
  qr: QrCode,
  imageToPdf: FileImage,
  mergePdf: Files,
  splitPdf: Scissors,
  compressPdf: Archive,
  pdfToImage: ImageDown,
  wordCounter: LetterText,
  passwordGenerator: KeyRound,
  wifiQr: Wifi,
  whatsappQr: MessageCircle,
  vcardQr: Contact,
};

export default function ToolIcon({
  name,
  size = 22,
  strokeWidth = 2,
  className,
  style,
}: {
  name: ToolIconKey;
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const Icon = icons[name];

  return (
    <Icon
      aria-hidden="true"
      focusable="false"
      className={className}
      size={size}
      strokeWidth={strokeWidth}
      style={style}
    />
  );
}
