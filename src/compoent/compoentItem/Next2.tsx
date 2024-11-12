import { IoMenu,IoChevronBackOutline,IoChevronForward,IoSearchSharp,IoCaretDownOutline } from "react-icons/io5";
import HoverBorder from './HoverBorder';

function Next2() {

return (
    <HoverBorder onClick={()=>{console.log('dd')}} backgroundColor={'#F9FAFA'} padding={'8px'}>
    <IoChevronForward></IoChevronForward>
    </HoverBorder>
)
}
export default Next2;
