import { IMenu } from "@/types/menu-d-t";

const menu_data: IMenu[] = [
  {
    id: 1,
    link: '/home-7',
    title: 'Home',
  },
  {
    id: 2,
    link: '/service-v2',
    title: 'Services',
    dropdown:true,
    dropdown_menus: [
      {
        
        link: '/vin-decoder',
        title: 'VIN / Chassis Decoder',
      },
      {
       
        link: '/car-value-estimator',
        title: 'Car Value Estimator',
      },
      {
        
        link: '/service-details',
        title: 'Premium Calculator',
      },
      {
        
        link: '/policy-comparison',
        title: 'Policy Comparison',
      },
    ],
  },
  {
    id: 3,
    link: '/about-us',
    title: 'About',
  },
  {
    id: 4,
    link: '/blog-grid',
    title: 'Blog',
  },
  {
    id: 5,
    link: '/contact',
    title: 'Contact',
  },
];

export default menu_data;
