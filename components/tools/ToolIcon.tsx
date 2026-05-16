import type { CSSProperties } from 'react';
import {
  Archive,
  Contact,
  FileImage,
  FileMinus2,
  FileOutput,
  Files,
  Eraser,
  ImageDown,
  KeyRound,
  LetterText,
  ListOrdered,
  MessageCircle,
  Minimize2,
  QrCode,
  RefreshCw,
  RotateCw,
  Scaling,
  Scissors,
  Stamp,
  Wifi,
  type LucideIcon,
} from 'lucide-react';

export type ToolIconKey =
  | 'compress'
  | 'convert'
  | 'resize'
  | 'removeBackground'
  | 'qr'
  | 'imageToPdf'
  | 'mergePdf'
  | 'splitPdf'
  | 'compressPdf'
  | 'pdfToImage'
  | 'rotatePdf'
  | 'removePdfPages'
  | 'extractPdfPages'
  | 'addPageNumbers'
  | 'addWatermark'
  | 'wordCounter'
  | 'passwordGenerator'
  | 'wifiQr'
  | 'whatsappQr'
  | 'vcardQr';

const icons: Record<ToolIconKey, LucideIcon> = {
  compress: Minimize2,
  convert: RefreshCw,
  resize: Scaling,
  removeBackground: Eraser,
  qr: QrCode,
  imageToPdf: FileImage,
  mergePdf: Files,
  splitPdf: Scissors,
  compressPdf: Archive,
  pdfToImage: ImageDown,
  rotatePdf: RotateCw,
  removePdfPages: FileMinus2,
  extractPdfPages: FileOutput,
  addPageNumbers: ListOrdered,
  addWatermark: Stamp,
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
