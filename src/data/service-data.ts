import { StaticImageData } from 'next/image';

// icons (only what we actually use)
import icon_8 from '@/assets/images/icon/icon_32.svg';
import icon_9 from '@/assets/images/icon/icon_33.svg';
import icon_10 from '@/assets/images/icon/icon_34.svg';
import icon_11 from '@/assets/images/icon/icon_35.svg';

// data type
interface IService {
  id: number;
  icon: StaticImageData;
  title: string;
  desc: string;
  page: string;   // if your UI needs it
  url: string;    // add url so each card links correctly
}

const service_data: IService[] = [
  {
    id: 8,
    icon: icon_8,
    title: 'VIN / Chassis Decoder',
    desc: 'Instantly decode your car’s VIN or chassis number to reveal make, model, year, and specifications.',
    page: 'home-3',
    url: '/vin-decoder',
  },
  {
    id: 9,
    icon: icon_9,
    title: 'Car Value Estimator',
    desc: 'Get an accurate market value estimate of your car based on age, mileage, and condition.',
    page: 'home-3',
    url: '/car-value-estimator',
  },
  {
    id: 10,
    icon: icon_10,
    title: 'Premium Calculator',
    desc: 'Estimate how much your insurance will cost — from third-party to comprehensive coverage.',
    page: 'home-3',
    url: '/service-details',
  },
  {
    id: 11,
    icon: icon_11,
    title: 'Policy Comparison',
    desc: 'Compare insurance policies side by side to choose the coverage that fits your budget and needs.',
    page: 'home-3',
    url: '/service/policy-comparison',
  },
];

export default service_data;
