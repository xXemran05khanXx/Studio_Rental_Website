'use client'

import  Container  from "../Container";
import CategoryBox from "./CategoryBox";
import { useSearchParams, usePathname } from "next/navigation";

import { TbBeach } from "react-icons/tb";
import { GiWindmill, GiMicrophone, GiFilmSpool, GiPaintBrush } from "react-icons/gi";
import { FaMountain, FaPodcast, FaMusic, FaCameraRetro, FaPalette } from "react-icons/fa";
import { MdOutlineEvent } from "react-icons/md";
import { FiCpu } from "react-icons/fi";

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach'
    },
    {
        label: 'Windmill',
        icon: GiWindmill,
        description: 'This property is close to a windmill'
    },
    {
        label: 'Mountains',
        icon: FaMountain,
        description: 'This property is close to the mountains'
    },
    {
        label: 'Photography Studio',
        icon: FaCameraRetro,
        description: 'A studio equipped for professional photography sessions'
    },
    {
        label: 'Film Studio',
        icon: GiFilmSpool,
        description: 'A space designed for video production, filming, and editing'
    },
    {
        label: 'Podcast Studio',
        icon: FaPodcast,
        description: 'A soundproof studio for podcast recording with quality audio equipment'
    },
    {
        label: 'Music Studio',
        icon: FaMusic,
        description: 'A studio for recording and mixing music with professional sound equipment'
    },
    {
        label: 'Art Studio',
        icon: FaPalette,
        description: 'A creative space for artists to work on painting, sculpting, or drawing'
    },
    {
        label: 'Design Studio',
        icon: GiPaintBrush,
        description: 'A studio with tools for fashion design, sewing, and prototyping'
    },
    {
        label: 'Event Space',
        icon: MdOutlineEvent,
        description: 'A flexible studio space for hosting events, workshops, or classes'
    },
    {
        label: 'Virtual Production Studio',
        icon: FiCpu,
        description: 'A high-tech studio for VR/AR content creation and virtual productions'
    }
];


const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/'
    if(!isMainPage) {
        return null;
    }
    return (
        <Container>
        <div
           className="
           pt-4
           flex
           items-center
           justify-between
           overflow-x-auto
           "
        >
          {categories.map((item) => (
            <CategoryBox
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected= {category === item.label}
            />  
          ))}
        </div>
        </Container>
        
    );
}
export default Categories;