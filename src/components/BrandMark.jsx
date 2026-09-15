import logo from '../assets/logos/pashxd-logo2.jpg';

// Preserve the original asset. The frame crops only its surrounding white margin.
export default function BrandMark({ className = 'h-11 w-11' }) {
  return (
    <span className={`relative inline-block shrink-0 overflow-hidden rounded-[36%] ${className}`} aria-hidden="true">
      <img src={logo} alt="" style={{ position: 'absolute', width: '195%', height: '195%', maxWidth: 'none', left: '-42.5%', top: '-39%' }} />
    </span>
  );
}
