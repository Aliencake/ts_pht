import { PlusCircle, Trash2 } from "lucide-react"
import { AddLinksDialog } from "./Dialog"
import { useState } from "react"
import { social_link } from "../../types"


const social_links: social_link[] = [
    {
        id: 1,
        name: 'instagram',
        href: 'https://www.instagram.com/ts_pht/',
        index: 1
    },
    {
        id: 2,
        name: 'behance',
        href: 'https://www.behance.net/alexandra_tyomkina',
        index: 2
    },
]


export default function LinksBoard() {
    const [isHovering, setIsHovering] = useState(false);

    const [new_social_links, updateSocialLinks] = useState(social_links)

    return (
        <div className="flex flex-col items-center justify-between mt-[200px]">
            <p>Посилання</p>
            <ul
                onMouseEnter={() => { setIsHovering(true) }}
                onMouseLeave={() => setIsHovering(false)}
                className="flex flex-row rounded-lg  border-solid border-2 border-black">
                {
                    new_social_links.map((item, index) => {
                        return <li draggable className="m-4 flex flex-row"
                            id={item.name}>
                            <a className="hover:text-black/50" target="_blank" href={item.href}>{item.name}</a>
                            {isHovering ? <Trash2 onClick={() => { updateSocialLinks(new_social_links.filter((l) => l.id !== item.id)) }} /> : <></>}
                        </li>
                    })
                }
                <li>
                    <AddLinksDialog new_social_links={new_social_links} updateSocialLinks={updateSocialLinks} />
                </li>
            </ul>
        </div>
    )
}   
