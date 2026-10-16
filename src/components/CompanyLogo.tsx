import companyLogo from '../assets/logo/logo.png';

interface CompanyLogoProps {
  alt?: string;
  className?: string;
}

export default function CompanyLogo({ alt = 'OPCIEAS emblem', className = '' }: CompanyLogoProps) {
  return <img src={companyLogo} alt={alt} className={`block shrink-0 object-contain ${className}`} />;
}
