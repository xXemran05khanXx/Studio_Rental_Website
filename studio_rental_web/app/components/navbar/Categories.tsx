
import  Container  from "../Container";
import CategoryBox from "./CategoryBox";
import { useSearchParams, usePathname } from "next/navigation";
import { SiAdobephotoshop } from "react-icons/si";
import { PiFilmSlateFill } from "react-icons/pi";
import { GiPaintBrush } from "react-icons/gi";
import { FaPodcast,FaGamepad  } from "react-icons/fa";
import { MdOutlineEvent, MdOutlineCamera, MdMusicNote   } from "react-icons/md";


export const categories = [
    {
        label: 'Photography',
        icon: MdOutlineCamera ,
        description: 'A studio equipped for professional photography sessions'
    },
    {
        label: 'Film',
        icon: PiFilmSlateFill ,
        description: 'A space designed for video production, filming, and editing'
    },
    {
        label: 'Podcast',
        icon: FaPodcast,
        description: 'A soundproof studio for podcast recording with quality audio equipment'
    },
    {
        label: 'Music',
        icon: MdMusicNote  ,
        description: 'A studio for recording and mixing music with professional sound equipment'
    },
    {
        label: 'Art',
        icon: GiPaintBrush,
        description: 'A creative space for artists to work on painting, sculpting, or drawing'
    },
    {
        label: 'Design',
        icon: SiAdobephotoshop,
        description: 'A studio with tools for fashion design, sewing, and prototyping'
    },
    {
        label: 'Event Space',
        icon: MdOutlineEvent,
        description: 'A flexible studio space for hosting events, workshops, or classes'
    },
    {
        label: 'Gamming',
        icon: FaGamepad ,
        description: 'A high-tech studio for Gamming content creation and virtual productions'
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